import type { InnovationsPage } from '@/lib/types';

/**
 * Innovations & Labs page copy.
 *
 * Voice: the brief's tone of voice — friendly, clear, simple; confident and
 * professional; never corporate, never buzzword-heavy.
 *
 * Two commercial shapes (brief): products & consulting are "request a quote"
 * with no prices shown; skills programmes use e-commerce-style product cards
 * with price on enquiry until pricing is finalised.
 *
 * TODO (BitQueens team): product and programme names and descriptions below
 * are provisional. Confirm the real catalogue before launch.
 */
export const innovations: InnovationsPage = {
  hero: {
    eyebrow: 'BitQueens Innovations & Labs',
    headline: 'Build what’s next.',
    headlineSerif: 'This is where you build.',
    body: 'Innovations & Labs is the technology arm of BitQueens — products like Chainelle and BitQueens AI, plus professional skills programmes. Designed and built by women, for what comes next.',
    primaryCta: { label: 'Request a quote', href: '#quote' },
    secondaryCta: { label: 'Explore products', href: '#products' },
    art: {
      src: '/innovations-hero-art.png',
      alt: 'Abstract dotted motif in warm orange on cream',
      width: 1920,
      height: 1280,
    },
  },

  how: {
    eyebrow: 'How it works',
    headline: 'From idea',
    headlineSerif: 'to built.',
    steps: [
      {
        title: 'Share your goal',
        description:
          'Tell us what you want to build or learn — a product, a programme for your team, or a skill you need.',
      },
      {
        title: 'Get a proposal',
        description:
          'We scope the work with you in plain language: what it includes, how long it takes, and what it costs.',
      },
      {
        title: 'Build together',
        description:
          'We design, build, and ship it with you — and your team learns how it works along the way.',
      },
    ],
  },

  products: {
    eyebrow: 'Products',
    headline: 'Technology,',
    headlineSerif: 'built by BitQueens.',
    intro:
      'Our own products and consulting engagements. Every engagement starts with a conversation and a clear proposal — no prices on the shelf, no surprises later.',
    products: [
      {
        name: 'Chainelle',
        tagline: 'Our flagship technology product.',
        description:
          'Chainelle is built by the BitQueens Labs team. Talk to us about what it does and how it fits what you are building.',
        points: [
          'Built and maintained by the Labs team',
          'For teams and organisations',
          'Proposal and onboarding included',
        ],
        cta: { label: 'Request a quote', href: '#quote' },
      },
      {
        name: 'BitQueens AI',
        tagline: 'Applied AI, built practically.',
        description:
          'Our applied-AI work — tools and engagements that put AI to practical use in real organisations, explained without the hype.',
        points: [
          'Practical AI tools and integrations',
          'For teams and organisations',
          'Proposal and onboarding included',
        ],
        cta: { label: 'Request a quote', href: '#quote' },
      },
    ],
  },

  skills: {
    eyebrow: 'Skills programmes',
    headline: 'Professional programmes,',
    headlineSerif: 'priced per cohort.',
    intro:
      'Intensive, job-ready programmes from the Labs team. Pricing is confirmed personally for each cohort — enquire and we will send you the details.',
    skills: [
      {
        name: 'Blockchain Development Intensive',
        description:
          'Go from fundamentals to shipping: smart contracts, dApps, and the tooling professional builders use every day.',
        level: 'Advanced',
        length: '8 weeks',
        priceNote: 'Price on enquiry',
        cta: { label: 'Enquire now', href: '#quote' },
      },
      {
        name: 'AI Product Building',
        description:
          'Design and ship real AI-powered products — from idea and prototype to something people actually use.',
        level: 'Intermediate',
        length: '6 weeks',
        priceNote: 'Price on enquiry',
        cta: { label: 'Enquire now', href: '#quote' },
      },
      {
        name: 'Web3 Design & Prototyping',
        description:
          'Design for the next web: wallets, dApps, and on-chain experiences, from research to high-fidelity prototype.',
        level: 'Intermediate',
        length: '4 weeks',
        priceNote: 'Price on enquiry',
        cta: { label: 'Enquire now', href: '#quote' },
      },
    ],
  },

  quote: {
    eyebrow: 'Get a proposal',
    headline: 'Tell us what',
    headlineSerif: 'you want to build.',
    body: 'Share a few details and the Labs team will come back with a clear proposal. No commitment, no jargon — just an honest conversation about what is possible.',
    interests: [
      'Chainelle',
      'BitQueens AI',
      'Skills programmes',
      'Something else',
    ],
    submitLabel: 'Request a quote',
    successTitle: 'Request received.',
    successBody:
      'Thank you — the Labs team will review your request and reply by email with next steps.',
  },

  closing: {
    headline: 'Let’s build',
    headlineSerif: 'together.',
    body: 'Whether it is a product, a programme, or a skill — it starts with one conversation.',
    primaryCta: { label: 'Request a quote', href: '#quote' },
    secondaryCta: { label: 'Explore the Academy', href: '/academy' },
  },
};
