"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const currencies = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
] as const;

export type Currency = (typeof currencies)[number];
export type CurrencyCode = Currency["code"];

type CurrencyContextValue = {
  currency: Currency;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function formatAmount(amount: number, symbol: string) {
  const formatted = amount.toFixed(2).replace(".", ",");
  return `${symbol} ${formatted}`;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);

  const setCurrencyCode = useCallback((code: CurrencyCode) => {
    const next = currencies.find((item) => item.code === code);
    if (next) setCurrency(next);
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrencyCode,
      formatPrice: (amount: number) => formatAmount(amount, currency.symbol),
    }),
    [currency, setCurrencyCode],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
