# Custom Intermittent Fasting Plan

A Next.js web app that turns a short lifestyle questionnaire into a personalized intermittent
fasting protocol.

Visitors work through a 25-question assessment covering their schedule, hunger patterns, sleep,
activity, diet and goals. On completion they immediately get **one free, personalized insight** —
a specific, actionable recommendation derived from their answers. From there they can unlock the
**complete plan**, which is generated from their responses, emailed to them as a formatted HTML
document, and shown on-screen: fasting protocol, fat-burning strategy, how to break the fast,
eating-window nutrition, electrolytes and supplements, a weekly rhythm, progress tracking, and a
personalized nutrient-deficiency analysis.

The full plan is sold as a one-off purchase through Stripe Checkout, with a Stripe-free email
bypass for allow-listed addresses.

## Features

### Assessment
- **25-question guided assessment** — single-choice and free-text questions covering gender, age,
  goals, fasting experience, meal timing, morning hunger, sleep, wake time, activity, exercise
  timing, diet type, protein frequency and sources, fruit/vegetable intake, sugar and processed
  food, caffeine, water, stress, health conditions, biggest challenge, and current supplements.
- **Step-by-step flow** with a progress bar, forward/back navigation, and animated transitions.
- **Answers persisted** to both `localStorage` and Postgres, keyed by a server-issued session ID
  so a plan can be rebuilt later from the original responses.

### Personalized plan generation
- **Free insight** — rule-based logic picks the single highest-leverage recommendation for the
  respondent (e.g. start at 12:12 for beginners, fix sleep first, lower cortisol before extending
  the fast, protect muscle mass at high training volume).
- **Full plan builder** (`src/lib/plan.ts`) produces an email-ready HTML plan with sections for the
  fasting protocol, fat-burning window strategy, breaking the fast, eating-window nutrition,
  electrolytes and supplements, an example weekly rhythm, and progress tracking.
- **Nutrient deficiency analysis** — analyzes diet type, protein frequency and sources, produce
  intake, vegetable variety and sugar intake to flag likely gaps (B12, non-heme iron, zinc,
  omega-3 EPA/DHA, complete amino acids, vitamin C, potassium, folate, magnesium, vitamin K1,
  vitamin A, B1/B2/B3, chromium), each with a High/Moderate risk rating, the reason, and top food
  sources.
- **Medical disclaimer** included with every generated plan.

### Payments
- **Stripe Checkout** one-time payment with success and cancel pages.
- **Test/live mode switching** via `STRIPE_MODE`, with separate key and price env vars per mode.
- **Payment Link fallback** — if Checkout Session creation fails, the app falls back to a hosted
  Stripe Payment Link with the email pre-filled.
- **Server-side payment confirmation** — the success page verifies the Checkout session, confirms
  `payment_status`, then generates and emails the plan.
- **Payment bypass** — addresses matching `BYPASS_PAYMENT_EMAIL` skip Stripe entirely and are sent
  the full plan directly.
- **Graceful degradation** — with no Stripe keys configured, routes return structured failures
  instead of crashing.

### Email
- **Dual delivery providers** — Resend, or SMTP via Nodemailer, selected by whichever is configured.
- **Plan preview email** sent on lead capture, and **full plan email** sent after payment or bypass.
- Every sent plan is written to a `plan_logs` table so it can be regenerated or resent.

### Data & operations
- **Postgres persistence** (`@vercel/postgres`) with auto-created schema: `leads`, `answers` and
  `plan_logs` tables plus indexes, created on first use.
- **Fails soft without a database** — if Postgres isn't configured, saves no-op and the app keeps
  working end to end.
- **Structured event logging** (`/api/log`) with PII protection: emails are masked, secrets/tokens/
  keys redacted, answer payloads omitted, long strings truncated.
- **Runtime config endpoint** (`/api/config`) so the client can read server-evaluated flags instead
  of depending on build-time `NEXT_PUBLIC_*` values.
- **In-app help widget** — a 500-character help form that emails the support address with page, IP,
  user agent and session context attached.
- **Optional debug banner** on the success page for diagnosing checkout/confirm issues.

