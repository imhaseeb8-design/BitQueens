import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import type { ConferenceSection } from '@/lib/types';
import { neueMontreal, interTight } from '@/styles/fonts';
import styles from './Conference.module.css';

/** Conference — Figma 185:375. Inset green card with a mirrored audience image. */
export function Conference({ content }: { content: ConferenceSection }) {
  const hasPhoto = Boolean(content.image.src);

  return (
    <section id="conference" aria-label="The Conference" className={`${styles.section} ${neueMontreal.variable} ${interTight.variable}`}>
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
              <Button href={content.cta.href} size="compact" onDark className={styles.cta}>
                {content.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={160} variant="fade" className={styles.media}>
            <div className={styles.mediaFront}>
              {hasPhoto ? (
                <ImageSlot content={content.image} className={`${styles.photo} ${styles.audience}`} />
              ) : (
                <Image
                  src={content.backdrop.src ?? ''}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 647px"
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
