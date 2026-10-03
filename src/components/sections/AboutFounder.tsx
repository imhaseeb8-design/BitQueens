import Image from 'next/image';
import type { AboutFounder } from '@/lib/types';
import styles from './AboutFounder.module.css';

export default function AboutFounder({ founder }: { founder: AboutFounder }) {
  return (
    <section className={styles.founder}>
      <div className={styles.inner}>
        <div className={styles.portraitWrap}>
          {founder.portrait.src ? (
            <Image
              src={founder.portrait.src}
              alt={founder.portrait.alt}
              width={founder.portrait.width}
              height={founder.portrait.height}
              className={styles.portrait}
            />
          ) : null}
          <dl className={styles.facts}>
            {founder.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{founder.eyebrow}</p>
          <h2 className={styles.headline}>
            {founder.headline} <span className={styles.serif}>{founder.headlineSerif}</span>
          </h2>
          <p className={styles.name}>{founder.name}</p>
          <p className={styles.role}>{founder.role}</p>
          <div className={styles.bio}>
            {founder.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <a
            href={founder.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {founder.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
