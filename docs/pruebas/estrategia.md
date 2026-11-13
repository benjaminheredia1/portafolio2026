# Estrategia de pruebas

Generado: 2026-11-11 · commit `cfdc665` · cambios sin commitear en lo citado: **sí**. Los comandos de la sección **Comandos** se corrieron ese día en Windows (Node v24.16.0, npm 11.13.0); `lint`, `tsc` y `build` se repitieron sobre la página ya construida.

## Estado hoy

La página del portafolio está construida (ver [`../features/portafolio.md`](../features/portafolio.md)). **No hay script de tests, ni runner instalado, ni carpeta de tests, ni CI** (`.github/` no existe). `package.json:5-10` solo define `dev`, `build`, `start` y `lint`. Lo que respalda el sitio hoy: lint, tipos y build limpios, revisión visual externa y capturas reales hechas a mano en `.impeccable/review/*.png` (sin commitear; el comando con que se tomaron no quedó registrado, [`../deuda.md`](../deuda.md) PORT-4). El sitio se construyó sin ciclo del loop de agentes, así que no hubo fase de tests; la regla del contrato "un CA sin un test que lo demuestre no está hecho" no se cumplió con tests automáticos.

## Regla de lectura antes de escribir pruebas

Next.js 16.4.6 de este repo tiene cambios incompatibles (`AGENTS.md`). Las guías de pruebas del propio paquete están en `node_modules/next/dist/docs/01-app/02-guides/testing/` (`playwright.md`, `vitest.md`, `jest.md`, `cypress.md`, `index.md`). Léelas antes de montar cualquiera.

## Comandos

Ejecutar desde la raíz del proyecto (`C:\Users\Benjamin Heredia\Documents\portafolio`).

| Para qué | Comando | Resultado comprobado el 2026-11-11 |
|---|---|---|
| Análisis estático (ESLint 9, `core-web-vitals` + `typescript`) | `npm run lint` | Sale con código 0 y **sin ninguna línea de salida** (ESLint calla cuando está limpio). |
| Tipos (no hay script; lo cubre también `build`) | `npx tsc --noEmit` | Código 0, sin salida. |
| Build de producción | `npm run build` | OK sobre la página construida. Compila (Turbopack) en ~0,5 s, corre TypeScript, genera 4 páginas estáticas. Tabla final: `○ /` y `○ /_not-found`, ambas `Static`. Imprime "Cache Components enabled" y "Partial Prefetching enabled". Confirma que three.js y `Math.random()` (`components/pipe-scene.ts:503`) no rompen el prerender. |
| Servir el build | `npm run start -- -p 3100` | OK sobre el esqueleto inicial ("Ready in 281ms", `GET /` 200). **No repetido** tras construir la página. Requiere `npm run build` antes. |
| Desarrollo | `npm run dev` | Puerto 3000 por defecto. Para otro puerto: `npm run dev -- -p 3100` (flag `-p`/`--port` documentada en `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md:70`). No se arrancó una instancia propia: ver el aviso del puerto 3000. |
| Tests unitarios o de componentes | **no existe** | Hueco. |
| Tests de flujo (E2E) | **no existe** | Hueco. |
| Capturas de pantalla | **no existe como comando** | Hay capturas manuales en `.impeccable/review/`; falta un comando reproducible (ui y qa lo necesitarán en el próximo ciclo). |
| Contrato contra backend local | **no aplica** | No hay backend ni API routes. |

### Avisos que tienen que saber todos los agentes

