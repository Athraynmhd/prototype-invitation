import sharp from 'sharp';

for (const [name, top, height] of [['hero', 10, 2785], ['invitation', 2795, 1600], ['events', 4395, 1558], ['couple', 5953, 2309], ['details', 8262, 1730], ['footer', 9992, 1193]]) {
  await sharp('reference/full-1440.jpg').extract({ left: 0, top, width: 1440, height }).resize({ width: 1000 }).toFile(`reference/section-${name}.jpg`);
}
for (const top of [8752, 9650, 10550, 11450]) {
  await sharp('reference/full-390.jpg').extract({ left: 0, top, width: 390, height: 900 }).toFile(`reference/mobile-${top}.jpg`);
}
