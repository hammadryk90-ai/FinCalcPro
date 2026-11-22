"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import {
  CALCULATORS,
  CATEGORIES,
  type CalculatorCategory,
} from "@/lib/calculators-registry";
import { CalculatorIcon } from "./CalculatorIcon";

export function CalculatorDirectoryClient({
  showSearch = true,
}: {
  showSearch?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    CalculatorCategory | "all"
  >("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CALCULATORS.filter((calc) => {
      const matchesCat =
        activeCategory === "all" || calc.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        calc.title.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.categoryLabel.toLowerCase().includes(q) ||
        calc.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-6">
      {showSearch && (
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators (e.g., mortgage, ROI, 401k, debt)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              All ({CALCULATORS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-600 text-sm">
            No calculators matched &ldquo;{query}&rdquo;. Try another financial term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition">
                    <CalculatorIcon name={calc.iconName} className="w-5 h-5" />
                  </span>
                  {calc.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {calc.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition text-base">
                  {calc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                  {calc.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
