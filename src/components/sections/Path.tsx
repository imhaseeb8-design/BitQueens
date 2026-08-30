import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { PathSection } from '@/lib/types';
import styles from './Path.module.css';

/**
 * Where you start - implemented from Figma node 111:73.
 *
 * Three bottom-aligned columns, each carrying a wave panel, and the panels get
 * taller left to right (96 / 221 / 346 at the 1296 frame). Because the columns
 * share a baseline, a taller panel pushes its copy higher, so the staircase is
 * built by the imagery rather than drawn on top of it. Join, then Learn, then
 * Build is a sequence and the rise is what says so.
 *
 * Two things moved in this revision, both from the frame: the CTA is now in the
 * header opposite the headline rather than closing the section, and the
 * unattributed "I belong here" quote is gone (see the note in content/home.ts).
 *
 * Server Component: the panel drift is a CSS scroll-driven animation, not a
 * scroll listener.
 */
export function Path({ content }: { content: PathSection }) {
  return (
    <Section id="path" label="Where you start" rule>
      <div className={styles.head}>
        <Reveal as="h2" delay={100} className={styles.headline}>
          {content.headline}
        </Reveal>
        <Reveal delay={180} className={styles.headAside}>
          <p className={styles.intro}>{content.intro}</p>
          <Button href={content.cta.href} size="compact">
            {content.cta.label}
          </Button>
        </Reveal>
      </div>

      <ol className={styles.list}>
        {content.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={260 + i * 130}
            className={styles.step}
            style={{ '--i': i } as CSSProperties}
          >
            <div className={styles.stepText}>
              <p className={styles.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className={styles.stepCopy}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>

            {/* Decorative: the ordered list already carries the sequence, and
                the panel's only job is the height that lifts this column. */}
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
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
