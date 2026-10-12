import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { switchLabels } from "@/lib/i18n/labels";

import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLinks, type NavItem } from "./nav-links";

// Header de Figma (escritorio y móvil). Persiste entre rutas porque vive en el layout de [locale].
export async function Header() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const items: NavItem[] = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];
  const mobileItems: NavItem[] = [{ href: `/${locale}`, label: dict.nav.home }, ...items];
  const labels = switchLabels(dict);

  return (
    <header className="relative z-40 bg-background">
      <Container className="flex h-18 items-center justify-between">
        <Link href={`/${locale}`} aria-label={dict.nav.homeLabel} className="rounded-sm">
          <Logo className="h-9" />
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label={dict.nav.mainLabel} className="hidden md:block">
            <NavLinks items={items} />
          </nav>
          <LocaleSwitcher current={locale} label={dict.locale.label} switchLabels={labels} />
          <MobileNav
            items={mobileItems}
            locale={locale}
            switchLabels={labels}
            labels={{
              open: dict.nav.openMenu,
              close: dict.nav.closeMenu,
              title: dict.nav.menuTitle,
              home: dict.nav.homeLabel,
              locale: dict.locale.label,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
