/**
 * PLACEHOLDER PHOTOGRAPHY REGISTRY
 * --------------------------------
 * Every image on the home page is sourced from here so the whole set can be
 * swapped for real client photography in one place. Each rendered <img> also
 * carries `data-placeholder="true"` (see components/PlaceholderImage.tsx), so
 * placeholders can be found in the DOM as well as in the source.
 *
 * Networking table cards use client photography from the Vercel Blob store
 * (see `clientPhoto` in lib/atmosphere.ts). Remaining Unsplash entries are
 * still placeholders and should be swapped before launch.
 */

import { clientPhoto } from "@/lib/atmosphere";

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
 * Section 4 — Featured Tastings coverflow, now the three tiered experiences.
 *
 * Client-approved tier names, copy, pricing and package brief. Each tier builds
 * on the one below it, so `includesLabel` carries the "everything in Tier N,
 * plus" framing and `includes` lists only what that tier adds.
 *
 * `brief` is the condensed hover summary: a couple of sentences plus short
 * scannable lines, not a reproduction of the full comparison table. `note` is
 * optional and the layout has room for another line or two beside it.
 *
 * The Culinary Curator Pairings (`culinaryCuratorPairings`) render inside the
 * "+" brief on every tier; Tier 3 is the tier that includes all three. Shared
 * inclusions live in `tastingSharedInclusions` and render both as the band
 * under the carousel and inside the expanded detail view.
 */
export const tastingSharedInclusions: string[] = [
  "Curated dipping breads and artisanal breadsticks.",
  "Mediterranean olives at each place setting.",
  "Two Signature Olive Oil Pairings.",
  "Client-provided enhancements: alcoholic beverages, small bites, or food options.",
  "Pairing and menu guidance from our Curated Team.",
  "Travel beyond 100 miles from our offices is billed to the client.",
];

/**
 * Chef-crafted pairings shown in the "+" brief on each tier card. Tier 3
 * includes all three; the lower tiers show them as what the journey builds to.
 */
export const culinaryCuratorPairings: { name: string; description: string }[] = [
  {
    name: "Citrus & Herb Awakening",
    description:
      "Bright, aromatic, and refreshing — lemon zest, fresh herbs, and a clean finish that wakes up the palate.",
  },
  {
    name: "Savory Mediterranean Comfort",
    description:
      "Warm, savory notes of sun-kissed tomato, roasted garlic, and coastal herbs that highlight olive oil's depth and silkiness.",
  },
  {
    name: "The Culinary Curator's Sweet Drizzle",
    description:
      "A playful blend of Signature OO with honey, stone fruit, or floral sweetness — olive oil elevating both savory and sweet.",
  },
];

