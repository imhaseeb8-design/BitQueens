import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { FounderSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Founder.module.css';

/**
 * Founder — Figma 289:453.
 *
 * A centred one-line title, then a green card split 500 / 796: Kristie's
 * portrait fills the left edge to edge, the story sits on the right with its
 * hairline and the two CTAs held at the bottom. The wax seal hangs off the
 * card's top-right corner, with the "B" set over it.
 *
 * Server Component: nothing here needs state.
 */
export function Founder({ content }: { content: FounderSection }) {
  return (
    <section
      id="founder"
      aria-label="The founder"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <Reveal as="h2" className={styles.title}>
          {content.headline} <span className={styles.serif}>{content.headlineSerif}</span>
        </Reveal>

        <Reveal delay={120} className={styles.card}>
          <div className={styles.portrait}>
            <Image
              src={content.portrait.src ?? ''}
              alt={content.portrait.alt}
              fill
              sizes="(max-width: 900px) 100vw, 500px"
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.story}>
            <h3 className={styles.storyHeadline}>
              {content.storyLines.map((line) => (
                <span key={line} className={styles.storyLine}>
                  {line}
                </span>
              ))}
            </h3>
            <p className={styles.bio}>{content.bio}</p>

            <div className={styles.actions}>
              <div className={styles.rule} />
              <div className={styles.ctas}>
                <Button href={content.primaryCta.href} size="compact" onDark className={styles.primaryCta}>
                  {content.primaryCta.label}
                </Button>
                <Button href={content.secondaryCta.href} variant="link" onDark className={styles.secondaryCta}>
                  {content.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>

          {/* The wax seal, hung off the card's top-right corner. */}
          <Image
            src="/founder-seal.png"
            alt=""
            width={270}
            height={261}
            className={styles.seal}
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
