import type { AboutPosition } from '@/lib/types';
import styles from './AboutPosition.module.css';

export default function AboutPosition({ position }: { position: AboutPosition }) {
  return (
    <section className={styles.position}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{position.eyebrow}</p>
          <h2 className={styles.headline}>
            {position.headline} <span className={styles.serif}>{position.headlineSerif}</span>
          </h2>
          <p className={styles.body}>{position.body}</p>
        </div>
        <aside className={styles.not}>
          <h3>{position.notTitle}</h3>
          <ul>
            {position.notItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
