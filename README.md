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
- **Answers persisted** to both `localStorage` and Turso, keyed by a server-issued session ID
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
- **Webhook fulfillment** — `/api/stripe/webhook` verifies the Stripe signature and, on
  `checkout.session.completed` / `checkout.session.async_payment_succeeded` with
  `payment_status = paid`, records the payment and emails the full plan.
- **Server-verified unlock** — the success page polls `/api/stripe/session-status`, which only
  returns the full plan once the payment is recorded (falling back to retrieving the Checkout
  session from Stripe if the webhook hasn't landed yet). Fulfillment is idempotent, so the webhook
  and the status check never double-send.
- **Payment bypass** — addresses matching `BYPASS_PAYMENT_EMAIL` skip Stripe entirely and are sent
  the full plan directly.
- **Graceful degradation** — with no Stripe keys configured, routes return structured failures
  instead of crashing.

### Email
- **Dual delivery providers** — Resend, or SMTP via Nodemailer, selected by whichever is configured.
- **Plan preview email** sent on lead capture, and **full plan email** sent after payment or bypass.
- Every sent plan is written to a `plan_logs` table so it can be regenerated or resent.

### Data & operations
- **Turso (libSQL) persistence** (`@libsql/client`) with auto-created schema: `leads`, `answers`,
  `plan_logs` and `payments` tables plus indexes, created on first use.
- **Database required for paid fulfillment** — without Turso, lead/answer saves no-op and the
  free assessment still works, but paid plans can't be recorded or unlocked (see `payments`).
- **Structured event logging** (`/api/log`) with PII protection: emails are masked, secrets/tokens/
  keys redacted, answer payloads omitted, long strings truncated.
- **Google Analytics 4** with Consent Mode v2 — analytics storage is denied until the visitor
  accepts the cookie banner (changeable from the Privacy Policy). Funnel events: `assessment_start`,
  `assessment_complete`, `generate_lead`, `begin_checkout`, `purchase`.
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
| Database | Turso (libSQL) via `@libsql/client` |
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

The app runs without Stripe, Turso or an email provider configured — the assessment and free
insight work, and the payment/persistence/email paths return structured failures instead of
crashing. Taking real payments needs Stripe, Turso and an email provider all configured.

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
| `STRIPE_TEST_WEBHOOK_SECRET` / `STRIPE_WEBHOOK_SECRET` | Webhook signing secret per mode |
| `RESEND_API_KEY`, `RESEND_FROM` | Resend email delivery |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | SMTP delivery (alternative to Resend) |
| `TURSO_URL`, `TURSO_TOKEN` | Turso database URL (`libsql://…`) and auth token |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for Stripe redirects and email links |
| `BYPASS_PAYMENT_EMAIL` | Email address that skips Stripe and receives the full plan directly |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (optional; enables GA and the cookie consent banner) |
| `NEXT_PUBLIC_CO_DEV_ENV` | Environment label used in logs and build config |
| `NEXT_PUBLIC_DEBUG_BANNER` | Shows the checkout debug banner on the success page |

## API routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/answers/save` | POST | Persists assessment answers, returns a session ID |
| `/api/lead` | POST | Saves a consented lead and emails the plan preview |
| `/api/stripe/create-checkout-session` | POST | Creates a Stripe Checkout session |
| `/api/stripe/payment-link` | GET | Returns the Payment Link fallback URL |
| `/api/stripe/webhook` | POST | Stripe webhook: verifies the signature, records the payment, emails the full plan |
| `/api/stripe/session-status` | GET | Returns the full plan for a Checkout session only once payment is recorded |
| `/api/bypass-checkout` | POST | Sends the full plan without payment for allow-listed emails |
| `/api/help` | POST | Emails a support request with page and session context |
| `/api/log` | POST | Structured, PII-sanitized event logging |

## Project structure

```
src/
├── components/
│   ├── Header.tsx        # Site header with logo
│   ├── HelpLink.tsx      # Help dialog + support form
│   ├── Logo.tsx
│   ├── legal/            # Privacy Policy + Terms text and page layout
│   └── ui/               # shadcn/ui component library
├── lib/
│   ├── db.ts             # Turso schema + lead/answer/plan/payment persistence
│   ├── email.ts          # Resend + SMTP delivery, preview/full plan emails
│   ├── fulfillment.ts    # Idempotent paid-session fulfillment (webhook + status check)
│   ├── plan.ts           # Deficiency analysis + full plan HTML builder
│   ├── stripe.ts         # Stripe client, mode/price/site-URL resolution
│   └── utils.ts
├── pages/
│   ├── index.tsx         # Landing page + assessment + insight + checkout
│   ├── about.tsx, faq.tsx
│   ├── blog/             # Blog index and posts
│   ├── privacy.tsx, terms.tsx
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
- **`payments`** — one row per paid Stripe Checkout session; the unique key makes fulfillment
  idempotent.

## Deployment

Configured for Vercel (`vercel.json` sets `pnpm install --no-frozen-lockfile`). Set the environment
variables above in your Vercel project, and point `NEXT_PUBLIC_SITE_URL` at your production domain
so Stripe redirects and email links resolve correctly.

In the Stripe dashboard, add a webhook endpoint at `https://<your-domain>/api/stripe/webhook`
listening for `checkout.session.completed` and `checkout.session.async_payment_succeeded`, and set
its signing secret as `STRIPE_WEBHOOK_SECRET` (or `STRIPE_TEST_WEBHOOK_SECRET` in test mode).

## Disclaimer

Generated plans are educational and are not medical advice. The app includes this disclaimer in
every plan it produces.
