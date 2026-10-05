import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/content/blog';
import { Button } from '@/components/ui/Button';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from '@/components/sections/Editorial.module.css';

export function generateStaticParams() { return blogPosts.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug} = await params;
  const post = blogPosts.find(p => p.slug === slug);
  return post ? {title:post.title,description:post.excerpt,openGraph:{title:post.title,description:post.excerpt,type:'article'}} : {title:'Story not found'};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter(p => p.slug !== slug).slice(0,2);
  const partner = post.category === 'Impact';
  return <div className={`${styles.page} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}><div className={styles.inner}>
    <Link href="/blog" className={styles.back}>← All stories</Link>
    <article><header className={styles.articleHead}><p className={styles.eyebrow}>{post.tags?.join(' / ')} · {post.readTime}</p><h1 className={styles.headline}>{post.title}</h1><p className={styles.intro}>{post.excerpt}</p><p className={styles.meta}>BitQueens</p></header>
      <figure className={styles.cover}><Image src={post.image!.src!} alt={post.image!.alt} fill sizes="(max-width: 960px) 100vw, 960px" priority /></figure>
      <div className={styles.articleLayout}><nav aria-label="In this story" className={styles.toc}><p className={styles.eyebrow}>In this story</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
        <div className={styles.body}>{post.sections.map(section => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
          <aside className={styles.invitation}><h2>{partner ? 'Let’s build together.' : 'Find your starting point.'}</h2><p>{partner ? 'Share your idea, expertise or network with BitQueens.' : 'Explore practical learning with a community that welcomes you from day one.'}</p><Button href={partner ? '/contact?topic=partnerships' : '/academy'} variant="green" size="compact">{partner ? 'Start a conversation' : 'Explore the Academy'}</Button></aside>
        </div>
      </div>
    </article>
    <section className={styles.related} aria-label="More stories"><h2>Keep exploring.</h2><div className={styles.grid}>{related.map(p => <Link href={p.href} key={p.slug} className={styles.card}><div className={styles.cardImage}><Image src={p.image!.src!} alt={p.image!.alt} fill sizes="(max-width: 650px) 100vw, 50vw" /></div><p className={styles.meta}>{p.category} · {p.readTime}</p><h2>{p.title}</h2><span className={styles.readLink}>Read story ↗</span></Link>)}</div></section>
  </div></div>;
}
