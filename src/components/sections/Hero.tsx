import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/ui/Reveal';
import type { HeroSection } from '@/lib/types';
import styles from './Hero.module.css';

/**
 * Hero - implemented from Figma node 130:9.
 *
 * The band is no longer a strip above the headline: the artwork is full bleed
 * and the headline is set over it in white, with a gradient darkening the left
 * where the type lands. Below it the grey lede card overlaps the band's bottom
 * edge, and the three figures sit beside it on the page ground.
 *
 * The figures moved here from the Impact section, which is why `Impact` is no
 * longer composed in `app/page.tsx`. Rendering both would print 2000+ twice.
 *
 * Server Component: everything here is CSS, and the count-up lives in the one
 * client leaf (`Figure`).
 */
export function Hero({ content }: { content: HeroSection }) {
  return (
    <section className={styles.hero} aria-label="BitQueens">
      <div className={styles.band}>
        <Image
          src={content.media.src ?? ''}
          alt={content.media.alt}
          fill
          priority
          sizes="100vw"
          className={styles.bandImg}
        />
        {/* Darkens the left, where the headline sits. The right stays clear so
            the artwork still reads as artwork. */}
        <span className={styles.scrim} aria-hidden="true" />

        <div className={styles.bandInner}>
          <h1 className={styles.headline}>
            {content.headlineLines.map((line, i) => (
              <span key={line} className={styles.lineMask}>
                <span
                  className={styles.lineInner}
                  style={{ '--i': i } as CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className={styles.body}>
        {/* `align-items: end` is what lets the card hang up into the band while
            the figures stay on the ground: both are bottom-aligned, and only
            the card is tall enough to reach back over the edge. */}
        <div className={styles.grid}>
          <dl className={styles.stats}>
            {content.stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 90}
                className={styles.stat}
                style={{ '--i': i } as CSSProperties}
              >
                <dt className={styles.statLabelGroup}>
                  <Figure value={stat.value} className={styles.figure} />
                  <span className={styles.statLabel}>{stat.label}</span>
                </dt>
                <dd className={styles.statSupport}>{stat.support}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={140} className={styles.card}>
            <p className={styles.lede}>{content.body}</p>
            <div className={styles.ctas}>
              <Button href={content.primaryCta.href} size="compact">
                {content.primaryCta.label}
              </Button>
              {/* No arrow on this one: the frame sets it as a plain underlined
                  link (node 130:42). */}
              <Button
                href={content.secondaryCta.href}
                variant="link"
                size="compact"
                arrow={false}
              >
                {content.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className={styles.rule}>
          <span className={styles.ruleAccent} />
        </div>
      </div>
    </section>
  );
}
