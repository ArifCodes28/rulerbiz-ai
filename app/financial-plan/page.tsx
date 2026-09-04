"use client";

import { AppShell } from "@/components/AppShell";
import { FinancialPlanSection } from "@/components/sections";
import { Card } from "@/components/Card";

export default function FinancialPlanPage() {
  return (
    <AppShell title="Financial Plan">
      {({ profile, analysis }) => (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <FinancialPlanSection analysis={analysis} />
          <Card title="Capital Strategy" demo>
            <p className="text-sm leading-6 text-slate-600">
              For {profile.name}, the safest approach is to use available capital for inventory and a small market pilot first. Use external finance only for proven expansion demand, not for uncertain fixed costs.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Keep at least 20% of capital as working cash buffer.</li>
              <li>• Test expansion through low-capex bulk orders that use existing capacity before adding machines.</li>
              <li>• Take a MUDRA/MSME loan only if repayment is below 15–20% of monthly revenue.</li>
            </ul>
          </Card>
        </div>
      )}
    </AppShell>
  );
}