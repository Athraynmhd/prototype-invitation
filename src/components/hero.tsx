import type { CSSProperties } from 'react';
import { Art, type ArtMotion } from './art';
import { HeroTitle } from './hero-title';
import { artwork, image } from '@/lib/invitation';

type Rect = readonly [number, number, number, number];
type Layer = { name: string; desktop: Rect; mobile: Rect; mobileName?: string; className?: string; motion?: ArtMotion; z?: number };

// Coordinates preserve the original paper-theatre composition on each artboard.
const layers: Layer[] = [
  { name: artwork.stars, desktop: [0, 700, 1440, 803], mobile: [0, 451, 390, 357], z: 0 },
  { name: artwork.lowerStars, desktop: [-122, 1503, 1685, 1282], mobile: [-33, 1108, 456, 300], z: 0 },
  { name: artwork.lowerStars, desktop: [0, 0, 0, 0], mobile: [-33, 808, 456, 300], className: 'phone-only', z: 0 },
  { name: artwork.palace, desktop: [149, 1043, 904, 682], mobile: [31, 645, 308, 232], className: 'motion-hotel', motion: 'translate', z: 1 },
  { name: artwork.balloon, mobileName: artwork.mobileBalloon, desktop: [37, 593, 786, 832], mobile: [-17, 398, 367, 511], className: 'motion-balloon', motion: 'translate', z: 1 },
  { name: artwork.moon, desktop: [976, 1450, 362, 379.609], mobile: [184, 810, 166, 174.078], className: 'motion-moon', motion: 'rotate', z: 1 },
  // Optically center H06 on the ring, whose axis sits left of the source canvas center.
  { name: artwork.proposal, desktop: [-67, 1580, 1640, 1556], mobile: [-50, 983, 510, 484], className: 'motion-hills', motion: 'translate', z: 2 },
  { name: 'rEehKhdtkygCYWwZsEWl6rkOY', desktop: [-888, 519, 1651, 2395], mobile: [-412, 434, 743, 1078], className: 'motion-tree-left', motion: 'translate', z: 3 },
  { name: 'ZSJY7eumK7S41MjYYufhtN01IRg', desktop: [701, 473, 1561, 2297], mobile: [40, 319, 736, 1083], className: 'motion-tree-right', motion: 'translate', z: 3 },
  { name: 'h09-ornamen-bunga', desktop: [312.5, 383, 815, 646], mobile: [-21, 266, 432, 343], className: 'motion-lift', motion: 'translate', z: 4 },
  { name: 'f7Vmkbdc4BW3zKHb26ksJL3fjE', desktop: [732, 350, 724, 574], mobile: [197, 297, 250, 198], className: 'motion-leaves-drop', motion: 'translate', z: 4 },
  { name: 'yLyHOR0RXbyZbQFfhrMI61lFHG4', desktop: [12, 350, 724, 574], mobile: [-57, 297, 250, 198], className: 'motion-leaves-drop', motion: 'translate', z: 4 },
  { name: 'EdEFe6n6lZU38I3Q3QjTMt9iEY', desktop: [1310, 218, 130, 2568], mobile: [318, -21, 72, 1422], z: 5 },
  { name: 'nANJUUA3JunmZmLf3Peu7TbmMU', desktop: [923, 286, 823, 744], mobile: [258, 340, 278, 251], className: 'motion-leaves-lift', motion: 'translate', z: 6 },
  { name: 'LjMVHbCtoHm46EvfNtJa0PczbLw', desktop: [0, 183, 130, 2587], mobile: [0, -32, 72, 1433], z: 5 },
  { name: 'zGRmbM0Kc7cI5GZh2XKWu9xP920', desktop: [-312, 286, 823, 744], mobile: [-146, 340, 278, 251], className: 'motion-leaves-lift', motion: 'translate', z: 6 },
  { name: 'O8OgsmAHClxaPrCg7jS8lEFVO8E', desktop: [-60, 2366, 361, 438], mobile: [-26, 1229, 150, 182], z: 6 },
  { name: 'LGk7fDm17zukhruB2ql24Jgzaq0', desktop: [1139, 2377, 361, 408], mobile: [266, 1229, 150, 182], z: 6 },
  { name: 'FZrF0IYCyry5YbaC0YGwqR4xmrU', desktop: [-429, 2638, 2299, 165], mobile: [-414, 1322, 1219, 88], z: 7 },
  { name: 'h19-ornamen-bunga-kiri', desktop: [-20, 2413, 287, 390], mobile: [-10, 1241, 120, 180], className: 'ambient-breathe', motion: 'breathe', z: 8 },
  { name: 'h20-ornamen-bunga-kanan', desktop: [1173, 2413, 287, 390], mobile: [280, 1241, 120, 180], className: 'ambient-breathe', motion: 'breathe', z: 8 },
  { name: 'HvPxJF5tlETfDdKrl00JuLQppA', desktop: [613, 2570, 215, 240], mobile: [142, 1298, 106, 118], className: 'ambient-breathe', motion: 'breathe', z: 8 },
  { name: artwork.canopy, mobileName: artwork.mobileCanopy, desktop: [0, 0, 1440, 700], mobile: [0, 0, 390, 451], z: 9 },
];

// Shared with the replacement guide so its hero dimensions match the actual scene.
export const heroLayers = layers;

export function Hero() {
  return (
    <section className="hero relative isolate" aria-label="Abhishek weds Kanika">
      {layers.map(({ name, mobileName, desktop: d, mobile: p, z, className = '', motion }, index) => {
        const style = { '--dx': `${d[0] / 14.4}%`, '--dy': `${d[1] / 14.4}cqw`, '--dw': `${d[2] / 14.4}%`, '--dh': `${d[3] / 14.4}cqw`, '--mx': `${p[0] / 3.9}%`, '--my': `${p[1] / 3.9}cqw`, '--mw': `${p[2] / 3.9}%`, '--mh': `${p[3] / 3.9}cqw`, zIndex: z } as CSSProperties;
        return mobileName ? (
          <picture className={`hero-layer ${className}`} style={style} data-art-motion={motion} data-reveal="top" key={`${name}-${index}`}>
            <source media="(max-width: 809px)" srcSet={image(mobileName)} />
            <Art name={name} eager reveal={false} />
          </picture>
        ) : <Art name={name} key={`${name}-${index}`} className={`hero-layer ${className}`} style={style} motion={motion} reveal="top" eager={z === 4 || z === 6} />;
      })}
      <HeroTitle />
    </section>
  );
}
