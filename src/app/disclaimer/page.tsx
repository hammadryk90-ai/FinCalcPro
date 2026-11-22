import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Financial & Tax Disclaimer",
  description:
    "Important financial, investment, and tax disclaimer for users of FinCalcPro calculators and guides.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Financial &amp; Tax Disclaimer
        </h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026</p>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900 text-sm">
          <strong>Important Notice:</strong> FinCalcPro provides general
          educational tools and calculators. We are not a licensed financial
          advisor, mortgage broker, registered investment advisor, attorney, or
          certified public accountant (CPA).
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          1. Educational Estimates Only
        </h2>
        <p>
          Results produced by our Mortgage, Loan Amortization, Retirement,
          Compound Interest, Rental Property, Debt Payoff, Salary, and Business
          calculators are mathematical estimates based solely on the assumptions
          you input. Actual loan quotes, interest accruals, investment returns,
          and tax liabilities will vary based on your credit profile, lender
          fees, market volatility, and local regulations.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          2. Investment &amp; Market Risk
        </h2>
        <p>
          Historical stock market returns and retirement withdrawal guidelines
          (such as the 4% rule) do not guarantee future performance. All
          investing carries risk, including the potential loss of principal.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          3. Consult Qualified Professionals
        </h2>
        <p>
          Before making major financial, real estate, tax, or business
          decisions, please consult a qualified, licensed professional who can
          evaluate your individual circumstances.
        </p>
      </div>
    </div>
  );
}
