"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";

const languages = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
  { code: "IT", label: "Italiano" },
] as const;

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof languages)[number]>(
    languages[0],
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className="relative inline-block h-10 w-20">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="font-display inline-flex h-10 w-20 items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center text-sm font-normal text-[#222] select-none hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15399b] md:px-2"
      >
        <Image
          src="/paristicketshop/flags/united-kingdom_991x991.webp"
          alt=""
          width={24}
          height={16}
          className="mr-1 hidden h-4 w-4 -mt-0.5 overflow-hidden rounded-full object-cover min-[330px]:inline-block"
          unoptimized
        />
        <span>{selected.code}</span>
        <ChevronDownIcon className="h-3 w-3 shrink-0 opacity-70" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[8rem] rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
        >
          {languages.map((language) => (
            <li
              key={language.code}
              role="option"
              aria-selected={selected.code === language.code}
            >
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-zinc-100"
                onClick={() => {
                  setSelected(language);
                  setOpen(false);
                }}
              >
                {language.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
