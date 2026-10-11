import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { BlogSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Blog.module.css';

/**
 * Blog — Figma 295:748, restyled.
 *
 * It ran the hero's own two-line headline treatment at 48px for a list of
 * four links, which made the blog the loudest thing on the page. Now one
 * line at section-heading size, with the "read our latest" link beside it.
 *
 * The posts are cards on a panel ground rather than bare artwork: image,
 * title, and the excerpt and date when a post has them. Both are empty for
 * every post today, so the card ends at the title — nothing is invented to
 * fill it, and the layout already holds the room for when they arrive.
 */
export function Blog({ content }: { content: BlogSection }) {
  if (content.posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-label="Stories and perspectives"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.headline}>
            {content.headline}{' '}
            <span className={styles.headlineMuted}>{content.headlineMuted}</span>
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

              <span className={styles.body}>
                <span className={styles.tags}>
                  {(post.tags ?? [post.category]).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </span>

                <h3 className={styles.title}>{post.title}</h3>
                {post.excerpt && <span className={styles.excerpt}>{post.excerpt}</span>}
                {post.date && <span className={styles.date}>{post.date}</span>}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
