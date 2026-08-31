import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync(".tolani/holdco-evidence-producers.v1.json", "utf8"));
const errors = [];
const fail = (message) => errors.push(message);

if (manifest.schemaVersion !== "tolani.holdco.evidence-producers.v1") fail("schemaVersion invalid");
if (manifest.repository !== "Tolani-Corp/TCCG.work") fail("repository binding invalid");
if (manifest.portfolioId !== "tccg") fail("portfolioId must remain tccg");
if (manifest.defaultDeny !== true) fail("default deny required");
for (const [key, value] of Object.entries(manifest.emission ?? {})) if (value !== false) fail(`emission.${key} must remain false`);
if (manifest.producers?.length !== 1) fail("exactly one TCCG producer expected");
const producer = manifest.producers?.[0] ?? {};
if (producer.id !== "tccg-operations") fail("producer id must remain tccg-operations");
if (producer.authorityClass !== "portfolio-operator") fail("authority class must remain portfolio-operator");
if (producer.subjectScope !== "self-only") fail("TCCG evidence must remain self-only");
const allowedCapital = new Set(["executionReadiness", "sharedPlatformReuse"]);
const allowedPlatform = new Set(["portfolioAdoption"]);
for (const factor of producer.claims?.capital ?? []) if (!allowedCapital.has(factor)) fail(`capital factor overreach: ${factor}`);
for (const factor of producer.claims?.sharedPlatformValue ?? []) if (!allowedPlatform.has(factor)) fail(`platform factor overreach: ${factor}`);
for (const field of ["sourceTimestamp", "contentDigest", "evidenceRefs"]) if (!producer.requiredClaimFields?.includes(field)) fail(`required claim field missing: ${field}`);
for (const forbidden of ["revenueCustomerTraction", "grossMarginQuality", "roicReturnPotential", "capital-release", "autonomy-promotion", "production-authority"]) {
  if (!producer.forbiddenClaims?.includes(forbidden)) fail(`forbidden claim guard missing: ${forbidden}`);
}
if (errors.length) {
  console.error("TCCG HoldCo evidence producer validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log("TCCG HoldCo evidence producer validated: disabled-by-default, self-only, non-financial operating evidence only.");
