"use client";

import React from "react";
import {
  AutoLoanCalculator,
  LoanAmortizationCalculator,
  MortgageCalculator,
  RentalPropertyCalculator,
} from "./LoanCalculators";
import {
  CompoundInterestCalculator,
  InflationCalculator,
  RetirementCalculator,
  SavingsGoalCalculator,
} from "./InvestingCalculators";
import {
  BreakEvenCalculator,
  BusinessROICalculator,
  FreelanceRateCalculator,
  ProfitMarginCalculator,
} from "./BusinessCalculators";
import {
  CreditCardPayoffCalculator,
  DebtPayoffCalculator,
  NetWorthCalculator,
  SalaryConverterCalculator,
} from "./IncomeDebtCalculators";
import {
  CDSavingsCalculator,
  DividendIncomeCalculator,
  EcommerceProfitCalculator,
  EmergencyFundCalculator,
  MortgageRefinanceCalculator,
  SBABusinessLoanCalculator,
  SaaSLtvCacCalculator,
  SelfEmploymentTaxCalculator,
} from "./AdditionalCalculators";

export function CalculatorRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "mortgage":
      return <MortgageCalculator />;
    case "auto-loan":
      return <AutoLoanCalculator />;
    case "loan-amortization":
      return <LoanAmortizationCalculator />;
    case "rental-property":
      return <RentalPropertyCalculator />;
    case "mortgage-refinance":
      return <MortgageRefinanceCalculator />;
    case "sba-business-loan":
      return <SBABusinessLoanCalculator />;
    case "compound-interest":
      return <CompoundInterestCalculator />;
    case "retirement":
      return <RetirementCalculator />;
    case "savings-goal":
      return <SavingsGoalCalculator />;
    case "inflation":
      return <InflationCalculator />;
    case "cd-savings":
      return <CDSavingsCalculator />;
    case "dividend-income":
      return <DividendIncomeCalculator />;
    case "profit-margin":
      return <ProfitMarginCalculator />;
    case "break-even":
      return <BreakEvenCalculator />;
    case "business-roi":
      return <BusinessROICalculator />;
    case "freelance-rate":
      return <FreelanceRateCalculator />;
    case "ecommerce-profit":
      return <EcommerceProfitCalculator />;
    case "saas-ltv-cac":
      return <SaaSLtvCacCalculator />;
    case "debt-payoff":
      return <DebtPayoffCalculator />;
    case "credit-card-payoff":
      return <CreditCardPayoffCalculator />;
    case "salary-converter":
      return <SalaryConverterCalculator />;
    case "net-worth":
      return <NetWorthCalculator />;
    case "self-employment-tax":
      return <SelfEmploymentTaxCalculator />;
    case "emergency-fund":
      return <EmergencyFundCalculator />;
    default:
      return null;
  }
}
