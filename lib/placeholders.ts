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

/** Section 4 — Featured Tastings carousel */
export const featuredTastings: {
  name: string;
  duration: string;
  note: string;
  image: PlaceholderPhoto;
}[] = [
  {
    name: "Classic Flight",
    duration: "45 min",
    note: "Five single-varietal oils, poured and led side by side.",
    image: {
      src: uns("1652282556241-0ce13285d00f", 1200, 1500),
      alt: "Olive oil poured over a tasting spoon",
    },
  },
  {
    name: "Estate Reserve Tasting",
    duration: "75 min",
    note: "Limited-harvest pressings from a single grove.",
    image: {
      src: uns("1707827914998-0d56ee13c161", 1200, 1500),
      alt: "Dark glass olive oil bottle beside a single olive",
    },
  },
  {
    name: "Olive Oil & Cheese Pairing",
    duration: "90 min",
    note: "Six oils matched to aged and fresh cheeses.",
    image: {
      src: uns("1598306442928-4d90f32c6866", 1200, 1500),
      alt: "Cheese board and tasting glasses set outdoors",
    },
  },
  {
    name: "Bread, Salt & Oil",
    duration: "60 min",
    note: "The oldest tasting there is, done properly.",
    image: {
      src: uns("1666475877178-9cf341547fc1", 1200, 1500),
      alt: "Rustic bread with olives and oil on a dark board",
    },
  },
  {
    name: "Private Group Tasting",
    duration: "2 hrs",
    note: "Your table, your pace, up to fourteen guests.",
    image: {
      src: uns("1527756898251-203e9ce0d9c4", 1200, 1500),
      alt: "Long rustic table set with olive oil and glassware by a window",
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
