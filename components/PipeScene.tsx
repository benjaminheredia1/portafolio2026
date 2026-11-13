"use client";

import { useEffect, useRef } from "react";

/** Lienzo fijo detrás del contenido. Si WebGL falla, la página queda con la tubería en CSS. */
export default function PipeScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let stop = () => {};

    (async () => {
      try {
        const [T, env, scene] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
          import("./pipe-scene"),
        ]);
        if (disposed || !ref.current) return;
        stop = scene.startScene(T, env.RoomEnvironment, ref.current);
        document.documentElement.dataset.gl = "on";
      } catch {
        document.documentElement.dataset.gl = "off";
      }
    })();

    return () => {
      disposed = true;
      stop();
      delete document.documentElement.dataset.gl;
    };
  }, []);

  return <canvas ref={ref} className="scene" aria-hidden="true" />;
}
