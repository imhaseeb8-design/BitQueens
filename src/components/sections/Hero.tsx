'use client';

import Image from 'next/image';
import { useId } from 'react';
import { useAudience } from '@/components/audience/AudienceProvider';
import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import type { HeroSection, ImpactStat } from '@/lib/types';
import { interTight, neueMontreal } from '@/styles/fonts';
import styles from './Hero.module.css';

const impactIcons: Record<string, string> = {
  'women trained': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  'cohorts delivered': 'm2 9 10-5 10 5-10 5-10-5 M6 11v6c3 3 9 3 12 0v-6 M22 9v8',
  'campus chapters': 'M3 21h18 M5 21V7l7-4 7 4v14 M9 21v-5h6v5 M9 8h.01 M15 8h.01 M9 12h.01 M15 12h.01',
  'countries reached': 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c4 5 4 13 0 18 M12 3c-4 5-4 13 0 18',
};

/**
 * Hero — Figma 322:107 ("Homepage / Learners") and 322:153 ("/ Partners").
 *
 * Everything is centred on the page ground: a switch that names who the
 * reader is, then the headline, the lede and two CTAs, all of which the
 * switch swaps. The animated dotted map sits behind them, centred and faint,
 * with a wash over its lower half so the copy never fights the dots. A
 * centred caption and a row of collaborator logos close the section.
 *
 * Client Component. The switch does not keep its own state: it sets the
 * page's audience, so a section further down can answer the same question.
 */
export function Hero({ content, stats }: { content: HeroSection; stats: ImpactStat[] }) {
  const { audience: id, setAudience } = useAudience();
  const active = Math.max(0, content.audiences.findIndex((a) => a.id === id));
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
                onClick={() => setAudience(item.id)}
              >
                {item.switchLabel}
              </button>
            ))}
          </div>

          <p className={styles.credibility}>
            <span className={styles.credibilityDot} aria-hidden="true" />
            Women-first tech education since 2023
          </p>

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
          <ul className={styles.trust} aria-label="BitQueens impact">
            {stats.map((stat) => (
              <li key={stat.label} className={styles.trustItem}>
                <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={impactIcons[stat.label]} />
                </svg>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
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
