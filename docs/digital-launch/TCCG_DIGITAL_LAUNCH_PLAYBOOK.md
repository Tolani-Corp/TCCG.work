# TCCG Digital Launch Playbook

**Version:** 2026.1  
**Owner:** TC Construction Group  
**Supporting organization:** Tolani Labs  
**Purpose:** Establish a controlled, technology-forward operating baseline for preconstruction, delivery, workforce development, owner reporting, risk transfer, and government-contracting readiness.

## 1. Operating principle

TCCG will operate from evidence, not presentation. A website page, database row, certificate placeholder, vendor target, portfolio shell, or AI-generated recommendation does not establish a real-world fact. External items are represented as **targets**, **pending verification**, or **active only after documentary evidence is attached**.

The Digital Launch Phase uses four layers:

1. **Standards** — BIM, CDE, cost codes, project templates, QA and HSE requirements.
2. **Registries** — estimating assemblies, subcontractor prequalification, procurement, vendors, risk transfer, government readiness and portfolio evidence.
3. **Workflows** — preconstruction through closeout with defined inputs, owners, evidence and exit criteria.
4. **Automation** — dashboards and AI staff agents that read governed data and produce reviewable recommendations.

## 2. BIM standard

TCCG-BIM-STD-2026.1 uses the ISO 19650 information-management model as its reference framework.

### Required project BIM Execution Plan

Every BIM-enabled project must define:

- employer/owner information requirements where provided;
- project information requirements;
- model uses and exchange milestones;
- discipline authoring responsibility;
- coordinates, levels and grid control;
- model federation method;
- information container naming;
- revision/status conventions;
- required parameters and classification;
- issue and clash-management workflow;
- model quality checks;
- information security classification;
- record-model and closeout requirements.

### TCCG file/container naming

`TCCG-{project}-{originator}-{zone}-{level}-{type}-{role}-{number}-{revision}`

Project BEPs may add owner-mandated fields but may not remove project, originator, content type, unique number, revision, status or approval metadata.

### BIM issue rule

No clash or model issue is considered closed without:

- issue identifier;
- model/view reference;
- description;
- responsible party;
- due date;
- disposition;
- verification evidence;
- closure approval.

## 3. Common Data Environment

TCCG-CDE-2026.1 uses four information states:

| State | Purpose | Minimum rule |
|---|---|---|
| WIP | Authoring team work | Not approved for downstream reliance |
| SHARED | Coordination/review | Available to authorized project participants |
| PUBLISHED | Approved use | Formal authorized project information |
| ARCHIVE | Record/superseded | Immutable historic record |

### Mandatory metadata

Project, container ID, title, originator, discipline, revision, status, classification, creator, created date, approver, approval date and sensitivity.

### Security controls

- role-based access;
- MFA at the CDE provider;
- least privilege;
- controlled external sharing;
- audit history;
- documented retention;
- immediate access revocation at offboarding;
- heightened controls for sensitive owner, government, security, building-control or personal data.

### Production-provider gate

The information-state model is implemented in code. Production readiness requires TCCG to select and bind the operational CDE provider, configure permissions, retention, backup, project templates and audit exports, and run an access-control test with internal and external users.

## 4. Estimating database

The estimating registry must keep four values separate:

- quantity;
- labor productivity;
- material/equipment quote;
- commercial adjustment/risk.

No AI agent may invent material pricing. An assembly with no current supplier quote carries a zero material allowance plus a quote-required state. Every live quote should capture vendor, quote number, date, expiration, scope, exclusions, freight, tax, lead time, escalation and attachment/reference.

### Estimate review gates

1. current bid documents confirmed;
2. scope matrix complete;
3. quantities reviewed;
4. subcontractor/vendor coverage assessed;
5. quote scope leveled;
6. general conditions modeled;
7. schedule implications reviewed;
8. bond/insurance/tax included where applicable;
9. exclusions/allowances/alternates explicit;
10. independent estimate reconciliation complete;
11. executive bid authorization recorded.

## 5. Subcontractor database

A subcontractor becomes **qualified** only after the required prequalification evidence is current.

Suggested fields:

- legal name and DBA;
- W-9 / tax record;
- trade and geography;
- licenses;
- safety statistics and narrative;
- EMR where applicable;
- OSHA history review;
- insurance and limits;
- bonding capacity/reference;
- financial/capacity review appropriate to exposure;
- workforce and supervision capacity;
- relevant project experience;
- diversity/certification evidence;
- references;
- quality history;
- schedule performance;
- claims/default issues;
- prequalification expiration.

The repository starts with clearly labeled qualification slots, not fabricated subcontractor identities.

## 6. Cost-code system

