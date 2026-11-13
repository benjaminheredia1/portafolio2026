# 0004 · AOS con dos animaciones propias (`plate` y `stage`)

Fecha: 2026-11-11 · Estado: vigente · Sin ciclo.

## Contexto

El pedido incluía un efecto de revelado al scroll "tipo AOS". `PRODUCT.md` dejaba abierta la elección (AOS o equivalente propio). Hacía falta que el contenido no dependa de JS para verse y que `prefers-reduced-motion` lo respete.

## Decisión

1. **Librería**: `aos` 2.3.4 (`package.json:12`) con `@types/aos`. `ScrollFX` la inicia con `duration: 900`, `once: true`, `offset: 60` y `disable: () => reduce.matches` (`components/ScrollFX.tsx:16-21`). La hoja base de AOS se importa (`:5`).
2. **Dos gestos propios, no los de la librería**: en el marcado solo se usan los valores `data-aos="plate"` y `data-aos="stage"` (`app/page.tsx`). Su estado visual está definido en `app/globals.css:586-606`:
   - `plate` (títulos): se descubre con `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, de izquierda a derecha, como una placa que se destapa.
   - `stage` (bloques de contenido): `opacity: 0` y `translate3d(0, 36px, 0)` → visible.
3. **Un solo easing** para todo el sitio: `body [data-aos] { transition-timing-function: var(--ease) !important }` (`app/globals.css:588-590`). El `!important` es necesario porque AOS fija su propio easing con atributos (`data-aos-easing`).
4. **Compuerta `html.fx`**: los estados ocultos solo existen con `html.fx`, clase que `ScrollFX` añade **después** de `AOS.init` (`ScrollFX.tsx:22-24`). Si el script falla o no corre, el contenido queda visible.
5. **Movimiento reducido**: `AOS.init` con `disable` verdadero hace que AOS quite los atributos `data-aos` (`node_modules/aos/src/js/aos.js:73-80`, `:117-119`), con lo que las reglas `html.fx [data-aos=…]` dejan de aplicar y el contenido aparece sin animar.
6. **Refresco tras fuentes**: `document.fonts.ready.then(() => AOS.refresh())` recalcula los disparadores cuando cambia la altura del contenido (`ScrollFX.tsx:25`).

## Alternativas descartadas

- **Gestos de AOS por defecto (`fade-up`, etc.)**: no se usan. Motivo no registrado; coherente con el principio de UX "que se note una persona" ([`../diseno/principios-ux.md`](../diseno/principios-ux.md)).
- **Observador de intersección propio (sin librería)**: `PRODUCT.md` lo admitía como "equivalente propio"; la persona pidió el efecto tipo AOS y se usó la librería.
- **Ocultar el contenido por defecto en CSS**: dejaría la página en blanco sin JS. Descartado por el principio "contenido y contacto legibles sin WebGL ni JS".

## Consecuencias

- Una dependencia más (`aos`) y su hoja CSS en el bundle; peso sin medir.
- `data-aos` anidados (los `li` de la cadena de voz dentro de la etapa, `app/page.tsx:164`, `:193`) se animan por separado.
- **Riesgo de alineación, no descartado**: el `.tag` de cada etapa (`data-flange`) está dentro de un `article[data-aos="stage"]`, que arranca con `translate3d(0, 36px, 0)`. La escena mide con `getBoundingClientRect`, que incluye ese transform, y solo se reconstruye al redimensionar, al cargar fuentes o al cambiar el tamaño del `body` (`components/pipe-scene.ts:223-237`, `:430-440`). Si `build()` corre con la etapa aún sin revelar, su brida quedaría hasta 36 px más abajo. La captura de revisión `.impeccable/review/e1-2700.png` muestra VAD, STT, LLM y TTS alineados con sus bridas, pero no prueba la carga en frío sin redimensionar. Pendiente: verificar y, si hace falta, medir sin transform ([`../deuda.md`](../deuda.md) PORT-6).
- Con movimiento reducido, AOS elimina los atributos del DOM y no los restaura si la preferencia cambia en caliente.
