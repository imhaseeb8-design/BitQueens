import Link from 'next/link';
import type { AboutClosing } from '@/lib/types';
import { PartnerLink } from '@/components/ui/PartnerLink';
import styles from './AboutClosing.module.css';

export default function AboutClosing({ closing }: { closing: AboutClosing }) {
  return (
    <section className={styles.closing}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          {closing.headline} <span className={styles.serif}>{closing.headlineSerif}</span>
        </h2>
        <p className={styles.body}>{closing.body}</p>
        <div className={styles.ctas}>
          <Link href={closing.primaryCta.href} className={styles.primary}>
            {closing.primaryCta.label}
          </Link>
          <PartnerLink className={styles.secondary}>
            {closing.secondaryCta.label}
          </PartnerLink>
        </div>
      </div>
    </section>
  );
}
