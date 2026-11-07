import { notFound } from "next/navigation";
import { Suspense } from "react";

// Cualquier ruta inexistente bajo /es o /en (un enlace mal escrito) muestra la 404 "Lado C" del idioma, con
// cabecera y navegación. Sin esta ruta caía en app/global-not-found.tsx, sin marca y en los dos idiomas. Mejora 46.
// Comparte nombre con @panel/[...catchAll] (Next no admite dos comodines distintos en el mismo nivel).

// ensureStatic = "navigation" (layout del idioma) exige al menos un juego de parámetros; el resto se genera al
// pedirlo, como un slug de álbum inexistente.
export function generateStaticParams() {
  return [{ catchAll: ["404"] }];
}

// notFound() tras leer params y dentro de <Suspense>, como en el álbum: llamado de forma síncrona, Next servía
// una página de error vacía que solo se pintaba en el cliente.
export default function UnknownRoute({ params }: PageProps<"/[locale]/[...catchAll]">) {
  return (
    <Suspense>
      <Missing params={params} />
    </Suspense>
  );
}

async function Missing({ params }: Pick<PageProps<"/[locale]/[...catchAll]">, "params">) {
  await params;
  notFound();
  return null;
}
