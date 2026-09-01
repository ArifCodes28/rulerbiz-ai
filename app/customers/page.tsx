"use client";

import { AppShell } from "@/components/AppShell";
import { CustomersSection } from "@/components/sections";

export default function CustomersPage() {
  return (
    <AppShell title="Customer Suggestions">
      {({ analysis }) => <CustomersSection analysis={analysis} />}
    </AppShell>
  );
}