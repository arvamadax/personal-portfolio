"use client";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { List, TerminalWindow } from "@phosphor-icons/react";
import { Prefs } from "./Prefs";
import { TLink } from "./TLink";
import { useLang } from "@/lib/i18n";
import { PAGE_ORDER } from "@/lib/transition";

const KEYS = ["home", "about", "work", "radar", "contact"] as const;
const openTerminal = () => window.dispatchEvent(new Event("terminal"));

export function Nav() {
  const { t } = useLang();
  const path = usePathname().replace(/\/$/, "") || "/";
  const bar = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const pages = PAGE_ORDER.map((href, k) => [t.nav[KEYS[k]], href] as const);

  // Indikator tab meluncur ke tab aktif (dari web-faya motion.js). Diukur dari DOM; ukur ulang saat bahasa berganti.
  useLayoutEffect(() => {
    const measure = () => {
      const a = bar.current?.querySelector<HTMLElement>('[aria-current="page"]');
      setInd(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [path, t]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <TLink href="/" className="font-mono text-sm tracking-tight">arva.mada</TLink>

        <nav aria-label="Pages" className="hidden md:block">
          <div ref={bar} className="relative flex items-center gap-1">
            {ind && (
              <span
                aria-hidden
                className="absolute top-0 h-full rounded-ui bg-line/70 transition-[transform,width] duration-500 ease-out-expo"
                style={{ width: ind.w, transform: `translateX(${ind.x}px)` }}
              />
            )}
            {pages.map(([label, href]) => (
              <TLink
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                className="relative rounded-ui px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {label}
              </TLink>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openTerminal}
            className="grid size-9 place-items-center rounded-ui text-muted transition-colors hover:bg-line/60 hover:text-ink"
            aria-label={t.nav.terminal}
            title={t.nav.terminal}
          >
            <TerminalWindow size={18} aria-hidden />
          </button>
          <Prefs />
          {/* <details> native sebagai menu HP; key={path} menutupnya setelah pindah halaman */}
          <details className="relative md:hidden" key={path}>
            <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-ui text-muted hover:text-ink [&::-webkit-details-marker]:hidden" aria-label={t.nav.menu}>
              <List size={20} aria-hidden />
            </summary>
            <nav aria-label="Pages" className="pop absolute right-0 mt-2 flex w-44 flex-col rounded-ui border border-line bg-surface p-1 shadow-lg shadow-ink/5">
              {pages.map(([label, href]) => (
                <TLink key={href} href={href} aria-current={path === href ? "page" : undefined} className="rounded-ui px-3 py-2 text-sm hover:bg-line/50 aria-[current=page]:font-medium">
                  {label}
                </TLink>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
