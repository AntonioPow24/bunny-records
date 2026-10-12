"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Bunny } from "@/components/bunny/bunny";
import { Logo } from "@/components/brand/logo";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

import { LocaleSwitcher } from "./locale-switcher";
import type { NavItem } from "./nav-links";

type MobileNavProps = {
  items: NavItem[];
  locale: Locale;
  labels: { open: string; close: string; title: string; home: string; locale: string };
  switchLabels: Record<Locale, string>;
};

// Menú móvil abierto (Figma M13): pantalla completa, + en la página actual y − en el resto.
// Base UI Dialog aporta la trampa de foco, el cierre con Esc y devolver el foco al botón.
export function MobileNav({ items, locale, labels, switchLabels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={labels.open}
        className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-secondary md:hidden"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background px-4 pb-8 md:hidden">
          <Dialog.Title className="sr-only">{labels.title}</Dialog.Title>
          <div className="flex h-18 items-center justify-between">
            <Link href={`/${locale}`} aria-label={labels.home} onClick={() => setOpen(false)}>
              <Logo className="h-9" />
            </Link>
            <Dialog.Close
              aria-label={labels.close}
              className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <X className="size-6" />
            </Dialog.Close>
          </div>
          <nav className="mt-8">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const current = !item.href.includes("#") && pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="text-h2 flex min-h-14 items-center gap-3"
                    >
                      <span aria-hidden="true" className={cn(current ? "text-primary" : "text-muted-foreground")}>
                        {current ? "+" : "−"}
                      </span>
                      <span className={cn(current ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <LocaleSwitcher current={locale} label={labels.locale} switchLabels={switchLabels} className="mt-10" />
          <Bunny mode="lite" className="mx-auto mt-auto w-36" />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
