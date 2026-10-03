import { EnrollForm } from '@/components/sections/EnrollForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type {
  AcademyCohort,
  AcademyEnroll as AcademyEnrollContent,
} from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyEnroll.module.css';

/**
 * #enroll — the cohort application form.
 *
 * Copy left, form right on a paper panel. Every Enroll button on the page
 * lands here; the cohort select is pre-filled from the same content so the
 * options never drift from the rows above.
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
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionHead
            eyebrow={content.eyebrow}
            headline={content.headline}
            headlineSerif={content.headlineSerif || undefined}
            intro={content.body}
          />
        </div>
        <Reveal delay={120} className={styles.panel}>
          <EnrollForm content={content} cohorts={cohorts} />
        </Reveal>
      </div>
    </section>
  );
}
