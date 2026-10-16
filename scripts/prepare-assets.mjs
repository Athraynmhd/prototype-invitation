import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import sharp from 'sharp';

const layouts = await Promise.all([1440, 390].map(width => readFile(`reference/layout-${width}.json`, 'utf8').then(JSON.parse)));
await mkdir('public/fonts', { recursive: true });
await mkdir('public/audio', { recursive: true });
const images = [...new Set(layouts.flatMap(layout => layout.images.map(image => image.src.split('?')[0])))];
let completed = 0;
const manifest = [];
for (const url of images) {
  const name = url.split('/').pop();
  const path = `public/images/${name}`;
  try {
    try { await access(path); } catch {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await writeFile(path, Buffer.from(await response.arrayBuffer()));
    }
    const uses = layouts.flatMap(layout => layout.images.filter(image => image.src.split('?')[0] === url));
    const width = Math.min(1600, Math.max(256, ...uses.map(image => image.w * 1.5)));
    await sharp(path).resize({ width: Math.round(width), withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.replace(/\.(png|jpe?g)$/, '.webp'));
    manifest.push({ name, width, count: uses.length });
    completed++;
  } catch (error) { console.log(`${name}: ${error.message}`); }
}
const fonts = {
  'cormorant': 'https://fonts.gstatic.com/s/cormorant/v24/H4clBXOCl9bbnla_nHIq75u9.woff2',
  'cormorant-infant': 'https://fonts.gstatic.com/s/cormorantinfant/v22/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWUjjg.woff2',
  'cormorant-upright': 'https://fonts.gstatic.com/s/cormorantupright/v19/VuJrdM3I2Y35poFONtLdafkUCHw1y1vShDU.woff2',
  'cormorant-unicase': 'https://fonts.gstatic.com/s/cormorantunicase/v25/HI_QiZUaILtOqhqgDeXoF_n1_fTGX9vUlMI.woff2',
  'manrope': 'https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2',
  'gotu': 'https://fonts.gstatic.com/s/gotu/v18/o-0FIpksx3QOpHsBi7h6.woff2',
};
await Promise.all(Object.entries(fonts).map(async ([name, url]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font ${name}: ${response.status}`);
  await writeFile(`public/fonts/${name}.woff2`, Buffer.from(await response.arrayBuffer()));
}));
const music = await fetch('https://framerusercontent.com/assets/q8x7MYVF61gOLfkcxdG7dlXjxw.mp3');
if (music.ok) await writeFile('public/audio/wedding.mp3', Buffer.from(await music.arrayBuffer()));
await writeFile('reference/asset-manifest.json', JSON.stringify(manifest, null, 2));
const thumbs = await Promise.all(manifest.map(async ({ name }, index) => {
  const image = await sharp(`public/images/${name}`).resize(180, 140, { fit: 'contain', background: '#c5bea6' }).png().toBuffer();
  const label = Buffer.from(`<svg width="200" height="30"><rect width="200" height="30" fill="white"/><text x="5" y="20" font-size="11">${index + 1}: ${name.slice(0, 23)}</text></svg>`);
  return [{ input: image, left: (index % 5) * 200 + 10, top: Math.floor(index / 5) * 175 }, { input: label, left: (index % 5) * 200, top: Math.floor(index / 5) * 175 + 140 }];
}));
await sharp({ create: { width: 1000, height: Math.ceil(manifest.length / 5) * 175, channels: 3, background: '#c5bea6' } }).composite(thumbs.flat()).jpeg({ quality: 85 }).toFile('reference/all-assets.jpg');
console.log(`Prepared ${completed} optimized local images, ${Object.keys(fonts).length} fonts and original music.`);
