import { Button } from '@/components/ui/Button';
import {
  DotFieldMark,
  DotGlobeMark,
  NetworkMark,
  TrackMark,
} from '@/components/ui/PathMarks';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type {
  AcademyPath as AcademyPathContent,
  AcademyStep,
} from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyPath.module.css';

const MARKS: Record<AcademyStep['mark'], typeof TrackMark> = {
  track: TrackMark,
  globe: DotGlobeMark,
  dots: DotFieldMark,
  network: NetworkMark,
};

/**
 * "How it works" — the four-step beginner path, as a ledger.
 *
 * Four ruled rows rather than four cards: mark, step, what it means, reading
 * left to right and stacking in order, so the four read as a sequence instead
 * of as four equal things. The marks are the homepage's — a fork for picking
 * a track, then the globe, the field and the network. The row is the hover
 * target: it turns deep green and its mark takes one turn, the same answer
 * the homepage's cards give. The way on sits under the intro, before the
 * steps, so it is there for a reader who already knows she wants in.
 */
export function AcademyPath({ content }: { content: AcademyPathContent }) {
  return (
    <section
      id="how"
      aria-label="How the Academy works"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <Reveal delay={180} className={styles.ctaRow}>
          <Button href={content.cta.href} variant="quiet" className={styles.cta}>
            {content.cta.label}
          </Button>
        </Reveal>

        <ol className={styles.ledger}>
          {content.steps.map((step, i) => {
            const Mark = MARKS[step.mark];
            return (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 70}
                className={styles.row}
                data-spin-group=""
              >
                <Mark className={styles.mark} />
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.description}</p>
              </Reveal>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
