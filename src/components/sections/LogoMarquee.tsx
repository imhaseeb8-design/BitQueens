import Image from 'next/image';
import { useId } from 'react';
import type { HeroSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './LogoMarquee.module.css';

type Collaborators = HeroSection['collaborators'];

/* One pass of four logos is about 760px wide — narrower than the viewport it
   runs through. The track translates by exactly one pass, so once it has
   travelled that far there is nothing left to show and the row empties out
   from the right. Repeating the set inside each pass makes a pass wider than
   any screen it will meet, which is what makes the loop seamless. */
const PASS_REPEATS = 4;

export function LogoMarquee({ content }: { content: Collaborators }) {
  const titleId = useId();
  const pass = Array.from({ length: PASS_REPEATS }, () => content.logos).flat();

  return (
    <section className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`} aria-labelledby={titleId}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.intro}>
            <h2 id={titleId}>{content.label}</h2>
            <p>Together, we open more ways for women to learn and build in emerging technology.</p>
          </div>

          <div className={styles.viewport} role="region" aria-label={content.label}>
            <div className={styles.track}>
              {[false, true].map((duplicate) => (
                <ul key={String(duplicate)} className={styles.logos} aria-hidden={duplicate || undefined}>
                  {pass.map((logo, i) => (
                    <li key={`${logo.name}-${i}`} className={styles.logo}>
                      <Image
                        src={logo.logo}
                        alt={duplicate || i >= content.logos.length ? '' : logo.name}
                        width={Math.round(logo.width * (logo.name === 'Women Biz' ? 1.7 : 0.68))}
                        height={Math.round(logo.height * (logo.name === 'Women Biz' ? 1.7 : 0.68))}
                        className={styles.logoImage}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
