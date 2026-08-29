'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import type { HeroSection } from '@/lib/types';
import styles from './Hero.module.css';
import { HeroStats } from './HeroStats';

/** The crossfade runs over p ∈ [0.44, 0.56] (see Hero.module.css) — a quick
 *  handoff, not a slow dissolve. Figures start their reveal a little ahead
 *  of the window opening, so the wipe + count-up has finished by the time
 *  the proof chapter is fully opaque. Pointer events hand over at the
 *  crossover, once proof is actually the dominant layer. */
const STATS_AT = 0.4;
const POINTER_HANDOFF = 0.5;
const WINDOW_START = 0.44;
const WINDOW_END = 0.56;

export function Hero({ content }: { content: HeroSection }) {
  const hero = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const node = hero.current;
    const stageNode = stage.current;
    if (!node || !stageNode) return;

    // Below the breakpoint the hero is a plain stack; no progress to track.
    const query = window.matchMedia('(max-width: 900px)');
    let frame = 0;

    const write = () => {
      frame = 0;

      if (query.matches) {
        node.style.setProperty('--p', '0');
        setStatsActive(true);
        return;
      }

      const rect = node.getBoundingClientRect();
      const travel = rect.height - stageNode.offsetHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;

      node.style.setProperty('--p', p.toFixed(4));
      node.style.setProperty(
        '--proof-events',
        p >= POINTER_HANDOFF ? 'auto' : 'none',
      );
      node.dataset.phase =
        p <= WINDOW_START ? 'pre' : p >= WINDOW_END ? 'past' : 'mid';

      if (p >= STATS_AT) setStatsActive(true);
    };

    // Coalesce to one write per frame — scroll fires far more often than the
    // screen refreshes, and every extra write is a wasted style recalc.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    query.addEventListener('change', write);
    // Browsers pause rAF in hidden tabs, so progress can be stale by the time
    // someone switches back. Recompute on return rather than waiting for the
    // next scroll.
    document.addEventListener('visibilitychange', write);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      query.removeEventListener('change', write);
      document.removeEventListener('visibilitychange', write);
    };
  }, []);

  const spoken = [...content.headline, content.headlineAccent].join(' ');

  return (
    <section
      className={styles.hero}
      ref={hero}
      aria-label="Introduction"
      style={{ '--p': 0, '--stage-h': '100vh' } as CSSProperties}
    >
      <div className={styles.stage} ref={stage}>
        <div className={styles.zone}>
          <div className={styles.swap}>
            <div className={styles.chapterHead} aria-hidden="true">
              <h1 className={styles.headline}>
                <span className={styles.lineMask}>
                  <span className={styles.lineInner}>
                    {content.headline.join(' ')}
                  </span>
                </span>
                <span className={styles.lineMask}>
                  <span className={`${styles.lineInner} ${styles.accent}`}>
                    {content.headlineAccent}
                  </span>
                </span>
              </h1>
              <figure className={styles.media}>
                <Image
                  src={content.media.src ?? ''}
                  alt=""
                  width={content.media.width}
                  height={content.media.height}
                  priority
                />
              </figure>
            </div>

            <div className={styles.chapterProof}>
              <p className={styles.proofLabel}>The proof</p>
              <HeroStats stats={content.stats} active={statsActive} />
            </div>
          </div>

          <div className={styles.pitch}>
            {/* The one real, always-present copy of the headline + artwork's
                meaning — the crossfading chapter above is decorative. */}
            <h2 className="bq-visually-hidden">{spoken}</h2>
            <p className={styles.lede}>{content.body}</p>
            <div className={styles.ctas}>
              <Button href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Button>
              <Button href={content.secondaryCta.href} variant="link">
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
