# ootastings.com Redesign — Engineering Spec
**Reference site (visual/UX target):** maplestreetbiscuits.com
**Client:** OOT (Olive Oil Tastings)
**Prepared for:** Claude Code / Cursor implementation agents
**Status:** Ready for build

---

## 0. How to Use This Document

This is a spec, not a design file — treat it like a ticket written by an engineering manager, not a Figma export. The reference site (maplestreetbiscuits.com) was fetched and analyzed for **information architecture, layout patterns, and interaction patterns**, not pixel-exact hex codes or font files (those weren't extractable from a static content fetch). Before writing CSS, the implementing agent should:

1. Open maplestreetbiscuits.com in a real browser (or use a browser tool / devtools) and inspect: computed styles on the nav, hero, and section headers; the actual font-family stack; exact hex values for the background/accent colors; spacing scale (padding/margin values in px or rem).
2. Treat everything in **Section 4 (Visual System)** below as a *documented starting point*, then correct any value against what devtools actually shows.
3. Do not scrape, copy, or reuse any Maple Street Biscuit Co. copy, imagery, or trademarked assets. This is a **style/pattern reference only** — layout rhythm, component types, and interaction language — not a content or asset source. All copy, photography, and iconography for ootastings.com must be original or client-supplied.

---

## 1. Project Summary

Rebuild ootastings.com as a modern, bold, single-brand marketing site for an olive oil tasting business, using maplestreetbiscuits.com as the structural and stylistic reference (bold hero, big typography, playful-but-premium tone, photo-driven storytelling, sticky nav with prominent CTA).

### Hard Requirements (Client-Mandated)
- ❌ **No C2Eventz logo, branding, or references anywhere on the site** (header, footer, favicon, meta tags, image alt text, source code comments — nowhere). This is a strict compliance item, not a style preference. If any existing template/boilerplate carries a C2Eventz mark, it must be stripped before launch.
- ✅ Site must read as a **standalone olive oil tasting brand** — not an events company, not a multi-purpose venue site. Every section should reinforce "olive oil tasting experience," not generic event hosting.
- ✅ Visual language should mirror Maple Street Biscuit Co.'s energy: **bold hero imagery, oversized display type, a confident single accent color, rounded/organic UI elements, testimonial section, Instagram-style photo strip, sticky header with a prominent booking/order CTA.**

### Out of Scope (unless client confirms later)
- E-commerce / online store for shipping oil bottles (flagged as a possible phase 2 — build the component architecture to support it, but don't build checkout now).
- Multi-location "Find a Location" logic (Maple Street is multi-location; OOT is presumed single-location/single-experience — confirm with client before building a location-finder).

---

## 2. Content & IA Mapping (Maple Street → OOT)

Map their information architecture to olive-oil-tasting equivalents. This keeps the *structure* (which is the reusable part) while replacing all *content* (which must be 100% original to OOT).

| Maple Street Section | Purpose on Their Site | OOT Equivalent |
|---|---|---|
| Sticky nav: Menu / Our Story / Catering / Visit Us / Cart / Order Online | Primary nav + conversion CTA | Tastings / Our Story / Private Events / Visit Us / **Book a Tasting** (primary CTA button, top right) |
| Full-bleed hero photo + oversized headline + "As Featured On" badge + single CTA | Immediate brand impact, one clear action | Full-bleed hero (olive grove or tasting flight photo) + oversized headline (e.g., "SIP. SWIRL. TASTE THE GROVE.") + press/award badge if available + **"Reserve Your Tasting"** CTA |
| "Seasonal Favorites" carousel/menu teaser | Rotating product highlight | "Featured Tasting Flights" or "This Season's Harvest" carousel — rotating oils, pairings, or seasonal tasting menus |
| Photo-grid menu cards (Squawking Goat, Five & Dime, Cold Brew, etc.) w/ hover links | Menu item teasers linking to full menu | Tasting experience cards (e.g., "Classic Flight," "Estate Reserve Tasting," "Olive Oil & Cheese Pairing," "Private Group Tasting") linking to booking/detail pages |
| Testimonial block w/ customer quote + photo | Social proof | Guest testimonial block — real quote from a tasting guest + photo from an actual tasting session |
| Photo collage / storefront strip | Brand atmosphere, real-world presence | Photo strip of the tasting room, bottles, pours, groves — establishes place and craft |
| Instagram follow strip | Social proof + social channel growth | Same pattern, linked to OOT's actual Instagram |
| "Never Boring" / brand statement section | Brand voice / mission statement | Brand statement section — OOT's philosophy on olive oil quality, sourcing, or the tasting experience |
| Footer: Our Story / Catering / Nutritional Info / Store / Careers / Contact | Utility links | Our Story / Private Events / Sourcing & Quality / Shop (future) / Contact |
| App download badges | App cross-promotion | **Omit** unless OOT has an app — do not fabricate |
| "Join the Club" lightbox CTA | Email/loyalty capture | "Join the Tasting Club" — email capture modal (mailing list / member perks) |

**Content rule:** every string of copy, every photo, and every testimonial on the live OOT site must be either client-supplied or clearly marked as `TODO: client copy needed` placeholder in code comments. Do not invent fake testimonials, press badges, or awards.

---

## 3. Site Map

```
/                     Home (per structure above)
/tastings             Tasting experiences / flights (grid of "menu card"-style offerings)
/tastings/[slug]       Individual tasting experience detail + booking CTA
/our-story             Brand story, sourcing, founders
/private-events        Group bookings, corporate events, private tastings
/visit                 Location, hours, map, parking/directions
/book                  Booking flow (embed a booking tool — see Section 7)
/contact               Contact form + info
/shop (phase 2, stub)  Bottle sales — build route + placeholder, no checkout logic yet
/terms, /privacy        Legal (footer links)
```

---

## 4. Visual System

> **Verify against live devtools before finalizing.** These are directionally correct starting values based on the reference site's known brand pattern (bold single-color background sections, high-contrast display type, rounded corner language, badge/sticker accents).

### 4.1 Color Palette (adapt, don't copy)
Maple Street uses a **bold saturated blue** as their signature background/brand color with white and dark-navy text, plus warm food photography as the contrast layer. For OOT, translate that *pattern* (one bold, confident signature color used in large flat blocks) into an **olive oil–appropriate palette** — do not use their blue.

Suggested OOT direction (confirm with client / brand assets first):
- **Primary/Signature:** Deep olive green (`#3D4E29`–ish) or warm olive-gold (`#8A9A5B`-ish) — used the way Maple Street uses their blue: full-bleed section backgrounds, nav bar.
- **Secondary/Accent:** Warm terracotta or mustard-gold for CTA buttons and badges (mirrors their use of a punchy accent for buttons/badges against the blue).
- **Neutral base:** Warm off-white / cream (not stark white) for body sections — evokes stone/ceramic tasting-room surfaces.
- **Text:** Near-black or deep espresso-brown for body copy (not pure `#000`), inverted to cream/white on dark sections.
- Pull exact hex values from client brand guide if one exists — ask before finalizing.

### 4.2 Typography
Reference site pattern: **oversized, tight-tracking, all-caps or heavy-weight display headlines** paired with a clean, readable sans-serif or serif body font, and italicized serif for pull-quotes/testimonials.

For OOT:
- **Display/Headline font:** A bold condensed or heavy-weight sans (or a confident slab serif if it fits an "estate/artisanal" olive oil brand better than biscuits' diner-casual tone) — headlines should be large (clamp ~2.5rem–5.5rem depending on breakpoint), tight line-height, often uppercase for hero/section headers.
- **Body font:** Clean, highly legible sans-serif, comfortable at 16–18px base.
- **Accent/quote font:** Italic serif for testimonials and pull-quotes, matching the reference site's treatment of its customer quote block.
- Load via `next/font` or self-hosted `@font-face` — do not hotlink Squarespace/Maple Street's font CDN.

### 4.3 Layout & Component Language
- **Sticky header**, transparent-over-hero on load, solid on scroll, logo left, nav center/right, one high-contrast CTA button always visible top-right ("Book a Tasting").
- **Full-bleed hero** with single oversized headline, optional badge/sticker graphic (top-featured-in style), single primary CTA button.
- **Rounded corners** on cards, buttons, and image containers (reference site leans soft/organic rather than sharp-edged — pill-shaped buttons, generous border-radius on cards).
- **Alternating full-bleed color-block sections** (cream → olive → cream → olive) to create visual rhythm down the page, same technique as Maple Street's alternating white/blue sections.
- **Asymmetric photo collage grid** for the "atmosphere" section (uneven card sizes, slight overlap or offset — not a rigid uniform grid).
- **Card hover states**: subtle scale/zoom on image, title reveal or underline animation — mirrors their "menu card" hover links.
- **Badges/stickers**: circular or angled badge graphics for awards/press mentions (only if real ones exist).

### 4.4 Imagery
- Hero and section photography should be warm, high-detail, close-up food/product photography style (olive oil pours, bottle details, groves, tasting flights, hands holding glasses) — matching the reference site's appetite-appeal photography approach.
- No stock-photo-looking generic imagery if avoidable; flag placeholder images clearly with a `data-placeholder="true"` attribute or visible watermark in dev so they're never accidentally shipped to production.

---

## 5. Page-by-Page Build Spec

### 5.1 Home (`/`)
1. **Header** — logo (OOT, not C2Eventz), nav links, "Book a Tasting" CTA button, sticky on scroll.
2. **Hero** — full-bleed image, oversized headline + subhead, optional press badge, primary CTA.
3. **Intro/mission strip** — one bold sentence + short supporting copy (mirrors "EVERYONE'S INVITED" micro-copy block).
4. **Featured Tastings carousel** — rotating seasonal or featured tasting flights, "See Full Menu" link.
5. **Tasting Experience card grid** — 6-ish cards (image + title + link), hover interaction, "Explore All Tastings" CTA below grid.
6. **Testimonial section** — one large customer quote, attribution, supporting photo.
7. **Atmosphere photo collage** — asymmetric grid of 4–5 images (tasting room, bottles, pours, groves).
8. **Instagram strip** — link out to OOT's Instagram, matching the reference's social CTA pattern.
9. **Brand statement section** — bold headline + short philosophy paragraph, olive-block background.
10. **Email capture / "Join the Tasting Club" section or lightbox.**
11. **Footer** — utility nav, social icons, legal links, copyright (OOT entity, not C2Eventz).

### 5.2 Tastings (`/tastings`)
Grid of all tasting experiences, each card linking to a detail page. Filter/sort optional (by type: classic, reserve, pairing, private).

### 5.3 Tasting Detail (`/tastings/[slug]`)
Hero image, description, what's included, price, duration, "Book This Tasting" CTA → booking flow.

### 5.4 Our Story (`/our-story`)
Founder/brand narrative, sourcing story, photos — long-form storytelling page mirroring the reference site's "Our Story" nav placement and tone.

### 5.5 Private Events (`/private-events`)
Group/corporate tasting inquiries — form or contact CTA (this replaces Maple Street's "Catering" nav item structurally).

### 5.6 Visit Us (`/visit`)
Address, hours, embedded map, parking/directions, single-location focus (no multi-location finder unless confirmed).

### 5.7 Book (`/book`)
Booking widget/embed (see Section 7 — flag for client's actual booking tool, e.g., Tock, Resy, Calendly, or custom).

---

## 6. Technical Stack Recommendation

*(Confirm against whatever ootastings.com currently runs on — this assumes a rebuild, adjust if migrating an existing codebase.)*

- **Framework:** Next.js (App Router) + TypeScript — good fit for a marketing site needing strong SEO, image optimization, and fast iteration in Cursor/Claude Code.
- **Styling:** Tailwind CSS — matches the "utility-first, fast section-building" workflow implied by the alternating-block layout pattern above. Define the palette from Section 4.1 as Tailwind theme tokens (`olive`, `cream`, `terracotta`, etc.) rather than hardcoding hex values inline.
- **Images:** `next/image` with real optimized assets; no hotlinking Squarespace CDN URLs from the reference site under any circumstances (copyright + reliability issue).
- **CMS (optional but recommended):** Headless CMS (Sanity, Contentful, or even simple MDX) for tasting experience cards and testimonials so the client can update content without a redeploy.
- **Booking integration:** Determine client's actual booking backend (Tock/Resy/Calendly/custom form + email) before building `/book` — do not fabricate a fake booking flow.
- **Deployment:** Vercel (pairs cleanly with Next.js).
- **Fonts:** Self-hosted via `next/font/local` or Google Fonts via `next/font/google` — pick fonts that match the *character* of Maple Street's type (bold display + clean body + italic serif accent) without being their literal font files if those are licensed/proprietary.

---

## 7. Explicit Non-Negotiables Checklist

Before this ships, verify every item:

- [ ] No "C2Eventz" text, logo file, favicon, or metadata reference exists anywhere in the repo or rendered output.
- [ ] `grep -ri "c2eventz"` across the full repo returns zero results.
- [ ] Site copy is 100% about olive oil tasting — no generic "events venue" language carried over from any prior template.
- [ ] No Maple Street Biscuit Co. logos, photos, copy, or font files are present in the shipped codebase — the reference site informed *pattern*, not *assets*.
- [ ] All placeholder content (`TODO: client copy needed`) is tracked in a single running list for client follow-up, not silently shipped as filler text.
- [ ] Color palette uses client-confirmed brand colors (or the olive/terracotta/cream direction above if none exist yet) — not Maple Street's blue.
- [ ] Booking CTA in the header actually routes to a real, working booking mechanism before launch (not a dead link).
- [ ] Mobile nav collapses to a hamburger/drawer matching the reference site's mobile pattern — sticky CTA should remain reachable on mobile too.
- [ ] Lighthouse/perf check on hero image weight — reference site leans on large photography; make sure OOT's hero images are compressed/responsive (`next/image` srcset) so it doesn't tank load time.

---

## 8. Open Questions for Client (flag before/while building)

1. Does OOT have existing brand guidelines (logo, color hex values, fonts)? If yes, those override Section 4 entirely.
2. What's the actual booking system/backend for `/book`? (Tock, Resy, Calendly, phone-only, custom form?)
3. Single location or multiple? Confirms whether `/visit` needs a location-finder like Maple Street's.
4. Is there a real press/award badge to feature in the hero (like their "As Featured on Food Network"), or should that element be omitted entirely?
5. Do they want e-commerce (bottle sales) in this phase or phase 2? Affects whether `/shop` gets built out now.
6. Any existing testimonials/reviews with permission to use, and do they have real photography, or does photography need to be sourced/shot?

---

## 9. Definition of Done

- All pages in Section 5 built and responsive (mobile / tablet / desktop).
- Section 7 checklist fully checked off.
- Section 8 questions answered and reflected in final copy/config (no lingering placeholder content in the production build).
- Site passes a manual side-by-side "does this feel like the same energy as maplestreetbiscuits.com, but unmistakably an olive oil tasting brand" review with the client.
