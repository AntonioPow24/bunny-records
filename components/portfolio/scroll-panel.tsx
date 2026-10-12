"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

// Panel con scroll del álbum. Vive en el layout (persiste entre pistas), así que conservaba la posición:
// al pasar de pista o volver a la lista se veía la mitad del contenido. En cada cambio de ruta vuelve
// arriba (él y <main>, que es quien hace scroll en móvil). useLayoutEffect: ocurre antes de que la
// View Transition capture la página nueva, así no se ve ningún salto.
export function ScrollPanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    ref.current?.scrollTo({ top: 0 });
    document.getElementById("contenido")?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
