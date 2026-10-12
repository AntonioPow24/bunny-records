// Idiomas del sitio (PORTFOLIO.md §4). Añadir uno: sumarlo aquí, crear su diccionario y traducir el contenido;
// TypeScript señala lo que falte.
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Cookie que guarda el idioma elegido con el selector (la lee proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Nombre de cada idioma en su propia lengua (para el selector). */
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** Locale de Open Graph (PORTFOLIO.md §4.4). */
export const ogLocales: Record<Locale, string> = {
  es: "es_PE",
  en: "en_US",
};

/** Cambia el idioma de una ruta conservando el resto: /es/projects/x → /en/projects/x. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && hasLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}
