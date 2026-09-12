import type { CSSProperties } from 'react';
import styles from './AnimatedDotGlobe.module.css';

// Dot centres extracted from the supplied artwork at its native 1212 × 1296
// coordinate space. Keeping them as vectors preserves the original layout at
// every rendered size without carrying a large raster asset.
const DOTS = [
  [464.3, 153.4], [605.6, 153.4], [675.9, 153.4], [534.8, 153.5], [746.7, 153.5],
  [605.6, 224.1], [323.5, 224.2], [393.7, 224.2], [464.4, 224.2], [676.0, 224.2],
  [817.1, 224.3], [887.5, 224.3], [746.6, 294.3], [252.7, 294.4], [393.7, 294.4],
  [534.8, 294.4], [958.1, 294.5], [746.6, 365.1], [1028.8, 365.1], [182.5, 365.2],
  [323.3, 365.2], [534.8, 365.2], [958.2, 365.2], [887.7, 435.4], [323.5, 435.5],
  [393.7, 435.5], [464.3, 435.5], [605.6, 435.5], [676.0, 435.5], [746.8, 435.5],
  [958.1, 435.5], [1028.8, 435.5], [182.5, 435.6], [252.6, 435.6], [534.8, 435.6],
  [817.0, 435.6], [111.9, 506.2], [252.6, 506.2], [534.8, 506.2], [817.0, 506.3],
  [1028.9, 506.3], [1099.2, 506.3], [111.9, 576.8], [252.6, 576.8], [817.0, 576.8],
  [1028.9, 576.8], [534.8, 576.9], [1099.2, 576.9], [111.9, 647.4], [393.8, 647.4],
  [464.4, 647.4], [746.6, 647.4], [182.5, 647.5], [252.6, 647.5], [323.5, 647.5],
  [534.9, 647.5], [605.5, 647.5], [676.0, 647.5], [887.7, 647.5], [958.2, 647.5],
  [1028.8, 647.5], [1099.2, 647.5], [817.1, 647.6], [111.8, 717.9], [252.7, 717.9],
  [817.0, 717.9], [534.7, 718.0], [1028.9, 718.0], [1099.1, 718.0], [111.9, 788.7],
  [534.8, 788.7], [1099.2, 788.7], [252.6, 788.8], [817.0, 788.8], [1028.8, 788.8],
  [182.6, 859.1], [252.6, 859.1], [393.7, 859.1], [464.4, 859.1], [534.8, 859.1],
  [605.5, 859.1], [676.0, 859.1], [746.7, 859.1], [817.0, 859.1], [887.6, 859.1],
  [1028.8, 859.1], [323.5, 859.2], [958.2, 859.2], [182.5, 929.8], [323.4, 929.9],
  [534.8, 929.9], [746.6, 929.9], [958.2, 929.9], [1028.8, 930.0], [252.7, 1000.3],
  [958.1, 1000.3], [393.7, 1000.4], [534.8, 1000.4], [746.6, 1000.4], [323.4, 1071.0],
  [393.8, 1071.0], [464.4, 1071.0], [605.5, 1071.1], [675.9, 1071.1], [817.1, 1071.1],
  [887.6, 1071.1], [464.4, 1141.6], [534.9, 1141.6], [605.6, 1141.6], [676.0, 1141.6],
  [746.6, 1141.6],
] as const;

type AnimatedDotGlobeProps = {
  className?: string;
  /** One complete left-to-right-to-left cycle, in seconds. */
  duration?: number;
  /** Keep empty when the globe is decorative. */
  alt?: string;
};

type GlobeStyle = CSSProperties & {
  '--globe-duration': string;
};

/**
 * A fixed-position dotted globe with a slow, continuous 3D spin.
 * The artwork never translates, so its centre remains anchored in the layout.
 */
export function AnimatedDotGlobe({
  className,
  duration = 14,
  alt = '',
}: AnimatedDotGlobeProps) {
  const style: GlobeStyle = {
    '--globe-duration': `${Math.max(duration, 1)}s`,
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden={alt ? undefined : true}
    >
      <div className={styles.globe}>
        <svg
          className={styles.art}
          viewBox="0 0 1212 1296"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
        >
          {DOTS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="26" />
          ))}
        </svg>
      </div>
    </div>
  );
}
