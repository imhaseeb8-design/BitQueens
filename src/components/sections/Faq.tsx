'use client';

import { useId, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import type { FaqSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Faq.module.css';

/**
 * The shared FAQ accordion — used by the homepage and by /academy.
 *
 * Button-controlled accordion with animated answer panels. The
 * first item ships open so the section never reads as an empty list of
 * closed doors.
 *
 * The head and answers scroll together. The homepage also includes a contact
 * link beneath its introduction for questions not covered by the list.
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
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHead
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.intro}
          />
          {name === 'home-faq' && (
            <div className={styles.contactPrompt}>
              <p>Still have a question? We’re here to help.</p>
              <Button href="/contact" variant="link" size="compact" className={styles.contactLink}>
                Get in touch
              </Button>
            </div>
          )}
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
