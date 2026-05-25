export interface DeficiencyFinding {
  nutrient: string;
  risk: "High" | "Moderate";
  reason: string;
  foods: string;
}

export function analyzeDeficiencies(answers: Record<string, any>): DeficiencyFinding[] {
  const findings: DeficiencyFinding[] = [];

  const dietType = String(answers.diet_type || "");
  const proteinFreq = String(answers.protein_frequency || "");
  const proteinSources = String(answers.protein_sources || "");
  const fruitVeg = String(answers.fruit_veg_servings || "");
  const vegVariety = String(answers.veg_variety || "");
  const sugarProcessed = String(answers.sugar_processed || "");

  const isVegan = dietType.includes("Vegan");
  const isVegetarian = dietType.includes("Vegetarian");
  const isPlantOnly = proteinSources === "Legumes, tofu & tempeh";
  const hasAnimalProtein =
    proteinSources.includes("Meat") ||
    proteinSources.includes("Fish") ||
    proteinSources.includes("Eggs") ||
    proteinSources.includes("Mixed");
  const hasFish = proteinSources.includes("Fish") || proteinSources.includes("Mixed");
  const lowProtein = proteinFreq === "Less than once a day";
  const veryLowVeg = fruitVeg === "0–1";
  const lowVeg = fruitVeg === "0–1" || fruitVeg === "2–3";
  const rarelyEatsVeg = vegVariety === "I rarely eat vegetables";
  const noLeafyGreens =
    rarelyEatsVeg ||
    vegVariety === "Root vegetables (carrots, sweet potato, beets)" ||
    vegVariety === "Cruciferous (broccoli, cauliflower, cabbage)";
  const highSugar = sugarProcessed === "Daily";

  if (isVegan || (isPlantOnly && !hasAnimalProtein)) {
    findings.push({
      nutrient: "Vitamin B12",
      risk: "High",
      reason:
        "B12 is found almost exclusively in animal products. Plant-based diets require supplementation or fortified foods — deficiency develops silently over months.",
      foods: "Fortified plant milks, nutritional yeast, B12 supplement (250–1000mcg/day)",
    });
  }

  if ((isVegan || isVegetarian || isPlantOnly) && !hasAnimalProtein) {
    findings.push({
      nutrient: "Iron (non-heme)",
      risk: "Moderate",
      reason:
        "Non-heme iron from plants absorbs at ~10% vs 25%+ from animal sources. Phytates and oxalates in plant foods further reduce absorption.",
      foods: "Lentils, spinach, tofu, pumpkin seeds — always paired with vitamin C to boost absorption",
    });
    findings.push({
      nutrient: "Zinc",
      risk: "Moderate",
      reason:
        "Phytates in legumes and whole grains significantly inhibit zinc absorption. Plant-based eaters need ~50% more dietary zinc than omnivores.",
      foods: "Pumpkin seeds, hemp seeds, cashews, lentils, oats (soaked or sprouted improves absorption)",
    });
  }

  if (!hasFish) {
    findings.push({
      nutrient: "Omega-3 (EPA/DHA)",
      risk: "Moderate",
      reason:
        "ALA from plant foods converts to EPA/DHA at only 5–15%. Without fatty fish, most people fall well short of the 1–2g EPA/DHA daily target.",
      foods:
        isVegan || isVegetarian || isPlantOnly
          ? "Algae-based omega-3 supplement (most direct plant source), flaxseed, chia, walnuts"
          : "Fatty fish (salmon, sardines, mackerel) 2–3×/week, or fish oil 1–2g EPA/DHA daily",
    });
  }

  if (lowProtein) {
    findings.push({
      nutrient: "Complete amino acids",
      risk: "High",
      reason:
        "Eating protein less than once daily impairs muscle maintenance, satiety during fasting, immune function, and hormone production — all critical for fasting success.",
      foods: "Eggs, Greek yogurt, chicken, fish, or legumes + grain combinations for complete amino acid profiles",
    });
  }

  if (lowVeg) {
    findings.push({
      nutrient: "Vitamin C",
      risk: veryLowVeg ? "High" : "Moderate",
      reason:
        "Vitamin C is critical for collagen synthesis, immune function, and iron absorption. It cannot be stored long-term — daily intake is essential.",
      foods: "Red bell peppers, kiwi, strawberries, citrus, broccoli, kale",
    });
    findings.push({
      nutrient: "Potassium",
      risk: "Moderate",
      reason:
        "Most people consume ~2,300mg/day vs the 3,400mg target. Low potassium impairs electrolyte balance and is especially relevant during fasting.",
      foods: "Avocado, sweet potato, leafy greens, salmon, white beans, banana",
    });
  }

  if (lowVeg || noLeafyGreens) {
    findings.push({
      nutrient: "Folate (B9)",
      risk: "Moderate",
      reason:
        "Folate supports DNA synthesis, cell division, and methylation. Leafy greens are the richest source — low vegetable intake is the primary driver of inadequate folate.",
      foods: "Spinach, romaine, asparagus, avocado, lentils, fortified whole grains",
    });
  }

  if (rarelyEatsVeg || noLeafyGreens) {
    findings.push({
      nutrient: "Magnesium",
      risk: "Moderate",
      reason:
        "Magnesium deficiency affects 50%+ of adults. It supports 300+ enzymatic reactions, sleep quality, blood sugar regulation, and reduces hunger during fasting.",
      foods: "Pumpkin seeds, dark chocolate (70%+), almonds, leafy greens, black beans",
    });
    findings.push({
      nutrient: "Vitamin K1",
      risk: "Moderate",
      reason:
        "Vitamin K1, concentrated in leafy greens, is essential for blood clotting and bone metabolism. Avoiding them is the most common cause of inadequate K1.",
      foods: "Kale, spinach, collard greens, broccoli, Brussels sprouts",
    });
  }

  if (rarelyEatsVeg) {
    findings.push({
      nutrient: "Vitamin A (beta-carotene)",
      risk: "Moderate",
      reason:
        "Plant-based vitamin A requires conversion from beta-carotene in colorful vegetables. Rarely eating vegetables severely limits this conversion.",
      foods: "Sweet potato, carrots, red bell pepper, butternut squash, leafy greens",
    });
  }

  if (highSugar) {
    findings.push({
      nutrient: "B Vitamins (B1, B2, B3)",
      risk: "Moderate",
      reason:
        "Processing refined carbohydrates increases demand for B vitamins used in glucose metabolism. High sugar diets deplete these faster than most diets replenish them.",
      foods: "Whole grains, lean meats, eggs, leafy greens, legumes, sunflower seeds",
    });
    findings.push({
      nutrient: "Chromium",
      risk: "Moderate",
      reason:
        "Daily sugar intake depletes chromium, which is essential for insulin signaling. Low chromium worsens blood sugar spikes and cravings during fasting.",
      foods: "Broccoli, whole grains, green beans, beef, eggs",
    });
  }

  return findings;
}

