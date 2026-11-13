# Estructura del proyecto

Generado: 2026-11-11 · commit `cfdc665` · cambios sin commitear en lo citado: **sí** (todo el código del sitio está sin commitear; `git status`: `M app/*`, `?? components/`, `?? docs/`).

Estado: la página "Colector de Planta" está construida (una sola ruta `/`). Se hizo **fuera del loop de ciclos**, por pedido expreso de la persona; no existe `docs/ciclos/`. Verificado con capturas reales, `npm run lint`, `npx tsc --noEmit` y `npm run build` (los tres limpios el 2026-11-11). No hay tests automáticos.

## Qué es

Portafolio web personal de Benjamin Heredia (ingeniero de sistemas, Santa Cruz de la Sierra, Bolivia). Lo visitan reclutadores y clientes freelance que deciden en pocos minutos. Producto y reglas: [`PRODUCT.md`](../../PRODUCT.md). Ficha de la página: [`features/portafolio.md`](../features/portafolio.md). Tokens: [`diseno/sistema-visual.md`](../diseno/sistema-visual.md).

## Regla previa a escribir código Next

`AGENTS.md` (raíz) avisa que este Next.js tiene cambios incompatibles con lo que cualquiera recuerda. **Antes de escribir código Next, lee la guía relevante en `node_modules/next/dist/docs/`** (índice: `node_modules/next/dist/docs/index.md`; App Router en `01-app/`). Esa carpeta es la fuente de verdad, no la memoria.

| Tema | Guía (bajo `node_modules/next/dist/docs/01-app/`) |
|---|---|
| Cache Components (activo): qué se prerenderiza, `Suspense`, `use cache` | `01-getting-started/08-caching.md`, `03-api-reference/05-config/01-next-config-js/cacheComponents.md` |
| `Math.random()`, `Date.now()`, `new Date()`, `crypto.randomUUID()` **rompen el prerender** si corren en un Server Component | `01-getting-started/08-caching.md:329-389`, `02-guides/migrating-to-cache-components.md:101` |
| Partial Prefetching (activo) | `03-api-reference/05-config/01-next-config-js/partialPrefetching.md` |
| Server vs Client Components, `'use client'` | `01-getting-started/05-server-and-client-components.md`, `03-api-reference/01-directives/use-client.md` |
| Cargar three.js solo en el cliente | `02-guides/lazy-loading.md:62-95` |
| Fuentes (`next/font`) | `01-getting-started/13-fonts.md` |
| CSS / Tailwind | `01-getting-started/11-css.md` |
| Metadata (título, descripción, Open Graph, favicon) | `01-getting-started/14-metadata-and-og-images.md` |
| Helpers de tipos globales `LayoutProps` / `PageProps` | `01-getting-started/03-layouts-and-pages.md:335-361` |
| Pruebas (Playwright, Vitest, Jest, Cypress) | `02-guides/testing/` |

Prerender comprobado: el único `Math.random()` del código está en `components/pipe-scene.ts:503` y corre solo en el navegador, dentro de un efecto; `Home()` y `Gauge` son deterministas (las marcas del manómetro usan `Math.sin`/`Math.cos` con `toFixed`, `app/page.tsx:14-19`). `npm run build` pasa y deja `/` como `○ Static`.

## Stack

| Pieza | Versión (declarada → instalada) | Ancla |
|---|---|---|
| Next.js (App Router, Turbopack) | 16.4.6 | `package.json:13` |
| React / React DOM | 19.3.0 | `package.json:14-15` |
| three | `^0.187.0` → 0.187.0 | `package.json:16` |
| aos | `^2.3.4` → 2.3.4 | `package.json:12` |
| Tailwind CSS | 4.3.3 (solo se importa; ver "Estilos") | `package.json:27`, `app/globals.css:1` |
| `@tailwindcss/turbopack` (loader para Turbopack) | 4.3.3 | `package.json:19`, `next.config.ts:7-14` |
| `@types/three` / `@types/aos` | `^0.187.0` → 0.187.0 / `^3.0.8` → 3.0.8 | `package.json:24`, `package.json:20` |
| TypeScript | `^5` → 5.9.3 | `package.json:28` |
| ESLint | `^9` → 9.39.5 con `eslint-config-next` 16.4.6 | `package.json:25-26`, `eslint.config.mjs:1-18` |
| Node / npm del entorno | v24.16.0 / 11.13.0 (sin `engines` declarado) | `package.json` |

