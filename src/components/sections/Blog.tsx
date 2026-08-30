import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { BlogSection } from '@/lib/types';
import styles from './Blog.module.css';

export function Blog({ content }: { content: BlogSection }) {
  if (content.posts.length === 0) return null;

  return (
    <Section id="blog" label="Blog" rule>

      <Reveal delay={100} className={styles.head}>
        <div>
          <h2 className={styles.headline}>{content.headline}</h2>
          <p className={styles.intro}>{content.intro}</p>
        </div>
        <Button href={content.cta.href} variant="link">
          {content.cta.label}
        </Button>
      </Reveal>

      <div className={styles.posts}>
        {content.posts.map((post, i) => (
          <Reveal
            key={post.href}
            href={post.href}
            delay={i * 80}
            className={styles.post}
          >
            <span className={styles.thumb}>
              {post.image?.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image.src} alt={post.image.alt} />
              )}
            </span>
            <span className={styles.category}>{post.category}</span>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <p className={styles.date}>{post.date}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
