import type { SiteConfig } from '@/lib/types';

/**
 * Global site content.
 *
 * Nav follows the sitemap in the project brief. Note the deliberate naming:
 * visitors see the OUTPUT of the internal engines, never the engines
 * themselves — "Blog" not "Media", "Conference" not "Hub", "Partners" not
 * "Alliance".
 */
export const site: SiteConfig = {
  name: 'BitQueens',
  tagline: "Building the women's layer of Web3.",
  description:
    'BitQueens is an ecosystem helping women learn emerging technologies, ' +
    'build careers and enter the digital economy — across Africa and beyond.',

  nav: [
    { label: 'Academy', href: '/academy' },
    { label: 'Innovations', href: '/innovations' },
    { label: 'BIET', href: '/biet' },
    { label: 'Foundation', href: '/foundation' },
    { label: 'Conference', href: '/conference' },
    { label: 'Partners', href: '/partners' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],

  primaryCta: { label: 'Join BitQueens', href: '/join' },
  secondaryCta: { label: 'Partner with us', href: '/partners' },

  legal: {
    entities: [
      'BitQueens Limited RC 9557101',
      'Bit-Queens Innovations Limited RC 9627471',
    ],
    jurisdiction: 'Registered in Nigeria',
  },

  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};

/** Contact routing from the brief. */
export const mailboxes = {
  general: 'hello@bitqueens.org',
  partnerships: 'partnerships@bitqueens.org',
  events: 'events@bitqueens.org',
} as const;
