export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  { code: "PKR", symbol: "Rs", name: "Pakistani Rupee", locale: "en-PK" },
  { code: "AED", symbol: "AED", name: "UAE Dirham", locale: "en-AE" },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];

export function formatCurrency(
  value: number,
  currency: CurrencyConfig = DEFAULT_CURRENCY,
  maximumFractionDigits = 2
): string {
  if (!Number.isFinite(value)) return `${currency.symbol}0`;
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 2,
      maximumFractionDigits,
    }).format(value);
  } catch {
    return `${currency.symbol}${value.toFixed(maximumFractionDigits)}`;
  }
}

export function formatCompactCurrency(
  value: number,
  currency: CurrencyConfig = DEFAULT_CURRENCY
): string {
  if (!Number.isFinite(value)) return `${currency.symbol}0`;
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000) {
    return `${sign}${currency.symbol}${(abs / 1_000_000_000).toFixed(2)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${currency.symbol}${(abs / 1_000_000).toFixed(2)}M`;
  }
  if (abs >= 10_000) {
    return `${sign}${currency.symbol}${(abs / 1_000).toFixed(1)}K`;
  }
  return formatCurrency(value, currency, 0);
}

export function formatPercent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(digits)}%`;
}

export function formatNumber(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}
