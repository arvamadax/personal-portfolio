import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

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
