import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { ConferenceSection } from '@/lib/types';
import { neueMontreal, interTight } from '@/styles/fonts';
import styles from './Conference.module.css';

/**
 * Conference — Figma 268:149 ("Conference story and image").
 *
 * A green card inside the gutters, split 656/640: the story on the left, the
 * audience photograph filling the right edge to edge. The photo is mirrored
 * so the woman in front looks into the copy rather than off the card.
 *
 * The CTA is the shared Button so it carries the site's arrow shift; the
 * frame's cream-on-green colouring and 4px corner are set in the module.
 */
export function Conference({ content }: { content: ConferenceSection }) {
  const photo = content.image.src ? content.image : content.backdrop;

  return (
    <section
      id="conference"
      aria-label="The Conference"
      className={`${styles.section} ${neueMontreal.variable} ${interTight.variable}`}
    >
      <div className={styles.block}>
        <div className={styles.card}>
          <div className={styles.col}>
            <Reveal className={styles.head}>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2 className={styles.headline}>
                {content.headlineLines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </h2>
              <p className={styles.body}>{content.body}</p>
            </Reveal>

            <Reveal delay={120} className={styles.details}>
              <div className={styles.detailRule} />
              <dl className={styles.detailRow}>
                {content.details.map((detail) => (
                  <div key={detail.key} className={styles.detail}>
                    <dt className={styles.detailKey}>{detail.key}</dt>
                    <dd className={styles.detailValue}>{detail.value}</dd>
                  </div>
                ))}
              </dl>
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
