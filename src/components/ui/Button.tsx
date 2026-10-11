import Link from 'next/link';
import { PartnerLink } from './PartnerLink';
import { SelectionLink, type FormSelection } from './SelectionLink';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'green' | 'secondary' | 'link' | 'quiet';
type Size = 'default' | 'compact';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Use the inverted palette, for placement on a dark full-bleed band. */
  onDark?: boolean;
  /**
   * `compact` is the 48px button the Figma frames specify (16/34 padding,
   * 14px label) and is now **the default everywhere** — the homepage's
   * buttons are the site's buttons. `default` is the older 56px scale, kept
   * only so a one-off can opt back into it; nothing does today.
   */
  size?: Size;
  /**
   * Show the trailing arrow. On by default, and ignored by `quiet`, which
   * draws its own arrow so it can arrive on hover rather than sit there.
   */
  arrow?: boolean;
  className?: string;
  selection?: FormSelection;
}

/**
 * The CTA arrow — Figma 344:30 (`akar-icons:arrow`), 18×18, 1.7 stroke,
 * round caps and joins.
 *
 * Inlined rather than used as the saved `public/cta-arrow.svg` file for one
 * reason: the export hardcodes `stroke="white"`, which is right on the green
 * button and invisible on the secondary and quiet ones. `currentColor` lets
 * the one mark serve every variant. The geometry is the exported path,
 * unaltered.
 */
export function CtaArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'compact',
  onDark = false,
  arrow = true,
  className = '',
  selection,
}: ButtonProps) {
  const showArrow = arrow;
  // `quiet` has no box to clip, so it gets the single trailing arrow rather
  // than the crossing pair — but it is the same SVG mark as every other
  // variant, not a text character.
  const crossing = showArrow && variant !== 'quiet';

  const classes = [
    styles.base,
    styles[variant],
    size === 'compact' ? styles.compact : '',
    onDark ? styles.onDark : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /*
   * The arrow shift (mistral.ai's navbar button). There are TWO arrows, not
   * one that slides: a leading arrow parked outside the button's left edge,
   * and the trailing arrow you normally see. On hover the leading one slides
   * in, the label steps right, and the trailing one slides out, so the arrow
   * appears to cross the label. `.base` clips, which is what hides both
   * arrows at their parked positions.
   *
   * The leading arrow is absolutely positioned so it takes no layout space:
   * the button's width has to be identical hovered and not, or the whole row
   * reflows on pointer-over.
   *
   * A button with no arrow (`arrow={false}`) gets none of this. It has nothing
   * to shift toward, and shifting the label alone just walked it into the clip
   * and cut it in half. Those use the underline instead - see `.link` below.
   */
  const contents = (
      <span className={`${styles.shift} ${crossing ? styles.hasArrow : ''}`.trim()}>
        {crossing && (
          <span className={`${styles.arrow} ${styles.arrowLead}`} aria-hidden="true">
            <CtaArrow />
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {showArrow && (
          <span className={`${styles.arrow} ${styles.arrowTrail}`} aria-hidden="true">
            <CtaArrow />
          </span>
        )}
      </span>
  );
  if (selection) return <SelectionLink href={href} selection={selection} className={classes}>{contents}</SelectionLink>;
  return href === '/#ecosystem' ? <PartnerLink className={classes}>{contents}</PartnerLink> : <Link href={href} className={classes}>{contents}</Link>;
}
