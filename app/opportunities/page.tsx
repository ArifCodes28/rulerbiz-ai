"use client";

import { AppShell } from "@/components/AppShell";
import { OpportunitiesSection } from "@/components/sections";

export default function OpportunitiesPage() {
  return (
    <AppShell title="Opportunities">
      {({ analysis }) => <OpportunitiesSection analysis={analysis} />}
    </AppShell>
  );
}