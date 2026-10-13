import type { MetadataRoute } from "next";

import { getProjects, getTechnologies, isPublished } from "@/lib/content";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

// Todas las páginas en cada idioma, con sus alternativas (PORTFOLIO.md §4.4). Se genera en el build.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/contact",
    ...getProjects().flatMap((p) => [
      `/projects/${p.slug}`,
      ...(isPublished(p) ? p.tracks.map((t) => `/projects/${p.slug}/${t.slug}`) : []),
    ]),
    ...getTechnologies().map((t) => `/stack/${t.id}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
          "x-default": absoluteUrl(defaultLocale, path),
        },
      },
    })),
  );
}
