import { localeNames, locales, type Locale } from "./config";
import { format, type Dictionary } from "./get-dictionary";

/** Nombres accesibles del selector de idioma: "Cambiar a English" / "Switch to Español". */
export function switchLabels(dict: Dictionary): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, format(dict.locale.switchTo, { language: localeNames[l] })]),
  ) as Record<Locale, string>;
}
