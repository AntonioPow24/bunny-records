"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/** Enlaces del header con aria-current en la página actual. */
export function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map((item) => {
        const current = !item.href.includes("#") && pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "text-body-sm inline-flex h-11 items-center rounded-full px-3 transition-colors hover:bg-secondary",
                current ? "text-foreground" : "text-foreground/85",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
