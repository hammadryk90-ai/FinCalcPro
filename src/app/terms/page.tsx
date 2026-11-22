import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing use of the FinCalcPro financial and business calculator website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026</p>

        <p>
          By accessing or using FinCalcPro, you agree to be bound by these Terms
          of Service. If you do not agree with any part of these terms, please
          discontinue use of the website.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          1. Permitted Use
        </h2>
        <p>
          FinCalcPro grants you a free, non-exclusive, revocable license to use
          our calculators, charts, and educational guides for personal and
          internal business planning. You may not scrape, mirror, or resell our
          content or calculators without prior written consent.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          2. No Warranty &amp; Informational Accuracy
        </h2>
        <p>
          All tools and articles are provided &ldquo;as is&rdquo; without
          warranties of any kind. While we strive for mathematical accuracy,
          lender terms, tax laws, compounding conventions, and market conditions
          change frequently. You are solely responsible for verifying figures
          before entering into any loan, investment, or contract.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          3. Limitation of Liability
        </h2>
        <p>
          FinCalcPro and its operators shall not be liable for any direct,
          indirect, incidental, or consequential financial losses arising from
          the use of—or reliance upon—any calculator output or article on this
          website.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          4. Changes to Terms
        </h2>
        <p>
          We may update these Terms of Service periodically. Continued use of
          FinCalcPro after updates constitutes acceptance of the revised terms.
        </p>
      </div>
    </div>
  );
}
