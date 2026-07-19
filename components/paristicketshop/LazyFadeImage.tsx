"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LazyFadeImageProps = Omit<ImageProps, "onLoad"> & {
  fadeClassName?: string;
};

/** Soft opacity fade matching the site's .lazyload → .lazyloading behavior. */
export function LazyFadeImage({
  className = "",
  fadeClassName = "",
  alt,
  ...props
}: LazyFadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={`pts-lazy-image ${loaded ? "is-loaded" : ""} ${className} ${fadeClassName}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
