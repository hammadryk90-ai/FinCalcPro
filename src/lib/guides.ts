export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  updatedAt: string;
  relatedCalculatorSlug: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: "mortgage-amortization-guide",
    title: "How Mortgage Amortization Works & 5 Ways to Save $50,000+ in Interest",
    excerpt:
      "Learn how lenders split your monthly mortgage payment between principal and interest, and discover proven payoff strategies that cut years off your loan.",
    category: "Loans & Real Estate",
    readTime: "6 min read",
    updatedAt: "November 2026",
    relatedCalculatorSlug: "mortgage",
    sections: [
      {
        heading: "Understanding Front-Loaded Mortgage Interest",
        paragraphs: [
          "When you take out a standard 30-year fixed-rate mortgage, your monthly principal-and-interest payment stays identical every single month. However, the composition of that payment shifts dramatically over time. In year one of a $360,000 mortgage at 6.5% APR, nearly 85% of your payment goes purely toward interest, while only a small fraction reduces your loan balance.",
          "This happens because mortgage interest is recalculated each month on your remaining unpaid principal. As you chip away at the principal, less interest accrues the following month, allowing a progressively larger share of your fixed payment to retire debt—a process known as amortization.",
        ],
      },
      {
        heading: "5 Practical Ways to Slash Total Mortgage Interest",
        paragraphs: [
          "1. Add a small recurring principal payment: Adding just $200 per month directly to principal on a $360,000, 6.5% loan can save over $85,000 in interest and trim more than 5 years off a 30-year schedule.",
          "2. Switch to bi-weekly payments: Paying half of your monthly mortgage every two weeks produces 26 half-payments per year—the equivalent of 13 full monthly payments instead of 12.",
          "3. Eliminate PMI as soon as you hit 20% equity: If you bought with less than 20% down, track your home's loan-to-value ratio and request PMI cancellation once you cross the 80% threshold.",
          "4. Refinance strategically when rates drop by 0.75%+: Compare closing costs against monthly savings to verify your break-even month before refinancing.",
          "5. Compare 15-year vs. 30-year terms: If your cash flow comfortably supports it, a 15-year mortgage typically carries a lower interest rate and cuts total interest by more than half.",
        ],
      },
      {
        heading: "Model Your Exact Numbers",
        paragraphs: [
          "Every borrower's tax bracket, emergency reserve, and investment alternatives differ. Before committing extra cash to your mortgage, compare your mortgage APR against the after-tax return you could earn in retirement accounts or high-yield savings, and run your exact numbers in our free Mortgage and Loan Amortization calculators.",
        ],
      },
    ],
  },
  {
    slug: "compound-interest-and-4-percent-rule",
    title: "Compound Interest & The 4% Rule: A Practical Roadmap to Financial Independence",
    excerpt:
      "See how consistent monthly investing, employer matches, and low fees compound into lifelong retirement income using the 4% safe withdrawal framework.",
    category: "Investing & Retirement",
    readTime: "7 min read",
    updatedAt: "November 2026",
    relatedCalculatorSlug: "retirement",
    sections: [
      {
        heading: "Why Time Beats Timing in Compound Growth",
        paragraphs: [
          "Compound interest rewards patience disproportionately. Consider two investors earning an 8% average annual return: Investor A invests $400/month from age 25 to 35 (totaling $48,000) and then stops contributing completely. Investor B waits until age 35 and invests $400/month all the way to age 65 (totaling $144,000). By age 65, Investor A still ends up with a larger portfolio despite contributing one-third as much cash.",
          "The takeaway is clear: starting early—even with modest monthly amounts—puts compounding curves to work in your favor decades sooner.",
        ],
      },
      {
        heading: "How the 4% Safe Withdrawal Rule Translates Savings into Income",
        paragraphs: [
          "Once you reach retirement, the core question shifts from 'How much can I grow?' to 'How much can I safely spend without running out of money?' The 4% rule, popularized by the Trinity Study, found that a diversified stock-and-bond portfolio historically survived 30-year retirement horizons when retirees withdrew 4% in year one and adjusted that dollar figure for inflation each year.",
          "In practical terms, multiply your desired annual portfolio income by 25 to estimate your target nest egg. For example, generating $60,000 per year from investments requires roughly $1.5 million ($60,000 × 25).",
        ],
      },
      {
        heading: "Protecting Your Plan Against Inflation and Fees",
        paragraphs: [
          "Two silent drags can erode retirement projections: high investment expense ratios and inflation. Favoring low-cost index funds (under 0.10% annual fees) and running projections with inflation-adjusted returns (e.g., 6% real return instead of 9% nominal) keeps your retirement target grounded in today's purchasing power.",
        ],
      },
    ],
  },
  {
    slug: "profit-margin-vs-markup-pricing",
    title: "Profit Margin vs. Markup: Pricing Strategies for Profitable Small Businesses",
    excerpt:
      "Avoid the #1 pricing mistake that drains e-commerce and service profits. Learn the exact relationship between margin, markup, and break-even volume.",
    category: "Business & Pricing",
    readTime: "5 min read",
    updatedAt: "November 2026",
    relatedCalculatorSlug: "profit-margin",
    sections: [
      {
        heading: "The Expensive Confusion Between Margin and Markup",
        paragraphs: [
          "Suppose a product costs you $50 to manufacture and deliver. If you apply a 50% markup, you sell it for $75, earning $25 in gross profit. Many founders assume they just earned a 50% profit margin—but $25 divided by $75 is actually a 33.3% gross profit margin.",
          "When that same business later offers a '25% off holiday sale,' the selling price drops to $56.25, leaving only $6.25 to cover advertising, payment processing, rent, and payroll—turning a busy sales month into a net loss.",
        ],
      },
      {
        heading: "Quick Conversion Benchmarks",
        paragraphs: [
          "To achieve a 25% gross margin, you need a 33.3% markup. To achieve a 40% gross margin, you need a 66.7% markup. To achieve a 50% gross margin (keystone pricing), you need a 100% markup (doubling your cost).",
          "Always anchor your pricing sheet to target gross and net profit margins, and verify how many units you need to sell each month to cover fixed overhead using our Break-Even Point Calculator.",
        ],
      },
    ],
  },
  {
    slug: "debt-snowball-vs-avalanche",
    title: "Debt Snowball vs. Debt Avalanche: Which Strategy Gets You Debt-Free Faster?",
    excerpt:
      "A side-by-side breakdown of the two most popular debt elimination methods, when each one wins, and how to build a realistic payoff plan.",
    category: "Debt & Income",
    readTime: "5 min read",
    updatedAt: "November 2026",
    relatedCalculatorSlug: "debt-payoff",
    sections: [
      {
        heading: "How Both Methods Work",
        paragraphs: [
          "Both Debt Snowball and Debt Avalanche follow the same core discipline: pay the minimum required amount on every debt to stay current, and direct every extra dollar in your monthly budget toward a single priority debt. Once that debt hits $0, roll its entire payment into the next target debt.",
          "The only difference is how you rank your debts. Debt Avalanche ranks them from highest APR to lowest APR. Debt Snowball ranks them from smallest balance to largest balance.",
        ],
      },
      {
        heading: "Choosing the Right Method for Your Situation",
        paragraphs: [
          "Choose Debt Avalanche if you have large high-APR credit card balances (20%–29% APR) alongside lower-rate auto or student loans. Eliminating the highest-rate debt first guarantees the lowest total interest paid.",
          "Choose Debt Snowball if you feel overwhelmed by five or six separate bills and need quick wins to stay motivated. Paying off a small $600 balance in month two simplifies your monthly cash flow and builds lasting momentum.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
