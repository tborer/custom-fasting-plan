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

    if (!email || typeof email !== "string") {
      return res.status(400).json({ ok: false, message: "Email is required" });
    }
    if (typeof consent !== "boolean") {
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

    // Attempt to email plan preview (no-op if RESEND is not configured)
    await sendPlanPreview({
      to: email,
      insight,
      sessionId: result.sessionId,
    });

    return res.status(200).json({ ok: true, sessionId: result.sessionId });
  } catch (err) {
    console.error("[lead] error", err);
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}