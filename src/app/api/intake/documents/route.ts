import { createHash, createHmac, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES = 12;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, { kind: string; signature: "pdf" | "zip" | "text" | "png" | "jpeg" }> = {
  pdf: { kind: "document", signature: "pdf" },
  docx: { kind: "document", signature: "zip" },
  xlsx: { kind: "spreadsheet", signature: "zip" },
  pptx: { kind: "presentation", signature: "zip" },
  zip: { kind: "archive", signature: "zip" },
  csv: { kind: "data", signature: "text" },
  txt: { kind: "document", signature: "text" },
  png: { kind: "image", signature: "png" },
  jpg: { kind: "image", signature: "jpeg" },
  jpeg: { kind: "image", signature: "jpeg" },
};
type Uploaded = { file: File; name: string; sha256: string; kind: string; size: number };
type RateRecord = { count: number; reset: number };
const localRate = (globalThis as typeof globalThis & { __tccgDocumentRates?: Map<string, RateRecord> }).__tccgDocumentRates ??=
  new Map<string, RateRecord>();

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";
}
function json(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
}
function isMagicValid(bytes: Buffer, signature: string) {
  if (signature === "pdf") return bytes.subarray(0, 5).toString() === "%PDF-";
  if (signature === "zip") return bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  if (signature === "png") return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (signature === "jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  return !bytes.includes(0) && !bytes.subarray(0, 1024).some((b) => b < 9 || (b > 13 && b < 32));
}
function safeName(value: string) {
  const name = value.replace(/\\/g, "/").split("/").at(-1) || "";
  return name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120);
}
async function validateUploads(files: File[]): Promise<Uploaded[]> {
  if (!files.length || files.length > MAX_FILES) throw new Error("Attach between 1 and 12 files.");
  if (files.some((f) => f.size > MAX_FILE_BYTES || f.size === 0) ||
      files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES)
    throw new Error("Files must be nonempty, at most 4 MiB each and 4 MiB total in this hosting-compatible V1.");
  const uploaded: Uploaded[] = [];
  for (const file of files) {
    const name = safeName(file.name);
    const ext = name.split(".").at(-1)?.toLowerCase() || "";
    const type = TYPES[ext];
    if (!type || name.startsWith(".") || name.includes("..")) throw new Error("Unsupported or unsafe filename: " + name);
    const bytes = Buffer.from(await file.arrayBuffer());
    if (!isMagicValid(bytes, type.signature)) throw new Error("File format does not match extension: " + name);
    uploaded.push({
      file, name, kind: type.kind, size: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  return uploaded;
}
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  const previous = localRate.get(ipHash);
  const entry = !previous || previous.reset < now ? { count: 1, reset: now + 600_000 } :
    { count: previous.count + 1, reset: previous.reset };
  localRate.set(ipHash, entry);
  if (entry.count > 3) return json("Too many document requests. Try later or contact TCCG.", 429);

  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return json("Expected multipart document package.", 415);
  const maxLength = Number(request.headers.get("content-length") || 0);
  if (maxLength > MAX_TOTAL_BYTES + 100_000) return json("Document package is too large.", 413);

  const form = await request.formData().catch(() => null);
  if (!form) return json("Invalid document package.", 400);
  if (clean(form.get("website"), 200)) return json("Request could not be accepted.", 400);

  const intake = {
    fullName: clean(form.get("fullName"), 120),
    organization: clean(form.get("organization"), 160),
    email: clean(form.get("email"), 320).toLowerCase(),
    phone: clean(form.get("phone"), 40),
    projectLocation: clean(form.get("projectLocation"), 240),
    projectType: clean(form.get("projectType"), 160),
    timeline: clean(form.get("timeline"), 120),
    message: clean(form.get("message"), 4000),
    privacyAccepted: form.get("privacyAccepted") === "true",
    smsConsent: form.get("smsConsent") === "true",
    publicMaterialConfirmed: form.get("publicMaterialConfirmed") === "true",
  };
  if (!intake.fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email) ||
      !intake.phone || !intake.projectLocation || !intake.projectType ||
      !intake.timeline || intake.message.length < 20 ||
      !intake.privacyAccepted || !intake.publicMaterialConfirmed)
    return json("Complete the required information and confirm document handling permissions.", 400);

  const rawFiles = form.getAll("documents");
  if (rawFiles.some((f) => !(f instanceof File))) return json("Invalid file field.", 400);
  let files: Uploaded[];
  try { files = await validateUploads(rawFiles as File[]); }
  catch (err) { return json(err instanceof Error ? err.message : "Invalid files.", 400); }

  const target = process.env.TCCG_DOCUMENT_INGEST_URL?.trim();
  const secret = process.env.TCCG_DOCUMENT_INGEST_SECRET?.trim();
  if (!target || !secret) return json("Secure document intake is not configured. Contact TCCG for a protected transfer method.", 503);
  let url: URL;
  try {
    url = new URL(target);
    if (url.protocol !== "https:" || url.username || url.password) throw Error("Invalid destination");
  } catch { return json("Document intake destination is unavailable.", 503); }

  const reference = "TCCG-DOC-" + Date.now().toString(36).toUpperCase() + "-" + randomBytes(5).toString("hex");
  const manifest = files.map(({ name, size, kind, sha256 }) => ({ name, size, kind, sha256 }));
  const payload = { schemaVersion: "tccg.preconstruction.intake.v1", reference,
    submittedAt: new Date().toISOString(), source: "tccg.work/contact",
    intake, documents: manifest, reviewOnly: true, requestedAgents: ["AG-PRECON", "AG-EST", "AG-SCHED", "AG-PROC"] };
  const outgoing = new FormData();
  const manifestJson = JSON.stringify(payload);
  outgoing.append("manifest", manifestJson);
  for (const item of files) outgoing.append("documents", item.file, item.name);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const manifestSha = createHash("sha256").update(manifestJson).digest("hex");
  const signature = createHmac("sha256", secret).update(timestamp + "." + reference + "." + manifestSha).digest("hex");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);
  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "x-tccg-timestamp": timestamp, "x-tccg-reference": reference, "x-tccg-manifest-sha256": manifestSha, "x-tccg-signature": signature },
      body: outgoing, signal: controller.signal, cache: "no-store",
    });
    const receipt = await upstream.json().catch(() => null) as null | {
      ok?: boolean; reference?: string; receiptId?: string;
      documents?: { sha256: string; state: string; documentId: string }[];
      workflowState?: string;
    };
    const checks = receipt?.documents?.length === files.length &&
      files.every((item) => receipt?.documents?.some((doc) =>
        doc.sha256 === item.sha256 && Boolean(doc.documentId) && doc.state === "quarantined"));
    if (!upstream.ok || !receipt?.ok || receipt.reference !== reference || !receipt.receiptId || !checks)
      return json("The secure storage service did not confirm every document. Please contact TCCG before retrying.", 502);
    return NextResponse.json({
      ok: true, reference, receiptId: receipt.receiptId, documents: receipt.documents,
      workflowState: receipt.workflowState || "awaiting_document_clearance",
      message: "Documents were stored in restricted quarantine. Automated document consultations are held for security and human review.",
    }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch {
    return json("Secure document transfer could not be confirmed. Contact TCCG before retrying.", 502);
  } finally { clearTimeout(timeout); }
}
export function GET() { return json("Method not allowed.", 405); }
