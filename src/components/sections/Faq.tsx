import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { FaqSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Faq.module.css';

/**
 * The shared FAQ accordion — used by the homepage and by /academy.
 *
 * Native <details> accordion: no JS, keyboard-accessible by default, and the
 * first item ships open so the section never reads as an empty list of
 * closed doors.
 *
 * The head holds the left column and stays put while the answers scroll past
 * it. Centred over a 48rem list, this section used to leave a third of the
 * page empty down either side.
 *
 * `name` groups the <details> so only one is open at a time. It has to differ
 * per instance: two accordions sharing a name would close each other's items
 * across sections.
 */
export function Faq({
  content,
  name = 'faq',
}: {
  content: FaqSection;
  name?: string;
}) {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHead
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.intro}
          />
        </div>

        <div className={styles.list}>
          {content.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details
                className={styles.item}
                open={i === 0}
                name={name}
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
