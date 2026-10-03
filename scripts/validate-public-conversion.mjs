import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fail = (message) => {
  throw new Error(`[tccg-public-conversion] ${message}`);
};
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));

const context = readJson("config/public-product-context.json");
const homepage = read("src/components/PublicMarketingSite.tsx");
const page = read("src/app/page.tsx");
const contact = read("src/components/ContactIntake.tsx");
const analytics = read("src/lib/publicConversionAnalytics.ts");
const tracker = read("src/components/PublicConversionClient.tsx");
const contextContract = read("src/lib/publicProductContext.ts");
const commercialContext = read("docs/COMMERCIAL_CONTEXT.md");
const packageSource = read("package.json");
const workflow = read(".github/workflows/digital-launch-ci.yml");

if (context.entityId !== "tccg.work") fail("context entity must be tccg.work");
if (context.canonicalRepo !== "Tolani-Corp/TCCG.work") fail("canonical repository drifted");
if (context.canonicalDomain !== "tccg.work") fail("canonical domain drifted");
if (context.classification !== "operating_company") fail("classification drifted");
if (context.publicStatus !== "G2") fail(`public status must remain G2; found ${context.publicStatus}`);
if (context.commercialAuthority !== "local_with_portfolio_governance") fail("commercial authority drifted");
if (context.inheritsProtocolFrom !== "Tolani-Corp/TolaniCorp-HQ:tolani.portfolio.commercial_context.v1") fail("central Commercial Context Plane inheritance drifted");
if (context.primaryCTA?.route !== "/contact") fail("primary CTA must route to /contact");
if (context.secondaryCTA?.route !== "/capabilities") fail("secondary CTA must route to /capabilities");
if (context.operationalHandoff?.system !== "POST /api/intake") fail("primary handoff must use the governed server-side intake API");
if (context.operationalHandoff?.fallback !== "mailto:info@tccg.work") fail("email fallback must remain available");
if (context.operationalHandoff?.durableAcceptanceRequires !== "TCCG_INTAKE_WEBHOOK_URL") fail("durable intake dependency must be explicit");
if (context.pricing !== null || context.serviceArea !== null) fail("pricing/service area must remain unset until current evidence authorizes them");

for (const proofPath of context.proof ?? []) {
  if (proofPath.startsWith("issues/")) continue;
  if (!fs.existsSync(path.join(root, proofPath))) fail(`declared proof path is missing: ${proofPath}`);
}

const requiredEvents = [
  "public_page_viewed",
  "tccg_project_review_started",
  "tccg_qualification_review_started",
  "tccg_intake_email_prepared",
  "tccg_intake_submitted",
  "tccg_intake_delivery_failed",
];
for (const event of requiredEvents) {
  if (!context.analytics?.events?.includes(event)) fail(`context analytics is missing ${event}`);
  if (!contextContract.includes(`| \"${event}\"`)) fail(`typed event contract is missing ${event}`);
}
if (context.primaryCTA.event !== "tccg_project_review_started") fail("primary CTA event drifted");
if (context.secondaryCTA.event !== "tccg_qualification_review_started") fail("secondary CTA event drifted");

for (const token of [
  "context.valueProposition",
  "context.differentiators.map",
  "context.legalAndCompliance.rule",
  "context.primaryCTA.route",
  "context.primaryCTA.event",
  "context.secondaryCTA.route",
  "context.secondaryCTA.event",
  "<PublicPageViewTracker publicStatus={context.publicStatus} />",
]) {
  if (!homepage.includes(token)) fail(`homepage lost governed context consumption: ${token}`);
}

for (const retiredMarketingToken of [
  "launchReadiness",
  "structural readiness",
  "trainingPipeline",
  "agentPrototypes.length",
  "governed construction-agent prototypes",
]) {
  if (homepage.includes(retiredMarketingToken)) fail(`homepage reintroduced internal launch maturity as persuasion: ${retiredMarketingToken}`);
}

