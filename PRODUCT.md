# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Base existente: Next.js 16.4.6 (App Router), React 19.3.0, Tailwind 4.3.3, TypeScript. La persona pidió explícitamente three.js para las animaciones 3D y un efecto estilo AOS (animate on scroll) para las revelaciones al hacer scroll. La elección concreta de librerías (three.js directo o `@react-three/fiber`, AOS o equivalente propio) queda delegada a la implementación; no están instaladas todavía.

## Users

Portafolio personal de Pablo Benjamin Heredia Ruiz, ingeniero de sistemas en Santa Cruz de la Sierra, Bolivia.

Visitantes confirmados:
- **Reclutadores y empresas tech** (local o remoto internacional). Situación: tienen varios perfiles abiertos y deciden en pocos minutos si contactar. Trabajo: ubicar qué sabe hacer, con qué stack y con qué nivel de responsabilidad, y llegar al CV o al contacto.
- **Clientes freelance.** Situación: necesitan un sistema, un bot o una automatización. Trabajo: juzgar si esta persona puede resolver su problema y escribirle con un proyecto concreto.

No confirmados (no diseñar para ellos): comunidad competitiva, ICPC, CTF u open source.

## Product Purpose

Que una persona que decide (contratar o encargar un trabajo) entienda en una visita quién es Benjamin, qué construye y por qué confiar en que lo entrega, y que tenga una vía directa para contactarlo. Éxito: un reclutador o cliente potencial termina la visita con una idea clara de su perfil y da el paso de contactarlo o abrir su CV.

## Positioning

Dos ejes que la persona confirmó como defendibles:
1. **Full-stack que mete IA y automatización en producción**: integración de LLMs, LangChain, bot de autoservicio con IA, workflows en n8n y Make, junto con Laravel, NestJS, React, Next.js, Flutter y Angular.
2. **Sistemas reales de salud, ERP y académicos**: sistemas hospitalarios y de gestión de pacientes, ERP y plataformas académicas universitarias, con refactor de código legado. Este eje sale del CV (`CV BENJAMIN.docx`); `Profile.pdf` no lo repite con esas palabras. La cifra "hasta 80 %" de mejora en segmentos mal escritos es solo del CV: no publicarla sin que la persona la reconfirme.

La mentalidad competitiva y de seguridad (ICPC, CTF, ciberseguridad, ajedrez, literatura de filosofía) **no** se marcó como posicionamiento principal. Puede aparecer como contexto personal si aporta, no como eje del sitio.

## Operating Context

- `Profile.pdf` (export de LinkedIn, carpeta Descargas de la persona) es la fuente de las experiencias que la persona **sí quiere mostrar**. El CV (`CV BENJAMIN.docx`, misma carpeta) queda como fuente secundaria. Los datos de contacto de ambos son privados: no copiarlos al repositorio ni enviarlos a servicios externos sin aprobación explícita.
- Quien lo visita lo evalúa dentro de una lista de candidatos o proveedores: poco tiempo, probable móvil o laptop de trabajo.
- Las entradas del CV cuyas fechas se superponen con otras **son clientes freelance**, no empleadores simultáneos (aclaración de la persona). No se muestran como empleos ni se "corrigen" las fechas; cómo se presentan (por nombre o agrupadas como "Freelance") es decisión abierta.

## Capabilities and Constraints

- Pedido explícito: animaciones de scroll estilo AOS, animaciones 3D con three.js y un resultado que no se vea genérico ni hecho por IA.
- Proyecto Next.js 16 con cambios incompatibles frente a versiones anteriores: leer `node_modules/next/dist/docs/` antes de escribir código (regla de `AGENTS.md`).
- Experiencias a mostrar, según `Profile.pdf` (de la más reciente a la más antigua):
  - "trabajito", Full-stack developer, sep 2026 a la fecha (puesto actual; el nombre de la empresa parece provisional, ver decisiones abiertas).
  - Nexus Patio Tech, AI Software Engineer, abr 2026 a sep 2026: agente de voz para kioscos de autoservicio (VAD, STT, LLM con tool calling, TTS; consulta de productos, inventario, precios y armado de pedidos); IA conversacional por WhatsApp para ventas y soporte con escalamiento a una persona; automatizaciones en n8n; estrategia de despliegue con Docker y dokploy.
  - Nexus Patio Tech, Back End Developer, feb 2026 a jun 2026: Express.js, PostgreSQL y MySQL, APIs REST, integraciones de pagos, WhatsApp Business y ERP.
  - PuntoCom SRL (Montero), AI Automation Developer, ene 2025 a feb 2026: flujos n8n en producción, clasificación y ruteo con GPT-4, lógica de decisión para escalar a una persona, documentación y entrega.
  - Desarrollamelo, Full-Stack Developer, jun 2024 a ene 2025: Laravel, tiempo completo, remoto, último nivel de escalamiento de soporte técnico.
  - Desarrollamelo, Web Developer (pasantía), ene 2024 a jun 2024: Laravel y PHP.
