import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

type LeadPayload = {
  email?: string;
  consent?: boolean;
  answers?: Record<string, any>;
  source?: string;
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
    const { email, consent, answers, source } = (req.body ?? {}) as LeadPayload;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ ok: false, message: "Email is required" });
    }
    if (typeof consent !== "boolean") {
      return res.status(400).json({ ok: false, message: "Consent is required" });
    }

    const incomingSession = (req.headers["x-session-id"] as string) || undefined;
    const sessionId = incomingSession || randomUUID();

    // Stub: replace with database persistence (Vercel Postgres/Supabase) later
    console.log("[lead] received", {
      email,
      consent,
      sessionId,
      source: source ?? "landing",
      preview: process.env.NEXT_PUBLIC_CO_DEV_ENV === "preview",
      answersPresent: Boolean(answers),
    });

    return res.status(200).json({ ok: true, sessionId });
  } catch (err) {
    console.error("[lead] error", err);
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}