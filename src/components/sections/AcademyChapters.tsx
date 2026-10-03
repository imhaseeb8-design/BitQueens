import { ChapterForm } from '@/components/sections/ChapterForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyChapters as AcademyChaptersContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyChapters.module.css';

/**
 * Campus chapters — the pitch plus the chapter application form.
 *
 * The existing-chapters list renders only once the team confirms it; until
 * then the section is the pitch and the form, which is the complete flow
 * today.
 */
export function AcademyChapters({
  content,
}: {
  content: AcademyChaptersContent;
}) {
  return (
    <section
      id="chapters"
      aria-label="Campus chapters"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.body}
        />

        {content.chapters.length > 0 && (
          <ul className={styles.list}>
            {content.chapters.map((chapter, i) => (
              <Reveal
                key={`${chapter.name}-${chapter.city}`}
                as="li"
                delay={i * 60}
                className={styles.chip}
              >
                <span className={styles.chapterName}>{chapter.name}</span>
                <span className={styles.chapterCity}>{chapter.city}</span>
              </Reveal>
            ))}
          </ul>
        )}

        <div className={styles.formRow}>
          <Reveal className={styles.formHead}>
            <p className={styles.formEyebrow}>{content.formEyebrow}</p>
            <h3 className={styles.formHeadline}>{content.formHeadline}</h3>
          </Reveal>
          <Reveal delay={120} className={styles.panel}>
            <ChapterForm content={content} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
