# TCCG Common Data Environment Implementation Plan

**Baseline provider:** Autodesk Forma Data Management (formerly Autodesk Docs)  
**Status:** Selected architecture target; production account/hub/project binding still required.  
**Standard:** TCCG-CDE-2026.1 with ISO 19650-aligned information-state controls.

## Why this baseline

Autodesk renamed Autodesk Docs to **Forma Data Management** in March 2026. Autodesk positions Forma Data Management as its cloud-based common data environment for AECO and provides controlled file/version management, browser viewing, markups, permissions, approvals, metadata-driven workflows, automation, Insights and API access depending on tier.

This aligns with TCCG's requirements for BIM/VDC, Revit-centered project delivery, controlled project information and future API/MCP/agent integration.

Official current references:

- https://www.autodesk.com/products/forma-data-management/overview
- https://help.autodesk.com/view/DOCS/ENU/
- https://aps.autodesk.com/blog/get-know-new-autodesk-forma-industry-cloud
- https://www.autodesk.com/autodesk-university/article/ISO-19650-Common-Data-Environment-and-Autodesk-Construction-Cloud

## 1. CDE operating model

Technology does not establish a CDE by itself. TCCG will configure the provider around controlled information states, approvals, responsibility and audit evidence.

### TCCG information states

| TCCG state | Purpose | Access | Release authority |
|---|---|---|---|
| WIP | Authoring-team work | Originating team and approved reviewers | Originating discipline |
| SHARED | Coordination / review | Authorized project team | Discipline/project information lead |
| PUBLISHED | Approved project use | Authorized delivery/owner participants | Authorized project lead |
| ARCHIVE | Immutable record/superseded information | Controlled read access | System/information manager |

Do not rely only on folders to establish state. State must be represented by provider workflow/status metadata, approval history and permissions where the product supports it.

## 2. Project folder baseline

```text
00_PROJECT_ADMIN/
  01_Contracts/
  02_Contacts_Roles/
  03_Project_Execution_Plan/
  04_BIM_Execution_Plan/
  05_Risk_Compliance/
01_PRECONSTRUCTION/
  01_Bid_Documents/
  02_Addenda/
  03_Estimating/
  04_Quotes/
  05_Proposal/
02_DESIGN_BIM/
  01_WIP/
  02_SHARED/
  03_PUBLISHED/
  04_Coordination_Issues/
03_PROJECT_CONTROLS/
  01_Schedule/
  02_Cost/
  03_Changes/
  04_Owner_Reports/
04_RFIS_SUBMITTALS/
  01_RFIs/
  02_Submittals/
  03_Design_Directives/
05_PROCUREMENT/
  01_RFQs/
  02_Bid_Leveling/
  03_POs_Subcontracts/
  04_Long_Lead/
  05_Delivery_Evidence/
06_FIELD/
  01_Daily_Reports/
  02_Photos/
  03_Field_Reports/
  04_Layout_Verification/
07_QUALITY/
  01_ITPs_Checklists/
  02_Inspections/
  03_Test_Reports/
  04_NCRs_Deficiencies/
08_HSE/
  01_Project_Safety_Plan/
  02_JHA_JSA/
  03_Observations/
  04_Incidents_Near_Misses/
  05_Corrective_Actions/
09_COMMISSIONING_CLOSEOUT/
  01_Punch/
  02_Commissioning/
  03_OM_Manuals/
  04_Warranties/
  05_Training/
  06_As_Builts_Record_Model/
99_ARCHIVE/
```

Project-specific owner naming or filing requirements may supersede folder labels, but the information-state and audit controls remain mandatory.

## 3. Metadata baseline

Every controlled information container should expose, directly or through connected metadata:

- project;
- unique container/document ID;
- title;
- originator;
- discipline/role;
- zone/location;
- level where applicable;
- content/document type;
- revision;
- suitability/status;
- information state;
- sensitivity/classification;
- created by/date;
- review/approval owner;
- approval date;
- superseded/current indicator;
- contractual/record indicator where applicable.

