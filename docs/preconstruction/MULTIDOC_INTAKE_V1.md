# TCCG | Secure Multi-Document Preconstruction Intake V1

**Status:** bounded implementation; production NO-GO until provider bindings, scanning, independent security evaluation and database sync receipts.
**Product owner:** TC Construction Group / Growth and Preconstruction. **Engineering owner:** Tolani Labs.

## Deployment paths

- Public project intake: /contact. The existing text-only POST /api/intake remains in place.
- New multi-file API: POST /api/intake/documents.
- Private Cloudflare receiver: POST /v1/intake/documents (infra/cloudflare/tccg-intake-worker.mjs).
- Private files: R2 binding INTAKE_DOCUMENTS.
- Durable local intake ledger: D1 binding INTAKE_DB.
- Enterprise mirror: PostgreSQL/Neon in the tccg_preconstruction schema, delivered through a signed and idempotent outbox consumer.

## Acceptance

1. Require project scope and contact details, consent, and confirmation that submitter is authorized to share non-restricted information. Never use public intake for CUI, classified, export-controlled, medical, financial-card or other highly sensitive information.
2. Maximum 12 files, 8 MiB each, 24 MiB combined. Allowed PDF, DOCX, XLSX, PPTX, ZIP, TXT, CSV, PNG, JPG/JPEG. Check extension and magic signature; ZIP / Office files require post-upload safe archive analysis.
3. The Next.js server computes a SHA-256 digest for each file, signs the package manifest and sends it to the approved HTTPS Worker endpoint. The Worker independently verifies the HMAC, timestamps, manifest hash, file names, counts, lengths and SHA-256 digests.
4. The Worker writes original bytes to *private* R2 in quarantine and commits a D1 ledger, document rows, AG-PRECON hold and outbox event. Only a full matching receipt is considered successful. On uncertainty or partial failure, return an error, never a success claim.
5. No user document is indexed, parsed by agents, published, publicly exposed or shared to third-party model providers before malware screening, archive inspection, rights and sensitivity checks, retention policy verification, and human approval.
6. A scheduled enterprise outbox posts event ID, reference and checksum-only metadata to an HMAC-protected receiver. The receiving system must persist it transactionally, deduplicate by event ID and acknowledge the same ID. Pending outbox is not a successful enterprise sync.
7. Only after clearance do project-scoped, read-only construction agents receive vetted source extracts with revision, hash, page or sheet references. Agent conclusions remain recommendations awaiting authorized human review.

## Jacob City acceptance fixture

- Week 1 proposal: a fictitious six-acre course site. Scope: five duplexes and ten residential units, approximately 16,500 SF.
- Revised logistics plan: identifies parent parcel 27-6N-12-0000-0040-0040, 13.63 acres; Phase 1 ~6.0 gross acres, future reserve ~7.63 acres. The source describes this as verified geometry, but our engineering review has not independently verified title, deed, survey or development approvals.
- Final capstone package README: five duplexes / 10 units; planning CMAR; 60-week (~14-month) schedule; ROM hard cost $4,083,024 and ROM total budget $4,695,477.
- Intake must detect and retain both the Week 1 hypothetical-site baseline and the revised specific-parcel baseline, mark the revision pending human review, and never silently overwrite them.
- Missing evidence includes signed survey, civil design, geotechnical, floodplain/wetland findings, access authority, utility will-serve, zoning and density, cost quotes, owner identity/authorization, licensed personnel and bonding/insurance qualification.
- Academic capstone materials are a **simulation fixture**, not signed construction documents, government approvals, executed contract, or proven corporate past performance.

## Controlled consultation lanes

| Gate | Agent / owner | Draft only | Reviewer |
|---|---|---|---|
| Ingestion and security | Records + security | manifest, hashes, quarantine + scan outcome | designated reviewer |
| Evidence reconciliation | AG-PRECON | scope and revision matrix, project assumptions | preconstruction lead |
| Conceptual estimate | AG-EST | ROM reconciliation, CSI gaps, quote dependencies | estimator |
| CPM schedule | AG-SCHED | 60-week baseline, constraints, sequencing | scheduler |
| Site / drawing review | AG-DWG | logistics and missing technical exhibits | civil/design lead |
| Procurement | AG-PROC | trade packages, long-lead candidates | procurement lead |
| Regulatory/HSE | Human-led | AHJ, land use, stormwater, site safety gaps | authorized qualified professional |

V1 **queues AG-PRECON as awaiting_document_clearance**, but does not execute an AI model or claim a completed consultation. Downstream agents are gated on successful clearance and signed human authorization.

## Provisioning and release

1. Create isolated private R2 bucket and D1 database. Apply db/migrations/20261022_tccg_multidoc_intake_d1.sql.
2. Bind private Worker variables INTAKE_DOCUMENTS and INTAKE_DB. Add server-only TCCG_DOCUMENT_INGEST_SECRET (same on Worker and Next.js) and set Next.js TCCG_DOCUMENT_INGEST_URL to the Worker HTTPS route.
3. Configure a malware and compressed-archive scanner, quarantine access policy, retention/deletion, and identity-bound human clearance. Do not automatically clear ZIP or Office documents.
4. Apply db/migrations/20261022_tccg_enterprise_intake_pg.sql on an isolated Neon branch; implement the HMAC-verified enterprise outbox event receiver and grant only a dedicated least-privilege service identity.
5. Configure Worker ENTERPRISE_SYNC_URL and ENTERPRISE_SYNC_SECRET, cron schedule, idempotency and retry. Prove matched D1 and Postgres receipts, duplicate protection and outage replay.
6. Validate negative cases: malicious files, nested ZIPs, zip slip/bomb, oversized files, wrong type, replay signatures, wrong checksum, lost receipts, duplicate revisions, corrupted estimates and permission isolation.
7. Require exact-SHA CI, staging receipt, credentialed end-to-end tests, security review and a separate production GO decision.

**Explicit limitations:** Existing webhook-only plain-text submissions remain unchanged. Document uploads return service unavailable until Worker and storage bindings are configured. No live enterprise database synchronization or executed agent consultation should be claimed from committed code alone.
