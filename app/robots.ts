import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Serves /robots.txt.
 *
 * /api/* is disallowed: the only route under it is the inquiry form handler,
 * which is POST-only and has nothing to index. Everything else is open — there
 * is no admin area in this project.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
