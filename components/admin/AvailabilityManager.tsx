"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import {
  BASE_ATTRACTIONS,
  getAffectedProducts,
  getTimeSlotsForAttraction,
  isFullDayClosure,
  type AttractionClosure,
  type BaseAttraction,
} from "@/data/attractions";

type ClosureRow = AttractionClosure & { id?: string };

function toIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function monthLabel(d: Date): string {
  return d.toLocaleDateString("hu-HU", { month: "long", year: "numeric" });
}

function rangeBounds(month: Date): { from: string; to: string } {
  const from = new Date(month.getFullYear(), month.getMonth(), 1);
  const to = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  return { from: toIso(from), to: toIso(to) };
}

function buildMonthCells(month: Date): (Date | null)[] {
  const first = startOfMonth(month);
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  // Monday-first
  const weekday = (first.getDay() + 6) % 7;
  const cells: (Date | null)[] = Array.from({ length: weekday }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function AvailabilityManager() {
  const [selectedId, setSelectedId] = useState(BASE_ATTRACTIONS[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [closures, setClosures] = useState<ClosureRow[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, startTransition] = useTransition();
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");

  const attraction = useMemo(
    () => BASE_ATTRACTIONS.find((a) => a.id === selectedId) ?? BASE_ATTRACTIONS[0],
    [selectedId],
  );

  const affected = useMemo(
    () => (attraction ? getAffectedProducts(attraction.id) : []),
    [attraction],
  );

  const slots = useMemo(
    () => (attraction ? getTimeSlotsForAttraction(attraction.id) : []),
    [attraction],
  );

  const byDate = useMemo(() => {
    const map = new Map<string, ClosureRow>();
    for (const row of closures) {
      map.set(row.closed_date.slice(0, 10), row);
    }
    return map;
  }, [closures]);

  const filteredAttractions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BASE_ATTRACTIONS;
    return BASE_ATTRACTIONS.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.shortLabel.toLowerCase().includes(q) ||
        a.id.includes(q),
    );
  }, [query]);

  const loadMonth = useCallback(
    async (attr: BaseAttraction, m: Date) => {
      const { from, to } = rangeBounds(m);
      const res = await fetch(
        `/api/admin/availability?attractionId=${encodeURIComponent(attr.id)}&from=${from}&to=${to}`,
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Nem sikerült betölteni a zárásokat");
      }
      const data = (await res.json()) as { closures: ClosureRow[] };
      setClosures(data.closures ?? []);
    },
    [],
  );

  const refreshCounts = useCallback(async () => {
    const today = toIso(new Date());
    const ahead = new Date();
    ahead.setDate(ahead.getDate() + 90);
    const to = toIso(ahead);
    const next: Record<string, number> = {};
    await Promise.all(
      BASE_ATTRACTIONS.map(async (attr) => {
        const res = await fetch(
          `/api/admin/availability?attractionId=${encodeURIComponent(attr.id)}&from=${today}&to=${to}`,
        );
        if (!res.ok) {
          next[attr.id] = 0;
          return;
        }
        const data = (await res.json()) as { closures: ClosureRow[] };
        next[attr.id] = data.closures?.length ?? 0;
      }),
    );
    setCounts(next);
  }, []);

  useEffect(() => {
    if (!attraction) return;
    let cancelled = false;
    startTransition(() => {
      void (async () => {
        try {
          setError(null);
          await loadMonth(attraction, month);
          if (!cancelled) await refreshCounts();
        } catch (e) {
          if (!cancelled) {
            setError(e instanceof Error ? e.message : "Hiba");
          }
        }
      })();
    });
    return () => {
      cancelled = true;
    };
  }, [attraction, loadMonth, month, refreshCounts]);

  async function upsertDay(date: string, closedTimes: string[] | null) {
    if (!attraction) return;
    setStatus(null);
    setError(null);
    const res = await fetch("/api/admin/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attractionId: attraction.id,
        date,
        closedTimes,
      }),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error || "Mentés sikertelen");
      return;
    }
    setStatus("Mentve");
    await loadMonth(attraction, month);
    await refreshCounts();
  }

  async function openDay(date: string) {
    if (!attraction) return;
    setStatus(null);
    setError(null);
    const res = await fetch("/api/admin/availability", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attractionId: attraction.id, date }),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error || "Megnyitás sikertelen");
      return;
    }
    setStatus("Nap megnyitva");
    await loadMonth(attraction, month);
    await refreshCounts();
  }

  async function toggleFullDay(date: string) {
    const existing = byDate.get(date);
    if (existing && isFullDayClosure(existing.closed_times)) {
      await openDay(date);
      return;
    }
    await upsertDay(date, null);
  }

  async function toggleSlot(date: string, slot: string) {
    const existing = byDate.get(date);
    if (!existing) {
      await upsertDay(date, [slot]);
      return;
    }
    if (isFullDayClosure(existing.closed_times)) {
      const next = slots.filter((s) => s !== slot);
      if (next.length === 0) {
        await openDay(date);
        return;
      }
      await upsertDay(date, next);
      return;
    }
    const set = new Set(existing.closed_times ?? []);
    if (set.has(slot)) set.delete(slot);
    else set.add(slot);
    const next = Array.from(set).sort();
    if (next.length === 0) {
      await openDay(date);
      return;
    }
    if (slots.length && next.length === slots.length) {
      await upsertDay(date, null);
      return;
    }
    await upsertDay(date, next);
  }

  async function runBulk(mode: "close_days" | "open_days") {
    if (!attraction || !rangeFrom || !rangeTo) {
      setError("Add meg a tartomány kezdetét és végét");
      return;
    }
    setStatus(null);
    setError(null);
    const res = await fetch("/api/admin/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attractionId: attraction.id,
        from: rangeFrom,
        to: rangeTo,
        mode,
      }),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error || "Tömeges művelet sikertelen");
      return;
    }
    setStatus(mode === "close_days" ? "Tartomány lezárva" : "Tartomány megnyitva");
    await loadMonth(attraction, month);
    await refreshCounts();
  }

  const cells = useMemo(() => buildMonthCells(month), [month]);
  const todayIso = toIso(new Date());
  const selectedClosure = selectedDate ? byDate.get(selectedDate) : undefined;

  function dayClass(iso: string): string {
    const row = byDate.get(iso);
    const classes = ["admin-avail-day"];
    if (iso === todayIso) classes.push("is-today");
    if (iso === selectedDate) classes.push("is-selected");
    if (row) {
      classes.push(
        isFullDayClosure(row.closed_times) ? "is-full" : "is-partial",
      );
    }
    if (iso < todayIso) classes.push("is-past");
    return classes.join(" ");
  }

  if (!attraction) return null;

  return (
    <div className="admin-avail">
      <aside className="admin-avail-list admin-card">
        <div className="admin-card-head">Alap vonzerők</div>
        <div className="admin-card-body admin-avail-list__body">
          <input
            className="admin-input"
            placeholder="Keresés…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Vonzerő keresése"
          />
          <ul className="admin-avail-attractions">
            {filteredAttractions.map((attr) => (
              <li key={attr.id}>
                <button
                  type="button"
                  className={`admin-avail-attraction${attr.id === attraction.id ? " is-active" : ""}`}
                  onClick={() => {
                    setSelectedId(attr.id);
                    setSelectedDate(null);
                    setStatus(null);
                    setError(null);
                  }}
                >
                  <span>
                    <strong>{attr.label}</strong>
                    <small>{attr.id}</small>
                  </span>
                  {(counts[attr.id] ?? 0) > 0 ? (
                    <span className="admin-pill admin-pill--gray">
                      {counts[attr.id]}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="admin-avail-main">
        <div className="admin-card">
          <div className="admin-card-head">
            <span>{attraction.label}</span>
            {busy ? (
              <span className="admin-pill admin-pill--gray">Betöltés…</span>
            ) : null}
          </div>
          <div className="admin-card-body">
            <p className="admin-avail-hint">
              A lezárás minden termékre és kombóra érvényes, amely ezt a
              vonzerőt tartalmazza.
            </p>
            <div className="admin-avail-chips">
              {affected.map((p) => (
                <span
                  key={p.slug}
                  className={`admin-avail-chip${p.isCombo ? " is-combo" : ""}`}
                  title={p.slug}
                >
                  {p.isCombo ? "Kombó · " : ""}
                  {p.title.length > 52 ? `${p.title.slice(0, 50)}…` : p.title}
                </span>
              ))}
            </div>

            {(status || error) && (
              <p className={error ? "admin-error" : "admin-ok"} role="status">
                {error || status}
              </p>
            )}

            <div className="admin-avail-cal-head">
              <button
                type="button"
                className="admin-btn admin-btn--light"
                onClick={() => setMonth((m) => addMonths(m, -1))}
              >
                ←
              </button>
              <h3 className="admin-avail-month">{monthLabel(month)}</h3>
              <button
                type="button"
                className="admin-btn admin-btn--light"
                onClick={() => setMonth((m) => addMonths(m, 1))}
              >
                →
              </button>
            </div>

            <div className="admin-avail-weekdays" aria-hidden="true">
              {["H", "K", "Sze", "Cs", "P", "Szo", "V"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="admin-avail-grid">
              {cells.map((cell, i) => {
                if (!cell) {
                  return <div key={`e-${i}`} className="admin-avail-day is-empty" />;
                }
                const iso = toIso(cell);
                return (
                  <button
                    key={iso}
                    type="button"
                    className={dayClass(iso)}
                    disabled={iso < todayIso}
                    onClick={() => {
                      setSelectedDate(iso);
                      setStatus(null);
                      setError(null);
                    }}
                    onDoubleClick={() => {
                      if (iso < todayIso) return;
                      void toggleFullDay(iso);
                    }}
                    title="Kattintás: nap részletei · Dupla kattintás: egész nap zárás/nyitás"
                  >
                    <span className="admin-avail-day__num">{cell.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <div className="admin-avail-legend">
              <span>
                <i className="admin-avail-swatch is-full" /> Egész nap
              </span>
              <span>
                <i className="admin-avail-swatch is-partial" /> Részleges
              </span>
              <span>Dupla kattintás = egész nap toggle</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            {selectedDate
              ? `Időpontok — ${selectedDate}`
              : "Válassz egy napot"}
          </div>
          <div className="admin-card-body">
            {selectedDate ? (
              <>
                <div className="admin-avail-day-actions">
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => void upsertDay(selectedDate, null)}
                  >
                    Egész nap zárás
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--light"
                    onClick={() => void openDay(selectedDate)}
                  >
                    Összes slot megnyitás
                  </button>
                </div>
                {selectedClosure && isFullDayClosure(selectedClosure.closed_times) ? (
                  <p className="admin-avail-hint">
                    Ez a nap teljesen zárva van. Nyisd meg, vagy kapcsolj ki
                    egyes időpontokat (ekkor részleges zárás lesz).
                  </p>
                ) : null}
                <div className="admin-avail-slots">
                  {slots.map((slot) => {
                    const closed =
                      selectedClosure &&
                      (isFullDayClosure(selectedClosure.closed_times) ||
                        Boolean(selectedClosure.closed_times?.includes(slot)));
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`admin-avail-slot${closed ? " is-closed" : ""}`}
                        onClick={() => void toggleSlot(selectedDate, slot)}
                      >
                        {slot}
                        <small>{closed ? "Zárt" : "Nyitott"}</small>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="admin-avail-hint">
                Kattints egy napra a naptárban az időpontok kezeléséhez.
              </p>
            )}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">Tartomány</div>
          <div className="admin-card-body admin-avail-range">
            <div>
              <label className="admin-label" htmlFor="avail-from">
                Ettől
              </label>
              <input
                id="avail-from"
                type="date"
                className="admin-input"
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label" htmlFor="avail-to">
                Eddig
              </label>
              <input
                id="avail-to"
                type="date"
                className="admin-input"
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
              />
            </div>
            <div className="admin-avail-range__actions">
              <button
                type="button"
                className="admin-btn"
                onClick={() => void runBulk("close_days")}
              >
                Tartomány lezárása
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--light"
                onClick={() => void runBulk("open_days")}
              >
                Tartomány megnyitása
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
