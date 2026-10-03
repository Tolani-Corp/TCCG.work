# Commercial Context

TCCG consumes the Tolani Commercial Context Plane v1 from `Tolani-Corp/TolaniCorp-HQ` while retaining local authority for TCCG offers, evidence, compliance, delivery claims, and visual expression.

Public acquisition leads with the opportunity-specific project-review path rather than internal launch maturity. Agents must load `config/public-product-context.json` before editing marketing copy, capabilities, licenses, project claims, SEO, campaigns, or CTAs.

Licensing and geography, bonding, insurance, government identifiers/certifications, past performance, partner status, supplier pricing, service area, project availability, and capacity require current opportunity-specific evidence before external use.

The primary conversion contract is `Request project review` → `TCCG Growth / Preconstruction` → `project_review_received`. The primary operational handoff is `POST /api/intake`. It may be described as a durable project-review receipt only when the configured downstream endpoint accepts the request and returns a reference; it must not be described as a CRM lead or accepted project unless that downstream system independently establishes that state.


## Paid-acquisition handoff gate

The primary project-review path uses `POST /api/intake`. A successful conversion exists only when the configured downstream endpoint accepts the request and the API returns a reference.

Durable acquisition therefore requires production configuration for `TCCG_INTAKE_WEBHOOK_URL`. The email path remains a user-controlled fallback at `mailto:info@tccg.work` and must not be counted as a durable lead merely because an email draft was prepared.
