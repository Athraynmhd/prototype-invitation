# Rekam Pengembangan — Mountain Wedding Invitation

**Tanggal rekap:** 16 Oktober 2026  
**Folder proyek:** `D:\WEDDING`  
**Nama paket:** `mountain-wedding-invitation` — `1.0.0`  
**Cakupan:** riwayat perubahan pada percakapan pengembangan ini, keputusan pengguna, kondisi implementasi terakhir, dan hasil verifikasi yang telah dilakukan.

Dokumen ini menjadi acuan untuk melanjutkan pengembangan tanpa kehilangan konteks. Bagian **riwayat** menjelaskan proses iterasi; bagian **pengaturan akhir** menjelaskan nilai yang digunakan saat rekap ini dibuat.

## Daftar isi

1. [Ringkasan kondisi akhir](#1-ringkasan-kondisi-akhir)
2. [Teknologi, halaman, dan struktur proyek](#2-teknologi-halaman-dan-struktur-proyek)
3. [Arahan desain dan keputusan pengguna](#3-arahan-desain-dan-keputusan-pengguna)
4. [Riwayat pengembangan](#4-riwayat-pengembangan)
5. [Sistem animasi dan pengaturan akhir](#5-sistem-animasi-dan-pengaturan-akhir)
6. [Layout responsif dan perbaikan gap](#6-layout-responsif-dan-perbaikan-gap)
7. [Katalog visual dan daftar 61 kode gambar](#7-katalog-visual-dan-daftar-61-kode-gambar)
8. [Prosedur penggantian gambar](#8-prosedur-penggantian-gambar)
9. [Peta file pengembangan](#9-peta-file-pengembangan)
10. [Menjalankan dan memeriksa proyek](#10-menjalankan-dan-memeriksa-proyek)
11. [Rekam pengujian dan verifikasi](#11-rekam-pengujian-dan-verifikasi)
12. [Konten dan konfigurasi baseline](#12-konten-dan-konfigurasi-baseline)
13. [Artefak pemeriksaan](#13-artefak-pemeriksaan)
14. [Panduan melanjutkan pekerjaan](#14-panduan-melanjutkan-pekerjaan)

## 1. Ringkasan kondisi akhir

- Hero menggunakan animasi masuk yang halus dan gerakan berulang yang jelas terlihat.
- Intensitas gerakan berulang hero telah diterima pengguna sebagai acuan.
- Ilustrasi pada section undangan, acara, pasangan, RSVP, informasi tamu, dan penutup telah disesuaikan agar lebih aktif.
- Tampilan mobile telah diterima pengguna. Penyesuaian desktop dilakukan menggunakan media query khusus desktop.
- Judul, teks acara, ikon, medali, dan jarak antar-elemen desktop telah diperjelas.
- Kartu acara menggunakan dua kolom pada layar 810–1399 px dan tiga kolom mulai 1400 px.
- Seluruh section desktop memenuhi lebar layar, termasuk pada monitor lebih lebar dari 1500 px.
- Tinggi hero desktop mengikuti rasio ilustrasi, sehingga pelebaran halaman tidak memotong komposisi akibat batas tinggi lama.
- Gap atas mobile sebesar 11 px telah dihilangkan. Hero dimulai pada posisi atas `0`.
- Tersedia halaman katalog `/panduan-gambar` dengan 61 kode lokasi gambar, 67 preview, ukuran desktop/mobile, posisi, dan tautan file contoh.
- Referensi ukuran serta file pada katalog telah dicocokkan dengan 61 kode pada dua ukuran layar, yaitu 122 pemeriksaan pasangan kode/layar. Jumlah ini mencakup satu pemeriksaan bahwa H24 tidak digunakan pada desktop.

### Alamat lokal

| Halaman | URL |
| --- | --- |
| Undangan utama | <http://localhost:3000/> |
| Rute demo yang tetap tersedia | <http://localhost:3000/demos/mountain> |
| Katalog penggantian gambar | <http://localhost:3000/panduan-gambar> |
| Contoh tautan langsung ke balon hero | <http://localhost:3000/panduan-gambar#H04> |

Alamat lokal dapat dibuka ketika server proyek sedang berjalan.

## 2. Teknologi, halaman, dan struktur proyek

### Teknologi yang diverifikasi

| Komponen | Konfigurasi proyek |
| --- | --- |
| Framework | Next.js `^16.0.0`, App Router; build selama sesi menampilkan Next.js `16.4.1` |
| UI | React dan React DOM `^19.2.0` |
| Animasi JavaScript | Motion `^12.23.24`, melalui `motion/react` |
| Styling | CSS global, Tailwind CSS `^4.1.0`, CSS Module khusus katalog |
| Bahasa | TypeScript `^5.9.0`, mode `strict` |
| Pengujian browser | Playwright `^1.56.0`, channel Chrome, headless |
| Gambar | File lokal di `public/images/`; helper `image(name)` menghasilkan URL `.webp` |
| Font | File WOFF2 lokal di `public/fonts/` |
| Audio | `public/audio/wedding.mp3` |

Versi dengan tanda `^` adalah rentang dalam `package.json`. Untuk instalasi yang mengikuti lockfile, gunakan `npm ci`.

### Susunan halaman undangan

Urutan komponen pada `src/app/page.tsx`:

1. `DemoControls`: tombol musik dan skip link.
2. `ArtworkAnimations`: pengendali animasi dan reveal.
3. `Hero`: ilustrasi pembuka berlapis dan nama pasangan.
4. `Invitation`: teks undangan dan enam kartu acara.
5. `CoupleSection`: lokasi, pengenalan pasangan, dan galeri foto.
6. `GuestInformation`: RSVP dan informasi tamu.
7. `InvitationFooter`: Instagram, hitung mundur, dan pesan keluarga.

Fungsi galeri, musik, tautan acara, dan dukungan aksesibilitas merupakan bagian baseline yang diperiksa selama pengembangan ini.

## 3. Arahan desain dan keputusan pengguna

Keputusan berikut menjadi acuan untuk perubahan berikutnya:

1. **Animasi masuk harus halus.** Fade dan pergeseran awal tidak boleh terasa patah atau muncul mendadak.
2. **Gerakan berulang harus terlihat.** Pengguna menegaskan bahwa balon, bulan, pohon, bukit, dan dekorasi tidak boleh terlalu pelan atau terlalu kecil sampai tampak diam.
3. **Pisahkan penyesuaian entrance dan loop.** Memperhalus entrance tidak berarti mengecilkan atau memperlambat seluruh gerakan tetap.
4. **Hero yang sudah pas menjadi acuan intensitas.** Setelah gerakan hero diterima, penyesuaian diterapkan pada section lainnya.
5. **Mobile yang sudah diterima harus dijaga ketika mengubah desktop.** Gunakan aturan khusus desktop untuk perubahan skala, tipografi, atau gerakan desktop.
6. **Desktop harus penuh dari kiri ke kanan.** Ruang kosong akibat pembatas lebar halaman tidak sesuai permintaan pengguna.
7. **Mobile harus tertutup sampai tepi atas.** Padding yang menyisakan pita kosong di atas hero telah dihapus.
8. **Penggantian gambar harus memiliki acuan yang jelas.** Gunakan kode lokasi, preview, ukuran, dan posisi; jangan hanya merujuk nama file yang dipakai ulang.

## 4. Riwayat pengembangan

Urutan di bawah mengikuti percakapan. Nilai percobaan yang dibatalkan dicatat sebagai riwayat, bukan sebagai konfigurasi akhir.

### DEV-01 — Pemeriksaan animasi hero yang terasa patah

**Permintaan:** animasi hero perlu dibuat lebih smooth.

Temuan dan penanganan:

- Judul awal memakai blur per huruf, skala, opacity, serta pergeseran vertikal secara bersamaan.
- Beberapa gerakan berulang, khususnya bulan dan bukit, menggunakan gerakan linear bolak-balik.
- Animasi judul diringankan menjadi opacity dan pergeseran vertikal tanpa blur maupun skala.
- Animasi judul menunggu `document.fonts.ready` untuk mengurangi perubahan tampilan akibat pergantian font.
- Font `cormorant-unicase.woff2` ditambahkan ke preload, melengkapi preload Infant dan Upright.
- Hero mendapatkan entrance dengan jarak lebih pendek, easing khusus, dan jeda antar-layer.
- Gambar hero menunggu `image.decode()` sebelum ditandai revealed.
- `will-change: transform` digunakan pada layer hero yang aktif bergerak.
- Observer gerakan diberi `rootMargin: '100px 0px'` agar gerakan siap sebelum elemen mencapai area terlihat.
- Penulisan status `data-motion-active` dibatasi hanya ketika nilainya berubah.
- Cleanup menggunakan penanda `disposed` agar promise decode tidak mengubah elemen setelah controller dibersihkan.

Pada iterasi ini, loop juga sempat diperlambat dan jarak geraknya diperkecil. Beberapa durasi menjadi sekitar 7–10 detik. Bagian penyesuaian loop tersebut kemudian dikoreksi berdasarkan arahan pengguna.

### DEV-02 — Pemisahan entrance halus dan loop yang terlihat

**Koreksi pengguna:** yang perlu halus adalah animasi masuk; gerakan tetap jangan sampai tampak tidak bergerak.

- Pengaturan entrance yang sudah diterima dipertahankan sebagai baseline.
- Kecepatan dan jarak loop awal dikembalikan, termasuk balon sekitar 3,5 detik dan bulan 3 detik.
- Pengguna masih menilai loop terlalu lembut. Pemulihan ke nilai awal ternyata belum cukup untuk intensitas yang diinginkan.

### DEV-03 — Peningkatan intensitas loop hero

**Permintaan:** tingkatkan lagi gerakan tetap; animasi masuk sudah pas.

- Jarak gerak balon, istana, pohon, bukit, dan dedaunan diperbesar.
- Sudut putaran bulan diperbesar.
- Durasi beberapa loop dipersingkat.
- Pengaturan mobile diberi intensitas khusus, termasuk gerakan pohon kanan yang sebelumnya sangat kecil.
- Dekorasi bawah hero menggunakan skala maksimum `1.05` dengan durasi `4.2s`.

**Hasil umpan balik:** pengguna menyatakan hero sudah pas. Nilai akhirnya ada pada bagian 5.

### DEV-04 — Penyesuaian animasi section selain hero

**Permintaan:** section lain juga dibuat lebih aktif karena masih terlalu lembut.

- Gerakan ambient naik-turun umum diperbesar dari sekitar 7 px menjadi 18 px, dengan durasi lebih singkat.
- Ayunan ornamen dan efek membesar-mengecil diperjelas.
- Bulan, balon, dan istana pada isi undangan dibuat lebih aktif.
- Ilustrasi utama, balon, istana, dan bulan pada enam kartu acara disesuaikan secara proporsional.
- Gerak bingkai galeri diperbesar.
- Medali lokasi, RSVP, dan Instagram mendapatkan pergerakan serta ikon yang lebih terlihat.
- Ikon informasi tamu dibuat lebih aktif.

**Hasil umpan balik berikutnya:** tampilan mobile dinilai sangat baik; desktop diminta disesuaikan lagi.

### DEV-05 — Penyesuaian tampilan desktop

**Permintaan:** desktop diperbaiki tanpa mengganggu tampilan mobile.

Perubahan dibuat dalam media query desktop:

- Ukuran dan posisi nama pada hero dibuat responsif terhadap lebar artboard dengan satuan `cqw`.
- Judul kartu acara diperbesar; teks detail menjadi lebih terbaca.
- Tinggi kartu acara menjadi 600 px, dengan jarak baris 80 px.
- Bingkai medali menjadi 680 × 680 px dan isi lingkarannya 522 × 522 px.
- Ikon medali desktop diperbesar menjadi 60 × 64 px.
- Teks cerita pasangan menjadi 20 px dengan line-height 27 px.
- Posisi galeri dan tinggi section pasangan disesuaikan agar jarak dengan teks tetap cukup.
- Ikon informasi tamu menjadi 88 × 88 px; detail teks menjadi 18 px dengan line-height 24 px.
- Penutup mendapatkan ukuran teks yang lebih terbaca.
- Intensitas gerakan dekorasi desktop diperkuat secara terpisah.
- Pengaturan kartu dua kolom diperluas sampai 1399 px agar kartu tidak terpotong pada laptop. Tiga kolom digunakan mulai 1400 px.
- Informasi tamu menggunakan dua kolom pada layar 810–1199 px dan empat kolom mulai 1200 px.

Saat perubahan desktop ini diperiksa, perbandingan ukuran, posisi, font, dan variabel gerakan mobile pada lebar 320, 390, 768, dan 809 px cocok dengan baseline sebelumnya.

### DEV-06 — Menghapus ruang kosong kiri–kanan desktop

**Laporan pengguna:** pada screenshot desktop masih ada ruang kosong di kiri dan kanan.

Penyebab dan perbaikan:

- `.invitation-site` memiliki batas dasar `max-width: 1500px`, sehingga halaman terpusat dengan sisi kosong pada monitor lebih lebar.
- Media query desktop kini menimpa batas tersebut dengan `max-width: none`.
- Padding atas desktop ditetapkan menjadi `0`.
- Hero desktop menggunakan `height: auto`, `max-height: none`, dan `aspect-ratio: 1440 / 2785`.
- Perhitungan tinggi mengikuti lebar elemen aktual, termasuk ketika scrollbar mengambil sebagian lebar viewport.
- Tombol musik desktop menggunakan jarak kanan tetap 40 px, menggantikan penghitungan yang mengacu pada kanvas 1500 px.

Verifikasi dilakukan pada lebar 1440, 1920, 2560, dan 3840 px, masing-masing dengan dan tanpa scrollbar gutter. Seluruh section memenuhi area halaman tanpa gap samping.

### DEV-07 — Menghapus gap atas mobile

**Laporan pengguna:** ada celah paling atas pada screenshot mobile; ornamen terlihat belum menutup seluruh area.

- Penyebabnya adalah `.invitation-site { padding-top: 11px; }` pada media query mobile.
- Pilar samping memiliki koordinat negatif sehingga tampak menjulur ke padding, tetapi bagian tengah baru dimulai di bawahnya.
- Padding mobile diubah menjadi `0`.
- Hero kini dimulai pada `y = 0`, dengan gap kiri dan kanan juga `0` pada pemeriksaan.

Verifikasi mencakup lebar 320, 390, 425, 768, 809, 1440, dan 1920 px. Perubahan mobile ini merupakan koreksi gap yang diminta setelah tahap penjagaan baseline mobile pada DEV-05.

### DEV-08 — Membuat katalog visual penggantian gambar

**Permintaan:** buat daftar agar pengguna dan pengembang merujuk gambar yang sama, dengan ukuran dan tempat yang sama.

Dibuat:

- `src/lib/artwork-catalog.ts`: metadata 61 kode lokasi gambar.
- `src/app/panduan-gambar/page.tsx`: halaman katalog visual berbahasa Indonesia.
- `src/app/panduan-gambar/page.module.css`: styling khusus katalog.
- Ekspor `heroLayers` pada `src/components/hero.tsx`, sehingga ukuran dan posisi hero dalam katalog membaca data layer yang sama dengan komponen hero.

Isi katalog:

- Enam kelompok gambar.
- 61 kode lokasi dan 67 preview; jumlah preview lebih banyak karena beberapa lokasi mempunyai file desktop dan mobile berbeda.
- Enam kode dengan file desktop/mobile berbeda adalah H02, H04, U01, U04, C01, dan G01; masing-masing menambahkan satu preview.
- Ukuran kotak tampil desktop/mobile serta keterangan posisi.
- Tautan **Unduh contoh** untuk mengambil file yang sedang digunakan.
- Penanda kode lain yang menggunakan file gambar sama.
- Selector dan file sumber di bagian detail teknis.
- Tautan langsung ke setiap kode, misalnya `/panduan-gambar#H04`.

Katalog adalah panduan identifikasi dan penggantian. Penggantian gambar dilakukan melalui sumber gambar pada komponen/data/CSS yang dicatat, lalu metadata katalog disesuaikan. Halaman ini tidak menyediakan unggah gambar atau CMS.

### DEV-09 — Membuat rekam pengembangan Markdown

**Permintaan:** semua pekerjaan pengembangan direkam dalam MD.

- Dibuat `DEVELOPMENT_LOG.md` di root proyek.
- Dokumen mencatat kronologi, feedback pengguna, nilai akhir, layout responsif, daftar kode gambar, workflow penggantian, perintah operasional, dan verifikasi.
- Dokumen ini dapat dilanjutkan dengan entri baru menggunakan format pada bagian 14.

### DEV-10 — Mengganti ilustrasi H06 dan memusatkan cincin

**Tanggal:** 16 Oktober 2026  
**Permintaan:** ganti H06 “Bukit dan adegan pasangan” dengan gambar kiriman, lalu rapikan karena posisinya kurang di tengah.  
**Cakupan:** desktop dan mobile.

Perubahan:

- Sumber: `GAMBAR - BARU/Bukit dan adegan pasangan.png` (1415 × 1241 px, transparan).
- Aset siap tampil: `public/images/h06-bukit-cincin.webp` (1600 × 1512 px). Gambar dipasang dengan `fit: contain` dan padding transparan untuk mengikuti rasio kanvas H06.
- Referensi `artwork.proposal` di `src/lib/invitation.ts` diarahkan ke aset baru; preview katalog H06 mengikuti referensi yang sama.
- Titik fokus cincin berada di kiri pusat kanvas. Posisi layer disesuaikan dari x −99 menjadi **−67** pada artboard desktop 1440 px, dan dari x −60 menjadi **−50** pada artboard mobile 390 px.
- Koordinat akhir desktop: `[−67, 1580, 1640, 1556]`; mobile: `[−50, 983, 510, 484]`. Layer memakai animasi translate vertikal berdurasi 4,4 detik.

File yang diubah/ditambahkan:

- `public/images/h06-bukit-cincin.webp`
- `src/lib/invitation.ts`
- `src/components/hero.tsx`
- `DEVELOPMENT_LOG.md`

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript.
- Server production lokal dibangun ulang dan dijalankan ulang di `http://localhost:3000`.
- Pemeriksaan browser pada lebar 390, 768, 1440, dan 1920 px: aset baru termuat, alpha transparan tersedia, tidak ada overflow horizontal atau error JavaScript, dan preview H06 di katalog merujuk file baru.
- Sumbu cincin berjarak kurang dari 1 px terhadap tengah hero pada keempat ukuran layar tersebut.
- Animasi H06 pada desktop 1440 px dan mobile 390 px diverifikasi melalui perubahan transform.
- Skrip dan screenshot pemeriksaan tersedia di folder Temp `opencode`, dengan nama `verify-wedding-h06.mjs` dan `wedding-h06-{lebar}.png`.

### DEV-11 — Mengganti H09 dengan ornamen bunga yang terpusat

**Tanggal:** 16 Oktober 2026  
**Permintaan:** ganti H09 “Ornamen lengkung tengah” dengan gambar kiriman, di tempat yang sama, center dan pas.  
**Cakupan:** desktop dan mobile.

Perubahan:

- Sumber: `GAMBAR - BARU/Ornamen lengkung tengah.png` (1056 × 714 px, transparan).
- Aset: `public/images/h09-ornamen-bunga.webp` (1130 × 897 px, transparan), mengikuti kanvas lama H09.
- Ukuran dicocokkan berdasarkan ornamen berwarna, bukan batas transparansi/bayangan: lebar objek lama sekitar 809 px dan objek kiriman sekitar 920 px. Gambar kiriman diskalakan secara proporsional menjadi lebar 929 px, lalu ditempatkan pada kanvas di x 94, y 21. Ukuran visual dan posisi atas ornamen mengikuti komposisi sebelumnya.
- Bunga utama menjadi acuan pusat visual. Posisi layer desktop dirapikan menjadi x 312,5 agar kotak selebar 815 px berada di tengah artboard 1440 px.
- Koordinat akhir desktop: `[312.5, 383, 815, 646]`; mobile: `[-21, 266, 432, 343]`. Layer H09 tetap berada pada z-index 4 dengan animasi `motion-lift`.
- Referensi H09 di `src/components/hero.tsx` menggunakan aset baru. Preview, tautan unduh, dan posisi pada katalog membaca data layer tersebut secara otomatis.

File yang diubah/ditambahkan:

- `public/images/h09-ornamen-bunga.webp`
- `src/components/hero.tsx`
- `DEVELOPMENT_LOG.md`

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript; server production lokal dijalankan ulang.
- Pemeriksaan browser pada 390, 768, 1440, dan 1920 px: file dan dimensi sesuai, posisi atas serta ukuran kotak sesuai acuan, transparansi tersedia, tidak ada overflow horizontal atau error JavaScript, dan katalog H09 memakai aset baru.
- Acuan sumbu bunga berada kurang dari 1 px dari tengah hero pada keempat lebar layar tersebut.
- Animasi H09 diverifikasi melalui perubahan transform pada desktop 1440 px dan mobile 390 px.
- Screenshot desktop dan mobile diperiksa untuk kesesuaian dengan lengkungan atas. Artefak sementara: `verify-wedding-h09.mjs`, `wedding-h09-1440.png`, dan `wedding-h09-390.png` di folder Temp `opencode`.

### DEV-12 — Mengganti dua dekorasi bawah H19 dan H20

**Tanggal:** 16 Oktober 2026  
**Permintaan:** ganti dua gambar dengan ornamen bunga kiri dan kanan, di tempat yang sama, terpusat dan pas.  
**Cakupan:** H19 dan H20, desktop dan mobile.

Perubahan:

- Sumber: `GAMBAR - BARU/Dekorasi bergerak bawah kiri.png` dan `Dekorasi bergerak bawah kanan.png`, masing-masing 1024 × 1445 px dengan transparansi.
- Aset baru: `public/images/h19-ornamen-bunga-kiri.webp` dan `public/images/h20-ornamen-bunga-kanan.webp`, masing-masing 1024 × 1536 px.
- Kedua gambar diskalakan proporsional ke lebar 1000 px dan dipasang pada kanvas transparan: kiri di `[20, 54]`, kanan di `[4, 54]`. Ukuran objek yang terlihat disesuaikan dengan dekorasi sebelumnya, dengan padding yang menjaga ujung bunga tetap pas di area hero.
- Referensi H19/H20 diganti di `src/components/hero.tsx`. Data katalog, preview, dan unduhan mengikuti layer hero secara otomatis.
- Koordinat desktop H19: `[-20, 2413, 287, 390]`; H20: `[1173, 2413, 287, 390]`. Posisi kanan dirapikan 5 px ke kiri agar pasangan simetris terhadap tengah artboard 1440 px.
- Koordinat mobile H19: `[-10, 1241, 120, 180]`; H20: `[280, 1241, 120, 180]`.
- Kedua ornamen memakai z-index 8 dan animasi `ambient-breathe`.

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript; server production lokal dijalankan ulang.
- Browser pada 390, 768, 1440, dan 1920 px: kedua aset termuat dengan transparansi, ukuran dan koordinat sesuai, tidak ada overflow horizontal atau error JavaScript, serta preview H19/H20 memakai file baru.
- Titik tengah pasangan ornamen berjarak kurang dari 1 px dari pusat hero. Ujung bawah objek bunga berada di dalam tinggi hero pada keempat viewport tersebut.
- Animasi kedua ornamen diverifikasi melalui perubahan transform pada desktop 1440 px dan mobile 390 px.
- Screenshot bawah hero diperiksa pada desktop dan mobile. Artefak sementara: `verify-wedding-h19-h20.mjs`, `wedding-h19-h20-1440.png`, dan `wedding-h19-h20-390.png` di folder Temp `opencode`.

### DEV-13 — Enam ilustrasi dan tahap prosesi Aceh

**Tanggal:** 16 Oktober 2026  
**Permintaan:** ganti enam ilustrasi kartu acara, pertahankan tempatnya, rapikan agar terpusat dan pas, serta ubah urutan tahap menjadi Ta'aruf, Jak Keumalen, Peukong Haba, Persiapan Hari Bahagia, Akad Nikah, dan Seumapa & Peusijuek.  
**Cakupan:** E01–E06, desktop dan mobile.

Pemetaan ilustrasi:

| Kode | Tahap baru | File kiriman dalam `GAMBAR - BARU/` | Aset dalam `public/images/` |
| --- | --- | --- | --- |
| E01 | Ta'aruf | `Ilustrasi Mehendi.png` — adegan perkenalan | `e01-taaruf.webp` |
| E02 | Jak Keumalen | `Ilustrasi Haldi.png` — pertemuan keluarga | `e02-jak-keumalen.webp` |
| E03 | Peukong Haba | `Ilustrasi Cocktail.png` — hantaran/sirih | `e03-peukong-haba.webp` |
| E04 | Persiapan Hari Bahagia | `Ilustrasi Pre-Wedding.png` — persiapan pengantin | `e04-persiapan-hari-bahagia.webp` |
| E05 | Akad Nikah | `Ilustrasi Shaadi.png` — prosesi akad | `e05-akad-nikah.webp` |
| E06 | Seumapa & Peusijuek | `Ilustrasi Reception.png` — pasangan berbusana adat | `e06-seumapa-peusijuek.webp` |

Perubahan:

- Keenam sumber berukuran 399 × 461 px. Padding transparan dicocokkan berdasarkan batas alpha, dengan tambahan ruang aman 3 px; gambar dipasang proporsional pada kanvas 488 × 738 px menggunakan `contain` dan transparansi.
- Array `events` di `src/lib/invitation.ts` memakai nama tahap dan aset baru dalam urutan di atas.
- Kotak ilustrasi tetap 244 × 369 px pada acuan desktop/mobile, terpusat memakai `left: calc(50% - 122px)` dan `object-fit: contain` agar oval tidak terdistorsi. Pada laptop, seluruh komposisi ilustrasi tetap diskalakan 90%.
- Judul ditata dengan lebar responsif, `text-wrap: balance`, dan ruang minimum dua baris. Tinggi kartu menjadi 650 px pada desktop/laptop dan 590 px pada mobile agar isi kartu muat.
- Tinggi section undangan mobile menjadi 5013 px; desktop tetap 3158 px, dan laptop dua kolom 3860 px. Data U01 dalam katalog mengikuti tinggi mobile baru.
- Nama dan preview E01–E06 otomatis mengikuti data `events`. Contoh penggantian E07 diperbarui memakai nama Ta'aruf.

File yang diubah/ditambahkan:

- Enam aset WebP pada tabel di atas.
- `src/lib/invitation.ts`
- `src/app/globals.css`
- `src/lib/artwork-catalog.ts`
- `DEVELOPMENT_LOG.md`

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript; server production lokal dijalankan ulang.
- Pemeriksaan browser pada lebar 320, 390, 768, 810, 1024, 1440, dan 1920 px: keenam nama dan aset sesuai, gambar termuat dengan transparansi, pusat gambar sejajar pusat kartu, judul muat dalam maksimal dua baris, isi kartu serta grid muat di section, dan tidak ada overflow horizontal atau error JavaScript.
- Nama, sumber preview E01–E06, serta tinggi mobile U01 pada katalog cocok dengan implementasi.
- Animasi keenam ilustrasi diverifikasi melalui perubahan transform pada 390 dan 1440 px.
- Delapan tes Playwright lulus melalui `npm test -- --workers=2 --grep "invitation renders|gallery navigation|all invitation and lower-page illustration groups"`.
- Screenshot grid desktop/mobile diperiksa. Artefak sementara: `verify-wedding-events.mjs`, `wedding-events-1440.png`, dan `wedding-events-390.png` di folder Temp `opencode`.

### DEV-14 — Tiga bingkai luar medali Instagram, lokasi, dan RSVP

**Tanggal:** 16 Oktober 2026  
**Permintaan:** ganti tiga bingkai luar medali menggunakan file PNG yang diberikan dan sesuaikan dengan penempatannya.  
**Cakupan:** C02 (lokasi), G02 (RSVP), F02 (Instagram), desktop dan mobile.

Pemetaan aset:

| Kode | Sumber dalam `GAMBAR - BARU/` | Aset dalam `public/images/` |
| --- | --- | --- |
| C02 | `Bingkai luar medali lokasi.png` | `c02-medali-lokasi-luar.webp` |
| G02 | `Bingkai luar medali RSVP.png` | `g02-medali-rsvp-luar.webp` |
| F02 | `Bingkai luar medali Instagram.png` | `f02-medali-instagram-luar.webp` |

Perubahan:

- Sumber Instagram dan lokasi berukuran 1600 × 1640 px, dengan pusat lingkaran pada `(800, 840)`. Ruang transparan 40 px di bagian atas dikeluarkan agar kanvas menjadi persegi 1600 × 1600 px dan pusat lingkaran tepat di `(800, 800)`.
- Sumber RSVP sudah berukuran 1600 × 1600 px dan berpusat di `(800, 800)`.
- Ketiganya dikonversi menjadi WebP kualitas 90 dengan alpha/transparansi. Batas objek alpha > 128 adalah x/y 111–1488, sama dengan ukuran visual bingkai lama, sehingga diameter lingkaran dan pusat rotasi cocok dengan medali yang ada.
- Referensi bingkai pada `src/components/medallion.tsx` serta slot C02/G02/F02 pada `src/lib/artwork-catalog.ts` diarahkan ke aset baru.
- Ukuran tampil bingkai: 680 × 680 px pada desktop/laptop dan 924 × 924 px pada mobile. Layer bingkai tetap mengikuti rotasi loop serta rotasi berdasarkan scroll.

File yang diubah/ditambahkan:

- Ketiga aset WebP pada tabel di atas.
- `src/components/medallion.tsx`
- `src/lib/artwork-catalog.ts`
- `DEVELOPMENT_LOG.md`

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript; server production lokal dijalankan ulang.
- Pemeriksaan browser pada 390, 768, 1024, 1440, dan 1920 px: ketiga file termuat, ukuran sesuai, bingkai berpusat pada medali dan tengah viewport, transparansi serta geometri lingkaran benar, dan tidak ada overflow horizontal atau error JavaScript.
- Preview C02/G02/F02 di katalog cocok dengan file baru. Area tautan lokasi, RSVP, serta Instagram dapat menerima klik dan memakai tujuan yang sesuai konfigurasi.
- Rotasi loop dan rotasi berdasarkan scroll diverifikasi pada ketiga medali di desktop 1440 px dan mobile 390 px. Mode reduced motion diuji pada konteks browser tersendiri.
- Empat tes Playwright lulus melalui `npm test -- --workers=2 --grep "gallery navigation|all invitation and lower-page illustration groups|artwork pauses|reduced motion"`.
- Screenshot ketiga medali pada desktop dan mobile diperiksa. Artefak sementara: `verify-wedding-medallion-frames.mjs` dan `wedding-medallion-{location|rsvp|instagram}-{390|1440}.png` di folder Temp `opencode`.

### DEV-15 — Memperbesar enam ilustrasi dan merapatkan keterangannya

**Tanggal:** 16 Oktober 2026  
**Permintaan:** sesuaikan kembali enam ilustrasi kartu karena jarak ke keterangan masih terlalu besar; perbesar sedikit jika diperlukan.  
**Cakupan:** E01–E06, desktop dan mobile.

Perubahan:

- Ukuran kotak ilustrasi dinaikkan dari 244 × 369 px menjadi **268 × 405,3 px**, sekitar 9,8% lebih besar secara proporsional, dengan `object-fit: contain`.
- Pusat horizontal mengikuti `left: calc(50% - 134px)`. Pada laptop 810–1399 px, pembungkus ilustrasi tetap diskalakan 90%, sehingga lebar tampil menjadi 241,2 px.
- Tinggi area komposisi `.event-art` dirapatkan dari 395 px menjadi **390 px**.
- Ruang minimum judul dua baris (`min-height: 2.2em`) dihapus. Tinggi judul mengikuti satu atau dua baris aktual, sehingga tidak ada ruang kosong tambahan sebelum judul pendek atau keterangannya. Judul panjang tetap memakai wrapping yang seimbang.
- Ukuran E01–E06 pada katalog diperbarui menjadi 268 × 405,3 px.

File yang diubah:

- `src/app/globals.css`
- `src/lib/artwork-catalog.ts`
- `DEVELOPMENT_LOG.md`

Verifikasi:

- `npm run build`: berhasil, termasuk pemeriksaan TypeScript; server production lokal dijalankan ulang.
- Browser pada 320, 390, 768, 810, 1024, 1440, dan 1920 px: keenam gambar terpusat, sumber termuat, judul muat maksimal dua baris, isi kartu dan grid muat dalam section, dan tidak ada overflow horizontal atau error JavaScript.
- Jarak visual dari batas alpha ilustrasi ke baris pertama judul sekitar **14,8–18,0 px** pada mobile dan desktop tiga kolom; pada laptop dengan skala ilustrasi 90%, sekitar **32,5–35,4 px**.
- Animasi keenam ilustrasi diuji pada 390 dan 1440 px. Pada sampel fase 0%, 25%, 50%, 75%, dan 100%, ilustrasi tidak bertabrakan dengan judul.
- Screenshot grid desktop/mobile diperiksa. Artefak sementara: `verify-wedding-events.mjs`, `wedding-events-tight-1440.png`, dan `wedding-events-tight-390.png` di folder Temp `opencode`.

## 5. Sistem animasi dan pengaturan akhir

### 5.1 Pemisahan entrance dan loop

| Bagian | Cara kerja |
| --- | --- |
| Entrance konten/ilustrasi | `opacity` dan properti individual `translate` |
| Loop ilustrasi | CSS keyframes pada `transform` |
| Entrance judul hero | Motion per huruf, menunggu font siap |
| Aktivasi loop | IntersectionObserver, visibilitas dokumen, dan preferensi reduced motion |

Penggunaan `translate` individual untuk entrance mencegah entrance menggantikan `transform` yang dipakai oleh loop atau pemusatan elemen.

### 5.2 Parameter entrance

| Parameter | Nilai akhir |
| --- | --- |
| Reveal umum: opacity | `1s`, easing `cubic-bezier(.16, 1, .3, 1)` |
| Reveal umum: translate | `1.3s`, easing yang sama |
| Jarak reveal samping umum | 64 px desktop; 42 px mobile |
| Offset reveal atas umum | -42 px desktop; -30 px mobile |
| Jarak reveal samping hero | 24 px |
| Offset reveal atas hero | -18 px |
| Entrance hero: opacity / translate | `1.25s / 1.8s` |
| Easing entrance hero | `cubic-bezier(.22, .61, .36, 1)` |
| Jeda antar-layer hero | `min(index, 10) × 24ms`, maksimum 240 ms |
| Judul hero: posisi awal | opacity `0`, `y: -12` |
| Judul hero: posisi akhir | opacity `1`, `y: 0` |
| Judul hero: durasi | `1.5s` |
| Judul hero: jeda | `.12 + line × .16 + letterIndex × .045` detik |

### 5.3 Gerakan berulang hero

Durasi di tabel adalah **satu arah** animasi. Karena memakai `animation-direction: alternate`, satu perjalanan pergi–pulang penuh umumnya membutuhkan dua kali durasi tersebut.

| Elemen / selector | Desktop | Mobile | Durasi satu arah |
| --- | --- | --- | --- |
| Istana `.motion-hotel` | x +120 px | x -30 px | 4,2 s desktop; 3,2 s mobile |
| Balon `.motion-balloon` | x +30, y -40 px | x -30, y -18 px | 3 s |
| Bulan `.motion-moon` | 18° | 26° | 2,6 s, linear |
| Bukit `.motion-hills` | y +32 px | y +32 px | 4,4 s, linear |
| Pohon kiri `.motion-tree-left` | x -52 px | x -22 px | 3,6 s |
| Pohon kanan `.motion-tree-right` | x +52 px | x +16 px | 3,6 s |
| Ornamen terangkat `.motion-lift` | y -18 px | y -18 px | 3,4 s |
| Daun depan `.motion-leaves-lift` | y -18 px | y -18 px | 3,4 s |
| Daun turun `.motion-leaves-drop` | y +22 px | y +18 px | 3,6 s |
| Dekorasi bawah `.hero-layer.ambient-breathe` | skala 1 → 1,05 | skala 1 → 1,05 | 4,2 s |

Easing umum loop adalah `cubic-bezier(.44, 0, .56, 1)`, kecuali elemen yang memiliki override seperti bulan dan bukit.

### 5.4 Gerakan berulang section lainnya

Durasi pada tabel ini juga merupakan durasi satu arah loop `alternate`, seperti penjelasan pada bagian 5.3.

| Elemen | Desktop | Mobile |
| --- | --- | --- |
| Ganesha isi undangan | skala maksimum 1,08; 3,2 s | skala maksimum 1,065; 3,6 s |
| Bulan isi undangan | 24°; 3 s, linear | 24°; 3 s, linear |
| Balon isi undangan | x -46, y -54 px; 3 s | x -20, y -26 px; 3 s |
| Istana isi undangan | x -48, y -22 px; 3,4 s | x -24, y -10 px; 3,6 s |
| Ilustrasi utama kartu acara | skala maksimum 1,075; 3,4 s | skala maksimum 1,055; 3,8 s |
| Balon kartu acara | x +22, y -34 px; 2,8 s | x +16, y -24 px; 3 s |
| Istana kartu acara | x +28, y -16 px; 3,2 s | x +20, y -10 px; 3,6 s |
| Bulan kartu acara | 22°; 2,8 s, linear | 16°; 3,2 s, linear |
| Medali lokasi/RSVP/Instagram | y -24 px; 3,2 s | y -18 px; 3,6 s |
| Bingkai luar medali | rotasi sampai 365°; 7,2 s, linear | rotasi sampai 365°; 8 s, linear |
| Ikon medali | skala maksimum 1,15; 2,6 s | skala maksimum 1,12; 2,8 s |
| Ornamen judul pasangan/tamu | ayunan ±8°, y -12 px; 3 s | ayunan ±6°, y -8 px; 3,4 s |
| Bingkai galeri | y -30 px; 3,4 s | y -22 px; 3,8 s |
| Ikon informasi tamu | y -24 px; 3,2 s | y -18 px; 3,6 s |

Medali juga memiliki rotasi berbasis scroll melalui `useScroll` dan `useTransform`, dengan rentang 1002° → 0°. Ini terpisah dari loop CSS bingkai luar.

### 5.5 Aktivasi, aksesibilitas, dan pemuatan

- `data-art-motion`: jenis `translate`, `rotate`, `sway`, atau `breathe`.
- `data-motion-active`: mengatur status running/paused berdasarkan area terlihat, tab aktif, dan preferensi pengguna.
- `data-reveal`: arah entrance; `auto` dihitung dari posisi horizontal elemen.
- `data-reveal-from`: hasil penentuan arah.
- `data-revealed="true"`: entrance sudah dipicu, kemudian reveal observer melepaskan elemen agar tidak diulang saat scroll kembali.
- `data-reveal-instant`: dipakai untuk elemen yang perlu langsung dapat diakses saat mendapat fokus.
- `data-reveal-delay`: jeda tambahan pada elemen yang menggunakannya.
- `html[data-motion-ready="true"]`: menandai controller sudah siap.
- Hero menunggu decode gambar sebelum fade-in.
- Judul menunggu font siap; font judul di-preload dari file lokal.
- Reduced motion menonaktifkan animasi/transisi dan menampilkan konten.
- Fallback `<noscript>` menjaga teks dan gambar tetap terlihat ketika JavaScript dinonaktifkan.
- Medali dan gerak galeri memiliki perilaku pause saat hover/focus agar interaksi lebih mudah.
- Slideshow galeri mempunyai pause tersendiri, interval 5 detik, navigasi tombol, titik indikator, dan gesture swipe.

## 6. Layout responsif dan perbaikan gap

### 6.1 Breakpoint yang digunakan

| Rentang | Perilaku utama |
| --- | --- |
| Sampai 809 px | Komposisi mobile; kartu acara satu kolom; informasi tamu satu kolom |
| Mulai 810 px | Penyesuaian khusus desktop aktif |
| 810–1399 px | Kartu acara dua kolom; ilustrasi kartu diskalakan 90%; section undangan setinggi 3860 px |
| Mulai 1400 px | Kartu acara tiga kolom |
| 810–1199 px | Informasi tamu dua kolom; section tamu setinggi 2110 px |
| Mulai 1200 px | Informasi tamu empat kolom |
| Sampai 359 px | Ukuran tertentu pada teks medali dan tombol musik disesuaikan untuk layar kecil |

### 6.2 Desktop full-width

Pengaturan desktop saat ini di `globals.css`:

```css
@media (min-width: 810px) {
  .invitation-site { max-width: none; padding-top: 0; }
  .hero { height: auto; max-height: none; aspect-ratio: 1440 / 2785; }
  .music-button { right: 40px; }
}
```

Aturan dasar `.invitation-site` masih memuat `max-width: 1500px` dan `padding-top: 10px`, tetapi pada desktop ditimpa oleh aturan di atas. Pada mobile, lebar viewport berada di bawah batas dasar tersebut dan padding atas ditimpa menjadi `0`.

Rasio hero desktop: `tinggi = lebar elemen × 2785 / 1440`. Ini menggunakan lebar elemen aktual, bukan memaksakan tinggi berdasarkan viewport yang mungkin mencakup scrollbar.

### 6.3 Mobile tanpa gap atas

```css
@media (max-width: 809px) {
  .invitation-site { padding-top: 0; }
  .hero { height: calc(100vw * 1408 / 390); max-height: none; }
}
```

Komposisi hero mobile menggunakan acuan lebar 390 px dan tinggi 1408 px. Posisi serta ukuran layer hero disimpan sebagai pasangan artboard desktop/mobile, kemudian diubah menjadi persentase dan `cqw` oleh komponen hero.

### 6.4 Ukuran penting pada kondisi akhir

| Elemen | Desktop | Mobile |
| --- | --- | --- |
| Nama hero pertama/ketiga | `clamp(60px, 7.2cqw, 108px)` | 55 px |
| “weds” di hero | `clamp(36px, 4.2cqw, 63px)` | 30 px |
| Kotak kartu acara | tinggi 650 px; lebar maksimum 429 px | 429 × 590 px |
| Medali luar | 680 × 680 px | 924 × 924 px |
| Medali dalam lokasi/RSVP | 522 × 522 px | 716 × 716 px |
| Medali dalam Instagram | 522 × 522 px | 734 × 734 px |
| Bingkai galeri | 897 × 897 px | 931 × 931 px |
| Ikon informasi tamu | 88 × 88 px | 119 × 119 px |

Beberapa ilustrasi memang lebih lebar dari viewport mobile atau memiliki koordinat negatif. Pemotongan ini merupakan bagian komposisi panggung, bukan otomatis merupakan gap atau overflow yang perlu dihapus.

## 7. Katalog visual dan daftar 61 kode gambar

**Halaman:** <http://localhost:3000/panduan-gambar>  
**Sumber data:** `src/lib/artwork-catalog.ts`

### Cara membaca ukuran

- Ukuran di bawah adalah **kotak tampil acuan**, bukan ukuran piksel asli file gambar.
- Acuan desktop adalah lebar 1440 px; acuan mobile adalah lebar 390 px.
- Angka menunjukkan kondisi sebelum transform animasi.
- Ukuran hero akan mengikuti lebar layar.
- Di laptop 810–1399 px, pembungkus ilustrasi kartu acara mempunyai transform skala 90%.
- Ukuran pecahan pada tabel dibulatkan; sumber koordinat hero dan data katalog menyimpan nilai yang lebih rinci.
- Untuk mendesain file pengganti, unduh file contoh agar rasio kanvas dan padding transparannya bisa diikuti.

### 7.1 Hero — H01 sampai H24

| Kode | Gambar / lokasi | Desktop, lebar × tinggi (px) | Mobile, lebar × tinggi (px) |
| --- | --- | --- | --- |
| H01 | Latar dasar bintang seluruh hero | 1440 × 2785 | 390 × 1408 |
| H02 | Tirai bintang / kanopi paling atas | 1440 × 700 | 390 × 451 |
| H03 | Istana di atas awan | 904 × 682 | 308 × 232 |
| H04 | Balon udara | 786 × 832 | 367 × 511 |
| H05 | Bulan | 362 × 379,61 | 166 × 174,08 |
| H06 | Bukit dan adegan pasangan | 1640 × 1556 | 510 × 484 |
| H07 | Pohon besar kiri | 1651 × 2395 | 743 × 1078 |
| H08 | Pohon besar kanan | 1561 × 2297 | 736 × 1083 |
| H09 | Ornamen lengkung tengah | 815 × 646 | 432 × 343 |
| H10 | Dedaunan turun kiri | 724 × 574 | 250 × 198 |
| H11 | Dedaunan turun kanan | 724 × 574 | 250 × 198 |
| H12 | Dedaunan depan kiri | 823 × 744 | 278 × 251 |
| H13 | Dedaunan depan kanan | 823 × 744 | 278 × 251 |
| H14 | Pilar bunga kiri | 130 × 2587 | 72 × 1433 |
| H15 | Pilar bunga kanan | 130 × 2568 | 72 × 1422 |
| H16 | Ornamen sudut bawah kiri | 361 × 438 | 150 × 182 |
| H17 | Ornamen sudut bawah kanan | 361 × 408 | 150 × 182 |
| H18 | Landasan panggung paling bawah | 2299 × 165 | 1219 × 88 |
| H19 | Dekorasi bergerak bawah kiri | 287 × 390 | 120 × 180 |
| H20 | Dekorasi bergerak bawah kanan | 287 × 390 | 120 × 180 |
| H21 | Dekorasi bergerak bawah tengah | 215 × 240 | 106 × 118 |
| H22 | Lapisan bintang tengah | 1440 × 803 | 390 × 357 |
| H23 | Lapisan bintang bawah | 1685 × 1282 | 456 × 300 |
| H24 | Lapisan bintang tambahan khusus mobile | Tidak digunakan | 456 × 300 |

Koordinat `x`/`y` masing-masing layer tersedia pada kartu katalog. Titik acuannya adalah pojok kiri atas hero.

### 7.2 Isi undangan — U01 sampai U05

| Kode | Gambar / lokasi | Desktop (px) | Mobile (px) |
| --- | --- | --- | --- |
| U01 | Latar pola undangan dan acara | 1440 × 3158 | 390 × 5013 |
| U02 | Simbol Ganesha di bawah mantra | 166 × 166 | 134 × 134 |
| U03 | Bulan di sisi kiri undangan | 528 × 554 | 222 × 233 |
| U04 | Balon di sisi kanan atas undangan | 690 × 730 | 345 × 480 |
| U05 | Istana di sisi kanan dekat nama pasangan | 542 × 409 | 231 × 174 |

U01 mengikuti tinggi section, yang berubah menjadi 3860 px pada rentang laptop dua kolom.

### 7.3 Kartu acara — E01 sampai E09

| Kode | Gambar / lokasi | Desktop (px) | Mobile (px) |
| --- | --- | --- | --- |
| E01 | Ilustrasi utama Ta'aruf | 268 × 405,3 | 268 × 405,3 |
| E02 | Ilustrasi utama Jak Keumalen | 268 × 405,3 | 268 × 405,3 |
| E03 | Ilustrasi utama Peukong Haba | 268 × 405,3 | 268 × 405,3 |
| E04 | Ilustrasi utama Persiapan Hari Bahagia | 268 × 405,3 | 268 × 405,3 |
| E05 | Ilustrasi utama Akad Nikah | 268 × 405,3 | 268 × 405,3 |
| E06 | Ilustrasi utama Seumapa & Peusijuek | 268 × 405,3 | 268 × 405,3 |
| E07 | Balon dekorasi kiri atas pada keenam kartu | 141 × 187 | 141 × 187 |
| E08 | Istana dekorasi kiri bawah pada keenam kartu | 196 × 178 | 196 × 178 |
| E09 | Bulan dekorasi kanan pada keenam kartu | 162 × 222 | 162 × 222 |

Untuk E07, E08, atau E09, sertakan nama acara jika hanya satu kartu yang ingin diganti, misalnya **E07 khusus Ta'aruf**.

### 7.4 Lokasi dan pasangan — C01 sampai C10

| Kode | Gambar / lokasi | Desktop (px) | Mobile (px) |
| --- | --- | --- | --- |
| C01 | Latar section lokasi dan pasangan | 1440 × 2470 | 390 × 2542 |
| C02 | Bingkai luar medali lokasi | 680 × 680 | 924 × 924 |
| C03 | Isi lingkaran medali lokasi | 522 × 522 | 716 × 716 |
| C04 | Ikon medali lokasi | 60 × 64 | 88 × 93 |
| C05 | Ornamen di atas judul pasangan | 108 × 108 | 93 × 93 |
| C06 | Bingkai galeri pasangan | 897 × 897 | 931 × 931 |
| C07 | Foto pasangan 1 | sekitar 247 × 300 | sekitar 247 × 314 |
| C08 | Foto pasangan 2 | sekitar 247 × 300 | sekitar 247 × 314 |
| C09 | Foto pasangan 3 | sekitar 247 × 300 | sekitar 247 × 314 |
| C10 | Foto pasangan 4 | sekitar 247 × 300 | sekitar 247 × 314 |

Foto galeri memakai `object-fit: cover` dalam jendela oval. Letak wajah dan ruang di sekitar subjek perlu disesuaikan terhadap crop tersebut. Untuk C06, posisi dan transparansi bukaan oval harus mengikuti bingkai asli.

### 7.5 RSVP dan informasi tamu — G01 sampai G09

| Kode | Gambar / lokasi | Desktop (px) | Mobile (px) |
| --- | --- | --- | --- |
| G01 | Latar section RSVP dan informasi tamu | 1440 × 1840 | 390 × 2728 |
| G02 | Bingkai luar medali RSVP | 680 × 680 | 924 × 924 |
| G03 | Isi lingkaran medali RSVP | 522 × 522 | 716 × 716 |
| G04 | Ikon medali RSVP | 60 × 64 | 97 × 88 |
| G05 | Ornamen di atas “Things to know” | 108 × 108 | 64 × 64 |
| G06 | Ikon Hashtag | 88 × 88 | 119 × 119 |
| G07 | Ikon Weather | 88 × 88 | 119 × 119 |
| G08 | Ikon Staff | 88 × 88 | 119 × 119 |
| G09 | Ikon Parking | 88 × 88 | 119 × 119 |

G01 mengikuti tinggi section, yang menjadi 2110 px pada lebar 810–1199 px.

### 7.6 Penutup / Instagram — F01 sampai F04

| Kode | Gambar / lokasi | Desktop (px) | Mobile (px) |
| --- | --- | --- | --- |
| F01 | Latar section penutup dan hitung mundur | 1440 × 1280 | 390 × 1168 |
| F02 | Bingkai luar medali Instagram | 680 × 680 | 924 × 924 |
| F03 | Isi lingkaran medali Instagram | 522 × 522 | 734 × 734 |
| F04 | Ikon medali Instagram | 60 × 64 | 91 × 71 |

### 7.7 File yang dipakai ulang

Contoh hubungan antar-kode:

- Balon: H04, U04, E07. H04 dan U04 mempunyai varian mobile tersendiri.
- Bulan: H05, U03, E09.
- Istana hero/undangan: H03 dan U05. Istana kartu acara E08 memakai file berbeda.
- Bintang dasar: H01 dan H22.
- Bintang bawah: H23 dan H24.

Kode menunjuk **lokasi pemakaian**, bukan selalu file unik. Karena itu, mengganti sebuah file bersama secara langsung dapat memengaruhi beberapa lokasi. Katalog menampilkan tautan antar-kode yang berbagi file.

## 8. Prosedur penggantian gambar

### 8.1 Informasi yang dikirim pengguna

```text
Kode gambar: H04
File pengganti: [lampirkan gambar]
Versi layar: desktop dan mobile
Cakupan: hanya balon di hero
Pertahankan: ukuran, posisi, dan animasi saat ini
Catatan tambahan: [bila ada]
```

Contoh untuk dekorasi kartu acara:

```text
Kode gambar: E07
Kartu acara: Ta'aruf saja
File pengganti: [lampirkan gambar]
Versi layar: mobile saja
Pertahankan: ukuran dan posisi yang sekarang
```

### 8.2 Menyiapkan file

1. Buka kode yang dimaksud di katalog dan unduh contoh file aslinya.
2. Ikuti rasio kanvas serta posisi objek dalam kanvas contoh.
3. Untuk dekorasi berlapis, gunakan PNG atau WebP dengan transparansi yang sesuai.
4. Resolusi boleh lebih tinggi daripada kotak tampil; ukuran kotak CSS tidak harus menjadi resolusi file sumber.
5. Untuk bingkai galeri, pertahankan bukaan oval dan area transparannya.
6. Untuk foto pasangan, siapkan komposisi yang tetap baik setelah dipotong ke jendela oval.
7. Jika ada varian desktop dan mobile, tentukan varian yang akan diganti.

### 8.3 Langkah implementasi penggantian

1. Cocokkan kode, preview, selector, dan file sumber pada katalog.
2. Tentukan cakupan: satu lokasi, satu kartu acara, satu versi layar, atau seluruh pemakaian file bersama.
3. Tambahkan file pengganti pada `public/images/`. Helper gambar saat ini mengharapkan nama file berakhiran `.webp`; file PNG yang diterima dapat dikonversi dengan menjaga alpha/transparansi.
4. Ubah referensi pada komponen, data, atau CSS yang sesuai dengan cakupan tersebut. Untuk satu lokasi, gunakan referensi khusus agar lokasi lain tidak ikut berganti.
5. Pertahankan koordinat, ukuran kotak, layering/z-index, dan atribut animasi jika itu yang diminta.
6. Perbarui metadata katalog yang terkait. Data layer hero terbaca melalui `heroLayers`, sementara banyak entri lain ditulis pada `artwork-catalog.ts`.
7. Jika urutan array layer hero berubah, cocokkan kembali index pada pemanggilan `heroSlot(...)` di katalog.
8. Periksa hasil desktop dan mobile, termasuk transparansi, crop, animasi, tepi atas, serta full-width.
9. Tambahkan entri perubahan pada dokumen ini.

### 8.4 Sumber yang diubah menurut jenis gambar

| Jenis perubahan | Sumber utama |
| --- | --- |
| Layer hero, posisi dan varian mobile | `src/components/hero.tsx` |
| Pemetaan artwork bersama | `src/lib/invitation.ts` |
| Enam ilustrasi utama acara | Array `events` pada `src/lib/invitation.ts` |
| Dekorasi bersama kartu acara | `src/components/invitation.tsx` |
| Medali lokasi/RSVP/Instagram | Objek `designs` pada `src/components/medallion.tsx` |
| Foto pasangan | Array `photos` pada `src/lib/invitation.ts` |
| Ikon Hashtag/Weather/Staff/Parking | Array `guestDetails` pada `src/lib/invitation.ts` |
| Latar section dan varian mobile-nya | `src/app/globals.css` |
| Informasi dan kode pada katalog | `src/lib/artwork-catalog.ts` |

## 9. Peta file pengembangan

| File / direktori | Peran |
| --- | --- |
| `src/app/page.tsx` | Susunan halaman undangan utama |
| `src/app/demos/mountain/page.tsx` | Rute demo yang tersedia |
| `src/app/layout.tsx` | Metadata, viewport, preload font, dan fallback tanpa JavaScript |
| `src/app/globals.css` | Komposisi, font, keyframes, entrance, loop, breakpoint, dan full-width |
| `src/components/art.tsx` | Komponen gambar dengan pemuatan, reveal, dan motion attributes |
| `src/components/artwork-animations.tsx` | Observer dan lifecycle animasi |
| `src/components/hero.tsx` | Data layer hero, koordinat desktop/mobile, dan ekspor `heroLayers` |
| `src/components/hero-title.tsx` | Animasi judul per huruf dan kesiapan font |
| `src/components/invitation.tsx` | Isi undangan serta kartu acara |
| `src/components/couple-section.tsx` | Lokasi dan pengenalan pasangan |
| `src/components/medallion.tsx` | Desain medali, tautan, ikon, dan rotasi scroll |
| `src/components/photo-gallery.tsx` | Galeri, slideshow, tombol, titik indikator, serta swipe |
| `src/components/guest-information.tsx` | RSVP dan informasi tamu |
| `src/components/invitation-footer.tsx` | Section penutup |
| `src/components/demo-controls.tsx` | Musik dan skip link |
| `src/lib/invitation.ts` | Referensi artwork, tautan, data acara, ikon tamu, dan foto |
| `src/lib/artwork-catalog.ts` | Inventaris 61 kode lokasi gambar |
| `src/app/panduan-gambar/page.tsx` | Tampilan katalog visual |
| `src/app/panduan-gambar/page.module.css` | Styling katalog yang terpisah dari tampilan undangan |
| `public/images/`, `public/fonts/`, `public/audio/` | Aset lokal |
| `tests/invitation.spec.ts` | Suite browser untuk halaman undangan |
| `playwright.config.ts` | Chrome headless, base URL, timeout, dan reporter |
| `scripts/` | Utilitas inspeksi referensi/clone dan persiapan aset yang tersedia di proyek |
| `reference/` | Materi referensi yang tersedia di proyek |
| `test-results/` | Output pengujian, termasuk screenshot saat tes terkait dijalankan |
| `DEVELOPMENT_LOG.md` | Rekam keputusan, perubahan, parameter, dan verifikasi |

## 10. Menjalankan dan memeriksa proyek

Jalankan perintah dari folder `D:\WEDDING`.

### Instalasi sesuai lockfile

```powershell
npm ci
```

### Server development

```powershell
npm run dev
```

Script development menggunakan `next dev --hostname 0.0.0.0`.

### Build dan server production lokal

```powershell
npm run build
npm run start
```

Script start menggunakan `next start --hostname 0.0.0.0`. Jika server production sebelumnya masih berjalan, hentikan instance aplikasi tersebut lalu jalankan ulang setelah build selesai. Instance `next start` yang lama dapat tetap menyajikan build lama.

Selama sesi, server background juga pernah dijalankan menggunakan child process Node yang detached dengan `stdio: 'ignore'`. Ini digunakan setelah metode `Start-Process` sempat tertahan sampai timeout pada harness. Untuk penggunaan terminal biasa, `npm run start` sudah cukup. PID proses berubah setiap restart dan bukan bagian konfigurasi proyek.

### Pemeriksaan TypeScript

```powershell
npm run typecheck
```

### Suite Playwright

Server pada `http://localhost:3000` harus sudah berjalan. Konfigurasi Playwright saat ini tidak mendefinisikan `webServer` otomatis.

```powershell
npm test -- --workers=2
```

Filter yang pernah dipakai untuk pemeriksaan responsif dan traversal konten:

```powershell
npm test -- --workers=2 --grep "renders without overflow|all displayed content"
```

Filter untuk pemeriksaan render responsif:

```powershell
npm test -- --workers=2 --grep "renders without overflow"
```

## 11. Rekam pengujian dan verifikasi

Bagian ini membedakan suite permanen dari pemeriksaan browser tambahan selama sesi. Jumlah tes adalah hasil pada tahap yang dicatat, bukan klaim bahwa seluruh suite selalu dijalankan ulang pada setiap perubahan berikutnya.

### 11.1 Suite permanen: `tests/invitation.spec.ts`

Suite lengkap memiliki 19 pengujian dan telah lulus pada beberapa tahap penyesuaian animasi serta desktop.

Cakupan:

- Render tanpa overflow/error pada 320, 390, 768, 1024, 1440, dan 1920 px.
- Judul utama memiliki accessible name yang sesuai.
- Enam kartu acara dan empat informasi tamu tampil.
- Kontrol galeri, pause slideshow, anchor lokasi, dan musik bekerja.
- Rute `/demos/mountain` serta konfigurasi tujuan tersedia.
- Transform ilustrasi berubah pada 390 dan 1440 px.
- Ilustrasi undangan masuk sesuai arah lalu tetap bergerak.
- Heading di luar layar reveal dengan transisi, tetap terlihat setelah traversal, dan tidak mengulang entrance saat dikunjungi kembali.
- Kelompok ilustrasi bawah memiliki repeat motion.
- Artwork pause di luar area observer dan aktif kembali saat terlihat.
- Reduced motion membuat artwork diam serta konten tetap terlihat.
- Konten dan gambar siap untuk screenshot setelah traversal halaman.
- Halaman tetap terlihat tanpa JavaScript.

### 11.2 Hasil yang tercatat menurut tahap

| Tahap / pemeriksaan | Hasil |
| --- | --- |
| TypeScript pada tahap awal perbaikan hero | `npm run typecheck` berhasil |
| Build production setelah perubahan aplikasi | Berhasil, termasuk build penambahan `/panduan-gambar` |
| Suite lengkap setelah kalibrasi hero | 19 lulus |
| Suite lengkap setelah animasi section lain | 19 lulus |
| Suite lengkap setelah penyesuaian desktop awal | 19 lulus |
| Pemeriksaan fokus setelah penyempurnaan breakpoint desktop | 7 lulus |
| Pemeriksaan fokus setelah desktop full-width | 7 lulus |
| Pemeriksaan render setelah gap atas mobile dihapus | 6 lulus |
| Katalog: kode lokasi | 61 kode, semuanya unik |
| Katalog: preview | 67 gambar termuat, 0 preview rusak |
| Katalog: render 320/390/768/1440 px | Tidak ada overflow horizontal halaman |
| Katalog: perbandingan ke halaman asli | 61 kode cocok pada desktop 1440 px, termasuk H24 yang tersembunyi dengan kotak 0 × 0; 61 kode cocok pada mobile 390 px |

Pada tahap awal pernah terjadi dua kegagalan assertion durasi karena browser mengakses server production yang masih memakai build lama. Setelah build dan restart server, suite lengkap lulus. Karena itu, pemeriksaan berikutnya selalu memastikan server menyajikan build terbaru.

### 11.3 Pemeriksaan tambahan desktop/mobile

Pemeriksaan browser tambahan selama sesi meliputi:

1. **Penjagaan mobile ketika mengubah desktop:** membandingkan style 233 elemen menggunakan ukuran, posisi, font, grid, serta variabel motion/reveal pada lebar 320, 390, 768, dan 809 px. Hasil cocok sebelum–sesudah perubahan desktop. Koreksi padding mobile pada tahap berikutnya memang mengubah jarak atas menjadi 0 sesuai permintaan pengguna.
2. **Desktop adaptif:** memeriksa 810, 1024, 1200, 1280, 1366, 1400, 1440, dan 1920 px. Tidak ada kartu acara terpotong; grid acara berada dalam tinggi section; teks informasi tamu memiliki jarak terhadap grid di bawahnya.
3. **Full-width:** memeriksa 1440, 1920, 2560, dan 3840 px, dengan dan tanpa scrollbar gutter. Gap kiri/kanan seluruh section bernilai 0 dan rasio hero sesuai toleransi pembulatan browser.
4. **Gap atas:** memeriksa 320, 390, 425, 768, 809, 1440, dan 1920 px. Padding atas 0, hero mulai di y 0, tanpa gap samping atau overflow.
5. **Katalog:** memuat preview, memeriksa ID unik, menguji viewport, lalu membandingkan ukuran dan file setiap kode dengan selector pada undangan asli dalam mode reduced motion agar transform loop tidak mengubah pengukuran.

Pemeriksaan katalog menggunakan ukuran kotak yang dirender dan file yang dipilih pada versi layar tersebut, termasuk gambar responsif dalam elemen `<picture>` dan background CSS.

Total 122 pasangan kode/layar terdiri dari 121 pemeriksaan ukuran kotak yang digunakan dan satu pemeriksaan bahwa H24 tersembunyi pada desktop. Dengan demikian, angka 122 bukan berarti ada 122 gambar yang terlihat sekaligus.

## 12. Konten dan konfigurasi baseline

Nilai berikut dicatat agar pengembangan selanjutnya tidak menganggap konten demo sebagai konfigurasi final pengguna:

| Bagian | Nilai pada saat rekap |
| --- | --- |
| Nama pasangan | Abhishek dan Kanika |
| Acara | Ta'aruf, Jak Keumalen, Peukong Haba, Persiapan Hari Bahagia, Akad Nikah, Seumapa & Peusijuek |
| Lokasi tertulis | The Savoy, Mussoorie |
| Tautan lokasi | `https://missingpiecedesign.com/` |
| Tautan Instagram | `https://missingpiecedesign.com/` |
| RSVP WhatsApp | `https://wa.me/91XXXXXXXXXX` |
| Hitung mundur footer | Teks statis `00:00:00:00`, dengan label bahwa countdown telah berakhir |
| Foto pasangan | Empat file dalam array `photos` |
| Musik | `/audio/wedding.mp3`, dimulai melalui tombol pengguna dan loop saat diputar |
| Metadata robots | `index: false`, `follow: false` pada root layout |
| Header framework | `poweredByHeader: false` pada `next.config.ts` |

Data acara, teks informasi tamu, dan tautan terpusat dapat ditemukan di `src/lib/invitation.ts`; beberapa teks masih berada langsung pada komponen masing-masing.

## 13. Artefak pemeriksaan

### Output di workspace

- `test-results/clone-1440.jpg` dan `test-results/clone-390.jpg` dihasilkan oleh tes traversal/screenshot ketika tes tersebut dijalankan.
- Output `test-results/` dapat dibersihkan atau ditimpa oleh proses Playwright berikutnya.
- Data katalog permanen berada di `src/lib/artwork-catalog.ts`.
- Implementasi visual katalog berada di `src/app/panduan-gambar/`.

### Artefak sementara sesi lokal

Selama sesi, screenshot dan skrip pemeriksaan tambahan ditempatkan di:

```text
C:\Users\Lenovo\AppData\Local\Temp\opencode\
```

Contoh nama artefak yang dibuat:

- `wedding-desktop-before-*.png` dan `wedding-desktop-after-*.png`.
- `wedding-laptop-after-events.png`.
- `wedding-desktop-final-couple.png` dan `wedding-desktop-final-location.png`.
- `wedding-full-width-1920.png`.
- `wedding-mobile-top-fixed.png`.
- `wedding-catalog-desktop.png` dan `wedding-catalog-mobile.png`.
- `verify-wedding-catalog.mjs` untuk pemeriksaan 61 kode, 67 preview, file sumber, dan 122 pasangan kode/layar, termasuk status tidak digunakan pada desktop untuk H24.

Artefak di folder Temp adalah pendukung sesi, bukan dependensi aplikasi atau suite tes permanen. Acuan implementasi untuk pekerjaan berikutnya adalah kode sumber, katalog, dan dokumen ini.

## 14. Panduan melanjutkan pekerjaan

### Ringkasan untuk pengembang atau sesi berikutnya

1. Baca arahan desain pada bagian 3 sebelum mengubah animasi atau layout.
2. Gunakan kondisi akhir pada bagian 5–6; jangan mengambil nilai percobaan yang dibatalkan dari riwayat DEV-01/DEV-02.
3. Jika pengguna mengirim gambar baru, minta atau cocokkan kode katalog beserta cakupan desktop/mobile dan lokasi pemakaiannya.
4. Pertahankan perbedaan entrance halus dan loop yang terlihat.
5. Untuk perubahan desktop, gunakan media query yang sesuai dan bandingkan mobile setelahnya.
6. Pertahankan full-width desktop serta posisi atas hero 0.
7. Cocokkan file katalog dengan sumber render ketika mengganti gambar.
8. Jalankan pemeriksaan yang sesuai dengan area perubahan, lalu catat hasilnya dengan jelas.
9. Bila yang berjalan adalah server production lokal, build ulang dan restart instance aplikasi sebelum memeriksa perubahan.
10. Tambahkan entri baru berikut hasil verifikasi ke dokumen ini.

### Format entri pengembangan berikutnya

```markdown
### DEV-XX — Judul perubahan

Tanggal:
Permintaan pengguna:
Kode gambar terkait, jika ada:
Cakupan: desktop / mobile / keduanya

Perubahan:
- ...

File yang diubah:
- ...

Verifikasi yang dijalankan dan hasil:
- ...

Feedback / keputusan:
- ...

Tindak lanjut:
- ...
```

Untuk perubahan ukuran, posisi, atau durasi, perbarui pula tabel kondisi akhir yang terkait. Dengan demikian, riwayat tetap lengkap dan baseline terbaru tetap mudah ditemukan.
