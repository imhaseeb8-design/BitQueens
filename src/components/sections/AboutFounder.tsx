import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { AboutFounder } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutFounder.module.css';
import card from './Founder.module.css';

/**
 * The founder, on the About page.
 *
 * Shares the homepage's two-card layout, heading treatment, fact row and
 * portrait. The longer About bio and its two links remain page-specific.
 */
export default function AboutFounder({ founder }: { founder: AboutFounder }) {
  return (
    <section
      className={`${styles.founder} ${displaySans.variable} ${bodySans.variable}`}
      aria-label="The founder"
    >
      <div className={styles.inner}>
        <h2 className={`${card.title} ${card.homeTitle}`}>
          {founder.headline} <span className={card.homeTitleEnd}>{founder.headlineSerif}</span>
        </h2>

        <Reveal delay={120} className={`${card.card} ${card.homeCard}`}>
          <div className={card.portrait}>
            {founder.portrait.src && (
              <Image
                src={founder.portrait.src}
                alt={founder.portrait.alt}
                fill
                sizes="(max-width: 900px) 100vw, 500px"
                className={card.portraitImage}
              />
            )}
          </div>

          <div className={card.story}>
            <div className={card.identity}>
              <p className={card.name}>{founder.name}</p>
              <p className={card.role}>{founder.role}</p>
            </div>

            <h3 className={card.storyHeadline}>
              {founder.storyLines.map((line) => (
                <span key={line} className={card.storyLine}>{line}</span>
              ))}
            </h3>

            {founder.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`${card.bio} ${styles.bioParagraph}`}>
                {paragraph}
              </p>
            ))}

            <div className={card.actions}>
              <div className={card.rule} />
              <dl className={card.facts}>
                {founder.facts.map((fact) => (
                  <div key={fact.label} className={card.fact}>
                    <dt className={card.factLabel}>{fact.label}</dt>
                    <dd className={card.factValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className={card.ctas}>
                <Button
                  href={founder.cta.href}
                  variant="link"
                  size="compact"
                  onDark
                  className={card.secondaryCta}
                >
                  {founder.cta.label}
                </Button>
                <Button
                  href="/contact?topic=speaker"
                  variant="link"
                  size="compact"
                  onDark
                  className={card.secondaryCta}
                >
                  Book Kristie as a speaker
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
            className={card.seal}
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
