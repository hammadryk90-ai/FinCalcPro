"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Menu, X, Globe } from "lucide-react";
import { CURRENCIES } from "@/lib/currency";
import { useCurrency } from "./CurrencyContext";

const NAV_LINKS = [
  { href: "/calculators", label: "All Calculators" },
  { href: "/calculators/mortgage", label: "Mortgage" },
  { href: "/calculators/compound-interest", label: "Investing" },
  { href: "/calculators/profit-margin", label: "Business" },
  { href: "/calculators/debt-payoff", label: "Debt Payoff" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  const { currency, setCurrencyByCode } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 text-lg tracking-tight shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm">
            <Calculator className="w-5 h-5" />
          </span>
          <span>
            FinCalc<span className="text-emerald-600">Pro</span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-lg transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 rounded-lg px-2.5 py-1.5 transition">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <label htmlFor="currency-select" className="sr-only">
              Select Currency
            </label>
            <select
              id="currency-select"
              value={currency.code}
              onChange={(e) => setCurrencyByCode(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
