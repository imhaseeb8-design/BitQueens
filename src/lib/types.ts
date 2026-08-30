/**
 * Content contract for the BitQueens site.
 *
 * These types are the seam between content and presentation. Today the data
 * lives in `src/content/*` as plain TypeScript. When a CMS is introduced,
 * the fetch layer only has to return these same shapes — no component changes.
 */

export type Hex = `#${string}`;

/* ---------------------------------------------------------------- global -- */

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  nav: NavLink[];
  primaryCta: NavLink;
  secondaryCta: NavLink;
  legal: {
    entities: string[];
    jurisdiction: string;
  };
  social: NavLink[];
}

/* ------------------------------------------------------------ homepage --- */

export interface Stat {
  /** Display value, pre-formatted (e.g. "4,000+"). Kept as a string so the
   *  editor controls formatting, not the component. */
  value: string;
  label: string;
}

export type EntityStatus =
  | 'registered'
  | 'in-progress'
  | 'name-approved'
  | 'planned';

export interface LegalEntity {
  name: string;
  /** Registration number, where one has been issued. */
  rc?: string;
  status: EntityStatus;
  statusLabel: string;
}

export interface ProofSection {
  eyebrow: string;
  /** The one-sentence institutional claim the register backs up. */
  statement: string;
  /** The real credibility proof: a registered group of companies. */
  entities: LegalEntity[];
  /** Optional impact figures. Renders only when populated. */
  stats: Stat[];
}

export interface Pillar {
  name: string;
  description: string;
  cta: string;
  href: string;
  /** Accent pulled from the brand palette — one flat hue per arm. */
  color: Hex;
  /**
   * Fill for the card's CTA button, which the design contrasts against the
   * card itself: the deep blue and forest take a light button, the orange
   * and the white closing card take an ink one. Stated per pillar rather
   * than derived, because "which reads better on this hue" is a design call,
   * not something a luminance threshold gets right at these mid-tones.
   */
  ctaFill: 'light' | 'dark';
}

export interface EcosystemSection {
  eyebrow: string;
  headline: string;
  headlineMuted: string;
  intro: string;
  pillars: Pillar[];
}

export interface PathStep {
  title: string;
  description: string;
}

export interface PathSection {
  eyebrow: string;
  headline: string;
  intro: string;
  steps: PathStep[];
  quote: string;
  cta: NavLink;
  ctaNote: string;
  image: ImageSlot;
}

export interface ImageSlot {
  /** Path under /public once real photography lands. Empty renders a slot. */
  src?: string;
  /** Describe the person or scene — never "founder photo". */
  alt: string;
  width: number;
  height: number;
}

export interface Speaker {
  name: string;
  role: string;
}

export interface ConferenceSection {
  eyebrow: string;
  dateLine?: string;
  headline: string;
  body: string;
  note: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  image: ImageSlot;
  speakers: Speaker[];
}

export interface FounderSection {
  eyebrow: string;
  headline: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  quote?: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  portrait: ImageSlot;
}

export interface PartnerTier {
  title: string;
  description: string;
  href: string;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export interface PartnersSection {
  eyebrow: string;
  headline: string;
  body: string;
  cta: NavLink;
  tiers: PartnerTier[];
  partners: Partner[];
}

export interface Post {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  href: string;
  image?: ImageSlot;
}

/** Produced by BitQueens Media, but visitors only ever see "Blog". */
export interface BlogSection {
  eyebrow: string;
  headline: string;
  intro: string;
  cta: NavLink;
  posts: Post[];
}

export interface JoinDoor {
  title: string;
  body: string;
  cta: NavLink;
}

export interface JoinSection {
  eyebrow: string;
  headline: string;
  doors: [JoinDoor, JoinDoor];
  newsletter: {
    label: string;
    placeholder: string;
    submitLabel: string;
    disclaimer: string;
  };
}

export interface ImpactStat {
  /** Display value as written, e.g. "2000+". Any leading number is counted
   *  up on reveal; a trailing "+" is set smaller, on the same baseline. */
  value: string;
  /** The short name under the figure, e.g. "women trained". */
  label: string;
  /** One sentence saying what the figure actually counts. */
  support: string;
}

/** 02 · "This is BitQueens" — the impact figures. */
export interface ImpactSection {
  eyebrow: string;
  /** Claim, set in ink. */
  headline: string;
  /** Qualifier, set grey, continuing the same sentence. */
  headlineMuted: string;
  stats: ImpactStat[];
}

export interface HeroSection {
  /** Opening clause, set in ink. Wraps within the headline's own measure. */
  headline: string;
  /** The closing clause, set in the accent, on its own line. */
  headlineAccent: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** The full-bleed wave band above the headline. */
  media: ImageSlot;
}

export interface HomePage {
  hero: HeroSection;
  impact: ImpactSection;
  proof: ProofSection;
  ecosystem: EcosystemSection;
  path: PathSection;
  conference: ConferenceSection;
  founder: FounderSection;
  partners: PartnersSection;
  blog: BlogSection;
  join: JoinSection;
}
