// Semua teks halaman publik di satu tempat, dalam dua bahasa. Ganti isi = ubah berkas ini saja.
// Nama proyek, stack, dan istilah teknis sengaja tidak diterjemahkan.

export type Lang = "en" | "id";

export const PROFILE = {
  email: "arvamadaj@gmail.com",
  whatsappNumber: "+62 813-8137-4072",
  github: "https://github.com/arvamadax",
  linkedin: "https://linkedin.com/in/arvamadax",
  whatsapp: "https://wa.me/6281381374072",
  instagram: "https://instagram.com/bambangdexplorer",
  cv: "/cv-arvamada.pdf",
};

// Bagian yang tidak diterjemahkan per proyek (urutan = urutan bento: [lebar][sempit] lalu [sempit][lebar]).
export const WORK_BASE = [
  { name: "NaviKarier", stack: ["Next.js", "TypeScript", "LLM"], code: "https://github.com/arvamadax/navi-karier", live: "https://navi-karier.vercel.app", image: { src: "/work/navi-karier.png", fit: "cover" as const }, wide: true },
  { name: "SIGAP UB", stack: ["React 19", "TypeScript", "Express"], code: "https://github.com/arvamadax/sigap-ub" },
  { name: "IoT Home Monitoring", stack: ["C++", "Data structures"], code: "https://github.com/arvamadax/uap-asd" },
  { name: "JelantahHub", stack: ["TypeScript", "Vercel"], code: "https://github.com/arvamadax/JelantahHub", live: "https://jelantah-hub.vercel.app", image: { src: "/work/jelantahhub-banner.png", fit: "contain" as const }, wide: true },
];

// Isi /archive, terbaru di atas. Satu tugas = satu blok; tempel blok baru di paling atas daftar.
// href "/..." = halaman di situs ini atau file di public/ (PDF, gambar); "https://..." = tautan luar, dibuka di tab baru.
// HTML interaktif TIDAK bisa langsung dimasukkan (ditolak di bawah dan di next.config.ts): minta Claude mem-porting-nya.
type Text = { title: string; summary: string };
export type ArchiveEntry = { href: string; date: `${number}-${number}`; tags: string[]; en: Text; id: Text };

export const ARCHIVE: ArchiveEntry[] = [
  {
    href: "/archive/lotka-volterra", date: "2026-09", tags: ["Lotka–Volterra", "RK4", "Canvas"],
    en: { title: "Rabbits and Wolves", summary: "Non-linear predator–prey model next to its linearisation, animated side by side from the same starting point." },
    id: { title: "Kelinci dan Serigala", summary: "Model mangsa-pemangsa non-linear berdampingan dengan linearisasinya, dianimasikan dari kondisi awal yang sama." },
  },
];

