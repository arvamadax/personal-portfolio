"use client";
// Arsip 002: presentasi Kewarganegaraan "Menagih Janji Negara". Terdaftar di /archive.
// ponytail: port apa adanya dari HTML statis (markup + CSS asli, logika <script> dipindah ke efek), bukan ditulis ulang
// ke JSX: desainnya milik presentasi sendiri, bukan tema situs. Edit isi di components/mjn/.
import { useEffect, useRef } from "react";
import { INFO } from "./mjn/info";
import { MARKUP } from "./mjn/markup";
import "./mjn/deck.css";

const PH = [
  { id: "s1", name: "#ReformasiDikorupsi", period: "Sep 2019", cat: "voice", bg: "#1E1E1E", fg: "#FFFFFF", bd: "#1E1E1E", font: "900 15px var(--f-montserrat), sans-serif", fact: "Menolak revisi UU KPK dan RKUHP; revisi UU KPK tetap disahkan." },
  { id: "s2", name: "Penolakan UU Cipta Kerja", period: "2020–2021", cat: "voice", bg: "#3D2B31", fg: "#E3A83B", bd: "#3D2B31", font: "700 17px var(--f-fira), sans-serif", fact: "Disahkan 5 Okt 2020; MK menyatakan inkonstitusional bersyarat pada 25 Nov 2021, tenggat perbaikan 2 tahun." },
  { id: "s3", name: "#PeringatanDarurat", period: "Agu 2024", cat: "voice", bg: "#0C1A94", fg: "#EDE9D8", bd: "#0C1A94", font: "400 22px var(--f-vt323), monospace", fact: "Menyusul putusan MK No. 60 dan 70/PUU-XXII/2024; aksi 22 Agu 2024; pengesahan revisi UU Pilkada dibatalkan." },
  { id: "s4", name: "#IndonesiaGelap", period: "Feb 2025", cat: "voice", bg: "#0E0E0E", fg: "#F1F1F1", bd: "#0E0E0E", font: "900 15px var(--f-montserrat), sans-serif", fact: "BEM SI menolak Inpres 1/2025 (pemangkasan Rp306,69 triliun), menuntut transparansi MBG dan tunjangan kinerja dosen serta tendik." },
  { id: "s5", name: "Penolakan revisi UU TNI", period: "Mar 2025", cat: "voice", bg: "#3F4A2D", fg: "#E8C14A", bd: "#3F4A2D", font: "800 17px var(--f-barlow), sans-serif", fact: "Disahkan 20 Mar 2025 di tengah kekhawatiran dwifungsi; aksi “piknik melawan”." },
  { id: "s6", name: "17+8 Tuntutan Rakyat", period: "Agu–Sep 2025", cat: "voice", bg: "#E288B6", fg: "#075A2B", bd: "#E288B6", font: "400 17px var(--f-archivo-black), sans-serif", fact: "17 tuntutan bertenggat 5 Sep 2025 dan 8 tuntutan bertenggat 31 Agu 2026, ditujukan ke 6 pihak. Hingga tenggat, tuntutan pertama belum dipenuhi (menurut pengusung)." },
  { id: "s7", name: "#KaburAjaDulu", period: "Awal 2025", cat: "exit", bg: "#1C1C1C", fg: "#FFFFFF", bd: "#1C1C1C", font: "800 17px var(--f-poppins), sans-serif", fact: "67% orang Indonesia berminat bekerja di luar negeri (JobStreet by SEEK & BCG, data 2023). Ditanggapi sejumlah pejabat, dari introspeksi hingga sindiran. Dijamin Pasal 28E ayat (1)." },
];

