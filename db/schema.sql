-- TCCG Digital Launch operational data model
-- PostgreSQL 15+ compatible. Provider-neutral baseline; not yet bound to production.
-- Apply through a controlled migration process after selecting the production database.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE record_status AS ENUM ('draft', 'active', 'inactive', 'archived');
CREATE TYPE approval_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'superseded');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE cde_state AS ENUM ('wip', 'shared', 'published', 'archive');

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  legal_name text,
  status record_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_number text NOT NULL,
  name text NOT NULL,
  client_name text,
  location_text text,
  delivery_method text,
  contract_role text,
  project_template_id text,
  status record_status NOT NULL DEFAULT 'draft',
  start_date date,
  target_completion_date date,
  data_classification text NOT NULL DEFAULT 'internal',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, project_number)
);

CREATE INDEX projects_org_status_idx ON projects (organization_id, status);

CREATE TABLE cde_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  container_id text NOT NULL,
  title text NOT NULL,
  originator text NOT NULL,
  discipline text,
  revision text NOT NULL,
  status_code text,
  classification text,
  state cde_state NOT NULL DEFAULT 'wip',
  sensitivity text NOT NULL DEFAULT 'internal',
  storage_provider text,
  storage_reference text,
  checksum_sha256 text,
  supersedes_id uuid REFERENCES cde_documents(id),
  created_by text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  approved_by text,
  approved_at timestamptz,
  UNIQUE (project_id, container_id, revision)
);

CREATE INDEX cde_documents_project_state_idx ON cde_documents (project_id, state);
CREATE INDEX cde_documents_project_container_idx ON cde_documents (project_id, container_id);

CREATE TABLE cost_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  division text NOT NULL,
  family text NOT NULL,
  description text NOT NULL,
  phase text NOT NULL,
  accounting_code text,
  status record_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  estimate_number text NOT NULL,
  revision integer NOT NULL DEFAULT 1,
  basis_date date NOT NULL DEFAULT CURRENT_DATE,
  estimate_class text,
  status approval_status NOT NULL DEFAULT 'draft',
  prepared_by text,
  reviewed_by text,
  approved_by text,
  total_direct_cost numeric(16,2) NOT NULL DEFAULT 0 CHECK (total_direct_cost >= 0),
  total_indirect_cost numeric(16,2) NOT NULL DEFAULT 0 CHECK (total_indirect_cost >= 0),
  fee numeric(16,2) NOT NULL DEFAULT 0,
  contingency numeric(16,2) NOT NULL DEFAULT 0 CHECK (contingency >= 0),
  total_price numeric(16,2) NOT NULL DEFAULT 0 CHECK (total_price >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, estimate_number, revision)
);

CREATE TABLE estimate_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  estimate_id uuid NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  cost_code_id uuid NOT NULL REFERENCES cost_codes(id),
  assembly_id text,
  scope text NOT NULL,
  quantity numeric(16,4) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  unit text NOT NULL,
  labor_hours numeric(16,4) NOT NULL DEFAULT 0 CHECK (labor_hours >= 0),
  labor_rate numeric(16,2) NOT NULL DEFAULT 0 CHECK (labor_rate >= 0),
  material_cost numeric(16,2) NOT NULL DEFAULT 0 CHECK (material_cost >= 0),
  equipment_cost numeric(16,2) NOT NULL DEFAULT 0 CHECK (equipment_cost >= 0),
  subcontract_cost numeric(16,2) NOT NULL DEFAULT 0 CHECK (subcontract_cost >= 0),
  quote_required boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX estimate_items_estimate_cost_idx ON estimate_items (estimate_id, cost_code_id);

CREATE TABLE vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  legal_name text NOT NULL,
  category text NOT NULL,
  relationship_status text NOT NULL DEFAULT 'target',
  account_number text,
  account_evidence_ref text,
  primary_contact_name text,
  primary_contact_email text,
  qualification_expires_on date,
  score numeric(5,2) CHECK (score BETWEEN 0 AND 100),
  status record_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  vendor_id uuid NOT NULL REFERENCES vendors(id),
  quote_number text NOT NULL,
  quote_date date NOT NULL,
  expires_on date,
  manufacturer text,
  model text,
  scope text NOT NULL,
  exclusions text,
  freight numeric(16,2),
  tax numeric(16,2),
  total numeric(16,2) NOT NULL CHECK (total >= 0),
  lead_time_days integer CHECK (lead_time_days >= 0),
  payment_terms text,
  escalation_assumption text,
  document_ref text NOT NULL,
  approved_for_estimate boolean NOT NULL DEFAULT false,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (vendor_id, quote_number)
);

CREATE INDEX quotes_project_expiry_idx ON quotes (project_id, expires_on);

CREATE TABLE subcontractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  legal_name text NOT NULL,
  dba_name text,
  tax_record_ref text,
  trade text NOT NULL,
  geography text,
  status text NOT NULL DEFAULT 'prospect',
  primary_contact_name text,
  primary_contact_email text,
  current_workload_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE subcontractor_prequalifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id uuid NOT NULL REFERENCES subcontractors(id) ON DELETE CASCADE,
  review_date date NOT NULL DEFAULT CURRENT_DATE,
  expires_on date,
  reviewer text NOT NULL,
  license_status text,
  safety_status text,
  emr numeric(6,3),
  osha_review text,
  insurance_status text,
  insurance_evidence_ref text,
  bonding_status text,
  bonding_evidence_ref text,
  financial_capacity_status text,
  quality_status text,
  reference_status text,
  approval approval_status NOT NULL DEFAULT 'pending',
  conditions text,
  evidence_ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX subcontractor_prequal_expiry_idx ON subcontractor_prequalifications (expires_on, approval);

