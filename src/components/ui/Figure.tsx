'use client';

import { useEffect, useState } from 'react';
import styles from './Figure.module.css';

/**
 * Splits "2000+" into the number to count and the characters around it, so the
 * count-up never has to guess at formatting it did not author.
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

/**
 * A statistic that counts up the first time it is scrolled into view.
 *
 * Extracted from the Impact section when the hero absorbed the figures, so
 * both can share one implementation. It owns its own observer rather than
 * taking a `run` prop, which means dropping one anywhere needs no wiring.
 *
 * A value with no digits in it renders verbatim, so this is safe for anything.
 */
export function Figure({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  const parsed = parseValue(value);
  const [node, setNode] = useState<HTMLParagraphElement | null>(null);
  // Starts at the real figure, which is what the server renders and what
  // anyone without JavaScript keeps. The count rewinds to zero only once it
  // actually begins.
  const [shown, setShown] = useState(parsed ? parsed.target : 0);
  const [run, setRun] = useState(false);

  useEffect(() => {
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
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, run]);

  useEffect(() => {
    if (!run || !parsed) return;

    // Respect the reader's setting: no counting, just the number, which is
    // already what state holds.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    // The first tick lands on ~0 and the loop carries it up from there, so the
    // rewind happens inside the animation rather than as a separate
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

  if (!parsed) {
    return (
      <p ref={setNode} className={className}>
        {value}
      </p>
    );
  }

  const body = parsed.grouped ? shown.toLocaleString('en-US') : String(shown);

  return (
    <p ref={setNode} className={className}>
      {parsed.prefix}
      {body}
      {parsed.suffix && <span className={styles.suffix}>{parsed.suffix}</span>}
    </p>
  );
}
