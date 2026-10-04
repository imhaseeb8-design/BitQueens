import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import type { AcademyHero as AcademyHeroContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyHero.module.css';

/**
 * Academy hero — "this is where you join".
 *
 * The homepage hero's shape: everything centred on the page ground over the
 * animated dotted map, faint and washed out toward the bottom so the copy
 * never fights the dots. No artwork panel — the page opens on the sentence,
 * not on a picture.
 *
 * Server Component: the only client leaf is the map's canvas.
 */
export function AcademyHero({ content }: { content: AcademyHeroContent }) {
  return (
    <section
      aria-label="BitQueens Academy"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.band}>
        <GlobalDotMap className={styles.map} />
        <span className={styles.wash} aria-hidden="true" />

        <div className={styles.inner}>
          <Reveal variant="fade">
            <p className={styles.eyebrow}>{content.eyebrow}</p>
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
