import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import type { FounderSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Founder.module.css';

/** Founder feature from Figma nodes 190:539 and 190:691. */
export function Founder({ content }: { content: FounderSection }) {
  return (
    <section
      id="founder"
      aria-label="The founder"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <GlobalDotMap className={styles.map} />

      <div className={styles.inner}>
        <Image
          src="/founder-seal.png"
          alt=""
          width={99}
          height={99}
          className={styles.seal}
          aria-hidden="true"
        />

        <div className={styles.feature}>
          <div className={styles.portrait}>
            <Image
              src={content.portrait.src ?? '/kristie-founder.png'}
              alt={content.portrait.alt}
              fill
              sizes="(max-width: 760px) 100vw, 404px"
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.panel}>
            <div>
              <h2 className={styles.headline}>
                Founded by <span>{content.name}</span>.
              </h2>
              <p className={styles.bio}>{content.bio}</p>
            </div>

            <div className={styles.actions}>
              <Button href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Button>
              <Button href={content.secondaryCta.href} variant="secondary">
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