TCCG uses an internal code structure that maintains continuity from estimate to commitment, field cost, change management, forecast and closeout. Codes reference common construction-division groupings while remaining TCCG-controlled.

Rules:

- one cost code for each managed cost bucket;
- estimate items map to cost code before bid approval;
- subcontracts and POs inherit cost code;
- change events inherit affected cost code;
- forecast uses the same code;
- accounting mapping is maintained separately so the operations taxonomy is not broken by accounting-platform changes.

## 7. Procurement system

Workflow:

`Demand capture -> Source -> Level bids -> Technical approval -> Commercial release -> Expedite -> Receive/inspect -> Close/score`

### Long-lead trigger

An item enters the long-lead register when procurement duration plus approval duration plus logistics plus contingency approaches or exceeds schedule float to the required-on-site date.

Each entry must include:

- required-on-site date;
- submittal required date;
- approval status;
- release date;
- manufacturer lead time;
- ship date;
- delivery date;
- responsible owner;
- current risk;
- recovery options.

## 8. Quality-control workflow

TCCG QC uses a five-stage evidence model:

1. preparatory phase;
2. initial inspection;
3. follow-up inspections;
4. deficiency/NCR control;
5. turnover quality gate.

Trade inspection plans should define acceptance criteria, hold/witness points, required tests, inspection frequency, responsible party and evidence format.

No NCR closes on verbal confirmation alone.

## 9. HSE workflow

The HSE system is designed around proactive hazard identification and OSHA construction safety-program principles.

Core cycle:

`Plan -> Pre-task assessment -> Observe -> Correct -> Incident/near miss -> Learn`

Every project must name responsible managers and competent persons required for the work, establish site-specific emergency procedures, conduct pre-task hazard assessment, track corrective actions and maintain evidence of training/briefing.

AI safety agents may detect patterns and draft recommendations; they do not replace competent-person decisions, regulatory determinations, incident-reporting judgment or site authority.

## 10. Owner dashboards

Owner dashboards are a reporting view over source systems; they are not the source system themselves.

Minimum reporting contract:

- schedule: baseline/current milestones, lookahead, constraints and delay risks;
- cost: contract, changes, forecast, contingency;
- design: RFI and submittal status/aging;
- quality: inspections, deficiencies, NCRs and punch;
- HSE: observations, corrective actions, near misses and incidents;
- procurement: long-lead and late-risk items;
- ESG/performance: evidence-backed sustainability and commissioning metrics.

A dashboard metric must expose its source and reporting period.

## 11. Project templates

Initial controlled templates:

- Commercial GC;
- HVAC retrofit/controls;
- BIM/VDC coordination;
- Federal construction/small works.

Each template must instantiate:

- folder/CDE structure;
- project role matrix;
- cost codes;
- schedule skeleton;
- risk register;
- RFI/submittal/change logs;
- procurement log;
- QC inspection plan;
- HSE plan shell;
- daily report;
- owner-reporting package;
- closeout checklist.

## 12. Preconstruction process

`Opportunity intake -> Bid/no-bid -> Document control -> Scope extraction -> Market coverage -> Estimate reconciliation -> Proposal/compliance -> Award turnover`

### Bid/no-bid factors

Strategic fit, customer quality, geography, licensing, bonding, insurance, contract terms, schedule, staff capacity, subcontractor coverage, design completeness, cash-flow burden, competition, margin potential and government/compliance burden.

## 13. Capabilities statement

The controlled external capability statement is maintained separately in `docs/growth/TCCG_CAPABILITIES_STATEMENT.md`.

Rules:

- do not print UEI/CAGE until verified;
- do not state state-license status until confirmed;
- do not state SDVOSB/VOSB or other certification unless active and applicable to the entity offering;
- do not state bonding capacity without current written surety indication;
- do not state revenue, project count, years of experience or past-performance value without support;
- include contact, service area, NAICS, differentiators, core competencies and verified project sheets.

## 14. Website and portfolio

The public website should funnel visitors into four primary actions:

- request a project consultation;
- request service/HVAC response;
- invite TCCG to bid;
- explore technology/BIM capability.

The portfolio is evidence-gated. Required case-study evidence is encoded in `portfolioPolicy` within `src/lib/digitalLaunch.ts`.

The `/digital-launch` route is the internal/public operating-system demonstration. Sensitive production data should later move behind role-based access.

## 15. Tolani Labs training pipeline

Pipeline:

`Foundation -> Role track -> Simulation -> Internship -> Deployment -> Continuous learning`

Priority role tracks:

- BIM/Revit/VDC;
- estimating and quantity takeoff;
- project controls;
- QA/QC;
- HSE;
- field documentation;
- procurement/submittals;
- HVAC controls and building performance.

