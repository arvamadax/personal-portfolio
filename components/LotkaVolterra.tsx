"use client";
// Arsip 001: kelinci vs serigala (Lotka-Volterra), model asli vs linearisasi. Terdaftar di /archive.
// Hitungan di lib/lotka.ts. Teks/angka ringkasan dirender React; kanvas, jam, dan tooltip ditulis
// langsung ke DOM tiap frame supaya animasi tidak memicu render ulang.
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowCounterClockwise, CheckCircle, Pause, Play, WarningCircle, XCircle } from "@phosphor-icons/react";
import { equilibrium, N, PARAM, simulate, summarize, type Sim, type State } from "@/lib/lotka";
import type { Lang } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { h1, i, page } from "@/lib/ui";
import { motionReduced } from "./Prefs";
import { TLink } from "./TLink";

const EQ = equilibrium(PARAM);
const DELTAS = [10, 30, 60, 100, 150], DURS = [20, 40, 80], SPEEDS = [1, 2, 4];
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const NF = {
  en: [0, 1, 2].map((d) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d })),
  id: [0, 1, 2].map((d) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d })),
};
type Fmt = (v: number, d?: number) => string;
const makeFmt = (lang: Lang): Fmt => (v, d = 1) => NF[lang][d].format(Math.abs(v) < 0.5 * 10 ** -d ? 0 : v).replace("-", "−");

/* ---------- gambar ---------- */
type Colors = { surface: string; ink: string; muted: string; line: string; prey: string; pred: string; danger: string; sans: string; mono: string };
const readColors = (): Colors => {
  const cs = getComputedStyle(document.documentElement), g = (n: string) => cs.getPropertyValue(n).trim();
  return {
    surface: g("--surface"), ink: g("--ink"), muted: g("--muted"), line: g("--line"), prey: g("--accent"), pred: g("--pred"), danger: g("--danger"),
    sans: getComputedStyle(document.body).fontFamily, mono: g("--font-geist-mono") || "ui-monospace, monospace",
  };
};
type Ctx = CanvasRenderingContext2D;

const fit = (cv: HTMLCanvasElement) => {
  const r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const x = cv.getContext("2d")!;
  x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, w, h);
  return { x, w, h };
};
const niceStep = (span: number, target: number) => {
  const raw = span / target, mag = 10 ** Math.floor(Math.log10(raw)), f = raw / mag;
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
};
const ticks = (lo: number, hi: number, target: number) => {
  const s = niceStep(hi - lo, target), out: number[] = [];
  for (let v = Math.ceil(lo / s - 1e-9) * s; v <= hi + 1e-9; v += s) out.push(+v.toFixed(10));
  return out;
};
const lerp = (arr: State[], f: number): State => {
  const i = Math.min(N - 1, Math.floor(f)), a = f - i;
  return [arr[i][0] + (arr[i + 1][0] - arr[i][0]) * a, arr[i][1] + (arr[i + 1][1] - arr[i][1]) * a];
};
const halo = (x: Ctx, txt: string, px: number, py: number, c: Colors) => {
  x.lineWidth = 3.5; x.strokeStyle = c.surface; x.lineJoin = "round"; x.strokeText(txt, px, py);
  x.fillStyle = c.ink; x.fillText(txt, px, py);
};
const dot = (x: Ctx, px: number, py: number, fill: string, c: Colors, r = 4.5) => {
  x.beginPath(); x.arc(px, py, r, 0, 7); x.fillStyle = fill; x.fill(); x.lineWidth = 2; x.strokeStyle = c.surface; x.stroke();
};
const hline = (x: Ctx, x0: number, x1: number, y: number) => { x.beginPath(); x.moveTo(x0, Math.round(y) + 0.5); x.lineTo(x1, Math.round(y) + 0.5); x.stroke(); };
const vline = (x: Ctx, px: number, y0: number, y1: number) => { x.beginPath(); x.moveTo(Math.round(px) + 0.5, y0); x.lineTo(Math.round(px) + 0.5, y1); x.stroke(); };

