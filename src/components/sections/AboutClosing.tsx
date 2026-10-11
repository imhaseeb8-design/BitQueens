import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { PartnerLink } from '@/components/ui/PartnerLink';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { TrustRow } from '@/components/ui/TrustRow';
import type { AboutClosing, ImpactStat } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutClosing.module.css';

/**
 * The closing ask.
 *
 * On the dotted map, on the page's own ground — not a green card. It is the
 * last thing on the page and it mirrors the hero at the top: same map, same
 * centred stack, same figures row under the buttons. The page opens and
 * closes on the same note.
 */
export default function AboutClosing({
  closing,
  stats,
}: {
  closing: AboutClosing;
  /** The figures under the buttons. Omit and the row is not rendered. */
  stats?: ImpactStat[];
}) {
  return (
    <section
      aria-label="Come build with us"
      className={`${styles.closing} ${displaySans.variable} ${bodySans.variable}`}
    >
      <GlobalDotMap className={styles.map} />

      <div className={styles.inner}>
        <TextReveal
          as="h2"
          text={`${closing.headline}\n${closing.headlineSerif}`}
          className={styles.headline}
          lineClassNames={[styles.line, `${styles.line} ${styles.muted}`]}
        />
        <Reveal delay={140}>
          <p className={styles.body}>{closing.body}</p>
        </Reveal>
        <Reveal delay={200} className={styles.ctas}>
          <Button href={closing.primaryCta.href} className={styles.primaryCta}>
            {closing.primaryCta.label}
          </Button>
          <PartnerLink className={styles.secondaryCta}>
            {closing.secondaryCta.label}
          </PartnerLink>
        </Reveal>

        {stats && stats.length > 0 && (
          <Reveal delay={260}>
            <TrustRow stats={stats} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
