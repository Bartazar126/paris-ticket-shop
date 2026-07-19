"use client";

import { useRouter } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getBookingLegs,
  getTimeSlotsForLeg,
  type BookingLegSelection,
} from "@/data/bookingLegs";
import { saveBookingDraft } from "@/lib/bookingSession";

export type BookingCalendarHandle = {
  open: () => void;
  close: () => void;
};

type BookingCalendarProps = {
  slug: string;
  productTitle: string;
  productHref: string;
  image?: string;
  price?: number;
  originalPrice?: number;
};

const CLOSE_ICON = `<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g><path d="m25 512a25 25 0 0 1 -17.68-42.68l462-462a25 25 0 0 1 35.36 35.36l-462 462a24.93 24.93 0 0 1 -17.68 7.32z"/><path d="m487 512a24.93 24.93 0 0 1 -17.68-7.32l-462-462a25 25 0 0 1 35.36-35.36l462 462a25 25 0 0 1 -17.68 42.68z"/></g></svg>`;

const NEXT_ICON = `<svg style="width: 24px;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g><circle fill="#15399B" cx="256" cy="256" r="254"/><path fill="#FFFFFF" d="M99,238h259.1l-73.7-95.2l19.7-25.4L411.5,256L304,394.6l-19.7-25.4L358,274H99V238z"/></g></svg>`;

const PREV_ICON = `<svg style="width: 24px;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g><circle fill="#15399B" cx="256" cy="256" r="254"/><path fill="#FFFFFF" d="M413,274H153.9l73.7,95.2l-19.7,25.4L100.5,256L208,117.4l19.7,25.4L154,238h259V274z"/></g></svg>`;

type View = "overview" | "date" | "time";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isLegComplete(
  legId: string,
  needsTime: boolean,
  byId: Record<string, BookingLegSelection>,
): boolean {
  const s = byId[legId];
  if (!s?.date) return false;
  if (!needsTime) return true;
  return Boolean(s.time);
}

export const BookingCalendar = forwardRef<
  BookingCalendarHandle,
  BookingCalendarProps