Training completion alone does not authorize independent project decisions. Role qualification must include evaluated work products and supervised field/production evidence.

## 16. AI staff prototypes

The first 14 prototypes are:

- Preconstruction;
- Estimating;
- Drawing;
- RFI;
- Submittal;
- Schedule;
- Procurement;
- Safety;
- QC;
- Daily Log;
- Change;
- Cost;
- Closeout;
- Lessons.

Design policy:

- governed data only;
- evidence citations in outputs;
- no autonomous contract, safety-critical, financial-commitment or regulatory decisions;
- no autonomous external submission;
- human approval before material project action;
- evaluations before production access;
- audit log for agent inputs, outputs and approvals;
- prompt/tool versioning;
- project/tenant isolation.

## 17. Vendor relationships

The registry contains relationship **targets**, not claimed partnerships. Initial categories:

- BIM/CDE;
- HVAC equipment;
- building controls;
- electrical/energy management;
- MRO and jobsite supply;
- specialty distributors;
- government-capable distributors.

A relationship becomes active only when supported by account/channel documentation, authorized-distributor status where relevant, negotiated terms, credit terms or executed agreement.

## 18. Bonding and insurance

TCCG should establish a construction-focused insurance broker and surety relationship before pursuing work where those instruments are gating factors.

Readiness package:

- organizational documents;
- ownership information;
- resumes/key-person experience;
- current financial statements;
- work-in-progress schedule;
- accounts receivable/payable aging where requested;
- bank relationship and line information;
- tax returns where underwriting requires;
- project history;
- backlog/pipeline;
- subcontractor/vendor strategy;
- internal estimating/job-cost controls.

For eligible federal construction contracts, FAR 28.102 requires performance/payment bonds above the applicable threshold and alternative payment protections for certain lower-value construction awards. Always use the solicitation/current FAR text as the controlling requirement.

The SBA Surety Bond Guarantee program is an available capacity-development route for eligible small businesses and should be assessed with a participating surety/broker when conventional bonding is insufficient.

## 19. Government registration readiness

Federal readiness checklist:

1. SAM.gov registration active for the bidding entity.
2. UEI verified.
3. CAGE verified where assigned/required.
4. NAICS and current SBA size-standard analysis.
5. SAM representations and certifications accurate.
6. SBA Small Business Search profile complete.
7. VetCert/SDVOSB status verified where applicable and active.
8. state/local contractor licenses verified for intended scope/location.
9. capability statement and project sheets evidence-backed.
10. bonding and insurance path established.
11. solicitation compliance matrix template ready.
12. wage determination/labor clause review process ready.
13. cybersecurity/information requirements assessed before receiving protected information.
14. APEX Accelerator review used as a no-cost external readiness check when useful.

SAM.gov states that active entity registration is required to bid directly on federal awards and registration must be renewed every 365 days.

## 20. 90-day launch sequence

### Days 0-30 — control the baseline

- approve BIM/CDE standards;
- select production CDE;
- map cost codes to accounting;
- load first 25 real subcontractor prequalifications;
- load supplier quotes into estimating registry;
- bind broker/surety advisory relationships;
- verify government identifiers and registrations;
- verify portfolio claims;
- pilot one project template.

### Days 31-60 — run live workflows

- execute one real bid/no-bid;
- run estimate reconciliation;
- release a controlled procurement package;
- issue weekly owner dashboard;
- run QC/HSE workflows on a pilot project;
- evaluate 14 agents against synthetic and historical fixtures;
- enroll first Tolani Labs role-track cohort.

### Days 61-90 — commercialize and scale

- publish verified capability statement and case studies;
- launch vendor/surety/insurance scorecards;
- connect dashboards to systems of record;
- place approved agents behind project permissions;
- perform government capture readiness review;
- perform executive launch review and close remaining gates.

## 21. Primary references

- SAM.gov Entity Registration: https://sam.gov/entity-registration
- SBA Veteran Contracting Assistance: https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs
- SBA Small Business Search / account portals: https://www.sba.gov/about-sba/open-government/about-sbagov-website/sba-account-login-registration-portals
- SBA Surety Bonds: https://www.sba.gov/surety-bonds
- FAR 28.102: https://www.acquisition.gov/far/28.102-1
- OSHA Construction Safety and Health Program: https://www.osha.gov/etools/construction/safety-health-program
- ISO 19650-1: https://www.iso.org/standard/68078.html
- ISO 19650-2: https://www.iso.org/standard/68080.html
- ISO 19650-5: https://www.iso.org/standard/74206.html
- ISO 19650-6: https://www.iso.org/standard/82705.html
