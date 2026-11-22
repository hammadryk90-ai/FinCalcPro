"use client";

import React, { useEffect } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "in-article";
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Google AdSense-compliant, CLS-safe ad container.
 * - Reserves explicit min-height to prevent Cumulative Layout Shift (Core Web Vitals).
 * - Clearly labeled "Advertisement" to comply with AdSense anti-deception policies.
 * - Automatically activates live AdSense units when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 */
export function AdSlot({
  slotId = "0000000000",
  format = "horizontal",
  label = "Advertisement",
  className = "",
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore AdSense push errors in dev or when blocked
    }
  }, [clientId, slotId]);

  const heightClass =
    format === "rectangle"
      ? "min-h-[250px]"
      : format === "in-article"
      ? "min-h-[120px]"
      : "min-h-[90px]";

  if (clientId) {
    return (
      <div
        className={`w-full my-6 flex flex-col items-center justify-center print:hidden ${className}`}
        aria-label="Advertisement"
      >
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
          {label}
        </span>
        <div className={`w-full flex justify-center overflow-hidden ${heightClass}`}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={format === "in-article" ? "fluid" : "auto"}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full my-6 print:hidden ${className}`}
      aria-label="Advertisement placeholder"
    >
      <div
        className={`w-full ${heightClass} rounded-xl border border-dashed border-slate-300 bg-slate-50/80 flex flex-col items-center justify-center px-4 py-3 text-center`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <p className="text-xs text-slate-500 mt-1">
          AdSense-Ready Slot ({format === "rectangle" ? "300×250 / Responsive" : "728×90 / Responsive"})
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Set <code className="bg-slate-200/70 px-1 rounded">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in <code className="bg-slate-200/70 px-1 rounded">.env.local</code> to serve live ads
        </p>
      </div>
    </div>
  );
}
