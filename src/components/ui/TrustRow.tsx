import type { ImpactStat } from '@/lib/types';
import styles from './TrustRow.module.css';

/**
 * Lucide-style marks, one per figure, keyed by the stat's own label. A stat
 * with no entry here simply renders without a mark.
 */
const ICONS: Record<string, string> = {
  'women trained':
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  'cohorts delivered': 'm2 9 10-5 10 5-10 5-10-5 M6 11v6c3 3 9 3 12 0v-6 M22 9v8',
  'campus chapters':
    'M3 21h18 M5 21V7l7-4 7 4v14 M9 21v-5h6v5 M9 8h.01 M15 8h.01 M9 12h.01 M15 12h.01',
  'countries reached':
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c4 5 4 13 0 18 M12 3c-4 5-4 13 0 18',
};

/**
 * The figures, as one quiet row under a call to action.
 *
 * Lives here rather than in the hero because two pages now use it, and a
 * second copy of the icon paths is how the two would drift apart.
 *
 * Deliberately grey: these are corroboration for the action above them, not
 * the thing to read. Four green figures under a green button made the block
 * one colour all the way down.
 */
export function TrustRow({
  stats,
  label = 'BitQueens impact',
  className = '',
}: {
  stats: ImpactStat[];
  /** The list's accessible name. */
  label?: string;
  className?: string;
}) {
  return (
    <ul className={`${styles.trust} ${className}`.trim()} aria-label={label}>
      {stats.map((stat) => (
        <li key={stat.label} className={styles.trustItem}>
          {ICONS[stat.label] && (
            <svg
              className={styles.trustIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={ICONS[stat.label]} />
            </svg>
          )}
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