CREATE TABLE procurement_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  cost_code_id uuid REFERENCES cost_codes(id),
  description text NOT NULL,
  quantity numeric(16,4) CHECK (quantity >= 0),
  unit text,
  vendor_id uuid REFERENCES vendors(id),
  subcontractor_id uuid REFERENCES subcontractors(id),
  submittal_required boolean NOT NULL DEFAULT false,
  technical_approval_status approval_status NOT NULL DEFAULT 'draft',
  commercial_release_status approval_status NOT NULL DEFAULT 'draft',
  required_on_site_date date,
  planned_release_date date,
  actual_release_date date,
  promised_ship_date date,
  promised_delivery_date date,
  actual_delivery_date date,
  lead_time_days integer CHECK (lead_time_days >= 0),
  risk risk_level NOT NULL DEFAULT 'low',
  commitment_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX procurement_ros_risk_idx ON procurement_items (project_id, required_on_site_date, risk);

CREATE TABLE qc_inspections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  cost_code_id uuid REFERENCES cost_codes(id),
  inspection_type text NOT NULL,
  checklist_id text,
  location text,
  inspector text NOT NULL,
  inspected_at timestamptz NOT NULL,
  result text NOT NULL,
  deficiency_count integer NOT NULL DEFAULT 0 CHECK (deficiency_count >= 0),
  evidence_ref text,
  approval approval_status NOT NULL DEFAULT 'pending',
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX qc_inspections_project_date_idx ON qc_inspections (project_id, inspected_at DESC);

CREATE TABLE hse_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  observation_type text NOT NULL,
  activity text,
  location text,
  risk risk_level NOT NULL DEFAULT 'low',
  observed_at timestamptz NOT NULL,
  observed_by text NOT NULL,
  description text NOT NULL,
  immediate_action text,
  corrective_action text,
  corrective_owner text,
  corrective_due_at timestamptz,
  closed_at timestamptz,
  evidence_ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX hse_open_actions_idx ON hse_observations (project_id, corrective_due_at) WHERE closed_at IS NULL;

CREATE TABLE owner_metric_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category text NOT NULL,
  metric_key text NOT NULL,
  metric_label text NOT NULL,
  numeric_value numeric(20,6),
  text_value text,
  unit text,
  period_start timestamptz,
  period_end timestamptz NOT NULL,
  source_system text NOT NULL,
  source_reference text NOT NULL,
  calculated_by text NOT NULL,
  validated_by text NOT NULL,
  validated_at timestamptz NOT NULL,
  freshness_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, metric_key, period_end)
);

CREATE INDEX owner_metrics_project_period_idx ON owner_metric_snapshots (project_id, period_end DESC);

CREATE TABLE portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_name text NOT NULL,
  client_or_agency text,
  location_text text,
  attribution_type text NOT NULL CHECK (attribution_type IN ('corporate', 'key_person', 'subcontract', 'teaming_partner')),
  contracting_entity text,
  contract_role text NOT NULL,
  scope text NOT NULL,
  contract_value numeric(16,2),
  performance_start date,
  performance_end date,
  outcomes jsonb NOT NULL DEFAULT '{}'::jsonb,
  reference_authorized boolean NOT NULL DEFAULT false,
  media_authorized boolean NOT NULL DEFAULT false,
  evidence_ref text NOT NULL,
  release_status approval_status NOT NULL DEFAULT 'pending',
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE training_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  learner_subject_ref text NOT NULL,
  track text NOT NULL,
  stage text NOT NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  evaluator text,
  evaluation_status approval_status NOT NULL DEFAULT 'pending',
  evidence_ref text,
  deployment_eligible boolean NOT NULL DEFAULT false
);

CREATE TABLE agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  agent_id text NOT NULL,
  agent_version text NOT NULL,
  prompt_version text NOT NULL,
  tool_versions jsonb NOT NULL DEFAULT '{}'::jsonb,
  actor_identity text NOT NULL,
  input_source_refs jsonb NOT NULL,
  output_ref text,
  result_status text NOT NULL,
  abstained boolean NOT NULL DEFAULT false,
  approval_required boolean NOT NULL DEFAULT true,
  approved_by text,
  approved_at timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX agent_runs_project_agent_idx ON agent_runs (project_id, agent_id, started_at DESC);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  actor_type text NOT NULL,
  actor_id text NOT NULL,
  action text NOT NULL,
  object_type text NOT NULL,
  object_id text NOT NULL,
  source_ip_hash text,
  correlation_id text,
  before_hash text,
  after_hash text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX audit_project_time_idx ON audit_events (project_id, occurred_at DESC);
CREATE INDEX audit_correlation_idx ON audit_events (correlation_id);

-- Recommended production controls (implemented at deployment layer):
-- 1. Row-level security by organization/project and role.
-- 2. Immutable audit-event write path with restricted UPDATE/DELETE.
-- 3. Encrypted secrets/PII outside general project tables.
-- 4. Object-storage checksums and signed access for CDE attachments.
-- 5. Migration-only DDL permissions in production.
-- 6. Backup/restore validation and retention policy.
-- 7. Application-level idempotency keys on mutations.
