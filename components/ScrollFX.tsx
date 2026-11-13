"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Revelaciones al hacer scroll (AOS) y dos variables CSS que mueven los
 * instrumentos: --p (avance 0..1 del recorrido) y --v (velocidad suavizada).
 */
export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    AOS.init({
      duration: 900,
      once: true,
      offset: 60,
      disable: () => reduce.matches,
    });
    // El estado oculto de las revelaciones solo existe una vez que AOS arrancó:
    // si el script falla, el contenido queda visible.
    root.classList.add("fx");
    document.fonts?.ready.then(() => AOS.refresh());

    let last = window.scrollY;
    let v = 0;
    let lastP = "";
    let lastV = "";
    let raf = 0;

    const tick = () => {
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const dv = Math.min(1, Math.abs(y - last) / 70);
      last = y;
      v += (dv - v) * 0.1;

      const p = (y / max).toFixed(4);
      const vs = v.toFixed(3);
      if (p !== lastP) {
        root.style.setProperty("--p", p);
        lastP = p;
      }
      if (vs !== lastV) {
        root.style.setProperty("--v", vs);
        lastV = vs;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("fx");
    };
  }, []);

  return null;
}
