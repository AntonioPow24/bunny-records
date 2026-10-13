import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { Header } from "@/components/layout/header";
import { PlayerTray, type TrayAlbum } from "@/components/layout/player-tray";
import { SkipLink } from "@/components/layout/skip-link";
import { StageLights } from "@/components/layout/stage-lights";
import { getAlbumMinutes, getProjects, isPublished, validateContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { locales } from "@/lib/i18n/config";
import { format, getDictionary, getLocale, plural } from "@/lib/i18n/get-dictionary";
import { NOINDEX, SITE_NAME, SITE_URL } from "@/lib/seo";
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
    // Base de las URLs absolutas (og:image, canónicas, hreflang).
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s · ${SITE_NAME}` },
    description: dict.meta.description,
    // Previsualizaciones (SITE_NOINDEX=true): se pueden compartir, pero no se indexan.
    ...(NOINDEX && { robots: { index: false, follow: false } }),
  };
}

// Color de la barra del navegador móvil y de la tarjeta en Discord (design/logo/meta/README.md).
export const viewport: Viewport = { themeColor: "#0C111C" };

// Layout persistente (BUNNY-RECORDS.md §5.3.2 y §5.4): una sola pantalla fija; header y bandeja no se vuelven a
// montar al navegar. El documento nunca hace scroll: si un contenido no cabe, se desplaza dentro de <main>.
export default async function LocaleLayout({ children, panel }: LayoutProps<"/[locale]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const albums: TrayAlbum[] = getProjects().map((project) => ({
    slug: project.slug,
    title: project.title[locale],
    published: isPublished(project),
    summary: isPublished(project)
      ? format(dict.tray.albumSummary, {
          tracks: plural(locale, dict.tray.tracks, project.tracks.length),
          minutes: String(getAlbumMinutes(project, locale)),
        })
      : dict.tray.upcoming,
    tracks: isPublished(project) ? project.tracks.map((t) => ({ slug: t.slug, title: t.title[locale] })) : [],
  }));

  return (
    // suppressHydrationWarning solo cubre los atributos de <html>: extensiones como
    // LanguageTool añaden data-lt-installed antes de que React hidrate.
    <html lang={locale} className={`${fontVariables} h-full overflow-hidden antialiased`} suppressHydrationWarning>
      <body className="flex h-dvh flex-col overflow-hidden">
        {/* <Suspense> en lo que lee la ruta: ver components/layout/header.tsx. */}
        <Suspense>
          <StageLights />
        </Suspense>
        <SkipLink label={dict.nav.skipToContent} />
        <Header />
        <main id="contenido" tabIndex={-1} className="flex min-h-0 flex-1 flex-col overflow-y-auto outline-none">
          {children}
        </main>
        <Suspense>
          <PlayerTray locale={locale} albums={albums} labels={dict.tray} />
        </Suspense>
        {/* Ficha de tecnología como panel (ruta interceptada @panel/(.)stack/[tech]). */}
        {panel}
      </body>
    </html>
  );
}
