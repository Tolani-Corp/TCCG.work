# TCCG Research Lessons and Program Design Adapter

Status: controlled implementation candidate. This adapter does not authorize project action, contract commitment, financial commitment, safety authority, regulatory determination, policy activation, production mutation, merge, or deployment.

## Purpose

TCCG has two controlled organizational-learning channels:

1. verified operational/project lessons; and
2. Z4-approved research lessons supplied through Tolani Labs shared infrastructure.

Raw public URLs, videos, articles, transcripts, model summaries, or unreviewed DEBO output are discovery inputs only. They cannot become authoritative project guidance inside TCCG.

## Admission path

```text
verified project outcome OR Z4-approved research lesson
  -> tenant/project permission validation
  -> evidence validity and freshness check
  -> conflict/supersession check
  -> TCCG impact classification
  -> Program Design requirement check
  -> Human Comprehension requirement check
  -> AG-LESSON human-review candidate
  -> functional owner / Tolani Labs review
```

The output remains a candidate. It does not execute the proposed change.

## Impact domains

The adapter classifies lessons against BIM/VDC, CDE, estimating, cost codes, subcontractors, procurement, QC, HSE, owner dashboards, project templates, preconstruction, capabilities/portfolio, Tolani Labs training, AI agents, vendors, bonding/insurance, and government contracting.

## Allowed dispositions

- `NO_ACTION`
- `MONITOR`
- `DOCUMENT_UPDATE`
- `TRAINING_UPDATE`
- `EVALUATION_UPDATE`
- `PROCESS_UPDATE`
- `SOFTWARE_CHANGE`
- `SKILL_CANDIDATE`
- `TOOL_CANDIDATE`
- `DETERMINISTIC_CAPABILITY_CANDIDATE`
- `POLICY_REVIEW`

A disposition is a proposed follow-on action class, not authorization to perform the action.

## Program Design Gate

A lesson requires an approved Tolani Program Design bundle when it proposes a substantial software change, workflow/process change, controlled-standard/document update, skill/tool candidate, deterministic capability, or policy review.

The TCCG adapter records only the bundle identifier and approval state. Tolani Labs remains the shared Program Design authority. TCCG does not fork or weaken that contract.

## Human Comprehension Gate

For medium/high-risk digital-process changes:

- medium risk requires passing evidence at or above 0.80;
- high risk requires passing evidence at or above 0.90;
- high risk additionally requires named release authority review.

Comprehension evidence is a release-evidence signal. It does not itself approve a release.

## Authority boundaries

The adapter always returns the following controls as false:

- execution authority;
- external submission;
- contract commitment;
- financial commitment;
- safety authority;
- policy activation.

Safety-related lessons add an authorized safety professional/site-leadership review requirement. Contract-related lessons add project-manager/contract-authority review. Cost-related lessons add project-manager/project-controls review.

## Research requirements

Research lessons require:

- Z4 approval status = `approved`;
- a Z4 lesson identifier;
- at least one claim-supporting evidence record;
- matching tenant/project permissions;
- no unresolved conflict;
- no superseded/revoked claim support;
- no use of an unavailable source as claim support.

An unavailable source may remain in provenance as a non-supporting record, but it cannot support the lesson claim.

## Evaluation fixtures

`agents/construction-staff/evals/lesson-governance-cases.json` covers:

- unavailable research source;
- unresolved conflicting lesson;
- superseded lesson;
- cross-tenant evidence denial;
- normal operational lesson;
- high-risk safety/software lesson;
- missing Program Design bundle;
- raw external content denial.

Run:

```bash
pnpm tccg:lessons:validate
```

The validator also asserts that no fixture can grant execution, submission, contract, financial, safety, or policy authority.

## Shared-service integration boundary

The current implementation is provider-neutral and deliberately does not expose a public lesson-ingestion endpoint. After the Tolani Labs Program Design, Research Evidence Intake, Human Comprehension, and Z4 contracts land, TCCG may bind their authenticated service interfaces to this adapter. Any future transport must preserve the same admission rules and project isolation.
