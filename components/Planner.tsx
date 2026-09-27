"use client";
// Planner pribadi (/planner). Data dari api.js instance kedua (lihat deploy/api-planner.service):
// jadwal (kv/jadwal), agenda gabungan BRONE + Google Calendar, dan Daftar Tugas tersinkron.
// Halaman ini tidak menjaga dirinya sendiri: nginx (PIN) + Cloudflare Access yang menjaga /planner dan /api.
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowClockwise, ArrowSquareOut, CheckSquare, Square, Lock, Plus, Trash, UploadSimple, Warning, X } from "@phosphor-icons/react";
import { Prefs } from "./Prefs";
import { btn, i } from "@/lib/ui";
import {
  api, parseSiam, HARI, SUMBER, relatif, tgl, sedang, urutJam, sisaMenit,
  type Agenda, type Jadwal, type Kelas, type Status, type Tugas,
} from "@/lib/planner";

type Load<T> = { kind: "loading" } | { kind: "error"; msg: string } | { kind: "ok"; data: T };
const HARI_KULIAH = HARI.slice(1); // Senin..Sabtu

const card = "rise flex min-h-0 min-w-0 flex-col rounded-ui border border-line bg-surface";
const head = "flex items-center justify-between gap-3 border-b border-line px-4 py-3";
const title = "text-sm font-medium";

function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4" aria-hidden>
      {Array.from({ length: rows }, (_, n) => <div key={n} className="h-4 animate-pulse rounded-ui bg-line" style={{ width: `${85 - n * 12}%` }} />)}
    </div>
  );
}

