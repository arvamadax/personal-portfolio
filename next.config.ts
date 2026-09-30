import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const dev = process.env.NODE_ENV === "development";

// Penjaga arsip: HTML di public/ tersaji mentah (tanpa desain/tema/bahasa situs, font/script luar diblokir CSP).
// Gagal di dev & build (hanya pemilik yang melihat), jadi tidak pernah ter-deploy. Pasangannya di lib/content.ts.
const rawHtml = readdirSync(join(__dirname, "public"), { recursive: true }).map(String).filter((f) => /\.html?$/i.test(f));
if (rawHtml.length)
  throw new Error(`[archive] Ditolak: HTML mentah di public/ (${rawHtml.join(", ")}). HTML interaktif harus di-porting dulu supaya ikut desain, tema, dan bahasa situs. Buka Claude Code di folder ini lalu minta: "port <path file>.html ke /archive".`);

// Produksi = export statis: nginx di home server menyajikan out/ dan mem-proxy /api ke API planner.
// Dev: tidak di-export, supaya /api bisa diteruskan ke api.js lokal (node ../web-faya/server/api.js --contoh).
const nextConfig: NextConfig = {
  ...(dev ? {} : { output: "export" as const }),
  images: { unoptimized: true },
  turbopack: { root: __dirname },
  ...(dev && {
    rewrites: async () => [{ source: "/api/:path*", destination: `${process.env.PLANNER_API || "http://127.0.0.1:8162"}/api/:path*` }],
  }),
};

export default nextConfig;
