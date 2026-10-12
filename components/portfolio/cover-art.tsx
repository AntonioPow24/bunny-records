import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

type CoverArtProps = {
  src: StaticImageData;
  alt: string;
  title: string;
  /** Sello visible en planeados/en desarrollo ("Planeado"). */
  sticker?: string;
  /** sizes de next/image según dónde se use. */
  sizes: string;
  /** Imagen principal de la vista (LCP): carga inmediata y prioridad alta. */
  eager?: boolean;
  /** Tamaño del título: grande (portada central, cabecera) o pequeño. */
  titleSize?: "lg" | "sm" | "none";
  className?: string;
};

// Portada de álbum (Figma: Cover). Degradado inferior para que el título se lea sobre la imagen.
export function CoverArt({
  src,
  alt,
  title,
  sticker,
  sizes,
  eager = false,
  titleSize = "lg",
  className,
}: CoverArtProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-lg bg-card shadow-[0_16px_40px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="object-cover"
      />
      {titleSize !== "none" && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-brand-ink/85"
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 p-[6%] text-left text-foreground",
              titleSize === "lg" ? "text-h3" : "text-body-strong",
            )}
          >
            {title}
          </span>
        </>
      )}
      {sticker && (
        <span className="text-label absolute top-[5%] right-[5%] rounded-full bg-foreground px-2.5 py-1 text-background">
          {sticker}
        </span>
      )}
    </div>
  );
}
