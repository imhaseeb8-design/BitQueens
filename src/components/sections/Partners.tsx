import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { PartnersSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Partners.module.css';

/** The 14px tick, same hand as the ecosystem offerings and the CTA arrow. */
function TickIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 8.4 6.2 11.6 13 4.8" />
    </svg>
  );
}

export function Partners({
  content,
  layout = 'stacked',
}: {
  content: PartnersSection;
  layout?: 'stacked' | 'matrix';
}) {
  const matrix = layout === 'matrix';
  return (
    <section
      id="partners"
      aria-label="Build with us"
      className={`${styles.section} ${matrix ? styles.matrix : ''} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.lead}>
          <Reveal className={matrix ? styles.matrixHeader : undefined}>
            {matrix && <p className={styles.eyebrow}>For partners</p>}
            <h2 className={styles.headline}>
              <span className={styles.headlineLine}>{content.headline}</span>
              <span className={`${styles.headlineLine} ${styles.serif}`}>
                {content.headlineSerif}
              </span>
            </h2>
            <p className={styles.body}>{content.body}</p>
          </Reveal>

          <Reveal delay={120} className={styles.invitation}>
            <p className={styles.invitationTitle}>{content.invitation.title}</p>
            <p className={styles.invitationBody}>{content.invitation.body}</p>
            <Button
              href={content.invitation.cta.href}
              size="compact"
              onDark
              className={styles.cta}
            >
              {content.invitation.cta.label}
            </Button>
          </Reveal>
        </div>

        <ol className={styles.tiles} aria-label="Who can partner">
          {content.tiers.map((tier, i) => (
            <Reveal
              key={tier.title}
              as="li"
              delay={i * 80}
              className={styles.tile}
            >
              <div className={styles.tileCopy}>
                <h3 className={styles.tileTitle}>{tier.title}</h3>
                <p className={styles.tileDesc}>{tier.description}</p>
                {matrix && (
                  <p className={styles.tileGain}>
                    <TickIcon />
                    {tier.gain}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
