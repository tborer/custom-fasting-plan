import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// PHASE 2: Testimonials component for social proof (UX-01 task)
// These are placeholder testimonials - replace with real customer feedback

const testimonials = [
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
];

export default function Testimonials() {
  return (
    <section className="mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
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
          {testimonials.map((testimonial, index) => (
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
  );
}
