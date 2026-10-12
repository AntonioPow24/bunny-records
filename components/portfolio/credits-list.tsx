type CreditItem = { id: string; name: string; role: string };

// Créditos (Figma: CreditRow): tecnología · función en ESTE proyecto. En el paso 9 cada fila abre su ficha.
export function CreditsList({ title, items }: { title: string; items: CreditItem[] }) {
  return (
    <section aria-labelledby="credits-title" className="flex flex-col gap-2">
      <h2 id="credits-title" className="text-h3">
        {title}
      </h2>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="flex min-h-12 items-center gap-4 rounded-md px-2">
            <span className="text-body-strong shrink-0">{item.name}</span>
            <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-border" />
            <span className="text-body-sm text-right text-muted-foreground">{item.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
