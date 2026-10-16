import data from "./layers.json";

// Motor del conejo por capas, portado de design/character/prototype (BUNNY-RECORDS.md §6).
// Manipula el DOM directamente: cambiar de fotograma cada 22 ms no debe pasar por React.
//
// Grafo de poses: los nodos son las poses y las aristas, secuencias de fotogramas intermedios (t25/t50/t75).
// El conejo siempre avanza por el camino más corto y, si el objetivo cambia a mitad, da la vuelta si conviene.

export type BunnyPose =
  | "rest"
  | "curious-left"
  | "curious-right"
  | "present-left"
  | "present-right"
  | "look-up-left"
  | "look-up-right";

/** Lado de la pantalla hacia el que mira (left/right = lado de la pantalla). */
export type BunnySide = "left" | "right" | "up-left" | "up-right";

export type BunnyMode = "full" | "lite";

type Layer = { file: string; x: number; y: number; w: number; h: number; bytes: number };
type Frame = { body: string; head: string; blink?: string };

const B = data as unknown as {
  canvas: [number, number];
  halo_css: { center: [number, number]; half_width: number };
  pivots: Record<"head" | "ear_left" | "ear_right" | "feet", [number, number]>;
  poses: Record<string, string[]>;
  layers: Record<string, Layer>;
  transitions: [string, string][];
};

export const CANVAS_WIDTH = B.canvas[0];
export const CANVAS_HEIGHT = B.canvas[1];
export const FULL_REST = B.layers["bunny-full-rest"];
export const HALO = B.halo_css;

/** Capas a media resolución (public/bunny/sm/, scripts/bunny-small.mjs) cuando el conejo se ve pequeño. Paso 13. */
export const SMALL_MAX_PX = 660;
export const layerSrc = (key: string, small = false) =>
  `/bunny/${small ? "sm/" : ""}${B.layers[key].file.split("/").pop()}`;

const STEPS = ["t25", "t50", "t75"];
const FRAME_MS = 22;
const SIDE_TO_CURIOUS: Record<BunnySide, BunnyPose> = {
  left: "curious-left",
  right: "curious-right",
  "up-left": "look-up-left",
  "up-right": "look-up-right",
};
const SIDE_TO_PRESENT: Record<BunnySide, BunnyPose> = {
  left: "present-left",
  right: "present-right",
  "up-left": "present-left",
  "up-right": "present-right",
};

export class BunnyEngine {
  private readonly canvas: HTMLElement;
  private readonly mode: BunnyMode;
  /** Pose fija (sin seguir al puntero), p. ej. presentando la ficha de Contacto. */
  private readonly hold: BunnyPose | null;
  private readonly nodes: Record<string, Frame> = {};
  private readonly edges: Record<string, Frame[]> = {};
  private readonly dist: Record<string, Record<string, number>> = {};
  private readonly imgs: Record<string, HTMLImageElement> = {};
  private readonly gBody: HTMLElement;
  private readonly gHead: HTMLElement;
  private readonly gEars: HTMLElement;
  private readonly earL: HTMLElement;
  private readonly earR: HTMLElement;
  private readonly earImgs: HTMLImageElement[];
  private readonly rig: HTMLElement;

  private cur: { u: string; v: string | null; i: number } = { u: "rest", v: null, i: 0 };
  private target = "rest";
  private shown: string[] = [];
  private blinking = false;
  private timer: number | null = null;
  private blinkTimer: number | null = null;
  private gestureTimer: number | null = null;
  private pendTimer: number | null = null;
  private pending: string | null = null;
  private busyUntil = 0;
  private hoverSide: BunnySide | null = null;
  private pointer: [number, number] | null = null;
  private allReady = false;
  private paused = false;
  private destroyed = false;
  private readonly cleanups: (() => void)[] = [];
  /** Capas que no son del reposo: se crean en tandas cuando el navegador está libre (paso 7.5). */
  private readonly queue: [string, HTMLElement][] = [];
  /** Poses permitidas (además del reposo). null = todas. */
  private readonly only: Set<string> | null;
  /** Usa las capas de public/bunny/sm/. */
  private readonly small: boolean;

