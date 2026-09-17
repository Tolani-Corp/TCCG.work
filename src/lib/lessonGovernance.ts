export const LESSON_IMPACT_DOMAINS = [
  "BIM_VDC",
  "CDE",
  "ESTIMATING",
  "COST_CODES",
  "SUBCONTRACTORS",
  "PROCUREMENT",
  "QC",
  "HSE",
  "OWNER_DASHBOARDS",
  "PROJECT_TEMPLATES",
  "PRECONSTRUCTION",
  "CAPABILITIES_PORTFOLIO",
  "TOLANI_LABS_TRAINING",
  "AI_AGENTS",
  "VENDORS",
  "BONDING_INSURANCE",
  "GOVERNMENT_CONTRACTING",
] as const;

export const LESSON_DISPOSITIONS = [
  "NO_ACTION",
  "MONITOR",
  "DOCUMENT_UPDATE",
  "TRAINING_UPDATE",
  "EVALUATION_UPDATE",
  "PROCESS_UPDATE",
  "SOFTWARE_CHANGE",
  "SKILL_CANDIDATE",
  "TOOL_CANDIDATE",
  "DETERMINISTIC_CAPABILITY_CANDIDATE",
  "POLICY_REVIEW",
] as const;

export type LessonImpactDomain = (typeof LESSON_IMPACT_DOMAINS)[number];
export type LessonDisposition = (typeof LESSON_DISPOSITIONS)[number];
export type LessonRisk = "low" | "medium" | "high";
export type LessonChannel = "operational" | "research";
export type LessonEvidenceStatus =
  | "approved"
  | "verified"
  | "unavailable"
  | "conflicting"
  | "superseded"
  | "revoked";

export type LessonEvidenceRef = {
  id: string;
  tenantId: string;
  projectId?: string;
  status: LessonEvidenceStatus;
  supportsClaim: boolean;
  sourceType: "project" | "z4" | "standard" | "regulation" | "manufacturer" | "external-media";
};

export type ProgramDesignRef = {
  status: "approved" | "missing" | "not_required";
  bundleId?: string;
};

export type ComprehensionRef = {
  status: "passed" | "failed" | "missing" | "not_required";
  evidenceId?: string;
  score?: number;
};

export type Z4ApprovalRef = {
  status: "approved" | "quarantined" | "rejected";
  lessonId?: string;
};

export type LessonCandidateInput = {
  id: string;
  title: string;
  channel: LessonChannel;
  tenantId: string;
  projectId?: string;
  risk: LessonRisk;
  impactDomains: LessonImpactDomain[];
  requestedDispositions: LessonDisposition[];
  evidence: LessonEvidenceRef[];
  conflictStatus?: "none" | "resolved" | "unresolved";
  superseded?: boolean;
  rawExternalContent?: boolean;
  z4Approval?: Z4ApprovalRef;
  programDesign?: ProgramDesignRef;
  comprehension?: ComprehensionRef;
  changesControlledStandard?: boolean;
  safetyRelated?: boolean;
  contractRelated?: boolean;
  costRelated?: boolean;
  requestedEffects?: string[];
};

export type LessonAdmissionContext = {
  tenantId: string;
  projectId?: string;
  allowedEvidenceIds?: string[];
};

export type LessonAdmissionStatus =
  | "eligible-for-human-review"
  | "evidence-gap"
  | "abstain"
  | "blocked-return-to-design"
  | "blocked-comprehension"
  | "denied";

export type LessonAdmissionDecision = {
  status: LessonAdmissionStatus;
  reasons: string[];
  requiredApprovals: string[];
  programDesignRequired: boolean;
  comprehensionRequired: boolean;
  executionAuthority: false;
  externalSubmissionAllowed: false;
  contractCommitmentAllowed: false;
  financialCommitmentAllowed: false;
  safetyAuthorityAllowed: false;
  policyActivationAllowed: false;
};

const PROGRAM_DESIGN_DISPOSITIONS = new Set<LessonDisposition>([
  "DOCUMENT_UPDATE",
  "PROCESS_UPDATE",
  "SOFTWARE_CHANGE",
  "SKILL_CANDIDATE",
  "TOOL_CANDIDATE",
  "DETERMINISTIC_CAPABILITY_CANDIDATE",
  "POLICY_REVIEW",
]);

const PROHIBITED_EFFECTS = new Set([
  "external_submission",
  "contract_commitment",
  "financial_commitment",
  "safety_authority",
  "regulatory_determination",
  "tool_grant",
  "policy_activation",
  "production_mutation",
]);

function baseDecision(
  status: LessonAdmissionStatus,
  reasons: string[],
  requiredApprovals: string[],
  programDesignRequired: boolean,
  comprehensionRequired: boolean,
): LessonAdmissionDecision {
  return {
    status,
    reasons,
    requiredApprovals,
    programDesignRequired,
    comprehensionRequired,
    executionAuthority: false,
    externalSubmissionAllowed: false,
    contractCommitmentAllowed: false,
    financialCommitmentAllowed: false,
    safetyAuthorityAllowed: false,
    policyActivationAllowed: false,
  };
}

function requiresProgramDesign(input: LessonCandidateInput): boolean {
  return (
    Boolean(input.changesControlledStandard) ||
    input.requestedDispositions.some((disposition) => PROGRAM_DESIGN_DISPOSITIONS.has(disposition))
  );
}

