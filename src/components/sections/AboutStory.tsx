import type { AboutStory } from '@/lib/types';
import styles from './AboutStory.module.css';

export default function AboutStory({ story }: { story: AboutStory }) {
  return (
    <section className={styles.story}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{story.eyebrow}</p>
        <h2 className={styles.headline}>
          {story.headline} <span className={styles.serif}>{story.headlineSerif}</span>
        </h2>
        <div className={styles.body}>
          {story.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {story.videoCta && (
          <a
            href={story.videoCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoCta}
          >
            <span className={styles.play} aria-hidden="true">▶</span>
            {story.videoCta.label}
          </a>
        )}
      </div>
    </section>
  );
}
