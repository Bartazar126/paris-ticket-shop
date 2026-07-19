import type { ReactNode } from "react";
import Image from "next/image";

type CategoryHeroProps = {
  imageSrc: string;
  imageAlt: string;
  title?: ReactNode;
};

export function CategoryHero({ imageSrc, imageAlt, title }: CategoryHeroProps) {
  return (
    <div className="relative -mt-6 mb-10 h-[31.25rem] w-full overflow-hidden md:h-96 min-[1200px]:h-[31.25rem]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="z-[1] object-cover object-center"
        unoptimized
      />

      {title ? (
        <div className="pts-container relative z-[2] flex h-full">
          <div className="hero-content relative mt-auto w-full py-12 font-display text-[2.5rem] font-semibold leading-none text-[#15399b] md:mt-[unset] md:py-12 md:text-[4rem] md:leading-[4rem]">
            {title}
          </div>
        </div>
      ) : null}
    </div>
  );
}
