export type LaunchStatus = "ready" | "in_progress" | "blocked" | "planned";

export type LaunchWorkstream = {
  id: string;
  name: string;
  owner: string;
  status: LaunchStatus;
  completion: number;
  launchGate: string;
  evidence: string[];
};

export type CostCode = {
  code: string;
  division: string;
  family: string;
  description: string;
  phase: "preconstruction" | "general" | "trade" | "closeout";
};

export type EstimateAssembly = {
  id: string;
  name: string;
  trade: string;
  unit: string;
  baselineLaborHours: number;
  baselineMaterialAllowance: number;
  source: string;
  reviewCadence: string;
};

export type SubcontractorRecord = {
  id: string;
  company: string;
  trade: string;
  geography: string;
  status: "prospect" | "prequalifying" | "qualified" | "inactive";
  safetyStatus: string;
  insuranceStatus: string;
  bondingStatus: string;
  diversityTags: string[];
};

export type VendorRecord = {
  id: string;
  organization: string;
  category: string;
  relationship: "target" | "application_ready" | "active";
  purpose: string;
  nextAction: string;
};

export type WorkflowStep = {
  id: string;
  name: string;
  owner: string;
  requiredEvidence: string[];
  exitCriteria: string;
};

export type AgentPrototype = {
  id: string;
  name: string;
  mission: string;
  reads: string[];
  produces: string[];
  autonomy: "assist" | "recommend";
  approvalRequired: boolean;
};

export const launchWorkstreams: LaunchWorkstream[] = [
  { id: "bim", name: "BIM standards", owner: "VDC / Tolani Labs", status: "ready", completion: 90, launchGate: "Approve project BEP template and naming convention", evidence: ["ISO 19650-aligned information states", "Model federation rules", "Issue/RFI handoff rules"] },
  { id: "cde", name: "Common Data Environment", owner: "Operations", status: "in_progress", completion: 80, launchGate: "Bind production storage provider and permissions", evidence: ["WIP / Shared / Published / Archive states", "Metadata requirements", "Revision and approval rules"] },
  { id: "estimating", name: "Estimating database", owner: "Preconstruction", status: "ready", completion: 85, launchGate: "Load live supplier quotes and labor factors", evidence: ["Assemblies", "Cost-code mapping", "Quote provenance fields"] },
  { id: "subs", name: "Subcontractor database", owner: "Procurement", status: "ready", completion: 80, launchGate: "Complete first 25 real prequalifications", evidence: ["Safety", "Insurance", "Bonding", "Trade/geography tags"] },
  { id: "cost-codes", name: "Cost codes", owner: "Finance / Operations", status: "ready", completion: 100, launchGate: "Map to accounting system", evidence: ["TCCG code taxonomy", "Estimate-to-buyout continuity", "Change-order continuity"] },
  { id: "procurement", name: "Procurement system", owner: "Procurement", status: "ready", completion: 85, launchGate: "Connect purchase-order system of record", evidence: ["Long-lead register", "Submittal dependency", "Vendor scorecard"] },
  { id: "qc", name: "QC workflows", owner: "Project Delivery", status: "ready", completion: 90, launchGate: "Approve trade-specific inspection plans", evidence: ["Preparatory / initial / follow-up checks", "Deficiency evidence", "Closeout verification"] },
  { id: "hse", name: "HSE workflows", owner: "Safety", status: "ready", completion: 90, launchGate: "Name competent persons and emergency contacts per project", evidence: ["JHA/JSA", "Daily observations", "Corrective actions", "Incident workflow"] },
  { id: "owner-dashboards", name: "Owner dashboards", owner: "Project Controls", status: "ready", completion: 90, launchGate: "Connect live cost/schedule feeds", evidence: ["Schedule", "Cost", "RFI/submittal", "Safety", "Quality", "ESG"] },
  { id: "templates", name: "Project templates", owner: "PMO", status: "ready", completion: 95, launchGate: "Pilot on first controlled project", evidence: ["Commercial GC", "HVAC retrofit", "BIM/VDC", "Federal small works"] },
  { id: "precon", name: "Preconstruction processes", owner: "Preconstruction", status: "ready", completion: 95, launchGate: "Run bid/no-bid on live opportunity", evidence: ["Intake", "Scope matrix", "Risk review", "Estimate", "Proposal", "Turnover"] },
  { id: "capability", name: "Capabilities statement", owner: "Growth", status: "ready", completion: 90, launchGate: "Insert verified identifiers, licenses and past performance only", evidence: ["Core competencies", "Differentiators", "NAICS", "Contact block"] },
  { id: "website", name: "Website", owner: "Growth / Tolani Labs", status: "ready", completion: 85, launchGate: "Publish verified portfolio and compliance data", evidence: ["Public marketing site", "Operations platform", "Digital Launch command center"] },
  { id: "portfolio", name: "Portfolio", owner: "Growth", status: "in_progress", completion: 55, launchGate: "Verify client authorization, value, dates and images", evidence: ["Evidence-first portfolio policy", "Case-study template"] },
  { id: "training", name: "Tolani Labs training pipeline", owner: "Tolani Labs", status: "ready", completion: 90, launchGate: "Enroll first cohort against project-role demand", evidence: ["BIM", "Field technology", "Estimating", "QA/HSE", "Project controls"] },
  { id: "agents", name: "AI-agent prototypes", owner: "Tolani Labs", status: "ready", completion: 80, launchGate: "Connect governed project data and evaluation harness", evidence: ["14 construction staff agents", "Human approval boundaries", "Evidence outputs"] },
  { id: "vendors", name: "Vendor relationships", owner: "Procurement", status: "in_progress", completion: 50, launchGate: "Obtain written channel/credit status", evidence: ["Manufacturer targets", "Distributor targets", "Technology partners"] },
  { id: "risk-transfer", name: "Bonding / insurance relationships", owner: "Finance", status: "in_progress", completion: 45, launchGate: "Secure broker and surety indications", evidence: ["Bond readiness checklist", "Insurance schedule", "SBA SBG path"] },
  { id: "gov", name: "Government registration readiness", owner: "Growth / Compliance", status: "in_progress", completion: 65, launchGate: "Verify active SAM and applicable SBA certifications", evidence: ["SAM/UEI", "SBS profile", "NAICS", "reps/certs", "capability package"] },
];

