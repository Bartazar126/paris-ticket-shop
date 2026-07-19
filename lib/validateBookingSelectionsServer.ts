import {
  resolveAttractionId,
  type AttractionClosure,
} from "@/data/attractions";
import type { BookingLegSelection } from "@/data/bookingLegs";
import { createAdminClient } from "@/lib/supabase/admin";
import { selectionBlockedByClosures } from "@/lib/validateBookingSelections";

function dateKey(value: string): string {
  return value.slice(0, 10);
}

export async function validateSelectionsAgainstClosuresServer(
  selections: BookingLegSelection[],
): Promise<{ ok: true } | { ok: false; message: string }> {
  const attractionIds = Array.from(
    new Set(selections.map((s) => resolveAttractionId(s.legId))),
  );
  const dates = Array.from(new Set(selections.map((s) => dateKey(s.date))));
  if (!attractionIds.length || !dates.length) return { ok: true };

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pts_attraction_closures")
    .select("attraction_id, closed_date, closed_times, note")
    .in("attraction_id", attractionIds)
    .in("closed_date", dates);

  if (error) {
    return { ok: false, message: "Could not verify availability." };
  }

  const closures = (data ?? []) as AttractionClosure[];
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
