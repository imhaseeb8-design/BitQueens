import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { InnovationsClosing as InnovationsClosingContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsClosing.module.css';

/**
 * The closing band — "Let's build together."
 *
 * The ink band: the site's darkest closing register, kept for the page that
 * is most about making things. Cream primary CTA per the dark-band
 * counter-accent rule.
 */
export function InnovationsClosing({
  content,
}: {
  content: InnovationsClosingContent;
}) {
  return (
    <section
      aria-label="Start building with Innovations and Labs"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>
            <span className={styles.line}>{content.headline}</span>
            <span className={`${styles.line} ${styles.serif}`}>
              {content.headlineSerif}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
        <Reveal delay={160} className={styles.ctas}>
          <Button
            href={content.primaryCta.href}
            variant="primary"
            onDark
            arrow={false}
          >
            {content.primaryCta.label}
          </Button>
          <Button
            href={content.secondaryCta.href}
            variant="secondary"
            onDark
            arrow={false}
          >
            {content.secondaryCta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
