"use client";

import React from "react";

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
  formattedValue: string;
}

export function DonutChart({
  slices,
  centerLabel,
  centerValue,
}: {
  slices: DonutSlice[];
  centerLabel: string;
  centerValue: string;
}) {
  const validSlices = slices.filter((s) => s.value > 0);
  const total = validSlices.reduce((sum, s) => sum + s.value, 0);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  const segments = validSlices.reduce<
    { slice: DonutSlice; dashArray: string; dashOffset: number }[]
  >((acc, slice) => {
    const prevSum = acc.reduce((s, item) => s + item.slice.value, 0);
    const pct = total > 0 ? slice.value / total : 0;
    const dashLength = pct * circumference;
    const offset = total > 0 ? -(prevSum / total) * circumference : 0;
    acc.push({
      slice,
      dashArray: `${dashLength} ${circumference - dashLength}`,
      dashOffset: offset,
    });
    return acc;
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-44 h-44 shrink-0">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth="18"
          />
          {segments.map(({ slice, dashArray, dashOffset }) => (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth="18"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
          <span className="text-[11px] font-medium text-slate-500 leading-tight">
            {centerLabel}
          </span>
          <span className="text-base font-bold text-slate-900 mt-0.5 leading-tight">
            {centerValue}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-2.5">
        {slices.map((s) => {
          const pct = total > 0 ? ((s.value / total) * 100).toFixed(1) : "0.0";
          return (
            <div
              key={s.label}
              className="flex items-center justify-between text-sm gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-slate-600 truncate">{s.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-semibold text-slate-900">
                  {s.formattedValue}
                </span>
                <span className="text-xs text-slate-400 w-11 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface BarSeriesPoint {
  label: string;
  primary: number;
  secondary: number;
  primaryFormatted: string;
  secondaryFormatted: string;
}

export function StackedBarChart({
  data,
  primaryLabel,
  secondaryLabel,
  primaryColor = "#0f766e",
  secondaryColor = "#10b981",
}: {
  data: BarSeriesPoint[];
  primaryLabel: string;
  secondaryLabel: string;
  primaryColor?: string;
  secondaryColor?: string;
}) {
  if (data.length === 0) return null;

  // Sample down to at most 14 bars for crisp visual readability
  const step = Math.max(1, Math.ceil(data.length / 14));
  const sampled = data.filter(
    (_, idx) => idx % step === 0 || idx === data.length - 1
  );

  const maxTotal = Math.max(
    1,
    ...sampled.map((d) => Math.max(0, d.primary) + Math.max(0, d.secondary))
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-4 text-xs text-slate-600 mb-3">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: primaryColor }}
          />
          {primaryLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: secondaryColor }}
          />
          {secondaryLabel}
        </span>
      </div>

      <div className="h-44 flex items-end gap-1.5 sm:gap-2 pt-2 border-b border-slate-200">
        {sampled.map((point) => {
          const pHeight = (Math.max(0, point.primary) / maxTotal) * 100;
          const sHeight = (Math.max(0, point.secondary) / maxTotal) * 100;
          return (
            <div
              key={point.label}
              className="flex-1 h-full flex flex-col justify-end group relative"
            >
              <div className="hidden group-hover:block absolute -top-14 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white text-[11px] rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg pointer-events-none">
                <div className="font-semibold">{point.label}</div>
                <div>
                  {primaryLabel}: {point.primaryFormatted}
                </div>
                <div>
                  {secondaryLabel}: {point.secondaryFormatted}
                </div>
              </div>
              <div className="w-full flex flex-col justify-end h-full">
                {sHeight > 0 && (
                  <div
                    className="w-full rounded-t-sm transition-all"
                    style={{
                      height: `${sHeight}%`,
                      backgroundColor: secondaryColor,
                    }}
                  />
                )}
                {pHeight > 0 && (
                  <div
                    className={`w-full transition-all ${
                      sHeight <= 0 ? "rounded-t-sm" : ""
                    }`}
                    style={{
                      height: `${pHeight}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 px-0.5">
        <span>{sampled[0]?.label}</span>
        {sampled.length > 2 && (
          <span>{sampled[Math.floor(sampled.length / 2)]?.label}</span>
        )}
        <span>{sampled[sampled.length - 1]?.label}</span>
      </div>
    </div>
  );
}

export interface AmortizationComboPoint {
  year: number;
  principal: number;
  interest: number;
  taxesFees: number;
  balance: number;
  principalFormatted: string;
  interestFormatted: string;
  taxesFeesFormatted: string;
  balanceFormatted: string;
}

export function AmortizationComboChart({
  data,
  formatYAxis,
}: {
  data: AmortizationComboPoint[];
  formatYAxis: (v: number) => string;
}) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  if (data.length === 0) return null;

  const width = 920;
  const height = 250;
  const padLeft = 56;
  const padRight = 56;
  const padTop = 18;
  const padBottom = 32;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxBalance = Math.max(1, ...data.map((d) => d.balance), data[0].balance + data[0].principal);
  const maxPayment = Math.max(
    1,
    ...data.map((d) => d.principal + d.interest + d.taxesFees)
  );

  // Round up nice axis ceilings
  const balanceCeil = maxBalance * 1.08;
  const paymentCeil = maxPayment * 1.12;

  const barStep = plotW / data.length;
  const barW = Math.max(6, Math.min(26, barStep * 0.72));

  const yBalance = (val: number) => padTop + plotH - (val / balanceCeil) * plotH;
  const yPayment = (val: number) => padTop + plotH - (val / paymentCeil) * plotH;
  const xCenter = (i: number) => padLeft + i * barStep + barStep / 2;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xCenter(i).toFixed(1)} ${yBalance(d.balance).toFixed(1)}`)
    .join(" ");

  const ticks = [0, 0.333, 0.666, 1];
  const labelInterval = Math.max(1, Math.ceil(data.length / 7));

  const hovered = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-600 mb-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-300" />
          Taxes &amp; Fees
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
          Interest
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-900" />
          Principal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-slate-800 inline-block relative">
            <span className="w-2 h-2 rounded-full bg-slate-800 absolute left-1 -top-[3px]" />
          </span>
          Remaining Balance
        </span>
      </div>

      {/* Hover summary bar */}
      <div className="min-h-[28px] mb-1 flex items-center justify-center">
        {hovered ? (
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-slate-900 text-white text-xs px-3.5 py-1 rounded-full shadow-sm">
            <span className="font-bold text-emerald-400">{hovered.year}</span>
            <span>Principal: {hovered.principalFormatted}</span>
            <span>Interest: {hovered.interestFormatted}</span>
            <span>Taxes &amp; Fees: {hovered.taxesFeesFormatted}</span>
            <span className="font-semibold text-sky-300">
              Balance: {hovered.balanceFormatted}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-slate-400">
            Hover over any year to inspect principal, interest, taxes, and remaining balance
          </span>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Mortgage amortization principal, interest, taxes, and remaining balance chart"
        >
          {/* Horizontal gridlines + Left (Balance) & Right (Payments) Y-axes */}
          {ticks.map((t) => {
            const y = padTop + plotH * (1 - t);
            return (
              <g key={t}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px]"
                >
                  {formatYAxis(balanceCeil * t)}
                </text>
                <text
                  x={width - padRight + 8}
                  y={y + 4}
                  textAnchor="start"
                  className="fill-slate-500 text-[10px]"
                >
                  {formatYAxis(paymentCeil * t)}
                </text>
              </g>
            );
          })}

          {/* Axis Titles */}
          <text
            x={14}
            y={padTop + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${padTop + plotH / 2})`}
            className="fill-slate-500 text-[10px] font-semibold"
          >
            Balance
          </text>
          <text
            x={width - 12}
            y={padTop + plotH / 2}
            textAnchor="middle"
            transform={`rotate(90 ${width - 12} ${padTop + plotH / 2})`}
            className="fill-slate-500 text-[10px] font-semibold"
          >
            Annual Payments
          </text>

          {/* Stacked Bars */}
          {data.map((d, i) => {
            const x = xCenter(i) - barW / 2;
            const prinH = (d.principal / paymentCeil) * plotH;
            const intH = (d.interest / paymentCeil) * plotH;
            const taxH = (d.taxesFees / paymentCeil) * plotH;

            const yPrin = padTop + plotH - prinH;
            const yInt = yPrin - intH;
            const yTax = yInt - taxH;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={d.year}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Hover highlight column */}
                {isHovered && (
                  <rect
                    x={padLeft + i * barStep}
                    y={padTop}
                    width={barStep}
                    height={plotH}
                    fill="#f1f5f9"
                  />
                )}
                <rect
                  x={x}
                  y={yPrin}
                  width={barW}
                  height={Math.max(0, prinH)}
                  fill="#134e4a"
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.65}
                />
                <rect
                  x={x}
                  y={yInt}
                  width={barW}
                  height={Math.max(0, intH)}
                  fill="#0284c7"
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.65}
                />
                <rect
                  x={x}
                  y={yTax}
                  width={barW}
                  height={Math.max(0, taxH)}
                  fill="#7dd3fc"
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.65}
                />
                {/* X-axis Year Labels */}
                {(i % labelInterval === 0 || i === data.length - 1) && (
                  <text
                    x={xCenter(i)}
                    y={height - 10}
                    textAnchor="middle"
                    className="fill-slate-500 text-[10px] font-medium"
                  >
                    {d.year}
                  </text>
                )}
              </g>
            );
          })}

          {/* Remaining Balance Curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.2"
            pointerEvents="none"
          />
          {data.map((d, i) => (
            <circle
              key={`dot-${d.year}`}
              cx={xCenter(i)}
              cy={yBalance(d.balance)}
              r={hoveredIdx === i ? 5 : 3}
              fill={hoveredIdx === i ? "#10b981" : "#0f172a"}
              stroke="#ffffff"
              strokeWidth="1.2"
              pointerEvents="none"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