- **El puerto 3000 puede estar ocupado por el servidor de desarrollo de la persona** (al arrancar el proyecto había un proceso escuchando en `:3000`). No lo detengas ni lo reinicies. Para tus propias corridas usa otro puerto explícito (`-p 3100`) y, si lo levantas tú, apaga solo el proceso que tú lanzaste.
- `npm run build` y `npm run dev` pueden convivir: Next 16 escribe el de desarrollo en `.next/dev` y el build en `.next/` (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:893-895`). Nunca corras dos `build` a la vez.
- **Aviso conocido, no es un fallo**: tanto `build` como `start` imprimen "Next.js ignored package-lock.json in C:\Users\Benjamin Heredia because it is outside the current Git repository". Hay un `package-lock.json` suelto en la carpeta de usuario. No afecta al resultado.
- `npm run lint` no revisa Markdown ni los HTML de `.impeccable/`: solo JS/TS.
- `next/font/google` (`app/layout.tsx:5-21`: Anton, Barlow, Barlow Condensed) descarga las fuentes durante dev/build. Pendiente: comprobar si el build funciona sin red; hoy lo hace con red ([`../deuda.md`](../deuda.md) PORT-15).
- En `npm run dev` aparece un indicador "N" de Next abajo a la izquierda en las capturas (`.impeccable/review/e1-2700.png`); no es parte del sitio. Para capturas limpias usar `build` + `start`.
- Para probar el fallback sin WebGL a mano: `document.documentElement.dataset.gl = "off"` en la consola; muestra la tubería de CSS y oculta el lienzo (`app/globals.css:95-153`).

### Producción

No hay backend, `.env*` ni servicio externo: nada que pueda apuntar a producción. Si el ciclo agrega un formulario de contacto, analítica o un servicio externo, esta sección debe decir cuál es y cómo se prueba sin tocar el real. Mientras tanto, el contacto son enlaces salientes (no se prueban contra el destino).

## Capas de prueba

| Capa | Existe | Qué debería cubrir en este proyecto | Pendiente |
|---|---|---|---|
| Análisis estático (lint + tipos) | Sí | `npm run lint`, `npx tsc --noEmit`, `npm run build` | Ninguno |
| Unitarias (lógica pura) | No | Cálculo de `--p`/`--v` del `tick` de `ScrollFX` (`components/ScrollFX.tsx:33-51`), posiciones de las bridas decorativas del héroe (`pipe-scene.ts:292-302`) | Elegir runner (Vitest o Jest; ver guías del paquete). La lógica está dentro de efectos y cierres: habría que extraerla para probarla |
| De componentes | No | Contenido de las cinco secciones y de la derivación "A persona" legible sin WebGL; textos literales; los dos enlaces de contacto | Elegir runner y entorno DOM |
| Flujo / E2E en navegador | No | Recorrer la página, llegar al contacto, comportamiento con `prefers-reduced-motion`, sin WebGL, viewport móvil, alineación de las 11 bridas con sus `.tag` | Elegir runner (Playwright según la guía del paquete) |
| Capturas de pantalla | Solo manuales | Primer viewport (1440x900), móvil, varios puntos del scroll, `prefers-reduced-motion`, sin WebGL. Hay capturas hechas a mano en `.impeccable/review/` | Definir comando y carpeta reproducibles; sin ciclo no existe `docs/ciclos/<ciclo>/capturas/` |
| Accesibilidad | No | Contraste de la tinta sobre el muro y sobre la tubería, foco por teclado, `prefers-reduced-motion`, contenido sin WebGL | Definir herramienta |
| Contrato con backend | No aplica | — | — |

### Propuesta (no decidida)

La decisión es del ciclo: no está implementada ni acordada.

- **Playwright** para flujo y capturas. Es lo que la guía del paquete documenta (`playwright.md`) y permite emular `prefers-reduced-motion`, tamaños de viewport y contenido sin WebGL. Pendiente: verificar que el Chromium sin cabeza de esta máquina renderiza WebGL (three.js) o hace falta una bandera de renderizado por software; hasta entonces una captura "vacía" no prueba nada.
- **Vitest** (o Jest) solo si el ciclo produce lógica pura que valga la pena probar aparte de la escena.
- Fijar un script `test` y otro de capturas en `package.json` y anotarlos arriba. Hasta entonces, la regla de oro del contrato ("un CA sin un test que lo demuestre no está hecho") **no se puede cumplir con tests automáticos**; el tester debe proponer en su primera ronda cómo se demuestra cada CA (comando, captura o evidencia manual) y el orquestador decide.

## Cómo montar una pantalla en un test

No hay ninguno todavía. Cuando exista el runner, documentarlo aquí. Lo que ya se sabe:
- Hay una sola ruta, `/` (`app/page.tsx`), sin datos remotos ni sesión: no hacen falta dobles de red, fábricas ni servidor falso.
- La escena three.js no corre en el servidor: `PipeScene` (Client Component) la carga con `import()` dentro de un efecto (`components/PipeScene.tsx:15-19`; la guía de Next sugiere `next/dynamic`, `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md:62-95`). Si no hay WebGL (por ejemplo jsdom), `startScene` debería fallar al crear el renderer y `PipeScene` lo captura y pone `data-gl="off"` (`:23-25`): se puede probar el contenido sin doble. Sin comprobar.
- Selectores estables para tests (no cambiar sin avisar, los usa la escena): `[data-anchor="spine"|"hero-pipe"|"branch-run"]`, `[data-flange]` (11), `[data-valve]` (2), `[data-aos="plate"|"stage"]`, y los estados `html[data-gl]` y `html.fx` ([`../arquitectura/estructura.md`](../arquitectura/estructura.md)).
- Para capturas fiables hay que esperar a `html[data-gl="on"]` (WebGL listo) y a `document.fonts.ready`, y desplazar la página para disparar las revelaciones AOS (`once: true`) antes de capturar.

## Qué nunca se corre

- Nada contra servicios de terceros reales: no hay ninguno hoy.
- Nunca `git stash`, `checkout`, `restore` ni `reset` (contrato del ciclo).
