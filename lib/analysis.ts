import {
  BusinessAnalysis,
  BusinessProfile,
  CustomerSuggestion,
  FeasibilityReport,
  FinancialPlan,
  IntelligenceItem,
  Opportunity,
  Recommendation,
} from "./types";

/**
 * MOCK ANALYSIS ENGINE
 * In production this would call real APIs (govt tenders, GST data,
 * market datasets, LLM advisor). For the SIH prototype it generates
 * deterministic, profile-aware DEMO data so the demo is consistent.
 */

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seededRange(seed: number, min: number, max: number): number {
  return min + (seed % (max - min + 1));
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(v)));
}

function computeHealthScore(p: BusinessProfile): number {
  const seed = hashString(p.name + p.location);
  const revenueFactor = clamp(p.monthlyRevenue / 2000, 10, 45);
  const capitalFactor = clamp(p.capital / 10000, 5, 30);
  const variance = seededRange(seed, 5, 20);
  return clamp(revenueFactor + capitalFactor + variance, 20, 96);
}

function computeFeasibility(p: BusinessProfile): FeasibilityReport {
  const seed = hashString(p.businessType + p.location);
  const demandScore = clamp(55 + seededRange(seed, 0, 35) + p.monthlyRevenue / 10000);
  const competitionScore = clamp(40 + seededRange(seed >> 2, 0, 40));
  const marketOpportunity = clamp(50 + seededRange(seed >> 3, 0, 40));
  const riskScore = clamp(60 - p.capital / 8000 + seededRange(seed >> 4, 0, 20), 15, 80);
  const overallScore = clamp(
    demandScore * 0.35 + competitionScore * 0.2 + marketOpportunity * 0.3 + (100 - riskScore) * 0.15
  );
  return {
    demandScore,
    competitionScore,
    marketOpportunity,
    riskScore,
    overallScore,
    summary: `Based on local demand signals for ${p.businessType.toLowerCase()} businesses in ${
      p.location
    }, your venture shows ${
      overallScore >= 70 ? "strong" : overallScore >= 50 ? "moderate" : "developing"
    } feasibility. Demand for ${p.mainProduct} is ${
      demandScore >= 65 ? "growing steadily" : "stable"
    } in your area.`,
  };
}

function computeFinancialPlan(p: BusinessProfile): FinancialPlan {
  const seed = hashString(p.goal + p.businessType);
  const multiplier = 3 + (seed % 3);
  const estimatedProjectCost = Math.max(p.monthlyRevenue * multiplier, p.capital + 50000);
  const loanRequirement = Math.max(estimatedProjectCost - p.capital, 0);
  const interestRate = 9.5 + (seed % 30) / 10;
  const tenureMonths = loanRequirement > 300000 ? 60 : loanRequirement > 100000 ? 48 : 36;
  const r = interestRate / 1200;
  const monthlyRepayment =
    loanRequirement > 0
      ? Math.round(
          (loanRequirement * r * Math.pow(1 + r, tenureMonths)) /
            (Math.pow(1 + r, tenureMonths) - 1)
        )
      : 0;
  const financingOption =
    loanRequirement === 0
      ? "Self-financed — no loan required"
      : loanRequirement <= 500000
      ? "MUDRA Loan (Kishore) under PMMY"
      : "MSME Term Loan via PSU Bank + CGTMSE guarantee";
  return {
    availableCapital: p.capital,
    estimatedProjectCost,
    loanRequirement,
    financingOption,
    interestRate: Math.round(interestRate * 10) / 10,
    tenureMonths,
    monthlyRepayment,
  };
}