>(function BookingCalendar(
  {
    slug,
    productTitle,
    productHref,
    image,
    price,
    originalPrice,
  },
  ref,
) {
  const router = useRouter();
  const reactId = useId().replace(/:/g, "");
  const inputId = `pts-datepicker-${reactId}`;
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerRef = useRef<any>(null);

  const legs = useMemo(
    () => getBookingLegs(slug, productTitle),
    [slug, productTitle],
  );
  const isCombo = legs.length > 1;

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [activeLegIndex, setActiveLegIndex] = useState(0);
  const [pendingDate, setPendingDate] = useState<string | null>(null);
  const [pendingTime, setPendingTime] = useState<string | null>(null);
  const [byId, setById] = useState<Record<string, BookingLegSelection>>({});
  /** Prevents easepick from staying open unless we explicitly asked for it */
  const allowPickerShowRef = useRef(false);

  const stateRef = useRef({
    activeLegIndex: 0,
    byId: {} as Record<string, BookingLegSelection>,
    legs,
    isCombo,
  });
  stateRef.current = { activeLegIndex, byId, legs, isCombo };

  const showPicker = useCallback(() => {
    allowPickerShowRef.current = true;
    pickerRef.current?.show?.();
  }, []);

  const hidePicker = useCallback(() => {
    allowPickerShowRef.current = false;
    pickerRef.current?.hide?.();
  }, []);

  const activeLeg = legs[activeLegIndex] ?? legs[0];
  const timeSlots = useMemo(
    () => getTimeSlotsForLeg(activeLeg?.id ?? ""),
    [activeLeg?.id],
  );

  const completedCount = legs.filter((leg) =>
    isLegComplete(leg.id, leg.needsTime, byId),
  ).length;
  const allComplete = completedCount === legs.length;

  const setBodyOpen = useCallback((open: boolean) => {
    document.body.classList.toggle("calendar-opened", open);
  }, []);

  const resetFlow = useCallback(() => {
    setActiveLegIndex(0);
    setPendingDate(null);
    setPendingTime(null);
    setById({});
    setView(isCombo ? "overview" : "date");
  }, [isCombo]);

  const close = useCallback(() => {
    hidePicker();
    setIsOpen(false);
    setBodyOpen(false);
  }, [hidePicker, setBodyOpen]);

  const open = useCallback(() => {
    resetFlow();
    setIsOpen(true);
    setBodyOpen(true);
    if (!isCombo) {
      requestAnimationFrame(() => {
        pickerRef.current?.clear?.();
        showPicker();
      });
    } else {
      hidePicker();
    }
  }, [hidePicker, isCombo, resetFlow, setBodyOpen, showPicker]);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  const goToCheckout = useCallback(
    (finalSelections: BookingLegSelection[]) => {
      saveBookingDraft({
        slug,
        productTitle,
        productHref,
        image,
        price,
        originalPrice,
        selections: finalSelections,
        createdAt: new Date().toISOString(),
      });
      close();
      router.push("/checkout");
    },
    [close, image, originalPrice, price, productHref, productTitle, router, slug],
  );

  const saveLegAndReturn = useCallback(
    (date: string, time: string | null) => {
      const { activeLegIndex: idx, byId: prev, legs: allLegs, isCombo: combo } =
        stateRef.current;
      const leg = allLegs[idx];
      if (!leg) return;

      const next = {
        ...prev,
        [leg.id]: {
          legId: leg.id,
          label: leg.label,
          date,
          time,
        },
      };
      setById(next);
      setPendingDate(null);
      setPendingTime(null);

      if (!combo) {
        goToCheckout(
          allLegs.map(
            (l) =>
              next[l.id] ?? {
                legId: l.id,
                label: l.label,
                date,
                time,
              },
          ),
        );
        return;
      }

      setView("overview");
      hidePicker();
    },
    [goToCheckout, hidePicker],
  );

  const injectHeader = useCallback(() => {
    const { activeLegIndex: idx, legs: allLegs, isCombo: combo } =
      stateRef.current;
    const leg = allLegs[idx];
    const wrappers = document.getElementsByClassName("easepick-wrapper");
    for (const pickerEl of Array.from(wrappers)) {
      const root = (pickerEl as HTMLElement & { shadowRoot?: ShadowRoot })
        .shadowRoot;
      if (!root) continue;
      root.childNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (!node.classList.contains("container")) return;

        const titleText = combo
          ? `Date — ${leg?.shortLabel ?? ""}`
          : "Select a date";
        const existing = node.querySelector(".title .col-6");

        if (existing) {
          existing.textContent = titleText;
          return;
        }

        const div = document.createElement("div");
        div.classList.add("title");
        div.innerHTML = `<div class="row"><div class="col-3 pts-cal-close">${CLOSE_ICON}</div><div class="col-6">${titleText}</div><div class="col-3"></div></div>`;
        node.prepend(div);
        div.querySelector("svg")?.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          close();
        });

        for (const button of Array.from(
          node.getElementsByClassName("next-button"),
        )) {
          (button as HTMLElement).innerHTML = NEXT_ICON;
        }
        for (const button of Array.from(
          node.getElementsByClassName("previous-button"),
        )) {
          (button as HTMLElement).innerHTML = PREV_ICON;
        }
      });
    }
  }, [close]);

  const saveLegRef = useRef(saveLegAndReturn);
  saveLegRef.current = saveLegAndReturn;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!inputRef.current || cancelled) return;
      const { easepick, LockPlugin } = await import("@easepick/bundle");
      if (cancelled || !inputRef.current) return;

      const picker = new easepick.create({
        element: inputRef.current,
        css: [
          "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css",
          `${window.location.origin}/paristicketshop/picker.css?v=5`,
        ],
        zIndex: 20,
        lang: "en-US",
        grid: 2,
        calendars: 2,
        readonly: true,
        setup(p) {
          p.on("select", (e) => {
            const date = e.detail?.date;
            if (!date) return;
            const iso =
              typeof date.format === "function"
                ? date.format("YYYY-MM-DD")
                : String(date);
            const leg = stateRef.current.legs[stateRef.current.activeLegIndex];
            setPendingDate(iso);
            if (leg?.needsTime) {
              setView("time");
              setPendingTime(null);
              p.hide();
            } else {
              saveLegRef.current(iso, "Flexible / anytime");
            }
          });
          p.on("render", () => injectHeader());
          p.on("show", () => {
            if (!allowPickerShowRef.current) {
              p.hide();
              return;
            }
            injectHeader();
          });
        },
        plugins: [LockPlugin],
        LockPlugin: { minDate: startOfToday() },
      });

      allowPickerShowRef.current = false;
      picker.hide();
      pickerRef.current = picker;
    }

    void init();
    return () => {
      cancelled = true;
      setBodyOpen(false);
      try {
        pickerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      pickerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen || view !== "date") {
      if (view !== "date") hidePicker();
      return;
    }
    injectHeader();
    showPicker();
  }, [hidePicker, injectHeader, isOpen, activeLegIndex, showPicker, view]);

  useEffect(() => {
    setBodyOpen(isOpen);
    if (!isOpen) hidePicker();
  }, [hidePicker, isOpen, setBodyOpen]);

  const startLeg = (index: number) => {
    setActiveLegIndex(index);
    setPendingDate(null);
    setPendingTime(null);
    setView("date");
    requestAnimationFrame(() => {
      pickerRef.current?.clear?.();
      showPicker();
    });
  };

  const confirmTime = () => {
    if (!pendingDate || !pendingTime) return;
    saveLegAndReturn(pendingDate, pendingTime);
  };

  const backFromTime = () => {
    if (isCombo) {
      setView("overview");
      setPendingDate(null);
      setPendingTime(null);
      hidePicker();
      return;
    }
    setView("date");
    setPendingTime(null);
    requestAnimationFrame(() => showPicker());
  };

  const continueToCheckout = () => {
    if (!allComplete) return;
    const ordered = legs.map((leg) => byId[leg.id]).filter(Boolean);
    if (ordered.length !== legs.length) return;
    goToCheckout(ordered);
  };

  return (
    <>
      <div
        className="pts-calendar-backdrop"
        onClick={close}
        aria-hidden={!isOpen}
      />

      <input
        ref={inputRef}
        id={inputId}
        className="pts-datepicker-input"
        type="text"
        readOnly
        aria-hidden="true"
        tabIndex={-1}
      />

      {isOpen && isCombo && view === "overview" ? (
        <div
          className="pts-booking-panel pts-booking-panel--overview"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pts-overview-title"
        >
          <div className="pts-booking-panel__header">
            <button
              type="button"
              className="pts-booking-panel__close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="pts-overview-title" className="pts-booking-panel__title">
              Your visit
            </h2>
            <span className="pts-booking-panel__spacer" />
          </div>

          <p className="pts-booking-overview__intro">
            This package includes {legs.length} attractions. Choose a date
            {legs.some((l) => l.needsTime) ? " and entry time" : ""} for each —
            you can visit on different days if you prefer.
          </p>
          <p className="pts-booking-trust-line">
            Free cancellation · Instant confirmation · Secure checkout
          </p>

          <ol className="pts-booking-legs">
            {legs.map((leg, i) => {
              const sel = byId[leg.id];
              const done = isLegComplete(leg.id, leg.needsTime, byId);
              return (
                <li key={leg.id} className="pts-booking-leg">
                  <div className="pts-booking-leg__main">
                    <span className="pts-booking-leg__index">{i + 1}</span>
                    <div>
                      <p className="pts-booking-leg__name">{leg.label}</p>
                      {done && sel ? (
                        <p className="pts-booking-leg__meta">
                          {formatDisplayDate(sel.date)}
                          {sel.time && sel.time !== "Flexible / anytime"
                            ? ` · ${sel.time}`
                            : leg.needsTime
                              ? ""
                              : " · Flexible entry"}
                        </p>
                      ) : (
                        <p className="pts-booking-leg__meta pts-booking-leg__meta--muted">
                          {leg.needsTime
                            ? "Date and time needed"
                            : "Date needed"}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`pts-booking-leg__action${done ? " is-done" : ""}`}
                    onClick={() => startLeg(i)}
                  >
                    {done ? "Change" : "Choose"}
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="pts-booking-overview__progress" aria-live="polite">
            {completedCount} of {legs.length} selected
          </p>

          <div className="pts-booking-panel__actions">
            <button
              type="button"
              className="pts-booking-btn pts-booking-btn--ghost"
              onClick={close}
            >
              Close
            </button>
            <button
              type="button"
              className="pts-booking-btn pts-booking-btn--primary"
              disabled={!allComplete}
              onClick={continueToCheckout}
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {isOpen && view === "time" && pendingDate ? (
        <div
          className="pts-booking-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pts-time-title"
        >
          <div className="pts-booking-panel__header">
            <button
              type="button"
              className="pts-booking-panel__close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="pts-time-title" className="pts-booking-panel__title">
              Entry time
            </h2>
            <span className="pts-booking-panel__spacer" />
          </div>

          <div className="pts-booking-panel__subtitle">
            <strong>{activeLeg.label}</strong>
            <span>{formatDisplayDate(pendingDate)}</span>
          </div>

          <div className="pts-time-grid">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`pts-time-slot${pendingTime === slot ? " is-selected" : ""}`}
                onClick={() => setPendingTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="pts-booking-panel__actions">
            <button
              type="button"
              className="pts-booking-btn pts-booking-btn--ghost"
              onClick={backFromTime}
            >
              {isCombo ? "Back to list" : "Back"}
            </button>
            <button
              type="button"
              className="pts-booking-btn pts-booking-btn--primary"
              disabled={!pendingTime}
              onClick={confirmTime}
            >
              {isCombo ? "Save" : "Continue"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
});
