# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

**PricingKit** is a Next.js 16 web app for managing in-app product and subscription pricing across **Google Play Store** and **Apple App Store Connect**. Developers connect their store credentials and can view, edit, and bulk-update prices by region using:

- Live exchange rates (Open Exchange Rates)
- PPP (Purchasing Power Parity) multipliers
- Big Mac Index
- Apple's static price tiers

The app is **stateless** (no database) — credentials live in encrypted HTTP-only cookies. It is deployed to **Cloudflare Workers** via OpenNext.

## Commands

```bash
npm run dev       # Local dev server at http://localhost:3000
npm run build     # Next.js production build
npm start         # Start built app locally
npm run lint      # ESLint
npm run preview   # Build + preview on Cloudflare Workers locally
npm run deploy    # Build + deploy to Cloudflare Workers
```

There is **no test suite** in this project. Do not invent one unless asked.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York) + Radix UI primitives
- **Client state:** Zustand 5 (with localStorage persist)
- **Server state:** TanStack React Query 5
- **Forms:** React Hook Form 7 + Zod 4
- **Google Play API:** `@googleapis/androidpublisher` + `google-auth-library`
- **Apple App Store Connect:** custom JWT client (no SDK) using Web Crypto
- **Toasts:** `sonner`
- **Icons:** `lucide-react`
- **Deployment:** `@opennextjs/cloudflare` + `wrangler`

> **Important:** Code must run on Cloudflare Workers runtime. Use **Web Crypto API** (no `node:crypto`), avoid Node-only APIs, no filesystem writes in production paths.

## Repository Layout

```
src/
├── app/
│   ├── api/                          # Route handlers
│   │   ├── auth/                     # Google Play login/logout/status
│   │   ├── products/[sku]/           # Google Play in-app products
│   │   ├── subscriptions/[id]/       # Google Play subscriptions
│   │   ├── apple/
│   │   │   ├── auth/                 # Apple login/logout/status
│   │   │   ├── app-price/            # App-level price schedule
│   │   │   ├── products/[id]/        # Apple in-app purchases
│   │   │   └── subscriptions/[id]/
│   │   │       ├── price-points/batch        # Bulk price-point updates
│   │   │       └── clear-scheduled            # Clear pending price changes
│   │   ├── bulk/                     # Cross-product bulk operations
│   │   ├── exchange-rates/           # FX rate proxy/cache
│   │   ├── settings/exchange-rates/
│   │   └── ppp/                      # PPP multipliers
│   ├── dashboard/
│   │   ├── google/{products,subscriptions}/[…]
│   │   ├── apple/{products,subscriptions,app-price}/[…]
│   │   └── settings/
│   ├── setup/  setup-guide/  page.tsx (landing)
│
├── components/
│   ├── ui/                           # shadcn primitives
│   ├── layout/                       # Header, sidebar, platform selector, connect modal
│   ├── auth/                         # Service-account + Apple .p8 upload
│   ├── products/                     # Tables, pricing editor, bulk pricing modal
│   ├── pricing/                      # Bulk update modal
│   ├── subscriptions/
│   └── landing/
│
├── hooks/                            # React Query hooks
│   ├── use-platform-products.ts          # Generic (Google|Apple) product queries
│   ├── use-platform-subscriptions.ts
│   ├── use-apple-products.ts  use-apple-subscriptions.ts  use-apple-app-price.ts
│   ├── use-products.ts  use-subscriptions.ts
│   └── use-streaming-mutation.ts     # NDJSON streaming for bulk ops
│
├── store/
│   ├── auth-store.ts                 # Multi-platform auth (persisted)
│   └── selection-store.ts            # SKU/ID selection for bulk ops (ephemeral)
│
├── lib/
│   ├── google-play/                  # client.ts, products.ts, subscriptions.ts, currency.ts, types.ts
│   ├── apple-connect/                # client.ts (JWT), products.ts, subscriptions.ts,
│   │                                 # app-price.ts, territories.ts, price-tier-data.json (~1.5 MB)
│   ├── exchange-rates/client.ts      # Open Exchange Rates client
│   ├── conversion-indexes/           # exchange-rates.ts, ppp.ts, big-mac.ts
│   ├── world-bank/ppp.ts
│   ├── utils/                        # ndjson-stream, platform-routes, rate-limit
│   ├── encryption.ts                 # AES-256-GCM via Web Crypto + PBKDF2
│   ├── errors.ts                     # AppError, AuthenticationError, ExternalApiError, …
│   ├── validation.ts                 # Zod schemas
│   └── utils.ts                      # cn()
│
├── middleware/                       # Next.js middleware
└── types/

next.config.ts                        # Security headers (CSP, HSTS, X-Frame-Options DENY)
wrangler.jsonc                        # Cloudflare Workers config
```

