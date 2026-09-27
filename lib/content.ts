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
