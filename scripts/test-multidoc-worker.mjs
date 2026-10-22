import test from "node:test";
import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import worker from "../infra/cloudflare/tccg-intake-worker.mjs";

function fixture() {
  const saved = new Map(), submissions = new Map(), records = [], outbox = [];
  const db = {
    prepare(sql) {
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async first() { return submissions.has(args[0]) ? { reference: args[0] } : null; },
        async all() { return { results: outbox.filter((x) => x.delivered !== true) }; },
        async run() { return { success: true }; },
        get statement() { return { sql, args }; },
      };
    },
    async batch(queries) {
      for (const q of queries) {
        const { sql, args } = q.statement;
        if (sql.includes("INTO intake_submissions")) submissions.set(args[0], { reference: args[0], receiptId: args[1] });
        if (sql.includes("INTO intake_documents")) records.push({ documentId: args[0], reference: args[1], sha: args[5], state: args[7] });
        if (sql.includes("INTO intake_outbox")) outbox.push({ event_id: args[0], reference: args[1], event_type: args[2], payload_json: args[3] });
      }
      return queries.map(() => ({ success: true }));
    },
  };
  const bucket = {
    async put(k, v) { saved.set(k, v); return {}; },
    async delete(k) { saved.delete(k); },
  };
  return { env: { INTAKE_DB: db, INTAKE_DOCUMENTS: bucket, TCCG_DOCUMENT_INGEST_SECRET: "local-test-secret" },
    saved, submissions, records, outbox };
}
async function request(env, files, opts = {}) {
  const reference = opts.reference || "TCCG-DOC-ABC123-" + (opts.suffix || "0123456789");
  const manifest = files.map((f) => ({
    name: f.name, kind: f.kind || "document", size: f.bytes.length,
    sha256: opts.badHash ? "0".repeat(64) : createHash("sha256").update(f.bytes).digest("hex"),
  }));
  const body = JSON.stringify({
    schemaVersion: "tccg.preconstruction.intake.v1", reference, intake: {
      fullName: "Test Operator", email: "test@example.com", phone: "0000000000",
      projectLocation: "Jacob City, FL", projectType: "Multifamily",
      timeline: "Feb 2027", message: "Five duplex test fixture with civil works.",
      privacyAccepted: true, publicMaterialConfirmed: true,
    }, documents: manifest,
  });
  const sha = createHash("sha256").update(body).digest("hex");
  const ts = Math.floor(Date.now()/1000).toString();
  const sig = createHmac("sha256", env.TCCG_DOCUMENT_INGEST_SECRET)
    .update(ts + "." + reference + "." + sha).digest("hex");
  const form = new FormData();
  form.append("manifest", body);
  for (const f of files) form.append("documents", new File([f.bytes], f.name));
  return worker.fetch(new Request("https://secure.example/v1/intake/documents", {
    method: "POST",
    headers: { "x-tccg-reference": reference, "x-tccg-timestamp": ts,
      "x-tccg-manifest-sha256": sha, "x-tccg-signature": sig },
    body: form,
  }), env);
}
test("two documents are durably received, quarantined and not dispatched to agent execution", async () => {
  const f = fixture();
  const docs = [{ name: "scope.pdf", bytes: Buffer.from("%PDF-1.7\nScope\n") },
    { name: "parcel.pdf", bytes: Buffer.from("%PDF-1.7\nParcel\n") }];
  const response = await request(f.env, docs);
  const result = await response.json();
  assert.equal(response.status, 202);
  assert.equal(result.ok, true);
  assert.equal(result.documents.length, 2);
  assert.ok(result.documents.every((d) => d.state === "quarantined"));
  assert.equal(result.workflowState, "awaiting_document_clearance");
  assert.equal(f.saved.size, 2);
  assert.equal(f.records.length, 2);
  assert.equal(f.outbox.length, 1);
  const repeated = await request(f.env, docs);
  assert.equal(repeated.status, 409);
});
test("mismatched digest rejects entire package without storage receipt", async () => {
  const f = fixture();
  const response = await request(f.env, [{ name: "estimate.pdf", bytes: Buffer.from("%PDF-1.4\nestimate") }], { badHash: true });
  assert.equal(response.status, 400);
  assert.equal(f.saved.size, 0);
  assert.equal(f.records.length, 0);
});
test("ZIP archive is quarantined, not extracted or marked clean", async () => {
  const f = fixture();
  const response = await request(f.env, [{ name: "capstone.zip", kind: "archive", bytes: Buffer.from([0x50,0x4b,3,4,1,2,3]) }], { suffix: "abcdef0123" });
  const result = await response.json();
  assert.equal(response.status, 202);
  assert.equal(result.documents[0].state, "quarantined");
  assert.equal(f.records[0].state, "quarantined");
  assert.equal(f.saved.size, 1);
});
