import type { Metadata } from "next";
import React from "react";
import { CalculatorDirectoryClient } from "@/components/CalculatorDirectoryClient";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Personal Finance & Business Calculators",
  description:
    "Browse all 24 free personal finance, real estate, investing, debt payoff, e-commerce, SaaS, and small business calculators on FinCalcPro.",
};

export default function AllCalculatorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Personal Finance &amp; Business Calculators
        </h1>
        <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
          Choose any calculator below to model loans, investments, retirement
          targets, business pricing, or debt elimination plans—100% free with
          instant charts and exportable tables.
        </p>
      </div>

      <CalculatorDirectoryClient />

      <div className="mt-10">
        <AdSlot format="horizontal" label="Advertisement" />
      </div>
    </div>
  );
}
