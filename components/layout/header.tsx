import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { switchLabels } from "@/lib/i18n/labels";

import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";
import { NavDisc } from "./nav-disc";

// Barra v2 (Figma: Header v2; BUNNY-RECORDS.md §5.3.2): logo = volver a la colección, discos
// Sobre mí y Contacto, ES / EN. Fija durante las transiciones (view-transition-name: site-header).
export async function Header() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <header className="relative z-40 shrink-0 [view-transition-name:site-header]">
      <Container className="flex h-16 items-center justify-between md:h-18">
        <Link href={`/${locale}`} aria-label={dict.nav.homeLabel} className="rounded-sm">
          <Logo className="h-9" />
        </Link>
        <nav aria-label={dict.nav.mainLabel} className="flex items-center gap-0.5 md:gap-2">
          <NavDisc kind="about" href={`/${locale}/about`} label={dict.nav.about} />
          <NavDisc kind="contact" href={`/${locale}/contact`} label={dict.nav.contact} />
          <LocaleSwitcher current={locale} label={dict.locale.label} switchLabels={switchLabels(dict)} />
        </nav>
      </Container>
    </header>
  );
}
