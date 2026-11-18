# SalonBook

SalonBook is a salon appointment booking platform where customers can explore salon services, view service information, and request appointments online.

Salon administrators can create and manage salon services, review appointment requests, confirm or cancel appointments, and monitor customer payments. Customers can manage their own appointment requests and pay for confirmed appointments through Stripe.

## Core features

### For customers
- **Explore salon services:** browse active services by category, search by service name, and sort results.
- **View service information:** open service details to see descriptions, pricing, duration, category, and availability context.
- **Request appointments online:** choose a preferred date/time and submit an appointment request for a service.
- **Manage appointment requests:** view appointment history/details, track status updates, and cancel eligible requests from the customer dashboard.
- **Pay for confirmed appointments:** complete payment for confirmed, unpaid appointments through Stripe Checkout and view payment/transaction history.

### For administrators
- **Manage salon services:** create, edit, update status (active/inactive), and remove services from the admin dashboard.
- **Review appointment requests:** view and filter appointment requests with customer and service details.
- **Confirm or cancel appointments:** approve pending requests or cancel appointments as needed.
- **Monitor customer payments:** review transaction/payment records and statuses to track customer payments.

## Application pages

### Public
- `/` — homepage communicating SalonBook’s purpose, featured services, categories, booking flow, and calls to action
- `/services` — service discovery with category filters, search, sorting, pagination, loading/empty/error states
- `/services/[id]` — service details and integrated appointment request flow
- `/sign-in` — customer/admin sign-in
- `/sign-up` — account creation

### Customer dashboard (`/dashboard`)
- `/dashboard` — overview of appointments/payments and upcoming activity
- `/dashboard/appointments` — manage and review appointment requests
- `/dashboard/appointments/[id]` — appointment details and status/payment actions
- `/dashboard/profile` — profile management
- `/dashboard/payments` — payment history
- `/dashboard/payment/success` and `/dashboard/payment/cancel` — Stripe checkout return handling

### Admin dashboard (`/admin`)
- `/admin` — operations overview
- `/admin/services` — create and manage salon services
- `/admin/appointments` — review, confirm, and cancel appointment requests
- `/admin/users` — manage customer accounts/access
- `/admin/transactions` — monitor customer payment transactions

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4
- **Forms & validation:** React Hook Form, Zod
- **Data fetching/state:** TanStack Query
- **Authentication (client integration):** Better Auth
- **Payments:** Stripe Checkout (server-verified payment flow via backend/webhooks)
- **Notifications/icons:** Sonner, Lucide

## Visual identity

The frontend uses a cohesive premium salon brand system:
- **Palette:** Charcoal `#1C1C1C`, Warm Cream `#EDE6D8`, Deep Red `#B3261E` (core), with selective Muted Burgundy `#6B4547`, Soft Neutral `#F3F2EE`, and Soft Lavender `#D2B4DC` accents
- **Typography:** Bricolage Grotesque (expressive headings) and DM Sans (body/UI)
- **Design direction:** editorial, modern, welcoming, and responsive across public, authentication, and dashboard experiences

## Getting started

### Prerequisites
- Node.js 20.9+
- npm
- Running SalonBook backend/API (Express + MongoDB + Better Auth + Stripe integration)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a local env file (for example `.env.local`) and set the required values:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL of this frontend app |
| `NEXT_PUBLIC_API_URL` | Yes | Public URL of the backend API used by the browser |
| `BACKEND_URL` | Yes | Server-only backend URL used for same-origin auth proxying (`/api/auth/*`) |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | No | Use only if auth is hosted on a different origin |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | No | Set to `false` to hide Google auth UI when not configured |

> Do not place backend secrets in `NEXT_PUBLIC_*` variables.

### 3. Run the development server
```bash
npm run dev
```
Open `http://localhost:3000`.

### 4. Quality checks
```bash
npm run lint
npm run build
```

## Authentication & payments (implementation notes)

- **Authentication:** the app proxies `/api/auth/*` requests through Next.js to the backend (`BACKEND_URL`) so browser auth can remain same-origin, while API requests use configured backend URLs/tokens handled by the existing client utilities.
- **Appointment flow:** customers request appointments online; administrators review and can confirm/cancel requests.
- **Payments:** customers can pay for confirmed appointments via Stripe Checkout. Payment status is determined by verified backend/payment events (the frontend reflects status; it does not mark payments paid on its own).

## Project structure (high level)

```text
src/
  app/
    (site)/        # Public pages (home, services, service details)
    (auth)/        # Sign-in and sign-up
    (app)/         # Customer and admin dashboards
    api/auth/      # Better Auth proxy route
  components/
    home/ services/ auth/ dashboard/ admin/ ui/ layout/
  lib/
    api.ts         # API client and request helpers
    auth-*.ts(x)   # Auth client/context integration
    queries.ts     # Data-fetching hooks
    types.ts       # Shared types/contracts
    constants.ts   # App constants/content helpers
```

## Notes

- This frontend depends on a compatible SalonBook backend for authentication, service/appointment data, and Stripe payment processing.
- End-to-end Stripe/third-party OAuth/media-upload behavior requires valid external credentials and backend configuration in the target environment.
- Demo content (such as address/phone/copy details) may be environment-specific and can be updated as needed.
