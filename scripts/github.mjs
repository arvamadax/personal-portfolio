#!/usr/bin/env node
// Ambil data GitHub untuk halaman Work → GitHub dan tulis sebagai JSON statis.
// Dijalankan saat build (npm prebuild) dan harian di server (deploy/github-portfolio.timer).
// Browser pengunjung tidak pernah memanggil API GitHub: tidak kena batas 60/jam per IP.
//
//   node scripts/github.mjs                          → public/data/github.json
//   node scripts/github.mjs /var/www/portfolio/data/github.json
//   GITHUB_TOKEN=… node scripts/github.mjs           → batas API lebih longgar (opsional)
//
// Gagal ambil = berkas lama dibiarkan (build tetap jalan).
import fs from "node:fs";
import path from "node:path";

const USER = "arvamadax";
const HIDE = new Set(["personal-portfolio", "portfolio", "arvamadax"]);
const OUT = process.argv[2] || path.join(import.meta.dirname, "..", "public", "data", "github.json");
const H = { "User-Agent": "arva-portfolio", Accept: "application/vnd.github+json", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };

async function json(url) {
  const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
}

// Kalender kontribusi dari halaman profil (satu tahun per permintaan).
// <td data-date="2026-04-26" id="contribution-day-component-…"> + <tool-tip for="…">6 contributions on April 26th.</tool-tip>
async function tahun(y) {
  const r = await fetch(`https://github.com/users/${USER}/contributions?from=${y}-01-01&to=${y}-12-31`, { headers: { "User-Agent": H["User-Agent"] }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`contributions ${y}: HTTP ${r.status}`);
  const html = await r.text();
  const tanggal = new Map([...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"/g)].map((m) => [m[2], m[1]]));
  const hari = {};
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const d = tanggal.get(m[1]);
    if (d) hari[d] = /^(\d+)/.test(m[2]) ? +m[2].match(/^(\d+)/)[1] : 0; // "No contributions" = 0
  }
  if (!Object.keys(hari).length) throw new Error(`contributions ${y}: format halaman berubah`);
  return hari;
}

try {
  const user = await json(`https://api.github.com/users/${USER}`);
  const semua = await json(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`);
  const repos = semua
    .filter((r) => !r.fork && !r.archived && !HIDE.has(r.name))
    .map((r) => ({
      name: r.name, url: r.html_url, description: r.description || "", language: r.language || "",
      stars: r.stargazers_count, homepage: r.homepage || "", created: r.created_at, pushed: r.pushed_at,
    }));

  const recent = (await Promise.all(repos.slice(0, 5).map(async (r) => {
    const c = await json(`https://api.github.com/repos/${USER}/${r.name}/commits?per_page=4`);
    return c.map((x) => ({ repo: r.name, message: x.commit.message.split("\n")[0], date: x.commit.author.date, sha: x.sha.slice(0, 7), url: x.html_url }));
  }))).flat().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);

  const mulai = user.created_at.slice(0, 10);
  const hariIni = new Date().toISOString().slice(0, 10);
  const hari = {};
  for (let y = +mulai.slice(0, 4); y <= +hariIni.slice(0, 4); y++) Object.assign(hari, await tahun(y));
  const days = Object.entries(hari).filter(([d]) => d >= mulai && d <= hariIni).sort().map(([date, count]) => ({ date, count }));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), since: mulai, repos, recent, days }));
  console.log(`github.json: ${repos.length} repo, ${recent.length} commit, ${days.length} hari (${days.reduce((s, d) => s + d.count, 0)} kontribusi)`);
} catch (e) {
  console.warn(`github.json tidak diperbarui: ${e.message}`);
}