export const bimStandard = {
  version: "TCCG-BIM-STD-2026.1",
  principles: [
    "Use a project BIM Execution Plan before model production begins.",
    "Define information requirements, authoring responsibility, exchange milestones, and approval authority.",
    "Federate discipline models; do not overwrite another party's authoring model.",
    "Link every coordination issue to model/view, responsible party, due date, disposition, and evidence.",
    "Treat safety-critical and owner-sensitive information as controlled information with least-privilege access.",
  ],
  naming: "TCCG-{project}-{originator}-{zone}-{level}-{type}-{role}-{number}-{revision}",
  modelUses: ["design coordination", "constructability", "quantity support", "4D planning", "field layout support", "closeout/as-built information"],
  exchangeChecks: ["coordinates", "levels/grids", "classification", "required parameters", "clash status", "open issues", "revision", "approval status"],
  referenceFramework: ["ISO 19650-1 concepts/principles", "ISO 19650-2 delivery-phase information management", "ISO 19650-5 security-minded information management", "ISO 19650-6 health and safety information"],
};

export const cdeStandard = {
  version: "TCCG-CDE-2026.1",
  states: [
    { state: "WIP", purpose: "Authoring-team work in progress", publishAuthority: "originating team", ownerVisible: false },
    { state: "SHARED", purpose: "Coordination and review", publishAuthority: "discipline lead", ownerVisible: true },
    { state: "PUBLISHED", purpose: "Approved contractual / construction use", publishAuthority: "authorized project lead", ownerVisible: true },
    { state: "ARCHIVE", purpose: "Immutable superseded and record information", publishAuthority: "system / information manager", ownerVisible: true },
  ],
  requiredMetadata: ["project", "containerId", "title", "originator", "discipline", "revision", "status", "classification", "createdBy", "createdAt", "approvedBy", "approvedAt", "sensitivity"],
  controls: ["role-based access", "MFA at provider layer", "immutable audit history", "no public links for controlled project data", "retention schedule", "revocation on staff/vendor offboarding"],
};

