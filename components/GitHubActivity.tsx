"use client";
// Work → GitHub. Data dari /data/github.json (scripts/github.mjs: saat build + harian di server),
// jadi browser tidak memanggil API GitHub. Grafik: satu hue berurutan (kobalt)
// untuk besaran, bar ≤ 24px dengan ujung 4px membulat, grid rambut, tooltip per sel/bar, dan tampilan tabel.
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { PROFILE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { i, link } from "@/lib/ui";

type Repo = { name: string; url: string; description: string; language: string; stars: number; homepage: string; created: string; pushed: string };
type Commit = { repo: string; message: string; date: string; sha: string; url: string };
type Day = { date: string; count: number };
type Data = { generated: string; since: string; repos: Repo[]; recent: Commit[]; days: Day[] };
type Load = { kind: "loading" } | { kind: "error" } | { kind: "ok"; data: Data };
type Col = "name" | "language" | "stars" | "pushed" | "created";

const LEVEL = [
  "color-mix(in srgb, var(--line) 75%, transparent)",
  "color-mix(in srgb, var(--accent) 28%, var(--surface))",
  "color-mix(in srgb, var(--accent) 52%, var(--surface))",
  "color-mix(in srgb, var(--accent) 76%, var(--surface))",
  "var(--accent)",
];

const card = "rounded-ui border border-line bg-surface";

export function GitHubActivity() {
  const { lang, t } = useLang();
  const g = t.gh;
  const loc = lang === "id" ? "id-ID" : "en-US";
  const [s, setS] = useState<Load>({ kind: "loading" });
  const [tabel, setTabel] = useState(false);
  const [sort, setSort] = useState<{ col: Col; asc: boolean }>({ col: "pushed", asc: false });
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/github.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Data) => setS({ kind: "ok", data: d }))
      .catch(() => setS({ kind: "error" }));
  }, []);

  // heatmap di HP bisa lebih lebar dari layar: mulai dari ujung kanan (minggu terbaru)
  useEffect(() => {
    const f = requestAnimationFrame(() => { if (heatRef.current) heatRef.current.scrollLeft = heatRef.current.scrollWidth; });
    return () => cancelAnimationFrame(f);
  }, [s, tabel]);

  const olah = useMemo(() => {
    if (s.kind !== "ok") return null;
    const days = s.data.days;
    // tingkat warna = kuartil hari yang ada kontribusinya (cara GitHub)
    const isi = days.map((d) => d.count).filter(Boolean).sort((a, b) => a - b);
    const q = [0.25, 0.5, 0.75].map((p) => isi[Math.floor(p * (isi.length - 1))] || 1);
    const level = (c: number) => (c === 0 ? 0 : c <= q[0] ? 1 : c <= q[1] ? 2 : c <= q[2] ? 3 : 4);
    // kolom = minggu (Minggu..Sabtu), mulai dari hari Minggu sebelum/sama dengan hari pertama
    const first = new Date(days[0].date + "T00:00:00");
    const pad = first.getDay();
    const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
    const weeks: (Day | null)[][] = [];
    for (let k = 0; k < cells.length; k += 7) weeks.push(cells.slice(k, k + 7));
    const perWeek = weeks.map((w) => ({ start: (w.find(Boolean) as Day).date, count: w.reduce((n, d) => n + (d?.count || 0), 0) }));
    const months = weeks.map((w, k) => {
      const d = w.find(Boolean) as Day;
      const prev = k ? (weeks[k - 1].find(Boolean) as Day).date.slice(0, 7) : "";
      return d.date.slice(0, 7) !== prev ? { k, label: new Date(d.date + "T00:00:00").toLocaleDateString(loc, { month: "short" }) } : null;
    }).filter(Boolean) as { k: number; label: string }[];
    let longest = 0, run = 0;
    for (const d of days) { run = d.count ? run + 1 : 0; longest = Math.max(longest, run); }
    const perMonth = Object.entries(days.reduce<Record<string, number>>((m, d) => ({ ...m, [d.date.slice(0, 7)]: (m[d.date.slice(0, 7)] || 0) + d.count }), {}));
    return {
      weeks, perWeek, months, level, perMonth,
      total: days.reduce((n, d) => n + d.count, 0),
      active: isi.length,
      longest,
    };
  }, [s, loc]);

  const repos = useMemo(() => {
    if (s.kind !== "ok") return [];
    const { col, asc } = sort;
    return [...s.data.repos].sort((a, b) => {
      const v = col === "stars" ? a.stars - b.stars : String(a[col]).localeCompare(String(b[col]));
      return asc ? v : -v;
    });
  }, [s, sort]);

  const tgl = (iso: string, opt: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) => new Date(iso.length === 10 ? iso + "T00:00:00" : iso).toLocaleDateString(loc, opt);
  const rel = (iso: string) => {
    const hari = Math.round((Date.now() - new Date(iso).getTime()) / 864e5);
    const f = new Intl.RelativeTimeFormat(loc, { numeric: "auto" });
    return hari < 30 ? f.format(-hari, "day") : hari < 365 ? f.format(-Math.round(hari / 30), "month") : f.format(-Math.round(hari / 365), "year");
  };
  const showTip = (e: React.PointerEvent | React.FocusEvent, text: string) => {
    const box = wrapRef.current!.getBoundingClientRect();
    const r = (e.currentTarget as Element).getBoundingClientRect();
    setTip({ x: r.left + r.width / 2 - box.left, y: r.top - box.top, text });
  };

  if (s.kind === "loading")
    return (
      <div className="grid gap-4 lg:grid-cols-12" aria-busy>
        <div className={`${card} h-72 animate-pulse lg:col-span-8`} />
        <div className={`${card} h-72 animate-pulse lg:col-span-4`} />
      </div>
    );
  if (s.kind === "error" || !olah)
    return <p className="text-sm text-muted">{g.empty} <a href={PROFILE.github} className={link}>github.com/arvamadax</a></p>;

  const { data } = s;
  const maxWeek = Math.max(...olah.perWeek.map((w) => w.count), 1);
  const tick = Math.ceil(maxWeek / 5) * 5;
  const W = 720, H = 110, band = W / olah.perWeek.length, bw = Math.min(band - 2, 24);

  return (
    <div ref={wrapRef} className="relative space-y-4" onPointerLeave={() => setTip(null)}>
      <div className="grid items-start gap-4 lg:grid-cols-12">
        {/* ---- keaktifan */}
        <section className={`rise ${card} min-w-0 p-5 lg:col-span-8`} style={i(1)} aria-labelledby="gh-act">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="gh-act" className="text-sm font-medium">{g.activity} <span className="font-normal text-muted">{g.since} {tgl(data.since, { month: "long", year: "numeric" })}</span></h2>
            <button type="button" onClick={() => setTabel(!tabel)} className={`text-xs text-muted ${link}`}>{tabel ? g.hideTable : g.showTable}</button>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4">
            {[[g.total, olah.total], [g.active, olah.active], [g.streak, `${olah.longest} ${g.days}`]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">{typeof v === "number" ? v.toLocaleString(loc) : v}</dd>
              </div>
            ))}
          </dl>

          {tabel ? (
            <table className="mt-5 w-full text-sm">
              <thead><tr className="text-left text-xs text-muted"><th className="py-2 font-normal">{g.month}</th><th className="py-2 text-right font-normal">{g.total}</th></tr></thead>
              <tbody className="font-mono">
                {olah.perMonth.map(([m, n]) => (
                  <tr key={m} className="border-t border-line"><td className="py-1.5">{tgl(m + "-01", { month: "long", year: "numeric" })}</td><td className="py-1.5 text-right">{n}</td></tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              {/* heatmap harian: 7 baris × minggu */}
              <div ref={heatRef} className="mt-5 overflow-x-auto pb-1" role="img" aria-label={`${g.activity}: ${olah.total} ${g.since} ${data.since}`}>
                <div className="w-max">
                  <div className="relative h-4 text-[10px] text-muted" aria-hidden>
                    {olah.months.map((m) => <span key={m.k} className="absolute" style={{ left: m.k * 13 }}>{m.label}</span>)}
                  </div>
                  <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: "repeat(7, 10px)" }} aria-hidden>
                    {olah.weeks.flatMap((w, k) =>
                      Array.from({ length: 7 }, (_, r) => {
                        const d = w[r];
                        return (
                          <span
                            key={`${k}-${r}`}
                            className="size-[10px] rounded-[2px]"
                            style={{ background: d ? LEVEL[olah.level(d.count)] : "transparent" }}
                            onPointerEnter={d ? (e) => showTip(e, `${d.count ? g.contrib(d.count) : g.noContrib}, ${tgl(d.date)}`) : undefined}
                          />
                        );
                      }),
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted" aria-hidden>
                {g.less} {LEVEL.map((c) => <span key={c} className="size-[10px] rounded-[2px]" style={{ background: c }} />)} {g.more}
              </div>

              {/* bar per minggu: satu seri, tanpa legenda (judul sudah menamainya) */}
              <h3 className="mt-5 text-xs text-muted">{g.perWeek}</h3>
              {/* label di HTML (bukan <text> SVG) supaya tidak ikut mengecil di HP */}
              <div className="relative mt-5">
              <span className="absolute left-0 top-0 -translate-y-full pb-0.5 font-mono text-[10px] text-muted">{tick}</span>
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-28 w-full" role="img" aria-label={g.perWeek}>
                <line x1="0" x2={W} y1={H} y2={H} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2={W} y1="4" y2="4" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {olah.perWeek.map((w, k) => {
                  const h = (w.count / tick) * (H - 4);
                  const x = k * band + (band - bw) / 2;
                  const y = H - h;
                  const r = Math.min(4, h, bw / 2);
                  return (
                    <g key={w.start} onPointerEnter={(e) => showTip(e, `${g.week} ${tgl(w.start)}: ${g.contrib(w.count)}`)}>
                      <rect x={k * band} y="0" width={band} height={H} fill="transparent" />
                      {h > 0 && <path d={`M${x},${H} V${y + r} Q${x},${y} ${x + r},${y} H${x + bw - r} Q${x + bw},${y} ${x + bw},${y + r} V${H} Z`} fill="var(--accent)" />}
                    </g>
                  );
                })}
              </svg>
              <div className="mt-1 flex justify-between text-[10px] text-muted">
                <span>{tgl(olah.perWeek[0].start, { month: "short", year: "numeric" })}</span>
                <span>{tgl(olah.perWeek.at(-1)!.start, { month: "short", year: "numeric" })}</span>
              </div>
              </div>
            </>
          )}
        </section>

        {/* ---- commit terbaru, eksplisit */}
        <section className={`rise ${card} min-w-0 lg:col-span-4`} style={i(2)} aria-labelledby="gh-recent">
          <h2 id="gh-recent" className="border-b border-line px-5 py-4 text-sm font-medium">{g.recent}</h2>
          <ol className="divide-y divide-line">
            {data.recent.slice(0, 6).map((c) => (
              <li key={c.sha + c.repo}>
                <a href={c.url} target="_blank" rel="noopener" className="group block px-5 py-3">
                  <span className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
                    <span className="truncate">{c.repo}</span>
                    <span className="shrink-0">{rel(c.date)}</span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm group-hover:text-accent">{c.message}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted">{c.sha}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ---- tabel repo */}
      <section className={`rise ${card} min-w-0 overflow-x-auto`} style={i(3)} aria-labelledby="gh-repos">
        <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-4">
          <h2 id="gh-repos" className="text-sm font-medium">{g.repos}</h2>
          <span className="text-xs text-muted">{g.updated} {tgl(data.generated)} · <a href={PROFILE.github} target="_blank" rel="noopener" className={link}>{g.all}</a></span>
        </div>
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              {(Object.keys(g.cols) as Col[]).map((c) => (
                <th key={c} className={`px-5 py-2.5 font-normal ${c === "stars" ? "text-right" : ""}`} aria-sort={sort.col === c ? (sort.asc ? "ascending" : "descending") : "none"}>
                  <button type="button" className="inline-flex items-center gap-1 hover:text-ink" onClick={() => setSort({ col: c, asc: sort.col === c ? !sort.asc : c === "name" || c === "language" })}>
                    {g.cols[c]}
                    {sort.col === c && (sort.asc ? <CaretUp size={12} aria-hidden /> : <CaretDown size={12} aria-hidden />)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repos.map((r) => (
              <tr key={r.name} className="border-t border-line">
                <td className="px-5 py-3">
                  <a href={r.url} target="_blank" rel="noopener" className="font-mono hover:text-accent">{r.name}</a>
                  {r.homepage && <a href={r.homepage} target="_blank" rel="noopener" className="ml-2 inline-flex text-muted hover:text-accent" aria-label={`${r.name} live`}><ArrowUpRight size={13} /></a>}
                  {r.description && <span className="block max-w-[46ch] truncate text-xs text-muted">{r.description}</span>}
                </td>
                <td className="px-5 py-3 text-muted">{r.language || "Other"}</td>
                <td className="px-5 py-3 text-right font-mono text-muted"><span className="inline-flex items-center gap-1"><Star size={12} aria-hidden />{r.stars}</span></td>
                <td className="px-5 py-3 font-mono text-xs text-muted">{tgl(r.pushed)}</td>
                <td className="px-5 py-3 font-mono text-xs text-muted">{tgl(r.created)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {tip && (
        <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-ui bg-ink px-2 py-1 text-xs text-bg shadow-lg" style={{ left: tip.x, top: tip.y - 6 }} role="status">
          {tip.text}
        </div>
      )}
    </div>
  );
}
