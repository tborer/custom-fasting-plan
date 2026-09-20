import Head from "next/head";

export default function AboutPage() {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";

  // SEC-03: About page for branding and E-E-A-T trust signals
  const faqs = [
    {
      question: "Who is behind this platform?",
      answer: "Custom Fasting Plan is created and maintained by Agile Rant, a team of metabolic health enthusiasts and science communicators. While we're not medical doctors, we follow peer-reviewed research from nutritionists, endocrinologists, and exercise physiologists to create evidence-based fasting protocols."
    },
    {
      question: "Why should I trust your recommendations?",
      answer: "We prioritize protocols backed by clinical research over anecdotal claims. Our plans have been used by hundreds of people across diverse lifestyles with consistent positive outcomes. We're transparent about limitations and will tell you when a protocol won't work for your circumstances."
    },
    {
      question: "Do you sell miracle cures?",
      answer: "Absolutely not. If we knew something that didn't work, we wouldn't recommend it. Our 30-day money-back guarantee backs this up. If our personalized plan doesn't help you after trying it properly, contact us for a full refund."
    },
    {
      question: "Are you affiliated with hospitals or health organizations?",
      answer: "We're an independent platform not affiliated with any healthcare institution. We follow guidelines from reputable organizations like the American Heart Association and Harvard Health Publishing in our recommendations."
    }
  ];

  const ogMeta = [
    { property: "og:title", content: "About Us | Custom Fasting Plan" },
    { property: "og:description", content: "Learn about the team behind Custom Fasting Plan, our mission, and why you can trust our recommendations." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${currentUrl}/about` },
    { property: "og:image", content: "https://images.unsplash.com/photo-1556761175-4b46a502df46?auto=format&fit=crop&w=1200&q=60" }
  ];

  return (
    <>
      <Head>
        <title>About Us | Custom Fasting Plan</title>
        {ogMeta.map((meta) => (
          meta.property && (
            <meta key={meta.property} property={meta.property} content={meta.content} />
          )
        ))}
        <link rel="canonical" href={`${currentUrl}/about`} />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <main className="flex-1 mx-auto max-w-4xl px-4 py-16 sm:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary">About Custom Fasting Plan</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mission, expertise, and commitment to metabolic health.
            </p>
          </div>

          {/* Mission Statement */}
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We exist to make intermittent fasting accessible, science-backed, and sustainable for people everywhere. 
              Our personalized plans help you discover the optimal fasting protocol that fits YOUR unique lifestyle — 
              your schedule, hunger patterns, sleep needs, and health goals. We believe that metabolic health should be simple, 
              not complicated by rigid diets or extreme restrictions that most people can't maintain long-term.
            </p>

            {/* Why IF Matters */}
            <h2 className="text-xl font-semibold text-primary mt-10">Why Intermittent Fasting Matters</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Intermittent fasting is more than a trend — it's a powerful metabolic tool that can help reverse insulin resistance, 
              improve cognitive function, reduce inflammation, and extend healthy lifespan. But IF works differently for everyone, 
              which is why our personalized approach matters so much. We assess your individual profile to create a protocol 
              that you'll actually stick with, because what you don't do doesn't do anything.
            </p>

            {/* Approach & Credentials */}
            <h2 className="text-xl font-semibold text-primary mt-10">Our Approach & Science-First Philosophy</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-4 3-4 3"></path>
                    <line x1="22" y1="12" x2="17" y2="12"></line>
                  </svg>
                  Research-Backed Protocols
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our plans are built on peer-reviewed research in metabolic health, endocrinology, and nutritional science. We prioritize protocols that have been validated in clinical studies rather than fads or anecdotal claims.
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 0L12 11l6.66-6.64zM12 18v-6"></path>
                  </svg>
                  Real-World Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  We've worked with hundreds of people across diverse lifestyles — from busy parents and healthcare professionals to athletes and artists. Our feedback loop allows us to continuously refine our protocols based on real outcomes.
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.5l-7-7z"></path>
                  </svg>
                  Transparency & Honesty
                </h3>
                <p className="text-sm text-muted-foreground">
                  We're not here to sell you an outcome we can't deliver. If a protocol won't work for your particular circumstances, we'll tell you. Our satisfaction guarantee backs this up — you have 30 days to see value or get a full refund.
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                  No Miraculous Claims
                </h3>
                <p className="text-sm text-muted-foreground">
                  We don't promise unrealistic results or guarantee specific weight loss. Every person is different, and what works for one may not work for another. But we're confident that our methods are among the most effective available.
                </p>
              </div>
            </div>

            {/* Trust Signals */}
            <h2 className="text-xl font-semibold text-primary mt-10">Trust & Safety</h2>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><span className="font-medium">Privacy-focused:</span> We collect only what's necessary to personalize your plan and never sell your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><span className="font-medium">Medical disclaimers:</span> We include medical disclaimers with every plan. Consult your healthcare provider before starting IF if you have health conditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><span className="font-medium">Secure payments:</span> We use Stripe with industry-standard encryption. Your financial information is never stored on our servers.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><span className="font-medium">Bonus content:</span> Every plan includes electrolyte guides, meal timing charts, exercise integration tips, and more.</span>
              </li>
            </ul>
          </section>

          {/* External Resources */}
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-primary">External Resources We Reference</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We regularly review new research from these sources to ensure our recommendations remain current:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href="https://www.harvardhealth.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-lg border bg-card px-4 py-5 hover:border-primary/30 transition-colors text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-12 h-12">
                  H
                </div>
                <span className="text-sm font-medium text-primary">Harvard Health Publishing</span>
              </a>
              <a 
                href="https://www.heart.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-lg border bg-card px-4 py-5 hover:border-primary/30 transition-colors text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-12 h-12">
                  H
                </div>
                <span className="text-sm font-medium text-primary">American Heart Association</span>
              </a>
              <a 
                href="https://www.niddk.nih.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-lg border bg-card px-4 py-5 hover:border-primary/30 transition-colors text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-12 h-12">
                  N
                </div>
                <span className="text-sm font-medium text-primary">National Institute of Diabetes</span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg border bg-muted/30 p-6 mt-8">
              <h3 className="font-medium text-primary mb-2">\ud83d\udc4b External Links Note</h3>
              <p className="text-sm text-muted-foreground">
                We reference these external resources for educational purposes only. They may not represent our opinions or recommendations. Always consult qualified healthcare professionals before making significant changes to your diet, exercise routine, or medications.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-primary">Get In Touch</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Have questions about how intermittent fasting might work for you? Questions about our approach or want to share your success stories? Reach out through our help form in the footer, and we'll respond within 24\u201348 hours.
            </p>

            <div className="rounded-lg border bg-accent/5 p-6">
              <h3 className="font-medium text-primary mb-2">\u27a4 Connect With Us</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>\u2022 Use the Help link in the site footer</li>
                <li>\u2022 Visit our FAQ page for immediate answers</li>
                <li>\u2022 Email: ar@agilerant.info (subject line optional)</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-16 pt-10 border-t text-center">
            <p className="text-sm text-muted-foreground">\u00a9 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="/faq" className="hover:text-primary text-sm underline-offset-2 hover:underline">FAQ</a>
              <a href="/" className="hover:text-primary text-sm underline-offset-2 hover:underline">\u27a4 Back to Home</a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-muted-foreground text-center">
            <p>\u00a9 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
