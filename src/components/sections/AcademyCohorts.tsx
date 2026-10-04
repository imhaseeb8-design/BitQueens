import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyCohorts as AcademyCohortsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyCohorts.module.css';

const COLUMNS = ['Starts', 'Format', 'Level'] as const;

/**
 * Cohort programmes — the schedule.
 *
 * The tracks section above already says what each programme teaches, so this
 * one does not repeat the catalogue: it answers "which intake is next, and
 * how do I get in". That makes it a timetable, and a timetable prints its
 * column labels once, in a header, rather than on every row.
 *
 * The whole row is the target and answers the way the "how it works" ledger
 * does — green ground, cream name, mint values, an arrow at the end. Three
 * filled buttons used to sit here, which made the heaviest thing on the page
 * an ask against a date that has not been set; the page's one loud action
 * should be the free join.
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

        <div className={styles.table}>
          {/* Printed once. Hidden where the row stacks and each cell carries
              its own label instead. */}
          <div className={styles.colhead} aria-hidden="true">
            <span>Programme</span>
            {COLUMNS.map((label) => (
              <span key={label}>{label}</span>
            ))}
            <span>Access</span>
            <span />
          </div>

          <ul className={styles.rows}>
            {content.cohorts.map((cohort, i) => {
              const values = [cohort.dates, cohort.format, cohort.level];

              return (
                <Reveal key={cohort.name} as="li" delay={i * 90}>
                  <a href={cohort.cta.href} className={styles.row}>
                    <h3 className={styles.name}>{cohort.name}</h3>

                    {COLUMNS.map((label, c) => (
                      <p key={label} className={styles.cell}>
                        <span className={styles.cellLabel}>{label}</span>
                        {/* Pending, not a fact: muted so the eye goes to the
                            programme and the access tag instead. */}
                        <span
                          className={
                            values[c] === 'To be announced'
                              ? `${styles.value} ${styles.pending}`
                              : styles.value
                          }
                        >
                          {values[c]}
                        </span>
                      </p>
                    ))}

                    <span
                      className={`${styles.access} ${
                        cohort.access === 'Free' ? styles.free : styles.paid
                      }`}
                    >
                      {cohort.access}
                    </span>

                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
