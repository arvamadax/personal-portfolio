"use client";
// Gerbang PIN untuk /planner. PIN TIDAK ada di kode ini: halaman hanya menulis cookie pf_pin,
// lalu nginx yang mencocokkan (deploy/nginx-portfolio.conf, map $cookie_pf_pin). Salah tebak
// dibatasi nginx 10/menit per IP. Cloudflare Access berdiri di depan halaman ini juga.
import { useState } from "react";
import { LockKey } from "@phosphor-icons/react";
import { btn } from "@/lib/ui";

const tulis = (v: string) => { document.cookie = `pf_pin=${v}; Max-Age=${v ? 2592000 : 0}; Path=/; SameSite=Strict; Secure`; };

export function Masuk() {
  const [pin, setPin] = useState("");
  const [pesan, setPesan] = useState("");
  const [sibuk, setSibuk] = useState(false);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!pin) return;
    setSibuk(true);
    tulis(pin);
    try {
      const r = await fetch("/api/status", { cache: "no-store", redirect: "manual" });
      if (r.status === 401) { tulis(""); setPesan("PIN salah."); }
      else if (r.status === 429) { tulis(""); setPesan("Terlalu banyak percobaan. Tunggu satu menit."); }
      else return location.replace("/planner"); // 200, atau 502 (PIN benar tapi API mati): planner yang menjelaskan
    } catch {
      setPesan("Server tidak bisa dihubungi.");
    }
    setPin("");
    setSibuk(false);
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form onSubmit={kirim} className="page w-full max-w-xs space-y-5">
        <LockKey size={28} className="text-muted" aria-hidden />
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Planner</h1>
          <p className="mt-1 text-sm text-muted">Masukkan PIN untuk membuka.</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="pin" className="text-sm">PIN</label>
          <input id="pin" type="password" inputMode="numeric" autoComplete="current-password" autoFocus value={pin}
            onChange={(e) => { setPin(e.target.value); setPesan(""); }}
            aria-invalid={!!pesan} aria-describedby="pin-pesan"
            className="w-full rounded-ui border border-line bg-surface px-3 py-2.5 font-mono tracking-[0.3em]" />
          <p id="pin-pesan" role="alert" className="min-h-5 text-sm text-[var(--danger)]">{pesan}</p>
        </div>
        <button type="submit" disabled={sibuk || !pin} className={`${btn.primary} w-full justify-center`}>Buka</button>
      </form>
    </main>
  );
}
