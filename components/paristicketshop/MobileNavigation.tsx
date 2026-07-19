"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navLinks } from "@/data/products";
import { CloseIcon } from "./icons/FeatureIcons";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] min-[992px]:hidden">
      <button
        type="button"
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <nav
        aria-label="Mobile"
        className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
          <span className="text-lg font-semibold text-blue-900">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-800 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <CloseIcon />
          </button>
        </div>
        <ul className="flex flex-1 list-none flex-col overflow-y-auto px-2 py-3">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block w-full rounded-lg px-3 py-3 text-[1.125rem] hover:bg-zinc-100 ${
                    isActive ? "text-[#e01b1b]" : "text-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2 border-t border-stone-200 px-3 pt-4">
            <Link
              href="/search"
              onClick={onClose}
              className="block rounded-lg py-2 text-neutral-800 hover:bg-zinc-100"
            >
              Search
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-2 border-t border-stone-200 px-4 py-4">
          <LanguageSelector />
          <CurrencySelector />
        </div>
      </nav>
    </div>
  );
}
