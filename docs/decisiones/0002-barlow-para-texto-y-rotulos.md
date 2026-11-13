# 0002 · Barlow y Barlow Condensed para texto y rótulos

Fecha: 2026-11-11 · Estado: vigente · Sin ciclo.

## Contexto

La dirección pedía **Bahnschrift** para el texto (rol, ciudad y el resto), otra fuente exclusiva de Windows ([`.impeccable/surfaces/app-page-tsx.md:10`](../../.impeccable/surfaces/app-page-tsx.md)). Misma razón que en [0001](./0001-anton-en-vez-de-impact.md): no depender de fuentes del sistema. La plantilla de create-next-app traía Geist, pero el `body` la anulaba con Arial (`ARR-3`) y no forma parte del mundo "Colector de Planta".

## Decisión

Dos familias de Google Fonts por `next/font/google` (`app/layout.tsx:11-21`):

| Uso | Familia | Pesos | Variable |
|---|---|---|---|
| Prosa, listas, `dd` | Barlow | 400, 500, 600 | `--font-body` (`body` la usa en `app/globals.css:72`) |
| Rótulos en mayúsculas con interletrado (rol, lugar, `dt`, `.role-line`, pie, leyendas) | Barlow Condensed | 500, 600 | `--font-label` → `--font-label-stack` (`app/globals.css:44`) |

Con Anton para el display ([0001](./0001-anton-en-vez-de-impact.md)), el sitio usa tres fuentes. Los rótulos condensados con tracking amplio reproducen el aire industrial del boceto sin depender del sistema.

## Alternativas descartadas

- **Bahnschrift**: no portable.
- **Geist (la de la plantilla)**: ajena al mundo visual; se retiró junto con el modo oscuro.
- **Una sola familia para texto y rótulos**: no se registró un motivo para el descarte. `Pendiente` si hace falta justificarlo.

## Consecuencias

- Tres fuentes descargadas en el primer render; el coste de carga en conexión móvil lenta no está medido.
- El cuerpo es `clamp(17px, 1.3vw, 19px)` (`app/globals.css:73`); el tamaño se eligió con Barlow.
- Quita Geist y `--font-sans`/`--font-mono` de `@theme inline`: ya no hay `@theme` en el CSS ([`../arquitectura/estructura.md`](../arquitectura/estructura.md), "Estilos").
- Resuelve ARR-3 y ARR-9 en [`../deuda.md`](../deuda.md).
