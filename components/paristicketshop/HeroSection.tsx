import Image from "next/image";
import { HeroAnimatedLines } from "./HeroAnimatedLines";

export function HeroSection() {
  return (
    <header className="relative h-[250px] w-full overflow-hidden md:h-[400px] min-[1200px]:h-[500px]">
      <div className="absolute inset-0 bg-neutral-200">
        <Image
          src="/paristicketshop/hero/shutterstock-705219370.webp"
          alt="Paris cityscape with the Seine River and historic architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />
      </div>

      <div className="pts-container relative z-10 h-full">
        <div className="flex h-full flex-wrap">
          <div className="relative flex h-full w-full items-end justify-center px-0 min-[576px]:items-start">
            <div className="font-display hero-content w-full py-6 text-[2em] font-semibold leading-none text-[#15399b] md:py-[50px] md:text-[3em] min-[1200px]:text-[4em]">
              <HeroAnimatedLines />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
