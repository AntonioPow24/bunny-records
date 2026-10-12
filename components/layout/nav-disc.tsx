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
  const base = "inline-flex h-11 items-center gap-2 rounded-full pr-1.5 pl-1.5 md:pr-3.5";

  // Disco activo: su sección ya está en pantalla. No es un enlace (volver a pulsarlo relanzaba la
  // navegación y la transición sin sentido); queda como marcador de página actual con su hueco.
  if (active) {
    return (
      <span aria-current="page" className={cn(base, "text-muted-foreground")}>
        <span className="relative size-8 shrink-0 rounded-full outline-[1.5px] outline-input outline-dashed" />
        <span className="text-body-sm hidden md:inline">{label}</span>
        <span className="sr-only md:hidden">{label}</span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch
      aria-label={label}
      className={cn(base, "text-foreground/90 transition-colors hover:bg-secondary hover:text-foreground")}
    >
      <span className="relative size-8 shrink-0 rounded-full outline-[1.5px] outline-input outline-solid">
        <ViewTransition name={`disc-${kind}`} share="morph" default="none">
          <Disc kind={kind} className="size-8" />
        </ViewTransition>
      </span>
      <span className="text-body-sm hidden md:inline">{label}</span>
    </Link>
  );
}
