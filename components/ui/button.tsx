import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Variantes y estados del componente Button de Figma (01 Sistema → Componentes).
// Primario: fondo teal con texto ink (Ivory sobre Teal no llega a AA). Hover del primario: marfil.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium transition-colors select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
        secondary: "border-border bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-secondary",
      },
      size: {
        default: "h-12 px-5 text-base",
        sm: "h-11 px-4 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
