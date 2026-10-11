import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AboutGroup } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutGroup.module.css';

const STATUS_CLASS: Record<string, string> = {
  registered: styles.registered,
  'in-progress': styles.inProgress,
  planned: styles.planned,
};

/**
 * The entity register.
 *
 * Was a full-bleed green band at its own 900 measure. It is now a green card
 * inside the gutters, which is how every other coloured block on the site is
 * built — the Conference card, the Academy community band, the Place cards.
 * The page should read as sections on one ground, not as the ground changing
 * colour.
 */
export default function AboutGroup({ group }: { group: AboutGroup }) {
  return (
    <section
      aria-label="The BitQueens group"
      className={`${styles.group} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <Reveal className={styles.card}>
          <SectionHead
            eyebrow={group.eyebrow}
            headline={group.headline}
            headlineSerif={group.headlineSerif}
            intro={group.intro}
            onDark
          />

          <ul className={styles.register}>
            {group.entities.map((entity, i) => (
              <Reveal as="li" key={entity.name} delay={i * 70} className={styles.entry}>
                <div className={styles.entryName}>
                  <p className={styles.name}>{entity.name}</p>
                  {entity.rc && <p className={styles.rc}>RC {entity.rc}</p>}
                </div>
                <span className={`${styles.status} ${STATUS_CLASS[entity.status] ?? ''}`}>
                  {entity.statusLabel}
                </span>
              </Reveal>
            ))}
          </ul>

          <p className={styles.closing}>{group.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
