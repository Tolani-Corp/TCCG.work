-- PostgreSQL / Neon: enterprise mirror for TCCG intake receipts.
-- Additive and isolated from TCCG's existing provider-neutral operational tables.
-- Migration and production binding require project identity + service-role authorization.
CREATE SCHEMA IF NOT EXISTS tccg_preconstruction;
CREATE TABLE IF NOT EXISTS tccg_preconstruction.intake_receipts (
  reference text PRIMARY KEY,
  receipt_id uuid NOT NULL UNIQUE,
  source text NOT NULL,
  intake_state text NOT NULL DEFAULT 'awaiting_document_clearance',
  data_classification text NOT NULL DEFAULT 'untrusted_public_intake',
  accepted_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS tccg_preconstruction.documents (
  document_id uuid PRIMARY KEY,
  reference text NOT NULL REFERENCES tccg_preconstruction.intake_receipts(reference),
  filename text NOT NULL,
  kind text NOT NULL,
  size_bytes bigint NOT NULL CHECK(size_bytes > 0),
  checksum_sha256 text NOT NULL CHECK(length(checksum_sha256) = 64),
  private_object_ref text NOT NULL,
  scan_state text NOT NULL DEFAULT 'quarantined',
  document_revision text,
  supersedes_document_id uuid REFERENCES tccg_preconstruction.documents(document_id),
  admitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reference, document_id)
);
CREATE INDEX IF NOT EXISTS documents_ref_state_idx
  ON tccg_preconstruction.documents(reference, scan_state);
CREATE TABLE IF NOT EXISTS tccg_preconstruction.agent_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL REFERENCES tccg_preconstruction.intake_receipts(reference),
  agent_id text NOT NULL,
  status text NOT NULL DEFAULT 'awaiting_document_clearance',
  needs_human_approval boolean NOT NULL DEFAULT true,
  input_receipt_id uuid,
  output_evidence_ref text,
  run_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reference, agent_id)
);
CREATE TABLE IF NOT EXISTS tccg_preconstruction.inbound_events (
  event_id uuid PRIMARY KEY,
  reference text NOT NULL,
  event_type text NOT NULL,
  source_payload jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
-- Access must be restricted with explicit grants; do not expose this schema via
-- anonymous Data API/PostgREST grants or client-side environment variables.
REVOKE ALL ON SCHEMA tccg_preconstruction FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA tccg_preconstruction FROM PUBLIC;