export function Planner() {
  const [now, setNow] = useState(() => new Date());
  const [status, setStatus] = useState<Load<Status>>({ kind: "loading" });
  const [jadwal, setJadwal] = useState<Kelas[] | null>(null);
  const [agenda, setAgenda] = useState<Load<Agenda>>({ kind: "loading" });
  const [tugas, setTugas] = useState<Load<Tugas[]>>({ kind: "loading" });
  const [hari, setHari] = useState(() => HARI_KULIAH.includes(HARI[new Date().getDay()]) ? HARI[new Date().getDay()] : "Senin");
  const [baru, setBaru] = useState({ text: "", due: "" });
  const [cek, setCek] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30_000); return () => clearInterval(t); }, []);

  const muatAgenda = useCallback((segar = false) => {
    setCek(true);
    api<Agenda>(`agenda${segar ? "?segar=1" : ""}`)
      .then((d) => setAgenda({ kind: "ok", data: d }))
      .catch((e) => setAgenda({ kind: "error", msg: e.message }))
      .finally(() => setCek(false));
    api<{ tugas: Tugas[] }>("tugas").then((d) => setTugas({ kind: "ok", data: d.tugas })).catch((e) => setTugas({ kind: "error", msg: e.message }));
  }, []);

  useEffect(() => {
    api<Status>("status").then((d) => setStatus({ kind: "ok", data: d })).catch((e) => setStatus({ kind: "error", msg: e.message }));
    api<Jadwal | null>("kv/jadwal").then((j) => setJadwal(j?.list ?? [])).catch(() => setJadwal([]));
    muatAgenda();
    if (location.hash === "#jadwal") document.getElementById("jadwal")?.scrollIntoView();
  }, [muatAgenda]);

  // ---- tugas: ubah lokal dulu (terasa instan), lalu kirim; server mengembalikan daftar gabungan
  async function ubahTugas(t: Tugas) {
    const u = { ...t, u: Date.now() };
    setTugas((s) => s.kind === "ok" ? { kind: "ok", data: u.hapus ? s.data.filter((x) => x.id !== u.id) : [...s.data.filter((x) => x.id !== u.id), u] } : s);
    try {
      const d = await api<{ tugas: Tugas[] }>("tugas", { method: "PUT", body: { ubah: [u] } });
      setTugas({ kind: "ok", data: d.tugas });
    } catch {
      // tetap tampil di layar; belum tersimpan di server (muat ulang akan menampilkan versi server)
    }
  }
  function tambah(e: React.FormEvent) {
    e.preventDefault();
    if (!baru.text.trim()) return;
    ubahTugas({ id: "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: baru.text.trim(), status: "todo", u: 0, ...(baru.due ? { due: new Date(baru.due).toISOString(), dueManual: true } : {}) });
    setBaru({ text: "", due: "" });
  }

  const hariIni = useMemo(() => (jadwal ?? []).filter((c) => c.day === HARI[now.getDay()]).sort(urutJam), [jadwal, now]);
  const kini = hariIni.find((c) => sedang(c, now));
  const berikut = hariIni.find((c) => sisaMenit(c.start, now) > 0);

  const deadline = useMemo(() => {
    if (agenda.kind !== "ok") return [];
    const t = now.getTime();
    return agenda.data.deadline
      .filter((x) => x.date && x.auto !== "selesai" && x.auto !== "tanpa" && new Date(x.date).getTime() > t - 864e5 && new Date(x.date).getTime() < t + 30 * 864e5)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
  }, [agenda, now]);

  const minggu = useMemo(() => {
    const hari0 = new Date(now); hari0.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, n) => {
      const d = new Date(hari0.getTime() + n * 864e5);
      const acara = agenda.kind === "ok" ? agenda.data.acara.filter((x) => x.date && new Date(x.date).toDateString() === d.toDateString()) : [];
      const kelas = (jadwal ?? []).filter((c) => c.day === HARI[d.getDay()]).sort(urutJam);
      return { d, acara, kelas };
    });
  }, [agenda, jadwal, now]);

  const belum = tugas.kind === "ok" ? tugas.data.filter((t) => t.status !== "done").sort((a, b) => (a.due || "9").localeCompare(b.due || "9")) : [];
  const selesai = tugas.kind === "ok" ? tugas.data.filter((t) => t.status === "done") : [];
  const galat = agenda.kind === "ok" ? Object.values(agenda.data.galat) : [];
  const offline = status.kind === "error";

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm">planner</span>
            <span className="hidden text-sm text-muted sm:inline">{now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => muatAgenda(true)} disabled={cek} className="inline-flex h-9 items-center gap-2 rounded-ui px-3 text-sm text-muted hover:bg-line/60 hover:text-ink disabled:opacity-50">
              <ArrowClockwise size={16} className={cek ? "animate-spin" : ""} aria-hidden /> <span className="hidden sm:inline">Cek sekarang</span>
            </button>
            <Prefs bahasa={false} />
            <Link href="/" className="inline-flex h-9 items-center gap-1.5 rounded-ui px-3 text-sm text-muted hover:bg-line/60 hover:text-ink">
              Portofolio <ArrowSquareOut size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <main className="page mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 py-6 md:px-8">
        {offline && (
          <div className="rise mb-6 flex items-start gap-3 rounded-ui border border-line bg-surface p-4 text-sm">
            <Warning size={18} className="mt-0.5 shrink-0 text-[var(--danger)]" aria-hidden />
            <p>API planner belum tersambung ({status.msg}). Jadwal, deadline, dan tugas butuh <code className="font-mono">api-planner</code> di server. Lihat README bagian Planner.</p>
          </div>
        )}
        {galat.length > 0 && (
          <p className="rise mb-4 flex items-center gap-2 text-xs text-muted"><Warning size={14} aria-hidden /> {galat.join(" · ")}</p>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* ---- Hari ini + jadwal */}
          <section id="jadwal" className={card} style={i(0)} aria-labelledby="h-jadwal">
            <div className={head}>
              <h2 id="h-jadwal" className={title}>Jadwal kuliah</h2>
              <button type="button" onClick={() => dialog.current?.showModal()} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink">
                <UploadSimple size={14} aria-hidden /> Impor SIAM
              </button>
            </div>
            <div className="border-b border-line p-4">
              {jadwal === null ? <Skeleton rows={2} /> : kini ? (
                <>
                  <p className="text-xs text-accent">Sedang berlangsung</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{kini.name}</p>
                  <p className="text-sm text-muted">{kini.room} · selesai {kini.end}</p>
                </>
              ) : berikut ? (
                <>
                  <p className="text-xs text-muted">Berikutnya, {sisaMenit(berikut.start, now) < 60 ? `${sisaMenit(berikut.start, now)} menit lagi` : `jam ${berikut.start}`}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{berikut.name}</p>
                  <p className="text-sm text-muted">{berikut.room} · {berikut.dosen}</p>
                </>
              ) : (
                <p className="text-sm text-muted">{jadwal.length ? "Tidak ada kelas lagi hari ini." : "Jadwal masih kosong. Tempel tabel dari SIAM lewat Impor SIAM."}</p>
              )}
            </div>
            <div role="tablist" aria-label="Hari" className="flex gap-1 border-b border-line px-3 py-2">
              {HARI_KULIAH.map((h) => (
                <button key={h} role="tab" aria-selected={h === hari} onClick={() => setHari(h)}
                  className={`h-8 flex-1 rounded-ui text-xs transition-colors ${h === hari ? "bg-ink text-bg" : "text-muted hover:bg-line/60"}`}>
                  {h.slice(0, 3)}
                </button>
              ))}
            </div>
            <ul className="flex-1 divide-y divide-line overflow-auto">
              {(jadwal ?? []).filter((c) => c.day === hari).sort(urutJam).map((c) => (
                <li key={c.kode + c.start} className={`grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3 text-sm ${sedang(c, now) ? "bg-accent/10" : ""}`}>
                  <span className="font-mono text-xs text-muted">{c.start}<br />{c.end}</span>
                  <span>
                    <span className="font-medium">{c.name}</span>
                    <span className="block text-xs text-muted">{c.room} · kelas {c.kelas} · {c.dosen}</span>
                  </span>
                </li>
              ))}
              {jadwal && !jadwal.some((c) => c.day === hari) && <li className="px-4 py-6 text-sm text-muted">Tidak ada kelas hari {hari}.</li>}
            </ul>
          </section>

          {/* ---- Deadline */}
          <section className={card} style={i(1)} aria-labelledby="h-dl">
            <div className={head}>
              <h2 id="h-dl" className={title}>Deadline</h2>
              <span className="text-xs text-muted">
                {status.kind === "ok" ? [status.data.fitur.brone && "BRONE", status.data.fitur.google && "Google Calendar"].filter(Boolean).join(" + ") || "belum ada sumber" : ""}
              </span>
            </div>
            {agenda.kind === "loading" ? <Skeleton /> : agenda.kind === "error" ? (
              <p className="p-4 text-sm text-muted">Deadline tidak bisa dimuat ({agenda.msg}).</p>
            ) : deadline.length === 0 ? (
              <p className="p-4 text-sm text-muted">Tidak ada deadline 30 hari ke depan.</p>
            ) : (
              <ul className="flex-1 divide-y divide-line overflow-auto">
                {deadline.map((x) => {
                  const ms = new Date(x.date!).getTime() - now.getTime();
                  const dekat = ms < 2 * 864e5;
                  return (
                    <li key={x.key} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        {x.url ? <a href={x.url} target="_blank" rel="noopener" className="text-sm font-medium hover:text-accent">{x.title}</a> : <span className="text-sm font-medium">{x.title}</span>}
                        <span className={`shrink-0 font-mono text-xs ${ms < 0 || dekat ? "text-[var(--danger)]" : "text-muted"}`}>{relatif(x.date!, now.getTime())}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {SUMBER[x.src] || (status.kind === "ok" && status.data.akun.find((a) => a.id === x.src)?.label) || x.src}
                        {x.kursus ? ` · ${x.kursus.split("|").pop()}` : ""} · {tgl(x.date!, x.allDay)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* ---- Daftar tugas */}
          <section className={card} style={i(2)} aria-labelledby="h-tugas">
            <div className={head}>
              <h2 id="h-tugas" className={title}>Tugas</h2>
              <span className="text-xs text-muted">{belum.length} belum · {selesai.length} selesai</span>
            </div>
            <form onSubmit={tambah} className="flex gap-2 border-b border-line p-3">
              <label htmlFor="t-baru" className="sr-only">Tugas baru</label>
              <input id="t-baru" value={baru.text} onChange={(e) => setBaru({ ...baru, text: e.target.value })} placeholder="Tugas baru" maxLength={200}
                className="min-w-0 flex-1 rounded-ui border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted" />
              <label htmlFor="t-due" className="sr-only">Tenggat</label>
              <input id="t-due" type="datetime-local" value={baru.due} onChange={(e) => setBaru({ ...baru, due: e.target.value })}
                className="w-[9.5rem] rounded-ui border border-line bg-bg px-2 py-2 text-xs text-muted" />
              <button type="submit" className="grid size-9 place-items-center rounded-ui bg-ink text-bg hover:bg-accent hover:text-on-accent" aria-label="Tambah tugas">
                <Plus size={16} aria-hidden />
              </button>
            </form>
            {tugas.kind === "loading" ? <Skeleton /> : tugas.kind === "error" ? (
              <p className="p-4 text-sm text-muted">Tugas tidak bisa dimuat ({tugas.msg}).</p>
            ) : (
              <ul className="flex-1 divide-y divide-line overflow-auto">
                {belum.length === 0 && <li className="px-4 py-6 text-sm text-muted">Semua beres. Tugas dari BRONE masuk ke sini otomatis.</li>}
                {[...belum, ...selesai.slice(0, 5)].map((t) => (
                  <li key={t.id} className="group flex items-start gap-3 px-4 py-2.5">
                    {t.otomatis ? (
                      <span className="mt-0.5 text-muted" title="Status mengikuti sumbernya (dikumpulkan di BRONE/Classroom)"><Lock size={18} aria-label="Otomatis" /></span>
                    ) : (
                      <button type="button" onClick={() => ubahTugas({ ...t, status: t.status === "done" ? "todo" : "done", selesai: t.status === "done" ? undefined : Date.now() })}
                        className="mt-0.5 text-muted hover:text-ink" aria-label={t.status === "done" ? "Tandai belum" : "Tandai selesai"}>
                        {t.status === "done" ? <CheckSquare size={18} weight="fill" className="text-accent" /> : <Square size={18} />}
                      </button>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm ${t.status === "done" ? "text-muted line-through" : ""}`}>
                        {t.url ? <a href={t.url} target="_blank" rel="noopener" className="hover:text-accent">{t.text}</a> : t.text}
                      </span>
                      {(t.due || t.src) && (
                        <span className="text-xs text-muted">
                          {t.src ? `${SUMBER[t.src] || t.src}` : ""}{t.src && t.due ? " · " : ""}{t.due ? relatif(t.due, now.getTime()) : ""}
                        </span>
                      )}
                    </span>
                    {!t.otomatis && (
                      <button type="button" onClick={() => ubahTugas({ ...t, hapus: true })} className="text-muted opacity-0 transition-opacity hover:text-[var(--danger)] focus:opacity-100 group-hover:opacity-100" aria-label={`Hapus ${t.text}`}>
                        <Trash size={16} aria-hidden />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* ---- 7 hari ke depan */}
        <section className="rise mt-4 rounded-ui border border-line bg-surface" style={i(3)} aria-labelledby="h-minggu">
          <div className={head}><h2 id="h-minggu" className={title}>7 hari ke depan</h2></div>
          <div className="grid divide-y divide-line md:grid-cols-7 md:divide-x md:divide-y-0">
            {minggu.map(({ d, acara, kelas }, n) => (
              <div key={n} className="min-h-28 p-3">
                <p className={`text-xs ${n === 0 ? "font-medium text-accent" : "text-muted"}`}>{d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" })}</p>
                <ul className="mt-2 space-y-1.5 text-xs">
                  {kelas.map((c) => <li key={c.kode + c.start} className="truncate text-muted" title={c.name}><span className="font-mono">{c.start}</span> {c.short}</li>)}
                  {acara.map((x) => <li key={x.key} className="truncate border-l-2 border-accent pl-1.5" title={x.title}>{x.allDay ? "" : <span className="font-mono">{new Date(x.date!).toTimeString().slice(0, 5)} </span>}{x.title}</li>)}
                  {!kelas.length && !acara.length && <li className="text-muted">Kosong</li>}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ImporSiam dialog={dialog} lama={jadwal ?? []} onSimpan={(list) => {
        const j = { list, u: Date.now() };
        setJadwal(list);
        api("kv/jadwal", { method: "PUT", body: j }).catch(() => {});
      }} />
    </div>
  );
}

function ImporSiam({ dialog, lama, onSimpan }: { dialog: React.RefObject<HTMLDialogElement | null>; lama: Kelas[]; onSimpan: (l: Kelas[]) => void }) {
  const [txt, setTxt] = useState("");
  const hasil = txt.trim() ? parseSiam(txt, lama) : null;
  return (
    <dialog ref={dialog} className="pop m-auto w-[min(40rem,calc(100vw-2rem))] rounded-ui border border-line bg-surface p-0 text-ink backdrop:bg-ink/40" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
      <div className={head}>
        <h2 className={title}>Impor jadwal dari SIAM</h2>
        <button type="button" onClick={() => dialog.current?.close()} className="text-muted hover:text-ink" aria-label="Tutup"><X size={18} /></button>
      </div>
      <div className="space-y-3 p-4">
        <label htmlFor="siam" className="text-sm">Salin tabel jadwal dari SIAM (di laptop), mulai dari kolom Hari, lalu tempel di sini.</label>
        <textarea id="siam" value={txt} onChange={(e) => setTxt(e.target.value)} rows={8} className="w-full rounded-ui border border-line bg-bg p-3 font-mono text-xs" />
        {hasil && (
          <p className="text-sm text-muted">
            {hasil.list.length} kelas terbaca{hasil.gagal.length ? `, ${hasil.gagal.length} baris dilewati` : ""}.
          </p>
        )}
        {hasil && hasil.list.length > 0 && (
          <ul className="max-h-40 overflow-auto text-xs">
            {hasil.list.map((c) => <li key={c.kode + c.day + c.start} className="py-0.5"><span className="font-mono text-muted">{c.day.slice(0, 3)} {c.start}</span> {c.name} <span className="text-muted">({c.room})</span></li>)}
          </ul>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={() => dialog.current?.close()} className={btn.secondary}>Batal</button>
          <button type="button" disabled={!hasil?.list.length} className={btn.primary}
            onClick={() => { onSimpan(hasil!.list); setTxt(""); dialog.current?.close(); }}>
            Pakai jadwal ini
          </button>
        </div>
      </div>
    </dialog>
  );
}
