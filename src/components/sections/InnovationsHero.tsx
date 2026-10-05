import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import type { InnovationsHero as InnovationsHeroContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyHero.module.css';
import labsStyles from './InnovationsHero.module.css';

/** Labs uses the Academy hero layout with its own copy and branch accent. */
export function InnovationsHero({ content }: { content: InnovationsHeroContent }) {
  return (
    <section
      aria-label="BitQueens Innovations and Labs"
      className={`${styles.section} ${labsStyles.hero} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.band}>
        <GlobalDotMap className={styles.map} />
        <span className={styles.wash} aria-hidden="true" />

        <div className={styles.inner}>
          <Reveal variant="fade">
            <p className={`${styles.eyebrow} ${labsStyles.eyebrow}`}>{content.eyebrow}</p>
          </Reveal>

          <Reveal delay={80} variant="fade">
            <h1 className={styles.headline}>
              <span className={styles.line}>{content.headline}</span>
              <span className={`${styles.line} ${styles.serif}`}>
                {content.headlineSerif}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140} variant="fade">
            <p className={styles.body}>{content.body}</p>
          </Reveal>

          <Reveal delay={200} className={styles.ctas}>
            <Button href={content.primaryCta.href} size="compact" className={styles.primaryCta}>
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              variant="secondary"
              size="compact"
              className={styles.secondaryCta}
            >
              {content.secondaryCta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
