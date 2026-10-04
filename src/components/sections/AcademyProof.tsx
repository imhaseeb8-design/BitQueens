import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/ui/Reveal';
import type { AcademyProof as AcademyProofContent } from '@/lib/types';
import { interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyProof.module.css';

/**
 * What the Academy has actually done — the four reported figures.
 *
 * Directly under the hero, because a page that asks a beginner to apply to an
 * undated cohort has to show its record first. One ruled row of large
 * figures: the number, what it counts, and one sentence saying what it means.
 * The figures count up on reveal, the same way the homepage sets them.
 */
export function AcademyProof({ content }: { content: AcademyProofContent }) {
  return (
    <section
      aria-label={content.headline}
      className={`${styles.section} ${neueMontreal.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <h2 className="bq-visually-hidden">{content.headline}</h2>

        <dl className={styles.stats}>
          {content.stats.map((stat, i) => (
            <Reveal key={stat.label} as="div" delay={i * 80} className={styles.stat}>
              <dt className={styles.group}>
                <Figure value={stat.value} className={styles.figure} />
                <span className={styles.label}>{stat.label}</span>
              </dt>
              <dd className={styles.support}>{stat.support}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
