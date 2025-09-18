import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

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

  const title = "Personalized Hair Regrowth Plan | Science‑Backed Insights";
  const description =
    "Regrow and keep your hair with a personalized plan. We assess stress, nutrition, thinning patterns, and pair proven supplements with topicals. Get a unique free insight, then unlock your full plan.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Personalized Hair Regrowth Plan",
    url: "https://example.com/",
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hair growth, regrow hair, hair loss, thinning hair, nutrition for hair, stress hair loss, hair supplements, hair vitamins, topicals for hair"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&amp;fit=crop&amp;w=1200&amp;q=60" />
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
              src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=2000&q=60"
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
                  Science‑guided • Nutrition + Stress + Topicals
                </p>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-primary">
                  A personalized plan to regrow and keep your hair
                </h1>
                <p className="mt-5 text-base sm:text-lg text-muted-foreground">
                  We learn about your habits, stress, nutrition, and thinning patterns to tailor
                  clinically‑researched supplements and topicals. Get one unique insight free, then
                  unlock your complete plan.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => scrollTo(startRef)} className="px-6">
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
              Your answers shape dosage, timing, and combinations across the pillars of hair health.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Regrowing hair",
                desc: "Stimulate follicles with targeted nutraceuticals and growth‑supportive routines.",
                img: "https://images.unsplash.com/photo-1498601761256-5df5291a7525?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Keeping your hair",
                desc: "Reduce shedding triggers and maintain a scalp environment where hair thrives.",
                img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Fighting thinning",
                desc: "Address pattern thinning with evidence‑based strategies you can sustain.",
                img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Fixing diet & nutrition",
                desc: "Optimize protein, iron, zinc, biotin, vitamin D and more—personalized to you.",
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Fighting stress",
                desc: "Calm systemic stress that accelerates shedding with lifestyle and supplementation.",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "High‑performing topicals",
                desc: "Combine proven topicals for a comprehensive, high‑yield plan.",
                img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=60",
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
                  1. Answer a short series of questions about your hair history, lifestyle, and goals.
                </li>
                <li className="leading-relaxed">
                  2. Get one unique insight free—something actionable you can do today.
                </li>
                <li className="leading-relaxed">
                  3. Unlock your complete, personalized plan: dosages, timing, stack, and topicals.
                </li>
              </ul>

              <div className="mt-8">
                <Button onClick={() => scrollTo(startRef)}>Start now</Button>
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
                      How many days per week do you notice increased shedding during showering?
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="secondary">0–1</Button>
                      <Button variant="secondary">2–3</Button>
                      <Button variant="secondary">4–5</Button>
                      <Button variant="secondary">6–7</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div aria-hidden className="absolute -inset-x-6 -inset-y-6 bg-gradient-to-br from-accent/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.section>

        {/* Evidence & supplements */}
        <motion.section
          {...sectionFade}
          className="mx-auto max-w-7xl px-4 py-14 sm:py-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Backed by research‑driven building blocks
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your plan adapts dosage by body size, diet, labs, stress, and tolerance.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Nutrition core",
                points: ["Protein target", "Iron + Ferritin support", "Vitamin D3 + K2", "Zinc, Biotin, B‑complex"],
              },
              {
                title: "Growth support",
                points: ["Saw palmetto/β‑sitosterol", "Collagen + MSM", "Marine peptides", "Topical minoxidil pairing"],
              },
              {
                title: "Stress & sleep",
                points: ["Ashwagandha / L‑theanine", "Magnesium glycinate", "Light & wind‑down routine"],
              },
            ].map((c) => (
              <Card key={c.title}>
                <CardHeader>
                  <CardTitle className="text-primary">{c.title}</CardTitle>
                  <CardDescription>Personalized dosing guidance</CardDescription>
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
            This content is educational and not a substitute for medical advice. Consult your clinician before changes.
          </p>
        </motion.section>

        {/* Start CTA / Framework for flow */}
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
                Answer in under 2 minutes. We’ll reveal one personalized insight immediately. You can
                unlock your complete plan afterwards.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="px-6">Begin now</Button>
                <Button variant="secondary" className="px-6">See sample questions</Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                We may email your results and plan preview. You can opt out anytime.
              </p>
            </div>

            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden rounded-md border">
                <Image
                  src="https://images.unsplash.com/photo-1530630458144-014709e10016?auto=format&fit=crop&w=1400&q=60"
                  alt="Healthy hair lifestyle"
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
                  Unlock your comprehensive hair plan
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Get your fully personalized supplement dosing, timing, stack, lifestyle guidance,
                  and topical pairings. Pay securely with Stripe.
                </p>
                <div className="mt-6">
                  <Button className="px-6">View pricing after insight</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Footer */}
        <footer className="border-t">
          <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} Hair Plan. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary">Privacy</a>
                <a href="#" className="hover:text-primary">Terms</a>
                <a href="#" className="hover:text-primary">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
