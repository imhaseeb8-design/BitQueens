import type { CSSProperties, ReactNode } from 'react';
import styles from './HoverSpin.module.css';

/**
 * Wraps a decorative SVG mark so it completes one 3D spin per hover — its own,
 * or that of the nearest ancestor carrying `data-spin-group`.
 *
 * The SVG paints in `--mark-color`, so the surface that holds the mark decides
 * its colour (and can change it on hover along with everything else).
 */
export function HoverSpin({
  children,
  className = '',
  /** Seconds for the one spin. */
  duration = 2.4,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      style={{ '--spin-duration': `${Math.max(duration, 1)}s` } as CSSProperties}
      aria-hidden="true"
    >
      <div className={styles.object}>{children}</div>
    </div>
  );
}