// people "leaving" the red map
const FLYERS = [
  [40, 40, 8, -38, -40, 8, 0], [45, 45, 6, 44, -34, 9, 1.2], [36, 50, 10, -46, 20, 7.5, 2.1],
  [55, 42, 7, 40, 30, 8.5, 0.6], [80, 40, 9, 30, -45, 10, 3], [20, 30, 6, -30, -42, 9, 4.2],
  [60, 34, 8, 20, -50, 7, 2.8], [85, 44, 6, 26, 38, 8, 5], [30, 62, 7, -40, 36, 9.5, 1.8],
  [50, 64, 10, 10, 46, 8, 3.6], [70, 50, 7, 48, 8, 7.5, 4.8], [12, 36, 8, -26, 30, 10, 0.3],
].map(([x, y, s, dx, dy, d, delay], i) => ({ x, y, s, dx, dy, d, delay, c: i % 3 === 0 ? "#FFFFFF" : "#E0303A", r: i % 2 ? "0" : "50%" }));

// transcribed from the 17+8 checklist poster (IMG_4274); bold = emphasis on the poster
const T17 = [
  "<b>Bentuk tim investigasi independen</b> kasus Affan Kurniawan, Umar Amarudin, dan korban kekerasan aparat saat demonstrasi 28–30 Agustus",
  "<b>Hentikan keterlibatan TNI dalam pengamanan sipil</b>; kembalikan TNI ke barak",
  "<b>Bebaskan seluruh demonstran</b> yang ditahan; pastikan tidak ada kriminalisasi",
  "<b>Tangkap, adili, dan proses hukum secara transparan</b> anggota dan komandan pelaku kekerasan",
  "<b>Hentikan kekerasan oleh kepolisian</b> dan taati SOP pengendalian massa",
  "<b>Bekukan kenaikan gaji/tunjangan DPR</b> dan <b>batalkan fasilitas baru</b>",
  "Publikasikan <b>transparansi anggaran</b> DPR secara proaktif dan berkala",
  "<b>Selidiki kepemilikan harta</b> anggota DPR yang bermasalah oleh KPK",
  "Badan Kehormatan DPR <b>periksa anggota yang melecehkan aspirasi rakyat</b>",
  "<b>Partai pecat atau jatuhkan sanksi tegas</b> kepada kader yang tidak etis",
  "<b>Partai umumkan komitmen berpihak pada rakyat</b> di tengah krisis",
  "<b>Anggota DPR terlibat dialog publik</b> bersama mahasiswa dan masyarakat sipil",
  "<b>Tegakkan disiplin internal</b> agar TNI tidak mengambil alih fungsi Polri",
  "Komitmen publik TNI <b>tidak memasuki ruang sipil</b> selama krisis demokrasi",
  "Pastikan <b>upah layak</b> untuk seluruh angkatan kerja (guru, nakes, buruh, mitra ojol)",
  "Langkah darurat <b>mencegah PHK massal</b> dan <b>melindungi buruh kontrak</b>",
  "Buka <b>dialog dengan serikat buruh</b> soal upah minimum dan <i>outsourcing</i>",
];
const T8 = [
  "<b>Bersihkan dan reformasi DPR</b> besar-besaran",
  "<b>Reformasi partai politik</b> dan kuatkan pengawasan eksekutif",
  "Susun rencana <b>reformasi perpajakan</b> yang lebih adil",
  "Sahkan dan tegakkan <b>UU Perampasan Aset Koruptor</b>; perkuat independensi KPK dan UU Tipikor",
  "<b>Reformasi kepolisian</b> agar profesional dan humanis",
  "<b>TNI kembali ke barak</b>, tanpa pengecualian",
  "<b>Perkuat Komnas HAM</b> dan lembaga pengawas independen",
  "Tinjau ulang <b>kebijakan sektor ekonomi dan ketenagakerjaan</b>",
];

