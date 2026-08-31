'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { Figure } from '@/components/ui/Figure';
import { Reveal } from '@/components/ui/Reveal';
import type { ImpactSection, ImpactStat } from '@/lib/types';
import styles from './Impact.module.css';

/* Not composed on the homepage any more: the hero absorbed these figures
   (Figma 132:8). Kept whole so it can be restored as its own band. */
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
      <Figure value={stat.value} className={styles.figure} />
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
