# Deuda

Hallazgos medios y bajos que quedaron abiertos, con ID y `archivo:línea`. Se quita lo que se resuelve. Las rondas y severidades están definidas en el contrato del ciclo (`~/.claude/skills/ciclo/contrato.md`). Actualizada el 2026-11-11, tras construir la página (sin ciclo del loop).

## Del esqueleto (create-next-app) que siguen abiertas

| ID | Qué | Dónde | Estado |
|---|---|---|---|
| ARR-6 | SVG de plantilla sin uso (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) y favicon de plantilla | `public/`, `app/favicon.ico` | abierta; ya nadie los referencia (grep en `app/` y `components/`) |
| ARR-7 | No hay script `test`, ni runner, ni CI | `package.json:5-10` | abierta (ver [`pruebas/estrategia.md`](./pruebas/estrategia.md)) |
| ARR-8 | `package-lock.json` suelto fuera del repo provoca un aviso en `build` y `start`; se silencia fijando `turbopack.root` | `next.config.ts:3-15` | abierta, decisión de la persona |
| ARR-10 | Todo el sitio está sin commitear: `app/*` modificados, `components/`, `docs/`, `PRODUCT.md`, `.impeccable/` | raíz | abierta, decisión de la persona |

## Del portafolio (construido el 2026-11-11, sin ciclo)

Severidad: **media** = puede publicar algo no confirmado o dejar sin cumplir un objetivo del producto; **baja** = pulido o riesgo no medido.

| ID | Sev. | Qué | Dónde | Estado |
|---|---|---|---|---|
| PORT-1 | media | El empleador actual se publica como "trabajito"; `PRODUCT.md` dice que parece provisional. Confirmar el nombre o quitarlo. | `app/page.tsx:167` | abierta, la confirma la persona |
| PORT-2 | media | Los clientes freelance (Boring Ventures, Rocaz Soluciones, UTEPSA) se presentan por nombre bajo "Encargos"; la presentación (por nombre o agrupados) no está confirmada. | `app/page.tsx:315-345` | abierta, la confirma la persona |
| PORT-3 | media | No hay CV: ni archivo ni enlace. El éxito del sitio incluye "abrir el CV". | `app/page.tsx:357-367`, `public/` | abierta: falta el archivo y decidir si se publica |
| PORT-4 | baja | Las capturas de revisión (`.impeccable/review/*.png`) se tomaron a mano; el comando no quedó registrado y no hay regresión visual. | `.impeccable/review/` | abierta |
| PORT-5 | baja | Contraste del nombre sobre la tubería **renderizada en 3D** sin medir; la tubería de CSS tiene franjas de 3,05 : 1 en el borde. | `app/globals.css:23-40`, `components/pipe-scene.ts:90-139` | abierta |
| PORT-6 | media | Paridad de scroll DOM/canvas sin verificar en dispositivo real (desfase de cuadro en móvil con inercia). Además, riesgo de que las bridas queden hasta 36 px más abajo si `build()` corre con etapas sin revelar ([0004](./decisiones/0004-aos-con-animaciones-plate-y-stage.md)). | `components/pipe-scene.ts:223-237`, `:401-403`, `app/globals.css:598-606` | abierta |
| PORT-7 | media | Peso del render en móvil real sin medir (sombras, `MeshPhysicalMaterial`, reconstrucción al redimensionar). Hay topes de `devicePixelRatio` y de mapa de sombra, no medidos. | `components/pipe-scene.ts:251`, `:370`, `:430-440` | abierta |
| PORT-8 | baja | Correo y teléfono no se publican a propósito. Qué canales se publican es decisión abierta; no se sabe qué muestra el agregador "Todos mis canales" (si expone datos privados). | `app/page.tsx:357-367` | abierta, la persona decide |
| PORT-9 | baja | Con `prefers-reduced-motion` siguen ligados al scroll el giro del volante y las agujas Señal y Recorrido (`ScrollFX` no mira `reduce` en el `tick`). Decidir si se apagan. | `components/ScrollFX.tsx:33-51`, `components/pipe-scene.ts:411`, `app/globals.css:214-224` | abierta |
| PORT-10 | baja | Sin capturas de proyectos reales ni foto; el sitio se arma solo con trayectoria y texto (no se fabrican). | `app/page.tsx` | abierta, depende de material de la persona |
| PORT-11 | baja | `--green` no se usa (las lámparas usan `#5f8a3a` literal). Unificar o quitar. | `app/globals.css:16`, `:255` | abierta |
| PORT-12 | baja | Un error dentro del bucle de animación o en una reconstrucción posterior al arranque no devuelve el sitio a la tubería de CSS (`data-gl` solo vuelve a `off` por contexto perdido o fallo de arranque). | `components/pipe-scene.ts:414-420`, `components/PipeScene.tsx:14-25` | abierta |
| PORT-13 | baja | Idioma del sitio (se avanzó en español) y disponibilidad laboral (empleo, freelance o ambos) sin confirmar con la persona; versión en inglés no existe. | `app/layout.tsx:32`, `app/page.tsx:352-355` | abierta, la persona decide |
| PORT-14 | baja | `README.md` de la raíz sigue siendo el de create-next-app; la `metadata` no tiene Open Graph ni imagen social. | `README.md`, `app/layout.tsx:23-27` | abierta |
| PORT-15 | baja | Build y dev dependen de la descarga de Google Fonts; comportamiento sin red sin comprobar. | `app/layout.tsx:2-21` | abierta |

## Resueltas el 2026-11-11 (al construir la página)

ARR-1 (`metadata` real), ARR-2 (`lang="es"`; lo que queda es PORT-13), ARR-3 (fuente del `body`), ARR-4 (sin modo oscuro: `app/globals.css` ya no tiene `prefers-color-scheme: dark`), ARR-5 (home de bienvenida reemplazada), ARR-9 (fuentes portables: [0001](./decisiones/0001-anton-en-vez-de-impact.md) y [0002](./decisiones/0002-barlow-para-texto-y-rotulos.md)).
