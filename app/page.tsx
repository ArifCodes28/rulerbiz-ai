import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white shadow-sm">
              R
            </div>
            <div>
              <p className="font-bold text-slate-900">RuralBiz AI</p>
              <p className="text-xs text-slate-500">Smart India Hackathon Prototype</p>
            </div>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Demo Data Only
          </span>
        </nav>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-sm font-medium text-brand-700 shadow-sm">
              Garment Manufacturing / Tailoring Factory · Nadia District, West Bengal
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              RuralBiz AI
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Your AI-powered partner for starting and growing your business
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              A simple frontend prototype that demonstrates onboarding, feasibility scoring,
              financial planning, opportunities, daily business intelligence and mock AI advice.
              No real government, tender, GST or banking APIs are connected in this version.
            </p>
            <div className="mt-5 grid max-w-2xl gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">₹1,00,000 capital</div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">₹1,50,000 monthly revenue</div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">Bulk / institutional focus</div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Start 3-Minute Demo
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                View Existing Demo
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Demo Business: Garment Factory</p>
                  <p className="text-xs text-slate-500">Simulated dashboard preview</p>
                </div>
                <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-700">82/100</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Feasibility", "Finance", "Opportunities", "AI Advisor"].map((item, i) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 h-2 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-brand-500" style={{ width: `${78 - i * 7}%` }} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{item}</p>
                    <p className="mt-1 text-xs text-slate-500">Personalized demo insight</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}