// Penjaga: file HTML lokal tersaji mentah (tanpa desain, tema, bahasa situs; CSP memblokir font/script luarnya).
// Error ini hanya terlihat oleh pemilik (npm run dev / build); build yang gagal tidak pernah ter-deploy.
for (const e of ARCHIVE)
  if (!/^https?:/.test(e.href) && /\.html?($|[?#])/i.test(e.href))
    throw new Error(`[archive] Ditolak: "${e.href}" adalah HTML mentah. HTML interaktif harus di-porting dulu supaya ikut desain, tema, dan bahasa situs. Buka Claude Code di folder ini lalu minta: "port <path file>.html ke /archive".`);

const en = {
  nav: { home: "Home", about: "About", work: "Work", radar: "Radar", contact: "Contact", terminal: "Open terminal (Ctrl + `)", menu: "Menu", motionOn: "Page transitions on. Click to turn off", motionOff: "Page transitions off. Click to turn on", lang: "Bahasa Indonesia" },
  hero: {
    title: "Hardware that talks to software.",
    sub: "Computer Engineering student at Universitas Brawijaya. I write C++ for microcontrollers and build the tools around them.",
    cv: "Download CV",
    work: "View work",
    contact: "Get in touch",
    photo: "Portrait of Arva Mada",
  },
  about: {
    title: "About",
    body: [
      "I study Computer Engineering at FILKOM, Universitas Brawijaya. My coursework runs from digital logic and circuit analysis to operating systems and microcontrollers.",
      "Outside class I build the software around that work: a sandboxed C++ compiler and practice platform for the Basic Programming lab, study tools that run on my own home server, and hackathon products with my team.",
      "I also write about technology and society (FOMO, ICT literacy, xenoglossophilia), model in Blender, and follow Formula 1 for the engineering and race strategy.",
    ],
    facts: [
      ["University", "Universitas Brawijaya, FILKOM"],
      ["Program", "Bachelor of Computer Engineering, 2025 to present"],
      ["Focus", "Embedded systems and networking"],
      ["Languages", "C++, C, Python, TypeScript"],
      ["Based in", "Malang, Indonesia"],
    ] as [string, string][],
    skills: "Skills",
    groups: [
      { group: "Programming", items: ["C++", "C", "Python", "TypeScript", "Data structures", "Algorithms"] },
      { group: "Embedded and hardware", items: ["AVR ATmega8535", "ESP32", "Arduino", "Digital logic", "Circuit analysis"] },
      { group: "Systems", items: ["Linux and Bash", "POSIX threads", "Docker", "nginx", "Cloudflare Tunnel", "Router configuration"] },
      { group: "Tools and design", items: ["Git", "GitHub Actions", "Next.js", "MLflow", "Blender"] },
    ],
  },
  work: {
    title: "Work",
    tabs: { projects: "Projects", github: "GitHub" },
    code: "Code",
    live: "Live",
    items: [
      { context: "Digdaya x Hackathon 2026, Bank Indonesia x OJK", summary: "AI skill-gap advisor for Indonesian job seekers. Upload a CV, pick a target role, and get a match score, the missing skills, and a learning roadmap.", alt: "NaviKarier landing page" },
      { context: "TEKRA 2026 Software Development Challenge", summary: "Psychological assessment and monitoring system that helps five campus counselors reach 75,000 students." },
      { context: "Algorithms and Data Structures final project", summary: "Home monitoring system written in C++ without the STL: five sensor types per house, rolled up into a monitoring score." },
      { context: "IYREF 2026", summary: "Circular eco-fintech platform. Used cooking oil is collected for biofuel and turned into points you can cash out.", alt: "JelantahHub logo" },
    ],
  },
  gh: {
    recent: "Recently pushed",
    activity: "Contributions",
    since: "since",
    total: "Contributions",
    active: "Active days",
    streak: "Longest streak",
    days: "days",
    perWeek: "Contributions per week",
    less: "Less",
    more: "More",
    showTable: "Show as table",
    hideTable: "Show as chart",
    month: "Month",
    repos: "Repositories",
    cols: { name: "Name", language: "Language", stars: "Stars", pushed: "Last push", created: "Created" },
    updated: "Updated",
    empty: "GitHub data is not available yet.",
    all: "All repositories",
    noContrib: "No contributions",
    contrib: (n: number) => `${n} contribution${n === 1 ? "" : "s"}`,
    week: "Week of",
  },
  radar: {
    title: "On my radar",
    sub: "What I am reading and watching, fetched fresh on every visit.",
    hn: "Hacker News front page",
    hnError: "Hacker News did not respond. Try again later.",
    epl: "Premier League",
    eplFull: "Full table",
    eplError: "Standings are unavailable right now.",
    team: "Team",
    played: "Played",
    gd: "Goal difference",
    pts: "Points",
    top: (n: number) => `Top ${n}. Positions in blue qualify for the Champions League.`,
  },
  contact: {
    title: "Get in touch",
    sub: "Open to internships, lab collaborations, and conversations about embedded systems or Formula 1.",
    body: [
      "I'm looking for internship and research opportunities in embedded systems, networking, and the software that supports them. I'm also happy to help on student projects or hackathon teams.",
      "Email is the most reliable way to reach me and suits anything formal. For a quick question, WhatsApp works too.",
    ],
    email: "Email me",
    based: "Based in Malang, Indonesia (WIB, UTC+7)",
    cv: "Download CV",
    channels: "Where to find me",
    copy: "Copy",
    copied: "Copied",
    open: "Open",
    use: {
      email: "Internships, collaboration, anything formal",
      whatsapp: "Quick questions",
      linkedin: "Education and experience",
      instagram: "Day to day",
      github: "Code and projects",
    },
  },
  footer: { social: "Profiles" },
  archive: {
    title: "Archive",
    sub: "Coursework and small experiments, kept in one place so the links don't get lost.",
    empty: "Nothing archived yet.",
    count: (n: number) => `${n} ${n === 1 ? "entry" : "entries"}`,
    external: "opens in a new tab",
  },
  // /archive/lotka-volterra
  lotka: {
    tag: "archive / 001",
    title: "Rabbits and Wolves",
    lede: "Rabbits breed and get eaten by wolves; wolves live off rabbits. Two models run side by side from the same starting point: the original non-linear equations and a version linearised around the equilibrium.",
    meta: [
      ["Model", "Lotka–Volterra"],
      ["Solver", "RK4, step ≤ 0.01 yr"],
      ["Equilibrium", "20 rabbits · 10 wolves"],
      ["Parameters", "a 1.0 · b 0.1 · c 1.5 · d 0.075"],
    ] as [string, string][],
    settings: "Simulation settings",
    delta: "Initial disturbance",
    duration: "Duration",
    yr: "yr",
    start: (pct: number, x: string, y: string) => `Rabbits start ${pct}% above equilibrium (${x}). Wolves start at ${y}.`,
    verdict: {
      ok: "Linearisation still holds: the two models nearly overlap.",
      warn: "Starting to drift: cycle time and shape already differ.",
      bad: "Far apart: the linear model no longer represents the real system.",
      neg: "Far apart: the linear model predicts negative populations.",
    },
    gapX: "Largest rabbit gap",
    gapY: "Largest wolf gap",
    period: "Cycle period, original model",
    low: "Lowest population, linear model",
    unit: "",
    years: "years",
    ofEq: (pct: string, eq: string, T: number) => `${pct}% of equilibrium (${eq}), over ${T} years`,
    periodSub: (lin: string, pct: string) => `Linear is always ${lin} years (${pct}% faster)`,
    lowSub: (x: string, y: string) => `Rabbits / wolves. Original model: ${x} / ${y}`,
    negative: "Negative: impossible",
    original: "Original model (non-linear)",
    linear: "Linear model",
    rabbits: "Rabbits",
    wolves: "Wolves",
    worldAria: (m: string) => `Animated rabbit and wolf populations, ${m}`,
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    speed: "Speed",
    scrub: "Simulation time",
    time: "Population over time",
    phase: "Trajectory (rabbits vs wolves)",
    timeAria: (s: string) => `${s} over time, original and linear model`,
    phaseAria: "Trajectory on the rabbit–wolf plane, original and linear model",
    timeNote: "Time axis in years. Hover a chart to read values; the left and right arrow keys work too.",
    phaseNote: "Horizontal axis: rabbits. Vertical axis: wolves. The scale follows the disturbance size.",
    cv: { negPop: "negative population", negArea: "negative region", eq: "equilibrium", start: "start", both: "Rabbits and wolves negative", x: "Rabbit population negative", y: "Wolf population negative" },
    tip: (t: string) => `t = ${t} years`,
    tipRows: ["rabbits, original", "rabbits, linear", "wolves, original", "wolves, linear"],
    explain: "What is being compared?",
    steps: [
      { title: "Original model (non-linear)", eq: "dx/dt =  a·x − b·x·y\ndy/dt = −c·y + d·x·y", body: ["x is rabbits, y is wolves. Rabbits breed (a·x) and get eaten (−b·x·y). Wolves die naturally (−c·y) and grow by eating (d·x·y). The x·y term, the product of the two populations, is the source of the non-linearity.", "Parameters per year: a = 1.0 · b = 0.1 · c = 1.5 · d = 0.075."] },
      { title: "Operating point", eq: "x* = c/d = 20 rabbits\ny* = a/b = 10 wolves", body: ["Populations stop changing when dx/dt = 0 and dy/dt = 0. At this point births and predation balance out. The linearisation is built around it."] },
      { title: "Linearisation", eq: "u = x − x*,  v = y − y*\nJ = [ 0     −2 ]\n    [ 0.75   0 ]\ndu/dt = −2·v\ndv/dt = 0.75·u", body: ["The deviation from equilibrium is computed with the Jacobian at that point. The u·v product term is dropped because it is assumed to be small."] },
      { title: "What you see on screen", eq: "", body: ["The linear model can only oscillate like an ideal pendulum: a fixed period of 2π/√(a·c) = 5.13 years, an elliptical trajectory, and no lower bound.", "In the original model, the larger the disturbance, the longer the cycle and the more the trajectory leans into an egg shape. Its populations never go negative. With large disturbances the linear model predicts negative populations."] },
    ],
    table: "Show data as a table",
    cols: ["Year", "Rabbits, original", "Rabbits, linear", "Wolves, original", "Wolves, linear"],
  },
  term: {
    hint: "Type help to see what this terminal can do.",
    help: `Commands
  ls                 list pages
  cd <page>          open a page (about, work, radar, contact)
  whoami             short bio
  cv                 open my CV
  email | github | linkedin | instagram
  lang <en|id>       switch language
  theme <light|dark|system>
  motion <on|off>    page transitions
  date               current time in Malang
  clear              clear the screen
  exit               close the terminal (or press Esc)`,
    whoami: "Arva Mada Jayastu\nComputer Engineering, Universitas Brawijaya (FILKOM)\nEmbedded systems, C++, and the tools around them.",
    notFound: (c: string) => `command not found: ${c}. Type help.`,
    close: "Close terminal",
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: { home: "Beranda", about: "Tentang", work: "Karya", radar: "Radar", contact: "Kontak", terminal: "Buka terminal (Ctrl + `)", menu: "Menu", motionOn: "Transisi halaman menyala. Klik untuk mematikan", motionOff: "Transisi halaman mati. Klik untuk menyalakan", lang: "English" },
  hero: {
    title: "Hardware yang bicara dengan software.",
    sub: "Mahasiswa Teknik Komputer Universitas Brawijaya. Saya menulis C++ untuk mikrokontroler dan membangun alat di sekitarnya.",
    cv: "Unduh CV",
    work: "Lihat karya",
    contact: "Hubungi saya",
    photo: "Foto Arva Mada",
  },
  about: {
    title: "Tentang",
    body: [
      "Saya kuliah Teknik Komputer di FILKOM, Universitas Brawijaya. Mata kuliah saya mulai dari logika digital dan analisis rangkaian sampai sistem operasi dan mikrokontroler.",
      "Di luar kelas saya membangun software di sekitarnya: compiler C++ tersandbox dan platform latihan untuk praktikum Pemrograman Dasar, alat belajar yang berjalan di home server sendiri, dan produk hackathon bersama tim.",
      "Saya juga menulis tentang teknologi dan masyarakat (FOMO, literasi TIK, xenoglosofilia), membuat model di Blender, dan mengikuti Formula 1 dari sisi teknik dan strategi balap.",
    ],
    facts: [
      ["Kampus", "Universitas Brawijaya, FILKOM"],
      ["Program", "S1 Teknik Komputer, 2025 sampai sekarang"],
      ["Fokus", "Sistem tertanam dan jaringan"],
      ["Bahasa", "C++, C, Python, TypeScript"],
      ["Domisili", "Malang, Indonesia"],
    ],
    skills: "Keahlian",
    groups: [
      { group: "Pemrograman", items: ["C++", "C", "Python", "TypeScript", "Struktur data", "Algoritma"] },
      { group: "Embedded dan hardware", items: ["AVR ATmega8535", "ESP32", "Arduino", "Logika digital", "Analisis rangkaian"] },
      { group: "Sistem", items: ["Linux dan Bash", "POSIX threads", "Docker", "nginx", "Cloudflare Tunnel", "Konfigurasi router"] },
      { group: "Alat dan desain", items: ["Git", "GitHub Actions", "Next.js", "MLflow", "Blender"] },
    ],
  },
  work: {
    title: "Karya",
    tabs: { projects: "Proyek", github: "GitHub" },
    code: "Kode",
    live: "Live",
    items: [
      { context: "Digdaya x Hackathon 2026, Bank Indonesia x OJK", summary: "Penasihat skill gap berbasis AI untuk pencari kerja Indonesia. Unggah CV, pilih posisi tujuan, lalu dapatkan skor kecocokan, skill yang kurang, dan peta belajar.", alt: "Halaman depan NaviKarier" },
      { context: "TEKRA 2026 Software Development Challenge", summary: "Sistem asesmen dan pemantauan psikologis yang membantu lima konselor kampus menjangkau 75.000 mahasiswa." },
      { context: "Proyek akhir Algoritma dan Struktur Data", summary: "Sistem pemantauan rumah dalam C++ tanpa STL: lima jenis sensor per rumah, dirangkum menjadi skor pemantauan." },
      { context: "IYREF 2026", summary: "Platform eco-fintech sirkular. Minyak jelantah dikumpulkan untuk biofuel dan diubah menjadi poin yang bisa dicairkan.", alt: "Logo JelantahHub" },
    ],
  },
  gh: {
    recent: "Push terbaru",
    activity: "Kontribusi",
    since: "sejak",
    total: "Kontribusi",
    active: "Hari aktif",
    streak: "Beruntun terpanjang",
    days: "hari",
    perWeek: "Kontribusi per minggu",
    less: "Sedikit",
    more: "Banyak",
    showTable: "Tampilkan tabel",
    hideTable: "Tampilkan grafik",
    month: "Bulan",
    repos: "Repositori",
    cols: { name: "Nama", language: "Bahasa", stars: "Bintang", pushed: "Push terakhir", created: "Dibuat" },
    updated: "Diperbarui",
    empty: "Data GitHub belum tersedia.",
    all: "Semua repositori",
    noContrib: "Tidak ada kontribusi",
    contrib: (n: number) => `${n} kontribusi`,
    week: "Minggu",
  },
  radar: {
    title: "Radar saya",
    sub: "Yang sedang saya baca dan tonton, diambil langsung tiap kunjungan.",
    hn: "Halaman depan Hacker News",
    hnError: "Hacker News tidak merespons. Coba lagi nanti.",
    epl: "Premier League",
    eplFull: "Tabel lengkap",
    eplError: "Klasemen belum bisa dimuat.",
    team: "Tim",
    played: "Main",
    gd: "Selisih gol",
    pts: "Poin",
    top: (n: number) => `${n} teratas. Posisi berwarna biru lolos ke Liga Champions.`,
  },
  contact: {
    title: "Hubungi saya",
    sub: "Terbuka untuk magang, kolaborasi lab, dan obrolan soal sistem tertanam atau Formula 1.",
    body: [
      "Saya mencari kesempatan magang dan riset di bidang sistem tertanam, jaringan, dan software pendukungnya. Saya juga senang membantu proyek mahasiswa atau bergabung di tim hackathon.",
      "Email adalah cara paling pasti untuk menghubungi saya dan cocok untuk urusan formal. Untuk pertanyaan singkat, WhatsApp juga bisa.",
    ],
    email: "Kirim email",
    based: "Domisili Malang, Indonesia (WIB, UTC+7)",
    cv: "Unduh CV",
    channels: "Temukan saya di",
    copy: "Salin",
    copied: "Tersalin",
    open: "Buka",
    use: {
      email: "Magang, kolaborasi, urusan formal",
      whatsapp: "Pertanyaan singkat",
      linkedin: "Pendidikan dan pengalaman",
      instagram: "Keseharian",
      github: "Kode dan proyek",
    },
  },
  footer: { social: "Profil" },
  archive: {
    title: "Arsip",
    sub: "Tugas kuliah dan eksperimen kecil, dikumpulkan di satu tempat supaya tautannya tidak hilang.",
    empty: "Belum ada arsip.",
    count: (n) => `${n} entri`,
    external: "terbuka di tab baru",
  },
  lotka: {
    tag: "archive / 001",
    title: "Kelinci dan Serigala",
    lede: "Kelinci berkembang biak dan dimakan serigala, sedangkan serigala hidup dari kelinci. Dua model dijalankan berdampingan dari kondisi awal yang sama: persamaan aslinya (non-linear) dan versi linearisasi di sekitar titik seimbang.",
    meta: [
      ["Model", "Lotka–Volterra"],
      ["Metode", "RK4, langkah ≤ 0,01 th"],
      ["Titik seimbang", "20 kelinci · 10 serigala"],
      ["Parameter", "a 1,0 · b 0,1 · c 1,5 · d 0,075"],
    ],
    settings: "Pengaturan simulasi",
    delta: "Gangguan awal",
    duration: "Durasi",
    yr: "th",
    start: (pct, x, y) => `Kelinci mulai ${pct}% di atas titik seimbang (${x} ekor). Serigala mulai di ${y} ekor.`,
    verdict: {
      ok: "Linearisasi masih cocok: kedua model hampir berimpit.",
      warn: "Mulai menyimpang: waktu siklus dan bentuknya sudah berbeda.",
      bad: "Menyimpang jauh: model linear tidak lagi mewakili sistem asli.",
      neg: "Menyimpang jauh: model linear memprediksi populasi negatif.",
    },
    gapX: "Selisih kelinci terbesar",
    gapY: "Selisih serigala terbesar",
    period: "Periode siklus model asli",
    low: "Populasi terendah model linear",
    unit: " ekor",
    years: "tahun",
    ofEq: (pct, eq, T) => `${pct}% dari titik seimbang (${eq}), dalam ${T} tahun`,
    periodSub: (lin, pct) => `Linear selalu ${lin} tahun (${pct}% lebih cepat)`,
    lowSub: (x, y) => `Kelinci / serigala. Model asli: ${x} / ${y}`,
    negative: "Negatif: mustahil",
    original: "Model asli (non-linear)",
    linear: "Model linear",
    rabbits: "Kelinci",
    wolves: "Serigala",
    worldAria: (m) => `Animasi populasi kelinci dan serigala, ${m}`,
    play: "Putar",
    pause: "Jeda",
    replay: "Ulangi",
    speed: "Kecepatan",
    scrub: "Posisi waktu simulasi",
    time: "Populasi terhadap waktu",
    phase: "Lintasan (kelinci vs serigala)",
    timeAria: (s) => `Grafik populasi ${s.toLowerCase()} terhadap waktu, model asli dan linear`,
    phaseAria: "Lintasan populasi pada bidang kelinci dan serigala, model asli dan linear",
    timeNote: "Sumbu waktu dalam tahun. Arahkan kursor ke grafik untuk membaca nilai. Tombol panah kiri dan kanan juga bisa dipakai.",
    phaseNote: "Sumbu mendatar: kelinci. Sumbu tegak: serigala. Skala menyesuaikan besar gangguan.",
    cv: { negPop: "populasi negatif", negArea: "daerah negatif", eq: "titik seimbang", start: "mulai", both: "Kelinci dan serigala negatif", x: "Populasi kelinci negatif", y: "Populasi serigala negatif" },
    tip: (t) => `t = ${t} tahun`,
    tipRows: ["kelinci, asli", "kelinci, linear", "serigala, asli", "serigala, linear"],
    explain: "Apa yang dibandingkan?",
    steps: [
      { title: "Model asli (non-linear)", eq: "dx/dt =  a·x − b·x·y\ndy/dt = −c·y + d·x·y", body: ["x adalah kelinci, y serigala. Kelinci berkembang biak (a·x) dan dimakan (−b·x·y). Serigala mati alami (−c·y) dan bertambah karena makan (d·x·y). Suku x·y, hasil kali dua populasi, adalah sumber non-linearitasnya.", "Parameter per tahun: a = 1,0 · b = 0,1 · c = 1,5 · d = 0,075."] },
      { title: "Titik operasi (operating point)", eq: "x* = c/d = 20 kelinci\ny* = a/b = 10 serigala", body: ["Populasi berhenti berubah saat dx/dt = 0 dan dy/dt = 0. Di titik ini kelahiran dan pemangsaan saling menyeimbangkan. Linearisasi dibuat di sekitar titik ini."] },
      { title: "Linearisasi", eq: "u = x − x*,  v = y − y*\nJ = [ 0     −2 ]\n    [ 0,75   0 ]\ndu/dt = −2·v\ndv/dt = 0,75·u", body: ["Simpangan dari titik seimbang dihitung dengan Jacobian di titik itu. Suku hasil kali u·v dibuang karena dianggap terlalu kecil."] },
      { title: "Yang terlihat di layar", eq: "", body: ["Model linear hanya bisa berosilasi seperti bandul ideal: periode tetap 2π/√(a·c) = 5,13 tahun, lintasan berbentuk elips, dan tidak punya batas bawah.", "Pada model asli, makin besar gangguan awal, siklus makin lama dan lintasan makin miring seperti telur. Populasinya tidak pernah negatif. Pada gangguan besar, model linear justru memprediksi populasi negatif."] },
    ],
    table: "Lihat data sebagai tabel",
    cols: ["Tahun", "Kelinci asli", "Kelinci linear", "Serigala asli", "Serigala linear"],
  },
  term: {
    hint: "Ketik help untuk melihat apa saja yang bisa dilakukan terminal ini.",
    help: `Perintah
  ls                 daftar halaman
  cd <halaman>       buka halaman (about, work, radar, contact)
  whoami             bio singkat
  cv                 buka CV
  email | github | linkedin | instagram
  lang <en|id>       ganti bahasa
  theme <light|dark|system>
  motion <on|off>    transisi halaman
  date               waktu sekarang di Malang
  clear              bersihkan layar
  exit               tutup terminal (atau tekan Esc)`,
    whoami: "Arva Mada Jayastu\nTeknik Komputer, Universitas Brawijaya (FILKOM)\nSistem tertanam, C++, dan alat di sekitarnya.",
    notFound: (c: string) => `perintah tidak ditemukan: ${c}. Ketik help.`,
    close: "Tutup terminal",
  },
};

export const DICT: Record<Lang, Dict> = { en, id };
