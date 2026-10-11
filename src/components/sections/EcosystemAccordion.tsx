'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useAudience } from '@/components/audience/AudienceProvider';
import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { TextReveal } from '@/components/ui/TextReveal';
import type { EcosystemByAudience } from '@/lib/types';
import { displaySans, bodySans } from '@/styles/fonts';
import styles from './EcosystemAccordion.module.css';

/** How long each tab holds before the next one opens on its own. */
const AUTO_ADVANCE_MS = 3000;

/* Match the existing homepage hero's impact icons. */
const proofIcons: Record<string, string> = {
  'women trained': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  'cohorts delivered': 'm2 9 10-5 10 5-10 5-10-5 M6 11v6c3 3 9 3 12 0v-6 M22 9v8',
};

/* Four simple line marks for the accordion spines, in pillar order. */
const spineMarks = [
  'M4 20v-6a8 8 0 0 1 16 0v6 M8 20v-6a4 4 0 0 1 8 0v6 M3 20h18',
  'M12 3v18 M3 12h18 M5.6 5.6l12.8 12.8 M18.4 5.6 5.6 18.4 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  'M12 2 22 12 12 22 2 12 12 2Z M12 7 17 12 12 17 7 12 12 7Z',
  'M12 12C7 9 7 4 12 3c5 1 5 6 0 9Z M12 12c3-5 8-5 9 0-1 5-6 5-9 0Z M12 12c5 3 5 8 0 9-5-1-5-6 0-9Z M12 12c-3 5-8 5-9 0 1-5 6-5 9 0Z',
];

/* Rectangular top-edge accents from Figma 346:428, on a 71 × 52 grid.
   Academy receives a companion pattern for when it becomes a closed tab. */
const divisionAccents = [
  [[0, 0, 71, 13], [0, 13, 23, 17], [27, 13, 23, 12], [17, 28, 26, 13], [47, 25, 24, 9]],
  [[0, 0, 71, 21], [0, 21, 28, 17], [24, 29, 24, 17], [53, 25, 18, 9], [41, 44, 13, 8]],
  [[0, 0, 71, 13], [13, 13, 45, 13], [0, 26, 35, 21], [49, 21, 18, 13]],
  [[0, 0, 71, 12], [29, 10, 42, 12], [16, 18, 18, 12], [26, 28, 30, 16], [0, 35, 19, 8]],
];

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
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <DottedGlobe className={styles.globe} />
      <div className={styles.header}>
        <TextReveal
          key={audience}
          text={`${content.headline}\n${content.headlineMuted}`}
          className={styles.headline}
          lineClassNames={[styles.headlineLine, `${styles.headlineLine} ${styles.serif}`]}
        />
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
                    <svg className={styles.divisionColour} viewBox="0 0 71 52" preserveAspectRatio="none" aria-hidden="true" style={pillar.name === 'Academy' ? { fill: 'var(--bq-green-deep)' } : undefined}>
                      {divisionAccents[i % divisionAccents.length].map(([x, y, width, height], block) => (
                        <rect key={block} x={x} y={y} width={width} height={height} />
                      ))}
                    </svg>
                    <span className={styles.spineLabel}>{pillar.spineLabel ?? pillar.name}</span>
                    <svg className={styles.spineIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={spineMarks[i % spineMarks.length]} />
                    </svg>
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
                        {pillar.itemsLabel && <p className={styles.exploreLabel}>{pillar.itemsLabel}</p>}
                        <ol className={styles.items}>
                          {pillar.items.map((item, j) => (
                            <li key={item} className={styles.itemCell}>
                              {!pillar.preview?.hideItemNumbers && (
                                <span className={styles.itemNum} aria-hidden="true">
                                  {String(j + 1).padStart(2, '0')}
                                </span>
                              )}
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
                        <Button href={pillar.href} variant={pillar.preview?.heroButton ? 'green' : 'primary'} size="compact" className={`${styles.cta} ${pillar.preview?.heroButton ? styles.heroCta : ''}`}>
                          {pillar.cta}
                        </Button>
                      )}
                      {pillar.preview?.secondaryCta && (
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
        {content.invitation && (
          <div className={styles.invitation}>
            <p className={styles.invitationText}>{content.invitation.text}</p>
            <Button href={content.invitation.cta.href} variant="secondary" size="compact" className={styles.invitationCta}>
              {content.invitation.cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
