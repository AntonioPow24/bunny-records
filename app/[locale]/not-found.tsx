import Link from "next/link";

import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// 404 dentro de un idioma (notFound() en una página: álbum, pista o tecnología que no existe).
// Versión provisional; el diseño "Lado C" llega en el paso 10.
export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6 py-24 md:px-30">
      <p className="text-label text-primary">{dict.notFound.eyebrow}</p>
      <h1 className="text-display max-w-xl">{dict.notFound.title}</h1>
      <p className="text-body max-w-md text-muted-foreground">{dict.notFound.body}</p>
      <Link
        href={`/${locale}`}
        className="inline-flex h-12 items-center rounded-full bg-primary px-5 font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {dict.notFound.backHome}
      </Link>
    </div>
  );
}
