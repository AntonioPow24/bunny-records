import { useSyncExternalStore } from "react";

// Preferencia "Pausar animaciones" (mejora 49, WCAG 2.2.2): el disco que gira, el baile del conejo, la estática
// de NO SIGNAL y el visualizador se mueven solos más de 5 s. Con prefers-reduced-motion ya se paraban, pero es un
// ajuste del sistema poco conocido: este control lo ofrece en la propia página. Se guarda en este navegador.
const KEY = "br-motion";
export const MOTION_EVENT = "br-motion-change";

export function isMotionPaused(): boolean {
  try {
    return localStorage.getItem(KEY) === "paused";
  } catch {
    return false;
  }
}

export function setMotionPaused(paused: boolean) {
  try {
    if (paused) localStorage.setItem(KEY, "paused");
    else localStorage.removeItem(KEY);
  } catch {
    // Sin almacenamiento (modo privado estricto): vale para esta visita.
  }
  applyMotionAttribute(paused);
  window.dispatchEvent(new Event(MOTION_EVENT));
}

/** :root[data-motion="paused"] detiene las animaciones CSS (globals.css). */
export function applyMotionAttribute(paused: boolean) {
  if (paused) document.documentElement.dataset.motion = "paused";
  else delete document.documentElement.dataset.motion;
}

function subscribe(onChange: () => void) {
  window.addEventListener(MOTION_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(MOTION_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, isMotionPaused, () => false);
}
