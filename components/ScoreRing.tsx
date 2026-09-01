import React from "react";

export function ScoreRing({
  score,
  size = 120,
  stroke = 10,
  label,
  status,
}: {
  score: number;
  size?: number;
  stroke?: number;
  label?: string;
  status?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (progress / 100) * circumference;
  const color = score >= 70 ? "#1fa564" : score >= 45 ? "#d97706" : "#e11d48";
  const statusLabel = status ?? (score >= 75 ? "Strong" : score >= 55 ? "Promising" : "Needs attention");

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 drop-shadow-sm">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-white/70">
          <span className="text-3xl font-black tracking-tight text-slate-950">{score}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{statusLabel}</span>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-center text-xs font-semibold text-slate-700">
          {label}
        </span>
      )}
    </div>
  );
}

export function BarMeter({
  label,
  value,
  invert = false,
}: {
  label: string;
  value: number;
  invert?: boolean;
}) {
  const good = invert ? value <= 40 : value >= 65;
  const mid = invert ? value <= 65 : value >= 40;
  const barColor = good
    ? "bg-brand-500"
    : mid
    ? "bg-amber-500"
    : "bg-rose-500";
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-950">{value}/100</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200">
        <div
          className={`h-2.5 rounded-full ${barColor}`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-slate-500">
        {invert
          ? value <= 40
            ? "Low risk"
            : value <= 65
            ? "Manageable risk"
            : "High risk"
          : value >= 70
          ? "Strong signal"
          : value >= 50
          ? "Moderate signal"
          : "Developing signal"}
      </p>
    </div>
  );
}
