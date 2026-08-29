'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import type { HeroSection } from '@/lib/types';
import styles from './Hero.module.css';

/** How far the wave drifts, in px, across the hero's full scroll range. The
 *  image is sized 128% of its frame, so this can never expose an edge. */
const DRIFT = 56;

export function Hero({ content }: { content: HeroSection }) {
  const hero = useRef<HTMLElement>(null);
  const wave = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = hero.current;
    const waveNode = wave.current;
    if (!node || !waveNode) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const write = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // 0 when the hero's top is at the viewport top, 1 once it has scrolled
      // its own height past. Clamped so it never overshoots the image slack.
      const p = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      waveNode.style.setProperty('--wave-shift', (p * DRIFT).toFixed(2));
    };

    // Coalesce to one write per frame — scroll fires far more often than the
    // screen refreshes, and every extra write is a wasted style recalc.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // rAF is paused in hidden tabs, so progress can be stale on return.
    document.addEventListener('visibilitychange', write);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', write);
    };
  }, []);

  return (
    <section className={styles.hero} ref={hero} aria-label="Introduction">
      <div className={styles.wave} ref={wave}>
        <Image
          src={content.media.src ?? ''}
          alt=""
          width={content.media.width}
          height={content.media.height}
          priority
        />
      </div>

      <div className={styles.body}>
        <div className={styles.grid}>
          <h1 className={styles.headline}>
            {/* Each line is masked so it can rise into place on load; the
                accent clause takes its own line, as the frame sets it. */}
            <span className={styles.lineMask}>
              <span className={styles.lineInner}>{content.headline}</span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.lineInner} ${styles.accent}`}>
                {content.headlineAccent}
              </span>
            </span>
          </h1>

          <div className={styles.card}>
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

        <div className={styles.rule}>
          <span className={styles.ruleAccent} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