### UI
- Full **shadcn/ui** component library on Radix UI primitives (48 components).
- **Tailwind CSS** with theming via `next-themes`, animated sections with **framer-motion**.
- **SEO** — Open Graph and Twitter card meta, JSON-LD `WebSite` schema, canonical URL, keyword meta.
- Responsive layout with a lead-capture form gated by an explicit consent checkbox.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Animation | framer-motion |
| Database | Postgres via `@vercel/postgres` |
| Payments | Stripe |
| Email | Resend or SMTP (Nodemailer) |
| Charts | Recharts |
| Deployment | Vercel |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in your values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs without Stripe, Postgres or an email provider configured — the assessment and free
insight work, and the payment/persistence/email paths degrade gracefully.

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run `next lint` |

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
| --- | --- |
| `STRIPE_MODE` | `test` or `live` — selects which key/price pair is used |
| `STRIPE_TEST_SECRET_KEY` / `STRIPE_SECRET_KEY` | Stripe secret key per mode |
| `STRIPE_TEST_PRICE_ID` / `STRIPE_PRICE_ID` | Price ID per mode |
| `STRIPE_TEST_PAYMENT_LINK` / `STRIPE_PAYMENT_LINK` | Payment Link fallback URL per mode |
| `STRIPE_CONFIRM_ENABLED` | Enables server-side payment confirmation |
| `NEXT_PUBLIC_STRIPE_CONFIRM_ENABLED` | Client-side counterpart of the above |
| `RESEND_API_KEY`, `RESEND_FROM` | Resend email delivery |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | SMTP delivery (alternative to Resend) |
| `POSTGRES_URLPG` | Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for Stripe redirects and email links |
| `BYPASS_PAYMENT_EMAIL` | Email address that skips Stripe and receives the full plan directly |
| `NEXT_PUBLIC_CO_DEV_ENV` | Environment label used in logs and build config |
| `NEXT_PUBLIC_DEBUG_BANNER` | Shows the checkout debug banner on the success page |

## API routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/answers/save` | POST | Persists assessment answers, returns a session ID |
| `/api/lead` | POST | Saves a consented lead and emails the plan preview |
| `/api/stripe/create-checkout-session` | POST | Creates a Stripe Checkout session |
| `/api/stripe/payment-link` | GET | Returns the Payment Link fallback URL |
| `/api/stripe/confirm` | GET/POST | Verifies payment, then builds, logs and emails the full plan |
| `/api/bypass-checkout` | POST | Sends the full plan without payment for allow-listed emails |
| `/api/plan/log` | POST | Records a generated plan against a session |
| `/api/help` | POST | Emails a support request with page and session context |
| `/api/config` | GET | Server-evaluated runtime flags for the client |
| `/api/log` | POST | Structured, PII-sanitized event logging |

## Project structure

```
src/
├── components/
│   ├── Header.tsx        # Site header with logo
│   ├── HelpLink.tsx      # Help dialog + support form
│   ├── Logo.tsx
│   └── ui/               # shadcn/ui component library
├── hooks/                # Custom React hooks
├── lib/
│   ├── db.ts             # Postgres schema + lead/answer/plan persistence
│   ├── email.ts          # Resend + SMTP delivery, preview/full plan emails
│   ├── plan.ts           # Deficiency analysis + full plan HTML builder
│   ├── stripe.ts         # Stripe client, mode/price/site-URL resolution
│   └── utils.ts
├── pages/
│   ├── index.tsx         # Landing page + assessment + insight + checkout
│   ├── plan/success.tsx  # Post-payment confirmation and plan display
│   ├── plan/cancel.tsx   # Cancelled checkout
│   ├── error.tsx
│   └── api/              # API routes (see above)
├── styles/globals.css
└── util/string.ts
```

## Database schema

Created automatically on first use:

- **`leads`** — captured emails with consent flag, answers snapshot, source, unique per
  `(session_id, email)`.
- **`answers`** — full assessment submissions keyed by session ID.
- **`plan_logs`** — the exact plan HTML delivered to each recipient, for regeneration and resends.

## Deployment

Configured for Vercel (`vercel.json` sets `pnpm install --no-frozen-lockfile`). Set the environment
variables above in your Vercel project, and point `NEXT_PUBLIC_SITE_URL` at your production domain
so Stripe redirects and email links resolve correctly.

## Disclaimer

Generated plans are educational and are not medical advice. The app includes this disclaimer in
every plan it produces.
