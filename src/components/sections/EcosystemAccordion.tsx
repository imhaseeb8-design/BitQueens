'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import type { EcosystemSection } from '@/lib/types';
import { neueMontreal, instrumentSerif, interTight } from '@/styles/fonts';
import styles from './EcosystemAccordion.module.css';

/** How long each tab holds before the next one opens on its own. */
const AUTO_ADVANCE_MS = 3000;

/**
 * The ecosystem as a horizontal accordion - Figma 274:324 / 268:279.
 *
 * A centred two-line headline over a faint, slowly turning dotted globe, then a row of four
 * items: the open one is [spine, panel], the closed ones are a spine alone
 * with a 5px division colour along the top. Every item is always laid out at
 * the open width and clipped by its own `overflow: hidden`; only the width
 * animates, so no copy rewraps mid-motion.
 *
 * The tabs also turn on their own, every 3s, so the row reads as a loop
 * rather than a control someone has to discover. That stops the moment it
 * would fight the reader: while the pointer or keyboard focus is inside the
 * row, while the row is off screen, and for anyone who asked for reduced
 * motion. A click restarts the clock from that tab, so a chosen tab holds for
 * a full beat before the loop moves on.
 */
export function EcosystemAccordion({ content }: { content: EcosystemSection }) {
  const [active, setActive] = useState(0);
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
                    <div className={styles.panelInner}>
                      {pillar.comingSoon && (
                        <span className={styles.comingSoon}>Coming soon</span>
                      )}
                      <p className={styles.eyebrow}>
                        {num}
                        <span className={styles.eyebrowSlash} aria-hidden="true">
                          /
                        </span>
                        {pillar.tag}
                      </p>
                      <h3 className={styles.name}>{pillar.name}</h3>
                      <p className={styles.desc}>{pillar.description}</p>

                      <div className={styles.explore}>
                        <p className={styles.exploreLabel}>{pillar.itemsLabel}</p>
                        <ol className={styles.items}>
                          {pillar.items.map((item, j) => (
                            <li key={item} className={styles.itemCell}>
                              <span className={styles.itemNum} aria-hidden="true">
                                {String(j + 1).padStart(2, '0')}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <Button href={pillar.href} size="compact" className={styles.cta}>
                        {pillar.cta}
                      </Button>
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