// Domain sumbu: grafik waktu selalu memuat 0; lintasan diberi 10% ruang di tiap sisi.
const domains = (sim: Sim) => {
  const all = sim.nl.concat(sim.lin);
  const time = ([0, 1] as const).map((k) => {
    const vals = all.map((s) => s[k]), lo = Math.min(0, ...vals), hi = Math.max(...vals), s = niceStep(hi - lo, 4);
    return [Math.floor(lo / s) * s, Math.ceil((hi * 1.04) / s) * s];
  });
  const xs = all.map((s) => s[0]).concat(EQ.x), ys = all.map((s) => s[1]).concat(EQ.y);
  const pad = (a: number, b: number) => { const d = (b - a) * 0.1; return [a - d, b + d]; };
  return { time, phase: [pad(Math.min(...xs), Math.max(...xs)), pad(Math.min(...ys), Math.max(...ys))] };
};

// Posisi hewan: acak tapi tetap (seed), disebar dengan best-candidate supaya tidak menumpuk.
const MAXP = 64, MAXQ = 40;
const PTS: [number, number, number][] = [];
{
  let a = 7;
  const rnd = () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let n = 0; n < MAXP + MAXQ; n++) {
    let best: number[] = [], bd = -1;
    for (let k = 0; k < 10; k++) {
      const q = [0.06 + rnd() * 0.88, 0.1 + rnd() * 0.8];
      let d = Infinity;
      for (const p of PTS) d = Math.min(d, (p[0] - q[0]) ** 2 * 1.8 + (p[1] - q[1]) ** 2);
      if (d > bd) { bd = d; best = q; }
    }
    PTS.push([best[0], best[1], rnd() * 6.28]);
  }
}

/* ---------- potongan UI kecil ---------- */
const Stroke = ({ c, dash }: { c: string; dash?: boolean }) => (
  <svg width="28" height="8" viewBox="0 0 28 8" aria-hidden className="shrink-0">
    <line x1="1" y1="4" x2="27" y2="4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeDasharray={dash ? "6 4" : undefined} />
  </svg>
);
const Rabbit = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="shrink-0"><circle cx="6" cy="6" r="5" fill="var(--accent)" /></svg>;
const Wolf = () => <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden className="shrink-0"><path d="M7 .5 13.5 11.5H.5Z" fill="var(--pred)" /></svg>;

function Seg<T extends number>({ label, values, cur, show, pick }: { label: string; values: T[]; cur: T; show: (v: T) => string; pick: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-ui border border-line bg-surface p-0.5">
      {values.map((v) => (
        <button key={v} type="button" aria-pressed={v === cur} onClick={() => pick(v)}
          className="rounded-[3px] px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-ink active:scale-[0.97] aria-pressed:bg-ink aria-pressed:text-bg">
          {show(v)}
        </button>
      ))}
    </div>
  );
}
const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";
const panel = "min-w-0 rounded-ui border border-line bg-surface";

const VICON = { ok: [CheckCircle, "text-accent"], warn: [WarningCircle, "text-ink"], bad: [XCircle, "text-[var(--danger)]"] } as const;

