export type TccgSignalOsHardStop =
  | "rights"
  | "legal"
  | "regulatory"
  | "security"
  | "safety"
  | "reputation"
  | "economic";

export type TccgSignalOsEvidence = {
  sourceUrl: string;
  provider: string;
  observedAt: string;
  contentDigestSha256: string;
  confidence: number;
  changeStatus?: "new" | "same" | "changed" | "removed" | "unknown";
};

export type TccgSignalOsCommercialSignal = {
  schema: "tolani.signalos.commercial-signal.v1";
  signalId: string;
  tenantId: string;
  namespaceKey: string;
  productId: string;
  sourceId: string;
  observationIds: string[];
  signalType: string;
  status: "advisory-evidence-only";
  score: number;
  posture:
    | "PRODUCT_CANDIDATE"
    | "CUSTOMER_ALERT_CANDIDATE"
    | "INTERNAL_VALIDATE"
    | "OBSERVE"
    | "REJECT";
  workDisposition:
    | "QUALIFIED"
    | "INTERNAL_ONLY"
    | "HOLD_FOR_REMEDIATION"
    | "FINAL_REJECT";
  evidence: TccgSignalOsEvidence[];
  portfolioRoute: string[];
  evidenceDigestSha256: string;
  sourcePolicyDigestSha256: string;
  hardStops: TccgSignalOsHardStop[];
  authority: {
    automaticPublish: false;
    automaticSpend: false;
    automaticCapitalAllocation: false;
    automaticCapabilityActivation: false;
    humanApprovalRequired: true;
  };
  commercialization: {
    productFamily: string;
    revenueModel: string;
    targetSegment: string;
    revenueAttributionEligible: boolean;
  };
  generatedAt: string;
};

export type TccgSignalOsCaptureDecision = {
  schema: "tccg.signalos.capture-consumer.v1";
  signalId: string;
  productFamily: string;
  decision: "stage-capture-review" | "internal-research-only" | "hold-for-remediation" | "reject";
  captureStage: "source";
  captureDecision: "review";
  requiresHumanApproval: true;
  reasons: string[];
  evidenceUrls: string[];
  blockedAutomation: string[];
};

export type TccgSignalOsCaptureSeed = {
  schema: "tccg.signalos.capture-seed.v1";
  sourceTruthId: "tccg.capture_management.v1";
  externalSignalId: string;
  sourceId: string;
  sourceName: "Tolani SignalOS";
  sourceType: "signalos-advisory";
  signalType: string;
  score: number;
  reviewStage: "source";
  decision: "review";
  evidenceUrls: string[];
  evidenceDigestSha256: string;
  sourcePolicyDigestSha256: string;
  generatedAt: string;
  authority: {
    goNoGoApproved: false;
    bidAuthorized: false;
    proposalAuthorized: false;
    submissionAuthorized: false;
    supplierAwardAuthorized: false;
    spendAuthorized: false;
    customerPublicationAuthorized: false;
  };
};

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const TCCG_PRODUCT_FAMILIES = new Set(["buildsignal", "contractsignal", "sourcesignal"]);

function validUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validateSignal(signal: TccgSignalOsCommercialSignal): string[] {
  const reasons: string[] = [];
  if (signal.schema !== "tolani.signalos.commercial-signal.v1") reasons.push("Unsupported SignalOS schema.");
  if (signal.status !== "advisory-evidence-only") reasons.push("Signal must remain advisory-evidence-only.");
  if (signal.tenantId !== "tolani-corp") reasons.push("Signal tenant is not Tolani Corp.");
  if (!Array.isArray(signal.portfolioRoute) || !signal.portfolioRoute.includes("tccg")) reasons.push("Signal is not routed to TCCG.");
  if (!TCCG_PRODUCT_FAMILIES.has(signal.commercialization?.productFamily ?? "")) reasons.push("Signal product family is not approved for TCCG capture review.");
  if (!Number.isFinite(signal.score) || signal.score < 0 || signal.score > 100) reasons.push("Signal score is outside the allowed range.");
  if (!DIGEST_PATTERN.test(signal.evidenceDigestSha256 ?? "")) reasons.push("Evidence digest is invalid.");
  if (!DIGEST_PATTERN.test(signal.sourcePolicyDigestSha256 ?? "")) reasons.push("Source-policy digest is invalid.");
  if (!Array.isArray(signal.evidence) || signal.evidence.length === 0) {
    reasons.push("Signal has no source evidence.");
  } else {
    for (const evidence of signal.evidence) {
      if (!validUrl(evidence.sourceUrl)) reasons.push("Evidence contains an invalid source URL.");
      if (!DIGEST_PATTERN.test(evidence.contentDigestSha256 ?? "")) reasons.push("Evidence contains an invalid content digest.");
      if (!Number.isFinite(Date.parse(evidence.observedAt))) reasons.push("Evidence contains an invalid observedAt timestamp.");
      if (!Number.isFinite(evidence.confidence) || evidence.confidence < 0 || evidence.confidence > 1) reasons.push("Evidence confidence is outside the allowed range.");
    }
  }
  if (signal.authority?.automaticPublish !== false) reasons.push("Signal attempts to grant publication authority.");
  if (signal.authority?.automaticSpend !== false) reasons.push("Signal attempts to grant spending authority.");
  if (signal.authority?.automaticCapitalAllocation !== false) reasons.push("Signal attempts to grant capital-allocation authority.");
  if (signal.authority?.automaticCapabilityActivation !== false) reasons.push("Signal attempts to grant capability-activation authority.");
  if (signal.authority?.humanApprovalRequired !== true) reasons.push("Signal must require human approval.");
  return [...new Set(reasons)];
}

