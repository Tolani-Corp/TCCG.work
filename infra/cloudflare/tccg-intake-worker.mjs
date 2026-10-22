// Cloudflare Worker: D1 intake ledger + private R2 quarantine + governed agent queue.
// Deploy only with private bucket, D1 binding, dedicated secrets and restricted routes.
// The browser never calls this endpoint directly; the TCCG Next.js server signs requests.

const te = new TextEncoder();
const MAX_FILES = 12;
const MAX_TOTAL = 24 * 1024 * 1024;
const ALLOWED = new Set(["pdf", "docx", "xlsx", "pptx", "zip", "csv", "txt", "png", "jpg", "jpeg"]);

function error(message, status = 400) {
  return Response.json({ ok: false, error: message }, { status, headers: { "Cache-Control": "no-store" } });
}
function digestToHex(bytes) {
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function sha256(data) {
  return digestToHex(await crypto.subtle.digest("SHA-256", data));
}
async function mac(secret, message) {
  const key = await crypto.subtle.importKey("raw", te.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return digestToHex(await crypto.subtle.sign("HMAC", key, te.encode(message)));
}
function constantEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
function magic(bytes, ext) {
  const b = new Uint8Array(bytes);
  if (ext === "pdf") return String.fromCharCode(...b.slice(0, 5)) === "%PDF-";
  if (["docx", "xlsx", "pptx", "zip"].includes(ext)) return b[0] === 0x50 && b[1] === 0x4b && b[2] === 3 && b[3] === 4;
  if (ext === "png") return b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71;
  if (ext === "jpg" || ext === "jpeg") return b[0] === 255 && b[1] === 216 && b[2] === 255;
  return !b.includes(0);
}
function safeReference(value) { return typeof value === "string" && /^TCCG-DOC-[A-Z0-9]+-[a-f0-9]{10}$/.test(value); }
function restrictedName(value) { return typeof value === "string" && /^[A-Za-z0-9._ -]{1,120}$/.test(value) && !value.includes("..") && !value.startsWith("."); }

async function intake(request, env) {
  if (!env.INTAKE_DB || !env.INTAKE_DOCUMENTS || !env.TCCG_DOCUMENT_INGEST_SECRET) return error("Storage dependencies are not configured.", 503);
  const reference = request.headers.get("x-tccg-reference");
  const timestamp = request.headers.get("x-tccg-timestamp");
  const signature = request.headers.get("x-tccg-signature");
  if (!safeReference(reference) || !/^\d{10}$/.test(timestamp || "") ||
      Math.abs(Date.now() - Number(timestamp) * 1000) > 120_000) return error("Unauthorized request.", 401);
  if (!constantEqual(await mac(env.TCCG_DOCUMENT_INGEST_SECRET, timestamp + "." + reference), signature))
    return error("Unauthorized request.", 401);
  const existing = await env.INTAKE_DB.prepare("SELECT reference FROM intake_submissions WHERE reference = ?").bind(reference).first();
  if (existing) return error("This reference has already been received. Contact TCCG for its status.", 409);

  const form = await request.formData().catch(() => null);
  if (!form) return error("Invalid multipart request.");
  let payload;
  try { payload = JSON.parse(form.get("manifest")); } catch { return error("Missing signed intake manifest."); }
  if (payload?.schemaVersion !== "tccg.preconstruction.intake.v1" || payload?.reference !== reference ||
      !payload?.intake?.privacyAccepted || !payload?.intake?.publicMaterialConfirmed ||
      !Array.isArray(payload.documents) || payload.documents.length < 1 || payload.documents.length > MAX_FILES)
    return error("Invalid document manifest.");
  const rawFiles = form.getAll("documents");
  if (rawFiles.length !== payload.documents.length || rawFiles.some((f) => !(f instanceof File))) return error("Document count mismatch.");
  const bytes = [];
  const output = [];
  let sum = 0;
  for (let i = 0; i < rawFiles.length; i++) {
    const f = rawFiles[i], m = payload.documents[i];
    if (!restrictedName(m?.name) || f.name !== m.name || f.size !== m.size || f.size === 0 || f.size > 8 * 1024 * 1024)
      return error("File metadata mismatch.");
    const ext = m.name.split(".").at(-1).toLowerCase();
    if (!ALLOWED.has(ext)) return error("File type not accepted.");
    sum += f.size;
    if (sum > MAX_TOTAL) return error("Package exceeds size limit.", 413);
    const content = await f.arrayBuffer();
    if (!magic(content, ext) || !constantEqual(await sha256(content), m.sha256))
      return error("File integrity mismatch.");
    const documentId = crypto.randomUUID();
    const key = "quarantine/" + reference + "/" + documentId + "/" + m.name;
    bytes.push({ key, content });
    output.push({ documentId, sha256: m.sha256, name: m.name, size: f.size, kind: m.kind, state: "quarantined", key });
  }
  const stored = [];
  try {
    for (const { key, content } of bytes) {
      await env.INTAKE_DOCUMENTS.put(key, content, { httpMetadata: { contentType: "application/octet-stream" },
        customMetadata: { classification: "untrusted", clearance: "quarantined" } });
      stored.push(key);
    }
    const receiptId = crypto.randomUUID();
    const date = new Date().toISOString();
    const q = [
      env.INTAKE_DB.prepare("INSERT INTO intake_submissions(reference,receipt_id,intake_json,state,created_at) VALUES(?,?,?,?,?)")
        .bind(reference, receiptId, JSON.stringify(payload.intake), "awaiting_document_clearance", date),
      ...output.map((d) => env.INTAKE_DB.prepare(
        "INSERT INTO intake_documents(document_id,reference,filename,kind,size_bytes,sha256,r2_key,scan_state,created_at) VALUES(?,?,?,?,?,?,?,?,?)")
        .bind(d.documentId, reference, d.name, d.kind, d.size, d.sha256, d.key, "quarantined", date)),
      env.INTAKE_DB.prepare("INSERT INTO intake_consultations(id,reference,agent_id,state,created_at) VALUES(?,?,?,?,?)")
        .bind(crypto.randomUUID(), reference, "AG-PRECON", "awaiting_document_clearance", date),
      env.INTAKE_DB.prepare("INSERT INTO intake_outbox(event_id,reference,event_type,payload_json,delivery_state,created_at) VALUES(?,?,?,?,?,?)")
        .bind(crypto.randomUUID(), reference, "tccg.preconstruction.intake.received.v1",
          JSON.stringify({ reference, receiptId, documentCount: output.length, documentHashes: output.map((d) => d.sha256),
            state: "awaiting_document_clearance", schemaVersion: "1.0" }), "pending", date),
    ];
    await env.INTAKE_DB.batch(q);
    return Response.json({
      ok: true, reference, receiptId, workflowState: "awaiting_document_clearance",
      documents: output.map(({ documentId, sha256, name, size, state }) => ({ documentId, sha256, name, size, state })),
    }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch {
    // Compensate for failed ledger writes. Persistent failures require operator orphan reconciliation.
    const row = await env.INTAKE_DB.prepare("SELECT reference FROM intake_submissions WHERE reference = ?").bind(reference).first().catch(() => null);
    if (!row) await Promise.allSettled(stored.map((key) => env.INTAKE_DOCUMENTS.delete(key)));
    return error("Storage receipt could not be established.", 503);
  }
}

async function exportEvents(env) {
  if (!env.INTAKE_DB || !env.ENTERPRISE_SYNC_URL || !env.ENTERPRISE_SYNC_SECRET) return;
  const target = new URL(env.ENTERPRISE_SYNC_URL);
  if (target.protocol !== "https:") return;
  const events = await env.INTAKE_DB.prepare(
    "SELECT event_id,reference,event_type,payload_json FROM intake_outbox WHERE delivery_state = 'pending' ORDER BY created_at LIMIT 20").all();
  for (const event of events.results || []) {
    const body = JSON.stringify({ eventId: event.event_id, type: event.event_type, reference: event.reference, payload: JSON.parse(event.payload_json) });
    const sentAt = Math.floor(Date.now() / 1000).toString();
    try {
      const r = await fetch(target, {
        method: "POST", headers: { "Content-Type": "application/json", "x-tccg-timestamp": sentAt,
          "x-tccg-signature": await mac(env.ENTERPRISE_SYNC_SECRET, sentAt + "." + body) },
        body,
      });
      const receipt = await r.json().catch(() => null);
      if (r.ok && receipt?.ok === true && receipt?.eventId === event.event_id)
        await env.INTAKE_DB.prepare("UPDATE intake_outbox SET delivery_state='delivered',delivered_at=? WHERE event_id=?")
          .bind(new Date().toISOString(), event.event_id).run();
    } catch { /* Outbox remains pending for the next scheduled retry. */ }
  }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/v1/intake/documents") return intake(request, env);
    return error("Not found.", 404);
  },
  async scheduled(_event, env, ctx) { ctx.waitUntil(exportEvents(env)); },
};