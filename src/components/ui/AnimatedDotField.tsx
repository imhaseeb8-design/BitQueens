import type { CSSProperties } from 'react';
import styles from './AnimatedDotField.module.css';

const DOTS = [
  [315.5, 222.0, 1.60], [330.1, 222.1, 1.60], [345.0, 222.3, 1.49], [359.7, 222.0, 1.49],
  [374.3, 222.0, 1.49], [389.5, 222.0, 1.60], [404.0, 222.0, 1.69], [418.7, 222.0, 1.49],
  [315.5, 237.0, 1.38], [330.4, 236.6, 3.09], [344.9, 236.7, 3.24], [359.7, 237.1, 4.89],
  [374.5, 237.0, 4.85], [389.4, 236.8, 4.79], [404.1, 236.8, 4.72], [418.7, 237.0, 1.49],
  [315.5, 251.5, 1.13], [330.0, 251.5, 1.60], [344.9, 251.5, 3.19], [359.4, 251.6, 4.82],
  [374.5, 251.6, 4.89], [389.4, 251.6, 4.82], [404.0, 251.5, 4.85], [419.0, 251.3, 1.49],
  [315.5, 266.0, 1.38], [330.0, 266.3, 1.49], [344.9, 266.4, 3.14], [359.5, 266.5, 3.19],
  [374.5, 266.5, 4.92], [389.5, 266.5, 4.92], [404.0, 266.5, 4.85], [419.0, 266.3, 1.49],
  [315.5, 281.0, 1.38], [330.3, 281.0, 1.49], [345.0, 281.3, 1.49], [359.6, 281.4, 3.09],
  [374.5, 281.3, 3.09], [389.5, 281.3, 4.82], [404.0, 281.1, 4.75], [418.7, 281.0, 1.49],
  [315.3, 296.0, 1.49], [330.3, 296.0, 1.49], [344.9, 295.9, 1.60], [359.4, 295.8, 1.26],
  [374.5, 295.6, 3.14], [389.4, 295.9, 3.14], [404.0, 295.8, 3.34], [418.7, 296.0, 1.49],
  [315.5, 311.0, 1.38], [330.1, 310.9, 1.60], [344.9, 310.9, 1.60], [359.8, 310.8, 1.38],
  [374.2, 310.8, 1.38], [389.0, 310.7, 1.49], [404.1, 310.8, 3.29], [418.8, 310.8, 1.38],
  [315.5, 325.0, 1.38], [330.1, 325.1, 1.60], [345.0, 325.3, 1.49], [359.7, 325.0, 1.49],
  [374.3, 325.0, 1.49], [389.5, 325.0, 1.60], [404.1, 325.1, 1.60], [418.7, 325.0, 1.49],
] as const;

type AnimatedDotFieldProps = {
  className?: string;
  /** Duration of the single hover spin, in seconds. */
  duration?: number;
  alt?: string;
};

type DotFieldStyle = CSSProperties & {
  '--dot-field-duration': string;
};

/** Transparent vector recreation of the supplied 8 × 8 dot field. */
export function AnimatedDotField({
  className,
  duration = 2.4,
  alt = '',
}: AnimatedDotFieldProps) {
  const style: DotFieldStyle = {
    '--dot-field-duration': `${Math.max(duration, 1)}s`,
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
          viewBox="300 207 135 135"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
        >
          {DOTS.map(([cx, cy, radius]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} />
          ))}
        </svg>
      </div>
    </div>
  );
}
