import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { BlogSection } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './Blog.module.css';

/**
 * Blog — Figma 295:748.
 *
 * The hero's two-line headline treatment (sans over serif, 86px pitch) with
 * the "read our latest" link tucked against its bottom-right, then four story
 * cards: square artwork, tag pills, title. The artwork PNGs carry their own
 * arrow badge.
 */
export function Blog({ content }: { content: BlogSection }) {
  if (content.posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-label="Stories and perspectives"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.headline}>
            <span className={styles.headlineLine}>{content.headline}</span>
            <span className={`${styles.headlineLine} ${styles.serif}`}>
              {content.headlineSerif}
            </span>
          </h2>
          <Button
            href={content.cta.href}
            variant="link"
            size="compact"
            className={styles.latest}
          >
            {content.cta.label}
          </Button>
        </div>

        <div className={styles.posts}>
          {content.posts.map((post) => (
            <Link key={post.href} href={post.href} className={styles.post}>
              <span className={styles.artwork}>
                {post.image?.src && (
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(max-width: 650px) 100vw, (max-width: 1050px) 50vw, 316px"
                    className={styles.artworkImage}
                  />
                )}
              </span>

              <span className={styles.tags}>
                {(post.tags ?? [post.category]).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </span>

              <h3 className={styles.title}>{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