function computeRecommendations(p: BusinessProfile): Recommendation[] {
  const city = p.location.split(",")[0];
  return [
    {
      title: `Expand to nearby market — ${city} weekly bazaar`,
      description: `Footfall data for ${city} indicates unmet demand for ${p.mainProduct}. A weekend stall could add an estimated 15–25% to monthly revenue with minimal fixed cost.`,
      impact: "High",
    },
    {
      title: "Add a complementary product line",
      description: `Customers buying ${p.mainProduct} frequently also purchase related items. Bundling complementary stock can raise average bill value by 10–18% without new customer acquisition cost.`,
      impact: "Medium",
    },
    {
      title: "Target institutional / bulk buyers",
      description: `Schools, hostels and small caterers near ${p.location} buy in bulk on monthly cycles. One institutional contract could stabilise ₹${Math.round(
        p.monthlyRevenue * 0.3
      ).toLocaleString("en-IN")} of predictable monthly revenue.`,
      impact: "High",
    },
  ];
}

function computeOpportunities(p: BusinessProfile): Opportunity[] {
  const seed = hashString(p.location + p.mainProduct);
  const city = p.location.split(",")[0];
  return [
    {
      title: `${city} Municipal Corp — supply contract`,
      category: "Government Tender",
      description: `Demo tender notice: supply of ${p.mainProduct} to local government offices and schools. Indicative value ₹2–4 lakh / year.`,
      matchScore: clamp(70 + seededRange(seed, 0, 25)),
    },
    {
      title: `New weekly market — ${city} outskirts`,
      category: "New Local Market",
      description: `A new weekly market is launching 6 km from your location with low stall fees and no direct competitor for your category yet.`,
      matchScore: clamp(60 + seededRange(seed >> 2, 0, 30)),
    },
    {
      title: "List products on ONDC / local delivery apps",
      category: "Online Selling",
      description: `Hyperlocal delivery apps are onboarding sellers in ${city}. Online listings could add a new sales channel with near-zero upfront cost.`,
      matchScore: clamp(55 + seededRange(seed >> 3, 0, 35)),
    },
  ];
}

function computeIntelligence(p: BusinessProfile): IntelligenceItem[] {
  const city = p.location.split(",")[0];
  return [
    {
      title: "Input price trend",
      tag: "Pricing",
      update: `Wholesale prices for key inputs used in ${p.mainProduct} have softened ~4% this week in the ${city} mandi.`,
      whyItMatters:
        "Buying stock this week could improve your gross margin by 2–3% before retail prices adjust.",
    },
    {
      title: "Festival demand window",
      tag: "Demand",
      update:
        "A regional festival period starts in ~3 weeks, historically lifting local retail footfall 20–35%.",
      whyItMatters:
        "Stocking up and planning a small promotion now lets you capture the seasonal demand spike instead of running out of inventory.",
    },
    {
      title: "New credit scheme deadline",
      tag: "Finance",
      update:
        "Demo notice: applications for the state micro-enterprise interest subsidy close at the end of this month.",
      whyItMatters:
        "If you plan to take a loan for your expansion goal, applying before the deadline could reduce your effective interest rate by up to 2%.",
    },
  ];
}

function computeCustomers(p: BusinessProfile): CustomerSuggestion[] {
  return [
    {
      customerName: "Sunita Traders",
      business: "Local reseller — monthly bulk buyer",
      reason: `Has ordered ${p.mainProduct} from you 6 times, but no order in the last 5 weeks (usual cycle: 4 weeks).`,
      suggestedAction:
        "Call to check stock levels and offer this week's wholesale rate. Reordering now fits their normal cycle.",
      priority: "High",
      lastContact: "5 weeks ago",
    },
    {
      customerName: "Green Valley Hostel",
      business: "Institutional buyer — 120 residents",
      reason:
        "Asked for a monthly supply quote last month but no decision yet. Similar institutions typically decide within 4–6 weeks.",
      suggestedAction:
        "Follow up with a revised quote including free weekly delivery — a small concession that often closes institutional deals.",
      priority: "Medium",
      lastContact: "3 weeks ago",
    },
  ];
}

