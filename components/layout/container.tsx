import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Ancho de contenido de Figma: 1200 px (1440 − 2 × 120) con márgenes de 16/24 px. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-312 px-4 md:px-6", className)} {...props} />;
}
