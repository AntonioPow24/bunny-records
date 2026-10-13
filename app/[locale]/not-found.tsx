import Link from "next/link";

import { Disc } from "@/components/brand/disc";
import { Bunny } from "@/components/bunny/bunny";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// 404 "Lado C" (Figma D12/M12; BUNNY-RECORDS.md §5.3): los vinilos solo tienen lado A y B. Vinilo rayado
// con etiqueta "C" y el conejo curioso mirándolo. Lo usa notFound() en álbumes, pistas y tecnologías.
export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <Container className="grid min-h-0 flex-1 content-center items-center gap-6 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
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
