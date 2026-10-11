import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { FounderSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Founder.module.css';

/**
 * Founder — Figma 289:453.
 *
 * A left-aligned title above separate story and portrait cards. Kristie's
 * identity and shared Academy credentials frame the original story, with one
 * CTA into About. The wax seal hangs off the portrait's top-right corner.
 *
 * Server Component: nothing here needs state.
 */
export function Founder({ content }: { content: FounderSection }) {
  return (
    <section
      id="founder"
      aria-label="The founder"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <h2 className={`${styles.title} ${styles.homeTitle}`}>
          {content.headline} <span className={styles.homeTitleEnd}>{content.headlineSerif}</span>
        </h2>

        <Reveal delay={120} className={`${styles.card} ${styles.homeCard}`}>
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
            <div className={styles.identity}>
              <p className={styles.name}>{content.name}</p>
              <p className={styles.role}>{content.role}</p>
            </div>
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
              <dl className={styles.facts}>
                {content.facts.map((fact) => (
                  <div key={fact.label} className={styles.fact}>
                    <dt className={styles.factLabel}>{fact.label}</dt>
                    <dd className={styles.factValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.ctas}>
                <Button href={content.cta.href} variant="link" size="compact" onDark className={styles.secondaryCta}>
                  {content.cta.label}
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
