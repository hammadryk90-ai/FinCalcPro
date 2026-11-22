"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem("fincalc_cookie_consent");
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChoice = (choice: "accepted" | "essential") => {
    try {
      window.localStorage.setItem("fincalc_cookie_consent", choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900 text-slate-100 rounded-2xl p-4 shadow-2xl border border-slate-700 print:hidden"
    >
      <p className="text-xs leading-relaxed text-slate-200">
        FinCalcPro uses cookies to remember your currency preference, analyze
        site traffic, and support personalized or non-personalized advertising
        via Google AdSense. Read our{" "}
        <Link
          href="/privacy-policy"
          className="underline text-emerald-400 hover:text-emerald-300"
        >
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => handleChoice("essential")}
          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
