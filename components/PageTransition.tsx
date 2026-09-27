"use client";
// Overlay "Blinds": bilah vertikal grafit 4 tingkat (--blind-0..3 di motion.css) turun berurutan
// searah tab, halaman diganti saat tertutup, lalu bilah terangkat ke bawah. Web Animations API, tanpa pustaka.
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { afterRoute, register } from "@/lib/transition";

const EASE = "cubic-bezier(.7,0,.3,1)";
const DUR = 380;
const STEP = 55;

export function PageTransition() {
  const box = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    let urutan: HTMLElement[] = [];
    const bilah = (dir: 1 | -1) => {
      const el = box.current!;
      const n = matchMedia("(max-width: 639px)").matches ? 4 : 6;
      el.replaceChildren();
      urutan = Array.from({ length: n }, (_, k) => {
        const b = document.createElement("div");
        b.style.cssText = `position:absolute;top:0;bottom:0;left:${(k * 100) / n}%;width:${100 / n + 0.2}%;background:var(--blind-${k % 4});transform:scaleY(0);transform-origin:top`;
        el.append(b);
        return b;
      });
      if (dir < 0) urutan.reverse();
    };
    // Promise.race: di tab latar belakang animasi bisa berhenti dan .finished tak pernah selesai → jangan sampai navigasi macet.
    const jalan = (frames: Keyframe[]) =>
      Promise.race([
        Promise.all(urutan.map((b, k) => b.animate(frames, { duration: DUR, delay: k * STEP, easing: EASE, fill: "forwards" }).finished)),
        new Promise((r) => setTimeout(r, DUR + urutan.length * STEP + 150)),
      ]);

    return register({
      async cover(dir) {
        bilah(dir);
        box.current!.style.pointerEvents = "auto";
        await jalan([{ transform: "scaleY(0)", transformOrigin: "top" }, { transform: "scaleY(1)", transformOrigin: "top" }]);
      },
      async reveal() {
        await jalan([{ transform: "scaleY(1)", transformOrigin: "bottom" }, { transform: "scaleY(0)", transformOrigin: "bottom" }]);
        box.current?.replaceChildren();
        if (box.current) box.current.style.pointerEvents = "none";
      },
    });
  }, []);

  useEffect(() => { afterRoute(); }, [path]);

  return <div ref={box} aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-30 overflow-hidden" />;
}