export const costCodes: CostCode[] = [
  { code: "00-100", division: "00", family: "Preconstruction", description: "Opportunity, estimating and proposal effort", phase: "preconstruction" },
  { code: "01-100", division: "01", family: "General", description: "Project management and supervision", phase: "general" },
  { code: "01-200", division: "01", family: "General", description: "Temporary facilities and controls", phase: "general" },
  { code: "01-300", division: "01", family: "General", description: "Safety, quality and project controls", phase: "general" },
  { code: "03-100", division: "03", family: "Concrete", description: "Concrete work packages", phase: "trade" },
  { code: "05-100", division: "05", family: "Metals", description: "Structural and miscellaneous metals", phase: "trade" },
  { code: "06-100", division: "06", family: "Wood", description: "Rough and finish carpentry packages", phase: "trade" },
  { code: "07-100", division: "07", family: "Envelope", description: "Thermal/moisture protection packages", phase: "trade" },
  { code: "08-100", division: "08", family: "Openings", description: "Doors, frames, glazing and hardware", phase: "trade" },
  { code: "09-100", division: "09", family: "Finishes", description: "Interior finish packages", phase: "trade" },
  { code: "21-100", division: "21", family: "Fire protection", description: "Fire suppression work packages", phase: "trade" },
  { code: "22-100", division: "22", family: "Plumbing", description: "Plumbing work packages", phase: "trade" },
  { code: "23-100", division: "23", family: "HVAC", description: "HVAC equipment and distribution", phase: "trade" },
  { code: "23-200", division: "23", family: "HVAC", description: "Controls, TAB and commissioning support", phase: "trade" },
  { code: "26-100", division: "26", family: "Electrical", description: "Electrical power and lighting", phase: "trade" },
  { code: "27-100", division: "27", family: "Communications", description: "Structured communications systems", phase: "trade" },
  { code: "28-100", division: "28", family: "Electronic safety", description: "Electronic safety and security systems", phase: "trade" },
  { code: "31-100", division: "31", family: "Earthwork", description: "Earthwork and site preparation", phase: "trade" },
  { code: "32-100", division: "32", family: "Exterior", description: "Exterior improvements", phase: "trade" },
  { code: "33-100", division: "33", family: "Utilities", description: "Site utility work packages", phase: "trade" },
  { code: "90-100", division: "90", family: "Closeout", description: "Punch, commissioning, training and turnover", phase: "closeout" },
];

export const estimatingAssemblies: EstimateAssembly[] = [
  { id: "HVAC-RTU-REPLACE", name: "Packaged rooftop unit replacement", trade: "HVAC", unit: "each", baselineLaborHours: 56, baselineMaterialAllowance: 0, source: "Supplier quote required; allowance intentionally zero until quoted", reviewCadence: "every estimate" },
  { id: "HVAC-VAV-CONTROLS", name: "VAV controls retrofit", trade: "HVAC controls", unit: "each", baselineLaborHours: 6, baselineMaterialAllowance: 0, source: "Controls vendor quote required", reviewCadence: "monthly" },
  { id: "BIM-COORD-LVL", name: "BIM coordination by floor/zone", trade: "BIM/VDC", unit: "zone", baselineLaborHours: 24, baselineMaterialAllowance: 0, source: "TCCG production history", reviewCadence: "quarterly" },
  { id: "GEN-SUPERVISION-WK", name: "Field supervision", trade: "General conditions", unit: "week", baselineLaborHours: 45, baselineMaterialAllowance: 0, source: "Project staffing plan", reviewCadence: "every estimate" },
  { id: "QA-INSPECTION", name: "Trade quality inspection", trade: "Quality", unit: "inspection", baselineLaborHours: 3, baselineMaterialAllowance: 0, source: "TCCG QC plan", reviewCadence: "quarterly" },
  { id: "HSE-JHA", name: "High-risk activity JHA package", trade: "Safety", unit: "activity", baselineLaborHours: 4, baselineMaterialAllowance: 0, source: "TCCG HSE plan", reviewCadence: "quarterly" },
  { id: "CLOSEOUT-OANDM", name: "O&M / turnover package", trade: "Closeout", unit: "system", baselineLaborHours: 8, baselineMaterialAllowance: 0, source: "TCCG closeout standard", reviewCadence: "quarterly" },
];

