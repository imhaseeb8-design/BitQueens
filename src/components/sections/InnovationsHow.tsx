import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsHow as InnovationsHowContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsHow.module.css';

/** Compact three-step sequence beneath the shared section heading. */
export function InnovationsHow({ content }: { content: InnovationsHowContent }) {
  return (
    <section
      id="how"
      aria-label="How Innovations and Labs works"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
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
              <div className={styles.stepCopy}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