## 4. Permissions model

Define permissions from roles, not individual convenience.

### Core role groups

- TCCG Executive / Project Sponsor
- Project Manager
- Superintendent
- Preconstruction / Estimating
- VDC / BIM
- Project Controls
- QC
- HSE
- Procurement
- Subcontractor — trade-specific
- Designer / Consultant
- Owner / Owner Representative
- Commissioning Agent
- Read-only Auditor / Reviewer

### Rules

- default deny for new external users;
- minimum required folder access;
- no uncontrolled public links for project-controlled information;
- separate subcontractor access by project/trade;
- owner access only to intended published/shared information;
- restrict contracts, claims, personnel, security and sensitive building information;
- revoke access immediately on offboarding;
- review external membership at least monthly on active projects;
- export access/audit evidence at closeout when required.

## 5. Naming convention

Default:

`TCCG-{project}-{originator}-{zone}-{level}-{type}-{role}-{number}-{revision}`

Do not encode sensitive data or human names into IDs unless required by the contract/project standard.

## 6. Workflow configuration

### Document release

`Author -> internal check -> discipline approval -> SHARED -> project review -> authorized approval -> PUBLISHED`

### Revision

- new revision retains unique container identity;
- prior published revision remains accessible as history/record;
- current-revision view is obvious to field users;
- superseded revisions are not silently overwritten;
- transmittal/approval evidence is preserved.

### Coordination

- issue ID;
- linked model/view/document;
- description;
- responsible party;
- due date;
- priority;
- disposition;
- evidence;
- verifier;
- closed date.

## 7. API / integration boundary

Forma Data Management offers API access in appropriate product tiers. TCCG should use APIs for controlled metadata/index synchronization, not bypass provider permissions.

Integration goals:

- sync document metadata into TCCG operational database;
- resolve controlled document links from project workflows;
- feed document revision/status into Drawing/RFI/Submittal agents;
- record source references in agent outputs;
- generate owner reporting links to published information;
- ingest only approved metadata/content into retrieval systems under project permissions.

Do not copy all CDE files into the application database or vector index.

## 8. AI/RAG rules for CDE content

- project and tenant isolation;
- permission check at retrieval time;
- revision/status filtering;
- default to current approved information for construction-use questions;
- make superseded information available only when the task explicitly requires history/comparison;
- preserve source document ID/revision/page or model reference;
- respect sensitivity classification;
- revocation from CDE must propagate to retrieval indexes;
- no training/fine-tuning on controlled project content without contractual/data-governance approval.

## 9. Production activation checklist

- [ ] Procure/assign Forma Data Management entitlement appropriate to required workflows/API access.
- [ ] Create TCCG account/hub and administrator ownership model.
- [ ] Create non-production pilot project.
- [ ] Configure role groups and folder permissions.
- [ ] Configure naming/metadata fields.
- [ ] Configure review/approval workflows.
- [ ] Configure transmittal and revision controls.
- [ ] Test WIP -> Shared -> Published -> Archive lifecycle.
- [ ] Test external subcontractor isolation.
- [ ] Test owner read-only/published access.
- [ ] Test access revocation.
- [ ] Test Desktop Connector / design-authoring workflows where used.
- [ ] Confirm API entitlement and create least-privilege integration identity.
- [ ] Export audit evidence.
- [ ] Run backup/export/closeout test.
- [ ] Approve pilot results before production project template is published.

## 10. Alternative-provider gate

TCCG may benchmark another CDE (including Procore or owner-mandated systems) when a project, client or commercial case requires it. Do not fragment internal standards: map alternative-provider permissions, statuses, revisions and approvals back to TCCG-CDE-2026.1.

As of July 2026, Procore's newer Document Management tool documentation states regional availability in the UK, Ireland, Australia and New Zealand and says it is not yet available for Procore accounts in the U.S. This does not prevent TCCG from using other Procore project/document features where appropriate, but it is a reason not to make that specific module the default U.S. CDE baseline today.
