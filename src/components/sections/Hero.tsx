'use client';

import Image from 'next/image';
import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useId, useState } from 'react';
import { useAudience } from '@/components/audience/AudienceProvider';
import { Button } from '@/components/ui/Button';
import { TrustRow } from '@/components/ui/TrustRow';
import { ConferenceCard } from '@/components/ui/ConferenceCard';
import { TextReveal } from '@/components/ui/TextReveal';
import type { ConferenceSection, HeroSection, ImpactStat } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Hero.module.css';

const HERO_MESH_COLORS = ['#3A6C9F', '#06503C', '#E8641B', '#F3AFBC'];

function HeroShaderMark() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  return (
    <span className={`${styles.headlineMark} ${styles.headlineShaderMark}`} aria-hidden="true">
      <MeshGradient
        speed={reduceMotion ? 0 : 1}
        scale={1.91}
        distortion={0.75}
        swirl={0.1}
        frame={57365.1}
        colors={HERO_MESH_COLORS}
        className={styles.headlineShader}
      />
      <Image
        src="/bitqueens-b-mark-white.png"
        alt=""
        width={572}
        height={717}
        unoptimized
        className={styles.headlineShaderGlyph}
      />
    </span>
  );
}

/**
 * Hero — Figma 322:107 ("Homepage / Learners") and 322:153 ("/ Partners").
 *
 * Everything is centred on the page ground: a switch that names who the
 * reader is, then the headline, the lede and its CTAs, all of which the
 * switch swaps — the second CTA is optional, and the learner side runs
 * without one. The hero stays on clean ground; the dotted globe introduces
 * the ecosystem below, and collaborator logos follow that accordion.
 *
 * Client Component. The switch does not keep its own state: it sets the
 * page's audience, so a section further down can answer the same question.
 */
export function Hero({
  content,
  stats,
  conference,
}: {
  content: HeroSection;
  stats: ImpactStat[];
  /** Optional: the chip under the figures. Omit it and the band is empty. */
  conference?: ConferenceSection;
}) {
  const { audience: id, setAudience } = useAudience();
  const active = Math.max(0, content.audiences.findIndex((a) => a.id === id));
  const audience = content.audiences[active];
  const baseId = useId();

  return (
    <section
      className={`${styles.hero} ${displaySans.variable} ${bodySans.variable}`}
      aria-label="BitQueens"
    >
      <div className={styles.band}>

        <div className={styles.inner}>
          {audience.id === 'partner' && (
            <p className={styles.partnerStatus} role="status">
              <span className={styles.partnerStatusDot} aria-hidden="true" />
              Open for partnerships
            </p>
          )}
          <div className={styles.switch} role="tablist" aria-label="Who you are">
            {content.audiences.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className={styles.option}
                onClick={() => setAudience(item.id)}
              >
                {item.switchLabel}
              </button>
            ))}
          </div>

          {/* Credibility pill hidden alongside the trust bar, while the hero
              is being judged without either. Styles and markup kept —
              uncomment to restore.
          <p className={styles.credibility}>
          <span className={styles.credibilityDot} aria-hidden="true" />
          Women-first tech education since 2023
          </p>
          */}

          {/* Keyed on the audience so the entrance replays on every switch;
              React remounts the panel rather than mutating it in place. */}
          <div
            key={audience.id}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${audience.id}`}
            className={styles.panel}
            data-audience={audience.id}
          >
            <TextReveal
              as="h1"
              text={audience.headlineLines.join('\n')}
              className={styles.headline}
              lineClassNames={audience.headlineLines.map(() => styles.headlineLine)}
              delay={0.06}
              marks={{
                portrait: <HeroShaderMark />,
                room: <Image src="/conference-audience.png" alt="" width={96} height={96} className={styles.headlineMark} aria-hidden="true" />,
              }}
            />
            <p className={styles.body}>{audience.body}</p>

            <div className={styles.ctas}>
              <Button href={audience.primaryCta.href} size="compact" className={styles.primaryCta}>
                {audience.primaryCta.label}
              </Button>
              {audience.secondaryCta && (
                <Button
                  href={audience.secondaryCta.href}
                  variant="secondary"
                  size="compact"
                  className={styles.secondaryCta}
                >
                  {audience.secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
          <TrustRow stats={stats} />

          {conference && (
            <div className={styles.conferenceRow}>
              <ConferenceCard content={conference} />
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
