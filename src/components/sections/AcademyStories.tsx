import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyStories as AcademyStoriesContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyStories.module.css';

/**
 * Learner stories.
 *
 * Renders nothing until real stories land — the repo's convention for
 * proof-type sections is that empty content means no section, never a
 * placeholder grid. Real quotes replace invented ones; the component is
 * already waiting.
 */
export function AcademyStories({
  content,
}: {
  content: AcademyStoriesContent;
}) {
  if (content.stories.length === 0) return null;

  return (
    <section
      aria-label="Learner stories"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
        />

        <ul className={styles.cards}>
          {content.stories.map((story, i) => (
            <Reveal
              key={story.name}
              as="li"
              delay={i * 90}
              className={styles.card}
            >
              <blockquote className={styles.quote}>
                “{story.quote}”
              </blockquote>
              <p className={styles.name}>{story.name}</p>
              <p className={styles.detail}>{story.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
