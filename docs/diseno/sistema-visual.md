# Sistema visual

Generado: 2026-11-11 · commit `cfdc665` · cambios sin commitear en lo citado: **sí**.

**Estado: implementado.** Los tokens de abajo salen de `app/globals.css`, `app/layout.tsx` y `components/pipe-scene.ts`, no del boceto. Donde el código se aparta del boceto ("Colector de Planta"), manda el código y se anota. Ficha de la página: [`../features/portafolio.md`](../features/portafolio.md).

Fuentes de la dirección (siguen vigentes como intención, no como valores):
1. [`.impeccable/surfaces/app-page-tsx.md`](../../.impeccable/surfaces/app-page-tsx.md): tesis, mundo, historia, primer viewport, forma. **Desactualizada en un punto**: dice "Display Impact, texto Bahnschrift"; el sitio usa Anton y Barlow ([0001](../decisiones/0001-anton-en-vez-de-impact.md), [0002](../decisiones/0002-barlow-para-texto-y-rotulos.md)).
2. [`.impeccable/mocks/decision/assigned.html`](../../.impeccable/mocks/decision/assigned.html): boceto de 1440x900.
3. [`PRODUCT.md`](../../PRODUCT.md): producto, usuarios, principios, accesibilidad.

Tesis (`app-page-tsx.md:8`): el trabajo de Benjamin es hacer que una señal viaje limpia por varios sistemas hasta una persona; el sitio es esa línea de proceso vista desde dentro. Escena física: sala de máquinas con luz de tubo fluorescente; la tubería cruza el muro. Material: concreto gris, tubería amarilla, bridas, manómetros, lámparas piloto, volante rojo.

Alternativas descartadas en la ronda de decisión (siguen en `.impeccable/mocks/decision/`, no usarlas como referencia): "Retícula Crouwel", "Cuarto Oscuro", "Cartel de Calle", "Anillos".

## Colores

| Token | Valor | Dónde se usa | Ancla |
|---|---|---|---|
| `--wall` | `#d7dad0` | fondo de `html` y `body` | `app/globals.css:9`, `:56`, `:63` |
| `--wall-deep` | `#c6cabf` | pista de la barra de scroll | `app/globals.css:10`, `:58` |
| `--ink` | `#20272c` | texto, marcas del manómetro, filetes de 3 px, subrayado | `app/globals.css:11` |
| `--ink-soft` | `#3a444b` | texto secundario (`.meta`, `.place`, `dt`, `.langs`, `.foot`, guía punteada) | `app/globals.css:12` |
| `--yellow` | `#e3b01a` | selección, subrayado de enlaces de contacto, lámpara ámbar | `app/globals.css:13`, `:78-81`, `:563` |
| `--yellow-deep` | `#a87d06` | viñetas de `.points`, barra de scroll | `app/globals.css:14`, `:58`, `:478` |
| `--red` | `#a3231a` | rol de cada etapa, "A PERSONA", aguja, foco | `app/globals.css:15`, `:89`, `:208`, `:427`, `:545` |
| `--green` | `#4f7d32` | **sin uso** ([`deuda.md`](../deuda.md) PORT-11) | `app/globals.css:16` |
| Aro del manómetro | `#2b3338` (literal) | `.g-rim` | `app/globals.css:192-194` |
| Cara del manómetro | `#eceee4` (literal) | `.g-face` | `app/globals.css:195-197` |
| Borde de lámpara | `#1b2125` (literal) | `.lamp` | `app/globals.css:248` |
| Lámpara OK / atención | `#5f8a3a` / `#e7b41c` (literales) | `.lamp.green`, `.lamp.amber` (parpadea 2,4 s) | `app/globals.css:254-270` |

Diferencias frente al boceto: muro `#d9dcd2` → `#d7dad0`; tinta `#2b3338` → `#20272c` (el aro del manómetro conserva `#2b3338`); rojo `#c4372a` → `#a3231a`.

Tubería pintada en CSS (solo el fallback): `--pipe-paint` y `--pipe-paint-v`, degradado de `#8f6a00` a `#6e5000` con luz `#f6d25a` en 46 % (`app/globals.css:23-40`).

Paleta de la escena three.js (`components/pipe-scene.ts`): tubería `0xe3b01a` (`:91`), bridas y válvulas `0xcf9d10` (`:52`), pernos `0x4b5258` (`:57`), volante `0xb3281d` (`:62`), acero `0x7a8187` (`:67`), sombra del muro `0x1b1a12` al 30 % (`:71`). Luces: hemisférica `0xf4f1e6`/`0x6b6a5a` a 0,55 (`:39`), direccional `0xfff1d6` a 2,6 (`:41`), `RoomEnvironment` al 0,5 (`:34`).

### Contraste (calculado el 2026-11-11 con la fórmula WCAG 2.x sobre los tokens CSS)

