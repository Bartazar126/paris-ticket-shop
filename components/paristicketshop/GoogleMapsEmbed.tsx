type GoogleMapsEmbedProps = {
  mapsUrl: string;
  title?: string;
  className?: string;
};

/** Build a no-API-key Google Maps embed URL from a `maps?q=lat,lng` link. */
export function toGoogleMapsEmbedUrl(mapsUrl: string): string | null {
  try {
    const url = new URL(mapsUrl);
    const q = url.searchParams.get("q");
    if (q) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
    }
    // Fallback: /maps/place/... or bare maps URLs
    if (url.hostname.includes("google.") && url.pathname.includes("/maps")) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(mapsUrl)}&z=15&output=embed`;
    }
    return null;
  } catch {
    return null;
  }
}

export function GoogleMapsEmbed({
  mapsUrl,
  title = "Location map",
  className = "",
}: GoogleMapsEmbedProps) {
  const embedSrc = toGoogleMapsEmbedUrl(mapsUrl);
  if (!embedSrc) return null;

  return (
    <div
      className={`mt-4 overflow-hidden rounded-[10px] border border-solid border-[#d0d0d0] bg-stone-100 ${className}`}
    >
      <iframe
        title={title}
        src={embedSrc}
        className="block h-[280px] w-full border-0 md:h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