  constructor(
    canvas: HTMLElement,
    mode: BunnyMode,
    hold: BunnyPose | null = null,
    only: BunnyPose[] | null = null,
    small = false,
  ) {
    this.canvas = canvas;
    this.small = small;
    this.mode = mode;
    this.hold = mode === "full" ? hold : null;
    this.only = only ? new Set(only) : null;
    const P = B.pivots;
    const feet = `${P.feet[0]}px ${P.feet[1]}px`;

    this.rig = this.el("div", "bunny-group bunny-rig", canvas);
    this.rig.style.transformOrigin = feet;
    this.img("bunny-shadow", this.rig).classList.add("is-on");
    this.gBody = this.el("div", "bunny-group bunny-body", this.rig);
    this.gBody.style.transformOrigin = feet;
    const gUpper = this.el("div", "bunny-group bunny-upper", this.rig);
    this.gEars = this.el("div", "bunny-group bunny-ears", gUpper);
    this.gHead = this.el("div", "bunny-group bunny-head", gUpper);
    this.gHead.style.transformOrigin = this.gEars.style.transformOrigin = `${P.head[0]}px ${P.head[1]}px`;
    this.earL = this.el("div", "bunny-ear bunny-ear-left", this.gEars);
    this.earR = this.el("div", "bunny-ear bunny-ear-right", this.gEars);
    this.earL.style.transformOrigin = `${P.ear_left[0]}px ${P.ear_left[1]}px`;
    this.earR.style.transformOrigin = `${P.ear_right[0]}px ${P.ear_right[1]}px`;
    this.earImgs = [this.img("bunny-ear-left", this.earL), this.img("bunny-ear-right", this.earR)];

    this.buildGraph();
    this.render();

    // Se muestra cuando el reposo está descodificado. Las demás capas se crean en tandas cuando el
    // navegador está libre y, al estar todas descodificadas, se habilitan las poses.
    const first = [...B.poses.rest, "bunny-head-rest-blink"];
    Promise.all(first.map((k) => this.imgs[k]?.decode().catch(() => undefined)))
      .then(() => {
        if (this.destroyed) return;
        this.canvas.dataset.ready = "true";
        return this.createPending();
      })
      .then(() => {
        if (this.destroyed) return;
        return Promise.all(Object.values(this.imgs).map((i) => i.decode().catch(() => undefined)));
      })
      .then(() => {
        if (this.destroyed) return;
        this.allReady = true;
        if (this.hold) this.setPose(this.hold);
        else this.evaluate();
      });

    this.scheduleBlink();
    if (mode === "full" && !this.hold) this.listenToPointer();
  }

  // ---------- montaje ----------
  private el(tag: string, className: string, parent: HTMLElement) {
    const e = document.createElement(tag);
    e.className = className;
    parent.appendChild(e);
    return e;
  }

  private img(key: string, parent: HTMLElement) {
    if (this.imgs[key]) return this.imgs[key];
    const L = B.layers[key];
    const i = document.createElement("img");
    i.className = "bunny-layer";
    i.src = layerSrc(key, this.small);
    i.alt = "";
    i.decoding = "async";
    i.draggable = false;
    Object.assign(i.style, { left: `${L.x}px`, top: `${L.y}px`, width: `${L.w}px`, height: `${L.h}px` });
    parent.appendChild(i);
    this.imgs[key] = i;
    return i;
  }

  private buildGraph() {
    const has = (k: string) => k in B.layers;
    this.nodes.rest = { body: "bunny-body-rest", head: "bunny-head-rest-open", blink: "bunny-head-rest-blink" };
    if (this.mode === "full") {
      // Con pose fija solo hacen falta el reposo, esa pose y su arista (~15 capas en vez de 96). Paso 7.5.
      for (const [pose, stack] of Object.entries(B.poses)) {
        if (pose === "rest" || (this.hold && pose !== this.hold) || (this.only && !this.only.has(pose))) continue;
        const head = stack[stack.length - 1];
        this.nodes[pose] = { body: stack[1], head, blink: head.replace(/-open$/, "-blink") };
      }
      const addEdge = (a: string, b: string, prefix: string) => {
        const mids = STEPS.map((s) => ({ body: `bunny-body-${prefix}-${s}`, head: `bunny-head-${prefix}-${s}-open` }));
        if (!mids.every((f) => has(f.body) && has(f.head))) return;
        this.edges[`${a}|${b}`] = mids;
        this.edges[`${b}|${a}`] = [...mids].reverse();
      };
      for (const pose of Object.keys(this.nodes)) if (pose !== "rest") addEdge("rest", pose, pose);
      if (!this.hold) {
        for (const [a, b] of B.transitions) if (this.nodes[a] && this.nodes[b]) addEdge(a, b, `${a}--${b}`);
      }
    }
    // El reposo se monta ya (es lo primero que se ve); el resto queda en cola para crearse en tandas.
    const rest = this.nodes.rest;
    this.img(rest.body, this.gBody);
    this.img(rest.head, this.gHead);
    if (rest.blink) this.img(rest.blink, this.gHead);
    const queued = new Set<string>();
    for (const f of [...Object.values(this.nodes), ...Object.values(this.edges).flat()]) {
      for (const [key, parent] of [[f.body, this.gBody], [f.head, this.gHead], [f.blink, this.gHead]] as const) {
        if (!key || !has(key) || this.imgs[key] || queued.has(key)) continue;
        queued.add(key);
        this.queue.push([key, parent]);
      }
    }
    for (const n of Object.keys(this.nodes)) this.dist[n] = this.distFrom(n);
  }

