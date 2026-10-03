import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { AcademyVsBiet as AcademyVsBietContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyVsBiet.module.css';

/**
 * "Academy or BIET?" — the clarifier the brief demands.
 *
 * Two cards, no ambiguity: the Academy card in paper with the slate-blue
 * marker, the BIET card in deep green as the formal "next step". One link
 * out to /biet; nothing else competes.
 */
export function AcademyVsBiet({ content }: { content: AcademyVsBietContent }) {
  return (
    <section
      id="biet"
      aria-label="Academy or BIET"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>{content.headline}</h2>
        </Reveal>

        <div className={styles.cards}>
          <Reveal className={`${styles.card} ${styles.academy}`}>
            <p className={styles.kicker}>Start here</p>
            <h3 className={styles.title}>{content.academy.title}</h3>
            <p className={styles.body}>{content.academy.body}</p>
          </Reveal>

          <Reveal delay={120} className={`${styles.card} ${styles.biet}`}>
            <p className={styles.kicker}>Go formal</p>
            <h3 className={styles.title}>{content.biet.title}</h3>
            <p className={styles.body}>{content.biet.body}</p>
            <Button
              href={content.biet.cta.href}
              variant="primary"
              onDark
              arrow={false}
              size="compact"
              className={styles.cta}
            >
              {content.biet.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
