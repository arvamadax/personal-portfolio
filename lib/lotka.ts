// Model mangsa-pemangsa Lotka-Volterra: model asli (non-linear, RK4) vs linearisasi di titik seimbang.
// Murni hitungan, tanpa DOM. Dipakai components/Archive.tsx.
export type Params = { a: number; b: number; c: number; d: number };
export type State = [number, number];
export type Sim = { t: number[]; nl: State[]; lin: State[] };

export const PARAM: Params = { a: 1.0, b: 0.1, c: 1.5, d: 0.075 };
/** Jumlah titik sampel per simulasi. */
export const N = 1200;
const LIMIT = { ok: 0.05, warn: 0.3 };

export const equilibrium = (p: Params) => ({ x: p.c / p.d, y: p.a / p.b });
const jacobian = (p: Params) => [[0, (-p.b * p.c) / p.d], [(p.a * p.d) / p.b, 0]];
const omega = (p: Params) => Math.sqrt(p.a * p.c);
const rhs = (p: Params, s: State): State => [p.a * s[0] - p.b * s[0] * s[1], -p.c * s[1] + p.d * s[0] * s[1]];

const rk4 = (p: Params, s: State, h: number): State => {
  const at = (v: State, k: State, f: number): State => [v[0] + f * k[0], v[1] + f * k[1]];
  const k1 = rhs(p, s), k2 = rhs(p, at(s, k1, h / 2)), k3 = rhs(p, at(s, k2, h / 2)), k4 = rhs(p, at(s, k3, h));
  const step = (i: 0 | 1) => s[i] + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  return [step(0), step(1)];
};

// Solusi tertutup model linear (osilator harmonik di sekitar titik seimbang).
const linearAt = (p: Params, u0: number, v0: number, t: number): State => {
  const e = equilibrium(p), w = omega(p), J = jacobian(p), c = Math.cos(w * t), s = Math.sin(w * t);
  return [e.x + u0 * c + (J[0][1] / w) * v0 * s, e.y + v0 * c + (J[1][0] / w) * u0 * s];
};

/** delta = gangguan awal kelinci (0.6 = 60% di atas titik seimbang), T = durasi dalam tahun. */
export const simulate = (p: Params, delta: number, T: number, n = N): Sim => {
  const e = equilibrium(p), u0 = e.x * delta, v0 = 0;
  const sub = Math.ceil(T / n / 0.01), h = T / n / sub;
  const t: number[] = [], nl: State[] = [], lin: State[] = [];
  let s: State = [e.x + u0, e.y + v0];
  for (let i = 0; i <= n; i++) {
    const ti = (i * T) / n;
    t.push(ti); nl.push(s); lin.push(linearAt(p, u0, v0, ti));
    for (let k = 0; k < sub; k++) s = rk4(p, s, h);
  }
  return { t, nl, lin };
};

// Periode rata-rata dari titik potong naik terhadap `level`.
const period = (t: number[], ys: number[], level: number) => {
  const cr = [0];
  for (let i = 1; i < ys.length; i++)
    if (ys[i - 1] < level && ys[i] >= level) cr.push(t[i - 1] + ((t[i] - t[i - 1]) * (level - ys[i - 1])) / (ys[i] - ys[i - 1]));
  return cr.length > 1 ? (cr[cr.length - 1] - cr[0]) / (cr.length - 1) : NaN;
};

export type Level = "ok" | "warn" | "bad";

export const summarize = (p: Params, sim: Sim) => {
  const e = equilibrium(p), col = (arr: State[], k: 0 | 1) => arr.map((s) => s[k]);
  const gap = (k: 0 | 1) => Math.max(...sim.t.map((_, i) => Math.abs(sim.nl[i][k] - sim.lin[i][k])));
  const mins = (arr: State[]): State => [Math.min(...col(arr, 0)), Math.min(...col(arr, 1))];
  const gapX = gap(0), gapY = gap(1), minNl = mins(sim.nl), minLin = mins(sim.lin);
  const rel = Math.max(gapX / e.x, gapY / e.y);
  const negative = minLin[0] < 0 || minLin[1] < 0;
  const level: Level = negative || rel >= LIMIT.warn ? "bad" : rel >= LIMIT.ok ? "warn" : "ok";
  return { gapX, gapY, rel, minNl, minLin, negative, level, periodNl: period(sim.t, col(sim.nl, 1), e.y), periodLin: (2 * Math.PI) / omega(p) };
};
