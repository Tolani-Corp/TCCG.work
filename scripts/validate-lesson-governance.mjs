import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const fixtures = JSON.parse(
  await readFile(resolve(root, "agents/construction-staff/evals/lesson-governance-cases.json"), "utf8"),
);
const moduleUrl = pathToFileURL(resolve(root, "src/lib/lessonGovernance.ts")).href;
const { assessLessonCandidate } = await import(moduleUrl);

let failures = 0;
for (const fixture of fixtures) {
  const decision = assessLessonCandidate(fixture.input, fixture.context);
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

if (failures > 0) process.exit(1);
console.log(`Validated ${fixtures.length} TCCG lesson-governance fixtures.`);
