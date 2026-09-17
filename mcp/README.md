# Tolani Labs — TCCG MCP / Agent Integration Baseline

This directory documents the machine-access layer for TC Construction Group's Digital Launch operating model.

## Source of truth

The current machine-readable registry is exposed by the Next.js application:

- `GET /api/digital-launch` — complete Digital Launch snapshot
- `GET /api/digital-launch?section=bimStandard`
- `GET /api/digital-launch?section=cdeStandard`
- `GET /api/digital-launch?section=costCodes`
- `GET /api/digital-launch?section=estimatingAssemblies`
- `GET /api/digital-launch?section=subcontractors`
- `GET /api/digital-launch?section=procurementWorkflow`
- `GET /api/digital-launch?section=qcWorkflow`
- `GET /api/digital-launch?section=hseWorkflow`
- `GET /api/digital-launch?section=ownerDashboardMetrics`
- `GET /api/digital-launch?section=projectTemplates`
- `GET /api/digital-launch?section=preconstructionProcess`
- `GET /api/digital-launch?section=capabilityStatement`
- `GET /api/digital-launch?section=trainingPipeline`
- `GET /api/digital-launch?section=agentPrototypes`
- `GET /api/digital-launch?section=vendorTargets`
- `GET /api/digital-launch?section=riskTransferReadiness`
- `GET /api/digital-launch?section=governmentReadiness`

The construction staff package is defined at:

- `agents/construction-staff/manifest.json`

## MCP design rule

A future TCCG MCP server should be an adapter over governed project sources, not a second database. Tools should return source identifiers, revision/status, permission context and timestamps with every material response.

### Proposed read tools

- `tccg.project.get`
- `tccg.documents.search`
- `tccg.documents.compare`
- `tccg.costcodes.list`
- `tccg.estimate.get`
- `tccg.quotes.search`
- `tccg.subcontractors.search`
- `tccg.procurement.get`
- `tccg.rfis.search`
- `tccg.submittals.search`
- `tccg.schedule.get`
- `tccg.qc.inspections.search`
- `tccg.hse.observations.search`
- `tccg.closeout.status`

### Proposed controlled write tools

Writes must enforce authorization, idempotency, audit evidence and project isolation:

- `tccg.rfi.create_draft`
- `tccg.submittal.update_draft`
- `tccg.procurement.create_draft`
- `tccg.qc.create_observation`
- `tccg.hse.create_observation`
- `tccg.dailylog.create_draft`
- `tccg.change.create_candidate`
- `tccg.lesson.create_candidate`

No MCP tool should allow an AI agent to autonomously execute a contract, release payment, approve a safety-critical condition, certify regulatory compliance, submit a proposal/RFI externally, or alter an approved contractual baseline.

## Data governance

- project/tenant isolation is mandatory;
- role-based permissions are checked at tool execution time;
- CDE revision/status controls remain authoritative;
- agents must abstain when evidence is missing or conflicting;
- sensitive data must stay in approved systems/model contexts;
- all writes require audit identity, timestamp, source references and approval state;
- production access requires agent evaluation and functional-owner authorization.

## Relationship to Tolani Labs

Tolani Labs owns R&D, training, evaluation harnesses and reusable agent/tool engineering. TCCG remains the construction product owner and authority for project processes, standards, risk acceptance and deployment approval.
