import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyCohorts as AcademyCohortsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyCohorts.module.css';

/**
 * Cohort programmes — the upcoming cohorts as scannable rows.
 *
 * Each row carries the facts a beginner scans for (dates, format, level,
 * free/paid) and one Enroll button that jumps to the application form below.
 * "To be announced" is a legitimate date value here.
 */
export function AcademyCohorts({ content }: { content: AcademyCohortsContent }) {
  return (
    <section
      id="cohorts"
      aria-label="Cohort programmes"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <ul className={styles.rows}>
          {content.cohorts.map((cohort, i) => (
            <Reveal
              key={cohort.name}
              as="li"
              delay={i * 90}
              className={styles.row}
            >
              <div className={styles.main}>
                <h3 className={styles.name}>{cohort.name}</h3>
                <p className={styles.track}>{cohort.track}</p>
              </div>
              <dl className={styles.facts}>
                <div className={styles.fact}>
                  <dt>Starts</dt>
                  <dd>{cohort.dates}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Format</dt>
                  <dd>{cohort.format}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Level</dt>
                  <dd>{cohort.level}</dd>
                </div>
              </dl>
              <div className={styles.side}>
                <span
                  className={`${styles.access} ${
                    cohort.access === 'Free' ? styles.free : styles.paid
                  }`}
                >
                  {cohort.access}
                </span>
                <Button
                  href={cohort.cta.href}
                  variant="green"
                  size="compact"
                  arrow={false}
                >
                  {cohort.cta.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
