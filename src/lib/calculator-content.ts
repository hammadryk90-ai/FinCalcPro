export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorGuideContent {
  overview: string;
  formulaTitle: string;
  formulaText: string;
  formulaVariables: string[];
  tips: string[];
  faqs: FAQItem[];
}

export const CALCULATOR_CONTENT: Record<string, CalculatorGuideContent> = {
  mortgage: {
    overview:
      "A mortgage payment consists of more than just the principal and interest on your home loan. Most lenders also collect property taxes, homeowners insurance, Private Mortgage Insurance (PMI) if your down payment is under 20%, and Homeowners Association (HOA) dues. Understanding your full monthly PITI (Principal, Interest, Taxes, and Insurance) helps you shop within a comfortable budget and avoid being house-poor.",
    formulaTitle: "Standard Fixed-Rate Mortgage Formula",
    formulaText: "M = P × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]",
    formulaVariables: [
      "M = Monthly principal and interest payment",
      "P = Principal loan amount (Home Price − Down Payment)",
      "r = Monthly interest rate (Annual Rate ÷ 12)",
      "n = Total number of monthly payments (Loan Term in Years × 12)",
    ],
    tips: [
      "Putting at least 20% down eliminates Private Mortgage Insurance (PMI), saving 0.5% to 1.5% of the loan amount every year.",
      "Comparing a 15-year vs. 30-year mortgage often reveals tens of thousands of dollars in interest savings, though monthly payments are higher.",
      "Even a 0.25% reduction in mortgage interest rate can save over $15,000 across a 30-year $350,000 loan—always compare at least three lenders.",
    ],
    faqs: [
      {
        question: "How much house can I comfortably afford?",
        answer:
          "Many financial planners recommend the 28/36 rule: keep total housing costs (mortgage, taxes, insurance, HOA) under 28% of gross monthly income, and total debt payments under 36%.",
      },
      {
        question: "What is PMI and when does it drop off?",
        answer:
          "Private Mortgage Insurance (PMI) protects the lender when your down payment is below 20%. On conventional loans, PMI automatically terminates once your loan balance reaches 78% of the original home value, or you can request removal at 80%.",
      },
      {
        question: "Does this calculator include property taxes and insurance?",
        answer:
          "Yes. You can customize annual property tax, homeowners insurance, monthly HOA fees, and PMI to see your complete monthly housing cost alongside the principal-and-interest amortization schedule.",
      },
      {
        question: "How does making extra mortgage payments help?",
        answer:
          "Extra payments go directly toward reducing principal, which lowers the balance used to calculate future interest and shortens your loan payoff timeline.",
      },
    ],
  },
  "auto-loan": {
    overview:
      "Financing a vehicle involves balancing the sticker price, down payment, trade-in allowance, sales tax, loan term, and Annual Percentage Rate (APR). While stretching an auto loan to 72 or 84 months lowers the monthly payment, it substantially increases total interest paid and raises the risk of becoming upside-down (owing more than the car is worth).",
    formulaTitle: "Auto Loan Monthly Payment Formula",
    formulaText: "M = L × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]",
    formulaVariables: [
      "L = Financed amount (Vehicle Price + Sales Tax − Down Payment − Trade-In)",
      "r = Monthly interest rate (APR ÷ 12)",
      "n = Loan term in months (e.g., 36, 48, 60, or 72)",
    ],
    tips: [
      "Follow the 20/4/10 guideline: put 20% down, finance for no more than 4 years (48 months), and keep total monthly auto expenses under 10% of gross income.",
      "Get pre-approved by a credit union or bank before visiting the dealership so you have a benchmark APR to negotiate against.",
      "Negotiate the out-the-door vehicle price first rather than focusing on a target monthly payment.",
    ],
    faqs: [
      {
        question: "Does a trade-in reduce sales tax?",
        answer:
          "In many jurisdictions, sales tax is calculated on the vehicle price minus your trade-in value, though some states tax the full price. Check your local motor vehicle tax rules.",
      },
      {
        question: "What is a good auto loan term?",
        answer:
          "A 36- to 60-month term generally offers the best balance of manageable payments and low total interest while preventing negative equity.",
      },
      {
        question: "How does credit score affect my car loan APR?",
        answer:
          "Borrowers with prime or super-prime credit scores typically qualify for significantly lower APRs than subprime borrowers, often saving thousands over the life of the loan.",
      },
      {
        question: "Should I put more money down on a car?",
        answer:
          "A larger down payment reduces your financed balance, lowers monthly payments, cuts total interest, and protects you from depreciation in the first two years.",
      },
    ],
  },
  "loan-amortization": {
    overview:
      "Amortization is the process of paying off a fixed-rate loan through scheduled installments over time. Early in the loan, a larger share of each payment covers interest; as the principal declines, a steadily larger portion pays down the balance. Adding even a modest extra monthly payment creates a powerful compounding reduction in interest.",
    formulaTitle: "Amortizing Loan Payment & Extra Principal Impact",
    formulaText: "Interest_month = Balance × (APR ÷ 12),   Principal_month = Payment − Interest_month + Extra",
    formulaVariables: [
      "Balance = Remaining unpaid loan principal",
      "APR = Annual Percentage Rate",
      "Extra = Optional additional monthly payment applied directly to principal",
    ],
    tips: [
      "Confirm with your lender that extra payments are applied strictly to principal and that there are no prepayment penalties.",
      "Rounding your monthly payment up to the next $50 or $100 is an effortless way to shave months off your loan.",
      "Export your amortization schedule as CSV to track actual balances against your payoff plan.",
    ],
    faqs: [
      {
        question: "What types of loans use amortization?",
        answer:
          "Mortgages, auto loans, personal installment loans, student loans, and many small business term loans use fixed-payment amortization schedules.",
      },
      {
        question: "Why is so much of my early payment going to interest?",
        answer:
          "Interest is calculated on the remaining balance each period. Because your balance is highest at the start of the loan, interest takes a larger slice of early payments.",
      },
      {
        question: "Does making bi-weekly payments save interest?",
        answer:
          "Yes. Paying half your monthly payment every two weeks results in 26 half-payments (13 full monthly payments) per year, accelerating payoff without feeling like a major budget change.",
      },
      {
        question: "Can I use this for an SBA or business term loan?",
        answer:
          "Yes. Any fixed-rate business loan with regular monthly payments follows the exact same amortization math.",
      },
    ],
  },
  "rental-property": {
    overview:
      "Evaluating a rental property requires looking past gross rent to calculate true Net Operating Income (NOI), Capitalization Rate (Cap Rate), and Cash-on-Cash Return. Accounting realistically for vacancy, property management, maintenance reserves, taxes, and insurance ensures you only acquire cash-flowing assets.",
    formulaTitle: "Core Real Estate Metrics",
    formulaText: "NOI = Effective Gross Rent − Operating Expenses | Cap Rate = (NOI ÷ Purchase Price) × 100 | CoC = (Annual Cash Flow ÷ Total Cash Invested) × 100",
    formulaVariables: [
      "Effective Gross Rent = Annual Rent × (1 − Vacancy Rate)",
      "Operating Expenses = Property Tax + Insurance + Maintenance + Management + HOA",
      "Annual Cash Flow = NOI − Annual Mortgage Debt Service",
    ],
    tips: [
      "Always include a 5%–10% vacancy allowance and a 5%–10% maintenance/CapEx reserve even on newly renovated properties.",
      "Cap Rate measures property performance independent of financing, while Cash-on-Cash Return measures the return on your actual out-of-pocket cash.",
      "Use the 1% rule (monthly rent ≈ 1% of purchase price) as a quick initial filter, then verify with full expense modeling here.",
    ],
    faqs: [
      {
        question: "What is a good Cap Rate for a rental property?",
        answer:
          "Cap rates typically range from 4%–6% in low-risk, high-appreciation metro areas to 7%–10%+ in cash-flow-focused secondary markets.",
      },
      {
        question: "Does Cap Rate include the mortgage payment?",
        answer:
          "No. Cap Rate uses Net Operating Income (NOI) before debt service so you can compare properties on an apples-to-apples basis regardless of financing terms.",
      },
      {
        question: "What is Cash-on-Cash Return?",
        answer:
          "Cash-on-Cash Return divides your annual pre-tax cash flow (after mortgage payments) by the total cash you invested (down payment plus closing costs).",
      },
      {
        question: "Should I include property management fees if I self-manage?",
        answer:
          "Many seasoned investors still model an 8%–10% management fee so the deal remains profitable if they later decide to hire a property manager.",
      },
    ],
  },
  "compound-interest": {
    overview:
      "Compound interest is the engine of long-term wealth building: you earn returns not only on your initial principal and recurring contributions, but also on previously accumulated interest. Over multi-decade horizons, compounding often generates more wealth than your total out-of-pocket deposits combined.",
    formulaTitle: "Compound Interest with Recurring Contributions",
    formulaText: "A = P(1 + r/n)^(nt) + PMT × [ ((1 + r/n)^(nt) − 1) / (r/n) ]",
    formulaVariables: [
      "A = Future value of the investment",
      "P = Initial principal deposit",
      "PMT = Regular monthly contribution",
      "r = Annual nominal interest rate (decimal)",
      "n = Compounding periods per year, t = Time in years",
    ],
    tips: [
      "Starting 10 years earlier often beats contributing twice as much later—time in the market is the strongest lever in compounding.",
      "Automate monthly contributions into low-cost index funds or high-yield accounts so compounding works uninterrupted.",
      "Account for inflation by testing a 'real return' (e.g., 7% nominal return minus 2.5% inflation = 4.5% real growth).",
    ],
    faqs: [
      {
        question: "How much difference does compounding frequency make?",
        answer:
          "More frequent compounding (monthly or daily vs. annually) produces slightly higher effective yields, though the interest rate and time horizon have a much larger impact.",
      },
      {
        question: "What average return should I use for stock market projections?",
        answer:
          "Historically, broad U.S. stock indices have averaged roughly 8%–10% annually before inflation (or ~6%–7% adjusted for inflation), though returns vary significantly year to year.",
      },
      {
        question: "Does this calculator account for taxes?",
        answer:
          "Calculations show pre-tax growth, which closely mirrors tax-advantaged accounts like Roth IRAs or 401(k)s. For taxable brokerage accounts, consider using a slightly lower after-tax return rate.",
      },
      {
        question: "What is the Rule of 72?",
        answer:
          "Divide 72 by your annual rate of return to estimate how many years it takes for an investment to double. At an 8% return, money doubles roughly every 9 years.",
      },
    ],
  },
  retirement: {
    overview:
      "Planning for retirement involves estimating how your current savings, ongoing monthly contributions, and employer 401(k) matches will compound until your target retirement age. Equally important is translating that final nest egg into sustainable annual and monthly income using guidelines such as the 4% safe withdrawal rule.",
    formulaTitle: "Retirement Growth & 4% Safe Withdrawal Estimate",
    formulaText: "Annual Safe Withdrawal = Projected Nest Egg × 0.04",
    formulaVariables: [
      "Years to Retirement = Target Retirement Age − Current Age",
      "Total Monthly Contribution = Your Contribution + Employer Match",
      "4% Rule = Widely cited benchmark for a 30-year retirement portfolio",
    ],
    tips: [
      "Always contribute at least enough to capture 100% of your employer's 401(k) match—it is an immediate, risk-free return.",
      "Increase your contribution rate by 1% every time you receive a raise to accelerate retirement without feeling a lifestyle pinch.",
      "Revisit your expected return and inflation assumptions annually as you get closer to retirement.",
    ],
    faqs: [
      {
        question: "What is the 4% rule in retirement planning?",
        answer:
          "Based on the Trinity Study, the 4% rule suggests withdrawing 4% of your portfolio in year one of retirement and adjusting for inflation thereafter, historically sustaining a balanced portfolio for 30+ years.",
      },
      {
        question: "How much should I have saved for retirement?",
        answer:
          "A common target is 25 times your expected annual retirement expenses (after subtracting Social Security or pension income).",
      },
      {
        question: "Does employer matching count toward IRS contribution limits?",
        answer:
          "In the U.S., employer 401(k) matches do not reduce your personal annual elective deferral limit, though there is a higher combined employer-plus-employee ceiling.",
      },
      {
        question: "Should I use nominal or inflation-adjusted returns?",
        answer:
          "Using an inflation-adjusted return (for example, 6% instead of 9%) keeps your projected nest egg and monthly income expressed in today's purchasing power.",
      },
    ],
  },
  "savings-goal": {
    overview:
      "Whether you are building a 6-month emergency fund, saving for a home down payment, or preparing for a major business launch, turning a lump-sum target into a concrete monthly deposit makes the goal achievable. Earning a competitive Annual Percentage Yield (APY) in a High-Yield Savings Account (HYSA) helps your cash reach the finish line faster.",
    formulaTitle: "Required Monthly Savings Formula",
    formulaText: "PMT = [ Goal − P(1 + r)^n ] × r / [ (1 + r)^n − 1 ]",
    formulaVariables: [
      "Goal = Target savings amount",
      "P = Current starting savings balance",
      "r = Monthly interest rate (APY ÷ 12), n = Number of months",
    ],
    tips: [
      "Keep emergency funds in an FDIC- or NCUA-insured High-Yield Savings Account so the money stays liquid and earns interest.",
      "Aim for 3–6 months of essential living expenses for a standard emergency fund, or 6–12 months if you are self-employed.",
      "Set up automatic payday transfers so savings happen before discretionary spending.",
    ],
    faqs: [
      {
        question: "Where should I keep my short-term savings goal?",
        answer:
          "For goals under 3–5 years (emergency funds, down payments, weddings), high-yield savings accounts, money market accounts, or short-term CDs protect principal from market volatility.",
      },
      {
        question: "What is the difference between APR and APY?",
        answer:
          "APY (Annual Percentage Yield) includes the effect of compounding over a year, whereas APR does not. Savings accounts advertise APY.",
      },
      {
        question: "How big should my emergency fund be?",
        answer:
          "Start with a starter cushion of 1 month of expenses, then build to 3–6 months of core bills (housing, utilities, groceries, insurance, minimum debt payments).",
      },
      {
        question: "What if I can't afford the required monthly deposit?",
        answer:
          "You can either extend your target timeline by a few months, trim recurring subscriptions, or direct windfalls like tax refunds and bonuses toward the goal.",
      },
    ],
  },
  inflation: {
    overview:
      "Inflation steadily reduces what a single unit of currency can buy over time. Even a seemingly modest 3% annual inflation rate cuts purchasing power nearly in half over 24 years. Modeling inflation is critical for retirement planning, salary negotiations, and long-term business pricing.",
    formulaTitle: "Future Cost & Purchasing Power Erosion",
    formulaText: "Future Cost = Present Amount × (1 + i)^t  |  Real Value = Present Amount ÷ (1 + i)^t",
    formulaVariables: [
      "i = Annual inflation rate (decimal)",
      "t = Number of years",
    ],
    tips: [
      "Cash sitting in a 0.01% checking account loses real value every year; keep surplus cash in high-yield accounts or productive investments.",
      "Review business service rates and product pricing annually to ensure inflation doesn't quietly compress your profit margins.",
      "Long-term historical U.S. CPI inflation averages around 2.5%–3.3% per year.",
    ],
    faqs: [
      {
        question: "What is a realistic inflation rate to use for planning?",
        answer:
          "Most financial planners use 2.5% to 3.0% for long-term projections, and stress-test budgets at 4% to add a margin of safety.",
      },
      {
        question: "How does inflation affect debt?",
        answer:
          "Fixed-rate debt becomes slightly easier to repay in real terms during inflation if your income grows with inflation, while variable-rate debt often becomes more expensive as central banks raise rates.",
      },
      {
        question: "How can investors hedge against inflation?",
        answer:
          "Diversified equities, Treasury Inflation-Protected Securities (TIPS), I-Bonds, and cash-flowing real estate have historically helped preserve purchasing power.",
      },
      {
        question: "What is the difference between inflation and deflation?",
        answer:
          "Inflation is a sustained rise in the general price level (falling purchasing power), while deflation is a general decline in prices.",
      },
    ],
  },
  "profit-margin": {
    overview:
      "Confusing profit margin with markup is one of the most common pricing mistakes in retail, e-commerce, and service businesses. Profit margin measures profit as a percentage of selling price (revenue), while markup measures profit as a percentage of cost. Tracking both Gross Margin and Net Margin keeps your business financially healthy.",
    formulaTitle: "Profit Margin & Markup Formulas",
    formulaText: "Gross Margin = ((Revenue − COGS) ÷ Revenue) × 100  |  Markup = ((Revenue − COGS) ÷ COGS) × 100",
    formulaVariables: [
      "Revenue = Selling price or total sales",
      "COGS = Cost of Goods Sold (direct product/delivery cost)",
      "Net Profit = Revenue − COGS − Operating Expenses",
    ],
    tips: [
      "A 50% markup on a $100 product gives a $150 price, which is only a 33.3% gross profit margin—always verify both numbers before discounting.",
      "Small increases in price (e.g., 5%) often boost net profit far more than equivalent cuts in overhead.",
      "Benchmark your gross and net margins against your specific industry (SaaS often sees 70%–85% gross margin, while retail averages 25%–50%).",
    ],
    faqs: [
      {
        question: "What is the difference between gross margin and net margin?",
        answer:
          "Gross margin only subtracts direct Costs of Goods Sold (COGS) from revenue. Net margin subtracts all business expenses—including marketing, rent, payroll, software, and taxes.",
      },
      {
        question: "Can profit margin ever exceed 100%?",
        answer:
          "No. Because profit cannot exceed total revenue, profit margin is always under 100%. Markup, however, can easily exceed 100% (e.g., buying for $20 and selling for $60 is a 200% markup).",
      },
      {
        question: "What is a healthy net profit margin for a small business?",
        answer:
          "Across many industries, a 10% net profit margin is considered average, 15%–20%+ is strong, and under 5% indicates thin pricing power or high overhead.",
      },
      {
        question: "How do discounts impact profit margin?",
        answer:
          "A 10% discount comes directly out of your net profit, not your costs. If your margin is 30%, a 10% discount cuts your profit per sale by a third.",
      },
    ],
  },
  "break-even": {
    overview:
      "Break-even analysis reveals the exact number of units you must sell—and the revenue you must generate—so that total income equals total fixed and variable costs. Every unit sold beyond your break-even point contributes its full contribution margin directly to operating profit.",
    formulaTitle: "Break-Even Units & Revenue Formulas",
    formulaText: "Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost per Unit)",
    formulaVariables: [
      "Fixed Costs = Rent, salaries, software, insurance, loan payments",
      "Variable Cost = Materials, shipping, payment processing, commissions per unit",
      "Contribution Margin = Selling Price − Variable Cost per Unit",
    ],
    tips: [
      "Lower your break-even point by either reducing fixed overhead, negotiating lower variable costs, or increasing your average selling price.",
      "Always verify that your selling price is strictly higher than variable cost per unit—otherwise every additional sale increases your loss.",
      "Run best-case, expected, and conservative break-even scenarios before signing leases or launching ad campaigns.",
    ],
    faqs: [
      {
        question: "What is contribution margin?",
        answer:
          "Contribution margin is the dollar amount left from each unit sold after covering variable costs. That money first pays off fixed costs, and then becomes profit.",
      },
      {
        question: "How do I calculate break-even for a service business?",
        answer:
          "Treat one billable hour, project, or monthly retainer client as a 'unit,' subtract direct contractor/software costs per unit, and divide monthly fixed overhead by that contribution margin.",
      },
      {
        question: "What is a margin of safety?",
        answer:
          "Margin of safety is how far your projected sales exceed your break-even sales. A wider margin of safety protects your business during seasonal slowdowns.",
      },
      {
        question: "Should owner salary be included in fixed costs?",
        answer:
          "Yes. Including a realistic owner draw or salary in fixed costs ensures your break-even target reflects a truly sustainable business.",
      },
    ],
  },
  "business-roi": {
    overview:
      "Return on Investment (ROI) is the universal yardstick for comparing marketing campaigns, equipment purchases, software tools, and business ventures. Because a 40% return earned over 6 months is vastly better than a 40% return earned over 5 years, this calculator also computes Annualized ROI (CAGR).",
    formulaTitle: "Total ROI & Annualized ROI (CAGR)",
    formulaText: "ROI = ((Net Profit) ÷ Total Investment) × 100  |  Annualized ROI = [ (Final Value ÷ Initial Cost)^(1 / Years) − 1 ] × 100",
    formulaVariables: [
      "Net Profit = Final Value / Total Revenue − Initial Investment − Ongoing Costs",
      "Years = Holding period or campaign duration in years",
    ],
    tips: [
      "Include all hidden costs—setup fees, staff time, ad spend, and maintenance—when calculating true ROI.",
      "Always compare projects using Annualized ROI when their timelines differ.",
      "Pair ROI with Payback Period so you know how long your capital remains tied up.",
    ],
    faqs: [
      {
        question: "What is a good business ROI?",
        answer:
          "It depends on risk and industry. Marketing campaigns often target 300%–500% ROAS/ROI, while capital equipment or real estate investments commonly target 12%–25%+ annualized ROI.",
      },
      {
        question: "What is the difference between ROI and ROAS?",
        answer:
          "ROAS (Return on Ad Spend) only divides ad revenue by ad spend, ignoring product cost and overhead. ROI accounts for all costs to measure true profitability.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. A negative ROI means the project generated less value than the total capital and costs invested.",
      },
      {
        question: "Why does annualized ROI matter?",
        answer:
          "Standard ROI ignores time. Annualized ROI standardizes returns to a per-year rate so you can fairly compare a 3-month campaign against a 3-year expansion.",
      },
    ],
  },
  "freelance-rate": {
    overview:
      "Many independent consultants and freelancers underprice their services by dividing a salaried income by 2,080 hours. In reality, freelancers must cover non-billable admin and sales time, self-employment taxes, health insurance, software subscriptions, and unpaid vacation. This calculator builds a sustainable hourly, daily, and weekly rate from the ground up.",
    formulaTitle: "Sustainable Freelance Hourly Rate",
    formulaText: "Hourly Rate = (Target Net Income ÷ (1 − Tax Rate) + Annual Business Expenses) ÷ Annual Billable Hours",
    formulaVariables: [
      "Annual Billable Hours = Billable Hours/Week × (52 − Vacation & Sick Weeks)",
      "Tax Buffer = Combined income + self-employment tax estimate",
      "Business Expenses = Software, hardware, insurance, accounting, marketing",
    ],
    tips: [
      "Most full-time freelancers realistically bill 25 to 30 hours per week; the remaining 10–15 hours go to marketing, proposals, invoicing, and learning.",
      "Once you know your minimum viable hourly rate, consider quoting fixed project or value-based fees so efficiency rewards you rather than penalizing you.",
      "Set aside 25%–30% of every client payment into a dedicated tax savings account.",
    ],
    faqs: [
      {
        question: "Why is a freelance hourly rate higher than an employee's hourly wage?",
        answer:
          "Employees receive paid time off, employer payroll tax contributions, health benefits, and steady utilization. Freelancers must bake all of those costs plus non-billable time into their rate.",
      },
      {
        question: "How many billable hours per week is realistic?",
        answer:
          "A standard benchmark is 60%–75% utilization (roughly 24–30 billable hours out of a 40-hour workweek).",
      },
      {
        question: "How should I calculate my day rate?",
        answer:
          "Multiply your target hourly rate by 8 hours (or 7–8 focused consulting hours). Day rates simplify scoping for workshops and advisory work.",
      },
      {
        question: "When should freelancers raise their rates?",
        answer:
          "If your booking calendar is consistently 80%+ full or prospects rarely push back on price, it is usually time to raise rates for new clients by 15%–25%.",
      },
    ],
  },
  "debt-payoff": {
    overview:
      "When juggling multiple credit cards, personal loans, or auto loans, choosing a structured repayment strategy makes a dramatic difference. The Debt Avalanche method targets the highest-APR balance first to minimize total interest paid, while the Debt Snowball method targets the smallest balance first to build quick psychological wins.",
    formulaTitle: "Snowball vs. Avalanche Rollover Engine",
    formulaText: "Extra Payment + Paid-Off Minimums → Rolled into Next Priority Debt",
    formulaVariables: [
      "Debt Avalanche = Prioritizes highest interest rate (lowest total cost)",
      "Debt Snowball = Prioritizes lowest balance (fastest first payoff)",
      "Extra Monthly Budget = Additional cash above combined minimum payments",
    ],
    tips: [
      "Always pay at least the minimum on every account to protect your credit score and avoid late fees.",
      "When one debt is eliminated, roll its entire previous payment into the next target debt—this creates the accelerating 'snowball' effect.",
      "If the interest gap between Avalanche and Snowball is small, choose whichever method keeps you most consistent.",
    ],
    faqs: [
      {
        question: "Which saves more money: Debt Snowball or Debt Avalanche?",
        answer:
          "Mathematically, the Debt Avalanche always saves the most interest (or ties) because it eliminates the most expensive APR dollars first.",
      },
      {
        question: "Why do many people still choose Debt Snowball?",
        answer:
          "Paying off a small balance quickly frees up a monthly bill and delivers momentum, which research shows helps many borrowers stick with their plan long-term.",
      },
      {
        question: "Should I build an emergency fund before aggressively paying debt?",
        answer:
          "Yes—keeping a starter emergency fund (e.g., $1,000 to one month of expenses) prevents unexpected car or medical bills from going right back onto high-interest credit cards.",
      },
      {
        question: "Can debt consolidation help?",
        answer:
          "Consolidating high-APR credit cards into a lower-APR personal loan or 0% balance transfer card can accelerate payoff, provided you avoid running balances back up.",
      },
    ],
  },
  "credit-card-payoff": {
    overview:
      "Credit cards carry some of the highest interest rates in personal finance, frequently exceeding 20%–29% APR. Paying only the minimum payment can keep a modest balance dragging on for over a decade while doubling or tripling the original cost. This calculator reveals your exact payoff timeline and how much interest you save by increasing your monthly payment.",
    formulaTitle: "Months to Pay Off Credit Card Balance",
    formulaText: "N = −ln(1 − (B × r) / PMT) ÷ ln(1 + r)",
    formulaVariables: [
      "B = Current credit card balance",
      "r = Monthly interest rate (APR ÷ 12)",
      "PMT = Fixed monthly payment (must exceed monthly interest B × r)",
    ],
    tips: [
      "Stop adding new charges to a card you are actively paying down so your balance drops cleanly every statement cycle.",
      "Call your card issuer to request an APR reduction—long-standing customers with on-time payment histories often succeed.",
      "Paying twice a month (e.g., every payday) lowers your average daily balance and trims interest slightly faster.",
    ],
    faqs: [
      {
        question: "What happens if my monthly payment is less than the monthly interest?",
        answer:
          "Your balance will never be paid off and will actually grow each month due to negative amortization. Always pay substantially more than the monthly interest charge.",
      },
      {
        question: "How is credit card interest calculated?",
        answer:
          "Most issuers compute a daily periodic rate (APR ÷ 365) and multiply it by your average daily balance across the billing cycle.",
      },
      {
        question: "Will paying off my credit card improve my credit score?",
        answer:
          "Yes. Lowering your credit utilization ratio (balance divided by credit limit) below 30%—and ideally under 10%—is one of the fastest ways to boost a credit score.",
      },
      {
        question: "Should I close the credit card after paying it off?",
        answer:
          "Usually keeping a no-annual-fee card open with a $0 balance helps your credit score by preserving your total credit limit and length of credit history.",
      },
    ],
  },
  "salary-converter": {
    overview:
      "Whether you are evaluating a new job offer, comparing an hourly contract to a salaried role, or building a monthly household budget, converting between annual, monthly, bi-weekly, weekly, and hourly pay gives you instant clarity. Add an estimated effective tax rate and pre-tax deductions to estimate your realistic take-home paycheck.",
    formulaTitle: "Pay Frequency & Net Pay Conversion",
    formulaText: "Hourly Rate = Annual Salary ÷ (Hours/Week × Weeks/Year)  |  Net Pay = Gross Pay × (1 − Effective Tax Rate) − Pre-Tax Deductions",
    formulaVariables: [
      "Standard Full-Time Year = 40 hours/week × 52 weeks = 2,080 hours",
      "Effective Tax Rate = Combined federal, state/provincial, and payroll taxes",
    ],
    tips: [
      "When comparing an hourly contract to a W-2 salary, remember to factor in paid vacation, employer health coverage, and retirement matching.",
      "Bi-weekly pay means 26 paychecks per year (giving you two 'extra' three-paycheck months annually), while semi-monthly means 24 paychecks.",
      "Use your net monthly take-home pay—not gross salary—when setting rent, mortgage, and savings budgets.",
    ],
    faqs: [
      {
        question: "How many working hours are in a standard year?",
        answer:
          "A standard full-time schedule of 40 hours per week for 52 weeks equals 2,080 paid hours per year (including paid holidays and PTO).",
      },
      {
        question: "What is the difference between marginal and effective tax rate?",
        answer:
          "Your marginal tax rate applies only to your top bracket of income, whereas your effective tax rate is the actual average percentage of total income paid in taxes.",
      },
      {
        question: "How does bi-weekly differ from semi-monthly pay?",
        answer:
          "Bi-weekly pays every two weeks (26 paychecks/year). Semi-monthly pays twice a month—such as the 1st and 15th (24 paychecks/year).",
      },
      {
        question: "Does this replace a certified tax filing calculator?",
        answer:
          "No. This tool provides a fast planning estimate using your chosen effective tax rate; actual withholdings vary by filing status, credits, and local tax laws.",
      },
    ],
  },
  "net-worth": {
    overview:
      "Net worth is the single clearest scorecard of your overall financial health. It subtracts everything you owe (liabilities) from everything you own (assets). Tracking your net worth quarterly lets you see real progress from both growing investments and paying down debt.",
    formulaTitle: "Personal Net Worth Formula",
    formulaText: "Net Worth = Total Assets − Total Liabilities",
    formulaVariables: [
      "Assets = Cash & Savings + Investments & Retirement + Real Estate + Vehicles & Business Equity",
      "Liabilities = Mortgage + Student Loans + Auto Loans + Credit Cards & Other Debt",
      "Debt-to-Asset Ratio = (Total Liabilities ÷ Total Assets) × 100",
    ],
    tips: [
      "Use conservative, realistic market values for homes and vehicles rather than optimistic estimates.",
      "Don't be discouraged by a negative net worth early in your career (e.g., after student loans)—focus on the quarterly upward trend.",
      "Update your net worth snapshot on the same date every quarter to stay motivated and spot financial leaks.",
    ],
    faqs: [
      {
        question: "Should I include my primary home in net worth?",
        answer:
          "Yes, include your home's realistic market value under assets and the remaining mortgage balance under liabilities. Many planners also track 'liquid net worth' separately (excluding home equity).",
      },
      {
        question: "What is a healthy Debt-to-Asset ratio?",
        answer:
          "Under 50% is generally considered solid for households with a mortgage, and trending steadily toward 0%–20% as you approach retirement indicates strong financial resilience.",
      },
      {
        question: "Does net worth include retirement accounts like 401(k) or IRA?",
        answer:
          "Yes. Include current balances of all retirement, brokerage, and HSA accounts.",
      },
      {
        question: "How often should I calculate my net worth?",
        answer:
          "Monthly or quarterly is ideal—frequent enough to guide decisions without reacting emotionally to daily market swings.",
      },
    ],
  },
  "mortgage-refinance": {
    overview:
      "Refinancing a mortgage replaces your existing home loan with a new loan—typically to secure a lower interest rate, shorten the loan term, or remove PMI. Because refinancing involves upfront closing costs (usually 2%–5% of the loan amount), calculating your exact break-even month tells you how long you must stay in the home to come out ahead.",
    formulaTitle: "Refinance Break-Even Month Formula",
    formulaText: "Break-Even Months = Closing Costs ÷ (Current Monthly P&I − New Monthly P&I)",
    formulaVariables: [
      "Current Monthly P&I = Remaining balance amortized over remaining years at your old rate",
      "New Monthly P&I = Refinanced balance amortized over the new term at the new rate",
      "Closing Costs = Appraisal, origination, title, and lender fees",
    ],
    tips: [
      "If you plan to sell or move before reaching the break-even month, refinancing usually loses money even at a lower rate.",
      "Be cautious about resetting a 22-year remaining mortgage back to a brand-new 30-year term—lower monthly payments can still cost more in total lifetime interest.",
      "Compare Loan Estimates from at least three lenders to negotiate origination fees down.",
    ],
    faqs: [
      {
        question: "How much lower should the interest rate be to refinance?",
        answer:
          "A classic rule of thumb is 0.50% to 0.75% lower, though on larger loan balances even a 0.375% drop can break even quickly if closing costs are low.",
      },
      {
        question: "What are typical refinance closing costs?",
        answer:
          "Refinance closing costs generally run 2% to 4% of the loan amount and include origination fees, appraisal, credit report, and title insurance.",
      },
      {
        question: "Should I roll closing costs into the new loan?",
        answer:
          "Rolling closing costs into the loan preserves upfront cash, but you will pay interest on those fees over the life of the new mortgage.",
      },
      {
        question: "Does refinancing affect my credit score?",
        answer:
          "Rate shopping with multiple mortgage lenders within a 14-to-45-day window is typically counted as a single hard inquiry by modern credit scoring models.",
      },
    ],
  },
  "sba-business-loan": {
    overview:
      "Small Business Administration (SBA 7(a)) loans and commercial term loans help entrepreneurs fund working capital, equipment purchases, acquisitions, or commercial real estate with longer repayment terms than short-term online financing. Factoring in origination or guarantee fees gives you an accurate picture of net cash received and true monthly debt service.",
    formulaTitle: "Business Loan Monthly Payment & Net Proceeds",
    formulaText: "Net Proceeds = Loan Amount × (1 − Origination Fee %)  |  M = L × [ r(1+r)^n ] / [ (1+r)^n − 1 ]",
    formulaVariables: [
      "L = Gross loan principal",
      "r = Monthly interest rate (Annual Rate ÷ 12)",
      "n = Repayment term in months",
    ],
    tips: [
      "Check your Debt Service Coverage Ratio (DSCR = Annual Net Operating Income ÷ Annual Loan Payments). Most SBA lenders look for a DSCR of 1.25× or higher.",
      "SBA 7(a) terms commonly run up to 10 years for working capital/equipment and up to 25 years for owner-occupied commercial real estate.",
      "Always verify whether the quoted rate is fixed or variable (tied to the Prime Rate).",
    ],
    faqs: [
      {
        question: "What is an SBA guarantee or origination fee?",
        answer:
          "SBA lenders typically charge a guarantee fee (often 0%–3.5% depending on loan size and current SBA fee schedules) plus packaging or closing costs.",
      },
      {
        question: "Are SBA loan interest payments tax-deductible?",
        answer:
          "Generally, interest paid on legitimate business loans is a deductible business expense, though principal repayments are not. Consult a CPA for your exact situation.",
      },
      {
        question: "What credit score do I need for an SBA 7(a) loan?",
        answer:
          "Most SBA preferred lenders look for a personal credit score of 680+ along with at least 2 years of business operating history and solid cash flow.",
      },
      {
        question: "Can I pay off an SBA loan early?",
        answer:
          "SBA 7(a) loans with terms under 15 years have no prepayment penalty. Loans with terms of 15+ years carry a declining prepayment penalty only during the first 3 years.",
      },
    ],
  },
  "cd-savings": {
    overview:
      "Certificates of Deposit (CDs) and High-Yield Savings Accounts (HYSAs) offer predictable, low-risk returns insured by the FDIC or NCUA up to applicable limits. Comparing maturity value across 6-month, 12-month, 24-month, and 60-month terms helps you build an optimal cash ladder without exposing short-term funds to stock market swings.",
    formulaTitle: "CD Compounding Maturity Formula",
    formulaText: "Maturity Value = P × (1 + r / n)^(n × t)",
    formulaVariables: [
      "P = Initial CD or savings deposit",
      "r = Annual interest rate (decimal)",
      "n = Compounding frequency per year (365 daily, 12 monthly, 4 quarterly)",
      "t = Term length in years (Months ÷ 12)",
    ],
    tips: [
      "Consider a CD ladder (splitting cash across 6-, 12-, 18-, and 24-month CDs) to capture higher yields while keeping regular liquidity windows.",
      "Always check the early withdrawal penalty before locking funds into a multi-year CD.",
      "Interest earned from CDs and savings accounts is generally taxed as ordinary income in the year it is credited.",
    ],
    faqs: [
      {
        question: "What is the difference between a CD and a High-Yield Savings Account?",
        answer:
          "A CD locks in a fixed interest rate for a set term in exchange for limited liquidity, whereas a HYSA lets you withdraw anytime but has a variable rate that can change.",
      },
      {
        question: "Are Certificates of Deposit safe?",
        answer:
          "CDs issued by FDIC-insured banks or NCUA-insured credit unions are protected up to $250,000 per depositor, per insured institution, per ownership category.",
      },
      {
        question: "What happens when my CD reaches maturity?",
        answer:
          "Most banks offer a 7-to-10-day grace period at maturity to withdraw or reinvest your funds before the CD automatically renews at the current prevailing rate.",
      },
      {
        question: "Does daily compounding beat monthly compounding?",
        answer:
          "Slightly—daily compounding produces a marginally higher effective yield than monthly compounding at the same nominal rate.",
      },
    ],
  },
  "dividend-income": {
    overview:
      "Dividend growth investing builds a rising stream of passive cash flow from profitable companies and dividend ETFs. When you enable DRIP (Dividend Reinvestment Plan), every quarterly or monthly payout automatically purchases additional shares—creating a double-compounding effect from both growing dividends and a growing share count.",
    formulaTitle: "Projected Annual Dividend Income",
    formulaText: "Annual Dividend = Future Portfolio Value × Projected Yield",
    formulaVariables: [
      "Starting Portfolio = Current invested balance",
      "Dividend Yield = Annual dividend per share ÷ share price",
      "Dividend Growth Rate = Annual percentage increase in dividend payouts",
    ],
    tips: [
      "Beware of 'yield traps'—extremely high yields (8%–15%+) can signal a distressed company at risk of cutting its dividend.",
      "Reinvesting dividends during your accumulation years dramatically accelerates future passive income.",
      "Qualified dividends held in taxable accounts often benefit from lower long-term capital gains tax rates compared to ordinary income.",
    ],
    faqs: [
      {
        question: "What is DRIP in dividend investing?",
        answer:
          "DRIP stands for Dividend Reinvestment Plan. Instead of taking cash payouts, your brokerage automatically buys more shares (including fractional shares) of the same stock or ETF.",
      },
      {
        question: "How much money do I need to make $1,000 a month in dividends?",
        answer:
          "To generate $12,000 per year ($1,000/month), you would need $300,000 invested at an average 4% dividend yield, or $400,000 at a 3% yield.",
      },
      {
        question: "Are dividend stocks guaranteed?",
        answer:
          "No. Companies can reduce or suspend dividends during recessions, which is why broad diversification across dividend ETFs or multiple sectors is important.",
      },
      {
        question: "How often do stocks pay dividends?",
        answer:
          "Most U.S. dividend stocks and ETFs pay quarterly (4 times per year), while select REITs and income ETFs distribute monthly.",
      },
    ],
  },
  "ecommerce-profit": {
    overview:
      "Selling on Amazon FBA, Shopify, or Etsy requires tracking every fee layer—not just product manufacturing cost. Referral commissions (often 15%), fulfillment/shipping fees, and Pay-Per-Click advertising (ACoS) can quickly turn a high-revenue product into a break-even item if you don't model true net profit per unit beforehand.",
    formulaTitle: "E-Commerce Unit Profit & ROI",
    formulaText: "Net Profit = Price − COGS − Shipping/FBA − (Price × Referral %) − (Price × Ad ACoS %)",
    formulaVariables: [
      "COGS = Landed unit manufacturing + freight cost",
      "Referral Fee = Marketplace commission (typically 15% on Amazon, ~2.9% payment fee on Shopify)",
      "Ad Spend (ACoS) = Advertising Cost of Sales as a percentage of selling price",
    ],
    tips: [
      "Target at least a 20%–30% net profit margin before ad spend so you have room to scale PPC campaigns profitably.",
      "Always include inbound freight, customs duties, packaging, and a 2%–5% returns buffer in your landed COGS.",
      "Bundling complementary low-cost accessories increases Average Order Value (AOV) while paying only one fulfillment fee.",
    ],
    faqs: [
      {
        question: "What is a good profit margin for Amazon FBA?",
        answer:
          "Most experienced FBA sellers aim for a 15%–25% net profit margin after all fees and PPC advertising, and a minimum 100% ROI on landed product cost.",
      },
      {
        question: "What does ACoS mean?",
        answer:
          "Advertising Cost of Sales (ACoS) is ad spend divided by ad-attributed sales. Your break-even ACoS equals your pre-ad profit margin.",
      },
      {
        question: "Can I use this for Shopify or WooCommerce stores?",
        answer:
          "Yes! Simply set the referral fee to your payment gateway fee (e.g., 2.9%) and enter your average shipping/3PL cost per order.",
      },
      {
        question: "What is the difference between net margin and ROI?",
        answer:
          "Net margin divides profit by selling price, while ROI divides profit by your upfront capital cost (COGS), showing how efficiently your inventory cash multiplies.",
      },
    ],
  },
  "saas-ltv-cac": {
    overview:
      "For software-as-a-service (SaaS), membership, and subscription businesses, unit economics determine whether growth creates value or burns cash. Comparing Customer Lifetime Value (LTV) against Customer Acquisition Cost (CAC) and tracking CAC Payback Period are the gold-standard metrics used by founders and investors.",
    formulaTitle: "SaaS LTV, LTV:CAC & Payback Formulas",
    formulaText: "LTV = (ARPU × Gross Margin %) ÷ Monthly Churn %  |  Payback (mos) = CAC ÷ (ARPU × Gross Margin %)",
    formulaVariables: [
      "ARPU = Average Revenue Per User (monthly subscription price)",
      "Gross Margin % = Revenue left after hosting, support, and payment fees (typically 70%–85% for SaaS)",
      "Monthly Churn % = Percentage of customers canceling each month",
    ],
    tips: [
      "The classic SaaS benchmark is an LTV:CAC ratio of 3:1 or higher and a CAC Payback Period under 12 months.",
      "Reducing monthly churn from 5% to 2.5% doubles your Customer Lifetime Value without spending an extra dollar on marketing.",
      "Offering annual billing discounts (e.g., 2 months free) accelerates cash collection and drastically improves CAC payback.",
    ],
    faqs: [
      {
        question: "What is a healthy LTV:CAC ratio for SaaS?",
        answer:
          "A ratio of 3:1 or higher is generally considered healthy. Under 1:1 means you lose money on every customer; above 5:1 may mean you are under-investing in growth.",
      },
      {
        question: "Why should gross margin be included in LTV?",
        answer:
          "Including gross margin ensures you measure true profit contribution per customer rather than raw top-line subscription revenue.",
      },
      {
        question: "What is CAC Payback Period?",
        answer:
          "CAC Payback Period is the number of months it takes for a new customer's gross profit to recover the sales and marketing cost spent to acquire them.",
      },
      {
        question: "How is average customer lifespan calculated from churn?",
        answer:
          "Average customer lifespan in months is simply 1 divided by the monthly churn rate (e.g., 4% monthly churn equals an average lifespan of 25 months).",
      },
    ],
  },
  "self-employment-tax": {
    overview:
      "Unlike W-2 employees whose employers cover half of Social Security and Medicare taxes, freelancers, independent contractors, and sole proprietors pay both the employer and employee shares—known as Self-Employment (SE) Tax (15.3% in the U.S. on 92.35% of net earnings)—in addition to regular income tax. Setting aside quarterly estimated payments prevents year-end tax surprises and penalties.",
    formulaTitle: "Self-Employment & Quarterly Tax Estimate",
    formulaText: "Net Profit = Gross Income − Business Deductions  |  SE Tax ≈ (Net Profit × 0.9235) × 15.3%",
    formulaVariables: [
      "Business Deductions = Software, home office, equipment, marketing, mileage, professional fees",
      "SE Tax Deduction = Half of SE tax is deductible when computing taxable income",
      "Quarterly Payment = Total Estimated Annual Tax ÷ 4",
    ],
    tips: [
      "Track every legitimate business expense throughout the year—every $1,000 in valid deductions reduces both your income tax and your self-employment tax.",
      "Automatically transfer 25%–30% of every paid client invoice into a separate high-yield tax savings account.",
      "In the U.S., quarterly estimated taxes are typically due April 15, June 15, September 15, and January 15.",
    ],
    faqs: [
      {
        question: "Why is self-employment tax calculated on 92.35% of net profit?",
        answer:
          "The IRS multiplies net self-employment earnings by 92.35% (1 − 7.65%) so self-employed individuals receive an equivalent adjustment to the employer share of FICA taxes.",
      },
      {
        question: "Who needs to pay quarterly estimated taxes?",
        answer:
          "In the U.S., freelancers and sole proprietors who expect to owe $1,000 or more in federal tax for the year generally must make quarterly estimated payments.",
      },
      {
        question: "Can an S-Corp election reduce self-employment tax?",
        answer:
          "Once net business profit exceeds roughly $70,000–$100,000+ per year, some business owners consult a CPA about electing S-Corp status to split income between a reasonable salary and distributions.",
      },
      {
        question: "Is this an official tax return calculation?",
        answer:
          "No. This is a fast planning estimator—actual liability depends on standard/itemized deductions, credits, Social Security wage caps, and state/local tax rules.",
      },
    ],
  },
  "emergency-fund": {
    overview:
      "An emergency fund is your financial shock absorber against job loss, medical bills, or urgent home and car repairs. Calculating your true essential monthly burn rate—stripped of optional dining and entertainment—shows the exact cash cushion needed to sleep soundly and avoid high-interest credit card debt.",
    formulaTitle: "Emergency Fund Target & Runway",
    formulaText: "Target Fund = Essential Monthly Expenses × Desired Months  |  Current Runway = Current Savings ÷ Essential Monthly Expenses",
    formulaVariables: [
      "Essential Monthly Expenses = Housing + Food + Utilities + Insurance + Minimum Debt Payments",
      "Desired Months = Typically 3–6 months (or 6–12 months for freelancers/single-income households)",
    ],
    tips: [
      "Keep your emergency fund in an FDIC-insured High-Yield Savings Account (HYSA) rather than stocks so it is never down 20% when you need it most.",
      "If 6 months feels intimidating, celebrate your first milestone of 1 full month of essential bills, then automate monthly transfers until you hit 3–6 months.",
      "Review your emergency fund target whenever your rent, mortgage, family size, or insurance costs change.",
    ],
    faqs: [
      {
        question: "How many months of expenses should I save?",
        answer:
          "Dual-income households with stable jobs often target 3–6 months; single-income households, commission earners, and business owners typically target 6–12 months.",
      },
      {
        question: "Should discretionary spending be included in my emergency fund?",
        answer:
          "No. Focus on bare-bones survival costs (housing, groceries, utilities, transportation, healthcare, and minimum debt payments) that you must pay even during an income disruption.",
      },
      {
        question: "What counts as a true financial emergency?",
        answer:
          "Unexpected job loss, urgent medical/dental bills, essential vehicle repairs, or critical home repairs (like a broken furnace or roof leak)—not vacations or planned holiday shopping.",
      },
      {
        question: "Should I invest my emergency fund in the stock market?",
        answer:
          "Generally no. Job losses often coincide with stock market downturns. Liquidity and principal preservation matter more than chasing higher returns for emergency cash.",
      },
    ],
  },
};
