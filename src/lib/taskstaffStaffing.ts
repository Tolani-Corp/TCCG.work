export type StaffingAdapterStatus = "embedded" | "adapter_required";

export type TccgAgentStaffProfile = {
  id: string;
  taskStaffId: string;
  name: string;
  humanCounterparts: string[];
  skills: string[];
  tools: string[];
  adapters: string[];
  staffingSignals: string[];
  authorityBoundary: string;
};

export const taskStaffStaffingModel = {
  schema: "tccg.taskstaff-construction-staffing.v1",
  version: "2026.08.20",
  status: "governed_pilot_contract",
  productionEnabled: false,
  workPlane: "TaskStaff — Work Execution & Workforce Readiness Plane",
  tccgAuthority: [
    "construction and HVAC project records",
    "project execution and field direction",
    "licensed/competent-person/inspection authority",
    "contractual and financial decisions",
    "owner acceptance",
  ],
  taskStaffAuthority: [
    "project workforce demand",
    "human/agent/service/hybrid-team assignment recommendations",
    "competency and credential readiness assertions",
    "availability and backup coverage",
    "staffing quality gates and workforce evidence",
    "training-gap routing",
  ],
  nonSubstitutionRule:
    "No AI agent may satisfy a required human project-manager, superintendent, estimator/scheduler-of-record, competent-person, QC/inspection, design, financial, commissioning or owner-acceptance authority role.",
} as const;

export const sharedTaskStaffServices = [
  { id: "taskstaff.assignment-recommend", name: "Assignment recommendation", purpose: "Recommend bounded HUMAN, AGENT, SERVICE and HYBRID_TEAM assignments." },
  { id: "taskstaff.credential-readiness", name: "Credential readiness", purpose: "Fail closed on missing, expired or unverified role credentials." },
  { id: "taskstaff.availability-match", name: "Availability match", purpose: "Match verified actor capacity to project dates, phase and workload." },
  { id: "taskstaff.backup-coverage", name: "Backup coverage", purpose: "Detect single-point staffing failures before controlled work begins." },
  { id: "taskstaff.training-gap-route", name: "Training-gap routing", purpose: "Route competency gaps into the Tolani Labs train → simulate → intern → deploy loop." },
] as const;

export const staffingWorkflow = [
  { id: "STF-01", name: "Demand capture", owner: "TCCG PM / Preconstruction", exit: "Phase, dates, geography, shift, risk and role demand recorded." },
  { id: "STF-02", name: "Role + authority definition", owner: "TCCG Operations", exit: "Human authorities, AI support roles and prohibited substitutions explicit." },
  { id: "STF-03", name: "Competency + credential gate", owner: "TaskStaff", exit: "Current evidence verified; missing/expired credentials fail closed." },
  { id: "STF-04", name: "Availability + capacity match", owner: "TaskStaff", exit: "Candidate capacity satisfies the bounded project work window." },
  { id: "STF-05", name: "Human + AI team recommendation", owner: "TaskStaff", exit: "Primary actors, services and required backups are recommended with evidence." },
  { id: "STF-06", name: "Human approval", owner: "TCCG Authorized Manager", exit: "Consequential staffing and authority decisions have human approval evidence." },
  { id: "STF-07", name: "Access + onboarding", owner: "TCCG Information Manager", exit: "Least-privilege CDE/project scopes granted with expiration/revocation controls." },
  { id: "STF-08", name: "Mobilization + backup verification", owner: "TCCG PM / Superintendent", exit: "Primary and critical-role backup coverage confirmed." },
  { id: "STF-09", name: "Execution coverage monitoring", owner: "TaskStaff + TCCG", exit: "Availability, credential, workload and coverage exceptions remain visible." },
  { id: "STF-10", name: "QC + HSE authority gates", owner: "TCCG QC / Safety", exit: "AI support cannot replace competent-person, inspection or acceptance authority." },
  { id: "STF-11", name: "Performance + work evidence", owner: "TaskStaff", exit: "Outcomes, evidence quality, cycle time and human overrides retained for evaluation." },
  { id: "STF-12", name: "Demobilize + learn", owner: "TCCG PMO / Tolani Labs", exit: "Access revoked and validated gaps route to lessons/training." },
] as const;

