import { Button } from '@/components/ui/Button';
import { DotFieldMark, DotGlobeMark, NetworkMark } from '@/components/ui/PathMarks';
import { Reveal } from '@/components/ui/Reveal';
import type { PathSection, PathStep } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Path.module.css';

const MARKS: Record<PathStep['mark'], typeof DotGlobeMark> = {
  globe: DotGlobeMark,
  dots: DotFieldMark,
  network: NetworkMark,
};

/**
 * The three-step beginner path — Figma 288:442.
 *
 * A two-line headline on the left, the intro and CTA right-aligned opposite
 * it, then three flat cards in a row. Every card rests on the warm white; the
 * frame paints the first one green to show the hover state, which is what a
 * card becomes under the pointer — and its corner mark takes one turn while
 * it does. Below, one centred line closes the section.
 *
 * Server Component: the hover and the spin are CSS.
 */
export function Path({ content }: { content: PathSection }) {
  return (
    <section
      id="path"
      aria-label="Where you start"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal className={styles.heading}>
            <h2 className={styles.headline}>
              <span className={styles.headlineLine}>{content.headline}</span>
              <span className={`${styles.headlineLine} ${styles.serif}`}>
                {content.headlineMuted}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={120} className={styles.introBlock}>
            <p className={styles.intro}>{content.intro}</p>
            <Button href={content.cta.href} variant="green" size="compact" className={styles.cta}>
              {content.cta.label}
            </Button>
          </Reveal>
        </div>

        <ol className={styles.cards}>
          {content.steps.map((step, i) => {
            const Mark = MARKS[step.mark];
            return (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 90}
                className={styles.card}
                data-spin-group=""
              >
                <p className={styles.step}>Step {String(i + 1).padStart(2, '0')}</p>
                <Mark className={styles.mark} />
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.description}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={200} as="p" className={styles.closing}>
          {content.closing}
        </Reveal>
      </div>
    </section>
  );
}
