import type { NextApiRequest, NextApiResponse } from "next";
import { savePlanLog } from "@/lib/db";
import { buildFullPlanHtml } from "@/lib/plan";

type PlanLogBody = {
  email?: string;
  sessionId?: string;
  insight?: string | null;
  source?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const { email, sessionId, insight, source } = (req.body || {}) as PlanLogBody;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ ok: false, message: "Email is required" });
    }

    // Build the same full plan HTML the user receives
    const planHtml = buildFullPlanHtml({ insight: typeof insight === "string" ? insight : null });

    const xSessionId = (req.headers["x-session-id"] as string) || sessionId || undefined;

    await savePlanLog({
      email,
      planHtml,
      sessionId: xSessionId,
      source: source || "client_success",
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("[api/plan/log] error", { message: err?.message || String(err) });
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}