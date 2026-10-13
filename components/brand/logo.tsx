import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type LogoProps = {
  /** Nombre accesible ya traducido. Sin él, el logo es decorativo. */
  title?: string;
  className?: string;
};

// Logo oficial (design/logo/bunny-logo.svg). Los colores son arte de marca, no tokens de interfaz.
export const EAR_PATH =
  "M378.9 383.3C387.5 385.1 435.4 385.2 444 383.3C460.8 276.4 486 154.6 561.5 71.5C599.7 29.4 660.8 -5.9 718.5 19.3C771.7 42.5 790.7 101 795.5 154.5C807 280.6 749.7 397.7 682.2 500.5C690.1 511.6 700.5 521.5 709.1 532.5C733.5 563.5 749.6 598.5 759.1 636.5C787 748.1 722.4 837 623.5 882.8C509.2 935.7 291.3 932 175.5 885.1C69.4 842.2 19.5 717.2 62.3 612.5C75.6 580 94.9 550.5 118.5 524.5C127.3 514.9 137.2 506.4 145.5 496.5C134.7 472.5 118.2 450 105.8 426.5C71.8 362.1 43.2 285.8 40.5 212.5C38.8 165.3 46.1 116.6 72.9 76.5C119.7 6.5 207.6 -13 269.5 49.5C324.7 105.2 356.2 219.2 368.4 295.5C373 324.6 373.6 354.6 378.9 383.3Z";
export const FACE_PATH =
  "M337.5 430.5C352.1 435.4 370.2 426.9 385.5 425.5C398.4 424.4 412.5 423.3 425.5 424.5C442.1 426 468.7 435.1 483.5 430.7C487.3 427.1 490.2 424.7 491.8 419.5C494.4 410.9 492.2 400.4 493.6 391.5C497.1 369.5 499.3 347.5 503.6 325.5C517.4 255 540.7 178.3 583.1 119.5C599.7 96.6 619.9 70.6 647.5 60.5C686.3 46.4 717.3 67.7 734.8 102.5C757.7 148.3 751.8 206.2 742.4 254.5C729.8 318.8 700.2 381 666.1 436.5C660 446.5 649.3 467.5 640.5 474.3C632.8 480.2 614.9 475.3 615.5 497.5C615.6 501.6 617.6 506.2 619.9 509.5C624.6 516.2 633.4 521 639.5 526.5C653.2 539 665.3 553.5 676.1 568.5C720.4 629.8 729 709.4 688.7 774.5C660.6 820 609 847.5 558.5 860.6C458 886.6 312.8 889.3 214.5 853.5C101.1 812.2 61.2 688.6 127.2 588.5C141.9 566.2 159.6 544.5 180.5 527.9C192.5 518.3 209.6 510.1 207.5 492.5C205.8 478.7 194.3 481.4 189.3 474.5C175.8 456 164.4 434.7 153.8 414.5C121.5 353.3 79.3 246.2 90.4 176.5C97.4 131.8 105.8 90.3 148.5 64.9C190.6 39.8 229.8 70.5 253.2 105.5C294.1 166.8 317.8 266.5 324.5 339.5C325.7 353.5 327.2 367.5 328.5 381.5C329.6 393.8 327.3 407.4 329.6 419.5C330.7 424.6 334 427.2 337.5 430.5Z";

export function Logo({ title, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 922"
      className={cn("h-9 w-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={EAR_PATH} fill="#329DA8" transform="translate(-38 -9)" />
      <path d={EAR_PATH} fill="#080A0D" />
      <path d={FACE_PATH} fill="#F4F4F2" />
      <path
        d="M196.5 681H261M228.5 648.5V713.5M558.5 681H623.5M591 648.5V713.5"
        fill="none"
        stroke="#080A0D"
        strokeWidth="25"
        strokeLinecap="round"
      />
      <rect x="347" y="731" width="123" height="41" rx="20.5" fill="#080A0D" />
    </svg>
  );
}

type BunnyMarkProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  /** Oreja teal desplazada detrás, como en el logo: da borde al conejo sobre fondo oscuro. */
  shadow?: boolean;
};

// El conejo del logo sin texto ni accesibilidad propia: etiquetas de vinilo y fundas de créditos.
export function BunnyMark({ shadow = false, ...props }: BunnyMarkProps) {
  return (
    <svg viewBox={shadow ? "-38 -9 838 931" : "0 0 800 922"} aria-hidden="true" {...props}>
      {shadow && <path d={EAR_PATH} fill="#329DA8" transform="translate(-38 -9)" />}
      <path d={EAR_PATH} fill="#080A0D" />
      <path d={FACE_PATH} fill="#F4F4F2" />
      <path
        d="M196.5 681H261M228.5 648.5V713.5M558.5 681H623.5M591 648.5V713.5"
        fill="none"
        stroke="#080A0D"
        strokeWidth="25"
        strokeLinecap="round"
      />
      <rect x="347" y="731" width="123" height="41" rx="20.5" fill="#080A0D" />
    </svg>
  );
}
