// Planner pribadi: tipe data api.js (web-faya/server/api.js, instance kedua) + pengurai tabel SIAM.

export type Kelas = { day: string; start: string; end: string; kode: string; name: string; short: string; kelas: string; dosen: string; room: string; lab?: boolean };
export type Jadwal = { list: Kelas[]; u: number };
export type Item = { key: string; title: string; date: string | null; end?: string; allDay?: boolean; src: string; akun?: string; kursus?: string; url?: string; auto?: string; lokasi?: string };
export type Agenda = { at: number; deadline: Item[]; acara: Item[]; galat: Record<string, string> };
export type Tugas = { id: string; text: string; status: "todo" | "doing" | "done"; due?: string; src?: string; otomatis?: boolean; auto?: string; kursus?: string; url?: string; u: number; selesai?: number; hapus?: boolean; dueManual?: boolean };
export type Status = { akun: { id: string; label: string; email: string }[]; fitur: { brone: boolean; google: boolean } };

export const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/** Panggil /api/… ; 401 = cookie PIN hilang → ke halaman masuk. */
export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const r = await fetch(`/api/${path}`, {
    method: init?.method || "GET",
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  if (r.status === 401) {
    location.href = "/masuk";
    throw new Error("belum masuk");
  }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// ---- SIAM (sama dengan web-faya/study-buddy/js/jadwal.js)
// Tabel yang disalin = sel dipisah tab, baris dipisah newline. Tiap baris diawali nama hari.
const HARI_SIAM = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'?at", "Sabtu"];
const ruang = (r: string) => r.split(/\s+-\s+/).pop()!.trim(); // "Gedung F FILKOM - F4.4" → F4.4
const dosen = (d: string) => d.split(",")[0].replace(/^((Prof|Dr|Ir|Drs|Dra|Hj?)\.?\s+)+/i, "").trim();
const singkat = (n: string) =>
  n.length <= 15 ? n : n.split(/\s+/).filter((w) => !/^(dan|&|di|ke|of|the)$/i.test(w)).map((w) => w[0].toUpperCase()).join("");

export function parseSiam(txt: string, lama: Kelas[] = []) {
  const re = new RegExp(`(^|[\\n\\t])[ ]*(${HARI_SIAM.join("|")})\\b`, "g");
  const awal: { i: number; day: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(txt))) awal.push({ i: m.index + m[1].length, day: m[2].replace("'", "") });
  const pendek = Object.fromEntries(lama.map((c) => [c.kode, c.short]));
  const list: Kelas[] = [], gagal: string[] = [];
  awal.forEach((x, k) => {
    const potong = txt.slice(x.i, k + 1 < awal.length ? awal[k + 1].i : undefined);
    const isi = potong.replace(/^\S+/, "");
    const jam = [...isi.matchAll(/(\d{1,2})[:.](\d{2})(?:[:.]\d{2})?/g)];
    const f = jam.length < 2 ? [] : isi.slice(jam[1].index! + jam[1][0].length).split(/\t|\n/).map((s) => s.trim()).filter((s) => s && s !== "-" && !/^pengumuman$/i.test(s));
    const mk = (f[0] || "").match(/^\(([A-Z]{2,5}\d{3,6})\)\s*(.+)$/);
    if (!mk || f.length < 4) {
      if (potong.trim()) gagal.push(potong.trim().replace(/\s+/g, " ").slice(0, 70));
      return;
    }
    const hm = (j: RegExpMatchArray) => `${j[1].padStart(2, "0")}:${j[2]}`;
    list.push({
      day: x.day, start: hm(jam[0]), end: hm(jam[1]), kode: mk[1], name: mk[2].trim(),
      short: pendek[mk[1]] || singkat(mk[2].trim()), kelas: f[1], dosen: dosen(f[2]), room: ruang(f[3]),
      ...(/\blab\b/i.test(f[3]) ? { lab: true } : {}),
    });
  });
  return { list, gagal };
}

// ---- waktu
const menit = (hm: string) => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
export const menitSekarang = (d: Date) => d.getHours() * 60 + d.getMinutes();
export const sedang = (c: Kelas, d: Date) => HARI[d.getDay()] === c.day && menit(c.start) <= menitSekarang(d) && menitSekarang(d) < menit(c.end);
export const urutJam = (a: Kelas, b: Kelas) => menit(a.start) - menit(b.start);
export const sisaMenit = (hm: string, d: Date) => menit(hm) - menitSekarang(d);

export function relatif(iso: string, now = Date.now()) {
  const ms = new Date(iso).getTime() - now;
  const jam = Math.round(ms / 36e5);
  if (ms < 0) return jam > -24 ? `lewat ${-jam} jam` : `lewat ${Math.round(-ms / 864e5)} hari`;
  if (jam < 1) return `${Math.max(1, Math.round(ms / 6e4))} menit lagi`;
  if (jam < 24) return `${jam} jam lagi`;
  const hari = Math.round(ms / 864e5);
  return hari === 1 ? "besok" : `${hari} hari lagi`;
}

export const tgl = (iso: string, allDay?: boolean) =>
  new Date(iso).toLocaleString("id-ID", { weekday: "short", day: "numeric", month: "short", ...(allDay ? {} : { hour: "2-digit", minute: "2-digit" }) });

export const SUMBER: Record<string, string> = { brone: "BRONE", classroom: "Classroom", manual: "Manual" };
