import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Runtime feature flags for the client, evaluated on the server so they can be
 * flipped in Vercel without a rebuild (unlike NEXT_PUBLIC_* values).
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  // Toggle to disable Stripe payment links/checkout while still setting up.
  const enableStripe = (process.env.ENABLE_STRIPE || "true").toLowerCase() !== "false";
  // Toggle to show the waitlist signup button/modal.
  const enableWaitlist = (process.env.ENABLE_WAITLIST || "false").toLowerCase() === "true";

  return res.status(200).json({ ok: true, enableStripe, enableWaitlist });
}
