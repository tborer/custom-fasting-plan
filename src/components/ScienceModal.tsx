import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ScienceModal({ open: isOpen = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";

  // PHASE 3 ENHANCEMENT: Science of Fasting modal for health-conscious audience targeting metabolic keywords
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary mb-2">The Science of Fasting for Fat Loss</DialogTitle>
          <DialogDescription className="text-base">How intermittent fasting works on a cellular and metabolic level.</DialogDescription>
        </DialogHeader>

        {/* Table of Contents */}
        <nav className="space-y-1 mt-4 p-3 rounded-md border bg-muted/30 text-sm">
          <ol className="list-decimal list-inside space-y-1 text-primary font-medium">
            <li><a href="#insulin" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\u26a1 Insulin & Fat Burning</a></li>
            <li><a href="#growth-hormone" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\ud83d\udcaa Growth Hormone Spikes</a></li>
            <li><a href="#autophagy" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\ud83e\uddb0 Cellular Repair (Autophagy)</a></li>
            <li><a href="#mitochondria" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\u267b\ufe0f Mitochondrial Efficiency</a></li>
            <li><a href="#hormones" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\ud83d\udd04 Hormonal Balance (Ghrelin, Leptin, Cortisol)</a></li>
            <li><a href="#study-summary" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="hover:underline">\ud83d\udcca Study Summary</a></li>
            <li><a href="#cta" onClick={(e) => { e.preventDefault(); onClose?.(); }} className="text-primary font-bold hover:text-primary/80 inline-block mt-2">\u27a4 Start Free Assessment & Get Your Science-Based Plan</a></li>
          </ol>
        </nav>

        {/* Content */}
        <article className="prose prose-sm max-w-none space-y-6">
          
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Why Intermittent Fasting Works Metabolically</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike calorie restriction alone, intermittent fasting triggers specific metabolic processes that promote fat burning. Your body isn't just burning stored calories \u2014 it\u2019s fundamentally changing how you process energy and repair yourself on a cellular level.
            </p>

            {/* Timeline visual */}
            <div className="rounded-md border bg-accent/5 p-4">
              <h3 className="font-medium text-primary mb-2">\ud83d\udcc1 Fasting Timeline: What Happens When</h3>
              <div className="grid grid-cols-2 gap-4 text-xs space-y-3">
                <div>
                  <p className="font-semibold text-primary mb-1">0\u20134 Hours (Fed State)</p>
                  <p className="text-muted-foreground">Insulin elevated after meals, burning glucose as primary fuel source</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">4\u201312 Hours (Early Fast)</p>
                  <p className="text-muted-foreground">Liver glycogen still depleting, insulin gradually declining</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">12\u201316 Hours (Fat Burning)</p>
                  <p className="text-muted-foreground">Insulin drops low enough for meaningful fat oxidation to begin</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">16+ Hours (Ketosis Onset)</p>
                  <p className="text-muted-foreground">Body increasingly reliant on fat-derived ketones for energy</p>
                </div>
              </div>
            </div>
          </section>

          {/* Insulin section */}
          <section id="insulin" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">\u26a1 Insulin & Fat Burning: The Core Mechanism</h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Insulin is the "storage hormone" that tells cells to save energy as fat. After 12\u201314 hours of fasting, insulin levels drop so low that your body can burn stored body fat. This is the central mechanism of intermittent fasting \u2014 creating a metabolic environment where fat burning becomes more efficient than glucose burning.
            </p>

            {/* Insulin Resistance */}
            <div className="rounded-md border bg-red/5 p-4">
              <h3 className="font-medium text-primary mb-2">\u26a0\ufe0f Why This Matters for Insulin Resistance</h3>
              <p className="text-xs text-muted-foreground mb-2">
                In insulin resistance (prediabetes, metabolic syndrome), your body needs higher insulin levels to function normally. By fasting regularly, you\u2019re giving insulin a \"rest period\" and allowing sensitivity to recover. This is one of the most powerful interventions for improving metabolic health.
              </p>
            </div>

            {/* Research citation */}
            <div className="rounded-md border bg-accent/5 p-4">
              <h3 className="font-medium text-primary mb-2">\ud83d\udcdd Research Spotlight</h3>
              <p className="text-xs text-muted-foreground">
                A landmark study published in Cell Metabolism (2019) found that time-restricted feeding improved blood sugar control and weight loss regardless of total calorie intake. This demonstrated that WHEN you eat matters just as much as WHAT you eat.
              </p>
            </div>
          </section>

          {/* Growth Hormone section */}
          <section id="growth-hormone" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">\ud83d\udcaa Growth Hormone Spikes: Why You Don\u2019t Need to Eat Every Few Hours</h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              During your fasting window, growth hormone secretion increases significantly \u2014 particularly when you reach 16+ hours. Growth hormone is crucial for fat burning (it directly mobilizes stored fat) and muscle preservation during weight loss. This hormonal surge is one reason IF supports both fat loss AND lean muscle retention simultaneously.
            </p>

            {/* Growth hormone benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Fat Mobilization</h3>
                <p className="text-xs text-muted-foreground">Growth hormone directly stimulates lipolysis (fat breakdown), making stored body fat available for energy.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Muscle Protection</h3>
                <p className="text-xs text-muted-foreground">GH prevents muscle breakdown during weight loss, which is crucial for maintaining metabolic rate.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Anti-Aging</h3>
                <p className="text-xs text-muted-foreground">Growth hormone levels decline with age; fasting helps preserve youthful hormone profiles longer.</p>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\u2713 Insulin Sensitivity</h3>
                <p className="text-xs text-muted-foreground">Higher growth hormone correlates with better glucose metabolism and blood sugar control.</p>
              </div>
            </div>

            {/* When GH Peaks */}
            <div className="rounded-md border bg-green/5 p-4">
              <h3 className="font-medium text-primary mb-2">\u2705 Best Timing</h3>
              <p className="text-xs text-muted-foreground">
                Your body naturally secretes growth hormone during fasting windows, peaking in the late evening. This is one reason IF helps with sleep quality \u2014 lower insulin means deeper restorative sleep, which further improves metabolic health (it\u2019s a virtuous cycle).
              </p>
            </div>
          </section>

          {/* Autophagy section */}
          <section id="autophagy" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">\ud83e\uddb0 Cellular Repair (Autophagy): The Body\u2019s Built-In Cleanup System</h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Autophagy is the cellular process of \"self-eating\" \u2014 your body recycles damaged proteins and organelles to rebuild cleaner, more efficient cells. This is a protective mechanism that activates after 16\u201320+ hours of fasting. Think of it as your cells\u2019 garbage disposal system activating to remove metabolic waste products before they accumulate.
            </p>

            {/* Autophagy benefits */}
            <div className="rounded-md border bg-green/5 p-4">
              <h3 className="font-medium text-primary mb-2">\u2705 Health Benefits</h3>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>\u2022 Reduces inflammation linked to chronic disease</li>
                <li>\u2022 Removes protein aggregates that accumulate with age</li>
                <li>\u2022 Supports longevity and extends healthspan</li>
                <li>\u2022 Helps neurons function more efficiently (neuroprotection)</li>
              </ul>
            </div>

            {/* Research */}
            <div className="rounded-md border bg-accent/5 p-4">
              <h3 className="font-medium text-primary mb-2">\ud83d\udcdd Research Citation</h3>
              <p className="text-xs text-muted-foreground">
                Nobel Prize-winning researcher Yoshinori Ohsumi discovered autophagy in the 1990s. Recent research published in Nature (2021) showed that autophagy activation correlates with reduced age-related decline and disease prevention. Fasting is one of the most effective natural triggers for autophagy, alongside exercise, caloric restriction, and stress management.
              </p>
            </div>
          </section>

          {/* Mitochondria section */}
          <section id="mitochondria" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">\u267b\ufe0f Mitochondrial Efficiency: Why Fasted Movement Works</h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exercise during a fasted state trains your mitochondria to become more efficient at burning fat. This is called \"metabolic flexibility\" \u2014 the ability to switch between glucose and fat for fuel depending on circumstances. When you exercise after eating, your body burns glucose from your recent meal. When you train in a fasted state, your body switches to using stored fat as fuel.
            </p>

            {/* Adaptation timeline */}
            <div className="rounded-md border bg-muted/30 p-4">
              <h3 className="font-medium text-primary mb-2">\ud83c\udf0d Metabolic Flexibility Timeline</h3>
              <ul className="text-xs text-muted-foreground space-y-2 ml-1">
                <li>\u25cf <span className="font-semibold">Days 1\u20137:</span> Still burning mostly glucose, mild hunger may occur</li>
                <li>\u25cf <span className="font-semibold">Weeks 2\u20134:</span> Fat oxidation increases significantly, less fatigue during fasted workouts</li>
                <li>\u25cf <span className="font-semibold">Month 2+:</span> Full metabolic flexibility established, exercise performance stabilizes</li>
              </ul>
            </div>

            {/* Exercise timing */}
            <div className="rounded-md border bg-green/5 p-4">
              <h3 className="font-medium text-primary mb-2">\u2705 Fasted vs. Fed Training</h3>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-primary">\ud83c\udfc6 Fasted advantage:</span> Enhanced fat oxidation, improved insulin sensitivity post-exercise.<br/>
                <span className="font-semibold text-primary">\u269b\ufe0f Fed advantage:</span> More strength and power output for heavy lifting or sprinting. Choose based on your goals!
              </p>
            </div>
          </section>

          {/* Hormones section */}
          <section id="hormones" className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">\ud83d\udd04 Hormonal Balance: Ghrelin, Leptin, and Cortisol</h2>
            
            <div className="grid sm:grid-cols-3 gap-4">
              
              {/* Ghrelin */}
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\ud83c\udf7d\ufe0f Ghrelin (Hunger Hormone)</h3>
                <p className="text-xs text-muted-foreground mb-2">Poor sleep raises ghrelin by ~24%. Fasting helps your body adapt to lower hunger signals over time, making adherence easier.</p>
              </div>

              {/* Leptin */}
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="font-medium text-primary mb-2">\ud83e\udd5d\ufe0f Leptin (Satiety Hormone)</h3>
                <p className="text-xs text-muted-foreground mb-2">Chronic overeating temporarily \"blinds\" leptin receptors. Fasting allows them to become sensitive again, improving satiety signaling.</p>
              </div>

              {/* Cortisol */}
              <div className="rounded-md border bg-red/5 p-4">
                <h3 className="font-medium text-primary mb-2">\u26a0\ufe0f Cortisol (Stress Hormone)</h3>
                <p className="text-xs text-muted-foreground">High cortisol promotes abdominal fat storage and can make fasting difficult. Our plans prioritize stress management before aggressive fasting protocols.</p>
              </div>

            </div>
          </section>

          {/* Study Summary */}
          <section id="study-summary" className="space-y-3 pt-4">
            <h2 className="text-lg font-semibold text-primary">\ud83d\udcca Study Summary: Real-World Evidence</h2>
            
            <div className="rounded-md border bg-accent/5 p-4 space-y-3">
              
              {/* Study 1 */}
              <div className="space-y-2">
                <h3 className="font-medium text-primary text-sm">Time-Restricted Feeding & Weight Loss (Cell Metabolism, 2019)</h3>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>\u2022 Participants ate same calories but earlier in day (8am\u20132pm vs. 2pm\u201310pm)</li>
                  <li>\u2022 Early eating group lost more weight and showed better metabolic markers</li>
                  <li>\u2022 Mechanism: Lower insulin exposure, improved circadian alignment</li>
                </ul>
              </div>

              {/* Study 2 */}
              <div className="space-y-2">
                <h3 className="font-medium text-primary text-sm">Autophagy in Human Cells (Science, 2017)</h3>
                <p className="text-xs text-muted-foreground">
                  Autophagy markers increased significantly after 24 hours of fasting and correlated with improved cellular function and reduced oxidative stress.
                </p>
              </div>

              {/* Study 3 */}
              <div className="space-y-2">
                <h3 className="font-medium text-primary text-sm">Growth Hormone & Fasting (Journal of Clinical Endocrinology)</h3>
                <p className="text-xs text-muted-foreground">
                  After 24 hours fasting, growth hormone levels increased by approximately 150\u2013200%. This spike directly promotes fat oxidation and muscle preservation during weight loss.
                </p>
              </div>

            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="pt-6 mt-8 border-t bg-primary/5 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-primary mb-3">\ud83d\udc49 Ready to Get Your Science-Backed Fasting Plan?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Our personalized plans incorporate the latest research into every aspect of your protocol: fasting window timing, nutrition for metabolic health, exercise integration, and sleep optimization. Unlock yours today!
            </p>
            <Button onClick={() => window.location.href = "/"} size="lg" variant="default" className="inline-flex items-center gap-2 px-8">
              \u27a4 Start Free Assessment - Get Your Science-Based Plan
            </Button>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center justify-center rounded-full bg-green/10 text-green-600 px-2 py-1">\u2714</span>
              <span>Science-backed protocols</span>
              <span className="inline-flex items-center justify-center rounded-full bg-green/10 text-green-600 px-2 py-1">\u2714</span>
              <span>Updated with latest research</span>
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
