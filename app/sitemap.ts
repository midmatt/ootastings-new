import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Serves /sitemap.xml.
 *
 * Only two public routes exist today — the site is a single marketing page plus
 * the legal page. The header's nav items (#mission, #featured, #tables…) are
 * in-page anchors, not routes, so they are deliberately absent: listing URL
 * fragments in a sitemap does nothing, as Google indexes the page not the
 * anchor. Add entries here as /tastings, /our-story etc. become real routes.
 *
 * `lastModified` uses build time. That is honest for a site whose copy ships
 * with the deploy, and it avoids the trap of a hard-coded date going stale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/legal"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
