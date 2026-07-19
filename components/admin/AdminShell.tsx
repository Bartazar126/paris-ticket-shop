"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Főoldal", exact: true },
  { href: "/admin/products", label: "Áruház" },
  { href: "/admin/availability", label: "Elérhetőség" },
  { href: "/admin/bookings", label: "Foglalások" },
  { href: "/admin/articles", label: "Tartalomkezelő" },
  { href: "/admin/users", label: "Felhasználókezelő" },
  { href: "/admin/settings", label: "Beállítások" },
] as const;

type AdminShellProps = {
  fullName: string;
  email?: string;
  children: React.ReactNode;
};

export function AdminShell({ fullName, email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPendingHref(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    for (const item of NAV) {
      router.prefetch(item.href);
    }
  }, [router]);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  function go(href: string) {
    if (href === pathname) {
      setOpen(false);
      return;
    }
    setPendingHref(href);
    setOpen(false);
    startTransition(() => {
      router.push(href);
    });
  }

  const navigating = isPending || Boolean(pendingHref);
  const initials = fullName
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="admin-root admin-shell">
      <button
        type="button"
        className={`admin-backdrop${open ? " is-open" : ""}`}
        aria-label="Menü bezárása"
        onClick={() => setOpen(false)}
      />

      <aside className={`admin-sidebar${open ? " is-open" : ""}`}>
        <Link href="/admin" className="admin-brand" onClick={() => setOpen(false)}>
          <strong>LEVENTE DIGITAL</strong>
          <small>Fosver &amp; Marketing</small>
        </Link>

        <nav className="admin-nav">
          {NAV.map((item) => {
            const active =
              "exact" in item && item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            const pending = pendingHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`${active ? "is-active" : ""}${pending ? " is-pending" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="/" target="_blank" rel="noreferrer">
            Webshop megnyitása
          </a>
        </nav>

        <div className="admin-sidebar-foot">Paris Ticket Shop · v2.1</div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="admin-btn admin-btn--light admin-btn--menu lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Menü"
            >
              ☰
            </button>
            <h1 className="admin-topbar-title">Paris Ticket Shop</h1>
          </div>

          <div className="admin-user">
            <div className="admin-user-meta">
              <strong title={fullName}>{fullName}</strong>
              {email ? <span title={email}>{email}</span> : null}
            </div>
            <div className="admin-avatar" aria-hidden>
              {initials || "A"}
            </div>
            <button
              type="button"
              onClick={logout}
              className="admin-btn admin-btn--light"
            >
              Kilépés
            </button>
          </div>
        </header>

        <main className={`admin-main${navigating ? " is-navigating" : ""}`}>
          <div
            className={`admin-main-progress${navigating ? " is-on" : ""}`}
            aria-hidden
          >
            <i />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
