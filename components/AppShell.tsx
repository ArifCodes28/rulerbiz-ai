"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { useBusiness } from "@/lib/useBusiness";
import { clearProfile } from "@/lib/storage";
import { BusinessAnalysis, BusinessProfile } from "@/lib/types";
import { DemoBusinessBadge } from "./Badge";

export function AppShell({
  title,
  children,
}: {
  title: string;
  children: (data: { profile: BusinessProfile; analysis: BusinessAnalysis }) => React.ReactNode;
}) {
  const { profile, analysis } = useBusiness();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  if (!profile || !analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/70">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-black text-white">
            R
          </div>
          <div className="mx-auto mb-4 h-2 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-500 to-sky-500" />
          </div>
          <p className="text-sm font-semibold text-slate-900">Preparing your business intelligence…</p>
          <p className="mt-1 text-xs text-slate-500">Loading saved demo profile from this browser.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <DemoBusinessBadge />
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">{profile.name}</p>
              <p className="text-xs text-slate-500">{profile.businessType}</p>
            </div>
            <button
              onClick={() => {
                clearProfile();
                router.push("/");
              }}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Reset Demo
            </button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">
          {children({ profile, analysis })}
        </main>
      </div>
    </div>
  );
}
