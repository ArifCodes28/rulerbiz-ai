"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { DemoBadge } from "@/components/Badge";
import { advisorReply } from "@/lib/analysis";
import { BusinessAnalysis, BusinessProfile } from "@/lib/types";

type Message = { role: "user" | "ai"; text: string };

const starterQuestions = [
  "How can I grow my business?",
  "Should I expand?",
  "What should I do with my available capital?",
  "Which opportunity is best for me?",
];

export default function AdvisorPage() {
  return (
    <AppShell title="Growth Advisor">
      {({ profile, analysis }) => <AdvisorChat profile={profile} analysis={analysis} />}
    </AppShell>
  );
}

function AdvisorChat({ profile, analysis }: { profile: BusinessProfile; analysis: BusinessAnalysis }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Namaste ${profile.name}! I am your RuralBiz AI growth advisor. Ask me about expansion, capital use, opportunities or customer follow-ups. This is a mock AI chat for the prototype.`,
    },
  ]);

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    const reply = advisorReply(trimmed, profile, analysis);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }, { role: "ai", text: reply }]);
    setInput("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <Card className="min-h-[70vh] bg-gradient-to-br from-white to-slate-50" title="AI Advisor Chat" subtitle="Predefined, profile-aware responses for demo" action={<DemoBadge />}>
        <div className="mb-4 rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-sm font-bold text-brand-900">Advisor context</p>
          <p className="mt-1 text-sm leading-6 text-brand-800">
            {profile.businessType} in {profile.location} · Health score {analysis.healthScore}/100 · Feasibility {analysis.feasibility.overallScore}/100
          </p>
        </div>
        <div className="flex h-[58vh] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${m.role === "user" ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-700 border border-slate-200"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask: Should I expand?"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
            <button className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              Send
            </button>
          </form>
        </div>
      </Card>

      <Card title="Try asking" demo>
        <div className="space-y-2">
          {starterQuestions.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="mr-2 text-brand-600">↳</span>
              {q}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Responses are generated locally using predefined logic based on your business profile. No external LLM/API is called in this prototype.
        </p>
      </Card>
    </div>
  );
}