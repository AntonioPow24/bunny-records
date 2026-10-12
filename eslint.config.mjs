import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Capas reutilizables (PORTFOLIO.md §7.2): no conocen el contenido, los idiomas ni las capas de página,
  // para poder extraerlas después a la UI Component Library.
  {
    files: ["components/{ui,patterns,brand,motion}/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/content",
                "@/content/*",
                "@/lib/content",
                "@/lib/content/*",
                "@/lib/i18n",
                "@/lib/i18n/*",
                "@/dictionaries/*",
                "@/components/portfolio/*",
                "@/components/sections/*",
                "@/components/layout/*",
                "@/components/bunny/*",
              ],
              message:
                "Las capas ui/patterns/brand/motion reciben todo por props (PORTFOLIO.md §7.2).",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Material de diseño y prototipos (no forman parte de la app)
    "design/**",
    "content-drafts/**",
  ]),
]);

export default eslintConfig;
