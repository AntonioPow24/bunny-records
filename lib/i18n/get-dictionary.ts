import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";

import type en from "@/dictionaries/en.json";
import type es from "@/dictionaries/es.json";

import { hasLocale, type Locale } from "./config";

// El tipo sale de es.json. Las dos comprobaciones fallan en el typecheck si en.json pierde o añade claves.
export type Dictionary = typeof es;
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Assert<T extends true> = T;
export type DictionariesMatch = Assert<Same<typeof en, Dictionary>>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

/** Idioma de la ruta actual, leído del segmento [locale] (solo en Server Components). */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Diccionario del idioma de la ruta actual. */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

/** Elige la forma singular o plural ({ one, other }) según el idioma y sustituye {count}. */
export function plural(locale: Locale, forms: { one: string; other: string }, count: number): string {
  const form = new Intl.PluralRules(locale).select(count) === "one" ? forms.one : forms.other;
  return format(form, { count: String(count) });
}

/** Sustituye {variables} en un texto del diccionario. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
