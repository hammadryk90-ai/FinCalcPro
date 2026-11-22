export type CalculatorCategory =
  | "loans"
  | "investing"
  | "business"
  | "income-debt";

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  category: CalculatorCategory;
  categoryLabel: string;
  description: string;
  keywords: string[];
  badge?: string;
  iconName:
    | "Home"
    | "Car"
    | "Landmark"
    | "Building2"
    | "TrendingUp"
    | "PiggyBank"
    | "Target"
    | "Flame"
    | "Percent"
    | "Scale"
    | "BarChart3"
    | "Briefcase"
    | "CreditCard"
    | "Scissors"
    | "Wallet"
    | "PieChart"
    | "RefreshCw"
    | "Store"
    | "Repeat"
    | "Coins"
    | "Shield"
    | "FileSpreadsheet"
    | "BadgeDollarSign"
    | "Activity";
  relatedSlugs: string[];
}

export const CATEGORIES: {
  id: CalculatorCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "loans",
    label: "Loans & Real Estate",
    description:
      "Mortgages, auto loans, amortization schedules, and rental property investment returns.",
  },
  {
    id: "investing",
    label: "Investing & Retirement",
    description:
      "Compound interest, 401(k) retirement projections, savings goals, and inflation impact.",
  },
  {
    id: "business",
    label: "Business & Pricing",
    description:
      "Profit margins, break-even analysis, business ROI, and freelance rate planning.",
  },
  {
    id: "income-debt",
    label: "Debt, Paycheck & Net Worth",
    description:
      "Debt payoff strategies, credit card interest, salary conversion, and net worth tracking.",
  },
];

