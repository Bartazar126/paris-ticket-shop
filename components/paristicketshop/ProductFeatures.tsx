import type { ReactNode } from "react";
import type { ProductFeature } from "@/data/products";
import {
  FlexibleHoursIcon,
  FreeCancellationIcon,
  InstantConfirmIcon,
  MobileTicketIcon,
} from "./icons/FeatureIcons";

const featureMeta: Record<ProductFeature, { icon: ReactNode }> = {
  "Free Cancellation": {
    icon: <FreeCancellationIcon className="h-4 w-[13.5px]" />,
  },
  "Instant Confirm": {
    icon: <InstantConfirmIcon className="h-4 w-3" />,
  },
  "Mobile Ticket": {
    icon: <MobileTicketIcon className="h-4 w-2.5" />,
  },
  "Flexible Hours": {
    icon: <FlexibleHoursIcon className="h-4 w-4" />,
  },
  "Full Day Ticket": {
    icon: <FlexibleHoursIcon className="h-4 w-4" />,
  },
};

type ProductFeaturesProps = {
  features: ProductFeature[];
};

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div className="properties-wrap -mx-2 flex flex-wrap pt-[5px] text-[0.8em] leading-[1.2] text-[#333]">
      {features.map((feature) => {
        const meta = featureMeta[feature];
        return (
          <div
            key={feature}
            className="mb-2 flex w-1/2 max-w-[50%] shrink-0 items-center px-2"
          >
            <span className="image-wrap mr-1 flex w-[15px] min-w-[15px] shrink-0 items-center justify-center text-center">
              {meta.icon}
            </span>
            <span className="text-left font-normal leading-[1.2] text-[#333]">
              {feature}
            </span>
          </div>
        );
      })}
    </div>
  );
}
