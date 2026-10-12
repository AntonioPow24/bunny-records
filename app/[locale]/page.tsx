import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { localeNames, locales, type Locale } from "@/lib/i18n/config";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// Inicio provisional: en el paso 7 se convierte en la colección. Muestra que el idioma ya funciona.
export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const switchLabels = Object.fromEntries(
    locales.map((l) => [l, format(dict.locale.switchTo, { language: localeNames[l] })]),
  ) as Record<Locale, string>;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <Logo title={dict.meta.siteName} className="h-20" />
      <p className="text-label text-primary">{dict.home.eyebrow}</p>
      <h1 className="text-h2">{dict.home.title}</h1>
      <p className="text-label text-muted-foreground">{dict.home.comingSoon}</p>
      <LocaleSwitcher current={locale} label={dict.locale.label} switchLabels={switchLabels} />
    </main>
  );
}
