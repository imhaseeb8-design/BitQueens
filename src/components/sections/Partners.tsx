import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { PartnersSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Partners.module.css';

/**
 * Partners — Figma 295:491.
 *
 * Two columns. On the left, the two-line headline, the invitation copy and a
 * green card asking for any other idea, with the CTA. On the right, four
 * numbered tiles, one per kind of partner, each wearing its own colour as a
 * 4px bar along the top. Nothing here is interactive except the CTA.
 *
 * Server Component.
 */
export function Partners({ content }: { content: PartnersSection }) {
  return (
    <section
      id="partners"
      aria-label="Build with us"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.lead}>
          <Reveal>
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
              style={{ '--accent': tier.color } as CSSProperties}
            >
              <span className={styles.tileNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.tileCopy}>
                <h3 className={styles.tileTitle}>{tier.title}</h3>
                <p className={styles.tileDesc}>{tier.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
