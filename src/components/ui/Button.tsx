import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'link';
type Size = 'default' | 'compact';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Use the inverted palette, for placement on a dark full-bleed band. */
  onDark?: boolean;
  /**
   * `compact` is the 48px button the Figma frames specify (16/34 padding,
   * 14px label). `default` is the older 56px scale the rest of the site still
   * uses. The two are deliberately visible as separate values rather than one
   * being quietly changed: aligning the whole site on `compact` is a call to
   * make on purpose, not a side effect of one section.
   */
  size?: Size;
  /** Show the trailing arrow. On by default. */
  arrow?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'default',
  onDark = false,
  arrow = true,
  className = '',
}: ButtonProps) {
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
   */
  return (
    <Link href={href} className={classes}>
      <span className={styles.shift}>
        {arrow && (
          <span className={`${styles.arrow} ${styles.arrowLead}`} aria-hidden="true">
            →
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {arrow && (
          <span className={`${styles.arrow} ${styles.arrowTrail}`} aria-hidden="true">
            →
          </span>
        )}
      </span>
    </Link>
  );
}