export const CALCULATORS: CalculatorMeta[] = [
  // LOANS & REAL ESTATE
  {
    slug: "mortgage",
    title: "Mortgage Calculator",
    shortTitle: "Mortgage",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Estimate your monthly mortgage payment including principal, interest, property taxes, homeowners insurance, PMI, and HOA fees with a full amortization schedule.",
    keywords: [
      "mortgage calculator",
      "home loan payment",
      "amortization schedule",
      "monthly mortgage estimator",
    ],
    badge: "Most Popular",
    iconName: "Home",
    relatedSlugs: ["loan-amortization", "rental-property", "auto-loan"],
  },
  {
    slug: "auto-loan",
    title: "Auto Loan Calculator",
    shortTitle: "Auto Loan",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Calculate monthly car payments, total loan interest, sales tax, and trade-in impact before visiting the dealership.",
    keywords: [
      "auto loan calculator",
      "car payment calculator",
      "vehicle financing",
      "car loan interest",
    ],
    iconName: "Car",
    relatedSlugs: ["loan-amortization", "mortgage", "debt-payoff"],
  },
  {
    slug: "loan-amortization",
    title: "Loan Amortization Calculator",
    shortTitle: "Loan Amortization",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Generate a complete year-by-year amortization schedule for personal or business loans and see how extra monthly payments slash total interest.",
    keywords: [
      "loan amortization calculator",
      "extra payment savings",
      "personal loan calculator",
      "business loan schedule",
    ],
    iconName: "Landmark",
    relatedSlugs: ["mortgage", "debt-payoff", "business-roi"],
  },
  {
    slug: "rental-property",
    title: "Rental Property ROI & Cap Rate Calculator",
    shortTitle: "Rental Property ROI",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Analyze real estate investments with Net Operating Income (NOI), Cap Rate, Cash-on-Cash Return, and monthly cash flow projections.",
    keywords: [
      "rental property calculator",
      "cap rate calculator",
      "cash on cash return",
      "real estate investment ROI",
    ],
    badge: "Investor Favorite",
    iconName: "Building2",
    relatedSlugs: ["mortgage", "business-roi", "compound-interest"],
  },

  // INVESTING & RETIREMENT
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Project how your investments grow over time with compound interest, regular monthly contributions, and flexible compounding frequencies.",
    keywords: [
      "compound interest calculator",
      "investment growth calculator",
      "savings compounding",
      "wealth projection",
    ],
    badge: "Most Popular",
    iconName: "TrendingUp",
    relatedSlugs: ["retirement", "savings-goal", "inflation"],
  },
  {
    slug: "retirement",
    title: "Retirement & 401(k) Calculator",
    shortTitle: "Retirement & 401(k)",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Plan your retirement nest egg with employer matching, expected market returns, and safe 4% withdrawal income estimates.",
    keywords: [
      "retirement calculator",
      "401k calculator",
      "FIRE calculator",
      "retirement income",
    ],
    iconName: "PiggyBank",
    relatedSlugs: ["compound-interest", "inflation", "net-worth"],
  },
  {
    slug: "savings-goal",
    title: "Savings Goal & Emergency Fund Calculator",
    shortTitle: "Savings Goal",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Find out how much to save each month—or how long it will take—to reach your emergency fund, down payment, or major financial milestone.",
    keywords: [
      "savings goal calculator",
      "emergency fund calculator",
      "monthly savings plan",
      "high yield savings",
    ],
    iconName: "Target",
    relatedSlugs: ["compound-interest", "retirement", "salary-converter"],
  },
  {
    slug: "inflation",
    title: "Inflation & Purchasing Power Calculator",
    shortTitle: "Inflation Impact",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Measure how annual inflation erodes purchasing power over time and calculate the future cost of today's expenses.",
    keywords: [
      "inflation calculator",
      "purchasing power calculator",
      "future value of money",
      "cost of living inflation",
    ],
    iconName: "Flame",
    relatedSlugs: ["compound-interest", "retirement", "salary-converter"],
  },

  // BUSINESS & PRICING
  {
    slug: "profit-margin",
    title: "Profit Margin & Markup Calculator",
    shortTitle: "Profit Margin",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Compute gross profit margin, net profit margin, markup percentage, and optimal selling prices for products and services.",
    keywords: [
      "profit margin calculator",
      "markup calculator",
      "gross margin formula",
      "ecommerce pricing calculator",
    ],
    badge: "Business Essential",
    iconName: "Percent",
    relatedSlugs: ["break-even", "business-roi", "freelance-rate"],
  },
  {
    slug: "break-even",
    title: "Break-Even Point Calculator",
    shortTitle: "Break-Even Point",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Determine the exact sales volume and revenue required to cover fixed and variable costs and start generating profit.",
    keywords: [
      "break even calculator",
      "break even point units",
      "contribution margin",
      "startup financial planning",
    ],
    iconName: "Scale",
    relatedSlugs: ["profit-margin", "business-roi", "loan-amortization"],
  },
  {
    slug: "business-roi",
    title: "Business ROI & Annualized Return Calculator",
    shortTitle: "Business ROI",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Evaluate marketing campaigns, capital expenditures, or business projects with total Return on Investment (ROI) and annualized CAGR.",
    keywords: [
      "ROI calculator",
      "return on investment formula",
      "annualized ROI",
      "CAGR calculator",
    ],
    iconName: "BarChart3",
    relatedSlugs: ["profit-margin", "break-even", "rental-property"],
  },
  {
    slug: "freelance-rate",
    title: "Freelance Hourly & Day Rate Calculator",
    shortTitle: "Freelance Rate",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Calculate your sustainable hourly, daily, and project consulting rates based on target income, business overhead, taxes, and billable hours.",
    keywords: [
      "freelance rate calculator",
      "consulting hourly rate",
      "contractor pricing",
      "self employed rate",
    ],
    iconName: "Briefcase",
    relatedSlugs: ["salary-converter", "profit-margin", "savings-goal"],
  },

  // DEBT, PAYCHECK & NET WORTH
  {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator (Snowball vs. Avalanche)",
    shortTitle: "Debt Payoff",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "Compare Debt Snowball and Debt Avalanche payoff strategies across multiple debts to see which method saves you the most interest and time.",
    keywords: [
      "debt payoff calculator",
      "debt snowball vs avalanche",
      "pay off debt faster",
      "debt free date",
    ],
    badge: "High Impact",
    iconName: "Scissors",
    relatedSlugs: ["credit-card-payoff", "loan-amortization", "net-worth"],
  },
  {
    slug: "credit-card-payoff",
    title: "Credit Card Payoff Calculator",
    shortTitle: "Credit Card Payoff",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "See how long it will take to pay off your credit card balance, how much interest you'll pay, and how extra payments accelerate freedom.",
    keywords: [
      "credit card payoff calculator",
      "credit card interest calculator",
      "APR payoff time",
      "minimum payment trap",
    ],
    iconName: "CreditCard",
    relatedSlugs: ["debt-payoff", "loan-amortization", "savings-goal"],
  },
  {
    slug: "salary-converter",
    title: "Salary to Hourly & Take-Home Pay Calculator",
    shortTitle: "Salary & Paycheck",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "Convert between annual salary, monthly, bi-weekly, weekly, and hourly pay while estimating effective taxes and net take-home income.",
    keywords: [
      "salary to hourly calculator",
      "take home pay calculator",
      "paycheck estimator",
      "annual income breakdown",
    ],
    iconName: "Wallet",
    relatedSlugs: ["freelance-rate", "retirement", "savings-goal"],
  },
  {
    slug: "net-worth",
    title: "Net Worth Calculator",
    shortTitle: "Net Worth",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "Track your complete financial snapshot by totaling cash, investments, real estate, and assets against mortgages, loans, and liabilities.",
    keywords: [
      "net worth calculator",
      "assets vs liabilities",
      "personal balance sheet",
      "debt to asset ratio",
    ],
    iconName: "PieChart",
    relatedSlugs: ["retirement", "debt-payoff", "compound-interest"],
  },

  // ADDITIONAL HIGH-RPM NICHE CALCULATORS
  {
    slug: "mortgage-refinance",
    title: "Mortgage Refinance Break-Even Calculator",
    shortTitle: "Mortgage Refinance",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Compare your current mortgage against a new refinance offer to find monthly savings, closing-cost break-even month, and lifetime interest savings.",
    keywords: [
      "mortgage refinance calculator",
      "refinance break even",
      "home loan refinance savings",
      "lower mortgage rate",
    ],
    badge: "High RPM",
    iconName: "RefreshCw",
    relatedSlugs: ["mortgage", "loan-amortization", "rental-property"],
  },
  {
    slug: "sba-business-loan",
    title: "SBA 7(a) & Business Loan Calculator",
    shortTitle: "SBA Business Loan",
    category: "loans",
    categoryLabel: "Loans & Real Estate",
    description:
      "Estimate monthly payments, SBA guarantee/origination fees, net funding proceeds, and total borrowing cost for small business term loans.",
    keywords: [
      "SBA loan calculator",
      "SBA 7a payment calculator",
      "small business loan calculator",
      "commercial loan interest",
    ],
    badge: "Business Loan",
    iconName: "BadgeDollarSign",
    relatedSlugs: ["loan-amortization", "business-roi", "break-even"],
  },
  {
    slug: "cd-savings",
    title: "CD & High-Yield Savings Calculator",
    shortTitle: "CD & HYSA Yield",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Calculate Certificate of Deposit (CD) maturity value, total guaranteed interest earned, and effective APY across flexible terms.",
    keywords: [
      "CD calculator",
      "certificate of deposit interest",
      "high yield savings calculator",
      "fixed deposit maturity",
    ],
    iconName: "Coins",
    relatedSlugs: ["savings-goal", "compound-interest", "inflation"],
  },
  {
    slug: "dividend-income",
    title: "Dividend & Passive Income Calculator",
    shortTitle: "Dividend Income",
    category: "investing",
    categoryLabel: "Investing & Retirement",
    description:
      "Project future annual and monthly passive dividend income with DRIP reinvestment, dividend growth rates, and recurring deposits.",
    keywords: [
      "dividend calculator",
      "DRIP calculator",
      "passive income portfolio",
      "dividend growth investing",
    ],
    badge: "Investor Favorite",
    iconName: "Repeat",
    relatedSlugs: ["compound-interest", "retirement", "net-worth"],
  },
  {
    slug: "ecommerce-profit",
    title: "E-Commerce & Amazon FBA Profit Calculator",
    shortTitle: "E-Commerce / FBA",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Calculate true unit profitability, net margin, and ROI for Amazon FBA, Shopify, or Etsy products after COGS, fulfillment, referral fees, and ad spend.",
    keywords: [
      "Amazon FBA calculator",
      "ecommerce profit calculator",
      "Shopify margin calculator",
      "ACoS profit margin",
    ],
    badge: "E-Commerce",
    iconName: "Store",
    relatedSlugs: ["profit-margin", "break-even", "business-roi"],
  },
  {
    slug: "saas-ltv-cac",
    title: "SaaS LTV, CAC & Payback Calculator",
    shortTitle: "SaaS LTV & CAC",
    category: "business",
    categoryLabel: "Business & Pricing",
    description:
      "Measure Customer Lifetime Value (LTV), LTV-to-CAC ratio, and CAC payback period from ARPU, gross margin, and monthly churn.",
    keywords: [
      "SaaS LTV calculator",
      "CAC payback period",
      "LTV to CAC ratio",
      "subscription unit economics",
    ],
    iconName: "Activity",
    relatedSlugs: ["break-even", "profit-margin", "business-roi"],
  },
  {
    slug: "self-employment-tax",
    title: "Self-Employment & Quarterly Tax Estimator",
    shortTitle: "Self-Employment Tax",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "Estimate self-employment tax, income tax, net take-home profit, and quarterly estimated tax payments for freelancers and sole proprietors.",
    keywords: [
      "self employment tax calculator",
      "1099 tax estimator",
      "quarterly estimated tax",
      "freelance tax calculator",
    ],
    badge: "Freelancer Must",
    iconName: "FileSpreadsheet",
    relatedSlugs: ["freelance-rate", "salary-converter", "savings-goal"],
  },
  {
    slug: "emergency-fund",
    title: "Emergency Fund Runway Calculator",
    shortTitle: "Emergency Fund",
    category: "income-debt",
    categoryLabel: "Debt, Paycheck & Net Worth",
    description:
      "Break down essential monthly living expenses to find your ideal 3-to-12-month emergency fund target and see how many months your current savings cover.",
    keywords: [
      "emergency fund calculator",
      "rainy day fund",
      "financial runway calculator",
      "essential monthly expenses",
    ],
    iconName: "Shield",
    relatedSlugs: ["savings-goal", "cd-savings", "net-worth"],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getRelatedCalculators(meta: CalculatorMeta): CalculatorMeta[] {
  return meta.relatedSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is CalculatorMeta => Boolean(c));
}
