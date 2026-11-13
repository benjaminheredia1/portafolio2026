# Decisiones

Una decisión no obvia por archivo: `NNNN-<slug>.md`, con las secciones Contexto, Decisión, Alternativas descartadas y Consecuencias. Las escribe el documentador a partir de los reportes o, sin ciclo, de lo construido y del encargo.

## Vigentes

| N.º | Decisión | Fecha |
|---|---|---|
| [0001](./0001-anton-en-vez-de-impact.md) | Anton en vez de Impact para el display (no depender de fuentes del sistema) | 2026-11-11 |
| [0002](./0002-barlow-para-texto-y-rotulos.md) | Barlow para el texto y Barlow Condensed para los rótulos, en vez de Bahnschrift | 2026-11-11 |
| [0003](./0003-lienzo-fijo-plano-z0-en-px.md) | Lienzo three.js fijo, plano z=0 calibrado a píxeles CSS, el DOM manda (`data-anchor`, `data-flange`) y compuerta `data-gl` con tubería en CSS de respaldo | 2026-11-11 |
| [0004](./0004-aos-con-animaciones-plate-y-stage.md) | AOS con dos gestos propios (`plate`, `stage`), un solo easing y compuerta `html.fx` | 2026-11-11 |

## Decisiones previas al código (sin archivo propio)

Existen fuera de `docs/decisiones/` y se enlazan en vez de duplicarse:

- Dirección visual "Colector de Planta" elegida entre cinco bocetos: [`.impeccable/surfaces/app-page-tsx.md`](../../.impeccable/surfaces/app-page-tsx.md) y [`.impeccable/mocks/decision/`](../../.impeccable/mocks/decision/). Desactualizada en las fuentes (Impact/Bahnschrift), ver 0001 y 0002.
- Posicionamiento, usuarios y principios: [`PRODUCT.md`](../../PRODUCT.md).

## Decisiones abiertas

Detalle en `PRODUCT.md`, "Decisiones abiertas". Estado tras construir la página:

| Decisión | Estado |
|---|---|
| Elección de librerías three.js y de revelado al scroll | **Resuelta**: three.js directo y AOS (0003, 0004). |
| Idioma del sitio | Se avanzó en español; sin confirmar con la persona ([`../deuda.md`](../deuda.md) PORT-13). |
| Canales de contacto | LinkedIn y un agregador publicados; correo y teléfono no; sin confirmar el conjunto final (PORT-8). |
| Presentación de los clientes freelance | Por nombre, bajo "Encargos"; sin confirmar (PORT-2). |
| Disponibilidad laboral | Sin decidir; el llamado cubre empleo y proyectos sin afirmar disponibilidad (PORT-13). |
| Nombre del empleador actual | "trabajito" publicado; sin confirmar (PORT-1). |
| CV (archivo y enlace) | No existe (PORT-3). |
| Dominio y hosting | Sin decidir; no hay configuración de despliegue en el repo. |
