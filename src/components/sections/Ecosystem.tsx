import type { CSSProperties } from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { EcosystemSection } from '@/lib/types';
import styles from './Ecosystem.module.css';

export type EcosystemVariant = 'doors' | 'index' | 'stack';

export function Ecosystem({
  content,
  variant = 'doors',
}: {
  content: EcosystemSection;
  variant?: EcosystemVariant;
}) {
  if (variant === 'stack') {
    return (
      <>
        <Section id="ecosystem" label="The ecosystem" rule density="tight">
          <SectionLabel index="03" name={content.eyebrow} />
          <Reveal delay={100} className={styles.head}>
            <h2 className={styles.headline}>
              {content.headline}{' '}
              <span className={styles.muted}>{content.headlineMuted}</span>
            </h2>
            <p className={styles.intro}>{content.intro}</p>
          </Reveal>
        </Section>

        {/* Full-bleed sticky cards — deliberately outside Section's padded,
            max-width frame. Each card is a plain position:sticky sibling
            pinned at an increasing `top` offset (0, headerH, 2×headerH…);
            the "next card slides up and covers the last one, leaving its
            header peeking above" effect falls out of that alone — no JS,
            no scroll listener. (Verified against avax.network's own
            computed styles: same technique, same staggered `top` values.) */}
        <div className={styles.stack} aria-label="The ecosystem, in detail">
          {content.pillars.map((pillar, i) => (
            // Each card owns its own containing block (this wrapper) — see
            // the comment on .stackItem in the CSS for why that matters.
            <div key={pillar.name} className={styles.stackItem}>
              <Reveal
                href={pillar.href}
                delay={i * 60}
                className={styles.stackCard}
                style={{ '--i': i, '--accent': pillar.color } as CSSProperties}
              >
                <GridLines onDark />
                <div className={styles.stackInner}>
                  <div className={styles.stackHeader}>
                    <span className={styles.stackIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.stackName}>{pillar.name}</h3>
                  </div>
                  <div className={styles.stackBody}>
                    <p className={styles.stackDesc}>{pillar.description}</p>
                    <span className={styles.stackCta}>
                      {pillar.cta} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <Section id="ecosystem" label="The ecosystem" rule>
      <SectionLabel index="03" name={content.eyebrow} />

      <Reveal delay={100} className={styles.head}>
        <h2 className={styles.headline}>
          {content.headline}{' '}
          <span className={styles.muted}>{content.headlineMuted}</span>
        </h2>
        <p className={styles.intro}>{content.intro}</p>
      </Reveal>

      {variant === 'doors' ? (
        <div className={styles.doors}>
          {content.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.name}
              delay={i * 70}
              href={pillar.href}
              className={styles.door}
              style={{ '--accent': pillar.color } as CSSProperties}
            >
              <span className={styles.doorTop}>
                <span className={styles.doorIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.doorMark} aria-hidden="true" />
              </span>
              <h3 className={styles.doorName}>{pillar.name}</h3>
              <p className={styles.doorDesc}>{pillar.description}</p>
              <span className={styles.doorCta}>
                {pillar.cta} <span aria-hidden="true">→</span>
              </span>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className={styles.index}>
          {content.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.name}
              delay={i * 70}
              href={pillar.href}
              className={styles.indexRow}
              style={{ '--accent': pillar.color } as CSSProperties}
            >
              <span className={styles.indexNum}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.indexName}>{pillar.name}</h3>
              <p className={styles.indexDesc}>{pillar.description}</p>
              <span className={styles.indexCta}>
                {pillar.cta} <span aria-hidden="true">→</span>
              </span>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
