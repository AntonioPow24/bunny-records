import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CopyEmail } from "@/components/portfolio/copy-email";
import { profile } from "@/content/profile";
import { getBuildYear } from "@/lib/build-info";
import { getLabelStats } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

// Contacto · ficha técnica (Figma V2-D11/V2-M11). Informativo: sin ofertas de servicios, precios ni
// disponibilidad freelance (PORTFOLIO.md §2.1, Vercel Hobby). Recoge lo que tenía el footer (©, créditos).
export async function ContactSheet() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getBuildYear()]);
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

  const rows = [
    ...profile.spec.map((r) => ({ label: r.label[locale], value: r.value[locale] })),
    { label: dict.contact.statsLabel, value: labelValue },
  ];
  const links = [
    { name: "GitHub", handle: profile.contact.github.handle, href: profile.contact.github.url },
    { name: "LinkedIn", handle: profile.contact.linkedin.handle, href: profile.contact.linkedin.url },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <p className="text-label text-primary">{dict.contact.eyebrow}</p>
        <h1 className="text-h2">{dict.contact.title}</h1>
      </div>

      <dl className="border-t border-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3 border-b border-border py-2 md:gap-6 md:py-2.5">
            <dt className="text-label w-28 shrink-0 text-muted-foreground md:w-36">{row.label}</dt>
            <dd className="text-body-sm md:text-body-strong">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-2">
        <h2 className="sr-only">{dict.contact.whereTitle}</h2>
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
                className="group flex min-h-11 items-center gap-4 rounded-md px-2 transition-colors hover:bg-accent md:min-h-12"
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

      <p className="text-body-sm text-muted-foreground">
        {format(dict.contact.copyright, { year: String(year), name: profile.name })} ·{" "}
        <Link href={`/${locale}/about#gear`} className="underline-offset-4 hover:text-foreground hover:underline">
          {dict.contact.siteCredits}
        </Link>
      </p>
    </div>
  );
}
