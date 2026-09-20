import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function BeginnersGuidePage() {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${currentUrl}/blog/beginners-guide`;
  const title = "The Ultimate Beginner's Guide to Intermittent Fasting";
  const description =
    "New to IF? Learn what intermittent fasting is, why it beats traditional diets, and exactly how to start your first 30 days — plus common beginner mistakes to avoid.";
  const ogImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=60";

  // SEC-04: Beginner's Guide blog post — indexable page targeting beginner-intent keywords
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
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to know before starting your fasting journey.</p>
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" className="space-y-1 mb-8 p-4 rounded-md border bg-muted/30 text-sm">
            <ol className="list-decimal list-inside space-y-1 text-primary font-medium">
              <li><a href="#what-is-if" className="hover:underline">What is Intermittent Fasting?</a></li>
              <li><a href="#why-if" className="hover:underline">Why Choose IF Over Traditional Diets?</a></li>
              <li><a href="#getting-started" className="hover:underline">Getting Started: Your First 30 Days</a></li>
              <li><a href="#what-to-eat" className="hover:underline">What to Eat During Your Eating Window</a></li>
              <li><a href="#mistakes" className="hover:underline">Common Beginner Mistakes & How to Avoid Them</a></li>
              <li><a href="#cta" className="text-primary font-bold hover:text-primary/80 inline-block mt-2">&#10132; Start Your Free Assessment & Get Your Custom Plan</a></li>
            </ol>
          </nav>

          <article className="prose prose-sm max-w-none space-y-10">
            <section id="what-is-if" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">What is Intermittent Fasting?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intermittent fasting (IF) isn&apos;t a diet in the traditional sense &mdash; it&apos;s an eating pattern that cycles between periods of eating and fasting. During your fasting window, you consume no calories except for water, black coffee, or plain tea. When you break your fast, you eat nutrient-dense foods within your designated feeding window.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Common IF protocols include 16:8 (fast 16 hours, eat during an 8-hour window), 18:6, and even more aggressive schedules like 20:4 for experienced fasters. Our personalized plans help you find the schedule that fits YOUR lifestyle &mdash; because what works for one person won&apos;t work for everyone.
              </p>

              <div className="rounded-md border bg-green/5 p-4">
                <h3 className="text-base font-medium text-primary mb-2">Key Benefits of IF</h3>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>&bull; Enhanced fat burning through insulin sensitivity</li>
                  <li>&bull; Improved metabolic markers (blood sugar, HbA1c)</li>
                  <li>&bull; Reduced inflammation and oxidative stress</li>
                  <li>&bull; Better cognitive function and mental clarity</li>
                  <li>&bull; Cellular repair processes via autophagy</li>
                </ul>
              </div>
            </section>

            <section id="why-if" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Why Choose IF Over Traditional Diets?</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Simplicity</h3>
                  <p className="text-xs text-muted-foreground">No calorie counting, no food restrictions &mdash; just timing. This makes IF sustainable long-term because you can still enjoy favorite foods during your eating window.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Metabolic Adaptation</h3>
                  <p className="text-xs text-muted-foreground">Unlike crash diets that slow metabolism, IF maintains metabolic rate while you lose fat by improving how your body uses energy.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Hunger Management</h3>
                  <p className="text-xs text-muted-foreground">Your body adapts to eating less frequently, naturally reducing hunger hormones and improving your relationship with food.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Flexibility</h3>
                  <p className="text-xs text-muted-foreground">Life happens! IF accommodates social events, travel, and busy schedules better than rigid meal plans.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Sustainability</h3>
                  <p className="text-xs text-muted-foreground">Most people maintain IF habits after 2-3 weeks while reverting to old dieting patterns. Our personalized plans make sticking with IF effortless.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Evidence-Based</h3>
                  <p className="text-xs text-muted-foreground">IF has robust research backing for metabolic health, with studies showing improvements in blood sugar control, insulin sensitivity, and cardiovascular markers.</p>
                </div>
              </div>
            </section>

            <section id="getting-started" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Getting Started: Your First 30 Days</h2>

              <div className="space-y-4">
                <div className="rounded-md border bg-accent/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Week 1: The Adjustment Phase</h3>
                  <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                    <li>&bull; Start with 12:12 (fast 12 hours, eat for 12)</li>
                    <li>&bull; Fast from 8pm to 8am initially</li>
                    <li>&bull; Expect mild hunger for days 1-3 as your body adjusts</li>
                    <li>&bull; Stay hydrated: water, herbal tea, or black coffee</li>
                    <li>&bull; Break your fast with protein and healthy fats first</li>
                  </ul>
                </div>
                <div className="rounded-md border bg-accent/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Weeks 2&ndash;3: Building the Habit</h3>
                  <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                    <li>&bull; Shift your first meal 30&ndash;60 minutes later each day</li>
                    <li>&bull; By week 3, you&apos;ll be approaching 14:10 or 15:9</li>
                    <li>&bull; Hunger will feel less intense as your body adapts</li>
                    <li>&bull; Energy levels stabilize and possibly improve</li>
                  </ul>
                </div>
                <div className="rounded-md border bg-accent/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Week 4+: Results & Maintenance</h3>
                  <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                    <li>&bull; You&apos;ll likely be comfortable with 16:8 or a similar schedule</li>
                    <li>&bull; Noticeable weight loss typically begins around week 3</li>
                    <li>&bull; Continue adjusting based on how YOU feel</li>
                    <li>&bull; Some people find reverse IF (eat earlier in the day) works better long-term</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">What to Expect Timeline</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-primary mb-1">Days 1&ndash;3:</p>
                    <p className="text-muted-foreground">Mild hunger, possible headaches (rare), sleep may be affected initially</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Week 2:</p>
                    <p className="text-muted-foreground">Hunger decreases significantly, energy stabilizes</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Weeks 3&ndash;4:</p>
                    <p className="text-muted-foreground">Visible weight loss begins, clothes fit better</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Month 2+:</p>
                    <p className="text-muted-foreground">Metabolic markers improve, sustainable routine established</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="what-to-eat" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">What to Eat During Your Eating Window</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The goal is to get adequate nutrition within your eating hours so you don&apos;t feel deprived. Quality matters more than quantity &mdash; focus on nutrient-dense foods that keep you satisfied and fuel your activities.
              </p>

              <div className="space-y-3">
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Prioritize Protein</h3>
                  <p className="text-xs text-muted-foreground">Aim for 0.8&ndash;1g of protein per pound of body weight daily. Spread across your eating window to maximize muscle retention and satiety.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Healthy Fats</h3>
                  <p className="text-xs text-muted-foreground">Avocados, olive oil, nuts, seeds, and fatty fish provide satiety and support hormone production.</p>
                </div>
                <div className="rounded-md border bg-muted/30 p-4">
                  <h3 className="font-medium text-primary mb-2">Fiber-Rich Vegetables</h3>
                  <p className="text-xs text-muted-foreground">Leafy greens, cruciferous vegetables, and colorful produce provide micronutrients and fiber to stabilize blood sugar.</p>
                </div>
              </div>

              <div className="rounded-md border bg-green/5 p-4">
                <h3 className="font-medium text-primary mb-2">Sample Eating Window (8:00pm &ndash; 12:00pm)</h3>
                <ul className="text-xs text-muted-foreground space-y-1 ml-1">
                  <li>&bull; 8:00&ndash;9:00pm: Dinner (chicken breast, quinoa, roasted vegetables)</li>
                  <li>&bull; 11:30pm: Light snack (Greek yogurt or cottage cheese) &ndash; optional</li>
                  <li>&bull; 12:00pm: Breakfast (scrambled eggs with spinach, avocado toast)</li>
                </ul>
              </div>
            </section>

            <section id="mistakes" className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">Common Beginner Mistakes & How to Avoid Them</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Skipping Exercise</h3>
                  <p className="text-xs text-muted-foreground mb-2">Light to moderate activity during your fast enhances fat oxidation. Save intense training for after eating if you need fuel.</p>
                  <a href="/faq" className="text-xs text-primary hover:underline inline-block">See our exercise timing FAQ &#10132;</a>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Eating Too Little Protein</h3>
                  <p className="text-xs text-muted-foreground">Protein preserves muscle mass during weight loss. Aim for 30&ndash;40g at each meal, especially your first one after breaking the fast.</p>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Giving Up Too Soon</h3>
                  <p className="text-xs text-muted-foreground">Most people see results after 2&ndash;4 weeks. Don&apos;t quit when hunger feels tough initially &mdash; that&apos;s normal as your body adapts.</p>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Ignoring Sleep</h3>
                  <p className="text-xs text-muted-foreground">Poor sleep increases ghrelin (hunger hormone). Prioritize 7&ndash;8+ hours per night, especially important in the early adaptation phase.</p>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Drinking Too Much Caffeine</h3>
                  <p className="text-xs text-muted-foreground">Limit to 1&ndash;2 cups of coffee/day. Excessive caffeine can disrupt sleep and increase cortisol, counteracting fasting benefits.</p>
                </div>
                <div className="rounded-md border bg-red/5 p-4">
                  <h3 className="font-medium text-primary mb-2">Relying on Processed Foods</h3>
                  <p className="text-xs text-muted-foreground">Don&apos;t use the eating window to overeat junk food. Focus on whole, nutrient-dense foods that fuel your metabolism and keep you full.</p>
                </div>
              </div>
            </section>

            <section id="cta" className="pt-6 border-t bg-primary/5 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-primary mb-3">Ready to Get Your Personalized Fasting Plan?</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
                Take our free 25-question assessment and receive your custom fasting protocol tailored to YOUR schedule, hunger patterns, sleep needs, and health goals. Unlock your personalized plan for only $19.99 &mdash; or get one actionable insight for free right now!
              </p>
              <Button asChild size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
                <a href="/">Start Free Assessment &#10132;</a>
              </Button>
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>Money-back guarantee included</span>
                <span>&middot;</span>
                <span>30-day satisfaction guarantee</span>
              </div>
            </section>
          </article>

          <div className="mt-10 pt-6 border-t text-sm text-muted-foreground">
            <p>
              Related reading: <a href="/blog/science-of-fasting" className="text-primary hover:underline">The Science of Fasting for Fat Loss</a> &middot;{" "}
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
