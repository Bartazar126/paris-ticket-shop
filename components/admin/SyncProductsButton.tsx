"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SyncProductsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function sync() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/sync-products", { method: "POST" });
      const data = (await res.json()) as { count?: number; error?: string };
      if (!res.ok) {
        setMessage(data.error || "Hiba");
        return;
      }
      setMessage(`${data.count ?? 0} termék szinkronizálva`);
      router.refresh();
    } catch {
      setMessage("Hálózati hiba");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={sync}
        disabled={loading}
        className="admin-btn"
      >
        {loading ? "Szinkron…" : "Szinkron a katalógusból"}
      </button>
      {message ? (
        <span className="text-xs text-slate-500">{message}</span>
      ) : null}
    </div>
  );
}
