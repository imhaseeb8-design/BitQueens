import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { PathSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Path.module.css';

/** Three-step beginner path from Figma nodes 190:692 and 190:635–637. */
export function Path({ content }: { content: PathSection }) {
  return (
    <section
      id="path"
      aria-label="Where you start"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.heading}>
            <h2 className={styles.headline}>{content.headline}</h2>
            <p className={styles.headlineMuted}>
              <span aria-hidden="true" className={styles.dash} />
              {content.headlineMuted}
            </p>
          </div>

          <div className={styles.introBlock}>
            <p className={styles.intro}>{content.intro}</p>
            <Button href={content.cta.href} size="compact">
              {content.cta.label}
            </Button>
          </div>
        </div>

        <ol className={styles.cards}>
          {content.steps.map((step, index) => (
            <li key={step.title} className={styles.card}>
              <div className={styles.folder}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.copy}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
              <div className={styles.imageWrap} aria-hidden="true">
                <Image
                  src={step.image.src ?? ''}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 416px"
                  className={styles.image}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
