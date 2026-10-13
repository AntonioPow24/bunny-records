import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CopyEmail } from "@/components/portfolio/copy-email";
import { profile } from "@/content/profile";
import { getBuildYear } from "@/lib/build-info";
import { getLabelStats } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// Contacto · pase backstage (mejora 6; Figma "Mejoras · T6"). Informativo: sin ofertas de servicios, precios ni
// disponibilidad freelance (PORTFOLIO.md §2.1, Vercel Hobby). Recoge lo que tenía el footer (©, créditos).
export async function ContactSheet() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getBuildYear()]);
  const stats = getLabelStats();
  const plural = new Intl.PluralRules(locale);
  const form = (forms: { one: string; other: string }, n: number) => (plural.select(n) === "one" ? forms.one : forms.other);
  const figures = [
    { n: stats.published, label: form(dict.contact.published, stats.published) },
    { n: stats.inDevelopment, label: form(dict.contact.inDevelopment, stats.inDevelopment) },
    { n: stats.planned, label: form(dict.contact.planned, stats.planned) },
  ].filter((f) => f.n > 0);

  // La primera fila de la ficha (Rol) va bajo el nombre; el resto, en la rejilla.
  const [roleRow, ...facts] = profile.spec;
  const links = [
    { name: "GitHub", handle: profile.contact.github.handle, href: profile.contact.github.url },
    { name: "LinkedIn", handle: profile.contact.linkedin.handle, href: profile.contact.linkedin.url },
  ];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <p className="text-label text-primary">{dict.contact.eyebrow}</p>

      <article aria-labelledby="contact-name" className="surface-lit overflow-hidden rounded-lg border border-border bg-card">
        <div aria-hidden="true" className="flex items-center justify-between bg-primary px-5 py-2.5 text-primary-foreground md:px-7">
          <span className="text-label">{dict.contact.allAccess}</span>
          <span className="text-label">Bunny Records</span>
        </div>

        <div className="flex flex-col gap-5 p-5 md:gap-6 md:p-7">
          <header className="flex flex-col gap-1">
            <p className="text-label text-primary">{dict.contact.artist}</p>
            <h1 id="contact-name" className="text-h2">
              {profile.name}
            </h1>
            <p className="text-body-sm text-muted-foreground">{roleRow.value[locale]}</p>
          </header>

          <section aria-labelledby="contact-stats">
            <h2 id="contact-stats" className="sr-only">
              {dict.contact.statsLabel}
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {figures.map((f) => (
                <li key={f.label} className="flex flex-col gap-0.5 rounded-md bg-secondary px-3.5 py-2.5">
                  <span className="text-h2 text-primary">{f.n}</span>
                  <span className="text-label text-muted-foreground">{f.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
            {facts.map((row) => (
              <div key={row.label.es} className="flex flex-col gap-1">
                <dt className="text-label text-muted-foreground">{row.label[locale]}</dt>
                <dd className="text-body-sm md:text-body-strong">{row.value[locale]}</dd>
              </div>
            ))}
          </dl>

          {/* Corte de entrada: el pase se "arranca" aquí. */}
          <hr className="border-t-[1.5px] border-dashed border-border" />

          <section aria-labelledby="contact-where" className="flex flex-col gap-1">
            <h2 id="contact-where" className="sr-only">
              {dict.contact.whereTitle}
            </h2>
            <CopyEmail
              email={profile.contact.email}
              labels={{
                copy: dict.contact.copy,
                copyShort: dict.contact.copyShort,
                copied: dict.contact.copied,
                copyFailed: dict.contact.copyFailed,
              }}
            />
            <ul className="grid grid-cols-2 gap-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-11 flex-col gap-0.5 rounded-md bg-secondary px-3.5 py-2.5 transition-colors hover:bg-accent"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-body-strong">{link.name}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground group-hover:text-primary" />
                    </span>
                    <span className="text-label truncate text-muted-foreground normal-case">{link.handle}</span>
                    <span className="sr-only">{dict.contact.opensNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <p className="text-body-sm text-muted-foreground">
        {format(dict.contact.copyright, { year: String(year), name: profile.name })} ·{" "}
        <Link href={`/${locale}/about#gear`} className="underline-offset-4 hover:text-foreground hover:underline">
          {dict.contact.siteCredits}
        </Link>
      </p>
    </div>
  );
}
