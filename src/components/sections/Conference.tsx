import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import type { ConferenceSection } from '@/lib/types';
import styles from './Conference.module.css';

/**
 * The Conference - implemented from Figma node 130:254.
 *
 * A forest block inset to the content margins, not a full-bleed band: the
 * frame sets it at x72 with the same 1296 width as the copy above it, so it
 * reads as a card on the page rather than a stripe across it.
 *
 * The frame layers a photograph over the wave artwork with a 12px offset, so
 * a sliver of the artwork shows along the bottom and right. Until a licensed
 * photograph exists the artwork takes the front and a flat block holds the
 * offset, which keeps the composition and ships nothing borrowed. See the
 * note on `conference.image` in content/home.ts.
 *
 * No rule of its own: the hero's accent rule is the only line between the two
 * sections.
 */
export function Conference({ content }: { content: ConferenceSection }) {
  const hasPhoto = Boolean(content.image.src);

  return (
    <section id="conference" aria-label="The Conference" className={styles.section}>
      <div className={styles.block}>
        <div className={styles.inner}>
          <div className={styles.col}>
            <Reveal className={styles.head}>
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

            <Reveal delay={200}>
              <Button href={content.cta.href} size="compact" onDark>
                {content.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={160} variant="fade" className={styles.media}>
            {/* The offset layer. Behind the artwork today; behind the photo
                once there is one. */}
            <span className={styles.mediaOffset} aria-hidden="true" />
            <div className={styles.mediaFront}>
              {hasPhoto ? (
                <ImageSlot content={content.image} className={styles.photo} />
              ) : (
                <Image
                  src={content.backdrop.src ?? ''}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 621px"
                  className={styles.photo}
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
