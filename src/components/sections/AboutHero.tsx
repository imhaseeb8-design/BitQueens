import Image from 'next/image';
import Link from 'next/link';
import type { AboutHero } from '@/lib/types';
import styles from './AboutHero.module.css';

export default function AboutHero({ hero }: { hero: AboutHero }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.headline}>
            {hero.headline}
            <span className={styles.serif}>{hero.headlineSerif}</span>
          </h1>
          <p className={styles.body}>{hero.body}</p>
          <div className={styles.ctas}>
            <Link href={hero.primaryCta.href} className={styles.primary}>
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className={styles.secondary}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <figure className={styles.art}>
          {hero.art.src ? (
            <Image
              src={hero.art.src}
              alt={hero.art.alt}
              width={hero.art.width}
              height={hero.art.height}
              priority
            />
          ) : null}
        </figure>
      </div>
    </section>
  );
}
