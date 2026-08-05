/**
 * SITE-WIDE SEO CONSTANTS
 * -----------------------
 * Single source of truth for canonical host, share imagery and the business
 * facts that feed JSON-LD. Everything here is sourced from copy already in the
 * repo — the footer contact block, lib/placeholders.ts and the redesign spec.
 * Nothing is invented; unconfirmed fields are marked TODO rather than guessed.
 *
 * Canonical host: **www**.ootastings.com. Verified against the live site —
 * https://www.ootastings.com returns 200 with no redirects, while the apex
 * https://ootastings.com returns a 308 to it. A canonical, sitemap <loc> or
 * robots Host: pointing at the apex therefore names a URL that immediately
 * redirects, which is exactly what those fields must not do.
 *
 * If the Vercel redirect is ever flipped to prefer the apex, change this one
 * constant — canonicals, Open Graph URLs, robots.txt and sitemap.xml all derive
 * from it. NEXT_PUBLIC_SITE_URL overrides it for preview deployments.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ootastings.com"
).replace(/\/$/, "");

export const SITE_NAME = "OOT Tastings";

/** Legal entity behind the brand — named throughout /legal and the footer. */
export const PARENT_ORG = "JoVell Hospitality Group";

export const TAGLINE = "Sip. Swirl. Taste the Grove.";

/**
 * The single public-facing contact address. Everything visitor-facing — footer,
 * legal page, inquiry-failure fallback, structured data — uses this one.
 *
 * Joseph@ootastings.com stays in app/api/inquiry/route.ts only, as the backend
 * address form submissions are delivered to; it is not published anywhere.
 */
export const CONTACT_EMAIL = "info@ootastings.com";
export const CONTACT_PHONE_DISPLAY = "305.900.7092";
export const CONTACT_PHONE_E164 = "+13059007092";

export const INSTAGRAM_URL = "https://www.instagram.com/evootastings/";

/**
 * 1200x630 brand card generated from public/logo-cream.png on brand olive.
 * Replace with a photographic share card once real photography is licensed.
 */
export const OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "OOT Tastings — guided olive oil tastings",
};

/**
 * The business travels to the client (resorts, conferences, retreats) and has
 * no premises open to the public — the footer notes the Visit Us block was
 * removed for want of a real address, and the tasting terms bill "travel
 * outside of Florida" to the client. Florida is therefore the service area,
 * not an address.
 */
export const SERVICE_AREA = "Florida, United States";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
