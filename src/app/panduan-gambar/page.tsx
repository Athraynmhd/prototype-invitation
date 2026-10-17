import type { Metadata } from 'next';
import { artworkGroups, artworkSlots, type ArtworkSlot } from '@/lib/artwork-catalog';
import { image } from '@/lib/invitation';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Panduan Gambar | Ichsan & Ulfa',
  description: 'Katalog kode gambar, preview, posisi, dan ukuran desktop serta mobile untuk penggantian ilustrasi undangan.',
};

const number = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

function sizeLabel(size: readonly [number, number]) {
  return size[0] === 0 || size[1] === 0 ? 'Tidak digunakan' : `${number.format(size[0])} × ${number.format(size[1])} px`;
}

function filesFor(slot: ArtworkSlot) {
  return [slot.asset, slot.mobileAsset ?? slot.asset];
}

function Preview({ slot, asset, label }: { slot: ArtworkSlot; asset: string; label: string }) {
  return (
    <figure className={styles.preview}>
      <a href={image(asset)} target="_blank" rel="noopener noreferrer" aria-label={`Buka gambar ${slot.id}, ${label}`}>
        <img src={image(asset)} alt={`${slot.title} — ${label}`} loading="lazy" decoding="async" />
      </a>
      <figcaption><span>{label}</span><a href={image(asset)} download={`${slot.id}-${label.toLowerCase().replaceAll(' ', '-')}.webp`}>Unduh contoh</a></figcaption>
    </figure>
  );
}

export default function ArtworkGuide() {
  return (
    <main className={styles.page} lang="id">
      <header className={styles.header}>
        <div className={styles.container}>
          <a className={styles.back} href="/">← Kembali ke undangan</a>
          <p className={styles.eyebrow}>ACUAN PENGGANTIAN GAMBAR</p>
          <h1>Peta gambar undangan</h1>
          <p className={styles.intro}>Satu kode untuk setiap lokasi gambar. Pilih preview, catat kodenya, lalu kirim gambar penggantinya agar kita merujuk elemen yang sama.</p>
          <div className={styles.stats}><span>{artworkSlots.length} kode gambar</span><span>{artworkGroups.length} bagian</span><span>Desktop + mobile</span></div>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.instructions} aria-labelledby="cara-pakai">
          <div>
            <h2 id="cara-pakai">Cara meminta penggantian</h2>
            <ol>
              <li>Pilih kode gambar dari katalog, misalnya <a href="#H04">H04 — balon hero</a>.</li>
              <li>Kirim file pengganti dan sebutkan desktop, mobile, atau keduanya.</li>
              <li>Sebutkan apakah hanya lokasi tersebut atau semua pemakaian gambar yang sama.</li>
            </ol>
            <p className={styles.example}>“Ganti H04 dengan gambar ini, desktop dan mobile. Pertahankan ukuran, posisi, dan animasinya. Hanya balon di hero.”</p>
          </div>
          <div className={styles.help}>
            <h2>Ukuran yang tercantum</h2>
            <p>Ukuran kotak tampil pada acuan layar <strong>desktop 1440 px</strong> dan <strong>mobile 390 px</strong>, sebelum efek gerakan. Hero menyesuaikan lebar layar; ilustrasi kartu acara di laptop 810–1399 px diskalakan 90%.</p>
            <p>File baru boleh beresolusi lebih tinggi. Gunakan <strong>Unduh contoh</strong> untuk mengikuti rasio kanvas asli. Untuk dekorasi, pertahankan area transparan dan letak objek di dalam kanvas agar hasilnya sejajar.</p>
          </div>
        </section>
      </div>

      <nav className={styles.navigation} aria-label="Bagian katalog gambar">
        <div className={styles.container}>
          {artworkGroups.map(group => <a href={`#bagian-${group.id}`} key={group.id}>{group.title}<span>{group.slots.length}</span></a>)}
        </div>
      </nav>

      <div className={styles.container}>
        {artworkGroups.map((group, index) => (
          <section className={styles.group} id={`bagian-${group.id}`} key={group.id} aria-labelledby={`judul-${group.id}`}>
            <div className={styles.groupHeading}><span>{String(index + 1).padStart(2, '0')}</span><div><h2 id={`judul-${group.id}`}>{group.title}</h2><p>{group.description}</p></div></div>
            <div className={styles.grid}>
              {group.slots.map(slot => {
                const shared = artworkSlots.filter(other => other.id !== slot.id && filesFor(other).some(file => filesFor(slot).includes(file)));
                return (
                  <article className={styles.card} id={slot.id} key={slot.id} data-artwork-id={slot.id}>
                    <div className={styles.cardHeading}><a className={styles.code} href={`#${slot.id}`}>{slot.id}</a><span className={styles.kind}>{slot.kind === 'background' ? 'Latar' : slot.kind === 'photo' ? 'Foto' : 'Ilustrasi'}</span></div>
                    <h3>{slot.title}</h3>
                    <div className={styles.previews}>
                      <Preview slot={slot} asset={slot.asset} label={slot.mobileAsset ? 'Desktop' : slot.desktop[0] === 0 ? 'Mobile saja' : 'Desktop dan mobile'} />
                      {slot.mobileAsset && <Preview slot={slot} asset={slot.mobileAsset} label="Mobile" />}
                    </div>
                    <dl className={styles.sizes}><div><dt>Desktop</dt><dd>{sizeLabel(slot.desktop)}</dd></div><div><dt>Mobile</dt><dd>{sizeLabel(slot.mobile)}</dd></div></dl>
                    <div className={styles.position}><strong>Posisi{slot.mobilePosition ? ' desktop' : ''}</strong><p>{slot.position}</p>{slot.mobilePosition && <><strong>Posisi mobile</strong><p>{slot.mobilePosition}</p></>}</div>
                    {slot.note && <p className={styles.note}>{slot.note}</p>}
                    {shared.length > 0 && <div className={styles.shared}><strong>File yang sama juga dipakai di</strong><div>{shared.map(other => <a href={`#${other.id}`} key={other.id} title={other.title}>{other.id}</a>)}</div></div>}
                    <details className={styles.technical}><summary>Detail file &amp; lokasi kode</summary><dl><dt>File desktop</dt><dd><code>{slot.asset}.webp</code></dd>{slot.mobileAsset && <><dt>File mobile</dt><dd><code>{slot.mobileAsset}.webp</code></dd></>}<dt>Selector</dt><dd><code>{slot.selector}</code></dd><dt>Sumber</dt><dd><code>{slot.source}</code></dd></dl></details>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        <footer className={styles.footer}>Untuk mulai mengganti gambar, kirim kode + file baru + versi layar + cakupan penggantian. Contoh: <strong>H04 · file baru · keduanya · hanya hero</strong>.</footer>
      </div>
    </main>
  );
}
