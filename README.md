# Prototype Invitation

Undangan pernikahan interaktif berbasis Next.js, React, dan Tailwind CSS.

## Menjalankan secara lokal

Gunakan Node.js 22.x.

```sh
npm ci
npm run dev
```

## Deploy ke Vercel

1. Import repository `Athraynmhd/prototype-invitation` di Vercel.
2. Pilih framework **Next.js** dan Root Directory **`.`** (root repository).
3. Gunakan Build Command `npm run build` dan biarkan Output Directory mengikuti default Next.js.
4. Gunakan Node.js **22.x**, lalu klik **Deploy**.

Proyek saat ini tidak membutuhkan environment variable. Halaman tersedia di `/`,
`/demos/mountain`, dan `/panduan-gambar`.

## Aset dan konten

Gambar siap pakai berada di `public/images`, font di `public/fonts`, dan musik di
`public/audio`. Semua aset tersebut disertakan dalam repository dan dilayani
melalui path publik sehingga tidak bergantung pada path lokal Windows.

Folder sumber `GAMBAR - BARU`, konfigurasi lokal `.kilo`, dan bahan referensi lokal
di `reference` (termasuk profil browser) dikecualikan dari Git. Build tidak membutuhkan folder sumber gambar
atau menjalankan skrip pengambilan aset di `scripts`.

Data acara dan tautan undangan berada di `src/lib/invitation.ts`. Tautan lokasi,
Instagram, serta nomor WhatsApp masih berupa konfigurasi demo; sesuaikan sebelum
membagikan undangan final.

## Verifikasi

```sh
npm run build
npm run typecheck
```

Untuk tes browser yang sudah tersedia, jalankan server lokal di port 3000 terlebih
dahulu, lalu jalankan `npm test` (memerlukan Google Chrome).
