import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Answers = Record<string, any>;

export default function PlanSuccess() {
  const [insight, setInsight] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [stripeSessionId, setStripeSessionId] = useState<string | null>(null);

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

  const confirmEnabled = (process.env.NEXT_PUBLIC_STRIPE_CONFIRM_ENABLED || "false").toLowerCase() === "true";
  const [verifyState, setVerifyState] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const debugBanner = (process.env.NEXT_PUBLIC_DEBUG_BANNER || "false").toLowerCase() === "true";
  const [lastConfirm, setLastConfirm] = useState<{ status?: number; ok?: boolean; message?: string | null } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const sid = params.get("session_id");
          if (sid) setStripeSessionId(sid);

          const storedAnswers = window.localStorage.getItem("hair_answers");
          const storedInsight = window.localStorage.getItem("hair_insight");
          const parsedAnswers = storedAnswers ? (JSON.parse(storedAnswers) as Answers) : null;
          setAnswers(parsedAnswers);
          setInsight(storedInsight || null);
          const e = parsedAnswers?.email;
          if (typeof e === "string" && /^\S+@\S+\.\S+$/.test(e)) {
            setEmail(e);
          }

          await postLog("plan_success_load", {
            hasStoredAnswers: !!parsedAnswers,
            hasStoredInsight: !!storedInsight,
            hasEmail: !!e,
            stripeSessionIdPresent: !!sid,
          });
        }
      } catch {
        await postLog("plan_success_load_error");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!confirmEnabled) return;
    if (!stripeSessionId) return;
    (async () => {
      try {
        setVerifyState("verifying");
        await postLog("confirm_start", { stripeSessionId });
        const resp = await fetch(`/api/stripe/confirm?session_id=${encodeURIComponent(stripeSessionId)}`, { method: "GET" });
        const data = await resp.json().catch(() => null);
        setLastConfirm({ status: resp.status, ok: !!data?.ok, message: data?.message || null });
        if (data?.ok) {
          setVerifyState("verified");
          await postLog("confirm_success", { emailed: !!data?.emailed });
        } else {
          setVerifyState("failed");
          await postLog("confirm_error", { message: data?.message || "unknown" }, "error");
        }
      } catch (e: any) {
        setVerifyState("failed");
        setLastConfirm({ status: undefined, ok: false, message: e?.message || String(e) });
        await postLog("confirm_error", { message: e?.message || String(e) }, "error");
      }
    })();
  }, [confirmEnabled, stripeSessionId]);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      await postLog("plan_displayed", {
        hasInsight: !!insight,
        hasAnswers: !!answers,
        hasEmail: !!email,
      });
    })();
  }, [ready, insight, answers, email]);

  const title = "Plan unlocked | Your comprehensive hair plan";
  const description = "Payment successful. Your complete, personalized hair plan is ready.";

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
              <CardTitle className="text-primary">Payment successful</CardTitle>
              <CardDescription>
                {ready ? "Your complete plan is ready below." : "Preparing your plan…"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {email && (
                <p className="text-sm text-muted-foreground">
                  {`Signed in as ${email}.`}
                </p>
              )}
              {confirmEnabled && (
                <p className="text-xs text-muted-foreground">
                  {verifyState === "verifying"
                    ? "Verifying payment…"
                    : verifyState === "verified"
                    ? "Payment verified."
                    : verifyState === "failed"
                    ? "We couldn’t verify your payment. Please try again or contact support."
                    : null}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button className="px-6">Return home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Your Full Plan</CardTitle>
              <CardDescription>Personalized, research‑informed guidance based on your answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {insight && (
                <section>
                  <h2 className="text-lg font-medium text-primary">Key Insight</h2>
                  <blockquote className="mt-2 rounded-md border bg-accent/20 text-foreground p-4">
                    {insight}
                  </blockquote>
                </section>
              )}

              <section>
                <h2 className="text-lg font-medium text-primary">Nutrition Foundation</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Daily protein target: ~0.8–1.0 g/kg body weight, split across meals</li>
                  <li>• Micronutrients focus: Vitamin D3+K2, Zinc, Biotin, B‑complex</li>
                  <li>• Iron support if low ferritin; pair with Vitamin C (confirm with clinician)</li>
                  <li>• Hydration: 6–8 glasses water per day; add electrolytes if active</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Growth Support Stack</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Collagen (type I/III) + MSM, daily</li>
                  <li>• Marine peptides or high‑quality protein to support keratin synthesis</li>
                  <li>• Saw palmetto / β‑sitosterol blend (monitor tolerance)</li>
                  <li>• Pair with topical minoxidil (discuss with clinician if needed)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Stress &amp; Sleep</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Magnesium glycinate in the evening; consider L‑theanine earlier in day</li>
                  <li>• Wind‑down routine: light hygiene, screens off, consistent sleep window</li>
                  <li>• Target 7–8 hours sleep; light AM movement and sunlight exposure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Topicals &amp; Scalp Care</h2>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• Topical minoxidil once or twice daily as tolerated</li>
                  <li>• Gentle shampoo; avoid harsh heat/chemicals; consider scalp massage 3–5x/week</li>
                  <li>• Track shedding and density monthly with photos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-primary">Weekly Rhythm</h2>
                <p className="mt-2 text-sm text-muted-foreground">Mon–Sun:</p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>• AM: Protein‑rich meal, D3+K2, B‑complex, fish oil/algae (EPA/DHA)</li>
                  <li>• Noon: Hydration; balanced meal; collagen + MSM</li>
                  <li>• PM: Protein‑rich meal; zinc (with food); magnesium glycinate before bed</li>
                  <li>• 3–5x/week: Scalp massage; topical application as directed</li>
                </ul>
              </section>

              <p className="text-xs text-muted-foreground">
                This plan is educational and not medical advice. Consult your clinician before making changes.
              </p>
            </CardContent>
          </Card>
        {debugBanner && (
          <div className="fixed bottom-2 left-2 z-[60] rounded-md border bg-background/95 backdrop-blur px-3 py-2 text-xs text-muted-foreground">
            <div>Debug: confirmEnabled={String(confirmEnabled)} sessionId={String(!!stripeSessionId)} verify={verifyState}</div>
            {lastConfirm ? (
              <div>confirm status={String(lastConfirm.status)} ok={String(!!lastConfirm.ok)} msg={lastConfirm.message || ""}</div>
            ) : (
              <div>confirm: not called</div>
            )}
            <div>env={process.env.NEXT_PUBLIC_CO_DEV_ENV || "unknown"}</div>
          </div>
        )}
        </main>
      </div>
    </>
  );
}