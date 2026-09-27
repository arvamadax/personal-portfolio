"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { WORK_BASE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { h1, i, page } from "@/lib/ui";
import { Spotlight } from "./Motion";
import { GitHubActivity } from "./GitHubActivity";

type Tab = "projects" | "github";

export function Work() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("projects");

  // #github bisa dibagikan langsung
  useEffect(() => { if (location.hash === "#github") setTab("github"); }, []);
  const pilih = (x: Tab) => { setTab(x); history.replaceState(null, "", x === "github" ? "#github" : location.pathname); };

  return (
    <div className={page}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className={`rise ${h1}`}>{t.work.title}</h1>
        <div role="tablist" aria-label={t.work.title} className="rise flex rounded-ui border border-line bg-surface p-1" style={i(1)}>
          {(["projects", "github"] as Tab[]).map((x) => (
            <button key={x} role="tab" aria-selected={tab === x} onClick={() => pilih(x)}
              className={`h-8 rounded-ui px-4 text-sm transition-colors ${tab === x ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}>
              {t.work.tabs[x]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8" role="tabpanel" key={tab}>
        {tab === "github" ? <GitHubActivity /> : (
          /* Bento 3 kolom: [lebar][sempit] / [sempit][lebar]. HP: satu kolom. */
          <Spotlight className="grid gap-4 md:grid-cols-3">
            {WORK_BASE.map((w, n) => {
              const x = t.work.items[n];
              return (
                <article key={w.name} style={i(n + 1)}
                  className={`spot lift rise flex flex-col overflow-hidden rounded-ui border border-line bg-surface ${w.wide ? "md:col-span-2" : ""}`}>
                  {w.image ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-line bg-bg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.image.src} alt={x.alt ?? w.name} loading="lazy"
                        className={`h-full w-full ${w.image.fit === "contain" ? "object-contain p-8" : "object-cover object-top"}`} />
                    </div>
                  ) : (
                    <div className="dots h-28 border-b border-line md:h-auto md:flex-1" aria-hidden />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-muted">{x.context}</p>
                    <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{w.name}</h2>
                    <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted">{x.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                      <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
                        {w.stack.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                      <div className="flex gap-4 text-sm">
                        <a href={w.code} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-accent">
                          <GithubLogo size={16} aria-hidden /> {t.work.code}
                        </a>
                        {w.live && (
                          <a href={w.live} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-accent">
                            {t.work.live} <ArrowUpRight size={14} aria-hidden />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </Spotlight>
        )}
      </div>
    </div>
  );
}
