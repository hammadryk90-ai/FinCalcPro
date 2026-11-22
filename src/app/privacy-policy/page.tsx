import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FinCalcPro Privacy Policy covering client-side calculations, cookies, Google AdSense advertising disclosures, and your privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026</p>

        <p>
          At FinCalcPro, we respect your privacy. This Privacy Policy explains
          what information is collected when you visit our website, how it is
          used, and the choices you have regarding cookies and advertising.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          1. Calculator Inputs Stay in Your Browser
        </h2>
        <p>
          All financial figures you enter into our calculators (such as income,
          mortgage balances, debts, or business costs) are processed locally in
          your web browser using JavaScript. We do not transmit, sell, or store
          your financial calculator inputs on our servers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          2. Local Storage &amp; Essential Cookies
        </h2>
        <p>
          We use browser local storage to remember your preferred display
          currency (e.g., USD, EUR, GBP) and your cookie consent choice. You can
          clear local storage or disable cookies at any time through your
          browser settings.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          3. Google AdSense &amp; Third-Party Advertising Cookies
        </h2>
        <p>
          FinCalcPro uses Google AdSense to display advertisements that keep our
          tools free. Third-party vendors, including Google, use cookies to
          serve ads based on a user&rsquo;s prior visits to this website or
          other websites.
        </p>
        <p>
          Google&rsquo;s use of advertising cookies enables it and its partners
          to serve ads to you based on your visit to FinCalcPro and/or other
          sites on the Internet. Users may opt out of personalized advertising by
          visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline"
          >
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline"
          >
            www.aboutads.info
          </a>
          .
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          4. Log Data &amp; Analytics
        </h2>
        <p>
          Like most websites, our hosting provider may collect standard server
          log data such as IP address, browser type, referring pages, and
          timestamps to maintain site security, diagnose errors, and measure
          aggregate performance.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">
          5. GDPR, CCPA &amp; Contact Information
        </h2>
        <p>
          Depending on your location (including the European Economic Area, the
          UK, and California), you may have rights to access, delete, or limit
          the use of personal data collected via cookies or contact inquiries.
          For any privacy questions, please reach out via our Contact page.
        </p>
      </div>
    </div>
  );
}