| Par | Razón |
|---|---|
| `--ink` sobre `--wall` | 10,68 : 1 |
| `--ink-soft` sobre `--wall` | 7,03 : 1 |
| `--red` sobre `--wall` | 5,27 : 1 |
| `--ink-soft` sobre `--wall-deep` | 5,98 : 1 |
| `--ink` sobre cara del manómetro `#eceee4` | 12,91 : 1 |
| `--ink` sobre la tubería de CSS: `#f6d25a` / `#e7b41c` / `#b98a07` / `#8f6a00` | 10,29 / 7,88 / 4,83 / 3,05 : 1 |

El muro real lleva ruido y juntas, así que las razones sobre `--wall` son aproximadas. **No medido**: el nombre "BENJAMIN HEREDIA" sobre la tubería **renderizada en three.js** (la luz varía a lo largo del tubo) y la franja de `#8f6a00` del borde de la tubería de CSS (3,05 : 1: pasa el mínimo de 3 : 1 del texto grande y no el de 4,5 : 1 del texto normal; el nombre es texto grande). `Pendiente`: medir con herramienta sobre captura ([`deuda.md`](../deuda.md) PORT-5).

## Tipografía

Fuentes cargadas con `next/font/google` (`app/layout.tsx:5-21`):

| Rol | Familia y pesos | Variable → pila | Ancla |
|---|---|---|---|
| Display (nombre, `h2`, empresas, años, enlaces de contacto) | Anton 400 | `--font-display` → `--font-display-stack` = fuente, `"Arial Narrow"`, `sans-serif` | `app/layout.tsx:5-9`, `app/globals.css:43` |
| Texto | Barlow 400, 500, 600 | `--font-body`; `body` usa `var(--font-body), Arial, sans-serif` | `app/layout.tsx:11-15`, `app/globals.css:72` |
| Rótulos (rol, lugar, `dt`, pie, leyendas) | Barlow Condensed 500, 600 | `--font-label` → `--font-label-stack` = fuente, `"Arial Narrow"`, `sans-serif` | `app/layout.tsx:17-21`, `app/globals.css:44` |

Todo lo que no es prosa va en mayúsculas con interletrado (`text-transform: uppercase`, `letter-spacing` de `.04em` a `.16em`).

Escala (fluida con `clamp`, base 1440 px; un solo breakpoint, 720 px):

| Elemento | Tamaño / interlínea | Ancla |
|---|---|---|
| `body` | `clamp(17px, 1.3vw, 19px)` / 1.55 | `app/globals.css:73-74` |
| `h1` nombre | display `min(10.2vw, 156px)` / 0.9; ≤720 px: `min(21vw, 110px)` | `app/globals.css:283`, `:298` |
| `.role` (héroe) | label 600 `clamp(22px, 3.2vw, 46px)` / 1.05, `.12em`; ≤720 px: 20px, `.08em` | `app/globals.css:329-331`, `:322-325` |
| `.place` | label 600 `clamp(14px, 1.3vw, 18px)` / 1.3, `.16em` | `app/globals.css:335-336` |
| `h2.big` | display `clamp(40px, 6.2vw, 92px)` / 0.95, máx. 17ch | `app/globals.css:351-357` |
| `.company` | display `clamp(30px, 4.2vw, 60px)` / 1 | `app/globals.css:418` |
| `.role-line` | label 600 `clamp(18px, 1.7vw, 24px)` / 1.2, `.1em`, `--red` | `app/globals.css:424-427` |
| `.meta` | 16px, `--ink-soft` | `app/globals.css:429-433` |
| `.tag` (año o etapa) | display `clamp(26px, 2.8vw, 40px)` / 1, `.04em` | `app/globals.css:437-438` |
| `.chain p` | 500 `clamp(19px, 1.75vw, 25px)` / 1.35, máx. 40ch | `app/globals.css:493-501` |
| `.prose p`, `.points` | tamaño del cuerpo, máx. 62ch | `app/globals.css:364-367`, `:463` |
| `.jobs h3` | display `clamp(26px, 2.6vw, 36px)` / 1.05 | `app/globals.css:525` |
| `.contacto h2` | display `clamp(56px, 10vw, 150px)` / 0.9, `--red` | `app/globals.css:543-545` |
| `.reach a` | display `clamp(34px, 5vw, 72px)` / 1.04 | `app/globals.css:559` |
| `.fittings dt`, `.langs`, `.foot`, `figcaption` | label 600 de 12 a 15px, `.14em`–`.16em` | `app/globals.css:187-189`, `:380-381`, `:572-573`, `:580-581` |

La solución portable de fuentes sustituye a la del boceto (Impact y Bahnschrift eran de Windows): ARR-9 queda resuelta ([`deuda.md`](../deuda.md)).

## Espaciado, medidas y retícula

