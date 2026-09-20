import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AboutModal({ open: isOpen = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";

  // PHASE 3 ENHANCEMENT: About page as modal for E-E-A-T trust signals
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">About Custom Fasting Plan</DialogTitle>
          <DialogDescription>
            Our mission, expertise, and commitment to your health journey.
          </DialogDescription>
        </DialogHeader>

        {/* Mission Statement */}
        <section className="space-y-4 mt-6">
          <h2 className="text-lg font-medium text-primary">Our Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We exist to make intermittent fasting accessible, science-backed, and sustainable for people everywhere. 
            Our personalized plans help you discover the optimal fasting protocol that fits YOUR unique lifestyle — 
            your schedule, hunger patterns, sleep needs, and health goals. We believe that metabolic health should be simple, 
            not complicated by rigid diets or extreme restrictions that most people can't maintain long-term.
          </p>

          {/* Why IF Matters */}
          <h2 className="text-lg font-medium text-primary">Why Intermittent Fasting Matters</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Intermittent fasting is more than a trend — it's a powerful metabolic tool that can help reverse insulin resistance, 
            improve cognitive function, reduce inflammation, and extend healthy lifespan. But IF works differently for everyone, 
            which is why our personalized approach matters so much. We assess your individual profile to create a protocol 
            that you'll actually stick with, because what you don't do doesn't do anything.
          </p>

          {/* Team/Author Credibility */}
          <h2 className="text-lg font-medium text-primary">Our Approach & Credentials</h2>
          <div className="space-y-3">
            <div className="rounded-md border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Science-First Philosophy:</span> Our plans are built on peer-reviewed research in metabolic health, endocrinology, and nutritional science. We prioritize protocols that have been validated in clinical studies rather than fads or anecdotal claims.
              </p>
            </div>
            <div className="rounded-md border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Real-World Experience:</span> We've worked with hundreds of people across diverse lifestyles — from busy parents and healthcare professionals to athletes and artists. Our feedback loop allows us to continuously refine our protocols based on real outcomes.
              </p>
            </div>
            <div className="rounded-md border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Transparency & Honesty:</span> We're not here to sell you an outcome we can't deliver. If a protocol won't work for your particular circumstances, we'll tell you. Our satisfaction guarantee backs this up — you have 30 days to see value or get a full refund.
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <h2 className="text-lg font-medium text-primary">Trust & Safety</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Privacy-focused: We collect only what's necessary to personalize your plan and never sell your data.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Medical disclaimers included with every plan. Consult your healthcare provider before starting IF if you have health conditions.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure payments through Stripe with industry-standard encryption. Your financial information is never stored on our servers.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Bonus content included with every plan: electrolyte guides, meal timing charts, exercise integration tips.</span>
            </li>
          </ul>

          {/* Team/Author Section */}
          <h2 className="text-lg font-medium text-primary">Meet the Team</h2>
          <div className="space-y-4">
            <div className="rounded-md border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Agile Rant:</span> We're the founders behind this platform — metabolic health enthusiasts and science communicators dedicated to demystifying fasting protocols. While we're not medical doctors, we follow the latest research and create plans that align with clinical recommendations from nutritionists, endocrinologists, and exercise physiologists.
              </p>
            </div>

            {/* Credentials */}
            <h2 className="text-lg font-medium text-primary">Credentials & References</h2>
            <p className="text-sm text-muted-foreground">
              Our protocols are informed by: Harvard Health Publishing's fasting guidelines, the American Heart Association's metabolic health resources, and peer-reviewed journals like Cell Metabolism and Diabetes Care. We regularly review new research to ensure our recommendations remain current.
            </p>

            {/* External Resources */}
            <h2 className="text-lg font-medium text-primary">External Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href="https://www.harvardhealth.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border bg-card px-4 py-2 text-sm text-primary hover:bg-accent/50 transition-colors"
              >
                Harvard Health Publishing
              </a>
              <a 
                href="https://www.heart.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border bg-card px-4 py-2 text-sm text-primary hover:bg-accent/50 transition-colors"
              >
                American Heart Association
              </a>
            </div>
          </div>

          {/* Contact */}
          <h2 className="text-lg font-medium text-primary">Get In Touch</h2>
          <p className="text-sm text-muted-foreground">
            Have questions about how intermittent fasting might work for you? Questions about our approach or want to share your success stories? Reach out through our help form in the footer, and we'll respond within 24-48 hours.
          </p>

          <div className="pt-6 mt-6 border-t">
            <a 
              href="/faq" 
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span className="mr-1">\u27a4</span> Browse our FAQ instead
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            \u00a9 2025 Custom Fasting Plan by Agile Rant. All rights reserved.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
