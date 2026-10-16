import { heroLayers } from '@/components/hero';
import { artwork, events, guestDetails, photos } from './invitation';

type Size = readonly [number, number];

export type ArtworkSlot = {
  id: string;
  title: string;
  asset: string;
  mobileAsset?: string;
  desktop: Size;
  mobile: Size;
  position: string;
  mobilePosition?: string;
  selector: string;
  source: string;
  note?: string;
  kind: 'decoration' | 'background' | 'photo';
};

export type ArtworkGroup = {
  id: string;
  title: string;
  description: string;
  slots: ArtworkSlot[];
};

function slot(id: string, title: string, asset: string, desktop: Size, mobile: Size, position: string, selector: string, source: string, extra: Partial<ArtworkSlot> = {}): ArtworkSlot {
  return { id, title, asset, desktop, mobile, position, selector, source, kind: 'decoration', ...extra };
}

function heroSlot(id: string, title: string, index: number): ArtworkSlot {
  const layer = heroLayers[index];
  const [dx, dy, dw, dh] = layer.desktop;
  const [mx, my, mw, mh] = layer.mobile;
  return slot(id, title, layer.name, [dw, dh], [mw, mh], `x ${dx}, y ${dy} dari pojok kiri atas hero`, `.hero > .hero-layer:nth-child(${index + 1})`, 'src/components/hero.tsx', {
    mobileAsset: layer.mobileName,
    mobilePosition: `x ${mx}, y ${my} dari pojok kiri atas hero`,
    note: 'Koordinat dan ukuran mengikuti artboard hero. Area transparan dan bagian di luar layar termasuk dalam komposisi.',
  });
}

const invitationSource = 'src/components/invitation.tsx';
const medallionSource = 'src/components/medallion.tsx';
const gallerySource = 'src/components/photo-gallery.tsx';
const guestSource = 'src/components/guest-information.tsx';
const backgroundSource = 'src/app/globals.css';
const medallionNote = 'Bingkai mobile sengaja lebih lebar dari layar. Pertahankan lingkaran, pusat gambar, dan area transparannya.';
const photoNote = 'Foto berada di jendela oval dengan object-fit: cover. Bagian tepi foto dapat terpotong; tempatkan wajah di tengah.';

