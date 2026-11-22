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

  if (!clientId) {
    return null;
  }

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
