"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_PROFILE, saveProfile } from "@/lib/storage";
import { BusinessProfile } from "@/lib/types";

const REGISTRATION_TYPES = [
  "Proprietorship",
  "Partnership",
  "Private Limited",
  "LLP",
  "MSME Udyam Registered Proprietorship",
  "Other",
];
const GST_STATUSES = ["GST Registered", "Not GST Registered", "Process of Registration"];
const UDYAM_STATUSES = ["Udyam Registered", "Not Registered", "Process of Registration"];

const PRODUCT_OPTIONS = [
  "Shirts",
  "Chef shirts / chef uniforms",
  "School uniforms",
  "Hospital uniforms",
  "Factory workwear",
  "Security uniforms",
  "Corporate uniforms",
  "Custom garments",
];

const CUSTOMER_TYPE_OPTIONS = [
  "Hotels",
  "Restaurants",
  "Schools",
  "Hospitals",
  "Factories",
  "Security agencies",
  "Corporate organizations",
  "Retailers",
  "Wholesalers",
];

const SEGMENT_OPTIONS = [
  "Hotels",
  "Restaurants",
  "Schools",
  "Hospitals",
  "Factories",
  "Security companies",
  "Corporate organizations",
  "Retailers",
  "Wholesalers",
];

function num(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function GarmentOnboardingForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<BusinessProfile>(SAMPLE_PROFILE);

  function setField<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArrayField(key: "products" | "majorCustomerTypes" | "targetCustomerSegments", option: string) {
    setProfile((prev) => {
      const current = prev[key];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [key]: next };
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-sky-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white">
            R
          </div>
          <h1 className="text-3xl font-black text-slate-950">Set up your garment factory</h1>
          <p className="mt-2 text-sm text-slate-600">
            RuralBiz AI will use this factory profile to drive the advisory dashboard. A sample factory is pre-filled.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
            <span className="font-bold">Prototype note:</span> Information is stored only in browser localStorage in this phase. No backend, database, live government, banking, tender or GST verification APIs are connected yet.
          </div>
          <button
            type="button"
            onClick={() => setProfile(SAMPLE_PROFILE)}
            className="w-full rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left text-sm font-bold text-sky-800 hover:bg-sky-100"
          >
            Use Sample Factory → Mondal Garments & Tailoring, Nadia District, West Bengal
            <span className="mt-1 block text-xs font-medium text-sky-700">
              ₹1,00,000 capital · ₹1,50,000 monthly revenue · 30% growth goal · bulk/institutional focus
            </span>
          </button>
<SectionCard step="1" title="Factory" subtitle="Business identity and registration details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Factory / business name">
                <input className={inputCls()} value={profile.businessName} onChange={(e) => setField("businessName", e.target.value)} />
              </Field>
              <Field label="Owner / contact person">
                <input className={inputCls()} value={profile.name} onChange={(e) => setField("name", e.target.value)} />
              </Field>
              <Field label="Location">
                <input className={inputCls()} value={profile.location} onChange={(e) => setField("location", e.target.value)} />
              </Field>
              <Field label="Business type">
                <input className={inputCls()} value={profile.businessType} onChange={(e) => setField("businessType", e.target.value)} />
              </Field>
              <NumberField label="Years in operation" value={profile.yearsInOperation} onChange={(v) => setField("yearsInOperation", v)} />
              <SelectField label="Business registration type" value={profile.registrationType} onChange={(v) => setField("registrationType", v)} options={REGISTRATION_TYPES} />
              <SelectField label="GST status" value={profile.gstStatus} onChange={(v) => setField("gstStatus", v)} options={GST_STATUSES} />
              <SelectField label="Udyam / MSME registration status" value={profile.udyamStatus} onChange={(v) => setField("udyamStatus", v)} options={UDYAM_STATUSES} />
            </div>
          </SectionCard>

          <SectionCard step="2" title="Production" subtitle="Workforce, machinery and capacity">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField label="Number of workers" value={profile.workersCount} onChange={(v) => setField("workersCount", v)} />
              <NumberField label="Number of machines" value={profile.machineCount} onChange={(v) => setField("machineCount", v)} />
              <NumberField label="Monthly production capacity (units)" value={profile.monthlyProductionCapacity} onChange={(v) => setField("monthlyProductionCapacity", v)} />
              <NumberField label="Current monthly production (units)" value={profile.currentMonthlyProduction} onChange={(v) => setField("currentMonthlyProduction", v)} />
              <NumberField label="Current capacity utilization (%)" value={profile.capacityUtilization} onChange={(v) => setField("capacityUtilization", Math.min(100, v))} />
              <NumberField label="Delivery radius (km)" value={profile.deliveryRadiusKm} onChange={(v) => setField("deliveryRadiusKm", v)} />
              <NumberField label="Minimum order quantity (units)" value={profile.minimumOrderQuantity} onChange={(v) => setField("minimumOrderQuantity", v)} />
              <NumberField label="Typical lead time (days)" value={profile.leadTimeDays} onChange={(v) => setField("leadTimeDays", v)} />
            </div>
          </SectionCard>

          <SectionCard step="3" title="Products" subtitle="Select the garments the factory manufactures">
            <ChoiceGroup label="Products" options={PRODUCT_OPTIONS} selected={profile.products} onToggle={(o) => toggleArrayField("products", o)} />
          </SectionCard>
<SectionCard step="4" title="Business" subtitle="Revenue, capital and current B2B customers">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField label="Monthly revenue (₹)" value={profile.monthlyRevenue} onChange={(v) => setField("monthlyRevenue", v)} />
              <NumberField label="Available capital (₹)" value={profile.capital} onChange={(v) => setField("capital", v)} />
              <NumberField label="Current number of B2B customers" value={profile.b2bCustomerCount} onChange={(v) => setField("b2bCustomerCount", v)} />
              <NumberField label="Average order size (₹)" value={profile.averageOrderSize} onChange={(v) => setField("averageOrderSize", v)} />
            </div>
            <div className="mt-4 space-y-4">
              <ChoiceGroup label="Current major customer types" options={CUSTOMER_TYPE_OPTIONS} selected={profile.majorCustomerTypes} onToggle={(o) => toggleArrayField("majorCustomerTypes", o)} />
              <ChoiceGroup label="Target customer segments (for bulk/institutional sales)" options={SEGMENT_OPTIONS} selected={profile.targetCustomerSegments} onToggle={(o) => toggleArrayField("targetCustomerSegments", o)} cols={3} />
            </div>
          </SectionCard>

          <SectionCard step="5" title="Goal" subtitle="Growth target and main business objective">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NumberField label="Revenue growth target (%)" value={profile.revenueGrowthTarget} onChange={(v) => setField("revenueGrowthTarget", v)} />
              <NumberField label="Target timeline (months)" value={profile.targetTimelineMonths} onChange={(v) => setField("targetTimelineMonths", v)} />
            </div>
            <div className="mt-4">
              <Field label="Main business objective">
                <input className={inputCls()} value={profile.mainObjective} onChange={(e) => setField("mainObjective", e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setProfile(SAMPLE_PROFILE)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset to Sample Factory
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Generate Dashboard
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function inputCls() {
  return "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";
}

function SectionCard({ step, title, subtitle, children }: { step: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{step}</span>
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function ChoiceGroup({ label, options, selected, onToggle, cols = 2 }: { label: string; options: string[]; selected: string[]; onToggle: (o: string) => void; cols?: number }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className={`grid gap-2 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${active ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50"}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (n: number) => void; min?: number }) {
  return (
    <Field label={label}>
      <input type="number" min={min} value={value} onChange={(e) => onChange(num(e.target.value, value))} className={inputCls()} />
    </Field>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls()}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </Field>
  );
}