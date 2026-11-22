"use client";

import React from "react";
import { Download } from "lucide-react";

export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-sm font-medium text-slate-500 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            onChange(Number.isFinite(parsed) ? parsed : 0);
          }}
          className={`w-full rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition ${
            prefix ? "pl-9" : "pl-3.5"
          } ${suffix ? "pr-12" : "pr-3.5"}`}
        />
        {suffix && (
          <span className="absolute right-3.5 text-xs font-medium text-slate-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function SelectField<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (val: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          const match = options.find((o) => String(o.value) === raw);
          if (match) onChange(match.value);
        }}
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PrimaryResultCard({
  label,
  value,
  subtext,
  accent = "emerald",
}: {
  label: string;
  value: string;
  subtext?: string;
  accent?: "emerald" | "slate" | "amber" | "rose";
}) {
  const styles = {
    emerald:
      "bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-700",
    slate: "bg-slate-900 text-white border-slate-800",
    amber: "bg-amber-600 text-white border-amber-700",
    rose: "bg-rose-600 text-white border-rose-700",
  }[accent];

  return (
    <div className={`rounded-2xl p-5 border shadow-sm ${styles}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-85">
        {label}
      </p>
      <p className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
        {value}
      </p>
      {subtext && <p className="text-xs opacity-90 mt-2">{subtext}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  subtext,
  highlight = false,
}: {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-emerald-50/70 border-emerald-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p
        className={`text-lg font-bold mt-1 ${
          highlight ? "text-emerald-800" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {subtext && <p className="text-[11px] text-slate-500 mt-0.5">{subtext}</p>}
    </div>
  );
}

export function ScheduleTable({
  title,
  headers,
  rows,
  onDownloadCsv,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  onDownloadCsv?: () => void;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {onDownloadCsv && (
          <button
            type="button"
            onClick={onDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer print:hidden"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        )}
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 sticky top-0 border-b border-slate-200">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/70">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-4 py-2.5 whitespace-nowrap ${
                      cIdx === 0
                        ? "font-semibold text-slate-800"
                        : "text-slate-600 tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