export const subcontractors: SubcontractorRecord[] = [
  { id: "SUB-MECH-SE-001", company: "Mechanical partner - qualification slot 01", trade: "HVAC / mechanical", geography: "Southeast US", status: "prequalifying", safetyStatus: "EMR / OSHA history required", insuranceStatus: "COI pending", bondingStatus: "capacity letter pending", diversityTags: [] },
  { id: "SUB-ELEC-SE-001", company: "Electrical partner - qualification slot 01", trade: "Electrical", geography: "Southeast US", status: "prospect", safetyStatus: "screening required", insuranceStatus: "screening required", bondingStatus: "screening required", diversityTags: [] },
  { id: "SUB-CIV-SE-001", company: "Civil/site partner - qualification slot 01", trade: "Civil / site", geography: "Florida / Southeast", status: "prospect", safetyStatus: "screening required", insuranceStatus: "screening required", bondingStatus: "screening required", diversityTags: [] },
  { id: "SUB-FP-SE-001", company: "Fire protection partner - qualification slot 01", trade: "Fire protection", geography: "Southeast US", status: "prospect", safetyStatus: "screening required", insuranceStatus: "screening required", bondingStatus: "screening required", diversityTags: [] },
];

export const procurementWorkflow: WorkflowStep[] = [
  { id: "P01", name: "Demand capture", owner: "Estimator / PM", requiredEvidence: ["scope", "quantity", "required-on-site date", "cost code"], exitCriteria: "Demand record approved" },
  { id: "P02", name: "Source", owner: "Procurement", requiredEvidence: ["approved vendor list", "RFQ", "alternates"], exitCriteria: "Compliant sources identified" },
  { id: "P03", name: "Level bids", owner: "Estimator / PM", requiredEvidence: ["scope comparison", "exclusions", "lead time", "commercial terms"], exitCriteria: "Best-value recommendation documented" },
  { id: "P04", name: "Submittal / technical approval", owner: "PM / Design team", requiredEvidence: ["product data", "deviations", "approval status"], exitCriteria: "Technical release received" },
  { id: "P05", name: "Commercial release", owner: "Authorized buyer", requiredEvidence: ["budget", "PO/subcontract", "insurance", "terms"], exitCriteria: "Commitment executed" },
  { id: "P06", name: "Expedite", owner: "Procurement", requiredEvidence: ["manufacturer status", "ship date", "logistics", "risk flag"], exitCriteria: "Delivery date remains achievable" },
  { id: "P07", name: "Receive / inspect", owner: "Field", requiredEvidence: ["delivery ticket", "photos", "quantity", "damage/deficiency record"], exitCriteria: "Material accepted or NCR opened" },
  { id: "P08", name: "Close / score", owner: "PM / Procurement", requiredEvidence: ["invoice match", "warranty", "vendor score"], exitCriteria: "Commitment financially and administratively closed" },
];

export const qcWorkflow: WorkflowStep[] = [
  { id: "Q01", name: "Preparatory phase", owner: "QC lead", requiredEvidence: ["approved submittals", "latest drawings", "ITP/checklist", "mockup/sample if required"], exitCriteria: "Work may start" },
  { id: "Q02", name: "Initial inspection", owner: "QC lead / superintendent", requiredEvidence: ["first-work inspection", "measurements", "photos", "crew feedback"], exitCriteria: "Standard of workmanship accepted" },
  { id: "Q03", name: "Follow-up inspections", owner: "Superintendent / QC", requiredEvidence: ["daily/lot checks", "test reports", "deficiency tracking"], exitCriteria: "Installed work remains conforming" },
  { id: "Q04", name: "Deficiency / NCR", owner: "QC lead", requiredEvidence: ["condition", "requirement", "root cause", "corrective action", "verification"], exitCriteria: "NCR closed with evidence" },
  { id: "Q05", name: "Turnover quality gate", owner: "PM / QC", requiredEvidence: ["punch complete", "commissioning", "O&M", "warranty", "training"], exitCriteria: "Owner-ready turnover" },
];

