import { Reveal } from './Reveal';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  eyebrow: string;
  headline: string;
  /** The serif second line. Omit when the headline is one line. */
  headlineSerif?: string;
  intro?: string;
  /** Centre the block (closing bands, FAQ). Left is the default. */
  align?: 'left' | 'center';
  /** Invert for placement on a dark band. */
  onDark?: boolean;
}

/**
 * The shared section header: slate-blue eyebrow, two-line headline
 * (sans over serif), optional intro. Every Academy section uses this —
 * do not hand-roll another header.
 */
export function SectionHead({
  eyebrow,
  headline,
  headlineSerif,
  intro,
  align = 'left',
  onDark = false,
}: SectionHeadProps) {
  return (
    <div
      className={[
        styles.head,
        align === 'center' ? styles.center : '',
        onDark ? styles.onDark : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal>
        <p className={styles.eyebrow}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className={styles.headline}>
          <span className={styles.line}>{headline}</span>
          {headlineSerif && (
            <span className={`${styles.line} ${styles.serif}`}>
              {headlineSerif}
            </span>
          )}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={140}>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
