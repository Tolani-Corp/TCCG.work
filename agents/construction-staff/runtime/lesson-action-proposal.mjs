import { createHash } from "node:crypto";

const ALLOWED_DISPOSITIONS = new Set([
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
]);

function uniqueStrings(values) {
  return [...new Set((values ?? []).filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim()))];
}

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function buildLessonActionProposal({
  lesson,
  admissionDecision,
  disposition,
  owner,
  affectedArtifacts = [],
  acceptanceCriteria = [],
  testPlan = [],
  rollbackPlan = [],
}) {
  if (!lesson?.id) throw new Error("lesson.id is required");
  if (admissionDecision?.status !== "eligible-for-human-review") {
    throw new Error("Only an eligible-for-human-review lesson may create an action proposal");
  }
  if (!ALLOWED_DISPOSITIONS.has(disposition)) throw new Error(`Unsupported lesson disposition: ${disposition}`);
  if (!owner?.trim()) throw new Error("Action proposal owner is required");

  const evidenceIds = uniqueStrings((lesson.evidence ?? []).map((item) => item.id));
  if (evidenceIds.length === 0) throw new Error("Action proposal requires lesson evidence identifiers");

  const criteria = uniqueStrings(acceptanceCriteria);
  const tests = uniqueStrings(testPlan);
  const rollback = uniqueStrings(rollbackPlan);
  const requiresChangeControl = !["NO_ACTION", "MONITOR"].includes(disposition);

  if (requiresChangeControl && criteria.length === 0) {
    throw new Error("Change action proposal requires acceptance criteria");
  }
  if (requiresChangeControl && tests.length === 0) {
    throw new Error("Change action proposal requires a test plan");
  }
  if (requiresChangeControl && rollback.length === 0) {
    throw new Error("Change action proposal requires a rollback plan");
  }
  if (admissionDecision.programDesignRequired && lesson.programDesign?.status !== "approved") {
    throw new Error("Program Design approval is required before substantial action proposal creation");
  }
  if (admissionDecision.comprehensionRequired && lesson.comprehension?.status !== "passed") {
    throw new Error("Human Comprehension evidence is required before risk-controlled action proposal creation");
  }

  const proposalCore = {
    lessonId: lesson.id,
    tenantId: lesson.tenantId,
    projectId: lesson.projectId ?? null,
    channel: lesson.channel,
    risk: lesson.risk,
    disposition,
    impactDomains: uniqueStrings(lesson.impactDomains),
    evidenceIds,
    owner: owner.trim(),
    affectedArtifacts: uniqueStrings(affectedArtifacts),
    acceptanceCriteria: criteria,
    testPlan: tests,
    rollbackPlan: rollback,
    programDesignBundleId: lesson.programDesign?.bundleId ?? null,
    comprehensionEvidenceId: lesson.comprehension?.evidenceId ?? null,
    z4LessonId: lesson.z4Approval?.lessonId ?? null,
    requiredApprovals: uniqueStrings(admissionDecision.requiredApprovals),
  };

  return {
    schema: "tccg.lesson-action-proposal.v1",
    id: `lesson-action:${lesson.id}:${digest(proposalCore).slice(0, 16)}`,
    status: "draft-action-proposal",
    ...proposalCore,
    authority: {
      mayCreateExternalIssue: false,
      mayModifyRepository: false,
      maySubmitExternally: false,
      mayCommitContract: false,
      mayCommitFunds: false,
      mayChangeSafetyPolicy: false,
      mayActivateCapability: false,
      mayMerge: false,
      mayDeploy: false,
    },
    nextStep: disposition === "NO_ACTION"
      ? "record-reviewed-no-action"
      : disposition === "MONITOR"
        ? "human-owner-accept-monitoring-plan"
        : "human-owner-accept-change-proposal",
  };
}
