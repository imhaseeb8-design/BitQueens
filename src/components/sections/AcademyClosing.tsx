import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { AcademyClosing as AcademyClosingContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyClosing.module.css';

/**
 * The closing band — "Your place is here."
 *
 * The forest band the homepage closes its dark sections with, carrying the
 * page's final two doors: join, or go back up to the programmes. The cream
 * primary button is the counter-accent the palette assigns to dark bands.
 */
export function AcademyClosing({ content }: { content: AcademyClosingContent }) {
  return (
    <section
      id="join"
      aria-label="Join the Academy"
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
        <Reveal delay={160} className={styles.ctas}>
          <Button
            href={content.primaryCta.href}
            variant="primary"
            onDark
            arrow={false}
          >
            {content.primaryCta.label}
          </Button>
          <Button
            href={content.secondaryCta.href}
            variant="secondary"
            onDark
            arrow={false}
          >
            {content.secondaryCta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
