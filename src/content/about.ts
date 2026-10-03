import type { AboutPage } from '@/lib/types';

/**
 * About page copy.
 *
 * Voice: the brief's tone of voice — friendly, clear, simple; confident and
 * professional; never corporate, never buzzword-heavy.
 *
 * Vision, mission, brand promise, and the "what we are not" list are verbatim
 * from the project brief. Founder facts are from Kristie's public LinkedIn
 * profile (linkedin.com/in/kristiebitqueens) as of October 2026 — nothing
 * here is invented.
 */
export const about: AboutPage = {
  hero: {
    eyebrow: 'About BitQueens',
    headline: 'The women’s layer',
    headlineSerif: 'of Web3.',
    body: 'BitQueens is building the women’s layer of Web3 — an ecosystem that makes emerging technologies accessible, practical, and rewarding for women across Africa and beyond.',
    primaryCta: { label: 'Join BitQueens', href: '/join' },
    secondaryCta: { label: 'Explore the Academy', href: '/academy' },
    art: {
      src: '/about-hero-art.png',
      alt: 'Abstract dotted motif in deep green on warm cream',
      width: 1920,
      height: 1280,
    },
  },

  story: {
    eyebrow: 'Our story',
    headline: 'It started with',
    headlineSerif: 'a simple frustration.',
    paragraphs: [
      'Kristie Immanuel knew what it felt like to want to learn about blockchain and not know where to start. Too much jargon, too many moving parts — and not enough spaces where women felt included.',
      'In August 2023, after seven years in the blockchain space, she stopped waiting for someone else to build the on-ramp and launched BitQueens: blockchain education that is simple, accessible, and welcoming for women.',
      'Since then, more than 500 women have begun their blockchain journey through BitQueens — learning in plain language, connecting with opportunities, and building real skills through training, workshops, and mentorship.',
    ],
  },

  vision: {
    eyebrow: 'Why we exist',
    headline: 'The world we’re',
    headlineSerif: 'building toward.',
    vision: {
      title: 'Our vision',
      body: 'To become the world’s leading ecosystem helping women thrive through emerging technologies.',
    },
    mission: {
      title: 'Our mission',
      body: 'To make learning emerging technologies easy, practical and enjoyable by providing education, community, mentorship, innovation opportunities and real-world pathways into the digital economy.',
    },
    promise: {
      title: 'Our promise to every woman who finds us',
      lines: [
        'I belong here.',
        'I can understand this.',
        'I can build something.',
        'I can earn.',
        'I can lead.',
      ],
    },
  },

  position: {
    eyebrow: 'Women first',
    headline: 'The future should not',
    headlineSerif: 'be built without women.',
    body: 'Technology is shaping the future. Unfortunately, millions of women remain excluded from the opportunities being created. BitQueens exists to change that — preparing women to participate confidently in the next generation of the internet. Access creates confidence. Confidence creates opportunity. Opportunity creates leaders.',
    notTitle: 'What BitQueens is not',
    notItems: [
      'Not a crypto trading platform',
      'Not an NFT community',
      'Not an investment company',
    ],
  },

  group: {
    eyebrow: 'The Group',
    headline: 'A real institution,',
    headlineSerif: 'not just a community.',
    intro:
      'BitQueens is not a concept or a plan. It is a registered Group of Companies, actively operating in Nigeria with international expansion underway. That matters — this site speaks for a real institution.',
    entities: [
      {
        name: 'BitQueens Limited',
        rc: '9557101',
        status: 'registered',
        statusLabel: 'Registered',
      },
      {
        name: 'Bit-Queens Innovations Limited',
        rc: '9627471',
        status: 'registered',
        statusLabel: 'Registered',
      },
      {
        name: 'BitQueens Institute of Emerging Technologies',
        status: 'in-progress',
        statusLabel: 'Filing in progress',
      },
      {
        name: 'BitQueens Foundation',
        status: 'in-progress',
        statusLabel: 'Registration in progress',
      },
      {
        name: 'BitQueens Global LLC (Wyoming, USA)',
        status: 'planned',
        statusLabel: 'Planned',
      },
    ],
    closing:
      'Each company carries one part of the ecosystem — learning, technology, accreditation, and impact — under one women-first mission.',
  },

  founder: {
    eyebrow: 'Founder',
    headline: 'Meet',
    headlineSerif: 'Kristie.',
    name: 'Kristie Ezigbonwa Immanuel',
    role: 'Founder, BitQueens · Blockchain Educator for Women',
    bio: [
      'Kristie is a blockchain educator based in Abuja, Nigeria. She brings more than 15 years of teaching experience and seven years in blockchain — and she started BitQueens because she knew exactly how it feels to stand outside this industry looking in.',
      'Her approach is simple: break down complex ideas into plain language, and make sure no woman ever feels she doesn’t belong in the room. That philosophy runs through everything BitQueens teaches.',
      'Beyond BitQueens, she serves as Education Lead at SI<3> and is a Founding Member of Women in Asset Tokenization. In 2025 she spoke as a Women of Web3 featured speaker at the United Nations 80th Science Summit.',
    ],
    facts: [
      { label: 'Based in', value: 'Abuja, Nigeria' },
      { label: 'Teaching', value: '15+ years' },
      { label: 'In blockchain', value: '7+ years' },
      { label: 'Women supported', value: '500+' },
    ],
    portrait: {
      src: '/kristie-portrait.jpg',
      alt: 'Kristie Immanuel, founder of BitQueens',
      width: 1250,
      height: 1300,
    },
    cta: {
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/kristiebitqueens/',
    },
  },

  closing: {
    headline: 'Come build',
    headlineSerif: 'with us.',
    body: 'Whether you’re here to learn, to build, or to open doors for others — there’s a place for you in this ecosystem.',
    primaryCta: { label: 'Join BitQueens', href: '/join' },
    secondaryCta: { label: 'Partner with us', href: '/#partners' },
  },
};
