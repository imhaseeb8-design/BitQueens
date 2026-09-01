import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { PathSection } from '@/lib/types';
import styles from './Path.module.css';

/**
 * Where you start - implemented from Figma node 167:2.
 *
 * Three bottom-aligned columns, each carrying a wave panel, and the panels get
 * taller left to right (96 / 221 / 346 at the 1296 frame). Because the columns
 * share a baseline, a taller panel is what lifts the copy above it, so the
 * staircase is built by the imagery rather than drawn on top of it.
 *
 * The section PINS and the three steps arrive on scroll, one at a time
 * (trionn.com/services is the reference). The pin, the stage and the reveal
 * are all CSS, which is why this is still a Server Component: there is no
 * scroll listener anywhere. See the note in the stylesheet for why the pin is
 * gated on the same `@supports` as the animation.
 *
 * Deliberately a plain <section>, not the <Section> wrapper, for the same
 * reason the ecosystem stack is: Section clips itself with `overflow: hidden`,
 * and any such ancestor silently breaks `position: sticky` for everything
 * inside it. Inside Section the stage scrolled straight past instead of
 * pinning, and the reveal never ran.
 */
export function Path({ content }: { content: PathSection }) {
  return (
    <section id="path" aria-label="Where you start" className={styles.section}>
      <div className={styles.rule} />
      <div className={styles.pinWrap}>
        <div className={styles.stage}>
          <div className={styles.inner}>
          <div className={styles.head}>
            <Reveal delay={100} className={styles.headMain}>
              <h2 className={styles.headline}>{content.headline}</h2>
              <Button href={content.cta.href} size="compact">
                {content.cta.label}
              </Button>
            </Reveal>
            <Reveal as="p" delay={180} className={styles.intro}>
              {content.intro}
            </Reveal>
          </div>

          <ol className={styles.list}>
            {content.steps.map((step, i) => (
              /* No <Reveal> here: these are revealed by the pinned scroll
                 timeline, and two things writing opacity would fight. */
              <li key={step.title} className={styles.step} style={{ '--i': i } as CSSProperties}>
                <div className={styles.stepText}>
                  <p className={styles.stepNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div className={styles.stepCopy}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </div>

                {/* Decorative: the ordered list already carries the sequence,
                    and the panel's only job is the height that lifts this
                    column. */}
                <div className={styles.panel} aria-hidden="true">
                  <div className={styles.panelInner}>
                    <Image
                      src={step.image.src ?? ''}
                      alt=""
                      fill
                      sizes="(max-width: 860px) 100vw, (max-width: 1440px) 33vw, 416px"
                      className={styles.panelImg}
                    />
                  </div>
                </div>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
