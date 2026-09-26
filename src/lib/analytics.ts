// Thin wrapper around GA4's gtag. No-ops when GA isn't configured
// (NEXT_PUBLIC_GA_MEASUREMENT_ID unset) or the script hasn't loaded.

// Matches the price shown on the homepage; used as the conversion value.
export const PLAN_PRICE_USD = 19.99;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    (window as any).gtag?.("event", name, params);
  } catch {
    // never let analytics break the page
  }
}