export function LotkaVolterra() {
  const { lang, t } = useLang();
  const a = t.lotka;
  const fmt = useMemo(() => makeFmt(lang), [lang]);
  const [delta, setDelta] = useState(60);
  const [T, setT] = useState(40);
  const [speed, setSpeed] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const sim = useMemo(() => simulate(PARAM, delta / 100, T), [delta, T]);
  const sum = useMemo(() => summarize(PARAM, sim), [sim]);
  const box = useRef<HTMLDivElement>(null);
  const live = useRef({ tNow: 0, jt: 0, hover: null as number | null });
  const draw = useRef(() => {});

  // Skenario baru: mulai lagi dari t = 0, jalan sendiri kalau animasi diizinkan.
  useEffect(() => {
    live.current.tNow = 0; live.current.hover = null;
    setEnded(false);
    setPlaying(!motionReduced());
  }, [sim]);

  useEffect(() => {
    const root = box.current!, L = live.current, dom = domains(sim);
    const q = <E extends Element = HTMLElement>(k: string) => root.querySelector<E>(`[data-k="${k}"]`)!;
    const tip = q("tip"), charts = q("charts");
    let C: Colors | null = null;
    const col = () => (C ??= readColors());
    const frac = () => clamp((L.tNow / T) * N, 0, N);

    /* grafik waktu */
    const TL = 46, TR = 12, TT = 10, TB = 24;
    const timeGeom = (cv: HTMLCanvasElement, k: 0 | 1) => {
      const { x, w, h } = fit(cv), [lo, hi] = dom.time[k];
      return { x, w, h, lo, hi, X: (t: number) => TL + (t / T) * (w - TL - TR), Y: (v: number) => h - TB - ((v - lo) / (hi - lo)) * (h - TB - TT) };
    };
    const drawTime = (cv: HTMLCanvasElement, k: 0 | 1, color: string) => {
      const c = col(), { x, w, h, lo, hi, X, Y } = timeGeom(cv, k);
      if (lo < 0) {
        x.fillStyle = c.danger; x.globalAlpha = 0.08; x.fillRect(TL, Y(0), w - TL - TR, Y(lo) - Y(0)); x.globalAlpha = 1;
        if (Y(lo) - Y(0) > 30) { x.font = `11.5px ${c.sans}`; x.fillStyle = c.muted; x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillText(a.cv.negPop, TL + 8, Y(lo) - 8); }
      }
      x.font = `11px ${c.mono}`; x.textAlign = "right"; x.textBaseline = "middle"; x.lineWidth = 1;
      ticks(lo, hi, 4).forEach((v) => { x.strokeStyle = c.line; hline(x, TL, w - TR, Y(v)); x.fillStyle = c.muted; x.fillText(fmt(v, 0), TL - 8, Y(v)); });
      x.strokeStyle = c.muted; hline(x, TL, w - TR, Y(lo));
      if (lo < 0) { x.lineWidth = 1.5; hline(x, TL, w - TR, Y(0)); x.lineWidth = 1; }
      x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillStyle = c.muted;
      const xs = T <= 20 ? 5 : T <= 40 ? 10 : 20;
      for (let tt = 0; tt <= T; tt += xs) x.fillText(String(tt), X(tt), h - 7);
      const path = (arr: State[]) => { x.beginPath(); arr.forEach((s, i) => (i ? x.lineTo(X(sim.t[i]), Y(s[k])) : x.moveTo(X(sim.t[i]), Y(s[k])))); };
      x.lineWidth = 2; x.lineJoin = "round"; x.lineCap = "round"; x.strokeStyle = color;
      path(sim.nl); x.stroke();
      path(sim.lin); x.setLineDash([7, 5]); x.stroke(); x.setLineDash([]);
      if (sum.minLin[k] < 0) {
        const i = sim.lin.reduce((m, s, j) => (s[k] < sim.lin[m][k] ? j : m), 0);
        dot(x, X(sim.t[i]), Y(sim.lin[i][k]), color, c);
        x.font = `600 12px ${c.mono}`; x.textAlign = "left"; x.textBaseline = "middle";
        halo(x, fmt(sim.lin[i][k], 1), X(sim.t[i]) + 9, Y(sim.lin[i][k]), c);
      }
      const f = frac(), tt = (f / N) * T;
      x.strokeStyle = c.muted; x.lineWidth = 1; vline(x, X(tt), TT, h - TB);
      dot(x, X(tt), Y(lerp(sim.nl, f)[k]), color, c); dot(x, X(tt), Y(lerp(sim.lin, f)[k]), color, c, 3.5);
      if (L.hover != null) {
        x.strokeStyle = c.ink; x.globalAlpha = 0.4; vline(x, X(sim.t[L.hover]), TT, h - TB); x.globalAlpha = 1;
        dot(x, X(sim.t[L.hover]), Y(sim.nl[L.hover][k]), color, c, 4); dot(x, X(sim.t[L.hover]), Y(sim.lin[L.hover][k]), color, c, 3.5);
      }
    };

    /* lintasan */
    const PL = 44, PR = 16, PT = 14, PB = 28;
    const phaseGeom = (cv: HTMLCanvasElement) => {
      const { x, w, h } = fit(cv), [xl, xh] = dom.phase[0], [yl, yh] = dom.phase[1];
      return { x, w, h, xl, xh, yl, yh, X: (v: number) => PL + ((v - xl) / (xh - xl)) * (w - PL - PR), Y: (v: number) => h - PB - ((v - yl) / (yh - yl)) * (h - PB - PT) };
    };
    const drawPhase = (cv: HTMLCanvasElement) => {
      const c = col(), { x, w, h, xl, xh, yl, yh, X, Y } = phaseGeom(cv);
      x.fillStyle = c.danger; x.globalAlpha = 0.08;
      if (xl < 0) x.fillRect(X(xl), PT, X(0) - X(xl), h - PB - PT);
      if (yl < 0) x.fillRect(PL, Y(0), w - PL - PR, Y(yl) - Y(0));
      x.globalAlpha = 1; x.lineWidth = 1; x.font = `11px ${c.mono}`;
      x.textAlign = "right"; x.textBaseline = "middle";
      ticks(yl, yh, 5).forEach((v) => { x.strokeStyle = v === 0 ? c.muted : c.line; hline(x, PL, w - PR, Y(v)); x.fillStyle = c.muted; x.fillText(fmt(v, 0), PL - 8, Y(v)); });
      x.textAlign = "center"; x.textBaseline = "alphabetic";
      ticks(xl, xh, 5).forEach((v) => { x.strokeStyle = v === 0 ? c.muted : c.line; vline(x, X(v), PT, h - PB); x.fillStyle = c.muted; x.fillText(fmt(v, 0), X(v), h - 9); });
      x.strokeStyle = c.line; x.strokeRect(PL + 0.5, PT + 0.5, w - PL - PR - 1, h - PB - PT - 1);
      if (xl < 0 || yl < 0) { x.font = `11.5px ${c.sans}`; x.fillStyle = c.muted; x.textAlign = "left"; x.fillText(a.cv.negArea, PL + 8, h - PB - 8); }
      const f = frac();
      const trace = (arr: State[], upto: number) => {
        x.beginPath();
        for (let i = 0; i <= Math.floor(upto); i++) (i ? x.lineTo(X(arr[i][0]), Y(arr[i][1])) : x.moveTo(X(arr[i][0]), Y(arr[i][1])));
        if (upto < N) { const p = lerp(arr, upto); x.lineTo(X(p[0]), Y(p[1])); }
      };
      const both = (upto: number) => {
        x.strokeStyle = c.ink; trace(sim.nl, upto); x.stroke();
        x.strokeStyle = c.muted; x.setLineDash([7, 5]); trace(sim.lin, upto); x.stroke(); x.setLineDash([]);
      };
      x.lineWidth = 2; x.lineJoin = "round"; x.lineCap = "round";
      x.globalAlpha = 0.22; both(N); x.globalAlpha = 1; both(f);
      // panah arah di awal lintasan
      const s = Math.round(N * 0.02), p0 = sim.nl[s], p1 = sim.nl[s + 3], ang = Math.atan2(Y(p1[1]) - Y(p0[1]), X(p1[0]) - X(p0[0]));
      x.save(); x.translate(X(p0[0]), Y(p0[1])); x.rotate(ang); x.beginPath(); x.moveTo(6, 0); x.lineTo(-5, -5); x.lineTo(-5, 5); x.closePath(); x.fillStyle = c.ink; x.fill(); x.restore();
      x.strokeStyle = c.ink; x.lineWidth = 1.5; x.beginPath();
      x.moveTo(X(EQ.x) - 6, Y(EQ.y)); x.lineTo(X(EQ.x) + 6, Y(EQ.y)); x.moveTo(X(EQ.x), Y(EQ.y) - 6); x.lineTo(X(EQ.x), Y(EQ.y) + 6); x.stroke();
      x.font = `12px ${c.sans}`; x.textAlign = "left"; x.textBaseline = "middle";
      halo(x, a.cv.eq, X(EQ.x) + 9, Y(EQ.y) + 12, c);
      const s0 = sim.nl[0];
      x.beginPath(); x.arc(X(s0[0]), Y(s0[1]), 4, 0, 7); x.lineWidth = 1.5; x.strokeStyle = c.ink; x.stroke();
      halo(x, a.cv.start, X(s0[0]) + 8, Y(s0[1]) - 9, c);
      const pn = lerp(sim.nl, f), pl = lerp(sim.lin, f);
      dot(x, X(pn[0]), Y(pn[1]), c.ink, c, 5);
      x.beginPath(); x.arc(X(pl[0]), Y(pl[1]), 4.5, 0, 7); x.fillStyle = c.surface; x.fill(); x.lineWidth = 2.2; x.strokeStyle = c.muted; x.stroke();
      if (L.hover != null) {
        const hn = sim.nl[L.hover], hl = sim.lin[L.hover];
        x.lineWidth = 1.5; x.strokeStyle = c.muted;
        x.strokeRect(X(hn[0]) - 4, Y(hn[1]) - 4, 8, 8); x.strokeRect(X(hl[0]) - 4, Y(hl[1]) - 4, 8, 8);
      }
    };

    /* dunia animasi: satu titik = satu kelinci, satu segitiga = satu serigala */
    const drawWorld = (cv: HTMLCanvasElement, px: number, py: number) => {
      const c = col(), { x, w, h } = fit(cv), nP = clamp(Math.round(px), 0, MAXP), nQ = clamp(Math.round(py), 0, MAXQ);
      const jt = motionReduced() ? 0 : L.jt;
      const at = (i: number) => [(PTS[i][0] + Math.sin(jt * 0.9 + PTS[i][2]) * 0.012) * w, (PTS[i][1] + Math.cos(jt * 0.7 + PTS[i][2] * 1.3) * 0.016) * h];
      for (let i = 0; i < nP; i++) { const [cx, cy] = at(i); dot(x, cx, cy, c.prey, c, 5.5); }
      for (let i = 0; i < nQ; i++) {
        const [cx, cy] = at(MAXP + i);
        x.beginPath(); x.moveTo(cx, cy - 8); x.lineTo(cx + 7.5, cy + 5.5); x.lineTo(cx - 7.5, cy + 5.5); x.closePath();
        x.lineJoin = "round"; x.lineWidth = 2; x.strokeStyle = c.surface; x.stroke(); x.fillStyle = c.pred; x.fill();
      }
      if (px < 0 || py < 0) {
        x.font = `600 13px ${c.sans}`; x.textAlign = "center"; x.textBaseline = "middle";
        halo(x, px < 0 && py < 0 ? a.cv.both : px < 0 ? a.cv.x : a.cv.y, w / 2, h / 2, c);
      }
    };

    const render = () => {
      const c = col(), f = frac(), pn = lerp(sim.nl, f), pl = lerp(sim.lin, f);
      drawWorld(q("wNl"), pn[0], pn[1]); drawWorld(q("wLin"), pl[0], pl[1]);
      q("nlX").textContent = fmt(pn[0]); q("nlY").textContent = fmt(pn[1]);
      q("linX").textContent = fmt(pl[0]); q("linY").textContent = fmt(pl[1]);
      q("linFlag").hidden = !(pl[0] < 0 || pl[1] < 0);
      drawTime(q("cPrey"), 0, c.prey); drawTime(q("cPred"), 1, c.pred); drawPhase(q("cPhase"));
      q("clock").textContent = `t = ${fmt(L.tNow)} / ${T} ${a.yr}`;
      q<HTMLInputElement>("scrub").value = String(Math.round((L.tNow / T) * 1000));
    };
    draw.current = render;

    /* tooltip */
    const row = (color: string, dashed: boolean, val: number, text: string) => {
      const r = document.createElement("div"), k = document.createElement("i"), b = document.createElement("b"), l = document.createElement("span");
      r.className = "flex items-center gap-2 leading-7";
      k.className = "inline-block w-4 shrink-0 border-t-2"; k.style.borderColor = color; if (dashed) k.style.borderTopStyle = "dashed";
      b.className = "min-w-[3.25rem] text-right font-mono text-[13px] font-semibold"; b.textContent = fmt(val);
      l.className = "text-muted"; l.textContent = text;
      r.append(k, b, l); return r;
    };
    const showTip = (i: number, cx: number, cy: number) => {
      const c = col(), bx = charts.getBoundingClientRect(), head = document.createElement("div");
      head.className = "mb-1 font-mono text-xs text-muted"; head.textContent = a.tip(fmt(sim.t[i]));
      tip.replaceChildren(head,
        row(c.prey, false, sim.nl[i][0], a.tipRows[0]), row(c.prey, true, sim.lin[i][0], a.tipRows[1]),
        row(c.pred, false, sim.nl[i][1], a.tipRows[2]), row(c.pred, true, sim.lin[i][1], a.tipRows[3]));
      tip.hidden = false;
      const tw = tip.offsetWidth, th = tip.offsetHeight;
      let lx = cx - bx.left + 16, ly = cy - bx.top - th - 12;
      if (lx + tw > bx.width) lx = cx - bx.left - tw - 16;
      if (ly < 0) ly = cy - bx.top + 16;
      tip.style.left = Math.max(0, lx) + "px"; tip.style.top = ly + "px";
    };
    const setHover = (i: number | null, cx = 0, cy = 0) => { L.hover = i; if (i == null) tip.hidden = true; else showTip(i, cx, cy); render(); };

    const ac = new AbortController(), on = { signal: ac.signal };
    (["cPrey", "cPred"] as const).forEach((id) => {
      const cv = q<HTMLCanvasElement>(id);
      cv.addEventListener("pointermove", (e) => {
        const r = cv.getBoundingClientRect(), fx = (e.clientX - r.left - TL) / (r.width - TL - TR);
        setHover(fx < 0 || fx > 1 ? null : Math.round(fx * N), e.clientX, e.clientY);
      }, on);
      cv.addEventListener("pointerleave", () => setHover(null), on);
      cv.addEventListener("blur", () => setHover(null), on);
      cv.addEventListener("keydown", (e) => {
        if (e.key === "Escape") return setHover(null);
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        const cur = L.hover ?? Math.round(frac()), i = clamp(cur + (e.key === "ArrowRight" ? 1 : -1) * Math.round(N / 100), 0, N);
        const r = cv.getBoundingClientRect();
        setHover(i, r.left + TL + (i / N) * (r.width - TL - TR), r.top + r.height / 2);
      }, on);
    });
    const phase = q<HTMLCanvasElement>("cPhase");
    phase.addEventListener("pointermove", (e) => {
      const r = phase.getBoundingClientRect(), g = phaseGeom(phase), mx = e.clientX - r.left, my = e.clientY - r.top;
      let bi = -1, bd = 26 * 26;
      sim.nl.forEach((s, i) => { const d = (g.X(s[0]) - mx) ** 2 + (g.Y(s[1]) - my) ** 2; if (d < bd) { bd = d; bi = i; } });
      setHover(bi < 0 ? null : bi, e.clientX, e.clientY);
    }, on);
    phase.addEventListener("pointerleave", () => setHover(null), on);

    /* tema & ukuran */
    const refresh = () => { C = null; render(); };
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", refresh, on);
    const mo = new MutationObserver(refresh);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(() => render());
    ro.observe(root);

    /* pemutaran */
    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, 0.05); last = now;
      L.tNow += dt * speed; L.jt += dt;
      if (L.tNow >= T) { L.tNow = T; render(); setPlaying(false); setEnded(true); return; }
      render(); raf = requestAnimationFrame(frame);
    };
    if (playing) raf = requestAnimationFrame(frame);
    else render();

    return () => { cancelAnimationFrame(raf); ac.abort(); mo.disconnect(); ro.disconnect(); };
  }, [sim, sum, T, playing, speed, a, fmt]);

  const togglePlay = () => {
    if (!playing && live.current.tNow >= T) live.current.tNow = 0;
    setEnded(false);
    setPlaying(!playing);
  };
  const scrub = (e: React.FormEvent<HTMLInputElement>) => {
    live.current.tNow = (+e.currentTarget.value / 1000) * T;
    setEnded(false);
    if (playing) setPlaying(false);
    else draw.current();
  };

  const [VIcon, vColor] = VICON[sum.level];
  const stats = [
    [a.gapX, fmt(sum.gapX) + a.unit, a.ofEq(fmt((100 * sum.gapX) / EQ.x, 0), fmt(EQ.x, 0), T)],
    [a.gapY, fmt(sum.gapY) + a.unit, a.ofEq(fmt((100 * sum.gapY) / EQ.y, 0), fmt(EQ.y, 0), T)],
    [a.period, `${fmt(sum.periodNl, 2)} ${a.years}`, a.periodSub(fmt(sum.periodLin, 2), fmt(100 * (sum.periodNl / sum.periodLin - 1), 0))],
    [a.low, `${fmt(sum.minLin[0])} / ${fmt(sum.minLin[1])}`, a.lowSub(fmt(sum.minNl[0]), fmt(sum.minNl[1]))],
  ];
  const worlds = [
    { title: a.original, dash: false, cv: "wNl", x: "nlX", y: "nlY" },
    { title: a.linear, dash: true, cv: "wLin", x: "linX", y: "linY" },
  ];

  return (
    <div ref={box} className={page}>
      {/* judul kiri, lembar data kanan */}
      <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <TLink href="/archive" className={`rise inline-block transition-colors hover:text-accent ${label}`}>{a.tag}</TLink>
          <h1 className={`rise mt-3 ${h1}`} style={i(1)}>{a.title}</h1>
          <p className="rise mt-4 max-w-[60ch] leading-relaxed text-muted" style={i(2)}>{a.lede}</p>
        </div>
        <dl className="rise border-t border-line text-sm lg:col-span-5" style={i(3)}>
          {a.meta.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-2">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-mono text-xs">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-label={a.settings} className="rise mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-line py-4" style={i(4)}>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className={label}>{a.delta}</span>
          <Seg label={a.delta} values={DELTAS} cur={delta} show={(v) => `${v}%`} pick={setDelta} />
          <input type="range" min={5} max={150} step={5} value={delta} onChange={(e) => setDelta(+e.target.value)} aria-label={a.delta} className="w-36 min-w-0 accent-accent" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className={label}>{a.duration}</span>
          <Seg label={a.duration} values={DURS} cur={T} show={(v) => `${v} ${a.yr}`} pick={setT} />
        </div>
        <p className="basis-full text-sm text-muted">{a.start(delta, fmt(EQ.x * (1 + delta / 100), 0), fmt(EQ.y, 0))}</p>
      </section>

      <section className="rise mt-10 grid gap-8 lg:grid-cols-12" style={i(5)}>
        <p className="flex items-start gap-3 text-lg font-medium leading-snug tracking-tight lg:col-span-5" aria-live="polite">
          <VIcon size={26} weight="fill" className={`mt-px shrink-0 ${vColor}`} aria-hidden />
          <span className="max-w-[34ch]">{sum.negative ? a.verdict.neg : a.verdict[sum.level]}</span>
        </p>
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-7">
          {stats.map(([k, v, s], n) => (
            <div key={k} className="min-w-0 border-t border-line pt-3">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="mt-1 font-mono text-2xl tracking-tight">{v}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-muted">{s}</dd>
              {n === 3 && sum.negative && <dd className="mt-2 inline-flex items-center gap-1.5 text-xs"><i className="size-2 rounded-full bg-[var(--danger)]" />{a.negative}</dd>}
            </div>
          ))}
        </dl>
      </section>

      <section className="rise mt-12" style={i(6)}>
        <div className="grid gap-4 md:grid-cols-2">
          {worlds.map((w) => (
            <figure key={w.cv} className={`${panel} overflow-hidden`}>
              <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-sm font-medium">
                {w.title}<Stroke c="var(--ink)" dash={w.dash} />
              </figcaption>
              <canvas data-k={w.cv} role="img" aria-label={a.worldAria(w.title)} className="dots block h-52 w-full md:h-60" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line px-4 py-2.5 text-sm text-muted">
                <span className="inline-flex items-center gap-2"><Rabbit />{a.rabbits} <b data-k={w.x} className="font-mono font-medium text-ink" /></span>
                <span className="inline-flex items-center gap-2"><Wolf />{a.wolves} <b data-k={w.y} className="font-mono font-medium text-ink" /></span>
                {w.dash && <span data-k="linFlag" hidden className="inline-flex items-center gap-1.5 text-xs text-ink"><i className="size-2 rounded-full bg-[var(--danger)]" />{a.negative}</span>}
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <button type="button" onClick={togglePlay} className="inline-flex h-9 items-center gap-2 rounded-ui bg-ink px-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent active:translate-y-px">
            {playing ? <Pause size={14} weight="fill" aria-hidden /> : ended ? <ArrowCounterClockwise size={14} weight="bold" aria-hidden /> : <Play size={14} weight="fill" aria-hidden />}
            {playing ? a.pause : ended ? a.replay : a.play}
          </button>
          <input data-k="scrub" type="range" min={0} max={1000} step={1} defaultValue={0} onInput={scrub} aria-label={a.scrub} className="min-w-36 flex-1 accent-accent" />
          <span data-k="clock" className="whitespace-nowrap font-mono text-xs text-muted" />
          <Seg label={a.speed} values={SPEEDS} cur={speed} show={(v) => `${v}×`} pick={setSpeed} />
        </div>
      </section>

      <section data-k="charts" className="rise relative mt-12 grid items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" style={i(7)}>
        <div className={`${panel} p-4`}>
          <h2 className="text-sm font-medium">{a.time}</h2>
          {([["cPrey", a.rabbits, "var(--accent)", <Rabbit key="r" />], ["cPred", a.wolves, "var(--pred)", <Wolf key="w" />]] as const).map(([id, name, c, icon]) => (
            <div key={id}>
              <div className="mb-1 mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-2">{icon}{name}</span>
                <span className="inline-flex items-center gap-2"><Stroke c={c} />{a.original}</span>
                <span className="inline-flex items-center gap-2"><Stroke c={c} dash />{a.linear}</span>
              </div>
              <canvas data-k={id} tabIndex={0} role="img" aria-label={a.timeAria(name)} className="block h-48 w-full touch-pan-y rounded-ui" />
            </div>
          ))}
          <p className="mt-3 text-xs text-muted">{a.timeNote}</p>
        </div>
        <div className={`${panel} p-4`}>
          <h2 className="text-sm font-medium">{a.phase}</h2>
          <div className="mb-1 mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-2"><Stroke c="var(--ink)" />{a.original}</span>
            <span className="inline-flex items-center gap-2"><Stroke c="var(--muted)" dash />{a.linear}</span>
          </div>
          <canvas data-k="cPhase" role="img" aria-label={a.phaseAria} className="block aspect-square max-h-[470px] w-full touch-pan-y" />
          <p className="mt-3 text-xs text-muted">{a.phaseNote}</p>
        </div>
        <div data-k="tip" hidden className="pointer-events-none absolute z-10 min-w-44 rounded-ui border border-line bg-surface px-3 py-2 text-xs shadow-lg shadow-ink/10" />
      </section>

      <section className="rise mt-16" style={i(8)}>
        <h2 className="text-xl font-semibold tracking-tight">{a.explain}</h2>
        <ol className="mt-6 border-t border-line">
          {a.steps.map((s, n) => (
            <li key={s.title} className="grid gap-4 border-b border-line py-6 md:grid-cols-12 md:gap-8">
              <h3 className="flex items-baseline gap-3 font-medium md:col-span-4">
                <span className="font-mono text-xs text-muted">{String(n + 1).padStart(2, "0")}</span>{s.title}
              </h3>
              <div className="space-y-3 md:col-span-8">
                {s.eq && <pre className="overflow-x-auto rounded-ui border border-line bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed">{s.eq}</pre>}
                {s.body.map((p) => <p key={p} className="max-w-[65ch] text-sm leading-relaxed text-muted">{p}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <details className="rise mt-8" style={i(9)}>
        <summary className="cursor-pointer text-sm font-medium hover:text-accent">{a.table}</summary>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full font-mono text-[13px] tabular-nums">
            <thead>
              <tr>{a.cols.map((h) => <th key={h} className="whitespace-nowrap border-b border-line px-3 py-2 text-right font-sans text-xs font-normal text-muted">{h}</th>)}</tr>
            </thead>
            <tbody>
              {Array.from({ length: 21 }, (_, j) => {
                const k = Math.round((j * N) / 20), { t: ts, nl, lin } = sim;
                return (
                  <tr key={j}>
                    {[ts[k], nl[k][0], lin[k][0], nl[k][1], lin[k][1]].map((v, c) => (
                      <td key={c} className={`whitespace-nowrap border-b border-line px-3 py-1.5 text-right ${c && v < 0 ? "bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] font-semibold" : ""}`}>{fmt(v)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