  /** Crea las capas en cola de 8 en 8, en momentos libres del navegador, para no bloquear la interacción. */
  private createPending(): Promise<void> {
    return new Promise((resolve) => {
      const step = () => {
        if (this.destroyed) return resolve();
        for (const [key, parent] of this.queue.splice(0, 8)) this.img(key, parent);
        if (this.queue.length === 0) return resolve();
        if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(step, { timeout: 300 });
        else window.setTimeout(step, 16);
      };
      step();
    });
  }

  private neighbours(n: string) {
    return Object.keys(this.edges)
      .filter((k) => k.startsWith(`${n}|`))
      .map((k) => k.split("|")[1]);
  }

  private distFrom(src: string) {
    const d: Record<string, number> = { [src]: 0 };
    const todo = new Set(Object.keys(this.nodes));
    while (todo.size) {
      let u: string | null = null;
      for (const n of todo) if (d[n] !== undefined && (u === null || d[n] < d[u])) u = n;
      if (u === null) break;
      todo.delete(u);
      for (const v of this.neighbours(u)) {
        const w = d[u] + this.edges[`${u}|${v}`].length + 1;
        if (d[v] === undefined || w < d[v]) d[v] = w;
      }
    }
    return d;
  }

  private far = (a: string, b: string) => this.dist[a]?.[b] ?? 1e9;

  private nextHop(u: string, t: string) {
    let best: { v: string; c: number } | null = null;
    for (const v of this.neighbours(u)) {
      const c = this.edges[`${u}|${v}`].length + 1 + this.far(v, t);
      if (!best || c < best.c) best = { v, c };
    }
    return best?.v ?? null;
  }

  // ---------- render y avance ----------
  private atNode = () => this.cur.v === null;

  private frame(): Frame {
    return this.atNode() ? this.nodes[this.cur.u] : this.edges[`${this.cur.u}|${this.cur.v}`][this.cur.i - 1];
  }

  private render() {
    const f = this.frame();
    const want = [f.body, this.blinking && f.blink && this.imgs[f.blink] ? f.blink : f.head];
    for (const k of want) this.imgs[k]?.classList.add("is-on");
    for (const k of this.shown) if (!want.includes(k)) this.imgs[k]?.classList.remove("is-on");
    this.shown = want;
    const resting = this.atNode() && this.cur.u === "rest";
    for (const e of this.earImgs) e.classList.toggle("is-on", resting);
  }

  private tick = () => {
    if (this.destroyed) return;
    if (this.atNode() && this.cur.u === this.target) {
      this.timer = null;
      if (this.target.startsWith("present")) this.pop();
      return;
    }
    if (this.atNode()) {
      const v = this.nextHop(this.cur.u, this.target);
      if (!v) {
        this.timer = null;
        return;
      }
      this.cur = { u: this.cur.u, v, i: 1 };
    } else {
      const n = this.edges[`${this.cur.u}|${this.cur.v}`].length;
      const fwd = n + 1 - this.cur.i + this.far(this.cur.v!, this.target);
      const back = this.cur.i + this.far(this.cur.u, this.target);
      if (back < fwd) this.cur = { u: this.cur.v!, v: this.cur.u, i: n + 1 - this.cur.i };
      this.cur.i++;
      if (this.cur.i > n) this.cur = { u: this.cur.v!, v: null, i: 0 };
    }
    this.render();
    this.timer = window.setTimeout(this.tick, FRAME_MS);
  };

  private pop() {
    this.restartClass("is-popping", 320);
  }

  private restartClass(name: string, ms: number) {
    const host = this.canvas;
    host.classList.remove(name);
    void host.offsetWidth;
    host.classList.add(name);
    window.setTimeout(() => host.classList.remove(name), ms);
  }

  private setPose(pose: string) {
    if (pose === this.target || !this.nodes[pose] || (!this.allReady && pose !== "rest")) return;
    this.target = pose;
    if (pose !== "rest") this.clearTilt();
    if (this.timer === null) this.tick();
  }

  // ---------- adónde mirar ----------
  private desired(): string {
    if (this.hoverSide) return SIDE_TO_CURIOUS[this.hoverSide];
    if (!this.pointer) return "rest";
    const [hx, hy, s] = this.headPoint();
    const dx = (this.pointer[0] - hx) / s;
    const dy = (this.pointer[1] - hy) / s;
    // Histéresis: para salir de la pose actual hay que pasar el umbral con margen.
    const keep = (p: string) => (this.target === p ? 90 : 0);
    const left = dx < 0;
    const upPose = left ? "look-up-left" : "look-up-right";
    const sidePose = left ? "curious-left" : "curious-right";
    if (dy < -(420 - keep(upPose)) && Math.abs(dx) > 150 - keep(upPose)) return upPose;
    if (Math.abs(dx) > 520 - keep(sidePose)) return sidePose;
    return "rest";
  }

