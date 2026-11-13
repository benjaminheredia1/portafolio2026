import type * as THREE from "three";

type ThreeNS = typeof import("three");
type EnvCtor = new () => THREE.Scene;

/**
 * Tubería industrial en three.js, atada a la página.
 *
 * Una cámara en perspectiva con el plano z=0 calibrado a 1 unidad = 1 px CSS:
 * lo que el DOM mide (anclas data-anchor / data-flange) se dibuja en el mismo
 * sitio. La cámara solo baja con el scroll; el paralaje del puntero usa
 * lookAt, así el plano de texto no se desplaza y solo las bridas, el volante y
 * el relieve se mueven contra él.
 */
export function startScene(
  T: ThreeNS,
  RoomEnvironment: EnvCtor,
  canvas: HTMLCanvasElement,
): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;
  renderer.toneMapping = T.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new T.Scene();
  const pmrem = new T.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.5;

  const FOV = 30;
  const camera = new T.PerspectiveCamera(FOV, 1, 100, 7000);

  const hemi = new T.HemisphereLight(0xf4f1e6, 0x6b6a5a, 0.55);
  scene.add(hemi);
  const key = new T.DirectionalLight(0xfff1d6, 2.6);
  key.castShadow = true;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 5;
  scene.add(key, key.target);

  // Materiales compartidos
  const noise = makeNoise(T);
  const uTime = { value: 0 };

  const flangeMat = new T.MeshStandardMaterial({
    color: 0xcf9d10,
    roughness: 0.5,
    metalness: 0.45,
  });
  const boltMat = new T.MeshStandardMaterial({
    color: 0x4b5258,
    roughness: 0.45,
    metalness: 0.85,
  });
  const redMat = new T.MeshStandardMaterial({
    color: 0xb3281d,
    roughness: 0.5,
    metalness: 0.15,
  });
  const steelMat = new T.MeshStandardMaterial({
    color: 0x7a8187,
    roughness: 0.4,
    metalness: 0.9,
  });
  const shadowMat = new T.ShadowMaterial({ color: 0x1b1a12, opacity: 0.3 });

  const wall = new T.Mesh(new T.PlaneGeometry(1, 1), shadowMat);
  wall.receiveShadow = true;
  scene.add(wall);

  let group: THREE.Group | null = null;
  let wheels: THREE.Group[] = [];
  let W = 0;
  let H = 0;
  let camZ = 1600;
  let dirty = true;

  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  let valveTarget = 0;
  let valve = 0;
  let spin = 0;

  function paint(len: number, R: number, glow: number): THREE.MeshPhysicalMaterial {
    const mat = new T.MeshPhysicalMaterial({
      color: 0xe3b01a,
      roughness: 0.42,
      metalness: 0.2,
      clearcoat: 0.4,
      clearcoatRoughness: 0.45,
      bumpMap: noise.clone(),
      bumpScale: 0.5,
    });
    const bm = mat.bumpMap!;
    bm.needsUpdate = true;
    bm.repeat.set(len / 300, (2 * Math.PI * R) / 300);

    const uniforms = {
      uTime,
      uLen: { value: len },
      uGlow: { value: glow },
    };
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = uniforms.uTime;
      sh.uniforms.uLen = uniforms.uLen;
      sh.uniforms.uGlow = uniforms.uGlow;
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying float vU;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvU = uv.x;");
      sh.fragmentShader = sh.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying float vU;\nuniform float uTime;\nuniform float uLen;\nuniform float uGlow;",
        )
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          float s = vU * uLen / 940.0 - uTime;
          float f = fract(s);
          float d = f - 0.5;
          float head = 1.0 - smoothstep(0.008, 0.02, abs(d));
          float trail = smoothstep(-0.16, 0.0, d) * (1.0 - step(0.0, d));
          float pulse = clamp(head + trail * 0.3, 0.0, 1.0) * uGlow;
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.96, 0.8), pulse * 0.6);`,
        )
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
          totalEmissiveRadiance += vec3(1.0, 0.62, 0.15) * pulse * 0.35;`,
        );
    };
    mat.customProgramCacheKey = () => "pipe-pulse";
    return mat;
  }

  function flange(
    at: THREE.Vector3,
    axis: "x" | "y",
    r: number,
    bolts = 8,
  ): THREE.Group {
    const g = new T.Group();
    const th = Math.max(r * 0.3, 11);
    const small = r < 40 ? 5 : 0;
    const ringR = r * 1.3 + small;
    const ring = new T.Mesh(new T.CylinderGeometry(ringR, ringR, th, 56), flangeMat);
    const collar = new T.Mesh(
      new T.CylinderGeometry(r * 1.1 + small * 0.4, r * 1.1 + small * 0.4, th * 1.55, 48),
      flangeMat,
    );
    ring.castShadow = collar.castShadow = true;
    ring.receiveShadow = collar.receiveShadow = true;
    g.add(ring, collar);
    for (let i = 0; i < bolts; i++) {
      const a = (i / bolts) * Math.PI * 2;
      const b = new T.Mesh(
        new T.CylinderGeometry(Math.max(r * 0.075, 2.2), Math.max(r * 0.075, 2.2), th * 1.5, 6),
        boltMat,
      );
      b.position.set(
        Math.cos(a) * (r * 1.2 + small * 0.7),
        0,
        Math.sin(a) * (r * 1.2 + small * 0.7),
      );
      b.castShadow = true;
      g.add(b);
    }
    g.position.copy(at);
    if (axis === "x") g.rotation.z = Math.PI / 2;
    return g;
  }

  /** Cuerpo de válvula + vástago hacia la cámara + volante rojo. Devuelve el volante. */
  function addValve(g: THREE.Group, x: number, y: number, Rb: number): THREE.Group {
    const body = new T.Mesh(
      new T.CylinderGeometry(Rb * 0.78, Rb * 0.9, Rb * 2.2, 32),
      flangeMat,
    );
    body.rotation.x = Math.PI / 2;
    body.position.set(x, y, Rb * 1.1);
    body.castShadow = true;
    g.add(body);

    const stem = new T.Mesh(
      new T.CylinderGeometry(Rb * 0.14, Rb * 0.14, Rb * 1.4, 16),
      steelMat,
    );
    stem.rotation.x = Math.PI / 2;
    stem.position.set(x, y, Rb * 2.8);
    stem.castShadow = true;
    g.add(stem);

    const wr = Rb * 1.75;
    const w = new T.Group();
    const rim = new T.Mesh(new T.TorusGeometry(wr, Math.max(Rb * 0.14, 2.5), 20, 64), redMat);
    rim.castShadow = true;
    w.add(rim);
    for (let i = 0; i < 3; i++) {
      const spoke = new T.Mesh(
        new T.BoxGeometry(wr * 2, Math.max(Rb * 0.16, 2.5), Math.max(Rb * 0.16, 2.5)),
        redMat,
      );
      spoke.rotation.z = (i * Math.PI) / 3;
      spoke.castShadow = true;
      w.add(spoke);
    }
    const hub = new T.Mesh(
      new T.CylinderGeometry(Rb * 0.32, Rb * 0.32, Rb * 0.3, 24),
      redMat,
    );
    hub.rotation.x = Math.PI / 2;
    w.add(hub);
    w.position.set(x, y, Rb * 3.6);
    g.add(w);
    return w;
  }

  function rectOf(sel: string) {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      l: r.left,
      r: r.right,
      t: r.top + window.scrollY,
      b: r.bottom + window.scrollY,
      cx: r.left + r.width / 2,
      cy: r.top + window.scrollY + r.height / 2,
      w: r.width,
      h: r.height,
    };
  }

  function build() {
    if (group) {
      scene.remove(group);
      group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      group = null;
    }

    W = root.clientWidth;
    H = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, W < 720 ? 1.5 : 1.75));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camZ = H / 2 / Math.tan((FOV * Math.PI) / 360);
    camera.far = camZ + 4000;
    camera.updateProjectionMatrix();

    const hero = rectOf('[data-anchor="hero-pipe"]');
    const spine = rectOf('[data-anchor="spine"]');
    if (!hero || !spine) return;
    const branch = rectOf('[data-anchor="branch-run"]');

    const R = Math.min(spine.w, hero.h) / 2;
    const wx = (px: number) => px - W / 2;
    const wy = (py: number) => -py;
    const v3 = (px: number, py: number, z = 0) => new T.Vector3(wx(px), wy(py), z);

    const g = new T.Group();
    const sx = spine.cx;
    const hy = hero.cy;
    const endY = spine.b - R * 0.1;
    const bend = Math.min(R * 2.4, (sx - 20) / 2, (endY - hy) / 3);

    // Línea principal: horizontal en el héroe, codo, baja por la columna.
    const main = new T.CurvePath<THREE.Vector3>();
    main.add(new T.LineCurve3(v3(-R * 3, hy), v3(sx - bend, hy)));
    main.add(
      new T.QuadraticBezierCurve3(v3(sx - bend, hy), v3(sx, hy), v3(sx, hy + bend)),
    );
    main.add(new T.LineCurve3(v3(sx, hy + bend), v3(sx, endY)));
    const mainLen = main.getLength();
    const mainMesh = new T.Mesh(
      new T.TubeGeometry(main, Math.max(80, Math.ceil(mainLen / 5)), R, 36, false),
      paint(mainLen, R, 1),
    );
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    g.add(mainMesh);

    // Bridas decorativas del héroe: una al borde y otra en el espacio entre las
    // dos palabras del nombre, para que los pernos no crucen las letras.
    let heroX = [W * 0.04, W * 0.5];
    const words = document.querySelectorAll<HTMLElement>(
      '[data-anchor="hero-pipe"] h1 span',
    );
    if (words.length === 2) {
      const a = words[0].getBoundingClientRect();
      const b = words[1].getBoundingClientRect();
      if (Math.abs(a.top - b.top) < a.height / 2) {
        heroX = [Math.max(24, a.left - 30), (a.right + b.left) / 2];
      }
    }
    for (const x of heroX) g.add(flange(v3(x, hy), "x", R));

    wheels = [];
    // Volante en la columna, dentro del primer viewport.
    wheels.push(addValve(g, wx(sx), wy(hy + bend + R * 1.5), R * 0.55));

    // Bridas de cada etapa (marcas del DOM) sobre la columna.
    // offsetTop ignora los transform: una etapa aún sin revelar (translate de
    // AOS) no desplaza su brida.
    document.querySelectorAll<HTMLElement>("[data-flange]").forEach((el) => {
      const cy = pageTop(el) + el.offsetHeight / 2;
      g.add(flange(v3(sx, cy), "y", R));
    });

    // Tapa ciega al final de la línea.
    const capAt = v3(sx, endY);
    g.add(flange(capAt, "y", R, 6));
    const plate = new T.Mesh(
      new T.CylinderGeometry(R * 1.3, R * 1.3, R * 0.16, 56),
      steelMat,
    );
    plate.position.set(capAt.x, capAt.y - R * 0.3, 0);
    plate.castShadow = true;
    g.add(plate);

    // Derivación "A PERSONA": sale de la columna hacia la izquierda con volante.
    if (branch) {
      const Rb = R * 0.62;
      const by = branch.cy;
      const x0 = sx;
      const x1 = branch.l + Rb * 1.5;
      const bp = new T.CurvePath<THREE.Vector3>();
      bp.add(new T.LineCurve3(v3(x0, by), v3(x1, by)));
      const bLen = bp.getLength();
      const branchMesh = new T.Mesh(
        new T.TubeGeometry(bp, Math.max(40, Math.ceil(bLen / 5)), Rb, 28, false),
        paint(bLen, Rb, 1),
      );
      // u crece del cruce hacia la persona: el pulso viaja en ese sentido.
      branchMesh.castShadow = true;
      branchMesh.receiveShadow = true;
      g.add(branchMesh);

      // Refuerzo en el cruce y brida de cierre.
      g.add(flange(v3(sx, by), "y", R * 0.86, 8));
      g.add(flange(v3(x1, by), "x", Rb, 8));

      // Válvula con volante rojo sobre la derivación.
      const vx = x0 - (x0 - x1) * 0.58;
      wheels.push(addValve(g, wx(vx), wy(by), Rb));
    }

    scene.add(g);
    group = g;

    // Pared que recibe la sombra (sigue a la cámara en update).
    const wallZ = -R * 1.7;
    wall.scale.set(W * 2.8, H * 2.8, 1);
    wall.position.z = wallZ;

    const sc = key.shadow.camera;
    sc.left = -W * 1.4;
    sc.right = W * 1.4;
    sc.top = H * 1.4;
    sc.bottom = -H * 1.4;
    sc.near = 200;
    sc.far = camZ + 2600;
    sc.updateProjectionMatrix();
    const size = W < 720 ? 1024 : 2048;
    if (key.shadow.mapSize.x !== size) {
      key.shadow.mapSize.set(size, size);
      key.shadow.map?.dispose();
      key.shadow.map = null;
    }
    dirty = true;
  }

  // ── Bucle ────────────────────────────────────────────────────────────────
  let raf = 0;
  let last = performance.now();
  let lastY = window.scrollY;
  let speed = 0;

  function update(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const y = window.scrollY;
    const dy = Math.abs(y - lastY);
    lastY = y;
    speed += (Math.min(1, dy / 60) - speed) * 0.1;
    valve += (valveTarget - valve) * 0.08;

    if (!reduced) {
      uTime.value += dt * (0.14 + speed * 1.5 + valve * 0.9);
      spin += dt * (0.25 + valve * 3.2);
      pointer.sx += (pointer.x - pointer.sx) * 0.06;
      pointer.sy += (pointer.y - pointer.sy) * 0.06;
    }

    const cy = -(y + H / 2);
    camera.position.set(pointer.sx * 12, cy + pointer.sy * 8, camZ);
    camera.lookAt(0, cy, 0);

    key.position.set(-380, cy + 520, 1000);
    key.target.position.set(0, cy, 0);
    key.target.updateMatrixWorld();
    wall.position.x = 0;
    wall.position.y = cy;

    for (const w of wheels) w.rotation.z = -(y / H) * 1.1 - spin;
  }

  function loop(now: number) {
    raf = requestAnimationFrame(loop);
    if (reduced && !dirty) return;
    try {
      update(now);
      renderer.render(scene, camera);
    } catch {
      // Un fallo en el bucle devuelve la página a la tubería en CSS.
      cancelAnimationFrame(raf);
      root.dataset.gl = "off";
      return;
    }
    dirty = false;
  }

  // ── Eventos ──────────────────────────────────────────────────────────────
  const onScroll = () => {
    dirty = true;
  };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / Math.max(1, W)) * 2 - 1;
    pointer.y = (e.clientY / Math.max(1, H)) * 2 - 1;
  };
  let rebuildTimer = 0;
  const scheduleBuild = () => {
    window.clearTimeout(rebuildTimer);
    rebuildTimer = window.setTimeout(build, 120);
  };
  const ro = new ResizeObserver(scheduleBuild);
  ro.observe(document.body);
  window.addEventListener("resize", scheduleBuild);
  window.addEventListener("scroll", onScroll, { passive: true });
  if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
  document.fonts?.ready.then(scheduleBuild);

  const valves = Array.from(document.querySelectorAll<HTMLElement>("[data-valve]"));
  const open = () => (valveTarget = 1);
  const close = () => (valveTarget = 0);
  valves.forEach((el) => {
    el.addEventListener("pointerenter", open);
    el.addEventListener("pointerleave", close);
    el.addEventListener("focus", open);
    el.addEventListener("blur", close);
  });

  // Si el navegador pierde el contexto, vuelve la tubería en CSS hasta recuperarlo.
  const onLost = (e: Event) => {
    e.preventDefault();
    root.dataset.gl = "off";
  };
  const onRestored = () => {
    build();
    root.dataset.gl = "on";
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  build();
  raf = requestAnimationFrame(loop);

  return () => {
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    cancelAnimationFrame(raf);
    window.clearTimeout(rebuildTimer);
    ro.disconnect();
    window.removeEventListener("resize", scheduleBuild);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    valves.forEach((el) => {
      el.removeEventListener("pointerenter", open);
      el.removeEventListener("pointerleave", close);
      el.removeEventListener("focus", open);
      el.removeEventListener("blur", close);
    });
    if (group) {
      group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
    }
    wall.geometry.dispose();
    [flangeMat, boltMat, redMat, steelMat, shadowMat].forEach((m) => m.dispose());
    noise.dispose();
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}

/** Posición Y en la página sin contar transform (a diferencia de getBoundingClientRect). */
function pageTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

function makeNoise(T: ThreeNS): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const img = g.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 120;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new T.CanvasTexture(c);
  t.wrapS = t.wrapT = T.RepeatWrapping;
  return t;
}