export const staffingReadinessGates = [
  { gate: "Role demand", failClosedOn: "Undefined human authority or agent support role" },
  { gate: "Competency", failClosedOn: "Required competency has no current evidence" },
  { gate: "Credential", failClosedOn: "Missing, expired, suspended or unverified credential" },
  { gate: "Availability", failClosedOn: "Actor unavailable for required work window" },
  { gate: "Backup", failClosedOn: "High/critical-risk critical role lacks required backup" },
  { gate: "Access", failClosedOn: "Project/CDE scope not least-privilege and approved" },
  { gate: "Authority", failClosedOn: "AI actor would substitute for required human authority" },
  { gate: "Evidence", failClosedOn: "Assignment/readiness decision lacks traceable evidence" },
] as const;

export const constructionSystemAdapters = [
  { id: "autodesk.forma-data", domain: "CDE / documents", target: "Autodesk Forma Data Management", status: "adapter_required" as StaffingAdapterStatus, boundary: "Project CDE remains authoritative; approved writes only." },
  { id: "autodesk.issues", domain: "Issues", target: "Autodesk Forma Issues", status: "adapter_required" as StaffingAdapterStatus, boundary: "Issue writes require project authorization." },
  { id: "autodesk.submittals", domain: "Submittals", target: "Autodesk Forma Submittals", status: "adapter_required" as StaffingAdapterStatus, boundary: "Design/review approval authority remains human." },
  { id: "autodesk.model-coordination", domain: "BIM coordination", target: "Autodesk Model Coordination", status: "adapter_required" as StaffingAdapterStatus, boundary: "Clash/coordination evidence is analytical, not design authority." },
  { id: "openbim.ifc-4.3", domain: "OpenBIM", target: "buildingSMART IFC 4.3", status: "adapter_required" as StaffingAdapterStatus, boundary: "Deterministic schema/geometry validation required." },
  { id: "oracle.primavera-cloud", domain: "Scheduling", target: "Oracle Primavera Cloud", status: "adapter_required" as StaffingAdapterStatus, boundary: "Baseline/contract schedule changes require human approval." },
  { id: "erp.cost-commitments", domain: "Cost", target: "Accounting / ERP", status: "adapter_required" as StaffingAdapterStatus, boundary: "Financial postings and payment authority remain external." },
  { id: "supplier.quote-feed", domain: "Supply chain", target: "Approved supplier quote feeds", status: "adapter_required" as StaffingAdapterStatus, boundary: "No purchase commitment without authorized human action." },
  { id: "weather.field-feed", domain: "Field context", target: "Approved weather / field feed", status: "adapter_required" as StaffingAdapterStatus, boundary: "Source context is attached to contemporaneous field evidence." },
] as const;

