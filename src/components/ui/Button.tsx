import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'link';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Use the inverted palette, for placement on a dark full-bleed band. */
  onDark?: boolean;
  /** Show the trailing arrow. On by default. */
  arrow?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = 'primary',
  onDark = false,
  arrow = true,
  className = '',
}: ButtonProps) {
  const classes = [
    styles.base,
    styles[variant],
    onDark ? styles.onDark : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </Link>
  );
}
