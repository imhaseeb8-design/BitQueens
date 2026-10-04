import { EnrollForm } from '@/components/sections/EnrollForm';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type {
  AcademyCohort,
  AcademyEnroll as AcademyEnrollContent,
} from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyEnroll.module.css';

/**
 * #enroll — the application form, and the page's last word.
 *
 * Centred, with the hero's dot map behind it. It used to be copy left and
 * form right, which left a tall empty column beside a panel, and it used to
 * sit mid-page with a second closing band after it — so the page asked twice
 * and ended on a link pointing back up at the cohorts. One ending is better
 * than two, and the ending should be the form.
 *
 * Every Enroll row on the page lands here, and the cohort select is built
 * from the same content as those rows so the options never drift.
 */
export function AcademyEnroll({
  content,
  cohorts,
}: {
  content: AcademyEnrollContent;
  cohorts: AcademyCohort[];
}) {
  return (
    <section
      id="enroll"
      aria-label="Enroll in a cohort"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      {/* The same map the hero carries, at the same width and opacity, so the
          page opens and closes on one image. */}
      <GlobalDotMap className={styles.ground} />

      <div className={styles.inner}>
        <SectionHead
          align="center"
          headline={content.headline}
          headlineSerif={content.headlineSerif || undefined}
          intro={content.body}
        />

        <Reveal delay={120} className={styles.panel}>
          <EnrollForm content={content} cohorts={cohorts} />
        </Reveal>
      </div>
    </section>
  );
}
