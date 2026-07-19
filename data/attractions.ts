import {
  getTimeSlotsForLeg,
  LEGS_BY_SLUG,
  type BookingLeg,
} from "@/data/bookingLegs";
import { getProductDetail } from "@/data/productDetails";

export type BaseAttraction = {
  id: string;
  label: string;
  shortLabel: string;
  needsTime: boolean;
  image: string;
};

/** Variant leg ids that share closures with a base attraction. */
const ATTRACTION_ALIASES: Record<string, string> = {
  "louvre-audio": "louvre",
  "versailles-interactive": "versailles",
  "versailles-full": "versailles",
  "versailles-gardens": "versailles",
};

export const BASE_ATTRACTIONS: BaseAttraction[] = [
  {
    id: "seine-cruise",
    label: "Seine River Cruise",
    shortLabel: "Cruise",
    needsTime: true,
    image: "/paristicketshop/products/paris-seine-river-cruise_576x576.webp",
  },
  {
    id: "eiffel-tower",
    label: "Eiffel Tower",
    shortLabel: "Eiffel",
    needsTime: true,
    image: "/paristicketshop/products/shutterstock-129708554_576x576.webp",
  },
  {
    id: "louvre",
    label: "Louvre Museum",
    shortLabel: "Louvre",
    needsTime: true,
    image:
      "/paristicketshop/products/gemini-generated-image-rtuynvrtuynvrtuy_576x576.webp",
  },
  {
    id: "versailles",
    label: "Versailles Palace",
    shortLabel: "Versailles",
    needsTime: true,
    image: "/paristicketshop/products/versailles1_576x576.webp",
  },
  {
    id: "arc-de-triomphe",
    label: "Arc de Triomphe",
    shortLabel: "Arc",
    needsTime: true,
    image: "/paristicketshop/products/arc-1_576x576.webp",
  },
  {
    id: "sainte-chapelle",
    label: "Sainte-Chapelle",
    shortLabel: "Chapelle",
    needsTime: true,
    image: "/paristicketshop/products/saint-chapelle-2_576x576.webp",
  },
  {
    id: "conciergerie",
    label: "Conciergerie",
    shortLabel: "Conciergerie",
    needsTime: true,
    image: "/paristicketshop/products/conciergerie-paris_576x576.webp",
  },
];

const BASE_BY_ID = new Map(BASE_ATTRACTIONS.map((a) => [a.id, a]));

export function resolveAttractionId(legId: string): string {
  return ATTRACTION_ALIASES[legId] ?? legId;
}

export function getBaseAttraction(id: string): BaseAttraction | undefined {
  return BASE_BY_ID.get(resolveAttractionId(id));
}

export function getAttractionImage(legId: string): string | undefined {
  return getBaseAttraction(legId)?.image;
}

export function getTimeSlotsForAttraction(attractionId: string): string[] {
  const id = resolveAttractionId(attractionId);
  return getTimeSlotsForLeg(id);
}

export type AffectedProduct = {
  slug: string;
  title: string;
  isCombo: boolean;
};

/** Shop products / combos that include this attraction (via any aliased leg). */
export function getAffectedProducts(attractionId: string): AffectedProduct[] {
  const target = resolveAttractionId(attractionId);
  const out: AffectedProduct[] = [];

  for (const [slug, legs] of Object.entries(LEGS_BY_SLUG)) {
    const matches = legs.some((leg) => resolveAttractionId(leg.id) === target);
    if (!matches) continue;
    const detail = getProductDetail(slug);
    out.push({
      slug,
      title: detail?.title ?? legs.map((l) => l.shortLabel).join(" + "),
      isCombo: legs.length > 1,
    });
  }

  out.sort((a, b) => {
    if (a.isCombo !== b.isCombo) return a.isCombo ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
  return out;
}

export function getAffectedProductSlugs(attractionId: string): string[] {
  return getAffectedProducts(attractionId).map((p) => p.slug);
}

export function attractionIdsForLegs(legs: BookingLeg[]): string[] {
  const ids = new Set(legs.map((leg) => resolveAttractionId(leg.id)));
  return Array.from(ids);
}

/** null/empty closed_times = full day closed. */
export function isFullDayClosure(closedTimes: string[] | null | undefined): boolean {
  return closedTimes == null || closedTimes.length === 0;
}

export function isDateFullyClosed(
  closedTimes: string[] | null | undefined,
  allSlots: string[],
): boolean {
  if (isFullDayClosure(closedTimes)) return true;
  if (!closedTimes?.length) return false;
  if (!allSlots.length) return false;
  return allSlots.every((slot) => closedTimes.includes(slot));
}

export function isTimeClosed(
  closedTimes: string[] | null | undefined,
  time: string | null | undefined,
): boolean {
  if (isFullDayClosure(closedTimes)) return true;
  if (!time || time === "Flexible / anytime") return false;
  return Boolean(closedTimes?.includes(time));
}

export type AttractionClosure = {
  attraction_id: string;
  closed_date: string;
  closed_times: string[] | null;
  note?: string | null;
};

export function closureMapByDate(
  closures: AttractionClosure[],
): Map<string, AttractionClosure> {
  const map = new Map<string, AttractionClosure>();
  for (const row of closures) {
    map.set(row.closed_date, row);
  }
  return map;
}
