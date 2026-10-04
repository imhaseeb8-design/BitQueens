import Image from 'next/image';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/ui/Reveal';
import { home } from '@/content/home';
import type { AcademyProof as AcademyProofContent } from '@/lib/types';
import { interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyProof.module.css';

/* The homepage's own collaborator logos, imported rather than re-listed, so
   the two pages cannot drift apart. */
const { logos } = home.hero.collaborators;

/**
 * What the Academy has actually done — the four reported figures.
 *
 * Directly under the hero, because a page that asks a beginner to apply to an
 * undated cohort has to show its record first.
 *
 * On the division green, closed by the organisations that will vouch for it:
 * the figures are the claim, the logos are the corroboration. Each figure
 * keeps the sentence saying what it counts — a bare number invites the
 * question the sentence already answers.
 *
 * The logos sit on the green under a hairline, knocked back to white. Two of
 * the four are detailed colour crests that lose their interior to a white
 * silhouette; that needs white-version artwork, which no CSS filter can
 * invent.
 */
export function AcademyProof({ content }: { content: AcademyProofContent }) {
  return (
    <section
      aria-label={content.headline}
      className={`${styles.section} ${neueMontreal.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <h2 className="bq-visually-hidden">{content.headline}</h2>

        <Reveal className={styles.card}>
          <dl className={styles.stats}>
            {content.stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                as="div"
                delay={i * 80}
                className={styles.stat}
              >
                <dt>
                  <Figure value={stat.value} className={styles.figure} />
                  <span className={styles.label}>{stat.label}</span>
                </dt>
                <dd className={styles.support}>{stat.support}</dd>
              </Reveal>
            ))}
          </dl>

          <div className={styles.credits}>
            <p className={styles.creditsLabel}>Working with</p>
            <ul className={styles.logoList}>
              {logos.map((logo) => (
                <li key={logo.name}>
                  <Image
                    src={logo.logo}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className={styles.logo}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
