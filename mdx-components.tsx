import type { MDXComponents } from "mdx/types";

// Estilos de los capítulos (pistas) con los tokens del sistema de diseño. Obligatorio para @next/mdx.
const components: MDXComponents = {
  h2: (props) => <h2 className="text-h3 mt-8 mb-3" {...props} />,
  h3: (props) => <h3 className="text-body-strong mt-6 mb-2" {...props} />,
  p: (props) => <p className="text-body mb-4 text-foreground" {...props} />,
  ul: (props) => <ul className="text-body mb-4 flex list-none flex-col gap-2" {...props} />,
  li: (props) => (
    <li className="relative pl-5 before:absolute before:left-0 before:text-primary before:content-['+']" {...props} />
  ),
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  a: (props) => <a className="text-primary underline underline-offset-4 hover:text-foreground" {...props} />,
  code: (props) => <code className="text-mono rounded-sm bg-secondary px-1.5 py-0.5" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
