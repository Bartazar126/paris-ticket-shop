"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import type { ProductDetail } from "@/data/productDetails";
import type { Product } from "@/data/products";
import {
  BookingCalendar,
  type BookingCalendarHandle,
} from "./BookingCalendar";
import { useCurrency } from "./CurrencyContext";
import { GoogleMapsEmbed } from "./GoogleMapsEmbed";
import { LocationIcon } from "./icons/FeatureIcons";
import { LazyFadeImage } from "./LazyFadeImage";
import { ProductCarousel } from "./ProductCarousel";
import { ProductFeatures } from "./ProductFeatures";
import { ProductRating } from "./ProductRating";

const badgeColors = {
  red: "bg-[#f06a6a]",
  blue: "bg-[#537ce8]",
  green: "bg-[#2f7f6b]",
} as const;

type ProductDetailViewProps = {
  card: Product;
  detail: ProductDetail;
  similar: Product[];
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display mb-3 text-2xl font-semibold text-[#15399b] md:text-[1.75rem] md:leading-[2.13rem]">
      {children}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-6 text-zinc-800">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProductDetailView({
  card,
  detail,
  similar,
}: ProductDetailViewProps) {
  const { formatPrice } = useCurrency();
  const calendarRef = useRef<BookingCalendarHandle>(null);
  const gallery =
    detail.gallery.length > 0 ? detail.gallery : [card.image].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? card.image;

  const openCalendar = () => {
    calendarRef.current?.open();
  };

  const badge = detail.badge ?? card.badge;
  const rating = detail.rating ?? card.rating;
  const reviewCount = detail.reviewCount ?? card.reviewCount;
  const features = detail.features.length ? detail.features : card.features;
  const price = card.price;
  const originalPrice = card.originalPrice;
  const displayPrice =
    typeof price === "number" ? formatPrice(price) : null;
  const displayOriginal =
    typeof originalPrice === "number" ? formatPrice(originalPrice) : null;

  const starEntries = detail.reviewSummary?.stars
    ? ([5, 4, 3, 2, 1] as const)
        .map((star) => {
          const key = String(star) as "1" | "2" | "3" | "4" | "5";
          return {
            star,
            count: detail.reviewSummary?.stars[key] ?? 0,
          };
        })
        .filter((entry) => entry.count > 0)
    : [];

  return (
    <div className="pts-container pb-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <div className="relative mb-3 overflow-hidden rounded-[10px] border border-solid border-[#d0d0d0] bg-stone-100">
            <div className="relative w-full pt-[75%]">
              <LazyFadeImage
                key={activeImage}
                src={activeImage}
                alt={card.imageAlt || detail.title}
                fill
                sizes="(max-width: 992px) 100vw, 55vw"
                className="object-cover object-center"
                unoptimized
                priority
              />
              {badge ? (
                <div className="absolute left-0 top-0 z-[8] p-3">
                  <div
                    className={`${badgeColors[badge.variant]} font-display relative m-1 inline-block rounded-lg px-4 py-1.5 text-base font-normal leading-5 text-white`}
                  >
                    {badge.label}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {gallery.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-solid ${
                    index === activeIndex
                      ? "border-[#15399b]"
                      : "border-transparent"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <LazyFadeImage
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center text-sm font-normal uppercase text-[#333]">
              <LocationIcon className="mr-1.5 h-4 w-2.5 text-[#15399b]" />
              {card.location}
            </span>
            {typeof rating === "number" ? (
              <ProductRating rating={rating} />
            ) : null}
            {typeof reviewCount === "number" ? (
              <span className="text-sm text-[#888]">{reviewCount} Reviews</span>
            ) : null}
          </div>

          <h1 className="font-display mb-4 text-3xl font-semibold leading-tight text-[#15399b] md:text-4xl md:leading-[2.75rem]">
            {detail.title || card.title}
          </h1>

          <div className="mb-4 min-h-12">
            {displayPrice || displayOriginal ? (
              <div>
                {card.pricePrefix && displayPrice ? (
                  <span className="block text-sm font-normal leading-5 text-[#333]">
                    {card.pricePrefix}
                  </span>
                ) : null}
                <div className="flex flex-wrap items-baseline gap-x-3">
                  {displayPrice ? (
                    <span
                      className={`text-2xl font-bold leading-tight ${
                        displayOriginal ? "text-[#dc3545]" : "text-[#333]"
                      }`}
                    >
                      {displayPrice}
                    </span>
                  ) : null}
                  {displayOriginal ? (
                    <span className="text-xl font-bold leading-tight text-[#333] opacity-60 line-through">
                      {displayOriginal}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <ProductFeatures features={features} />

          <div className="mt-5">
            <button
              type="button"
              id="check-availability"
              onClick={openCalendar}
              className="pts-availability-btn inline-flex h-12 w-full items-center justify-center rounded-lg border border-solid border-[#2f7f6b] bg-[#2f7f6b] px-4 text-center text-lg font-normal text-white transition hover:bg-[#256353] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7f6b] sm:w-auto sm:min-w-[240px]"
            >
              Check availability
            </button>
            <BookingCalendar
              ref={calendarRef}
              slug={detail.slug}
              productTitle={detail.title || card.title}
              productHref={card.href}
              image={card.image}
              price={card.price}
              originalPrice={card.originalPrice}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-4xl">
        {detail.overview.length ? (
          <section className="mb-8">
            <SectionHeading>Overview</SectionHeading>
            {detail.overview.map((paragraph) => (
              <p key={paragraph} className="mb-3 text-base leading-7 text-zinc-800">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {detail.whatsIncluded.length ? (
          <section className="mb-8">
            <SectionHeading>What&apos;s Included</SectionHeading>
            <BulletList items={detail.whatsIncluded} />
          </section>
        ) : null}

        <div className="mb-8 border-t border-solid border-[#d0d0d0] pt-6 text-center">
          <button
            type="button"
            onClick={openCalendar}
            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-solid border-[#15399b] bg-[#15399b] px-6 text-lg text-white transition hover:opacity-90"
          >
            Buy your ticket now!
          </button>
        </div>

        {detail.informations.length ? (
          <section className="mb-8">
            <SectionHeading>Informations</SectionHeading>
            <BulletList items={detail.informations} />
          </section>
        ) : null}

        {detail.additionalInfo.length ? (
          <section className="mb-8">
            <SectionHeading>Additional info</SectionHeading>
            <BulletList items={detail.additionalInfo} />
          </section>
        ) : null}

        {detail.bookingProcess ? (
          <section className="mb-8">
            <SectionHeading>Booking process</SectionHeading>
            {detail.bookingProcess.split(/\n\n+/).map((paragraph) => (
              <p key={paragraph} className="mb-3 text-base leading-7 text-zinc-800">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {detail.location.name ||
        detail.location.lines.length ||
        detail.location.mapsUrl ? (
          <section className="mb-8">
            <SectionHeading>Location</SectionHeading>
            {detail.location.name ? (
              <p className="mb-2 text-base font-semibold text-zinc-800">
                {detail.location.name}
              </p>
            ) : null}
            {detail.location.lines.map((line) => (
              <p key={line} className="mb-1 text-base leading-6 text-zinc-800">
                {line}
              </p>
            ))}
            {detail.location.mapsUrl ? (
              <>
                <p className="mt-3">
                  <a
                    href={detail.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#15399b] underline hover:opacity-80"
                  >
                    Open in Google Maps
                  </a>
                </p>
                <GoogleMapsEmbed
                  mapsUrl={detail.location.mapsUrl}
                  title={`${detail.title} location map`}
                />
              </>
            ) : null}
          </section>
        ) : null}

        {detail.cancellationPolicy.length ? (
          <section className="mb-8">
            <SectionHeading>Cancellation Policy</SectionHeading>
            <BulletList items={detail.cancellationPolicy} />
          </section>
        ) : null}

        {detail.reviewSummary &&
        (detail.reviewSummary.rating || starEntries.length) ? (
          <section className="mb-8">
            <SectionHeading>Reviews</SectionHeading>
            <div className="mb-4 flex flex-wrap items-end gap-4">
              {typeof detail.reviewSummary.rating === "number" ? (
                <div className="text-4xl font-bold text-[#15399b]">
                  {detail.reviewSummary.rating.toFixed(1)}
                </div>
              ) : null}
              {typeof detail.reviewSummary.reviewCount === "number" ? (
                <div className="pb-1 text-base text-[#888]">
                  {detail.reviewSummary.reviewCount} reviews
                </div>
              ) : null}
            </div>
            {starEntries.length ? (
              <ul className="max-w-md space-y-2">
                {starEntries.map(({ star, count }) => {
                  const total =
                    detail.reviewSummary?.reviewCount ||
                    starEntries.reduce((sum, entry) => sum + entry.count, 0);
                  const width = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <li key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-14 shrink-0">{star} stars</span>
                      <div className="h-2 flex-1 overflow-hidden rounded bg-stone-200">
                        <div
                          className="h-full rounded bg-[#ffc700]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-[#888]">
                        {count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </section>
        ) : null}
      </div>

      {similar.length ? (
        <section className="mt-4">
          <SectionHeading>Similar offers</SectionHeading>
          <ProductCarousel products={similar} />
        </section>
      ) : null}
    </div>
  );
}
