import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES } from "@/lib/guides";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Personal Finance & Business Guides",
  description:
    "In-depth, practical guides on mortgage amortization, compound interest, retirement planning, profit margins, and debt payoff strategies.",
};

export default function GuidesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
          <BookOpen className="w-4 h-4" />
          Financial Learning Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Personal Finance &amp; Business Guides
        </h1>
        <p className="mt-2.5 text-slate-600 text-sm sm:text-base max-w-2xl">
          Clear, jargon-free tutorials designed to help you interpret calculator
          results and make confident financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {guide.category}
                </span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                {guide.title}
              </h2>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                {guide.excerpt}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Updated {guide.updatedAt}</span>
              <span className="inline-flex items-center gap-1">
                Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot format="horizontal" label="Advertisement" />
      </div>
    </div>
  );
}
