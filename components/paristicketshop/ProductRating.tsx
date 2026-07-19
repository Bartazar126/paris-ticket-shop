import { StarIcon } from "./icons/FeatureIcons";

type ProductRatingProps = {
  rating: number;
};

export function ProductRating({ rating }: ProductRatingProps) {
  return (
    <span className="inline-flex items-center rounded-[10px] bg-[#fff9e4] px-3 py-1 text-[0.8em] font-semibold leading-none text-[#333]">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className="h-3.5 w-3.5 text-[#ffc700]" />
      ))}
      <span className="inline-block pl-1">{rating.toFixed(1)}</span>
    </span>
  );
}
