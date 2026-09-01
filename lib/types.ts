export interface BusinessProfile {
  name: string;
  location: string;
  businessType: string;
  capital: number;
  monthlyRevenue: number;
  mainProduct: string;
  goal: string;
}

export interface FeasibilityReport {
  demandScore: number;
  competitionScore: number;
  marketOpportunity: number;
  riskScore: number; // higher = more risk
  overallScore: number;
  summary: string;
}

export interface FinancialPlan {
  availableCapital: number;
  estimatedProjectCost: number;
  loanRequirement: number;
  financingOption: string;
  interestRate: number;
  tenureMonths: number;
  monthlyRepayment: number;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
}

export interface Opportunity {
  title: string;
  category: "Government Tender" | "New Local Market" | "Online Selling";
  description: string;
  matchScore: number;
}

export interface IntelligenceItem {
  title: string;
  update: string;
  whyItMatters: string;
  tag: string;
}

export interface CustomerSuggestion {
  customerName: string;
  business: string;
  reason: string;
  suggestedAction: string;
  priority: "High" | "Medium";
  lastContact: string;
}

export interface BusinessAnalysis {
  healthScore: number;
  feasibility: FeasibilityReport;
  financialPlan: FinancialPlan;
  recommendations: Recommendation[];
  opportunities: Opportunity[];
  intelligence: IntelligenceItem[];
  customers: CustomerSuggestion[];
}
