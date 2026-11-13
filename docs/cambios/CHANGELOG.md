# Cambios

Registro de cambios en lenguaje de producto, lo más reciente arriba. Cada entrada: `## AAAA-MM-DD — <título>`, con apartados `Agregado`, `Cambiado`, `Arreglado` y, si hubo ciclo, un enlace a su carpeta en `docs/ciclos/`.

## 2026-11-11 — Primera versión del portafolio: el "Colector de Planta"

Se construyó fuera del loop de ciclos, por pedido de la persona (código lo más rápido posible). Revisión visual externa, capturas reales, lint, tipos y build limpios. No hay carpeta de ciclo. Ficha: [`features/portafolio.md`](../features/portafolio.md).

### Agregado

- Página única en español. El scroll recorre una tubería industrial amarilla en 3D sobre un muro de concreto: cada etapa de experiencia cuelga de una brida y el contacto sale como una derivación rotulada "A persona".
- Primer viewport con el nombre sobre la tubería, tres manómetros y tres lámparas arriba, y rol y ciudad al pie.
- Bloque "oficio" con la propuesta (IA en producción, sistemas de salud, ERP y académicos) y las herramientas agrupadas en backend, frontend, IA y automatización, datos e infraestructura.
- Recorrido de seis etapas (de la más reciente a la más antigua) y, en Nexus Patio Tech, la cadena del agente de voz: VAD, STT, LLM y TTS, una brida por paso.
- Apartado "Encargos" con tres clientes freelance, sin fechas.
- Contacto por LinkedIn y por un agregador de canales. Al pasar el puntero o enfocar un enlace de contacto, el volante gira y el flujo de la tubería se acelera.
- Revelado al scroll con dos gestos propios: los títulos se descubren de izquierda a derecha y los bloques suben con un fundido.
- La tubería sigue al scroll y reacciona al puntero con un leve paralaje; un pulso de luz viaja por ella.
- Sin WebGL, sin JavaScript o si el navegador pierde el contexto gráfico, el sitio sigue completo: se ve la tubería pintada en CSS y todo el texto y los enlaces.
- Con movimiento reducido, las revelaciones se muestran sin animar, el flujo y el giro autónomo se detienen y la lámpara no parpadea. Quedan pendientes el volante y dos agujas ligados al scroll (ver [`deuda.md`](../deuda.md) PORT-9).

### Cambiado

- Se reemplazó la página de bienvenida de create-next-app, el título genérico de la pestaña ("Create Next App") y el idioma `en` por contenido real, título y descripción en español y `lang="es"`.
- Tipografía: Anton para los títulos, Barlow para el texto y Barlow Condensed para los rótulos, en lugar de las fuentes del boceto (Impact y Bahnschrift, que solo existen en Windows). Ver [0001](../decisiones/0001-anton-en-vez-de-impact.md) y [0002](../decisiones/0002-barlow-para-texto-y-rotulos.md).
- Se quitó el modo oscuro automático de la plantilla: el sitio es un solo muro claro.
- Nuevas dependencias: `three` y `aos` (y sus tipos).

### Arreglado

Nada: es la primera versión.

### Pendiente de confirmar

Nombre del empleador actual ("trabajito"), presentación de los clientes freelance, enlace al CV, idioma y disponibilidad, y medir el peso y la paridad de scroll en un móvil real. Detalle en [`deuda.md`](../deuda.md).