function requiredComprehensionScore(risk: LessonRisk): number | null {
  if (risk === "high") return 0.9;
  if (risk === "medium") return 0.8;
  return null;
}

export function assessLessonCandidate(
  input: LessonCandidateInput,
  context: LessonAdmissionContext,
): LessonAdmissionDecision {
  const reasons: string[] = [];
  const requiredApprovals = new Set<string>(["functional owner/Tolani Labs"]);
  const programDesignRequired = requiresProgramDesign(input);
  const comprehensionThreshold = programDesignRequired ? requiredComprehensionScore(input.risk) : null;
  const comprehensionRequired = comprehensionThreshold !== null;

  if (input.tenantId !== context.tenantId) {
    return baseDecision("denied", ["tenant-mismatch"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  if (input.projectId && context.projectId && input.projectId !== context.projectId) {
    return baseDecision("denied", ["project-isolation-denial"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  if (input.evidence.length === 0) {
    return baseDecision("evidence-gap", ["missing-evidence"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  if (input.rawExternalContent) {
    return baseDecision(
      "denied",
      ["raw-external-content-is-not-authority"],
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  const prohibitedEffects = (input.requestedEffects ?? []).filter((effect) => PROHIBITED_EFFECTS.has(effect));
  if (prohibitedEffects.length > 0) {
    return baseDecision(
      "denied",
      prohibitedEffects.map((effect) => `prohibited-effect:${effect}`),
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  for (const evidence of input.evidence) {
    if (evidence.tenantId !== context.tenantId) {
      return baseDecision("denied", [`evidence-tenant-mismatch:${evidence.id}`], [...requiredApprovals], programDesignRequired, comprehensionRequired);
    }
    if (context.projectId && evidence.projectId && evidence.projectId !== context.projectId) {
      return baseDecision("denied", [`evidence-project-mismatch:${evidence.id}`], [...requiredApprovals], programDesignRequired, comprehensionRequired);
    }
    if (context.allowedEvidenceIds && !context.allowedEvidenceIds.includes(evidence.id)) {
      return baseDecision("denied", [`evidence-permission-denied:${evidence.id}`], [...requiredApprovals], programDesignRequired, comprehensionRequired);
    }
  }

  if (input.channel === "research") {
    if (input.z4Approval?.status !== "approved" || !input.z4Approval.lessonId) {
      return baseDecision(
        "denied",
        ["research-lesson-not-z4-approved"],
        [...requiredApprovals],
        programDesignRequired,
        comprehensionRequired,
      );
    }
  }

  if (input.conflictStatus === "unresolved") {
    return baseDecision("abstain", ["unresolved-lesson-conflict"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  if (input.superseded) {
    return baseDecision("abstain", ["lesson-superseded"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  const supportingEvidence = input.evidence.filter((evidence) => evidence.supportsClaim);
  if (supportingEvidence.length === 0) {
    return baseDecision("evidence-gap", ["no-claim-supporting-evidence"], [...requiredApprovals], programDesignRequired, comprehensionRequired);
  }

  const unavailableSupport = supportingEvidence.filter((evidence) => evidence.status === "unavailable");
  if (unavailableSupport.length > 0) {
    return baseDecision(
      "evidence-gap",
      unavailableSupport.map((evidence) => `unavailable-supporting-source:${evidence.id}`),
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  const invalidSupport = supportingEvidence.filter((evidence) =>
    ["conflicting", "superseded", "revoked"].includes(evidence.status),
  );
  if (invalidSupport.length > 0) {
    return baseDecision(
      "abstain",
      invalidSupport.map((evidence) => `invalid-supporting-evidence:${evidence.id}:${evidence.status}`),
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  if (programDesignRequired && input.programDesign?.status !== "approved") {
    return baseDecision(
      "blocked-return-to-design",
      ["approved-program-design-bundle-required"],
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  if (programDesignRequired && input.programDesign?.status === "approved" && !input.programDesign.bundleId) {
    return baseDecision(
      "blocked-return-to-design",
      ["program-design-bundle-id-required"],
      [...requiredApprovals],
      programDesignRequired,
      comprehensionRequired,
    );
  }

  if (comprehensionRequired) {
    const score = input.comprehension?.score ?? -1;
    if (
      input.comprehension?.status !== "passed" ||
      !input.comprehension.evidenceId ||
      score < (comprehensionThreshold ?? 1)
    ) {
      return baseDecision(
        "blocked-comprehension",
        [`comprehension-threshold:${comprehensionThreshold}`],
        [...requiredApprovals],
        programDesignRequired,
        comprehensionRequired,
      );
    }
  }

  if (input.safetyRelated) requiredApprovals.add("authorized safety professional/site leadership");
  if (input.contractRelated) requiredApprovals.add("project manager/contract authority");
  if (input.costRelated) requiredApprovals.add("project manager/project controls");
  if (input.risk === "high") requiredApprovals.add("named release authority");

  reasons.push("evidence-grounded-candidate");
  if (input.channel === "research") reasons.push("z4-approved-research-lesson");
  if (programDesignRequired) reasons.push("program-design-gate-satisfied");
  if (comprehensionRequired) reasons.push("human-comprehension-gate-satisfied");

  return baseDecision(
    "eligible-for-human-review",
    reasons,
    [...requiredApprovals],
    programDesignRequired,
    comprehensionRequired,
  );
}
