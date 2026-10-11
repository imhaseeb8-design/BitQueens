import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AboutPosition } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AboutPosition.module.css';

/**
 * What BitQueens is not. The head and the body share the page's two-column
 * head; the list sits in a panel card beside it rather than in a bare aside.
 */
export default function AboutPosition({ position }: { position: AboutPosition }) {
  return (
    <section
      aria-label="Where we stand"
      className={`${styles.position} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionHead
            eyebrow={position.eyebrow}
            headline={position.headline}
            headlineSerif={position.headlineSerif}
            intro={position.body}
          />
        </div>

        <Reveal delay={140} as="aside" className={styles.not}>
          <h3 className={styles.notTitle}>{position.notTitle}</h3>
          <ul className={styles.notList}>
            {position.notItems.map((item) => (
              <li key={item} className={styles.notItem}>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
