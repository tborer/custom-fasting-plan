// Cookie consent for Google Analytics (Consent Mode v2). GA loads with
// analytics_storage denied; it's only granted once the visitor accepts.

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "cookie_consent";
export const CONSENT_RESET_EVENT = "cookie-consent-reset";

export function getStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function applyConsent(choice: ConsentChoice) {
  try {
    (window as any).gtag?.("consent", "update", { analytics_storage: choice });
  } catch {
    // ignore
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // private mode etc. — the choice still applies for this page view
  }
  applyConsent(choice);
}

/** Clears the saved choice and re-opens the banner. */
export function resetConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  applyConsent("denied");
  window.dispatchEvent(new Event(CONSENT_RESET_EVENT));
}
