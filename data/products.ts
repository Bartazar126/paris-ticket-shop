export type BadgeVariant = "red" | "blue" | "green";

export type ProductFeature =
  | "Free Cancellation"
  | "Instant Confirm"
  | "Mobile Ticket"
  | "Flexible Hours"
  | "Full Day Ticket";

export type Product = {
  id: string;
  title: string;
  href: string;
  availabilityHref: string;
  image: string;
  imageAlt: string;
  badge?: {
    label: string;
    variant: BadgeVariant;
  };
  location: string;
  rating?: number;
  reviewCount?: number;
  /** Numeric amount; currency symbol comes from the selected currency. */
  originalPrice?: number;
  price?: number;
  pricePrefix?: string;
  features: ProductFeature[];
};

export const riverCruiseProducts: Product[] = [
  {
    id: "essentials-combo",
    title:
      "PARIS Essentials Service: Seine River Cruise, Eiffel & Louvre Reservation & App Bundle (Combo)",
    href: "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/untitled-1-recovered3.webp",
    imageAlt:
      "Seine River Cruise with Eiffel Tower and Louvre Museum combo tickets",
    badge: { label: "Triple Combo", variant: "red" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 284,
    originalPrice: 74.9,
    price: 68.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "seine-cruise",
    title: "Paris: Seine River Cruise - 1-Hour long tour & Digital Audio",
    href: "/paris-river-cruises-combo-tickets/paris-seine-river-cruise-1-hour-long-tour",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/paris-seine-river-cruise-1-hour-long-tour?check-availability",
    image: "/paristicketshop/products/paris-seine-river-cruise.webp",
    imageAlt: "Paris Seine River Cruise one-hour tour",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 392,
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "eiffel-cruise-combo",
    title:
      "Paris: Seine River Cruise & Eiffel Tower + Digital Info Pack (Combo)",
    href: "/paris-river-cruises-combo-tickets/torre-eiffel-cruise-combooo",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/torre-eiffel-cruise-combooo?check-availability",
    image: "/paristicketshop/products/eiffelandseineboat-991x991.webp",
    imageAlt: "Eiffel Tower and Seine boat cruise combo",
    location: "Paris",
    rating: 4.4,
    reviewCount: 97,
    originalPrice: 44.9,
    price: 42.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-cruise-combo",
    title:
      "PARIS: Louvre Museum & Seine River Cruise: Art Discovery App & Boat Audio (Combo)",
    href: "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/boattourandlouvre-991x991.webp",
    imageAlt: "Louvre Museum and Seine River Cruise combo",
    location: "Paris",
    rating: 4.5,
    reviewCount: 195,
    originalPrice: 55.9,
    price: 44.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "versailles-eiffel-cruise",
    title:
      "Versailles Palace, Eiffel Tower & Seine Cruise: Ultimate Planning Service & Maps (combo)",
    href: "/paris-river-cruises-combo-tickets/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo?check-availability",
    image: "/paristicketshop/products/ec5i3hc.webp",
    imageAlt: "Versailles Palace, Eiffel Tower and Seine Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.6,
    reviewCount: 27,
    price: 63.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket", "Flexible Hours"],
  },
  {
    id: "versailles-louvre",
    title: "Versailles & Louvre + Digital Companion (combo)",
    href: "/paris-river-cruises-combo-tickets/versailles-palacelouvre-museum-combo-tickets",
    availabilityHref:
      "/paris-river-cruises-combo-tickets/versailles-palacelouvre-museum-combo-tickets?check-availability",
    image: "/paristicketshop/products/versailleslouvre.webp",
    imageAlt: "Versailles Palace and Louvre Museum combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 59.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
];

export const eiffelTowerProducts: Product[] = [
  {
    id: "eiffel-2nd-floor",
    title: "Eiffel Tower 2nd Floor: City Skyline Views & Digital Locator Map",
    href: "/the-eiffel-tower/eiffel-tower-entry-tickets",
    availabilityHref:
      "/the-eiffel-tower/eiffel-tower-entry-tickets?check-availability",
    image: "/paristicketshop/products/shutterstock-129708554_576x576.webp",
    imageAlt: "Eiffel Tower second floor city skyline views",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 139,
    originalPrice: 32.9,
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "eiffel-essentials-combo",
    title:
      "PARIS Essentials Service: Seine River Cruise, Eiffel & Louvre Reservation & App Bundle (Combo)",
    href: "/the-eiffel-tower/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/the-eiffel-tower/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/untitled-1-recovered3_576x576.webp",
    imageAlt:
      "Seine River Cruise with Eiffel Tower and Louvre Museum combo tickets",
    badge: { label: "Triple Combo", variant: "red" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 284,
    originalPrice: 74.9,
    price: 68.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "eiffel-seine-combo",
    title:
      "Paris: Seine River Cruise & Eiffel Tower + Digital Info Pack (Combo)",
    href: "/the-eiffel-tower/torre-eiffel-cruise-combooo",
    availabilityHref:
      "/the-eiffel-tower/torre-eiffel-cruise-combooo?check-availability",
    image: "/paristicketshop/products/eiffelandseineboat-991x991_576x576.webp",
    imageAlt: "Eiffel Tower and Seine boat cruise combo",
    location: "Paris",
    rating: 4.4,
    reviewCount: 97,
    originalPrice: 44.9,
    price: 42.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "eiffel-versailles-combo",
    title:
      "Versailles & Eiffel Tower: Iconic Landmarks & Audio Guide (combo)",
    href: "/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo",
    availabilityHref:
      "/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo?check-availability",
    image: "/paristicketshop/products/eiffelandversaillecastle_576x576.webp",
    imageAlt: "Versailles Palace and Eiffel Tower combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.5,
    reviewCount: 52,
    price: 57.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "eiffel-versailles-seine",
    title:
      "Versailles Palace, Eiffel Tower & Seine Cruise: Ultimate Planning Service & Maps (combo)",
    href: "/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    availabilityHref:
      "/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo?check-availability",
    image: "/paristicketshop/products/ec5i3hc_576x576.webp",
    imageAlt: "Versailles Palace, Eiffel Tower and Seine Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.6,
    reviewCount: 27,
    price: 63.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket", "Flexible Hours"],
  },
  {
    id: "eiffel-louvre-visit",
    title: "Louvre Museum Visit: Entry Planning & E-Guide",
    href: "/the-eiffel-tower/visit-the-louvre-museum",
    availabilityHref:
      "/the-eiffel-tower/visit-the-louvre-museum?check-availability",
    image:
      "/paristicketshop/products/gemini-generated-image-rtuynvrtuynvrtuy_576x576.webp",
    imageAlt: "Louvre Museum visit entry planning",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 1981,
    originalPrice: 55.9,
    price: 38.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
    ],
  },
  {
    id: "eiffel-seine-cruise",
    title: "Paris: Seine River Cruise - 1-Hour long tour & Digital Audio",
    href: "/the-eiffel-tower/paris-seine-river-cruise-1-hour-long-tour",
    availabilityHref:
      "/the-eiffel-tower/paris-seine-river-cruise-1-hour-long-tour?check-availability",
    image: "/paristicketshop/products/paris-seine-river-cruise_576x576.webp",
    imageAlt: "Paris Seine River Cruise one-hour tour",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 392,
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "eiffel-arc-de-triomphe",
    title: "Arc de Triomphe: City Views Experience & Historical PDF Guide",
    href: "/the-eiffel-tower/arc-de-triomphe-paris-entry-ticket",
    availabilityHref:
      "/the-eiffel-tower/arc-de-triomphe-paris-entry-ticket?check-availability",
    image: "/paristicketshop/products/arc-1_576x576.webp",
    imageAlt: "Arc de Triomphe city views experience",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
];

export const versaillesPalaceProducts: Product[] = [
  {
    id: "versailles-eiffel-seine",
    title:
      "Versailles Palace, Eiffel Tower & Seine Cruise: Ultimate Planning Service & Maps (combo)",
    href: "/versailles-palace/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    availabilityHref:
      "/versailles-palace/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo?check-availability",
    image: "/paristicketshop/products/ec5i3hc_576x576.webp",
    imageAlt: "Versailles Palace, Eiffel Tower and Seine Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.6,
    reviewCount: 27,
    price: 63.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket", "Flexible Hours"],
  },
  {
    id: "versailles-self-guided",
    title: "Versailles Palace: Self-Guided Visit & App",
    href: "/versailles-palace/versailles-palace-entry-tickets",
    availabilityHref:
      "/versailles-palace/versailles-palace-entry-tickets?check-availability",
    image: "/paristicketshop/products/versailles1_576x576.webp",
    imageAlt: "Versailles Palace self-guided visit",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.6,
    reviewCount: 26,
    originalPrice: 55,
    price: 50,
    pricePrefix: "from",
    features: ["Full Day Ticket", "Instant Confirm"],
  },
  {
    id: "versailles-eiffel-audio",
    title:
      "Versailles & Eiffel Tower: Iconic Landmarks & Audio Guide (combo)",
    href: "/versailles-palace/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo",
    availabilityHref:
      "/versailles-palace/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo?check-availability",
    image: "/paristicketshop/products/eiffelandversaillecastle_576x576.webp",
    imageAlt: "Versailles Palace and Eiffel Tower combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.5,
    reviewCount: 52,
    price: 57.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "versailles-interactive",
    title: "Versailles Palace: Many Access & Interactive Tour",
    href: "/versailles-palace/palace-of-versailles-audioguide",
    availabilityHref:
      "/versailles-palace/palace-of-versailles-audioguide?check-availability",
    image: "/paristicketshop/products/versailles3_576x.webp",
    imageAlt: "Versailles Palace interactive tour access",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 50,
    pricePrefix: "from",
    features: ["Full Day Ticket", "Instant Confirm"],
  },
  {
    id: "versailles-full-access",
    title:
      "Versailles Full Access Service: Palace, Gardens & Musical Fountains Reservation",
    href: "/versailles-palace/versailles-palace-entry-ticket-full-pass",
    availabilityHref:
      "/versailles-palace/versailles-palace-entry-ticket-full-pass?check-availability",
    image: "/paristicketshop/products/versailles-paris-4_576x576.webp",
    imageAlt: "Versailles Palace gardens and musical fountains",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 34.9,
    pricePrefix: "from",
    features: ["Full Day Ticket", "Instant Confirm"],
  },
  {
    id: "versailles-louvre-combo",
    title: "Versailles & Louvre + Digital Companion (combo)",
    href: "/versailles-palace/versailles-palacelouvre-museum-combo-tickets",
    availabilityHref:
      "/versailles-palace/versailles-palacelouvre-museum-combo-tickets?check-availability",
    image: "/paristicketshop/products/versailleslouvre_576x576.webp",
    imageAlt: "Versailles Palace and Louvre Museum combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 59.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "versailles-seine-combo",
    title:
      "Versailles Palace & Seine River Cruise: Royal Day Out & Audio App (combo)",
    href: "/versailles-palace/versailles-palace-seine-river-cruise-combo",
    availabilityHref:
      "/versailles-palace/versailles-palace-seine-river-cruise-combo?check-availability",
    image: "/paristicketshop/products/seineversailles_576x576.webp",
    imageAlt: "Versailles Palace and Seine River Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 45.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "versailles-gardens",
    title:
      "Versailles Palace - Access to the Gardens & Musical Garden Show",
    href: "/versailles-palace/versailles-palace-access-to-the-gardens-musical-gardens-show",
    availabilityHref:
      "/versailles-palace/versailles-palace-access-to-the-gardens-musical-gardens-show?check-availability",
    image: "/paristicketshop/products/versailles-paris-2_576x576.webp",
    imageAlt: "Versailles Palace gardens and musical garden show",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 19.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
];

export const louvreTicketsProducts: Product[] = [
  {
    id: "louvre-visit-eguide",
    title: "Louvre Museum Visit: Entry Planning & E-Guide",
    href: "/louvre-tickets/visit-the-louvre-museum",
    availabilityHref:
      "/louvre-tickets/visit-the-louvre-museum?check-availability",
    image:
      "/paristicketshop/products/gemini-generated-image-rtuynvrtuynvrtuy_576x576.webp",
    imageAlt: "Louvre Museum visit entry planning",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 1981,
    originalPrice: 55.9,
    price: 38.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
    ],
  },
  {
    id: "louvre-audioguide",
    title: "Louvre Museum Access Service & Audio Guide",
    href: "/louvre-tickets/visit-the-louvre-museum-audioguide",
    availabilityHref:
      "/louvre-tickets/visit-the-louvre-museum-audioguide?check-availability",
    image: "/paristicketshop/products/679156b3396c4414344759-1-copy_576x576.webp",
    imageAlt: "Louvre Museum access service and audio guide",
    location: "Paris",
    rating: 4.6,
    reviewCount: 1322,
    originalPrice: 59.9,
    price: 54.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
    ],
  },
  {
    id: "louvre-essentials-combo",
    title:
      "PARIS Essentials Service: Seine River Cruise, Eiffel & Louvre Reservation & App Bundle (Combo)",
    href: "/louvre-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/louvre-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/untitled-1-recovered3_576x576.webp",
    imageAlt:
      "Seine River Cruise with Eiffel Tower and Louvre Museum combo tickets",
    badge: { label: "Triple Combo", variant: "red" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 284,
    originalPrice: 74.9,
    price: 68.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-seine-combo",
    title:
      "PARIS: Louvre Museum & Seine River Cruise: Art Discovery App & Boat Audio (Combo)",
    href: "/louvre-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/louvre-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/boattourandlouvre-991x991_576x576.webp",
    imageAlt: "Louvre Museum and Seine River Cruise combo",
    location: "Paris",
    rating: 4.5,
    reviewCount: 195,
    originalPrice: 55.9,
    price: 44.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-seine-cruise",
    title: "Paris: Seine River Cruise - 1-Hour long tour & Digital Audio",
    href: "/louvre-tickets/paris-seine-river-cruise-1-hour-long-tour",
    availabilityHref:
      "/louvre-tickets/paris-seine-river-cruise-1-hour-long-tour?check-availability",
    image: "/paristicketshop/products/paris-seine-river-cruise_576x576.webp",
    imageAlt: "Paris Seine River Cruise one-hour tour",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 392,
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-eiffel-2nd-floor",
    title: "Eiffel Tower 2nd Floor: City Skyline Views & Digital Locator Map",
    href: "/louvre-tickets/eiffel-tower-entry-tickets",
    availabilityHref:
      "/louvre-tickets/eiffel-tower-entry-tickets?check-availability",
    image: "/paristicketshop/products/shutterstock-129708554_576x576.webp",
    imageAlt: "Eiffel Tower second floor city skyline views",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 139,
    originalPrice: 32.9,
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-versailles-combo",
    title: "Versailles & Louvre + Digital Companion (combo)",
    href: "/louvre-tickets/versailles-palacelouvre-museum-combo-tickets",
    availabilityHref:
      "/louvre-tickets/versailles-palacelouvre-museum-combo-tickets?check-availability",
    image: "/paristicketshop/products/versailleslouvre_576x576.webp",
    imageAlt: "Versailles Palace and Louvre Museum combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 59.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "louvre-arc-de-triomphe",
    title: "Arc de Triomphe: City Views Experience & Historical PDF Guide",
    href: "/louvre-tickets/arc-de-triomphe-paris-entry-ticket",
    availabilityHref:
      "/louvre-tickets/arc-de-triomphe-paris-entry-ticket?check-availability",
    image: "/paristicketshop/products/arc-1_576x576.webp",
    imageAlt: "Arc de Triomphe city views experience",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "louvre-conciergerie-sainte-chapelle",
    title: "Conciergerie & Sainte Chapelle Self Guided Tour + E-Guide",
    href: "/louvre-tickets/conciergerie-saint-chapelle-combo-entry-tickets",
    availabilityHref:
      "/louvre-tickets/conciergerie-saint-chapelle-combo-entry-tickets?check-availability",
    image: "/paristicketshop/products/saintechapelle-conciergerie_576x576.webp",
    imageAlt: "Conciergerie and Sainte Chapelle combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 39.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
];

export const topAttractionsProducts: Product[] = [
  {
    id: "top-louvre-visit-eguide",
    title: "Louvre Museum Visit: Entry Planning & E-Guide",
    href: "/top-attractionss/visit-the-louvre-museum",
    availabilityHref:
      "/top-attractionss/visit-the-louvre-museum?check-availability",
    image:
      "/paristicketshop/products/gemini-generated-image-rtuynvrtuynvrtuy_576x576.webp",
    imageAlt: "Louvre Museum visit entry planning",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 1981,
    originalPrice: 55.9,
    price: 38.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
    ],
  },
  {
    id: "top-seine-cruise",
    title: "Paris: Seine River Cruise - 1-Hour long tour & Digital Audio",
    href: "/top-attractionss/paris-seine-river-cruise-1-hour-long-tour",
    availabilityHref:
      "/top-attractionss/paris-seine-river-cruise-1-hour-long-tour?check-availability",
    image: "/paristicketshop/products/paris-seine-river-cruise_576x576.webp",
    imageAlt: "Paris Seine River Cruise one-hour tour",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.5,
    reviewCount: 392,
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-essentials-combo",
    title:
      "PARIS Essentials Service: Seine River Cruise, Eiffel & Louvre Reservation & App Bundle (Combo)",
    href: "/top-attractionss/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/top-attractionss/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/untitled-1-recovered3_576x576.webp",
    imageAlt:
      "Seine River Cruise with Eiffel Tower and Louvre Museum combo tickets",
    badge: { label: "Triple Combo", variant: "red" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 284,
    originalPrice: 74.9,
    price: 68.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-eiffel-2nd-floor",
    title: "Eiffel Tower 2nd Floor: City Skyline Views & Digital Locator Map",
    href: "/top-attractionss/eiffel-tower-entry-tickets",
    availabilityHref:
      "/top-attractionss/eiffel-tower-entry-tickets?check-availability",
    image: "/paristicketshop/products/shutterstock-129708554_576x576.webp",
    imageAlt: "Eiffel Tower second floor city skyline views",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    rating: 4.4,
    reviewCount: 139,
    originalPrice: 32.9,
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-louvre-seine-combo",
    title:
      "PARIS: Louvre Museum & Seine River Cruise: Art Discovery App & Boat Audio (Combo)",
    href: "/top-attractionss/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets",
    availabilityHref:
      "/top-attractionss/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets?check-availability",
    image: "/paristicketshop/products/boattourandlouvre-991x991_576x576.webp",
    imageAlt: "Louvre Museum and Seine River Cruise combo",
    location: "Paris",
    rating: 4.5,
    reviewCount: 195,
    originalPrice: 55.9,
    price: 44.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-eiffel-seine-combo",
    title:
      "Paris: Seine River Cruise & Eiffel Tower + Digital Info Pack (Combo)",
    href: "/top-attractionss/torre-eiffel-cruise-combooo",
    availabilityHref:
      "/top-attractionss/torre-eiffel-cruise-combooo?check-availability",
    image: "/paristicketshop/products/eiffelandseineboat-991x991_576x576.webp",
    imageAlt: "Eiffel Tower and Seine boat cruise combo",
    location: "Paris",
    rating: 4.4,
    reviewCount: 97,
    originalPrice: 44.9,
    price: 42.9,
    pricePrefix: "from",
    features: [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-arc-de-triomphe",
    title: "Arc de Triomphe: City Views Experience & Historical PDF Guide",
    href: "/top-attractionss/arc-de-triomphe-paris-entry-ticket",
    availabilityHref:
      "/top-attractionss/arc-de-triomphe-paris-entry-ticket?check-availability",
    image: "/paristicketshop/products/arc-1_576x576.webp",
    imageAlt: "Arc de Triomphe city views experience",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 29.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-sainte-chapelle",
    title:
      "Sainte Chapelle: Stained Glass Discovery & Digital Information Booklet",
    href: "/top-attractionss/sainte-chapelle-paris-entry-ticket",
    availabilityHref:
      "/top-attractionss/sainte-chapelle-paris-entry-ticket?check-availability",
    image: "/paristicketshop/products/saint-chapelle-2_576x576.webp",
    imageAlt: "Sainte Chapelle stained glass discovery",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 21.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-conciergerie-sainte-chapelle",
    title: "Conciergerie & Sainte Chapelle Self Guided Tour + E-Guide",
    href: "/top-attractionss/conciergerie-saint-chapelle-combo-entry-tickets",
    availabilityHref:
      "/top-attractionss/conciergerie-saint-chapelle-combo-entry-tickets?check-availability",
    image: "/paristicketshop/products/saintechapelle-conciergerie_576x576.webp",
    imageAlt: "Conciergerie and Sainte Chapelle combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 39.9,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-conciergerie",
    title: "Conciergerie: History Digital Guide & Entry",
    href: "/top-attractionss/conciergerie-paris-entry-ticket",
    availabilityHref:
      "/top-attractionss/conciergerie-paris-entry-ticket?check-availability",
    image: "/paristicketshop/products/conciergerie-paris_576x576.webp",
    imageAlt: "Conciergerie history digital guide and entry",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Paris",
    price: 19.0,
    pricePrefix: "from",
    features: [
      "Full Day Ticket",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
    ],
  },
  {
    id: "top-versailles-seine-combo",
    title:
      "Versailles Palace & Seine River Cruise: Royal Day Out & Audio App (combo)",
    href: "/top-attractionss/versailles-palace-seine-river-cruise-combo",
    availabilityHref:
      "/top-attractionss/versailles-palace-seine-river-cruise-combo?check-availability",
    image: "/paristicketshop/products/seineversailles_576x576.webp",
    imageAlt: "Versailles Palace and Seine River Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 45.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "top-versailles-louvre-combo",
    title: "Versailles & Louvre + Digital Companion (combo)",
    href: "/top-attractionss/versailles-palacelouvre-museum-combo-tickets",
    availabilityHref:
      "/top-attractionss/versailles-palacelouvre-museum-combo-tickets?check-availability",
    image: "/paristicketshop/products/versailleslouvre_576x576.webp",
    imageAlt: "Versailles Palace and Louvre Museum combo tickets",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 59.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "top-versailles-eiffel-seine",
    title:
      "Versailles Palace, Eiffel Tower & Seine Cruise: Ultimate Planning Service & Maps (combo)",
    href: "/top-attractionss/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    availabilityHref:
      "/top-attractionss/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo?check-availability",
    image: "/paristicketshop/products/ec5i3hc_576x576.webp",
    imageAlt: "Versailles Palace, Eiffel Tower and Seine Cruise combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.6,
    reviewCount: 27,
    price: 63.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket", "Flexible Hours"],
  },
  {
    id: "top-versailles-eiffel-combo",
    title:
      "Versailles & Eiffel Tower: Iconic Landmarks & Audio Guide (combo)",
    href: "/top-attractionss/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo",
    availabilityHref:
      "/top-attractionss/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo?check-availability",
    image: "/paristicketshop/products/eiffelandversaillecastle_576x576.webp",
    imageAlt: "Versailles Palace and Eiffel Tower combo",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    rating: 4.5,
    reviewCount: 52,
    price: 57.9,
    pricePrefix: "from",
    features: ["Instant Confirm", "Mobile Ticket"],
  },
  {
    id: "top-versailles-interactive",
    title: "Versailles Palace: Many Access & Interactive Tour",
    href: "/top-attractionss/palace-of-versailles-audioguide",
    availabilityHref:
      "/top-attractionss/palace-of-versailles-audioguide?check-availability",
    image: "/paristicketshop/products/versailles3_576x.webp",
    imageAlt: "Versailles Palace interactive tour access",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 50.0,
    pricePrefix: "from",
    features: ["Full Day Ticket", "Instant Confirm"],
  },
  {
    id: "top-versailles-full-access",
    title:
      "Versailles Full Access Service: Palace, Gardens & Musical Fountains Reservation",
    href: "/top-attractionss/versailles-palace-entry-ticket-full-pass",
    availabilityHref:
      "/top-attractionss/versailles-palace-entry-ticket-full-pass?check-availability",
    image: "/paristicketshop/products/versailles-paris-4_576x576.webp",
    imageAlt: "Versailles Palace full access service",
    badge: { label: "Highly Recommended", variant: "blue" },
    location: "Versailles",
    price: 34.9,
    pricePrefix: "from",
    features: ["Full Day Ticket", "Instant Confirm"],
  },
];

export const navLinks = [
  {
    label: "Top Attractions",
    href: "/top-attractionss",
  },
  {
    label: "Versailles Palace",
    href: "/versailles-palace",
  },
  {
    label: "The Eiffel Tower",
    href: "/the-eiffel-tower",
  },
  {
    label: "Cruises",
    href: "/paris-river-cruises-combo-tickets",
  },
  {
    label: "The Louvre",
    href: "/louvre-tickets",
  },
] as const;
