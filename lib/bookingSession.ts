import type { BookingLegSelection } from "@/data/bookingLegs";

export type BookingDraft = {
  slug: string;
  productTitle: string;
  productHref: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  selections: BookingLegSelection[];
  createdAt: string;
};

const KEY = "pts-booking-draft";

export function saveBookingDraft(draft: BookingDraft): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function loadBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BookingDraft;
  } catch {
    return null;
  }
}

export function clearBookingDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
