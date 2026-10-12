"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, type ReactNode } from "react";

// Ficha de tecnología como panel (Figma TechPanel; BUNNY-RECORDS.md §5.2 paso 6): lateral en escritorio,
// hoja inferior en móvil, sobre la página atenuada. Tiene URL propia (ruta interceptada); cerrarlo = volver
// atrás, así la página queda como estaba. Base UI aporta trampa de foco y cierre con Esc.
export function TechPanel({ children, closeLabel, titleId }: { children: ReactNode; closeLabel: string; titleId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  // Enlace que abrió la ficha (al hacer clic recibe el foco): al cerrar, el foco vuelve a él.
  const [opener] = useState<HTMLElement | null>(() =>
    typeof document === "undefined" ? null : (document.activeElement as HTMLElement | null),
  );

  // Next oculta las rutas visitadas con Activity en vez de desmontarlas: sin esto, al reabrir la misma
  // ficha se restauraba el estado "cerrado" y el panel no aparecía. Al ocultarse, vuelve a quedar abierto.
  useLayoutEffect(() => () => setOpen(true), []);

  function close() {
    setOpen(false);
    router.back();
    window.setTimeout(() => opener?.isConnected && opener.focus(), 60);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && close()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-scrim/60 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          aria-labelledby={titleId}
          className="surface-lit fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-lg border border-border bg-card px-4 pt-3 pb-8 transition-transform duration-300 ease-out data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[28rem] md:rounded-l-lg md:rounded-tr-none md:px-8 md:pt-6 md:data-[ending-style]:translate-x-full md:data-[ending-style]:translate-y-0 md:data-[starting-style]:translate-x-full md:data-[starting-style]:translate-y-0"
        >
          <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-input md:hidden" />
          <Dialog.Close
            aria-label={closeLabel}
            className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-secondary md:top-5 md:right-5"
          >
            <X className="size-5" />
          </Dialog.Close>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
