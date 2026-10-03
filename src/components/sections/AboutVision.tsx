import type { AboutVisionMission } from '@/lib/types';
import styles from './AboutVision.module.css';

export default function AboutVision({ vision }: { vision: AboutVisionMission }) {
  return (
    <section className={styles.vision}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{vision.eyebrow}</p>
        <h2 className={styles.headline}>
          {vision.headline} <span className={styles.serif}>{vision.headlineSerif}</span>
        </h2>

        <div className={styles.cards}>
          <article className={styles.card}>
            <h3>{vision.vision.title}</h3>
            <p>{vision.vision.body}</p>
          </article>
          <article className={styles.card}>
            <h3>{vision.mission.title}</h3>
            <p>{vision.mission.body}</p>
          </article>
        </div>

        <div className={styles.promise}>
          <h3>{vision.promise.title}</h3>
          <ul>
            {vision.promise.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
