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
 * package (Culinary Curator / Wellness Guide / Experience Curator) and replace
 * generic "chef" wording in the descriptive copy.
 *
 * `brief` is the condensed hover summary: a couple of sentences plus short
 * scannable lines, not a reproduction of the full comparison table. `note` is
 * optional and the layout has room for another line or two beside it.
 */
export const featuredTastings: {
  name: string;
  subtitle: string;
  role: string;
  description: string;
  duration: string;
  price: { base: string; includes: string; additional: string };
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
      "Your entry-level tasting — elegant, approachable, and perfect for corporate groups, resorts, and private events. A guided olive oil tasting with three Culinary Curator-crafted pairings, premium Treurer EVOO, and culinary storytelling.",
    duration: "45–60 min",
    price: {
      base: "$5,000",
      includes: "up to 30 guests",
      additional: "+$125 per guest after",
    },
    brief: {
      summary:
        "A Culinary Curator-guided olive oil tasting with curated pairings, told through the origins of the oil and the story of the grove.",
      lead: "Culinary Curator",
      includes: "Three pairings, premium Treurer EVOO, standard tasting setup",
      idealFor: "Corporate groups, private events, resorts",
      addOns: "Wine pairing, mocktails, gift bottles",
    },
    image: {
      src: uns("1653611540493-b3a896319fbf", 1200, 1600),
      alt: "Mediterranean small plates and mezze spread laid across a table",
    },
  },
  {
    name: "Taste & Thrive",
    subtitle: "The Olive Oil Wellness Journey",
    role: "Wellness Guide",
    description:
      "Your wellness-forward tasting — culinary meets lifestyle. Includes everything in Pressed & Paired plus a certified Wellness Guide session, EVOO health benefits education, and Mediterranean lifestyle guidance. Perfect for retreats, resorts, and corporate wellness programs.",
    duration: "60–75 min",
    price: {
      base: "$5,500",
      includes: "up to 20 guests",
      additional: "+$185 per guest after",
    },
    brief: {
      summary:
        "Culinary meets lifestyle: a wellness-forward tasting run with a certified Wellness Guide, pairing EVOO education with Mediterranean lifestyle guidance.",
      lead: "Wellness Guide + Culinary Curator",
      includes:
        "Three pairings, premium Treurer EVOO, health coach session, wellness-forward setup",
      idealFor: "Retreats, wellness programs, boutique hotels",
      addOns: "Wellness glow shots, 1:1 sessions",
    },
    image: {
      src: uns("1649825319037-f30ea5b611c7", 1200, 1600),
      alt: "Fresh tomato and herb salad served in a bowl with a wooden spoon",
    },
  },
  {
    name: "Master Grove Curator",
    subtitle: "Premium Mediterranean Pairing Experience",
    role: "Experience Curator",
    description:
      "Your luxury tier — a premium, Experience Curator–driven Mediterranean tasting with an elevated multi-course menu, premium EVOO flight, optional wine or mocktail pairings, and signature hospitality touches. Designed for high-end groups and resort VIP activations.",
    duration: "75–90 min",
    price: {
      base: "$6,500",
      includes: "up to 30 guests",
      additional: "+$325 per guest after",
    },
    brief: {
      summary:
        "An elevated, multi-course Mediterranean tasting led by our Experience Curator as a guided culinary journey.",
      lead: "Experience Curator",
      includes:
        "Expanded premium pairings, premium EVOO flight across multiple varietals, luxury tablescape",
      idealFor: "VIP groups, incentive programs, luxury events",
      addOns: "Wine pairings, premium gifts, meet & greet",
      note: "Wellness component available as an add-on.",
    },
    image: {
      src: uns("1676471926534-d5c9771909fa", 1200, 1600),
      alt: "Experience Curator finishing a plated course at a fine dining pass",
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
    includes: string;
    idealFor: string;
  };
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
        "Olive branch greenery + warm wood styling, Mediterranean linens, ambient candles, light tasting bites (optional add-on)",
      idealFor:
        "Welcome receptions, corporate mixers, resort lobby activations",
    },
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
        "Everything in Grove Social Table, market-style props (crates, herbs, lemons, figs), elevated ceramic bowls, seasonal Mediterranean accents, branded networking cards, optional wellness mini-session",
      idealFor:
        "Retreats, boutique hotels, wellness groups, conference lounges",
    },
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
        "Everything in Market Mixer, premium tablescape styling, gold-accent tasting vessels, elevated floral + olive branch arrangements, Mediterranean lanterns + luxury candles, custom branded menu or networking cards, optional musician/photographer/premium EVOO gifts",
      idealFor: "VIP receptions, incentive groups, luxury resort activations",
    },
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
