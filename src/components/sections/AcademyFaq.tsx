import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyFaq as AcademyFaqContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyFaq.module.css';

/**
 * FAQ — the beginner questions, answered plainly.
 *
 * Native <details> accordion: no JS, keyboard-accessible by default, and the
 * first item ships open so the section never reads as an empty list of
 * closed doors.
 */
export function AcademyFaq({ content }: { content: AcademyFaqContent }) {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          align="center"
        />

        <div className={styles.list}>
          {content.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details
                className={styles.item}
                open={i === 0}
                name="academy-faq"
              >
                <summary className={styles.question}>
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className={styles.answer}>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
