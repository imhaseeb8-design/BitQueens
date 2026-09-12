import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { Reveal } from '@/components/ui/Reveal';
import type { PlaceSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Place.module.css';

/**
 * "Your place is here" and the two doors — Figma 297:850 for the cards.
 *
 * The serif line, set as wide as the content over the slowly turning dotted
 * globe, scrolls up until it reaches the middle of the screen and pins there.
 * The two cards then rise from below and slide over it: they sit on an opaque
 * band above the pinned stage, so the line is covered as they pass. When the
 * band's bottom meets the stage's bottom the pin releases and everything
 * leaves together. All of it is `position: sticky`; no scroll listener.
 */
export function Place({ content }: { content: PlaceSection }) {
  return (
    <section
      id="place"
      aria-label={content.headline}
      className={`${styles.section} ${instrumentSerif.variable} ${neueMontreal.variable} ${interTight.variable}`}
    >
      <div className={styles.stage}>
        <DottedGlobe className={styles.globe} period={180} />
        <Reveal as="h2" variant="fade" className={styles.headline}>
          {content.headline}
        </Reveal>
      </div>

      <div className={styles.band}>
        <ol className={styles.cards}>
          {content.cards.map((card, i) => (
            <li key={card.tag} className={styles.card} data-tone={card.tone}>
              <p className={styles.eyebrow}>
                {String(i + 1).padStart(2, '0')}
                <span className={styles.eyebrowSlash} aria-hidden="true">
                  /
                </span>
                {card.tag}
              </p>
              <h3 className={styles.title}>
                {card.titleLines.map((line) => (
                  <span key={line} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </h3>
              <p className={styles.body}>{card.body}</p>
              {card.tone === 'green' ? (
                <Button href={card.cta.href} size="compact" onDark className={styles.cta}>
                  {card.cta.label}
                </Button>
              ) : (
                <Button href={card.cta.href} size="compact" variant="green" className={styles.cta}>
                  {card.cta.label}
                </Button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
