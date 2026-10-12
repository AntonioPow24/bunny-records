import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CreditItem = { id: string; name: string; role: string; href: string };

// Créditos (Figma: CreditRow): tecnología · función en ESTE proyecto. Cada fila abre su ficha compartida.
export function CreditsList({ title, items }: { title: string; items: CreditItem[] }) {
  return (
    <section aria-labelledby="credits-title" className="flex flex-col gap-2">
      <h2 id="credits-title" className="text-h3">
        {title}
      </h2>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex min-h-12 items-center gap-4 rounded-md px-2 transition-colors hover:bg-accent"
            >
              <span className="text-body-strong shrink-0">{item.name}</span>
              <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-border" />
              <span className="text-body-sm text-right text-muted-foreground">{item.role}</span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