- Clientes freelance (CV, fechas superpuestas con lo anterior): Boring Ventures (Cochabamba, Fullstack AI Engineer, Next.js y Supabase), Rocaz Soluciones (servidores en Hostinger, Laravel, MySQL, mantenimiento de código sin documentar) y el trabajo en UTEPSA (mesa de ayuda y luego sistemas académicos con Vue, React, Laravel y Python; automatizaciones n8n y Selenium, LangChain, Google SDK). Falta confirmar cuáles se muestran y con qué nombre. Las fechas del CV para estos y para Nexus Patio Tech y PuntoCom difieren de `Profile.pdf`; manda `Profile.pdf`.
- Formación: ingeniería en sistemas en UTEPSA. `Profile.pdf` dice feb 2024 a dic 2027 (cursando); el CV decía promedio 90 y año 2024. Discrepancia sin resolver: no publicar promedio ni fecha de egreso hasta confirmar. Participación en ICPC, curso básico de Python impartido y curso CCNA vienen solo del CV.
- Perfil público de LinkedIn: titular "Full-stack developer", aptitudes LangChain, ingeniería web e industria del software.
- Habilidades: MySQL, Docker, Docker Compose, AWS, Laravel, React, NestJS, Next.js, Postgres, Python, Django.
- Idiomas: español nativo, inglés A2.
- Laboratorios: RNN, Python y automatización.
- Decisiones abiertas (no inventar):
  - **Idioma del sitio**: español, inglés o ambos. Con inglés A2 y público internacional posible, conviene decidirlo explícitamente.
  - **Disponibilidad y situación laboral actual**: `Profile.pdf` muestra un puesto vigente desde sep 2026. No se sabe si el sitio busca empleo, proyectos freelance o ambos.
  - **Nombre del empleador actual**: "trabajito" parece un nombre provisional; confirmar cómo se escribe o si se omite.
  - **Presentación de los clientes freelance**: por nombre, agrupados como "Freelance", o solo los que la persona autorice.
  - **Dominio, hosting y despliegue**: sin definir.
  - **Forma de contacto**: qué canales se publican (correo, LinkedIn, GitHub, WhatsApp).

## Evidence on Hand

La persona confirmó que tiene, pero **aún no entregó** (no hay archivos ni URLs en el repo):
- proyectos con capturas o demo;
- perfiles públicos de GitHub y LinkedIn;
- una foto o retrato.

`Profile.pdf` (4 páginas) trae las experiencias a mostrar, pero varias viñetas conservan **marcadores sin rellenar** de plantilla (`[N]`, `[X] to [Y]`, `[target]`, `[N users]`, `[N companies]`, `[N tickets]`, `[CRM, inventory, orders, billing]`, `[product]`). No son cifras ni afirmaciones: no se publican ni se reemplazan por valores inventados. La persona debe entregar los valores reales o se omiten esas frases. Contacto publicado en el perfil: LinkedIn y un enlace de linktr.ee (más teléfono y correo, privados); qué canales salen en el sitio sigue abierto.

El CV contiene una sola imagen de 70 bytes, inutilizable. No hay testimonios, clientes con nombre autorizado, métricas propias fuera de lo que dice el CV, ni casos de estudio escritos. Cualquier proyecto, captura, cifra o cita que no venga de la persona o del CV no se fabrica. Mientras falten los materiales, el sitio se arma con trayectoria, stack y lo que el CV sostiene.

## Product Principles

1. **El CV manda; nada inventado.** Solo se afirma lo que el CV o la persona respaldan. Sin proyectos, métricas ni testimonios de relleno.
2. **Mostrar el oficio, no listar tecnologías.** La IA aplicada en producción y los sistemas reales (salud, ERP, academia) son la prueba; la lista de herramientas es apoyo.
3. **Una visita, una decisión.** Quien evalúa debe poder entender el perfil rápido y llegar al contacto o al CV sin buscar.
4. **Que se note una persona.** El sitio no puede parecer plantilla ni salida de IA: criterio explícito de la persona, y vale para el contenido tanto como para lo visual.
5. **Contacto privado por defecto.** Datos personales solo los que la persona decida publicar.

## Accessibility & Inclusion

Sin requisito específico establecido. Criterio razonable a confirmar al diseñar: contenido y contacto alcanzables sin depender de WebGL, y respeto de `prefers-reduced-motion` en las animaciones 3D y de scroll.
