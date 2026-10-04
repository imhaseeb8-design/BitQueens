import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import type { ConferenceHeroSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './ConferenceHero.module.css';

/**
 * /conference hero — the same shape the Academy opens with: centred copy over
 * the dot map, washed out at the bottom so the type sits clear of it.
 */
export function ConferenceHero({ content }: { content: ConferenceHeroSection }) {
  return (
    <section
      aria-label="The BitQueens Conference"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <GlobalDotMap className={styles.map} />
      <div className={styles.wash} />

      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className={styles.headline}>
            <span className={styles.line}>{content.headline}</span>
            <span className={`${styles.line} ${styles.serif}`}>
              {content.headlineSerif}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
        <Reveal delay={200} className={styles.ctas}>
          <Button href={content.primaryCta.href} variant="green">
            {content.primaryCta.label}
          </Button>
          <Button href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
