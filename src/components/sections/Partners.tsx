import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { PartnersSection } from '@/lib/types';
import styles from './Partners.module.css';

export function Partners({ content }: { content: PartnersSection }) {
  return (
    <Section id="partners" label="Partners" rule>
      <SectionLabel index="08" name={content.eyebrow} />

      {content.partners.length > 0 && (
        <div className={styles.logos}>
          <div className={styles.logoRail}>
            {content.partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                className={styles.logo}
                rel="noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={partner.logo} alt={partner.name} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className={styles.split}>
        <Reveal delay={100}>
          <h2 className={styles.headline}>{content.headline}</h2>
          <p className={styles.body}>{content.body}</p>
          <div className={styles.action}>
            <Button href={content.cta.href} variant="primary">
              {content.cta.label}
            </Button>
          </div>
        </Reveal>

        <div className={styles.tiers}>
          {content.tiers.map((tier, i) => (
            <Reveal
              key={tier.title}
              href={tier.href}
              delay={180 + i * 80}
              className={styles.tier}
            >
              <span>
                <h3 className={styles.tierTitle}>{tier.title}</h3>
                <p className={styles.tierDesc}>{tier.description}</p>
              </span>
              <span className={styles.tierArrow} aria-hidden="true">
                →
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
