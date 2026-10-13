import type { Metadata } from "next";

import { profile } from "@/content/profile";
import { defaultLocale, locales, ogLocales, type Locale } from "@/lib/i18n/config";

// SEO compartido (PORTFOLIO.md §4.4 y §8), adaptado de lib/seo.ts de Vidriería Antonio al sitio bilingüe.

export const SITE_NAME = "Bunny Records";

/**
 * URL pública sin barra final. Se fija en el build (NEXT_PUBLIC_*): si cambia, hay que volver a desplegar.
 * En Vercel, sin la variable, se usa el dominio de producción del proyecto.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");

/** Previsualizaciones y dirección temporal: se pueden compartir, pero no se indexan. */
export const NOINDEX = process.env.SITE_NOINDEX === "true";

/** Ruta de una página en un idioma. `path` va sin idioma: "", "/about", "/projects/x". */
export const localizedPath = (locale: Locale, path: string) => `/${locale}${path}`;

/** Lo mismo, absoluto (sitemap y JSON-LD). */
export const absoluteUrl = (locale: Locale, path: string) => `${SITE_URL}${localizedPath(locale, path)}`;

/** Alternativas por idioma (hreflang) más x-default, que apunta al idioma por defecto. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localizedPath(l, path)])),
    "x-default": localizedPath(defaultLocale, path),
  };
}

type BuildMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** El título ya es completo (Inicio): no se le añade "· Bunny Records". */
  absoluteTitle?: boolean;
  /** Imagen al compartir. Por defecto, la general; los álbumes y sus pistas usan la de su álbum. */
  image?: { url: string; alt: string };
};

/** Imagen general (design/logo/meta/og-default.png): el conejo y el logo. */
const DEFAULT_IMAGE = { url: "/og-default.png", alt: "Bunny Records · Antonio Garcia Romero" };

/** Imagen generada de un álbum (app/[locale]/projects/[slug]/opengraph-image.tsx). */
export const albumImage = (locale: Locale, slug: string, alt: string) => ({
  url: localizedPath(locale, `/projects/${slug}/opengraph-image`),
  alt,
});

/**
 * Canónica, hreflang, Open Graph y Twitter de una página. La imagen se declara siempre: si una página define
 * openGraph, pierde la heredada (lección de Vidriería: WhatsApp/Discord mostraban el enlace sin miniatura).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image = DEFAULT_IMAGE,
}: BuildMetadataInput): Metadata {
  const images = [{ ...image, width: 1200, height: 630 }];
  // El template del layout añade el sufijo al <title>; Open Graph y Twitter no pasan por él.
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: localizedPath(locale, path), languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: localizedPath(locale, path),
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}

// ---------- JSON-LD (schema.org) ----------

/** El autor, referenciado por @id desde el sitio y desde cada álbum. */
export function personJsonLd(locale: Locale) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    jobTitle: profile.role[locale],
    homeLocation: { "@type": "Place", name: profile.location[locale] },
    url: absoluteUrl(locale, "/about"),
    sameAs: [profile.contact.github.url, profile.contact.linkedin.url],
  };
}

/** Migas: Colección › … (cada elemento con su ruta sin idioma). */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}
