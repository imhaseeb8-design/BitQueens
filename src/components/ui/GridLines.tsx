import styles from './GridLines.module.css';

interface GridLinesProps {
  /** Invert the hairlines for use over a dark full-bleed band. */
  onDark?: boolean;
}

/**
 * The two margin rails. Decorative — hidden from assistive tech.
 */
export function GridLines({ onDark = false }: GridLinesProps) {
  return (
    <div
      className={`${styles.grid} ${onDark ? styles.onDark : ''}`}
      aria-hidden="true"
    >
      <span className={`${styles.line} ${styles.left}`} />
      <span className={`${styles.line} ${styles.right}`} />
    </div>
  );
}
