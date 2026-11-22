"use client";

import React, { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useCurrency } from "@/components/CurrencyContext";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "@/lib/currency";
import { DonutChart } from "@/components/Charts";
import {
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/CalculatorUI";

interface DebtItem {
  id: number;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

function simulateDebtPayoff(
  debts: DebtItem[],
  extraBudget: number,
  strategy: "avalanche" | "snowball"
) {
  const items = debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d }));

  let months = 0;
  let totalInterest = 0;
  const maxMonths = 600;

  while (items.some((d) => d.balance > 0.01) && months < maxMonths) {
    months++;
    let pool = Math.max(0, extraBudget);

    // Accrue interest & pay minimums
    for (const d of items) {
      if (d.balance <= 0.01) {
        pool += d.minPayment; // Roll paid-off minimum into pool
        continue;
      }
      const monthlyInt = d.balance * (d.apr / 100 / 12);
      totalInterest += monthlyInt;
      d.balance += monthlyInt;

      const pay = Math.min(d.balance, d.minPayment);
      d.balance -= pay;
      if (pay < d.minPayment) {
        pool += d.minPayment - pay;
      }
    }

    // Sort active debts by chosen strategy
    const active = items.filter((d) => d.balance > 0.01);
    active.sort((a, b) =>
      strategy === "avalanche" ? b.apr - a.apr : a.balance - b.balance
    );

    // Apply extra pool
    for (const target of active) {
      if (pool <= 0.01) break;
      const extraPay = Math.min(target.balance, pool);
      target.balance -= extraPay;
      pool -= extraPay;
    }
  }

  return { months, totalInterest, paidOff: months < maxMonths };
}

