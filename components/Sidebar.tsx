"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/feasibility", label: "Business Feasibility", icon: "◎" },
  { href: "/financial-plan", label: "Financial Plan", icon: "₹" },
  { href: "/opportunities", label: "Opportunities", icon: "✦" },
  { href: "/advisor", label: "Growth Advisor", icon: "✆" },
  { href: "/customers", label: "Customer Suggestions", icon: "☏" },
  { href: "/intelligence", label: "Daily Intelligence", icon: "◈" },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
            R
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">RuralBiz AI</p>
            <p className="text-xs text-slate-500">SIH Prototype</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded text-xs ${
                    active ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-400">
            Prototype — all insights use demo data. No live govt/GST/tender APIs connected.
          </p>
        </div>
      </aside>
    </>
  );
}
