'use client';

import Image from 'next/image';
import { useId, useState, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import type { EcosystemSection } from '@/lib/types';
import styles from './EcosystemAccordion.module.css';

/**
 * The ecosystem as a horizontal accordion - Figma 143:140 and its three
 * sibling variants, one per open tab.
 *
 * Each item is a fixed-width row of [spine, artwork, panel] that is always
 * laid out at full width and clipped by the item's own `overflow: hidden`.
 * Only the item's width animates. That is the whole trick, and it is worth
 * keeping: the content never reflows mid-animation, because it is never
 * actually narrower - it is only ever hidden. Sizing the panel with flex and
 * letting it squeeze would rewrap the copy on every frame.
 *
 * Collapsed items show only their spine, so `--spine-w` is both the collapsed
 * width and the spine's width. `--open-w` is whatever is left once the other
 * three spines and the gaps are taken out, expressed in container units so it
 * resolves against the row from anywhere inside it.
 */
export function EcosystemAccordion({ content }: { content: EcosystemSection }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <section id="ecosystem" aria-label="The ecosystem" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>{content.headline}</span>
          <span className={`${styles.headlineLine} ${styles.muted}`}>
            {content.headlineMuted}
          </span>
        </h2>

        <div className={styles.row}>
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
                    {/* Only on collapsed spines: the open one is already
                        wearing its division colour as a background. */}
                    <span className={styles.divisionColour} aria-hidden="true" />
                    <span className={styles.spineLabel}>{pillar.name}</span>
                    <span className={styles.spineNum} aria-hidden="true">
                      {num}
                    </span>
                  </button>

                  <div className={styles.media} aria-hidden="true">
                    <Image
                      src="/ecosystem-panel.jpg"
                      alt=""
                      fill
                      sizes="245px"
                      className={styles.mediaImg}
                    />
                  </div>

                  {/* Closed panels stay in the DOM and stay laid out, so they
                      have to leave the tab order or a keyboard lands in
                      content nobody can see. That is done with `visibility`
                      in CSS rather than `inert` here: below 900px every panel
                      is shown, and an `inert` set from React state cannot see
                      the media query, so it left the mobile CTAs visible but
                      unclickable. */}
                  <div id={panelId} className={styles.panel}>
                    <div className={styles.panelInner}>
                      <div className={styles.head}>
                        <p className={styles.num}>{num}</p>
                        <h3 className={styles.name}>{pillar.name}</h3>
                        <p className={styles.desc}>{pillar.description}</p>
                      </div>

                      <ul className={styles.items}>
                        {pillar.items.map((item) => (
                          <li key={item} className={styles.itemRow}>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Button href={pillar.href} size="compact">
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
