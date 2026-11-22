import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { getCalculatorBySlug } from "@/lib/calculators-registry";
import { AdSlot } from "@/components/AdSlot";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedCalc = getCalculatorBySlug(guide.relatedCalculatorSlug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Guides
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            {guide.category}
          </span>
          <span>{guide.readTime}</span>
          <span>• Updated {guide.updatedAt}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {guide.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          {guide.excerpt}
        </p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        {guide.sections.map((section, idx) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-slate-700 leading-relaxed text-sm sm:text-base"
              >
                {p}
              </p>
            ))}
            {idx === 0 && <AdSlot format="in-article" label="Advertisement" />}
          </section>
        ))}

        {relatedCalc && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Interactive Tool
                </p>
                <h3 className="font-bold text-slate-900 text-base">
                  Try the Free {relatedCalc.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Run your own numbers with charts and exportable schedules.
                </p>
              </div>
            </div>
            <Link
              href={`/calculators/${relatedCalc.slug}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition"
            >
              Launch Tool <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
