const baseUrl = (process.env.TCCG_PRODUCTION_URL || "https://tccg.work").replace(/\/$/, "");
const expectedPhone = "(754) 350-9675";
const requiredPhrase = "Modernize buildings";

async function request(path, options = {}) {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const response = await fetch(url, {
    redirect: options.redirect || "follow",
    headers: { "User-Agent": "TCCG-Production-Verifier/1.0" },
    signal: AbortSignal.timeout(15_000),
  });
  const text = await response.text();
  return { url, response, text };
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

async function verifyPage(path, label, expectedText) {
  try {
    const { response, text } = await request(path);
    if (!response.ok) return fail(`${label} returned ${response.status}`);
    if (expectedText && !text.includes(expectedText)) return fail(`${label} is missing expected content: ${expectedText}`);
    pass(`${label} returned ${response.status}`);
  } catch (error) {
    fail(`${label} failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyHome() {
  try {
    const { response, text } = await request("/");
    if (!response.ok) return fail(`Homepage returned ${response.status}`);
    if (!text.includes(expectedPhone)) fail(`Homepage does not display ${expectedPhone}`);
    else pass("Homepage displays the assigned TCCG phone number");
    if (!text.includes(requiredPhrase)) fail(`Homepage is not serving the enterprise release content`);
    else pass("Homepage is serving the enterprise release content");
    if (text.includes("Qualified scopes") || text.includes("Capture value")) fail("Homepage still exposes mock pipeline metrics");
    else pass("Homepage does not expose mock pipeline metrics");
  } catch (error) {
    fail(`Homepage failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyWwwRedirect() {
  try {
    const { response } = await request("https://www.tccg.work/", { redirect: "manual" });
    const location = response.headers.get("location") || "";
    if (![301, 308].includes(response.status)) return fail(`www redirect returned ${response.status}, expected 301 or 308`);
    if (!location.startsWith("https://tccg.work")) return fail(`www redirect points to unexpected destination: ${location}`);
    pass("www redirects permanently to the apex domain");
  } catch (error) {
    fail(`www redirect check failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyHealth() {
  try {
    const { response, text } = await request("/api/health");
    if (!response.ok) return fail(`Health endpoint returned ${response.status}`);
    const payload = JSON.parse(text);
    if (payload?.ok !== true || payload?.service !== "tccg-work") return fail("Health endpoint returned an unexpected payload");
    pass("Health endpoint is operational");
  } catch (error) {
    fail(`Health endpoint failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyProtectedRoute(path, label) {
  try {
    const { response } = await request(path, { redirect: "manual" });
    if ([200].includes(response.status)) return fail(`${label} is publicly accessible without an authentication challenge`);
    if (![302, 307, 401, 403, 404, 503].includes(response.status)) return fail(`${label} returned unexpected status ${response.status}`);
    pass(`${label} is not anonymously exposed`);
  } catch (error) {
    fail(`${label} check failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

await verifyHome();
await verifyWwwRedirect();
await verifyHealth();
await verifyPage("/privacy", "Privacy page", "Privacy Notice");
await verifyPage("/terms", "Terms page", "Website Terms");
await verifyPage("/robots.txt", "Robots file", "Disallow: /operations");
await verifyPage("/sitemap.xml", "Sitemap", "https://tccg.work/privacy");
await verifyProtectedRoute("/operations", "Operations workspace");
await verifyProtectedRoute("/capture", "Capture workspace");

if (process.exitCode) {
  console.error("TCCG production verification failed.");
} else {
  console.log("TCCG production verification passed.");
}
