import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Calculator,
  LineChart,
  Globe,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { CALCULATORS } from "@/lib/calculators-registry";
import { GUIDES } from "@/lib/guides";
import { CalculatorDirectoryClient } from "@/components/CalculatorDirectoryClient";
import { AdSlot } from "@/components/AdSlot";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free • No Sign-Up Required • Instant Browser Calculations
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Smarter Personal Finance &amp;{" "}
              <span className="text-emerald-400">Business Calculators</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Model mortgages, compound growth, 401(k) retirement income, debt
              payoff strategies, profit margins, and rental property returns
              with transparent formulas, interactive charts, and exportable CSV
              schedules.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/calculators/mortgage"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-950/40"
              >
                Try Mortgage Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculators/compound-interest"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition"
              >
                Compound Interest
              </Link>
              <Link
                href="/calculators/profit-margin"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition"
              >
                Profit Margin
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Calculator className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">{CALCULATORS.length} Free</strong>{" "}
                Pro Tools
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <LineChart className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Interactive Charts &amp; CSV</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>8 Global Currencies</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Private Client-Side Math</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore All Financial &amp; Business Calculators
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Filter by category or search by topic to launch any tool instantly.
          </p>
        </div>

        <CalculatorDirectoryClient />

        <div className="mt-10">
          <AdSlot format="horizontal" label="Advertisement" />
        </div>
      </section>

      {/* Educational Guides Section (Boosts E-E-A-T & Organic SEO) */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                <BookOpen className="w-4 h-4" />
                Financial Learning Center
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Actionable Money &amp; Business Guides
              </h2>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-2xl border border-slate-200 p-5 bg-slate-50/50 hover:bg-white hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {guide.category}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition mt-3 text-base leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <span>{guide.readTime}</span>
                  <span className="font-semibold text-emerald-700 group-hover:underline">
                    Read Guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why FinCalcPro Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Built for Accuracy, Speed &amp; Financial Clarity
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Every calculator on FinCalcPro uses standard banking and corporate
              finance formulas, displays the exact equations used, and runs
              completely inside your browser so your personal numbers stay
              private.
            </p>
          </div>
          <div className="lg:col-span-5 space-y-3 text-sm">
            {[
              "Transparent formulas & worked explanations on every page",
              "Instant CSV export and clean Print / Save as PDF reports",
              "Supports USD, EUR, GBP, CAD, AUD, INR, PKR & AED",
              "Zero registration walls, zero hidden fees",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
