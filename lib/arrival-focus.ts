// Foco al llegar a un álbum (mejora 45, WCAG 2.4.3). Al abrir un álbum desde la colección, el enlace pulsado
// desaparece (la colección queda oculta por <Activity>) y el foco caía en <body>: el siguiente Tab saltaba
// todo el álbum hasta la bandeja. La colección pide el foco al pulsar y el álbum lo coloca al montarse.
// Solo tras un clic o Enter en la colección: en una carga directa el foco se queda al inicio del documento.
let pending = false;

export function requestArrivalFocus() {
  pending = true;
}

/** Devuelve si había una petición pendiente y la consume. */
export function takeArrivalFocus() {
  const was = pending;
  pending = false;
  return was;
}

/** Enfoca sin desplazar, solo si el foco se ha perdido: en <body>, en un elemento que ya no está o en uno que ya no
 *  se ve (la página anterior sigue en el DOM, oculta por <Activity>). Se espera un fotograma a que se oculte. */
export function focusIfLost(target: () => HTMLElement | null | undefined) {
  requestAnimationFrame(() => {
    const element = target();
    if (!element) return;
    const current = document.activeElement;
    const lost = !current || current === document.body || !current.isConnected || current.getClientRects().length === 0;
    if (lost && element.isConnected) element.focus({ preventScroll: true });
  });
}
