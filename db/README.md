# TCCG Operational Database

`schema.sql` is the provider-neutral PostgreSQL logical model for the Digital Launch data plane. It is intentionally **not** auto-applied from the application because TCCG has not yet bound a production database/provider, identity model, backup policy or migration authority.

## What the schema covers

- organizations and projects;
- CDE document metadata and revision/state control;
- cost codes;
- estimates and estimate items;
- vendors and quote provenance;
- subcontractors and prequalifications;
- procurement / long-lead records;
- QC inspections;
- HSE observations/corrective actions;
- owner metric snapshots with source and validation evidence;
- evidence-gated portfolio projects;
- Tolani Labs training assignments;
- governed AI-agent runs;
- audit events.

## Production binding sequence

1. Select the production PostgreSQL-compatible provider.
2. Create separate development, preview/staging and production databases.
3. Select migration tooling and commit numbered migrations; do not run ad-hoc production DDL.
4. Bind organization/project identity and role model.
5. Enable row-level security or equivalent authorization controls.
6. Define object-storage provider for documents/evidence; store references/checksums in PostgreSQL, not large construction files in relational rows.
7. Create backup, point-in-time recovery and restore-test policy.
8. Add connection pooling and least-privilege application credentials.
9. Implement mutation idempotency and immutable audit delivery.
10. Seed cost codes and approved configuration from the Digital Launch registry.
11. Migrate the read-only `/api/digital-launch` configuration into database-backed operational endpoints only after data validation.
12. Run tenant/project-isolation, permission, backup/restore and audit tests before production activation.

## Separation of concerns

- **Source-controlled configuration:** standards, default cost codes, workflow templates, agent manifests, schemas.
- **Relational operational data:** projects, estimates, procurement, inspections, observations, approvals, metrics.
- **CDE/object storage:** drawings, models, specifications, photos, O&M manuals and other large files.
- **Audit/evidence:** immutable action records plus content hashes/references.
- **Analytics:** derived owner/KPI snapshots with source and validation metadata.

## No fake persistence

The current Digital Launch UI and API use source-controlled seed/configuration data. They should not be described as a live multi-user database until the steps above are completed and the application is connected to the selected provider.
