import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BeginnersGuideModal({ open: isOpen = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";

  // PHASE 3 ENHANCEMENT: Beginner's Guide blog post as modal for organic traffic
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary mb-2">The Ultimate Beginner's Guide to Intermittent Fasting</DialogTitle>
          <DialogDescription className="text-base">Everything you need to know before starting your fasting journey.</DialogDescription>
        </DialogHeader>

        {/* Table of Contents */}
        <nav className="space-y-1 mt-4 p-3 rounded-md border bg-muted/30 text-sm">
          <ol className="list-decimal list-inside space-y-1 text-primary font-medium">
            <li><a href="#what-is-if" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">What is Intermittent Fasting?</a></li>
            <li><a href="#why-if" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">Why Choose IF Over Traditional Diets?</a></li>
            <li><a href="#getting-started" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">Getting Started: Your First 30 Days</a></li>
            <li><a href="#what-to-eat" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">What to Eat During Your Eating Window</a></li>
            <li><a href="#mistakes" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">Common Beginner Mistakes & How to Avoid Them</a></li>
            <li><a href="#cta" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="text-primary font-bold hover:text-primary/80 inline-block mt-2">\u27a4 Start Your Free Assessment & Get Your Custom Plan</a></li>
          </ol>
        </nav>

        {/* Content */}
        <article className="prose prose-sm max-w-none space-y-6">
          
          {/* What is IF section */}
          <section id="what-is-if" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">What is Intermittent Fasting?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Intermittent fasting (IF) isn't a diet in the traditional sense \u2014 it's an eating pattern that cycles between periods of eating and fasting. During your fasting window, you consume no calories except for water, black coffee, or plain tea. When you break your fast, you eat nutrient-dense foods within your designated feeding window.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Common IF protocols include 16:8 (fast 16 hours, eat during an 8-hour window), 18:6, and even more aggressive schedules like 20:4 for experienced fasters. Our personalized plans help you find the schedule that fits YOUR lifestyle \u2014 because what works for one person won't work for everyone.
            </p>

            {/* Benefits Box */}
            <div className="rounded-md border bg-green/5 p-4">
              <h3 className="text-base font-medium text-primary mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M12 20h10"></path>
                  <path d="M12 9v5"></path>
                  <path d="M8.7 4a3 3 0 0 0-5.3 1.6l-.2.6"></path>
                  <path d="M6 19a3 3 0 0 0 5.3-1.6l.2-.6"></path>
                </svg>
                Key Benefits of IF
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>\u2022 Enhanced fat burning through insulin sensitivity</li>
                <li>\u2022 Improved metabolic markers (blood sugar, HbA1c)</li>
                <li>\u2022 Reduced inflammation and oxidative stress</li>
                <li>\u2022 Better cognitive function and mental clarity</li>
                <li>\u2022 Cellular repair processes via autophagy</li>
              </ul>
            </div>
          </section>

          {/* Why IF section */}
          <section id="why-if" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Why Choose IF Over Traditional Diets?</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Simplicity</h3>
                <p className="text-xs text-muted-foreground">No calorie counting, no food restrictions \u2014 just timing. This makes IF sustainable long-term because you can still enjoy favorite foods during your eating window.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Metabolic Adaptation</h3>
                <p className="text-xs text-muted-foreground">Unlike crash diets that slow metabolism, IF maintains metabolic rate while you lose fat by improving how your body uses energy.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Hunger Management</h3>
                <p className="text-xs text-muted-foreground">Your body adapts to eating less frequently, naturally reducing hunger hormones and improving your relationship with food.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Flexibility</h3>
                <p className="text-xs text-muted-foreground">Life happens! IF accommodates social events, travel, and busy schedules better than rigid meal plans.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Sustainability</h3>
                <p className="text-xs text-muted-foreground">Most people maintain IF habits after 2-3 weeks while reverting to old dieting patterns. Our personalized plans make sticking with IF effortless.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Evidence-Based</h3>
                <p className="text-xs text-muted-foreground">IF has robust research backing for metabolic health, with studies showing improvements in blood sugar control, insulin sensitivity, and cardiovascular markers.</p>
              </div>
            </div>
          </section>

          {/* Getting Started section */}
          <section id="getting-started" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Getting Started: Your First 30 Days</h2>

            {/* Week-by-week breakdown */}
            <div className="space-y-4">
              
              {/* Week 1 */}
              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Week 1: The Adjustment Phase</h3>
                <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                  <li>\u2022 Start with 12:12 (fast 12 hours, eat for 12)</li>
                  <li>\u2022 Fast from 8pm to 8am initially</li>
                  <li>\u2022 Expect mild hunger for days 1-3 as your body adjusts</li>
                  <li>\u2022 Stay hydrated: water, herbal tea, or black coffee</li>
                  <li>\u2022 Break your fast with protein and healthy fats first</li>
                </ul>
              </div>

              {/* Week 2-3 */}
              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Weeks 2\u20133: Building the Habit</h3>
                <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                  <li>\u2022 Shift your first meal 30\u201360 minutes later each day</li>
                  <li>\u2022 By week 3, you'll be approaching 14:10 or 15:9</li>
                  <li>\u2022 Hunger will feel less intense as your body adapts</li>
                  <li>\u2022 Energy levels stabilize and possibly improve</li>
                </ul>
              </div>

              {/* Week 4 */}
              <div className="rounded-md border bg-accent/5 p-4">
                <h3 className="font-medium text-primary mb-2">Week 4+: Results & Maintenance</h3>
                <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                  <li>\u2022 You'll likely be comfortable with 16:8 or similar schedule</li>
                  <li>\u2022 Noticeable weight loss typically begins around week 3</li>
                  <li>\u2022 Continue adjusting based on how YOU feel</li>
                  <li>\u2022 Some people find reverse IF (eat earlier in day) works better long-term</li>
                </ul>
              </div>

            </div>

            {/* Timeline */}
            <div className="rounded-md border bg-muted/30 p-4">
              <h3 className="font-medium text-primary mb-2">What to Expect Timeline</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-primary mb-1">Days 1\u20133:</p>
                  <p className="text-muted-foreground">Mild hunger, possible headaches (rare), sleep may be affected initially</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Week 2:</p>
                  <p className="text-muted-foreground">Hunger decreases significantly, energy stabilizes</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Weeks 3\u20134:</p>
                  <p className="text-muted-foreground">Visible weight loss begins, clothes fit better</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Month 2+:</p>
                  <p className="text-muted-foreground">Metabolic markers improve, sustainable routine established</p>
                </div>
              </div>
            </div>
          </section>

          {/* What to eat section */}
          <section id="what-to-eat" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">What to Eat During Your Eating Window</h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              The goal is to get adequate nutrition within your eating hours so you don't feel deprived. Quality matters more than quantity \u2014 focus on nutrient-dense foods that keep you satisfied and fuel your activities.
            </p>

            <div className="space-y-3">
              
              {/* Protein */}
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Prioritize Protein</h3>
                <p className="text-xs text-muted-foreground">Aim for 0.8\u20131g of protein per pound of body weight daily. Spread across your eating window to maximize muscle retention and satiety.</p>
              </div>

              {/* Fats */}
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Healthy Fats</h3>
                <p className="text-xs text-muted-foreground">Avocados, olive oil, nuts, seeds, and fatty fish provide satiety and support hormone production.</p>
              </div>

              {/* Fiber */}
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Fiber-Rich Vegetables</h3>
                <p className="text-xs text-muted-foreground">Leafy greens, cruciferous vegetables, and colorful produce provide micronutrients and fiber to stabilize blood sugar.</p>
              </div>

            </div>

            {/* Sample meal ideas */}
            <div className="rounded-md border bg-green/5 p-4">
              <h3 className="font-medium text-primary mb-2">\ud83d\udd01 Sample Eating Window (8:00pm \u2013 12:00pm)</h3>
              <ul className="text-xs text-muted-foreground space-y-1 ml-1">
                <li>\u2022 8:00\u20139:00pm: Dinner (chicken breast, quinoa, roasted vegetables)</li>
                <li>\u2022 11:30pm: Light snack (Greek yogurt or cottage cheese) \u2013 optional</li>
                <li>\u2022 12:00pm: Breakfast (scrambled eggs with spinach, avocado toast)</li>
              </ul>
            </div>
          </section>

          {/* Mistakes section */}
          <section id="mistakes" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Common Beginner Mistakes & How to Avoid Them</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Mistake 1 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Skipping Exercise</h3>
                <p className="text-xs text-muted-foreground mb-2">Light to moderate activity during your fast enhances fat oxidation. Save intense training for after eating if you need fuel.</p>
                <a href="/faq" className="text-xs text-primary hover:underline inline-block">\u27a4 See our exercise timing FAQ</a>
              </div>

              {/* Mistake 2 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Eating Too Little Protein</h3>
                <p className="text-xs text-muted-foreground mb-2">Protein preserves muscle mass during weight loss. Aim for 30\u201340g at each meal, especially your first one after breaking the fast.</p>
              </div>

              {/* Mistake 3 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Giving Up Too Soon</h3>
                <p className="text-xs text-muted-foreground mb-2">Most people see results after 2\u20134 weeks. Don't quit when hunger feels tough initially \u2014 that's normal as your body adapts.</p>
              </div>

              {/* Mistake 4 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Ignoring Sleep</h3>
                <p className="text-xs text-muted-foreground mb-2">Poor sleep increases ghrelin (hunger hormone). Prioritize 7\u20138+ hours per night, especially important in early adaptation phase.</p>
              </div>

              {/* Mistake 5 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Drinking Too Much Caffeine</h3>
                <p className="text-xs text-muted-foreground mb-2">Limit to 1\u20132 cups of coffee/day. Excessive caffeine can disrupt sleep and increase cortisol, counteracting fasting benefits.</p>
              </div>

              {/* Mistake 6 */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u274c Relying on Processed Foods</h3>
                <p className="text-xs text-muted-foreground mb-2">Don't use the eating window to overeat junk food. Focus on whole, nutrient-dense foods that fuel your metabolism and keep you full.</p>
              </div>

            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="pt-6 mt-8 border-t bg-primary/5 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-primary mb-3">\ud83d\udc49 Ready to Get Your Personalized Fasting Plan?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Take our free 25-question assessment and receive your custom fasting protocol tailored to YOUR schedule, hunger patterns, sleep needs, and health goals. Unlock your personalized plan for only $19.99 \u2014 or get one actionable insight for free right now!
            </p>
            <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
              \u27a4 Start Free Assessment - Get Your Custom Plan
            </Button>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center justify-center rounded-full bg-green/10 text-green-600 px-2 py-1">\u2714</span>
              <span>Money-back guarantee included</span>
              <span className="inline-flex items-center justify-center rounded-full bg-green/10 text-green-600 px-2 py-1">\u2714</span>
              <span>30-day satisfaction guarantee</span>
            </div>
          </section>

        </article>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            \u00a9 2025 Custom Fasting Plan by Agile Rant. All rights reserved. | <a href="/faq" className="text-primary hover:underline">\u27a4 View FAQ</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
