import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { PathSection } from '@/lib/types';
import styles from './Path.module.css';

/**
 * Where you start - "The Rising Path".
 *
 * Join, then Learn, then Build is a sequence, and the layout now says so. The
 * three steps climb left to right along a band of the brand's wave artwork,
 * each tethered to it by a hairline, so the order is legible before you read a
 * word. It replaced three equal columns, which rendered a sequence as parallel
 * options and left the numerals doing work the layout should have been doing.
 *
 * The empty 520x360 photography slot is gone with it. It had been waiting on a
 * shoot that has not happened, while the brand's own imagery sat unused in this
 * section.
 *
 * Stays a Server Component: the band's drift is a CSS scroll-driven animation,
 * not a scroll listener, so nothing here needs to run on the client. (The hero
 * predates that approach and still uses a listener.)
 */
export function Path({ content }: { content: PathSection }) {
  return (
    <Section id="path" label="Where you start" rule>
      <Reveal as="h2" delay={100} className={styles.headline}>
        {content.headline}
      </Reveal>
      <Reveal as="p" delay={180} className={styles.intro}>
        {content.intro}
      </Reveal>

      <div className={styles.stage}>
        <ol className={styles.list}>
          {content.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={240 + i * 130}
              className={styles.step}
              data-step={i + 1}
            >
              {/* Drops from the step down to the band, so each one reads as
                  standing on the path rather than floating above it. */}
              <span className={styles.tick} aria-hidden="true" />
              <p className={styles.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </Reveal>
          ))}
        </ol>

        {/* The horizon the steps climb. Decorative: the sequence is carried by
            the list itself, so there is nothing here for a screen reader. */}
        <div className={styles.band} aria-hidden="true">
          <div className={styles.bandInner}>
            <Image
              src={content.band.src ?? ''}
              alt=""
              fill
              sizes="(max-width: 1440px) 100vw, 1296px"
              className={styles.bandImg}
            />
          </div>
        </div>
      </div>

      <Reveal as="blockquote" className={`${styles.quote} ${styles.quoteWide}`}>
        <p className={`${styles.quoteText} ${styles.quoteWide}`}>
          “{content.quote}”
        </p>
      </Reveal>

      <Reveal delay={120} className={styles.actions}>
        <Button href={content.cta.href}>{content.cta.label}</Button>
        <span className={styles.note}>{content.ctaNote}</span>
      </Reveal>
    </Section>
  );
}
