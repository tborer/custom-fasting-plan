import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "@/lib/stripe";
import { getPaymentBySessionId, getAnswersBySessionId } from "@/lib/db";
import { fulfillPaidSession } from "@/lib/fulfillment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const sessionId = (req.query.session_id as string) || "";
  if (!sessionId) {
    return res.status(400).json({ ok: false, message: "Missing session_id" });
  }

  try {
    let payment = await getPaymentBySessionId(sessionId);

    if (!payment) {
      const stripe = getStripe();
      if (!stripe) {
        return res.status(400).json({ ok: false, message: "Stripe is not configured" });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
      if (session && session.payment_status === "paid") {
        const email =
          (session.customer_details && session.customer_details.email) ||
          (session.customer_email as string) ||
          null;
        const appSessionId = (session.metadata && session.metadata.app_session_id) || null;
        const insight = (session.metadata && session.metadata.insight) || null;

        await fulfillPaidSession({
          stripeSessionId: sessionId,
          appSessionId,
          email,
          insight,
          source: "session_status_fallback",
        });

        payment = await getPaymentBySessionId(sessionId);
      }
    }

    if (!payment) {
      return res.status(200).json({ ok: true, paid: false });
    }

    const answers = payment.appSessionId ? await getAnswersBySessionId(payment.appSessionId) : null;

    return res.status(200).json({
      ok: true,
      paid: true,
      email: payment.email,
      insight: payment.insight,
      answers,
    });
  } catch (err: any) {
    console.error("[stripe/session-status] error", { message: err?.message });
    return res.status(500).json({ ok: false, message: err?.message || "Failed to check session status" });
  }
}