function buildDeficiencySectionHtml(findings: DeficiencyFinding[]): string {
  if (findings.length === 0) {
    return `
      <h2 style="margin:16px 0 8px; font-size:18px;">Potential Nutrient Deficiencies</h2>
      <p style="margin:0 0 16px; color:#3d8c3d; font-weight:500;">Based on your dietary profile, your macro and micronutrient intake looks well-rounded. Keep prioritizing whole foods, varied vegetables, and quality protein to maintain this.</p>
    `;
  }

  const rows = findings
    .map(
      (f) => `
    <tr>
      <td style="padding:10px 12px; border-bottom:1px solid #e5e5e5; font-weight:600; vertical-align:top; white-space:nowrap;">${f.nutrient}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #e5e5e5; vertical-align:top; white-space:nowrap;">
        <span style="color:${f.risk === "High" ? "#c0392b" : "#e67e22"}; font-weight:600;">${f.risk}</span>
      </td>
      <td style="padding:10px 12px; border-bottom:1px solid #e5e5e5; vertical-align:top; color:#444; font-size:13px;">${f.reason}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #e5e5e5; vertical-align:top; color:#2e7d32; font-size:13px;">${f.foods}</td>
    </tr>
  `
    )
    .join("");

  return `
    <h2 style="margin:16px 0 8px; font-size:18px;">Potential Nutrient Deficiencies</h2>
    <p style="margin:0 0 12px; color:#444; font-size:14px;">Based on your dietary profile, the following nutrients may need attention. These are common gaps given your food choices — not a medical diagnosis.</p>
    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:16px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:8px 12px; text-align:left; border-bottom:2px solid #ddd; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">Nutrient</th>
            <th style="padding:8px 12px; text-align:left; border-bottom:2px solid #ddd; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">Risk</th>
            <th style="padding:8px 12px; text-align:left; border-bottom:2px solid #ddd; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">Why</th>
            <th style="padding:8px 12px; text-align:left; border-bottom:2px solid #ddd; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">Top Food Sources</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export function buildFullPlanHtml(params: {
  insight?: string | null;
  answers?: Record<string, any> | null;
}): string {
  const { insight, answers } = params;
  const deficiencyFindings = answers ? analyzeDeficiencies(answers) : [];

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

    ${buildDeficiencySectionHtml(deficiencyFindings)}

    <p style="margin:16px 0 0; font-size:12px; color:#6b6b70;">
      This plan is educational and not medical advice. Consult your clinician before making changes, especially if you have diabetes, are on medication, or have other health conditions.
    </p>
  </div>
  `;
}
