import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { JoinSection } from '@/lib/types';
import styles from './Join.module.css';
import { NewsletterForm } from './NewsletterForm';

export function Join({ content }: { content: JoinSection }) {
  const [learner, institution] = content.doors;

  return (
    <Section id="join" label="Join" tone="ink" density="loose">
      <SectionLabel index="10" name={content.eyebrow} />

      <Reveal as="h2" delay={100} className={styles.headline}>
        {content.headline}
      </Reveal>

      <div className={styles.doors}>
        <Reveal delay={200}>
          <h3 className={styles.doorTitle}>{learner.title}</h3>
          <p className={styles.doorBody}>{learner.body}</p>
          <div className={styles.doorAction}>
            <Button href={learner.cta.href}>{learner.cta.label}</Button>
          </div>
        </Reveal>

        <div className={styles.divider} aria-hidden="true" />

        <Reveal delay={300}>
          <h3 className={styles.doorTitle}>{institution.title}</h3>
          <p className={styles.doorBody}>{institution.body}</p>
          <div className={styles.doorAction}>
            <Button href={institution.cta.href} variant="secondary" onDark>
              {institution.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>

      <div className={styles.news}>
        <p className={styles.newsLabel}>{content.newsletter.label}</p>
        <NewsletterForm content={content.newsletter} />
      </div>
    </Section>
  );
}
