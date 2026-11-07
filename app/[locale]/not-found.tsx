import Link from "next/link";

import { Disc } from "@/components/brand/disc";
import { Bunny } from "@/components/bunny/bunny";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { SITE_NAME } from "@/lib/seo";

// 404 "Lado C" (Figma D12/M12; BUNNY-RECORDS.md §5.3): una pista que no está en ningún lado del disco. Vinilo
// rayado con etiqueta "C" y el conejo curioso mirándolo. Lo usa notFound() en álbumes, pistas, tecnologías y
// cualquier ruta desconocida del idioma ([...catchAll]).
export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <Container className="grid min-h-0 flex-1 content-center items-center gap-6 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
      {/* Título propio (React lo sube al <head>): un not-found anidado no admite metadata y la 404 conservaba el
          título del sitio. Mejora 46. */}
      <title>{`${dict.notFound.metaTitle} · ${SITE_NAME}`}</title>
      <div className="relative mx-auto w-fit md:order-last md:mx-0">
        <Disc kind="side-c" className="w-[min(58vw,32dvh)] md:w-[min(34vw,55dvh,31rem)]" />
        <Bunny
          mode="full"
          hold="curious-left"
          className="absolute -right-[30%] bottom-[-4%] w-[40%] md:-right-[48%] md:bottom-[-22%] md:w-[52%]"
        />
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="text-label text-primary">{dict.notFound.eyebrow}</p>
        <h1 className="text-display max-w-xl">{dict.notFound.title}</h1>
        <p className="text-body max-w-md text-muted-foreground">{dict.notFound.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/${locale}`} className={buttonVariants()}>
            {dict.notFound.backHome}
          </Link>
          <Link href={`/${locale}/about`} className={buttonVariants({ variant: "ghost" })}>
            {dict.nav.about}
          </Link>
        </div>
      </div>
    </Container>
  );
}
