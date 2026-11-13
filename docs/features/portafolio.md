# Portafolio (página `/`)

Actualizado: 2026-11-11 · commit `cfdc665` · cambios sin commitear en lo citado: **sí**.

## Para qué sirve y quién la usa

Es todo el sitio: una sola página donde Benjamin Heredia se presenta como full-stack que pone IA y automatización en producción. La visitan reclutadores y empresas tech (deciden en pocos minutos) y clientes freelance que buscan quién les resuelva un sistema, un bot o una automatización. Éxito: que contacten o abran el CV. Producto y reglas: [`PRODUCT.md`](../../PRODUCT.md). Principios: [`../diseno/principios-ux.md`](../diseno/principios-ux.md).

La idea visual ("Colector de Planta"): el scroll recorre una tubería industrial amarilla sobre un muro de concreto; cada etapa de experiencia es una brida; el contacto es una derivación rotulada "A persona". Tokens: [`../diseno/sistema-visual.md`](../diseno/sistema-visual.md).

## Pantallas y rutas

| Ruta | Archivo | Tipo | Guardas |
|---|---|---|---|
| `/` | `app/page.tsx` (`Home()`, `:61-377`) | `○ Static` | ninguna |

No hay otras rutas, API ni backend. Mapa de archivos y de la escena: [`../arquitectura/estructura.md`](../arquitectura/estructura.md).

## Flujo (de arriba a abajo)

| # | Sección | Contenido | Ancla |
|---|---|---|---|
| 1 | Héroe | Tres manómetros (Señal, Recorrido, Carga) y tres lámparas arriba; nombre sobre la tubería; rol "Full-stack · IA en producción" y "Ingeniero de sistemas · Santa Cruz de la Sierra · Bolivia" al pie. | `app/page.tsx:70-96` |
| 2 | Oficio | Titular "Una señal, varios sistemas y una persona al final"; dos párrafos (agente de voz para kioscos, IA por WhatsApp, flujos n8n; sistemas de salud, ERP y académicos con refactor de código legado); herramientas en cuatro grupos: Backend, Frontend, IA y automatización, Datos e infraestructura. | `app/page.tsx:99-157` |
| 3 | Recorrido | Seis etapas, de la más reciente a la más antigua, cada una con su brida (año a la derecha). Nexus Patio Tech (IA) incluye la cadena VAD, STT, LLM, TTS con una brida por paso. | `app/page.tsx:159-313` |
| 4 | Encargos | Tres clientes freelance (Boring Ventures, Rocaz Soluciones, UTEPSA), sin fechas, con una brida "Freelance". | `app/page.tsx:315-345` |
| 5 | A persona | Derivación de la columna hacia la izquierda con válvula y volante; llamado; enlaces; idiomas y formación; pie. | `app/page.tsx:347-372` |

Etapas del recorrido (`app/page.tsx`): "trabajito", Full-stack developer, sep 2026 – hoy (`:164-175`) · Nexus Patio Tech, AI Software Engineer, abr – sep 2026 (`:177-216`) · Nexus Patio Tech, Back End Developer, feb – jun 2026 (`:218-235`) · PuntoCom SRL, AI Automation Developer, ene 2025 – feb 2026 (`:237-265`) · Desarrollamelo, Full-Stack Developer, jun 2024 – ene 2025 (`:267-290`) · Desarrollamelo, Web Developer en pasantía, ene – jun 2024 (`:292-312`).

El visitante: entra, ve el nombre y la tubería, baja (los títulos se descubren con `plate` y los bloques suben con `stage`), llega a "A persona" y hace clic en LinkedIn o en "Todos mis canales". Pasar el puntero o enfocar uno de esos enlaces abre la válvula: el volante gira y el pulso de la tubería acelera (`components/pipe-scene.ts:442-450`).

## Endpoints

Ninguno. El contacto son dos enlaces salientes (`rel="noopener"`, `app/page.tsx:357-367`): LinkedIn y un agregador de canales ("Todos mis canales"). No hay enlace al CV, formulario, correo ni teléfono.

## Estados y errores

