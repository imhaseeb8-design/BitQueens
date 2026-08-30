import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionTone = 'canvas' | 'forest' | 'blue' | 'ink';

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: SectionTone;
  /** Vertical rhythm. `loose` for the statement bands, `tight` for utility. */
  density?: 'tight' | 'default' | 'loose';
  /** The hairline that opens a light band. Omit on dark bands. */
  rule?: boolean;
  /** Accessible name for the landmark. */
  label: string;
}

const toneClass: Record<SectionTone, string> = {
  canvas: '',
  forest: styles.forest,
  blue: styles.blue,
  ink: styles.ink,
};

export function Section({
  id,
  children,
  tone = 'canvas',
  density = 'default',
  rule = false,
  label,
}: SectionProps) {
  const densityClass =
    density === 'tight'
      ? styles.tight
      : density === 'loose'
        ? styles.loose
        : '';

  return (
    <section
      id={id}
      aria-label={label}
      className={[styles.section, toneClass[tone], densityClass]
        .filter(Boolean)
        .join(' ')}
    >
      {rule && <div className={styles.rule} />}
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