Path alias: `@/*` → `src/*`.

## Architecture & Conventions

### Authentication (no DB, encrypted cookies)

Both platforms follow the same pattern:

1. User uploads credentials via the connect modal (`src/components/auth/`).
2. The route handler (`/api/auth` or `/api/apple/auth`) validates them, encrypts the payload with AES-256-GCM (PBKDF2-derived key from `ENCRYPTION_KEY`), and stores it server-side keyed by a session ID.
3. The session ID is set in an **HTTP-only, SameSite=strict** cookie:
   - `gplay_session` + `gplay_package_name`
   - `apple_session` + `apple_bundle_id`
4. Cookies expire in **24 h**. Logout = `DELETE /api/{...}/auth`.

All encryption/decryption goes through [src/lib/encryption.ts](src/lib/encryption.ts) — never reach for `node:crypto`.

### State management split

- **Server state → React Query.** Queries/mutations live in `src/hooks/use-*.ts`. Don't fetch in components directly.
- **Client state → Zustand.** Two stores only:
  - `auth-store` — persisted to localStorage (`auth-storage` key). Mirrors the cookie session for UI gating. Use the `useHasHydrated()` hook to avoid SSR mismatches.
  - `selection-store` — ephemeral, drives bulk-edit UI.
- **Never** put server data in Zustand. **Never** put per-component UI state in Zustand.

### API route conventions

- REST-ish: `GET/POST /api/<resource>`, `GET/PATCH/DELETE /api/<resource>/[id]`.
- Apple lives under `/api/apple/...`; Google sits at the root (`/api/products`, `/api/subscriptions`).
- Throw the typed errors from [src/lib/errors.ts](src/lib/errors.ts) — they map to status codes:
  - `AuthenticationError` → 401
  - `AuthorizationError` → 403
  - `NotFoundError` → 404
  - `RateLimitError` → 429
  - `ExternalApiError` / `ConfigurationError` → 5xx
- Validate request bodies with the Zod schemas in [src/lib/validation.ts](src/lib/validation.ts).
- Bulk endpoints stream **NDJSON** — pair with `use-streaming-mutation` on the client.

### Pricing primitives

- **Exchange rates:** [src/lib/exchange-rates/client.ts](src/lib/exchange-rates/client.ts) wraps Open Exchange Rates. Cached, but the production cache must be Workers-compatible (KV / in-memory) — **do not** write `.exchange-rates.json` from production code paths.
- **PPP / Big Mac:** static tables in [src/lib/conversion-indexes/](src/lib/conversion-indexes). Treat as read-only data.
- **Apple price tiers:** the source of truth is [src/lib/apple-connect/price-tier-data.json](src/lib/apple-connect/price-tier-data.json) (~1.5 MB). Don't inline it; load via the helper in `price-tier-data.ts`. Be mindful of bundle size when importing.

### Security headers

CSP, HSTS (~2 years), `X-Frame-Options: DENY`, strict referrer policy are configured in [next.config.ts](next.config.ts). If you add a new external script/style/font, update CSP there.

## Environment Variables

```
ENCRYPTION_KEY              # Required. Used to derive the AES-256-GCM key for session payloads.
OPEN_EXCHANGE_RATES_APP_ID  # Required for /api/exchange-rates and FX conversions.
NODE_ENV                    # Affects cookie `secure` flag and error verbosity.
```

For Cloudflare Workers, set these as Wrangler secrets — not in `.env`.

## Working in this repo

- **Match existing patterns** before introducing new ones. The Google and Apple sides are intentionally parallel; prefer extending shared abstractions in `src/lib/utils/platform-routes.ts` and `use-platform-*` hooks over forking new code paths.
- **Web Crypto only** — this code runs on Workers. `node:crypto`, `fs`, and other Node built-ins will break the deploy.
- **No new tests unless asked.** There is no test runner configured.
- **No emojis** in committed code, comments, or copy unless the user asks.
- When in doubt about a Google Play or Apple App Store Connect endpoint, fetch live docs via Context7 (the user has it configured globally) instead of guessing from training data.
