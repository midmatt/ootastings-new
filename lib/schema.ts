/**
 * JSON-LD STRUCTURED DATA
 * -----------------------
 * Schema choice, and why:
 *
 * - **Organization**, not LocalBusiness. LocalBusiness (and its Restaurant /
 *   FoodEstablishment subtypes) is for a business with premises the public
 *   visits, and its `address` is effectively required for the markup to be
 *   useful. This business travels to the client and has no confirmed address —
 *   inventing one to satisfy the schema would be both wrong and a Google
 *   structured-data policy violation.
 * - **Service** rather than Product for the tastings. Product implies a
 *   transferable good with a SKU; these are hosted, scheduled experiences
 *   delivered by staff, which is exactly what Service + OfferCatalog models.
 *   `areaServed` carries the geography that LocalBusiness would otherwise have
 *   supplied.
 *
 * Offers are derived from lib/placeholders.ts so published prices and schema
 * prices cannot drift apart.
 */

import { featuredTastings, networkingExperiences } from "@/lib/placeholders";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  INSTAGRAM_URL,
  PARENT_ORG,
  SERVICE_AREA,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
  absoluteUrl,
} from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;
const SERVICE_ID = `${SITE_URL}/#tasting-service`;

/** "$5,000" / "$85 per guest" -> 5000 / 85. Returns null if there's no figure. */
function parsePrice(value: string): number | null {
  const match = value.match(/\$([\d,]+(?:\.\d+)?)/);
  if (!match) return null;
  const n = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "OOTastings",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-olive.png"),
      width: 621,
      height: 644,
    },
    image: absoluteUrl("/og-default.png"),
    description:
      "Guided olive oil tastings, flights and pairings hosted on location for corporate events, retreats, resorts and private groups.",
    slogan: TAGLINE,
    parentOrganization: { "@type": "Organization", name: PARENT_ORG },
    sameAs: [INSTAGRAM_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: CONTACT_PHONE_E164,
      email: CONTACT_EMAIL,
      areaServed: "US",
      availableLanguage: "English",
    },
    // Service area rather than address: the team travels to the client.
    areaServed: { "@type": "State", name: SERVICE_AREA },
    // TODO: add a Facebook / LinkedIn URL to `sameAs` if those profiles exist —
    // only the Instagram account is referenced anywhere in the repo.
    // TODO: add `foundingDate` and a legal `taxID`/`vatID` if those are wanted
    // for entity disambiguation; neither is recorded in the project.
  };
}

function offer(name: string, description: string, priceText: string) {
  const price = parsePrice(priceText);
  return {
    "@type": "Offer",
    name,
    description,
    ...(price === null
      ? {}
      : { price, priceCurrency: "USD", availability: "https://schema.org/InStock" }),
    // The published figure is a starting price (packages include a guest count
    // and bill per head above it), so it is marked as the minimum rather than
    // presented as a fixed total.
    ...(price === null
      ? {}
      : {
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: price,
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        }),
  };
}

export function serviceSchema() {
  return {
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Guided Olive Oil Tastings",
    serviceType: "Olive oil tasting experience",
    description:
      "Hosted olive oil tasting experiences and Mediterranean networking tables, delivered on location at corporate events, conferences, retreats, resorts and private gatherings.",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "State", name: SERVICE_AREA },
    audience: { "@type": "BusinessAudience", audienceType: "Corporate and private event hosts" },
    hasOfferCatalog: [
      {
        "@type": "OfferCatalog",
        name: "Tasting Experiences",
        itemListElement: featuredTastings.map((t) =>
          offer(
            `${t.name} — ${t.subtitle}`,
            `${t.brief.summary} ${t.price.includes}, ${t.price.additional}. Duration ${t.duration}.`,
            t.price.base,
          ),
        ),
      },
      {
        "@type": "OfferCatalog",
        name: "Enhanced Networking Experiences",
        itemListElement: networkingExperiences.map((n) =>
          offer(n.name, `${n.brief.summary} Ideal for ${n.brief.idealFor}.`, n.price),
        ),
      },
    ],
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/** Wraps nodes in a single @graph so one script tag carries the whole set. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