const prohibitedLiteralPatterns = [
  /active\s+SAM/i,
  /SDVOSB\s+certified/i,
  /VetCert\s+certified/i,
  /bonding\s+capacity\s*[:$]/i,
  /licensed\s+general\s+contractor/i,
  /licensed\s+HVAC/i,
  /guaranteed\s+savings/i,
  /proven\s+savings/i,
];
for (const pattern of prohibitedLiteralPatterns) {
  if (pattern.test(homepage)) fail(`homepage contains unverified high-risk claim pattern: ${pattern}`);
}

if (!page.includes("tccgPublicProductContext.seo.title") || !page.includes("tccgPublicProductContext.seo.description")) {
  fail("homepage metadata must be sourced from governed public context");
}

if (!tracker.includes('emitTccgConversionEvent("public_page_viewed"')) fail("page-view event is not emitted");
if (!tracker.includes("onClick={() => emitTccgConversionEvent(event")) fail("tracked CTA links are not wired to governed events");
if (!analytics.includes("dataLayerWindow.dataLayer.push(payload)")) fail("vendor-neutral dataLayer emission is missing");
if (!analytics.includes('new CustomEvent("tccg:conversion"')) fail("tccg:conversion browser event is missing");
for (const piiField of ["name", "email", "scope", "message", "phone"]) {
  if (analytics.includes(`${piiField}:`)) fail(`analytics emitter must not define PII field ${piiField}`);
}

if (!contact.includes('fetch("/api/intake"')) fail("contact flow must submit to governed intake API");
if (!contact.includes('emitTccgConversionEvent("tccg_intake_submitted"')) fail("contact flow must emit durable submission only after accepted API delivery");
if (!contact.includes('emitTccgConversionEvent("tccg_intake_delivery_failed"')) fail("contact flow must emit delivery failure without claiming conversion");
if (!contact.includes('emitTccgConversionEvent("tccg_intake_email_prepared"')) fail("contact flow must preserve truthful email fallback event");
if (!contact.includes("mailto:info@tccg.work")) fail("contact flow lost the declared email fallback");
if (!contact.includes("privacyAccepted")) fail("contact flow must capture privacy acceptance");
if (!contact.includes("smsConsent")) fail("contact flow must capture optional SMS consent separately");
if (!contact.includes("payload?.ok !== true || !payload.reference")) fail("contact flow must require durable acceptance reference");
if (contact.includes("lead_created")) fail("contact flow may not invent a CRM lead state");

for (const boundary of [
  "Contractor-license authority and geography",
  "Insurance limits and bonding capacity",
  "Government identifiers and certifications",
  "Past performance, partner status and project availability",
]) {
  if (!homepage.includes(boundary)) fail(`homepage is missing qualification boundary: ${boundary}`);
}

for (const token of [
  "Tolani-Corp/TolaniCorp-HQ",
  "config/public-product-context.json",
  "Request project review",
  "TCCG Growth / Preconstruction",
  "project_review_received",
  "POST /api/intake",
  "mailto:info@tccg.work",
  "TCCG_INTAKE_WEBHOOK_URL",
]) {
  if (!commercialContext.includes(token)) fail(`commercial context documentation lost governed contract token: ${token}`);
}

if (!packageSource.includes('"marketing:check"')) fail("package.json must expose marketing:check");
if (!packageSource.includes("validate-public-conversion.mjs")) fail("marketing validator is not wired into package scripts");
if (!workflow.includes("pnpm marketing:check")) fail("digital-launch CI must execute marketing:check");

console.log(JSON.stringify({
  valid: true,
  entityId: context.entityId,
  publicStatus: context.publicStatus,
  inheritsProtocolFrom: context.inheritsProtocolFrom,
  primaryRoute: context.primaryCTA.route,
  secondaryRoute: context.secondaryCTA.route,
  handoffSystem: context.operationalHandoff.system,
  fallbackSystem: context.operationalHandoff.fallback,
  durableAcceptanceRequires: context.operationalHandoff.durableAcceptanceRequires,
  approvedEvents: requiredEvents,
  pricingGate: "unset",
  serviceAreaGate: "opportunity_specific",
  externalQualificationGate: "evidence_required",
  paidAcquisitionHandoffGate: "server_side_acceptance_required",
  internalReadinessMarketingGate: "pass",
  piiAnalyticsGate: "pass"
}, null, 2));
