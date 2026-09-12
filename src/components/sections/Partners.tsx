import { Button } from '@/components/ui/Button';
import type { PartnersSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Partners.module.css';

/** Organization invitation from Figma node 223:330. */
export function Partners({ content }: { content: PartnersSection }) {
  return (
    <section
      id="partners"
      aria-label="For organizations"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <p className={styles.wordmark} aria-hidden="true">
          Build with us
        </p>

        <div className={styles.card}>
          <div className={styles.main}>
            <p className={styles.eyebrow}>For Organizations</p>
            <h2 className={styles.headline}>
              Help more <span>women</span> enter the future of{' '}
              <span>technology</span>
            </h2>
            <p className={styles.body}>{content.body}</p>
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>

          <ul className={styles.audiences} aria-label="Organization types">
            {content.tiers.map((tier) => (
              <li key={tier.title}>{tier.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
