# Principios de UX

Generado: 2026-11-11 · commit `cfdc665` · cambios sin commitear en lo citado: **sí**. Resumen de [`PRODUCT.md`](../../PRODUCT.md) y de [`.impeccable/surfaces/app-page-tsx.md`](../../.impeccable/surfaces/app-page-tsx.md), contrastado con lo construido en `app/page.tsx`. Lo que esas fuentes no dicen queda `Pendiente`. Ficha de la página: [`../features/portafolio.md`](../features/portafolio.md).

## Para quién es

Portafolio personal de Benjamin Heredia, ingeniero de sistemas en Santa Cruz de la Sierra, Bolivia. Dos visitantes confirmados (`PRODUCT.md`, "Users"):

| Visitante | Situación | Qué viene a hacer |
|---|---|---|
| Reclutadores y empresas tech (local o remoto internacional) | Varios perfiles abiertos, deciden en pocos minutos | Ubicar qué sabe hacer, con qué stack y con qué nivel de responsabilidad, y llegar al CV o al contacto |
| Clientes freelance | Necesitan un sistema, un bot o una automatización | Juzgar si puede resolver su problema y escribirle con un proyecto concreto |

No diseñar para: comunidad competitiva, ICPC, CTF ni open source (no confirmados).

Contexto de uso: lista de candidatos o proveedores, poco tiempo, probablemente móvil o laptop de trabajo.

## Qué tiene que lograr una visita

Que la persona entienda en una visita quién es Benjamin, qué construye y por qué confiar en que lo entrega, y tenga una vía directa para contactarlo. Éxito: contactar o abrir el CV.

**Estado real**: el contacto existe (LinkedIn y un agregador de canales, `app/page.tsx:357-367`). **El CV no tiene enlace ni archivo**: la mitad del éxito definido no se puede cumplir hoy ([`deuda.md`](../deuda.md) PORT-3).

Dos ejes de posicionamiento confirmados:
1. Full-stack que mete IA y automatización en producción (LLMs, LangChain, bot de autoservicio con IA, n8n y Make, junto con Laravel, NestJS, React, Next.js, Flutter y Angular). En la página: el titular y el bloque "oficio" (`app/page.tsx:99-157`) y la etapa de Nexus Patio Tech (`:177-216`).
2. Sistemas reales de salud, ERP y académicos, con refactor de código legado. En la página: segundo párrafo de "oficio" (`:111-114`) y el apartado "Encargos" (`:315-345`).

La mentalidad competitiva y de seguridad (ICPC, CTF, ajedrez, filosofía) no es eje del sitio y hoy no aparece.

## Principios (`PRODUCT.md`, "Product Principles")

1. **El CV manda; nada inventado.** Sin proyectos, métricas ni testimonios de relleno.
2. **Mostrar el oficio, no listar tecnologías.** La IA aplicada y los sistemas reales son la prueba; la lista de herramientas es apoyo. En la página las herramientas son un bloque de cuatro grupos (`dl.fittings`, `app/page.tsx:116-156`) y la prueba está en las etapas.
3. **Una visita, una decisión.** Entender el perfil rápido y llegar al contacto o al CV sin buscar.
4. **Que se note una persona.** Ni plantilla ni salida de IA, en contenido y en lo visual.
5. **Contacto privado por defecto.** Solo los datos que la persona decida publicar. Hoy no se publican correo ni teléfono.

## Estructura de la experiencia (construida)

- **Un solo recorrido**: el scroll baja por la tubería. Primer viewport: instrumentos arriba, nombre sobre la tubería, rol y lugar al pie (`app/page.tsx:70-96`). Sin hero partido ni fila de tarjetas.
- **Orden**: héroe → "Una señal, varios sistemas y una persona al final" (oficio y herramientas) → "Recorrido" (6 etapas, de la más reciente a la más antigua) → "Encargos" (3 clientes freelance) → "A persona" (contacto). Cada etapa es una brida sobre la columna; el contacto es una derivación (`app/page.tsx:99`, `:159`, `:315`, `:347`).
- **Etapas con año** (2026, 2025, 2024) a la derecha, alineadas con su brida; en Nexus Patio Tech la cadena VAD, STT, LLM, TTS reutiliza el mismo recurso de brida por cada paso del agente de voz (`app/page.tsx:191-200`). Así se resolvió, tal como quedó construido, la doble lectura de "brida" (etapa de experiencia / paso del agente): ambas son marcas de la misma columna.
- **Instrumentos**: las agujas Señal y Recorrido reaccionan al scroll; la escena reacciona al puntero (paralaje) y los enlaces de contacto abren la válvula al pasar el puntero o al enfocarlos con teclado (`components/pipe-scene.ts:442-450`). Son decorativos: no comunican datos reales y están ocultos a lectores de pantalla.
- **Sin WebGL o sin JS**: el contenido, los enlaces y la tubería de CSS siguen ahí ([`../arquitectura/estructura.md`](../arquitectura/estructura.md), "Compuertas").
- **Móvil (≤720 px)**: la tubería se adelgaza (`--pipe: 44px`), el nombre pasa a dos líneas sobre el muro, las herramientas a una columna (`app/globals.css:47-53`, `:293-305`, `:398-402`). **No verificado en dispositivo real** ([`deuda.md`](../deuda.md) PORT-6, PORT-7).

## Tono e idioma

