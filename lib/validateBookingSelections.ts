import {
  getTimeSlotsForAttraction,
  isDateFullyClosed,
  isFullDayClosure,
  isTimeClosed,
  resolveAttractionId,
  type AttractionClosure,
} from "@/data/attractions";
import type { BookingLegSelection } from "@/data/bookingLegs";
import { createClient } from "@/lib/supabase/client";

function dateKey(value: string): string {
  return value.slice(0, 10);
}

export function selectionBlockedByClosures(
  selection: BookingLegSelection,
  closures: AttractionClosure[],
): boolean {
  const attractionId = resolveAttractionId(selection.legId);
  const date = dateKey(selection.date);
  const row = closures.find(
    (c) => c.attraction_id === attractionId && dateKey(c.closed_date) === date,
  );
  if (!row) return false;

  const slots = getTimeSlotsForAttraction(attractionId);
  if (isDateFullyClosed(row.closed_times, slots)) return true;

  if (!selection.time || selection.time === "Flexible / anytime") {
    return isFullDayClosure(row.closed_times);
  }

  return isTimeClosed(row.closed_times, selection.time);
}

export async function fetchClosuresForAttractions(
  attractionIds: string[],
  from: string,
  to: string,
): Promise<AttractionClosure[]> {
  if (!attractionIds.length) return [];

  const params = new URLSearchParams({
    attractionIds: attractionIds.join(","),
    from,
    to,
  });
  const res = await fetch(`/api/availability?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { closures?: AttractionClosure[] };
  return data.closures ?? [];
}

/** Direct Supabase read (checkout / server-ish client). */
export async function loadClosuresFromSupabase(
  attractionIds: string[],
  dates: string[],
): Promise<AttractionClosure[]> {
  if (!attractionIds.length || !dates.length) return [];
  const supabase = createClient();
  const uniqueDates = Array.from(new Set(dates.map(dateKey)));
  const { data, error } = await supabase
    .from("pts_attraction_closures")
    .select("attraction_id, closed_date, closed_times, note")
    .in("attraction_id", attractionIds)
    .in("closed_date", uniqueDates);

  if (error || !data) return [];
  return data as AttractionClosure[];
}

export async function validateSelectionsAgainstClosures(
  selections: BookingLegSelection[],
): Promise<{ ok: true } | { ok: false; message: string }> {
  const attractionIds = Array.from(
    new Set(selections.map((s) => resolveAttractionId(s.legId))),
  );
  const dates = selections.map((s) => s.date);
  const closures = await loadClosuresFromSupabase(attractionIds, dates);

  for (const sel of selections) {
    if (selectionBlockedByClosures(sel, closures)) {
      return {
        ok: false,
        message: `Selected date/time for ${sel.label} is no longer available. Please choose another slot.`,
      };
    }
  }
  return { ok: true };
}
