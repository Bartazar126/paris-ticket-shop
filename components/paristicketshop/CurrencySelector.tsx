"use client";

import { useEffect, useRef, useState } from "react";
import { currencies, useCurrency } from "./CurrencyContext";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";

export function CurrencySelector() {
  const { currency, setCurrencyCode } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className="relative inline-block h-10 min-w-20">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="font-display inline-flex h-10 min-w-20 items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center text-sm font-normal text-[#222] select-none hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15399b] md:px-2"
      >
        <span>
          {currency.symbol} {currency.code}
        </span>
        <ChevronDownIcon className="h-3 w-3 shrink-0 opacity-70" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[9rem] rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
        >
          {currencies.map((item) => (
            <li
              key={item.code}
              role="option"
              aria-selected={item.code === currency.code}
            >
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-zinc-100"
                onClick={() => {
                  setCurrencyCode(item.code);
                  setOpen(false);
                }}
              >
                {item.symbol} {item.code}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
