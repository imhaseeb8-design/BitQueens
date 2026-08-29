'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { Reveal } from '@/components/ui/Reveal';
import type { ImpactSection, ImpactStat } from '@/lib/types';
import styles from './Impact.module.css';

/**
 * Splits "2000+" into the number to count and the characters around it, so
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
  // Starts at the real figure, which is what the server renders and what
  // anyone without JavaScript keeps. The count rewinds to zero only once it
  // actually begins, while the row is still clipped shut.
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
      {parsed.suffix && <span className={styles.plus}>{parsed.suffix}</span>}
    </>
  );
}

function StatCell({ stat, index, run }: {
  stat: ImpactStat;
  index: number;
  run: boolean;
}) {
  return (
    <div
      className={styles.stat}
      style={{ '--i': index, '--reveal': run ? 1 : 0 } as CSSProperties}
    >
      <p className={styles.figure}>
        <Figure value={stat.value} run={run} />
      </p>
      <p className={styles.label}>{stat.label}</p>
      <p className={styles.support}>{stat.support}</p>
    </div>
  );
}

export function Impact({ content }: { content: ImpactSection }) {
  const row = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = row.current;
    if (!node || run) return;

    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setRun(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRun(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [run]);

  return (
    <section
      className={styles.section}
      id="impact"
      aria-label={content.eyebrow}
    >
      <div className={styles.inner}>
        <Reveal as="p" className={styles.eyebrow}>
          {content.eyebrow}
        </Reveal>

        <Reveal as="p" delay={80} className={styles.headline}>
          {content.headline}{' '}
          <span className={styles.headlineMuted}>{content.headlineMuted}</span>
        </Reveal>

        <div className={styles.stats} ref={row}>
          {content.stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
