import type { CSSProperties } from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { EcosystemSection } from '@/lib/types';
import styles from './Ecosystem.module.css';

export type EcosystemVariant = 'doors' | 'index' | 'stack' | 'stackSide';

export function Ecosystem({
  content,
  variant = 'doors',
}: {
  content: EcosystemSection;
  variant?: EcosystemVariant;
}) {
  if (variant === 'stackSide') {
    return (
      // Deliberately a plain <section>, not the <Section> wrapper — Section's
      // band clips itself with `overflow: hidden`, and any such ancestor
      // (even one that never actually clips anything) breaks position:sticky
      // for everything inside it. The full-bleed `stack` variant sidesteps
      // the same trap by rendering its cards as a sibling after </Section>;
      // here the heading has to share a sticky-safe ancestor with the cards
      // too, since both are pinned in the same run, so the whole grid moves
      // outside instead.
      <section
        id="ecosystem"
        aria-label="The ecosystem"
        className={styles.sideSection}
      >
        <GridLines />
        <div className={styles.sideTopRule} />
        <div className={styles.sideInnerWrap}>
          <div className={styles.sideWrap}>
            <div className={styles.sideHead}>
              <SectionLabel index="03" name={content.eyebrow} />
              <Reveal delay={100}>
                <h2 className={styles.headline}>
                  {content.headline}{' '}
                  <span className={styles.muted}>{content.headlineMuted}</span>
                </h2>
                <p className={styles.intro}>{content.intro}</p>
              </Reveal>
            </div>

            {/* Cards pin within this narrower column and stack one on top of
                the other, each leaving only its own wave band peeking above —
                see .sideItem for why each card needs its own wrapper. The
                heading opposite is sticky at the same `top`, so it holds
                level with the top card for the whole run instead of
                scrolling past. */}
            <div className={styles.sideStack}>
              {content.pillars.map((pillar, i) => (
                <div key={pillar.name} className={styles.sideItem}>
                  <Reveal
                    href={pillar.href}
                    delay={i * 60}
                    className={styles.sideCard}
                    style={
                      { '--i': i, '--accent': pillar.color } as CSSProperties
                    }
                    data-last={i === content.pillars.length - 1 || undefined}
                  >
                    <span
                      className={styles.sideWave}
                      style={{ '--wave-x': `${(i * 33) % 100}%` } as CSSProperties}
                      aria-hidden="true"
                    />
                    <div className={styles.sideInner}>
                      <div className={styles.sideTop}>
                        <div className={styles.sideIndex}>
                          <span>{String(i + 1).padStart(2, '0')}</span>
                          <span className={styles.sideRule} />
                        </div>
                        <h3 className={styles.sideName}>{pillar.name}</h3>
                        <p className={styles.sideDesc}>{pillar.description}</p>
                      </div>
                      <span className={styles.sideCta}>
                        {pillar.cta} <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
