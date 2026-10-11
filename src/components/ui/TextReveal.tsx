'use client';

import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motionTokens } from '@/lib/motion-tokens';
import styles from './TextReveal.module.css';

export interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  id?: string;
  /** Seconds before the first word rises. */
  delay?: number;
  /** Optional styles for deliberate lines, such as a serif second line. */
  lineClassNames?: string[];
  /** Decorative elements for placeholder words such as {globe}. */
  marks?: Record<string, ReactNode>;
}

/** Reveals words once as the text enters view. A changed key replays it. */
export function TextReveal({
  text,
  as: Tag = 'h2',
  className,
  id,
  delay = 0,
  lineClassNames,
  marks,
}: TextRevealProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, visible]);

  const lines = text.split('\n').map((line) => line.trim().split(/\s+/).filter(Boolean));
  const count = lines.reduce((total, words) => total + words.length, 0);
  const step = Math.min(motionTokens.stagger.word, motionTokens.duration.considered / Math.max(count - 1, 1));
  const blur = Tag === 'p' ? motionTokens.blur.soft : motionTokens.blur.text;
  let index = 0;

  return (
    <Tag
      ref={setNode}
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      data-visible={visible}
      style={{ '--reveal-blur': `${blur}px` } as CSSProperties}
    >
      <span className={styles.srOnly}>{text.replace(/\{\w+\}/g, '').replace(/\s+/g, ' ').trim()}</span>
      {lines.map((words, lineIndex) => (
        <Fragment key={lineIndex}>
          <span className={[styles.line, lineClassNames?.[lineIndex]].filter(Boolean).join(' ')} aria-hidden="true">
            {words.map((word, wordIndex) => {
              const position = index++;
              return (
                <Fragment key={`${word}-${position}`}>
                  <span className={styles.clip}>
                    <span
                      className={styles.word}
                      style={{ '--reveal-delay': `${delay + position * step}s` } as CSSProperties}
                    >
                      {marks?.[word.slice(1, -1)] && /^\{\w+\}$/.test(word) ? marks[word.slice(1, -1)] : word}
                    </span>
                  </span>
                  {wordIndex < words.length - 1 ? ' ' : null}
                </Fragment>
              );
            })}
          </span>
          {lineIndex < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
