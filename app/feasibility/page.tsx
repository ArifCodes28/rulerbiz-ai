"use client";

import { AppShell } from "@/components/AppShell";
import { FeasibilitySection, RecommendationsSection } from "@/components/sections";

export default function FeasibilityPage() {
  return (
    <AppShell title="Business Feasibility">
      {({ profile, analysis }) => (
        <div className="space-y-6">
          <FeasibilitySection analysis={analysis} profile={profile} />
          <RecommendationsSection analysis={analysis} />
        </div>
      )}
    </AppShell>
  );
}