'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useAudience } from '@/components/audience/AudienceProvider';
import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import type { EcosystemByAudience } from '@/lib/types';
import { neueMontreal, instrumentSerif, interTight } from '@/styles/fonts';
import styles from './EcosystemAccordion.module.css';

/** How long each tab holds before the next one opens on its own. */
const AUTO_ADVANCE_MS = 3000;

/* Match the existing homepage hero's impact icons. */
const proofIcons: Record<string, string> = {
  'women trained': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  'cohorts delivered': 'm2 9 10-5 10 5-10 5-10-5 M6 11v6c3 3 9 3 12 0v-6 M22 9v8',
};

/**
 * The ecosystem as a horizontal accordion - Figma 274:324 / 268:279.
 *
 * A centred two-line headline over a faint, slowly turning dotted globe, then a row of four
 * items: the open one is [spine, panel], the closed ones are a spine alone
 * with a 5px division colour along the top. Every item is always laid out at
 * the open width and clipped by its own `overflow: hidden`; only the width
 * animates, so no copy rewraps mid-motion.
 *
 * Which four it shows follows the hero's switch: the learner set names the
 * divisions, the partner set names the kinds of partner (Figma 333:28).
 *
 * The tabs also turn on their own, every 3s, so the row reads as a loop
 * rather than a control someone has to discover. That stops the moment it
 * would fight the reader: while the pointer or keyboard focus is inside the
 * row, while the row is off screen, and for anyone who asked for reduced
 * motion. A click restarts the clock from that tab, so a chosen tab holds for
 * a full beat before the loop moves on.
 */
export function EcosystemAccordion({ content: byAudience }: { content: EcosystemByAudience }) {
  const { audience } = useAudience();
  const content = byAudience[audience];
  const [active, setActive] = useState(0);
  // A different audience is a different set of pillars, so open the first
  // one again. Adjusted during render rather than in an effect: React
  // re-runs this pass before painting, so the old pillar never shows.
  const [lastAudience, setLastAudience] = useState(audience);
  if (lastAudience !== audience) {
    setLastAudience(audience);
    setActive(0);
  }
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const count = content.pillars.length;

  useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Keyed on `active` so a click restarts the interval from that tab.
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(timer);
  }, [active, paused, inView, count]);

  return (
    <section
      id="ecosystem"
      aria-label="The ecosystem"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.header}>
        <DottedGlobe className={styles.globe} />
        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>{content.headline}</span>
          <span className={`${styles.headlineLine} ${styles.serif}`}>
            {content.headlineMuted}
          </span>
        </h2>
      </div>

      <div className={styles.inner}>
        <div
          ref={rowRef}
          className={styles.row}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          {content.pillars.map((pillar, i) => {
            const open = i === active;
            const panelId = `${baseId}-panel-${i}`;
            const num = String(i + 1).padStart(2, '0');

            return (
              <div
                key={pillar.name}
                className={styles.item}
                data-open={open || undefined}
                style={{ '--accent': pillar.color } as CSSProperties}
              >
                <div className={styles.itemInner}>
                  <button
                    type="button"
                    className={styles.spine}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                  >
                    {/* Only on closed spines: the open one is solid green. */}
                    <span className={styles.divisionColour} aria-hidden="true" />
                    <span className={styles.spineLabel}>{pillar.spineLabel ?? pillar.name}</span>
                    <span className={styles.spineNum} aria-hidden="true">
                      {num}
                    </span>
                  </button>

                  {/* Closed panels stay in the DOM and stay laid out, so they
                      have to leave the tab order or a keyboard lands in
                      content nobody can see. That is done with `visibility`
                      in CSS rather than `inert` here: below 900px every panel
                      is shown, and an `inert` set from React state cannot see
                      the media query. */}
                  <div id={panelId} className={styles.panel}>
                    <div className={`${styles.panelInner} ${pillar.preview ? styles.preview : ''}`}>
                      <p className={styles.eyebrow}>
                        {num}
                        <span className={styles.eyebrowSlash} aria-hidden="true">
                          /
                        </span>
                        {pillar.tag}
                      </p>
                      <h3 className={styles.name}>{pillar.name}</h3>
                      <p className={styles.desc}>{pillar.description}</p>
                      {pillar.preview?.stats && (
                        <ul className={styles.proof} aria-label="Academy impact">
                          {pillar.preview.stats.map((stat) => (
                            <li key={stat.label}>
                              {proofIcons[stat.label] && (
                                <svg className={styles.proofIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d={proofIcons[stat.label]} />
                                </svg>
                              )}
                              <span><strong>{stat.value}</strong> {stat.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {pillar.preview?.assurances && (
                        <ul className={styles.proof} aria-label="Working with the Labs">
                          {pillar.preview.assurances.map((assurance) => (
                            <li key={assurance}>{assurance}</li>
                          ))}
                        </ul>
                      )}

                      <div className={styles.explore}>
                        <p className={styles.exploreLabel}>{pillar.itemsLabel}</p>
                        <ol className={styles.items}>
                          {pillar.items.map((item, j) => (
                            <li key={item} className={styles.itemCell}>
                              <span className={styles.itemNum} aria-hidden="true">
                                {String(j + 1).padStart(2, '0')}
                              </span>
                              <span>{item}</span>
                              {pillar.preview && (
                                <p className={styles.itemDescription}>{pillar.preview.descriptions[j]}</p>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Coming-soon pillars get a disabled CTA instead of a
                          link: the destination doesn't exist yet, so there is
                          nothing to navigate to. The top-right tag is gone —
                          the button itself now carries the message. */}
                      {pillar.comingSoon ? (
                        <span
                          className={`${styles.cta} ${styles.ctaDisabled}`}
                          aria-disabled="true"
                        >
                          Coming soon
                        </span>
                      ) : (
                        <Button href={pillar.href} size="compact" className={styles.cta}>
                          {pillar.cta}
                        </Button>
                      )}
                      {pillar.preview && (
                        <Link className={styles.secondaryLink} href={pillar.preview.secondaryCta.href}>
                          {pillar.preview.secondaryCta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
