import type { Metadata } from 'next';
import { BlogIndex } from '@/components/sections/BlogIndex';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from '@/components/sections/Editorial.module.css';

export const metadata: Metadata = { title: 'Blog', description: 'Ideas, learning and perspectives from the BitQueens ecosystem.' };
export default function BlogPage() {
  return <div className={`${styles.page} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}><div className={styles.inner}>
    <header className={styles.hero}><p className={styles.eyebrow}>The BitQueens journal</p><h1 className={styles.headline}>Ideas for what<br/><span className={styles.serif}>comes next.</span></h1><p className={styles.intro}>Learning, community and the possibilities of emerging technology. Explained simply, with women at the centre.</p></header>
    <BlogIndex />
  </div></div>;
}
