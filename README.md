# SalonBook — Frontend

A salon appointment platform built as a Next.js App Router application. Guests can
browse a curated treatment menu, create an account, request a time and pay once the
salon confirms. Customers get a private dashboard; the salon team gets an operations
dashboard for services, appointments, customers and verified payments.

- **Live site:** _add deployment URL_
- **Frontend repository:** https://github.com/Saif-nyt/salonbook
- **Backend repository:** https://github.com/Saif-nyt/salonbook-server

> The backend (Express + MongoDB + Better Auth + Stripe) lives in the sibling
> `assignment-9/Backend` project. This app expects it to be running.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, React Compiler, Cache Components) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, custom design system |
| Forms | React Hook Form + Zod |
| Server state | TanStack Query |
| Feedback | Sonner toasts, inline errors, skeletons, empty states |
| Icons | Lucide |
| Auth client | Better Auth (`better-auth/react`) |
| Payments | Stripe Checkout (redirect + verified webhook on the server) |

## Design

The interface follows a warm editorial direction — ivory, cream, ink, terracotta and
sage, with Cormorant Garamond display type and Manrope for UI text. Public pages use
full-bleed photography and generous space; dashboards are calmer and denser without
falling back to a generic admin template.

---

## Pages

### Public

| Route | Purpose |
| --- | --- |
| `/` | Hero, featured services from the API, categories, salon story, testimonial, visit CTA |
| `/services` | Browse the menu with search, category filter, sorting and pagination |
| `/services/[id]` | Service detail, availability picker and booking request form |
| `/sign-in` | Email/password and Google sign-in |
| `/sign-up` | Account creation with password rules and optional photo URL |

### Customer dashboard (`/dashboard`)

| Route | Purpose |
| --- | --- |
| `/dashboard` | Stat cards, next visit, recent requests and payment summary |
| `/dashboard/appointments` | Filterable, paginated appointment history |
| `/dashboard/appointments/[id]` | Full appointment record and status timeline |
| `/dashboard/profile` | Name, phone and profile photo (ImgBB upload or URL) |
| `/dashboard/payments` | Transaction history; paid status is read-only |
| `/dashboard/payment/success` | Polls the API until the verified webhook marks payment paid |
| `/dashboard/payment/cancel` | Safe return path after abandoning Stripe Checkout |

### Admin dashboard (`/admin`)

| Route | Purpose |
| --- | --- |
| `/admin` | Live counts, pending queue, revenue and newest customers |
| `/admin/services` | Create, edit, upload images for, pause and delete services |
| `/admin/appointments` | Search/filter the appointment book, confirm or cancel |
| `/admin/users` | Customer directory, detail modal, block/unblock with confirmation |
| `/admin/transactions` | Read-only payment records and their Stripe session references |

Role guards are applied on every dashboard route. A customer who opens `/admin` sees a
clear "not your area" screen instead of a broken page, and the API independently
rejects the request with `403`.

---

## Authentication architecture

Better Auth runs on the Express backend, but the browser only talks to this Next.js
origin. A catch-all route handler proxies `/api/auth/*` to `BACKEND_URL`:

```
Browser ──► https://frontend/api/auth/* ──► https://api-server/api/auth/*
        ◄──  first-party session cookie  ◄──
```

- Session cookies remain first-party, so they work when frontend and API are deployed
  on different hosts.
- The access token used for REST calls is fetched from Better Auth and cached in
  **memory only** — never `localStorage`.
- `src/lib/api.ts` attaches the bearer token, retries once after refreshing it, and
  emits a `salonbook:unauthorized` event that clears the auth context.
- The backend verifies JWT signatures against its JWKS endpoint and reloads the user's
  role and blocked status from MongoDB on each protected request.
- Public registration always creates a `customer`; roles and blocked status cannot be
  changed by the client.

## Payment flow

1. Customer requests an appointment — it starts `pending / unpaid`.
2. An admin confirms it, which is the only state from which payment is allowed.
3. "Pay now" asks the backend for a Stripe Checkout session and redirects to Stripe.
4. Stripe calls the backend webhook. The raw body is verified with the signing secret,
   events are deduplicated, and only then is the transaction and appointment marked
   `paid`.
