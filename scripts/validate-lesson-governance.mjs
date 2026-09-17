import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { buildLessonActionProposal } from "../agents/construction-staff/runtime/lesson-action-proposal.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const fixtures = JSON.parse(
  await readFile(resolve(root, "agents/construction-staff/evals/lesson-governance-cases.json"), "utf8"),
);
const moduleUrl = pathToFileURL(resolve(root, "src/lib/lessonGovernance.ts")).href;
const { assessLessonCandidate } = await import(moduleUrl);

let failures = 0;
const decisions = new Map();
for (const fixture of fixtures) {
  const decision = assessLessonCandidate(fixture.input, fixture.context);
  decisions.set(fixture.name, decision);
  if (decision.status !== fixture.expectedStatus) {
    console.error(`${fixture.name}: expected ${fixture.expectedStatus}, received ${decision.status}`);
    failures += 1;
  }
  for (const approval of fixture.expectedApprovals ?? []) {
    if (!decision.requiredApprovals.includes(approval)) {
      console.error(`${fixture.name}: missing required approval ${approval}`);
      failures += 1;
    }
  }
  if (decision.executionAuthority !== false) {
    console.error(`${fixture.name}: lesson decision must never grant execution authority`);
    failures += 1;
  }
  if (
    decision.externalSubmissionAllowed !== false ||
    decision.contractCommitmentAllowed !== false ||
    decision.financialCommitmentAllowed !== false ||
    decision.safetyAuthorityAllowed !== false ||
    decision.policyActivationAllowed !== false
  ) {
    console.error(`${fixture.name}: authority boundary weakened`);
    failures += 1;
  }
}

const normalFixture = fixtures.find((fixture) => fixture.name === "normal operational lesson remains a human-review candidate");
const normalDecision = decisions.get(normalFixture.name);
const actionProposal = buildLessonActionProposal({
  lesson: normalFixture.input,
  admissionDecision: normalDecision,
  disposition: "EVALUATION_UPDATE",
  owner: "TCCG project controls",
  affectedArtifacts: ["agents/construction-staff/evals"],
  acceptanceCriteria: ["New fixture reproduces the validated lesson without weakening authority boundaries."],
  testPlan: ["Run pnpm tccg:lessons:validate and confirm all existing fixtures remain green."],
  rollbackPlan: ["Remove the candidate fixture if it creates a false-positive or regression."],
});
if (actionProposal.status !== "draft-action-proposal") {
  console.error(`Expected draft-action-proposal; received ${actionProposal.status}`);
  failures += 1;
}
if (
  actionProposal.authority.mayCreateExternalIssue ||
  actionProposal.authority.mayModifyRepository ||
  actionProposal.authority.maySubmitExternally ||
  actionProposal.authority.mayCommitContract ||
  actionProposal.authority.mayCommitFunds ||
  actionProposal.authority.mayChangeSafetyPolicy ||
  actionProposal.authority.mayActivateCapability ||
  actionProposal.authority.mayMerge ||
  actionProposal.authority.mayDeploy
) {
  console.error("Action proposal improperly granted execution or release authority");
  failures += 1;
}

const blockedFixture = fixtures.find((fixture) => fixture.name === "substantial change without program design is blocked");
const blockedDecision = decisions.get(blockedFixture.name);
let blockedProposalRejected = false;
try {
  buildLessonActionProposal({
    lesson: blockedFixture.input,
    admissionDecision: blockedDecision,
    disposition: "SOFTWARE_CHANGE",
    owner: "TCCG digital delivery",
    acceptanceCriteria: ["Should never reach proposal creation."],
    testPlan: ["Should never execute."],
    rollbackPlan: ["No change should exist."],
  });
} catch {
  blockedProposalRejected = true;
}
if (!blockedProposalRejected) {
  console.error("Blocked lesson improperly created an action proposal");
  failures += 1;
}

if (failures > 0) process.exit(1);
console.log(`Validated ${fixtures.length} TCCG lesson-governance fixtures plus governed action-proposal boundaries.`);
