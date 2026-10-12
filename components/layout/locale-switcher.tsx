"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALE_COOKIE, locales, switchLocalePath, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  current: Locale;
  /** Texto accesible del grupo ("Idioma"). */
  label: string;
  /** Texto accesible de cada enlace, ya traducido ("Cambiar a English"). */
  switchLabels: Record<Locale, string>;
  className?: string;
};

/** Guarda el idioma elegido un año; proxy.ts lo usa al entrar por una ruta sin idioma. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

// ES / EN del header (Figma: Header → locale). Conserva la ruta y guarda la elección para proxy.ts.
export function LocaleSwitcher({ current, label, switchLabels, className }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={cn("flex items-center", className)}>
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="text-mono px-1 text-muted-foreground">
              /
            </span>
          )}
          {locale === current ? (
            <span aria-current="true" className="text-mono px-2 py-3 text-foreground">
              {locale.toUpperCase()}
            </span>
          ) : (
            <Link
              href={switchLocalePath(pathname, locale)}
              hrefLang={locale}
              lang={locale}
              onClick={() => rememberLocale(locale)}
              className="text-mono rounded-sm px-2 py-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale.toUpperCase()}
              {/* El nombre accesible empieza por el texto visible ("EN · Switch to English"): WCAG 2.5.3. */}
              <span className="sr-only"> · {switchLabels[locale]}</span>
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
