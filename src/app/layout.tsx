import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fincalcpro.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FinCalcPro — Free Personal Finance & Business Calculators",
    template: "%s | FinCalcPro",
  },
  description:
    "24 free, accurate personal finance and business calculators including Mortgage, Refinance, SBA Business Loan, Compound Interest, Dividend Income, Retirement 401(k), Amazon FBA Profit, SaaS LTV/CAC, Self-Employment Tax, and Debt Payoff.",
  keywords: [
    "personal finance calculators",
    "business calculators",
    "mortgage calculator",
    "compound interest calculator",
    "retirement calculator",
    "profit margin calculator",
    "debt snowball calculator",
    "rental property ROI calculator",
  ],
  openGraph: {
    type: "website",
    siteName: "FinCalcPro",
    title: "FinCalcPro — Free Personal Finance & Business Calculators",
    description:
      "Make smarter financial and business decisions with free, transparent, interactive calculators and guides.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {adsenseClientId && (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        <CurrencyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </CurrencyProvider>
      </body>
    </html>
  );
}