export const hseWorkflow: WorkflowStep[] = [
  { id: "S01", name: "Plan", owner: "Safety / PM", requiredEvidence: ["site-specific safety plan", "responsibilities", "emergency action plan", "competent-person designations"], exitCriteria: "Project HSE plan approved" },
  { id: "S02", name: "Pre-task risk assessment", owner: "Superintendent / foreperson", requiredEvidence: ["JHA/JSA", "crew briefing", "controls", "PPE"], exitCriteria: "Crew acknowledges controls" },
  { id: "S03", name: "Observe", owner: "All leaders", requiredEvidence: ["leading-indicator observation", "hazard report", "good catch"], exitCriteria: "Hazards assigned or corrected" },
  { id: "S04", name: "Correct", owner: "Responsible supervisor", requiredEvidence: ["corrective action", "owner", "due date", "verification photo/document"], exitCriteria: "Hazard verified closed" },
  { id: "S05", name: "Incident / near miss", owner: "Safety lead", requiredEvidence: ["scene evidence", "facts", "interviews", "causal analysis", "corrective actions", "reportability review"], exitCriteria: "Learning issued and actions tracked" },
  { id: "S06", name: "Learn", owner: "Safety / Tolani Labs", requiredEvidence: ["trend analysis", "toolbox talk", "lesson learned", "training update"], exitCriteria: "Learning incorporated into future work" },
];

export const ownerDashboardMetrics = [
  { category: "Schedule", metrics: ["baseline vs current milestone", "2/6-week lookahead", "constraint aging", "critical delay risks"] },
  { category: "Cost", metrics: ["contract value", "approved changes", "pending changes", "forecast at completion", "contingency"] },
  { category: "Design", metrics: ["open RFIs", "RFI aging", "submittal cycle time", "coordination issues"] },
  { category: "Quality", metrics: ["open deficiencies", "NCR aging", "inspection pass rate", "punch trend"] },
  { category: "HSE", metrics: ["leading observations", "corrective-action aging", "near misses", "recordable incidents"] },
  { category: "Procurement", metrics: ["long-lead items", "required-on-site variance", "late approvals", "vendor risk"] },
  { category: "ESG / Performance", metrics: ["waste diversion evidence", "energy-performance targets", "commissioning status", "owner training"] },
];

export const projectTemplates = [
  { id: "TPL-GC-COMM", name: "Commercial GC", stages: ["intake", "preconstruction", "contract", "mobilization", "construction", "commissioning", "closeout", "warranty"] },
  { id: "TPL-HVAC-RETRO", name: "HVAC retrofit / controls", stages: ["survey", "basis of design", "estimate", "submittal", "procure", "install", "TAB/commission", "owner training"] },
  { id: "TPL-BIM-VDC", name: "BIM/VDC coordination", stages: ["BEP", "model intake", "federation", "clash cycle", "RFI support", "approved coordination", "field handoff", "record model"] },
  { id: "TPL-FED-SMALL", name: "Federal construction / small works", stages: ["opportunity review", "solicitation compliance matrix", "estimate", "bonding gate", "proposal", "award turnover", "construction", "contract closeout"] },
];

export const preconstructionProcess: WorkflowStep[] = [
  { id: "PC01", name: "Opportunity intake", owner: "Growth", requiredEvidence: ["client", "location", "scope", "procurement method", "due date"], exitCriteria: "Opportunity record complete" },
  { id: "PC02", name: "Bid / no-bid", owner: "Executive / Preconstruction", requiredEvidence: ["strategic fit", "license fit", "bonding capacity", "staffing", "risk", "competition"], exitCriteria: "Decision approved" },
  { id: "PC03", name: "Document control", owner: "Preconstruction", requiredEvidence: ["drawing/spec index", "addenda", "CDE folder", "responsibility matrix"], exitCriteria: "Current bid set validated" },
  { id: "PC04", name: "Scope extraction", owner: "Estimator", requiredEvidence: ["scope matrix", "quantities", "allowances", "alternates", "exclusions"], exitCriteria: "Estimate work breakdown approved" },
  { id: "PC05", name: "Market coverage", owner: "Procurement", requiredEvidence: ["bidder list", "RFQs", "coverage gaps", "vendor quotes"], exitCriteria: "Critical scopes have competitive coverage" },
  { id: "PC06", name: "Estimate reconciliation", owner: "Chief estimator / reviewer", requiredEvidence: ["direct cost", "general conditions", "fee", "risk", "escalation", "bond/insurance", "tax"], exitCriteria: "Independent review complete" },
  { id: "PC07", name: "Proposal / compliance", owner: "Growth / Preconstruction", requiredEvidence: ["compliance matrix", "technical narrative", "schedule", "price", "qualifications"], exitCriteria: "Authorized submission" },
  { id: "PC08", name: "Award turnover", owner: "Preconstruction / PM", requiredEvidence: ["estimate basis", "buyout log", "risk register", "client commitments", "schedule assumptions"], exitCriteria: "Delivery team accepts baseline" },
];

