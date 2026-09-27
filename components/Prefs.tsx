"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "@phosphor-icons/react";
import { useLang } from "@/lib/i18n";

export type Theme = "system" | "light" | "dark";
const NEXT: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };
const ICON = { system: Monitor, light: Sun, dark: Moon };

const store = (k: string, v: string | null) => {
  try {
    if (v) localStorage.setItem(k, v);
    else localStorage.removeItem(k);
  } catch {}
};

/** Animasi efektif mati? (saklar menang atas OS) */
export const motionReduced = () => {
  const m = document.documentElement.dataset.motion;
  return m === "reduce" || (m !== "full" && matchMedia("(prefers-reduced-motion: reduce)").matches);
};

// Dipakai juga oleh terminal (perintah `theme` dan `motion`).
export function setTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") delete root.dataset.theme;
  else root.dataset.theme = t;
  store("theme", t === "system" ? null : t);
  window.dispatchEvent(new Event("prefs"));
}
export function setMotion(on: boolean) {
  document.documentElement.dataset.motion = on ? "full" : "reduce";
  store("motion", on ? "full" : "reduce");
  window.dispatchEvent(new Event("prefs"));
}

const iconBtn = "grid size-9 place-items-center rounded-ui text-muted transition-colors hover:bg-line/60 hover:text-ink active:scale-[0.97]";

export function Prefs({ bahasa = true }: { bahasa?: boolean }) {
  const { lang, t, setLang } = useLang();
  const [theme, setT] = useState<Theme>("system");
  const [on, setOn] = useState(true);

  useEffect(() => {
    const read = () => {
      setT((document.documentElement.dataset.theme as Theme) || "system");
      setOn(!motionReduced());
    };
    read();
    window.addEventListener("prefs", read);
    return () => window.removeEventListener("prefs", read);
  }, []);

  const ThemeIcon = ICON[theme];

  return (
    <div className="flex items-center gap-1">
      {bahasa && (
        <button type="button" onClick={() => setLang(lang === "en" ? "id" : "en")} className="flex h-9 items-center whitespace-nowrap rounded-ui px-2 font-mono text-xs text-muted transition-colors hover:bg-line/60 hover:text-ink" aria-label={t.nav.lang} title={t.nav.lang}>
          <span className={lang === "en" ? "text-ink" : ""}>EN</span>
          <span className="px-0.5 text-line">/</span>
          <span className={lang === "id" ? "text-ink" : ""}>ID</span>
        </button>
      )}
      <button type="button" onClick={() => setTheme(NEXT[theme])} className={iconBtn} aria-label={`Theme: ${theme}. Switch to ${NEXT[theme]}`} title={`Theme: ${theme}`}>
        <ThemeIcon size={18} aria-hidden />
      </button>
      {/* Motion switch: menyalakan transisi Blinds + animasi halaman, menimpa setelan OS */}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setMotion(!on)}
        className="group flex h-9 items-center gap-2 rounded-ui px-2 text-xs text-muted transition-colors hover:bg-line/60 hover:text-ink"
        title={on ? t.nav.motionOn : t.nav.motionOff}
      >
        <span className="hidden font-mono lg:inline">motion</span>
        <span className={`relative h-4 w-7 rounded-full transition-colors ${on ? "bg-accent" : "bg-line"}`}>
          <span className={`absolute left-0 top-0.5 size-3 rounded-full bg-bg transition-transform duration-300 ease-out-expo ${on ? "translate-x-3.5" : "translate-x-0.5"}`} />
        </span>
        <span className="sr-only">{on ? t.nav.motionOn : t.nav.motionOff}</span>
      </button>
    </div>
  );
}
