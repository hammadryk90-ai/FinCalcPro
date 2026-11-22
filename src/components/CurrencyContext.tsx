"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CURRENCIES, CurrencyConfig, DEFAULT_CURRENCY } from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyConfig;
  setCurrencyByCode: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: DEFAULT_CURRENCY,
  setCurrencyByCode: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyConfig>(DEFAULT_CURRENCY);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("fincalc_currency");
      if (saved) {
        const match = CURRENCIES.find((c) => c.code === saved);
        if (match) setCurrency(match);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCurrencyByCode = (code: string) => {
    const match = CURRENCIES.find((c) => c.code === code);
    if (match) {
      setCurrency(match);
      try {
        window.localStorage.setItem("fincalc_currency", match.code);
      } catch {
        // ignore storage errors
      }
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyByCode }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
