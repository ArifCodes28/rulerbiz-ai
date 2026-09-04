"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { DemoBadge, DemoBusinessBadge } from "@/components/Badge";
import { ScoreRing } from "@/components/ScoreRing";
import {
  CustomersSection,
  FeasibilitySection,
  FinancialPlanSection,
  IntelligenceSection,
  OpportunitiesSection,
  RecommendationsSection,
} from "@/components/sections";
import { formatINRCompact } from "@/lib/format";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      {({ profile, analysis }) => (
        <div className="space-y-7">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-sky-700 p-6 text-white shadow-lg shadow-brand-900/10 lg:p-8">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 right-24 h-28 w-28 rounded-full bg-sky-300/20 blur-xl" />
            <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2"><DemoBadge /><DemoBusinessBadge /><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-50">3-minute SIH demo flow</span></div>
              <p className="text-sm text-brand-100">Owner / contact: {profile.name}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{profile.businessName}</h2>
              <p className="mt-1 text-sm font-medium text-sky-100">{profile.businessType} · {profile.location}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-50">
                Products: {profile.mainProduct}. Goal: {profile.goal}. This dashboard uses structured factory data for a demo purpose; no live government systems are connected.
              </p>
            </div>
            <Link href="/advisor" className="shrink-0 rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-brand-700 shadow-sm hover:bg-brand-50">
              Ask Growth Advisor
            </Link>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.1fr_2fr]">
            <Card className="bg-gradient-to-br from-white to-brand-50/40">
              <div className="flex items-center justify-center"><ScoreRing score={analysis.healthScore} size={132} stroke={12} label="Business Health / Opportunity" /></div>
              <p className="mt-4 text-center text-sm font-medium leading-6 text-slate-600">
                {analysis.healthScore >= 70 ? "Strong business signals with expansion potential." : "Promising business profile with focused improvements needed."}
              </p>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric title="Revenue" value={formatINRCompact(profile.monthlyRevenue)} caption="Monthly revenue" tone="green" />
              <Metric title="Capital" value={formatINRCompact(profile.capital)} caption="Ready to deploy" tone="blue" />
              <Metric title="Feasibility" value={`${analysis.feasibility.overallScore}/100`} caption="Overall viability" tone="green" />
              <Metric title="Loan Need" value={formatINRCompact(analysis.financialPlan.loanRequirement)} caption="Estimated requirement" tone="amber" />
            </div>
          </div>

          <Card title="10-second demo summary" subtitle="Covers the full 3-minute presentation narrative at a glance" demo>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <SummaryPill title="Hyper-local feasibility" text={`${analysis.feasibility.overallScore}/100 for ${profile.businessType} in ${profile.location}`} />
              <SummaryPill title="Scheme / financing fit" text={`${analysis.financialPlan.financingOption} · DEMO DATA`} />
              <SummaryPill title="Best growth action" text={analysis.recommendations[0].title} />
              <SummaryPill title="Best opportunity" text={`${analysis.opportunities[0].title} · ${analysis.opportunities[0].matchScore}% match`} />
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <InsightStrip label="Demand" value={analysis.feasibility.demandScore} />
            <InsightStrip label="Market opportunity" value={analysis.feasibility.marketOpportunity} />
            <InsightStrip label="Risk control" value={100 - analysis.feasibility.riskScore} />
          </div>

          <Card title="Factory Overview" subtitle="Production, workforce and business profile" demo>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <FactoryStat label="Workers" value={String(profile.workersCount)} />
              <FactoryStat label="Machines" value={String(profile.machineCount)} />
              <FactoryStat label="Monthly capacity" value={`${profile.monthlyProductionCapacity.toLocaleString("en-IN")} units`} />
              <FactoryStat label="Capacity utilization" value={`${profile.capacityUtilization}%`} />
              <FactoryStat label="Current production" value={`${profile.currentMonthlyProduction.toLocaleString("en-IN")} units`} />
              <FactoryStat label="B2B customers" value={String(profile.b2bCustomerCount)} />
              <FactoryStat label="Avg order size" value={formatINRCompact(profile.averageOrderSize)} />
              <FactoryStat label="Min order qty" value={`${profile.minimumOrderQuantity} units`} />
            </div>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <FeasibilitySection analysis={analysis} profile={profile} />
            <FinancialPlanSection analysis={analysis} />
          </div>
          <RecommendationsSection analysis={analysis} />
          <div className="grid gap-6 xl:grid-cols-2">
            <OpportunitiesSection analysis={analysis} />
            <IntelligenceSection analysis={analysis} />
          </div>
          <CustomersSection analysis={analysis} />
        </div>
      )}
    </AppShell>
  );
}

function Metric({ title, value, caption, tone }: { title: string; value: string; caption: string; tone: "green" | "blue" | "amber" }) {
  const dot = tone === "green" ? "bg-brand-500" : tone === "blue" ? "bg-sky-500" : "bg-amber-500";
  return (
    <Card>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p>
      </div>
      <p className="mt-3 min-h-[4rem] text-2xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{caption}</p>
    </Card>
  );
}

function SummaryPill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-700">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950">{text}</p>
    </div>
  );
}

function InsightStrip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-sm font-black text-brand-700">{value}/100</p>
      </div>
      <div className="mt-3 h-2.5 rounded-full bg-slate-200">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-sky-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FactoryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}