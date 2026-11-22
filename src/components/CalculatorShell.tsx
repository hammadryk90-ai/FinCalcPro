"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Printer,
  Share2,
  Check,
  BookOpen,
  Lightbulb,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import type { CalculatorMeta } from "@/lib/calculators-registry";
import type { CalculatorGuideContent } from "@/lib/calculator-content";
import { CalculatorRenderer } from "./calculators/CalculatorRenderer";
import { CalculatorIcon } from "./CalculatorIcon";
import { AdSlot } from "./AdSlot";

export function CalculatorShell({
  meta,
  content,
  related,
}: {
  meta: CalculatorMeta;
  content: CalculatorGuideContent;
  related: CalculatorMeta[];
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap print:hidden"
      >
        <Link href="/" className="hover:text-emerald-700 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/calculators" className="hover:text-emerald-700 transition">
          Calculators
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-medium">{meta.shortTitle}</span>
      </nav>

      {/* Title & Utility Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2.5">
            <CalculatorIcon name={meta.iconName} className="w-3.5 h-3.5" />
            {meta.categoryLabel}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 print:hidden">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied Link
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / PDF
          </button>
        </div>
      </div>

      {/* Interactive Calculator */}
      <section aria-label={meta.title}>
        <CalculatorRenderer slug={meta.slug} />
      </section>

      {/* Policy-compliant Ad Slot placed cleanly BELOW the tool (never crowding controls) */}
      <AdSlot format="horizontal" label="Advertisement" />

      {/* Rich Educational Content (Crucial for AdSense E-E-A-T & SEO) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        <article className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 text-slate-900">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold">
                How the {meta.title} Works
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {content.overview}
            </p>

            <div className="rounded-xl bg-slate-900 text-slate-100 p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {content.formulaTitle}
              </p>
              <p className="font-mono text-sm sm:text-base font-semibold text-white break-words">
                {content.formulaText}
              </p>
              <ul className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-800">
                {content.formulaVariables.map((v) => (
                  <li key={v}>• {v}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-900 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold">
                  Smart Financial Tips
                </h3>
              </div>
              <ul className="space-y-2.5">
                {content.tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 text-slate-900 mb-5">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group py-4 first:pt-0 last:pb-0">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition">
                    <span>{faq.question}</span>
                    <span className="ml-4 text-slate-400 group-open:rotate-45 transition-transform text-lg">
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar: Related Calculators + Rectangle Ad Slot */}
        <aside className="lg:col-span-4 space-y-6 print:hidden">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Related Calculators
            </h2>
            <div className="space-y-2.5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/calculators/${rel.slug}`}
                  className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center shrink-0 transition">
                      <CalculatorIcon name={rel.iconName} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {rel.shortTitle}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {rel.categoryLabel}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <AdSlot format="rectangle" label="Advertisement" />
        </aside>
      </div>
    </div>
  );
}
