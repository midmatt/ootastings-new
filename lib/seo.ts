/**
 * SITE-WIDE SEO CONSTANTS
 * -----------------------
 * Single source of truth for canonical host, share imagery and the business
 * facts that feed JSON-LD. Everything here is sourced from copy already in the
 * repo — the footer contact block, lib/placeholders.ts and the redesign spec.
 * Nothing is invented; unconfirmed fields are marked TODO rather than guessed.
 *
 * Canonical host: the spec and the verified Resend sending domain both name
 * ootastings.com, so that is the canonical. The site currently *serves* from
 * ootastings-new.vercel.app, so until the apex domain is attached in Vercel,
 * override this with NEXT_PUBLIC_SITE_URL to keep canonicals pointing at a host
 * that actually resolves. See the README note added alongside this file.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ootastings.com"
).replace(/\/$/, "");

export const SITE_NAME = "OOT Tastings";

/** Legal entity behind the brand — named throughout /legal and the footer. */
export const PARENT_ORG = "JoVell Hospitality Group";

export const TAGLINE = "Sip. Swirl. Taste the Grove.";

/**
 * Contact details as published in the site footer, which is the page's
 * #contact target. Note the repo currently carries three different addresses
 * (footer info@jovellhg.com, inquiry API Joseph@ootastings.com, package section
 * hello@ootastings.com); the footer value is used here because it is the one
 * presented to visitors as the contact address.
 */
export const CONTACT_EMAIL = "info@jovellhg.com";
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