export const featuredTastings: {
  name: string;
  subtitle: string;
  role: string;
  description: string;
  /** Tier badge shown where the duration pill used to sit. */
  tier: string;
  price: {
    base: string;
    includes: string;
    additional: string;
  };
  /** Short audience line under the pricing block — card + expanded. */
  highlight: string;
  /** Heading over the tier's own inclusions, e.g. "Includes everything in Tier 1, plus". */
  includesLabel: string;
  includes: string[];
  brief: {
    summary: string;
    lead: string;
    includes: string;
    idealFor: string;
    addOns?: string;
    note?: string;
  };
  image: PlaceholderPhoto;
}[] = [
  {
    name: "The Signature OO Tasting",
    subtitle: "Signature OO, storytelling, and two curated pairings",
    role: "Curated Team",
    description:
      "A guided olive oil journey featuring our Signature OO, Mediterranean-bright storytelling, and two curated pairings that introduce guests to a new way of tasting and experiencing flavor. Perfect for intimate groups, executive gatherings, and hospitality-forward activations.",
    tier: "Tier 1",
    price: {
      base: "$5,000",
      includes: "up to 30 guests",
      additional: "+$40 per guest after 30",
    },
    highlight: "Ideal for 15–30 guests",
    includesLabel: "Includes",
    includes: [
      "All “Every Tasting Includes” elements",
      "Two Signature Olive Oil Pairings",
      "Curated Team pairing guidance",
      "Ideal for 15–30 guests",
    ],
    brief: {
      summary:
        "A guided olive oil journey featuring our Signature OO, Mediterranean-bright storytelling, and two curated pairings.",
      lead: "Curated Team",
      includes:
        "Signature OO, guided storytelling, two curated pairings",
      idealFor: "Intimate groups, executive gatherings, hospitality activations",
    },
    image: {
      src: uns("1653611540493-b3a896319fbf", 1200, 1600),
      alt: "Mediterranean small plates and mezze spread laid across a table",
    },
  },
  {
    name: "The Mediterranean Flavor Experience",
    subtitle: "Elevated storytelling, upgraded service, deeper engagement",
    role: "Curated Team",
    description:
      "A more expansive tasting experience featuring our Signature OO, elevated storytelling, upgraded service elements, and enhanced guest engagement. Designed for mid-size groups, corporate events, and culinary-curious audiences.",
    tier: "Tier 2",
    price: {
      base: "$7,500",
      includes: "up to 50 guests",
      additional: "+$45 per guest after 50",
    },
    highlight: "Designed for mid-size groups and corporate events",
    includesLabel: "Includes everything in Tier 1, plus",
    includes: [
      "Upgraded bread & olive service (premium selections, seasonal additions)",
      "Enhanced table styling with Mediterranean-bright accents",
      "A dedicated Curated Team member for pairing guidance and guest engagement",
      "Priority scheduling for event day logistics",
    ],
    brief: {
      summary:
        "An expansive tasting with elevated storytelling, upgraded service elements, and enhanced guest engagement.",
      lead: "Dedicated Curated Team member",
      includes:
        "Upgraded bread & olive service, enhanced table styling, priority scheduling",
      idealFor: "Mid-size groups, corporate events, culinary-curious audiences",
    },
    image: {
      src: uns("1649825319037-f30ea5b611c7", 1200, 1600),
      alt: "Fresh tomato and herb salad served in a bowl with a wooden spoon",
    },
  },
  {
    name: "The Full Curated Culinary Journey",
    subtitle: "Our most immersive, sensory-rich olive oil experience",
    role: "Curated Team",
    description:
      "Our most immersive offering — a hospitality-driven, sensory-rich olive oil experience featuring Signature OO, Mediterranean storytelling, and the full suite of Culinary Curator Pairings. Crafted for large groups, luxury activations, brand events, and high-touch culinary experiences.",
    tier: "Tier 3",
    price: {
      base: "$12,000",
      includes: "up to 75 guests",
      additional: "+$50 per guest after 75",
    },
    highlight: "Crafted for large groups, luxury activations and brand events",
    includesLabel: "Includes everything in Tier 2, plus",
    includes: [
      "All 3 Culinary Curator Pairings included",
      "Elevated tablescape design inspired by Mediterranean coastal markets",
      "A three-member Curated Team for guest engagement, pairing guidance, and flow management",
      "Premium small-bite coordination with client’s catering team",
      "Custom flavor cards for each guest",
      "Optional branded takeaways (olive oil minis, tasting cards, etc.)",
    ],
    brief: {
      summary:
        "A hospitality-driven, sensory-rich experience with Signature OO, Mediterranean storytelling, and the full suite of Culinary Curator Pairings.",
      lead: "Three-member Curated Team",
      includes:
        "All 3 Culinary Curator Pairings, elevated tablescape, custom flavor cards",
      idealFor: "Large groups, luxury activations, brand events",
      addOns: "Branded takeaways — olive oil minis, tasting cards and more",
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
 *
 * `kind` is the experience class (the eyebrow in the expanded panel) and `tag`
 * the audience descriptor that sits under the card title. `includesFull` and
 * `enhancements` are lists rather than one run-on line: each tier builds on the
 * one below it, and the client-provided enhancements are a separate promise —
 * things the client supplies, not things the package covers.
 */
export const networkingExperiences: {
  name: string;
  kind: string;
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
  includesFull: string[];
  /** Client-provided, so listed apart from what the package includes. */
  enhancements: string[];
  image: PlaceholderPhoto;
}[] = [
  {
    name: "The Grove Social Table",
    kind: "Enhanced Networking Experience",
    tag: "Welcome Receptions & Mixers",
    price: "$35 per guest",
    brief: {
      summary:
        "A warm, inviting networking table inspired by the olive grove — perfect for receptions, mixers, and events where guests flow, mingle, and connect.",
      lead: "Culinary Curator",
      includes:
        "Olive-branch greenery, warm wood styling, Mediterranean linens, ambient candles, tasting cards",
      idealFor:
        "Welcome receptions, casual mixers, intimate networking moments",
    },
    includesFull: [
      "Olive-branch greenery",
      "Warm wood styling",
      "Mediterranean linens",
      "Ambient candles",
      "Tasting cards",
    ],
    enhancements: [
      "Small bites or food options",
      "Alcoholic beverages",
      "Optional Signature OO Pairings",
      "Optional Culinary Curator Pairings",
    ],
    image: {
      src: clientPhoto("a92a6791"),
      alt: "Olive oil tasting menu framed beside a candle and olive greenery",
    },
  },
  {
    name: "The Mediterranean Market Mixer",
    kind: "Immersive Networking Experience",
    tag: "European Market-Inspired",
    price: "$45 per guest",
    brief: {
      summary:
        "A richer, more immersive networking experience inspired by European coastal markets — ideal for elevated receptions, lifestyle activations, and wellness-forward gatherings.",
      lead: "Culinary Curator or Wellness Guide",
      includes:
        "Everything in the Grove Social Table, market-style props, elevated ceramic bowls, branded networking cards",
      idealFor:
        "Lifestyle events, wellness activations, elevated receptions, culinary-curious audiences",
    },
    includesFull: [
      "Everything in the Grove Social Table",
      "Market-style props (crates, herbs, lemons, figs)",
      "Elevated ceramic bowls",
      "Seasonal Mediterranean accents",
      "Branded networking cards",
      "Optional wellness mini-session",
    ],
    enhancements: [
      "Small bites or food options",
      "Alcoholic beverages",
      "Optional Culinary Curator Pairings",
    ],
    image: {
      src: clientPhoto("a92a6981"),
      alt: "Mediterranean Market Mixer networking table with market-style styling",
    },
  },
  {
    name: "The Golden Press VIP Networking Lounge",
    kind: "VIP & Luxury Activations",
    tag: "Premium Networking Experience",
    price: "$125 per guest",
    brief: {
      summary:
        "Your luxury-forward networking activation — a premium, visually stunning, Mediterranean-bright lounge designed for VIP guests, incentive groups, and high-touch hospitality moments.",
      lead: "Master Grove Curator",
      includes:
        "Everything in the Mediterranean Market Mixer, premium tablescape, olive green-accent vessels, elevated florals, custom branded materials",
      idealFor: "VIP receptions, incentive groups, luxury resort activations",
    },
    includesFull: [
      "Everything in the Mediterranean Market Mixer",
      "Premium tablescape styling",
      "Olive green-accent tasting vessels",
      "Elevated floral + olive branch arrangements",
      "Mediterranean lanterns + luxury candles",
      "Custom branded menu or networking cards",
      "Miniature olive oil bottles",
    ],
    enhancements: [
      "Small bites or food options",
      "Alcoholic beverages",
      "Optional Signature OO Pairings",
      "Optional Culinary Curator Pairings",
    ],
    image: {
      src: clientPhoto("a92a6879"),
      alt: "Golden Press VIP networking lounge with elevated tablescape styling",
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
      { label: "Mediterranean grazing board", price: "$18–$28/guest" },
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

/** Section 6 — Guest testimonials. Client-supplied; attribution is name only. */
export const testimonials: { quote: string; name: string }[] = [
  {
    quote:
      "I thought I knew olive oil. I didn’t. This experience flipped my palate, my expectations, and honestly… my whole relationship with flavor.",
    name: "Holly Sauer",
  },
  {
    quote:
      "Our team hasn’t stopped talking about it. It was the perfect blend of education, connection, and Mediterranean magic.",
    name: "Dennis Meaney",
  },
  {
    quote:
      "I never realized olive oil could be part of a wellness routine. This experience opened my eyes — and my palate.",
    name: "Matthew Vella",
  },
];
