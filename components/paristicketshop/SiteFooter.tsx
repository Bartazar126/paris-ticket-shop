import Link from "next/link";
import { Logo } from "./icons/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full bg-gray-600 p-4 text-white">
      <div className="pts-container pb-9 pt-5">
        <div className="flex flex-wrap -mx-4">
          <div className="mb-6 w-full shrink-0 px-4 lg:mb-0 lg:w-2/3">
            <div className="mb-5 max-w-[12.5rem]">
              <Link
                href="/"
                className="inline-block h-24 w-full"
                aria-label="Paris Ticket Shop home"
              >
                <Logo className="h-24 w-full" variant="footer" />
              </Link>
            </div>
            <p className="mb-4 max-w-3xl text-sm leading-6 text-white/90 md:text-base">
              This website operates as an independent provider of tourist
              services and is not affiliated with, sponsored by, authorized by,
              or operated by the Louvre Museum or any of its official managing
              entities
            </p>
          </div>

          <div className="mb-6 w-full shrink-0 px-4 sm:w-1/2 lg:mb-0 lg:w-1/6">
            <div className="font-display mb-4 text-2xl font-bold leading-[2.13rem]">About</div>
            <ul className="list-none">
              <li className="relative py-1">
                <Link
                  href="/blog"
                  className="flex items-center opacity-[0.44] transition hover:opacity-100"
                >
                  Adventure Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full shrink-0 px-4 sm:w-1/2 lg:w-1/6">
            <div className="font-display mb-4 text-2xl font-bold leading-[2.13rem]">
              Contact us
            </div>
            <ul className="mb-4 list-none opacity-[0.44]">
              <li>
                <a
                  href="mailto:info@paristicketshop.com"
                  className="hover:opacity-100"
                >
                  info@paristicketshop.com
                </a>
              </li>
            </ul>
            <ul className="list-none">
              <li className="relative py-1">
                <Link
                  href="/contact"
                  className="flex items-center opacity-[0.44] transition hover:opacity-100"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pts-container py-4">
        <div className="border-t-2 border-solid border-white/44 pt-4 opacity-[0.44]">
          <ul className="flex list-none flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm md:text-base">
            <li>
              <Link href="/privacy-policy" className="hover:opacity-100">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:opacity-100">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:opacity-100">
                Refund Policy
              </Link>
            </li>
            <li>
              <span>© 2025.</span> Paris Ticket Shop All rights reserved!
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
