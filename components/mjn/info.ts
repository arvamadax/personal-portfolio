// Explanation cards for every [data-info] in index.html.
// k = label, t = title, b = body (HTML), s = source line.
export const INFO: Record<string, { k: string; t: string; b: string; s: string }> = {

  /* ---------- Pembukaan UUD NRI 1945: empat janji negara ---------- */
  janji1: {
    k: 'Pembukaan UUD NRI 1945 · alinea keempat', t: 'Melindungi segenap bangsa Indonesia',
    b: `<blockquote>“…membentuk suatu Pemerintah Negara Indonesia yang melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia…”</blockquote>
<p>Janji pertama: negara wajib menjamin keamanan dan keselamatan <b>setiap</b> warga, termasuk rasa aman dari kekerasan aparat, serta melindungi seluruh wilayah.</p>
<p>Dalam presentasi ini, janji ini ditagih lewat tuntutan penghentian kekerasan aparat (17+8) dan penolakan perluasan peran militer di ranah sipil (revisi UU TNI).</p>`,
    s: 'Pembukaan UUD NRI 1945, alinea keempat.' },
  janji2: {
    k: 'Pembukaan UUD NRI 1945 · alinea keempat', t: 'Memajukan kesejahteraan umum',
    b: `<blockquote>“…dan untuk memajukan kesejahteraan umum…”</blockquote>
<p>Negara berkewajiban menciptakan kondisi ekonomi yang adil, seperti lapangan kerja, upah layak, dan jaminan sosial.</p>
<p>Ditagih lewat penolakan UU Cipta Kerja (hak buruh), tuntutan upah layak dan pencegahan PHK (17+8), serta #KaburAjaDulu yang lahir dari sulitnya mencari kerja layak di dalam negeri.</p>`,
    s: 'Pembukaan UUD NRI 1945, alinea keempat.' },
  janji3: {
    k: 'Pembukaan UUD NRI 1945 · alinea keempat', t: 'Mencerdaskan kehidupan bangsa',
    b: `<blockquote>“…mencerdaskan kehidupan bangsa…”</blockquote>
<p>Negara wajib menjamin pendidikan yang bermutu dan terjangkau, termasuk kesejahteraan pendidik.</p>
<p>Ditagih dalam #IndonesiaGelap: penolakan pemangkasan anggaran (Inpres 1/2025) yang ikut menyentuh sektor pendidikan, serta tuntutan pembayaran tunjangan kinerja dosen.</p>`,
    s: 'Pembukaan UUD NRI 1945, alinea keempat.' },
  janji4: {
    k: 'Pembukaan UUD NRI 1945 · alinea keempat', t: 'Ikut melaksanakan ketertiban dunia',
    b: `<blockquote>“…dan ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial…”</blockquote>
<p>Indonesia berperan aktif menjaga perdamaian internasional, antara lain lewat politik luar negeri bebas-aktif dan misi perdamaian.</p>
<p>Relevan dengan #KaburAjaDulu: WNI di luar negeri tetap berhak atas perlindungan negara, sehingga pemerintah menekankan jalur migrasi yang resmi.</p>`,
    s: 'Pembukaan UUD NRI 1945, alinea keempat.' },

  /* ---------- UUD NRI 1945: kewajiban & hak ---------- */
  p23a: {
    k: 'UUD NRI 1945', t: 'Pasal 23A: pajak',
    b: `<blockquote>“Pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang.”</blockquote>
<p><b>Artinya:</b> membayar pajak adalah kewajiban warga, tetapi negara hanya boleh memungutnya berdasarkan undang-undang, yang dibuat bersama wakil rakyat (DPR).</p>
<p><b>Kaitannya:</b> karena rakyat membiayai negara lewat pajak, rakyat berhak menagih transparansi penggunaan anggaran. Inilah dasar tuntutan transparansi anggaran DPR (17+8) dan MBG (#IndonesiaGelap).</p>`,
    s: 'UUD NRI 1945 Pasal 23A (Perubahan Ketiga, 2001).' },
  'p27-1': {
    k: 'UUD NRI 1945', t: 'Pasal 27 ayat (1): menjunjung hukum',
    b: `<blockquote>“Segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan dan wajib menjunjung hukum dan pemerintahan itu dengan tidak ada kecualinya.”</blockquote>
<p><b>Dua sisi:</b> (1) <i>hak</i>: semua warga setara di depan hukum, termasuk pejabat; (2) <i>kewajiban</i>: semua warga wajib mematuhi hukum, tanpa pengecualian.</p>
<p><b>Kaitannya:</b> aksi kritik publik tetap harus tertib hukum (mis. pemberitahuan sesuai UU 9/1998), dan aparat yang melanggar hukum pun wajib diproses. Hal kedua ini dituntut dalam 17+8.</p>`,
    s: 'UUD NRI 1945 Pasal 27 ayat (1).' },
  'p27-3': {
    k: 'UUD NRI 1945', t: 'Pasal 27 ayat (3): bela negara',
    b: `<blockquote>“Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara.”</blockquote>
<p><b>Artinya:</b> bela negara adalah hak sekaligus kewajiban. Bentuknya tidak harus militer; bisa lewat profesi, pendidikan, dan kepedulian terhadap arah kebijakan (lihat UU 3/2002 Pasal 9).</p>
<p><b>Kaitannya:</b> dalam kerangka Hirschman, ini wilayah <i>loyalty</i>: mengkritik kebijakan juga bisa dibaca sebagai bentuk bela negara.</p>`,
    s: 'UUD NRI 1945 Pasal 27 ayat (3) (Perubahan Kedua, 2000).' },
  'p30-1': {
    k: 'UUD NRI 1945', t: 'Pasal 30 ayat (1): pertahanan & keamanan',
    b: `<blockquote>“Tiap-tiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara.”</blockquote>
<p><b>Artinya:</b> pertahanan negara bukan monopoli TNI. Pasal 30 ayat (2) menyebut sistem pertahanan rakyat semesta, yaitu TNI dan Polri sebagai kekuatan utama dan rakyat sebagai kekuatan pendukung.</p>
<p><b>Kaitannya:</b> perdebatan revisi UU TNI adalah soal batas: di mana peran militer berhenti dan ranah sipil dimulai.</p>`,
    s: 'UUD NRI 1945 Pasal 30 ayat (1) dan (2).' },
  p28e1: {
    k: 'UUD NRI 1945', t: 'Pasal 28E ayat (1): bebas memilih pekerjaan & tempat tinggal',
    b: `<blockquote>“Setiap orang bebas memeluk agama dan beribadat menurut agamanya, memilih pendidikan dan pengajaran, memilih pekerjaan, memilih kewarganegaraan, memilih tempat tinggal di wilayah negara dan meninggalkannya, serta berhak kembali.”</blockquote>
<p><b>Artinya:</b> merantau atau bekerja di luar negeri adalah <b>hak konstitusional</b>, dan hak untuk kembali juga dijamin.</p>
<p><b>Kaitannya:</b> karena itu #KaburAjaDulu sah secara hukum. Pernyataan “kalau perlu jangan balik lagi” justru bertentangan dengan frasa “serta berhak kembali”.</p>`,
    s: 'UUD NRI 1945 Pasal 28E ayat (1) (Perubahan Kedua, 2000).' },
  p28e3: {
    k: 'UUD NRI 1945', t: 'Pasal 28E ayat (3): berserikat & berpendapat',
    b: `<blockquote>“Setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat.”</blockquote>
<p><b>Artinya:</b> tagar, unggahan, unjuk rasa, dan “piknik” di depan DPR adalah bentuk mengeluarkan pendapat yang dilindungi konstitusi.</p>
<p><b>Batasnya:</b> hak ini dijalankan dengan menghormati hak orang lain dan hanya dapat dibatasi dengan undang-undang (Pasal 28J). Tata caranya diatur UU 9/1998.</p>`,
    s: 'UUD NRI 1945 Pasal 28E ayat (3).' },
  p28j: {
    k: 'UUD NRI 1945', t: 'Pasal 28J: batas hak asasi',
    b: `<blockquote>(1) “Setiap orang wajib menghormati hak asasi manusia orang lain dalam tertib kehidupan bermasyarakat, berbangsa, dan bernegara.”</blockquote>
<blockquote>(2) “Dalam menjalankan hak dan kebebasannya, setiap orang wajib tunduk kepada pembatasan yang ditetapkan dengan undang-undang dengan maksud semata-mata untuk menjamin pengakuan serta penghormatan atas hak dan kebebasan orang lain dan untuk memenuhi tuntutan yang adil sesuai dengan pertimbangan moral, nilai-nilai agama, keamanan, dan ketertiban umum dalam suatu masyarakat demokratis.”</blockquote>
<p><b>Artinya:</b> hak berpendapat tidak mutlak, tetapi pembatasannya harus lewat <b>undang-undang</b>, bukan kehendak pejabat atau aparat.</p>`,
    s: 'UUD NRI 1945 Pasal 28J ayat (1) dan (2).' },

  /* ---------- Undang-undang ---------- */
  uu9: {
    k: 'Undang-undang', t: 'UU No. 9 Tahun 1998: kemerdekaan menyampaikan pendapat di muka umum',
    b: `<p>Lahir di awal Reformasi 1998 untuk menjamin kebebasan berpendapat di ruang publik.</p>
<ul>
<li><b>Bentuk</b> (Pasal 9): unjuk rasa/demonstrasi, pawai, rapat umum, dan mimbar bebas.</li>
<li><b>Pemberitahuan, bukan izin</b> (Pasal 10): disampaikan tertulis kepada Polri paling lambat 3 × 24 jam sebelum kegiatan.</li>
<li><b>Tempat terlarang</b>: antara lain lingkungan istana kepresidenan, tempat ibadah, instalasi militer, rumah sakit, pelabuhan, bandara, stasiun, terminal, dan objek vital nasional.</li>
<li><b>Kewajiban peserta</b>: menghormati hak orang lain, menaati hukum, menjaga ketertiban umum.</li>
</ul>
<p><b>Kaitannya:</b> polisi tidak berwenang “melarang” aksi yang sudah diberitahukan; tugasnya mengamankan. Karena itu, kekerasan terhadap demonstran menjadi pokok tuntutan 17+8.</p>`,
    s: 'UU No. 9 Tahun 1998 tentang Kemerdekaan Menyampaikan Pendapat di Muka Umum.' },
  uu3: {
    k: 'Undang-undang', t: 'UU No. 3 Tahun 2002, Pasal 9: bela negara sesuai profesi',
    b: `<blockquote>(1) “Setiap warga negara berhak dan wajib ikut serta dalam upaya bela negara yang diwujudkan dalam penyelenggaraan pertahanan negara.”</blockquote>
<p>Pasal 9 ayat (2) menyebut empat jalur keikutsertaan:</p>
<ul><li>a. pendidikan kewarganegaraan;</li><li>b. pelatihan dasar kemiliteran secara wajib;</li><li>c. pengabdian sebagai prajurit TNI secara sukarela atau wajib;</li><li><b>d. pengabdian sesuai dengan profesi.</b></li></ul>
<p><b>Kaitannya:</b> jalur (d) berarti mahasiswa membela negara lewat kajian, literasi hukum, dan pengawasan kebijakan, sehingga tidak harus mengangkat senjata.</p>`,
    s: 'UU No. 3 Tahun 2002 tentang Pertahanan Negara, Pasal 9.' },

  /* ---------- Hadjon: Negara Hukum Pancasila ---------- */
  hadjon: {
    k: 'Teori · Philipus M. Hadjon (1987)', t: 'Negara Hukum Pancasila',
    b: `<p>Dalam <i>Perlindungan Hukum bagi Rakyat di Indonesia</i> (1987), Hadjon membedakan Negara Hukum Pancasila dari <i>rechtsstaat</i> (Eropa kontinental) dan <i>rule of law</i> (Anglo-Saxon). Titik beratnya bukan pertentangan negara dan individu, melainkan <b>kerukunan</b> antara pemerintah dan rakyat.</p>
<p>Empat unsurnya:</p>
<ul><li>keserasian hubungan pemerintah dan rakyat berdasarkan asas kerukunan;</li><li>hubungan fungsional yang proporsional antarkekuasaan negara;</li><li>penyelesaian sengketa secara musyawarah, peradilan sebagai sarana terakhir;</li><li>keseimbangan antara hak dan kewajiban.</li></ul>
<p>Keempatnya dipakai sebagai lensa untuk menilai tujuh fenomena kritik publik.</p>`,
    s: 'Hadjon, P. M. (1987). Perlindungan Hukum bagi Rakyat di Indonesia. Surabaya: Bina Ilmu.' },
  h1: {
    k: 'Unsur 1 · Hadjon', t: 'Kerukunan hubungan pemerintah dan rakyat',
    b: `<p>Pemerintah dan rakyat idealnya adalah mitra, bukan lawan. Kritik publik justru jalur agar hubungan itu tetap serasi, asalkan pemerintah <b>mendengar</b> dan rakyat menyampaikannya secara damai.</p>
<p><b>Dalam fenomena:</b> respons pejabat yang meremehkan (mis. “kalau perlu jangan balik lagi” pada #KaburAjaDulu) merusak unsur ini. Respons yang introspektif (“tantangan untuk menciptakan lapangan kerja”) memperkuatnya.</p>`,
    s: 'Diolah dari Hadjon (1987).' },
  h2: {
    k: 'Unsur 2 · Hadjon', t: 'Hubungan fungsional yang proporsional antarkekuasaan',
    b: `<p>Legislatif, eksekutif, dan yudikatif saling mengimbangi (<i>checks and balances</i>); tidak ada lembaga yang boleh mengabaikan lembaga lain.</p>
<p><b>Dalam fenomena:</b> #PeringatanDarurat muncul saat DPR berupaya merevisi UU Pilkada sehari setelah putusan MK, sehingga dinilai mengabaikan putusan MK. Pada Cipta Kerja, MK justru mengoreksi pembentuk undang-undang.</p>`,
    s: 'Diolah dari Hadjon (1987).' },
  h3: {
    k: 'Unsur 3 · Hadjon', t: 'Musyawarah dulu, peradilan sebagai sarana terakhir',
    b: `<p>Perbedaan pendapat sebaiknya diselesaikan lewat dialog dan partisipasi sejak awal. Pengadilan (termasuk uji materi di MK) adalah jalan terakhir.</p>
<p><b>Dalam fenomena:</b> UU KPK, Cipta Kerja, dan UU TNI dikritik karena dibahas cepat dan minim partisipasi publik, sehingga musyawarah terlewati dan sengketa berakhir di jalan dan di MK.</p>`,
    s: 'Diolah dari Hadjon (1987).' },
  h4: {
    k: 'Unsur 4 · Hadjon', t: 'Keseimbangan antara hak dan kewajiban',
    b: `<p>Warga menuntut hak (berpendapat, bekerja, rasa aman) sekaligus menjalankan kewajiban (pajak, menjunjung hukum, bela negara). Negara pun punya kewajiban memenuhi janjinya.</p>
<p><b>Dalam fenomena:</b> 17+8 menekankan kewajiban negara (transparansi anggaran, penghentian kekerasan). #KaburAjaDulu menunjukkan warga memakai haknya (Pasal 28E ayat 1) saat kewajiban negara di bidang kesejahteraan dirasa belum terpenuhi.</p>`,
    s: 'Diolah dari Hadjon (1987).' },

  /* ---------- Tiga peran warga ---------- */
  peran1: {
    k: 'Peran warga', t: 'Pemegang kedaulatan',
    b: `<blockquote>“Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar.” (Pasal 1 ayat (2) UUD NRI 1945)</blockquote>
<p>Kekuasaan pejabat berasal dari rakyat melalui pemilu. Karena itu, rakyat berhak menagih janji yang dibuat atas namanya.</p>`,
    s: 'UUD NRI 1945 Pasal 1 ayat (2).' },
  peran2: {
    k: 'Peran warga', t: 'Pengawas',
    b: `<p>Di luar pemilu, warga mengawasi jalannya pemerintahan lewat kritik, tagar, unjuk rasa, dan uji materi. Dasarnya adalah Pasal 28E ayat (3) dan UU 9/1998.</p>
<p><b>Inilah peran yang paling terlihat dalam ketujuh fenomena</b>: warga menjadi pengawas legislasi (UU KPK, Cipta Kerja, UU Pilkada, UU TNI) dan anggaran (Inpres 1/2025, tunjangan DPR).</p>`,
    s: 'Diolah dari UUD NRI 1945 Pasal 28E ayat (3) dan UU 9/1998.' },
  peran3: {
    k: 'Peran warga', t: 'Pelaksana kewajiban',
    b: `<p>Warga juga wajib membayar pajak (Pasal 23A), menjunjung hukum (Pasal 27 ayat 1), dan ikut membela negara (Pasal 27 ayat 3, Pasal 30 ayat 1).</p>
<p>Menjalankan kewajiban inilah yang memberi warga legitimasi moral untuk menagih janji negara.</p>`,
    s: 'UUD NRI 1945 Pasal 23A, 27, 30.' },

  /* ---------- 01 #ReformasiDikorupsi ---------- */
  uukpk: {
    k: '#ReformasiDikorupsi · tuntutan', t: 'Tolak revisi UU KPK',
    b: `<p>Pada September 2019, DPR dan pemerintah membahas revisi UU No. 30 Tahun 2002 tentang KPK dalam waktu sangat singkat, menjelang akhir masa jabatan DPR 2014–2019.</p>
<p>Poin yang dinilai <b>melemahkan KPK</b>:</p>
<ul><li>pembentukan <b>Dewan Pengawas</b> yang berwenang atas penyadapan, penggeledahan, dan penyitaan;</li><li>pegawai KPK dialihkan menjadi <b>ASN</b>, sehingga independensinya dipertanyakan;</li><li>KPK boleh menghentikan penyidikan (<b>SP3</b>) bila perkara tidak selesai dalam 2 tahun.</li></ul>`,
    s: 'UU No. 19 Tahun 2019 tentang Perubahan Kedua atas UU No. 30 Tahun 2002 tentang KPK.' },
  rkuhp: {
    k: '#ReformasiDikorupsi · tuntutan', t: 'Tolak RKUHP',
    b: `<p>RKUHP 2019 dijadwalkan disahkan pada akhir September 2019. Sejumlah pasalnya dinilai mengancam kebebasan sipil dan terlalu jauh masuk ke ranah privat, antara lain pasal <b>penghinaan presiden</b>, penghinaan lembaga negara, dan pidana <b>kohabitasi</b>.</p>
<p><b>Hasil:</b> pada 20 September 2019, Presiden meminta DPR <b>menunda</b> pengesahan RKUHP. RKUHP baru disahkan pada Desember 2022 menjadi UU No. 1 Tahun 2023, yang berlaku mulai 2 Januari 2026.</p>`,
    s: 'UU No. 1 Tahun 2023 tentang KUHP; pemberitaan September 2019.' },
  uukpk19: {
    k: '#ReformasiDikorupsi · hasil', t: 'Revisi UU KPK tetap disahkan',
    b: `<p>DPR mengesahkan revisi UU KPK dalam rapat paripurna <b>17 September 2019</b>, beberapa hari sebelum gelombang aksi mahasiswa 23–30 September 2019. Revisi itu berlaku sebagai UU No. 19 Tahun 2019.</p>
<p>Tuntutan agar Presiden menerbitkan Perppu pembatalan tidak dipenuhi. Jalur yang tersisa adalah uji materi di Mahkamah Konstitusi.</p>
<p><b>Makna bagi presentasi:</b> <i>voice</i> yang kuat di jalan tidak otomatis mengubah keputusan legislatif. Ini salah satu dari enam fenomena yang tidak mengubah keputusan secara langsung.</p>`,
    s: 'UU No. 19 Tahun 2019; pemberitaan September 2019.' },

  /* ---------- 02 Cipta Kerja ---------- */
  ciptaker: {
    k: 'Penolakan UU Cipta Kerja', t: '5 Oktober 2020: UU Cipta Kerja disahkan',
    b: `<p>DPR mengesahkan RUU Cipta Kerja dalam rapat paripurna 5 Oktober 2020, kemudian diundangkan sebagai <b>UU No. 11 Tahun 2020</b>. Undang-undang ini memakai metode <i>omnibus law</i>: satu UU mengubah puluhan UU sekaligus.</p>
<p>Menurut infografis TEMPO, KSPI menolak antara lain karena:</p>
<ul><li>upah minimum kabupaten/kota (UMK) dibuat bersyarat dan UMSK dihapus;</li><li>pesangon dikurangi dari 32 menjadi 25 kali upah;</li><li>kontrak (PKWT) dan <i>outsourcing</i> tanpa batas waktu;</li><li>hak cuti dan upah atas cuti terancam.</li></ul>`,
    s: 'UU No. 11 Tahun 2020 tentang Cipta Kerja; infografis TEMPO.CO (KSPI).' },
  mk91: {
    k: 'Putusan MK', t: 'Putusan MK No. 91/PUU-XVIII/2020: inkonstitusional bersyarat',
    b: `<p>Pada <b>25 November 2021</b>, Mahkamah Konstitusi menyatakan UU Cipta Kerja cacat formil dan <b>inkonstitusional bersyarat</b>:</p>
<ul><li>UU tetap berlaku, tetapi wajib diperbaiki dalam <b>2 tahun</b>; bila tidak, menjadi inkonstitusional permanen;</li><li>pemerintah dilarang menerbitkan peraturan pelaksana baru dan menangguhkan kebijakan strategis yang berdampak luas.</li></ul>
<p><b>Alasan MK:</b> metode omnibus belum dikenal dalam UU pembentukan peraturan, ada perubahan materi setelah persetujuan bersama, dan <b>minim partisipasi publik yang bermakna</b>.</p>
<p><b>Sesudahnya:</b> pemerintah menerbitkan Perppu No. 2 Tahun 2022, yang kemudian ditetapkan menjadi UU No. 6 Tahun 2023.</p>`,
    s: 'Putusan MK No. 91/PUU-XVIII/2020; UU No. 6 Tahun 2023.' },

  /* ---------- 03 #PeringatanDarurat ---------- */
  mk6070: {
    k: 'Putusan MK · 20 Agustus 2024', t: 'Putusan MK No. 60 dan 70/PUU-XXII/2024',
    b: `<p><b>Putusan 60:</b> mengubah <b>ambang batas pencalonan</b> kepala daerah. Partai atau gabungan partai cukup memenuhi persentase suara sah tertentu (6,5–10%, sesuai jumlah pemilih), sehingga partai tanpa kursi DPRD pun bisa mengusung calon. Sebelumnya syaratnya 20% kursi DPRD atau 25% suara.</p>
<p><b>Putusan 70:</b> <b>syarat usia</b> calon kepala daerah (30 tahun untuk gubernur, 25 tahun untuk bupati/wali kota) dihitung saat <b>penetapan pasangan calon</b> oleh KPU, bukan saat pelantikan.</p>
<p>Kedua putusan membuka persaingan Pilkada 2024 yang lebih luas.</p>`,
    s: 'Putusan MK No. 60/PUU-XXII/2024 dan No. 70/PUU-XXII/2024.' },
  pdviral: {
    k: '#PeringatanDarurat · 21 Agustus 2024', t: 'Unggahan “Peringatan Darurat” beredar',
    b: `<p>Sehari setelah putusan MK, Badan Legislasi DPR membahas revisi UU Pilkada yang dinilai <b>menganulir</b> putusan MK: ambang batas baru hanya untuk partai tanpa kursi, dan syarat usia mengikuti putusan MA (dihitung saat pelantikan).</p>
<p>Warganet membalas dengan gambar Garuda di layar biru bertuliskan “Peringatan Darurat”, bergaya siaran darurat televisi lama. Gambar ini beredar masif di X, Instagram, dan TikTok, termasuk diunggah akun-akun media dan tokoh publik.</p>`,
    s: 'Pemberitaan 21 Agustus 2024.' },
  pdhasil: {
    k: '#PeringatanDarurat · hasil', t: 'Aksi 22 Agustus 2024: revisi UU Pilkada batal disahkan',
    b: `<p>Pada 22 Agustus 2024, mahasiswa, buruh, akademisi, dan masyarakat sipil berunjuk rasa di depan DPR dan di banyak kota. Rapat paripurna pengesahan revisi UU Pilkada <b>ditunda karena tidak kuorum</b>, lalu pimpinan DPR menyatakan revisi <b>batal disahkan</b>.</p>
<p>KPU kemudian menyusun aturan pencalonan sesuai putusan MK.</p>
<p><b>Makna bagi presentasi:</b> satu-satunya dari tujuh fenomena yang tercatat <b>langsung</b> mengubah keputusan legislatif. <i>Voice</i> berhasil karena didukung putusan lembaga yudikatif (unsur 2 Hadjon).</p>`,
    s: 'Pemberitaan 22 Agustus 2024.' },

  /* ---------- 04 #IndonesiaGelap ---------- */
  gelap: {
    k: 'Fenomena 04 · 17–20 Februari 2025', t: '#IndonesiaGelap',
    b: `<p>Aksi yang dimotori <b>BEM SI</b> di Jakarta dan berbagai kota. “Gelap” melambangkan kekhawatiran akan masa depan: pemangkasan anggaran, program prioritas yang dinilai tidak transparan, dan kebijakan yang dibuat tanpa partisipasi.</p>
<p>Sampul Tempo edisi 19 Februari 2025 mengangkat judul yang sama, sehingga istilah ini makin meluas.</p>
<p><b>Tanggapan pemerintah:</b> Ketua Dewan Ekonomi Nasional Luhut Binsar Pandjaitan menanggapi, “yang gelap kau, bukan Indonesia.”</p>
<p><b>Hasil:</b> tidak tercatat mengubah keputusan kebijakan secara langsung.</p>`,
    s: 'Pemberitaan Februari 2025; sampul Tempo 19 Februari 2025.' },
  inpres1: {
    k: '#IndonesiaGelap', t: 'Inpres No. 1 Tahun 2025: efisiensi belanja Rp306,69 triliun',
    b: `<p>Instruksi Presiden tentang Efisiensi Belanja dalam Pelaksanaan APBN dan APBD Tahun Anggaran 2025, ditandatangani 22 Januari 2025. Targetnya penghematan <b>Rp306,69 triliun</b>:</p>
<ul><li>Rp256,1 triliun dari belanja kementerian/lembaga;</li><li>Rp50,59 triliun dari transfer ke daerah.</li></ul>
<p><b>Mengapa ditolak:</b> pemangkasan menyentuh layanan publik, pendidikan, dan riset, sementara alokasi hasil efisiensi dinilai kurang terbuka.</p>`,
    s: 'Inpres No. 1 Tahun 2025.' },
  mbg: {
    k: '#IndonesiaGelap · tuntutan', t: 'Transparansi Makan Bergizi Gratis (MBG)',
    b: `<p>MBG adalah program prioritas pemerintah yang mulai berjalan 6 Januari 2025 di bawah Badan Gizi Nasional.</p>
<p>Mahasiswa tidak menolak tujuannya (gizi anak), tetapi menuntut <b>transparansi</b>: besaran dan sumber anggaran (termasuk kaitannya dengan efisiensi), mekanisme pengadaan, dan evaluasi pelaksanaannya.</p>
<p><b>Kaitannya:</b> Pasal 23A. Anggaran berasal dari pajak rakyat, sehingga rakyat berhak tahu penggunaannya.</p>`,
    s: 'Pemberitaan Januari–Februari 2025.' },
  tukin: {
    k: '#IndonesiaGelap · tuntutan', t: 'Tunjangan kinerja dosen dan tendik',
    b: `<p>Dosen ASN di lingkungan kementerian pendidikan tinggi mempersoalkan <b>tunjangan kinerja (tukin) yang tidak dibayarkan sejak 2020</b>, sementara ASN di instansi lain menerimanya. Dosen yang tergabung dalam aliansi dosen ASN berunjuk rasa pada awal Februari 2025.</p>
<p><b>Kaitannya:</b> janji <i>mencerdaskan kehidupan bangsa</i> sulit ditepati bila kesejahteraan pendidik diabaikan.</p>`,
    s: 'Pemberitaan Januari–Februari 2025.' },

  /* ---------- 05 Revisi UU TNI ---------- */
  uutni: {
    k: 'Fenomena 05 · Maret 2025', t: 'Revisi UU No. 34 Tahun 2004 tentang TNI',
    b: `<p>DPR mengesahkan revisi UU TNI pada <b>20 Maret 2025</b>. Setelah ditandatangani Presiden, revisi ini menjadi <b>UU No. 3 Tahun 2025</b>.</p>
<p><b>Mengapa ditolak:</b></p>
<ul><li>pembahasan berlangsung cepat dan dinilai tertutup, termasuk rapat di hotel;</li><li>jabatan sipil untuk prajurit aktif bertambah (Pasal 47);</li><li>tugas operasi militer selain perang meluas (Pasal 7);</li><li>kekhawatiran kembalinya <b>dwifungsi</b>.</li></ul>
<p>Klik tiap label pasal untuk rinciannya.</p>`,
    s: 'UU No. 3 Tahun 2025 tentang Perubahan atas UU No. 34 Tahun 2004 tentang TNI.' },
  dwifungsi: {
    k: 'Revisi UU TNI · konteks', t: 'Dwifungsi militer',
    b: `<p>Doktrin masa Orde Baru: ABRI berfungsi ganda, sebagai kekuatan <b>pertahanan-keamanan</b> sekaligus kekuatan <b>sosial-politik</b>. Akibatnya perwira aktif menduduki kursi DPR, jabatan gubernur, bupati, dan birokrasi sipil.</p>
<p>Reformasi 1998 menghapus dwifungsi: TNI dan Polri dipisah (TAP MPR VI & VII/2000), dan UU 34/2004 menegaskan TNI sebagai alat pertahanan yang profesional.</p>
<p><b>Kekhawatirannya:</b> perluasan jabatan sipil bagi prajurit aktif dinilai membuka jalan mundur ke arah itu.</p>`,
    s: 'TAP MPR No. VI/MPR/2000 dan No. VII/MPR/2000; UU No. 34 Tahun 2004.' },
  piknik: {
    k: 'Revisi UU TNI · bentuk aksi', t: '“Piknik melawan”',
    b: `<p>Bentuk protes damai: anak muda mendirikan tenda dan “berpiknik” di depan gerbang DPR. Mereka membaca buku, memasak, berdiskusi, dan mendukung pedagang kaki lima di sekitar lokasi.</p>
<p>Idenya muncul dari diskusi di platform X yang dihimpun akun <b>@BarengWarga</b>. Aksi serupa berlanjut hingga April 2025.</p>
<p><b>Kaitannya:</b> contoh <i>voice</i> yang kreatif dan damai, sesuai semangat UU 9/1998.</p>`,
    s: 'Tempo, “Cara Baru Demonstrasi: Piknik Melawan Revisi UU TNI” (2025).' },
  tni3: {
    k: 'UU TNI · Pasal 3', t: 'Kedudukan TNI',
    b: `<p><b>Perubahan:</b> kebijakan dan strategi pertahanan, serta dukungan administrasi yang berkaitan dengan aspek perencanaan strategis TNI, berada dalam <b>koordinasi Kementerian Pertahanan</b>.</p>
<p>Pengerahan dan penggunaan kekuatan militer tetap di bawah <b>Presiden</b>.</p>
<p><b>Sorotan:</b> pembagian kewenangan TNI–Kemhan menentukan seberapa kuat kendali sipil atas militer.</p>`,
    s: 'UU No. 3 Tahun 2025, Pasal 3; infografis CNN Indonesia.' },
  tni7: {
    k: 'UU TNI · Pasal 7', t: 'Operasi militer selain perang (OMSP)',
    b: `<p><b>Perubahan:</b> tugas pokok OMSP bertambah dari <b>14 menjadi 16</b>. Tambahannya:</p>
<ul><li>membantu menanggulangi <b>ancaman siber</b> (pertahanan);</li><li>membantu melindungi dan menyelamatkan <b>WNI serta kepentingan nasional di luar negeri</b>.</li></ul>
<p>Pada tahap pembahasan (infografis CNN), sempat diusulkan juga tugas membantu penanggulangan narkotika.</p>
<p><b>Sorotan:</b> makin luas OMSP, makin banyak ruang militer masuk ke urusan sipil.</p>`,
    s: 'UU No. 3 Tahun 2025, Pasal 7; infografis CNN Indonesia (versi pembahasan).' },
  tni47: {
    k: 'UU TNI · Pasal 47', t: 'Prajurit aktif di jabatan sipil: 10 → 14 K/L',
    b: `<p>Prajurit aktif dapat menduduki jabatan di <b>14</b> kementerian/lembaga (sebelumnya 10), atas permintaan instansi tersebut:</p>
<ul><li>Kemenko Polkam; Kemhan termasuk Dewan Pertahanan Nasional; Kesetneg (sekretariat militer Presiden);</li><li>BIN; BSSN; Lemhannas; Basarnas; BNN; Mahkamah Agung;</li><li><b>Tambahan:</b> BNPP, BNPB, BNPT, Bakamla, dan Kejaksaan Agung (Jampidmil).</li></ul>
<p>Di luar daftar itu, prajurit harus mengundurkan diri atau pensiun.</p>
<p><b>Catatan:</b> infografis CNN memuat versi usulan (16 K/L); versi yang disahkan berisi 14.</p>`,
    s: 'UU No. 3 Tahun 2025, Pasal 47.' },
  tni53: {
    k: 'UU TNI · Pasal 53', t: 'Batas usia pensiun diperpanjang',
    b: `<ul><li>Bintara dan tamtama: <b>55 tahun</b></li><li>Perwira sampai kolonel: <b>58 tahun</b></li><li>Perwira tinggi bintang 1: <b>60 tahun</b></li><li>Bintang 2: <b>61 tahun</b></li><li>Bintang 3: <b>62 tahun</b></li><li>Bintang 4: <b>63 tahun</b>, dapat diperpanjang sesuai keputusan Presiden</li><li>Jabatan fungsional tertentu: hingga 65 tahun</li></ul>
<p><b>Sorotan:</b> masa dinas yang lebih panjang dikhawatirkan menambah perwira tanpa jabatan, lalu mendorong penempatan di jabatan sipil.</p>`,
    s: 'UU No. 3 Tahun 2025, Pasal 53; infografis CNN Indonesia.' },

  /* ---------- 06 17+8 ---------- */
  178: {
    k: 'Fenomena 06 · Agustus–September 2025', t: '17+8 Tuntutan Rakyat',
    b: `<p>Dirumuskan pada <b>1 September 2025</b> oleh enam pemengaruh media sosial: Salsa Erwina Hutagalung, Fathia Izzati, Abigail Limuria, Andovi da Lopez, Afutami, dan Jerome Polin. Isinya merangkum <b>211 tuntutan</b> dari organisasi masyarakat sipil, akademisi, dan serikat buruh.</p>
<p><b>Latar:</b> gelombang demonstrasi akhir Agustus 2025 soal tunjangan DPR, yang memuncak setelah <b>Affan Kurniawan</b>, pengemudi ojek daring, tewas terlindas kendaraan taktis polisi pada 28 Agustus 2025.</p>
<p><b>Struktur:</b> 17 tuntutan jangka pendek (tenggat 5 September 2025) dan 8 tuntutan jangka panjang (tenggat 31 Agustus 2026).</p>`,
    s: 'Wikipedia, “17+8 Tuntutan Rakyat”; Kompas, Tempo (September 2025).' },
  '178warna': {
    k: '17+8 · simbol', t: 'Pink dan hijau',
    b: `<p><b>Brave Pink</b>: menghormati para ibu yang ikut berunjuk rasa pada 28 Agustus 2025, termasuk seorang ibu berjilbab merah muda yang berdiri di depan barisan polisi.</p>
<p><b>Hero Green</b>: warna jaket pengemudi ojek daring, untuk mengenang Affan Kurniawan dan Rusdamdiansyah.</p>
<p>Slogan “Transparansi. Reformasi. Empati.” merangkum arah tuntutan: keterbukaan anggaran, pembenahan lembaga, dan kepekaan pejabat.</p>`,
    s: 'Wikipedia, “17+8 Tuntutan Rakyat”.' },
  '178pihak': {
    k: '17+8 · sasaran', t: 'Enam pihak yang dituju',
    b: `<p>Tujuh belas tuntutan jangka pendek dibagi ke enam pihak:</p>
<ul><li><b>Presiden</b>: 2 tuntutan (tim investigasi independen; tarik TNI dari pengamanan sipil)</li><li><b>DPR</b>: 3 tuntutan</li><li><b>Ketua umum partai politik</b>: 3 tuntutan</li><li><b>Polri</b>: 3 tuntutan</li><li><b>TNI</b>: 3 tuntutan</li><li><b>Kementerian sektor ekonomi</b>: 3 tuntutan</li></ul>`,
    s: 'Wikipedia, “17+8 Tuntutan Rakyat”.' },
  '178respon': {
    k: '17+8 · tanggapan', t: 'Apa yang sudah dipenuhi?',
    b: `<p>Hingga tenggat 5 September 2025, menurut platform pengusung, tuntutan pertama (tim investigasi independen) belum dipenuhi. Beberapa tanggapan yang tercatat:</p>
<ul><li><b>31 Agustus 2025</b>: DPR mencabut tunjangan perumahan dan memberlakukan moratorium kunjungan kerja ke luar negeri.</li><li><b>5 September 2025</b>: DPR memangkas penghasilan anggota dari sekitar Rp104 juta menjadi Rp65,5 juta per bulan.</li><li><b>11 September 2025</b>: Presiden menyetujui pembentukan tim investigasi independen atas kekerasan akhir Agustus dan reformasi kepolisian.</li></ul>
<p><b>Makna bagi presentasi:</b> sebagian tuntutan ditanggapi, tetapi setelah tenggat dan tidak mengubah undang-undang, sehingga dicatat sebagai perubahan <b>tidak langsung</b>.</p>`,
    s: 'Wikipedia, “17+8 Tuntutan Rakyat”; Kompas (4 September 2025).' },

  /* ---------- 07 #KaburAjaDulu ---------- */
  jobstreet: {
    k: '#KaburAjaDulu · data', t: '67% orang Indonesia berminat bekerja di luar negeri',
    b: `<p>Sumber: laporan <b>“Decoding Global Talent 2024”</b> oleh JobStreet by SEEK bersama Boston Consulting Group (BCG). Survei global ini menjaring sekitar 150.000 responden di 188 negara, termasuk <b>19.154 pekerja Indonesia</b>. Datanya dikumpulkan pada 2023.</p>
<ul><li>67% responden Indonesia bersedia pindah ke luar negeri untuk bekerja (rata-rata Asia Tenggara: 68%).</li><li>Angka ini turun dari 82% sebelum pandemi (2018).</li><li>Tujuan favorit: Jepang (32%), disusul Australia, Singapura, dan Jerman.</li></ul>
<p>Tagar #KaburAjaDulu ramai pada Februari 2025 sebagai ekspresi kekecewaan atas sulitnya mencari kerja layak di dalam negeri.</p>`,
    s: 'JobStreet by SEEK & BCG, Decoding Global Talent 2024.' },
  'kad-yassierli': {
    k: 'Tanggapan · 17 Februari 2025', t: 'Yassierli, Menteri Ketenagakerjaan',
    b: `<blockquote>“Ini tantangan buat kami kalau memang itu adalah terkait dengan aspirasi mereka. Ayo pemerintah <i>create better jobs</i>.”</blockquote>
<p>Sikap <b>introspektif</b>: tagar dibaca sebagai masukan bagi pemerintah. Ia juga meyakini sebagian besar warganet ingin meningkatkan keterampilan di luar negeri lalu kembali membangun negeri.</p>`,
    s: 'Kompas.com, 18 Februari 2025; ANTARA.' },
  'kad-karding': {
    k: 'Tanggapan · 17 Februari 2025', t: 'Abdul Kadir Karding, Menteri P2MI',
    b: `<blockquote>“Jadi dengan catatan, masyarakat yang memiliki keinginan (untuk) terlebih dahulu meningkatkan keterampilan dan kemampuannya.”</blockquote>
<p>Sikap <b>bersyarat</b>: menanggapi positif, dengan syarat bahasa asing, keterampilan, dan kesiapan mental. Bekerja ke luar negeri harus lewat <b>jalur prosedural</b> agar tercatat dan terlindungi negara.</p>`,
    s: 'ANTARA, 17 Februari 2025; BP2MI.' },
  'kad-christina': {
    k: 'Tanggapan · 18 Februari 2025', t: 'Christina Aryani, Wakil Menteri P2MI',
    b: `<blockquote>“Sah-sah saja WNI mencari penghidupan yang lebih baik.”</blockquote>
<p>Sikap <b>bersyarat</b>: menegaskan bahwa bekerja di luar negeri adalah hak setiap warga, sambil mengingatkan bahaya jalur nonprosedural dan migrasi ilegal.</p>`,
    s: 'ANTARA, 18 Februari 2025.' },
  'kad-hasan': {
    k: 'Tanggapan · 17 Februari 2025', t: 'Hasan Nasbi, Kepala Kantor Komunikasi Kepresidenan',
    b: `<blockquote>“Kalau mau merantau ke luar negeri, ingat, harus punya skill.”</blockquote>
<p>Sikap <b>bersyarat</b>: merantau dinilai baik selama disertai persiapan dan mengikuti prosedur resmi, agar tidak menjadi pekerja ilegal.</p>`,
    s: 'Kompas.com, 18 Februari 2025.' },
  'kad-noel': {
    k: 'Tanggapan · 17 Februari 2025', t: 'Immanuel Ebenezer, Wakil Menteri Ketenagakerjaan',
    b: `<blockquote>“Mau kabur, kabur sajalah. Kalau perlu jangan balik lagi.”</blockquote>
<p>Sikap <b>menyindir</b>. Pernyataan ini menuai kritik luas karena bertentangan dengan jaminan konstitusi bahwa warga yang meninggalkan wilayah negara <b>berhak kembali</b> (Pasal 28E ayat 1).</p>`,
    s: 'Kompas.com, 17 Februari 2025.' },
  'kad-nusron': {
    k: 'Tanggapan · 17 Februari 2025', t: 'Nusron Wahid, Menteri ATR/Kepala BPN',
    b: `<blockquote>“Kok jangan #KaburAjaDulu, apa yang mau kita selesaikan kalau kabur itu.”</blockquote>
<p>Sikap <b>menolak</b>: tren ini dinilai menunjukkan kurangnya sikap patriotik, dan warga diajak tetap di dalam negeri untuk ikut menyelesaikan masalah.</p>`,
    s: 'Kompas.com, 18 Februari 2025; Tempo.' },
  'kad-bahlil': {
    k: 'Tanggapan · Februari 2025', t: 'Bahlil Lahadalia, Menteri ESDM',
    b: `<p>Potongan video lama Bahlil yang <b>mempertanyakan nasionalisme</b> WNI yang memilih bekerja atau pindah ke luar negeri kembali beredar di tengah ramainya tagar.</p>
<p>Pernyataan ini dibalas banyak diaspora. Salah satunya seorang guru TK di Jerman yang menyatakan nasionalisme tidak ditentukan oleh lokasi, melainkan oleh apa yang dilakukan untuk negara.</p>`,
    s: 'Suara.com, 16 Februari 2025; Liputan6.' },

  /* ---------- Hirschman ---------- */
  hirschman: {
    k: 'Teori · Albert O. Hirschman (1970)', t: 'Exit, Voice, and Loyalty',
    b: `<p>Dalam bukunya <i>Exit, Voice, and Loyalty: Responses to Decline in Firms, Organizations, and States</i> (1970), Hirschman menjelaskan tiga respons anggota ketika organisasi, termasuk negara, menurun kinerjanya:</p>
<ul><li><b>Voice</b>: bersuara untuk memperbaiki dari dalam;</li><li><b>Exit</b>: keluar atau pergi;</li><li><b>Loyalty</b>: rasa keterikatan yang menahan orang untuk tidak langsung pergi, sehingga mendorong <i>voice</i>.</li></ul>
<p>Kerangka ini dipakai untuk memetakan tujuh fenomena.</p>`,
    s: 'Hirschman, A. O. (1970). Exit, Voice, and Loyalty. Harvard University Press.' },
  voice: {
    k: 'Hirschman', t: 'Voice: bersuara untuk mengubah',
    b: `<p>Warga tetap tinggal dan berusaha mengubah keadaan lewat kritik, tagar, petisi, unjuk rasa, dan uji materi.</p>
<p><b>Enam fenomena</b> masuk kategori ini: #ReformasiDikorupsi, Cipta Kerja, #PeringatanDarurat, #IndonesiaGelap, revisi UU TNI, dan 17+8.</p>
<p>Hasilnya beragam: satu mengubah keputusan secara langsung (#PeringatanDarurat), satu lewat putusan MK (Cipta Kerja), sisanya tidak secara langsung.</p>`,
    s: 'Diolah dari Hirschman (1970).' },
  exit: {
    k: 'Hirschman', t: 'Exit: keluar',
    b: `<p>Warga memilih pergi ketika merasa suaranya tidak didengar atau peluang di dalam negeri terbatas.</p>
<p><b>#KaburAjaDulu</b> adalah satu-satunya fenomena <i>exit</i>. Secara hukum sah (Pasal 28E ayat 1), dan menurut Hirschman menjadi <b>sinyal peringatan</b> bagi negara: bila warga terbaik memilih pergi, negara kehilangan sumber daya sekaligus suara kritisnya.</p>`,
    s: 'Diolah dari Hirschman (1970).' },
  loyalty: {
    k: 'Hirschman', t: 'Loyalty: keterikatan dan bela negara',
    b: `<p>Loyalitas membuat warga bertahan dan memilih bersuara daripada pergi. Dalam konteks Indonesia, loyalty berkaitan dengan kewajiban <b>bela negara</b> (Pasal 27 ayat 3, Pasal 30 ayat 1).</p>
<p><b>Perdebatannya:</b> apakah kritik keras dan merantau ke luar negeri berarti tidak loyal? UU 3/2002 Pasal 9 mengakui bela negara <b>sesuai profesi</b>, sehingga mengkritik dan berkarya di luar negeri pun bisa menjadi wujud loyalitas.</p>`,
    s: 'Diolah dari Hirschman (1970); UUD NRI 1945; UU 3/2002.' },

  /* ---------- Temuan ---------- */
  temuan: {
    k: 'Temuan', t: 'Mengapa hanya 1 dari 7?',
    b: `<p><b>Kriteria:</b> sebuah fenomena dihitung “mengubah keputusan legislatif secara langsung” bila tuntutannya membuat DPR membatalkan atau menunda pengesahan dalam waktu dekat setelah aksi.</p>
<ul><li><b>#PeringatanDarurat</b>: revisi UU Pilkada batal disahkan sehari setelah unggahan viral. <b>Langsung.</b></li><li><b>Cipta Kerja</b>: berubah lewat putusan MK, lebih dari setahun kemudian. <b>Tidak langsung.</b></li><li><b>17+8</b>: sebagian tuntutan ditanggapi (tunjangan DPR, tim investigasi), tetapi tidak mengubah undang-undang. <b>Tidak langsung.</b></li><li><b>UU KPK, UU TNI</b>: tetap disahkan.</li><li><b>#IndonesiaGelap, #KaburAjaDulu</b>: tidak tercatat mengubah keputusan.</li></ul>
<p>Catatan: RKUHP 2019 sempat ditunda setelah #ReformasiDikorupsi, tetapi tetap disahkan pada 2022.</p>`,
    s: 'Diolah dari seluruh sumber presentasi.' }
};
