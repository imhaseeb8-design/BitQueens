import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/about', '/academy', '/innovations', '/ecosystem', '/events', '/blog', '/join', '/contact', '/brand-assets'];
  return [...pages, ...blogPosts.map(post => post.href)].map(path => ({ url: absoluteUrl(path) }));
}
