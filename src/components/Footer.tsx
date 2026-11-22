import React from "react";
import Link from "next/link";
import { Calculator, ShieldCheck } from "lucide-react";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators-registry";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-white text-lg"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </span>
              <span>
                FinCalc<span className="text-emerald-400">Pro</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, accurate, and privacy-first personal finance and business
              calculators. Every calculation runs locally in your browser—no
              sign-up, no paywalls, and transparent formulas.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              100% Free &amp; Client-Side Privacy
            </div>
          </div>

          {CATEGORIES.map((cat) => {
            const items = CALCULATORS.filter((c) => c.category === cat.id);
            return (
              <div key={cat.id}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                  {cat.label}
                </h3>
                <ul className="space-y-2 text-sm">
                  {items.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        href={`/calculators/${calc.slug}`}
                        className="text-slate-400 hover:text-emerald-400 transition"
                      >
                        {calc.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/about" className="hover:text-white transition">
              About &amp; Methodology
            </Link>
            <Link href="/guides" className="hover:text-white transition">
              Financial Guides
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition">
              Financial Disclaimer
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact Us
            </Link>
          </div>
          <p className="text-slate-500">
            © 2026 FinCalcPro. All rights reserved.
          </p>
        </div>

        <p className="mt-5 text-[11px] text-slate-500 leading-relaxed">
          Disclaimer: All calculators and educational guides on FinCalcPro are
          provided for informational and educational purposes only and do not
          constitute personalized financial, legal, tax, or investment advice.
          Consult a licensed financial advisor or certified public accountant
          before making major financial decisions.
        </p>
      </div>
    </footer>
  );
}
