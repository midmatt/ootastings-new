/**
 * PLACEHOLDER PHOTOGRAPHY REGISTRY
 * --------------------------------
 * Every image on the home page is sourced from here so the whole set can be
 * swapped for real client photography in one place. Each rendered <img> also
 * carries `data-placeholder="true"` (see components/PlaceholderImage.tsx), so
 * placeholders can be found in the DOM as well as in the source.
 *
 * TODO: client photography needed — replace all entries below before launch.
 */

const uns = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type PlaceholderPhoto = {
  src: string;
  alt: string;
};

export const heroImage: PlaceholderPhoto = {
  src: uns("1629274128491-36edfdc0d8cb", 2200, 1400),
  alt: "Golden olive oil in a small glass dish on a wood round, surrounded by olive branches",
};

/** Section 4 — Featured Tastings coverflow. Client-approved names, copy and pricing. */
export const featuredTastings: {
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: PlaceholderPhoto;
}[] = [
  {
    name: "Pressed & Paired",
    subtitle: "The Olive Grove Tasting Menu",
    description:
      "Your entry-level tasting — elegant, approachable, and perfect for corporate groups, resorts, and private events. A guided olive oil tasting with three chef-crafted pairings, premium Treurer EVOO, and culinary storytelling.",
    duration: "45–60 min",
    price: "$85–$125 per guest",
    image: {
      src: uns("1653611540493-b3a896319fbf", 1200, 1600),
      alt: "Mediterranean small plates and mezze spread laid across a table",
    },
  },
  {
    name: "Taste & Thrive",
    subtitle: "The Olive Oil Wellness Journey",
    description:
      "Your wellness-forward tasting — culinary meets lifestyle. Includes everything in Pressed & Paired plus a certified health coach session, EVOO health benefits education, and Mediterranean lifestyle guidance. Perfect for retreats, resorts, and corporate wellness programs.",
    duration: "60–75 min",
    price: "$145–$185 per guest",
    image: {
      src: uns("1649825319037-f30ea5b611c7", 1200, 1600),
      alt: "Fresh tomato and herb salad served in a bowl with a wooden spoon",
    },
  },
  {
    name: "The Chef's Grove Table",
    subtitle: "Premium Mediterranean Pairing Experience",
    description:
      "Your luxury tier — a premium, chef-driven Mediterranean tasting with an elevated multi-course menu, premium EVOO flight, optional wine or mocktail pairings, and signature hospitality touches. Designed for high-end groups and resort VIP activations.",
    duration: "75–90 min",
    price: "$225–$325 per guest",
    image: {
      src: uns("1676471926534-d5c9771909fa", 1200, 1600),
      alt: "Chef finishing a plated course at a fine dining pass",
    },
  },
];

/** Section 5 — Tasting Experience grid */
export const experiences: {
  title: string;
  meta: string;
  image: PlaceholderPhoto;
}[] = [
  {
    title: "Grove Walk & Tasting",
    meta: "Seasonal · 2 hrs",
    image: {
      src: uns("1601238884151-88a7092027bb", 1200, 900),
      alt: "Row of ancient olive trees in a grove",
    },
  },
  {
    title: "Harvest Table",
    meta: "October–December",
    image: {
      src: uns("1634657443172-efbae44fd04b", 1200, 900),
      alt: "Freshly picked green and black olives in a crate",
    },
  },
  {
    title: "Oil & Cheese Pairing",
    meta: "Guided · 90 min",
    image: {
      src: uns("1517093602195-b40af9688b46", 1200, 900),
      alt: "Cheese and fruit tasting board from above",
    },
  },
  {
    title: "The Cellar Collection",
    meta: "Reserve · 75 min",
    image: {
      src: uns("1559725861-2e876132b202", 1200, 900),
      alt: "Long tasting table set beneath shelves of bottles",
    },
  },
  {
    title: "Bread & Board",
    meta: "Walk-in · 45 min",
    image: {
      src: uns("1666475877607-ec1cec593b19", 1200, 900),
      alt: "Sliced bread, olives and a knife on a wooden board",
    },
  },
  {
    title: "Sunset Pour",
    meta: "Fri & Sat · 60 min",
    image: {
      src: uns("1609763951640-c0d7bd98b257", 1200, 900),
      alt: "Olive branch catching low golden sunset light",
    },
  },
];

/** Section 6 — Testimonial portrait */
export const testimonialPortrait: PlaceholderPhoto = {
  src: uns("1592621385645-e41659e8aabe", 400, 400),
  alt: "Portrait of a smiling tasting guest",
};

/** Section 7 — Atmosphere collage */
export const atmosphere: PlaceholderPhoto[] = [
  {
    src: uns("1609238000857-303bf54099b1", 1200, 1500),
    alt: "Warm-lit tasting room with a round table and timber racking",
  },
  {
    src: uns("1618100790047-3da47dcd5727", 1400, 950),
    alt: "Late sun coming through the branches of an olive grove",
  },
  {
    src: uns("1560274764-b90dcadb2dfa", 1000, 1300),
    alt: "Wooden table set with bread, a dish of olive oil and a drink",
  },
  {
    src: uns("1673213936348-3ad0a1c4270c", 1000, 1000),
    alt: "Tasting board and bottle on a table beside a window",
  },
  {
    src: uns("1636089651344-ad2ce3fc7bda", 1200, 950),
    alt: "Shelves of bottles and produce in a warm-lit tasting room",
  },
];

/** Section 8 — Instagram strip */
export const instagramTiles: PlaceholderPhoto[] = [
  {
    src: uns("1698775942613-3e9fc114b2a1", 700, 700),
    alt: "Bright green olives packed together",
  },
  {
    src: uns("1768689033119-c3ac1e437d20", 700, 700),
    alt: "Golden olive oil drizzling from a spout",
  },
  {
    src: uns("1652282565092-874e3a9c67b1", 700, 700),
    alt: "Olives resting in hand-turned wooden bowls",
  },
  {
    src: uns("1582536446725-5ad9e6ef0535", 700, 700),
    alt: "Bread, olives and a bottle of oil photographed from above",
  },
  {
    src: uns("1672940711883-754b2fdefa1c", 700, 700),
    alt: "A lone olive tree beside old stone ruins",
  },
  {
    src: uns("1591122523233-22037c1dec9f", 700, 700),
    alt: "Olives ripening on the branch",
  },
];
