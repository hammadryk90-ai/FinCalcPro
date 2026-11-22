"use client";

import React, { useMemo, useState } from "react";
import { useCurrency } from "@/components/CurrencyContext";
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/currency";
import { DonutChart, StackedBarChart } from "@/components/Charts";
import {
  NumberField,
  PrimaryResultCard,
  SelectField,
  StatCard,
} from "@/components/CalculatorUI";

function pmt(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
}

export function MortgageRefinanceCalculator() {
  const { currency } = useCurrency();
  const [currentBalance, setCurrentBalance] = useState(310000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [remainingYears, setRemainingYears] = useState(25);
  const [newRate, setNewRate] = useState(5.95);
  const [newTermYears, setNewTermYears] = useState(25);
  const [closingCosts, setClosingCosts] = useState(5500);

  const result = useMemo(() => {
    const oldMonths = Math.max(1, remainingYears * 12);
    const newMonths = Math.max(1, newTermYears * 12);
    const oldMonthly = pmt(currentBalance, currentRate, oldMonths);
    const newMonthly = pmt(currentBalance, newRate, newMonths);
    const monthlySavings = oldMonthly - newMonthly;

    const oldTotalPaid = oldMonthly * oldMonths;
    const newTotalPaid = newMonthly * newMonths + closingCosts;
    const lifetimeSavings = oldTotalPaid - newTotalPaid;
    const breakEvenMonths =
      monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

    return {
      oldMonthly,
      newMonthly,
      monthlySavings,
      lifetimeSavings,
      breakEvenMonths,
    };
  }, [
    currentBalance,
    currentRate,
    remainingYears,
    newRate,
    newTermYears,
    closingCosts,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Current vs. New Loan</h2>
        <NumberField
          label="Remaining Mortgage Balance"
          value={currentBalance}
          onChange={setCurrentBalance}
          prefix={currency.symbol}
          step={5000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Current Rate"
            value={currentRate}
            onChange={setCurrentRate}
            suffix="%"
            step={0.1}
          />
          <NumberField
            label="Years Remaining"
            value={remainingYears}
            onChange={setRemainingYears}
            suffix="yrs"
            min={1}
            max={40}
          />
        </div>
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
          <NumberField
            label="New Refi Rate"
            value={newRate}
            onChange={setNewRate}
            suffix="%"
            step={0.1}
          />
          <SelectField
            label="New Loan Term"
            value={newTermYears}
            onChange={setNewTermYears}
            options={[
              { label: "30 Years", value: 30 },
              { label: "25 Years", value: 25 },
              { label: "20 Years", value: 20 },
              { label: "15 Years", value: 15 },
              { label: "10 Years", value: 10 },
            ]}
          />
        </div>
        <NumberField
          label="Estimated Closing Costs"
          value={closingCosts}
          onChange={setClosingCosts}
          prefix={currency.symbol}
          step={250}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Monthly Savings"
          value={formatCurrency(result.monthlySavings, currency)}
          accent={result.monthlySavings > 0 ? "emerald" : "rose"}
          subtext={
            result.monthlySavings > 0
              ? `Break-Even Point: ${result.breakEvenMonths} months (${(
                  result.breakEvenMonths / 12
                ).toFixed(1)} years) to recoup closing costs`
              : "New monthly payment is higher than your current payment."
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Current Monthly P&I"
            value={formatCurrency(result.oldMonthly, currency)}
          />
          <StatCard
            label="New Monthly P&I"
            value={formatCurrency(result.newMonthly, currency)}
            highlight
          />
          <StatCard
            label="Net Lifetime Savings"
            value={formatCurrency(result.lifetimeSavings, currency, 0)}
            highlight={result.lifetimeSavings > 0}
          />
        </div>
      </div>
    </div>
  );
}

export function SBABusinessLoanCalculator() {
  const { currency } = useCurrency();
  const [loanAmount, setLoanAmount] = useState(250000);
  const [apr, setApr] = useState(10.5);
  const [termYears, setTermYears] = useState(10);
  const [originationFeePct, setOriginationFeePct] = useState(2.5);

  const result = useMemo(() => {
    const months = Math.max(1, termYears * 12);
    const monthlyPayment = pmt(loanAmount, apr, months);
    const totalPayments = monthlyPayment * months;
    const totalInterest = Math.max(0, totalPayments - loanAmount);
    const feeAmount = loanAmount * (originationFeePct / 100);
    const netProceeds = Math.max(0, loanAmount - feeAmount);
    const annualDebtService = monthlyPayment * 12;

    return {
      monthlyPayment,
      totalInterest,
      feeAmount,
      netProceeds,
      annualDebtService,
      totalBorrowingCost: totalInterest + feeAmount,
    };
  }, [loanAmount, apr, termYears, originationFeePct]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">SBA / Business Loan</h2>
        <NumberField
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          prefix={currency.symbol}
          step={10000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Interest Rate"
            value={apr}
            onChange={setApr}
            suffix="%"
            step={0.25}
          />
          <SelectField
            label="Loan Term"
            value={termYears}
            onChange={setTermYears}
            options={[
              { label: "5 Years", value: 5 },
              { label: "7 Years", value: 7 },
              { label: "10 Years (SBA 7a)", value: 10 },
              { label: "15 Years", value: 15 },
              { label: "25 Years (Real Estate)", value: 25 },
            ]}
          />
        </div>
        <NumberField
          label="Guarantee / Origination Fee"
          value={originationFeePct}
          onChange={setOriginationFeePct}
          suffix="%"
          step={0.25}
          max={15}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Monthly Payment"
          value={formatCurrency(result.monthlyPayment, currency)}
          subtext={`Annual Debt Service: ${formatCurrency(
            result.annualDebtService,
            currency,
            0
          )}/yr • Net Cash Proceeds: ${formatCurrency(
            result.netProceeds,
            currency,
            0
          )}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Upfront Fees"
            value={formatCurrency(result.feeAmount, currency, 0)}
          />
          <StatCard
            label="Total Interest"
            value={formatCurrency(result.totalInterest, currency, 0)}
          />
          <StatCard
            label="Total Cost of Credit"
            value={formatCurrency(result.totalBorrowingCost, currency, 0)}
            highlight
          />
        </div>
      </div>
    </div>
  );
}

export function CDSavingsCalculator() {
  const { currency } = useCurrency();
  const [deposit, setDeposit] = useState(20000);
  const [rate, setRate] = useState(4.75);
  const [termMonths, setTermMonths] = useState(18);
  const [compounding, setCompounding] = useState(365);

  const result = useMemo(() => {
    const years = Math.max(1 / 12, termMonths / 12);
    const r = rate / 100;
    const n = Math.max(1, compounding);
    const maturityValue = deposit * Math.pow(1 + r / n, n * years);
    const interestEarned = Math.max(0, maturityValue - deposit);
    const effectiveApy = (Math.pow(1 + r / n, n) - 1) * 100;

    return { maturityValue, interestEarned, effectiveApy };
  }, [deposit, rate, termMonths, compounding]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">CD / Deposit Terms</h2>
        <NumberField
          label="Initial Deposit"
          value={deposit}
          onChange={setDeposit}
          prefix={currency.symbol}
          step={1000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            step={0.1}
          />
          <NumberField
            label="Term Length"
            value={termMonths}
            onChange={setTermMonths}
            suffix="mos"
            min={1}
            max={120}
          />
        </div>
        <SelectField
          label="Compounding Frequency"
          value={compounding}
          onChange={setCompounding}
          options={[
            { label: "Daily (365/yr)", value: 365 },
            { label: "Monthly (12/yr)", value: 12 },
            { label: "Quarterly (4/yr)", value: 4 },
            { label: "Annually (1/yr)", value: 1 },
          ]}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label={`Maturity Value After ${termMonths} Months`}
          value={formatCurrency(result.maturityValue, currency)}
          subtext={`Guaranteed Interest Earned: ${formatCurrency(
            result.interestEarned,
            currency
          )} • Effective APY: ${formatPercent(result.effectiveApy)}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Principal Deposit"
            value={formatCurrency(deposit, currency, 0)}
          />
          <StatCard
            label="Interest Earned"
            value={formatCurrency(result.interestEarned, currency)}
            highlight
          />
          <StatCard
            label="Effective APY"
            value={formatPercent(result.effectiveApy)}
          />
        </div>
      </div>
    </div>
  );
}

export function DividendIncomeCalculator() {
  const { currency } = useCurrency();
  const [startingPortfolio, setStartingPortfolio] = useState(50000);
  const [monthlyAdd, setMonthlyAdd] = useState(600);
  const [dividendYield, setDividendYield] = useState(3.8);
  const [dividendGrowth, setDividendGrowth] = useState(5.0);
  const [priceAppreciation, setPriceAppreciation] = useState(4.0);
  const [years, setYears] = useState(15);
  const [reinvestDrip, setReinvestDrip] = useState(true);

  const result = useMemo(() => {
    let portfolio = startingPortfolio;
    let currentYield = dividendYield / 100;
    const growthFactor = 1 + dividendGrowth / 100;
    const priceFactor = 1 + priceAppreciation / 100;

    const yearly: {
      year: number;
      portfolio: number;
      annualDiv: number;
    }[] = [];

    let totalDividendsReceived = 0;

    for (let y = 1; y <= Math.max(1, years); y++) {
      portfolio += monthlyAdd * 12;
      const annualDiv = portfolio * currentYield;
      totalDividendsReceived += annualDiv;
      portfolio = portfolio * priceFactor + (reinvestDrip ? annualDiv : 0);
      // Adjust yield slightly for dividend growth vs price growth
      currentYield = Math.min(0.18, currentYield * (growthFactor / priceFactor));
      yearly.push({ year: y, portfolio, annualDiv });
    }

    const finalAnnualDiv = yearly[yearly.length - 1]?.annualDiv || 0;
    return {
      finalPortfolio: portfolio,
      finalAnnualDiv,
      finalMonthlyDiv: finalAnnualDiv / 12,
      totalDividendsReceived,
      yearly,
    };
  }, [
    startingPortfolio,
    monthlyAdd,
    dividendYield,
    dividendGrowth,
    priceAppreciation,
    years,
    reinvestDrip,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Portfolio &amp; DRIP</h2>
        <NumberField
          label="Starting Portfolio"
          value={startingPortfolio}
          onChange={setStartingPortfolio}
          prefix={currency.symbol}
          step={2500}
        />
        <NumberField
          label="Monthly Contribution"
          value={monthlyAdd}
          onChange={setMonthlyAdd}
          prefix={currency.symbol}
          step={50}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Starting Yield"
            value={dividendYield}
            onChange={setDividendYield}
            suffix="%"
            step={0.1}
          />
          <NumberField
            label="Dividend Growth / yr"
            value={dividendGrowth}
            onChange={setDividendGrowth}
            suffix="%"
            step={0.25}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Price Growth / yr"
            value={priceAppreciation}
            onChange={setPriceAppreciation}
            suffix="%"
            step={0.25}
          />
          <NumberField
            label="Time Horizon"
            value={years}
            onChange={setYears}
            suffix="yrs"
            min={1}
            max={45}
          />
        </div>
        <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 pt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={reinvestDrip}
            onChange={(e) => setReinvestDrip(e.target.checked)}
            className="w-4 h-4 accent-emerald-600 rounded"
          />
          Reinvest Dividends Automatically (DRIP)
        </label>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label={`Projected Annual Dividend Income (Year ${years})`}
          value={`${formatCurrency(result.finalAnnualDiv, currency, 0)}/yr`}
          subtext={`Monthly Passive Income: ${formatCurrency(
            result.finalMonthlyDiv,
            currency,
            0
          )}/mo • Ending Portfolio: ${formatCurrency(
            result.finalPortfolio,
            currency,
            0
          )}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Monthly Dividend"
            value={formatCurrency(result.finalMonthlyDiv, currency, 0)}
            highlight
          />
          <StatCard
            label="Cumulative Dividends"
            value={formatCurrency(result.totalDividendsReceived, currency, 0)}
          />
          <StatCard
            label="Final Portfolio"
            value={formatCurrency(result.finalPortfolio, currency, 0)}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Annual Dividend Snowball
          </h3>
          <StackedBarChart
            primaryLabel="Annual Dividends"
            secondaryLabel="Monthly Avg × 12"
            primaryColor="#0f766e"
            secondaryColor="#10b981"
            data={result.yearly.map((y) => ({
              label: `Yr ${y.year}`,
              primary: y.annualDiv,
              secondary: 0,
              primaryFormatted: formatCurrency(y.annualDiv, currency, 0),
              secondaryFormatted: formatCurrency(y.annualDiv / 12, currency, 0),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export function EcommerceProfitCalculator() {
  const { currency } = useCurrency();
  const [sellingPrice, setSellingPrice] = useState(39.99);
  const [landedCogs, setLandedCogs] = useState(9.5);
  const [fulfillmentFee, setFulfillmentFee] = useState(6.25);
  const [referralFeePct, setReferralFeePct] = useState(15);
  const [acosPct, setAcosPct] = useState(12);
  const [monthlyUnits, setMonthlyUnits] = useState(400);

  const result = useMemo(() => {
    const referralFee = sellingPrice * (referralFeePct / 100);
    const adCostPerUnit = sellingPrice * (acosPct / 100);
    const totalUnitCost = landedCogs + fulfillmentFee + referralFee + adCostPerUnit;
    const netProfitPerUnit = sellingPrice - totalUnitCost;
    const netMargin =
      sellingPrice > 0 ? (netProfitPerUnit / sellingPrice) * 100 : 0;
    const roi = landedCogs > 0 ? (netProfitPerUnit / landedCogs) * 100 : 0;
    const monthlyProfit = netProfitPerUnit * monthlyUnits;

    return {
      referralFee,
      adCostPerUnit,
      totalUnitCost,
      netProfitPerUnit,
      netMargin,
      roi,
      monthlyProfit,
    };
  }, [
    sellingPrice,
    landedCogs,
    fulfillmentFee,
    referralFeePct,
    acosPct,
    monthlyUnits,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Product &amp; Marketplace Fees</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Selling Price"
            value={sellingPrice}
            onChange={setSellingPrice}
            prefix={currency.symbol}
            step={1}
          />
          <NumberField
            label="Landed COGS"
            value={landedCogs}
            onChange={setLandedCogs}
            prefix={currency.symbol}
            step={0.5}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="FBA / Shipping Fee"
            value={fulfillmentFee}
            onChange={setFulfillmentFee}
            prefix={currency.symbol}
            step={0.25}
          />
          <NumberField
            label="Referral Fee"
            value={referralFeePct}
            onChange={setReferralFeePct}
            suffix="%"
            step={0.5}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Ad Spend (ACoS)"
            value={acosPct}
            onChange={setAcosPct}
            suffix="%"
            step={1}
          />
          <NumberField
            label="Monthly Units"
            value={monthlyUnits}
            onChange={setMonthlyUnits}
            step={25}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Net Profit per Unit"
          value={formatCurrency(result.netProfitPerUnit, currency)}
          accent={result.netProfitPerUnit >= 0 ? "emerald" : "rose"}
          subtext={`Net Margin: ${formatPercent(result.netMargin)} • Product ROI: ${formatPercent(
            result.roi,
            0
          )}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Monthly Net Profit"
            value={formatCurrency(result.monthlyProfit, currency, 0)}
            highlight
          />
          <StatCard
            label="Referral + FBA Fees"
            value={formatCurrency(result.referralFee + fulfillmentFee, currency)}
          />
          <StatCard
            label="Ad Cost / Unit"
            value={formatCurrency(result.adCostPerUnit, currency)}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Price Breakdown per Order
          </h3>
          <DonutChart
            centerLabel="Order Price"
            centerValue={formatCompactCurrency(sellingPrice, currency)}
            slices={[
              {
                label: "Landed COGS",
                value: Math.max(0, landedCogs),
                color: "#0f766e",
                formattedValue: formatCurrency(landedCogs, currency),
              },
              {
                label: "Marketplace & Shipping",
                value: Math.max(0, fulfillmentFee + result.referralFee),
                color: "#f59e0b",
                formattedValue: formatCurrency(
                  fulfillmentFee + result.referralFee,
                  currency
                ),
              },
              {
                label: "PPC Ad Spend",
                value: Math.max(0, result.adCostPerUnit),
                color: "#6366f1",
                formattedValue: formatCurrency(result.adCostPerUnit, currency),
              },
              {
                label: "Net Profit",
                value: Math.max(0, result.netProfitPerUnit),
                color: "#10b981",
                formattedValue: formatCurrency(result.netProfitPerUnit, currency),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function SaaSLtvCacCalculator() {
  const { currency } = useCurrency();
  const [arpu, setArpu] = useState(79);
  const [grossMarginPct, setGrossMarginPct] = useState(80);
  const [monthlyChurnPct, setMonthlyChurnPct] = useState(3.5);
  const [cac, setCac] = useState(450);

  const result = useMemo(() => {
    const monthlyGrossProfit = arpu * (grossMarginPct / 100);
    const churnDecimal = Math.max(0.001, monthlyChurnPct / 100);
    const avgLifespanMonths = 1 / churnDecimal;
    const ltv = monthlyGrossProfit * avgLifespanMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    const paybackMonths =
      monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : 0;

    return {
      monthlyGrossProfit,
      avgLifespanMonths,
      ltv,
      ltvCacRatio,
      paybackMonths,
    };
  }, [arpu, grossMarginPct, monthlyChurnPct, cac]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">SaaS Unit Economics</h2>
        <NumberField
          label="Monthly ARPU (Price / Customer)"
          value={arpu}
          onChange={setArpu}
          prefix={currency.symbol}
          step={5}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Gross Margin"
            value={grossMarginPct}
            onChange={setGrossMarginPct}
            suffix="%"
            max={100}
          />
          <NumberField
            label="Monthly Churn"
            value={monthlyChurnPct}
            onChange={setMonthlyChurnPct}
            suffix="%"
            step={0.25}
            min={0.1}
            max={100}
          />
        </div>
        <NumberField
          label="Customer Acquisition Cost (CAC)"
          value={cac}
          onChange={setCac}
          prefix={currency.symbol}
          step={25}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="LTV : CAC Ratio"
          value={`${result.ltvCacRatio.toFixed(2)} : 1`}
          accent={
            result.ltvCacRatio >= 3
              ? "emerald"
              : result.ltvCacRatio >= 1.5
              ? "amber"
              : "rose"
          }
          subtext={
            result.ltvCacRatio >= 3
              ? "Healthy SaaS benchmark (3:1+ target achieved)"
              : "Below 3:1 benchmark — reduce churn, raise ARPU, or lower CAC"
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Customer LTV"
            value={formatCurrency(result.ltv, currency, 0)}
            highlight
          />
          <StatCard
            label="CAC Payback Period"
            value={`${result.paybackMonths.toFixed(1)} mos`}
          />
          <StatCard
            label="Avg Customer Lifespan"
            value={`${result.avgLifespanMonths.toFixed(1)} mos`}
          />
        </div>
      </div>
    </div>
  );
}

export function SelfEmploymentTaxCalculator() {
  const { currency } = useCurrency();
  const [grossIncome, setGrossIncome] = useState(95000);
  const [deductions, setDeductions] = useState(15000);
  const [incomeTaxRate, setIncomeTaxRate] = useState(18);
  const [seTaxRate, setSeTaxRate] = useState(15.3);

  const result = useMemo(() => {
    const netProfit = Math.max(0, grossIncome - deductions);
    const seTaxableBase = netProfit * 0.9235;
    const seTax = seTaxableBase * (seTaxRate / 100);
    const halfSeDeduction = seTax * 0.5;
    const incomeTaxable = Math.max(0, netProfit - halfSeDeduction);
    const estimatedIncomeTax = incomeTaxable * (incomeTaxRate / 100);
    const totalTax = seTax + estimatedIncomeTax;
    const quarterlyPayment = totalTax / 4;
    const takeHome = Math.max(0, netProfit - totalTax);
    const effectiveRate = netProfit > 0 ? (totalTax / netProfit) * 100 : 0;

    return {
      netProfit,
      seTax,
      estimatedIncomeTax,
      totalTax,
      quarterlyPayment,
      takeHome,
      effectiveRate,
    };
  }, [grossIncome, deductions, incomeTaxRate, seTaxRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Freelance Income &amp; Expenses</h2>
        <NumberField
          label="Gross Annual 1099 / Business Income"
          value={grossIncome}
          onChange={setGrossIncome}
          prefix={currency.symbol}
          step={2500}
        />
        <NumberField
          label="Deductible Business Expenses"
          value={deductions}
          onChange={setDeductions}
          prefix={currency.symbol}
          step={1000}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Est. Income Tax Rate"
            value={incomeTaxRate}
            onChange={setIncomeTaxRate}
            suffix="%"
            max={60}
          />
          <NumberField
            label="SE Tax Rate"
            value={seTaxRate}
            onChange={setSeTaxRate}
            suffix="%"
            step={0.1}
            hint="US default: 15.3%"
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Estimated Quarterly Tax Payment"
          value={`${formatCurrency(result.quarterlyPayment, currency, 0)}/qtr`}
          accent="slate"
          subtext={`Total Annual Tax: ${formatCurrency(
            result.totalTax,
            currency,
            0
          )} (${formatPercent(result.effectiveRate, 1)} effective rate on net profit)`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Net Business Profit"
            value={formatCurrency(result.netProfit, currency, 0)}
          />
          <StatCard
            label="Self-Employment Tax"
            value={formatCurrency(result.seTax, currency, 0)}
          />
          <StatCard
            label="After-Tax Take-Home"
            value={formatCurrency(result.takeHome, currency, 0)}
            highlight
          />
        </div>
      </div>
    </div>
  );
}

export function EmergencyFundCalculator() {
  const { currency } = useCurrency();
  const [housing, setHousing] = useState(1800);
  const [groceries, setGroceries] = useState(550);
  const [utilitiesTransport, setUtilitiesTransport] = useState(450);
  const [insuranceDebt, setInsuranceDebt] = useState(400);
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(8500);

  const result = useMemo(() => {
    const monthlyBurn = housing + groceries + utilitiesTransport + insuranceDebt;
    const targetFund = monthlyBurn * Math.max(1, targetMonths);
    const shortfall = Math.max(0, targetFund - currentSavings);
    const runwayMonths = monthlyBurn > 0 ? currentSavings / monthlyBurn : 0;
    const progressPct =
      targetFund > 0 ? Math.min(100, (currentSavings / targetFund) * 100) : 100;

    return {
      monthlyBurn,
      targetFund,
      shortfall,
      runwayMonths,
      progressPct,
    };
  }, [
    housing,
    groceries,
    utilitiesTransport,
    insuranceDebt,
    targetMonths,
    currentSavings,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Essential Monthly Bills</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Housing / Rent"
            value={housing}
            onChange={setHousing}
            prefix={currency.symbol}
            step={50}
          />
          <NumberField
            label="Groceries / Food"
            value={groceries}
            onChange={setGroceries}
            prefix={currency.symbol}
            step={25}
          />
          <NumberField
            label="Utilities & Transit"
            value={utilitiesTransport}
            onChange={setUtilitiesTransport}
            prefix={currency.symbol}
            step={25}
          />
          <NumberField
            label="Insurance & Min Debt"
            value={insuranceDebt}
            onChange={setInsuranceDebt}
            prefix={currency.symbol}
            step={25}
          />
        </div>
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
          <SelectField
            label="Target Coverage"
            value={targetMonths}
            onChange={setTargetMonths}
            options={[
              { label: "3 Months", value: 3 },
              { label: "6 Months (Recommended)", value: 6 },
              { label: "9 Months", value: 9 },
              { label: "12 Months (Self-Employed)", value: 12 },
            ]}
          />
          <NumberField
            label="Current Cash Saved"
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix={currency.symbol}
            step={500}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label={`Target ${targetMonths}-Month Emergency Fund`}
          value={formatCurrency(result.targetFund, currency, 0)}
          subtext={`Current Runway: ${result.runwayMonths.toFixed(
            1
          )} months (${formatPercent(result.progressPct, 0)} funded)`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Essential Monthly Burn"
            value={formatCurrency(result.monthlyBurn, currency, 0)}
          />
          <StatCard
            label="Remaining to Save"
            value={formatCurrency(result.shortfall, currency, 0)}
            highlight={result.shortfall === 0}
          />
          <StatCard
            label="Current Runway"
            value={`${formatNumber(result.runwayMonths, 1)} mos`}
            highlight
          />
        </div>
      </div>
    </div>
  );
}
