# 0001 · Anton en vez de Impact para la tipografía display

Fecha: 2026-11-11 · Estado: vigente · Sin ciclo (construcción directa por pedido de la persona).

## Contexto

La superficie de diseño ([`.impeccable/surfaces/app-page-tsx.md:10`](../../.impeccable/surfaces/app-page-tsx.md)) y el boceto pedían **Impact** para el display (nombre, rótulos, "A PERSONA"). Impact es una fuente del sistema de Windows: no está en macOS, Linux ni Android, y el boceto no trae archivos de fuente. En esos dispositivos el nombre, que es la pieza principal del primer viewport, caería a una fuente genérica. Riesgo ya anotado antes de construir (antes ARR-9 en [`../deuda.md`](../deuda.md)).

La orden recibida fue no depender de fuentes del sistema. Esa regla no está escrita en este repo; consta en el encargo del orquestador. `Pendiente`: ubicar dónde queda escrita si se quiere citar.

## Decisión

Usar **Anton** (peso 400) de Google Fonts a través de `next/font/google`, expuesta como `--font-display` (`app/layout.tsx:5-9`) y usada en las reglas de display con la pila `var(--font-display), "Arial Narrow", sans-serif` (`app/globals.css:43`). Se aplica al nombre, los `h2`, las empresas, los años, "A persona" y los enlaces de contacto.

`next/font` descarga la fuente en el build y la sirve desde el mismo dominio.

## Alternativas descartadas

- **Dejar Impact**: no es portable (ver Contexto).
- **Autoalojar una fuente con licencia vía `next/font/local`**: no hay archivo de fuente en el repo y la persona no aportó uno. Sigue siendo posible si se prefiere otra.
- **Pila de respaldo medida (Impact, "Arial Narrow", sans-serif)**: depende igual del sistema del visitante.

## Consecuencias

- El tamaño del nombre (`min(10.2vw, 156px)`, `app/globals.css:283`) se calibró con Anton; otra familia obliga a recalibrar el `h1`, la altura de la tubería del héroe y las bridas decorativas.
- La escena mide el DOM: al cargar las fuentes se reconstruye (`components/pipe-scene.ts:440`) y AOS se refresca (`components/ScrollFX.tsx:25`). Si Anton fallara, el respaldo es "Arial Narrow" y la métrica cambia.
- El build y `dev` necesitan red para descargar la fuente. `Pendiente`: comprobar el build sin red ([`../pruebas/estrategia.md`](../pruebas/estrategia.md)).
- [`.impeccable/surfaces/app-page-tsx.md`](../../.impeccable/surfaces/app-page-tsx.md) sigue diciendo "Display Impact": está desactualizada en ese punto.
- Resuelve la deuda ARR-9 (display). La de texto, en [0002](./0002-barlow-para-texto-y-rotulos.md).
