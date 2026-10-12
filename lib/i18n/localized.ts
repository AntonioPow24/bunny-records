import type { Locale } from "./config";

/** Campo traducible del contenido (PORTFOLIO.md §4.3): si falta un idioma, no compila. */
export type Localized<T> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