export function analyzeBusiness(p: BusinessProfile): BusinessAnalysis {
  return {
    healthScore: computeHealthScore(p),
    feasibility: computeFeasibility(p),
    financialPlan: computeFinancialPlan(p),
    recommendations: computeRecommendations(p),
    opportunities: computeOpportunities(p),
    intelligence: computeIntelligence(p),
    customers: computeCustomers(p),
  };
}


/** Mock AI advisor — keyword-matched, profile-personalised demo responses. */
export function advisorReply(question: string, p: BusinessProfile, a: BusinessAnalysis): string {
  const q = question.toLowerCase();
  const city = p.location.split(",")[0];

  if (q.includes("grow")) {
    return `Based on your profile — a ${p.businessType.toLowerCase()} in ${p.location} earning ₹${p.monthlyRevenue.toLocaleString("en-IN")}/month — here is your fastest growth path:

1. Expand to the ${city} weekly bazaar (est. +15–25% revenue, low cost).
2. Add a complementary product line to raise average bill value by 10–18%.
3. Close one institutional/bulk buyer for ~₹${Math.round(p.monthlyRevenue * 0.3).toLocaleString("en-IN")}/month of stable revenue.

Your business health score of ${a.healthScore}/100 suggests you can pursue two of these simultaneously. Start with the weekly bazaar — it needs the least capital.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("expand")) {
    return `Expansion looks viable for you right now. Your overall feasibility score is ${a.feasibility.overallScore}/100 (demand: ${a.feasibility.demandScore}/100, risk: ${a.feasibility.riskScore}/100).

My recommendation: expand in stages.
• Stage 1 (Month 1–2): Weekend stall at the ${city} weekly market — cost under ₹15,000.
• Stage 2 (Month 3–6): Reinvest profits into a second location once Stage 1 proves demand.

Your goal — "${p.goal}" — is achievable within 6–9 months at your current revenue run-rate, provided Stage 1 hits at least 60% of projected sales.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("capital") || q.includes("money") || q.includes("invest")) {
    return `You have ₹${p.capital.toLocaleString("en-IN")} available. Here is a sensible allocation:

• 50% (₹${Math.round(p.capital * 0.5).toLocaleString("en-IN")}) — inventory ahead of the festival demand window (see Today's Intelligence).
• 30% (₹${Math.round(p.capital * 0.3).toLocaleString("en-IN")}) — expansion pilot at the ${city} weekly market.
• 20% (₹${Math.round(p.capital * 0.2).toLocaleString("en-IN")}) — emergency buffer. Never deploy 100% of capital; rural cash flows are seasonal.

For your full expansion plan (est. cost ₹${a.financialPlan.estimatedProjectCost.toLocaleString("en-IN")}), you'd need an additional ₹${a.financialPlan.loanRequirement.toLocaleString("en-IN")} — ${a.financialPlan.financingOption} at ~${a.financialPlan.interestRate}% looks suitable.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("opportunit") || q.includes("best")) {
    const top = [...a.opportunities].sort((x, y) => y.matchScore - x.matchScore)[0];
    return `Of your 3 current opportunities, the best match is: ${top.title} (${top.category}, match score ${top.matchScore}%).

Why: it aligns with your existing strength in ${p.mainProduct}, fits your available capital of ₹${p.capital.toLocaleString("en-IN")}, and directly supports your goal — "${p.goal}".

Suggested next step: start with the lowest-effort option this week, then manually review any real tender/scheme documents outside this prototype.

(Demo response — no live tender/government systems are connected.)`;
  }
  return `Thanks, ${p.name}. Based on your ${p.businessType.toLowerCase()} in ${p.location}, here's my take: your business health score is ${a.healthScore}/100 and feasibility is ${a.feasibility.overallScore}/100. Focus this month on (1) pre-festival stocking, (2) the ${city} weekly market pilot, and (3) following up with Sunita Traders — a bulk buyer who's overdue for reorder.

Try asking: "How can I grow my business?", "Should I expand?", "What should I do with my available capital?" or "Which opportunity is best for me?"

(Demo response — no live AI/API system is connected.)`;
}

