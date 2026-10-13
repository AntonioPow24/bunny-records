import type { MetadataRoute } from "next";

import { NOINDEX, SITE_URL } from "@/lib/seo";

// Con SITE_NOINDEX=true (previsualizaciones) no se indexa nada. /lab es el banco de pruebas interno.
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/es/lab", "/en/lab"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
