import Head from "next/head";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/faq";

  // PHASE 2: SEO-Optimized FAQs targeting Google's Featured Snippets (Position Zero)
  // Each question is concise, under 40 words for snippet eligibility
  const faqs = [
    {
      question: "How does intermittent fasting help you lose weight?",
      answer: "Intermittent fasting helps lose weight by extending your fasting window, which lowers insulin levels and triggers fat oxidation. After 12-14 hours without food, your body shifts from burning glucose to burning stored body fat.",
      internalLinks: [{ text: "Start your assessment", href: "/" }]
    },
    {
      question: "What is the best intermittent fasting schedule for beginners?",
      answer: "Start with 12:12 (fast 12 hours, eat 12 hours) for your first two weeks. Then gradually extend your window by 30-60 minutes each week until reaching 16:8 or another schedule that fits your lifestyle.",
      internalLinks: [{ text: "Get your custom plan", href: "/" }]
    },
    {
      question: "Can I eat on 16:8 intermittent fasting?",
      answer: "Yes! The 16:8 method means you fast for 16 hours and eat during an 8-hour window. You can eat whatever fits your nutrition needs within those eating hours — the key is maintaining the fasting period.",
      internalLinks: []
    },
    {
      question: "How long do I need to fast to see results?",
      answer: "Most people notice better energy and appetite within the first week. Visible weight loss typically begins in 2-4 weeks, with continued improvements in metabolic markers over 3-6 months of consistent practice.",
      internalLinks: []
    },
    {
      question: "Is intermittent fasting safe for everyone?",
      answer: "Intermittent fasting is generally safe for healthy adults but may not be suitable for pregnant women, people with certain medical conditions (diabetes, eating disorders), or those on medications. Always consult your healthcare provider before starting.",
      internalLinks: []
    },
    {
      question: "What should I eat during my eating window?",
      answer: "Focus on whole foods: lean proteins, healthy fats, fiber-rich vegetables, and complex carbs. Prioritize protein to stay satiated and build muscle. Hydrate well with water, herbal tea, or black coffee.",
      internalLinks: [{ text: "Learn more about nutrition", href: "/" }]
    },
    {
      question: "How do I break a fast properly?",
      answer: "Start with a small, nutrient-dense meal. Break your fast with protein and healthy fats first — like eggs, Greek yogurt, or avocado. Avoid sugary foods to prevent insulin spikes and energy crashes.",
      internalLinks: []
    },
    {
      question: "Can I exercise while fasting?",
      answer: "Yes, exercise during your fasting window can enhance fat burning and metabolic health. Light to moderate activity is ideal in fasted state; intense training is better after eating if you need fuel.",
      internalLinks: [{ text: "Custom plan includes exercise timing", href: "/" }]
    },
    {
      question: "What if I get hungry during my fast?",
      answer: "This is normal! Drink water, herbal tea, or black coffee. Try a tablespoon of apple cider vinegar or eat crunchy veggies to curb cravings. Most hunger fades after 2-3 weeks as your body adapts.",
      internalLinks: []
    },
    {
      question: "Does intermittent fasting work for women?",
      answer: "Yes, but women may benefit from more conservative fasting windows (14:10 or 15:9) initially. Hormonal sensitivity varies — listen to your body and adjust accordingly. Some women respond better to reverse 16:8 (eat earlier in the day).",
      internalLinks: []
    },
    {
      question: "Can I drink coffee during a fast?",
      answer: "Yes, black coffee or green tea is fine. Adding milk, cream, sugar, or sweeteners will break your fast. Stick to 1-2 cups maximum to avoid excessive caffeine affecting sleep or hunger.",
      internalLinks: []
    },
    {
      question: "What are common intermittent fasting mistakes?",
      answer: "Common mistakes: eating too much in the window (undoing fat loss benefits), skipping workouts, ignoring sleep/stress management, giving up before 2-3 weeks, and relying on processed foods during your eating period.",
      internalLinks: [{ text: "Avoid these pitfalls", href: "/" }]
    },
    {
      question: "Can I combine IF with keto or other diets?",
      answer: "Absolutely! Intermittent fasting pairs well with ketogenic, Mediterranean, and plant-based diets. The key is maintaining your chosen dietary approach while adhering to your fasting window timing.",
      internalLinks: []
    },
    {
      question: "How much weight can I expect to lose?",
      answer: "Results vary by individual. On average, people lose 0.5-2 pounds per week when following intermittent fasting consistently. Sustainable fat loss is healthier and more sustainable than rapid weight reduction.",
      internalLinks: []
    }
  ];

  // Enhanced JSON-LD FAQPage schema with all questions and answers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  // Enhanced OG tags for social sharing
  const ogMeta = [
    { property: "og:title", content: "FAQ | Your Questions About Intermittent Fasting Answered" },
    { property: "og:description", content: "Get answers to the most common questions about intermittent fasting, weight loss, and metabolic health. Learn how to get started." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=60" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: "FAQ | Your Questions About Intermittent Fasting Answered" },
    { property: "twitter:description", content: "Get answers to the most common questions about intermittent fasting, weight loss, and metabolic health." }
  ];

  return (
    <>
      <Head>
        <title>FAQ | Your Questions About Intermittent Fasting Answered</title>
        {ogMeta.map((meta) => (
          meta.property && (
            <meta
              key={meta.property}
              property={meta.property}
              content={meta.content}
            />
          )
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <main className="flex-1 mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about intermittent fasting, weight loss, and metabolic health. 
              If you have other questions, feel free to reach out through our contact form.
            </p>

            {/* PHASE 2 ENHANCEMENT: Add quick CTA to main site */}
            <div className="mt-8">
              <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="inline-flex items-center gap-2">
                ➤ Start Your Free Assessment Now
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="rounded-lg border bg-card p-6 hover:border-primary/30 transition-colors"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  itemScope
                  itemProp="name"
                  className="text-xl font-medium text-primary mb-3"
                >
                  {faq.question}
                </h3>

                <div itemScope itemProp="acceptedAnswer">
                  <span itemProp="answer">
                    <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </span>
                </div>

                {/* Internal links if available */}
                {faq.internalLinks && faq.internalLinks.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t">
                    {faq.internalLinks.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = link.href}
                      >
                        {link.text} ➤
                      </Button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Related Resources Section */}
          <section className="mt-16 pt-10 border-t">
            <h2 className="text-2xl font-semibold text-primary mb-6">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              If you don't find what you're looking for here, our personalized assessment will answer all your specific questions based on your unique profile.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="w-full justify-center">
                ➤ Take Free Assessment - Get Your Custom Plan
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full justify-center"
                onClick={() => {
                  // Could implement help dialog here
                  window.location.href = "/";
                }}
              >
                ➤ Talk to Our Support Team
              </Button>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="mt-16 pt-10 border-t">
            <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto">
              <span className="font-medium">Medical Disclaimer:</span> The information provided on this FAQ page is for educational purposes only and does not constitute medical advice. 
              Always consult with a qualified healthcare provider before starting any new diet, exercise program, or health regimen, especially if you have existing health conditions or take medications.
            </p>
          </section>
        </main>

        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-muted-foreground text-center">
            <p>© 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="/blog" className="hover:text-primary">Blog</a>
              <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
