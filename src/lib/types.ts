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
  /** The one line under the wordmark in the footer (Figma 298:44). */
  purpose: string;
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

/** The accordion is written twice, once per side of the hero's switch. */
export interface EcosystemByAudience {
  learn: EcosystemSection;
  partner: EcosystemSection;
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

/** The path is written twice, once per side of the hero's switch. */
export interface PathByAudience {
  learn: PathSection;
  partner: PathSection;
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
  /** The 4px bar along the top of the tile (Figma 293:458). */
  color: Hex;
}

export interface PartnersSection {
  /** The two-line headline: sans, then the serif line. */
  headline: string;
  headlineSerif: string;
  body: string;
  /** The green invitation card under the copy (node 293:477). */
  invitation: { title: string; body: string; cta: NavLink };
  tiers: PartnerTier[];
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
  /** The two-line headline: sans, then the serif line (Figma 295:746). */
  headline: string;
  headlineSerif: string;
  cta: NavLink;
  posts: Post[];
}

export interface PlaceCard {
  /** After the number in the eyebrow: "01 / FOR LEARNERS". */
  tag: string;
  /** One entry per line (node 297:755 breaks the title by hand). */
  titleLines: string[];
  body: string;
  cta: NavLink;
  /** The green card carries a cream button; the cream one a green button. */
  tone: 'green' | 'cream';
}

export interface PlaceSection {
  /** The one serif line that pins mid-screen before the cards slide over it. */
  headline: string;
  cards: [PlaceCard, PlaceCard];
}

export interface JoinSection {
  eyebrow: string;
  headline: string;
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

export interface HeroAudience {
  id: 'learn' | 'partner';
  /** Its label in the switch above the headline. */
  switchLabel: string;
  /**
   * One string, not authored lines: the frame (322:127) lets the headline
   * wrap inside a 684 measure rather than breaking it by hand.
   */
  headline: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

export interface Collaborator {
  name: string;
  logo: string;
  width: number;
  height: number;
}

export interface HeroSection {
  /** The two sides of the switch: learners first (Figma 322:107 / 322:153). */
  audiences: [HeroAudience, HeroAudience];
  collaborators: {
    /** One line, centred above the logo row. */
    label: string;
    logos: Collaborator[];
  };
}

export interface HomePage {
  hero: HeroSection;
  impact: ImpactSection;
  proof: ProofSection;
  ecosystem: EcosystemByAudience;
  path: PathByAudience;
  conference: ConferenceSection;
  founder: FounderSection;
  partners: PartnersSection;
  blog: BlogSection;
  place: PlaceSection;
  join: JoinSection;
}

/* ------------------------------------------------------------ academy --- */

/**
 * The Academy page — "this is where you join" (brief).
 *
 * Track and cohort names are provisional until the BitQueens team confirms
 * the programme list. "To be announced" is a legitimate value for cohort
 * dates, following the Conference section's convention.
 */

export interface AcademyHero {
  eyebrow: string;
  headline: string;
  /** The serif second line. */
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Generated abstract brand artwork — never photography of people. */
  art: ImageSlot;
  /** Real photography lands here; renders a labelled slot until then. */
  photo: ImageSlot;
}

export interface AcademyStep {
  title: string;
  description: string;
}

export interface AcademyPath {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  steps: AcademyStep[];
  /** The one centred line under the cards. */
  closing: string;
}

export interface AcademyTrack {
  name: string;
  description: string;
  level: string;
  length: string;
  /** "Free" or "Paid" — exact pricing is still being finalised. */
  access: string;
}

export interface AcademyTracks {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  tracks: AcademyTrack[];
}

export interface AcademyCohort {
  name: string;
  track: string;
  dates: string;
  format: string;
  level: string;
  access: string;
  cta: NavLink;
}

export interface AcademyCohorts {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  cohorts: AcademyCohort[];
}

export interface AcademyEnroll {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
}

export interface AcademyChapter {
  name: string;
  city: string;
}

export interface AcademyChapters {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  /** Renders only when populated. */
  chapters: AcademyChapter[];
  formEyebrow: string;
  formHeadline: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
}

export interface AcademySession {
  /** e.g. "Fridays". */
  day: string;
  /** e.g. "8:00 PM WAT". */
  time: string;
  href: string;
}

export interface AcademyCommunity {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  includes: string[];
  cta: NavLink;
  /** The live weekly training sessions (from the community's Linktree). */
  sessions?: AcademySession[];
  /** Direct community path, e.g. the WhatsApp group. */
  secondaryCta?: NavLink;
}

/** The one clarifier the brief demands: Academy ≠ BIET. */
export interface AcademyVsBiet {
  headline: string;
  academy: { title: string; body: string };
  biet: { title: string; body: string; cta: NavLink };
}

export interface AcademyStory {
  quote: string;
  name: string;
  detail: string;
}

export interface AcademyStories {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  /** Renders nothing when empty — real stories land here. */
  stories: AcademyStory[];
}

export interface AcademyFaqItem {
  question: string;
  answer: string;
}

export interface AcademyFaq {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  items: AcademyFaqItem[];
}

export interface AcademyClosing {
  headline: string;
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

export interface AcademyPage {
  hero: AcademyHero;
  path: AcademyPath;
  tracks: AcademyTracks;
  cohorts: AcademyCohorts;
  enroll: AcademyEnroll;
  chapters: AcademyChapters;
  community: AcademyCommunity;
  vsBiet: AcademyVsBiet;
  stories: AcademyStories;
  faq: AcademyFaq;
  closing: AcademyClosing;
}

/* --------------------------------------------------------------- join --- */

/** The /join page — the single destination for every "Join" CTA on the site. */
export interface JoinPage {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  tracks: string[];
  levels: string[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  privacy: string;
}

/* -------------------------------------------------------- innovations --- */

/**
 * The Innovations & Labs page — "this is where you build" (brief).
 *
 * Two commercial shapes: products & consulting ("request a quote", no prices
 * shown) and skills programmes (e-commerce-style product grid with price
 * cards — price confirmed on enquiry until pricing is finalised).
 *
 * Product and programme names are provisional until the BitQueens team
 * confirms the catalogue.
 */

export interface InnovationsHero {
  eyebrow: string;
  headline: string;
  /** The serif second line. */
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Generated abstract brand artwork — never photography of people. */
  art: ImageSlot;
}

export interface InnovationsStep {
  title: string;
  description: string;
}

export interface InnovationsHow {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  steps: InnovationsStep[];
}

export interface InnovationsProduct {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  cta: NavLink;
}

export interface InnovationsProducts {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  products: InnovationsProduct[];
}

export interface InnovationsSkill {
  name: string;
  description: string;
  level: string;
  length: string;
  /** Shown on the price card until pricing is finalised. */
  priceNote: string;
  cta: NavLink;
}

export interface InnovationsSkills {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  skills: InnovationsSkill[];
}

export interface InnovationsQuote {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  interests: string[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
}

export interface InnovationsClosing {
  headline: string;
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

export interface InnovationsPage {
  hero: InnovationsHero;
  how: InnovationsHow;
  products: InnovationsProducts;
  skills: InnovationsSkills;
  quote: InnovationsQuote;
  closing: InnovationsClosing;
}

/* -------------------------------------------------------------- about --- */

/**
 * The About page (brief): origin story, vision & mission, the women-first
 * positioning, leadership, and the evolution to a Group of companies.
 *
 * Founder details come from Kristie's public LinkedIn profile; anything not
 * confirmed there stays out.
 */

export interface AboutHero {
  eyebrow: string;
  headline: string;
  /** The serif second line. */
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Generated abstract brand artwork — never photography of people. */
  art: ImageSlot;
}

export interface AboutStory {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  paragraphs: string[];
  /** Link to the BitQueens story video on YouTube. */
  videoCta?: NavLink;
}

export interface AboutVisionMission {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  vision: { title: string; body: string };
  mission: { title: string; body: string };
  /** The brand promise: five "I can" lines. */
  promise: { title: string; lines: string[] };
}

/** The women-first positioning, including what BitQueens is NOT. */
export interface AboutPosition {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  body: string;
  notTitle: string;
  notItems: string[];
}

/** The evolution to a Group: the registered companies that make BitQueens
 *  a real institution, not just a community project. Reuses LegalEntity. */
export interface AboutGroup {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  intro: string;
  entities: LegalEntity[];
  closing: string;
}

export interface FounderFact {
  label: string;
  value: string;
}

export interface AboutFounder {
  eyebrow: string;
  headline: string;
  headlineSerif: string;
  name: string;
  role: string;
  /** Short paragraphs, in her voice where the facts allow. */
  bio: string[];
  facts: FounderFact[];
  portrait: ImageSlot;
  cta: NavLink;
}

export interface AboutClosing {
  headline: string;
  headlineSerif: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

export interface AboutPage {
  hero: AboutHero;
  story: AboutStory;
  vision: AboutVisionMission;
  position: AboutPosition;
  group: AboutGroup;
  founder: AboutFounder;
  closing: AboutClosing;
}