export function evaluateSignalOsForTccg(
  signal: TccgSignalOsCommercialSignal,
): TccgSignalOsCaptureDecision {
  const validationReasons = validateSignal(signal);
  const blockedAutomation = [
    "No automatic go/no-go decision.",
    "No automatic bid, proposal, or submission authority.",
    "No automatic subcontractor/vendor award, purchase, or spend.",
    "No automatic customer-facing claim or portfolio publication.",
    "No hard-stop override based on commercial score.",
  ];

  if (validationReasons.length > 0) {
    return {
      schema: "tccg.signalos.capture-consumer.v1",
      signalId: signal.signalId || "invalid-signal",
      productFamily: signal.commercialization?.productFamily ?? "unknown",
      decision: "reject",
      captureStage: "source",
      captureDecision: "review",
      requiresHumanApproval: true,
      reasons: validationReasons,
      evidenceUrls: [],
      blockedAutomation,
    };
  }

  const hardStops = Array.isArray(signal.hardStops) ? signal.hardStops : [];
  if (hardStops.length > 0 || signal.workDisposition === "HOLD_FOR_REMEDIATION" || signal.posture === "REJECT") {
    return {
      schema: "tccg.signalos.capture-consumer.v1",
      signalId: signal.signalId,
      productFamily: signal.commercialization.productFamily,
      decision: signal.workDisposition === "FINAL_REJECT" ? "reject" : "hold-for-remediation",
      captureStage: "source",
      captureDecision: "review",
      requiresHumanApproval: true,
      reasons: hardStops.length > 0
        ? [`Signal has active hard stops: ${hardStops.join(", ")}.`]
        : ["Signal requires remediation before TCCG capture review."],
      evidenceUrls: signal.evidence.map((item) => item.sourceUrl),
      blockedAutomation,
    };
  }

  const commerciallyQualified = signal.workDisposition === "QUALIFIED" && signal.score >= 70;
  return {
    schema: "tccg.signalos.capture-consumer.v1",
    signalId: signal.signalId,
    productFamily: signal.commercialization.productFamily,
    decision: commerciallyQualified ? "stage-capture-review" : "internal-research-only",
    captureStage: "source",
    captureDecision: "review",
    requiresHumanApproval: true,
    reasons: commerciallyQualified
      ? ["Qualified advisory evidence may be staged in TCCG capture review; capture authority remains with TCCG operators."]
      : ["Advisory evidence is retained for research but does not meet the capture-review threshold."],
    evidenceUrls: signal.evidence.map((item) => item.sourceUrl),
    blockedAutomation,
  };
}

export function toTccgCaptureSeed(
  signal: TccgSignalOsCommercialSignal,
): TccgSignalOsCaptureSeed | null {
  const decision = evaluateSignalOsForTccg(signal);
  if (decision.decision !== "stage-capture-review") return null;

  return {
    schema: "tccg.signalos.capture-seed.v1",
    sourceTruthId: "tccg.capture_management.v1",
    externalSignalId: signal.signalId,
    sourceId: signal.sourceId,
    sourceName: "Tolani SignalOS",
    sourceType: "signalos-advisory",
    signalType: signal.signalType,
    score: signal.score,
    reviewStage: "source",
    decision: "review",
    evidenceUrls: decision.evidenceUrls,
    evidenceDigestSha256: signal.evidenceDigestSha256,
    sourcePolicyDigestSha256: signal.sourcePolicyDigestSha256,
    generatedAt: signal.generatedAt,
    authority: {
      goNoGoApproved: false,
      bidAuthorized: false,
      proposalAuthorized: false,
      submissionAuthorized: false,
      supplierAwardAuthorized: false,
      spendAuthorized: false,
      customerPublicationAuthorized: false,
    },
  };
}
