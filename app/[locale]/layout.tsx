import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PlayerTray, type TrayAlbum } from "@/components/layout/player-tray";
import { SkipLink } from "@/components/layout/skip-link";
import { getAlbumMinutes, getProjects, isPublished, validateContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { locales } from "@/lib/i18n/config";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
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

// Layout persistente (BUNNY-RECORDS.md §5.4): header, footer y bandeja no se vuelven a montar al navegar.
export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const albums: TrayAlbum[] = getProjects().map((project) => ({
    slug: project.slug,
    title: project.title[locale],
    published: isPublished(project),
    summary: isPublished(project)
      ? format(dict.tray.albumSummary, {
          tracks: String(project.tracks.length),
          minutes: String(getAlbumMinutes(project, locale)),
        })
      : dict.tray.upcoming,
    tracks: isPublished(project) ? project.tracks.map((t) => ({ slug: t.slug, title: t.title[locale] })) : [],
  }));

  return (
    // suppressHydrationWarning solo cubre los atributos de <html>: extensiones como
    // LanguageTool añaden data-lt-installed antes de que React hidrate.
    <html lang={locale} className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <SkipLink label={dict.nav.skipToContent} />
        <Header />
        <main id="contenido" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <Footer />
        <PlayerTray locale={locale} albums={albums} labels={dict.tray} />
      </body>
    </html>
  );
}
