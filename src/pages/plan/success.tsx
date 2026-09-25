import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import HelpLink from "@/components/HelpLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeDeficiencies, type DeficiencyFinding } from "@/lib/plan";
import { trackEvent, PLAN_PRICE_USD } from "@/lib/analytics";

type Answers = Record<string, any>;

type VerifyState = "verifying" | "paid" | "not_paid";

const MAX_POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 2000;

export default function PlanSuccess() {
  const [insight, setInsight] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [deficiencies, setDeficiencies] = useState<DeficiencyFinding[]>([]);
  const [stripeSessionId, setStripeSessionId] = useState<string | null>(null);
  const [verifyState, setVerifyState] = useState<VerifyState>("verifying");

  const [cid] = useState(() => Math.random().toString(36).slice(2) + Date.now().toString(36));
  const postLog = async (
    event: string,
    context?: any,
    level: "info" | "warn" | "error" | "debug" = "info"
  ) => {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" } as any,
        body: JSON.stringify({ event, level, context: { cid, stripeSessionId, ...context } }),
      });
    } catch {
      // ignore logging errors
    }
  };

  const debugBanner = ["true", "1", "yes", "on"].includes(String(process.env.NEXT_PUBLIC_DEBUG_BANNER ?? "").trim().toLowerCase());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    setStripeSessionId(sid);

    if (!sid) {
      setVerifyState("not_paid");
      void postLog("plan_success_no_session_id");
      return;
    }

    let cancelled = false;
    let attempt = 0;

    const poll = async () => {
      attempt += 1;
      try {
        await postLog("session_status_check", { attempt, stripeSessionId: sid });
        const resp = await fetch(`/api/stripe/session-status?session_id=${encodeURIComponent(sid)}`);
        const data = await resp.json().catch(() => null);

        if (cancelled) return;

        if (data?.ok && data.paid) {
          setInsight(typeof data.insight === "string" ? data.insight : null);
          const paidAnswers = (data.answers as Answers) || null;
          setAnswers(paidAnswers);
          if (paidAnswers) setDeficiencies(analyzeDeficiencies(paidAnswers));
          setEmail(typeof data.email === "string" ? data.email : null);
          setVerifyState("paid");
          // GA4 de-duplicates purchases by transaction_id, so page reloads are safe.
          trackEvent("purchase", { transaction_id: sid, currency: "USD", value: PLAN_PRICE_USD });
          await postLog("session_status_paid");
          return;
        }

        if (attempt >= MAX_POLL_ATTEMPTS) {
          setVerifyState("not_paid");
          await postLog("session_status_not_paid_final", { attempt }, "warn");
          return;
        }

        setTimeout(poll, POLL_INTERVAL_MS);
      } catch (e: any) {
        if (cancelled) return;
        if (attempt >= MAX_POLL_ATTEMPTS) {
          setVerifyState("not_paid");
          await postLog("session_status_error_final", { message: e?.message || String(e) }, "error");
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    void poll();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (verifyState !== "paid") return;
    void postLog("plan_displayed", {
      hasInsight: !!insight,
      hasAnswers: !!answers,
      hasEmail: !!email,
    });
  }, [verifyState, insight, answers, email]);

  const title = "Plan unlocked | Your custom intermittent fasting plan";
  const description = "Payment successful. Your complete, personalized intermittent fasting plan is ready.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://example.com/plan/success" />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />

        <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">
                {verifyState === "paid" ? "Payment successful" : verifyState === "verifying" ? "Confirming your payment" : "Payment not verified"}
              </CardTitle>
              <CardDescription>
                {verifyState === "paid"
                  ? "Your complete plan is ready below."
                  : verifyState === "verifying"
                  ? "Hang tight while we confirm your payment with Stripe…"
                  : "We couldn't verify a successful payment for this link. If you just paid, this can take a few seconds — try refreshing. Otherwise, please contact support or complete checkout again."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {email && verifyState === "paid" && (
                <p className="text-sm text-muted-foreground">
                  {`Signed in as ${email}.`}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button className="px-6">Return home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {verifyState === "paid" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Your Custom Fasting Plan</CardTitle>
              <CardDescription>Personalized, research‑informed intermittent fasting guidance based on your answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {insight && (
                <section>
                  <h2 className="text-lg font-medium text-primary">Your Key Insight</h2>
                  <blockquote className="mt-2 rounded-md border bg-accent/20 text-foreground p-4">
                    {insight}
                  </blockquote>
                </section>
              )}

              <section>
                <h2 className="text-lg font-medium text-primary">Your Fasting Protocol</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Start with 16:8 — eat within an 8‑hour window (e.g. 12pm–8pm), fast for 16 hours</li>
                  <li>• If new to fasting, begin with 12:12 for 2 weeks, then extend by 1 hour per week</li>
                  <li>• Advanced option: progress to 18:6 once 16:8 feels effortless for 3+ weeks</li>
                  <li>• On high‑activity days or after poor sleep, allow a 14:10 window — flexibility prevents burnout</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Fat‑Burning Window Strategy</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• True fat oxidation peaks after 12–14 hours of fasting, when insulin is lowest</li>
                  <li>• Keep the fasting window to water, black coffee, or plain tea — no calories, no sweeteners</li>
                  <li>• Light fasted movement (20–30 min walk) in the final 2 hours of your fast amplifies fat burning</li>
                  <li>• Morning sunlight exposure (10–15 min) helps set cortisol rhythm and supports metabolic rate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Breaking Your Fast (First Meal)</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Lead with 30–40g protein: eggs, Greek yogurt, chicken, tofu, or a protein shake</li>
                  <li>• Add healthy fats (avocado, olive oil, nuts) to blunt insulin spike and extend satiety</li>
                  <li>• Avoid high‑sugar foods or refined carbs as your first meal — this resets fat‑burning progress</li>
                  <li>• Eat slowly and mindfully; the first meal sets metabolic tone for your entire eating window</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Eating Window Nutrition</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Protein target: 0.7–1.0g per pound of body weight, distributed across 2–3 meals</li>
                  <li>• Prioritize whole foods, fiber‑rich vegetables, and complex carbs — minimize processed foods</li>
                  <li>• Include omega‑3 sources (fatty fish, walnuts, flax) to support fat metabolism and reduce inflammation</li>
                  <li>• Keep net carbs moderate and pair carbs with protein/fat to blunt insulin response</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Electrolytes &amp; Supplements</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Sodium: 2–3g daily (add to broth or water during fast if needed)</li>
                  <li>• Potassium: 3–4g daily from food (avocado, leafy greens, salmon)</li>
                  <li>• Magnesium glycinate: 300–400mg before bed — reduces hunger, improves sleep quality</li>
                  <li>• Optional: creatine (3–5g), vitamin D3+K2, omega‑3 (EPA/DHA 1–2g) with first meal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Weekly Rhythm</h2>
                <p className="mt-2 text-sm text-muted-foreground">Mon–Sun (example with noon eating window start):</p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• 7–8am: Wake, hydrate (16oz water), black coffee or green tea if desired</li>
                  <li>• 9–11am: Fasted light walk or low‑intensity movement (optional, amplifies fat burn)</li>
                  <li>• 12pm: Break fast — protein + fat first meal (30–40g protein)</li>
                  <li>• 3–4pm: Balanced meal — lean protein, vegetables, moderate complex carbs</li>
                  <li>• 7–8pm: Final meal — close eating window; magnesium with evening meal</li>
                  <li>• 8pm–12pm: Fasting window begins</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Tracking Your Progress</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Weigh yourself 1–2x per week, same time and conditions (not daily — too variable)</li>
                  <li>• Take waist and hip measurements every 2 weeks — often changes before the scale moves</li>
                  <li>• Track energy, hunger, and mood weekly — these indicate metabolic adaptation</li>
                  <li>• Reassess your fasting window after 4 weeks and progress based on results and comfort</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Potential Nutrient Deficiencies</h2>
                {deficiencies.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {answers
                      ? "Based on your dietary profile, your macro and micronutrient intake looks well-rounded. Keep prioritizing whole foods, varied vegetables, and quality protein to maintain this."
                      : "Complete the assessment to see your personalized deficiency analysis."}
                  </p>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on your dietary profile, the following nutrients may need attention. These are common gaps given your food choices — not a medical diagnosis.
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-accent/30">
                            <th className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b">Nutrient</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b">Risk</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b">Why</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b">Top Food Sources</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deficiencies.map((f) => (
                            <tr key={f.nutrient} className="border-b last:border-0">
                              <td className="px-3 py-2 font-medium text-primary align-top whitespace-nowrap">{f.nutrient}</td>
                              <td className="px-3 py-2 align-top whitespace-nowrap">
                                <span className={f.risk === "High" ? "text-destructive font-semibold" : "text-amber-600 font-semibold"}>
                                  {f.risk}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-muted-foreground align-top">{f.reason}</td>
                              <td className="px-3 py-2 text-green-700 align-top">{f.foods}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </section>

              <div className="text-xs text-muted-foreground rounded-md border bg-accent/20 p-3">
                <p className="font-medium text-foreground">Medical disclaimer</p>
                <p className="mt-1">
                  The information provided in this plan is for educational purposes only and is not a substitute for professional medical advice,
                  diagnosis, or treatment. Always seek the guidance of your physician or other qualified health provider with any questions you may have
                  regarding a medical condition, supplements, or medications. Intermittent fasting may not be appropriate for everyone, including
                  those with diabetes, eating disorders, pregnancy, or certain chronic conditions. Do not disregard professional medical advice or
                  delay seeking it because of something you have read here. If you experience any adverse effects, stop and consult a healthcare professional.
                </p>
              </div>
            </CardContent>
          </Card>
          )}
        {debugBanner && (
          <div className="fixed bottom-2 left-2 z-[60] rounded-md border bg-background/95 backdrop-blur px-3 py-2 text-xs text-muted-foreground">
            <div>Debug: sessionId={String(!!stripeSessionId)} verify={verifyState}</div>
            <div>env={process.env.NEXT_PUBLIC_CO_DEV_ENV || "unknown"}</div>
            <div>server: hasInsight={String(!!insight)} hasAnswers={String(!!answers)} hasEmail={String(!!email)}</div>
          </div>
        )}
        {/* Page footer with Help link */}
        <footer className="border-t">
          <div className="mx-auto max-w-3xl w-full px-4 py-10 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p>© 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-primary">Privacy</a>
                <a href="/terms" className="hover:text-primary">Terms</a>

                <HelpLink
                  page="Plan Success"
                  sessionId={stripeSessionId ?? undefined}
                  email={email ?? undefined}
                />
              </div>
            </div>
          </div>
        </footer>
        </main>
      </div>
    </>
  );
}