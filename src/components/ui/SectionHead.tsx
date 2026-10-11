import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  /** Omit where the headline carries the section on its own. */
  eyebrow?: string;
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
 * The shared section header: an optional slate-blue eyebrow, two-line
 * headline (sans over serif), optional intro. Every Academy section uses
 * this — do not hand-roll another header.
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
      {eyebrow && (
        <Reveal>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>
      )}
      <TextReveal
        text={headlineSerif ? `${headline}\n${headlineSerif}` : headline}
        className={styles.headline}
        lineClassNames={headlineSerif ? [styles.line, `${styles.line} ${styles.serif}`] : [styles.line]}
        delay={0.08}
      />
      {intro && (
        <Reveal delay={140}>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
