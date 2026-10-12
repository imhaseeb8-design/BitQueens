import { AnimatedNetworkMark } from '@/components/ui/AnimatedNetworkMark';
import styles from './page.module.css';

export default function NetworkMarkMotionPage() {
  return (
    <main className={styles.page}>
      <AnimatedNetworkMark
        className={styles.object}
        duration={2.4}
        alt="BitQueens animated white network mark"
      />
      <p className={styles.note}>Transparent object · Hover to spin once</p>
    </main>
  );
}
