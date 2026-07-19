"use client";

import Link from "next/link";
import { useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { DesktopNavigation } from "./DesktopNavigation";
import { MenuIcon, SearchIcon } from "./icons/FeatureIcons";
import { Logo } from "./icons/Logo";
import { LanguageSelector } from "./LanguageSelector";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-[1020] h-24 w-full bg-white">
        <div className="pts-container h-24">
          <nav
            aria-label="Primary"
            className="relative flex h-24 w-full items-center justify-between gap-2 py-5"
          >
            <Link
              href="/"
              className="mr-2 inline-block h-14 w-full max-w-[7.25rem] shrink-0 md:max-w-[7.19rem]"
              aria-label="Paris Ticket Shop home"
            >
              <Logo className="h-14 w-full" variant="header" />
            </Link>

            <DesktopNavigation />

            <div className="hidden shrink-0 items-center min-[992px]:flex">
              <Link
                href="/search"
                className="mx-3 inline-flex h-6 w-5 shrink-0 items-center justify-center text-[#222] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15399b]"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </Link>
              <LanguageSelector />
              <CurrencySelector />
            </div>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center rounded-lg p-2 text-[#222] hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15399b] min-[992px]:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </button>
          </nav>
        </div>
      </div>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
