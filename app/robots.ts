import type { MetadataRoute } from "next";

import { NOINDEX, SITE_URL } from "@/lib/seo";

// Con SITE_NOINDEX=true (previsualizaciones) no se indexa nada. /lab solo existe en desarrollo (404 en producción).
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
