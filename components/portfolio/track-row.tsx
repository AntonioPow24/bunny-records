import Link from "next/link";
import { ViewTransition } from "react";

import { cn } from "@/lib/utils";

type TrackRowProps = {
  href: string;
  number: string;
  title: string;
  subtitle?: string;
  duration: string;
  /** Pista abierta: resaltada y sin enlace (ya estás en ella). */
  active?: boolean;
  /** Nombre de la transición compartida: la fila "sube" de la lista a la pista abierta. */
  transitionName: string;
};

// Fila de pista (Figma: TrackRow). La duración es el tiempo de lectura real del capítulo.
export function TrackRow({ href, number, title, subtitle, duration, active = false, transitionName }: TrackRowProps) {
  const content = (
    <>
      <span className={cn("text-mono w-8 shrink-0", active ? "text-primary" : "text-muted-foreground")}>{number}</span>
      <span className="min-w-0 flex-1">
        <span className="text-body-strong block">{title}</span>
        {subtitle && <span className="text-body-sm block truncate text-muted-foreground">{subtitle}</span>}
      </span>
      <span className="text-mono shrink-0 text-muted-foreground">{duration}</span>
    </>
  );
  const base = "flex min-h-14 items-center gap-4 rounded-md px-4 py-3";

  return (
    <ViewTransition name={transitionName} share="morph" default="none">
      {active ? (
        <div aria-current="page" className={cn(base, "surface-lit border border-primary bg-card")}>
          {content}
        </div>
      ) : (
        <Link href={href} className={cn(base, "transition-colors hover:bg-accent")}>
          {content}
        </Link>
      )}
    </ViewTransition>
  );
}