Elección de librerías (la que `PRODUCT.md` delegaba): three.js directo, sin `@react-three/fiber`; revelado al scroll con AOS 2.3.4 más animaciones propias ([decisión 0004](../decisiones/0004-aos-con-animaciones-plate-y-stage.md)).

## Configuración

- `next.config.ts:3-15`: `cacheComponents: true` (línea 5), `partialPrefetching: true` (línea 6) y una regla de Turbopack para que todo `*.css` pase por `@tailwindcss/turbopack` (líneas 7-14). **No hay `postcss.config.*`**. No tocar esa regla sin leer `03-api-reference/08-turbopack.md` y `01-getting-started/11-css.md`.
- `tsconfig.json`: `strict: true`, alias `@/*` → raíz, `jsx: react-jsx`. `next-env.d.ts` está en `.gitignore` y lo regenera Next; de ahí sale el tipo global `LayoutProps<"/">` (`app/layout.tsx:29`).
- `eslint.config.mjs:5-16`: `core-web-vitals` + `typescript` de `eslint-config-next`; ignora `.next/`, `out/`, `build/`, `next-env.d.ts`.
- `.gitignore`: ignora `/node_modules`, `/.next/`, `/out/`, `/build`, `.env*`, `next-env.d.ts`, `*.tsbuildinfo`.
- **Aviso de build** (`npm run build`): "Next.js ignored package-lock.json in C:\Users\Benjamin Heredia because it is outside the current Git repository". Hay un `package-lock.json` perdido en la carpeta de usuario. Inofensivo; ver [`deuda.md`](../deuda.md) ARR-8.
- Variables de entorno: ninguna (no hay `.env*`).
- Fuentes: se descargan de Google Fonts durante dev y build (`next/font/google`, `app/layout.tsx:2`); se autoalojan en el build.

## Capas y carpetas

Sin `src/`: todo vive en la raíz del repo.

| Carpeta o archivo | Responsabilidad |
|---|---|
| `app/` | App Router: layout raíz, la home y todo el CSS del sitio. |
| `components/` | Dos Client Components (`PipeScene`, `ScrollFX`) y el módulo de la escena three.js (`pipe-scene.ts`). Sin commitear. |
| `public/` | Solo los SVG de plantilla (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). **Nadie los usa** (comprobado con grep en `app/` y `components/`). Sin fotos, sin CV. |
| `docs/` | Memoria del proyecto ([`../README.md`](../README.md)). |
| `.impeccable/` | Herramienta de diseño: bocetos (`mocks/decision/*.html`), superficie vigente (`surfaces/app-page-tsx.md`) y capturas de revisión (`review/*.png`, ignoradas por su propio `.gitignore`). Sin commitear. No es código del sitio. |
| `PRODUCT.md` | Fuente de verdad de producto (raíz, sin commitear). |
| `AGENTS.md` | Regla de leer `node_modules/next/dist/docs/` antes de escribir código Next (la reescribe `next dev`). |

### `app/` y `components/`