export const agentStaffProfiles: TccgAgentStaffProfile[] = [
  { id: "AG-PRECON", taskStaffId: "preconstruction", name: "Preconstruction Agent", humanCounterparts: ["Preconstruction Manager", "Project Manager", "Estimator of Record"], skills: ["owner intent", "scope/WBS", "document control", "estimating", "commercial risk", "workforce readiness"], tools: ["document register", "evidence digest", "scope matrix", "quantity arithmetic"], adapters: ["autodesk.forma-data", "supplier.quote-feed"], staffingSignals: ["new opportunity", "preconstruction start", "scope revision"], authorityBoundary: "Recommends scope/risk plans; does not establish final contractual interpretation." },
  { id: "AG-EST", taskStaffId: "estimating", name: "Estimating Agent", humanCounterparts: ["Chief Estimator", "Project Manager", "Commercial Manager"], skills: ["estimating/takeoff", "scope coverage", "project cost control", "commercial risk"], tools: ["quantity arithmetic", "cost-code engine", "scope matrix", "quote reconciliation"], adapters: ["supplier.quote-feed", "erp.cost-commitments"], staffingSignals: ["estimate requested", "quote received", "quantity delta"], authorityBoundary: "Reconciles estimates; cannot submit a binding bid or approve cost postings." },
  { id: "AG-DWG", taskStaffId: "drawing", name: "Drawing Agent", humanCounterparts: ["VDC Manager", "Project Engineer", "Design Authority"], skills: ["document control", "BIM/VDC", "OpenBIM/IFC", "evidence governance"], tools: ["document register", "revision diff", "model evidence checks"], adapters: ["autodesk.forma-data", "autodesk.model-coordination", "openbim.ifc-4.3"], staffingSignals: ["drawing revision", "model publish", "coordination cycle"], authorityBoundary: "Compares evidence; does not issue design direction or professional judgment." },
  { id: "AG-RFI", taskStaffId: "rfi", name: "RFI Agent", humanCounterparts: ["Project Engineer", "Project Manager", "Design Authority"], skills: ["RFI administration", "document control", "change recognition", "stakeholder communication"], tools: ["RFI register", "revision diff", "notice clock"], adapters: ["autodesk.issues", "autodesk.forma-data"], staffingSignals: ["design ambiguity", "field conflict", "RFI aging"], authorityBoundary: "Drafts evidence-backed RFIs; external issue requires human approval." },
  { id: "AG-SUBMIT", taskStaffId: "submittal", name: "Submittal Agent", humanCounterparts: ["Project Engineer", "Project Manager", "Design Authority"], skills: ["submittal administration", "procurement", "schedule dependencies", "document control"], tools: ["submittal register", "procurement register", "CPM analyzer"], adapters: ["autodesk.submittals", "autodesk.forma-data"], staffingSignals: ["submittal required", "review aging", "procurement hold"], authorityBoundary: "Tracks workflow; cannot approve/reject for the authority of record." },
  { id: "AG-SCHED", taskStaffId: "schedule", name: "Schedule Agent", humanCounterparts: ["Scheduler of Record", "Project Manager", "Superintendent"], skills: ["CPM scheduling", "lookahead constraints", "delay risk", "change management"], tools: ["CPM analyzer", "constraint register", "procurement register", "notice clock"], adapters: ["oracle.primavera-cloud"], staffingSignals: ["schedule update", "critical path movement", "negative float"], authorityBoundary: "Analyzes/recommends recovery; cannot alter the contractual baseline or assert entitlement." },
  { id: "AG-PROC", taskStaffId: "procurement", name: "Procurement Agent", humanCounterparts: ["Procurement Manager", "Project Manager", "Financial Approver"], skills: ["procurement", "long-lead management", "submittal dependencies", "cost control"], tools: ["procurement register", "submittal register", "need-by analysis"], adapters: ["supplier.quote-feed", "erp.cost-commitments"], staffingSignals: ["long-lead item", "price validity risk", "supplier slippage"], authorityBoundary: "Monitors exposure; cannot issue purchase orders or supplier commitments." },
  { id: "AG-SAFE", taskStaffId: "safety", name: "Safety Agent", humanCounterparts: ["Safety Manager", "Competent Person", "Superintendent"], skills: ["JHA/JSA", "leading indicators", "field reporting", "workforce readiness"], tools: ["JHA/JSA checker", "leading-indicator analyzer", "daily-log evidence", "credential readiness"], adapters: ["weather.field-feed"], staffingSignals: ["high-risk activity", "repeat hazard", "corrective-action aging"], authorityBoundary: "Surfaces hazards/trends; cannot declare conditions safe or override the competent person." },
  { id: "AG-QC", taskStaffId: "qc", name: "QC Agent", humanCounterparts: ["Quality Control Manager", "Inspector/Testing Authority", "Superintendent"], skills: ["three-phase QC", "inspection evidence", "document control", "BIM/VDC"], tools: ["ITP checker", "NCR register", "photo manifest", "document register"], adapters: ["autodesk.issues", "autodesk.forma-data"], staffingSignals: ["preparatory phase", "initial control", "inspection hold point", "nonconformance"], authorityBoundary: "Checks evidence; cannot accept nonconforming work or replace inspection authority." },
  { id: "AG-LOG", taskStaffId: "daily-log", name: "Daily Log Agent", humanCounterparts: ["Superintendent", "Project Engineer", "Trade Foreman"], skills: ["field reporting", "evidence governance", "change recognition", "safety context"], tools: ["daily-log normalizer", "photo manifest", "notice clock"], adapters: ["weather.field-feed", "autodesk.issues"], staffingSignals: ["daily shift", "field event", "manpower exception"], authorityBoundary: "Drafts contemporaneous logs; cannot fabricate or overwrite signed field records." },
  { id: "AG-CHANGE", taskStaffId: "change", name: "Change Agent", humanCounterparts: ["Project Manager", "Commercial Manager", "Contracting/Owner Authority"], skills: ["change management", "contract risk", "cost exposure", "schedule exposure"], tools: ["notice clock", "EAC forecast", "CPM analyzer", "RFI register"], adapters: ["erp.cost-commitments"], staffingSignals: ["directive", "RFI impact", "revision impact", "notice deadline"], authorityBoundary: "Detects and assembles change evidence; cannot assert entitlement or execute a change order." },
  { id: "AG-COST", taskStaffId: "cost", name: "Cost Agent", humanCounterparts: ["Project Manager", "Project Controller", "Financial Approver"], skills: ["EAC forecasting", "cost-code control", "change management", "commercial risk"], tools: ["EAC engine", "cost-code engine", "quantity arithmetic"], adapters: ["erp.cost-commitments", "supplier.quote-feed"], staffingSignals: ["forecast cycle", "commitment update", "contingency threshold"], authorityBoundary: "Forecasts/reconciles; cannot post to the ledger or approve payment." },
  { id: "AG-CLOSE", taskStaffId: "closeout", name: "Closeout Agent", humanCounterparts: ["Project Manager", "Commissioning Authority", "Owner Acceptance Authority"], skills: ["commissioning", "turnover", "QC closeout", "document control"], tools: ["closeout checklist", "commissioning readiness", "submittal register", "NCR register"], adapters: ["autodesk.forma-data"], staffingSignals: ["system turnover", "substantial completion", "punch aging"], authorityBoundary: "Assesses readiness; cannot declare contractual completion or final acceptance." },
  { id: "AG-LESSON", taskStaffId: "lessons", name: "Lessons Agent", humanCounterparts: ["PMO/Operations Leader", "Quality Leader", "Training/Knowledge Owner"], skills: ["lessons learned", "evidence governance", "root-cause synthesis", "continuous improvement"], tools: ["lesson evidence linker", "evidence digest", "NCR/safety/cost outcome inputs"], adapters: [], staffingSignals: ["project closeout", "repeat nonconformance", "incident review"], authorityBoundary: "Drafts lesson candidates; canonical SOP/training changes require review." },
];

