#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const args = process.argv.slice(2);

function value(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function has(flag) {
  return args.includes(flag);
}

function slugify(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const templates = {
  "commercial-gc": {
    name: "Commercial GC",
    stages: ["intake", "preconstruction", "contract", "mobilization", "construction", "commissioning", "closeout", "warranty"],
    requiredArtifacts: ["project execution plan", "BIM/CDE plan as applicable", "baseline estimate", "baseline schedule", "risk register", "QC plan", "site-specific HSE plan", "procurement log", "owner reporting matrix", "closeout matrix"],
  },
  "hvac-retrofit": {
    name: "HVAC Retrofit / Controls",
    stages: ["survey", "basis-of-design", "estimate", "submittal", "procure", "install", "TAB-commission", "owner-training", "closeout"],
    requiredArtifacts: ["existing-conditions survey", "equipment schedule", "controls narrative", "estimate", "submittal register", "long-lead log", "shutdown/cutover plan", "startup/TAB/commissioning evidence", "owner training record", "warranty package"],
  },
  "bim-vdc": {
    name: "BIM / VDC Coordination",
    stages: ["BEP", "model-intake", "federation", "coordination-cycle", "RFI-support", "approved-coordination", "field-handoff", "record-model"],
    requiredArtifacts: ["BIM Execution Plan", "model responsibility matrix", "coordinates/levels/grids validation", "federated model register", "issue register", "coordination meeting record", "approved coordination package", "record-model checklist"],
  },
  "federal-small-works": {
    name: "Federal Construction / Small Works",
    stages: ["opportunity-review", "compliance-matrix", "estimate", "bonding-gate", "proposal", "award-turnover", "construction", "contract-closeout"],
    requiredArtifacts: ["solicitation index", "amendment log", "bid/no-bid decision", "compliance matrix", "representations/certifications check", "bonding review", "estimate", "proposal authorization", "award turnover", "contract closeout matrix"],
  },
};

const folderTree = [
  "00_PROJECT_ADMIN/01_Contracts",
  "00_PROJECT_ADMIN/02_Contacts_Roles",
  "00_PROJECT_ADMIN/03_Project_Execution_Plan",
  "00_PROJECT_ADMIN/04_BIM_Execution_Plan",
  "00_PROJECT_ADMIN/05_Risk_Compliance",
  "01_PRECONSTRUCTION/01_Bid_Documents",
  "01_PRECONSTRUCTION/02_Addenda",
  "01_PRECONSTRUCTION/03_Estimating",
  "01_PRECONSTRUCTION/04_Quotes",
  "01_PRECONSTRUCTION/05_Proposal",
  "02_DESIGN_BIM/01_WIP",
  "02_DESIGN_BIM/02_SHARED",
  "02_DESIGN_BIM/03_PUBLISHED",
  "02_DESIGN_BIM/04_Coordination_Issues",
  "03_PROJECT_CONTROLS/01_Schedule",
  "03_PROJECT_CONTROLS/02_Cost",
  "03_PROJECT_CONTROLS/03_Changes",
  "03_PROJECT_CONTROLS/04_Owner_Reports",
  "04_RFIS_SUBMITTALS/01_RFIs",
  "04_RFIS_SUBMITTALS/02_Submittals",
  "04_RFIS_SUBMITTALS/03_Design_Directives",
  "05_PROCUREMENT/01_RFQs",
  "05_PROCUREMENT/02_Bid_Leveling",
  "05_PROCUREMENT/03_POs_Subcontracts",
  "05_PROCUREMENT/04_Long_Lead",
  "05_PROCUREMENT/05_Delivery_Evidence",
  "06_FIELD/01_Daily_Reports",
  "06_FIELD/02_Photos",
  "06_FIELD/03_Field_Reports",
  "06_FIELD/04_Layout_Verification",
  "07_QUALITY/01_ITPs_Checklists",
  "07_QUALITY/02_Inspections",
  "07_QUALITY/03_Test_Reports",
  "07_QUALITY/04_NCRs_Deficiencies",
  "08_HSE/01_Project_Safety_Plan",
  "08_HSE/02_JHA_JSA",
  "08_HSE/03_Observations",
  "08_HSE/04_Incidents_Near_Misses",
  "08_HSE/05_Corrective_Actions",
  "09_COMMISSIONING_CLOSEOUT/01_Punch",
  "09_COMMISSIONING_CLOSEOUT/02_Commissioning",
  "09_COMMISSIONING_CLOSEOUT/03_OM_Manuals",
  "09_COMMISSIONING_CLOSEOUT/04_Warranties",
  "09_COMMISSIONING_CLOSEOUT/05_Training",
  "09_COMMISSIONING_CLOSEOUT/06_As_Builts_Record_Model",
  "99_ARCHIVE",
];

if (has("--help") || has("-h")) {
  console.log(`TCCG project workspace generator

Usage:
  node scripts/create-project-workspace.mjs --project TCCG-001 --name "Project Name" --template commercial-gc [--output ./path] [--force]

Templates:
  commercial-gc
  hvac-retrofit
  bim-vdc
  federal-small-works
`);
  process.exit(0);
}

const projectNumber = value("--project");
const projectName = value("--name");
const templateId = value("--template") ?? "commercial-gc";
const template = templates[templateId];

if (!projectNumber || !projectName) {
  console.error("Missing required --project and/or --name. Run with --help for usage.");
  process.exit(1);
}

if (!template) {
  console.error(`Unknown template: ${templateId}. Available: ${Object.keys(templates).join(", ")}`);
  process.exit(1);
}

const defaultFolder = `${projectNumber}-${slugify(projectName)}`;
const target = resolve(value("--output") ?? join(".tccg-projects", defaultFolder));

if (existsSync(target) && !has("--force")) {
  console.error(`Target already exists: ${target}. Use --force only when you intentionally want to write into an existing workspace.`);
  process.exit(1);
}

mkdirSync(target, { recursive: true });
for (const folder of folderTree) {
  mkdirSync(join(target, folder), { recursive: true });
}

const now = new Date().toISOString();
const manifest = {
  schemaVersion: "2026.1",
  projectNumber,
  projectName,
  templateId,
  templateName: template.name,
  status: "draft",
  createdAt: now,
  cdeStandard: "TCCG-CDE-2026.1",
  bimStandard: "TCCG-BIM-STD-2026.1",
  informationStates: ["WIP", "SHARED", "PUBLISHED", "ARCHIVE"],
  stages: template.stages,
  requiredArtifacts: template.requiredArtifacts,
  releaseGates: {
    externalQualificationsVerified: false,
    contractAuthorityConfirmed: false,
    projectRolesAssigned: false,
    cdePermissionsValidated: false,
    baselineEstimateApproved: false,
    baselineScheduleApproved: false,
    qcPlanApproved: false,
    hsePlanApproved: false,
  },
  controls: {
    noSensitiveDataInPublicTools: true,
    currentRevisionRequiredForConstructionUse: true,
    evidenceRequiredForCloseout: true,
    aiOutputsRequireHumanApproval: true,
  },
};

writeFileSync(join(target, "project.manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
writeFileSync(
  join(target, "README.md"),
  `# ${projectNumber} — ${projectName}\n\nTemplate: **${template.name}**\n\nThis workspace was generated from the TCCG Digital Launch project standard. It is a local/bootstrap structure until mapped to the project's approved production CDE.\n\n## Startup sequence\n\n${template.stages.map((stage, index) => `${index + 1}. ${stage}`).join("\n")}\n\n## Required artifacts\n\n${template.requiredArtifacts.map((artifact) => `- [ ] ${artifact}`).join("\n")}\n\n## Release controls\n\n- Do not place sensitive/controlled project information in unapproved public tools.\n- Do not treat draft/WIP information as approved construction information.\n- Verify licensing, bonding, insurance, registrations and contract authority per project.\n- AI-generated work products remain drafts until approved by the responsible TCCG authority.\n`,
  "utf8",
);

writeFileSync(
  join(target, "00_PROJECT_ADMIN", "02_Contacts_Roles", "ROLE_MATRIX.csv"),
  "role,name,organization,email,authority,system_access,assigned_date,offboarded_date\nProject Sponsor,,,,,,,\nProject Manager,,,,,,,\nSuperintendent,,,,,,,\nVDC/BIM Lead,,,,,,,\nProject Controls,,,,,,,\nQC Lead,,,,,,,\nHSE Lead,,,,,,,\nProcurement Lead,,,,,,,\nOwner Representative,,,,,,,\n",
  "utf8",
);

writeFileSync(
  join(target, "05_PROCUREMENT", "04_Long_Lead", "LONG_LEAD_REGISTER.csv"),
  "item,cost_code,submittal_required,required_on_site,planned_release,actual_release,promised_ship,promised_delivery,vendor,risk,owner,recovery_action\n",
  "utf8",
);

writeFileSync(
  join(target, "07_QUALITY", "01_ITPs_Checklists", "QC_INSPECTION_REGISTER.csv"),
  "inspection_id,trade,cost_code,location,inspection_type,acceptance_criteria,scheduled_date,result,deficiency_count,evidence_ref,inspector,verified_by\n",
  "utf8",
);

writeFileSync(
  join(target, "08_HSE", "03_Observations", "HSE_OBSERVATION_REGISTER.csv"),
  "observation_id,date,activity,location,risk,description,immediate_action,corrective_action,owner,due_date,closed_date,evidence_ref\n",
  "utf8",
);

console.log(`Created TCCG project workspace: ${target}`);
console.log(`Template: ${template.name}`);
console.log(`Folders: ${folderTree.length}`);
console.log("Next: assign roles, bind the approved CDE, and complete release gates in project.manifest.json.");