| Token | Valor | Ancla |
|---|---|---|
| `--pipe` (diámetro de la tubería) | `160px`; `44px` en ≤720 px | `app/globals.css:18`, `:49` |
| `--gutter` | `clamp(16px, 3.9vw, 56px)`; `16px` en ≤720 px | `app/globals.css:19`, `:50` |
| `--gap` | `clamp(14px, 3vw, 56px)`; `12px` en ≤720 px | `app/globals.css:20`, `:51` |
| `--spine-col` (columna reservada a la tubería a la derecha) | `gutter + pipe*1.45 + gap` | `app/globals.css:21`, `:345` |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` (único easing del sitio) | `app/globals.css:41` |

- Trama del muro: celdas de 360x300 px con juntas de 1 px y un agujero de tensor por paño, más grano SVG de 240 px (`app/globals.css:64-70`).
- Héroe: `min-height: max(100svh, 640px)` (`:158`).
- Separación vertical entre secciones: `clamp(64px, 9vw, 140px)` (`:348`); entre etapas: `clamp(48px, 7vw, 104px)` (`:407`).
- Radios: solo la esquina del codo del héroe (`border-top-right-radius: var(--pipe)`, `:129`) y las lámparas (`50%`, `:247`). Sin otras esquinas redondeadas: el sitio es de cantos duros.
- Filetes: 3 px sólido `--ink` (`.fittings`, `:377`), 3 px punteado `--ink-soft` (`.chain`, `:506`), 3 px de línea guía en `.tag::after` (`:448`).
- Escala de espaciado formal (4/8/16…): no existe; los espacios son `clamp` por elemento. Pendiente si se quiere unificar.

## Componentes

| Componente | Descripción | Ancla |
|---|---|---|
| Tubería (escena) | Tubo amarillo con codo: tramo horizontal en el héroe y columna vertical a la derecha. Pulso de luz que viaja por el tubo. three.js; si no hay WebGL, la versión CSS. | `components/pipe-scene.ts:275-288`, `app/globals.css:119-153` |
| Brida | Anillo con collar y 8 pernos, sobre la columna a la altura de cada `.tag` (`data-flange`). Hoy 11, más 2 decorativas en el héroe, 1 tapa ciega final y 2 en la derivación. | `components/pipe-scene.ts:141-176`, `:303`, `:309-325`, `:345-347` |
| Etapa (`.stage`) | Cabecera con empresa, rol en rojo, fechas y lugar; el año a la derecha, alineado con su brida. | `app/globals.css:406-457`, `app/page.tsx:164-175` |
| Cadena de voz (`.chain`) | VAD, STT, LLM y TTS: texto, guía punteada y rótulo-brida a la derecha. | `app/globals.css:481-511`, `app/page.tsx:191-200` |
| Derivación "A PERSONA" | Rama de la columna hacia la izquierda, con válvula y volante; es el contacto. | `components/pipe-scene.ts:327-352`, `app/globals.css:534-546`, `app/page.tsx:347-372` |
| Volante | Aro rojo con 3 radios y cubo, sobre vástago. Uno en la columna (primer viewport) y uno en la derivación. Gira con el scroll y con el hover o foco de los enlaces de contacto. | `components/pipe-scene.ts:178-221`, `:305-307`, `:349-351`, `:411` |
| Manómetro | SVG de 13 marcas, aguja de 240° (`-120deg` a `+120deg`). Señal = velocidad de scroll (`--v`), Recorrido = progreso (`--p`), Carga = vaivén CSS. Ancho `clamp(72px, 8.6vw, 124px)`. | `app/page.tsx:6-39`, `app/globals.css:170-236` |
| Lámpara piloto | Disco con aro de 3 px: dos verdes y una ámbar que parpadea. **Decorativa** (`aria-hidden`); no significa ningún estado real. | `app/page.tsx:75-79`, `app/globals.css:238-270` |
| Enlace de contacto (`.reach a`) | Display grande con subrayado amarillo que sube a rellenar al pasar o enfocar. | `app/globals.css:551-569` |
| Revelación `plate` / `stage` | Dos gestos propios sobre AOS: `plate` descubre un título con `clip-path` (izquierda a derecha); `stage` sube 36 px con fundido. | `app/globals.css:586-606` ([0004](../decisiones/0004-aos-con-animaciones-plate-y-stage.md)) |

## Movimiento

- Revelaciones: 900 ms, un solo easing (`--ease`), una vez (`once: true`). `ScrollFX.tsx:16-21`.
- Escena: el pulso va a velocidad base 0,14 y acelera con el scroll y con el hover de contacto (`pipe-scene.ts:395`). El lienzo entra con un fundido de 0,9 s (`app/globals.css:103`).
- `prefers-reduced-motion`: ver "Compuertas" en [`../arquitectura/estructura.md`](../arquitectura/estructura.md). Quedan ligados al scroll la rotación del volante y las agujas Señal y Recorrido ([`deuda.md`](../deuda.md) PORT-9).
- Contenido y contacto legibles sin WebGL y sin JS: ver la misma sección.

## Reglas de acabado

- Cada imagen raster que se publique lleva su procedencia. Hoy **no hay ninguna** imagen raster publicada (solo SVG propios y un SVG de ruido embebido en CSS, `app/globals.css:69`).
- El `DESIGN.md` de la herramienta de diseño no existe todavía. `Pendiente`: dónde queda y cómo se enlaza aquí.
- Capturas de revisión (1440x900 de escritorio, móvil, varios puntos del scroll): `.impeccable/review/*.png` (`d*` escritorio, `m*` móvil, `e*` revisión posterior). Sin commitear y fuera de `docs/`. Pendiente: el comando exacto con el que se tomaron no quedó registrado.
