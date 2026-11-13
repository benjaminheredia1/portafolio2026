# Documentación del proyecto

Memoria del proyecto `portafolio`: portafolio web personal de Benjamin Heredia (Next.js 16.4.6 App Router, React 19.3.0, TypeScript, three.js 0.187, AOS 2.3.4; Tailwind 4.3.3 solo como base). Estado al 2026-11-11: la página "Colector de Planta" está construida (tubería amarilla en three.js, bridas, manómetros, volantes, contenido en español) y sin commitear. Se hizo fuera del loop de ciclos, por pedido expreso de la persona; no hay carpeta `ciclos/`. Sin tests automáticos.

**Antes de escribir código Next, lee la guía relevante en `node_modules/next/dist/docs/`.** Este Next tiene cambios incompatibles (regla de `AGENTS.md`). Detalle y guías por tema en [`arquitectura/estructura.md`](./arquitectura/estructura.md).

## Índice

| Documento | Para qué |
|---|---|
| [`arquitectura/estructura.md`](./arquitectura/estructura.md) | Stack con versiones, configuración, carpetas, archivos de `app/` y `components/`, **cómo se alinea el DOM con la escena** (`data-anchor`, `data-flange`, `data-valve`), compuertas `data-gl` y `html.fx`, fallback CSS de la tubería, rutas |
| [`features/portafolio.md`](./features/portafolio.md) | Ficha de la página `/`: secciones, flujo, estados, reglas de contenido, archivos, cómo probarla a mano |
| [`pruebas/estrategia.md`](./pruebas/estrategia.md) | Capas de test, sección **Comandos** (lint, tipos, build, start, dev) y huecos: no hay runner de tests ni capturas reproducibles |
| [`diseno/sistema-visual.md`](./diseno/sistema-visual.md) | Tokens reales de `app/globals.css`, tipografía, escala, componentes, contraste, paleta de la escena |
| [`diseno/principios-ux.md`](./diseno/principios-ux.md) | Para quién es, estructura de la experiencia, tono, qué se puede afirmar y cómo está hoy, señales de mala experiencia |
| [`decisiones/README.md`](./decisiones/README.md) | Decisiones 0001 a 0004 (Anton, Barlow, lienzo fijo a px, AOS `plate`/`stage`) y decisiones abiertas |
| [`deuda.md`](./deuda.md) | Deuda: heredada del esqueleto (ARR) y del portafolio (PORT-1 a PORT-15) |
| [`cambios/CHANGELOG.md`](./cambios/CHANGELOG.md) | Cambios en lenguaje de producto |

## Fuentes fuera de `docs/`

Se enlazan, no se duplican.

- [`PRODUCT.md`](../PRODUCT.md): producto, usuarios, posicionamiento, contenido permitido, decisiones abiertas. Los datos de contacto de la persona son privados y no están en `docs/`.
- [`.impeccable/surfaces/app-page-tsx.md`](../.impeccable/surfaces/app-page-tsx.md): dirección de diseño (desactualizada en tipografía: ver decisiones 0001 y 0002).
- [`.impeccable/mocks/decision/assigned.html`](../.impeccable/mocks/decision/assigned.html): boceto de referencia.
- `.impeccable/review/*.png`: capturas de revisión hechas a mano (sin commitear).
- [`AGENTS.md`](../AGENTS.md): regla de leer la documentación de Next antes de escribir código.
- Contrato del ciclo: `~/.claude/skills/ciclo/contrato.md` (el proyecto no tiene `docs/ciclos/README.md` propio). El próximo cambio debería pasar por `/ciclo`; esta documentación está pensada para alimentar su `00-contexto.md`.

## Comandos rápidos

`npm run lint` · `npx tsc --noEmit` · `npm run build` · `npm run start -- -p 3100` · `npm run dev -- -p 3100`. Resultados comprobados y avisos (el puerto 3000 suele estar ocupado por el servidor de la persona) en [`pruebas/estrategia.md`](./pruebas/estrategia.md).

## Pendiente de la persona

Nombre del empleador actual, presentación de los clientes freelance, CV, canales de contacto, idioma, disponibilidad, dominio y hosting. Ver [`decisiones/README.md`](./decisiones/README.md) y [`deuda.md`](./deuda.md).
