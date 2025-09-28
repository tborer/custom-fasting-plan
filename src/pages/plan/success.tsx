import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ConfirmResponse = {
  ok: boolean;
  emailed?: boolean;
  sessionId?: string | null;
  email?: string | null;
  message?: string;
};

export default function PlanSuccess() {
  const router = useRouter();
  const { session_id } = router.query;

  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!router.isReady) return;
    if (!session_id || typeof session_id !== "string") {
      setState("error");
      setError("Missing session reference.");
      return;
    }

    const confirm = async () => {
      try {
        setState("loading");
        const res = await fetch(`/api/stripe/confirm?session_id=${encodeURIComponent(session_id)}`);
        const data: ConfirmResponse = await res.json();
        if (res.ok && data.ok) {
          setEmail(data.email ?? null);
          setState("success");
        } else {
          setState("error");
          setError(data?.message || "We could not verify your payment.");
        }
      } catch (e: any) {
        setState("error");
        setError(e?.message || "Something went wrong while confirming your payment.");
      }
    };

    confirm();
  }, [router.isReady, session_id]);

  const title = "Plan unlocked | Your comprehensive hair plan";
  const description = "Payment successful. We’re emailing your complete, personalized hair plan.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://example.com/plan/success" />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />

        <main className="mx-auto max-w-3xl w-full px-4 py-16 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Payment successful</CardTitle>
              <CardDescription>
                {state === "loading"
                  ? "Finalizing your purchase and preparing your plan…"
                  : state === "success"
                  ? "Your complete plan is being sent to your email."
                  : "We couldn’t verify your payment. Please try again or contact support."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {state === "loading" && (
                <p className="text-sm text-muted-foreground">Please wait a moment…</p>
              )}

              {state === "success" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    {email
                      ? `We’ve emailed your plan to ${email}.`
                      : "We’ve emailed your plan."} You can also view it anytime from your device.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/">
                      <Button className="px-6">Go to homepage</Button>
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Didn’t receive the email? Check your spam folder or try again. If issues persist,
                    contact support.
                  </p>
                </>
              )}

              {state === "error" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    {error || "Something went wrong. Please try again."}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/">
                      <Button className="px-6">Return home</Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}