export const staffingPhaseDemand = [
  { phase: "Pursuit", agents: ["AG-PRECON", "AG-EST", "AG-DWG", "AG-SCHED", "AG-PROC"], humanFocus: ["Preconstruction Manager", "Estimator", "PM"] },
  { phase: "Preconstruction", agents: ["AG-PRECON", "AG-EST", "AG-DWG", "AG-RFI", "AG-SUBMIT", "AG-SCHED", "AG-PROC", "AG-SAFE", "AG-QC", "AG-CHANGE", "AG-COST"], humanFocus: ["PM", "VDC", "Estimator", "QC", "Safety"] },
  { phase: "Mobilization", agents: ["AG-SCHED", "AG-PROC", "AG-SAFE", "AG-QC", "AG-LOG", "AG-COST"], humanFocus: ["PM", "Superintendent", "QC", "Safety", "Trade leads"] },
  { phase: "Construction", agents: ["AG-DWG", "AG-RFI", "AG-SUBMIT", "AG-SCHED", "AG-PROC", "AG-SAFE", "AG-QC", "AG-LOG", "AG-CHANGE", "AG-COST"], humanFocus: ["PM", "Superintendent", "QC", "Safety", "Project Engineer"] },
  { phase: "Commissioning", agents: ["AG-SCHED", "AG-SAFE", "AG-QC", "AG-LOG", "AG-CHANGE", "AG-COST", "AG-CLOSE"], humanFocus: ["PM", "QC", "Commissioning Authority", "Owner"] },
  { phase: "Closeout", agents: ["AG-QC", "AG-COST", "AG-CLOSE", "AG-LESSON"], humanFocus: ["PM", "Commissioning/Acceptance", "PMO"] },
] as const;

export const staffingKpis = [
  "qualified role coverage",
  "credential currency",
  "critical-role backup coverage",
  "time to qualified assignment",
  "agent capability coverage",
  "human approval cycle time",
  "staffing-related schedule exposure",
  "quality/HSE staffing exceptions",
  "work evidence completeness",
  "human override rate",
  "training gap closure rate",
  "mission outcome quality",
] as const;

export function getTaskStaffStaffingSnapshot() {
  return {
    generatedAt: new Date().toISOString(),
    model: taskStaffStaffingModel,
    sharedServices: sharedTaskStaffServices,
    workflow: staffingWorkflow,
    readinessGates: staffingReadinessGates,
    adapters: constructionSystemAdapters,
    agents: agentStaffProfiles,
    phaseDemand: staffingPhaseDemand,
    kpis: staffingKpis,
  };
}
