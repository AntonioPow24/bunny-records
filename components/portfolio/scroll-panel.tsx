"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Suspense, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

// Panel con scroll del álbum. Vive en el layout (persiste entre pistas), así que conservaba la posición:
// al pasar de pista o volver a la lista se veía la mitad del contenido. En cada cambio de ruta vuelve
// arriba (él y <main>, que es quien hace scroll en móvil). useLayoutEffect: ocurre antes de que la
// View Transition capture la página nueva, así no se ve ningún salto.
// La lectura de la ruta vive en un hijo dentro de <Suspense> (ver components/layout/header.tsx), para
// no envolver el contenido de la pista.
export function ScrollPanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={className}>
      <Suspense>
        <ScrollToTop panel={ref} />
      </Suspense>
      {children}
    </div>
  );
}

function ScrollToTop({ panel }: { panel: RefObject<HTMLDivElement | null> }) {
  // La pista abierta (segmento bajo el álbum), no la URL: abrir el panel de una tecnología no debe subir el scroll.
  const track = useSelectedLayoutSegments().join("/");
  useLayoutEffect(() => {
    panel.current?.scrollTo({ top: 0 });
    document.getElementById("contenido")?.scrollTo({ top: 0 });
  }, [panel, track]);
  return null;
}
