// Transisi antar-halaman "Blinds": setengah pertama menutup layar, lalu router pindah, lalu setengah kedua membuka.
// PageTransition.tsx mendaftarkan pemutarnya di sini; Nav, tombol hero, dan `cd` di terminal memanggil navigate().
// Back/forward browser tidak lewat sini: yang main hanya animasi masuk halaman (.page di template).
import { motionReduced } from "@/components/Prefs";

export const PAGE_ORDER = ["/", "/about", "/work", "/radar", "/contact"];

type Player = { cover: (dir: 1 | -1) => Promise<void>; reveal: () => Promise<void> };
let player: Player | null = null;
let pending = false;
let busy = false;

const norm = (p: string) => p.replace(/\/$/, "") || "/";

export function register(p: Player) {
  player = p;
  return () => { player = null; };
}

export async function navigate(href: string, push: (href: string) => void) {
  const from = norm(location.pathname), to = norm(href);
  if (from === to || busy) return;
  if (!player || motionReduced()) return push(href);
  busy = true;
  const dir = PAGE_ORDER.indexOf(to) >= PAGE_ORDER.indexOf(from) ? 1 : -1;
  await player.cover(dir);
  pending = true;
  push(href);
  setTimeout(afterRoute, 1500); // pengaman: kalau rute gagal berganti, layar tetap terbuka lagi
}

/** Dipanggil PageTransition saat pathname berubah. Aman dipanggil berkali-kali. */
export async function afterRoute() {
  if (!pending || !player) return;
  pending = false;
  await player.reveal();
  busy = false;
}
