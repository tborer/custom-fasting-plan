import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "@/lib/stripe";
import { sendFullPlan } from "@/lib/email";
import { saveLead, savePlanLog } from "@/lib/db";
import { buildFullPlanHtml } from "@/lib/plan";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const enabled = (process.env.STRIPE_CONFIRM_ENABLED || "false").toLowerCase() === "true";
  if (!enabled) {
    console.log("[stripe/confirm] disabled");
    return res.status(200).json({ ok: false, message: "Confirm disabled" });
  }

  const stripeMode = (process.env.STRIPE_MODE || "test").toLowerCase() === "live" ? "live" : "test";
  const hasKey = stripeMode === "live" ? !!process.env.STRIPE_SECRET_KEY : !!process.env.STRIPE_TEST_SECRET_KEY;
  console.log("[stripe/confirm] config", JSON.stringify({ enabled, stripeMode, hasKey }));

  const stripe = getStripe();
  if (!stripe) {
    console.warn("[stripe/confirm] no_stripe_config", JSON.stringify({ stripeMode, hasKey }));
    return res.status(400).json({ ok: false, message: "Stripe is not configured" });
  }

  const sessionId =
    (req.method === "GET" ? (req.query.session_id as string) : (req.body?.session_id as string)) || "";

  console.log("[stripe/confirm] start", JSON.stringify({ hasSessionId: !!sessionId, stripeMode }));
  if (!sessionId) {
    return res.status(400).json({ ok: false, message: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(404).json({ ok: false, message: "Session not found" });
    }

    if (session.payment_status !== "paid") {
      return res.status(400).json({ ok: false, message: "Payment not completed" });
    }

    const email =
      (session.customer_details && session.customer_details.email) ||
      (session.customer_email as string) ||
      "";

    const appSessionId = (session.metadata && (session.metadata as any).app_session_id) || null;
    const insight = (session.metadata && (session.metadata as any).insight) || null;

    // Compose the full plan HTML using available context.
    const planHtml = buildFullPlanHtml({ insight });

    // Save lead record (graceful fallback if DB not configured)
    if (email) {
      await saveLead({
        email,
        consent: true,
        answers: undefined,
        sessionId: appSessionId || undefined,
        source: "stripe_paid",
      });
      // Log the exact plan that was unlocked so it can be regenerated/resent later
      try {
        await savePlanLog({
          email,
          planHtml,
          sessionId: appSessionId || undefined,
          source: "stripe_confirm",
        });
      } catch (e) {
        console.warn("[stripe/confirm] savePlanLog failed", e);
      }
    }

    // Email the full plan (graceful no-op if RESEND not configured)
    let sent = false;
    if (email) {
      const result = await sendFullPlan({
        to: email,
        planHtml,
        sessionId: appSessionId || undefined,
      });
      sent = result.sent;
    }

    console.log("[stripe/confirm] success", JSON.stringify({
      stripeSessionId: sessionId,
      appSessionId,
      emailed: sent
    }));
    return res.status(200).json({
      ok: true,
      emailed: sent,
      sessionId: appSessionId,
      email: email || null,
    });
  } catch (err: any) {
    console.error("[stripe/confirm] error", {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      stripeMode: (process.env.STRIPE_MODE || "test").toLowerCase() === "live" ? "live" : "test",
    });
    return res.status(500).json({ ok: false, message: err?.message || "Failed to confirm session" });
  }
}