# 0003 · Lienzo fijo con el plano z=0 calibrado a píxeles CSS

Fecha: 2026-11-11 · Estado: vigente · Sin ciclo.

## Contexto

La obra pide una tubería en three.js que el scroll recorre, con bridas que son las etapas de experiencia y una derivación que es el contacto. El contenido tiene que seguir siendo HTML legible, accesible y visible sin WebGL (`PRODUCT.md`, "Accessibility"; `.impeccable/surfaces/app-page-tsx.md:16`). Hay que lograr que lo que mide el navegador (dónde queda cada título) y lo que dibuja la escena coincidan, en cualquier ancho, con fuentes que cargan tarde.

## Decisión

1. **Un `<canvas>` fijo** a pantalla completa detrás del contenido: `position: fixed; inset: 0; z-index: 0; pointer-events: none` (`app/globals.css:95-103`), `aria-hidden` (`components/PipeScene.tsx:35`). La página va encima (`.page`, `z-index: 1`).
2. **Cámara en perspectiva con el plano z=0 calibrado a 1 unidad = 1 px CSS**: FOV 30 y `camZ = H / 2 / tan(FOV/2)` (`components/pipe-scene.ts:36-37`, `:254`). La escena no tiene coordenadas propias.
3. **El DOM manda.** Los elementos con `data-anchor` (`hero-pipe`, `spine`, `branch-run`), `data-flange` y `data-valve` son la única interfaz entre el HTML y la escena. `build()` los mide con `getBoundingClientRect` y rehace la geometría (`pipe-scene.ts:223-237`, `:239-377`). Tabla completa en [`../arquitectura/estructura.md`](../arquitectura/estructura.md), "Cómo se alinea el DOM con la escena".
4. **El scroll es del navegador.** La cámara solo baja con `scrollY` (`:401-403`); el paralaje del puntero mueve la cámara con `lookAt`, de modo que el plano de texto (z=0) no se desplaza y solo bridas, volantes y relieve se mueven contra él (`:402-403`, cabecera del módulo `:6-14`).
5. **Compuerta `html[data-gl]`**: el lienzo está transparente (`opacity: 0`) hasta que `PipeScene` pone `data-gl="on"`; mientras tanto, y si algo falla, se ve la **tubería pintada en CSS** (`app/globals.css:114-153`, `components/PipeScene.tsx:22-24`). Si el navegador pierde el contexto, vuelve a `off` hasta recuperarlo (`pipe-scene.ts:452-462`).
6. **three.js solo en el cliente**: `PipeScene` es un Client Component que usa `import()` dentro de un efecto, así el módulo y three (`three`, `RoomEnvironment`, `pipe-scene`) quedan fuera del prerender (`components/PipeScene.tsx:15-19`). Se usó `import()` en el efecto y no `next/dynamic` con `ssr: false`; el resultado es el mismo (código solo en el navegador).

## Alternativas descartadas

- **Tubería solo en CSS o SVG**: el pedido era three.js para tubería e instrumentos. Se conservó como fallback, que además es la primera imagen mientras carga la escena.
- **`@react-three/fiber`**: no se instaló; la escena es un módulo imperativo (`startScene`) que se reconstruye al medir el DOM. El motivo exacto del descarte no quedó registrado.
- **Escena con coordenadas propias y el HTML adaptado a ella**: contradice "el contenido manda y es legible sin WebGL".

## Consecuencias

- **El HTML no se puede reordenar a la ligera**: quitar o mover un `data-anchor` hace que `build()` salga sin dibujar (`if (!hero || !spine) return`, `:260`); la derivación depende de `branch-run` (`:328`). Añadir un hito es añadir `data-flange` a un elemento.
- Tamaño de la tubería: lo da `--pipe` en CSS; la escena lo deduce de `.spine` y `.hero-pipe` (`:263`).
- Coste: `devicePixelRatio` tope 1,5 en ≤720 px y 1,75 en el resto (`:251`); mapa de sombra de 1024 px en móvil y 2048 px en escritorio (`:370`); la escena se reconstruye al redimensionar y al cargar fuentes (`:430-440`). **Peso real en móvil sin medir** ([`../deuda.md`](../deuda.md) PORT-7).
- **Paridad de scroll DOM/canvas en dispositivo real sin verificar** (PORT-6): el canvas se redibuja en `requestAnimationFrame` y el DOM lo desplaza el navegador; un desfase de un cuadro en móvil es posible. No medido.
- La alineación depende de que el DOM esté en su posición final cuando corre `build()`; ver el riesgo con las revelaciones en [0004](./0004-aos-con-animaciones-plate-y-stage.md).
- El fallback CSS no pinta bridas, volantes ni la derivación (`app/globals.css:537-540`): sin WebGL se pierde la rama "A persona" como dibujo, no como texto.
- El módulo de la escena no tiene tests y es la pieza más frágil del sitio ([`../arquitectura/estructura.md`](../arquitectura/estructura.md)).
