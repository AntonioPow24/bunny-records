import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { profile } from "@/content/profile";
import { getBuildYear } from "@/lib/build-info";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { switchLabels } from "@/lib/i18n/labels";

import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";

const linkClass =
  "text-body-sm inline-flex min-h-11 items-center rounded-sm text-foreground/85 transition-colors hover:text-foreground";

// Footer de Figma ("contraportada"). Sin ofertas de servicios (regla de hosting, PORTFOLIO.md §2.1).
export async function Footer() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getBuildYear()]);

  return (
    <footer aria-label={dict.footer.label} className="border-t border-border">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <div className="flex items-center gap-3">
          <Logo className="h-7" />
          <p className="text-body-sm text-muted-foreground">
            {format(dict.footer.copyright, { year: String(year), name: profile.name })}
          </p>
        </div>
        <ul className="flex flex-col md:flex-row md:items-center md:gap-6">
          <li>
            <Link href={`/${locale}/about`} className={linkClass}>
              {dict.nav.about}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}#contact`} className={linkClass}>
              {dict.nav.contact}
            </Link>
          </li>
          <li>
            <a href={profile.contact.github.url} rel="noopener noreferrer" target="_blank" className={linkClass}>
              {dict.footer.github}
            </a>
          </li>
          <li>
            <a href={profile.contact.linkedin.url} rel="noopener noreferrer" target="_blank" className={linkClass}>
              {dict.footer.linkedin}
            </a>
          </li>
          <li>
            <Link href={`/${locale}/about#gear`} className={linkClass}>
              {dict.footer.siteCredits}
            </Link>
          </li>
          <li>
            <LocaleSwitcher current={locale} label={dict.locale.label} switchLabels={switchLabels(dict)} />
          </li>
        </ul>
      </Container>
    </footer>
  );
}
