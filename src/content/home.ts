import type { HomePage } from '@/lib/types';

/**
 * Homepage content.
 *
 * Copy is drawn from the approved design and the project brief. One thing
 * still needs the client before launch, marked NEEDS CONFIRMATION:
 *   • `founder.bio` — placeholder, awaiting Kristie's own words.
 *
 * `proof.stats` is intentionally empty. The brief asks the homepage to
 * "showcase real impact and numbers", but no verified figures exist yet —
 * so the section leads with the entity register, which is real and
 * independently checkable. Populate `stats` when BitQueens supplies them and
 * the numerals row appears automatically.
 */
export const home: HomePage = {
  /* ---------------------------------------------------------- 01 · hero -- */
  hero: {
    eyebrow: 'A women-first community',
    headlineLines: [
      { text: 'The digital', font: 'sans' },
      { text: 'economy. Open to', font: 'sans' },
      { text: 'every woman.', font: 'serif' },
    ],
    primaryCta: { label: 'Join BitQueens', href: '/join' },
    secondaryCta: { label: 'Partner with us', href: '/partners' },
  },

  /* ------------------------------------------------------- 02 · impact -- */
  /* The real reported figures, straight from the Figma frame — these replace
     the earlier placeholder set (6,000+ / 14 countries / 3 entities) that the
     old hero carried. */
  impact: {
    eyebrow: 'This is BitQueens',
    headline: 'The women’s layer of Web3.',
    headlineMuted:
      'Programs, cohorts and campus chapters for women across Africa and beyond.',
    stats: [
      {
        value: '2000+',
        label: 'women trained',
        support: 'Hands-on training in emerging technologies since 2023.',
      },
      {
        value: '3',
        label: 'cohorts delivered',
        support:
          'Structured programmes taking beginners from curious to capable.',
      },
      {
        value: '2',
        label: 'campus chapters',
        support:
          'Student-led communities holding the momentum between cohorts.',
      },
      {
        value: '8+',
        label: 'countries reached',
        support: 'Learners and chapters far beyond where we started.',
      },
    ],
  },

  /* --------------------------------------------------------- 02 · proof -- */
  proof: {
    eyebrow: 'Proof',
    statement:
      'BitQueens is not a concept or a plan. It is a registered group of ' +
      'companies, actively operating in Nigeria with international expansion ' +
      'underway.',
    entities: [
      {
        name: 'BitQueens Limited',
        rc: 'RC 9557101',
        status: 'registered',
        statusLabel: 'Registered',
      },
      {
        name: 'Bit-Queens Innovations Limited',
        rc: 'RC 9627471',
        status: 'registered',
        statusLabel: 'Registered',
      },
      {
        name: 'BitQueens Institute of Emerging Technologies (BIET) LTD/GTE',
        status: 'name-approved',
        statusLabel: 'Name approved — filing in progress',
      },
      {
        name: 'BitQueens Foundation',
        status: 'in-progress',
        statusLabel: 'Registration in progress',
      },
      {
        name: 'BitQueens Global LLC',
        status: 'planned',
        statusLabel: 'Planned — Wyoming, USA',
      },
    ],
    // Populate when BitQueens supplies verified figures.
    stats: [],
  },

  /* ----------------------------------------------------- 03 · ecosystem -- */
  ecosystem: {
    eyebrow: 'The Ecosystem',
    headline: 'One ecosystem',
    headlineMuted: 'Four ways in.',
    intro:
      'Four divisions, one route each. Pick the door that matches where you ' +
      'are today.',
    pillars: [
      {
        name: 'Academy',
        tag: 'Learn',
        description:
          'Cohort programmes, campus chapters and community learning, built for beginners. This is where you join.',
        cta: 'Join the Academy',
        href: '/academy',
        itemsLabel: 'Explore the Academy',
        items: ['Cohort programmes', 'Campus chapters', 'Community learning'],
        color: '#3B6C9F',
        ctaFill: 'light',
      },
      {
        name: 'Innovations & Labs',
        tag: 'Build',
        description:
          'Technology products, Chainelle, BitQueens AI and skills programmes. This is where you build.',
        cta: 'Explore Labs',
        href: '/innovations',
        itemsLabel: 'Inside the Labs',
        items: ['Chainelle', 'BitQueens AI', 'Skills programmes'],
        /* The 5px bars on the closed spines, from Figma 268:279: brand
           orange, the blue, blush. */
        color: '#E8641C',
        ctaFill: 'dark',
      },
      {
        name: 'BIET',
        tag: 'Enrol',
        description:
          'The Institute of Emerging Technologies — certificates, diplomas and fellowships. This is where you enrol.',
        cta: 'View programmes',
        href: '/biet',
        itemsLabel: 'Explore the programmes',
        items: ['Certificates', 'Diplomas', 'Fellowships'],
        color: '#3B6C9F',
        ctaFill: 'light',
        comingSoon: true,
      },
      {
        name: 'Foundation',
        tag: 'Support',
        description:
          'Scholarships, advocacy and donations. This is where support is given and received.',
        cta: 'Support the mission',
        href: '/foundation',
        itemsLabel: 'Explore the Foundation',
        items: ['Scholarships', 'Advocacy', 'Donations'],
        color: '#F3AFBC',
        ctaFill: 'dark',
        comingSoon: true,
      },
    ],
  },


  /* ---------------------------------------------------------- 05 · path -- */
  /* Rebuilt from Figma 288:442: three flat cards with a corner mark each,
     no wave panels. The earlier closing quote ("I belong here...") stays
     dropped: it was set in quote marks with no attributor. */
  path: {
    headline: 'Start where you are.',
    headlineMuted: 'Grow into what’s next.',
    intro:
      'Most women who join BitQueens start with no experience in emerging ' +
      'technology. The path is built for that.',
    steps: [
      {
        title: 'Join',
        description:
          'Enter the community and choose a learning track that fits where you are.',
        mark: 'globe',
      },
      {
        title: 'Learn',
        description:
          'Grow through cohort programmes, mentorship and campus chapters, taught in plain language.',
        mark: 'dots',
      },
      {
        title: 'Build',
        description:
          'Put your learning to work in real projects, careers and businesses.',
        mark: 'network',
      },
    ],
    cta: { label: 'Join BitQueens', href: '/join' },
    closing: 'No experience required. Just a place to begin.',
  },

  /* ---------------------------------------------------- 06 · conference -- */
  conference: {
    eyebrow: 'The BitQueens Conference',
    headlineLines: ['A seat at the', 'future of tech.'],
    body:
      'Our flagship gathering connects women in emerging tech with the ' +
      'people, ideas and opportunities shaping what comes next.',
    /* Says which facts are still open, in the shape they will be answered in.
       Replacing "To be announced" with a real date needs no layout change. */
    details: [
      { key: 'Next edition', value: 'To be announced' },
      { key: 'Registration', value: 'Interest list open' },
    ],
    cta: { label: 'Explore the Conference', href: '/conference' },
    // Image supplied in the updated Figma frame, mirrored in presentation.
    image: {
      src: '/conference-audience.png',
      alt: 'Women listening to a speaker at a technology conference',
      width: 1672,
      height: 941,
    },
    /* Shared artwork: the same wave the second path panel uses. */
    backdrop: {
      src: '/path-wave-02.jpg',
      alt: '',
      width: 1200,
      height: 672,
    },
    speakers: [],
  },

  /* ------------------------------------------------------- 07 · founder -- */
  founder: {
    headline: 'The story behind',
    headlineSerif: 'BitQueens.',
    name: 'Kristie',
    role: 'Founder, BitQueens',
    storyLines: ['Kristie built the on-ramp', 'she couldn’t find.'],
    // NEEDS CONFIRMATION — placeholder bio, awaiting Kristie's own copy.
    bio:
      'Kristie founded BitQueens after watching capable women be priced and ' +
      'talked out of an industry that badly needs them. She builds the on-ramp ' +
      'she couldn’t find: programmes that assume no prior knowledge, taught in ' +
      'plain language, with a community attached.',
    primaryCta: { label: 'Book Kristie as a speaker', href: '/contact' },
    secondaryCta: { label: 'Read the full story', href: '/about' },
    portrait: {
      src: '/kristie-portrait.jpg',
      alt: 'Kristie, founder of BitQueens',
      width: 1250,
      height: 1300,
    },
  },

  /* ------------------------------------------------------ 08 · partners -- */
  partners: {
    headline: 'The future opens',
    headlineSerif: 'when we build together.',
    body:
      'If you share knowledge, host a space, open networks, or support access, ' +
      'you belong here. Together, we help more women learn and build in tech.',
    invitation: {
      title: 'Have another idea? Let’s talk.',
      body: 'There’s no single way to build with BitQueens.',
      cta: { label: 'Partner with BitQueens', href: '/partners' },
    },
    /* In number order. The frame (295:491) stacks 04 above 03; the numbers
       are what the reader follows, so they ascend here. */
    tiers: [
      {
        title: 'Companies',
        description: 'Share expertise, tools, mentors, and real-world opportunities.',
        color: '#3B6C9F',
      },
      {
        title: 'Universities',
        description:
          'Bring learning and community to campus through chapters and programmes.',
        color: '#2A492F',
      },
      {
        title: 'Communities & networks',
        description: 'Co-host gatherings and connect women to wider networks.',
        color: '#E8641C',
      },
      {
        title: 'Funders & institutions',
        description:
          'Support accessible learning and the partnerships that help it grow.',
        color: '#F3AFBC',
      },
    ],
  },

  /* ---------------------------------------------------------- 09 · blog -- */
  blog: {
    headline: 'Stories, Ideas and',
    headlineSerif: 'Perspectives...',
    cta: { label: 'Read our latest', href: '/blog' },
    posts: [
      {
        title: 'Why access matters more than ever',
        excerpt: '',
        category: 'Perspective',
        tags: ['Perspective'],
        date: '',
        href: '/blog/why-access-matters',
        image: {
          src: '/insight-perspective.png',
          alt: 'Africa’s next tech leaders are already here',
          width: 316,
          height: 316,
        },
      },
      {
        title: 'Meet the women building what comes next',
        excerpt: '',
        category: 'Community',
        tags: ['Community'],
        date: '',
        href: '/blog/women-building-what-comes-next',
        image: {
          src: '/insight-community.png',
          alt: 'Abstract portrait titled From learner to builder',
          width: 316,
          height: 316,
        },
      },
      {
        title: 'What emerging technology means for Africa’s next generation',
        excerpt: '',
        category: 'AI',
        tags: ['AI', 'Web3'],
        date: '',
        href: '/blog/emerging-technology-africa',
        image: {
          src: '/insight-ai-web3.png',
          alt: 'AI, Web3 and Africa editorial artwork',
          width: 316,
          height: 316,
        },
      },
      {
        title: 'How partnerships can expand opportunity across Africa',
        excerpt: '',
        category: 'Impact',
        tags: ['Impact'],
        date: '',
        href: '/blog/partnerships-expand-opportunity',
        image: {
          src: '/insight-impact.png',
          alt: 'Building access, one community at a time',
          width: 316,
          height: 316,
        },
      },
    ],
  },

  /* --------------------------------------------------------- 09b · place -- */
  place: {
    headline: 'Your place is here',
    /* Figma 297:850: the two doors, learners then partners. */
    cards: [
      {
        tag: 'For learners',
        titleLines: ['Start learning.', 'Find your people.'],
        body:
          'Explore emerging technology with a community that welcomes you ' +
          'from day one. No technical background needed.',
        cta: { label: 'Join BitQueens', href: '/join' },
        tone: 'green',
      },
      {
        tag: 'For partners',
        titleLines: ['Help open', 'more doors.'],
        body:
          'Bring your expertise, networks, space, or support to help more ' +
          'women learn and build in technology.',
        cta: { label: 'Partner with BitQueens', href: '/partners' },
        tone: 'cream',
      },
    ],
  },

  /* ---------------------------------------------------------- 10 · join -- */
  join: {
    eyebrow: 'Join',
    headline: 'The future should not be built without women.',
    /* The two doors moved up into `place` (Figma 297:850). */
    newsletter: {
      label: 'Stay updated',
      placeholder: 'Your email address',
      submitLabel: 'Subscribe',
      disclaimer:
        'We will only send updates about programmes, events and opportunities.',
    },
  },
};
