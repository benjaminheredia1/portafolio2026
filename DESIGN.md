---
name: Benjamin Heredia, Colector de planta
description: Portafolio como sala de máquinas bajo tubo fluorescente. Una tubería amarilla cruza un muro de concreto gris y lleva el recorrido; un volante rojo marca lo único que se acciona.
colors:
  wall: "#d7dad0"
  wall-deep: "#c6cabf"
  ink: "#20272c"
  ink-soft: "#3a444b"
  pipe-yellow: "#e3b01a"
  pipe-yellow-deep: "#a87d06"
  valve-red: "#a3231a"
  lamp-green: "#4f7d32"
  gauge-face: "#eceee4"
  gauge-rim: "#2b3338"
typography:
  display:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(56px, 10vw, 150px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0em"
  headline:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(40px, 6.2vw, 92px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0em"
  title:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(30px, 4.2vw, 60px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0em"
  body:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(17px, 1.3vw, 19px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.16em"
rounded:
  lamp: "50%"
  pipe-elbow: "160px"
spacing:
  gutter: "clamp(16px, 3.9vw, 56px)"
  gap: "clamp(14px, 3vw, 56px)"
  pipe: "160px"
  pipe-mobile: "44px"
components:
  link-valve:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
  link-valve-hover:
    backgroundColor: "{colors.pipe-yellow}"
  stage-tag:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  gauge:
    backgroundColor: "{colors.gauge-face}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lamp}"
  lamp-amber:
    backgroundColor: "{colors.pipe-yellow}"
    rounded: "{rounded.lamp}"
    size: "30px"
---

# Design System: Benjamin Heredia, Colector de planta

## Overview

**Creative North Star: "El Colector de Planta"**

La escena es una sala de máquinas bajo un tubo fluorescente: un muro de concreto gris claro con juntas de panel y agujeros de tensor, y una tubería industrial amarilla que lo cruza. La tubería es el hilo del documento. Nace horizontal en el héroe, hace un codo hacia abajo y corre como columna a la derecha de todo el contenido; en el contacto sale una derivación. El contenido vive a la izquierda, sobre el muro, y cada etapa del recorrido se rotula con una pieza, una brida con su etiqueta.

La estrategia de color es restringida con un acento rojo: concreto gris y tinta casi negra llevan la página, el amarillo pertenece a la tubería (y a su eco en viñetas, selección y subrayado de enlaces), el rojo se reserva para lo que se acciona o se señala (volante de la válvula, foco de teclado, cargo de cada etapa, título de contacto, agujas de los manómetros). No hay rasters en el build. La materia está en una escena three.js (pintura física con pulso, bridas, válvulas, sombra sobre el muro, iluminación de ambiente tipo sala, mapeo de tono neutro) y, si WebGL falla, en la misma tubería pintada con degradados CSS.

El tono visual es denso, sobrio y mecánico. Tipografía condensada en mayúsculas, rejilla de ingeniería, instrumentos (manómetros y lámparas) como firma del héroe. Movimiento con propósito: lo que se mueve responde al scroll o indica estado.

**Key Characteristics:**
- Muro de concreto fijo, tubería amarilla que lleva la lectura, rojo solo para lo accionable o señalado.
- Display en Anton mayúsculas, etiquetas en Barlow Condensed con tracking ancho, cuerpo en Barlow.
- Cero rasters: la materia es three.js más CSS; la tubería CSS es la imagen de reserva y de carga.
- Contenido en una columna izquierda con la espina de tubería a la derecha; una sola columna en móvil.
- Revelaciones con dos gestos y un solo easing; reduced-motion apaga lo ornamental.

## Colors

Paleta de planta industrial: concreto gris verdoso, tinta de acero, un amarillo de pintura de seguridad y un rojo de volante. Rojo y amarillo nunca comparten protagonismo en el mismo elemento.

### Primary
- **Amarillo de Tubería** (#e3b01a): la pintura de la tubería (en CSS el degradado vertical y horizontal va de #8f6a00 a #f6d25a y a #6e5000 para dar volumen), selección de texto, subrayado de los enlaces de contacto, lámpara ámbar.
- **Amarillo Oxidado** (#a87d06): viñetas cuadradas de las listas, barra de scroll. Es el amarillo de las superficies pequeñas sobre muro, donde el brillante pierde contraste.

### Secondary
- **Rojo de Volante** (#a3231a): volante de las válvulas, anillo de foco (3px, offset 3px), cargo de cada etapa, el título A PERSONA del contacto, aguja de manómetros.

### Tertiary
- **Verde de Lámpara** (#4f7d32): solo lámparas de estado en el héroe (el relleno de la lámpara usa #5f8a3a, una variante más clara).

### Neutral
- **Concreto Claro** (#d7dad0): muro, fondo de html y body, sobre el que se dibujan paneles, juntas y grano.
- **Concreto Hondo** (#c6cabf): carril de la barra de scroll.
- **Tinta de Acero** (#20272c): todo el texto principal, filetes de 3px de las fichas, marcas de los manómetros.
- **Tinta Suave** (#3a444b): metadatos, etiquetas, guías punteadas.
- **Cara de Manómetro** (#eceee4) y **Aro** (#2b3338): solo los instrumentos del héroe.

### Named Rules
**La Regla del Volante.** El rojo marca lo que se acciona o se señala. Cualquier superficie nueva que lo use como decoración lo gasta.
**La Regla de la Tubería.** El amarillo brillante es pintura de tubería. En superficies pequeñas sobre el muro se usa el amarillo oxidado.

## Typography

**Display Font:** Anton (con Arial Narrow, sans-serif)
**Body Font:** Barlow 400/500/600 (con Arial, sans-serif)
**Label Font:** Barlow Condensed 500/600 (con Arial Narrow, sans-serif)

**Character:** Anton es rotulado de maquinaria, apretado y pesado; Barlow Condensed es la placa de datos; Barlow, humano y legible, lleva la lectura. Fuentes cargadas con next/font.

### Hierarchy
- **Display** (Anton 400, clamp(56px, 10vw, 150px), 0.9): título de contacto. El nombre del héroe va aún mayor (min(10.2vw, 156px), 0.9, una línea sobre la tubería; 21vw máx. 110px apilado en móvil).
- **Headline** (Anton 400, clamp(40px, 6.2vw, 92px), 0.95, mayúsculas, máx. 17ch): títulos de sección. Enlaces de contacto en clamp(34px, 5vw, 72px).
- **Title** (Anton 400, clamp(30px, 4.2vw, 60px), 1): empresa por etapa; clamp(26px, 2.6vw, 36px) para encargos.
- **Body** (Barlow 400, clamp(17px, 1.3vw, 19px), 1.55, máx. 62ch): prosa y viñetas. La cadena de voz sube a Barlow 500 clamp(19px, 1.75vw, 25px).
- **Label** (Barlow Condensed 600, 12 a 18px, tracking 0.14 a 0.16em, mayúsculas): leyendas de manómetros, términos de las fichas, ubicación, idiomas, pie. Cargo del héroe en clamp(22px, 3.2vw, 46px), tracking 0.12em; cargo de etapa en clamp(18px, 1.7vw, 24px), rojo.

### Named Rules
**La Regla de la Placa.** Anton solo para rotular (nombres, secciones, etiquetas de brida); todo lo que se lee de corrido va en Barlow.

## Layout

Modelo de dos carriles. El héroe ocupa al menos una pantalla (min-height max(100svh, 640px)): manómetros y lámparas arriba, la tubería horizontal con el nombre al centro vertical, cargo y lugar abajo. Después, `.line` deja a la derecha una columna reservada (gutter + 1.45 veces el diámetro de tubería + gap) para la espina, y el contenido corre a la izquierda. Las secciones se separan con padding superior clamp(64px, 9vw, 140px); las etapas con clamp(48px, 7vw, 104px) y altura mínima de 1.3 veces el diámetro de tubería, para que cada una pueda alinear una brida.

Variables base: tubería 160px (44px bajo 720px), gutter clamp(16px, 3.9vw, 56px), gap clamp(14px, 3vw, 56px). Las fichas de herramientas son dos columnas con filete superior de 3px (una columna bajo 720px). Cada herramienta es una pieza que no se parte (inline-block, nowrap, separada con punto medio). Único breakpoint: 720px; el nombre del héroe se apila sobre la tubería y el lugar se divide en líneas.

La escena three.js usa cámara perspectiva calibrada a 1 unidad = 1 px CSS en z=0, de modo que la geometría 3D se alinea con anclas del DOM (`data-anchor`, `data-flange`, `data-valve`).

## Elevation & Depth

Híbrido: el muro es plano y la profundidad viene de la tubería, que es un volumen real iluminado (pintura física con clearcoat, metal en bridas y válvulas, luz hemisférica más direccional, entorno de sala) y proyecta una sombra suave sobre el muro (ShadowMaterial, tinta cálida al 30%). Los elementos DOM son planos: sin tarjetas ni sombras de interfaz.

### Shadow Vocabulary
- **Instrumento** (`filter: drop-shadow(0 4px 5px rgba(0,0,0,0.3))`): manómetros del héroe, que sobresalen del muro.
- **Lámpara** (`box-shadow: 0 3px 6px rgba(0,0,0,0.35)`): lámparas de estado.
- **Subrayado de enlace** (`box-shadow: inset 0 -0.14em 0 #e3b01a`, en hover `inset 0 -1.1em 0`): no es sombra, es un relleno amarillo que sube.

### Named Rules
**La Regla del Muro Plano.** El DOM no lleva sombras de interfaz; la única sombra que proyecta es la de la tubería en la escena y la de los instrumentos reales.

## Shapes

Geometría de fontanería: ángulos rectos y un solo gran arco, el codo de la tubería (radio igual al diámetro, 160px, esquina superior derecha del héroe). Instrumentos y lámparas son círculos. Todo lo demás es rectangular sin radio: viñetas cuadradas de 8px, filetes de 3px, guías punteadas de 3px. Pliegues y bridas son parte de la escena, no del DOM.

## Components

### Enlace de válvula (contacto)
Carácter: un rótulo grande que se abre como una válvula.
- **Forma:** texto Anton en mayúsculas sin radio, sin subrayado de texto; filete amarillo de 0.14em abajo.
- **Hover / Focus:** el relleno amarillo sube a 1.1em en 0.35s con el easing de la página; el foco usa el anillo rojo de 3px. En escena, el volante rojo de la válvula acompaña al enlace.

### Etapa del recorrido
- Cabecera en grid: empresa en Anton, cargo en rojo, metadatos en Barlow 16px tinta suave, y a la derecha la etiqueta del año (Anton) con una línea de 3px que la une a la tubería.
- Viñetas: cuadrado amarillo oxidado de 8px, texto a 62ch.

### Cadena de voz
- Lista de cuatro pasos (VAD, STT, LLM, TTS): frase, guía punteada de 3px al 60% de opacidad, y etiqueta de brida a la derecha pegada a la tubería.

### Ficha de herramientas
- Dos columnas con filete superior de 3px; término en etiqueta condensada, valor en Barlow 500.

### Manómetros y lámparas (firma del héroe)
- Tres manómetros: Señal (aguja ligada al valor de scroll `--v`), Recorrido (`--p`, avance total) y Carga (oscila sola, 6s). Aguja roja, barrido de -120° a +120°. Lámparas: dos verdes y una ámbar que parpadea a pasos (2.4s). Son decorativos y van `aria-hidden`.

## Do's and Don'ts

### Do:
- **Do** mantener el muro #d7dad0 con tinta #20272c; el contraste del texto es la base de la legibilidad.
- **Do** reservar el rojo #a3231a para lo accionable y señalado (volante, foco, cargo, A PERSONA, agujas).
- **Do** rotular en Anton mayúsculas y leer en Barlow; etiquetas pequeñas en Barlow Condensed con tracking 0.14 a 0.16em.
- **Do** usar un solo easing, cubic-bezier(0.16, 1, 0.3, 1), y dos gestos de revelación: `plate` (clip-path de izquierda a derecha, para títulos) y `stage` (fundido más 36px de subida, para bloques).
- **Do** acotar el movimiento a la clase `html.fx`; con reduced-motion se apagan la oscilación del manómetro y el parpadeo de la lámpara y la transición del lienzo.
- **Do** mantener la tubería CSS como imagen de reserva y de carga; el lienzo entra con fundido de 0.9s (`html[data-gl="on"]`).

### Don't:
- **Don't** introducir rasters o ilustraciones: la materia se construye con three.js y CSS.
- **Don't** usar tarjetas, sombras de interfaz o esquinas redondeadas en el DOM.
- **Don't** poner amarillo brillante como relleno de pequeñas superficies sobre el muro; usa el oxidado.
- **Don't** usar rojo como decoración ni mezclarlo con amarillo en el mismo elemento.
- **Don't** dejar que un texto largo use Anton o Barlow Condensed.
