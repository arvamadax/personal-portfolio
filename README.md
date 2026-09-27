# Arva Mada, portfolio

Personal site of Arva Mada Jayastu, Computer Engineering student at Universitas Brawijaya.

**Live:** https://portfolio.codewithus.me

## Features

- Pages: Home, About, Work, Radar, Contact, in English and Indonesian
- Work → GitHub: contribution heatmap, weekly activity, recent commits, and a sortable repository table
- Radar: live Hacker News front page and Premier League standings
- Built-in terminal (``Ctrl + ` ``) with `help`, `cd`, `theme`, `lang`, and more
- Page transitions with a motion switch that respects reduced-motion settings
- Light and dark themes

## Stack

Next.js 16 (static export), React 19, Tailwind CSS 4, TypeScript, Phosphor Icons, Geist.
Served by nginx on a home server behind Cloudflare Tunnel.

## Run locally

```bash
npm install
node scripts/github.mjs     # fetch GitHub data into public/data/
npm run dev
```

Build the static site with `npm run build` (output in `out/`).

## Project layout

```
app/          routes and global styles
components/   UI components
lib/          content (EN/ID), i18n, page transitions
scripts/      GitHub data fetcher
deploy/       server configuration and deploy script
```

All page text lives in `lib/content.ts`.

## Deployment

See [deploy/README.md](deploy/README.md).
