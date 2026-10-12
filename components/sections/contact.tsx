import { ArrowUpRight } from "lucide-react";

import { Bunny } from "@/components/bunny/bunny";
import { Container } from "@/components/layout/container";
import { CopyEmail } from "@/components/portfolio/copy-email";
import { profile } from "@/content/profile";
import { getLabelStats } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// Contacto · ficha técnica (Figma D11/M11; BUNNY-RECORDS.md §5.3.1). Informativo: sin ofertas de servicios,
// precios ni disponibilidad freelance (PORTFOLIO.md §2.1, Vercel Hobby).
export async function ContactSection() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const stats = getLabelStats();
  const plural = new Intl.PluralRules(locale);
  const count = (forms: { one: string; other: string }, n: number) =>
    format(plural.select(n) === "one" ? forms.one : forms.other, { count: String(n) });
  const labelValue = [
    stats.published > 0 && count(dict.contact.published, stats.published),
    stats.inDevelopment > 0 && count(dict.contact.inDevelopment, stats.inDevelopment),
    stats.planned > 0 && count(dict.contact.planned, stats.planned),
  ]
    .filter(Boolean)
    .join(" · ");

  const rows = [...profile.spec.map((r) => ({ label: r.label[locale], value: r.value[locale] })), { label: dict.contact.statsLabel, value: labelValue }];
  const links = [
    { name: "GitHub", handle: profile.contact.github.handle, href: profile.contact.github.url },
    { name: "LinkedIn", handle: profile.contact.linkedin.handle, href: profile.contact.linkedin.url },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 border-t border-border py-16 md:py-24">
      <Container className="grid gap-12 md:grid-cols-[minmax(0,42rem)_1fr] md:items-center">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <p className="text-label text-primary">{dict.contact.eyebrow}</p>
            <h2 id="contact-title" className="text-display">
              {dict.contact.title}
            </h2>
            <p className="text-body text-muted-foreground">{dict.contact.body}</p>
          </div>

          <dl className="border-t border-border">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 border-b border-border py-3.5 md:flex-row md:gap-6">
                <dt className="text-label shrink-0 text-muted-foreground md:w-40 md:pt-1">{row.label}</dt>
                <dd className="text-body-strong">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3">
            <h3 className="text-h3">{dict.contact.whereTitle}</h3>
            <CopyEmail
              email={profile.contact.email}
              labels={{ copy: dict.contact.copy, copied: dict.contact.copied, copyFailed: dict.contact.copyFailed }}
            />
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-13 items-center gap-4 rounded-md px-2 transition-colors hover:bg-accent"
                  >
                    <span className="text-body-strong">{link.name}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-border" />
                    <span className="text-body-sm text-muted-foreground">{link.handle}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" />
                    <span className="sr-only">{dict.contact.opensNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Bunny mode="full" hold="present-left" className="mx-auto hidden w-64 md:block lg:w-80" />
      </Container>
    </section>
  );
}
