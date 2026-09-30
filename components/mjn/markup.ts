// Markup presentasi, disalin apa adanya dari KEWARGANEGARAAN/index.html (path gambar & font diganti).
export const MARKUP = `<main>

<!-- A. PEMBUKA — merah putih -->
<section id="hero" class="scene hero">
  <h1><span class="a" style="--d:.2s">Menagih</span><span class="a" style="--d:.4s">Janji Negara</span></h1>
  <div class="foot">
    <p class="a" style="--d:.7s;font:400 clamp(22px,2.4vw,32px)/1.25 var(--serif);text-wrap:pretty">Peran, Hak, dan Kewajiban Warga Negara dalam Negara Hukum Indonesia</p>
    <p class="a" style="--d:.85s;font:italic 400 clamp(18px,1.7vw,22px)/1.4 var(--serif);opacity:.8">Fenomena tagar kritik publik 2019–2025</p>
  </div>
</section>

<!-- B. JANJI NEGARA — dokumen -->
<section id="janji" class="scene doc">
  <div class="wrap">
    <header class="stack a">
      <h2>Negara berjanji.<br>Warga berkewajiban.</h2>
    </header>
    <div class="split" style="align-items:start;grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
      <div class="stack" style="gap:14px">
        <span class="eyebrow">Empat janji negara</span>
        <div class="rows">
          <div class="row a" style="--d:.15s;justify-content:flex-start;flex-wrap:nowrap;gap:20px"><span class="num" style="min-width:64px">I</span><span class="item" data-info="janji1">Melindungi segenap bangsa Indonesia</span></div>
          <div class="row a" style="--d:.3s;justify-content:flex-start;flex-wrap:nowrap;gap:20px"><span class="num" style="min-width:64px">II</span><span class="item" data-info="janji2">Memajukan kesejahteraan umum</span></div>
          <div class="row a" style="--d:.45s;justify-content:flex-start;flex-wrap:nowrap;gap:20px"><span class="num" style="min-width:64px">III</span><span class="item" data-info="janji3">Mencerdaskan kehidupan bangsa</span></div>
          <div class="row a" style="--d:.6s;justify-content:flex-start;flex-wrap:nowrap;gap:20px"><span class="num" style="min-width:64px">IV</span><span class="item" data-info="janji4">Ikut melaksanakan ketertiban dunia</span></div>
        </div>
      </div>
      <div class="stack a" style="--d:.5s;gap:14px">
        <span class="eyebrow">Kewajiban warga negara</span>
        <div class="rows">
          <div class="row"><span class="item">Membayar pajak</span><span class="ref" data-info="p23a">Pasal 23A</span></div>
          <div class="row"><span class="item">Menjunjung hukum</span><span class="ref" data-info="p27-1">Pasal 27 ayat (1)</span></div>
          <div class="row"><span class="item">Bela negara</span><span class="ref"><span data-info="p27-3">Pasal 27 ayat (3)</span> · <span data-info="p30-1">Pasal 30 ayat (1)</span></span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- C. NEGARA HUKUM PANCASILA — dokumen -->
<section id="hukum" class="scene doc">
  <div class="wrap">
    <header class="stack a">
      <h2 data-info="hadjon">Negara Hukum Pancasila</h2>
      <p class="lede">Empat unsur yang menjadi lensa untuk membaca tujuh fenomena kritik publik.</p>
    </header>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));border-top:2px solid var(--fg)">
      <div class="a" style="--d:.15s;padding:24px 24px 28px 0;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:16px"><span class="num" style="font-size:clamp(56px,6vw,88px)">1</span><span class="item" data-info="h1">Kerukunan hubungan pemerintah dan rakyat</span></div>
      <div class="a" style="--d:.3s;padding:24px 24px 28px 0;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:16px"><span class="num" style="font-size:clamp(56px,6vw,88px)">2</span><span class="item" data-info="h2">Hubungan fungsional yang proporsional antarkekuasaan negara</span></div>
      <div class="a" style="--d:.45s;padding:24px 24px 28px 0;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:16px"><span class="num" style="font-size:clamp(56px,6vw,88px)">3</span><span class="item" data-info="h3">Musyawarah lebih dahulu, peradilan sebagai sarana terakhir</span></div>
      <div class="a" style="--d:.6s;padding:24px 24px 28px 0;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:16px"><span class="num" style="font-size:clamp(56px,6vw,88px)">4</span><span class="item" data-info="h4">Keseimbangan antara hak dan kewajiban</span></div>
    </div>
  </div>
</section>

<!-- D. HAK, KEWAJIBAN, PERAN — dokumen -->
<section id="peran" class="scene doc">
  <div class="wrap">
    <header class="stack a">
      <h2>Tiga peran warga</h2>
    </header>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:0;border-top:2px solid var(--fg)">
      <div class="a" style="--d:.15s;padding:20px 24px 22px 0;border-bottom:1px solid var(--rule);display:flex;align-items:baseline;gap:16px"><span class="ref">01</span><span class="item" data-info="peran1" style="font-size:clamp(26px,2.6vw,36px)">Pemegang kedaulatan</span></div>
      <div class="a" style="--d:.3s;padding:20px 24px 22px 0;border-bottom:1px solid var(--rule);display:flex;align-items:baseline;gap:16px"><span class="ref">02</span><span class="item" data-info="peran2" style="font-size:clamp(26px,2.6vw,36px);color:var(--ac)">Pengawas</span></div>
      <div class="a" style="--d:.45s;padding:20px 24px 22px 0;border-bottom:1px solid var(--rule);display:flex;align-items:baseline;gap:16px"><span class="ref">03</span><span class="item" data-info="peran3" style="font-size:clamp(26px,2.6vw,36px)">Pelaksana kewajiban</span></div>
    </div>
    <div class="stack" style="gap:8px">
      <span class="eyebrow">Dasar hukum yang disorot</span>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));column-gap:48px;border-top:1px solid var(--rule)">
        <div class="a" style="--d:.5s;display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1px solid var(--rule)"><span class="ref" data-info="p28e1">Pasal 28E ayat (1) UUD NRI 1945</span><span class="body">Bebas memilih pekerjaan dan tempat tinggal, serta meninggalkan dan kembali ke wilayah negara.</span></div>
        <div class="a" style="--d:.55s;display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1px solid var(--rule)"><span class="ref" data-info="p28e3">Pasal 28E ayat (3) UUD NRI 1945</span><span class="body">Kebebasan berserikat, berkumpul, dan mengeluarkan pendapat.</span></div>
        <div class="a" style="--d:.6s;display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1px solid var(--rule)"><span class="ref" data-info="p28j">Pasal 28J UUD NRI 1945</span><span class="body">Hak dijalankan dengan menghormati hak orang lain; pembatasannya hanya dengan undang-undang.</span></div>
        <div class="a" style="--d:.65s;display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1px solid var(--rule)"><span class="ref" data-info="uu9">UU No. 9 Tahun 1998</span><span class="body">Menyampaikan pendapat di muka umum cukup dengan <em>pemberitahuan</em>, bukan izin.</span></div>
        <div class="a" style="--d:.7s;display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1px solid var(--rule)"><span class="ref" data-info="uu3">UU No. 3 Tahun 2002, Pasal 9</span><span class="body">Bela negara dapat dijalankan sesuai profesi.</span></div>
      </div>
    </div>
  </div>
</section>

<!-- E1. #ReformasiDikorupsi — poster WALHI -->
<section id="s1" class="scene">
  <div class="wrap split" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
    <div class="stack">
      <h2><span class="a stamp" style="--d:.15s;display:block;transform-origin:left center">#Reformasi</span><span class="a stamp" style="--d:.35s;display:block;transform-origin:left center">Dikorupsi</span></h2>
      <div class="stack a" style="--d:.45s;gap:8px">
        <span class="eyebrow">Tujuan</span>
        <p class="aim">Menyatakan bahwa agenda Reformasi 1998, terutama pemberantasan korupsi dan kebebasan sipil, sedang dilemahkan (“dikorupsi”) lewat revisi UU KPK dan RKUHP yang dibahas kilat menjelang akhir masa jabatan DPR 2014–2019.</p>
      </div>
      <div class="stack a" style="--d:.6s;gap:6px">
        <span class="eyebrow">Tuntutan</span>
        <div style="border-top:2px solid #FFFFFF"><div class="demand"><span data-info="uukpk">Tolak revisi UU KPK</span></div><div class="demand"><span data-info="rkuhp">Tolak RKUHP</span></div></div>
      </div>
      <div class="result"><div class="a stamp" style="--d:.9s" data-info="uukpk19">
        <span style="font:500 12px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase">Hasil · Revisi UU KPK</span>
        <span style="font:900 clamp(28px,3vw,44px)/.95 var(--f-montserrat),sans-serif;text-transform:uppercase">Tetap disahkan</span>
      </div></div>
    </div>
    <figure class="poster a poster" style="--d:.3s">
      <img src="/media/menagih-janji-negara/walhi.jpg" alt="Poster WALHI bertuliskan Reformasi Habis Dikorupsi Oligarki, dengan ilustrasi elite berbisik di atas foto massa aksi" width="447" height="447">
      <figcaption>Poster WALHI, Catatan Kritis Tahun 2020 · slogan gerakan dipakai ulang</figcaption>
    </figure>
  </div>
</section>

<!-- E2. Cipta Kerja — infografis TEMPO -->
<section id="s2" class="scene">
  <div class="wrap split">
    <div class="stack">
      <h2 class="a" style="--d:.1s">Penolakan<br>UU Cipta Kerja</h2>
      <div class="step a" style="--d:.35s"><b>1</b><span><strong data-info="ciptaker">5 Okt 2020</strong>UU Cipta Kerja disahkan.</span></div>
      <div class="a draw" style="--d:.5s;height:2px;background:var(--gold);width:min(420px,100%)"></div>
      <div class="step a" style="--d:.65s"><b>2</b><span><strong data-info="mk91">25 Nov 2021</strong>Mahkamah Konstitusi menyatakannya <strong style="display:inline;font-size:inherit;margin:0" data-info="mk91">inkonstitusional bersyarat</strong>, dengan tenggat perbaikan 2 tahun, lebih dari setahun setelah disahkan.</span></div>
    </div>
    <figure class="poster a poster" style="--r:-1.5deg;--d:.3s">
      <img src="/media/menagih-janji-negara/tempo-cipta-kerja.jpg" alt="Infografis TEMPO.CO: Simak 7 alasan Konfederasi Serikat Pekerja tetap tolak RUU Cipta Kerja, dengan foto massa buruh berbendera" width="495" height="619">
      <figcaption>Infografis TEMPO.CO · KSPI</figcaption>
    </figure>
  </div>
</section>

<!-- E3. #PeringatanDarurat — layar biru VHS -->
<section id="s3" class="scene">
  <div class="layer" style="background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,20,.5) 100%)"></div>
  <div class="layer grain" style="opacity:.16;mix-blend-mode:screen;animation-duration:.45s"></div>
  <div class="layer" style="height:22%;background:linear-gradient(180deg,transparent,rgba(237,233,216,.07),transparent);animation:roll 7s linear infinite"></div>
  <div class="wrap split" style="animation:jitter 6s steps(1,end) infinite">
    <div class="stack">
      <div style="display:flex;align-items:flex-end;gap:6px;border-top:2px solid #EDE9D8;border-bottom:2px solid #EDE9D8;padding:14px 0">
        <h2 class="a type" style="--d:.2s">#PeringatanDarurat</h2>
        <span aria-hidden="true" style="display:block;width:.5em;height:.9em;font-size:clamp(34px,5.4vw,92px);background:#EDE9D8;animation:blink 1s steps(1) infinite;flex:none"></span>
      </div>
      <div class="log">
        <div class="a type" style="--d:.7s"><span>[20.08.2024]</span><span data-info="mk6070">Putusan MK No. 60/PUU-XXII/2024 dan No. 70/PUU-XXII/2024</span></div>
        <div class="a type" style="--d:.95s"><span>[21.08.2024]</span><span data-info="pdviral">Unggahan #PeringatanDarurat beredar</span></div>
        <div class="a type" style="--d:1.2s"><span>[22.08.2024]</span><span data-info="pdhasil">Aksi</span></div>
      </div>
      <div class="a pop" data-info="pdhasil" style="--d:1.5s;align-self:flex-start;background:#EDE9D8;color:#0C1A94;padding:12px 18px;display:flex;flex-direction:column;gap:4px;animation-timing-function:steps(4)">
        <span style="font:400 15px/1 var(--f-share-tech),monospace;letter-spacing:.12em">&gt; HASIL</span>
        <span style="font:400 clamp(24px,2.8vw,40px)/1 var(--f-vt323),monospace;text-transform:uppercase">Pengesahan revisi UU Pilkada dibatalkan</span>
      </div>
    </div>
    <figure class="poster a flick" style="--d:.1s">
      <img src="/media/menagih-janji-negara/peringatan-darurat.png" alt="Layar biru bergaya siaran televisi lama bertuliskan Peringatan Darurat dengan lambang Garuda Pancasila" width="721" height="547">
      <figcaption>Unggahan viral #PeringatanDarurat, 21 Agustus 2024</figcaption>
    </figure>
  </div>
  <div class="layer" style="background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px);z-index:2"></div>
</section>

<!-- E4. #IndonesiaGelap — sampul Tempo -->
<section id="s4" class="scene">
  <div class="layer" style="background:radial-gradient(ellipse 60% 55% at 35% 45%,#2B2B2B 0%,transparent 70%)"></div>
  <div class="layer grain" style="opacity:.14"></div>
  <div class="wrap split a flick" style="--d:.1s">
    <div class="stack">
      <h2 data-info="gelap">Indonesia<br>Gelap</h2>
      <div class="cut a" style="--d:.6s" data-info="inpres1">
        <span style="font:800 12px/1.4 var(--f-montserrat),sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#A8A8A8">Inpres 1/2025 · pemangkasan</span>
        <span style="font:900 clamp(40px,4.6vw,68px)/1 var(--f-montserrat),sans-serif">Rp306,69 T</span>
      </div>
      <div class="demands a" style="--d:.8s;border-top:1px solid #8E8E8E">
        <div><span>01</span><span data-info="inpres1">Menolak Inpres 1/2025</span></div>
        <div><span>02</span><span data-info="mbg">Transparansi MBG</span></div>
        <div><span>03</span><span data-info="tukin">Tunjangan kinerja dosen dan tendik</span></div>
      </div>
    </div>
    <figure class="poster a poster" style="--d:.4s">
      <img src="/media/menagih-janji-negara/tempo-indonesia-gelap.jpg" alt="Sampul Tempo edisi 19 Februari 2025 bertuliskan Indonesia Gelap dengan lambang Garuda di atas latar hitam bertekstur" width="335" height="597">
      <figcaption>Sampul Tempo · 19.02.2025</figcaption>
    </figure>
  </div>
</section>

<!-- E5. Revisi UU TNI — infografis CNN -->
<section id="s5" class="scene">
  <div class="band" aria-hidden="true"></div>
  <div class="wrap split">
    <div class="stack">
      <h2 class="a" style="--d:.1s">Penolakan revisi <em>UU TNI</em></h2>
      <p class="lede a" style="--d:.25s">Revisi <span data-info="uutni">UU No. 34 Tahun 2004</span> dikritik karena diduga membuka kembali ruang dwifungsi militer.</p>
      <div class="dossier a" style="--d:.4s">
        <div class="main">
          <span class="k">Disahkan DPR</span>
          <span class="date" data-info="uutni">20.03<br>2025</span>
        </div>
        <div class="side">
          <div><span class="k">Kekhawatiran publik</span><span class="v" data-info="dwifungsi">Dwifungsi militer</span></div>
          <div style="border-bottom:0"><span class="k">Bentuk aksi</span><span class="v" data-info="piknik">“Piknik melawan”</span></div>
        </div>
      </div>
      <div class="pasal">
        <span class="k a" style="--d:.6s;margin-right:6px">Poin krusial</span>
        <b class="a pop" style="--d:.7s" data-info="tni3">Pasal 3</b><b class="a pop" style="--d:.78s" data-info="tni7">Pasal 7</b><b class="a pop" style="--d:.86s" data-info="tni47">Pasal 47</b><b class="a pop" style="--d:.94s" data-info="tni53">Pasal 53</b>
      </div>
    </div>
    <figure class="poster a poster" style="--r:-1.5deg;--d:.3s">
      <img src="/media/menagih-janji-negara/cnn-uu-tni.jpeg" alt="Infografis CNN Indonesia: poin-poin krusial perubahan dalam RUU TNI, Pasal 3, 7, 47, dan 53, dengan ilustrasi palu hakim" width="400" height="647">
      <figcaption>Infografis CNN Indonesia</figcaption>
    </figure>
  </div>
</section>

<!-- E6. 17+8 — poster pink hijau -->
<section id="s6" class="scene">
  <div class="wrap split">
    <div class="stack">
      <h2 class="a" style="--d:.1s" data-info="178">17+8 Tuntutan Rakyat</h2>
      <div class="tagline a draw" style="--d:.35s" data-info="178warna">Transparansi. Reformasi. Empati.</div>
      <div class="nums a" style="--d:.55s">
        <div><b data-to="17">17</b><span>tuntutan · tenggat 5 Sep 2025</span></div>
        <div><b>+<span data-to="8">8</span></b><span>tuntutan · tenggat 31 Agu 2026</span></div>
        <div data-info="178pihak"><b data-to="6">6</b><span>pihak yang dituju</span></div>
      </div>
      <p class="a" style="--d:.75s" data-info="178respon">Hingga tenggat 5 Sep 2025, menurut platform pengusung, tuntutan pertama <strong style="font-weight:800">belum dipenuhi</strong>.</p>
    </div>
    <figure class="poster a poster" style="--r:-2deg;--d:.3s">
      <img id="p178" src="/media/menagih-janji-negara/17-8.jpg" alt="Poster 17+8 Tuntutan Rakyat: angka hijau di latar merah muda dengan tulisan Transparansi. Reformasi. Empati. Klik untuk melihat isi tuntutan." width="631" height="486">
      <figcaption>Poster 17+8 Tuntutan Rakyat</figcaption>
    </figure>
  </div>
  <!-- step 2 (same scene): the checklist poster, over black -->
  <div class="list-layer" aria-hidden="true">
    <div class="wrap" style="gap:clamp(16px,2.6vh,26px)">
      <h2 class="a" style="--d:.7s">17+8 Tuntutan Rakyat</h2>
      <div class="lists">
        <div class="panel a" style="--d:.8s">
          <div class="head"><span class="pill"><b>17</b> · Dalam 1 minggu</span><span class="pill">Deadline 5 Sep 2025</span></div>
          <ol id="t17" class="checks two"></ol>
        </div>
        <div class="panel a" style="--d:.9s">
          <div class="head"><span class="pill"><b>8</b> · Dalam 1 tahun</span><span class="pill">Deadline 31 Agu 2026</span></div>
          <ol id="t8" class="checks" start="18"></ol>
        </div>
      </div>
      <p class="a src" style="--d:1.2s">Sumber: poster daftar 17+8 Tuntutan Rakyat, Agustus–September 2025</p>
    </div>
  </div>
</section>

<!-- E7. #KaburAjaDulu — peta merah -->
<section id="s7" class="scene">
  <div class="layer grain" style="opacity:.08;animation:none;background-size:260px 260px"></div>
  <div class="wrap split" style="grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)">
    <div class="stack">
      <h2 class="a" style="--d:.1s">#Kabur<br>AjaDulu</h2>
      <div class="a" style="--d:.35s;display:flex;flex-direction:column;gap:6px">
        <span class="big" data-info="jobstreet">67%</span>
        <span style="font:400 clamp(16px,1.4vw,19px)/1.5 var(--f-poppins),sans-serif;max-width:440px;text-wrap:pretty">orang Indonesia berminat bekerja di luar negeri — <span data-info="jobstreet">JobStreet by SEEK &amp; BCG, data 2023</span>.</span>
      </div>
      <div class="a" style="--d:.55s;border-top:1px solid rgba(255,255,255,.3)">
        <div class="kv"><span>Hak yang dijamin</span><span style="font-weight:600" data-info="p28e1">Pasal 28E ayat (1)</span></div>
      </div>
    </div>
    <div class="stack" style="gap:clamp(16px,2.4vh,24px)">
      <figure class="poster a poster" style="--d:.25s">
        <div class="map">
          <img src="/media/menagih-janji-negara/kabur-aja-dulu.webp" alt="Ilustrasi peta Indonesia berwarna merah di atas latar hitam bertekstur dengan tulisan #Kabur Aja Dulu" width="1200" height="675">
          <div id="flyers" aria-hidden="true"></div>
        </div>
        <figcaption>Ilustrasi #KaburAjaDulu</figcaption>
      </figure>
      <div class="a" style="--d:.6s;display:flex;flex-direction:column;gap:10px">
        <span class="eyebrow" style="font-family:var(--f-poppins),sans-serif;font-weight:600">Tanggapan pemerintah · 17–18 Februari 2025</span>
        <div class="resp">
          <div><b>Introspeksi</b><span><span data-info="kad-yassierli">Menaker Yassierli</span>: tantangan bagi pemerintah untuk menciptakan lapangan kerja yang lebih baik.</span></div>
          <div><b>Bersyarat</b><span><span data-info="kad-karding">Menteri P2MI Karding</span>, <span data-info="kad-christina">Wamen P2MI Christina Aryani</span>, <span data-info="kad-hasan">Kepala PCO Hasan Nasbi</span>: boleh, asal berbekal keterampilan dan lewat jalur resmi.</span></div>
          <div><b>Menyindir</b><span><span data-info="kad-noel">Wamenaker Immanuel Ebenezer</span>, <span data-info="kad-nusron">Menteri ATR/BPN Nusron Wahid</span>, <span data-info="kad-bahlil">Menteri ESDM Bahlil Lahadalia</span>: dari “jangan balik lagi” hingga nasionalisme dipertanyakan.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- F. VOICE EXIT LOYALTY — dokumen -->
<section id="vel" class="scene doc">
  <div class="wrap" style="gap:clamp(24px,4vh,44px)">
    <header class="stack a" style="gap:12px">
      <h2 data-info="hirschman">Voice, exit, loyalty</h2>
    </header>
    <div class="a" style="--d:.2s;display:flex;flex-wrap:wrap;gap:12px">
      <div class="box" style="flex:2 1 520px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap"><h3 data-info="voice">Voice</h3><span class="ref">bersuara untuk mengubah · 6 fenomena</span></div>
        <div id="voiceList" class="chips"></div>
      </div>
      <div class="box" style="flex:1 1 260px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap"><h3 data-info="exit">Exit</h3><span class="ref">keluar · 1 fenomena</span></div>
        <div id="exitList" style="display:grid;gap:8px"></div>
      </div>
      <div class="box" style="flex:1 1 100%;border-style:dashed;flex-direction:row;justify-content:space-between;align-items:baseline;flex-wrap:wrap">
        <h3 data-info="loyalty">Loyalty</h3>
        <span class="body" style="max-width:640px">Perdebatan bela negara — <span data-info="p27-3">Pasal 27 ayat (3)</span>, <span data-info="p30-1">Pasal 30 ayat (1)</span>, dan <span data-info="uu3">UU 3/2002 Pasal 9</span> (bela negara sesuai profesi).</span>
      </div>
    </div>
    <div id="sel" aria-live="polite" class="a" style="--d:.35s;border:2px solid;padding:clamp(18px,2.6vw,32px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:18px 40px;align-items:end;transition:background-color .4s ease,color .4s ease">
      <div style="display:flex;flex-direction:column;gap:10px">
        <span id="selMeta" style="font:500 12px/1.4 var(--mono);letter-spacing:.14em;text-transform:uppercase"></span>
        <span id="selName" style="line-height:1"></span>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start">
        <span id="selFact" style="font:400 18px/1.5 var(--serif);text-wrap:pretty"></span>
        <button id="selGo" style="cursor:pointer;background:transparent;color:inherit;border:1px solid currentColor;padding:12px 18px;min-height:44px;font:500 12px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase">Lihat scene →</button>
      </div>
    </div>
  </div>
</section>

<!-- G. TEMUAN — dokumen -->
<section id="temuan" class="scene doc">
  <div class="wrap">
    <header class="a" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px 56px;align-items:end">
      <div class="stack" style="gap:12px">
        <span data-info="temuan" style="font:500 clamp(120px,18vw,260px)/.8 var(--serif);letter-spacing:-.03em">1<span style="color:var(--ac)">/</span>7</span>
      </div>
      <p class="lede" style="font-size:clamp(21px,2vw,28px);line-height:1.35">Dari tujuh fenomena, hanya <strong style="font-weight:500;color:var(--ac)">#PeringatanDarurat</strong> yang tercatat mengubah keputusan legislatif secara langsung. Cipta Kerja berubah lewat putusan MK bersyarat, setelah lebih dari setahun.</p>
    </header>
    <div class="tiles">
      <div class="a" data-info="uukpk19" style="--d:.2s;background:#1E1E1E;color:#FFFFFF"><span style="font:900 17px/1.05 var(--f-montserrat),sans-serif;text-transform:uppercase">#Reformasi<br>Dikorupsi</span><small>Revisi UU KPK tetap disahkan</small></div>
      <div class="a" data-info="mk91" style="--d:.28s;background:#3D2B31;color:#FFFFFF"><span style="font:700 19px/1.1 var(--f-fira),sans-serif;color:#E3A83B">UU Cipta Kerja</span><small>Tidak langsung: putusan MK bersyarat, &gt;1 tahun</small></div>
      <div class="a" data-info="pdhasil" style="--d:.36s;background:#0C1A94;color:#EDE9D8;outline:3px solid #8E1B1B;outline-offset:3px"><span style="font:400 26px/1 var(--f-vt323),monospace">#Peringatan<br>Darurat</span><small style="font-family:var(--f-share-tech),monospace;font-size:13px">Langsung: revisi UU Pilkada batal disahkan</small></div>
      <div class="a" data-info="gelap" style="--d:.44s;background:#0E0E0E;color:#F1F1F1"><span style="font:900 17px/1.05 var(--f-montserrat),sans-serif;text-transform:uppercase">Indonesia<br>Gelap</span><small style="color:#A8A8A8">Tidak tercatat mengubah keputusan</small></div>
      <div class="a" data-info="uutni" style="--d:.52s;background:#3F4A2D;color:#FFFFFF"><span style="font:800 19px/1.05 var(--f-barlow),sans-serif;color:#E8C14A">Revisi UU TNI</span><small>Disahkan 20 Mar 2025</small></div>
      <div class="a" data-info="178respon" style="--d:.6s;background:#E288B6;color:#141414"><span style="font:400 22px/1 var(--f-archivo-black),sans-serif;color:#075A2B">17+8</span><small style="font-family:var(--f-archivo),sans-serif;font-weight:500">Tuntutan pertama belum dipenuhi hingga tenggat (menurut pengusung)</small></div>
      <div class="a" data-info="exit" style="--d:.68s;background:#1C1C1C;color:#FFFFFF"><span style="font:800 17px/1.1 var(--f-poppins),sans-serif">#KaburAja<br>Dulu</span><small style="color:#FF6B72">Exit</small></div>
    </div>
  </div>
</section>

<!-- H. PERAN NEGARA & WARGA — dokumen -->
<section id="penutup" class="scene doc">
  <div class="wrap" style="gap:24px">
    <header class="stack a" style="gap:12px">
      <h2>Peran negara, peran warga</h2>
    </header>
    <div class="rows">
      <div class="a" style="--d:.15s;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px 32px;padding:20px 0;border-bottom:1px solid var(--rule)"><span class="item" data-info="h1"><span style="color:var(--ac)">1 </span>Kerukunan pemerintah–rakyat</span><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Negara</span><span class="body">Membuka ruang dialog dan menanggapi aspirasi secara terbuka.</span></div><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Warga</span><span class="body">Menyampaikan kritik secara damai melalui pemberitahuan (<span data-info="uu9">UU 9/1998</span>).</span></div></div>
      <div class="a" style="--d:.3s;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px 32px;padding:20px 0;border-bottom:1px solid var(--rule)"><span class="item" data-info="h2"><span style="color:var(--ac)">2 </span>Proporsional antarkekuasaan</span><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Negara</span><span class="body">Menjaga keseimbangan pembentuk undang-undang dan Mahkamah Konstitusi.</span></div><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Warga</span><span class="body">Mengawasi proses legislasi dan memakai jalur konstitusional.</span></div></div>
      <div class="a" style="--d:.45s;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px 32px;padding:20px 0;border-bottom:1px solid var(--rule)"><span class="item" data-info="h3"><span style="color:var(--ac)">3 </span>Musyawarah dulu, peradilan terakhir</span><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Negara</span><span class="body">Melibatkan publik sebelum pengesahan, bukan sesudahnya.</span></div><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Warga</span><span class="body">Mendahulukan dialog; menempuh peradilan sebagai upaya terakhir.</span></div></div>
      <div class="a" style="--d:.6s;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px 32px;padding:20px 0;border-bottom:1px solid var(--rule)"><span class="item" data-info="h4"><span style="color:var(--ac)">4 </span>Keseimbangan hak dan kewajiban</span><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Negara</span><span class="body">Menjamin hak <span data-info="p28e3">Pasal 28E</span>; membatasi hanya dengan undang-undang (<span data-info="p28j">Pasal 28J</span>).</span></div><div style="display:flex;flex-direction:column;gap:6px"><span class="ref">Warga</span><span class="body">Menunaikan <span data-info="p23a">pajak</span>, <span data-info="p27-1">menjunjung hukum</span>, dan <span data-info="uu3">bela negara sesuai profesi</span>.</span></div></div>
    </div>
  </div>
</section>

<!-- I. KESIMPULAN & SARAN — dokumen -->
<section id="simpulan" class="scene doc">
  <div class="wrap">
    <header class="stack a" style="gap:12px">
      <h2>Kesimpulan &amp; saran</h2>
    </header>
    <div class="split" style="grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:start">
      <div class="stack a" style="--d:.15s;gap:12px">
        <span class="eyebrow">Kesimpulan</span>
        <p style="margin:0;font:400 clamp(20px,1.8vw,25px)/1.45 var(--serif);text-wrap:pretty">Tujuh fenomena menunjukkan warga menjalankan perannya sebagai pengawas untuk menagih janji dalam Pembukaan UUD NRI 1945 — sebagian besar lewat <em>voice</em>, satu lewat <em>exit</em>. Hanya #PeringatanDarurat yang tercatat langsung mengubah keputusan legislatif. Dalam Negara Hukum Pancasila, kritik publik adalah bagian dari hubungan pemerintah dan rakyat, dan hak menyampaikan pendapat berjalan seiring dengan kewajiban warga.</p>
      </div>
      <div class="stack a" style="--d:.3s;gap:12px">
        <span class="eyebrow">Saran</span>
        <div class="rows" style="border-top-width:1px">
          <div style="display:flex;flex-direction:column;gap:6px;padding:14px 0;border-bottom:1px solid var(--rule)"><span class="item" style="color:var(--ac)">Bagi negara</span><span class="body">Membuka partisipasi publik sejak tahap perancangan undang-undang dan menanggapi tuntutan secara terbuka.</span></div>
          <div style="display:flex;flex-direction:column;gap:6px;padding:14px 0;border-bottom:1px solid var(--rule)"><span class="item" style="color:var(--ac)">Bagi warga</span><span class="body">Menyampaikan pendapat dengan pemberitahuan sesuai <span data-info="uu9">UU 9/1998</span>, berbasis data, dan menempuh jalur konstitusional.</span></div>
          <div style="display:flex;flex-direction:column;gap:6px;padding:14px 0;border-bottom:1px solid var(--rule)"><span class="item" style="color:var(--ac)">Bagi mahasiswa</span><span class="body">Menjalankan bela negara sesuai profesi (<span data-info="uu3">UU 3/2002 Pasal 9</span>) melalui kajian, literasi hukum, dan pengawasan kebijakan.</span></div>
        </div>
      </div>
    </div>
    <footer class="a" style="--d:.45s;display:flex;flex-direction:column;gap:8px;padding-top:18px;border-top:1px solid var(--rule);font:400 12px/1.6 var(--mono);opacity:.85">
      <span style="letter-spacing:.14em;text-transform:uppercase">Rujukan</span>
      <span>UUD NRI 1945 (Pembukaan; Pasal 23A, 27, 28E, 28J, 30) · UU No. 9 Tahun 1998 · UU No. 3 Tahun 2002 · Putusan MK No. 60/PUU-XXII/2024 dan 70/PUU-XXII/2024 · Hadjon (1987) · Hirschman (1970) · Survei JobStreet (2023)</span>
      <span>Gambar: WALHI · TEMPO.CO · Tempo · CNN Indonesia · unggahan publik #PeringatanDarurat, 17+8, #KaburAjaDulu</span>
      <span>MPK60006 Kewarganegaraan · Universitas Brawijaya</span>
    </footer>
  </div>
</section>

</main>

<!-- shared explanation card for every [data-info] (native popover: Esc / click outside closes) -->
<div id="info" popover role="dialog" aria-labelledby="infoTitle">
  <button class="close" popovertarget="info" popovertargetaction="hide">Tutup</button>
  <span class="kind" id="infoKind"></span>
  <h3 id="infoTitle"></h3>
  <div class="body" id="infoBody"></div>
  <p class="src" id="infoSrc"></p>
</div>`;