export const capabilityStatement = {
  legalName: "TC Construction Group (TCCG)",
  tagline: "Building Beyond",
  positioning: "Technology-forward construction, HVAC, BIM/VDC and building-performance delivery within the Tolani Corp ecosystem.",
  coreCompetencies: ["commercial construction management", "HVAC and controls modernization", "BIM/VDC coordination", "preconstruction and estimating", "quality and safety management", "digital owner reporting", "commissioning and closeout support"],
  differentiators: ["Tolani Labs training and R&D pipeline", "evidence-first digital project controls", "AI-assisted staff workflows with human approval", "BIM-to-field information continuity", "government-contracting readiness architecture"],
  naics: ["236220", "238220", "238210", "238990", "237310"],
  verifiedOnlyFields: ["UEI", "CAGE", "state contractor licenses", "certifications", "bonding capacity", "insurance limits", "past-performance values", "client references"],
};

export const portfolioPolicy = {
  rule: "No project may be marketed as TCCG past performance until ownership, role, dates, value, client-release status and supporting evidence are verified.",
  caseStudyFields: ["project", "client/agency", "location", "contract role", "scope", "value", "period of performance", "schedule outcome", "safety outcome", "quality outcome", "technology used", "owner benefit", "reference authorization", "media release"],
};

export const trainingPipeline = [
  { stage: "Foundation", duration: "2-4 weeks", outcomes: ["construction documents", "safety basics", "CDE discipline", "professional communication"] },
  { stage: "Role track", duration: "4-8 weeks", outcomes: ["BIM/Revit", "estimating", "project controls", "QA/QC", "HSE", "field technology"] },
  { stage: "Simulation", duration: "2-4 weeks", outcomes: ["sandbox project", "RFI/submittal", "estimate", "inspection evidence", "daily report"] },
  { stage: "Internship", duration: "project-based", outcomes: ["supervised production", "portfolio evidence", "skills evaluation"] },
  { stage: "Deployment", duration: "ongoing", outcomes: ["TCCG role placement", "continuous learning", "lessons-to-curriculum feedback"] },
];