5. The success page polls the API; it never marks payment paid itself. If the webhook
   has not arrived yet it shows a waiting state.

With no Stripe keys configured, checkout returns a clear `503` and the rest of the app
continues to work.

---

## Getting started

### 1. Requirements

- Node.js 20.9+
- The SalonBook backend running (see its README)
- npm

### 2. Install

```bash
npm install
```

### 3. Configure

```bash
cp .env.example .env.local
```

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | yes | Public origin of this app, e.g. `https://salonbook.vercel.app` |
| `NEXT_PUBLIC_API_URL` | yes | Public origin of the Express API; the browser calls it directly |
| `BACKEND_URL` | yes | Where `/api/auth/*` is proxied. Server-only, never exposed |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | no | Only if auth lives on a different origin than the app |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | no | `false` hides Google buttons when OAuth is not set up |

Do not put any backend secret in a `NEXT_PUBLIC_` variable. Only `NEXT_PUBLIC_APP_URL`,
`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL` and
`NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` are safe to expose.

> On macOS, port 5000 is often occupied by Control Center. The backend can run on
> `5050`; set `NEXT_PUBLIC_API_URL` and `BACKEND_URL` to match.

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000.

### 5. Checks

```bash
npm run lint        # ESLint (React Compiler rules included)
npx tsc --noEmit    # TypeScript
npm run build       # Production build
```

---

## Testing performed

- `npm run lint` — no errors. Four informational React Compiler warnings about React
  Hook Form's `watch()` (the compiler skips memoising those components by design).
- `npx tsc --noEmit` — passes.
- `npm run build` — production build succeeds; static routes prerender and the two
  dynamic-detail routes stream as expected.
- Manual flows against the live local backend:
  - public pages, service filtering and pagination, 404 page;
  - sign-up and sign-in through the same-origin auth proxy;
  - customer booking, duplicate-slot rejection, cancellation and profile update;
  - admin confirm/cancel, service CRUD and customer block/unblock;
  - payment guard states (checkout disabled without Stripe keys; cancelled
    appointments rejected before Stripe is called).

**Not end-to-end tested:** Stripe Checkout, Stripe webhooks and ImgBB uploads require
real test credentials that were not available in this environment. The code paths are
implemented, type-checked and guarded, but no live payment or upload was performed.
Google OAuth is wired through Better Auth and hidden unless configured.

---

## Deployment

### Vercel (recommended)

1. Import the repository; the framework preset is detected automatically.
2. Add the environment variables from the table above for Production and Preview.
3. Set `NEXT_PUBLIC_API_URL` and `BACKEND_URL` to the deployed API origin.
4. Deploy the backend first so auth and API calls resolve.
5. Point `NEXT_PUBLIC_APP_URL` at the final Vercel domain.

Any Node host that supports Next.js works, but server-side proxying must be enabled
(the auth route uses the Node runtime by default).

### Checklist after deployment

- `/api/auth/jwks` is reachable through the frontend origin.
- `CLIENT_URL` and `BETTER_AUTH_URL` on the backend match the deployed frontend URL.
- `ALLOWED_ORIGINS` on the backend includes the frontend origin if it differs.
- The Stripe webhook endpoint is `https://<api-host>/api/payments/webhook`.
- Google OAuth redirect URI is `https://<api-host>/api/auth/callback/google`.

---

## Project structure

```
src/
  app/
    (site)/          public pages + shared navbar/footer
    (auth)/          sign-in and sign-up
    (app)/           customer and admin dashboards
    api/auth/        same-origin Better Auth proxy
  components/
    home/ services/ auth/ dashboard/ admin/ ui/ layout/
  lib/
    api.ts           bearer token client + error envelope handling
    auth-client.ts   Better Auth React client
    auth-context.tsx session state, sign-in/out, refresh
    queries.ts       TanStack Query hooks
    types.ts         API contracts
    constants.ts     categories, nav, slots, salon details
```

## Known limitations

- No real credentials were available for Stripe, ImgBB or Google OAuth, so those
  integrations are not proven end-to-end.
- Availability is slot-based (`09:00`–`18:00`) with one active booking per slot,
  globally. It does not model per-stylist calendars or service duration collisions.
- Email verification and password reset are not surfaced in the UI.
- The site copy, address and phone number are fictional demo content.
