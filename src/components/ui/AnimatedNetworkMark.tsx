import type { CSSProperties } from 'react';
import styles from './AnimatedNetworkMark.module.css';

type AnimatedNetworkMarkProps = {
  className?: string;
  /** Duration of the single hover spin, in seconds. */
  duration?: number;
  alt?: string;
};

type NetworkMarkStyle = CSSProperties & {
  '--network-mark-duration': string;
};

/** Clean, transparent vector recreation of the supplied network mark. */
export function AnimatedNetworkMark({
  className,
  duration = 2.4,
  alt = '',
}: AnimatedNetworkMarkProps) {
  const style: NetworkMarkStyle = {
    '--network-mark-duration': `${Math.max(duration, 1)}s`,
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden={alt ? undefined : true}
    >
      <div className={styles.object}>
        <svg
          className={styles.art}
          viewBox="0 0 168 168"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          fill="none"
        >
          <g className={styles.spokes}>
            <path d="M84 84V36M84 84L60 60M84 84H36M84 84L60 108M84 84V132M84 84L108 108M84 84H132M84 84L108 60" />
          </g>
          <g className={styles.nodes}>
            <circle cx="84" cy="36" r="8" />
            <circle cx="60" cy="60" r="8" />
            <circle cx="36" cy="84" r="8" />
            <circle cx="60" cy="108" r="8" />
            <circle cx="84" cy="132" r="8" />
            <circle cx="108" cy="108" r="8" />
            <circle cx="132" cy="84" r="8" />
            <circle cx="108" cy="60" r="8" />
            <circle cx="84" cy="84" r="8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
