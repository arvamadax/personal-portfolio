"use client";
// Dua umpan langsung dari situs lama: Hacker News (Algolia) dan klasemen EPL (TheSportsDB).
import { useEffect, useState } from "react";
import { ArrowUp, ChatCircle } from "@phosphor-icons/react";
import { h1, i, link, page } from "@/lib/ui";
import { useLang } from "@/lib/i18n";

type Load<T> = { kind: "loading" } | { kind: "error" } | { kind: "ok"; data: T };

type Story = { objectID: string; title: string; url?: string; points: number; num_comments: number; created_at: string };
type Row = { rank: number; team: string; badge: string; played: string; gd: number; pts: string };

const ago = (iso: string) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const Skeleton = ({ rows }: { rows: number }) => (
  <div className="space-y-5 py-4" aria-hidden>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-4 w-4/5 animate-pulse rounded-ui bg-line" />
        <div className="h-3 w-1/3 animate-pulse rounded-ui bg-line" />
      </div>
    ))}
  </div>
);

function useNews() {
  const [s, setS] = useState<Load<Story[]>>({ kind: "loading" });
  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=6")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setS({ kind: "ok", data: (d.hits as Story[]).filter((h) => h.title) }))
      .catch(() => setS({ kind: "error" }));
  }, []);
  return s;
}

function useTable() {
  const [s, setS] = useState<Load<{ season: string; rows: Row[]; total: number }>>({ kind: "loading" });
  useEffect(() => {
    const now = new Date();
    const y = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
    const seasons = [`${y}-${y + 1}`, `${y - 1}-${y}`]; // awal musim tabelnya bisa masih kosong
    (async () => {
      for (const season of seasons) {
        try {
          const r = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${season}`);
          const d = await r.json();
          const t = d.table as Record<string, string>[] | null;
          if (!Array.isArray(t) || !t.length) continue;
          const rows = t.slice(0, 10).map((x) => ({
            rank: +x.intRank, team: x.strTeam, badge: x.strBadge, played: x.intPlayed, gd: +x.intGoalDifference, pts: x.intPoints,
          }));
          return setS({ kind: "ok", data: { season, rows, total: t.length } });
        } catch {}
      }
      setS({ kind: "error" });
    })();
  }, []);
  return s;
}

export function Radar() {
  const { t } = useLang();
  const r = t.radar;
  const news = useNews();
  const table = useTable();

  return (
    <div className={page}>
        <h1 className={`rise ${h1}`}>{r.title}</h1>
        <p className="rise mt-4 max-w-[60ch] text-muted" style={i(1)}>{r.sub}</p>

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="rise lg:col-span-7" style={i(2)}>
            <h3 className="flex items-baseline justify-between text-sm font-medium">
              {r.hn}
              <a href="https://news.ycombinator.com/" target="_blank" rel="noopener" className={`font-normal text-muted ${link}`}>news.ycombinator.com</a>
            </h3>
            <div className="mt-4 border-t border-line" aria-live="polite" aria-busy={news.kind === "loading"}>
              {news.kind === "loading" && <Skeleton rows={5} />}
              {news.kind === "error" && <p className="py-4 text-sm text-muted">{r.hnError}</p>}
              {news.kind === "ok" && (
                <ol>
                  {news.data.map((h) => {
                    const url = h.url || `https://news.ycombinator.com/item?id=${h.objectID}`;
                    const host = h.url ? new URL(h.url).hostname.replace(/^www\./, "") : "news.ycombinator.com";
                    return (
                      <li key={h.objectID}>
                        <a href={url} target="_blank" rel="noopener" className="group block py-3.5">
                          <span className="leading-snug group-hover:text-accent">{h.title}</span>
                          <span className="mt-1 flex flex-wrap items-center gap-x-4 font-mono text-xs text-muted">
                            <span>{host}</span>
                            <span className="inline-flex items-center gap-1"><ArrowUp size={12} aria-hidden />{h.points}</span>
                            <span className="inline-flex items-center gap-1"><ChatCircle size={12} aria-hidden />{h.num_comments}</span>
                            <span>{ago(h.created_at)}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>

          <div className="rise lg:col-span-5" style={i(3)}>
            <h3 className="flex items-baseline justify-between text-sm font-medium">
              {r.epl} {table.kind === "ok" ? table.data.season : ""}
              <a href="https://www.premierleague.com/tables" target="_blank" rel="noopener" className={`font-normal text-muted ${link}`}>{r.eplFull}</a>
            </h3>
            <div className="mt-4 border-t border-line" aria-live="polite" aria-busy={table.kind === "loading"}>
              {table.kind === "loading" && <Skeleton rows={5} />}
              {table.kind === "error" && <p className="py-4 text-sm text-muted">{r.eplError}</p>}
              {table.kind === "ok" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left font-mono text-xs text-muted">
                      <th className="py-2.5 font-normal">#</th>
                      <th className="font-normal">{r.team}</th>
                      <th className="text-right font-normal" title={r.played}>P</th>
                      <th className="text-right font-normal" title={r.gd}>GD</th>
                      <th className="text-right font-normal" title={r.pts}>Pts</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {table.data.rows.map((r) => (
                      <tr key={r.team}>
                        {/* zona: garis aksen tipis untuk 4 besar (Liga Champions) */}
                        <td className={`w-8 py-2 ${r.rank <= 4 ? "text-accent" : "text-muted"}`}>{r.rank}</td>
                        <td className="font-sans">
                          <span className="flex items-center gap-2">
                            {r.badge && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={r.badge} alt="" width={18} height={18} loading="lazy" className="size-[18px]" />
                            )}
                            {r.team}
                          </span>
                        </td>
                        <td className="text-right text-muted">{r.played}</td>
                        <td className="text-right text-muted">{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                        <td className="text-right font-medium">{r.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {table.kind === "ok" && (
                <p className="mt-3 text-xs text-muted">
                  {r.top(table.data.rows.length)}
                </p>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
