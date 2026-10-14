import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { getBuildYear } from "@/lib/build-info";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

/** CV aportado por el usuario (solo en español; la versión inglesa del texto lo indica). */
const CV_HREF = "/cv/cv-antonio-garcia-romero-2026.pdf";

// Contacto · contraportada del artista (Figma T14 v3, FIGMA-DESIGN.md §8.2). Informativo: sin ofertas de
// servicios, precios ni disponibilidad freelance (PORTFOLIO.md §2.1). El correo es un enlace mailto (sin botón de
// copiar). La firma va en la escena (Turntable), fuera del disco que gira.
export async function ContactSheet() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getBuildYear()]);
  const links = [
    { name: "GitHub", handle: profile.contact.github.handle, href: profile.contact.github.url },
    { name: "LinkedIn", handle: profile.contact.linkedin.handle, href: profile.contact.linkedin.url },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="text-label text-primary">{dict.contact.eyebrow}</p>
        <h1 className="text-h2 max-w-[12ch] md:text-display">{dict.contact.title}</h1>
        <p className="text-body text-muted-foreground max-md:hidden">{dict.contact.intro}</p>
      </header>

      <section aria-labelledby="contact-name" className="flex flex-col gap-6 border-t border-border pt-3 md:gap-6">
        <div className="flex flex-col gap-1 md:grid md:grid-cols-[minmax(0,1fr)_13.5rem] md:gap-6">
          <div className="flex flex-col gap-1">
            <h2 id="contact-name" className="text-h3">
              {profile.name}
            </h2>
            <p className="text-body-sm text-muted-foreground">{profile.role[locale]}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-label text-muted-foreground max-md:sr-only">{dict.contact.baseLabel}</p>
            <p className="text-body-sm max-md:text-muted-foreground">{profile.location[locale]}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-3">
          <div className="flex flex-col gap-1 max-md:hidden">
            <p className="text-label text-primary">{dict.contact.cvLabel}</p>
            <p className="text-body-sm text-muted-foreground">{dict.contact.cvBody}</p>
          </div>
          <a
            href={CV_HREF}
            download="CV_Antonio_Garcia_Romero_2026.pdf"
            hrefLang="es"
            type="application/pdf"
            className={cn(buttonVariants(), "w-full gap-2.5 md:w-52")}
          >
            {dict.contact.cvDownload}
            <Download aria-hidden="true" className="size-5" />
          </a>
        </div>
      </section>

      <section aria-labelledby="contact-where" className="flex flex-col gap-3 border-t border-border pt-3">
        <h2 id="contact-where" className="sr-only">
          {dict.contact.linksTitle}
        </h2>
        <div className="flex flex-col gap-1">
          <p className="text-label text-muted-foreground">{dict.contact.emailLabel}</p>
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-body-sm flex min-h-11 items-center self-start underline decoration-border underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-primary hover:decoration-primary md:min-h-0"
          >
            {profile.contact.email}
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-x-8">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-col justify-center gap-1 rounded-md py-2"
              >
                <span className="text-body-strong flex items-center gap-1.5 transition-colors group-hover:text-primary">
                  {link.name}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
                <span className="text-body-sm truncate text-muted-foreground">{link.handle}</span>
                <span className="sr-only">{dict.contact.opensNewTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col gap-2 border-t border-border pt-2">
        <p className="text-body-sm text-muted-foreground max-md:hidden">{format(dict.contact.sign, { name: profile.name })}</p>
        <p className="text-label text-muted-foreground">
          {format(dict.contact.copyright, { year: String(year) })} ·{" "}
          <Link
            href={`/${locale}/about#gear`}
            className="inline-flex min-h-11 items-center gap-1 transition-colors hover:text-primary md:min-h-0"
          >
            {dict.contact.siteCredits}
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </Link>
        </p>
      </footer>
    </div>
  );
}
