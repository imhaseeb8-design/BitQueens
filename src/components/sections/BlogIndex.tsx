'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/content/blog';
import styles from './Editorial.module.css';

const categories = ['All stories', 'Perspective', 'Community', 'AI', 'Impact'];

export function BlogIndex() {
  const [category, setCategory] = useState('All stories');
  const [query, setQuery] = useState('');
  const filtered = blogPosts.filter(post =>
    (category === 'All stories' || post.category === category) &&
    `${post.title} ${post.excerpt} ${post.tags?.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const showFeature = category === 'All stories' && !query.trim();
  const feature = blogPosts[0];

  return <>
    {showFeature && <Link href={feature.href} className={styles.feature}>
      <div className={styles.featureImage}><Image src={feature.image!.src!} alt={feature.image!.alt} fill sizes="(max-width: 750px) 100vw, 50vw" priority /></div>
      <div className={styles.featureCopy}><p className={styles.eyebrow}>Featured · {feature.category}</p><h2>{feature.title}</h2><p>{feature.excerpt}</p><span className={styles.readLink}>Read the story <span aria-hidden="true">↗</span></span></div>
    </Link>}
    <section aria-label="Browse stories" className={styles.browse}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter stories by topic">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'AI' ? 'AI & Web3' : item}</button>)}</div>
        <label className={styles.search}><span className="bq-visually-hidden">Search stories</span><input type="search" placeholder="Search stories…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>
      <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</p>
      <div className={styles.grid}>{filtered.map(post => <Link key={post.slug} href={post.href} className={styles.card}>
        <div className={styles.cardImage}><Image src={post.image!.src!} alt={post.image!.alt} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div>
        <p className={styles.meta}>{post.tags?.join(' / ')} <span>· {post.readTime}</span></p><h2>{post.title}</h2><p>{post.excerpt}</p><span className={styles.readLink}>Read story <span aria-hidden="true">↗</span></span>
      </Link>)}</div>
      {!filtered.length && <div className={styles.empty}><h2>No stories found.</h2><p>Try another topic or a different search.</p><button onClick={() => {setCategory('All stories'); setQuery('');}}>Show all stories →</button></div>}
    </section>
  </>;
}
