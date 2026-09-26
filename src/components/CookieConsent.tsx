import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_RESET_EVENT, getStoredConsent, setConsent, type ConsentChoice } from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getStoredConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_RESET_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_RESET_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur shadow-lg"
    >
      <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-sm text-muted-foreground flex-1">
          We use Google Analytics cookies to understand how visitors use the site so we can improve it. No
          advertising cookies.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-primary">Privacy Policy</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => choose("denied")}>Decline</Button>
          <Button size="sm" onClick={() => choose("granted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
