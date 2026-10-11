import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import type { AboutHero } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutHero.module.css';

/**
 * The About hero, rebuilt on the shape the other page heroes use: centred
 * copy over the dotted map, a green 56px headline, the 18px lede, and the
 * site's button pair. It was a two-column layout at its own 1180 measure
 * with hand-rolled links, which is why the page opened in a different
 * language from every other one.
 *
 * `hero.art` is no longer rendered: the map is the ground every hero on the
 * site uses, and a second illustration beside it competed with it. The asset
 * and its content entry are untouched.
 */
export default function AboutHero({ hero }: { hero: AboutHero }) {
  return (
    <section
      aria-label="About BitQueens"
      className={`${styles.hero} ${displaySans.variable} ${bodySans.variable}`}
    >
      <GlobalDotMap className={styles.map} />

      <div className={styles.inner}>
        <TextReveal
          as="h1"
          text={`${hero.headline}\n${hero.headlineSerif}`}
          className={styles.headline}
          lineClassNames={[styles.line, styles.line]}
        />
        <Reveal delay={140}>
          <p className={styles.body}>{hero.body}</p>
        </Reveal>
        <Reveal delay={200} className={styles.ctas}>
          <Button href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="secondary"
            className={styles.secondaryCta}
          >
            {hero.secondaryCta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
