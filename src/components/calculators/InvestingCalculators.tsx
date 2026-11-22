"use client";

import React, { useMemo, useState } from "react";
import { useCurrency } from "@/components/CurrencyContext";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "@/lib/currency";
import { downloadCSV } from "@/lib/export";
import { DonutChart, StackedBarChart } from "@/components/Charts";
import {
  NumberField,
  PrimaryResultCard,
  ScheduleTable,
  SelectField,
  StatCard,
} from "@/components/CalculatorUI";

export function CompoundInterestCalculator() {
  const { currency } = useCurrency();
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(20);
  const [compoundingPerYear, setCompoundingPerYear] = useState(12);

  const result = useMemo(() => {
    const r = annualRate / 100;
    const n = Math.max(1, compoundingPerYear);
    let balance = initialDeposit;
    let totalContributed = initialDeposit;

    const yearly: {
      year: number;
      contributed: number;
      interest: number;
      balance: number;
    }[] = [];

    for (let y = 1; y <= Math.max(1, years); y++) {
      for (let m = 0; m < 12; m++) {
        balance += monthlyContribution;
        totalContributed += monthlyContribution;
        // Apply effective monthly growth from compounding frequency
        const monthlyGrowth = Math.pow(1 + r / n, n / 12) - 1;
        balance *= 1 + monthlyGrowth;
      }
      yearly.push({
        year: y,
        contributed: totalContributed,
        interest: Math.max(0, balance - totalContributed),
        balance,
      });
    }

    const totalInterest = Math.max(0, balance - totalContributed);
    return {
      finalBalance: balance,
      totalContributed,
      totalInterest,
      yearly,
    };
  }, [initialDeposit, monthlyContribution, annualRate, years, compoundingPerYear]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Investment Inputs</h2>
          <NumberField
            label="Initial Deposit"
            value={initialDeposit}
            onChange={setInitialDeposit}
            prefix={currency.symbol}
            step={500}
          />
          <NumberField
            label="Monthly Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            prefix={currency.symbol}
            step={50}
          />
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Annual Return"
              value={annualRate}
              onChange={setAnnualRate}
              suffix="%"
              step={0.25}
              max={40}
            />
            <NumberField
              label="Time Horizon"
              value={years}
              onChange={setYears}
              suffix="yrs"
              min={1}
              max={60}
            />
          </div>
          <SelectField
            label="Compounding Frequency"
            value={compoundingPerYear}
            onChange={setCompoundingPerYear}
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
            label={`Projected Value After ${years} Years`}
            value={formatCurrency(result.finalBalance, currency, 0)}
            subtext={`Total Contributions: ${formatCurrency(
              result.totalContributed,
              currency,
              0
            )} • Compound Interest Earned: ${formatCurrency(
              result.totalInterest,
              currency,
              0
            )}`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Total Deposited"
              value={formatCurrency(result.totalContributed, currency, 0)}
            />
            <StatCard
              label="Interest Earned"
              value={formatCurrency(result.totalInterest, currency, 0)}
              highlight
            />
            <StatCard
              label="Growth Multiple"
              value={`${(
                result.totalContributed > 0
                  ? result.finalBalance / result.totalContributed
                  : 0
              ).toFixed(2)}×`}
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Compound Growth Trajectory
            </h3>
            <StackedBarChart
              primaryLabel="Contributions"
              secondaryLabel="Compound Interest"
              primaryColor="#0f766e"
              secondaryColor="#10b981"
              data={result.yearly.map((y) => ({
                label: `Yr ${y.year}`,
                primary: y.contributed,
                secondary: y.interest,
                primaryFormatted: formatCurrency(y.contributed, currency, 0),
                secondaryFormatted: formatCurrency(y.interest, currency, 0),
              }))}
            />
          </div>
        </div>
      </div>

      <ScheduleTable
        title="Year-by-Year Compound Growth Table"
        headers={["Year", "Total Contributions", "Interest Earned", "Ending Balance"]}
        rows={result.yearly.map((y) => [
          `Year ${y.year}`,
          formatCurrency(y.contributed, currency, 0),
          formatCurrency(y.interest, currency, 0),
          formatCurrency(y.balance, currency, 0),
        ])}
        onDownloadCsv={() =>
          downloadCSV(
            "compound-interest-projection.csv",
            ["Year", "Total Contributions", "Interest Earned", "Ending Balance"],
            result.yearly.map((y) => [
              y.year,
              y.contributed.toFixed(2),
              y.interest.toFixed(2),
              y.balance.toFixed(2),
            ])
          )
        }
      />
    </div>
  );
}

export function RetirementCalculator() {
  const { currency } = useCurrency();
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(35000);
  const [monthlyContribution, setMonthlyContribution] = useState(750);
  const [employerMatchMonthly, setEmployerMatchMonthly] = useState(250);
  const [expectedReturn, setExpectedReturn] = useState(7.0);

  const result = useMemo(() => {
    const years = Math.max(1, retirementAge - currentAge);
    const rMonthly = expectedReturn / 100 / 12;
    const totalMonthlyAdd = monthlyContribution + employerMatchMonthly;

    let balance = currentSavings;
    let personalContrib = currentSavings;
    let employerContrib = 0;

    const yearly: {
      age: number;
      contributed: number;
      growth: number;
      balance: number;
    }[] = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = (balance + totalMonthlyAdd) * (1 + rMonthly);
        personalContrib += monthlyContribution;
        employerContrib += employerMatchMonthly;
      }
      const totalIn = personalContrib + employerContrib;
      yearly.push({
        age: currentAge + y,
        contributed: totalIn,
        growth: Math.max(0, balance - totalIn),
        balance,
      });
    }

    const annualSafeIncome = balance * 0.04;
    const monthlySafeIncome = annualSafeIncome / 12;

    return {
      years,
      finalBalance: balance,
      personalContrib,
      employerContrib,
      investmentGrowth: Math.max(0, balance - personalContrib - employerContrib),
      annualSafeIncome,
      monthlySafeIncome,
      yearly,
    };
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    employerMatchMonthly,
    expectedReturn,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Retirement Profile</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
          />
          <NumberField
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={currentAge + 1}
            max={90}
          />
        </div>
        <NumberField
          label="Current Retirement Savings"
          value={currentSavings}
          onChange={setCurrentSavings}
          prefix={currency.symbol}
          step={1000}
        />
        <NumberField
          label="Your Monthly Contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          prefix={currency.symbol}
          step={50}
        />
        <NumberField
          label="Employer Match / Month"
          value={employerMatchMonthly}
          onChange={setEmployerMatchMonthly}
          prefix={currency.symbol}
          step={25}
        />
        <NumberField
          label="Expected Annual Return"
          value={expectedReturn}
          onChange={setExpectedReturn}
          suffix="%"
          step={0.25}
          hint="6%–7% ≈ inflation-adjusted"
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label={`Projected Nest Egg at Age ${retirementAge}`}
          value={formatCurrency(result.finalBalance, currency, 0)}
          subtext={`Est. 4% Rule Income: ${formatCurrency(
            result.monthlySafeIncome,
            currency,
            0
          )}/month (${formatCurrency(result.annualSafeIncome, currency, 0)}/year)`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Your Contributions"
            value={formatCurrency(result.personalContrib, currency, 0)}
          />
          <StatCard
            label="Employer Match"
            value={formatCurrency(result.employerContrib, currency, 0)}
          />
          <StatCard
            label="Investment Growth"
            value={formatCurrency(result.investmentGrowth, currency, 0)}
            highlight
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Savings Growth by Age
          </h3>
          <StackedBarChart
            primaryLabel="Total Contributions"
            secondaryLabel="Market Growth"
            data={result.yearly.map((y) => ({
              label: `Age ${y.age}`,
              primary: y.contributed,
              secondary: y.growth,
              primaryFormatted: formatCurrency(y.contributed, currency, 0),
              secondaryFormatted: formatCurrency(y.growth, currency, 0),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export function SavingsGoalCalculator() {
  const { currency } = useCurrency();
  const [goalAmount, setGoalAmount] = useState(25000);
  const [startingBalance, setStartingBalance] = useState(3000);
  const [apy, setApy] = useState(4.5);
  const [months, setMonths] = useState(36);

  const result = useMemo(() => {
    const n = Math.max(1, months);
    const r = apy / 100 / 12;
    const futureOfStart = startingBalance * Math.pow(1 + r, n);
    const remainingNeeded = Math.max(0, goalAmount - futureOfStart);

    const requiredMonthly =
      remainingNeeded === 0
        ? 0
        : r === 0
        ? remainingNeeded / n
        : (remainingNeeded * r) / (Math.pow(1 + r, n) - 1);

    const totalDeposits = startingBalance + requiredMonthly * n;
    const interestEarned = Math.max(0, goalAmount - totalDeposits);

    return {
      requiredMonthly,
      totalDeposits,
      interestEarned,
    };
  }, [goalAmount, startingBalance, apy, months]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Savings Target</h2>
        <NumberField
          label="Savings Goal Amount"
          value={goalAmount}
          onChange={setGoalAmount}
          prefix={currency.symbol}
          step={500}
        />
        <NumberField
          label="Current Starting Balance"
          value={startingBalance}
          onChange={setStartingBalance}
          prefix={currency.symbol}
          step={250}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Savings APY"
            value={apy}
            onChange={setApy}
            suffix="%"
            step={0.1}
            max={20}
          />
          <NumberField
            label="Timeline (Months)"
            value={months}
            onChange={setMonths}
            suffix="mos"
            min={1}
            max={360}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label="Required Monthly Savings"
          value={formatCurrency(result.requiredMonthly, currency)}
          subtext={`To reach ${formatCurrency(
            goalAmount,
            currency,
            0
          )} in ${months} months (${(months / 12).toFixed(1)} years)`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Starting Balance"
            value={formatCurrency(startingBalance, currency, 0)}
          />
          <StatCard
            label="Total Deposits"
            value={formatCurrency(result.totalDeposits, currency, 0)}
          />
          <StatCard
            label="APY Interest Earned"
            value={formatCurrency(result.interestEarned, currency, 0)}
            highlight
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Goal Funding Breakdown
          </h3>
          <DonutChart
            centerLabel="Target Goal"
            centerValue={formatCompactCurrency(goalAmount, currency)}
            slices={[
              {
                label: "Starting Balance",
                value: startingBalance,
                color: "#0f766e",
                formattedValue: formatCurrency(startingBalance, currency, 0),
              },
              {
                label: "Monthly Deposits",
                value: result.requiredMonthly * Math.max(1, months),
                color: "#0284c7",
                formattedValue: formatCurrency(
                  result.requiredMonthly * Math.max(1, months),
                  currency,
                  0
                ),
              },
              {
                label: "Interest Earned",
                value: result.interestEarned,
                color: "#10b981",
                formattedValue: formatCurrency(result.interestEarned, currency, 0),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function InflationCalculator() {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(10000);
  const [inflationRate, setInflationRate] = useState(3.2);
  const [years, setYears] = useState(15);

  const result = useMemo(() => {
    const r = inflationRate / 100;
    const futureEquivalent = amount * Math.pow(1 + r, years);
    const realPurchasingPower = amount / Math.pow(1 + r, years);
    const cumulativeInflation = (Math.pow(1 + r, years) - 1) * 100;
    const lostPower = Math.max(0, amount - realPurchasingPower);

    return {
      futureEquivalent,
      realPurchasingPower,
      cumulativeInflation,
      lostPower,
    };
  }, [amount, inflationRate, years]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Inflation Inputs</h2>
        <NumberField
          label="Amount in Today's Money"
          value={amount}
          onChange={setAmount}
          prefix={currency.symbol}
          step={500}
        />
        <NumberField
          label="Expected Annual Inflation"
          value={inflationRate}
          onChange={setInflationRate}
          suffix="%"
          step={0.1}
          max={50}
        />
        <NumberField
          label="Number of Years"
          value={years}
          onChange={setYears}
          suffix="yrs"
          min={1}
          max={60}
        />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <PrimaryResultCard
          label={`Future Cost in ${years} Years`}
          value={formatCurrency(result.futureEquivalent, currency, 0)}
          accent="amber"
          subtext={`You will need ${formatCurrency(
            result.futureEquivalent,
            currency,
            0
          )} to match the purchasing power of ${formatCurrency(
            amount,
            currency,
            0
          )} today.`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Real Value of Cash"
            value={formatCurrency(result.realPurchasingPower, currency, 0)}
            subtext="In today's money"
          />
          <StatCard
            label="Purchasing Power Lost"
            value={formatCurrency(result.lostPower, currency, 0)}
          />
          <StatCard
            label="Cumulative Inflation"
            value={formatPercent(result.cumulativeInflation, 1)}
            highlight
          />
        </div>
      </div>
    </div>
  );
}
