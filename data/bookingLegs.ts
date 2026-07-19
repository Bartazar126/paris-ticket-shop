export type BookingLeg = {
  id: string;
  label: string;
  /** Short label for calendar header / compact UI */
  shortLabel: string;
  needsTime: boolean;
};

export type BookingLegSelection = {
  legId: string;
  label: string;
  date: string;
  time: string | null;
};

/** Generate mock time slots for a leg type. */
export function getTimeSlotsForLeg(legId: string): string[] {
  if (legId.includes("cruise") || legId.includes("seine") || legId.includes("boat")) {
    const slots: string[] = [];
    for (let h = 10; h <= 22; h += 1) {
      for (const m of [0, 30]) {
        if (h === 13 && m === 0) continue;
        if (h === 19 && m === 30) continue;
        if (h === 22 && m === 30) break;
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return slots;
  }

  if (
    legId.includes("flexible") ||
    legId.includes("garden") ||
    legId.includes("audio")
  ) {
    return ["Flexible / anytime"];
  }

  // Museums / towers — timed entry windows
  const slots: string[] = [];
  for (let h = 9; h <= 17; h += 1) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

function single(label: string, id: string, needsTime = true): BookingLeg[] {
  return [{ id, label, shortLabel: label, needsTime }];
}

/**
 * Booking legs per product slug.
 * Combos get one leg per attraction; the booking UI shows them as a clear list
 * so the shopper can choose (and change) each visit date/time.
 */
export const LEGS_BY_SLUG: Record<string, BookingLeg[]> = {
  "paris-seine-river-cruise-1-hour-long-tour": single(
    "Seine River Cruise",
    "seine-cruise",
  ),
  "eiffel-tower-entry-tickets": single("Eiffel Tower", "eiffel-tower"),
  "visit-the-louvre-museum": single("Louvre Museum", "louvre"),
  "visit-the-louvre-museum-audioguide": single(
    "Louvre Museum + Audio Guide",
    "louvre-audio",
  ),
  "arc-de-triomphe-paris-entry-ticket": single(
    "Arc de Triomphe",
    "arc-de-triomphe",
  ),
  "sainte-chapelle-paris-entry-ticket": single(
    "Sainte-Chapelle",
    "sainte-chapelle",
  ),
  "conciergerie-paris-entry-ticket": single("Conciergerie", "conciergerie"),
  "versailles-palace-entry-tickets": single(
    "Versailles Palace",
    "versailles",
  ),
  "palace-of-versailles-audioguide": single(
    "Versailles Interactive Tour",
    "versailles-interactive",
  ),
  "versailles-palace-entry-ticket-full-pass": single(
    "Versailles Full Access",
    "versailles-full",
  ),
  "versailles-palace-access-to-the-gardens-musical-gardens-show": single(
    "Versailles Gardens",
    "versailles-gardens",
    false,
  ),

  "torre-eiffel-cruise-combooo": [
    {
      id: "seine-cruise",
      label: "Seine River Cruise",
      shortLabel: "Cruise",
      needsTime: true,
    },
    {
      id: "eiffel-tower",
      label: "Eiffel Tower",
      shortLabel: "Eiffel",
      needsTime: true,
    },
  ],
  "paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets": [
    {
      id: "louvre",
      label: "Louvre Museum",
      shortLabel: "Louvre",
      needsTime: true,
    },
    {
      id: "seine-cruise",
      label: "Seine River Cruise",
      shortLabel: "Cruise",
      needsTime: true,
    },
  ],
  "paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets":
    [
      {
        id: "seine-cruise",
        label: "Seine River Cruise",
        shortLabel: "Cruise",
        needsTime: true,
      },
      {
        id: "eiffel-tower",
        label: "Eiffel Tower",
        shortLabel: "Eiffel",
        needsTime: true,
      },
      {
        id: "louvre",
        label: "Louvre Museum",
        shortLabel: "Louvre",
        needsTime: true,
      },
    ],
  "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo":
    [
      {
        id: "versailles",
        label: "Versailles Palace",
        shortLabel: "Versailles",
        needsTime: true,
      },
      {
        id: "eiffel-tower",
        label: "Eiffel Tower",
        shortLabel: "Eiffel",
        needsTime: true,
      },
    ],
  "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo":
    [
      {
        id: "versailles",
        label: "Versailles Palace",
        shortLabel: "Versailles",
        needsTime: true,
      },
      {
        id: "eiffel-tower",
        label: "Eiffel Tower",
        shortLabel: "Eiffel",
        needsTime: true,
      },
      {
        id: "seine-cruise",
        label: "Seine River Cruise",
        shortLabel: "Cruise",
        needsTime: true,
      },
    ],
  "versailles-palacelouvre-museum-combo-tickets": [
    {
      id: "versailles",
      label: "Versailles Palace",
      shortLabel: "Versailles",
      needsTime: true,
    },
    {
      id: "louvre",
      label: "Louvre Museum",
      shortLabel: "Louvre",
      needsTime: true,
    },
  ],
  "versailles-palace-seine-river-cruise-combo": [
    {
      id: "versailles",
      label: "Versailles Palace",
      shortLabel: "Versailles",
      needsTime: true,
    },
    {
      id: "seine-cruise",
      label: "Seine River Cruise",
      shortLabel: "Cruise",
      needsTime: true,
    },
  ],
  "conciergerie-saint-chapelle-combo-entry-tickets": [
    {
      id: "conciergerie",
      label: "Conciergerie",
      shortLabel: "Conciergerie",
      needsTime: true,
    },
    {
      id: "sainte-chapelle",
      label: "Sainte-Chapelle",
      shortLabel: "Chapelle",
      needsTime: true,
    },
  ],
};

export function getBookingLegs(slug: string, fallbackTitle: string): BookingLeg[] {
  if (LEGS_BY_SLUG[slug]) return LEGS_BY_SLUG[slug];
  return single(fallbackTitle, slug);
}
