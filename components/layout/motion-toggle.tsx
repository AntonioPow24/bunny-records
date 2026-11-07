"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";

import { applyMotionAttribute, setMotionPaused, useMotionPaused } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Botón de la cabecera para pausar o reanudar las animaciones de todo el sitio (lib/motion.ts). La etiqueta dice
// lo que pasará al pulsarlo; title la muestra al pasar el ratón.
export function MotionToggle({ labels, className }: { labels: { pause: string; resume: string }; className?: string }) {
  const paused = useMotionPaused();

  // Al cargar, aplica la preferencia guardada (y la mantiene si otra pestaña la cambia).
  useEffect(() => applyMotionAttribute(paused), [paused]);

  const label = paused ? labels.resume : labels.pause;
  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
    </button>
  );
}
