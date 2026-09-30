"use client";
// Daftar isi /archive. Data: ARCHIVE di lib/content.ts. Dibuka dari terminal (`archive`).
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { ARCHIVE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { h1, i, page } from "@/lib/ui";
import { TLink } from "./TLink";

const row = "group grid gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:items-baseline";

export function Archive() {
  const { lang, t } = useLang();
  const a = t.archive;
  const month = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { month: "short", year: "numeric" });

  return (
    <div className={page}>
      <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h1 className={`rise ${h1}`}>{a.title}</h1>
          <p className="rise mt-4 max-w-[60ch] text-muted" style={i(1)}>{a.sub}</p>
        </div>
        <p className="rise font-mono text-xs text-muted lg:col-span-4 lg:text-right" style={i(2)}>{a.count(ARCHIVE.length)}</p>
      </header>

      {ARCHIVE.length === 0 ? (
        <p className="rise mt-10 rounded-ui border border-dashed border-line px-6 py-12 text-center text-sm text-muted" style={i(3)}>{a.empty}</p>
      ) : (
        <ol className="mt-10 border-t border-line">
          {ARCHIVE.map((e, n) => {
            const x = e[lang], ext = e.href.startsWith("http"), Arrow = ext ? ArrowUpRight : ArrowRight;
            const body = (
              <>
                <span className="font-mono text-xs text-muted md:col-span-1">{String(ARCHIVE.length - n).padStart(3, "0")}</span>
                <span className="md:col-span-6">
                  <span className="block text-lg font-medium tracking-tight transition-colors group-hover:text-accent">{x.title}</span>
                  <span className="mt-1 block max-w-[55ch] text-sm leading-relaxed text-muted">{x.summary}</span>
                </span>
                <span className="flex flex-wrap gap-1.5 md:col-span-3">
                  {e.tags.map((tag) => <span key={tag} className="rounded-ui border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">{tag}</span>)}
                </span>
                <span className="flex items-center justify-between gap-3 font-mono text-xs text-muted md:col-span-2 md:justify-end">
                  {month.format(new Date(`${e.date}-01T12:00:00`))}
                  <Arrow size={16} aria-hidden className="text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </span>
              </>
            );
            return (
              <li key={e.href} className="rise border-b border-line" style={i(n + 3)}>
                {ext
                  ? <a href={e.href} target="_blank" rel="noopener" className={row}>{body}<span className="sr-only">({a.external})</span></a>
                  : <TLink href={e.href} className={row}>{body}</TLink>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