| Archivo | Símbolo | Para qué | Ancla |
|---|---|---|---|
| `app/layout.tsx` | `RootLayout({ children }: LayoutProps<"/">)` | Layout raíz. `<html lang="es">` con las tres variables de fuente; `<body>` sin clases. | `app/layout.tsx:29-40` |
| `app/layout.tsx` | `display` (Anton), `body` (Barlow), `label` (Barlow Condensed) | Fuentes `next/font/google`, expuestas como `--font-display`, `--font-body`, `--font-label`. | `app/layout.tsx:5-21` |
| `app/layout.tsx` | `metadata` | Título "Benjamin Heredia · Full-stack e IA en producción" y descripción en español. | `app/layout.tsx:23-27` |
| `app/page.tsx` | `Home()` (Server Component, ruta `/`) | Todo el contenido: héroe, "oficio", recorrido, encargos, contacto. Monta `<PipeScene />` y `<ScrollFX />`. | `app/page.tsx:61-377` |
| `app/page.tsx` | `Gauge({ name, cls })` | Manómetro SVG (marcas, aguja `.needle`). Se usa 3 veces: Señal, Recorrido, Carga. | `app/page.tsx:6-39` |
| `app/page.tsx` | `Tokens({ items })` | Lista de herramientas como `<span>` por pieza. | `app/page.tsx:41-49` |
| `app/page.tsx` | `VOICE_CHAIN` | Las cuatro etapas del agente de voz (VAD, STT, LLM, TTS): texto y rótulo. | `app/page.tsx:51-59` |
| `app/globals.css` | `:root` y reglas | Tokens, fondo de concreto, héroe, línea, etapas, contacto, AOS, movimiento reducido. 616 líneas, todo CSS propio. | `app/globals.css:1-616` |
| `components/PipeScene.tsx` | `PipeScene()` (`"use client"`) | Monta el `<canvas class="scene">` y carga three.js y `pipe-scene` con `import()` dentro de un efecto. Marca `html[data-gl]` en `on` u `off`. | `components/PipeScene.tsx:6-36` |
| `components/pipe-scene.ts` | `startScene(T, RoomEnvironment, canvas): () => void` | Construye y anima la escena three.js; devuelve la función de limpieza. | `components/pipe-scene.ts:15-495` |
| `components/ScrollFX.tsx` | `ScrollFX()` (`"use client"`, devuelve `null`) | Arranca AOS, añade la clase `fx` a `<html>` y escribe `--p` y `--v` (progreso y velocidad de scroll). | `components/ScrollFX.tsx:11-61` |
| `app/favicon.ico` | — | Favicon de plantilla. | — |

Dependencias entre ellos: `Home` importa `PipeScene` y `ScrollFX` (`app/page.tsx:1-2`). `PipeScene` importa `pipe-scene` y `three` solo en el cliente (`components/PipeScene.tsx:15-19`). `pipe-scene.ts` lee el DOM de `Home` por selectores (siguiente sección). `ScrollFX` y el CSS comparten `--p` y `--v`.

## Cómo se alinea el DOM con la escena

La escena no tiene coordenadas propias: **lee del DOM dónde dibujar**. Es el punto que más se rompe si se mueve el HTML.

1. **Plano z=0 en píxeles CSS** ([decisión 0003](../decisiones/0003-lienzo-fijo-plano-z0-en-px.md)). Cámara en perspectiva, FOV 30, con `camZ = H / 2 / tan(FOV/2)` (`components/pipe-scene.ts:36-37`, `:254`). Así 1 unidad = 1 px en z=0. `wx(px) = px - W/2` y `wy(py) = -py` (`:264-265`).
2. **Anclas por atributo** que `build()` mide con `getBoundingClientRect` + `scrollY` (`rectOf`, `:223-237`):

| Atributo | Elemento (`app/page.tsx`) | Qué dibuja la escena |
|---|---|---|
| `data-anchor="hero-pipe"` | `div.hero-pipe` (`:82`) | Tramo horizontal del héroe. Su alto fija el radio `R` junto con el ancho del spine (`pipe-scene.ts:258`, `:263`). |
| `data-anchor="spine"` | `div.spine` (`:68`) | Columna vertical: posición `x` (`sx`) y largo hasta `endY` (`:269-272`). |
| `data-anchor="branch-run"` | `div.branch-run` (`:348`) | Derivación "A PERSONA": altura `by` y extremo izquierdo (`:328-352`). |
| `data-flange` | cada `.tag` (año de etapa, VAD/STT/LLM/TTS, "Freelance") (`:171`, `:184`, `:194`, `:225`, `:244`, `:274`, `:299`, `:320`) | Una brida sobre la columna, a la altura del centro de ese elemento (`:309-314`). Hoy son 11. |
| `data-valve` | los dos enlaces de contacto (`:358`, `:364`) | Hover o foco abre la válvula: el volante gira más rápido y el pulso acelera (`:442-450`, `:392`, `:395-396`). |

