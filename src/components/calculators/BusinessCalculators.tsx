"use client";

import React, { useMemo, useState } from "react";
import { useCurrency } from "@/components/CurrencyContext";
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/currency";
import { DonutChart } from "@/components/Charts";
import {
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/CalculatorUI";

export function ProfitMarginCalculator() {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState(120);
  const [cogs, setCogs] = useState(48);
  const [operatingExpenses, setOperatingExpenses] = useState(24);
  const [unitsSold, setUnitsSold] = useState(500);

  const result = useMemo(() => {
    const grossProfit = revenue - cogs;
    const netProfit = revenue - cogs - operatingExpenses;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const markup = cogs > 0 ? (grossProfit / cogs) * 100 : 0;
    const totalRevenue = revenue * unitsSold;
    const totalNetProfit = netProfit * unitsSold;

    return {
      grossProfit,
      netProfit,
      grossMargin,
      netMargin,
      markup,
      totalRevenue,
      totalNetProfit,
    };
  }, [revenue, cogs, operatingExpenses, unitsSold]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Unit Pricing &amp; Costs</h2>
        <NumberField
          label="Selling Price (Revenue / Unit)"
          value={revenue}
          onChange={setRevenue}
          prefix={currency.symbol}
          step={5}
        />
        <NumberField
          label="Cost of Goods Sold (COGS / Unit)"
          value={cogs}
          onChange={setCogs}
          prefix={currency.symbol}
          step={2}
        />
        <NumberField
          label="Operating / Ad Costs / Unit"
          value={operatingExpenses}
          onChange={setOperatingExpenses}
          prefix={currency.symbol}
          step={2}
        />
        <NumberField
          label="Monthly Units Sold (Optional)"
          value={unitsSold}
          onChange={setUnitsSold}
          step={50}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Gross Profit Margin"
          value={formatPercent(result.grossMargin)}
          accent={result.netProfit >= 0 ? "emerald" : "rose"}
          subtext={`Net Profit Margin: ${formatPercent(
            result.netMargin
          )} • Markup on Cost: ${formatPercent(result.markup)}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Gross Profit / Unit"
            value={formatCurrency(result.grossProfit, currency)}
          />
          <StatCard
            label="Net Profit / Unit"
            value={formatCurrency(result.netProfit, currency)}
            highlight
          />
          <StatCard
            label={`Net Profit (${formatNumber(unitsSold)} units)`}
            value={formatCurrency(result.totalNetProfit, currency, 0)}
            highlight
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Revenue Breakdown per Unit
          </h3>
          <DonutChart
            centerLabel="Selling Price"
            centerValue={formatCompactCurrency(revenue, currency)}
            slices={[
              {
                label: "COGS",
                value: Math.max(0, cogs),
                color: "#0f766e",
                formattedValue: formatCurrency(cogs, currency),
              },
              {
                label: "Operating Expenses",
                value: Math.max(0, operatingExpenses),
                color: "#f59e0b",
                formattedValue: formatCurrency(operatingExpenses, currency),
              },
              {
                label: "Net Profit",
                value: Math.max(0, result.netProfit),
                color: "#10b981",
                formattedValue: formatCurrency(result.netProfit, currency),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function BreakEvenCalculator() {
  const { currency } = useCurrency();
  const [fixedCosts, setFixedCosts] = useState(12000);
  const [pricePerUnit, setPricePerUnit] = useState(85);
  const [variableCost, setVariableCost] = useState(35);
  const [targetProfit, setTargetProfit] = useState(5000);

  const result = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCost;
    const contributionMarginRatio =
      pricePerUnit > 0 ? (contributionMargin / pricePerUnit) * 100 : 0;
    const valid = contributionMargin > 0;
    const breakEvenUnits = valid ? Math.ceil(fixedCosts / contributionMargin) : 0;
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;
    const targetUnits = valid
      ? Math.ceil((fixedCosts + targetProfit) / contributionMargin)
      : 0;
    const targetRevenue = targetUnits * pricePerUnit;

    return {
      valid,
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      targetUnits,
      targetRevenue,
    };
  }, [fixedCosts, pricePerUnit, variableCost, targetProfit]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Cost Structure</h2>
        <NumberField
          label="Monthly Fixed Costs"
          value={fixedCosts}
          onChange={setFixedCosts}
          prefix={currency.symbol}
          step={500}
          hint="Rent, payroll, software"
        />
        <NumberField
          label="Selling Price per Unit"
          value={pricePerUnit}
          onChange={setPricePerUnit}
          prefix={currency.symbol}
          step={5}
        />
        <NumberField
          label="Variable Cost per Unit"
          value={variableCost}
          onChange={setVariableCost}
          prefix={currency.symbol}
          step={2}
          hint="Materials, shipping, fees"
        />
        <NumberField
          label="Target Monthly Profit (Optional)"
          value={targetProfit}
          onChange={setTargetProfit}
          prefix={currency.symbol}
          step={500}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Break-Even Sales Volume"
          value={
            result.valid
              ? `${formatNumber(result.breakEvenUnits)} units`
              : "Price must exceed variable cost"
          }
          accent={result.valid ? "emerald" : "rose"}
          subtext={
            result.valid
              ? `Break-Even Revenue: ${formatCurrency(
                  result.breakEvenRevenue,
                  currency,
                  0
                )}/month`
              : "Increase selling price or lower variable cost per unit."
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Contribution Margin"
            value={formatCurrency(result.contributionMargin, currency)}
            subtext={`${formatPercent(result.contributionMarginRatio, 1)} ratio`}
          />
          <StatCard
            label="Units for Target Profit"
            value={result.valid ? formatNumber(result.targetUnits) : "—"}
            highlight
          />
          <StatCard
            label="Revenue for Target Profit"
            value={
              result.valid
                ? formatCurrency(result.targetRevenue, currency, 0)
                : "—"
            }
            highlight
          />
        </div>
      </div>
    </div>
  );
}

export function BusinessROICalculator() {
  const { currency } = useCurrency();
  const [initialInvestment, setInitialInvestment] = useState(25000);
  const [ongoingCosts, setOngoingCosts] = useState(5000);
  const [totalReturn, setTotalReturn] = useState(48000);
  const [durationYears, setDurationYears] = useState(2);

  const result = useMemo(() => {
    const totalCost = initialInvestment + ongoingCosts;
    const netProfit = totalReturn - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const years = Math.max(0.1, durationYears);
    const annualizedRoi =
      totalCost > 0 && totalReturn > 0
        ? (Math.pow(totalReturn / totalCost, 1 / years) - 1) * 100
        : 0;

    return {
      totalCost,
      netProfit,
      roi,
      annualizedRoi,
    };
  }, [initialInvestment, ongoingCosts, totalReturn, durationYears]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Investment Details</h2>
        <NumberField
          label="Initial Investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          prefix={currency.symbol}
          step={1000}
        />
        <NumberField
          label="Additional / Ongoing Costs"
          value={ongoingCosts}
          onChange={setOngoingCosts}
          prefix={currency.symbol}
          step={500}
        />
        <NumberField
          label="Total Revenue / Final Value"
          value={totalReturn}
          onChange={setTotalReturn}
          prefix={currency.symbol}
          step={1000}
        />
        <NumberField
          label="Investment Duration"
          value={durationYears}
          onChange={setDurationYears}
          suffix="yrs"
          step={0.5}
          min={0.1}
          max={50}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Total Return on Investment (ROI)"
          value={formatPercent(result.roi)}
          accent={result.netProfit >= 0 ? "emerald" : "rose"}
          subtext={`Annualized ROI (CAGR): ${formatPercent(
            result.annualizedRoi
          )}/year`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Total Capital Invested"
            value={formatCurrency(result.totalCost, currency, 0)}
          />
          <StatCard
            label="Net Profit / Gain"
            value={formatCurrency(result.netProfit, currency, 0)}
            highlight
          />
          <StatCard
            label="Return Multiple"
            value={`${(
              result.totalCost > 0 ? totalReturn / result.totalCost : 0
            ).toFixed(2)}×`}
          />
        </div>
      </div>
    </div>
  );
}

export function FreelanceRateCalculator() {
  const { currency } = useCurrency();
  const [targetNetIncome, setTargetNetIncome] = useState(85000);
  const [annualExpenses, setAnnualExpenses] = useState(12000);
  const [taxRate, setTaxRate] = useState(28);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(28);
  const [vacationWeeks, setVacationWeeks] = useState(4);

  const result = useMemo(() => {
    const workingWeeks = Math.max(1, 52 - vacationWeeks);
    const annualBillableHours = Math.max(1, workingWeeks * billableHoursPerWeek);
    const effectiveTax = Math.min(80, Math.max(0, taxRate)) / 100;
    const preTaxIncomeNeeded = targetNetIncome / (1 - effectiveTax);
    const grossRevenueTarget = preTaxIncomeNeeded + annualExpenses;
    const hourlyRate = grossRevenueTarget / annualBillableHours;
    const dayRate = hourlyRate * 8;
    const monthlyRevenue = grossRevenueTarget / 12;

    return {
      workingWeeks,
      annualBillableHours,
      grossRevenueTarget,
      hourlyRate,
      dayRate,
      monthlyRevenue,
    };
  }, [
    targetNetIncome,
    annualExpenses,
    taxRate,
    billableHoursPerWeek,
    vacationWeeks,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Income &amp; Capacity</h2>
        <NumberField
          label="Target Annual Take-Home Income"
          value={targetNetIncome}
          onChange={setTargetNetIncome}
          prefix={currency.symbol}
          step={2500}
        />
        <NumberField
          label="Annual Business Expenses"
          value={annualExpenses}
          onChange={setAnnualExpenses}
          prefix={currency.symbol}
          step={500}
          hint="Software, health, gear"
        />
        <NumberField
          label="Estimated Tax Rate"
          value={taxRate}
          onChange={setTaxRate}
          suffix="%"
          max={70}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Billable Hrs / Wk"
            value={billableHoursPerWeek}
            onChange={setBillableHoursPerWeek}
            suffix="hrs"
            min={1}
            max={70}
          />
          <NumberField
            label="Weeks Off / Yr"
            value={vacationWeeks}
            onChange={setVacationWeeks}
            suffix="wks"
            min={0}
            max={40}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Recommended Minimum Hourly Rate"
          value={`${formatCurrency(result.hourlyRate, currency)}/hr`}
          subtext={`Suggested Day Rate (8 hrs): ${formatCurrency(
            result.dayRate,
            currency,
            0
          )}/day`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Annual Billable Hours"
            value={formatNumber(result.annualBillableHours)}
            subtext={`${result.workingWeeks} working weeks`}
          />
          <StatCard
            label="Required Monthly Billing"
            value={formatCurrency(result.monthlyRevenue, currency, 0)}
            highlight
          />
          <StatCard
            label="Gross Annual Revenue"
            value={formatCurrency(result.grossRevenueTarget, currency, 0)}
          />
        </div>
      </div>
    </div>
  );
}
