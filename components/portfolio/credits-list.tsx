import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Technology } from "@/types/content";

type CreditGroup = Technology["group"];
type CreditItem = { id: string; name: string; role: string; href: string; group: CreditGroup };

const GROUP_ORDER: CreditGroup[] = ["frontend", "backend", "design", "workflow"];

type CreditsListProps = {
  /** Único por página (los álbumes ocultos por <Activity> siguen en el DOM). */
  id: string;
  title: string;
  /** Resumen ya traducido: "10 créditos · 3 áreas". */
  summary: string;
  groupLabels: Record<CreditGroup, string>;
  items: CreditItem[];
};

// Créditos como notas de contraportada (mejora 4; Figma "Mejoras · T4"): agrupados por área, cada uno en una
// tarjeta con su función en este álbum arriba y la tecnología debajo. Las funciones son cortas a propósito
// (la ficha compartida ya no tiene textos propios). Cada tarjeta abre la ficha de la tecnología.
export function CreditsList({ id, title, summary, groupLabels, items }: CreditsListProps) {
  const groups = GROUP_ORDER.map((group) => ({ group, items: items.filter((i) => i.group === group) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 id={id} className="text-h3">
          {title}
        </h2>
        <p className="text-label text-muted-foreground">{summary}</p>
      </div>
      {groups.map(({ group, items: groupItems }) => (
        <div key={group} className="flex flex-col gap-2">
          <h3 className="text-label text-muted-foreground">
            {groupLabels[group]} · {groupItems.length}
          </h3>
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {groupItems.map((item) => (
              <li key={item.id} className="flex">
                <Link
                  href={item.href}
                  prefetch
                  transitionTypes={["panel"]}
                  className="group flex min-h-full w-full flex-col gap-1.5 rounded-md border border-border bg-card px-3.5 py-3 transition-colors hover:border-primary/60 hover:bg-accent"
                >
                  {/* Nombre primero en el DOM (lo que se lee al tabular); la función se ve arriba. */}
                  <span className="text-body-strong order-2">{item.name}</span>
                  <span className="order-1 flex items-start gap-2">
                    <span className="text-label flex-1 text-primary">{item.role}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-muted-foreground opacity-60 transition-opacity group-hover:text-primary group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
