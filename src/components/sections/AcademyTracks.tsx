import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type {
  AcademyCohort,
  AcademyTracks as AcademyTracksContent,
} from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyTracks.module.css';

/**
 * Learning tracks — the one programme list.
 *
 * A track is a subject; a cohort is a date. These used to be two sections,
 * which meant the page named the same programmes twice: the cohort rows
 * repeated each track's name, level and access, and added only an intake
 * number and a format. It also listed fewer things than the tracks above it,
 * so Digital Skills — which has no scheduled intake — simply disappeared from
 * "all programmes".
 *
 * Now each card carries its own next intake, matched to the track by name.
 * A track with a cohort is an application; a track without one is self-paced
 * and the card says so rather than leaving a gap.
 *
 * A serif numeral opens each card and a hairline closes it. The card turns
 * deep green under the pointer, the answer every card on the site gives.
 */
export function AcademyTracks({
  content,
  cohorts,
}: {
  content: AcademyTracksContent;
  cohorts: AcademyCohort[];
}) {
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
          {content.tracks.map((track, i) => {
            const cohort = cohorts.find((c) => c.track === track.name);
            const href = cohort ? cohort.cta.href : '/join';
            const pending = cohort?.dates === 'To be announced';

            return (
              <Reveal key={track.name} as="li" delay={i * 90}>
                <a href={href} className={styles.card}>
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

                  <p className={styles.intake}>
                    <span
                      className={pending ? styles.pending : undefined}
                    >
                      {cohort
                        ? `Next cohort · ${cohort.dates}`
                        : 'Self-paced · join any time'}
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </p>
                </a>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