- Tono: directo, sobrio, de oficio. Frases cortas. El mundo visual es industrial; el texto no suena a plantilla ni a marketing.
- Idioma del sitio: **español** (`<html lang="es">`, `app/layout.tsx:32`; todo el contenido en español, salvo nombres de cargo y de tecnología). La decisión original estaba abierta (español, inglés o ambos; inglés A2 y público internacional posible). Se avanzó en español; `Pendiente`: la persona lo confirma o pide versión en inglés.
- Trato: tuteo ("tienes", "escríbeme", `app/page.tsx:352-355`).
- Textos literales vigentes (todos en `app/page.tsx`):
  - Héroe: "Benjamin Heredia", "Full-stack · IA en producción", "Ingeniero de sistemas · Santa Cruz de la Sierra · Bolivia" (`:84`, `:89-94`). Se muestran en mayúsculas por CSS.
  - Titulares: "Una señal, varios sistemas y una persona al final", "Recorrido", "Encargos", "A persona" (`:100-102`, `:160-162`, `:317-319`, `:349-351`).
  - Llamado: "Si tienes un sistema, un bot o una automatización por resolver, o buscas a alguien que lo ponga en producción, escríbeme." (`:352-355`).
  - Enlaces: "LinkedIn" y "Todos mis canales" (`:362`, `:364-366`).
  - Pie y lenguas: "Español nativo · Inglés A2 · Ingeniería en sistemas, UTEPSA"; "Benjamin Heredia · Santa Cruz de la Sierra · 2026" (`:369`, `:371`).
- Metadata: título "Benjamin Heredia · Full-stack e IA en producción" (`app/layout.tsx:24`).

## Qué se puede y qué no se puede afirmar

Lo que cualquier texto del sitio debe respetar (`PRODUCT.md`, "Positioning", "Operating Context", "Evidence on Hand"), y cómo está hoy:

| Regla | Estado en el código (2026-11-11) |
|---|---|
| La cifra "hasta 80 %" no se publica sin reconfirmar | Cumplida: no aparece (grep sobre `app/` y `components/`). |
| Sin marcadores `[N]`, `[X] to [Y]`, `[target]`… | Cumplida: no aparecen. |
| Entradas con fechas superpuestas son clientes freelance, no empleos simultáneos; las fechas no se "corrigen" | Cumplida en lo mínimo: Boring Ventures, Rocaz Soluciones y UTEPSA van bajo "Encargos", con marca "Freelance" y **sin fechas** (`app/page.tsx:315-345`). Presentación por nombre: **sin confirmar** (PORT-2). |
| Formación sin promedio ni fecha de egreso | Cumplida: solo "Ingeniería en sistemas, UTEPSA" (`:369`). |
| Nombre del empleador actual ("trabajito") parece provisional | **Publicado tal cual** como "trabajito" (`:167`). Sin confirmar (PORT-1). |
| Sin proyectos con captura, fotos, testimonios ni clientes no autorizados | Cumplida: no hay proyectos, fotos ni testimonios. Los nombres de empresas son los empleadores y clientes del CV. |
| Datos de contacto privados | Cumplida: no hay correo ni teléfono. Sí hay LinkedIn y un agregador de canales (ambos públicos, pero qué muestra ese agregador: `Pendiente`, PORT-8). |
| Disponibilidad: no presuponerla | El llamado se dirige a quien "tiene un sistema" y a quien "busca a alguien que lo ponga en producción"; cubre ambos casos sin decir "disponible". `Pendiente`: la persona confirma si busca empleo, freelance o ambos. |

## Señales de mala experiencia (a detectar en revisión)

Derivadas de los principios; no hay datos de uso todavía.

- Parece plantilla o texto de IA: frases genéricas, tarjetas de relleno, iconos de tecnologías sin contexto.
- Una cifra, un proyecto, un cliente o un cargo que no respalda el CV ni la persona.
- Un marcador `[N]` o un texto de ejemplo visible.
- No se encuentra el contacto o el CV en pocos segundos. (Hoy el CV no existe como enlace.)
- El contenido o el contacto solo aparecen si carga WebGL o JavaScript pesado.
- El movimiento no se apaga con `prefers-reduced-motion`. (Quedan ligados al scroll el volante y dos agujas: PORT-9.)
- La escena 3D vuelve lento o inusable el sitio en un móvil. (Sin medir: PORT-7.)
- Texto de la tinta sobre la tubería con poco contraste. (Nombre sobre la tubería 3D sin medir: PORT-5.)
- Un dato privado publicado sin decisión de la persona.
- Las lámparas piloto o las agujas leídas como datos reales (son decorativas).

## Accesibilidad e inclusión

Sin requisito formal en `PRODUCT.md`. Lo que ya cumple el código:

- Contenido y contacto alcanzables sin WebGL ni JS (compuertas `data-gl` y `fx`).
- `prefers-reduced-motion` respetado en revelaciones, flujo, parpadeo y vaivén (con la excepción PORT-9).
- Foco por teclado visible: contorno rojo de 3 px (`app/globals.css:88-91`); el foco en los enlaces de contacto también abre la válvula (`pipe-scene.ts:446-447`).
- HTML semántico: un `h1`, `h2` por sección con `aria-labelledby`, `h3` por etapa, lista ordenada para la cadena de voz, lista de definiciones para las herramientas. Escena e instrumentos con `aria-hidden`.
- Contraste de texto sobre el muro medido (≥5,27 : 1 en todos los pares; ver [`sistema-visual.md`](./sistema-visual.md)).

`Pendiente`: confirmar WCAG AA como criterio con la persona; medir el nombre sobre la tubería renderizada; probar con lector de pantalla y teclado (no se ha hecho).
