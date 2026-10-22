-- Cloudflare D1, scoped to the TCCG private intake Worker. Apply to a dedicated database.
-- This is the durable intake edge ledger; it is not the portfolio-wide enterprise system of record.
CREATE TABLE IF NOT EXISTS intake_submissions (
  reference TEXT PRIMARY KEY,
  receipt_id TEXT NOT NULL UNIQUE,
  intake_json TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('awaiting_document_clearance','ready_for_review','needs_information','closed')),
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS intake_documents (
  document_id TEXT PRIMARY KEY,
  reference TEXT NOT NULL REFERENCES intake_submissions(reference),
  filename TEXT NOT NULL,
  kind TEXT NOT NULL,
  size_bytes INTEGER NOT NULL CHECK(size_bytes > 0),
  sha256 TEXT NOT NULL CHECK(length(sha256)=64),
  r2_key TEXT NOT NULL UNIQUE,
  scan_state TEXT NOT NULL DEFAULT 'quarantined'
    CHECK(scan_state IN ('quarantined','verified','rejected','needs_review')),
  revision TEXT,
  supersedes_id TEXT REFERENCES intake_documents(document_id),
  created_at TEXT NOT NULL,
  UNIQUE(reference, sha256, filename)
);
CREATE INDEX IF NOT EXISTS intake_documents_ref_idx ON intake_documents(reference, scan_state);
CREATE TABLE IF NOT EXISTS intake_consultations (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL REFERENCES intake_submissions(reference),
  agent_id TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('awaiting_document_clearance','ready_for_review','in_review','held','completed')),
  created_at TEXT NOT NULL,
  reviewed_by TEXT,
  evidence_ref TEXT,
  UNIQUE(reference, agent_id)
);
CREATE TABLE IF NOT EXISTS intake_outbox (
  event_id TEXT PRIMARY KEY,
  reference TEXT NOT NULL REFERENCES intake_submissions(reference),
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  delivery_state TEXT NOT NULL DEFAULT 'pending'
    CHECK(delivery_state IN ('pending','delivered','held')),
  created_at TEXT NOT NULL,
  delivered_at TEXT
);
CREATE INDEX IF NOT EXISTS intake_outbox_pending_idx ON intake_outbox(delivery_state, created_at);
