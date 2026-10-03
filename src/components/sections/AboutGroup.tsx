import type { AboutGroup } from '@/lib/types';
import styles from './AboutGroup.module.css';

const STATUS_CLASS: Record<string, string> = {
  registered: styles.registered,
  'in-progress': styles.inProgress,
  planned: styles.planned,
};

export default function AboutGroup({ group }: { group: AboutGroup }) {
  return (
    <section className={styles.group}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{group.eyebrow}</p>
        <h2 className={styles.headline}>
          {group.headline} <span className={styles.serif}>{group.headlineSerif}</span>
        </h2>
        <p className={styles.intro}>{group.intro}</p>

        <ul className={styles.register}>
          {group.entities.map((entity) => (
            <li key={entity.name} className={styles.entry}>
              <div>
                <p className={styles.name}>{entity.name}</p>
                {entity.rc && <p className={styles.rc}>RC {entity.rc}</p>}
              </div>
              <span className={`${styles.status} ${STATUS_CLASS[entity.status] ?? ''}`}>
                {entity.statusLabel}
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.closing}>{group.closing}</p>
      </div>
    </section>
  );
}
