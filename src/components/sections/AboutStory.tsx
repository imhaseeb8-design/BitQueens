import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AboutStory, AboutVisionMission } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutStory.module.css';

/** The tick beside each promise — the site's mark. */
function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 8.4 6.2 11.6 13 4.8" />
    </svg>
  );
}

/**
 * Our story — and, under it, what the story is for.
 *
 * This was two sections: "Our story" and "Why we exist", each with its own
 * head, its own measure and its own set of boxes. They are one subject told
 * in order — how it started, then where it is going — and reading them as
 * two made the page feel longer than it is.
 *
 * Laid out as the site's other two-column heads are — Path, Partners — with
 * the headline holding the left column and the prose running down the right.
 *
 * Simplified in the merge: the vision and mission dropped their cards for
 * two labelled columns under a rule, and the promise lost its panel. The
 * copy is unchanged.
 */
export default function AboutStory({
  story,
  vision,
}: {
  story: AboutStory;
  /** Optional: fold "why we exist" into this section rather than its own. */
  vision?: AboutVisionMission;
}) {
  return (
    <section
      aria-label="Our story"
      className={`${styles.story} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.head}>
            <SectionHead
              eyebrow={story.eyebrow}
              headline={story.headline}
              headlineSerif={story.headlineSerif}
            />
          </div>

          <div className={styles.copy}>
            <Reveal delay={120} className={styles.body}>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>

            {story.videoCta && (
              <Reveal delay={180} className={styles.ctaRow}>
                <Button href={story.videoCta.href} variant="quiet">
                  {story.videoCta.label}
                </Button>
              </Reveal>
            )}
          </div>
        </div>

        {vision && (
          <Reveal delay={140} className={styles.purpose}>
            <div className={styles.aims}>
              {[vision.vision, vision.mission].map((item) => (
                <div key={item.title} className={styles.aim}>
                  <p className={styles.aimTitle}>{item.title}</p>
                  <p className={styles.aimBody}>{item.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.promise}>
              <p className={styles.promiseTitle}>{vision.promise.title}</p>
              <ul className={styles.promiseList}>
                {vision.promise.lines.map((line) => (
                  <li key={line} className={styles.promiseItem}>
                    <Tick />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
