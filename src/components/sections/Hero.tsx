'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import type { HeroSection } from '@/lib/types';
import { interTight, neueMontreal } from '@/styles/fonts';
import styles from './Hero.module.css';

/**
 * Hero — Figma 322:107 ("Homepage / Learners") and 322:153 ("/ Partners").
 *
 * Everything is centred on the page ground: a switch that names who the
 * reader is, then the headline, the lede and two CTAs, all of which the
 * switch swaps. The animated dotted map sits behind them, centred and faint,
 * with a wash over its lower half so the copy never fights the dots. A
 * centred caption and a row of collaborator logos close the section.
 *
 * Client Component: the switch is the one piece of state on the page.
 */
export function Hero({ content }: { content: HeroSection }) {
  const [active, setActive] = useState(0);
  const audience = content.audiences[active];
  const baseId = useId();

  return (
    <section
      className={`${styles.hero} ${neueMontreal.variable} ${interTight.variable}`}
      aria-label="BitQueens"
    >
      <div className={styles.band}>
        <GlobalDotMap className={styles.map} />
        {/* Clears at the top and thickens downward, so the map fades into the
            ground rather than stopping at an edge (node 322:110). */}
        <span className={styles.wash} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.switch} role="tablist" aria-label="Who you are">
            {content.audiences.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className={styles.option}
                onClick={() => setActive(i)}
              >
                {item.switchLabel}
              </button>
            ))}
          </div>

          {/* Keyed on the audience so the entrance replays on every switch;
              React remounts the panel rather than mutating it in place. */}
          <div
            key={audience.id}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${audience.id}`}
            className={styles.panel}
          >
            <h1 className={styles.headline}>{audience.headline}</h1>
            <p className={styles.body}>{audience.body}</p>

            <div className={styles.ctas}>
              <Button href={audience.primaryCta.href} size="compact" className={styles.primaryCta}>
                {audience.primaryCta.label}
              </Button>
              <Button
                href={audience.secondaryCta.href}
                variant="secondary"
                size="compact"
                className={styles.secondaryCta}
              >
                {audience.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.strip}>
        <p className={styles.stripLabel}>{content.collaborators.label}</p>

        <ul className={styles.logos}>
          {content.collaborators.logos.map((logo) => (
            <li key={logo.name} className={styles.logo}>
              <Image
                src={logo.logo}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={styles.logoImg}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
