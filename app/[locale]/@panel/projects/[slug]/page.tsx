// El panel no muestra nada en un álbum. Página propia en vez de dejarlo al [...catchAll]: con Partial Prefetching,
// los <Link prefetch> a varias pistas o álbumes compartían el segmento del catch-all y el último se volvía a pedir
// sin parar (~10 peticiones/s en producción). Con una ruta por cada destino, cada segmento tiene su clave. Mejora 43.
export default function PanelAlbum() {
  return null;
}
