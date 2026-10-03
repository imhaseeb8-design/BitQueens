import type { Metadata } from 'next';
import { JoinForm } from '@/components/sections/JoinForm';
import { join } from '@/content/join';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Join BitQueens',
  description:
    'Join the BitQueens Academy — free membership for women learning emerging technology across Africa and beyond.',
};

/**
 * /join — the single destination for every "Join" CTA on the site.
 *
 * Copy left, form right on a paper panel. Joining is free, always — the form
 * is a signup, not a checkout.
 */
export default function JoinPage() {
  return (
    <section
      aria-label="Join BitQueens"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{join.eyebrow}</p>
          <h1 className={styles.headline}>
            <span className={styles.line}>{join.headline}</span>
            <span className={`${styles.line} ${styles.serif}`}>
              {join.headlineSerif}
            </span>
          </h1>
          <p className={styles.body}>{join.body}</p>
        </div>
        <div className={styles.panel}>
          <JoinForm content={join} />
        </div>
      </div>
    </section>
  );
}
