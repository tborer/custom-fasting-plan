import type { NextApiRequest, NextApiResponse } from "next";
import { sendFullPlan } from "@/lib/email";
import { saveLead, savePlanLog } from "@/lib/db";
import { buildFullPlanHtml } from "@/lib/plan";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const bypassEmail = (process.env.BYPASS_PAYMENT_EMAIL || "").trim().toLowerCase();
  if (!bypassEmail) {
    return res.status(200).json({ ok: false, bypassed: false });
  }

  const { email, insight, sessionId } = (req.body || {}) as {
    email?: string;
    insight?: string;
    sessionId?: string;
  };

  const emailToCheck = (typeof email === "string" ? email.trim() : "").toLowerCase();
  if (!emailToCheck || emailToCheck !== bypassEmail) {
    return res.status(200).json({ ok: false, bypassed: false });
  }

  const appSessionId = (req.headers["x-session-id"] as string) || sessionId || null;
  const planHtml = buildFullPlanHtml({ insight });

  try {
    await saveLead({
      email: email!.trim(),
      consent: true,
      answers: undefined,
      sessionId: appSessionId || undefined,
      source: "bypass",
    });
  } catch (e) {
    console.warn("[bypass-checkout] saveLead failed", e);
  }

  try {
    await savePlanLog({
      email: email!.trim(),
      planHtml,
      sessionId: appSessionId || undefined,
      source: "bypass",
    });
  } catch (e) {
    console.warn("[bypass-checkout] savePlanLog failed", e);
  }

  let sent = false;
  try {
    const result = await sendFullPlan({
      to: email!.trim(),
      planHtml,
      sessionId: appSessionId || undefined,
    });
    sent = result.sent;
  } catch (e) {
    console.warn("[bypass-checkout] sendFullPlan failed", e);
  }

  console.log("[bypass-checkout] bypassed", JSON.stringify({ email: emailToCheck, emailed: sent }));
  return res.status(200).json({ ok: true, bypassed: true, emailed: sent });
}
