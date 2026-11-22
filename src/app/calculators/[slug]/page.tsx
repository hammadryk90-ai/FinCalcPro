import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import {
  CALCULATORS,
  getCalculatorBySlug,
  getRelatedCalculators,
} from "@/lib/calculators-registry";
import { CALCULATOR_CONTENT } from "@/lib/calculator-content";
import { CalculatorShell } from "@/components/CalculatorShell";

export function generateStaticParams() {
  return CALCULATORS.map((calc) => ({ slug: calc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  if (!meta) return {};

  return {
    title: `${meta.title} — Free Online Tool`,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | FinCalcPro`,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  const content = CALCULATOR_CONTENT[slug];

  if (!meta || !content) {
    notFound();
  }

  const related = getRelatedCalculators(meta);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: meta.title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: meta.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CalculatorShell meta={meta} content={content} related={related} />
    </>
  );
}
