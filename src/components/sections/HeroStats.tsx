'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { HeroStat } from '@/lib/types';
import styles from './Hero.module.css';

/**
 * Splits "6,000+" into the number to count and the characters around it, so
 * the count-up never has to guess at formatting it did not author.
 */
function parseValue(value: string) {
  const match = value.match(/([\d,.]+)/);
  if (!match) return null;

  const raw = match[1];
  const target = Number(raw.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;

  return {
    target,
    prefix: value.slice(0, match.index ?? 0),
    suffix: value.slice((match.index ?? 0) + raw.length),
    grouped: raw.includes(','),
  };
}

function Figure({ value, run }: { value: string; run: boolean }) {
  const parsed = parseValue(value);
  // Start at the real figure, not zero: this is what the server renders and
  // what anyone without JavaScript keeps. The count-up rewinds to zero only
  // once it actually starts, while the group is still hidden.
  const [shown, setShown] = useState(parsed ? parsed.target : 0);

  useEffect(() => {
    if (!run || !parsed) return;

    // Respect the reader's setting: no counting, just the number — which is
    // already what state holds, so there is nothing to do.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    // The first tick lands on ~0 and the loop carries it up from there, so
    // the rewind happens inside the animation rather than as a separate
    // synchronous write out of the effect body.
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease out, so it arrives rather than stops.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(parsed.target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // parsed is derived from `value`; depending on it directly would rebuild
    // the object every render and restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, value]);

  if (!parsed) return <>{value}</>;

  const body = parsed.grouped ? shown.toLocaleString('en-US') : String(shown);
  return (
    <>
      {parsed.prefix}
      {body}
      {parsed.suffix}
    </>
  );
}

/**
 * The proof figures revealed in the hero's second state.
 *
 * Each row wipes open from the left and its number counts up, staggered — the
 * group reads as loading in rather than appearing all at once.
 */
export function HeroStats({
  stats,
  active,
}: {
  stats: HeroStat[];
  active: boolean;
}) {
  // Once revealed, stay revealed; scrolling back up should not replay it.
  const [revealed, setRevealed] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    if (active && !seen.current) {
      seen.current = true;
      setRevealed(true);
    }
  }, [active]);

  return (
    <div className={styles.proofRow}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={styles.stat}
          style={{ '--i': i, '--reveal': revealed ? 1 : 0 } as CSSProperties}
        >
          <p className={styles.statValue}>
            <Figure value={stat.value} run={revealed} />
          </p>
          <p className={styles.statLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
