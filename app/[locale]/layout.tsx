import type { Metadata } from "next";

import { validateContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { locales } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import "../globals.css";

// Todo el sitio es estático (PORTFOLIO.md §5): si un cambio lo volviera dinámico, el build falla.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  // Comprueba el contenido en cada build (slugs, MDX por idioma, créditos): si algo falla, el build se detiene.
  validateContent();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: dict.meta.title, template: `%s · ${dict.meta.siteName}` },
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  return (
    // suppressHydrationWarning solo cubre los atributos de <html>: extensiones como
    // LanguageTool añaden data-lt-installed antes de que React hidrate.
    <html lang={locale} className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
