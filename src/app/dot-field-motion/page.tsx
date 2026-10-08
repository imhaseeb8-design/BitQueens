import { AnimatedDotField } from '@/components/ui/AnimatedDotField';
import styles from './page.module.css';

export default function DotFieldMotionPage() {
  return (
    <main className={styles.page}>
      <AnimatedDotField
        className={styles.object}
        duration={2.4}
        alt="BitQueens animated white dot field"
      />
      <p className={styles.note}>Transparent object · Hover to spin once</p>
    </main>
  );
}
