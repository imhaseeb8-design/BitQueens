import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ImageSlot as ImageSlotContent } from '@/lib/types';
import styles from './ImageSlot.module.css';

interface ImageSlotProps {
  content: ImageSlotContent;
  /** Invert for placement on a dark band. */
  onDark?: boolean;
  /** Accent square colour. */
  mark?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders the photograph once `src` is set, and a labelled placeholder until
 * then. Swapping in real photography is a content-file edit, not a code change.
 */
export function ImageSlot({
  content,
  onDark = false,
  mark,
  className = '',
  style,
}: ImageSlotProps) {
  if (content.src) {
    return (
      <Image
        src={content.src}
        alt={content.alt}
        width={content.width}
        height={content.height}
        className={`${styles.image} ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className={`${styles.slot} ${onDark ? styles.onDark : ''} ${className}`}
      style={{ ...style, '--slot-mark': mark } as CSSProperties}
      role="img"
      aria-label={`Photography pending: ${content.alt}`}
    >
      <span className={styles.note}>
        Photography · {content.width} × {content.height} · {content.alt}
      </span>
      <span className={styles.mark} aria-hidden="true" />
    </div>
  );
}
