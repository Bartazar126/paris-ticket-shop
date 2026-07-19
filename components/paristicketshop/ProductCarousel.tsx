"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons/FeatureIcons";
import { ProductCard } from "./ProductCard";

const CARD_WIDTH = 320; // matches reference w-80

type ProductCarouselProps = {
  products: Product[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const dragState = useRef<{
    active: boolean;
    dragging: boolean;
    startX: number;
    startScroll: number;
    pointerId: number | null;
  }>({
    active: false,
    dragging: false,
    startX: 0,
    startScroll: 0,
    pointerId: null,
  });
  const DRAG_THRESHOLD = 8;

  const safeIndex = Math.min(index, maxIndex);

  const recalculate = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const visible = Math.max(1, Math.floor(viewport.clientWidth / CARD_WIDTH));
    setMaxIndex(Math.max(0, products.length - visible));
  }, [products.length]);

  useEffect(() => {
    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, [recalculate]);

  const scrollToIndex = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, maxIndex));
      setIndex(clamped);
      viewportRef.current?.scrollTo({
        left: CARD_WIDTH * clamped,
        behavior: "smooth",
      });
    },
    [maxIndex],
  );

  const onPointerDown = (event: React.PointerEvent) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    // Don't steal clicks from links/buttons (Check availability, title, etc.)
    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button, input, textarea, select, label")) {
      return;
    }
    dragState.current = {
      active: true,
      dragging: false,
      startX: event.clientX,
      startScroll: viewport.scrollLeft,
      pointerId: event.pointerId,
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current.active || !viewportRef.current) return;
    const delta = event.clientX - dragState.current.startX;
    if (!dragState.current.dragging) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      dragState.current.dragging = true;
      try {
        viewportRef.current.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
    viewportRef.current.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = (event: React.PointerEvent) => {
    if (!dragState.current.active || !viewportRef.current) return;
    const didDrag = dragState.current.dragging;
    dragState.current.active = false;
    dragState.current.dragging = false;
    if (didDrag) {
      const next = Math.round(viewportRef.current.scrollLeft / CARD_WIDTH);
      scrollToIndex(next);
    }
    try {
      if (dragState.current.pointerId !== null) {
        viewportRef.current.releasePointerCapture(event.pointerId);
      }
    } catch {
      /* ignore */
    }
    dragState.current.pointerId = null;
  };

  return (
    <div className="relative flex w-full items-center gap-2">
      <button
        type="button"
        aria-label="Previous products"
        disabled={safeIndex <= 0}
        onClick={() => scrollToIndex(safeIndex - 1)}
        className="pts-carousel-btn hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-solid border-[#15399b] text-[#15399b] disabled:cursor-not-allowed disabled:opacity-30 min-[576px]:inline-flex"
      >
        <ChevronLeftIcon />
      </button>

      <div
        ref={viewportRef}
        className="w-full overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <ul className="flex w-max list-none">
          {products.map((product) => (
            <li
              key={product.id}
              className="w-80 shrink-0 cursor-grab select-none p-1.5 active:cursor-grabbing"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        aria-label="Next products"
        disabled={safeIndex >= maxIndex}
        onClick={() => scrollToIndex(safeIndex + 1)}
        className="pts-carousel-btn hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-solid border-[#15399b] text-[#15399b] disabled:cursor-not-allowed disabled:opacity-30 min-[576px]:inline-flex"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
