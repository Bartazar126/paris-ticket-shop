type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      <h2 className="font-display mb-3 text-[2.2em] font-semibold leading-[1.2] text-[#15399b]">
        {title}
      </h2>
      {subtitle ? (
        <p className="font-display -mt-1 text-[1.4em] font-normal leading-[1.4] text-[#888]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
