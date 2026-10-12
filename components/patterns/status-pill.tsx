import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type ProjectStatusVariant = "published" | "in-development" | "planned";

// StatusPill de Figma. El estado se entiende por el texto y el glifo de la marca (+ / −), no solo por el color.
const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1",
  {
    variants: {
      status: {
        published: "bg-accent text-primary",
        "in-development": "bg-secondary text-foreground",
        planned: "bg-secondary text-muted-foreground",
      },
    },
  },
);

const glyphs: Record<ProjectStatusVariant, string> = {
  published: "+",
  "in-development": "+",
  planned: "−",
};

type StatusPillProps = {
  status: ProjectStatusVariant;
  /** Texto ya traducido (las capas ui/ y patterns/ no conocen los diccionarios). */
  label: string;
  className?: string;
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  return (
    <span className={cn(pillVariants({ status }), className)}>
      <span aria-hidden="true" className="text-mono">
        {glyphs[status]}
      </span>
      <span className="text-label">{label}</span>
    </span>
  );
}
