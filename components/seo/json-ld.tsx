// Datos estructurados (schema.org) en un <script>. Cada `<` se sustituye por la secuencia de escape JSON
// < para que ningún texto pueda cerrar la etiqueta con </script>. Ojo: en JS "<" ya es el propio
// "<"; el reemplazo necesita "\\u003c" (barra literal + u003c).
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
