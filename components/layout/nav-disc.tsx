"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

import { Disc, type DiscKind } from "@/components/brand/disc";
import { cn } from "@/lib/utils";

type NavDiscProps = { kind: DiscKind; href: string; label: string };

// Disco de la barra (Figma: NavDisc). Al abrir su sección, el disco "baja" a la escena (misma
// ViewTransition name que el disco grande) y aquí queda su hueco: aro discontinuo.
export function NavDisc({ kind, href, label }: NavDiscProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      prefetch
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full pr-1.5 pl-1.5 transition-colors md:pr-3.5",
        active ? "text-muted-foreground" : "text-foreground/90 hover:bg-secondary hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "relative size-8 shrink-0 rounded-full outline-offset-0",
          active ? "outline-[1.5px] outline-input outline-dashed" : "outline-[1.5px] outline-input outline-solid",
        )}
      >
        {!active && (
          <ViewTransition name={`disc-${kind}`} share="morph" default="none">
            <Disc kind={kind} className="size-8" />
          </ViewTransition>
        )}
      </span>
      <span className="text-body-sm hidden md:inline">{label}</span>
    </Link>
  );
}
