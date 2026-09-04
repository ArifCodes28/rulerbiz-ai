export interface BusinessProfile {
  // Identity (owner/contact person)
  name: string;
  // Factory / business name
  businessName: string;
  location: string;
  businessType: string;

  // FACTORY
  yearsInOperation: number;
  registrationType: string;
  gstStatus: string;
  udyamStatus: string;

  // PRODUCTION
  workersCount: number;
  machineCount: number;
  monthlyProductionCapacity: number;
  currentMonthlyProduction: number;
  capacityUtilization: number; // percent (0-100)
  deliveryRadiusKm: number;
  minimumOrderQuantity: number;
  leadTimeDays: number;

  // PRODUCTS
  products: string[];

  // BUSINESS (compatibility with existing dashboard)
  capital: number; // available capital
  monthlyRevenue: number;
  b2bCustomerCount: number;
  averageOrderSize: number;
  majorCustomerTypes: string[];
  targetCustomerSegments: string[];

  // GOAL
  revenueGrowthTarget: number; // percent
  targetTimelineMonths: number;
  mainObjective: string;
  // Compatibility label fields used by the existing dashboard/analysis
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
