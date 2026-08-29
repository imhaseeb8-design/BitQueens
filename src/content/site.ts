import type { SiteConfig } from '@/lib/types';

/**
 * Global site content.
 *
 * Nav follows the sitemap in the project brief. Note the deliberate naming:
 * visitors see the OUTPUT of the internal engines, never the engines
 * themselves — "Blog" not "Media", "Conference" not "Hub", "Partners" not
 * "Alliance".
 *
 * Top nav is deliberately short (5 items) — Innovations, BIET and Foundation
 * are one scroll away in the homepage's Ecosystem section and still fully
 * reachable via the footer; they don't need to also compete for space in
 * the hero's nav bar.
 */
export const site: SiteConfig = {
  name: 'BitQueens',
  tagline: "Building the women's layer of Web3.",
  description:
    'BitQueens is an ecosystem helping women learn emerging technologies, ' +
    'build careers and enter the digital economy — across Africa and beyond.',

  nav: [
    { label: 'Academy', href: '/academy' },
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

/**
 * Footer-only links. The top nav dropped Innovations/BIET/Foundation to stay
 * short; they still need a permanent home, so the footer's "Ecosystem"
 * column lists all four divisions regardless of what made the top nav.
 */
export const footerLinks = {
  ecosystem: [
    { label: 'Academy', href: '/academy' },
    { label: 'Innovations & Labs', href: '/innovations' },
    { label: 'BIET', href: '/biet' },
    { label: 'Foundation', href: '/foundation' },
  ],
  company: [
    { label: 'Conference', href: '/conference' },
    { label: 'Partners', href: '/partners' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Brand assets', href: '/brand' },
    { label: 'Careers', href: '/careers' },
  ],
};

/** Contact routing from the brief. */
export const mailboxes = {
  general: 'hello@bitqueens.org',
  partnerships: 'partnerships@bitqueens.org',
  events: 'events@bitqueens.org',
} as const;