export const agentPrototypes: AgentPrototype[] = [
  { id: "AG-PRECON", name: "Preconstruction Agent", mission: "Extract scope and assemble preconstruction plan", reads: ["drawings", "specifications", "solicitation", "BEP"], produces: ["scope matrix", "risk list", "bid checklist"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-EST", name: "Estimating Agent", mission: "Reconcile estimate coverage, quantities and assumptions", reads: ["estimate", "quotes", "cost codes", "scope matrix"], produces: ["variance report", "coverage gaps", "review questions"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-DWG", name: "Drawing Agent", mission: "Compare document revisions", reads: ["drawing index", "revision metadata", "issue log"], produces: ["change summary", "affected scopes"], autonomy: "assist", approvalRequired: true },
  { id: "AG-RFI", name: "RFI Agent", mission: "Identify ambiguity and draft evidence-backed RFIs", reads: ["drawings", "specifications", "coordination issues"], produces: ["draft RFI", "references", "impact flag"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-SUBMIT", name: "Submittal Agent", mission: "Track submittal dependencies and aging", reads: ["submittal log", "schedule", "procurement"], produces: ["late-risk list", "required actions"], autonomy: "assist", approvalRequired: true },
  { id: "AG-SCHED", name: "Schedule Agent", mission: "Detect delay and constraint risk", reads: ["schedule", "lookahead", "constraints", "procurement"], produces: ["delay-risk brief", "recovery options"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-PROC", name: "Procurement Agent", mission: "Monitor long-lead exposure", reads: ["procurement log", "submittals", "schedule"], produces: ["expediting list", "late-delivery risk"], autonomy: "assist", approvalRequired: true },
  { id: "AG-SAFE", name: "Safety Agent", mission: "Analyze leading indicators and corrective-action trends", reads: ["observations", "JHAs", "incidents", "corrective actions"], produces: ["trend brief", "focus areas"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-QC", name: "QC Agent", mission: "Check inspection evidence completeness", reads: ["ITPs", "inspection records", "photos", "NCRs"], produces: ["evidence gaps", "reinspection queue"], autonomy: "assist", approvalRequired: true },
  { id: "AG-LOG", name: "Daily Log Agent", mission: "Compile field notes into structured daily reports", reads: ["field notes", "weather", "manpower", "photos"], produces: ["draft daily log", "exceptions"], autonomy: "assist", approvalRequired: true },
  { id: "AG-CHANGE", name: "Change Agent", mission: "Detect potential change events", reads: ["RFIs", "revisions", "directives", "daily logs"], produces: ["change-event candidate", "notice clock"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-COST", name: "Cost Agent", mission: "Forecast cost variance", reads: ["budget", "commitments", "changes", "forecast"], produces: ["variance drivers", "forecast questions"], autonomy: "recommend", approvalRequired: true },
  { id: "AG-CLOSE", name: "Closeout Agent", mission: "Assess turnover completeness", reads: ["punch", "O&M", "warranty", "training", "commissioning"], produces: ["missing-items list", "turnover readiness score"], autonomy: "assist", approvalRequired: true },
  { id: "AG-LESSON", name: "Lessons Agent", mission: "Convert validated lessons into reusable organizational knowledge", reads: ["closeout", "incidents", "estimate actuals", "owner feedback"], produces: ["lesson candidate", "training update recommendation"], autonomy: "recommend", approvalRequired: true },
];

export const vendorTargets: VendorRecord[] = [
  { id: "V-AUTODESK", organization: "Autodesk", category: "BIM / construction cloud", relationship: "target", purpose: "BIM authoring, coordination and CDE capability", nextAction: "Evaluate construction cloud commercial/partner path and license governance" },
  { id: "V-CARRIER", organization: "Carrier", category: "HVAC", relationship: "target", purpose: "Equipment and controls sourcing", nextAction: "Identify authorized distribution/channel requirements in target states" },
  { id: "V-TRANE", organization: "Trane Technologies", category: "HVAC", relationship: "target", purpose: "Equipment, controls and building-performance solutions", nextAction: "Identify commercial channel and service-partner opportunities" },
  { id: "V-JCI", organization: "Johnson Controls", category: "Building controls", relationship: "target", purpose: "Controls, fire/security and building automation opportunities", nextAction: "Identify local commercial partner/channel contacts" },
  { id: "V-SCHNEIDER", organization: "Schneider Electric", category: "Energy / controls", relationship: "target", purpose: "Building automation, electrical and energy-management integration", nextAction: "Evaluate partner program fit" },
  { id: "V-GRAINGER", organization: "Grainger", category: "MRO / supply", relationship: "target", purpose: "Jobsite and facility MRO supply", nextAction: "Establish commercial account and government-sales support path" },
];

export const riskTransferReadiness = [
  { item: "Surety broker", status: "in_progress", evidence: "Select construction-specialist broker; provide company financials, work history and pipeline" },
  { item: "Single / aggregate bonding targets", status: "planned", evidence: "Obtain written indication based on current financial capacity" },
  { item: "SBA Surety Bond Guarantee pathway", status: "ready", evidence: "Use as growth path when conventional capacity is insufficient and eligibility is met" },
  { item: "General liability", status: "in_progress", evidence: "Bind limits to contract/customer requirements" },
  { item: "Workers compensation", status: "in_progress", evidence: "Bind where required and manage certificates" },
  { item: "Commercial auto", status: "planned", evidence: "Bind before owned/hired vehicle exposure requires it" },
  { item: "Umbrella / excess", status: "planned", evidence: "Size against project and owner requirements" },
  { item: "Professional / technology E&O", status: "planned", evidence: "Evaluate for BIM, design-assist, controls and digital advisory exposures" },
  { item: "Cyber", status: "planned", evidence: "Evaluate for CDE, owner portals and connected-building data" },
];

export const governmentReadiness = [
  { id: "G01", item: "SAM.gov entity registration", status: "verify", requirement: "Active registration for direct federal awards; renew every 365 days" },
  { id: "G02", item: "Unique Entity ID", status: "verify", requirement: "UEI assigned through SAM.gov registration" },
  { id: "G03", item: "CAGE code", status: "verify", requirement: "Verify current code after SAM processing/validation" },
  { id: "G04", item: "SBA Small Business Search profile", status: "prepare", requirement: "Build complete searchable capability profile" },
  { id: "G05", item: "SBA VetCert / SDVOSB", status: "assess", requirement: "Apply only through SBA if ownership/control/eligibility requirements are met" },
  { id: "G06", item: "NAICS / size standards", status: "prepare", requirement: "Validate primary and opportunity-specific NAICS against current SBA size standards" },
  { id: "G07", item: "FAR reps and certs", status: "prepare", requirement: "Maintain accurate SAM representations and certifications" },
  { id: "G08", item: "Federal construction bonding", status: "prepare", requirement: "Plan for payment/performance bonds on covered federal construction awards and alternate payment protection where applicable" },
  { id: "G09", item: "Wage determinations / labor compliance", status: "prepare", requirement: "Review solicitation-specific wage determinations and labor clauses" },
  { id: "G10", item: "Cyber / information requirements", status: "prepare", requirement: "Flow solicitation-specific FAR/DFARS/CUI requirements into project controls before handling covered information" },
  { id: "G11", item: "Past performance evidence", status: "build", requirement: "Create verified project sheets, references and CPARS/subcontract evidence where available" },
  { id: "G12", item: "APEX Accelerator review", status: "recommended", requirement: "Use official no-cost assistance to validate registration and capture strategy" },
];

export const launchReferences = [
  { name: "SAM.gov Entity Registration", url: "https://sam.gov/entity-registration" },
  { name: "SBA Veteran Contracting Assistance", url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs" },
  { name: "SBA Account / Small Business Search", url: "https://www.sba.gov/about-sba/open-government/about-sbagov-website/sba-account-login-registration-portals" },
  { name: "SBA Surety Bond Guarantee", url: "https://www.sba.gov/surety-bonds" },
  { name: "FAR 28.102 Construction Bonds", url: "https://www.acquisition.gov/far/28.102-1" },
  { name: "OSHA Construction Safety and Health Program", url: "https://www.osha.gov/etools/construction/safety-health-program" },
  { name: "ISO 19650-1", url: "https://www.iso.org/standard/68078.html" },
  { name: "ISO 19650-2", url: "https://www.iso.org/standard/68080.html" },
  { name: "ISO 19650-5", url: "https://www.iso.org/standard/74206.html" },
  { name: "ISO 19650-6", url: "https://www.iso.org/standard/82705.html" },
];

export function launchReadiness() {
  const weighted = launchWorkstreams.reduce((sum, item) => sum + item.completion, 0);
  return Math.round(weighted / launchWorkstreams.length);
}

export function getDigitalLaunchSnapshot() {
  return {
    generatedAt: new Date().toISOString(),
    readiness: launchReadiness(),
    workstreams: launchWorkstreams,
    bimStandard,
    cdeStandard,
    costCodes,
    estimatingAssemblies,
    subcontractors,
    procurementWorkflow,
    qcWorkflow,
    hseWorkflow,
    ownerDashboardMetrics,
    projectTemplates,
    preconstructionProcess,
    capabilityStatement,
    portfolioPolicy,
    trainingPipeline,
    agentPrototypes,
    vendorTargets,
    riskTransferReadiness,
    governmentReadiness,
    references: launchReferences,
  };
}
