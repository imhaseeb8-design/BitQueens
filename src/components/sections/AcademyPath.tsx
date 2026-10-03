import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyPath as AcademyPathContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyPath.module.css';

/**
 * "How it works" — the four-step beginner path.
 *
 * The homepage Path's card language (flat cards that turn deep green on
 * hover), in a four-across row. The corner numeral keeps the step order
 * scannable without another icon set.
 */
export function AcademyPath({ content }: { content: AcademyPathContent }) {
  return (
    <section
      id="how"
      aria-label="How the Academy works"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <ol className={styles.cards}>
          {content.steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 90}
              className={styles.card}
            >
              <p className={styles.numeral}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} as="p" className={styles.closing}>
          {content.closing}
        </Reveal>
      </div>
    </section>
  );
}
