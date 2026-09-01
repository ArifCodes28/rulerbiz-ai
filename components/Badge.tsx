import React from "react";

const toneClasses: Record<string, string> = {
  green: "bg-brand-100 text-brand-800 border-brand-200",
  blue: "bg-sky-100 text-sky-800 border-sky-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-rose-100 text-rose-800 border-rose-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Demo Data
    </span>
  );
}

export function DemoBusinessBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
      Demo Business
    </span>
  );
}
