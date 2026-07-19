"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "not_admin"
      ? "Ez a fiók nem admin."
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signError || !data.user) {
      setLoading(false);
      setError(signError?.message || "Sikertelen belépés");
      return;
    }

    const { data: admin } = await supabase
      .from("pts_admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .eq("is_active", true)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Ez a fiók nem admin.");
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="admin-root admin-login">
      <div className="admin-login-card">
        <strong style={{ color: "var(--a-blue)" }}>LEVENTE DIGITAL</strong>
        <div style={{ fontSize: "0.75rem", color: "var(--a-muted)" }}>
          FOSVER &amp; MARKETING
        </div>
        <h1>Admin bejelentkezés</h1>
        <p className="hint">Paris Ticket Shop kezelőfelület</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="admin-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="password">
              Jelszó
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoComplete="current-password"
            />
          </div>
          {error ? (
            <p className="admin-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={loading} className="admin-btn w-full">
            {loading ? "Belépés…" : "Belépés"}
          </button>
        </form>
      </div>
    </div>
  );
}
