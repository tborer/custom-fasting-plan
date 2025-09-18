import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

type SavePayload = {
  answers?: Record<string, any>;
  sessionId?: string;
  email?: string;
  source?: string;
};

type SaveResponse =
  | { ok: true; sessionId: string }
  | { ok: false; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const { answers, sessionId: incoming, email, source } = (req.body ?? {}) as SavePayload;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ ok: false, message: "Answers are required" });
    }

    const sessionId = incoming || randomUUID();

    // Stub persistence: replace with DB (Vercel Postgres/Supabase) later
    console.log("[answers/save] received", {
      sessionId,
      count: Object.keys(answers).length,
      email: email ?? null,
      source: source ?? "assessment",
      preview: process.env.NEXT_PUBLIC_CO_DEV_ENV === "preview",
    });

    return res.status(200).json({ ok: true, sessionId });
  } catch (err) {
    console.error("[answers/save] error", err);
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}