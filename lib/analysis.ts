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
      title: "Pursue bulk orders from near-by institutions",
      description: `${p.targetCustomerSegments.length ? p.targetCustomerSegments.slice(0, 3).join(", ") : "Hotels and schools"} near ${p.location} buy uniforms and workwear in bulk. One institutional contract could add ~₹${Math.round(
        p.monthlyRevenue * 0.3
      ).toLocaleString("en-IN")} of predictable monthly revenue, given your ${p.capacityUtilization}% current capacity utilisation leaves room for more output.`,
      impact: "High",
    },
    {
      title: "Add customisation / embroidery to win enterprise contracts",
      description: `Enterprise uniform buyers value branding and size customisation. Offering logo embroidery, grading and consistent quality on ${p.mainProduct} can raise order value by 10–18% without new customer acquisition cost.`,
      impact: "Medium",
    },
    {
      title: "Expand your active enterprise customer base",
      description: `With ${p.b2bCustomerCount} B2B customers, targeting ${p.targetCustomerSegments.join(", ")} within your ${p.deliveryRadiusKm} km delivery radius could raise utilisation from ${p.capacityUtilization}% toward capacity and support your ${p.revenueGrowthTarget}% revenue growth goal.`,
      impact: "High",
    },
  ];
}

function computeOpportunities(p: BusinessProfile): Opportunity[] {
  const seed = hashString(p.location + p.mainProduct);
  const city = p.location.split(",")[0];
  return [
    {
      title: `${city} civic body — uniform supply contract (Demo)`,
      category: "Government Tender",
      description: `Demonstration tender notice: supply of uniforms / workwear to local government offices and schools. Indicative value ₹2–4 lakh / year. Demo data only.`,
      matchScore: clamp(70 + seededRange(seed, 0, 25)),
    },
    {
      title: "Hotel & restaurant group bulk uniform order",
      category: "New Local Market",
      description: `Hospitality venues within a ${p.deliveryRadiusKm} km radius renew staff uniforms seasonally and in bulk. Pursuing these fits your bulk/institutional focus. Demo data only.`,
      matchScore: clamp(60 + seededRange(seed >> 2, 0, 30)),
    },
    {
      title: "Retailer & wholesaler bulk supply channel",
      category: "Online Selling",
      description: `Retailers and wholesalers in ${city} source ready-made garments in bulk. A B2B supply arrangement could add a stable channel aligned with your enterprise sales focus. Demo data only.`,
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
      update: `Wholesale prices for fabric and garment inputs used in ${p.mainProduct} have softened ~4% this week in the ${city} region.`,
      whyItMatters:
        "Buying material this week could improve your garment gross margin by 2–3% before prices rise.",
    },
    {
      title: "Uniform season window",
      tag: "Demand",
      update:
        "School admission and annual uniform-renewal season is approaching, historically lifting uniform orders 20–35%.",
      whyItMatters:
        "Preparing capacity and reaching out to schools and institutions now lets you capture the seasonal bulk-order spike.",
    },
    {
      title: "Working-capital scheme deadline",
      tag: "Finance",
      update:
        "Demo notice: applications for the state MSME working-capital subsidy close at the end of this month.",
      whyItMatters:
        "If you plan finance for material procurement or capacity expansion, applying before the deadline could reduce your effective interest rate by up to 2%.",
    },
  ];
}

