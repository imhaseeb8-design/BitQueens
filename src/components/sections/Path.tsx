import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { PathSection } from '@/lib/types';
import styles from './Path.module.css';

export function Path({ content }: { content: PathSection }) {
  return (
    <Section id="path" label="Where you start" rule>
      <SectionLabel index="05" name={content.eyebrow} />

      <div className={styles.head}>
        <div>
          <Reveal as="h2" delay={100} className={styles.headline}>
            {content.headline}
          </Reveal>
          <Reveal as="p" delay={180} className={styles.intro}>
            {content.intro}
          </Reveal>
        </div>
        <Reveal delay={240} variant="fade">
          <ImageSlot content={content.image} className={styles.image} />
        </Reveal>
      </div>

      <div className={styles.steps}>
        <Reveal variant="draw" className={styles.rule} />
        <ol className={styles.list}>
          {content.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={120 + i * 80}
              className={styles.step}
            >
              <p className={styles.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </Reveal>
          ))}
        </ol>
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
