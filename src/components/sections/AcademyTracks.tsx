import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyTracks as AcademyTracksContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyTracks.module.css';

/**
 * Learning tracks — the four starting points.
 *
 * A serif numeral opens each card and a hairline closes it: level, length and
 * whether it costs anything sit on that rule, pinned to the bottom, so all
 * four cards end on the same line however long the copy runs. The card turns
 * deep green under the pointer, the answer every card on the site gives.
 *
 * The way through to the cohort dates sits right of the intro, on its line,
 * filling the column the headline leaves empty.
 */
export function AcademyTracks({ content }: { content: AcademyTracksContent }) {
  return (
    <section
      id="tracks"
      aria-label="Learning tracks"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHead
            eyebrow={content.eyebrow}
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.intro}
          />
          <Reveal delay={180} className={styles.ctaRow}>
            <Button href={content.cta.href} variant="quiet" className={styles.cta}>
              {content.cta.label}
            </Button>
          </Reveal>
        </div>

        <ol className={styles.cards}>
          {content.tracks.map((track, i) => (
            <Reveal
              key={track.name}
              as="li"
              delay={i * 90}
              className={styles.card}
            >
              <p className={styles.numeral} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.title}>{track.name}</h3>
              <p className={styles.desc}>{track.description}</p>
              <p className={styles.foot}>
                <span>
                  {track.level} · {track.length}
                </span>
                <span className={styles.access}>{track.access}</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
