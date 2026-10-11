import Image from 'next/image';
import Link from 'next/link';
import type { ConferenceSection } from '@/lib/types';
import { bodySans } from '@/styles/fonts';
import styles from './ConferenceCard.module.css';

/** 14px marks, matching the ones on the Conference section's meta row. */
function MetaIcon({ name }: { name: 'calendar' | 'place' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'calendar' ? (
        <>
          <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="2" />
          <path d="M2.25 6.5h11.5M5.5 1.75v2.5M10.5 1.75v2.5" />
        </>
      ) : (
        <>
          <path d="M13 6.9c0 3.5-5 7.35-5 7.35S3 10.4 3 6.9a5 5 0 0 1 10 0Z" />
          <circle cx="8" cy="6.8" r="1.8" />
        </>
      )}
    </svg>
  );
}

/**
 * The Conference, at chip scale — the whole card is one link.
 *
 * The section further down the page is the full pitch; this is the standing
 * notice that there is a conference at all, for the band under the hero's
 * figures. It reads from the same `conference` content, so a real edition
 * replaces the placeholder in one place and both update.
 *
 * Deliberately not a second pitch: a label, the facts, the action. No
 * headline and no body copy, and the action is a quiet text link rather than
 * a filled button — the hero already owns the one filled CTA on this screen.
 *
 * It goes to the interest form on the conference page, not the top of that
 * page: the ask here is to put your name down, so the link should land on
 * the thing that takes it. That form is explicit that it is an expression of
 * interest rather than a ticket, which is the honest answer while no edition
 * is confirmed.
 */
/** The interest form on the events page (`ConferenceInterest`). */
const APPLY_HREF = '/events#interest';

export function ConferenceCard({
  content,
  className = '',
}: {
  content: ConferenceSection;
  className?: string;
}) {
  const photo = content.image.src ? content.image : content.backdrop;

  return (
    <Link
      href={APPLY_HREF}
      className={`${styles.card} ${bodySans.variable} ${className}`.trim()}
    >
      <span className={styles.thumb}>
        <Image src={photo.src ?? ''} alt="" fill sizes="56px" className={styles.photo} />
      </span>

      <span className={styles.text}>
        <span className={styles.label}>The BitQueens Conference</span>
        <span className={styles.meta}>
          {content.meta.map((item, i) => (
            <span key={item.value} className={styles.metaItem}>
              {i === 0 && <MetaIcon name={item.icon} />}
              {item.value}
            </span>
          ))}
        </span>
      </span>

      <span className={styles.action}>
        Apply to attend
        <svg
          className={styles.arrow}
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15.0006 8.99998L3.00059 8.99998M9.75059 3.74998L15.0006 8.99998L9.75059 14.25"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
