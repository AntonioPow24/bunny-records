"use client";

import { useCallback, useSyncExternalStore } from "react";

// Estado de interfaz que sobrevive al cambio de idioma. /es y /en tienen layouts raíz distintos, así que
// cambiar de idioma recarga el documento y el estado de React se pierde: se guarda en sessionStorage
// (solo esta pestaña). El idioma traduce textos; no debe cambiar lo que estabas viendo.

const cache = new Map<string, unknown>();
const listeners = new Set<() => void>();

function read<T>(key: string, fallback: T): T {
  if (!cache.has(key)) {
    let value: unknown = fallback;
    try {
      const raw = sessionStorage.getItem(`br:${key}`);
      if (raw !== null) value = JSON.parse(raw);
    } catch {
      // Sin almacenamiento (modo privado estricto, vista previa): se usa el valor por defecto.
    }
    cache.set(key, value);
  }
  return cache.get(key) as T;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Como useState, pero compartido por todas las páginas y persistente en la pestaña. `fallback` debe ser estable. */
export function useSessionState<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );
  const set = useCallback(
    (next: T) => {
      cache.set(key, next);
      try {
        sessionStorage.setItem(`br:${key}`, JSON.stringify(next));
      } catch {
        // Igual que al leer: sin almacenamiento, el estado vive solo en memoria.
      }
      listeners.forEach((l) => l());
    },
    [key],
  );
  return [value, set] as const;
}
