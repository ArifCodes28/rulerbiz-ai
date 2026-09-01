import React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { ScoreRing, BarMeter } from "./ScoreRing";
import { formatINR } from "@/lib/format";
import { BusinessAnalysis, BusinessProfile } from "@/lib/types";

export function FeasibilitySection({ analysis, profile }: { analysis: BusinessAnalysis; profile: BusinessProfile }) {
  const f = analysis.feasibility;
  return (
    <Card title="Business Feasibility" subtitle={`Viability of your ${profile.businessType.toLowerCase()} in ${profile.location}`} demo>
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50 p-5">
          <ScoreRing score={f.overallScore} size={142} stroke={12} label="Overall Feasibility" />
        </div>
        <div className="grid w-full flex-1 gap-3 sm:grid-cols-2">
          <BarMeter label="Demand Score" value={f.demandScore} />
          <BarMeter label="Competition Score" value={f.competitionScore} />
          <BarMeter label="Market Opportunity" value={f.marketOpportunity} />
          <BarMeter label="Risk Level" value={f.riskScore} invert />
        </div>
      </div>
      <p className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm leading-6 text-brand-900">{f.summary}</p>
    </Card>
  );
}

export function FinancialPlanSection({ analysis }: { analysis: BusinessAnalysis }) {
  const fp = analysis.financialPlan;
  const rows: [string, React.ReactNode][] = [
    ["Available Capital", formatINR(fp.availableCapital)],
    ["Estimated Project Cost", formatINR(fp.estimatedProjectCost)],
    ["Estimated Loan Requirement", formatINR(fp.loanRequirement)],
    ["Suitable Financing / Scheme Recommendation", <span key="fo" className="text-brand-700">{fp.financingOption} (Demo Data)</span>],
    ["Interest Rate (indicative)", `${fp.interestRate}% p.a.`],
    ["Tenure", `${fp.tenureMonths} months`],
    ["Estimated Monthly Repayment", formatINR(fp.monthlyRepayment)],
  ];
  return (
    <Card title="Financial Plan" subtitle="Indicative plan and scheme fit using simulated demo data only" demo>
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <FinanceMiniBar label="Capital" value={fp.availableCapital} max={fp.estimatedProjectCost} tone="brand" />
        <FinanceMiniBar label="Loan Need" value={fp.loanRequirement} max={fp.estimatedProjectCost} tone="sky" />
        <FinanceMiniBar label="Repayment" value={fp.monthlyRepayment} max={Math.max(fp.monthlyRepayment, fp.availableCapital / 20)} tone="amber" />
      </div>
      <dl className="divide-y divide-slate-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="text-right text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function FinanceMiniBar({ label, value, max, tone }: { label: string; value: number; max: number; tone: "brand" | "sky" | "amber" }) {
  const percent = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
  const color = tone === "brand" ? "bg-brand-500" : tone === "sky" ? "bg-sky-500" : "bg-amber-500";
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{formatINR(value)}</p>
      <div className="mt-2 h-2 rounded-full bg-slate-200">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export function RecommendationsSection({ analysis }: { analysis: BusinessAnalysis }) {
  return (
    <Card title="AI Growth Recommendations" subtitle="Personalised next steps for your business" demo>
      <ol className="grid gap-3 lg:grid-cols-3">
        {analysis.recommendations.map((rec, i) => (
          <li key={rec.title} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white shadow-sm">
              {i + 1}
            </span>
            <Badge tone={rec.impact === "High" ? "green" : rec.impact === "Medium" ? "blue" : "slate"}>
              {rec.impact} impact
            </Badge>
            <p className="mt-3 pr-9 text-sm font-bold leading-5 text-slate-950">{rec.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{rec.description}</p>
            <p className="mt-3 text-xs font-semibold text-brand-700">Recommended next step →</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

const CATEGORY_TONE: Record<string, "green" | "blue" | "amber"> = {
  "Government Tender": "blue",
  "New Local Market": "green",
  "Online Selling": "amber",
};

export function OpportunitiesSection({ analysis }: { analysis: BusinessAnalysis }) {
  return (
    <Card title="New Opportunities" subtitle="Two priority opportunities plus one optional channel, all simulated for demo" demo>
      <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
        {analysis.opportunities.map((opp, index) => (
          <div key={opp.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-brand-500 via-sky-500 to-amber-400" />
            <div className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={CATEGORY_TONE[opp.category]}>{opp.category}</Badge>
                  {index < 2 && <Badge tone="green">Priority demo opportunity</Badge>}
                </div>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-950">{opp.title}</p>
              </div>
              <div className="rounded-xl bg-brand-50 px-3 py-2 text-right">
                <p className="text-xl font-black text-brand-700">{opp.matchScore}%</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">match</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{opp.description}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-sky-500" style={{ width: `${opp.matchScore}%` }} />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">Compatibility with current profile</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function IntelligenceSection({ analysis }: { analysis: BusinessAnalysis }) {
  return (
    <Card title="Today's Business Intelligence" subtitle="Relevant local updates and why they matter" demo>
      <div className="space-y-3">
        {analysis.intelligence.map((item, i) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-700 shadow-sm">{i + 1}</span>
              <Badge tone="blue">{item.tag}</Badge>
              <p className="text-sm font-bold text-slate-950">{item.title}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.update}</p>
            <p className="mt-3 rounded-xl border border-brand-100 bg-white p-3 text-xs leading-5 text-brand-800">
              <span className="font-semibold">Why it matters: </span>
              {item.whyItMatters}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CustomersSection({ analysis }: { analysis: BusinessAnalysis }) {
  return (
    <Card
      title="Customer Follow-up Suggestions"
      subtitle="We only suggest — you decide who to contact. No automatic calls are made."
      demo
    >
      <div className="space-y-3">
        {analysis.customers.map((c) => (
          <div key={c.customerName} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-950">{c.customerName}</p>
                <p className="text-xs text-slate-500">{c.business} · Last contact: {c.lastContact}</p>
              </div>
              <Badge tone={c.priority === "High" ? "red" : "amber"}>{c.priority} priority</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{c.reason}</p>
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-sky-100 bg-sky-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-sky-900">
                <span className="font-semibold">Suggested action: </span>
                {c.suggestedAction}
              </p>
              <button
                className="shrink-0 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                onClick={() => alert(`Demo only — this marks ${c.customerName} as contacted. RuralBiz AI never calls customers automatically.`)}
              >
                Mark as Contacted
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
