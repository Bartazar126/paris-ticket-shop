"use client";

import { useEffect, useState } from "react";

type SettingsResponse = {
  publishableKey: string;
  secretKeyMasked: string;
  hasSecretKey: boolean;
  webhookSecretMasked: string;
  hasWebhookSecret: boolean;
  error?: string;
};

export function StripeSettingsForm() {
  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [secretMasked, setSecretMasked] = useState("");
  const [webhookMasked, setWebhookMasked] = useState("");
  const [hasSecret, setHasSecret] = useState(false);
  const [hasWebhook, setHasWebhook] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = (await res.json()) as SettingsResponse;
        if (!res.ok) throw new Error(data.error || "Betöltés sikertelen");
        if (cancelled) return;
        setPublishableKey(data.publishableKey || "");
        setSecretMasked(data.secretKeyMasked || "");
        setWebhookMasked(data.webhookSecretMasked || "");
        setHasSecret(data.hasSecretKey);
        setHasWebhook(data.hasWebhookSecret);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Betöltési hiba");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload: {
        publishableKey: string;
        secretKey?: string;
        webhookSecret: string;
      } = {
        publishableKey,
        webhookSecret,
      };
      if (secretKey.trim()) payload.secretKey = secretKey.trim();

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as SettingsResponse & { ok?: boolean };
      if (!res.ok) throw new Error(data.error || "Mentés sikertelen");
      setPublishableKey(data.publishableKey || "");
      setSecretMasked(data.secretKeyMasked || "");
      setWebhookMasked(data.webhookSecretMasked || "");
      setHasSecret(data.hasSecretKey);
      setHasWebhook(data.hasWebhookSecret);
      setSecretKey("");
      setMessage("Stripe beállítások mentve");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mentés sikertelen");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="admin-avail-hint">Betöltés…</p>;
  }

  return (
    <form className="admin-settings-form" onSubmit={(e) => void onSave(e)}>
      <div>
        <label className="admin-label" htmlFor="stripe-pk">
          Publishable key
        </label>
        <input
          id="stripe-pk"
          className="admin-input"
          value={publishableKey}
          onChange={(e) => setPublishableKey(e.target.value)}
          placeholder="pk_test_…"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div>
        <label className="admin-label" htmlFor="stripe-sk">
          Secret key
        </label>
        <input
          id="stripe-sk"
          type="password"
          className="admin-input"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder={
            hasSecret
              ? `Mentve: ${secretMasked} (hagyd üresen, ha nem változik)`
              : "sk_test_…"
          }
          autoComplete="new-password"
          spellCheck={false}
        />
        <p className="admin-avail-hint" style={{ marginTop: "0.4rem" }}>
          A secret key soha nem jelenik meg teljes egészében. Új értékkel
          felülírod.
        </p>
      </div>

      <div>
        <label className="admin-label" htmlFor="stripe-wh">
          Webhook secret{" "}
          <span style={{ fontWeight: 500, color: "#6b7280" }}>(opcionális)</span>
        </label>
        <input
          id="stripe-wh"
          type="password"
          className="admin-input"
          value={webhookSecret}
          onChange={(e) => setWebhookSecret(e.target.value)}
          placeholder={
            hasWebhook
              ? `Mentve: ${webhookMasked}`
              : "whsec_… (egyelőre üresen hagyható)"
          }
          autoComplete="new-password"
          spellCheck={false}
        />
        <p className="admin-avail-hint" style={{ marginTop: "0.4rem" }}>
          Webhook nélkül a thank you oldal erősíti meg a fizetést. Ha később
          bekötöd, ide tedd a Stripe webhook secretet.
        </p>
      </div>

      {message ? <p className="admin-ok">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      <button type="submit" className="admin-btn" disabled={saving}>
        {saving ? "Mentés…" : "Beállítások mentése"}
      </button>
    </form>
  );
}
