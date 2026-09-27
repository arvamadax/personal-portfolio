#!/usr/bin/env bash
# Build portofolio lalu terbitkan out/ ke web root nginx.
#
#   ./deploy/deploy.sh                  -> /var/www/portfolio
#   ./deploy/deploy.sh /var/www/lain    -> web root lain
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
WEB="${1:-/var/www/portfolio}"

# Tarik dulu, lalu jalankan ulang diri sendiri dengan versi baru (pola yang sama dengan web-faya).
if [ "${PF_DEPLOY_TAHAP2:-}" != "1" ]; then
  git -C "$REPO" pull --ff-only
  export PF_DEPLOY_TAHAP2=1
  exec "$0" "$@"
fi

cd "$REPO"
npm ci --no-audit --no-fund
NEXT_PUBLIC_SITE_URL="https://portfolio.codewithus.me" npm run build

# out/ hanya berisi hasil build (HTML, _next/, public/), jadi aman disalin utuh.
sudo install -d -m 755 "$WEB"
sudo rsync -a --delete-during "$REPO/out/" "$WEB/"
# github-portfolio.timer (jalan sebagai user ini) menulis ulang data/github.json tiap hari
sudo chown -R "$(id -un)" "$WEB/data"
echo "Terbit ke $WEB"