3. **Lo que se reconstruye y cuándo.** `build()` (`:239-377`) tira el grupo anterior y rehace todo. Se dispara con `ResizeObserver` sobre `document.body`, con `resize` y cuando `document.fonts.ready` resuelve, con 120 ms de rebote (`:430-440`). Al recuperar un contexto WebGL perdido también (`:457-460`).
4. **Scroll.** El DOM scrollea normal. La cámara solo baja: `cy = -(scrollY + H/2)` (`:401-403`). El paralaje del puntero usa `lookAt`, así el plano de texto no se desplaza (`:402-403`). Paridad exacta DOM/canvas en dispositivo real: sin verificar ([`deuda.md`](../deuda.md) PORT-6). Cuidado: `getBoundingClientRect` incluye los `transform`; las etapas sin revelar llevan `translate3d(0, 36px, 0)` ([decisión 0004](../decisiones/0004-aos-con-animaciones-plate-y-stage.md)), así que una reconstrucción en ese momento colocaría su brida más abajo. En las capturas de revisión las bridas salen alineadas.
5. **Las dos palabras del nombre** (`[data-anchor="hero-pipe"] h1 span`, `:292-302`): si están en la misma línea, la escena pone una brida decorativa en el hueco entre ellas, para que los pernos no crucen las letras. En móvil (≤720 px) el `h1` pasa a dos líneas **sobre el muro, encima de la tubería** (`app/globals.css:293-305`); las palabras no comparten línea, así que se usan las posiciones por defecto, 4 % y 50 % del ancho (`pipe-scene.ts:292`).

Para mover o añadir un hito en el recorrido: agregar `data-flange` al elemento y no tocar la escena. Para cambiar el grosor de la tubería: cambiar `--pipe` en CSS (`app/globals.css:18`, `:49`); la escena lo lee del ancho del `.spine`.

## Compuertas del estado (el contenido nunca depende de JS ni de WebGL)

| Compuerta | Quién la pone | Qué hace |
|---|---|---|
| `html[data-gl="on"]` | `PipeScene` al terminar de montar la escena (`components/PipeScene.tsx:22`); la escena la fuerza a `off` al perder el contexto y a `on` al recuperarlo (`pipe-scene.ts:452-462`) | Muestra el lienzo (`opacity: 1`, `app/globals.css:95-107`) y desvanece la tubería de CSS (`app/globals.css:149-153`). |
| `html[data-gl="off"]` o sin atributo | `PipeScene` si el `import()` o `startScene` lanzan error (`:24`); sin JS no hay atributo | Queda la **tubería en CSS**. |
| `html.fx` | `ScrollFX` tras `AOS.init` (`components/ScrollFX.tsx:24`) | Solo con `fx` existen los estados ocultos de las revelaciones (`app/globals.css:591-606`). Si AOS falla o no corre JS, el contenido queda visible. |
| `prefers-reduced-motion` | — | `AOS.init({ disable })` devuelve verdadero (`ScrollFX.tsx:20`), y AOS quita los `data-aos` (`node_modules/aos/src/js/aos.js:73-80`): el contenido aparece sin animar. La escena no avanza el flujo ni el volante autónomo, no sigue el puntero y solo repinta al hacer scroll (`pipe-scene.ts:394-399`, `:416`, `:439`). El CSS apaga el parpadeo de la lámpara ámbar y el vaivén de la aguja "Carga" (`app/globals.css:608-616`). **Siguen ligados al scroll** (no se apagan): la rotación del volante (`pipe-scene.ts:411`) y las agujas Señal y Recorrido, porque el `tick` de `ScrollFX` no mira `reduce` (`ScrollFX.tsx:33-51`). Ver [`deuda.md`](../deuda.md) PORT-9. |

### Fallback CSS de la tubería (cuando `data-gl` no es `"on"`)

