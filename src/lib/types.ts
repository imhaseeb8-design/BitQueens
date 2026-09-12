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
  spineLabel?: string;
  /** The one-word verb after the number in the panel eyebrow: "01 / LEARN". */
  tag: string;
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
  /** Heading over the items row: "Explore the Academy" (node 268:289). */
  itemsLabel: string;
  /** Shows a small "Coming soon" tag in the panel's top-right corner. */
  comingSoon?: boolean;
  /**
   * What the division actually contains. Three per pillar in the accordion
   * (Figma 268:279), set as a numbered row rather than prose, so a reader
   * scanning for one specific thing can find it without reading a sentence.
   */
  items: string[];
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
  /** Which of the three corner marks the card carries (see PathMarks.tsx). */
  mark: 'globe' | 'dots' | 'network';
}

export interface PathSection {
  headline: string;
  /** The serif second line. */
  headlineMuted: string;
  intro: string;
  steps: PathStep[];
  cta: NavLink;
  /** The one centred line under the cards. */
  closing: string;
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

/** One column of the DATE / TIME / REGISTRATION row. */
export interface ConferenceDetail {
  /** The small caps key, e.g. "DATE". */
  key: string;
  /**
   * The value. "To be announced" is a legitimate value here rather than a
   * missing one: the row's job before the event is announced is to say which
   * facts are still open, in the same shape they will be answered in.
   */
  value: string;
}

export interface ConferenceSection {
  eyebrow: string;
  /** Set as explicit lines: the frame breaks this over two (node 268:152). */
  headlineLines: string[];
  body: string;
  details: ConferenceDetail[];
  cta: NavLink;
  /**
   * The photograph the frame layers over the artwork. Empty today: the asset
   * in the frame is a stock mockup template with the vendor's own marketing
   * text rendered onto the screen, so it cannot ship. With a real photograph
   * this takes the front layer and `backdrop` moves behind it, which is how
   * the frame composes it.
   */
  image: ImageSlot;
  /** The wave artwork behind the photo, offset to show a 12px edge. */
  backdrop: ImageSlot;
  speakers: Speaker[];
}

export interface FounderSection {
  /** The centred section title: sans, then the serif word. */
  headline: string;
  headlineSerif: string;
  name: string;
  role: string;
  /** The panel's own headline, one entry per line (node 281:415). */
  storyLines: string[];
  bio: string;
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
  tags?: string[];
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
  /** The trust-bar pill above the headline ("A women-first community"). */
  eyebrow: string;
  /**
   * The headline, one entry per rendered line. The breaks are explicit rather
   * than left to a measure: the copy sits beside the dotted map, so where a
   * line ends decides how far it runs under the dots. Figma 260:232 sets all
   * three lines `nowrap`.
   */
  headlineLines: { text: string; font: 'sans' | 'serif' }[];
  primaryCta: NavLink;
  secondaryCta: NavLink;
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
