import card from './MemberCard.module.css';
import styles from './TrackCard.module.css';

/**
 * "You are part-way through a track" — the Learn step's card.
 *
 * A sibling of `MemberCard`, not a second visual language: it imports that
 * card's chrome (panel, corner, hairline, shadow, type) and adds only the
 * progress bar and its row. Change the chrome there and both move together.
 */
export function TrackCard({
  track,
  week,
  weeks,
  name,
  level,
  className = '',
}: {
  /** The track's name, e.g. "Web3 Foundations". */
  track: string;
  /** Which week the member is on. */
  week: number;
  /** How many weeks the track runs. */
  weeks: number;
  /** The member's name. */
  name: string;
  /** The track's level, e.g. "Beginner track". */
  level: string;
  className?: string;
}) {
  const percent = Math.round((week / weeks) * 100);

  return (
    <div className={`${card.card} ${styles.card} ${className}`.trim()}>
      <p className={card.kicker}>In progress</p>
      <h3 className={`${card.title} ${styles.title}`}>{track}</h3>

      <span
        className={styles.track}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${track}, week ${week} of ${weeks}`}
      >
        <span className={styles.trackFill} style={{ width: `${percent}%` }} />
      </span>

      <p className={styles.progressRow}>
        <span>
          Week {week} of {weeks}
        </span>
        <strong>{percent}%</strong>
      </p>

      <p className={card.foot}>
        <strong>{name}</strong>
        <span>· {level}</span>
      </p>
    </div>
  );
}
