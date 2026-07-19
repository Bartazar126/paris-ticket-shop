"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { useCurrency } from "./CurrencyContext";
import { LocationIcon } from "./icons/FeatureIcons";
import { LazyFadeImage } from "./LazyFadeImage";
import { ProductFeatures } from "./ProductFeatures";
import { ProductRating } from "./ProductRating";

const badgeColors = {
  red: "bg-[#f06a6a]",
  blue: "bg-[#537ce8]",
  green: "bg-[#2f7f6b]",
} as const;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const badgeWidth =
    product.badge?.label === "Triple Combo" ? "w-28" : "w-44";
  const hasPrice = Boolean(product.price || product.originalPrice);
  const displayPrice =
    typeof product.price === "number" ? formatPrice(product.price) : null;
  const displayOriginal =
    typeof product.originalPrice === "number"
      ? formatPrice(product.originalPrice)
      : null;

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-solid border-[#d0d0d0] bg-white text-left font-sans text-[#333]">
      <div className="relative w-full shrink-0">
        <div className="relative w-full overflow-hidden bg-stone-100 pt-[80%]">
          <LazyFadeImage
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 576px) 90vw, (max-width: 992px) 33vw, 294px"
            className="object-cover object-center"
            unoptimized
          />

          {product.badge ? (
            <div className="absolute left-0 top-0 z-[8] p-3">
              <div
                className={`${badgeColors[product.badge.variant]} ${badgeWidth} font-display relative m-1 inline-block rounded-lg px-4 py-1.5 text-left text-base font-normal leading-5 text-white`}
              >
                {product.badge.label}
              </div>
            </div>
          ) : null}

          <Link
            href={product.href}
            className="absolute inset-0 z-[9]"
            aria-label={product.title}
            tabIndex={-1}
          />

          {typeof product.reviewCount === "number" ? (
            <div className="absolute bottom-0 right-0 z-[1] bg-[linear-gradient(100deg,_rgba(21,_57,_155,_0)_0px,_#15399b_45%)] py-1 pl-5 pr-1.5 text-base italic text-white">
              {product.reviewCount} reviews
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-[15px] pb-0 pt-0">
        <div className="flex items-center justify-between gap-2 py-[15px] text-[1.1em] font-semibold leading-none">
          <span className="inline-flex items-center text-[0.8em] font-normal uppercase leading-none text-[#333]">
            <LocationIcon className="mr-1.5 h-4 w-2.5 text-[#15399b]" />
            <span>{product.location}</span>
          </span>
          {typeof product.rating === "number" ? (
            <ProductRating rating={product.rating} />
          ) : null}
        </div>

        <h3 className="mb-2 min-h-[2.88rem] text-base font-semibold leading-[1.3] text-[#333]">
          <Link
            href={product.href}
            className="text-[#333] no-underline hover:text-[#15399b] hover:no-underline"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mb-1 min-h-12">
          {hasPrice ? (
            <div>
              {product.pricePrefix && displayPrice ? (
                <span className="block text-[0.8em] font-normal leading-5 text-[#333]">
                  {product.pricePrefix}
                </span>
              ) : null}
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                {displayPrice ? (
                  <span
                    className={`text-base font-bold leading-tight ${
                      displayOriginal ? "text-[#dc3545]" : "text-[#333]"
                    }`}
                  >
                    {displayPrice}
                  </span>
                ) : null}
                {displayOriginal ? (
                  <span className="text-base font-bold leading-tight text-[#333] opacity-60 line-through">
                    {displayOriginal}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <ProductFeatures features={product.features} />
      </div>

      <div className="relative z-10 mt-auto px-[30px] pb-[15px] pt-2.5">
        <Link
          href={product.availabilityHref}
          className="pts-availability-btn relative z-10 inline-flex h-10 w-full items-center justify-center rounded-lg border border-solid border-[#2f7f6b] bg-[#2f7f6b] px-3 py-1.5 text-center text-base font-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7f6b]"
        >
          Check availability
        </Link>
      </div>
    </article>
  );
}
