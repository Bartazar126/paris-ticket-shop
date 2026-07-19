"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/products";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <div className="hidden min-w-0 flex-1 items-center justify-start min-[992px]:flex">
      <ul className="flex list-none flex-row flex-wrap items-center">
        {navLinks.map((link, index) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li
              key={link.href}
              id={`li-${index + 1}`}
              className="flex items-center px-1"
            >
              <Link
                href={link.href}
                className={`pts-nav-link font-display relative rounded-lg px-[10px] py-2 text-[1.2em] font-normal leading-tight hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15399b] ${
                  isActive ? "text-[#e01b1b]" : "text-[#222]"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
