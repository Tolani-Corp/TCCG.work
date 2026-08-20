import assert from "node:assert/strict";

const { evaluateSignalOsForTccg, toTccgCaptureSeed } = await import("../src/lib/signalosCapture.ts");

const digest = "b".repeat(64);
const baseSignal = {
  schema: "tolani.signalos.commercial-signal.v1",
  signalId: "signal-build-001",
  tenantId: "tolani-corp",
  namespaceKey: "tolani.harness.core:tolani-corp:preview",
  productId: "tolanicorp-hq",
  sourceId: "public-contract-source",
  observationIds: ["obs-build-001"],
  signalType: "construction-opportunity",
  status: "advisory-evidence-only",
  score: 88,
  posture: "PRODUCT_CANDIDATE",
  workDisposition: "QUALIFIED",
  evidence: [
    {
      sourceUrl: "https://example.gov/opportunity/001",
      provider: "firecrawl-v2",
      observedAt: "2026-08-20T16:30:00.000Z",
      contentDigestSha256: digest,
      confidence: 0.94,
      changeStatus: "new",
    },
  ],
  portfolioRoute: ["tccg"],
  evidenceDigestSha256: digest,
  sourcePolicyDigestSha256: digest,
  hardStops: [],
  authority: {
    automaticPublish: false,
    automaticSpend: false,
    automaticCapitalAllocation: false,
    automaticCapabilityActivation: false,
    humanApprovalRequired: true,
  },
  commercialization: {
    productFamily: "buildsignal",
    revenueModel: "subscription",
    targetSegment: "construction capture teams",
    revenueAttributionEligible: true,
  },
  generatedAt: "2026-08-20T16:30:00.000Z",
};

const staged = evaluateSignalOsForTccg(baseSignal);
assert.equal(staged.decision, "stage-capture-review");
assert.equal(staged.captureStage, "source");
assert.equal(staged.captureDecision, "review");
assert.equal(staged.requiresHumanApproval, true);
assert.ok(staged.blockedAutomation.some((item) => /No automatic bid/i.test(item)));

const seed = toTccgCaptureSeed(baseSignal);
assert.ok(seed);
assert.equal(seed.sourceTruthId, "tccg.capture_management.v1");
assert.equal(seed.decision, "review");
assert.equal(seed.authority.goNoGoApproved, false);
assert.equal(seed.authority.bidAuthorized, false);
assert.equal(seed.authority.submissionAuthorized, false);
assert.equal(seed.authority.spendAuthorized, false);

const held = evaluateSignalOsForTccg({
  ...baseSignal,
  signalId: "signal-build-held",
  posture: "REJECT",
  workDisposition: "HOLD_FOR_REMEDIATION",
  hardStops: ["regulatory"],
});
assert.equal(held.decision, "hold-for-remediation");
assert.equal(toTccgCaptureSeed({
  ...baseSignal,
  signalId: "signal-build-held",
  posture: "REJECT",
  workDisposition: "HOLD_FOR_REMEDIATION",
  hardStops: ["regulatory"],
}), null);

const researchOnly = evaluateSignalOsForTccg({
  ...baseSignal,
  signalId: "signal-build-research",
  score: 62,
  posture: "INTERNAL_VALIDATE",
  workDisposition: "INTERNAL_ONLY",
});
assert.equal(researchOnly.decision, "internal-research-only");

const invalidAuthority = evaluateSignalOsForTccg({
  ...baseSignal,
  signalId: "signal-build-invalid",
  authority: {
    ...baseSignal.authority,
    automaticPublish: true,
  },
});
assert.equal(invalidAuthority.decision, "reject");
assert.ok(invalidAuthority.reasons.some((reason) => /publication authority/i.test(reason)));

console.log(JSON.stringify({
  ok: true,
  schema: staged.schema,
  qualifiedDecision: staged.decision,
  heldDecision: held.decision,
  researchDecision: researchOnly.decision,
  bidAuthorized: seed?.authority.bidAuthorized,
  submissionAuthorized: seed?.authority.submissionAuthorized,
}, null, 2));
