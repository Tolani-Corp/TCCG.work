# TC Construction Group (TCCG)

Commercial building modernization, HVAC and controls coordination, BIM and MEP support, project planning, smart-building integration, and public-sector opportunity review.

- Website: [tccg.work](https://tccg.work)
- Parent company: [Tolani Corp](https://tolanicorp.us)
- Project line: [(754) 350-9675](tel:+17543509675)
- Email: [info@tccg.work](mailto:info@tccg.work)

## Product surfaces

- **Public website:** services, sectors, delivery process, project qualification, safety boundaries, legal notices, and qualified intake.
- **Operations workspace:** protected work board, pipeline, crews, risks, and delivery controls.
- **Capture workspace:** protected Grants.gov and SAM.gov opportunity review, go/no-go controls, teaming, and proposal workflow.

Protected routes fail closed when Clerk production credentials are unavailable.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Verification

```bash
pnpm typecheck
pnpm build
pnpm audit:prod
pnpm production:verify
```

The production verifier checks:

- `https://tccg.work`
- `https://www.tccg.work` redirect behavior
- `/api/health`
- `/privacy`
- `/terms`
- `/robots.txt`
- `/sitemap.xml`
- anonymous access controls for `/operations` and `/capture`
- the assigned `(754) 350-9675` number
- removal of public mock pipeline metrics

## Production environment

Copy the required values from `.env.example` into the Vercel Production environment. Do not commit credentials.

Required for public intake:

```env
TCCG_INTAKE_WEBHOOK_URL="https://approved-https-endpoint.example/path"
TCCG_INTAKE_WEBHOOK_SECRET="server-only-secret"
```

Required for protected workspaces:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

Optional capture sources:

```env
SAM_GOV_API_KEY=""
CANDID_API_KEY=""
CAPTURE_KEYWORDS="smart HVAC,HVAC controls,building automation,energy efficiency retrofit,indoor air quality,construction workforce,BIM,green building"
CAPTURE_SOURCE_LIMIT="5"
```

## Operating boundary

Website content does not constitute a construction proposal, work authorization, engineering opinion, safety determination, license representation, price guarantee, permit guarantee, or schedule commitment. Service availability is confirmed only after scope, jurisdiction, contracting structure, capacity, and commercial review.

© 2026 TC Construction Group. A Tolani Corp company.
