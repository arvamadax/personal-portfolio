# Deploy: portfolio.codewithus.me

Situs = export statis (`out/`) yang disajikan nginx di home server, di belakang Cloudflare Tunnel.
Proses di belakangnya (tidak ada kode server di repo ini):

| Proses | Asal | Port | Untuk |
|---|---|---|---|
| nginx `portfolio` | `deploy/nginx-portfolio.conf` | 8125 | Situs + gerbang PIN `/planner` & `/api` |
| `api-planner` | `webformygf/server/api.js` | 8162 | Planner pribadi: jadwal, BRONE, Google Calendar, tugas |
| `github-portfolio.timer` | `scripts/github.mjs` | - | Perbarui `/data/github.json` tiap hari 03:30 |

## Pembaruan rutin

```bash
~/portfolio/deploy/deploy.sh
```

Menarik kode terbaru, build (termasuk data GitHub), lalu menyalin `out/` ke `/var/www/portfolio`.

## Pemasangan pertama

1. **Kode**: `git clone https://github.com/arvamadax/personal-portfolio ~/portfolio`.
   Cek port kosong: `ss -ltnp | grep -E '8125|8162'`.
2. **Situs**: `~/portfolio/deploy/deploy.sh`.
3. **nginx + PIN**:
   ```bash
   sudo cp ~/portfolio/deploy/nginx-portfolio.conf /etc/nginx/sites-available/portfolio
   sudo nano /etc/nginx/sites-available/portfolio   # ganti "000000" di KEDUA map pf_pin dengan PIN
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
   PIN asli hanya ada di salinan server. Untuk perubahan config berikutnya, tambal salinan itu (mis. dengan `sed`),
   jangan disalin ulang dari repo supaya PIN tidak tertimpa.
4. **Data GitHub harian**:
   ```bash
   sudo cp deploy/github-portfolio.service deploy/github-portfolio.timer /etc/systemd/system/
   sudo systemctl daemon-reload && sudo systemctl enable --now github-portfolio.timer
   ```
5. **Cloudflare Tunnel** (dikelola lewat `/etc/cloudflared/config.yml`). Arahkan hostname ke nginx:
   ```bash
   sudo cp /etc/cloudflared/config.yml /etc/cloudflared/config.yml.bak-portfolio
   sudo sed -i '/hostname: portfolio.codewithus.me/{n;s|http://127.0.0.1:8080|http://127.0.0.1:8125|}' /etc/cloudflared/config.yml
   sudo cloudflared tunnel --config /etc/cloudflared/config.yml ingress validate
   sudo systemctl restart cloudflared
   ```
   SSH lewat `ssh.codewithus.me` ikut terputus saat cloudflared di-restart; login lagi setelahnya.
   Kembali ke situs lama: `sudo cp /etc/cloudflared/config.yml.bak-portfolio /etc/cloudflared/config.yml && sudo systemctl restart cloudflared`.
6. **Planner API** (butuh `~/webformygf`):
   ```bash
   sudo install -d -m 700 -o arvamadax /etc/study-buddy-arva
   sudo cp deploy/api-planner.config.example.json /etc/study-buddy-arva/config.json
   sudo nano /etc/study-buddy-arva/config.json
   sudo cp deploy/api-planner.service /etc/systemd/system/
   sudo systemctl daemon-reload && sudo systemctl enable --now api-planner
   ```
   Cara mengisi config (URL iCal + token BRONE, `server/gas/Kode.gs` di akun Google) ada di README web-faya.
7. **Cloudflare Access** untuk planner: Zero Trust → Access → Applications → Add → *Self-hosted*,
   domain `portfolio.codewithus.me`, path `planner`, `api`, dan `masuk`. Policy **Allow** → *Emails* = email sendiri,
   login **One-time PIN**, session **1 month**. Halaman publik tidak kena Access.

## Catatan

- Terminal di situs punya perintah `planner` (tidak tercantum di `help`) yang membuka `/planner` di tab baru.
  Yang menjaga tetap nginx (PIN) + Cloudflare Access, bukan terminal.
- HTML dikirim dengan `Cache-Control: no-cache`, jadi deploy baru langsung terlihat. Aset `/_next/static/` di-cache 1 tahun.
- Lokal: `SB_PORT=8162 node ../web-faya/server/api.js --contoh` untuk planner dengan data contoh; `npm run dev`
  meneruskan `/api/*` ke port 8162.