function computeCustomers(p: BusinessProfile): CustomerSuggestion[] {
  return [
    {
      customerName: "S. K. Garments",
      business: "Local apparel retailer — recurrent bulk buyer",
      reason: `Has ordered ${p.mainProduct} from you 6 times, but placed no order in the last 5 weeks (usual cycle: 4 weeks).`,
      suggestedAction:
        "Call to check restock needs and offer this season's bulk rate. Reordering now fits their normal cycle.",
      priority: "High",
      lastContact: "5 weeks ago",
    },
    {
      customerName: "Green Valley School",
      business: "Institutional buyer — uniform season",
      reason:
        "Asked for a bulk uniform quote last month but no decision yet. Institutions typically decide within 4–6 weeks before the season.",
      suggestedAction:
        "Follow up with a revised quote including size-grading and embroidery — a small concession that often closes institutional deals.",
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

  if (q.includes("grow")) {
    return `Based on your profile — a ${p.businessType.toLowerCase()} in ${p.location} earning ₹${p.monthlyRevenue.toLocaleString("en-IN")}/month — here is your fastest growth path:

1. Win bulk uniform / workwear orders from ${p.targetCustomerSegments.slice(0, 2).join(" and ") || p.targetCustomerSegments.join(", ")} within your ${p.deliveryRadiusKm} km radius.
2. Add customisation and embroidery to raise average order value by 10–18%.
3. Grow from ${p.b2bCustomerCount} B2B customers to reduce idle capacity (you are at ~${p.capacityUtilization}% utilisation).

Your business health score of ${a.healthScore}/100 suggests you can pursue two of these simultaneously. Start with converting existing nearby institutions to repeat bulk buyers.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("expand")) {
    return `Expansion looks viable for you right now. Your overall feasibility score is ${a.feasibility.overallScore}/100 (demand: ${a.feasibility.demandScore}/100, risk: ${a.feasibility.riskScore}/100), and you have spare capacity to fulfil more orders.

My recommendation: expand your customer base before expanding machines.
• Stage 1 (Month 1–2): Target hotels, schools and factories for bulk uniform orders — low capex, uses existing capacity.
• Stage 2 (Month 3–6): Reinvest into capacity (more machines/workers) only once utilisation crosses ~85%.

Your goal — "${p.goal}" — is achievable within ${p.targetTimelineMonths} months if institutional conversion hits at least 60% of quoted deals.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("capital") || q.includes("money") || q.includes("invest")) {
    return `You have ₹${p.capital.toLocaleString("en-IN")} available. For a garment factory, a sensible allocation is:

• 50% (₹${Math.round(p.capital * 0.5).toLocaleString("en-IN")}) — fabric & material procurement ahead of the uniform season.
• 30% (₹${Math.round(p.capital * 0.3).toLocaleString("en-IN")}) — sample development and client visits to win institutional contracts.
• 20% (₹${Math.round(p.capital * 0.2).toLocaleString("en-IN")}) — working-capital buffer. Never deploy 100% of capital; B2B payments are often on credit.

For your full expansion plan (est. cost ₹${a.financialPlan.estimatedProjectCost.toLocaleString("en-IN")}), you'd need an additional ₹${a.financialPlan.loanRequirement.toLocaleString("en-IN")} — ${a.financialPlan.financingOption} at ~${a.financialPlan.interestRate}% looks suitable.

(Demo response — no live market/government systems are connected.)`;
  }
  if (q.includes("opportunit") || q.includes("best")) {
    const top = [...a.opportunities].sort((x, y) => y.matchScore - x.matchScore)[0];
    return `Of your 3 current opportunities, the best match is: ${top.title} (${top.category}, match score ${top.matchScore}%).

Why: it aligns with your products (${p.mainProduct}), your bulk/institutional focus, your available capital of ₹${p.capital.toLocaleString("en-IN")}, and directly supports your goal — "${p.goal}".

Suggested next step: start with the two priority demo opportunities this week, then manually review any real tender/scheme documents outside this prototype.

(Demo response — no live tender/government systems are connected.)`;
  }
  return `Thanks, ${p.name}. Based on your ${p.businessType.toLowerCase()} in ${p.location}, here's my take: your business health score is ${a.healthScore}/100 and feasibility is ${a.feasibility.overallScore}/100. Focus this month on (1) targeting bulk uniform/workwear orders from institutions, (2) converting pipeline quotes from your ${p.b2bCustomerCount} B2B customers, and (3) following up with S. K. Garments — a bulk buyer overdue for reorder.

Try asking: "How can I grow my business?", "Should I expand?", "What should I do with my available capital?" or "Which opportunity is best for me?"

(Demo response — no live AI/API system is connected.)`;
}

