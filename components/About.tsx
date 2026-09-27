"use client";
import { useLang } from "@/lib/i18n";
import { h1, i, page } from "@/lib/ui";

export function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <div className={`${page} grid gap-12 lg:grid-cols-12`}>
      <div className="lg:col-span-7">
        <h1 className={`rise ${h1}`}>{a.title}</h1>
        <div className="rise mt-6 max-w-[62ch] space-y-4 leading-relaxed text-muted" style={i(1)}>
          {a.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
        {/* id education: anchor lama tetap hidup */}
        <dl id="education" className="rise mt-8 border-t border-line" style={i(2)}>
          {a.facts.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3 text-sm">
              <dt className="font-mono text-muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div id="skills" className="lg:col-span-5">
        <h2 className="rise text-sm font-medium" style={i(2)}>{a.skills}</h2>
        <div className="mt-5 space-y-7">
          {a.groups.map((s, n) => (
            <div key={s.group} className="rise" style={i(3 + n)}>
              <h3 className="text-sm text-muted">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((x) => (
                  <li key={x} className="rounded-ui border border-line bg-surface px-2.5 py-1 font-mono text-[13px]">{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
