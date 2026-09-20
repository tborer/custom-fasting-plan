import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function ScienceOfFastingPage() {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${currentUrl}/blog/science-of-fasting`;
  const title = "The Science of Fasting for Fat Loss";
  const description =
    "How intermittent fasting works on a cellular and metabolic level — insulin, growth hormone, autophagy, mitochondrial efficiency, and the research behind fasting for fat loss.";
  const ogImage = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=60";

  // SEC-05: Science of Fasting blog post — indexable page targeting science/metabolic keywords
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: ogImage,
    author: { "@type": "Organization", name: "Agile Rant" },
    publisher: { "@type": "Organization", name: "Agile Rant" },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
  };

  return (
    <>
      <Head>
        <title>{`${title} | Custom Fasting Plan`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mx-auto max-w-3xl px-4 py-10 sm:py-16 w-full">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">How intermittent fasting works on a cellular and metabolic level.</p>
          </div>

          <nav aria-label="Table of contents" className="space-y-1 mb-8 p-4 rounded-md border bg-muted/30 text-sm">
            <ol className="list-decimal list-inside space-y-1 text-primary font-medium">
              <li><a href="#insulin" className="hover:underline">Insulin & Fat Burning</a></li>
              <li><a href="#growth-hormone" className="hover:underline">Growth Hormone Spikes</a></li>
              <li><a href="#autophagy" className="hover:underline">Cellular Repair (Autophagy)</a></li>
              <li><a href="#mitochondria" className="hover:underline">Mitochondrial Efficiency</a></li>
              <li><a href="#hormones" className="hover:underline">Hormonal Balance (Ghrelin, Leptin, Cortisol)</a></li>
              <li><a href="#study-summary" className="hover:underline">Study Summary</a></li>
              <li><a href="#cta" className="text-primary font-bold hover:text-primary/80 inline-block mt-2">&#10132; Start Free Assessment & Get Your Science-Based Plan</a></li>
            </ol>
          </nav>

          <article className="prose prose-sm max-w-none space-y-10">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Why Intermittent Fasting Works Metabolically</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike calorie restriction alone, intermittent fasting triggers specific metabolic processes that promote fat burning. Your body isn&apos;t just burning stored calories &mdash; it&apos;s fundamentally changing how you process energy and repair yourself on a cellular level.
              </p>

              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Fasting Timeline: What Happens When</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-primary mb-1">0&ndash;4 Hours (Fed State)</p>
                    <p className="text-muted-foreground">Insulin elevated after meals, burning glucose as primary fuel source</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">4&ndash;12 Hours (Early Fast)</p>
                    <p className="text-muted-foreground">Liver glycogen still depleting, insulin gradually declining</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">12&ndash;16 Hours (Fat Burning)</p>
                    <p className="text-muted-foreground">Insulin drops low enough for meaningful fat oxidation to begin</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">16+ Hours (Ketosis Onset)</p>
                    <p className="text-muted-foreground">Body increasingly reliant on fat-derived ketones for energy</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="insulin" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Insulin & Fat Burning: The Core Mechanism</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Insulin is the &ldquo;storage hormone&rdquo; that tells cells to save energy as fat. After 12&ndash;14 hours of fasting, insulin levels drop so low that your body can burn stored body fat. This is the central mechanism of intermittent fasting &mdash; creating a metabolic environment where fat burning becomes more efficient than glucose burning.
              </p>

              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">Why This Matters for Insulin Resistance</h3>
                <p className="text-xs text-muted-foreground">
                  In insulin resistance (prediabetes, metabolic syndrome), your body needs higher insulin levels to function normally. By fasting regularly, you&apos;re giving insulin a &ldquo;rest period&rdquo; and allowing sensitivity to recover. This is one of the most powerful interventions for improving metabolic health.
                </p>
              </div>

              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Research Spotlight</h3>
                <p className="text-xs text-muted-foreground">
                  A landmark study published in Cell Metabolism (2019) found that time-restricted feeding improved blood sugar control and weight loss regardless of total calorie intake. This demonstrated that WHEN you eat matters just as much as WHAT you eat.
                </p>
              </div>
            </section>

            <section id="growth-hormone" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Growth Hormone Spikes: Why You Don&apos;t Need to Eat Every Few Hours</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                During your fasting window, growth hormone secretion increases significantly &mdash; particularly when you reach 16+ hours. Growth hormone is crucial for fat burning (it directly mobilizes stored fat) and muscle preservation during weight loss. This hormonal surge is one reason IF supports both fat loss AND lean muscle retention simultaneously.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Fat Mobilization</h3>
                  <p className="text-xs text-muted-foreground">Growth hormone directly stimulates lipolysis (fat breakdown), making stored body fat available for energy.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Muscle Protection</h3>
                  <p className="text-xs text-muted-foreground">GH prevents muscle breakdown during weight loss, which is crucial for maintaining metabolic rate.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Anti-Aging</h3>
                  <p className="text-xs text-muted-foreground">Growth hormone levels decline with age; fasting helps preserve youthful hormone profiles longer.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Insulin Sensitivity</h3>
                  <p className="text-xs text-muted-foreground">Higher growth hormone correlates with better glucose metabolism and blood sugar control.</p>
                </div>
              </div>

              <div className="rounded-md border bg-green/5 p-4">
                <h3 className="font-medium text-primary mb-2">Best Timing</h3>
                <p className="text-xs text-muted-foreground">
                  Your body naturally secretes growth hormone during fasting windows, peaking in the late evening. This is one reason IF helps with sleep quality &mdash; lower insulin means deeper restorative sleep, which further improves metabolic health (it&apos;s a virtuous cycle).
                </p>
              </div>
            </section>

            <section id="autophagy" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Cellular Repair (Autophagy): The Body&apos;s Built-In Cleanup System</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Autophagy is the cellular process of &ldquo;self-eating&rdquo; &mdash; your body recycles damaged proteins and organelles to rebuild cleaner, more efficient cells. This is a protective mechanism that activates after 16&ndash;20+ hours of fasting. Think of it as your cells&apos; cleanup system activating to remove metabolic waste products before they accumulate.
              </p>

              <div className="rounded-md border bg-green/5 p-4">
                <h3 className="font-medium text-primary mb-2">Health Benefits</h3>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>&bull; Reduces inflammation linked to chronic disease</li>
                  <li>&bull; Removes protein aggregates that accumulate with age</li>
                  <li>&bull; Supports longevity and extends healthspan</li>
                  <li>&bull; Helps neurons function more efficiently (neuroprotection)</li>
                </ul>
              </div>

              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Research Citation</h3>
                <p className="text-xs text-muted-foreground">
                  Nobel Prize-winning researcher Yoshinori Ohsumi discovered autophagy in the 1990s. Recent research published in Nature (2021) showed that autophagy activation correlates with reduced age-related decline and disease prevention. Fasting is one of the most effective natural triggers for autophagy, alongside exercise, caloric restriction, and stress management.
                </p>
              </div>
            </section>

            <section id="mitochondria" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Mitochondrial Efficiency: Why Fasted Movement Works</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Exercise during a fasted state trains your mitochondria to become more efficient at burning fat. This is called &ldquo;metabolic flexibility&rdquo; &mdash; the ability to switch between glucose and fat for fuel depending on circumstances. When you exercise after eating, your body burns glucose from your recent meal. When you train in a fasted state, your body switches to using stored fat as fuel.
              </p>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">Metabolic Flexibility Timeline</h3>
                <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                  <li>&bull; <span className="font-semibold">Days 1&ndash;7:</span> Still burning mostly glucose, mild hunger may occur</li>
                  <li>&bull; <span className="font-semibold">Weeks 2&ndash;4:</span> Fat oxidation increases significantly, less fatigue during fasted workouts</li>
                  <li>&bull; <span className="font-semibold">Month 2+:</span> Full metabolic flexibility established, exercise performance stabilizes</li>
                </ul>
              </div>

              <div className="rounded-md border bg-green/5 p-4">
                <h3 className="font-medium text-primary mb-2">Fasted vs. Fed Training</h3>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">Fasted advantage:</span> Enhanced fat oxidation, improved insulin sensitivity post-exercise.<br />
                  <span className="font-semibold text-primary">Fed advantage:</span> More strength and power output for heavy lifting or sprinting. Choose based on your goals!
                </p>
              </div>
            </section>

            <section id="hormones" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Hormonal Balance: Ghrelin, Leptin, and Cortisol</h2>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Ghrelin (Hunger Hormone)</h3>
                  <p className="text-xs text-muted-foreground">Poor sleep raises ghrelin by ~24%. Fasting helps your body adapt to lower hunger signals over time, making adherence easier.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Leptin (Satiety Hormone)</h3>
                  <p className="text-xs text-muted-foreground">Chronic overeating temporarily desensitizes leptin receptors. Fasting allows them to become sensitive again, improving satiety signaling.</p>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Cortisol (Stress Hormone)</h3>
                  <p className="text-xs text-muted-foreground">High cortisol promotes abdominal fat storage and can make fasting difficult. Our plans prioritize stress management before aggressive fasting protocols.</p>
                </div>
              </div>
            </section>

            <section id="study-summary" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Study Summary: Real-World Evidence</h2>

              <div className="rounded-md border bg-accent/5 p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-medium text-primary text-sm">Time-Restricted Feeding & Weight Loss (Cell Metabolism, 2019)</h3>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li>&bull; Participants ate the same calories but earlier in the day (8am&ndash;2pm vs. 2pm&ndash;10pm)</li>
                    <li>&bull; Early eating group lost more weight and showed better metabolic markers</li>
                    <li>&bull; Mechanism: lower insulin exposure, improved circadian alignment</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-primary text-sm">Autophagy in Human Cells (Science, 2017)</h3>
                  <p className="text-xs text-muted-foreground">
                    Autophagy markers increased significantly after 24 hours of fasting and correlated with improved cellular function and reduced oxidative stress.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-primary text-sm">Growth Hormone & Fasting (Journal of Clinical Endocrinology)</h3>
                  <p className="text-xs text-muted-foreground">
                    After 24 hours of fasting, growth hormone levels increased by approximately 150&ndash;200%. This spike directly promotes fat oxidation and muscle preservation during weight loss.
                  </p>
                </div>
              </div>
            </section>

            <section id="cta" className="pt-6 border-t bg-primary/5 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-primary mb-3">Ready to Get Your Science-Backed Fasting Plan?</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
                Our personalized plans incorporate the latest research into every aspect of your protocol: fasting window timing, nutrition for metabolic health, exercise integration, and sleep optimization. Unlock yours today!
              </p>
              <Button asChild size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
                <a href="/">Start Free Assessment &#10132;</a>
              </Button>
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>Science-backed protocols</span>
                <span>&middot;</span>
                <span>Updated with the latest research</span>
              </div>
            </section>
          </article>

          <div className="mt-10 pt-6 border-t text-sm text-muted-foreground">
            <p>
              Related reading: <a href="/blog/beginners-guide" className="text-primary hover:underline">The Ultimate Beginner&apos;s Guide to Intermittent Fasting</a> &middot;{" "}
              <a href="/faq" className="text-primary hover:underline">Fasting FAQ</a> &middot;{" "}
              <a href="/about" className="text-primary hover:underline">About Us</a>
            </p>
          </div>
        </main>

        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted-foreground text-center">
            <p>&copy; 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
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
