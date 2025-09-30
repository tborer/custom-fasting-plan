import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Returns a Stripe Payment Link URL based on STRIPE_MODE.
 * - STRIPE_MODE=test -> STRIPE_TEST_PAYMENT_LINK
 * - STRIPE_MODE=live -> STRIPE_PAYMENT_LINK
 * If not configured, returns ok:false so the client can fall back to standard Checkout Sessions.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const mode = (process.env.STRIPE_MODE || "test").toLowerCase() === "live" ? "live" : "test";
  const url =
    mode === "live"
      ? process.env.STRIPE_PAYMENT_LINK
      : process.env.STRIPE_TEST_PAYMENT_LINK;

  if (!url) {
    return res.status(200).json({ ok: false, message: "Payment Link not configured" });
  }

  return res.status(200).json({ ok: true, url });
}