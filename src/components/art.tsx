import type { CSSProperties } from 'react';
import { image } from '@/lib/invitation';

export type ArtMotion = 'translate' | 'rotate' | 'sway' | 'breathe';

type ArtProps = {
  name: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  eager?: boolean;
  motion?: ArtMotion;
  reveal?: 'auto' | 'top' | 'left' | 'right' | false;
};

export function Art({ name, className = '', style, alt = '', eager = false, motion, reveal = 'auto' }: ArtProps) {
  return <img src={image(name)} alt={alt} aria-hidden={alt ? undefined : true} className={className} style={style} data-art-motion={motion} data-reveal={reveal || undefined} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />;
}
