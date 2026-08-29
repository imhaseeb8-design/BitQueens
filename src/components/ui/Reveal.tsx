'use client';

import Link from 'next/link';
import {
  createElement,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
  children?: ReactNode;
  /**
   * Intrinsic tag to render. A string only — components cannot cross the
   * server/client boundary as props. Pass `href` for a link instead.
   */
  as?: string;
  /** Renders a Next.js Link rather than `as`. */
  href?: string;
  /** Stagger offset in ms. Keep between 30–80ms per item in a group. */
  delay?: number;
  /** `rise` travels up, `fade` holds position, `draw` wipes a rule L→R. */
  variant?: 'rise' | 'fade' | 'draw';
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * Reveals its children once, when scrolled into view.
 *
 * JavaScript only flips a data attribute; CSS owns the animation so it runs
 * off the main thread and stays smooth while the page is still loading.
 *
 * The node is held in state via a callback ref rather than useRef, so the
 * observer re-attaches correctly if the element is ever swapped out.
 */
export function Reveal({
  children,
  as = 'div',
  href,
  delay = 0,
  variant = 'rise',
  className = '',
  style,
  ...rest
}: RevealProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node || visible) return;

    // Without IntersectionObserver, show the content rather than leaving it
    // invisible forever. Deferred a frame so it is not a synchronous
    // re-render cascade out of the effect body.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, visible]);

  const variantClass =
    variant === 'draw'
      ? styles.draw
      : `${styles.reveal} ${variant === 'fade' ? styles.fade : ''}`;

  const shared = {
    ref: setNode,
    'data-visible': visible,
    className: `${variantClass} ${className}`.trim(),
    style: { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties,
    ...rest,
  };

  if (href) {
    return (
      <Link href={href} {...shared}>
        {children}
      </Link>
    );
  }

  return createElement(as, shared, children);
}
