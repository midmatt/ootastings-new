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

/**
 * Section 4 — Featured Tastings coverflow.
 *
 * Client-approved names, copy, pricing and package brief. Role titles are per
 * package (Culinary Curator / Wellness Coach / Master Grove Curator) and replace
 * generic "chef" wording in the descriptive copy.
 *
 * `brief` is the condensed hover summary: a couple of sentences plus short
 * scannable lines, not a reproduction of the full comparison table. `note` is
 * optional and the layout has room for another line or two beside it.
 *
 * Culinary pairings are optional add-ons (priced per guest) — not included in
 * the booking fee. Shared tasting inclusions live in `tastingSharedInclusions`
 * and render only in the expanded detail view.
 */
export const tastingSharedInclusions: string[] = [
  "A selection of dipping breads and artisanal breadsticks, thoughtfully chosen to complement the tasting.",
  "A small serving of Mediterranean olives at each place setting.",
  "Alcoholic beverages are provided by the client — our Curated Team is happy to assist with pairing recommendations.",
  "Travel outside of Florida is billed to the client.",
];

export const featuredTastings: {
  name: string;
  subtitle: string;
  role: string;
  description: string;
  duration: string;
  price: {
    base: string;
    includes: string;
    additional: string;
    /** Optional culinary pairings add-on — card + expanded only, not the condensed popup. */
    optionalPairings: string;
  };
  brief: {
    summary: string;
    lead: string;
    includes: string;
    idealFor: string;
    addOns: string;
    note?: string;
  };
  image: PlaceholderPhoto;
}[] = [
  {
    name: "Pressed & Paired",
    subtitle: "The Olive Grove Tasting Menu",
    role: "Culinary Curator",
    description:
      "A guided olive oil journey featuring premium Treurer EVOO, Mediterranean-bright storytelling, and three Culinary Curator-crafted pairings (available as an add-on) that introduce guests to a new way of tasting and experiencing flavor.",
    duration: "45–60 min",
    price: {
      base: "$5,000",
      includes: "up to 30 guests",
      additional: "+$125 per guest after",
      optionalPairings:
        "Optional: 3 Culinary Pairings — $82.50/guest (selected by the Curated Team)",
    },
    brief: {
      summary:
        "A guided olive oil journey with premium Treurer EVOO and Mediterranean-bright storytelling — Culinary Curator pairings available as an add-on.",
      lead: "Culinary Curator",
      includes: "Premium Treurer EVOO, guided tasting, Mediterranean storytelling",
      idealFor: "Corporate groups, private events, resorts",
      addOns: "3 Culinary Pairings, wine pairing, mocktails, gift bottles",
    },
    image: {
      src: uns("1653611540493-b3a896319fbf", 1200, 1600),
      alt: "Mediterranean small plates and mezze spread laid across a table",
    },
  },
  {
    name: "Taste & Thrive",
    subtitle: "The Olive Oil Wellness Journey",
    role: "Wellness Coach",
    description:
      "A wellness-forward tasting designed for retreats, boutique hotels, and groups seeking a deeper connection to Mediterranean living. Led by our Wellness Coach, this experience blends premium Treurer EVOO, curated pairings, and approachable education on anti-inflammatory benefits, mindful tasting, and the Mediterranean lifestyle. It's flavorful, intentional, and crafted to leave guests feeling nourished, inspired, and connected.",
    duration: "60–75 min",
    price: {
      base: "$6,000",
      includes: "includes up to 30 guests",
      additional: "+$185 per additional guest",
      optionalPairings:
        "Optional: 3 Culinary Pairings — $82.50/guest (selected by the Curated Team)",
    },
    brief: {
      summary:
        "A wellness-forward tasting led by our Wellness Coach — premium Treurer EVOO, mindful tasting, and Mediterranean lifestyle education.",
      lead: "Wellness Coach",
      includes:
        "Premium Treurer EVOO, anti-inflammatory education, mindful tasting guidance",
      idealFor: "Retreats, boutique hotels, wellness programs",
      addOns: "3 Culinary Pairings, wellness glow shots, 1:1 sessions",
    },
    image: {
      src: uns("1649825319037-f30ea5b611c7", 1200, 1600),
      alt: "Fresh tomato and herb salad served in a bowl with a wooden spoon",
    },
  },
  {
    name: "The Grove Master Experience",
    subtitle: "Premium Mediterranean Pairing Experience",
    role: "Master Grove Curator & Wellness Coach",
    description:
      "Your top-tier tasting — immersive, luxurious, and designed for VIP groups, incentive programs, and high-end private events. Hosted by your Master Grove Curator & Wellness Coach, this experience features a premium EVOO flight, elevated Mediterranean pairings, luxury tablescape styling, and storytelling that transports guests straight into the grove. It's dramatic, sensory, and crafted to redefine what a tasting can be.",
    duration: "75–90 min",
    price: {
      base: "$7,500",
      includes: "includes up to 30 guests",
      additional: "+$325 per additional guest",
      optionalPairings:
        "Optional: 4 Culinary Pairings — $132.50/guest (selected by the Curated Team)",
    },
    brief: {
      summary:
        "Your top-tier tasting — premium EVOO flight, luxury tablescape, and grove storytelling hosted by your Master Grove Curator & Wellness Coach.",
      lead: "Master Grove Curator & Wellness Coach",
      includes:
        "Premium EVOO flight, luxury tablescape styling, immersive grove storytelling",
      idealFor: "VIP groups, incentive programs, high-end private events",
      addOns: "4 Culinary Pairings, wine pairings, premium gifts, meet & greet",
    },
    image: {
      src: uns("1676471926534-d5c9771909fa", 1200, 1600),
      alt: "Master Grove Curator finishing a plated course at a fine dining pass",
    },
  },
];

