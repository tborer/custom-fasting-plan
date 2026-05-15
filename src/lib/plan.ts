export function buildFullPlanHtml(params: { insight?: string | null }): string {
  const { insight } = params;
  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6; color:#0b0b0c;">
    ${insight ? `
      <h2 style="margin:0 0 8px; font-size:18px;">Your Key Insight</h2>
      <blockquote style="margin:0 0 16px; padding:12px 16px; border-left:3px solid #3d8c3d; background:#f0f7f0;">
        ${insight}
      </blockquote>
    ` : ""}

    <h2 style="margin:16px 0 8px; font-size:18px;">Your Fasting Protocol</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Start with 16:8 — eat within an 8‑hour window (e.g. 12pm–8pm), fast for 16 hours</li>
      <li>If new to fasting, begin with 12:12 for 2 weeks, then extend by 1 hour per week</li>
      <li>Advanced option: progress to 18:6 once 16:8 feels effortless for 3+ weeks</li>
      <li>On high‑activity days or after poor sleep, allow a 14:10 window — flexibility prevents burnout</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Fat‑Burning Window Strategy</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>True fat oxidation peaks after 12–14 hours of fasting, when insulin is lowest</li>
      <li>Keep the fasting window to water, black coffee, or plain tea — no calories, no sweeteners</li>
      <li>Light fasted movement (20–30 min walk) in the final 2 hours of your fast amplifies fat burning</li>
      <li>Morning sunlight exposure (10–15 min) helps set cortisol rhythm and supports metabolic rate</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Breaking Your Fast (First Meal)</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Lead with 30–40g protein: eggs, Greek yogurt, chicken, tofu, or a protein shake</li>
      <li>Add healthy fats (avocado, olive oil, nuts) to blunt insulin spike and extend satiety</li>
      <li>Avoid high‑sugar foods or refined carbs as your first meal — this resets fat‑burning progress</li>
      <li>Eat slowly and mindfully; the first meal sets metabolic tone for your entire eating window</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Eating Window Nutrition</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Protein target: 0.7–1.0g per pound of body weight, distributed across 2–3 meals</li>
      <li>Prioritize whole foods, fiber‑rich vegetables, and complex carbs — minimize processed foods</li>
      <li>Include omega‑3 sources (fatty fish, walnuts, flax) to support fat metabolism and reduce inflammation</li>
      <li>Keep net carbs moderate and pair carbs with protein/fat to blunt insulin response</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Electrolytes &amp; Supplements</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Sodium: 2–3g daily (adds to broth or water during fast if needed)</li>
      <li>Potassium: 3–4g daily from food (avocado, leafy greens, salmon)</li>
      <li>Magnesium glycinate: 300–400mg before bed — reduces hunger, improves sleep quality</li>
      <li>Optional: creatine (3–5g), vitamin D3+K2, omega‑3 (EPA/DHA 1–2g) with first meal</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Weekly Rhythm</h2>
    <p style="margin:0 0 8px;">Mon–Sun (example schedule with noon eating window start):</p>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>7–8am: Wake, hydrate (16oz water), black coffee or green tea if desired</li>
      <li>9–11am: Fasted light walk or low‑intensity movement (optional, amplifies fat burn)</li>
      <li>12pm: Break fast — protein + fat first meal (30–40g protein)</li>
      <li>3–4pm: Balanced meal — lean protein, vegetables, moderate complex carbs</li>
      <li>7–8pm: Final meal — close your eating window; magnesium with evening meal</li>
      <li>8pm–12pm next day: Fasting window</li>
    </ul>

    <h2 style="margin:16px 0 8px; font-size:18px;">Tracking Your Progress</h2>
    <ul style="margin:0 0 16px; padding-left:18px;">
      <li>Weigh yourself 1–2x per week, same time, same conditions (not daily — too variable)</li>
      <li>Take waist and hip measurements every 2 weeks — often changes before scale moves</li>
      <li>Track energy, hunger, and mood weekly — these indicate metabolic adaptation</li>
      <li>Reassess your fasting window after 4 weeks and progress based on results and comfort</li>
    </ul>

    <p style="margin:16px 0 0; font-size:12px; color:#6b6b70;">
      This plan is educational and not medical advice. Consult your clinician before making changes, especially if you have diabetes, are on medication, or have other health conditions.
    </p>
  </div>
  `;
}
