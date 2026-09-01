import React from "react";
import { DemoBadge } from "./Badge";

export function Card({
  title,
  subtitle,
  demo = false,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  demo?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/60 transition-shadow hover:shadow-md hover:shadow-slate-200/80 ${className}`}
    >
      {(title || demo) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && (
              <h2 className="text-base font-bold tracking-tight text-slate-950">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {action}
            {demo && <DemoBadge />}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
