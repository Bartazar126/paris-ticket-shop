"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CreateAdminForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        user?: { email: string };
      };
      if (!res.ok) {
        setError(data.error || "Hiba történt.");
        return;
      }
      setSuccess(`Fiók létrehozva: ${data.user?.email}`);
      setFullName("");
      setEmail("");
      setPassword("");
      router.refresh();
    } catch {
      setError("Hálózati hiba.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="admin-label" htmlFor="fullName">
          Teljes név
        </label>
        <input
          id="fullName"
          className="admin-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="admin-label" htmlFor="newEmail">
          Email
        </label>
        <input
          id="newEmail"
          type="email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label className="admin-label" htmlFor="newPassword">
          Ideiglenes jelszó
        </label>
        <input
          id="newPassword"
          type="text"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      {error ? <p className="admin-error sm:col-span-2">{error}</p> : null}
      {success ? <p className="admin-ok sm:col-span-2">{success}</p> : null}
      <div className="sm:col-span-2">
        <button type="submit" disabled={loading} className="admin-btn">
          {loading ? "Létrehozás…" : "Fiók létrehozása"}
        </button>
      </div>
    </form>
  );
}