  private headPoint(): [number, number, number] {
    const r = this.canvas.getBoundingClientRect();
    const s = r.width / CANVAS_WIDTH;
    return [r.left + B.pivots.head[0] * s, r.top + B.pivots.head[1] * s, s];
  }

  /** Los cambios se confirman tras una pausa corta, para que bordes y huecos no lo hagan rebotar. */
  private evaluate = () => {
    if (this.mode !== "full" || this.hold || this.paused || performance.now() < this.busyUntil) return;
    const d = this.desired();
    if (d === this.target) {
      this.clearPending();
      return;
    }
    if (d === this.pending) return;
    this.clearPending();
    this.pending = d;
    this.pendTimer = window.setTimeout(
      () => {
        this.pending = null;
        this.setPose(d);
      },
      this.hoverSide ? 60 : 140,
    );
  };

  private clearPending() {
    if (this.pendTimer !== null) window.clearTimeout(this.pendTimer);
    this.pendTimer = null;
    this.pending = null;
  }

  private clearTilt() {
    this.gHead.style.transform = this.gEars.style.transform = "";
    this.earL.style.transform = this.earR.style.transform = "";
  }

  /** Micro-giro hacia el puntero y orejas con muelle, solo quieto en el reposo. */
  private applyTilt() {
    if (!(this.atNode() && this.cur.u === "rest" && this.target === "rest") || !this.pointer) return;
    const [hx, , s] = this.headPoint();
    const tilt = Math.max(-4, Math.min(4, (this.pointer[0] - hx) / s / 120));
    this.gHead.style.transform = this.gEars.style.transform = `rotate(${tilt}deg)`;
    this.earL.style.transform = this.earR.style.transform = `rotate(${-tilt * 1.6}deg)`;
  }

  private listenToPointer() {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      this.pointer = [e.clientX, e.clientY];
      if (this.paused) return;
      this.evaluate();
      this.applyTilt();
    };
    const leave = () => {
      this.pointer = null;
      this.hoverSide = null;
      this.evaluate();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    this.cleanups.push(() => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    });
  }

  // ---------- parpadeo ----------
  private scheduleBlink() {
    this.blinkTimer = window.setTimeout(() => {
      this.blink();
      this.scheduleBlink();
    }, 4000 + Math.random() * 3000);
  }

  private blink() {
    if (this.paused || this.timer !== null) return; // no parpadear a mitad de un giro
    this.blinking = true;
    this.render();
    window.setTimeout(() => {
      this.blinking = false;
      if (!this.destroyed) this.render();
    }, 120);
  }

  // ---------- API pública ----------
  /** Portada bajo el puntero (curiosidad hacia ese lado) o null. */
  setHover(side: BunnySide | null) {
    this.hoverSide = side;
    this.evaluate();
  }

  /** Gesto que dura un rato; al acabar vuelve a lo que diga el puntero. */
  gesture(pose: BunnyPose, ms = 2200) {
    this.clearPending();
    this.setPose(pose);
    this.busyUntil = performance.now() + ms;
    if (this.gestureTimer !== null) window.clearTimeout(this.gestureTimer);
    this.gestureTimer = window.setTimeout(() => {
      this.busyUntil = 0;
      this.setPose(this.hold ?? (this.mode === "full" ? this.desired() : "rest"));
    }, ms);
  }

  present(side: BunnySide, ms = 2200) {
    this.gesture(SIDE_TO_PRESENT[side], ms);
  }

  dance() {
    this.gesture("rest", 1700);
    this.restartClass("is-dancing", 1700);
  }

  /** Baile automático: 4 s cada 8 s, todo en CSS (`.is-auto-dancing`). */
  startAutoDance() {
    this.canvas.classList.add("is-auto-dancing");
  }

  /** Pausa fuera de pantalla, en pestañas ocultas o cuando Activity oculta la página. */
  setPaused(paused: boolean) {
    this.paused = paused;
    this.canvas.classList.toggle("is-paused", paused);
    if (paused) this.clearPending();
    else this.evaluate();
  }

  destroy() {
    this.destroyed = true;
    for (const t of [this.timer, this.blinkTimer, this.gestureTimer, this.pendTimer]) {
      if (t !== null) window.clearTimeout(t);
    }
    for (const c of this.cleanups) c();
    this.rig.remove();
    this.canvas.classList.remove("is-auto-dancing");
    delete this.canvas.dataset.ready;
  }
}
