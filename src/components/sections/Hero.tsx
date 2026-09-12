import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import type { HeroSection } from '@/lib/types';
import { neueMontreal, instrumentSerif, interTight } from '@/styles/fonts';
import styles from './Hero.module.css';

/**
 * Hero - implemented from Figma node 260:232 ("Swiss International Style /
 * Trust Bar Variant").
 *
 * The page ground carries everything: no band, no artwork. A dotted world map
 * sits to the right and bleeds off the frame; the trust-bar pill, the
 * three-line headline and the two CTAs stack down the left at the gutter.
 *
 * The map is the frame's static PNG replaced by the canvas `GlobalDotMap`, at
 * the PNG's exact box (1160 x 653 at x612 / y25 in the 1440 frame). Its
 * geometry is expressed in `cqw` against `.inner`, so it holds that position
 * at every width up to 1440 and stops scaling past it, like the frame.
 *
 * Server Component: the only client leaf is the map's canvas.
 */
export function Hero({ content }: { content: HeroSection }) {
  return (
    <section
      className={`${styles.hero} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
      aria-label="BitQueens"
    >
      <div className={styles.inner}>
        <GlobalDotMap className={styles.map} />

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.signal} aria-hidden="true" />
            {content.eyebrow}
          </p>

          <h1 className={styles.headline}>
            {content.headlineLines.map((line, i) => (
              <span key={line.text} className={styles.lineMask} data-font={line.font}>
                <span
                  className={styles.lineInner}
                  style={{ '--i': i } as CSSProperties}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          {/* Both are the shared Button so they carry the site's arrow shift
              on hover; the frame's green, corner and type are set in the
              module. */}
          <div className={styles.ctas}>
            <Button href={content.primaryCta.href} size="compact" className={styles.primaryCta}>
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="link" className={styles.secondaryCta}>
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
