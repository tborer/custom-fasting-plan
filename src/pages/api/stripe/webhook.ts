import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe, getWebhookSecret } from "@/lib/stripe";
import { fulfillPaidSession } from "@/lib/fulfillment";

// Stripe signature verification requires the raw, unparsed request body.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();
  if (!stripe || !webhookSecret) {
    console.error("[stripe/webhook] not_configured", { hasStripe: !!stripe, hasSecret: !!webhookSecret });
    return res.status(500).json({ ok: false, message: "Webhook not configured" });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || Array.isArray(sig)) {
    return res.status(400).json({ ok: false, message: "Missing stripe-signature header" });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("[stripe/webhook] signature_verification_failed", { message: err?.message });
    return res.status(400).json({ ok: false, message: `Webhook signature verification failed` });
  }

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as import("stripe").Stripe.Checkout.Session;

      if (session.payment_status === "paid") {
        const email =
          (session.customer_details && session.customer_details.email) ||
          (session.customer_email as string) ||
          null;
        const appSessionId = (session.metadata && session.metadata.app_session_id) || null;
        const insight = (session.metadata && session.metadata.insight) || null;

        const { emailed } = await fulfillPaidSession({
          stripeSessionId: session.id,
          appSessionId,
          email,
          insight,
          source: "stripe_webhook",
        });

        console.log("[stripe/webhook] fulfilled", JSON.stringify({
          type: event.type,
          stripeSessionId: session.id,
          emailed,
        }));
      } else {
        console.log("[stripe/webhook] session_not_paid", JSON.stringify({ type: event.type, sessionId: session.id }));
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    // A downstream failure (DB/email) after a verified event should not make
    // Stripe endlessly retry delivery of an event we already accepted.
    console.error("[stripe/webhook] handler_error", { message: err?.message, type: event?.type });
    return res.status(200).json({ ok: true });
  }
}
