"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Suspense, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

// Panel con scroll del álbum. Vive en el layout (persiste entre pistas), así que conservaba la posición:
// al pasar de pista o volver a la lista se veía la mitad del contenido. Por eso coloca el scroll en cada
// cambio de ruta (él y <main>, que es quien hace scroll en móvil). useLayoutEffect: ocurre antes de que la
// View Transition capture la página nueva, así no se ve ningún salto.
// La lectura de la ruta vive en un hijo dentro de <Suspense> (ver components/layout/header.tsx), para
// no envolver el contenido de la pista.
export function ScrollPanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={className}>
      <Suspense>
        <ScrollPosition panel={ref} />
      </Suspense>
      {children}
    </div>
  );
}

// Busca la fila solo entre lo visible: las páginas ocultas por <Activity> tienen las mismas filas.
function findRow(panel: HTMLElement, slug: string) {
  const rows = panel.querySelectorAll<HTMLElement>(`[data-track-row="${slug}"]`);
  return Array.from(rows).find((row) => row.getClientRects().length > 0);
}

function ScrollPosition({ panel }: { panel: RefObject<HTMLDivElement | null> }) {
  // La pista abierta (segmento bajo el álbum), no la URL: abrir el panel de una tecnología no debe mover el scroll.
  const track = useSelectedLayoutSegments().join("/");
  const previous = useRef<string | null>(null);

  // <Activity> desmonta los efectos al ocultar el álbum: al volver a él, se entra de nuevo por el inicio.
  useLayoutEffect(
    () => () => {
      previous.current = null;
    },
    [],
  );

  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = track;
    const element = panel.current;
    if (!element) return;

    // Entrada al álbum o a una pista por enlace directo: arriba, con la portada y el resumen.
    if (from === null) {
      element.scrollTo({ top: 0 });
      document.getElementById("contenido")?.scrollTo({ top: 0 });
      return;
    }

    // Pista abierta: su fila arriba y el texto debajo. De vuelta a la lista: a la vista la pista de la que se viene.
    const slug = track || from;
    const place = (row: HTMLElement) =>
      row.scrollIntoView({ behavior: "instant", block: track ? "start" : "center" });

    const row = findRow(element, slug);
    if (row) {
      place(row);
      return;
    }

    // La página nueva aún no ha salido de su <Suspense> (sin prefetch, en una red lenta): se coloca al llegar.
    const observer = new MutationObserver(() => {
      const arrived = findRow(element, slug);
      if (!arrived) return;
      observer.disconnect();
      place(arrived);
    });
    observer.observe(element, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [panel, track]);

  return null;
}