export function MenagihJanjiNegara({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const $ = (id: string) => root.querySelector<HTMLElement>(`#${id}`)!;
    const SC = [...root.querySelectorAll<HTMLElement>("main>section")];
    const off: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, type: K, fn: (e: WindowEventMap[K]) => void, opt?: AddEventListenerOptions) => {
      t.addEventListener(type, fn as EventListener, opt);
      off.push(() => t.removeEventListener(type, fn as EventListener, opt));
    };
    let alive = true;
    // motion always on (presenter's choice): override motion.css's reduced-motion kill switch while the deck is open
    const html = document.documentElement, prevMotion = html.dataset.motion;
    html.dataset.motion = "full";

    // waterfall reveal: each item waits its turn after the panel lands
    const items = (list: string[], start: number) => list.map((t, i) => `<li class="a" style="--d:${(start + i * 0.05).toFixed(2)}s"><span>${t}</span></li>`).join("");
    $("t17").innerHTML = items(T17, 1.0);
    $("t8").innerHTML = items(T8, 1.1);

    // click-to-explain: every [data-info] opens the shared #info card
    const info = $("info");
    const openInfo = (key: string) => {
      const d = INFO[key];
      if (!d) return;
      $("infoKind").textContent = d.k;
      $("infoTitle").textContent = d.t;
      $("infoBody").innerHTML = d.b; // trusted: authored in mjn/info.ts
      $("infoSrc").textContent = "Sumber: " + d.s;
      info.scrollTop = 0;
      if (!info.matches(":popover-open")) info.showPopover();
    };
    root.querySelectorAll<HTMLElement>("[data-info]").forEach((el) => {
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      el.setAttribute("aria-haspopup", "dialog");
    });
    on(root, "click", (e) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-info]");
      if (t) { e.stopPropagation(); openInfo(t.dataset.info!); }
    });
    on(root, "keydown", (e) => {
      const t = e.target as HTMLElement;
      if (e.key === "Enter" && t.matches("[data-info]")) { e.preventDefault(); openInfo(t.dataset.info!); }
    });

    // 17+8: one scene, two steps — poster, then the checklist
    const s6 = $("s6");
    const step178 = (v: boolean) => {
      s6.classList.toggle("step2", v);
      s6.querySelector(".list-layer")!.setAttribute("aria-hidden", String(!v));
    };
    on($("p178"), "click", () => step178(true));
    const jump = (id: string) => $(id).scrollIntoView({ behavior: "smooth" });

    $("flyers").innerHTML = FLYERS.map((p) =>
      `<div style="position:absolute;left:${p.x}%;top:${p.y}%;width:${p.s}px;height:${p.s}px;background:${p.c};border-radius:${p.r};--dx:${p.dx}vw;--dy:${p.dy}vh;animation:flyOut ${p.d}s cubic-bezier(.3,.1,.6,1) ${p.delay}s infinite"></div>`
    ).join("");

    let active = 0;
    const measure = () => {
      const mid = innerHeight * 0.5;
      SC.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) active = i; });
    };
    let raf = 0;
    on(window, "scroll", () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; measure(); }); }, { passive: true });

    // presentation: shrink any scene taller than the screen so each one fits like a slide
    // ponytail: floor at 0.7x — below that text gets unreadable on a projector; trim content instead
    const fit = () => {
      if (!alive) return;
      // fullscreen via F key or browser F11 -> hide scrollbar (toggled first: it changes the width)
      document.documentElement.classList.toggle("fs", !!document.fullscreenElement || (innerHeight >= screen.height - 1 && innerWidth >= screen.width - 1));
      SC.forEach((s) => {
        const st = s.style;
        st.zoom = "";
        st.minHeight = "100svh";
        if (innerWidth < 700) return; // phones: normal scrolling page
        // the 17+8 checklist layer is absolute, so measure its content too
        const layer = s.querySelector(".list-layer");
        let k = Math.max(0.7, innerHeight / Math.max(s.getBoundingClientRect().height, layer ? layer.scrollHeight : 0));
        // zoom re-flows vw/vh-sized content, so correct a couple of times until it really fits
        for (let n = 0; n < 3 && k < 1; n++) {
          st.zoom = k.toFixed(3);
          st.minHeight = "calc(100svh / " + k.toFixed(3) + ")";
          const over = s.getBoundingClientRect().height / innerHeight;
          if (over <= 1.002 || k <= 0.7) break;
          k = Math.max(0.7, k / over);
        }
      });
      measure();
    };
    fit();
    document.fonts.ready.then(fit);
    root.querySelectorAll("img").forEach((img) => { if (!img.complete) on(img, "load", fit, { once: true }); }); // posters change scene height once decoded
    on(window, "resize", fit);

    // presentation: play a scene's entrance once it reaches the middle band of the screen
    const seen = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); seen.unobserve(e.target); }
    }), { rootMargin: "-35% 0px -35% 0px" });
    SC.forEach((s) => seen.observe(s));

    // presentation: keyboard / clicker (clickers send PageDown/PageUp)
    const NEXT = ["ArrowDown", "ArrowRight", "PageDown", " "], PREV = ["ArrowUp", "ArrowLeft", "PageUp"];
    on(window, "keydown", (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (info.matches(":popover-open")) return; // card open: keys belong to it (Esc closes)
      const k = e.key;
      if (k === "f" || k === "F") {
        if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen();
        return;
      }
      const dir = NEXT.includes(k) ? 1 : PREV.includes(k) ? -1 : k === "Home" ? -99 : k === "End" ? 99 : 0;
      if (!dir || (k === " " && (e.target as HTMLElement).closest("button"))) return;
      e.preventDefault();
      // 17+8 has an inner step: → first reveals the checklist, ← first returns to the poster
      const cur = SC[active];
      if (cur === s6 && dir === 1 && !s6.classList.contains("step2")) return step178(true);
      if (cur === s6 && dir === -1 && s6.classList.contains("step2")) return step178(false);
      const next = SC[Math.max(0, Math.min(SC.length - 1, active + dir))];
      if (next === s6) step178(dir < 0); // arriving backwards lands on the checklist
      jump(next.id);
    });

    // 17+8 count-up
    const counter = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      counter.unobserve(e.target);
      const el = e.target as HTMLElement, end = Number(el.dataset.to) || 0, t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1 && alive) requestAnimationFrame(step);
      };
      el.textContent = "0";
      requestAnimationFrame(step);
    }), { threshold: 0.5 });
    root.querySelectorAll("[data-to]").forEach((el) => counter.observe(el));

    // voice / exit selector
    let sel = "s3";
    const chip = (p: (typeof PH)[number]) => {
      const pressed = p.id === sel;
      return `<button data-id="${p.id}" aria-pressed="${pressed}" style="text-align:left;cursor:pointer;background:${p.bg};color:${p.fg};border:2px solid ${p.bd};outline:3px solid ${pressed ? "#8E1B1B" : "transparent"};outline-offset:3px;padding:12px 14px;min-height:60px;display:flex;flex-direction:column;gap:6px;font:${p.font};transition:outline-color .25s ease">` +
        `<span style="line-height:1.15">${p.name}</span>` +
        `<span style="font:500 11px/1 var(--f-plex-mono),monospace;letter-spacing:.1em;text-transform:uppercase">${p.period}</span></button>`;
    };
    const renderSel = () => {
      $("voiceList").innerHTML = PH.filter((p) => p.cat === "voice").map(chip).join("");
      $("exitList").innerHTML = PH.filter((p) => p.cat === "exit").map(chip).join("");
      const s = PH.find((p) => p.id === sel)!;
      const box = $("sel").style;
      box.background = s.bg; box.color = s.fg; box.borderColor = s.bd;
      $("selMeta").textContent = s.cat + " · " + s.period;
      $("selName").style.font = s.font;
      $("selName").style.fontSize = "clamp(28px,3.4vw,48px)";
      $("selName").textContent = s.name;
      $("selFact").textContent = s.fact;
    };
    on($("vel"), "click", (e) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("button[data-id]");
      if (!b) return;
      sel = b.dataset.id!;
      renderSel();
      root.querySelector<HTMLElement>(`#vel [data-id="${sel}"]`)!.focus();
    });
    $("selGo").onclick = () => jump(sel);
    renderSel();

    return () => {
      alive = false;
      off.forEach((f) => f());
      seen.disconnect();
      counter.disconnect();
      cancelAnimationFrame(raf);
      html.classList.remove("fs");
      if (prevMotion) html.dataset.motion = prevMotion; else delete html.dataset.motion;
    };
  }, []);

  return <div ref={ref} className={`mjn ${className}`} dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