/**
 * Section 5 — Enhanced Networking Experiences.
 * Client-approved packages; no duration was supplied for these, so the cards
 * carry no duration badge rather than inventing one.
 */
export const networkingExperiences: {
  name: string;
  tag: string;
  price: string;
  brief: {
    summary: string;
    lead: string;
    /** Trimmed to the differentiating items — the hover brief must not scroll. */
    includes: string;
    idealFor: string;
  };
  /** The complete list, shown only in the expanded detail view. */
  includesFull: string;
  image: PlaceholderPhoto;
}[] = [
  {
    name: "The Grove Social Table",
    tag: "Welcome Receptions & Mixers",
    price: "$85 per guest",
    brief: {
      summary:
        "A warm, inviting networking table inspired by the olive grove.",
      lead: "Culinary Curator",
      includes:
        "Olive branch greenery, warm wood styling, Mediterranean linens, ambient candles",
      idealFor:
        "Welcome receptions, corporate mixers, resort lobby activations",
    },
    includesFull:
      "Olive branch greenery + warm wood styling, Mediterranean linens, ambient candles, light tasting bites (optional add-on)",
    image: {
      src: uns("1619143709283-0397c8fc8abc", 1200, 1500),
      alt: "Rustic table set with olive greenery, linen napkins and glassware",
    },
  },
  {
    name: "The Mediterranean Market Mixer",
    tag: "Retreats & Boutique Hotels",
    price: "$125 per guest",
    brief: {
      summary:
        "A richer, immersive networking experience inspired by European markets.",
      lead: "Culinary Curator or Wellness Guide",
      includes:
        "Everything in Grove Social Table, market-style props, elevated ceramic bowls, branded networking cards",
      idealFor:
        "Retreats, boutique hotels, wellness groups, conference lounges",
    },
    includesFull:
      "Everything in Grove Social Table, market-style props (crates, herbs, lemons, figs), elevated ceramic bowls, seasonal Mediterranean accents, branded networking cards, optional wellness mini-session",
    image: {
      src: uns("1705500473449-539f7ee4e7bf", 1200, 1500),
      alt: "Mediterranean market stall stacked with citrus, figs and produce crates",
    },
  },
  {
    name: "The Golden Press VIP Networking Lounge",
    tag: "VIP & Luxury Activations",
    price: "$225 per guest",
    brief: {
      summary: "Your premium, luxury-forward networking activation.",
      lead: "Master Grove Curator",
      includes:
        "Premium tablescape, gold-accent vessels, elevated florals, custom branded materials",
      idealFor: "VIP receptions, incentive groups, luxury resort activations",
    },
    includesFull:
      "Everything in Market Mixer, premium tablescape styling, gold-accent tasting vessels, elevated floral + olive branch arrangements, Mediterranean lanterns + luxury candles, custom branded menu or networking cards, optional musician/photographer/premium EVOO gifts",
    image: {
      src: uns("1608538242779-113f7b19baa1", 1200, 1500),
      alt: "Long luxury tablescape lit by candles with florals and gold accents",
    },
  },
];

/** Section 5b — Optional Enhancements reference list. */
export const optionalEnhancements: {
  group: string;
  items: { label: string; price: string; note?: string }[];
}[] = [
  {
    group: "Culinary Enhancements",
    items: [
      {
        label: "Mediterranean grazing board",
        price: "$18–$28/guest",
        note: "Included in Packages 2 & 3",
      },
      { label: "Signature mocktail pairing", price: "$30/guest" },
      { label: "Wine pairing upgrade", price: "$55/guest" },
      { label: "Dessert pairing", price: "$12–$18/guest" },
    ],
  },
  {
    group: "Wellness Enhancements",
    items: [
      { label: "EVOO Glow Shot", price: "$8–$12/guest" },
      { label: "Health coach mini sessions", price: "$95 each" },
      { label: "Mediterranean lifestyle workshop", price: "$350–$550" },
      { label: "Breathwork moment", price: "$250–$400" },
    ],
  },
  {
    group: "Presentation Enhancements",
    items: [
      { label: "Premium floral arrangements", price: "$250–$650" },
      { label: "Luxury candle package", price: "$150–$350" },
      { label: "Olive grove centerpiece", price: "$175–$300" },
      { label: "Branded networking cards", price: "$5/guest" },
      { label: "Custom menu cards", price: "$4/guest" },
    ],
  },
  {
    group: "Experience Enhancements",
    items: [
      { label: "Mediterranean guitarist/violinist", price: "$1,400" },
      { label: "Photographer", price: "$1,250" },
      { label: "Guest gift bottles", price: "$45 each" },
    ],
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