Se pinta con `--pipe-paint` y `--pipe-paint-v` (`app/globals.css:23-40`), en tres piezas (`:119-148`): `.hero-pipe::before` (tramo horizontal con esquina redondeada), `.hero-pipe::after` (baja del héroe) y `.spine` (columna, `position: absolute`, de `max(100svh, 640px)` hasta `--pipe * 1.1` del final de `.page`). Es también **la primera imagen** mientras carga three.js: se desvanece en 0,9 s al entrar el lienzo.

Lo que el fallback **no** tiene: bridas, pernos, volantes, sombras, pulso de flujo ni la derivación "A PERSONA" (`.branch-run` no tiene pintura: `app/globals.css:537-540`). Los textos, las líneas guía de las etapas (`.tag::after`) y los enlaces de contacto sí.

## Estilos

- Todo el diseño está en `app/globals.css` con clases propias (`.hero`, `.stage`, `.chain`, `.reach`…). `@import "tailwindcss"` (`:1`) solo aporta su base (preflight); **no hay utilidades de Tailwind en el marcado ni `@theme`**. Tokens y escalas: [`diseno/sistema-visual.md`](../diseno/sistema-visual.md).
- Único breakpoint: `max-width: 720px` (`app/globals.css:47`, `:293`, `:315`, `:398`, `:452`).
- AOS: la hoja base entra por `import "aos/dist/aos.css"` (`components/ScrollFX.tsx:5`); el sitio la sobrescribe con dos gestos propios (`app/globals.css:586-606`).

## Rutas

| Ruta | Archivo | Tipo en el build | Guardas |
|---|---|---|---|
| `/` | `app/page.tsx` | `○ Static` (prerenderizada) | ninguna |
| `/_not-found` | integrada de Next (no hay `app/not-found.tsx`) | `○ Static` | ninguna |

Salida real de `npm run build` el 2026-11-11. No hay API routes, route handlers, server actions, `proxy`/middleware ni backend. Una sola página: el recorrido es el scroll.

## Piezas centrales

- **Estado**: ninguno de React. El estado vive en el DOM y en variables CSS: `html[data-gl]`, `html.fx`, `--p` (progreso 0..1) y `--v` (velocidad suavizada), escritas por `ScrollFX` (`components/ScrollFX.tsx:33-51`) y leídas por las agujas (`app/globals.css:214-224`). La escena guarda su propio estado en variables locales de `startScene` (`pipe-scene.ts:77-87`).
- **Red / backend / autenticación / base de datos / almacenamiento**: no existen. El contacto son dos enlaces salientes (LinkedIn y un agregador de canales; `app/page.tsx:357-367`). No hay enlace al CV.
- **Animación y 3D**: three.js directo (ver "Cómo se alinea"). El "flujo" no son partículas: es un pulso de luz que viaja por la tubería, inyectado en el shader del material (`pipe-scene.ts:108-136`) y animado con `uTime` (`:395`). Iluminación: `RoomEnvironment` + luz hemisférica + una luz direccional que proyecta sombra sobre un plano `ShadowMaterial` que hace de muro (`:30-45`, `:73-75`, `:357-376`). Límites de coste: `devicePixelRatio` tope 1,5 en ≤720 px y 1,75 en el resto (`:251`); mapa de sombra 1024 en móvil y 2048 en escritorio (`:370`).
- **Contenido**: escrito a mano en JSX (`app/page.tsx`); no hay capa de datos. Fuente: `PRODUCT.md`, "Capabilities and Constraints". Reglas: nada de cifras ni marcadores `[N]` sin confirmar; ningún dato de contacto privado.
- **Accesibilidad**: la escena y los instrumentos llevan `aria-hidden` (`PipeScene.tsx:35`, `app/page.tsx:68`, `:71`, `:348`); el contenido es HTML semántico (`header`, `main`, `section[aria-labelledby]`, `article`, `ol`, `dl`). Foco visible: contorno rojo de 3 px (`app/globals.css:88-91`).

## Tests

No hay runner, ni carpeta de tests, ni CI (`.github/` no existe). Ver [`../pruebas/estrategia.md`](../pruebas/estrategia.md).
