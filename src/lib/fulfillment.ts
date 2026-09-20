import { markPaymentPaid, markPaymentEmailed, saveLead, savePlanLog, getAnswersBySessionId } from "@/lib/db";
import { sendFullPlan } from "@/lib/email";
import { buildFullPlanHtml } from "@/lib/plan";

/**
 * Idempotently records a paid Stripe Checkout Session and, the first time this
 * session is seen, logs + emails the full plan. Safe to call from both the
 * webhook and the success-page status check — whichever call lands first does
 * the fulfillment work, the other is a no-op.
 */
export async function fulfillPaidSession(params: {
  stripeSessionId: string;
  appSessionId: string | null;
  email: string | null;
  insight: string | null;
  source: string;
}): Promise<{ emailed: boolean }> {
  const { stripeSessionId, appSessionId, email, insight, source } = params;

  const { inserted } = await markPaymentPaid({
    stripeSessionId,
    appSessionId,
    email,
    insight,
  });

  if (!inserted) {
    return { emailed: false };
  }

  const answers = appSessionId ? await getAnswersBySessionId(appSessionId) : null;
  const planHtml = buildFullPlanHtml({ insight, answers });

  if (!email) {
    return { emailed: false };
  }

  try {
    await saveLead({
      email,
      consent: true,
      sessionId: appSessionId || undefined,
      source,
    });
    await savePlanLog({
      email,
      planHtml,
      sessionId: appSessionId || undefined,
      source,
    });
  } catch (e) {
    console.warn("[fulfillment] saveLead/savePlanLog failed", e);
  }

  let sent = false;
  try {
    const result = await sendFullPlan({
      to: email,
      planHtml,
      sessionId: appSessionId || undefined,
    });
    sent = result.sent;
    if (sent) await markPaymentEmailed(stripeSessionId);
  } catch (e) {
    console.warn("[fulfillment] sendFullPlan failed", e);
  }

  return { emailed: sent };
}
