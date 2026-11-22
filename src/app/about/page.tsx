import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ShieldCheck, Calculator, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About FinCalcPro & Editorial Methodology",
  description:
    "Learn about FinCalcPro's mission, transparent financial calculation methodology, and commitment to free, privacy-first personal finance tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          About FinCalcPro
        </h1>
        <p className="text-slate-600 leading-relaxed">
          FinCalcPro was created with a simple mission: make institutional-grade
          personal finance and small business calculators freely accessible to
          everyone—without registration gates, hidden subscriptions, or
          confusing financial jargon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <Calculator className="w-5 h-5 text-emerald-600 mb-2" />
            <h2 className="font-bold text-slate-900 text-sm">
              Transparent Formulas
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Every tool publishes the exact mathematical equations and
              assumptions behind the numbers.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
            <h2 className="font-bold text-slate-900 text-sm">
              Client-Side Privacy
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              All calculations run directly in your browser. We never collect or
              store your salary, debt, or net worth entries.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <BookOpen className="w-5 h-5 text-emerald-600 mb-2" />
            <h2 className="font-bold text-slate-900 text-sm">
              Educational First
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Each calculator includes practical tips, FAQs, and guides so you
              understand the &ldquo;why&rdquo; behind every metric.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-2">
          Our Editorial &amp; Accuracy Standards
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We verify our amortization, compounding, return-on-investment, and
          debt payoff engines against standard banking and corporate finance
          benchmarks. Because real-world lender terms, tax brackets, and
          investment returns vary by jurisdiction, our tools are designed as
          planning and educational aids rather than binding financial quotes.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-2">
          How FinCalcPro Stays 100% Free
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          FinCalcPro is supported by non-intrusive display advertising (such as
          Google AdSense). Advertisers never influence our formulas, outputs, or
          educational content.
        </p>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition"
          >
            <CheckCircle2 className="w-4 h-4" /> Explore All Calculators
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
}
