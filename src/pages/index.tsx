import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import HelpLink from "@/components/HelpLink";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const startRef = useRef<HTMLDivElement | null>(null);
  const howRef = useRef<HTMLDivElement | null>(null);

  const [demoProgress, setDemoProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoProgress((p) => (p >= 70 ? 0 : p + 2));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const sectionFade = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      viewport: { once: true, margin: "-100px" },
    }),
    []
  );

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const title = "Personalized Intermittent Fasting Plan | Burn Fat Smarter";
  const description =
    "Discover your custom intermittent fasting protocol designed to maximize fat burning. We assess your schedule, hunger patterns, sleep, and lifestyle to build a plan that actually fits your life.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Custom Intermittent Fasting Plan",
    url: "https://example.com/",
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Assessment questions
  const questions = [
    { id: "email", text: "What is your email?", type: "text" },
    { id: "gender", text: "What is your gender?", type: "single", options: ["Male", "Female", "Prefer not to say", "Other"] },
    { id: "age", text: "What is your age range?", type: "single", options: ["18–24", "25–34", "35–44", "45–54", "55+"] },
    { id: "primary_goal", text: "What is your primary goal?", type: "single", options: ["Burn fat & lose weight", "Improve metabolic health", "Boost energy & mental clarity", "Better digestion & gut health", "Longevity & anti‑aging"] },
    { id: "fasting_experience", text: "How familiar are you with intermittent fasting?", type: "single", options: ["Never tried", "Tried once or twice", "Practice occasionally", "Regular 14–16 hour fasts", "Advanced — 18+ hour fasts"] },
    { id: "current_eating_pattern", text: "How would you describe your current eating pattern?", type: "single", options: ["3 meals/day", "3 meals + snacks", "Frequent small meals", "2 large meals", "Irregular / no set pattern"] },
    { id: "first_meal_time", text: "When do you typically have your first meal?", type: "single", options: ["Before 7am", "7–9am", "9–11am", "11am–1pm", "After 1pm"] },
    { id: "last_meal_time", text: "When do you typically finish eating for the day?", type: "single", options: ["Before 6pm", "6–8pm", "8–10pm", "After 10pm"] },
    { id: "morning_hunger", text: "How hungry are you typically in the morning?", type: "single", options: ["Not hungry at all", "Slightly hungry", "Moderately hungry", "Very hungry — need to eat immediately"] },
    { id: "sleep_hours", text: "How many hours of sleep do you get per night on average?", type: "single", options: ["Less than 6", "6–7", "7–8", "More than 8"] },
    { id: "wake_time", text: "What time do you typically wake up?", type: "single", options: ["Before 5:30am", "5:30–7am", "7–8:30am", "After 8:30am"] },
    { id: "activity_level", text: "How would you describe your daily activity level?", type: "single", options: ["Sedentary (mostly sitting)", "Lightly active", "Moderately active", "Very active", "Athlete / intense training daily"] },
    { id: "exercise_timing", text: "When do you prefer to exercise?", type: "single", options: ["Morning (fasted)", "Morning (after eating)", "Afternoon", "Evening", "No preference / varies"] },
    { id: "diet_type", text: "What best describes your current diet?", type: "single", options: ["Omnivore / no restrictions", "Mostly whole foods", "Low‑carb / keto", "Vegetarian", "Vegan", "Mediterranean‑style"] },
    { id: "sugar_processed", text: "How often do you eat sugary or highly processed foods?", type: "single", options: ["Daily", "3–4 times/week", "1–2 times/week", "Rarely"] },
    { id: "caffeine_habits", text: "What are your caffeine habits?", type: "single", options: ["None", "1–2 coffees/day", "3+ coffees/day", "Tea only", "Energy drinks"] },
    { id: "water_intake", text: "How many glasses of water do you drink daily?", type: "single", options: ["1–3", "4–5", "6–8", "8+"] },
    { id: "stress_level", text: "How would you rate your typical stress level?", type: "single", options: ["Low", "Moderate", "High", "Very high"] },
    { id: "health_conditions", text: "Any relevant health conditions to consider?", type: "single", options: ["None", "Blood sugar / pre‑diabetes", "Thyroid condition", "PCOS / hormonal imbalance", "Heart condition / on medication", "Other"] },
    { id: "biggest_challenge", text: "What's your biggest challenge with fasting?", type: "single", options: ["Hunger and cravings", "Energy crashes", "Social situations / meals out", "Fitting it into my schedule", "Not knowing where to start"] },
    { id: "current_supplements", text: "Are you currently taking any supplements? If yes, please list them.", type: "text" },
  ] as { id: string; text: string; type: "single" | "text"; options?: string[] }[];

  const total = questions.length;
  const [showAssessment, setShowAssessment] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const current = questions[step];
  const percent = Math.round(((step) / total) * 100);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };
  const handleText = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };
  const goNext = () => {
    if (step < total - 1) {
      postLog("assessment_next", { step, nextStep: step + 1, questionId: current.id });
      setStep(step + 1);
    }
  };
  const goBack = () => {
    if (step > 0) {
      postLog("assessment_back", { step, prevStep: step - 1, questionId: current.id });
      setStep(step - 1);
    }
  };
  const startAssessment = () => {
    postLog("assessment_start", { step: 0 });
    setShowAssessment(true);
    setStep(0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showInsight, setShowInsight] = useState(false);
  const [insight, setInsight] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadConsent, setLeadConsent] = useState(false);

  useEffect(() => {
    const e = String((answers as any)["email"] || "").trim();
    if (/^\S+@\S+\.\S+$/.test(e)) setLeadEmail(e);
  }, [answers]);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const { toast } = useToast();

  const [cid] = useState(() => Math.random().toString(36).slice(2) + Date.now().toString(36));
  const postLog = async (event: string, context?: any, level: "info" | "warn" | "error" | "debug" = "info") => {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId ? { "x-session-id": sessionId } : {}),
        } as any,
        body: JSON.stringify({ event, level, context: { cid, ...context } }),
      });
    } catch {
      // ignore logging errors
    }
  };

  const generateInsight = (ans: Record<string, any>): string => {
    const exp = ans["fasting_experience"];
    const hunger = ans["morning_hunger"];
    const stress = ans["stress_level"];
    const sleep = ans["sleep_hours"];
    const diet = ans["diet_type"];
    const activity = ans["activity_level"];
    const sugar = ans["sugar_processed"];

    if (exp === "Never tried" || exp === "Tried once or twice") {
      return "Start with the 12:12 protocol for your first 2 weeks — fast 12 hours (e.g. 8pm–8am), eat within 12. This builds the habit without stress. Once hunger adapts, shift your first meal 30–60 minutes later each week until you reach a 16:8 window. The goal is 16 fasting hours where growth hormone peaks and fat oxidation accelerates significantly.";
    }
    if (stress === "High" || stress === "Very high") {
      return "Your stress level is your primary lever. Elevated cortisol promotes fat storage — especially abdominal — and makes aggressive fasting counterproductive. Start conservatively with a 14:10 window, prioritize a protein‑rich first meal (30–40g) to blunt cortisol, and optimize sleep before extending your fast. Lower cortisol directly equals greater fat mobilization.";
    }
    if (hunger === "Not hungry at all" || hunger === "Slightly hungry") {
      return "You're a natural candidate for 16:8 — your body isn't signaling for early food. Capitalize on this by delaying your first meal to noon. Morning hours (8am–12pm) are when growth hormone is naturally elevated and insulin is lowest, making this your prime fat‑burning window. A black coffee or green tea at 9am can extend this window comfortably.";
    }
    if (sleep === "Less than 6" || sleep === "6–7") {
      return "Sleep is your highest ROI fix before optimizing fasting windows. Poor sleep raises ghrelin (hunger hormone) by ~24% and spikes insulin resistance, making both fasting and fat loss measurably harder. Even 2 extra hours per night for 2 weeks will significantly reduce hunger during your fast and improve your metabolic response to fasting.";
    }
    if (diet === "Low‑carb / keto") {
      return "Your low‑carb diet is already depleting glycogen stores and upregulating fat oxidation — you have a real metabolic head start. A 16:8 or even 18:6 window will feel more natural for you than most, since circulating insulin stays lower throughout the day. Focus on electrolytes during your fast (sodium 2–3g, potassium 3–4g, magnesium 400mg) to prevent fatigue and headaches that derail most beginners.";
    }
    if (sugar === "Daily") {
      return "Reducing sugar and refined carbs within your eating window is the single biggest multiplier for your fasting protocol. Repeated sugar spikes suppress fat burning even hours after your fast ends. For your first 2 weeks, swap just one high‑sugar meal per day for a protein + healthy fat meal — this shift alone measurably moves your metabolism toward fat oxidation.";
    }
    if (activity === "Athlete / intense training daily" || activity === "Very active") {
      return "With high training volume, protect muscle mass by placing your first meal within 60–90 minutes post‑training and targeting 0.8–1g protein per pound of body weight across your eating window. For morning workouts, training in the last 2 hours of your fast is effective for fat burning without sacrificing performance — avoid deep‑fasted high‑intensity work until fat‑adapted.";
    }
    return "Your profile is well‑suited for a 16:8 protocol: eat from 12pm–8pm, fast from 8pm–12pm. The core mechanism is insulin suppression — after 12–14 fasting hours, insulin drops low enough for meaningful fat oxidation to begin. Structure your first meal around 30–40g protein and healthy fats to extend satiety and keep insulin steady throughout your eating window.";
  };

  const handleFinish = async () => {
    const text = generateInsight(answers);
    setInsight(text);
    await postLog("assessment_finish", { total, hasEmail: !!leadEmail || !!(answers as any)["email"] });
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("fasting_answers", JSON.stringify(answers));
        localStorage.setItem("fasting_insight", text);
      }
      const resp = await fetch("/api/answers/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, source: "assessment" }),
      });
      const data = await resp.json().catch(() => null);
      if (data?.ok && data.sessionId) setSessionId(data.sessionId);
      await postLog("answers_save_result", { ok: !!data?.ok, sessionId: data?.sessionId || null });
    } catch (e) {
      console.warn("save answers failed", e);
      await postLog("answers_save_error", { message: e instanceof Error ? e.message : String(e) }, "error");
    }
    setShowAssessment(false);
    setShowInsight(true);
    await postLog("insight_shown", { hasInsight: !!text });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitLead = async () => {
    const email = leadEmail.trim();
    const valid = /^\S+@\S+\.\S+$/.test(email);
    if (!valid) {
      toast({ title: "Enter a valid email" });
      return;
    }
    if (!leadConsent) {
      toast({ title: "Please consent to receive your plan preview" });
      return;
    }
    await postLog("lead_submit_attempt", { email });
    setSubmittingLead(true);
    try {
      const resp = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId ? { "x-session-id": sessionId } : {}),
        } as any,
        body: JSON.stringify({ email, consent: true, source: "insight", answers, insight }),
      });
      const data = await resp.json();
      if (data?.ok) {
        await postLog("lead_submit_success", { sessionId: data?.sessionId || sessionId });
        if (data.sessionId) setSessionId(data.sessionId);
        if (typeof window !== "undefined") localStorage.setItem("fasting_lead", "true");
        toast({ title: "Thanks! We'll email your plan preview." });
      } else {
        throw new Error(data?.message || "Failed");
      }
    } catch (e) {
      await postLog("lead_submit_error", { message: e instanceof Error ? e.message : String(e) }, "error");
      toast({ title: "Something went wrong. Please try again." });
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleUnlockFullPlan = async () => {
    setUnlocking(true);
    await postLog("unlock_click", { hasSessionId: !!sessionId });
    try {
      const emailToUse = String((leadEmail || (answers as any)["email"] || "")).trim();

      // Check for payment bypass before hitting Stripe
      try {
        const bypassResp = await fetch("/api/bypass-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "x-session-id": sessionId } : {}),
          } as any,
          body: JSON.stringify({ email: emailToUse, insight, sessionId }),
        });
        const bypassData = await bypassResp.json().catch(() => null);
        if (bypassData?.bypassed) {
          await postLog("bypass_checkout", { emailed: !!bypassData?.emailed });
          toast({ title: "Plan sent!", description: "Check your email for your complete fasting plan." });
          if (typeof window !== "undefined") {
            window.location.href = "/plan/success";
          }
          return;
        }
      } catch {
        // bypass check failed, proceed to normal Stripe flow
      }

      const resp = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId ? { "x-session-id": sessionId } : {}),
        } as any,
        body: JSON.stringify({ insight, email: emailToUse }),
      });
      const data = await resp.json().catch(() => null);
      await postLog("checkout_create_response", { ok: !!data?.ok, hasUrl: !!data?.url });
      if (data?.url) {
        if (typeof window !== "undefined") {
          await postLog("checkout_redirect", { to: "checkout_session_url" });
          window.location.href = data.url as string;
          return;
        }
      }

      const plResp = await fetch("/api/stripe/payment-link", { method: "GET" });
      const plData = await plResp.json().catch(() => null);
      await postLog("payment_link_fetch", { ok: !!plData?.ok, hasUrl: !!plData?.url });

      if (plData?.ok && plData?.url) {
        let redirectUrl: string = plData.url as string;
        const email = (leadEmail || "").trim();
        if (email && /^\S+@\S+\.\S+$/.test(email)) {
          const sep = redirectUrl.includes("?") ? "&" : "?";
          redirectUrl = `${redirectUrl}${sep}prefilled_email=${encodeURIComponent(email)}`;
        }
        if (typeof window !== "undefined") {
          await postLog("payment_link_redirect", { to: "payment_link_url" });
          window.location.href = redirectUrl;
          return;
        }
      }

      throw new Error(data?.message || "Failed to initiate checkout");
    } catch (e) {
      await postLog("checkout_error", { message: e instanceof Error ? e.message : String(e) }, "error");
      toast({ title: "Checkout failed", description: "Please try again." });
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="intermittent fasting, IF plan, fat burning, 16:8 fasting, fasting for weight loss, fat loss protocol, metabolic health, custom fasting plan, eating window"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=60" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://example.com/" />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=60"
              alt=""
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          </div>

          <div className="relative">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <p className="inline-flex items-center rounded-full bg-accent/60 text-accent-foreground px-3 py-1 text-xs sm:text-sm">
                  Science‑guided • Fasting + Nutrition + Lifestyle
                </p>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-primary">
                  A personalized plan to burn fat with intermittent fasting
                </h1>
                <p className="mt-5 text-base sm:text-lg text-muted-foreground">
                  We learn about your schedule, hunger patterns, sleep, and goals to build a fasting
                  protocol that fits your life — and actually maximizes fat burning. Get one unique
                  insight free, then unlock your complete custom plan.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={startAssessment} className="px-6">
                    Start free assessment
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => scrollTo(howRef)}
                    className="px-6"
                  >
                    How it works
                  </Button>
                </div>

                {/* Demo progress preview */}
                <div className="mt-10 max-w-md">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Assessment progress</span>
                    <span>{demoProgress}%</span>
                  </div>
                  <Progress value={demoProgress} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Topics grid */}
        <motion.section
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 py-14 sm:py-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              What your plan covers
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your answers shape your fasting window, eating timing, nutrition, and lifestyle strategies.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Your custom fasting window",
                desc: "Find the exact eating and fasting window that fits your natural hunger patterns and daily schedule.",
                img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=60",
                tags: ["16:8", "18:6", "14:10"],
              },
              {
                title: "Fat‑burning optimization",
                desc: "Maximize fat oxidation with strategic fasting timing, fasted movement, and hormonal alignment.",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Breaking your fast right",
                desc: "Discover exactly what to eat first and how to structure your eating window for sustained fat loss.",
                img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Metabolic health",
                desc: "Improve insulin sensitivity, stabilize blood sugar, and support long‑term metabolic function.",
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Lifestyle & sleep alignment",
                desc: "Sync your fasting schedule with your sleep, stress levels, and activity for compounding results.",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Electrolytes & supplements",
                desc: "Electrolyte management, adaptogens, and targeted supplements to make fasting feel effortless.",
                img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=60",
              },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {item.tags && (
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded bg-background/80 px-2 py-0.5 text-[10px] border">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          ref={howRef}
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 py-14 sm:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">How it works</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="leading-relaxed">
                  1. Answer a short series of questions about your eating habits, sleep, activity, and goals.
                </li>
                <li className="leading-relaxed">
                  2. Get one unique insight free — something actionable you can apply today.
                </li>
                <li className="leading-relaxed">
                  3. Unlock your complete custom plan: fasting window, fat‑burning strategy, nutrition timing, electrolytes, and weekly rhythm.
                </li>
              </ul>

              <div className="mt-8">
                <Button onClick={startAssessment}>Start now</Button>
              </div>
            </div>

            <div className="relative">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Assessment preview</CardTitle>
                  <CardDescription>
                    A friendly, step‑by‑step flow with a clear progress indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>4 of 10</span>
                    </div>
                    <Progress value={40} />
                  </div>
                  <div className="rounded-md border p-4">
                    <p className="text-sm font-medium text-primary">Example question</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      How hungry are you typically in the morning?
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <Button variant="secondary" className="text-xs">Not hungry</Button>
                      <Button variant="secondary" className="text-xs">Slightly</Button>
                      <Button variant="secondary" className="text-xs">Moderately</Button>
                      <Button variant="secondary" className="text-xs">Very hungry</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div aria-hidden className="absolute -inset-x-6 -inset-y-6 bg-gradient-to-br from-accent/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.section>

        {/* Evidence section */}
        <motion.section
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 py-14 sm:py-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Backed by metabolic science
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your plan adapts fasting windows, nutrition targets, and lifestyle strategies to your unique profile.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fasting protocol",
                points: ["16:8, 18:6, or 14:10 window", "Customized eating window timing", "Step‑by‑step progression roadmap", "Weekend & social flexibility tactics"],
              },
              {
                title: "Metabolic support",
                points: ["Electrolyte management (Na, K, Mg)", "Insulin sensitivity optimization", "Fat‑adapted eating strategies", "Hunger management techniques"],
              },
              {
                title: "Lifestyle alignment",
                points: ["Sleep‑fasting synchronization", "Fasted vs. fed exercise timing", "Stress & cortisol management", "Progress tracking system"],
              },
            ].map((c) => (
              <Card key={c.title}>
                <CardHeader>
                  <CardTitle className="text-primary">{c.title}</CardTitle>
                  <CardDescription>Personalized to your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {c.points.map((p) => (
                      <li key={p} className="leading-relaxed">• {p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            This content is educational and not a substitute for medical advice. Consult your clinician before starting a fasting protocol, especially if you have diabetes, hormonal conditions, or take medications.
          </p>
        </motion.section>

        {/* Start CTA */}
        <motion.section
          ref={startRef}
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 py-14 sm:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                Start your free assessment
              </h2>
              <p className="mt-2 text-muted-foreground">
                Answer in under 3 minutes. We'll reveal one personalized fasting insight immediately.
                Unlock your complete custom plan afterwards.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="px-6" onClick={startAssessment}>Begin now</Button>
                <Button variant="secondary" className="px-6" onClick={startAssessment}>See sample questions</Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                We may email your results and plan preview. You can opt out anytime.
              </p>
            </div>

            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden rounded-md border">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=60"
                  alt="Healthy meal for intermittent fasting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Preview progress</span>
                  <span>Step 2 of 7</span>
                </div>
                <Progress value={28} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pricing teaser */}
        <motion.section
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 pb-20"
        >
          <Card className="border-dashed">
            <CardContent className="py-10 md:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                  Unlock your complete fasting plan
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Get your fully personalized fasting protocol, fat‑burning window strategy, first‑meal
                  guide, nutrition targets, electrolyte plan, and full weekly rhythm. Pay securely with Stripe.
                </p>
                <div className="mt-6">
                  <Button className="px-6" onClick={startAssessment}>Unlock your full plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Assessment overlay */}
        <AnimatePresence>
          {showAssessment && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-background/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="absolute inset-0 flex items-start sm:items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-3xl rounded-md border bg-background"
                >
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <div className="text-sm text-muted-foreground">
                      Step {step + 1} of {total}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAssessment(false)}
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Close
                    </button>
                  </div>

                  <div className="px-4 pt-4">
                    <Progress value={percent} />
                  </div>

                    <div className="px-4 py-6">
                      <h3 className="text-lg sm:text-xl font-medium text-primary">
                        {current.text}
                      </h3>

                      <div className="mt-4">
                        {current.type === "single" && (
                          <RadioGroup
                            value={answers[current.id] ?? ""}
                            onValueChange={handleSelect}
                            className="grid gap-3"
                          >
                            {current.options?.map((opt) => {
                              const inputId = `${current.id}-${opt}`;
                              return (
                                <label
                                  key={opt}
                                  htmlFor={inputId}
                                  className="flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/40"
                                >
                                  <RadioGroupItem
                                    id={inputId}
                                    value={opt}
                                    className="shadow-none"
                                  />
                                  <span className="text-sm">{opt}</span>
                                </label>
                              );
                            })}
                          </RadioGroup>
                        )}

                        {current.type === "text" && (
                          <div className="grid gap-2">
                            <Label htmlFor={`${current.id}`}>Your answer</Label>
                            {current.id === "current_supplements" ? (
                              <Textarea
                                id={`${current.id}`}
                                value={answers[current.id] ?? ""}
                                onChange={(e) => handleText(e.target.value)}
                                placeholder="List any vitamins, minerals, or supplements you currently take"
                                className="min-h-28"
                              />
                            ) : current.id === "email" ? (
                              <Input
                                id={`${current.id}`}
                                type="email"
                                value={answers[current.id] ?? ""}
                                onChange={(e) => handleText(e.target.value)}
                                placeholder="you@example.com"
                              />
                            ) : (
                              <Input
                                id={`${current.id}`}
                                value={answers[current.id] ?? ""}
                                onChange={(e) => handleText(e.target.value)}
                                placeholder="Type your answer"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <Button variant="secondary" onClick={goBack} disabled={step === 0}>
                          Back
                        </Button>
                        {step < total - 1 ? (
                          <Button
                            onClick={goNext}
                            disabled={
                              current.type === "single"
                                ? !(answers[current.id])
                                : current.id === "email"
                                ? !(/^\S+@\S+\.\S+$/.test(String(answers[current.id] ?? "").trim()))
                                : !(String(answers[current.id] ?? "").trim().length > 0)
                            }
                          >
                            Next
                          </Button>
                        ) : (
                          <Button onClick={handleFinish}>
                            Finish
                          </Button>
                        )}
                      </div>
                    </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Insight overlay */}
        <AnimatePresence>
          {showInsight && (
            <motion.div
              key="insight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-background/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="absolute inset-0 flex items-start sm:items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-3xl rounded-md border bg-background"
                >
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-sm font-medium text-primary">Your personalized fasting insight</h3>
                    <button
                      type="button"
                      onClick={() => setShowInsight(false)}
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Close
                    </button>
                  </div>

                  <div className="px-4 py-6 space-y-6">
                    <p className="text-base text-foreground">{insight}</p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-primary text-lg">Unlock your complete fasting plan</CardTitle>
                        <CardDescription>
                          Get all insights and a fully personalized plan with your custom fasting window, fat‑burning strategy, first‑meal guide, electrolyte protocol, and weekly rhythm.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• Immediate access after secure Stripe checkout</li>
                            <li>• We'll email your complete plan and a link to view it anytime</li>
                          </ul>

                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="inline-flex items-center rounded bg-accent/40 text-accent-foreground px-2 py-0.5 text-[10px] border">
                              Limited time
                            </span>
                            <span className="text-muted-foreground line-through">$79.99</span>
                            <span className="text-2xl font-semibold text-primary">$19.99</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button onClick={handleUnlockFullPlan} disabled={unlocking} className="px-6">
                              {unlocking ? "Redirecting..." : "Unlock Full Plan"}
                            </Button>
                            <Button variant="secondary" onClick={() => setShowInsight(false)}>
                              Maybe later
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You'll be redirected to a secure Stripe checkout. On completion we'll email your full plan.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="border-t">
          <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p>© 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary">Privacy</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                      <DialogDescription>How we collect, use, and protect your information.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>Custom Fasting Plan by Agile Rant ("we", "us") respects your privacy. This policy explains what we collect when you use our site, why we collect it, and how we handle it.</p>
                      <p><span className="font-medium text-foreground">Information we collect:</span> assessment answers, email address, technical data (like IP address and device info), and payment confirmations from our provider (Stripe). We do not store full card numbers.</p>
                      <p><span className="font-medium text-foreground">How we use it:</span> to provide your insight and full plan, process payments, send emails you request (like plan delivery and receipts), improve the service, and keep the platform secure.</p>
                      <p><span className="font-medium text-foreground">Sharing:</span> we share data with processors we use to operate the service (e.g., hosting, email, analytics, payments). We don't sell your personal information.</p>
                      <p><span className="font-medium text-foreground">Retention:</span> we keep data as long as needed to provide the service and for legitimate business or legal reasons, then delete or anonymize it.</p>
                      <p><span className="font-medium text-foreground">Your choices:</span> you can request access or deletion of your data. You can unsubscribe from emails at any time via the link provided.</p>
                      <p><span className="font-medium text-foreground">Security:</span> we use reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure.</p>
                      <p><span className="font-medium text-foreground">Children:</span> the service isn't intended for individuals under 18.</p>
                      <p><span className="font-medium text-foreground">Contact:</span> use the Help link in the footer or email ar@agilerant.info.</p>
                      <p className="text-xs">Effective: {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary">Terms</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                      <DialogDescription>Your agreement to use our service.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>By using Custom Fasting Plan by Agile Rant ("Service"), you agree to these Terms. If you don't agree, please don't use the Service.</p>
                      <p><span className="font-medium text-foreground">Use of Service:</span> You may use the Service for personal, non‑commercial purposes and must comply with applicable laws.</p>
                      <p><span className="font-medium text-foreground">No medical advice:</span> Content is for educational purposes only and does not constitute medical advice. Consult your clinician before making changes, especially if you have diabetes, are pregnant, or take medications.</p>
                      <p><span className="font-medium text-foreground">Payments:</span> Payments are processed by Stripe. Access to the full plan is delivered upon successful payment. Taxes may apply.</p>
                      <p><span className="font-medium text-foreground">Accounts and communications:</span> You agree to provide accurate information and consent to receive emails related to plan delivery and important updates. You can unsubscribe from marketing at any time.</p>
                      <p><span className="font-medium text-foreground">Intellectual property:</span> The Service and content are owned by Agile Rant or its licensors. You may not copy, modify, or resell without permission.</p>
                      <p><span className="font-medium text-foreground">Prohibited conduct:</span> Don't misuse the Service, attempt to access others' data, or interfere with operation or security.</p>
                      <p><span className="font-medium text-foreground">Disclaimers:</span> The Service is provided "as is" without warranties. We do not guarantee outcomes, results, or uninterrupted availability.</p>
                      <p><span className="font-medium text-foreground">Limitation of liability:</span> To the fullest extent permitted by law, Agile Rant and its affiliates are not liable for indirect, incidental, or consequential damages.</p>
                      <p><span className="font-medium text-foreground">Governing law:</span> These Terms are governed by the laws of the jurisdiction where Agile Rant operates, without regard to conflict of law principles.</p>
                      <p><span className="font-medium text-foreground">Changes:</span> We may update these Terms. Material changes will be indicated by updating the Effective date.</p>
                      <p><span className="font-medium text-foreground">Contact:</span> use the Help link in the footer or email ar@agilerant.info.</p>
                      <p className="text-xs">Effective: {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <HelpLink
                  page="Home"
                  sessionId={sessionId ?? undefined}
                  email={(leadEmail || (answers as any)?.email) || undefined}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
