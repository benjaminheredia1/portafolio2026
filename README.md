# Portafolio 2026 · Colector de planta

Mi portafolio personal, pensado como una sala de máquinas: una tubería amarilla cruza un muro de concreto y te lleva por el recorrido mientras haces scroll. Un volante rojo marca lo único que se acciona.

🔗 **En vivo:** https://portafolio2026-lovat.vercel.app

Dejo el código abierto para que lo uses de base y armes **tu propio portafolio**. No hace falta que se parezca al mío. Mejor que no.

## Qué tiene

- Una sola página, rápida y estática.
- Tubería 3D con **three.js** que se alinea con el texto y reacciona al scroll.
- Revelado al hacer scroll con **AOS**.
- Si el 3D falla o el navegador no soporta WebGL, la página sigue funcionando con una tubería en CSS.
- Respeta `prefers-reduced-motion`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) y React 19
- Tailwind CSS 4 (solo la base; el diseño está en `app/globals.css`)
- three.js y AOS
- TypeScript

## Cómo usarlo

Necesitas Node.js 20 o superior.

```bash
git clone https://github.com/benjaminheredia1/portafolio2026.git mi-portafolio
cd mi-portafolio
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Los cambios se ven al guardar.

## Qué cambiar para hacerlo tuyo

| Qué | Dónde |
|---|---|
| Título y descripción de la pestaña (SEO) | `app/layout.tsx`, objeto `metadata` |
| Tu nombre, ubicación, experiencia, proyectos y enlaces de contacto | `app/page.tsx` (todo el contenido está escrito a mano en JSX, no hay base de datos) |
| Colores, tipografías y espaciados | `app/globals.css`, variables en `:root` |
| Fuentes | `app/layout.tsx` (`next/font/google`) |
| Favicon | `app/favicon.ico` |

Tips:

- Para añadir un hito al recorrido, agrega `data-flange` al elemento. La tubería lee el HTML para saber dónde dibujar, así que no hay que tocar la escena 3D.
- Para cambiar el grosor de la tubería, cambia `--pipe` en `app/globals.css`.
- Si mueves el HTML de lugar, revisa que sigan los atributos `data-anchor`, `data-flange` y `data-valve`. Con ellos la escena se alinea con el texto.

### Antes de publicar el tuyo

Este repo trae **mis datos personales** (nombre, ciudad, experiencia y enlace de LinkedIn). Reemplázalos por los tuyos en `app/page.tsx` y `app/layout.tsx`.

Los archivos `PRODUCT.md`, `DESIGN.md` y las carpetas `docs/` y `.impeccable/` son las notas de diseño de mi portafolio, con mi información. Bórralos o reescríbelos para el tuyo.

## Publicarlo

La forma más fácil es [Vercel](https://vercel.com/new): importa tu repo y listo, no necesita variables de entorno.

```bash
npm run build   # genera la versión de producción
npm run start   # la sirve en local
```

## Nota sobre Next.js

Esta versión de Next.js trae cambios respecto a lo que quizá conoces. Si vas a tocar la configuración o el código de Next, consulta primero la guía incluida en `node_modules/next/dist/docs/`.

## Créditos

Diseño y código por **Benjamin Heredia**, ingeniero de sistemas en Santa Cruz de la Sierra, Bolivia.

- GitHub: [@benjaminheredia1](https://github.com/benjaminheredia1)
- LinkedIn: [Benjamin Heredia](https://www.linkedin.com/in/pablobenjaminheredia)

Si usas este proyecto como base, una mención o una ⭐ en el repo se agradece mucho. Y si lo haces, escríbeme, me encantaría ver tu portafolio.

## Licencia

[MIT](LICENSE) © 2026 Benjamin Heredia. Puedes usarlo, copiarlo y modificarlo libremente, incluso para uso comercial. Solo conserva el aviso de copyright y la licencia en las copias.

Esa licencia cubre el código. Mi nombre, mi experiencia, mis textos y mis datos de contacto son míos: reemplázalos por los tuyos.
