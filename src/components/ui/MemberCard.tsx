import Image from 'next/image';
import styles from './MemberCard.module.css';

/**
 * "You're a member" — the card that says you are in.
 *
 * It borrows the founder card's wax seal as a stamp of membership, hung off
 * the top-right corner the same way, and is otherwise the site's panel card:
 * 12px corner, panel white, hairline. Sized to float over artwork, which is
 * where it is used — so it carries a soft shadow that the page's flat cards
 * do not need.
 */
export function MemberCard({
  name,
  since,
  className = '',
}: {
  /** The member's name. */
  name: string;
  /** The year they joined, e.g. "2026". */
  since: string;
  className?: string;
}) {
  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <Image
        src="/founder-seal.png"
        alt=""
        width={270}
        height={261}
        className={styles.stamp}
        aria-hidden="true"
      />
      <p className={styles.kicker}>Member since {since}</p>
      <h3 className={styles.title}>Welcome to BitQueens.</h3>
      <p className={styles.body}>
        You have a seat, a community, and somewhere to start. No technical
        background needed.
      </p>
      <p className={styles.foot}>
        <strong>{name}</strong>
        <span>· Free community</span>
      </p>
    </div>
  );
}
