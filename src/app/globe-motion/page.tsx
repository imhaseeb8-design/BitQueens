import { AnimatedDotGlobe } from '@/components/ui/AnimatedDotGlobe';
import styles from './page.module.css';

export default function GlobeMotionPage() {
  return (
    <main className={styles.page}>
      <AnimatedDotGlobe
        className={styles.globe}
        duration={2.4}
        alt="BitQueens dotted globe"
      />
    </main>
  );
}
