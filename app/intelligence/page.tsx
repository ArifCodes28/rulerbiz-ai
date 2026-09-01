"use client";

import { AppShell } from "@/components/AppShell";
import { IntelligenceSection } from "@/components/sections";

export default function IntelligencePage() {
  return (
    <AppShell title="Daily Intelligence">
      {({ analysis }) => <IntelligenceSection analysis={analysis} />}
    </AppShell>
  );
}