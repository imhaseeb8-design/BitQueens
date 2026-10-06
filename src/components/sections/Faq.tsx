'use client';

import { useId, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { FaqSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Faq.module.css';

/**
 * The shared FAQ accordion — used by the homepage and by /academy.
 *
 * Button-controlled accordion with animated answer panels. The
 * first item ships open so the section never reads as an empty list of
 * closed doors.
 *
 * The head holds the left column and stays put while the answers scroll past
 * it. Centred over a 48rem list, this section used to leave a third of the
 * page empty down either side.
 *
 * Each instance keeps one answer open; unique IDs connect its buttons and
 * panels without interfering with other FAQ sections.
 */
export function Faq({
  content,
  name = 'faq',
}: {
  content: FaqSection;
  name?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const instanceId = useId();

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
              <div
                className={styles.item}
                data-open={openIndex === i}
              >
                <button
                  type="button"
                  className={styles.question}
                  id={`${name}-${instanceId}-question-${i}`}
                  aria-expanded={openIndex === i}
                  aria-controls={`${name}-${instanceId}-answer-${i}`}
                  onClick={() => setOpenIndex((current) => current === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className={styles.answerPanel}
                  id={`${name}-${instanceId}-answer-${i}`}
                  aria-labelledby={`${name}-${instanceId}-question-${i}`}
                  aria-hidden={openIndex !== i}
                  inert={openIndex !== i}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
