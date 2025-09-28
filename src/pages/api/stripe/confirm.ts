import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "@/lib/stripe";
import { sendFullPlan } from "@/lib/email";
import { saveLead } from "@/lib/db";

function buildFullPlanHtml(params: { insight?: string | null; }): string {
  const { insight } = params;
  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6; color:#0b0b0c;">
    ${insight ? `
      <h2 style="margin:0 0 8px; font-size:18px;">Your Key Insight</h2>
      <blockquote style="margin:0 0 16px; padding:12px 16px; border-left:3px solid #111; background:#f6f6f7;">
        ${insight}
      </blockquote>
    ` : ""}

    <h2 style="margin:16px 0 8px; font-size:18px;">Nutrition Foundation</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Daily protein target: ~0.8–1.0 g/kg body weight, split across meals</li>
      <li>Micronutrients focus: Vitamin D3+K2, Zinc, Biotin, B‑complex</li>
      <li>Iron support if low ferritin; pair with Vitamin C (confirm with clinician)</li>
      <li>Hydration: 6–8 glasses water per day; add electrolytes if active</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Growth Support Stack</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Collagen (type I/III) + MSM, daily</li>
      <li>Marine peptides or high‑quality protein to support keratin synthesis</li>
      <li>Saw palmetto / β‑sitosterol blend (monitor tolerance)</li>
      <li>Pair with topical minoxidil (discuss with clinician if needed)</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Stress & Sleep</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Magnesium glycinate in the evening; consider L‑theanine earlier in day</li>
      <li>Wind‑down routine: light hygiene, screens off, consistent sleep window</li>
      <li>Target 7–8 hours sleep; light AM movement and sunlight exposure</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Topicals & Scalp Care</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Topical minoxidil once or twice daily as tolerated</li>
      <li>Gentle shampoo; avoid harsh heat/chemicals; consider scalp massage 3–5x/week</li>
      <li>Track shedding and density monthly with photos</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Weekly Rhythm</h2>
    <p style="margin:0 0 8px;">Mon–Sun:</p>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>AM: Protein‑rich meal, D3+K2, B‑complex, fish oil/algae (EPA/DHA)</li>
      <li>Noon: Hydration; balanced meal; collagen + MSM</li>
      <li>PM: Protein‑rich meal; zinc (with food); magnesium glycinate before bed</li>
      <li>3–5x/week: Scalp massage; topical application as directed</li>
    </ul>

    <p style="margin:16px 0 0; font-size:12px; color:#6b6b70;">
      This plan is educational and not medical advice. Consult your clinician before making changes.
    </p>
  </div>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const stripe = getStripe();
  if (!stripe) {
    return res.status(400).json({ ok: false, message: "Stripe is not configured" });
  }

  const sessionId =
    (req.method === "GET" ? (req.query.session_id as string) : (req.body?.session_id as string)) || "";

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

    return res.status(200).json({
      ok: true,
      emailed: sent,
      sessionId: appSessionId,
      email: email || null,
    });
  } catch (err: any) {
    console.error("[stripe] confirm error", err);
    return res.status(500).json({ ok: false, message: err?.message || "Failed to confirm session" });
  }
}