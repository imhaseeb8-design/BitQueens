import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { JoinSection } from '@/lib/types';
import styles from './Join.module.css';
import { NewsletterForm } from './NewsletterForm';

/** The closing line and the newsletter. The two doors that used to sit here
    are the cards in `Place`, just above. */
export function Join({ content }: { content: JoinSection }) {
  return (
    <Section id="join" label="Join" tone="ink" density="loose">

      <Reveal as="h2" delay={100} className={styles.headline}>
        {content.headline}
      </Reveal>

      <div className={styles.news}>
        <p className={styles.newsLabel}>{content.newsletter.label}</p>
        <NewsletterForm content={content.newsletter} />
      </div>
    </Section>
  );
}
