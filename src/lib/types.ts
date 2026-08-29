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
}

export interface EcosystemSection {
  eyebrow: string;
  headline: string;
  headlineMuted: string;
  intro: string;
  pillars: Pillar[];
}

export interface MissionSection {
  eyebrow: string;
  headline: string;
  body: string;
  /** The escalating three-line refrain. Order carries the argument. */
  refrain: string[];
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

export interface HeroStat {
  /** Display value as written, e.g. "6,000+". Any leading number is counted
   *  up on reveal; prefix and suffix are preserved verbatim. */
  value: string;
  label: string;
}

export interface HeroSection {
  /** Opening clauses set in ink, e.g. ["Learn it.", "Build it."]. */
  headline: string[];
  /** The closing clause, set in the accent. */
  headlineAccent: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Revealed in the hero's second state, as it becomes its own section. */
  stats: HeroStat[];
  media: ImageSlot;
}

export interface HomePage {
  hero: HeroSection;
  proof: ProofSection;
  ecosystem: EcosystemSection;
  mission: MissionSection;
  path: PathSection;
  conference: ConferenceSection;
  founder: FounderSection;
  partners: PartnersSection;
  blog: BlogSection;
  join: JoinSection;
}
