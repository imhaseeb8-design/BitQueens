import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal } from '@/components/ui/Reveal';
import type { AcademyHero as AcademyHeroContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyHero.module.css';

/**
 * Academy hero — "this is where you join".
 *
 * Copy left, visual right: the generated dotted-map artwork sits behind and
 * the photography slot overlaps it, the same collage language as the homepage
 * hero. The photo slot renders labelled until real Academy photography lands.
 */
export function AcademyHero({ content }: { content: AcademyHeroContent }) {
  return (
    <section
      aria-label="BitQueens Academy"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className={styles.headline}>
              <span className={styles.line}>{content.headline}</span>
              <span className={`${styles.line} ${styles.serif}`}>
                {content.headlineSerif}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className={styles.body}>{content.body}</p>
          </Reveal>
          <Reveal delay={200} className={styles.ctas}>
            <Button href={content.primaryCta.href} variant="green">
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              variant="link"
              arrow={false}
            >
              {content.secondaryCta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={160} className={styles.visual}>
          {content.art.src ? (
            <Image
              src={content.art.src}
              alt={content.art.alt}
              width={content.art.width}
              height={content.art.height}
              className={styles.art}
              priority
            />
          ) : null}
          <ImageSlot
            content={content.photo}
            mark="var(--bq-blue-slate)"
            className={styles.photo}
          />
        </Reveal>
      </div>
    </section>
  );
}
