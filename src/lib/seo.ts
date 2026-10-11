import type { Metadata } from 'next';
import { site } from '@/content/site';

// Set this to the final public domain before deploying a domain migration.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bitqueens.vercel.app');
if (siteUrl.protocol !== 'https:') throw new Error('NEXT_PUBLIC_SITE_URL must use HTTPS');
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

export function pageMetadata(path: string, title: string, description: string, article = false): Metadata {
  const image = process.env.NEXT_PUBLIC_OG_IMAGE || 'https://bitqueens-website.vercel.app/opengraph-image.png';
  const images = image ? [{ url: absoluteUrl(image), width: 1200, height: 630, alt: 'BitQueens — a women-first ecosystem for learning, building and creating opportunities in emerging technology' }] : undefined;
  const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), siteName: site.name, type: article ? 'article' : 'website', images },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: fullTitle, description, images },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
