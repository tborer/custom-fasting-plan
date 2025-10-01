import type { NextApiRequest, NextApiResponse } from "next";
import { saveLead } from "@/lib/db";
import { sendPlanPreview } from "@/lib/email";

type LeadPayload = {
  email?: string;
  consent?: boolean;
  answers?: Record<string, any>;
  source?: string;
  insight?: string;
};

type LeadResponse =
  | { ok: true; sessionId: string }
  | { ok: false; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeadResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const { email, consent, answers, source, insight } = (req.body ?? {}) as LeadPayload;

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      (req.socket && req.socket.remoteAddress) ||
      undefined;
    const ua = req.headers["user-agent"] || undefined;
    const xSessionId = (req.headers["x-session-id"] as string) || undefined;

    console.log("[lead] start", JSON.stringify({
      hasEmail: typeof email === "string",
      consentType: typeof consent,
      hasAnswers: !!answers,
      source: source || null,
      hasInsight: typeof insight === "string" && insight.length > 0,
      hasXSessionId: !!xSessionId,
      ip: Boolean(ip),
      ua: Boolean(ua),
    }));

    if (!email || typeof email !== "string") {
      console.warn("[lead] validation", JSON.stringify({ emailPresent: false }));
      return res.status(400).json({ ok: false, message: "Email is required" });
    }
    if (typeof consent !== "boolean") {
      console.warn("[lead] validation", JSON.stringify({ consentType: typeof consent }));
      return res.status(400).json({ ok: false, message: "Consent is required" });
    }

    const incomingSession = (req.headers["x-session-id"] as string) || undefined;
    const result = await saveLead({
      email,
      consent,
      answers,
      sessionId: incomingSession,
      source,
    });
    console.log("[lead] db_saved", JSON.stringify({ sessionId: result.sessionId }));

    // Attempt to email plan preview (no-op if RESEND is not configured)
    const emailResp = await sendPlanPreview({
      to: email,
      insight,
      sessionId: result.sessionId,
    });
    console.log("[lead] email_attempted", JSON.stringify({ sent: !!emailResp?.sent }));

    return res.status(200).json({ ok: true, sessionId: result.sessionId });
  } catch (err: any) {
    console.error("[lead] error", {
      message: err?.message || String(err),
      name: err?.name,
    });
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}