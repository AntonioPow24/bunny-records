"use client";

import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

import { Perforations } from "./demo-clip";
import "./no-signal.css";

type NoSignalProps = {
  /** Número de canal ya formateado ("03"): decorativo. */
  channel: string;
  labels: { caption: string; description: string };
  className?: string;
};

// Pantalla "sin señal" para un álbum publicado que aún no tiene videoclip (Figma T34; BUNNY-RECORDS.md §5.2.1).
// Misma ventana de película que DemoClip, pero no es un control: no hay nada que pausar ni ampliar. La estática y
// la banda de luz (no-signal.css) se detienen fuera de pantalla y no existen con movimiento reducido.
export function NoSignal({ channel, labels, className }: NoSignalProps) {
  const screen = useRef<HTMLDivElement>(null);
  const maskId = useId();

  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.dataset.paused = String(!entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <figcaption className="text-label flex items-center gap-2 text-primary">
        <span aria-hidden="true" className="h-3 w-1 rounded-full bg-primary" />
        {labels.caption}
      </figcaption>
      <div className="surface-lit flex items-start gap-2 rounded-md border border-border bg-card p-2">
        <Perforations />
        <div
          ref={screen}
          role="img"
          aria-label={labels.description}
          className="no-signal relative aspect-video min-w-0 flex-1 overflow-hidden rounded-sm bg-background"
        >
          <span aria-hidden="true" className="no-signal-static" />
          <span aria-hidden="true" className="no-signal-lines" />
          <span aria-hidden="true" className="no-signal-band" />
          <span aria-hidden="true" className="no-signal-vignette" />
          <span aria-hidden="true" className="text-mono absolute top-2 left-2 rounded-[2px] bg-primary px-1.5 text-[0.5625rem] leading-4 text-primary-foreground">
            CH {channel}
          </span>
          <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-[6%] text-foreground">
            {/* Logo de design/logo/bunny-logo-mono-ivory.svg: la cara es un recorte y deja ver la estática. */}
            <svg viewBox="0 0 800 922" className="h-[42%] w-auto">
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="922">
                <rect width="800" height="922" fill="#fff" />
                <path
                  d="M196.5 681H261M228.5 648.5V713.5M558.5 681H623.5M591 648.5V713.5"
                  fill="none"
                  stroke="#000"
                  strokeWidth="25"
                  strokeLinecap="round"
                />
                <rect x="347" y="731" width="123" height="41" rx="20.5" fill="#000" />
              </mask>
              <path
                d="M378.9 383.3C387.5 385.1 435.4 385.2 444 383.3C460.8 276.4 486 154.6 561.5 71.5C599.7 29.4 660.8 -5.9 718.5 19.3C771.7 42.5 790.7 101 795.5 154.5C807 280.6 749.7 397.7 682.2 500.5C690.1 511.6 700.5 521.5 709.1 532.5C733.5 563.5 749.6 598.5 759.1 636.5C787 748.1 722.4 837 623.5 882.8C509.2 935.7 291.3 932 175.5 885.1C69.4 842.2 19.5 717.2 62.3 612.5C75.6 580 94.9 550.5 118.5 524.5C127.3 514.9 137.2 506.4 145.5 496.5C134.7 472.5 118.2 450 105.8 426.5C71.8 362.1 43.2 285.8 40.5 212.5C38.8 165.3 46.1 116.6 72.9 76.5C119.7 6.5 207.6 -13 269.5 49.5C324.7 105.2 356.2 219.2 368.4 295.5C373 324.6 373.6 354.6 378.9 383.3Z"
                fill="currentColor"
                mask={`url(#${maskId})`}
              />
            </svg>
            <span className="text-mono pl-[0.32em] tracking-[0.32em]">NO SIGNAL</span>
          </div>
        </div>
        <Perforations />
      </div>
    </figure>
  );
}
