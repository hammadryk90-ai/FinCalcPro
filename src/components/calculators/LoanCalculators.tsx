"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Printer, Share2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useCurrency } from "@/components/CurrencyContext";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "@/lib/currency";
import { downloadCSV } from "@/lib/export";
import {
  AmortizationComboChart,
  DonutChart,
  StackedBarChart,
} from "@/components/Charts";
import {
  NumberField,
  PrimaryResultCard,
  ScheduleTable,
  SelectField,
  StatCard,
} from "@/components/CalculatorUI";

function calcMonthlyPayment(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MortgageCalculator() {
  const { currency } = useCurrency();
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentMode, setDownPaymentMode] = useState<"amount" | "percent">(
    "amount"
  );
  const [downPaymentValue, setDownPaymentValue] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.48);
  const [termYears, setTermYears] = useState(30);
  const [startMonth, setStartMonth] = useState(10); // Nov (0-indexed)
  const [startYear, setStartYear] = useState(2026);
  const [propertyTaxYearly, setPropertyTaxYearly] = useState(3000);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [insuranceYearly, setInsuranceYearly] = useState(1500);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [loanType, setLoanType] = useState<"Conventional" | "FHA" | "VA" | "USDA">(
    "Conventional"
  );
  const [purpose, setPurpose] = useState<"Buy" | "Refi">("Buy");
  const [chartView, setChartView] = useState<"amortization" | "breakdown">(
    "amortization"
  );
  const [showTable, setShowTable] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Restore shared calculation from URL query parameters if present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hp = parseFloat(params.get("hp") || "");
      const dp = parseFloat(params.get("dp") || "");
      const rate = parseFloat(params.get("r") || "");
      const term = parseInt(params.get("t") || "", 10);
      const tax = parseFloat(params.get("tax") || "");
      const ins = parseFloat(params.get("ins") || "");
      const hoa = parseFloat(params.get("hoa") || "");
      if (Number.isFinite(hp) && hp > 0) setHomePrice(hp);
      if (Number.isFinite(dp) && dp >= 0) {
        setDownPaymentMode("amount");
        setDownPaymentValue(dp);
      }
      if (Number.isFinite(rate) && rate >= 0) setInterestRate(rate);
      if (Number.isFinite(term) && term > 0) setTermYears(term);
      if (Number.isFinite(tax) && tax >= 0) setPropertyTaxYearly(tax);
      if (Number.isFinite(ins) && ins >= 0) setInsuranceYearly(ins);
      if (Number.isFinite(hoa) && hoa >= 0) setHoaMonthly(hoa);
    } catch {
      // ignore query parsing errors
    }
  }, []);

  const downPaymentAmount =
    downPaymentMode === "amount"
      ? Math.min(homePrice, Math.max(0, downPaymentValue))
      : Math.min(homePrice, Math.max(0, (homePrice * downPaymentValue) / 100));

  const downPaymentPct =
    homePrice > 0 ? (downPaymentAmount / homePrice) * 100 : 0;

  const handleModeSwitch = (mode: "amount" | "percent") => {
    if (mode === downPaymentMode) return;
    if (mode === "percent") {
      setDownPaymentValue(Number(downPaymentPct.toFixed(2)));
    } else {
      setDownPaymentValue(Math.round(downPaymentAmount));
    }
    setDownPaymentMode(mode);
  };

  const handleLoanAmountChange = (newLoanAmt: number) => {
    const clampedLoan = Math.max(0, Math.min(homePrice, newLoanAmt));
    const newDown = Math.max(0, homePrice - clampedLoan);
    if (downPaymentMode === "amount") {
      setDownPaymentValue(Math.round(newDown));
    } else {
      setDownPaymentValue(
        homePrice > 0 ? Number(((newDown / homePrice) * 100).toFixed(2)) : 0
      );
    }
  };

  const result = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPaymentAmount);
    const totalMonths = Math.max(1, Math.round(termYears * 12));
    const monthlyPI = calcMonthlyPayment(loanAmount, interestRate, totalMonths);
    const monthlyTax = propertyTaxYearly / 12;
    const monthlyIns = insuranceYearly / 12;
    const pmiRequired =
      loanType === "FHA" || (loanType !== "VA" && downPaymentPct < 20);
    const initialMonthlyPMI = pmiRequired
      ? (loanAmount * (pmiRate / 100)) / 12
      : 0;
    const totalMonthly =
      monthlyPI + monthlyTax + monthlyIns + hoaMonthly + initialMonthlyPMI;

    // Calendar-year amortization schedule (exact partial first & last year just like mortgagecalculator.org)
    let balance = loanAmount;
    const r = interestRate / 100 / 12;
    let totalInterest = 0;
    let totalTaxPaid = 0;
    let totalInsPaid = 0;
    let totalHoaPmiPaid = 0;

    const byYear = new Map<
      number,
      {
        year: number;
        principalPaid: number;
        interestPaid: number;
        taxesFeesPaid: number;
        endingBalance: number;
      }
    >();

    for (let i = 0; i < totalMonths; i++) {
      const calYear = startYear + Math.floor((startMonth + i) / 12);
      const intPart = balance * r;
      const prinPart = Math.min(balance, Math.max(0, monthlyPI - intPart));
      balance = Math.max(0, balance - prinPart);

      // PMI drops off automatically on Conventional once LTV <= 78%
      const ltv = homePrice > 0 ? balance / homePrice : 0;
      const monthPmi =
        loanType === "FHA"
          ? initialMonthlyPMI
          : loanType === "Conventional" && pmiRequired && ltv > 0.78
          ? initialMonthlyPMI
          : loanType === "USDA" && pmiRequired
          ? initialMonthlyPMI
          : 0;

      const monthTaxesFees = monthlyTax + monthlyIns + hoaMonthly + monthPmi;

      totalInterest += intPart;
      totalTaxPaid += monthlyTax;
      totalInsPaid += monthlyIns;
      totalHoaPmiPaid += hoaMonthly + monthPmi;

      const existing = byYear.get(calYear) || {
        year: calYear,
        principalPaid: 0,
        interestPaid: 0,
        taxesFeesPaid: 0,
        endingBalance: balance,
      };
      existing.principalPaid += prinPart;
      existing.interestPaid += intPart;
      existing.taxesFeesPaid += monthTaxesFees;
      existing.endingBalance = balance;
      byYear.set(calYear, existing);
    }

    const yearlyRows = Array.from(byYear.values());
    const payoffTotalMonths = startMonth + totalMonths - 1;
    const payoffYear = startYear + Math.floor(payoffTotalMonths / 12);
    const payoffMonthName = MONTH_NAMES[((payoffTotalMonths % 12) + 12) % 12];
    const payoffDateLabel = `${payoffMonthName}, ${payoffYear}`;

    const totalAllPayments =
      loanAmount +
      totalInterest +
      totalTaxPaid +
      totalInsPaid +
      totalHoaPmiPaid;

    return {
      loanAmount,
      totalMonths,
      monthlyPI,
      monthlyTax,
      monthlyIns,
      pmiRequired,
      monthlyPMI: initialMonthlyPMI,
      totalMonthly,
      annualPayment: totalMonthly * 12,
      totalInterest,
      totalTaxPaid,
      totalInsPaid,
      totalAllPayments,
      payoffDateLabel,
      yearlyRows,
    };
  }, [
    homePrice,
    downPaymentAmount,
    downPaymentPct,
    interestRate,
    termYears,
    startMonth,
    startYear,
    propertyTaxYearly,
    pmiRate,
    insuranceYearly,
    hoaMonthly,
    loanType,
  ]);

  const handleShareCalculation = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("hp", String(homePrice));
      url.searchParams.set("dp", String(Math.round(downPaymentAmount)));
      url.searchParams.set("r", String(interestRate));
      url.searchParams.set("t", String(termYears));
      url.searchParams.set("tax", String(propertyTaxYearly));
      url.searchParams.set("ins", String(insuranceYearly));
      url.searchParams.set("hoa", String(hoaMonthly));
      await navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  const tableRows = result.yearlyRows.map((row) => [
    String(row.year),
    formatCurrency(row.principalPaid, currency),
    formatCurrency(row.interestPaid, currency),
    formatCurrency(row.taxesFeesPaid, currency),
    formatCurrency(row.endingBalance, currency),
  ]);

  return (
    <div className="space-y-6">
      {/* Top Full-Width Header Bar & Dual-Axis Amortization Combo Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-teal-900 to-sky-900 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm sm:text-base font-bold tracking-tight">
            Your Mortgage Payment Information
          </h2>
          <button
            type="button"
            onClick={() =>
              setChartView((prev) =>
                prev === "amortization" ? "breakdown" : "amortization"
              )
            }
            className="text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg transition cursor-pointer print:hidden"
          >
            {chartView === "amortization"
              ? "View Loan Breakdown"
              : "View Amortization Chart"}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {chartView === "amortization" ? (
            <AmortizationComboChart
              formatYAxis={(v) => formatCompactCurrency(v, currency)}
              data={result.yearlyRows.map((r) => ({
                year: r.year,
                principal: r.principalPaid,
                interest: r.interestPaid,
                taxesFees: r.taxesFeesPaid,
                balance: r.endingBalance,
                principalFormatted: formatCurrency(r.principalPaid, currency, 0),
                interestFormatted: formatCurrency(r.interestPaid, currency, 0),
                taxesFeesFormatted: formatCurrency(r.taxesFeesPaid, currency, 0),
                balanceFormatted: formatCurrency(r.endingBalance, currency, 0),
              }))}
            />
          ) : (
            <div className="max-w-xl mx-auto py-2">
              <DonutChart
                centerLabel="Monthly Total"
                centerValue={formatCompactCurrency(result.totalMonthly, currency)}
                slices={[
                  {
                    label: "Principal & Interest",
                    value: result.monthlyPI,
                    color: "#134e4a",
                    formattedValue: formatCurrency(result.monthlyPI, currency),
                  },
                  {
                    label: "Property Taxes",
                    value: result.monthlyTax,
                    color: "#0284c7",
                    formattedValue: formatCurrency(result.monthlyTax, currency),
                  },
                  {
                    label: "Home Insurance",
                    value: result.monthlyIns,
                    color: "#38bdf8",
                    formattedValue: formatCurrency(result.monthlyIns, currency),
                  },
                  {
                    label: "HOA & PMI",
                    value: hoaMonthly + result.monthlyPMI,
                    color: "#f59e0b",
                    formattedValue: formatCurrency(
                      hoaMonthly + result.monthlyPMI,
                      currency
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Workspace: Left Form + Right Mortgage Repayment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Structured Mortgage Input Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3.5">
          <NumberField
            label="Home Value"
            value={homePrice}
            onChange={setHomePrice}
            prefix={currency.symbol}
            step={5000}
          />

          {/* Down Payment with $ / % Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">
                Down Payment
              </label>
              <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleModeSwitch("amount")}
                  className={`px-2.5 py-0.5 cursor-pointer transition ${
                    downPaymentMode === "amount"
                      ? "bg-teal-800 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {currency.symbol}
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch("percent")}
                  className={`px-2.5 py-0.5 cursor-pointer transition ${
                    downPaymentMode === "percent"
                      ? "bg-teal-800 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  %
                </button>
              </div>
            </div>
            <div className="relative flex items-center">
              {downPaymentMode === "amount" && (
                <span className="absolute left-3.5 text-sm font-medium text-slate-500 pointer-events-none">
                  {currency.symbol}
                </span>
              )}
              <input
                type="number"
                value={Number.isFinite(downPaymentValue) ? downPaymentValue : 0}
                min={0}
                max={downPaymentMode === "percent" ? 100 : homePrice}
                step={downPaymentMode === "percent" ? 1 : 1000}
                onChange={(e) => {
                  const parsed = parseFloat(e.target.value);
                  setDownPaymentValue(Number.isFinite(parsed) ? parsed : 0);
                }}
                className={`w-full rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none ${
                  downPaymentMode === "amount" ? "pl-9 pr-3.5" : "pl-3.5 pr-10"
                }`}
              />
              {downPaymentMode === "percent" && (
                <span className="absolute right-3.5 text-xs font-medium text-slate-500 pointer-events-none">
                  %
                </span>
              )}
            </div>
          </div>

          <NumberField
            label="Loan Amount"
            value={Math.round(result.loanAmount)}
            onChange={handleLoanAmountChange}
            prefix={currency.symbol}
            step={5000}
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              suffix="%"
              step={0.05}
              max={30}
            />
            <NumberField
              label="Loan Term"
              value={termYears}
              onChange={setTermYears}
              suffix="yrs"
              min={1}
              max={50}
            />
          </div>

          {/* Start Date (Month + Year) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Start Date
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(Number(e.target.value))}
                aria-label="Start month"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={startYear}
                min={2000}
                max={2080}
                onChange={(e) =>
                  setStartYear(parseInt(e.target.value, 10) || 2026)
                }
                aria-label="Start year"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
            <NumberField
              label="Property Tax"
              value={propertyTaxYearly}
              onChange={setPropertyTaxYearly}
              prefix={currency.symbol}
              suffix="/yr"
              step={100}
            />
            <NumberField
              label="PMI"
              value={pmiRate}
              onChange={setPmiRate}
              suffix="%"
              step={0.1}
              max={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Home Ins"
              value={insuranceYearly}
              onChange={setInsuranceYearly}
              prefix={currency.symbol}
              suffix="/yr"
              step={100}
            />
            <NumberField
              label="Monthly HOA"
              value={hoaMonthly}
              onChange={setHoaMonthly}
              prefix={currency.symbol}
              step={25}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Loan Type"
              value={loanType}
              onChange={setLoanType}
              options={[
                { label: "Conventional", value: "Conventional" },
                { label: "FHA", value: "FHA" },
                { label: "VA (0% PMI)", value: "VA" },
                { label: "USDA", value: "USDA" },
              ]}
            />
            <SelectField
              label="Buy or Refi"
              value={purpose}
              onChange={setPurpose}
              options={[
                { label: "Buy", value: "Buy" },
                { label: "Refi", value: "Refi" },
              ]}
            />
          </div>
        </div>

        {/* Right: Mortgage Repayment Summary Ledger */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Mortgage Repayment Summary
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {loanType} Loan • {purpose === "Buy" ? "Home Purchase" : "Refinance"} •{" "}
                  {termYears}-Year Fixed at {interestRate}%
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Payoff: {result.payoffDateLabel}
              </span>
            </div>

            {/* 2-Column Clean Ledger Grid (inspired by mortgagecalculator.org) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-5">
              <div className="pb-4 border-b border-slate-100">
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">
                  {formatCurrency(result.totalMonthly, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Total Monthly Payment
                </p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900">
                  {result.pmiRequired
                    ? `${formatCurrency(result.monthlyPMI, currency)}/mo`
                    : "Not required"}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  PMI ({loanType === "VA" ? "Exempt on VA" : downPaymentPct >= 20 ? "20%+ down" : `${pmiRate}% annual`})
                </p>
              </div>

              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(downPaymentAmount, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Down payment amount
                </p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatPercent(downPaymentPct)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Down payment %
                </p>
              </div>

              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900">
                  {result.payoffDateLabel}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Loan pay-off date
                </p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.totalInterest, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Total Interest Paid
                </p>
              </div>

              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.monthlyTax, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Monthly Tax Paid
                </p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.totalTaxPaid, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Total Tax Paid
                </p>
              </div>

              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.monthlyIns, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Monthly Home Insurance
                </p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.totalInsPaid, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Total Home Insurance
                </p>
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.annualPayment, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Annual Payment Amount
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-900 tabular-nums">
                  {formatCurrency(result.totalAllPayments, currency)}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Total of {result.totalMonths} Payments
                </p>
              </div>
            </div>

            {/* Action Buttons: Amortization Toggle, Printer Friendly, Share This Calculation */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-2.5 print:hidden">
              <button
                type="button"
                onClick={() => setShowTable((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition cursor-pointer"
              >
                {showTable ? (
                  <>
                    <ChevronUp className="w-4 h-4" /> Hide Amortization Table
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" /> Show Amortization Table
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Printer Friendly Page
              </button>
              <button
                type="button"
                onClick={handleShareCalculation}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Share This Calculation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTable && (
        <ScheduleTable
          title={`Annual Mortgage Amortization Schedule (${startYear} – ${
            result.yearlyRows[result.yearlyRows.length - 1]?.year || startYear
          })`}
          headers={[
            "Year",
            "Principal Paid",
            "Interest Paid",
            "Taxes & Fees",
            "Ending Balance",
          ]}
          rows={tableRows}
          onDownloadCsv={() =>
            downloadCSV(
              "mortgage-amortization-schedule.csv",
              [
                "Year",
                "Principal Paid",
                "Interest Paid",
                "Taxes & Fees",
                "Ending Balance",
              ],
              result.yearlyRows.map((r) => [
                r.year,
                r.principalPaid.toFixed(2),
                r.interestPaid.toFixed(2),
                r.taxesFeesPaid.toFixed(2),
                r.endingBalance.toFixed(2),
              ])
            )
          }
        />
      )}
    </div>
  );
}

export function AutoLoanCalculator() {
  const { currency } = useCurrency();
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(6000);
  const [tradeIn, setTradeIn] = useState(4000);
  const [salesTaxRate, setSalesTaxRate] = useState(7.0);
  const [apr, setApr] = useState(6.2);
  const [termMonths, setTermMonths] = useState(60);

  const result = useMemo(() => {
    const taxableAmount = Math.max(0, vehiclePrice - tradeIn);
    const salesTax = taxableAmount * (salesTaxRate / 100);
    const loanAmount = Math.max(0, vehiclePrice + salesTax - downPayment - tradeIn);
    const monthlyPayment = calcMonthlyPayment(loanAmount, apr, termMonths);
    const totalPayments = monthlyPayment * termMonths;
    const totalInterest = Math.max(0, totalPayments - loanAmount);
    const totalCost = vehiclePrice + salesTax + totalInterest;

    return {
      salesTax,
      loanAmount,
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalCost,
    };
  }, [vehiclePrice, downPayment, tradeIn, salesTaxRate, apr, termMonths]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Vehicle &amp; Loan Info</h2>
        <NumberField
          label="Vehicle Price"
          value={vehiclePrice}
          onChange={setVehiclePrice}
          prefix={currency.symbol}
          step={500}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            prefix={currency.symbol}
            step={500}
          />
          <NumberField
            label="Trade-In Value"
            value={tradeIn}
            onChange={setTradeIn}
            prefix={currency.symbol}
            step={500}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Interest Rate (APR)"
            value={apr}
            onChange={setApr}
            suffix="%"
            step={0.1}
            max={35}
          />
          <NumberField
            label="Sales Tax"
            value={salesTaxRate}
            onChange={setSalesTaxRate}
            suffix="%"
            step={0.25}
            max={25}
          />
        </div>
        <SelectField
          label="Loan Term"
          value={termMonths}
          onChange={setTermMonths}
          options={[
            { label: "36 Months (3 Years)", value: 36 },
            { label: "48 Months (4 Years)", value: 48 },
            { label: "60 Months (5 Years)", value: 60 },
            { label: "72 Months (6 Years)", value: 72 },
            { label: "84 Months (7 Years)", value: 84 },
          ]}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Monthly Car Payment"
          value={formatCurrency(result.monthlyPayment, currency)}
          subtext={`Financed Loan Amount: ${formatCurrency(
            result.loanAmount,
            currency,
            0
          )} over ${termMonths} months`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Sales Tax"
            value={formatCurrency(result.salesTax, currency, 0)}
          />
          <StatCard
            label="Total Loan Interest"
            value={formatCurrency(result.totalInterest, currency, 0)}
          />
          <StatCard
            label="Total Out-of-Pocket"
            value={formatCurrency(result.totalCost, currency, 0)}
            highlight
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Total Cost Breakdown
          </h3>
          <DonutChart
            centerLabel="Total Cost"
            centerValue={formatCompactCurrency(result.totalCost, currency)}
            slices={[
              {
                label: "Financed Principal",
                value: result.loanAmount,
                color: "#0f766e",
                formattedValue: formatCurrency(result.loanAmount, currency, 0),
              },
              {
                label: "Down Payment + Trade-In",
                value: downPayment + tradeIn,
                color: "#10b981",
                formattedValue: formatCurrency(
                  downPayment + tradeIn,
                  currency,
                  0
                ),
              },
              {
                label: "Total Interest",
                value: result.totalInterest,
                color: "#f59e0b",
                formattedValue: formatCurrency(result.totalInterest, currency, 0),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function LoanAmortizationCalculator() {
  const { currency } = useCurrency();
  const [loanAmount, setLoanAmount] = useState(50000);
  const [apr, setApr] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [extraMonthly, setExtraMonthly] = useState(150);

  const result = useMemo(() => {
    const months = Math.max(1, termYears * 12);
    const basePayment = calcMonthlyPayment(loanAmount, apr, months);
    const r = apr / 100 / 12;

    const simulate = (extra: number) => {
      let bal = loanAmount;
      let totalInt = 0;
      let mCount = 0;
      const yearly: {
        year: number;
        principal: number;
        interest: number;
        balance: number;
      }[] = [];

      while (bal > 0.01 && mCount < months + 12) {
        const yearIdx = Math.floor(mCount / 12) + 1;
        let entry = yearly.find((y) => y.year === yearIdx);
        if (!entry) {
          entry = { year: yearIdx, principal: 0, interest: 0, balance: bal };
          yearly.push(entry);
        }
        const intPart = bal * r;
        const prinPart = Math.min(bal, Math.max(0, basePayment - intPart + extra));
        bal = Math.max(0, bal - prinPart);
        totalInt += intPart;
        entry.principal += prinPart;
        entry.interest += intPart;
        entry.balance = bal;
        mCount++;
        if (basePayment + extra <= intPart && bal > 0) break;
      }

      return { totalInt, monthsUsed: mCount, yearly };
    };

    const baseline = simulate(0);
    const accelerated = simulate(Math.max(0, extraMonthly));

    return {
      basePayment,
      baselineInterest: baseline.totalInt,
      acceleratedInterest: accelerated.totalInt,
      interestSaved: Math.max(0, baseline.totalInt - accelerated.totalInt),
      monthsSaved: Math.max(0, baseline.monthsUsed - accelerated.monthsUsed),
      payoffMonths: accelerated.monthsUsed,
      yearly: accelerated.yearly,
    };
  }, [loanAmount, apr, termYears, extraMonthly]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Loan Parameters</h2>
          <NumberField
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix={currency.symbol}
            step={1000}
          />
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Interest Rate (APR)"
              value={apr}
              onChange={setApr}
              suffix="%"
              step={0.1}
              max={40}
            />
            <NumberField
              label="Loan Term"
              value={termYears}
              onChange={setTermYears}
              suffix="yrs"
              min={1}
              max={40}
            />
          </div>
          <NumberField
            label="Extra Monthly Payment"
            value={extraMonthly}
            onChange={setExtraMonthly}
            prefix={currency.symbol}
            step={25}
            hint="Applied to principal"
          />
        </div>

        <div className="lg:col-span-7 space-y-5">
          <PrimaryResultCard
            label="Scheduled Monthly Payment"
            value={formatCurrency(result.basePayment, currency)}
            subtext={
              extraMonthly > 0
                ? `With +${formatCurrency(extraMonthly, currency, 0)}/mo extra: pay off in ${
                    result.payoffMonths
                  } months (${result.monthsSaved} months earlier!)`
                : `Payoff timeline: ${result.payoffMonths} months`
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Total Interest"
              value={formatCurrency(result.acceleratedInterest, currency, 0)}
            />
            <StatCard
              label="Interest Saved"
              value={formatCurrency(result.interestSaved, currency, 0)}
              highlight
            />
            <StatCard
              label="Time Saved"
              value={`${result.monthsSaved} mos`}
              highlight
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Annual Principal vs. Interest Paid
            </h3>
            <StackedBarChart
              primaryLabel="Principal"
              secondaryLabel="Interest"
              primaryColor="#0f766e"
              secondaryColor="#f59e0b"
              data={result.yearly.map((y) => ({
                label: `Yr ${y.year}`,
                primary: y.principal,
                secondary: y.interest,
                primaryFormatted: formatCurrency(y.principal, currency, 0),
                secondaryFormatted: formatCurrency(y.interest, currency, 0),
              }))}
            />
          </div>
        </div>
      </div>

      <ScheduleTable
        title="Year-by-Year Amortization Schedule"
        headers={["Year", "Principal Paid", "Interest Paid", "Remaining Balance"]}
        rows={result.yearly.map((y) => [
          `Year ${y.year}`,
          formatCurrency(y.principal, currency),
          formatCurrency(y.interest, currency),
          formatCurrency(y.balance, currency),
        ])}
        onDownloadCsv={() =>
          downloadCSV(
            "loan-amortization.csv",
            ["Year", "Principal Paid", "Interest Paid", "Remaining Balance"],
            result.yearly.map((y) => [
              y.year,
              y.principal.toFixed(2),
              y.interest.toFixed(2),
              y.balance.toFixed(2),
            ])
          )
        }
      />
    </div>
  );
}

export function RentalPropertyCalculator() {
  const { currency } = useCurrency();
  const [purchasePrice, setPurchasePrice] = useState(320000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [closingCosts, setClosingCosts] = useState(8000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(2600);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [monthlyExpenses, setMonthlyExpenses] = useState(680);

  const result = useMemo(() => {
    const downPayment = purchasePrice * (downPaymentPct / 100);
    const loanAmount = Math.max(0, purchasePrice - downPayment);
    const totalCashInvested = downPayment + closingCosts;
    const monthlyMortgage = calcMonthlyPayment(
      loanAmount,
      interestRate,
      loanTermYears * 12
    );

    const grossAnnualRent = monthlyRent * 12;
    const effectiveAnnualRent = grossAnnualRent * (1 - vacancyRate / 100);
    const annualExpenses = monthlyExpenses * 12;
    const noi = effectiveAnnualRent - annualExpenses;
    const annualCashFlow = noi - monthlyMortgage * 12;
    const monthlyCashFlow = annualCashFlow / 12;
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
    const cashOnCash =
      totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

    return {
      downPayment,
      totalCashInvested,
      monthlyMortgage,
      effectiveAnnualRent,
      annualExpenses,
      noi,
      annualCashFlow,
      monthlyCashFlow,
      capRate,
      cashOnCash,
    };
  }, [
    purchasePrice,
    downPaymentPct,
    closingCosts,
    interestRate,
    loanTermYears,
    monthlyRent,
    vacancyRate,
    monthlyExpenses,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Property &amp; Income</h2>
        <NumberField
          label="Purchase Price"
          value={purchasePrice}
          onChange={setPurchasePrice}
          prefix={currency.symbol}
          step={5000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Down Payment"
            value={downPaymentPct}
            onChange={setDownPaymentPct}
            suffix="%"
            max={100}
          />
          <NumberField
            label="Closing & Rehab"
            value={closingCosts}
            onChange={setClosingCosts}
            prefix={currency.symbol}
            step={500}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Mortgage Rate"
            value={interestRate}
            onChange={setInterestRate}
            suffix="%"
            step={0.1}
          />
          <SelectField
            label="Loan Term"
            value={loanTermYears}
            onChange={setLoanTermYears}
            options={[
              { label: "30 Years", value: 30 },
              { label: "20 Years", value: 20 },
              { label: "15 Years", value: 15 },
            ]}
          />
        </div>
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
          <NumberField
            label="Monthly Gross Rent"
            value={monthlyRent}
            onChange={setMonthlyRent}
            prefix={currency.symbol}
            step={50}
          />
          <NumberField
            label="Vacancy Rate"
            value={vacancyRate}
            onChange={setVacancyRate}
            suffix="%"
            max={50}
          />
        </div>
        <NumberField
          label="Monthly Operating Expenses"
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
          prefix={currency.symbol}
          step={25}
          hint="Tax, insurance, repairs, mgmt"
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Monthly Cash Flow"
          value={formatCurrency(result.monthlyCashFlow, currency)}
          accent={result.monthlyCashFlow >= 0 ? "emerald" : "rose"}
          subtext={`Annual Cash Flow: ${formatCurrency(
            result.annualCashFlow,
            currency,
            0
          )} • Total Cash Invested: ${formatCurrency(
            result.totalCashInvested,
            currency,
            0
          )}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Cap Rate"
            value={formatPercent(result.capRate)}
            highlight
          />
          <StatCard
            label="Cash-on-Cash Return"
            value={formatPercent(result.cashOnCash)}
            highlight
          />
          <StatCard
            label="Annual NOI"
            value={formatCurrency(result.noi, currency, 0)}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Annual Cash Allocation
          </h3>
          <DonutChart
            centerLabel="Effective Rent"
            centerValue={formatCompactCurrency(
              result.effectiveAnnualRent,
              currency
            )}
            slices={[
              {
                label: "Mortgage Debt Service",
                value: result.monthlyMortgage * 12,
                color: "#0f766e",
                formattedValue: formatCurrency(
                  result.monthlyMortgage * 12,
                  currency,
                  0
                ),
              },
              {
                label: "Operating Expenses",
                value: result.annualExpenses,
                color: "#f59e0b",
                formattedValue: formatCurrency(
                  result.annualExpenses,
                  currency,
                  0
                ),
              },
              {
                label: "Net Cash Flow",
                value: Math.max(0, result.annualCashFlow),
                color: "#10b981",
                formattedValue: formatCurrency(result.annualCashFlow, currency, 0),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
