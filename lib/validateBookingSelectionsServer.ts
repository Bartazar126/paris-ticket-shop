import { createClient } from "@supabase/supabase-js";
import {
  resolveAttractionId,
  type AttractionClosure,
} from "@/data/attractions";
import type { BookingLegSelection } from "@/data/bookingLegs";
import { selectionBlockedByClosures } from "@/lib/validateBookingSelections";

function dateKey(value: string): string {
  return value.slice(0, 10);
}

function publicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase public env vars");
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function validateSelectionsAgainstClosuresServer(
  selections: BookingLegSelection[],
): Promise<{ ok: true } | { ok: false; message: string }> {
  const attractionIds = Array.from(
    new Set(selections.map((s) => resolveAttractionId(s.legId))),
  );
  const dates = Array.from(new Set(selections.map((s) => dateKey(s.date))));
  if (!attractionIds.length || !dates.length) return { ok: true };

  let closures: AttractionClosure[] = [];
  try {
    const supabase = publicSupabase();
    const { data, error } = await supabase
      .from("pts_attraction_closures")
      .select("attraction_id, closed_date, closed_times, note")
      .in("attraction_id", attractionIds)
      .in("closed_date", dates);

    if (error) {
      console.error("closure validation query failed:", error.message);
      return {
        ok: false,
        message: `Could not verify availability. (${error.message})`,
      };
    }
    closures = (data ?? []) as AttractionClosure[];
  } catch (e) {
    console.error("closure validation failed:", e);
    return {
      ok: false,
      message:
        e instanceof Error
          ? `Could not verify availability. (${e.message})`
          : "Could not verify availability.",
    };
  }

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
