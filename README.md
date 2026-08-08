# TC Construction Group (TCCG)

**Building Beyond** — technology-forward construction, HVAC, BIM/VDC and building-performance delivery.

[![Website](https://img.shields.io/badge/Website-tccg.work-blue)](https://tccg.work)
[![Tolani Corp](https://img.shields.io/badge/Ecosystem-Tolani%20Corp-red)](https://tolanicorp.us)

## Overview

TCCG is developing an evidence-first digital construction operating model that connects preconstruction, estimating, BIM/VDC, procurement, field execution, quality, safety, owner reporting, closeout and workforce development.

**Part of the [Tolani Corp](https://tolanicorp.us) ecosystem.**

## Digital Launch Phase

The Digital Launch baseline is implemented in this repository and includes:

- BIM standards and BIM Execution Plan rules;
- Common Data Environment information-state and metadata controls;
- TCCG cost-code taxonomy;
- estimating assemblies with quote-provenance requirements;
- subcontractor prequalification registry;
- procurement and long-lead workflow;
- quality-control and HSE workflows;
- owner-dashboard data contract;
- commercial GC, HVAC, BIM/VDC and federal-small-works project templates;
- preconstruction bid/no-bid through award-turnover workflow;
- controlled capabilities-statement source;
- evidence-gated portfolio policy;
- Tolani Labs training pipeline;
- 14 governed construction staff-agent prototypes;
- vendor relationship targets;
- bonding/insurance readiness controls;
- federal government registration/readiness register.

### Routes

| Route | Purpose |
|---|---|
| `/` | Public TCCG website |
| `/operations` | Construction operations platform |
| `/digital-launch` | Digital Launch command center |
| `/api/digital-launch` | Machine-readable Digital Launch registry |

The API accepts a `section` query parameter for individual registries, for example `/api/digital-launch?section=costCodes`.

## Operating controls

This repository does **not** treat placeholders as facts. TCCG must verify the following before external representation:

- project counts, values, dates and client references;
- licenses and certifications;
- SAM/UEI/CAGE status;
- SBA certification status;
- bonding capacity;
- insurance limits;
- vendor/channel relationships;
- subcontractor qualification status;
- current supplier pricing.

See:

- `docs/digital-launch/TCCG_DIGITAL_LAUNCH_PLAYBOOK.md`
- `docs/growth/TCCG_CAPABILITIES_STATEMENT.md`

## Core service architecture

| Service line | Digital support |
|---|---|
| Commercial construction | Preconstruction, project controls, procurement, QC/HSE, owner reporting |
| HVAC / controls | Estimating assemblies, long-lead tracking, commissioning and owner training |
| BIM / VDC | ISO 19650-aligned information-management baseline and CDE workflow |
| Government construction | Registration, compliance, bonding and proposal-readiness gates |
| Digital delivery | Controlled dashboards, evidence registries and AI-assisted staff workflows |

## Technology stack

- **Framework:** Next.js 15
- **UI:** React 19 + Tailwind CSS
- **Identity:** Clerk
- **Deployment target:** Vercel-compatible Next.js deployment
- **Package manager:** pnpm 9.15
- **Runtime:** Node.js 20+

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

## Verification

Pull requests targeting `master` run `.github/workflows/digital-launch-ci.yml`, which installs with the lockfile, confirms Digital Launch source artifacts are present and runs the production Next.js build.

## Contact

- **Website:** https://tccg.work
- **Email:** info@tccg.work

---

© 2026 TC Construction Group. A Tolani Corp company.
