"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_PROFILE, saveProfile } from "@/lib/storage";
import { BusinessProfile } from "@/lib/types";

const fields: { key: keyof BusinessProfile; label: string; type?: string; placeholder: string }[] = [
  { key: "name", label: "Name", placeholder: "Anita Mondal" },
  { key: "location", label: "Location", placeholder: "Nadia District, West Bengal" },
  { key: "businessType", label: "Business type", placeholder: "Dairy Farm" },
  { key: "capital", label: "Available capital", type: "number", placeholder: "100000" },
  { key: "monthlyRevenue", label: "Monthly revenue", type: "number", placeholder: "150000" },
  { key: "mainProduct", label: "Main product", placeholder: "Milk and dairy products" },
  { key: "goal", label: "Business goal", placeholder: "Increase revenue by 30%" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<BusinessProfile>(SAMPLE_PROFILE);

  function updateField(key: keyof BusinessProfile, value: string) {
    setProfile((prev) => ({
      ...prev,
      [key]: key === "capital" || key === "monthlyRevenue" ? Number(value) : value,
    }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-sky-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white">
            R
          </div>
          <h1 className="text-3xl font-black text-slate-950">Start the 3-minute RuralBiz AI demo</h1>
          <p className="mt-2 text-sm text-slate-600">
            A sample rural dairy business is pre-filled so judges can see the full advisory dashboard immediately.
          </p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
              <span className="font-bold">Prototype note:</span> This is a simulated demo business. Data is saved only in browser localStorage. No backend, live government, banking, tender or GST APIs are connected.
            </div>
            <button
              type="button"
              onClick={() => setProfile(SAMPLE_PROFILE)}
              className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left text-sm font-bold text-sky-800 hover:bg-sky-100"
            >
              Use Demo Business → Dairy Farm, West Bengal
              <span className="mt-1 block text-xs font-medium text-sky-700">
                ₹1,00,000 capital · ₹1,50,000 revenue · 30% growth goal
              </span>
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className={field.key === "goal" || field.key === "mainProduct" ? "sm:col-span-2" : ""}>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  required
                  value={String(profile[field.key])}
                  placeholder={field.placeholder}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              </label>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setProfile(SAMPLE_PROFILE)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset Demo Business
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Generate 3-Minute Demo Dashboard
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}