| Situación | Qué pasa | Ancla |
|---|---|---|
| Carga normal | Primero se ve la tubería de CSS; al montar three.js entra el lienzo con un fundido de 0,9 s y la de CSS se desvanece. | `app/globals.css:95-153`, `components/PipeScene.tsx:22` |
| WebGL no disponible o `import()` falla | `html[data-gl="off"]`; queda la tubería de CSS (sin bridas, volantes ni derivación pintada). El contenido no cambia. | `components/PipeScene.tsx:23-25` |
| Se pierde el contexto WebGL | `data-gl="off"` hasta que se restaura; entonces se reconstruye la escena. | `components/pipe-scene.ts:452-462` |
| Sin JavaScript | Tubería de CSS y todo el contenido visible (los estados ocultos de AOS exigen `html.fx`). | `app/globals.css:591-606`, `components/ScrollFX.tsx:24` |
| `prefers-reduced-motion: reduce` | AOS desactivado (contenido visible sin animar); sin flujo ni giro autónomo ni paralaje del puntero; la escena repinta solo al hacer scroll; sin parpadeo ni vaivén. Siguen ligados al scroll el volante y las agujas Señal y Recorrido. | `components/ScrollFX.tsx:20`, `pipe-scene.ts:394-399`, `:411`, `app/globals.css:608-616` |
| Cambia el tamaño o cargan las fuentes | La escena se reconstruye con 120 ms de rebote y AOS se refresca. | `pipe-scene.ts:430-440`, `ScrollFX.tsx:25` |
| Móvil (≤720 px) | Tubería de 44 px, nombre en dos líneas sobre el muro, herramientas en una columna; menos coste de render. | `app/globals.css:47-53`, `pipe-scene.ts:251`, `:370` |
| Error de render de la escena | `pipe-scene` no tiene `try/catch` propio: solo el `import()` y el arranque (`startScene`) están protegidos. Un error posterior en el bucle de animación no vuelve a `data-gl="off"`. | `components/PipeScene.tsx:14-25` |

## Reglas de negocio (de contenido)

- Nada inventado: sin cifras de mejora, sin marcadores `[N]`, sin proyectos de relleno ni testimonios.
- Contacto privado por defecto: correo y teléfono no se publican.
- Clientes freelance bajo "Encargos", sin fechas (sus fechas se superponen con empleos).
- Formación sin promedio ni fecha de egreso.
- Detalle de lo publicado y de lo que queda por confirmar: [`../diseno/principios-ux.md`](../diseno/principios-ux.md), "Qué se puede y qué no se puede afirmar".

## Archivos clave

| Archivo | Qué contiene | Ancla |
|---|---|---|
| `app/page.tsx` | Todo el contenido, los manómetros y los atributos `data-anchor`, `data-flange`, `data-valve`, `data-aos` | `:1-377` |
| `app/layout.tsx` | Fuentes (Anton, Barlow, Barlow Condensed), `lang="es"`, metadata | `:1-40` |
| `app/globals.css` | Tokens, fondo de concreto, todo el layout, fallback de la tubería, AOS | `:1-616` |
| `components/PipeScene.tsx` | Lienzo fijo y compuerta `data-gl` | `:6-36` |
| `components/pipe-scene.ts` | Escena three.js: tubería, bridas, volantes, pulso, sombras, bucle | `:15-495` |
| `components/ScrollFX.tsx` | AOS, clase `fx`, variables `--p` y `--v` | `:11-61` |

## Tests que la cubren

**Ninguno automático.** No hay runner (ver [`../pruebas/estrategia.md`](../pruebas/estrategia.md)). Lo que se hizo: `npm run lint`, `npx tsc --noEmit` y `npm run build` limpios, revisión visual externa y capturas reales en `.impeccable/review/` (escritorio `d*`, móvil `m*`, revisión posterior `e*`; sin commitear). Huecos: ver [`../deuda.md`](../deuda.md) (PORT-4).

## Cómo probarlo a mano

1. `npm run dev -- -p 3100` (el puerto 3000 suele estar ocupado por el servidor de la persona) y abrir `http://localhost:3100`.
2. Bajar de principio a fin: las bridas deben caer a la altura del año o rótulo de cada etapa; el volante de la columna debe verse en el primer viewport; "A persona" debe quedar al final de la derivación.
3. Pasar el puntero y tabular sobre "LinkedIn" y "Todos mis canales": el volante gira.
4. Redimensionar a ancho móvil (≤720 px) y repetir.
5. Fallback: en las herramientas del navegador, poner `document.documentElement.dataset.gl = "off"` y comprobar que aparece la tubería de CSS y que el texto sigue completo.
6. Movimiento reducido: activar `prefers-reduced-motion: reduce` en las herramientas del navegador y recargar.

## Historial

- 2026-11-11 · Construcción inicial, **sin ciclo del loop de agentes** (por pedido de la persona: código lo más rápido posible). Revisión visual externa, capturas reales, lint, tipos y build. Ver [`../cambios/CHANGELOG.md`](../cambios/CHANGELOG.md) y las decisiones [0001](../decisiones/0001-anton-en-vez-de-impact.md) a [0004](../decisiones/0004-aos-con-animaciones-plate-y-stage.md).
