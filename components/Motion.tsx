"use client";
// Dua efek dari motion.js web-faya, versi kalem. Keduanya menulis style langsung lewat DOM
// (bukan state React) supaya gerakan pointer tidak memicu render ulang.
import { useRef } from "react";
import { motionReduced } from "./Prefs";

const calm = () => motionReduced() || !matchMedia("(pointer: fine)").matches;

/** Tombol sedikit tertarik ke arah kursor (maks 6px). */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || calm()) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className="inline-block transition-transform duration-300 ease-out-expo">
      {children}
    </span>
  );
}

/** Mengisi --mx/--my di kartu .spot yang sedang di-hover (satu listener untuk seluruh grid). */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const move = (e: React.PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spot");
    if (!card || calm()) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div onPointerMove={move} className={className}>{children}</div>;
}
