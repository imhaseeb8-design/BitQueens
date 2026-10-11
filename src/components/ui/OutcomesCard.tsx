import card from './MemberCard.module.css';
import styles from './OutcomesCard.module.css';

/** The tick beside each outcome — the site's mark, at the list's size. */
function Tick() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 8.4 6.2 11.6 13 4.8" />
    </svg>
  );
}

/**
 * "What you walk away with" — the Build step's card.
 *
 * The third sibling of `MemberCard`, importing that card's chrome so all
 * three steps are the same object. Everything it shows is a fact the site
 * already publishes: the outcomes are the track's own description, and the
 * level and length come from the track itself.
 */
export function OutcomesCard({
  kicker,
  title,
  outcomes,
  level,
  length,
  className = '',
}: {
  /** The track's name, above the headline. */
  kicker: string;
  title: string;
  /** One line per outcome. Three reads best; more will wrap the card tall. */
  outcomes: string[];
  level: string;
  length: string;
  className?: string;
}) {
  return (
    <div className={`${card.card} ${styles.card} ${className}`.trim()}>
      <p className={card.kicker}>{kicker}</p>
      <h3 className={card.title}>{title}</h3>

      <ul className={styles.list}>
        {outcomes.map((outcome) => (
          <li key={outcome} className={styles.item}>
            <Tick />
            {outcome}
          </li>
        ))}
      </ul>

      <p className={card.foot}>
        <strong>{level}</strong>
        <span>· {length}</span>
      </p>
    </div>
  );
}
