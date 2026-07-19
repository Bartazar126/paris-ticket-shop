"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ToggleAdminActive({
  userId,
  isActive,
  disabled,
}: {
  userId: string;
  isActive: boolean;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (disabled) return;
    setLoading(true);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, isActive: !isActive }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={() => void toggle()}
      className="admin-btn admin-btn--light h-8 text-xs"
    >
      {isActive ? "Deaktiválás" : "Aktiválás"}
    </button>
  );
}
