import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyTracks as AcademyTracksContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyTracks.module.css';

/**
 * Learning tracks — the four starting points.
 *
 * Flat cards with a meta row (level · length) and an access pill. Free reads
 * green, Paid reads blue; the pill is the only colour on the card, so the
 * free/paid distinction scans instantly.
 */
export function AcademyTracks({ content }: { content: AcademyTracksContent }) {
  return (
    <section
      id="tracks"
      aria-label="Learning tracks"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <ul className={styles.cards}>
          {content.tracks.map((track, i) => (
            <Reveal
              key={track.name}
              as="li"
              delay={i * 90}
              className={styles.card}
            >
              <span
                className={`${styles.access} ${
                  track.access === 'Free' ? styles.free : styles.paid
                }`}
              >
                {track.access}
              </span>
              <h3 className={styles.title}>{track.name}</h3>
              <p className={styles.desc}>{track.description}</p>
              <p className={styles.meta}>
                {track.level} · {track.length}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
