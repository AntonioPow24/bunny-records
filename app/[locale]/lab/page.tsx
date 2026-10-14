import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Logo } from "@/components/brand/logo";
import { StatusPill } from "@/components/patterns/status-pill";
import { Button } from "@/components/ui/button";
import { getAlbumMinutes, getProjects, getReadingMinutes, isPublished, loadTrackBody } from "@/lib/content";
import { getLocale } from "@/lib/i18n/get-dictionary";

// Banco de pruebas interno: sistema de diseño y contenido tipado (PORTFOLIO.md §3 y §6).
// Se compara con Figma → 01 Sistema. Solo existe en desarrollo: en el build de producción es un 404.
export const metadata: Metadata = {
  title: "Lab · sistema de diseño",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "background", hex: "#0C111C", className: "bg-background" },
  { name: "foreground", hex: "#F4F4F2", className: "bg-foreground" },
  { name: "card", hex: "#121927", className: "bg-card" },
  { name: "primary", hex: "#329DA8", className: "bg-primary" },
  { name: "primary-foreground", hex: "#080A0D", className: "bg-primary-foreground" },
  { name: "secondary", hex: "#182031", className: "bg-secondary" },
  { name: "accent", hex: "#112530", className: "bg-accent" },
  { name: "muted-foreground", hex: "#9BA3B0", className: "bg-muted-foreground" },
  { name: "border", hex: "#263042", className: "bg-border" },
  { name: "input", hex: "#6B7689", className: "bg-input" },
  { name: "teal-deep", hex: "#267B84", className: "bg-teal-deep" },
  { name: "destructive", hex: "#F2555A", className: "bg-destructive" },
];

const typeScale = [
  { name: "display", className: "text-display", sample: "Vidriería Antonio" },
  { name: "h2", className: "text-h2", sample: "Cómo lo construí" },
  { name: "h3", className: "text-h3", sample: "Créditos" },
  { name: "body", className: "text-body", sample: "Una vidriería local hacía buenos trabajos, pero no tenía dónde mostrarlos." },
  { name: "body-strong", className: "text-body-strong", sample: "Abrir proyecto" },
  { name: "body-sm", className: "text-body-sm", sample: "Propuesta, diseño y desarrollo · 5 min" },
  { name: "label", className: "text-label", sample: "Álbum · 2026" },
  { name: "mono", className: "text-mono", sample: "03   1 min" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t border-border pt-10">
      <h2 className="text-h3">{title}</h2>
      {children}
    </section>
  );
}

const statusLabels = { published: "Publicado", "in-development": "En desarrollo", planned: "Planeado" } as const;

async function ContentSection() {
  const locale = await getLocale();
  const all = getProjects();
  const album = all.find(isPublished);
  const track = album?.tracks[2];
  const TrackBody = album && track ? await loadTrackBody(album, track, locale) : null;

  return (
    <Section title={`Contenido (${locale})`}>
      <ul className="flex flex-col divide-y divide-border border-y border-border">
        {all.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
            <span className="text-body-strong">{p.title[locale]}</span>
            <StatusPill status={p.status} label={statusLabels[p.status]} />
            <span className="text-body-sm text-muted-foreground">{p.tagline[locale]}</span>
            {isPublished(p) && (
              <span className="text-mono text-muted-foreground">
                {p.tracks.length} pistas · {getAlbumMinutes(p, locale)} min
              </span>
            )}
          </li>
        ))}
      </ul>
      {album && track && TrackBody && (
        <article className="max-w-180 rounded-lg border border-border bg-card p-6">
          <p className="text-label text-primary">
            03 · {getReadingMinutes(album, track, locale)} min
          </p>
          <h3 className="text-h2 mb-4">{track.title[locale]}</h3>
          <TrackBody />
        </article>
      )}
    </Section>
  );
}

export default function LabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-12 px-4 py-16 md:px-6">
      <header className="flex items-center gap-4">
        <Logo title="Bunny Records" className="h-12" />
        <div>
          <p className="text-label text-primary">Lab · sistema de diseño</p>
          <h1 className="text-h2">Tokens y componentes</h1>
        </div>
      </header>

      <Section title="Color · semantic">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map((s) => (
            <li key={s.name} className="flex flex-col gap-1.5">
              <span className={`h-16 rounded-md border border-border ${s.className}`} />
              <span className="text-body-sm">{s.name}</span>
              <span className="text-mono text-muted-foreground">{s.hex}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografía">
        <ul className="flex flex-col gap-4">
          {typeScale.map((t) => (
            <li key={t.name} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
              <span className="text-mono w-40 shrink-0 text-muted-foreground">{t.name}</span>
              <span className={t.className}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Button">
        <div className="flex flex-wrap items-center gap-4">
          <Button>
            Abrir proyecto <ArrowRight />
          </Button>
          <Button variant="secondary">Mostrar todas</Button>
          <Button variant="ghost">Sobre mí</Button>
          <Button disabled>Deshabilitado</Button>
          <Button size="sm" variant="secondary">
            Copiar email
          </Button>
          <Button size="icon" variant="secondary" aria-label="Siguiente pista">
            <ArrowRight />
          </Button>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Usa Tab para ver el anillo de foco. Hover del primario: marfil con texto oscuro.
        </p>
      </Section>

      <Section title="StatusPill">
        <div className="flex flex-wrap gap-3">
          <StatusPill status="published" label="Publicado" />
          <StatusPill status="in-development" label="En desarrollo" />
          <StatusPill status="planned" label="Planeado" />
        </div>
      </Section>

      <ContentSection />

      <Section title="Zona marfil (.surface-ivory)">
        <div className="surface-ivory flex flex-wrap items-center gap-4 rounded-lg bg-background p-6 text-foreground">
          <p className="text-body-strong">Mismos componentes, tokens reasignados.</p>
          <Button>Primario sobre marfil</Button>
          <a href="#" className="text-primary underline">
            Enlace en teal-ink
          </a>
        </div>
      </Section>
    </div>
  );
}
