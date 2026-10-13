import { cn } from "@/lib/utils";

import { EAR_PATH, FACE_PATH } from "./logo";

export type DiscKind = "about" | "contact" | "side-c";

type DiscProps = {
  kind: DiscKind;
  /** Texto de la etiqueta (solo en el disco grande). */
  label?: string;
  /** Gira despacio (escena). Se detiene con prefers-reduced-motion. */
  spinning?: boolean;
  /** Conejo en la etiqueta (por defecto sí). Los sobres de créditos lo quitan: solo asoma el borde del disco. */
  bunny?: boolean;
  /** Color de la etiqueta, si no es el de su tipo (sobres de créditos: un tono por lado). */
  tone?: "teal" | "ivory" | "deep";
  className?: string;
};

// Vinilo de Sobre mí (etiqueta teal), Contacto (etiqueta marfil) y 404 (lado "C", rayado; Figma D12).
// Figma: DiscGraphic.
// Decorativo: el nombre accesible lo pone el enlace o la sección que lo contiene.
export function Disc({ kind, label, spinning = false, bunny = true, tone, className }: DiscProps) {
  const toneFill = { teal: "var(--primary)", ivory: "var(--foreground)", deep: "var(--teal-deep)" } as const;
  const labelFill = tone ? toneFill[tone] : kind === "contact" ? "var(--foreground)" : "var(--primary)";
  const gradientId = `disc-shine-${kind}`;
  return (
    <svg
      viewBox="0 0 420 420"
      aria-hidden="true"
      className={cn("block aspect-square", spinning && "disc-spin", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="210" cy="210" r="209" fill="var(--scrim)" stroke="var(--border)" strokeWidth="2" />
      {[194, 176, 158, 140, 122, 104].map((r) => (
        <circle key={r} cx="210" cy="210" r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" opacity="0.8" />
      ))}
      <circle cx="210" cy="210" r="209" fill={`url(#${gradientId})`} />
      <circle cx="210" cy="210" r="80" fill={labelFill} />
      {kind === "side-c" ? (
        <>
          <text x="210" y="234" textAnchor="middle" fill="#080A0D" style={{ font: "700 76px var(--font-display)" }}>
            C
          </text>
          {/* La raya: un arco claro que cruza los surcos hasta la etiqueta. */}
          <path d="M58 292 Q112 214 182 298" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </>
      ) : bunny ? (
      <svg x="187" y="150" width="46" height="53" viewBox="0 0 800 922">
        <path d={EAR_PATH} fill="#080A0D" />
        <path d={FACE_PATH} fill="#F4F4F2" />
        <path
          d="M196.5 681H261M228.5 648.5V713.5M558.5 681H623.5M591 648.5V713.5"
          fill="none"
          stroke="#080A0D"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <rect x="347" y="731" width="123" height="41" rx="20.5" fill="#080A0D" />
      </svg>
      ) : null}
      {label && (
        <text
          x="210"
          y="244"
          textAnchor="middle"
          fill="var(--primary-foreground)"
          style={{ font: "500 13px var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {label}
        </text>
      )}
      <circle cx="210" cy="268" r="6" fill="var(--background)" />
    </svg>
  );
}
