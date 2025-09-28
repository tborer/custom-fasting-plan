import Stripe from "stripe";
import type { NextApiRequest } from "next";

/**
 * Lazily initialize a Stripe client if STRIPE_SECRET_KEY is configured.
 * Returns null in preview/dev environments without config so routes can gracefully fallback.
 */
let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[stripe] STRIPE_SECRET_KEY missing - Stripe disabled (using graceful fallback)");
    }
    return null;
  }
  if (!stripeSingleton) {
    // apiVersion is pinned for type-safety. Adjust as needed if Stripe updates.
    stripeSingleton = new Stripe(key, {
      apiVersion: "2024-06-20" as any,
    });
  }
  return stripeSingleton;
}

/**
 * Resolve the public site URL for redirects (Vercel-friendly).
 * Prefers NEXT_PUBLIC_SITE_URL if set; otherwise derives from request headers.
 */
export function getSiteUrl(req?: NextApiRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const proto =
    (req?.headers["x-forwarded-proto"] as string) ||
    (req?.headers["x-forwarded-protocol"] as string) ||
    "https";
  const host = req?.headers.host || "localhost:3000";
  return `${proto}://${host}`;
}

/**
 * Convenience to get the Price ID (required).
 */
export function getPriceId(): string | null {
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[stripe] STRIPE_PRICE_ID missing - using graceful fallback");
    }
    return null;
  }
  return price;
}