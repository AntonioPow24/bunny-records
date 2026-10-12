/** Primer elemento enfocable: salta al contenido sin recorrer el header (WCAG 2.4.1). */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#contenido"
      className="text-body-strong fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-primary px-5 py-3 text-primary-foreground transition-transform focus-visible:translate-y-0"
    >
      {label}
    </a>
  );
}
