import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { ConferenceSection } from '@/lib/types';
import styles from './Conference.module.css';

export function Conference({ content }: { content: ConferenceSection }) {
  return (
    <Section
      id="conference"
      label="The conference"
      tone="blue"
      density="loose"
    >
      <SectionLabel index="06" name={content.eyebrow} />

      {content.dateLine && (
        <Reveal as="p" delay={80} className={styles.dateLine}>
          {content.dateLine}
        </Reveal>
      )}

      <Reveal as="h2" delay={120} className={styles.headline}>
        {content.headline}
      </Reveal>

      <div className={styles.split}>
        <div>
          <Reveal as="p" delay={200} className={styles.body}>
            {content.body}
          </Reveal>
          <Reveal delay={280} className={styles.note}>
            <span className={styles.noteRule} aria-hidden="true" />
            <span className={styles.noteText}>{content.note}</span>
          </Reveal>
          <Reveal delay={360} className={styles.actions}>
            <Button href={content.primaryCta.href} onDark>
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="secondary" onDark>
              {content.secondaryCta.label}
            </Button>
          </Reveal>
        </div>
        <Reveal delay={300} variant="fade">
          <ImageSlot
            content={content.image}
            onDark
            mark="var(--bq-blue-sky)"
            className={styles.image}
          />
        </Reveal>
      </div>

      {content.speakers.length > 0 && (
        <div className={styles.speakers}>
          <Reveal variant="draw" className={styles.speakersRule} />
          <p className={styles.speakersLabel}>Speakers</p>
          <div className={styles.speakerGrid}>
            {content.speakers.map((speaker, i) => (
              <Reveal
                key={speaker.name}
                delay={i * 60}
                className={styles.speaker}
              >
                <p className={styles.speakerName}>{speaker.name}</p>
                <p className={styles.speakerRole}>{speaker.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
