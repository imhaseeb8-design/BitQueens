import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import type { ConferenceSection } from '@/lib/types';
import { displaySans, bodySans } from '@/styles/fonts';
import styles from './Conference.module.css';

/** 16px marks for the meta row. Stroke weight and caps follow the CTA
 *  arrow (Figma 344:30) so the two read as one hand. */
function MetaIcon({ name }: { name: 'calendar' | 'place' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'calendar' ? (
        <>
          <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="2" />
          <path d="M2.25 6.5h11.5M5.5 1.75v2.5M10.5 1.75v2.5" />
        </>
      ) : (
        <>
          <path d="M13 6.9c0 3.5-5 7.35-5 7.35S3 10.4 3 6.9a5 5 0 0 1 10 0Z" />
          <circle cx="8" cy="6.8" r="1.8" />
        </>
      )}
    </svg>
  );
}

/**
 * Conference — a condensed teaser, from Figma 268:149.
 *
 * A green card inside the gutters: the story on the left, the audience
 * photograph filling the right edge to edge. The photo is mirrored so the
 * woman in front looks into the copy rather than off the card.
 *
 * It was the full frame — an eyebrow, a 52px headline over two lines, a
 * two-sentence body, a hairline and a key/value list — which made a 520px
 * band for what is one sentence and one date. Now: a one-line headline, one
 * line of copy, the facts as a marked row, and the way through. The eyebrow
 * went with the rest: it said "The BitQueens Conference" above a headline on
 * the BitQueens homepage, directly over a CTA reading "Explore the
 * Conference". The conference page carries everything else.
 *
 * The CTA is the shared Button so it carries the site's arrow shift; the
 * frame's cream-on-green colouring is set in the module.
 */
export function Conference({ content }: { content: ConferenceSection }) {
  const photo = content.image.src ? content.image : content.backdrop;

  return (
    <section
      id="conference"
      aria-label="The Conference"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.block}>
        <div className={styles.card}>
          <div className={styles.col}>
            <Reveal className={styles.head}>
              <TextReveal text={content.headlineLines.join('\n')} className={styles.headline} lineClassNames={content.headlineLines.map(() => styles.line)} />
              <p className={styles.body}>{content.body}</p>
            </Reveal>

            <Reveal delay={120} className={styles.metaRow}>
              {content.meta.map((item) => (
                <span key={item.value} className={styles.meta}>
                  <MetaIcon name={item.icon} />
                  {item.value}
                </span>
              ))}
            </Reveal>

            <Reveal delay={200} className={styles.ctaRow}>
              <Button href={content.cta.href} size="compact" onDark className={styles.cta}>
                {content.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={160} variant="fade" className={styles.media}>
            <Image
              src={photo.src ?? ''}
              alt={photo.alt}
              fill
              sizes="(max-width: 900px) 100vw, 640px"
              className={styles.photo}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