// Measurements are the base layout boxes at 1440px desktop / 390px mobile,
// before animated transforms. They are not the source files' pixel dimensions.
export const artworkGroups: ArtworkGroup[] = [
  {
    id: 'hero', title: 'Hero / pembuka', description: 'Latar bintang, balon, bulan, pepohonan, dan lapisan panggung di halaman pembuka.',
    slots: [
      slot('H01', 'Latar dasar bintang', artwork.stars, [1440, 2785], [390, 1408], 'Menutup seluruh hero, di belakang semua elemen', '.hero', backgroundSource, { kind: 'background', note: 'Latar menggunakan background-size: cover. File ini juga digunakan oleh lapisan bintang H22.' }),
      heroSlot('H02', 'Tirai bintang / kanopi paling atas', 22),
      heroSlot('H03', 'Istana di atas awan', 3),
      heroSlot('H04', 'Balon udara', 4),
      heroSlot('H05', 'Bulan', 5),
      heroSlot('H06', 'Bukit dan adegan pasangan', 6),
      heroSlot('H07', 'Pohon besar kiri', 7),
      heroSlot('H08', 'Pohon besar kanan', 8),
      heroSlot('H09', 'Ornamen lengkung tengah', 9),
      heroSlot('H10', 'Dedaunan turun kiri', 11),
      heroSlot('H11', 'Dedaunan turun kanan', 10),
      heroSlot('H12', 'Dedaunan depan kiri', 15),
      heroSlot('H13', 'Dedaunan depan kanan', 13),
      heroSlot('H14', 'Pilar bunga kiri', 14),
      heroSlot('H15', 'Pilar bunga kanan', 12),
      heroSlot('H16', 'Ornamen sudut bawah kiri', 16),
      heroSlot('H17', 'Ornamen sudut bawah kanan', 17),
      heroSlot('H18', 'Landasan panggung paling bawah', 18),
      heroSlot('H19', 'Dekorasi bergerak bawah kiri', 19),
      heroSlot('H20', 'Dekorasi bergerak bawah kanan', 20),
      heroSlot('H21', 'Dekorasi bergerak bawah tengah', 21),
      heroSlot('H22', 'Lapisan bintang tengah', 0),
      heroSlot('H23', 'Lapisan bintang bawah', 1),
      heroSlot('H24', 'Lapisan bintang tambahan mobile', 2),
    ],
  },
  {
    id: 'undangan', title: 'Isi undangan', description: 'Latar dan ilustrasi di sekitar teks undangan serta nama pasangan.',
    slots: [
      slot('U01', 'Latar pola undangan dan acara', 'SPr0bvMk9Lu3lQOpXzLoknBPaJo', [1440, 3158], [390, 5013], 'Seluruh section undangan, termasuk kartu acara', '.invitation-section', backgroundSource, { kind: 'background', mobileAsset: 'OhKsaRXATwXiQKdJxCPeJ5gOLoY', note: 'Di laptop 810–1399 px, tinggi section menjadi 3860 px untuk tiga baris kartu. Latar tetap mengikuti section.' }),
      slot('U02', 'Simbol Ganesha', artwork.ganesha, [166, 166], [134, 134], 'Tengah atas, di bawah mantra', '.invitation-ganesha', invitationSource),
      slot('U03', 'Bulan di samping undangan', artwork.moon, [528, 554], [222, 233], 'Sisi kiri teks undangan', '.invitation-moon', invitationSource),
      slot('U04', 'Balon di samping undangan', artwork.balloon, [690, 730], [345, 480], 'Sisi kanan atas teks undangan', '.invitation-balloon', invitationSource, { mobileAsset: artwork.mobileBalloon }),
      slot('U05', 'Istana di samping undangan', artwork.palace, [542, 409], [231, 174], 'Sisi kanan, dekat nama pasangan', '.invitation-palace', invitationSource),
    ],
  },
  {
    id: 'acara', title: 'Kartu acara', description: 'Enam ilustrasi acara dan dekorasi yang mengelilinginya.',
    slots: [
      ...events.map((event, index) => slot(`E0${index + 1}`, `Ilustrasi ${event.name}`, event.art, [268, 405.3], [268, 405.3], `Gambar utama kartu ${event.name}, di tengah bingkai oval`, `.event-card:nth-child(${index + 1}) .event-portrait`, invitationSource, { note: 'Bentuk oval menyatu dengan file ilustrasi. Pertahankan siluet dan area transparan di sekelilingnya.' })),
      slot('E07', 'Balon dekorasi kartu acara', artwork.balloon, [141, 187], [141, 187], 'Kiri atas gambar utama; dipakai pada keenam kartu', '.event-card .event-balloon', invitationSource, { note: "Sebutkan nama acara jika hanya satu kartu yang ingin diganti, misalnya E07 khusus Ta'aruf." }),
      slot('E08', 'Istana dekorasi kartu acara', '64NTAFiZlzU2kGaVG82xflIhbqk', [196, 178], [196, 178], 'Kiri bawah gambar utama; dipakai pada keenam kartu', '.event-card .event-palace', invitationSource, { note: 'Sebutkan nama acara untuk mengganti satu kartu saja.' }),
      slot('E09', 'Bulan dekorasi kartu acara', artwork.moon, [162, 222], [162, 222], 'Kanan gambar utama; dipakai pada keenam kartu', '.event-card .event-moon', invitationSource, { note: 'Sebutkan nama acara untuk mengganti satu kartu saja.' }),
    ],
  },
  {
    id: 'pasangan', title: 'Lokasi dan pasangan', description: 'Medali lokasi, ornamen judul, bingkai galeri, serta empat foto pasangan.',
    slots: [
      slot('C01', 'Latar section pasangan', 'gBnMB6ghHljVUqx9JmFOWkp7Yh4', [1440, 2470], [390, 2542], 'Seluruh section lokasi dan pasangan', '.couple-section', backgroundSource, { kind: 'background', mobileAsset: 'zftzqaNk2eBB4UQosVCKxLTcg' }),
      slot('C02', 'Bingkai luar medali lokasi', 'c02-medali-lokasi-luar', [680, 680], [924, 924], 'Medali “See the route”, lapisan terluar yang berputar', '.medallion-location .medallion-outer', medallionSource, { note: medallionNote }),
      slot('C03', 'Isi medali lokasi', 'gpuyLKzQFz8PbRrE1RR3LfnRWw', [522, 522], [716, 716], 'Lingkaran bagian dalam medali lokasi', '.medallion-location .medallion-inner', medallionSource),
      slot('C04', 'Ikon medali lokasi', 'FMx33N0QNZEN9o98413jFSazlw', [60, 64], [88, 93], 'Di bawah teks “Click to open the map”', '.medallion-location .medallion-icon', medallionSource),
      slot('C05', 'Ornamen judul pasangan', artwork.heart, [108, 108], [93, 93], 'Di atas tulisan “MEET THE Bride & Groom”', '.meet-flourish', 'src/components/couple-section.tsx'),
      slot('C06', 'Bingkai galeri pasangan', artwork.frame, [897, 897], [931, 931], 'Mengelilingi foto pasangan; foto berada di bukaan oval', '.gallery-frame', gallerySource, { note: 'Pertahankan posisi dan transparansi bukaan foto agar bingkai baru tetap sejajar dengan foto serta tombol galeri.' }),
      ...photos.map((photo, index) => slot(`C${String(index + 7).padStart(2, '0')}`, `Foto pasangan ${index + 1}`, photo, [897 * .2754, 897 * .3345], [931 * .2653, 931 * .3373], `Slide ${index + 1} di jendela foto oval`, `.gallery-photo:nth-child(${index + 1})`, gallerySource, { kind: 'photo', note: photoNote })),
    ],
  },
  {
    id: 'tamu', title: 'RSVP dan informasi tamu', description: 'Medali RSVP dan ikon pada bagian “Things to know”.',
    slots: [
      slot('G01', 'Latar informasi tamu', 'bsMApjuWNtSH6ZoQiKsathtFI', [1440, 1840], [390, 2728], 'Seluruh section RSVP dan informasi tamu', '.guest-section', backgroundSource, { kind: 'background', mobileAsset: 'Ek4UmYDGiGa27intXXkAykog', note: 'Di layar 810–1199 px, tinggi section menjadi 2110 px untuk dua baris informasi.' }),
      slot('G02', 'Bingkai luar medali RSVP', 'g02-medali-rsvp-luar', [680, 680], [924, 924], 'Medali “Looking forward to see you”, lapisan terluar', '.medallion-rsvp .medallion-outer', medallionSource, { note: medallionNote }),
      slot('G03', 'Isi medali RSVP', 'KBiow1jmaeWHazxshSNGQ08lvw', [522, 522], [716, 716], 'Lingkaran bagian dalam medali RSVP', '.medallion-rsvp .medallion-inner', medallionSource),
      slot('G04', 'Ikon medali RSVP', 'GUNxHDQlW7tXOiQkxIgQNaqyQVw', [60, 64], [97, 88], 'Di bawah teks “Click the link to RSVP”', '.medallion-rsvp .medallion-icon', medallionSource),
      slot('G05', 'Ornamen judul informasi tamu', artwork.flourish, [108, 108], [64, 64], 'Di atas tulisan “Things to know”', '.guest-flourish', guestSource),
      ...guestDetails.map((detail, index) => slot(`G0${index + 6}`, `Ikon ${detail.title}`, detail.icon, [88, 88], [119, 119], `Di atas judul ${detail.title}`, `.guest-detail:nth-child(${index + 1}) .guest-icon`, guestSource)),
    ],
  },
  {
    id: 'penutup', title: 'Penutup / Instagram', description: 'Latar dan medali Instagram di bagian akhir undangan.',
    slots: [
      slot('F01', 'Latar section penutup', 'uHJCRyTJO5bFnINnfmo5GFo0sQ', [1440, 1280], [390, 1168], 'Seluruh section penutup dan hitung mundur', '.invitation-footer', backgroundSource, { kind: 'background' }),
      slot('F02', 'Bingkai luar medali Instagram', 'f02-medali-instagram-luar', [680, 680], [924, 924], 'Medali “Follow the action”, lapisan terluar', '.medallion-instagram .medallion-outer', medallionSource, { note: medallionNote }),
      slot('F03', 'Isi medali Instagram', 'Aof0oMPsYxLFv2zceiax3Nj7qyU', [522, 522], [734, 734], 'Lingkaran bagian dalam medali Instagram', '.medallion-instagram .medallion-inner', medallionSource),
      slot('F04', 'Ikon medali Instagram', 'gdmN2dDmg0szS1jwXPJFJZ0xsIE', [60, 64], [91, 71], 'Di bawah teks “Click the link to open Instagram”', '.medallion-instagram .medallion-icon', medallionSource),
    ],
  },
];

export const artworkSlots = artworkGroups.flatMap(group => group.slots);
