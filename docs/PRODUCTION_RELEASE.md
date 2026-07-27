# TCCG.work Enterprise Production Release

## Release objective

Promote `tccg.work` as the public, conversion-focused front door for TC Construction Group while restricting operations and capture workspaces to authorized users.

## Public release scope

- Enterprise homepage for owners, general contractors, institutional buyers, and public-sector partners.
- Canonical project line: `(754) 350-9675` / `+17543509675`.
- Services, sectors, delivery process, safety boundaries, FAQs, and project qualification.
- Secure project-intake API with validation, rate limiting, honeypot filtering, consent capture, bounded payloads, HTTPS-only forwarding, and explicit delivery failure.
- Privacy notice, website terms, robots policy, sitemap, branded 404, structured data, and social metadata.
- Apex canonicalization and security headers.
- Public health endpoint with safe configuration booleans.

## Protected release scope

The following paths require Clerk authentication and are noindex:

- `/operations`
- `/capture`
- `/api/operations/*`
- `/api/capture/*`

If Clerk is absent or malformed, protected web routes redirect to the public homepage and protected APIs return `503`. They must never fail open.

## Local verification

```powershell
cd <TCCG_WORK_REPOSITORY>

git fetch origin
git switch agent/enterprise-production-ui
git pull --ff-only origin agent/enterprise-production-ui

pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm audit:prod
```

Do not merge if any command fails.

## Vercel project settings

```text
Repository: Tolani-Corp/TCCG.work
Root directory: repository root
Framework preset: Next.js
Install command: pnpm install --frozen-lockfile
Build command: pnpm build
Production domain: tccg.work
Redirect domain: www.tccg.work → tccg.work
Production branch: master after approved merge
```

## Required production variables

### Protected portal

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

Configure these exact Clerk URLs:

```text
Sign-in URL: https://tccg.work/sign-in
Sign-up URL: https://tccg.work/sign-up
After sign-in URL: https://tccg.work/operations
After sign-up URL: https://tccg.work/operations
```

Restrict account creation according to the approved client, employee, and partner access policy. Public self-registration must not automatically grant operational data access.

### Project intake

```env
TCCG_INTAKE_WEBHOOK_URL="https://approved-endpoint.example/path"
TCCG_INTAKE_WEBHOOK_SECRET="server-only-secret"
```

The endpoint may be an approved Tolani HQ intake route, HubSpot/automation endpoint, or Jobber-connected service. It must:

- Use HTTPS.
- Validate `x-tccg-intake-secret` when configured.
- Deduplicate by email, phone, and reference as appropriate.
- Preserve entity key `tccg-work` or equivalent.
- Store privacy and SMS-consent status separately.
- Avoid duplicating Quo-native communication activity in HubSpot.
- Return a 2xx status only after durable acceptance.

### Capture sources

```env
SAM_GOV_API_KEY=""
CANDID_API_KEY=""
CAPTURE_KEYWORDS="smart HVAC,HVAC controls,building automation,energy efficiency retrofit,indoor air quality,construction workforce,BIM,green building"
CAPTURE_SOURCE_LIMIT="5"
```

## Domain activation

In Vercel Project Settings → Domains:

1. Add `tccg.work`.
2. Add `www.tccg.work`.
3. Configure the exact DNS records Vercel provides.
4. Preserve existing MX, SPF, DKIM, DMARC, and verification records.
5. Wait for both domains to show **Valid Configuration**.
6. Configure a permanent redirect from `www.tccg.work` to `tccg.work`.
7. Confirm the SSL certificate is active.

## Controlled acceptance tests

### Public website

- Mobile navigation opens, closes, and does not trap background scrolling.
- Phone links dial `+17543509675`.
- Project form validates required fields.
- Honeypot submissions do not reach the CRM.
- Rate limiting returns `429` after the threshold.
- Missing webhook configuration returns a visible call/email fallback.
- Successful submission returns a unique reference.
- Privacy and SMS consent are recorded distinctly.
- No mock project values, fake completion counts, unsupported certifications, or unverified savings claims appear publicly.

### Portal

- Anonymous `/operations` and `/capture` requests are challenged or redirected.
- Invalid Clerk configuration fails closed.
- Authorized users can sign in.
- Unauthorized accounts cannot view client or internal information.
- Sign-out terminates access.
- Protected pages are absent from the sitemap and use noindex metadata.

### Production

After deployment:

```powershell
pnpm production:verify
```

The command must confirm the homepage, assigned phone number, canonical redirect, health endpoint, privacy, terms, robots, sitemap, and protected-route behavior.

## Final release gates

Do not merge or declare production-ready until:

- TypeScript and production build pass.
- Dependency audit is reviewed.
- Vercel preview is successful.
- Mobile and desktop visual review passes.
- Project intake reaches the approved destination exactly once.
- Clerk production authentication and authorization are tested.
- `www` redirects permanently to the apex.
- `/api/health` returns `200` without secrets.
- Legal notices receive appropriate review.
- Correct phone and email information appear throughout the site.
- Production verification passes after domain promotion.
