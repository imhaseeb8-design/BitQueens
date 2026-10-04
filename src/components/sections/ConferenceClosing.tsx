import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { ConferenceClosingSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './ConferenceClosing.module.css';

/** The page's one door, on the forest band the site closes dark sections with. */
export function ConferenceClosing({
  content,
}: {
  content: ConferenceClosingSection;
}) {
  return (
    <section
      aria-label="Join BitQueens"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>
            <span className={styles.line}>{content.headline}</span>
            <span className={`${styles.line} ${styles.serif}`}>
              {content.headlineSerif}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
        <Reveal delay={160} className={styles.ctaRow}>
          <Button href={content.cta.href} variant="primary" onDark arrow={false}>
            {content.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
