import type { MetadataRoute } from "next";

import { getProjects, getProjectsUsing, getTechnologies, isPublished } from "@/lib/content";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Las páginas indexables en cada idioma, con sus alternativas (PORTFOLIO.md §4.4) y, en Inicio y los álbumes,
// sus portadas (sitemap de imágenes: next/image las sirve por /_next/image, difícil de asociar para Google).
// Se genera en el build.
export default function sitemap(): MetadataRoute.Sitemap {
  const cover = (p: ReturnType<typeof getProjects>[number]) => `${SITE_URL}${p.cover.src.src}`;
  const images = new Map<string, string[]>([
    ["", getProjects().map(cover)],
    ...getProjects().map((p) => [`/projects/${p.slug}`, [cover(p)]] as [string, string[]]),
  ]);
  const paths = [
    "",
    "/about",
    "/contact",
    ...getProjects().flatMap((p) => [
      `/projects/${p.slug}`,
      ...(isPublished(p) ? p.tracks.map((t) => `/projects/${p.slug}/${t.slug}`) : []),
    ]),
    // Solo las fichas con álbumes: las demás llevan noindex (app/[locale]/stack/[tech]/page.tsx).
    ...getTechnologies()
      .filter((t) => getProjectsUsing(t.id).length > 0)
      .map((t) => `/stack/${t.id}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      ...(images.has(path) && { images: images.get(path) }),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
          "x-default": absoluteUrl(defaultLocale, path),
        },
      },
    })),
  );
}
