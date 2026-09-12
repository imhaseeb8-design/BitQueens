import { AnimatedDotGlobe } from '@/components/ui/AnimatedDotGlobe';
import styles from './page.module.css';

export default function GlobeMotionPage() {
  return (
    <main className={styles.page}>
      <AnimatedDotGlobe
        className={styles.globe}
        duration={14}
        yaw={11}
        alt="BitQueens dotted globe"
      />
    </main>
  );
}