export function DebtPayoffCalculator() {
  const { currency } = useCurrency();
  const [extraMonthly, setExtraMonthly] = useState(300);
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: 1, name: "Credit Card A", balance: 6500, apr: 24.9, minPayment: 195 },
    { id: 2, name: "Personal Loan", balance: 11000, apr: 11.5, minPayment: 280 },
    { id: 3, name: "Store Card", balance: 2200, apr: 21.0, minPayment: 75 },
  ]);

  const updateDebt = (
    id: number,
    field: keyof Omit<DebtItem, "id">,
    value: string | number
  ) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const addDebt = () => {
    setDebts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Debt ${prev.length + 1}`,
        balance: 3000,
        apr: 18,
        minPayment: 100,
      },
    ]);
  };

  const removeDebt = (id: number) => {
    setDebts((prev) => (prev.length > 1 ? prev.filter((d) => d.id !== id) : prev));
  };

  const result = useMemo(() => {
    const totalBalance = debts.reduce((s, d) => s + Math.max(0, d.balance), 0);
    const totalMin = debts.reduce((s, d) => s + Math.max(0, d.minPayment), 0);
    const avalanche = simulateDebtPayoff(debts, extraMonthly, "avalanche");
    const snowball = simulateDebtPayoff(debts, extraMonthly, "snowball");
    const minimumOnly = simulateDebtPayoff(debts, 0, "avalanche");
    const interestSavedVsMin = Math.max(
      0,
      minimumOnly.totalInterest - avalanche.totalInterest
    );
    const avalancheAdvantage = Math.max(
      0,
      snowball.totalInterest - avalanche.totalInterest
    );

    return {
      totalBalance,
      totalMin,
      avalanche,
      snowball,
      interestSavedVsMin,
      avalancheAdvantage,
    };
  }, [debts, extraMonthly]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Your Debts</h2>
            <button
              type="button"
              onClick={addDebt}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Debt
            </button>
          </div>

          <div className="space-y-3">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                    aria-label="Debt name"
                    className="text-sm font-semibold text-slate-900 bg-transparent border-b border-transparent focus:border-emerald-600 focus:outline-none w-full"
                  />
                  {debts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDebt(debt.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      aria-label="Remove debt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <NumberField
                    label="Balance"
                    value={debt.balance}
                    onChange={(v) => updateDebt(debt.id, "balance", v)}
                    prefix={currency.symbol}
                    step={250}
                  />
                  <NumberField
                    label="APR"
                    value={debt.apr}
                    onChange={(v) => updateDebt(debt.id, "apr", v)}
                    suffix="%"
                    step={0.5}
                    max={60}
                  />
                  <NumberField
                    label="Min Pay"
                    value={debt.minPayment}
                    onChange={(v) => updateDebt(debt.id, "minPayment", v)}
                    prefix={currency.symbol}
                    step={10}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <NumberField
              label="Extra Monthly Payment Budget"
              value={extraMonthly}
              onChange={setExtraMonthly}
              prefix={currency.symbol}
              step={50}
              hint={`Total monthly: ${formatCurrency(
                result.totalMin + extraMonthly,
                currency,
                0
              )}`}
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <PrimaryResultCard
            label="Debt-Free Timeline (Avalanche)"
            value={`${result.avalanche.months} months (${(
              result.avalanche.months / 12
            ).toFixed(1)} yrs)`}
            subtext={`Total Debt: ${formatCurrency(
              result.totalBalance,
              currency,
              0
            )} • Saves ${formatCurrency(
              result.interestSavedVsMin,
              currency,
              0
            )} vs. paying minimums only`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Debt Avalanche
                </span>
                <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Lowest Cost
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">
                {result.avalanche.months} mos
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Total Interest:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(result.avalanche.totalInterest, currency, 0)}
                </strong>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Debt Snowball
                </span>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  Quick Wins
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">
                {result.snowball.months} mos
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Total Interest:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(result.snowball.totalInterest, currency, 0)}
                </strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Avalanche Savings vs. Snowball"
              value={formatCurrency(result.avalancheAdvantage, currency, 0)}
              highlight
            />
            <StatCard
              label="Total Monthly Payment"
              value={formatCurrency(result.totalMin + extraMonthly, currency, 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreditCardPayoffCalculator() {
  const { currency } = useCurrency();
  const [balance, setBalance] = useState(5500);
  const [apr, setApr] = useState(22.9);
  const [monthlyPayment, setMonthlyPayment] = useState(220);

  const result = useMemo(() => {
    const r = apr / 100 / 12;
    const minMonthlyInterest = balance * r;
    const canPayOff = monthlyPayment > minMonthlyInterest;

    if (!canPayOff || balance <= 0) {
      return {
        canPayOff: false,
        months: 0,
        totalInterest: 0,
        totalPaid: 0,
        minMonthlyInterest,
      };
    }

    let bal = balance;
    let months = 0;
    let totalInterest = 0;
    while (bal > 0.01 && months < 600) {
      const interest = bal * r;
      totalInterest += interest;
      bal = bal + interest - monthlyPayment;
      months++;
    }

    return {
      canPayOff: true,
      months,
      totalInterest,
      totalPaid: balance + totalInterest,
      minMonthlyInterest,
    };
  }, [balance, apr, monthlyPayment]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Card Balance Details</h2>
        <NumberField
          label="Credit Card Balance"
          value={balance}
          onChange={setBalance}
          prefix={currency.symbol}
          step={250}
        />
        <NumberField
          label="Annual Percentage Rate (APR)"
          value={apr}
          onChange={setApr}
          suffix="%"
          step={0.5}
          max={60}
        />
        <NumberField
          label="Planned Monthly Payment"
          value={monthlyPayment}
          onChange={setMonthlyPayment}
          prefix={currency.symbol}
          step={20}
          hint={`Monthly interest: ~${formatCurrency(
            result.minMonthlyInterest,
            currency
          )}`}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Time to Become Credit-Card Free"
          value={
            result.canPayOff
              ? `${result.months} months (${(result.months / 12).toFixed(1)} yrs)`
              : "Payment too low"
          }
          accent={result.canPayOff ? "emerald" : "rose"}
          subtext={
            result.canPayOff
              ? `Total Interest Paid: ${formatCurrency(
                  result.totalInterest,
                  currency,
                  0
                )}`
              : `Your payment must exceed ${formatCurrency(
                  result.minMonthlyInterest,
                  currency
                )}/mo to reduce the balance.`
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Original Balance"
            value={formatCurrency(balance, currency, 0)}
          />
          <StatCard
            label="Total Interest"
            value={formatCurrency(result.totalInterest, currency, 0)}
          />
          <StatCard
            label="Total Paid Back"
            value={formatCurrency(result.totalPaid, currency, 0)}
            highlight
          />
        </div>
      </div>
    </div>
  );
}

export function SalaryConverterCalculator() {
  const { currency } = useCurrency();
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(22);

  const result = useMemo(() => {
    const totalHours = Math.max(1, hoursPerWeek * weeksPerYear);
    const hourlyGross = annualSalary / totalHours;
    const weeklyGross = annualSalary / Math.max(1, weeksPerYear);
    const biweeklyGross = annualSalary / 26;
    const monthlyGross = annualSalary / 12;

    const taxMultiplier = 1 - Math.min(80, Math.max(0, effectiveTaxRate)) / 100;
    const annualNet = annualSalary * taxMultiplier;
    const monthlyNet = annualNet / 12;
    const biweeklyNet = annualNet / 26;
    const hourlyNet = hourlyGross * taxMultiplier;
    const annualTax = annualSalary - annualNet;

    return {
      hourlyGross,
      weeklyGross,
      biweeklyGross,
      monthlyGross,
      annualNet,
      monthlyNet,
      biweeklyNet,
      hourlyNet,
      annualTax,
    };
  }, [annualSalary, hoursPerWeek, weeksPerYear, effectiveTaxRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Compensation Inputs</h2>
        <NumberField
          label="Gross Annual Salary"
          value={annualSalary}
          onChange={setAnnualSalary}
          prefix={currency.symbol}
          step={2500}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Hours / Week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            suffix="hrs"
            min={1}
            max={80}
          />
          <NumberField
            label="Paid Weeks / Yr"
            value={weeksPerYear}
            onChange={setWeeksPerYear}
            suffix="wks"
            min={1}
            max={52}
          />
        </div>
        <NumberField
          label="Estimated Effective Tax Rate"
          value={effectiveTaxRate}
          onChange={setEffectiveTaxRate}
          suffix="%"
          max={70}
          hint="Federal + State + Payroll"
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Net Monthly Take-Home"
          value={formatCurrency(result.monthlyNet, currency, 0)}
          subtext={`Annual Net Pay: ${formatCurrency(
            result.annualNet,
            currency,
            0
          )} • Gross Hourly: ${formatCurrency(result.hourlyGross, currency)}/hr`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Hourly (Gross)"
            value={formatCurrency(result.hourlyGross, currency)}
            subtext={`Net: ${formatCurrency(result.hourlyNet, currency)}`}
          />
          <StatCard
            label="Bi-Weekly (Net)"
            value={formatCurrency(result.biweeklyNet, currency, 0)}
            subtext={`Gross: ${formatCurrency(result.biweeklyGross, currency, 0)}`}
          />
          <StatCard
            label="Monthly (Gross)"
            value={formatCurrency(result.monthlyGross, currency, 0)}
          />
          <StatCard
            label="Est. Annual Taxes"
            value={formatCurrency(result.annualTax, currency, 0)}
            highlight
          />
        </div>
      </div>
    </div>
  );
}

export function NetWorthCalculator() {
  const { currency } = useCurrency();
  const [cashSavings, setCashSavings] = useState(25000);
  const [investments, setInvestments] = useState(95000);
  const [realEstate, setRealEstate] = useState(380000);
  const [otherAssets, setOtherAssets] = useState(22000);

  const [mortgageDebt, setMortgageDebt] = useState(260000);
  const [autoStudentDebt, setAutoStudentDebt] = useState(18000);
  const [creditCardDebt, setCreditCardDebt] = useState(4500);

  const result = useMemo(() => {
    const totalAssets = cashSavings + investments + realEstate + otherAssets;
    const totalLiabilities = mortgageDebt + autoStudentDebt + creditCardDebt;
    const netWorth = totalAssets - totalLiabilities;
    const debtToAsset =
      totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAsset,
    };
  }, [
    cashSavings,
    investments,
    realEstate,
    otherAssets,
    mortgageDebt,
    autoStudentDebt,
    creditCardDebt,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Assets (What You Own)</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Cash & Savings"
            value={cashSavings}
            onChange={setCashSavings}
            prefix={currency.symbol}
            step={1000}
          />
          <NumberField
            label="Investments / 401k"
            value={investments}
            onChange={setInvestments}
            prefix={currency.symbol}
            step={2500}
          />
          <NumberField
            label="Real Estate Value"
            value={realEstate}
            onChange={setRealEstate}
            prefix={currency.symbol}
            step={5000}
          />
          <NumberField
            label="Vehicles / Other"
            value={otherAssets}
            onChange={setOtherAssets}
            prefix={currency.symbol}
            step={1000}
          />
        </div>

        <h2 className="text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
          Liabilities (What You Owe)
        </h2>
        <NumberField
          label="Mortgage Balance"
          value={mortgageDebt}
          onChange={setMortgageDebt}
          prefix={currency.symbol}
          step={5000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Auto / Student Loans"
            value={autoStudentDebt}
            onChange={setAutoStudentDebt}
            prefix={currency.symbol}
            step={500}
          />
          <NumberField
            label="Credit Cards / Other"
            value={creditCardDebt}
            onChange={setCreditCardDebt}
            prefix={currency.symbol}
            step={250}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Your Estimated Net Worth"
          value={formatCurrency(result.netWorth, currency, 0)}
          accent={result.netWorth >= 0 ? "emerald" : "rose"}
          subtext={`Debt-to-Asset Ratio: ${formatPercent(result.debtToAsset, 1)}`}
        />
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Total Assets"
            value={formatCurrency(result.totalAssets, currency, 0)}
            highlight
          />
          <StatCard
            label="Total Liabilities"
            value={formatCurrency(result.totalLiabilities, currency, 0)}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Asset Allocation Snapshot
          </h3>
          <DonutChart
            centerLabel="Total Assets"
            centerValue={formatCompactCurrency(result.totalAssets, currency)}
            slices={[
              {
                label: "Cash & Savings",
                value: cashSavings,
                color: "#0284c7",
                formattedValue: formatCurrency(cashSavings, currency, 0),
              },
              {
                label: "Investments & Retirement",
                value: investments,
                color: "#10b981",
                formattedValue: formatCurrency(investments, currency, 0),
              },
              {
                label: "Real Estate",
                value: realEstate,
                color: "#0f766e",
                formattedValue: formatCurrency(realEstate, currency, 0),
              },
              {
                label: "Vehicles & Other",
                value: otherAssets,
                color: "#f59e0b",
                formattedValue: formatCurrency(otherAssets, currency, 0),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
