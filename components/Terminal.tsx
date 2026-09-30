"use client";
// Terminal kecil di atas halaman. Dibuka tombol >_ di nav atau Ctrl + `.
// Perintah publik untuk pengunjung; `planner` (tidak tercantum di help) membuka tab baru ke /planner,
// `archive` (juga tersembunyi) pindah ke /archive (daftar isi tugas & eksperimen).
// Terminal ini hanya PINTU, bukan pengaman: /planner dan /api dijaga PIN nginx + Cloudflare Access.
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { navigate, PAGE_ORDER } from "@/lib/transition";
import { setMotion, setTheme, type Theme } from "./Prefs";

type Line = { kind: "in" | "out" | "err"; text: string };

const NAMES = ["help", "ls", "cd", "whoami", "cv", "email", "github", "linkedin", "instagram", "lang", "theme", "motion", "date", "clear", "exit"];
const PAGE_NAMES = PAGE_ORDER.map((href) => (href === "/" ? "home" : href.slice(1)));

export function Terminal() {
  const router = useRouter();
  const { t, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const hist = useRef<string[]>([]);
  const pos = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    const key = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") { e.preventDefault(); toggle(); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("terminal", toggle);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("terminal", toggle); window.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { screen.current?.scrollTo({ top: screen.current.scrollHeight }); }, [lines]);

  function run(raw: string) {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const out = (text: string, kind: Line["kind"] = "out") => setLines((l) => [...l, { kind, text }]);
    const go = (href: string) => { out(`cd ${href}`); navigate(href, router.push); };
    const openTab = (url: string, label: string) => { window.open(url, "_blank", "noopener"); out(`${label} → new tab`); };

    switch (cmd.toLowerCase()) {
      case "": return;
      case "help": return out(t.term.help);
      case "ls": return out(PAGE_NAMES.join("   "));
      case "cd": {
        const p = (args[0] || "home").replace(/^\/|\/$/g, "").toLowerCase();
        if (p === "~" || p === "home" || p === "..") return go("/");
        if (PAGE_NAMES.includes(p)) return go(`/${p}`);
        return out(`cd: no such page: ${args[0]}`, "err");
      }
      case "whoami": return out(t.term.whoami);
      case "cv": return openTab(PROFILE.cv, "CV");
      case "email": window.location.href = `mailto:${PROFILE.email}`; return out(PROFILE.email);
      case "github": return openTab(PROFILE.github, "GitHub");
      case "linkedin": return openTab(PROFILE.linkedin, "LinkedIn");
      case "instagram": return openTab(PROFILE.instagram, "Instagram");
      case "lang": {
        if (args[0] !== "en" && args[0] !== "id") return out("usage: lang <en|id>", "err");
        setLang(args[0]);
        return out(args[0] === "id" ? "bahasa: Indonesia" : "language: English");
      }
      case "theme": {
        const t = args[0] as Theme;
        if (!["light", "dark", "system"].includes(t)) return out("usage: theme <light|dark|system>", "err");
        setTheme(t);
        return out(`theme set to ${t}`);
      }
      case "motion": {
        if (args[0] !== "on" && args[0] !== "off") return out("usage: motion <on|off>", "err");
        setMotion(args[0] === "on");
        return out(`motion ${args[0]}`);
      }
      case "date":
        return out(new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta", dateStyle: "full", timeStyle: "short" }) + " WIB");
      case "clear": return setLines([]);
      case "exit": return setOpen(false);
      // pintu pribadi (tidak ada di help)
      case "planner": return openTab("/planner", "planner");
      case "jadwal": return openTab("/planner#jadwal", "jadwal");
      case "archive": return go("/archive");
      case "sudo": return out("nice try.", "err");
      default: return out(t.term.notFound(cmd), "err");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLines((l) => [...l, { kind: "in", text: input }]);
    if (input.trim()) hist.current.push(input);
    pos.current = hist.current.length;
    run(input);
    setInput("");
  }

  function keys(e: React.KeyboardEvent<HTMLInputElement>) {
    const h = hist.current;
    if (e.key === "ArrowUp" && pos.current > 0) { e.preventDefault(); pos.current--; setInput(h[pos.current]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); pos.current = Math.min(h.length, pos.current + 1); setInput(h[pos.current] ?? ""); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const [c, a] = input.split(/\s+/);
      const pool = a !== undefined ? (c === "cd" ? PAGE_NAMES : c === "theme" ? ["light", "dark", "system"] : c === "motion" ? ["on", "off"] : c === "lang" ? ["en", "id"] : []) : NAMES;
      const word = a ?? c;
      const hit = pool.filter((p) => p.startsWith(word));
      if (hit.length === 1) setInput(a !== undefined ? `${c} ${hit[0]}` : hit[0]);
      else if (hit.length > 1) setLines((l) => [...l, { kind: "out", text: hit.join("   ") }]);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-x-0 top-16 z-50 flex justify-center px-4" role="dialog" aria-label="Terminal">
      <div className="pop w-full max-w-2xl overflow-hidden rounded-ui border border-line bg-[var(--term-bg)] font-mono text-[13px] text-[var(--term-ink)] shadow-2xl shadow-ink/20">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[color-mix(in_srgb,var(--term-ink)_55%,transparent)]">
          <span>arva@portfolio: ~</span>
          <button type="button" onClick={() => setOpen(false)} className="hover:text-[var(--term-ink)]" aria-label={t.term.close}>esc</button>
        </div>
        <div ref={screen} className="max-h-[50vh] min-h-40 overflow-auto p-4 leading-relaxed" onClick={() => inputRef.current?.focus()}>
          <pre className="whitespace-pre-wrap text-[color-mix(in_srgb,var(--term-ink)_55%,transparent)]">{t.term.hint}</pre>
          {lines.map((l, i) => (
            <pre key={i} className={`whitespace-pre-wrap ${l.kind === "err" ? "text-[#ff9e8f]" : ""}`}>
              {l.kind === "in" ? <><span className="text-[#8fe3b0]">$</span> {l.text}</> : l.text}
            </pre>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2">
            <span className="text-[#8fe3b0]" aria-hidden>$</span>
            <label htmlFor="term-in" className="sr-only">Command</label>
            <input
              id="term-in"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={keys}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent caret-[#8fe3b0] outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
