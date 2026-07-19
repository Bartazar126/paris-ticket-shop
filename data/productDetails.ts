import type { BadgeVariant, ProductFeature } from "./products";

export type ProductDetailLocation = {
  name?: string;
  lines: string[];
  mapsUrl?: string;
};

export type ProductDetailReviewSummary = {
  rating?: number;
  reviewCount?: number;
  stars: Partial<Record<"1" | "2" | "3" | "4" | "5", number>>;
};

export type ProductDetail = {
  slug: string;
  title: string;
  gallery: string[];
  overview: string[];
  whatsIncluded: string[];
  informations: string[];
  additionalInfo: string[];
  bookingProcess: string;
  location: ProductDetailLocation;
  cancellationPolicy: string[];
  badge?: { label: string; variant: BadgeVariant };
  rating?: number;
  reviewCount?: number;
  features: ProductFeature[];
  reviewSummary?: ProductDetailReviewSummary;
  canonicalPath: string;
  sourceUrl: string;
};

export const productDetailsBySlug = {
  "arc-de-triomphe-paris-entry-ticket": {
    "slug": "arc-de-triomphe-paris-entry-ticket",
    "title": "Arc de Triomphe: City Views Experience & Historical PDF Guide",
    "gallery": [
      "/paristicketshop/products/arc-de-triomphe-paris-entry-ticket/arc-1.webp",
      "/paristicketshop/products/arc-de-triomphe-paris-entry-ticket/arc-2.webp",
      "/paristicketshop/products/arc-de-triomphe-paris-entry-ticket/arc-3.webp",
      "/paristicketshop/products/arc-de-triomphe-paris-entry-ticket/arc-4.webp",
      "/paristicketshop/products/arc-de-triomphe-paris-entry-ticket/arc-1_991x991.webp"
    ],
    "overview": [
      "Arc de Triomphe Paris Ticket:",
      "Triumph over long lines and secure your entry to the iconic Arc de Triomphe with our convenient online ticketing system! Witness a Parisian landmark steeped in history and offering breathtaking panoramic views.",
      "Prepare to be enthralled by:",
      "A Parisian Icon: Immerse yourself in the grandeur of the Arc de Triomphe, a triumphal arch commemorating France's victories during the French Revolution and Napoleonic Wars. Exquisite Sculptures: Admire the intricate details and powerful imagery adorning the arch, depicting historical battles and allegorical figures. Eternal Flame: Witness the flickering flame honoring French soldiers who died for their country."
    ],
    "whatsIncluded": [
      "Entry ticket to Pantheon"
    ],
    "informations": [
      "Last access to the monument 45 minutes before closing time.",
      "Free entrance is available on the first Sunday of January, February, March, November, and December and during European Heritage Days.",
      "Closed on January 1, May 1 and December 25."
    ],
    "additionalInfo": [
      "Confirmation will be received at the time of booking, unless booked within 1 hour of travel. In this case, confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Most travelers can participate"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Arc de Triomphe, Place Charles de Gaulle, Quartier du Faubourg-du-Roule, 8th Arrondissement of Paris",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.8737791%2C2.295037226037673"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for ARC DE TRIOMPHE are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
      "Full Day Ticket"
    ],
    "canonicalPath": "/the-eiffel-tower/arc-de-triomphe-paris-entry-ticket",
    "sourceUrl": "https://paristicketshop.com/the-eiffel-tower/arc-de-triomphe-paris-entry-ticket"
  },
  "conciergerie-paris-entry-ticket": {
    "slug": "conciergerie-paris-entry-ticket",
    "title": "Conciergerie: History Digital Guide & Entry",
    "gallery": [
      "/paristicketshop/products/conciergerie-paris-entry-ticket/conciergerie-at-fotolia.webp",
      "/paristicketshop/products/conciergerie-paris-entry-ticket/concier-paris-3.webp",
      "/paristicketshop/products/conciergerie-paris-entry-ticket/concier-paris-5.webp",
      "/paristicketshop/products/conciergerie-paris-entry-ticket/concier-paris-2dd.webp",
      "/paristicketshop/products/conciergerie-paris-entry-ticket/conciergerie-at-fotolia_991x991.webp"
    ],
    "overview": [
      "Conciergerie Paris Entry Tickets:",
      "Journey back in time and explore the captivating Conciergerie with our convenient entry tickets! This historic palace, once a royal residence and notorious prison, offers a glimpse into the heart of Parisian history.",
      "Prepare to be transported to:",
      "A Medieval Marvel: Immerse yourself in the grandeur of the Conciergerie's architecture, featuring a vast hall, imposing towers, and remnants of the Palais de la Cité, a former royal residence. A Notorious Prison: Explore the chilling cells that once housed famous figures like Marie Antoinette, awaiting their fate during the French Revolution. A Place of Justice: Discover the evolution of the Conciergerie, from a royal palace to a revolutionary tribunal and ultimately a courthouse."
    ],
    "whatsIncluded": [
      "Entry ticket to Pantheon"
    ],
    "informations": [
      "Last access to the monument 45 minutes before closing time.",
      "Free entrance is available on the first Sunday of January, February, March, November, and December and during European Heritage Days.",
      "Closed on January 1, May 1 and December 25."
    ],
    "additionalInfo": [
      "Confirmation will be received at the time of booking, unless booked within 1 hour of travel. In this case, confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Most travelers can participate"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Conciergerie, Escalier O, Quartier Saint-Germain-l'Auxerrois, 1st Arrondissement",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.8559492%2C2.3460263"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Conciergerie are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
      "Full Day Ticket"
    ],
    "canonicalPath": "/top-attractionss/conciergerie-paris-entry-ticket",
    "sourceUrl": "https://paristicketshop.com/top-attractionss/conciergerie-paris-entry-ticket"
  },
  "conciergerie-saint-chapelle-combo-entry-tickets": {
    "slug": "conciergerie-saint-chapelle-combo-entry-tickets",
    "title": "Conciergerie & Sainte Chapelle Self Guided Tour + E-Guide",
    "gallery": [
      "/paristicketshop/products/conciergerie-saint-chapelle-combo-entry-tickets/saintechapelle-conciergerie.webp",
      "/paristicketshop/products/conciergerie-saint-chapelle-combo-entry-tickets/saint-chapelle-4.webp",
      "/paristicketshop/products/conciergerie-saint-chapelle-combo-entry-tickets/saint-chapelle-1.webp",
      "/paristicketshop/products/conciergerie-saint-chapelle-combo-entry-tickets/concier-paris-5.webp",
      "/paristicketshop/products/conciergerie-saint-chapelle-combo-entry-tickets/saintechapelle-conciergerie_991x991.webp"
    ],
    "overview": [
      "Conciergerie + Sainte Chapelle Combo Tickets:",
      "Unveil the rich tapestry of Parisian history with a captivating combo ticket that grants access to two iconic landmarks: the Conciergerie and Sainte Chapelle.",
      "Conciergerie: A Palace Turned Prison",
      "Journey back in time to the heart of the French Revolution as you explore the Conciergerie, a former royal palace that was transformed into a notorious prison during this tumultuous era. Wander through the vast hall once used for royal banquets and imagine the grandeur of the palace's past. Delve into the chilling cells that housed famous figures like Marie Antoinette, awaiting their fate during the Revolution. Discover the evolution of the Conciergerie from a royal residence to a revolutionary tribunal and eventually a courthouse.",
      "Sainte Chapelle: A Radiant Jewel of Gothic Architecture",
      "Step into the awe-inspiring Sainte Chapelle, a UNESCO World Heritage Site renowned for its breathtaking stained-glass windows. Admire the radiant light filtering through the vast expanse of stained glass, depicting scenes from the Old and New Testaments. Marvel at the delicate architectural details of this Gothic masterpiece, including the soaring ribbed vaults and intricate stonework. Experience the serene atmosphere as you bask in the beauty of this spiritual sanctuary."
    ],
    "whatsIncluded": [
      "Entry ticket to Pantheon"
    ],
    "informations": [
      "Last access to the monument 45 minutes before closing time.",
      "Free entrance is available on the first Sunday of January, February, March, November, and December and during European Heritage Days.",
      "Closed on January 1, May 1 and December 25."
    ],
    "additionalInfo": [
      "Confirmation will be received at the time of booking, unless booked within 1 hour of travel. In this case, confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Most travelers can participate"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Conciergerie, Escalier O, Quartier Saint-Germain-l'Auxerrois, 1st Arrondissement",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.8559492%2C2.3460263"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Conciergerie + Saint Chapelle are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
      "Full Day Ticket"
    ],
    "canonicalPath": "/louvre-tickets/conciergerie-saint-chapelle-combo-entry-tickets",
    "sourceUrl": "https://paristicketshop.com/louvre-tickets/conciergerie-saint-chapelle-combo-entry-tickets"
  },
  "eiffel-tower-entry-tickets": {
    "slug": "eiffel-tower-entry-tickets",
    "title": "Eiffel Tower 2nd Floor: City Skyline Views & Digital Locator Map",
    "gallery": [
      "/paristicketshop/products/eiffel-tower-entry-tickets/shutterstock-129708554.webp",
      "/paristicketshop/products/eiffel-tower-entry-tickets/eiffel-2.webp",
      "/paristicketshop/products/eiffel-tower-entry-tickets/eiffel-3.webp",
      "/paristicketshop/products/eiffel-tower-entry-tickets/eiffel-7.webp",
      "/paristicketshop/products/eiffel-tower-entry-tickets/shutterstock-129708554_991x991.webp"
    ],
    "overview": [
      "Embark on a captivating hour-long journey to the pinnacle of Parisian landmarks, the Eiffel Tower. Ascend its majestic heights and unveil breathtaking panoramic vistas that extend as far as the Seine River and the iconic Arc de Triomphe.",
      "Venture to the second floor, where a mesmerizing panorama unfolds before your eyes. Capture the essence of Paris in a single glance, from the grand boulevards to the charming cobblestone streets."
    ],
    "whatsIncluded": [
      "Tickets for 2nd floor of the Eiffel Tower",
      "Optionally, you can have lunch or dinner on the 1st floor in a beautiful restaurant",
      "Admire the city of Paris from the iconic Eiffel Tower and marvel at the significant landmarks",
      "There is no time limit on how much time you can stay, you can stay as long as you'd like",
      "Access the Eiffel Tower 2nd floor by stairs"
    ],
    "informations": [],
    "additionalInfo": [
      "Secure your Eiffel Tower experience with immediate confirmation upon booking.",
      "Adult supervision is required for childrens.",
      "Easy access to public transportation",
      "Not suitable for wheelchair users",
      "Widely accessible to travelers"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nThe Entry Tickets we will send in work hours 8:00 BETWEEN 22:00\n\nIN PARIS TIME(Europe)\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Eiffel Tower",
      "lines": [
        "PUBLIC TRANSPORTATION",
        "Metro Bir-Hakeim - Grenelle",
        "Metro Trocadéro",
        "RER C Champ de Mars Tour Eiffel",
        "Bus 42, 69, 82, 87 - Champ de Mars"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8582599%2C2.2945006358633115"
    },
    "cancellationPolicy": [
      "Enjoy flexible cancellation options with a full refund up to 24 hours before your scheduled experience",
      "For a full refund, simply inform us before 24 hours of the experience's commencement.",
      "Please note that no refunds will be issued for cancellations made within 24 hours of the experience's start time.",
      "To ensure smooth operations and maintain the integrity of the experience, we kindly request that any changes to your booking be made at least 24 hours before the event's commencement. Changes made within this timeframe will not be accommodated.",
      "Please note that all cut-off times are based on the local time of the experience.",
      "Enjoy the outdoors with confidence, knowing that your experience is weather-dependent. In case of unfavorable weather conditions, we'll seamlessly reschedule your adventure or provide a full refund to ensure your satisfaction."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.4,
    "reviewCount": 139,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.4,
      "reviewCount": 139,
      "stars": {
        "1": 4,
        "2": 5,
        "3": 15,
        "4": 22,
        "5": 93
      }
    },
    "canonicalPath": "/the-eiffel-tower/eiffel-tower-entry-tickets",
    "sourceUrl": "https://paristicketshop.com/the-eiffel-tower/eiffel-tower-entry-tickets"
  },
  "palace-of-versailles-audioguide": {
    "slug": "palace-of-versailles-audioguide",
    "title": "Versailles Palace: Many Access & Interactive Tour",
    "gallery": [
      "/paristicketshop/products/palace-of-versailles-audioguide/versailles3_576x.webp",
      "/paristicketshop/products/palace-of-versailles-audioguide/2_576x.webp",
      "/paristicketshop/products/palace-of-versailles-audioguide/3_576x.webp",
      "/paristicketshop/products/palace-of-versailles-audioguide/4_576x.webp",
      "/paristicketshop/products/palace-of-versailles-audioguide/versailles3.webp"
    ],
    "overview": [
      "Throughout your exploration, don't miss the themed salons, each dedicated to a specific subject or era. The Hall of Mirrors, a masterpiece of Baroque design, stretches over 70 meters and reflects the beauty of the palace's gardens."
    ],
    "whatsIncluded": [
      "Audioguide in 12 different languages: Chinese, English, French, German, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish and Ukrainian",
      "Full Pass for the Versailles Palace with it's Gardens"
    ],
    "informations": [
      "Embark on a journey through time as you step into the Palace of Versailles, where the French monarchy once held court for over a century.",
      "Be dazzled by the grandeur of the Royal State Apartments, where the opulent lifestyle of the French monarchs is vividly portrayed.",
      "Wander through the Hall of Mirrors, a resplendent corridor adorned with shimmering mirrors that reflect the splendor of the palace gardens beyond.",
      "Lose yourself in the magnificence of the King's and Queen's apartments, each brimming with exquisite furnishings and ornate décor.",
      "Conclude your exploration with a leisurely stroll through the meticulously manicured Palace gardens, where nature's beauty complements the opulence within."
    ],
    "additionalInfo": [
      "Confirmation will be received at time of booking, unless booked within 1 hours of travel. In this case confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Service animals allowed",
      "Near public transportation",
      "Most travelers can participate",
      "Operating Hours:",
      "The Palace:",
      "Tue to Sun: 9am - 5.30pm (last admission at 5pm)",
      "Ticket office closes at 4.50 pm",
      "Closed: every Mon, 1 Jan, 1 May, 25 Dec",
      "The time you choose at the time of booking applies only for the Palace entrance. You can leave at any time you wish once you enter.",
      "This ticket is valid for one-time entry only.",
      "The Park:",
      "Daily: 8am to 6pm (last admission at 5:30pm) on days with no exceptional weather (snow, violent winds, etc.)",
      "The Gardens:",
      "Daily: 8am to 6pm on days with no exceptional weather (snow, violent winds, etc.)",
      "Pedestrian access via:",
      "The Main Gate (last admission 5.30pm)",
      "The Dragon Gate (12pm - 6pm, last admission 5.30pm)",
      "Musical Fountains Show:",
      "2 Apr to 30 Oct: every Sat and Sun (except 1 May)",
      "3 May to 28 Jun: every Tue",
      "Also open on 15 Apr, 26 May, 14 Jul, 15 Aug",
      "Groves open from 9am to 7pm",
      "Musical displays open from 10am to 7pm"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.804425249999994%2C2.120285270992599"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Full Day Ticket"
    ],
    "canonicalPath": "/versailles-palace/palace-of-versailles-audioguide",
    "sourceUrl": "https://paristicketshop.com/versailles-palace/palace-of-versailles-audioguide"
  },
  "paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets": {
    "slug": "paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    "title": "PARIS Essentials Service: Seine River Cruise, Eiffel & Louvre Reservation & App Bundle (Combo)",
    "gallery": [
      "/paristicketshop/products/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets/untitled-1-recovered3.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets/shutterstock-1201269418.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets/shutterstock-769512748.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets/shutterstock-1201269025.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets/untitled-1-recovered3_991x991.webp"
    ],
    "overview": [
      "🌟 Explore Paris in Style with Our Exclusive Combo Offer! 🌟",
      "Unleash the magic of Paris with our unbeatable combo deal that brings together the city's iconic attractions for an unforgettable experience! Discover the artistry of the Louvre, stand in awe beneath the Eiffel Tower, and cruise the Seine on a captivating boat tour .",
      "🌟 Why Choose Our Combo?",
      "💳 Three Experiences: Maximize your time and value with Louvre, Eiffel Tower, and Seine River Cruise. 🎉 Unforgettable Memories: Create a seamless and memorable journey through the heart of Paris with these three iconic experiences."
    ],
    "whatsIncluded": [
      "1-Hour Sightseeing Cruise with Audioguide.",
      "Access the Eiffel Tower 2nd floor by stairs",
      "Full day ticket to Louvre Museum"
    ],
    "informations": [
      "Eiffel Tower Entry:",
      "The Tickets vaild for usein stairs for 2nd Floor.",
      "Louvre Entry:",
      "See the world's most famous painting, the Mona Lisa and Venus de Milo statue live. See thousands of other art paintings.",
      "In the Louvre you can choose Optional Audio Guide if requested after entry for extra money",
      "River Cruise:",
      "The sightseeing boat tour makes no stops, only stops at the departure point after one hour. So it makes a one hour round trip with no stops.",
      "Board the cruise anytime between 10:00 AM and 10:30 PM, with departures every half-hour, except for the ones scheduled at 1:00 PM and 7:30 PM.",
      "Audio guide in French, English, Hindi, Arabic, German, Italian, Spanish, Portuguese, Russian, Polish, Dutch, Chinese, Japanese, and Korean"
    ],
    "additionalInfo": [
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Restroom facilities are exclusively located on board the boats. There are no sanitary facilities accessible on the pontoons",
      "Only small backpacks and regular-sized handbags are permitted inside. Guests with larger bags will not be allowed to enter due to a lack of storage facilities",
      "Most travelers can participate"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nThe Entry Tickets we will send in work hours 8:00 BETWEEN 22:00\n\nIN PARIS TIME(Europe)\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Louvre Museum, Eiffel Tower, Bateaux Parisienes",
      "lines": [
        "Directions to the Cruise, and Eiffel:",
        "Bus  (Eiffel tower stop)",
        "30, 82",
        "Nearest METRO station:",
        "M12 to Rennes",
        "M6 to Bir- Hakeim",
        "Directions to Louvre",
        "by Bus at stop (Louvre- Rivoli) :",
        "21, 67, 69, 72, 74, 85,",
        "by Metro at stop ( Louvre- Rivoli)",
        "M1"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8611473%2C2.33802768704666"
    },
    "cancellationPolicy": [
      "Full refund for cancellations made 24 hours or more before the experience starts.",
      "No refund for cancellations made less than 24 hours before the experience starts.",
      "No changes will be accepted less than 24 hours before the start of the experience.",
      "Start times are local to the experience."
    ],
    "badge": {
      "label": "Triple Combo",
      "variant": "red"
    },
    "rating": 4.4,
    "reviewCount": 284,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.4,
      "reviewCount": 284,
      "stars": {
        "1": 5,
        "2": 15,
        "3": 27,
        "4": 63,
        "5": 174
      }
    },
    "canonicalPath": "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-eiffel-tower-entry-louvre-museum-entry-combo-tickets"
  },
  "paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets": {
    "slug": "paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets",
    "title": "PARIS: Louvre Museum & Seine River Cruise: Art Discovery App & Boat Audio (Combo)",
    "gallery": [
      "/paristicketshop/products/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets/boattourandlouvre-991x991.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets/shutterstock-1201269025.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets/lower-level-wood-interior.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets/pexels-alina-rossoshanska-16960924.webp",
      "/paristicketshop/products/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets/boattourandlouvre-991x991_991x991.webp"
    ],
    "overview": [
      "🌟 Seine River Cruise + Louvre Museum Entry Ticket🌟",
      "Unleash the magic of Paris with our unbeatable combo deal that brings together the city's iconic attractions for an unforgettable experience! Discover the artistry of the Louvre and cruise the Seine on a captivating boat tour.",
      "🌟 Why Choose Our Combo?",
      "💳 Two Experiences: Maximize your time and value with Louvre and Seine River Cruise. 🎉 Unforgettable Memories: Create a seamless and memorable journey through the heart of Paris with these three iconic experiences."
    ],
    "whatsIncluded": [
      "1-Hour Sightseeing Cruise with Audioguide.",
      "Full day ticket to Louvre Museum"
    ],
    "informations": [
      "Louvre Entry:",
      "See the world's most famous painting, the Mona Lisa and Venus de Milo statue live. See thousands of other art paintings.",
      "In the Louvre you can choose Optional Audio Guide if requested after entry for extra money",
      "River Cruise:",
      "The sightseeing boat tour makes no stops, only stops at the departure point after one hour. So it makes a one hour round trip with no stops.",
      "Board the cruise anytime between 10:00 AM and 10:30 PM, with departures every half-hour, except for the ones scheduled at 1:00 PM and 7:30 PM.",
      "Audio guide in French, English, Hindi, Arabic, German, Italian, Spanish, Portuguese, Russian, Polish, Dutch, Chinese, Japanese, and Korean"
    ],
    "additionalInfo": [
      "Boat, Louvre Infos:",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Restroom facilities are exclusively located on board the boats. There are no sanitary facilities accessible on the pontoons",
      "Only small backpacks and regular-sized handbags are permitted inside. Guests with larger bags will not be allowed to enter due to a lack of storage facilities",
      "Most travelers can participate"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nThe Entry Tickets we will send in work hours 8:00 BETWEEN 22:00\n\nIN PARIS TIME(Europe)\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Louvre, Bateaux Parisiens",
      "lines": [
        "Directions to the Cruise,",
        "Bus  (Eiffel tower stop)",
        "30, 82",
        "Nearest METRO station:",
        "M12 to Rennes",
        "M6 to Bir- Hakeim",
        "Directions to Louvre",
        "by Bus at stop (Louvre- Rivoli) :",
        "21, 67, 69, 72, 74, 85,",
        "by Metro at stop ( Louvre- Rivoli)",
        "M1"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8611473%2C2.33802768704666"
    },
    "cancellationPolicy": [
      "Full refund for cancellations made 24 hours or more before the experience starts.",
      "No refund for cancellations made less than 24 hours before the experience starts.",
      "No changes will be accepted less than 24 hours before the start of the experience.",
      "Start times are local to the experience."
    ],
    "rating": 4.5,
    "reviewCount": 195,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.5,
      "reviewCount": 195,
      "stars": {
        "1": 3,
        "2": 2,
        "3": 17,
        "4": 39,
        "5": 134
      }
    },
    "canonicalPath": "/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/paris-1-hour-boat-tour-louvre-museum-entry-combo-tickets"
  },
  "paris-seine-river-cruise-1-hour-long-tour": {
    "slug": "paris-seine-river-cruise-1-hour-long-tour",
    "title": "Paris: Seine River Cruise - 1-Hour long tour & Digital Audio",
    "gallery": [
      "/paristicketshop/products/paris-seine-river-cruise-1-hour-long-tour/paris-seine-river-cruise.webp",
      "/paristicketshop/products/paris-seine-river-cruise-1-hour-long-tour/shutterstock-1201269025.webp",
      "/paristicketshop/products/paris-seine-river-cruise-1-hour-long-tour/seine-river-cruise.webp",
      "/paristicketshop/products/paris-seine-river-cruise-1-hour-long-tour/paris-seine-river-tour.webp",
      "/paristicketshop/products/paris-seine-river-cruise-1-hour-long-tour/paris-seine-river-cruise_991x991.webp"
    ],
    "overview": [
      "Experience the magic of Paris from a unique perspective with a one-hour cruise on a glass canopy boat.",
      "Marvel at the iconic Eiffel Tower and the majestic Pantheon as you glide along the Seine River, creating memories that will last a lifetime."
    ],
    "whatsIncluded": [
      "Free Audio Guide on the Boat Trip, in 14 languages.",
      "1-Hour Seine River Cruise (Flexible Tickets)."
    ],
    "informations": [
      "The sightseeing boat tour makes no stops, only stops at the departure point after one hour. So it makes a one hour round trip with no stops.",
      "Board the cruise anytime between 10:00 AM and 10:30 PM, with departures every half-hour, except for the ones scheduled at 1:00 PM and 7:30 PM.",
      "Audio guide in French, English, Hindi, Arabic, German, Italian, Spanish, Portuguese, Russian, Polish, Dutch, Chinese, Japanese, and Korean",
      "Starts: Close to the eiffel tower."
    ],
    "additionalInfo": [
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Restroom facilities are exclusively located on board the boats. There are no sanitary facilities accessible on the pontoons",
      "Only small backpacks and regular-sized handbags are permitted inside. Guests with larger bags will not be allowed to enter due to a lack of storage facilities",
      "Most travelers can participate"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Bateaux Parisienes",
      "lines": [
        "Plan d'accès à la croisière",
        "Bus  (Eiffel tower stop)",
        "30, 82",
        "Nearest METRO station:",
        "M12 to Rennes",
        "M6 to Bir- Hakeim"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8619598%2C2.2966965"
    },
    "cancellationPolicy": [
      "Full refund for cancellations made 24 hours or more before the experience starts.",
      "No refund for cancellations made less than 24 hours before the experience starts.",
      "No changes will be accepted less than 24 hours before the start of the experience.",
      "Start times are local to the experience."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.5,
    "reviewCount": 392,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.5,
      "reviewCount": 392,
      "stars": {
        "1": 8,
        "2": 14,
        "3": 30,
        "4": 79,
        "5": 261
      }
    },
    "canonicalPath": "/paris-river-cruises-combo-tickets/paris-seine-river-cruise-1-hour-long-tour",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/paris-seine-river-cruise-1-hour-long-tour"
  },
  "sainte-chapelle-paris-entry-ticket": {
    "slug": "sainte-chapelle-paris-entry-ticket",
    "title": "Sainte Chapelle: Stained Glass Discovery & Digital Information Booklet",
    "gallery": [
      "/paristicketshop/products/sainte-chapelle-paris-entry-ticket/saint-chapelle-2.webp",
      "/paristicketshop/products/sainte-chapelle-paris-entry-ticket/saint-chapelle-3.webp",
      "/paristicketshop/products/sainte-chapelle-paris-entry-ticket/saint-chapelle-4.webp",
      "/paristicketshop/products/sainte-chapelle-paris-entry-ticket/saint-chapelle-1.webp",
      "/paristicketshop/products/sainte-chapelle-paris-entry-ticket/saint-chapelle-2_991x991.webp"
    ],
    "overview": [
      "Sainte Chapelle Paris Entry Tickets:",
      "Experience the breathtaking beauty of Sainte Chapelle with our convenient entry tickets! This exquisite Gothic masterpiece, renowned for its stained glass windows, promises a truly awe-inspiring visit.",
      "Prepare to be mesmerized by:",
      "Stained Glass Splendor: Immerse yourself in the vibrant colors and intricate details of the 15th-century stained glass windows, depicting biblical stories bathed in sunlight. Architectural Marvel: Discover the soaring ceilings, delicate tracery, and radiant light that defines the High Gothic style of Sainte Chapelle. Historical Significance: Explore the rich history of the chapel, built to house King Louis IX's crown of thorns, and learn about its role in French history."
    ],
    "whatsIncluded": [
      "Entry ticket to Sainte-Chapelle"
    ],
    "informations": [
      "The last admission is 30 minutes before the time of closure.",
      "Free entrance is available on the first Sunday of January, February, March, November, and December and during European Heritage Days.",
      "Closed on January 1, May 1 and December 25."
    ],
    "additionalInfo": [
      "Confirmation will be received at the time of booking, unless booked within 1 hour of travel. In this case, confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Most travelers can participate",
      "Admission is free for under-18s and EU citizens under the age of 26, on presentation of ID at the ticket office before going to the entrance."
    ],
    "bookingProcess": "",
    "location": {
      "name": "Sainte-Chapelle, 8, Boulevard du Palais, Quartier Saint-Germain-l'Auxerrois, 1st Arrondissement",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.8553933%2C2.34499406295433"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Sainte Chapelle are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours",
      "Full Day Ticket"
    ],
    "canonicalPath": "/top-attractionss/sainte-chapelle-paris-entry-ticket",
    "sourceUrl": "https://paristicketshop.com/top-attractionss/sainte-chapelle-paris-entry-ticket"
  },
  "torre-eiffel-cruise-combooo": {
    "slug": "torre-eiffel-cruise-combooo",
    "title": "Paris: Seine River Cruise & Eiffel Tower + Digital Info Pack (Combo)",
    "gallery": [
      "/paristicketshop/products/torre-eiffel-cruise-combooo/eiffelandseineboat-991x991.webp",
      "/paristicketshop/products/torre-eiffel-cruise-combooo/eiffel-tower-2.webp",
      "/paristicketshop/products/torre-eiffel-cruise-combooo/eiffel-tower-3.webp",
      "/paristicketshop/products/torre-eiffel-cruise-combooo/eiffel-tower-4.webp",
      "/paristicketshop/products/torre-eiffel-cruise-combooo/eiffelandseineboat-991x991_991x991.webp"
    ],
    "overview": [
      "🌟 Seine River Cruise + Eiffel Tower entry Ticket Combo 🌟",
      "Unleash the magic of Paris with our unbeatable combo deal that brings together the city's iconic attractions for an unforgettable experience! Discover the Eiffel Tower, and cruise on the Seine!",
      "🌟 Why Choose Our Combo?",
      "💳 Two Experiences: Maximize your time and value with Eiffel Tower, and Seine River Cruise. 🎉 Unforgettable Memories: Create a seamless and memorable journey through the heart of Paris with these three iconic experiences."
    ],
    "whatsIncluded": [
      "1-Hour Sightseeing Cruise with Audioguide.",
      "Access the Eiffel Tower 2nd floor by stairs"
    ],
    "informations": [
      "Eiffel Tower Entry:",
      "The Tickets vaild for usein stairs for 2nd Floor.",
      "River Cruise:",
      "The sightseeing boat tour makes no stops, only stops at the departure point after one hour. So it makes a one hour round trip with no stops.",
      "Board the cruise anytime between 10:00 AM and 10:30 PM, with departures every half-hour, except for the ones scheduled at 1:00 PM and 7:30 PM.",
      "Audio guide in French, English, Hindi, Arabic, German, Italian, Spanish, Portuguese, Russian, Polish, Dutch, Chinese, Japanese, and Korean"
    ],
    "additionalInfo": [
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Restroom facilities are exclusively located on board the boats. There are no sanitary facilities accessible on the pontoons",
      "Only small backpacks and regular-sized handbags are permitted inside. Guests with larger bags will not be allowed to enter due to a lack of storage facilities",
      "Most travelers can participate"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nThe Entry Tickets we will send in work hours 8:00 BETWEEN 22:00\n\nIN PARIS TIME(Europe)\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Eiffel Tower, Bateaux Parisiens",
      "lines": [
        "Directions to the Cruise",
        "Bus  (Eiffel tower stop)",
        "30, 82",
        "Nearest METRO station:",
        "M12 to Rennes",
        "M6 to Bir- Hakeim"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8582599%2C2.2945006358633115"
    },
    "cancellationPolicy": [
      "Full refund for cancellations made 24 hours or more before the experience starts.",
      "No refund for cancellations made less than 24 hours before the experience starts.",
      "No changes will be accepted less than 24 hours before the start of the experience.",
      "Start times are local to the experience."
    ],
    "rating": 4.4,
    "reviewCount": 97,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.4,
      "reviewCount": 97,
      "stars": {
        "1": 2,
        "2": 4,
        "3": 7,
        "4": 21,
        "5": 63
      }
    },
    "canonicalPath": "/paris-river-cruises-combo-tickets/torre-eiffel-cruise-combooo",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/torre-eiffel-cruise-combooo"
  },
  "versailles-palace-access-to-the-gardens-musical-gardens-show": {
    "slug": "versailles-palace-access-to-the-gardens-musical-gardens-show",
    "title": "Versailles Palace - Access to the Gardens & Musical Garden Show",
    "gallery": [
      "/paristicketshop/products/versailles-palace-access-to-the-gardens-musical-gardens-show/versailles-paris-2.webp",
      "/paristicketshop/products/versailles-palace-access-to-the-gardens-musical-gardens-show/vue-aerienne-de-versailles.webp",
      "/paristicketshop/products/versailles-palace-access-to-the-gardens-musical-gardens-show/versailles-g9dd359118-1920.webp",
      "/paristicketshop/products/versailles-palace-access-to-the-gardens-musical-gardens-show/versailles-paris-1.webp",
      "/paristicketshop/products/versailles-palace-access-to-the-gardens-musical-gardens-show/versailles-paris-2_991x991.webp"
    ],
    "overview": [
      "Discover the epitome of elegance at Versailles Palace!",
      "Purchase your ticket for a royal experience—explore opulent halls, stroll through enchanting gardens, and immerse yourself in centuries of French history. Secure your entry now!"
    ],
    "whatsIncluded": [
      "Entry to Versailles Gardens & Park",
      "Access to the Musical Garden Show"
    ],
    "informations": [
      "Explore the beauty of UNESCO heritage Versailles Palace with these captivating programs:",
      "Versailles Gardens & Park Access",
      "Musical Garden Show",
      "Guided tour of the Royal Apartments with an English-speaking historian",
      "Hall of Mirrors: witness the signing of the Treaty of Versailles",
      "Walk in the footsteps of world leaders and experience history",
      "After the palace tour, indulge in the picturesque Gardens of Versailles",
      "From April to October, be enchanted by Musical Garden and Fountain shows. Don't miss out!"
    ],
    "additionalInfo": [
      "Due to elevated temperatures and water reserve levels, there are slight modifications to the Musical Fountains Shows:",
      "The Great Perspective will be flooded at specific intervals.",
      "Watering of groves and ponds on the south side at designated times.",
      "Watering of groves and ponds on the north side at specified times.",
      "Please note that this ticket does not grant entry to the Main Palace of Versailles. Confirmation is received at booking, unless within 1 hour of travel.",
      "Operational details:",
      "Palace: Tue to Sun: 9am - 5.30pm (last admission at 5pm), closed on Mon, 1 Jan, 1 May, 25 Dec.",
      "Park: Daily 8am - 6pm (last admission at 5:30pm) on non-exceptional weather days.",
      "Gardens: Daily 8am - 6pm on non-exceptional weather days.",
      "Pedestrian access via Main Gate and Dragon Gate.",
      "Musical Fountains Show: Apr 2 to Oct 30, every Sat, Sun (except May 1), and additional dates.",
      "Please check the schedule for specific dates and times of the Musical Fountains Show. The ticket is valid for one-time entry only."
    ],
    "bookingProcess": "",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8038406%2C2.124646327596084"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket"
    ],
    "canonicalPath": "/versailles-palace/versailles-palace-access-to-the-gardens-musical-gardens-show",
    "sourceUrl": "https://paristicketshop.com/versailles-palace/versailles-palace-access-to-the-gardens-musical-gardens-show"
  },
  "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo": {
    "slug": "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo",
    "title": "Versailles & Eiffel Tower: Iconic Landmarks & Audio Guide (combo)",
    "gallery": [
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo/eiffelandversaillecastle.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo/versailles2.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo/versailles3.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo/eiffel-tower-paris-13.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo/eiffelandversaillecastle_991x991.webp"
    ],
    "overview": [
      "Embark on a captivating journey through France's captivating past and present with this exclusive 2-in-1 ticket.",
      "Delve into the opulent grandeur of Versailles, the former residence of French royalty, and immerse yourself in the stories of kings and queens. Ascend to the second floor of the Eiffel Tower, Paris's iconic landmark, and let your gaze sweep across the breathtaking panorama of the city. Experience the essence of France, where history intertwines with modernity, with this exclusive ticket."
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access the Eiffel Tower 2nd floor by stairs"
    ],
    "informations": [
      "Timed entry to the Main Palace of Versailles & the Grand King's Apartment",
      "( visit the ,the King's guard room, the antechamber of the great dining, the bull’s eye antechamber, the King’s Chamber, the Council room )",
      "Access to the Hall of Mirrors",
      "(The Hall of Mirrors, the most famous room in the Palace, was built to replace a large terrace designed by the architect Louis Le Vau, which opened onto the garden.)",
      "Access to the Temporary Exhibits",
      "(For more informations, please contact us)",
      "Access to the Gardens including the fountain show",
      "(Set out to explore the fountains and groves with their water features spouting to the rhythm of baroque music.)",
      "Access to the Grand & Petit Trianon",
      "(The Grand Trianon is a unique architectural composition featuring a central colonnaded gallery, or ‘Peristyle’, opening onto the central courtyard on one side and the gardens on the other.)",
      "Access to the Queen’s Hamlet",
      "(is an excellent example of the contemporary fascination with the charms of rural life.)",
      "Access to Versailles' Park",
      "(The Park covers approximately 800 hectares, criss-crossed by straight paths marking out wooded areas and agricultural fields, and is surrounded by a wall pierced by gates.)",
      "Eiffel Tower to 1st floor:",
      "(On your way to Level 1, hear the story of the controversial Eiffel Tower and how it changed the face of Paris. From here you can walk along the floating glass floor, 188 feet above the city, before continuing to Level 2 for incredible views of central Paris.)",
      "Eiffel Tower to 2nd floor:",
      "(Your guide will tell you all about the Eiffel Tower and the panoramic view of the nearby monuments. The second floor of the Eiffel Tower is a popular spot for visitors as it offers stunning panoramic views of Paris. From this level, you can enjoy a breathtaking vista of the city's landmarks, such as the Champs-Élysées, the Louvre Museum, Notre-Dame Cathedral, and the Seine River.)"
    ],
    "additionalInfo": [
      "Confirmation will be received at time of booking, unless booked within 1 hours of travel. In this case confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Near public transportation",
      "Service animals allowed",
      "Most travelers can participate",
      "Children must be accompanied by an adult. / Eiffel Tower/"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Palace of Versailles",
      "lines": [
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./",
        "Eiffel Tower - Public Transportation",
        "Metro Bir-Hakeim - Grenelle",
        "Metro Trocadéro",
        "RER C Champ de Mars Tour Eiffel",
        "Bus 42, 69, 82, 87 - Champ de Mars"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8035403%2C2.1266886"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.5,
    "reviewCount": 52,
    "features": [
      "Instant Confirm",
      "Mobile Ticket"
    ],
    "reviewSummary": {
      "rating": 4.5,
      "reviewCount": 52,
      "stars": {
        "1": 0,
        "2": 0,
        "3": 8,
        "4": 11,
        "5": 33
      }
    },
    "canonicalPath": "/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo",
    "sourceUrl": "https://paristicketshop.com/the-eiffel-tower/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticket-combo"
  },
  "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo": {
    "slug": "versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    "title": "Versailles Palace, Eiffel Tower & Seine Cruise: Ultimate Planning Service & Maps (combo)",
    "gallery": [
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo/ec5i3hc.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo/versailles2.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo/versailles3.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo/eiffel-tower-paris-13.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo/ec5i3hc_991x991.webp"
    ],
    "overview": [
      "Unleash the magic of Paris with this exceptional combo ticket, an all-inclusive package that will transport you to the heart of French grandeur and romance. Dive into the opulent splendor of Versailles, once the royal residence of France, and marvel at the breathtaking architecture and lavish interiors that have captivated visitors for centuries. Ascend to the iconic Eiffel Tower, a symbol of Parisian ingenuity and beauty, and take in panoramic vistas that will leave you breathless. Embark on a charming Seine River cruise, gliding along the city's historic waterways, and witness the enchanting Parisian skyline as it unfolds before you. Create unforgettable memories with this exceptional Parisian adventure, and let the City of Light enchant your senses in ways you never thought possible."
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access the Eiffel Tower 2nd floor by stairs",
      "1-Hour Seine River Cruise (Flexible Tickets)."
    ],
    "informations": [
      "Soar above Paris and reach for the sky at the iconic Eiffel Tower, a symbol of French elegance and architectural mastery.",
      "Bask in the panoramic splendor of the City of Lights as you ascend to the tower's heights, and let the breathtaking vistas captivate your senses.",
      "Embark on a mesmerizing Seine River cruise with Bateaux Parisiens, and glide along the city's romantic waterways, where iconic landmarks come alive before your eyes.",
      "Witness the architectural marvels of Notre-Dame Cathedral and the Louvre Museum while cruising amidst the enchanting Parisian ambiance.",
      "Immerse yourself in the rich history and timeless romance of Paris as you glide along the Seine, creating memories that will forever linger in your heart.",
      "Step into the grandeur of Versailles, a palace that epitomizes French opulence and regal splendor.",
      "Venture through the meticulously landscaped gardens, where fountains dance to the rhythm of nature, and let the echoes of history resonate within you."
    ],
    "additionalInfo": [
      "Confirmation will be received at time of booking, unless booked within 1 hours of travel. In this case confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Near public transportation",
      "Service animals allowed",
      "Most travelers can participate",
      "Children must be accompanied by an adult. / Eiffel Tower,Seine Boat Tour/"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Palace of Versailles",
      "lines": [
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./",
        "Eiffel Tower - Public Transportation",
        "Metro Bir-Hakeim - Grenelle",
        "Metro Trocadéro",
        "RER C Champ de Mars Tour Eiffel",
        "Bus 42, 69, 82, 87 - Champ de Mars",
        "Directions to the Cruise",
        "Bus  (Eiffel tower stop)",
        "30, 82",
        "Nearest METRO station:",
        "M12 to Rennes",
        "M6 to Bir- Hakeim"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.8035403%2C2.1266886"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.6,
    "reviewCount": 27,
    "features": [
      "Instant Confirm",
      "Mobile Ticket",
      "Flexible Hours"
    ],
    "reviewSummary": {
      "rating": 4.6,
      "reviewCount": 27,
      "stars": {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 8,
        "5": 17
      }
    },
    "canonicalPath": "/paris-river-cruises-combo-tickets/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/versailles-palace-entry-ticket-for-the-palace-eiffel-tower-entry-ticketseine-boat-tour-combo"
  },
  "versailles-palace-entry-ticket-full-pass": {
    "slug": "versailles-palace-entry-ticket-full-pass",
    "title": "Versailles Full Access Service: Palace, Gardens & Musical Fountains Reservation",
    "gallery": [
      "/paristicketshop/products/versailles-palace-entry-ticket-full-pass/versailles-paris-4.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-full-pass/versailles-paris-2.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-full-pass/versailles2.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-full-pass/versailles-paris-1.webp",
      "/paristicketshop/products/versailles-palace-entry-ticket-full-pass/versailles-paris-4_991x991.webp"
    ],
    "overview": [
      "Step back in time and immerse yourself in the opulent grandeur of Versailles, a UNESCO World Heritage site and a testament to the power and opulence of the French monarchy.",
      "Venture into the Palace's grand State Apartments, where the King and Queen once held lavish ceremonies and hosted esteemed guests. Admire the intricate details, ornate furnishings, and vibrant frescoes that adorn these palatial chambers."
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access to Versailles' Park",
      "Access to the Queen’s Hamlet",
      "Access to the Grand & Petit Trianon",
      "Access to the Gardens with the Fountain Show",
      "Access to the Temporary Exhibitsion",
      "Access to the King's Grand Apartments",
      "Access to the Hall of Mirrors"
    ],
    "informations": [
      "Step through the portals of time: and immerse yourself in the captivating evolution of the Palace of Versailles, a UNESCO World Heritage site that has transformed from a humble hunting lodge to a majestic seat of power, a symbol of French grandeur, and a captivating museum.",
      "With the gardens and the ​​Palaces of Trianon: the park of the Château de Versailles spreads over 800 hectares.",
      "Step into the resplendent Hall of Mirrors: and marvel at the ingenious design that transforms a few candles into a dazzling spectacle. The 357 mirrors, impeccably arranged along the walls, effortlessly reflect the flickering flames, illuminating the entire hall with an ethereal glow.",
      "The first scenes of the French Revolution were enacted at Versailles: which had become a symbol of royal extravagance."
    ],
    "additionalInfo": [
      "Confirmation will be received at time of booking, unless booked within 1 hours of travel. In this case  confirmation will be received as soon as possible, subject to availability",
      "Not wheelchair accessible",
      "Service animals allowed",
      "Near public transportation",
      "Most travelers can participate",
      "Operating Hours:",
      "The Palace:",
      "Tue to Sun: 9am - 5.30pm (last admission at 5pm)",
      "Ticket office closes at 4.50 pm",
      "Closed: every Mon, 1 Jan, 1 May, 25 Dec",
      "The time you choose at the time of booking applies only for the Palace entrance. You can leave at any time you wish once you enter.",
      "This ticket is valid for one-time entry only.",
      "The Park:",
      "Daily: 8am to 6pm (last admission at 5:30pm) on days with no exceptional weather (snow, violent winds, etc.)",
      "The Gardens:",
      "Daily: 8am to 6pm on days with no exceptional weather (snow, violent winds, etc.)",
      "Pedestrian access via:",
      "The Main Gate (last admission 5.30pm)",
      "The Dragon Gate (12pm - 6pm, last admission 5.30pm)",
      "Musical Fountains Show:",
      "2 Apr to 30 Oct: every Sat and Sun (except 1 May)",
      "3 May to 28 Jun: every Tue",
      "Also open on 15 Apr, 26 May, 14 Jul, 15 Aug",
      "Groves open from 9am to 7pm",
      "Musical displays open from 10am to 7pm"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.804425249999994%2C2.120285270992599"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Full Day Ticket"
    ],
    "canonicalPath": "/versailles-palace/versailles-palace-entry-ticket-full-pass",
    "sourceUrl": "https://paristicketshop.com/versailles-palace/versailles-palace-entry-ticket-full-pass"
  },
  "versailles-palace-entry-tickets": {
    "slug": "versailles-palace-entry-tickets",
    "title": "Versailles Palace: Self-Guided Visit & App",
    "gallery": [
      "/paristicketshop/products/versailles-palace-entry-tickets/versailles1.webp",
      "/paristicketshop/products/versailles-palace-entry-tickets/versailles2.webp",
      "/paristicketshop/products/versailles-palace-entry-tickets/versailles3.webp",
      "/paristicketshop/products/versailles-palace-entry-tickets/versailles4.webp",
      "/paristicketshop/products/versailles-palace-entry-tickets/versailles1_991x991.webp"
    ],
    "overview": [
      "Journey to the heart of French history and experience the unparalleled grandeur of Versailles Palace, a UNESCO World Heritage site and a testament to the power and opulence of the French monarchy.",
      "Immerse yourself in the rich history of Versailles, a place where kings and queens reigned supreme and grand soirées unfolded. Witness the echoes of the past as you explore the palace's hidden corners and listen to the tales of those who once walked these halls"
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access to the King's Grand Apartments",
      "Access to the Hall of Mirrors",
      "The Temporary Exhibitions"
    ],
    "informations": [
      "Venture further into the King's Bedroom: a sanctuary of rest and rejuvenation. Imagine the hushed whispers and subtle movements as Louis XIV prepared for his daily ritual of rising at dawn and attending the Royal Bedchamber Ceremony.",
      "Prepare to be mesmerized by the 357 mirrors: masterfully arranged to capture and amplify the soft radiance of candlelight. As you move through this grand chamber, the reflections dance and interweave, creating an enchanting spectacle of light and movement.",
      "Step into the whimsical world of Marie Antoinette Hamlet: a charming village created by the queen herself as a retreat from the formality of court life.",
      "To complete your unforgettable experience at Versailles: immerse yourself in the enchanting world of the fountain shows, a captivating spectacle that transforms the Gardens into a realm of dancing water and musical melodies."
    ],
    "additionalInfo": [
      "Confirmation will be received at time of booking.",
      "IMPORTANT: Children must be accompanied by an adult. If you buy AGE 0-17 Child Ticket, need to purchase one Adult with the Child Ticket as well!",
      "Near public transportation.",
      "Infant seats available.",
      "Most travelers can participate.",
      "Operating Hours:",
      "The Palace:",
      "Tue to Sun: 9am - 5.30pm (last admission at 5pm)",
      "Ticket office closes at 4.50 pm",
      "Closed: every Mon, 1 Jan, 1 May, 25 Dec",
      "The time you choose at the time of booking applies only for the Palace entrance. You can leave at any time you wish once you enter.",
      "This ticket is valid for one-time entry only.",
      "The park:",
      "Daily: 8am to 6pm (last admission at 5:30pm) on days with no exceptional weather (snow, violent winds, etc.)",
      "The Gardens:",
      "Daily: 8am to 6pm on days with no exceptional weather (snow, violent winds, etc.)",
      "Pedestrian access via:",
      "The Main Gate (last admission 5.30pm)",
      "The Dragon Gate (12pm - 6pm, last admission 5.30pm)",
      "Musical Fountains Show:",
      "2 Apr to 30 Oct: every Sat and Sun (except 1 May)",
      "3 May to 28 Jun: every Tue",
      "Also open on 15 Apr, 26 May, 14 Jul, 15 Aug",
      "Groves open from 9am to 7pm",
      "Musical displays open from 10am to 7pm"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET! If you don’t see our email in your inbox, please check your Spam or Junk folder as well. The Entry Tickets we will send in work hours 8:00 BETWEEN 22:00 IN PARIS TIME(Europe) Last minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.804425249999994%2C2.120285270992599"
    },
    "cancellationPolicy": [
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.6,
    "reviewCount": 26,
    "features": [
      "Instant Confirm",
      "Full Day Ticket"
    ],
    "reviewSummary": {
      "rating": 4.6,
      "reviewCount": 26,
      "stars": {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 6,
        "5": 18
      }
    },
    "canonicalPath": "/versailles-palace/versailles-palace-entry-tickets",
    "sourceUrl": "https://paristicketshop.com/versailles-palace/versailles-palace-entry-tickets"
  },
  "versailles-palace-seine-river-cruise-combo": {
    "slug": "versailles-palace-seine-river-cruise-combo",
    "title": "Versailles Palace & Seine River Cruise: Royal Day Out & Audio App (combo)",
    "gallery": [
      "/paristicketshop/products/versailles-palace-seine-river-cruise-combo/seineversailles.webp",
      "/paristicketshop/products/versailles-palace-seine-river-cruise-combo/versailles2.webp",
      "/paristicketshop/products/versailles-palace-seine-river-cruise-combo/versailles3.webp",
      "/paristicketshop/products/versailles-palace-seine-river-cruise-combo/bateaux-mouches-11.webp",
      "/paristicketshop/products/versailles-palace-seine-river-cruise-combo/seineversailles_991x991.webp"
    ],
    "overview": [
      "Immerse yourself in French grandeur with a Seine River Cruise and Versailles Castle Combo Ticket! This captivating combo experience allows you to unwind and be amazed in equal measure. Glide gracefully down the Seine River, soaking in the breathtaking sights of Paris from a unique perspective. Following your scenic cruise, journey to the majestic Palace of Versailles. Explore the lavish apartments, wander through the magnificent gardens, and lose yourself in the rich history of this French royal residence."
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access to the King's Grand Apartments",
      "Access to the Hall of Mirrors",
      "The Temporary Exhibitions",
      "1-Hour Sightseeing Cruise with Audioguide."
    ],
    "informations": [
      "Versaille Palace:",
      "Venture further into the King's Bedroom: a sanctuary of rest and rejuvenation. Imagine the hushed whispers and subtle movements as Louis XIV prepared for his daily ritual of rising at dawn and attending the Royal Bedchamber Ceremony.",
      "Prepare to be mesmerized by the 357 mirrors: masterfully arranged to capture and amplify the soft radiance of candlelight. As you move through this grand chamber, the reflections dance and interweave, creating an enchanting spectacle of light and movement.",
      "Step into the whimsical world of Marie Antoinette Hamlet: a charming village created by the queen herself as a retreat from the formality of court life.",
      "To complete your unforgettable experience at Versailles: immerse yourself in the enchanting world of the fountain shows, a captivating spectacle that transforms the Gardens into a realm of dancing water and musical melodies.",
      "Boat Tour:",
      "The sightseeing boat tour makes no stops, only stops at the departure point after one hour. So it makes a one hour round trip with no stops.",
      "Board the cruise anytime between 10:00 AM and 10:30 PM, with departures every half-hour, except for the ones scheduled at 1:00 PM and 7:30 PM.",
      "Audio guide in French, English, Hindi, Arabic, German, Italian, Spanish, Portuguese, Russian, Polish, Dutch, Chinese, Japanese, and Korean",
      "Starts: Close to the eiffel tower."
    ],
    "additionalInfo": [
      "Versaille Palace:",
      "Confirmation will be received at time of booking.",
      "IMPORTANT: Children must be accompanied by an adult. If you buy AGE 0-17 Child Ticket, need to purchase one Adult with the Child Ticket as well!",
      "Near public transportation.",
      "Infant seats available.",
      "Most travelers can participate.",
      "Operating Hours:",
      "The Palace:",
      "Tue to Sun: 9am - 5.30pm (last admission at 5pm)",
      "Ticket office closes at 4.50 pm",
      "Closed: every Mon, 1 Jan, 1 May, 25 Dec",
      "The time you choose at the time of booking applies only for the Palace entrance. You can leave at any time you wish once you enter.",
      "This ticket is valid for one-time entry only.",
      "The park:",
      "Daily: 8am to 6pm (last admission at 5:30pm) on days with no exceptional weather (snow, violent winds, etc.)",
      "The Gardens:",
      "Daily: 8am to 6pm on days with no exceptional weather (snow, violent winds, etc.)",
      "Pedestrian access via:",
      "The Main Gate (last admission 5.30pm)",
      "The Dragon Gate (12pm - 6pm, last admission 5.30pm)",
      "Musical Fountains Show:",
      "2 Apr to 30 Oct: every Sat and Sun (except 1 May)",
      "3 May to 28 Jun: every Tue",
      "Also open on 15 Apr, 26 May, 14 Jul, 15 Aug",
      "Groves open from 9am to 7pm",
      "Musical displays open from 10am to 7pm",
      "Boat Tour:",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Service animals allowed",
      "Near public transportation",
      "Infants must sit on laps",
      "Restroom facilities are exclusively located on board the boats. There are no sanitary facilities accessible on the pontoons",
      "Only small backpacks and regular-sized handbags are permitted inside. Guests with larger bags will not be allowed to enter due to a lack of storage facilities",
      "Most travelers can participate"
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.804425249999994%2C2.120285270992599"
    },
    "cancellationPolicy": [
      "Versaille Palace:",
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await.",
      "Boat Tour:",
      "Full refund for cancellations made 24 hours or more before the experience starts.",
      "No refund for cancellations made less than 24 hours before the experience starts.",
      "No changes will be accepted less than 24 hours before the start of the experience.",
      "Start times are local to the experience."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket"
    ],
    "canonicalPath": "/versailles-palace/versailles-palace-seine-river-cruise-combo",
    "sourceUrl": "https://paristicketshop.com/versailles-palace/versailles-palace-seine-river-cruise-combo"
  },
  "versailles-palacelouvre-museum-combo-tickets": {
    "slug": "versailles-palacelouvre-museum-combo-tickets",
    "title": "Versailles & Louvre + Digital Companion (combo)",
    "gallery": [
      "/paristicketshop/products/versailles-palacelouvre-museum-combo-tickets/versailleslouvre.webp",
      "/paristicketshop/products/versailles-palacelouvre-museum-combo-tickets/versailles2.webp",
      "/paristicketshop/products/versailles-palacelouvre-museum-combo-tickets/versailles4.webp",
      "/paristicketshop/products/versailles-palacelouvre-museum-combo-tickets/versailles5.webp",
      "/paristicketshop/products/versailles-palacelouvre-museum-combo-tickets/versailleslouvre_991x991.webp"
    ],
    "overview": [
      "Dive into Parisian Grandeur: Louvre Museum & Versailles Palace Combo Ticket",
      "Embark on a captivating journey through French history and artistry with this exclusive combo ticket! Gain access to two of Paris's most iconic landmarks: the Louvre Museum, a treasure trove of world-renowned art, and the Palace of Versailles, a symbol of French royalty and opulence."
    ],
    "whatsIncluded": [
      "Entry ticket to the Palace of Versailles",
      "Access to the King's Grand Apartments",
      "Access to the Hall of Mirrors",
      "The Temporary Exhibitions",
      "Full day ticket to Louvre Museum"
    ],
    "informations": [],
    "additionalInfo": [
      "Versailles Palace:",
      "Confirmation will be received at time of booking.",
      "IMPORTANT: Children must be accompanied by an adult. If you buy AGE 0-17 Child Ticket, need to purchase one Adult with the Child Ticket as well!",
      "Near public transportation.",
      "Infant seats available.",
      "Most travelers can participate.",
      "Operating Hours:",
      "The Palace:",
      "Tue to Sun: 9am - 5.30pm (last admission at 5pm)",
      "Ticket office closes at 4.50 pm",
      "Closed: every Mon, 1 Jan, 1 May, 25 Dec",
      "The time you choose at the time of booking applies only for the Palace entrance. You can leave at any time you wish once you enter.",
      "This ticket is valid for one-time entry only.",
      "The park:",
      "Daily: 8am to 6pm (last admission at 5:30pm) on days with no exceptional weather (snow, violent winds, etc.)",
      "The Gardens:",
      "Daily: 8am to 6pm on days with no exceptional weather (snow, violent winds, etc.)",
      "Pedestrian access via:",
      "The Main Gate (last admission 5.30pm)",
      "The Dragon Gate (12pm - 6pm, last admission 5.30pm)",
      "Musical Fountains Show:",
      "2 Apr to 30 Oct: every Sat and Sun (except 1 May)",
      "3 May to 28 Jun: every Tue",
      "Also open on 15 Apr, 26 May, 14 Jul, 15 Aug",
      "Groves open from 9am to 7pm",
      "Musical displays open from 10am to 7pm",
      "Louvre Museum:",
      "Not wheelchair accessible",
      "Not Stroller accessible",
      "Service animals not allowed",
      "Near public transportation",
      "Most travelers can participate"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Versailles",
      "lines": [
        "Palace of Versailles",
        "Place d'Armes, 78000, Versailles",
        "RER C train - Solution 1",
        "/arrives at Versailles Château - Rive Gauche train station, just 10 minutes’ walk to the Palace/",
        "RATP bus line 171 - Solution 2",
        "/ runs between Pont de Sèvres (terminus of the Paris metro line 9) and the Palace of Versailles in 30 minutes without traffic./"
      ],
      "mapsUrl": "https://www.google.com/maps?q=48.804425249999994%2C2.120285270992599"
    },
    "cancellationPolicy": [
      "Versailles Palace:",
      "Once purchased, the tickets for Versailles Palace are non-refundable and non-transferable.",
      "Therefore, we kindly ask you to carefully consider your plans before making a reservation, as changes or cancellations cannot be accommodated.",
      "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.",
      "Should you have any questions or require further assistance, please don't hesitate to reach out to our dedicated support team.",
      "Thank you for choosing Versailles Palace, where unforgettable experiences await.",
      "Louvre Museum:",
      "You can cancel up to 24 hours in advance of the experience for a full refund.",
      "For a full refund, you must cancel at least 24 hours before the experience's start time.",
      "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
      "Any changes made less than 24 hours before the experience's start time will not be accepted.",
      "Cut-off times are based on the experience's local time.",
      "This experience requires good weather. If it's canceled due to bad weather, you'll be offered a different date or a full refund."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "features": [
      "Instant Confirm",
      "Mobile Ticket"
    ],
    "canonicalPath": "/paris-river-cruises-combo-tickets/versailles-palacelouvre-museum-combo-tickets",
    "sourceUrl": "https://paristicketshop.com/paris-river-cruises-combo-tickets/versailles-palacelouvre-museum-combo-tickets"
  },
  "visit-the-louvre-museum-audioguide": {
    "slug": "visit-the-louvre-museum-audioguide",
    "title": "Louvre Museum Access Service & Audio Guide",
    "gallery": [
      "/paristicketshop/products/visit-the-louvre-museum-audioguide/679156b3396c4414344759-1-copy.webp",
      "/paristicketshop/products/visit-the-louvre-museum-audioguide/lovre-monalisa.webp",
      "/paristicketshop/products/visit-the-louvre-museum-audioguide/louvre-3.webp",
      "/paristicketshop/products/visit-the-louvre-museum-audioguide/59.webp",
      "/paristicketshop/products/visit-the-louvre-museum-audioguide/679156b3396c4414344759-1-copy_991x991.webp"
    ],
    "overview": [
      "Explore the world-famous Louvre Museum in Paris.",
      "See the world's most famous painting, the Mona Lisa and Venus de Milo statue live. See thousands of other art paintings, sculptures and historical artefacts. Save valuable time and money with prepaid online tickets. Skip the queue is included. You can go inside the great Louvre Pyramid, Skip-The-Line inside and go directly to the museum."
    ],
    "whatsIncluded": [
      "AudioGuide in English, German, French, Spanish, Italian",
      "See world famous arts like the Mona Lisa and the Venus De Milo.",
      "Explore this world famous landmark from the inside with it's exhibited 40,000 objects.",
      "Skip-The-Line at the cashiers, where you can save 1-2 hours.",
      "Full day ticket to Louvre Museum"
    ],
    "informations": [],
    "additionalInfo": [
      "Not wheelchair accessible",
      "Not Stroller accessible",
      "Service animals not allowed",
      "Near public transportation",
      "Most travelers can participate"
    ],
    "bookingProcess": "",
    "location": {
      "name": "Louvre Museum",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.86101631231847%2C2.335645453874458"
    },
    "cancellationPolicy": [
      "You can cancel up to 24 hours in advance of the experience for a full refund.",
      "For a full refund, you must cancel at least 24 hours before the experience's start time.",
      "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
      "Any changes made less than 24 hours before the experience's start time will not be accepted.",
      "Cut-off times are based on the experience's local time.",
      "This experience requires good weather. If it's canceled due to bad weather, you'll be offered a different date or a full refund."
    ],
    "rating": 4.6,
    "reviewCount": 1322,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Full Day Ticket"
    ],
    "reviewSummary": {
      "rating": 4.6,
      "reviewCount": 1322,
      "stars": {
        "1": 21,
        "2": 18,
        "3": 47,
        "4": 361,
        "5": 875
      }
    },
    "canonicalPath": "/louvre-tickets/visit-the-louvre-museum-audioguide",
    "sourceUrl": "https://paristicketshop.com/louvre-tickets/visit-the-louvre-museum-audioguide"
  },
  "visit-the-louvre-museum": {
    "slug": "visit-the-louvre-museum",
    "title": "Louvre Museum Visit: Entry Planning & E-Guide",
    "gallery": [
      "/paristicketshop/products/visit-the-louvre-museum/gemini-generated-image-rtuynvrtuynvrtuy.webp",
      "/paristicketshop/products/visit-the-louvre-museum/4luvre.webp",
      "/paristicketshop/products/visit-the-louvre-museum/1luvre.webp",
      "/paristicketshop/products/visit-the-louvre-museum/luvre-6.webp",
      "/paristicketshop/products/visit-the-louvre-museum/gemini-generated-image-rtuynvrtuynvrtuy_991x991.webp"
    ],
    "overview": [
      "Step into the heart of art and history at the Louvre Museum",
      "Behold the enigmatic smile of the Mona Lisa, the world's most recognizable portrait, and marvel at the exquisite craftsmanship of the Venus de Milo, a symbol of feminine beauty.Traverse the vast galleries, where thousands of paintings, sculptures, and artifacts await your discovery.Elevate your experience with pre-purchased online tickets, saving you valuable time and money.Bypass the long lines and skip directly to the museum, where you'll enter the Louvre Pyramid, a contemporary architectural marvel."
    ],
    "whatsIncluded": [
      "See world famous arts like the Mona Lisa and the Venus De Milo.",
      "Explore this world famous landmark from the inside with it's exhibited 40,000 objects.",
      "Skip-The-Line at the cashiers, where you can save 1-2 hours.",
      "Full day ticket to Louvre Museum"
    ],
    "informations": [],
    "additionalInfo": [
      "Not wheelchair accessible",
      "Not Stroller accessible",
      "Service animals not allowed",
      "Near public transportation",
      "Most travelers can participate",
      "In case of last minute booking, please expect your ticket in 15-30 minutes."
    ],
    "bookingProcess": "An automatic confirmation e-mail will be sent after the booking automaticly --- THIS IS NOT THE ENTRY TICKET!\n\nIf you don’t see our email in your inbox, please check your Spam or Junk folder as well.\n\nThe Entry Tickets we will send in work hours 8:00 BETWEEN 22:00\n\nIN PARIS TIME(Europe)\n\nLast minute Process(if you buy immediately in 3-Hours before the start of the tour) : This time we will send the tickets directly after the confirmation E-mail. We'll do our best to make sure you get your ticket as soon as you buy in lastmunte!",
    "location": {
      "name": "Louvre Museum",
      "lines": [],
      "mapsUrl": "https://www.google.com/maps?q=48.86101631231847%2C2.335645453874458"
    },
    "cancellationPolicy": [
      "You can cancel up to 24 hours in advance of the experience for a full refund.",
      "For a full refund, you must cancel at least 24 hours before the experience's start time.",
      "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
      "Any changes made less than 24 hours before the experience's start time will not be accepted.",
      "Cut-off times are based on the experience's local time.",
      "This experience requires good weather. If it's canceled due to bad weather, you'll be offered a different date or a full refund."
    ],
    "badge": {
      "label": "Highly Recommended",
      "variant": "blue"
    },
    "rating": 4.5,
    "reviewCount": 1981,
    "features": [
      "Free Cancellation",
      "Instant Confirm",
      "Mobile Ticket",
      "Full Day Ticket"
    ],
    "reviewSummary": {
      "rating": 4.5,
      "reviewCount": 1981,
      "stars": {
        "1": 28,
        "2": 35,
        "3": 129,
        "4": 462,
        "5": 1327
      }
    },
    "canonicalPath": "/the-eiffel-tower/visit-the-louvre-museum",
    "sourceUrl": "https://paristicketshop.com/the-eiffel-tower/visit-the-louvre-museum"
  }
} as Record<string, ProductDetail>;

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetailsBySlug[slug];
}

export function listProductSlugs(): string[] {
  return Object.keys(productDetailsBySlug);
}
