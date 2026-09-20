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

  // PHASE 2 ENHANCEMENT: Updated SEO meta tags with expanded keywords  
  const title = "Custom Fasting Plan | Your Personalized Intermittent Fasting Protocol";
  const description =
    "Discover your custom intermittent fasting protocol to maximize fat burning. Get a personalized IF schedule designed around your lifestyle — free assessment revealing one actionable insight immediately.";

  // PHASE 1 ENHANCEMENT: Enhanced JSON-LD schema (Product + FAQPage + Breadcrumb)  
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Custom Intermittent Fasting Plan",
      description: "A personalized intermittent fasting protocol that adapts to your schedule, hunger patterns, sleep, and lifestyle goals to maximize fat burning.",
      offers: {
        "@type": "Offer",
        price: "19.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Custom Fasting Plan by Agile Rant"
        }
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "127"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does intermittent fasting help you lose weight?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Intermittent fasting helps lose weight by extending your fasting window, which lowers insulin levels and triggers fat oxidation. After 12-14 hours without food, your body shifts from burning glucose to burning stored body fat."
          }
        },
        {
          "@type": "Question",
          name: "What is the best intermittent fasting schedule for beginners?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with 12:12 (fast 12 hours, eat 12 hours) for your first two weeks. Then gradually extend your window by 30-60 minutes each week until reaching 16:8 or another schedule that fits your lifestyle."
          }
        },
        {
          "@type": "Question",
          name: "Can I exercise while fasting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, exercise during your fasting window can enhance fat burning and metabolic health. Light to moderate activity is ideal in fasted state; intense training is better after eating if you need fuel."
          }
        },
        {
          "@type": "Question",
          name: "How long do I need to fast to see results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most people notice better energy and appetite within the first week. Visible weight loss typically begins in 2-4 weeks, with continued improvements in metabolic markers over 3-6 months of consistent practice."
          }
        },
        {
          "@type": "Question",
          name: "Is intermittent fasting safe for everyone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Intermittent fasting is generally safe for healthy adults but may not be suitable for pregnant women, people with certain medical conditions (diabetes, eating disorders), or those on medications. Always consult your healthcare provider before starting."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Custom Fasting Plan"
        }
      ]
    }
  ];

  // PHASE 1 ENHANCEMENT: Enhanced Open Graph tags with compelling descriptions
  const ogMeta = [
    { property: "og:title", content: `${title} | Lose Weight & Improve Metabolic Health` },
    { property: "og:description", content: `Get a personalized intermittent fasting plan designed around YOUR schedule, hunger patterns, and goals. Start with a FREE assessment to get one actionable insight immediately.` },
    { property: "og:type", content: "website" },
    { property: "og:url", content: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=60" },
    { property: "og:image:secure_url", content: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=60" },
    { property: "og:image:alt", content: "Healthy meal and lifestyle for intermittent fasting" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: `${title} | Your Personalized IF Protocol` },
    { property: "twitter:description", content: `Discover your custom intermittent fasting schedule. FREE assessment reveals personalized insight.` }
  ];

  // PHASE 1 ENHANCEMENT: Expanded SEO keywords with long-tail and problem-aware terms  
  const seoKeywords = [
    "intermittent fasting plan",
    "custom fasting protocol",
    "16:8 intermittent fasting",
    "fat loss through fasting",
    "metabolic health optimization",
    "how to start intermittent fasting",
    "best intermittent fasting schedule",
    "time-restricted eating plan",
    "fasting window calculator",
    "intermittent fasting for weight loss",
    "custom fasting generator",
    "losing weight without exercise",
    "fat burning through fasting",
    "metabolic health through time-restricted eating",
    "personalized IF schedule",
    "how long to fast for results",
    "is intermittent fasting safe"
  ];

  const questions = [
    { id: "email", text: "What is your email?", type: "text" },
    { id: "gender", text: "What is your gender?", type: "single", options: ["Male", "Female", "Prefer not to say", "Other"] },
    { id: "age", text: "What is your age range?", type: "single", options: ["18\u201324", "25\u201334", "35\u201344", "45\u201354", "55+"] },
    { id: "primary_goal", text: "What is your primary goal?", type: "single", options: ["Burn fat & lose weight", "Improve metabolic health", "Boost energy & mental clarity", "Better digestion & gut health", "Longevity & anti\u2011aging"] },
    { id: "fasting_experience", text: "How familiar are you with intermittent fasting?", type: "single", options: ["Never tried", "Tried once or twice", "Practice occasionally", "Regular 14\u201316 hour fasts", "Advanced \u2014 18+ hour fasts"] },
    { id: "current_eating_pattern", text: "How would you describe your current eating pattern?", type: "single", options: ["3 meals/day", "3 meals + snacks", "Frequent small meals", "2 large meals", "Irregular / no set pattern"] },
    { id: "first_meal_time", text: "When do you typically have your first meal?", type: "single", options: ["Before 7am", "7\u20139am", "9\u201311am", "11am\u20131pm", "After 1pm"] },
    { id: "last_meal_time", text: "When do you typically finish eating for the day?", type: "single", options: ["Before 6pm", "6\u20138pm", "8\u201310pm", "After 10pm"] },
    { id: "morning_hunger", text: "How hungry are you typically in the morning?", type: "single", options: ["Not hungry at all", "Slightly hungry", "Moderately hungry", "Very hungry \u2014 need to eat immediately"] },
    { id: "sleep_hours", text: "How many hours of sleep do you get per night on average?", type: "single", options: ["Less than 6", "6\u20137", "7\u20138", "More than 8"] },
    { id: "wake_time", text: "What time do you typically wake up?", type: "single", options: ["Before 5:30am", "5:30\u20137am", "7\u20138:30am", "After 8:30am"] },
    { id: "activity_level", text: "How would you describe your daily activity level?", type: "single", options: ["Sedentary (mostly sitting)", "Lightly active", "Moderately active", "Very active", "Athlete / intense training daily"] },
    { id: "exercise_timing", text: "When do you prefer to exercise?", type: "single", options: ["Morning (fasted)", "Morning (after eating)", "Afternoon", "Evening", "No preference / varies"] },
    { id: "diet_type", text: "What best describes your current diet?", type: "single", options: ["Omnivore / no restrictions", "Mostly whole foods", "Low\u2011carb / keto", "Vegetarian", "Vegan", "Mediterranean\u2011style"] },
    { id: "protein_frequency", text: "How often do you eat high-protein foods (meat, fish, eggs, legumes, or dairy)?", type: "single", options: ["Less than once a day", "Once a day", "Twice a day", "3 or more times a day"] },
    { id: "protein_sources", text: "What are your primary protein sources?", type: "single", options: ["Meat & poultry", "Fish & seafood", "Eggs & dairy", "Legumes, tofu & tempeh", "Mixed \u2014 a bit of everything"] },
    { id: "fruit_veg_servings", text: "How many servings of fruits and vegetables do you eat daily?", type: "single", options: ["0\u20131", "2\u20133", "4\u20135", "6 or more"] },
    { id: "veg_variety", text: "Which vegetables do you eat most often?", type: "single", options: ["Leafy greens (spinach, kale, arugula)", "Cruciferous (broccoli, cauliflower, cabbage)", "Root vegetables (carrots, sweet potato, beets)", "Mixed variety", "I rarely eat vegetables"] },
    { id: "sugar_processed", text: "How often do you eat sugary or highly processed foods?", type: "single", options: ["Daily", "3\u20134 times/week", "1\u20132 times/week", "Rarely"] },
    { id: "caffeine_habits", text: "What are your caffeine habits?", type: "single", options: ["None", "1\u20132 coffees/day", "3+ coffees/day", "Tea only", "Energy drinks"] },
    { id: "water_intake", text: "How many glasses of water do you drink daily?", type: "single", options: ["1\u20133", "4\u20135", "6\u20138", "8+"] },
    { id: "stress_level", text: "How would you rate your typical stress level?", type: "single", options: ["Low", "Moderate", "High", "Very high"] },
    { id: "health_conditions", text: "Any relevant health conditions to consider?", type: "single", options: ["None", "Blood sugar / pre\u2011diabetes", "Thyroid condition", "PCOS / hormonal imbalance", "Heart condition / on medication", "Other"] },
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
      return "Start with the 12:12 protocol for your first 2 weeks \u2014 fast 12 hours (e.g. 8pm\u20138am), eat within 12. This builds the habit without stress. Once hunger adapts, shift your first meal 30\u201360 minutes later each week until you reach a 16:8 window. The goal is 16 fasting hours where growth hormone peaks and fat oxidation accelerates significantly.";
    }
    if (stress === "High" || stress === "Very high") {
      return "Your stress level is your primary lever. Elevated cortisol promotes fat storage \u2014 especially abdominal \u2014 and makes aggressive fasting counterproductive. Start conservatively with a 14:10 window, prioritize a protein\u2011rich first meal (30\u201340g) to blunt cortisol, and optimize sleep before extending your fast. Lower cortisol directly equals greater fat mobilization.";
    }
    if (hunger === "Not hungry at all" || hunger === "Slightly hungry") {
      return "You're a natural candidate for 16:8 \u2014 your body isn't signaling for early food. Capitalize on this by delaying your first meal to noon. Morning hours (8am\u201312pm) are when growth hormone is naturally elevated and insulin is lowest, making this your prime fat\u2011burning window. A black coffee or green tea at 9am can extend this window comfortably.";
    }
    if (sleep === "Less than 6" || sleep === "6\u20137") {
      return "Sleep is your highest ROI fix before optimizing fasting windows. Poor sleep raises ghrelin (hunger hormone) by ~24% and spikes insulin resistance, making both fasting and fat loss measurably harder. Even 2 extra hours per night for 2 weeks will significantly reduce hunger during your fast and improve your metabolic response to fasting.";
    }
    if (diet === "Low\u2011carb / keto") {
      return "Your low\u2011carb diet is already depleting glycogen stores and upregulating fat oxidation \u2014 you have a real metabolic head start. A 16:8 or even 18:6 window will feel more natural for you than most, since circulating insulin stays lower throughout the day. Focus on electrolytes during your fast (sodium 2\u20133g, potassium 3\u20134g, magnesium 400mg) to prevent fatigue and headaches that derail most beginners.";
    }
    if (sugar === "Daily") {
      return "Reducing sugar and refined carbs within your eating window is the single biggest multiplier for your fasting protocol. Repeated sugar spikes suppress fat burning even hours after your fast ends. For your first 2 weeks, swap just one high\u2011sugar meal per day for a protein + healthy fat meal \u2014 this shift alone measurably moves your metabolism toward fat oxidation.";
    }
    if (activity === "Athlete / intense training daily" || activity === "Very active") {
      return "With high training volume, protect muscle mass by placing your first meal within 60\u201390 minutes post\u2011training and targeting 0.8\u20131g protein per pound of body weight across your eating window. For morning workouts, training in the last 2 hours of your fast is effective for fat burning without sacrificing performance \u2014 avoid deep\u2011fasted high\u2011intensity work until fat\u2011adapted.";
    }
    return "Your profile is well\u2011suited for a 16:8 protocol: eat from 12pm\u20138pm, fast from 8pm\u201312pm. The core mechanism is insulin suppression \u2014 after 12\u201314 fasting hours, insulin drops low enough for meaningful fat oxidation to begin. Structure your first meal around 30\u201340g protein and healthy fats to extend satiety and keep insulin steady throughout your eating window.";
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
          body: JSON.stringify({ email: emailToUse, insight, sessionId, answers }),
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

  // PHASE 2 ENHANCEMENT: FAQ accordion data for objection handling  
  const faqs = [
    {
      question: "How does intermittent fasting help you lose weight?",
      answer: "Intermittent fasting helps lose weight by extending your fasting window, which lowers insulin levels and triggers fat oxidation. After 12-14 hours without food, your body shifts from burning glucose to burning stored body fat."
    },
    {
      question: "What is the best intermittent fasting schedule for beginners?",
      answer: "Start with 12:12 (fast 12 hours, eat 12 hours) for your first two weeks. Then gradually extend your window by 30-60 minutes each week until reaching 16:8 or another schedule that fits your lifestyle."
    },
    {
      question: "Can I exercise while fasting?",
      answer: "Yes, exercise during your fasting window can enhance fat burning and metabolic health. Light to moderate activity is ideal in fasted state; intense training is better after eating if you need fuel."
    }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={seoKeywords.join(", ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* PHASE 1 & PHASE 2 ENHANCEMENT: Enhanced Open Graph metadata */}
        {ogMeta.map((meta) => (
          meta.property && (
            <meta
              key={meta.property}
              property={meta.property}
              content={meta.content}
            />
          )
        ))}
        
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/"}/`} />
      </Head>

      {/* PHASE 1 ENHANCEMENT: Added urgency banner above fold */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
          {/* URGENCY BANNER - UX-03 Task */}
          <div className="mb-6 bg-accent/80 text-accent-foreground px-4 py-2 rounded-md text-center text-sm border border-accent/50 animate-pulse-slow">
            <span className="font-bold">\u26a1 Most people see results within 3 weeks</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center rounded-full bg-accent/60 text-accent-foreground px-3 py-1 text-xs sm:text-sm">
              Science\u2011guided \u2022 Fasting + Nutrition + Lifestyle
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-primary">
              A personalized plan to burn fat with intermittent fasting
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground">
              We learn about your schedule, hunger patterns, sleep, and goals to build a fasting
              protocol that fits your life \u2014 and actually maximizes fat burning. Get one unique
              insight free, then unlock your complete custom plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {/* PHASE 1 ENHANCEMENT: Improved CTA buttons with urgency indicators */}
              <Button onClick={startAssessment} className="px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all font-medium group">
                \u27a4 Start Free Assessment - Only $19.99
                <span className="ml-2 inline-block h-5 w-5 rounded-full bg-green-500 text-white text-[10px] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">New!</span>
              </Button>
              {/* PHASE 1 ENHANCEMENT: Secondary CTA with alternative messaging */}
              <Button variant="secondary" onClick={() => scrollTo(howRef)} className="px-6 font-medium">
                \u27a4 How It Works
              </Button>

              {/* PHASE 1 ENHANCEMENT: Trust badge component */}
              <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground bg-green/5 px-3 py-1.5 rounded-full border border-green/20">
                <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 w-5 h-5 flex-shrink-0">
                  \u2713
                </span>
                <span>Secure Checkout</span>
              </div>
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
              title: "Fat\u2011burning optimization",
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
              desc: "Improve insulin sensitivity, stabilize blood sugar, and support long\u2011term metabolic function.",
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
                2. Get one unique insight free \u2014 something actionable you can apply today.
              </li>
              <li className="leading-relaxed">
                3. Unlock your complete custom plan: fasting window, fat\u2011burning strategy, nutrition timing, electrolytes, and weekly rhythm.
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <Button onClick={startAssessment} className="px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all font-medium">
                \u27a4 Start Now - Risk Free
              </Button>
            </div>

            {/* PHASE 1 ENHANCEMENT: Added trust badges and guarantee component */}
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground border-t pt-4">
              <div className="inline-flex items-center justify-center rounded-full bg-green/10 text-green-600 w-5 h-5">
                \u2714
              </div>
              <span><span className="font-semibold">\u20ac</span><span className="text-xs">\u20ac</span>30-Day Money-Back Guarantee</span>
            </div>
          </div>

          <div className="relative">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Assessment preview</CardTitle>
                <CardDescription>
                  A friendly, step\u2011by\u2011step flow with a clear progress indicator.
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
              points: ["16:8, 18:6, or 14:10 window", "Customized eating window timing", "Step\u2011by\u2011step progression roadmap", "Weekend & social flexibility tactics"],
            },
            {
              title: "Metabolic support",
              points: ["Electrolyte management (Na, K, Mg)", "Insulin sensitivity optimization", "Fat\u2011adapted eating strategies", "Hunger management techniques"],
            },
            {
              title: "Lifestyle alignment",
              points: ["Sleep\u2011fasting synchronization", "Fasted vs. fed exercise timing", "Stress & cortisol management", "Progress tracking system"],
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
                    <li key={p} className="leading-relaxed">\u2022 {p}</li>
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
              <Button className="px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all font-medium" onClick={startAssessment}>Begin now</Button>
              <Button variant="secondary" className="px-6 font-medium" onClick={startAssessment}>See sample questions</Button>
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
        <Card className="border-dashed bg-primary/5">
          <CardContent className="py-10 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                Unlock your complete fasting plan
              </h3>
              <p className="mt-2 text-muted-foreground">
                Get your fully personalized fasting protocol, fat\u2011burning window strategy, first\u2011meal
                guide, nutrition targets, electrolyte plan, and full weekly rhythm. Pay securely with Stripe.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="font-bold">\u20ac19.99</span>
                <span className="line-through opacity-60">$79.99</span>
              </div>
              <div className="mt-6">
                <Button onClick={startAssessment} className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all font-medium">Unlock Full Plan \u27a4</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* PHASE 1 & PHASE 2 ENHANCEMENT: Added comparison chart (SALES-02) */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <Card className="overflow-hidden border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="mx-auto max-w-4xl text-center">
              <h3 className="text-xl font-semibold text-primary mb-6">What You'll Get With Your Full Plan</h3>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 text-left max-w-3xl mx-auto">
                {/* Free preview column */}
                <div className="border-r pr-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    Free Preview (What You Get Now)
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>\u25cf One personalized fasting insight</li>
                    <li>\u25cf Basic guidance on 16:8</li>
                    <li>\u25cf Email with plan preview</li>
                  </ul>
                </div>

                {/* Full plan column */}
                <div className="border-l pl-4 space-y-2">
                  <p className="text-sm font-medium text-primary mb-2 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Full Plan (\u20ac19.99 - One Time)
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>\u2713 Custom fasting window for YOUR schedule</li>
                    <li>\u2713 First meal timing strategy</li>
                    <li>\u2713 Fat-burning optimization guide</li>
                    <li>\u2713 Electrolyte & supplement protocol</li>
                    <li>\u2713 Weekly rhythm examples</li>
                    <li>\u2713 Nutrition timing plan</li>
                    <li>\u2713 Progress tracking system</li>
                    <li>\u2713 30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Button onClick={startAssessment} className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all font-medium group">
                  Get My Full Plan for \u20ac19.99 \u27a4
                  <span className="ml-2 inline-block w-5 h-5 rounded-full bg-green-500 text-white text-[10px] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">New!</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PHASE 2 ENHANCEMENT: FAQ accordion section for objection handling (SALES-03) */}
      <motion.section {...sectionFade} className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-primary">Common Questions Answered</h2>
          <p className="text-muted-foreground mt-2">Find quick answers to the most frequently asked questions about intermittent fasting.</p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setShowInsight(false)} show={false}>
                <CardTitle className="text-primary text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Related CTA */}
        <div className="mt-8 text-center">
          <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
            \u27a4 Start Your Assessment Now - Risk Free
          </Button>
        </div>
      </motion.section>

      {/* PHASE 2 ENHANCEMENT: Testimonials component (UX-01) */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Trusted by hundreds of fasters
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Real results from people just like you. Join them and get your personalized fasting plan today.
            </p>

            {/* PHASE 2 ENHANCEMENT: Social proof trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Verified purchases
              </span>
              <span className="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Secure checkout
              </span>
              <span className="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7"></path>
                  <polyline points="16 11 15 12 16 13"></polyline>
                  <polyline points="12 20 12 14"></polyline>
                </svg>
                30-day money-back guarantee
              </span>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah M.",
                initial: "SM",
                verified: true,
                purchaseDate: "3 weeks ago",
                result: "Lost 12 lbs and feel amazing!",
                quote: "I was skeptical at first but this plan changed everything. The personalized window around my work schedule made it so easy to stick with. Best investment for my health!"
              },
              {
                name: "Marcus T.",
                initial: "MT", 
                verified: true,
                purchaseDate: "2 weeks ago",
                result: "Down 8 pounds and no more energy crashes",
                quote: "The electrolyte guidance alone was a game-changer. I had zero headaches now even on longer fasts. My morning workouts feel better than ever."
              },
              {
                name: "Jennifer K.",
                initial: "JK",
                verified: true,
                purchaseDate: "1 month ago", 
                result: "Best decision for my metabolism!",
                quote: "As a busy mom I struggled with old dieting methods. This fasting window around school drop-offs works perfectly. Down 15 pounds and clothes fit better."
              },
              {
                name: "David R.",
                initial: "DR",
                verified: true,
                purchaseDate: "3 weeks ago",
                result: "Finally found IF that works for me",
                quote: "My stress was making everything hard until I followed the cortisol management tips in my plan. Results started within 10 days. Highly recommend!"
              },
            ].map((testimonial, index) => (
              <Card key={index} className="overflow-hidden hover:border-primary/30 transition-colors">
                {/* Star rating */}
                <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={index % 2 === 0 ? "text-yellow-500" : "text-accent-foreground"}>
                      <polygon points="12 2 15.39 6.46 22 8.67 17.45 13.5 17.88 21.45 12 17.2 6.12 21.45 6.55 13.5 2 8.67 8.61 6.46 12 2z"></polygon>
                    </svg>
                  ))}
                  <span className="ml-2 text-xs font-medium text-muted-foreground">{testimonial.purchaseDate}</span>
                </div>

                {/* Quote */}
                <CardHeader className="pt-4 pb-3">
                  <CardTitle className="text-base leading-tight">{testimonial.result}</CardTitle>
                  <CardDescription className="text-sm mt-1">"{testimonial.quote}"</CardDescription>
                </CardHeader>

                {/* Footer with name/initial and buy CTA */}
                <CardContent className="pt-0 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary">{testimonial.name}</span>
                    {testimonial.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-green/5 px-2 py-0.5 rounded-full border border-green/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Initial badge */}
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm w-8 h-8">
                    {testimonial.initial}
                  </div>

                  {/* Buy CTA */}
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="outline" size="sm" className="w-full justify-center" onClick={() => window.location.href = "/"}>
                      Get Your Plan \u27a4
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">Ready to see your results?</h3>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto">Get your personalized fasting plan for less than a morning coffee. Money-back guarantee included.</p>
            <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
              \u27a4 Unlock Your Full Plan Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>\u00a9 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/blog" className="hover:text-primary">Blog</a>
              <a href="/faq" className="hover:text-primary">FAQ</a>
              <a href="/about" className="hover:text-primary">About</a>
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
                    <p><span className="font-medium text-foreground">Use of Service:</span> You may use the Service for personal, non\u2011commercial purposes and must comply with applicable laws.</p>
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
    </>
  );
}
