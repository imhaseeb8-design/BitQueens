import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { FounderSection } from '@/lib/types';
import styles from './Founder.module.css';

export function Founder({ content }: { content: FounderSection }) {
  return (
    <Section id="founder" label="The founder" rule>

      <div className={styles.split}>
        <Reveal delay={80} variant="fade">
          <div className={styles.portraitWrap}>
            <div className={styles.portraitOffset} aria-hidden="true" />
            <ImageSlot
              content={content.portrait}
              mark="var(--bq-forest)"
              className={styles.portrait}
            />
          </div>
          <div className={styles.credit}>
            <span className={styles.creditRule} aria-hidden="true" />
            <span className={styles.creditText}>
              {content.name} — {content.role}
            </span>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <h2 className={styles.headline}>{content.headline}</h2>
          <p className={styles.bio}>{content.bio}</p>

          {content.credentials.length > 0 && (
            <div className={styles.credentials}>
              {content.credentials.map((credential) => (
                <p key={credential} className={styles.credential}>
                  {credential}
                </p>
              ))}
            </div>
          )}

          {content.quote && (
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>{content.quote}</p>
            </blockquote>
          )}

          <div className={styles.actions}>
            <Button href={content.primaryCta.href}>
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
