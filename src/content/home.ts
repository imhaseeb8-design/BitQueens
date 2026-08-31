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
    headlineLines: ['The digital', 'economy. Open to', 'every woman.'],
    body:
      'BitQueens is an ecosystem helping women learn emerging technologies, ' +
      'build careers and enter the digital economy across Africa and beyond.',
    primaryCta: { label: 'Join BitQueens', href: '/join' },
    secondaryCta: { label: 'Partner with us', href: '/partners' },
    /* Three, not four: Figma 130:57 hides "3 cohorts delivered". The figure
       is still true, it is just not carried here any more. */
    stats: [
      {
        value: '2000+',
        label: 'women trained',
        support: 'Hands-on training in emerging technologies since 2023.',
      },
      {
        value: '2',
        label: 'campus chapters',
        support: 'Student-led communities maintain momentum between cohorts.',
      },
      {
        value: '8+',
        label: 'countries reached',
        support: 'Learners and chapters beyond where we started.',
      },
    ],
    media: {
      src: '/hero-bg.jpg',
      alt: '',
      width: 2880,
      height: 1234,
    },
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
    headline: 'One ecosystem.',
    headlineMuted: 'Four ways in.',
    intro:
      'Four divisions, one route each. Pick the door that matches where you ' +
      'are today.',
    pillars: [
      {
        name: 'Academy',
        description:
          'Community learning, cohort programmes and campus chapters. This is where you join.',
        cta: 'Join the Academy',
        href: '/academy',
        color: '#2B6CA3',
        ctaFill: 'light',
      },
      {
        name: 'Innovations & Labs',
        description:
          'Technology products, Chainelle, BitQueens AI and skills programmes. This is where you build.',
        cta: 'Explore Labs',
        href: '/innovations',
        color: '#E8641C',
        ctaFill: 'dark',
      },
      {
        name: 'BIET',
        description:
          'The Institute of Emerging Technologies — certificates, diplomas and fellowships. This is where you enrol.',
        cta: 'View programmes',
        href: '/biet',
        color: '#1E4A2C',
        ctaFill: 'light',
      },
      {
        name: 'Foundation',
        description:
          'Scholarships, advocacy and donations. This is where support is given and received.',
        cta: 'Support the mission',
        href: '/foundation',
        color: '#4A9BD1',
        ctaFill: 'dark',
      },
    ],
  },


  /* ---------------------------------------------------------- 05 · path -- */
  /* The closing quote ("I belong here...") was dropped here when the section
     was rebuilt from Figma 111:73, which does not include it. It was set in
     quote marks with no attributor, so it read as a testimonial while
     claiming nothing checkable. It is in git history if a named version of
     it ever arrives. */
  path: {
    eyebrow: 'Where you start',
    headline: 'You do not need a technical background.',
    intro:
      'Most people who join BitQueens start with no experience in emerging ' +
      'technologies at all. The path is built for that.',
    /* Panel heights rise across these three, which is what builds the
       staircase. Order is load-bearing. */
    steps: [
      {
        title: 'Join',
        description:
          'Enter the community and pick a learning track that fits where you are.',
        image: {
          src: '/path-wave-01.jpg',
          alt: '',
          width: 1200,
          height: 514,
        },
      },
      {
        title: 'Learn',
        description:
          'Cohort programmes, mentorship and campus chapters, taught in plain language.',
        image: {
          src: '/path-wave-02.jpg',
          alt: '',
          width: 1200,
          height: 672,
        },
      },
      {
        title: 'Build',
        description:
          'Apply what you learn to real projects, careers and businesses.',
        image: {
          src: '/path-wave-03.jpg',
          alt: '',
          width: 1200,
          height: 672,
        },
      },
    ],
    cta: { label: 'Join BitQueens', href: '/join' },
  },

  /* ---------------------------------------------------- 06 · conference -- */
  conference: {
    headlineLines: ['The BitQueens', 'Conference'],
    body:
      'Our flagship event unites women in emerging tech with supporting ' +
      'institutions, partners, and technologists.',
    /* Says which facts are still open, in the shape they will be answered in.
       Replacing "To be announced" with a real date needs no layout change. */
    details: [
      { key: 'Date', value: 'To be announced' },
      { key: 'Time', value: 'To be announced' },
      { key: 'Registration', value: 'Interest list open' },
    ],
    cta: { label: 'Explore the Conference', href: '/conference' },
    /* NEEDS A LICENSED PHOTOGRAPH. The frame's asset is a stock mockup
       template carrying "Mockups by Wannathis.one" and three feature-list
       strings on the screen, so it is not shippable. Cropping below the text
       leaves an image too short to render sharply at this size. */
    image: {
      alt: 'The audience at a BitQueens gathering',
      width: 621,
      height: 374,
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
    eyebrow: 'The Founder',
    headline: 'Founded by Kristie.',
    name: 'Kristie',
    role: 'Founder, BitQueens',
    // NEEDS CONFIRMATION — placeholder bio, awaiting Kristie's own copy.
    bio:
      'Kristie founded BitQueens after watching capable women be priced and ' +
      'talked out of an industry that badly needs them. She builds the on-ramp ' +
      'she could not find: programmes that assume no prior knowledge, taught in ' +
      'plain language, with a community attached.',
    credentials: [],
    // Deliberately empty: "The future should not be built without women" is
    // the closing headline in section 10, and repeating it three sections
    // earlier blunts both. Add a different line in Kristie's own words.
    quote: undefined,
    primaryCta: { label: 'Book Kristie as a speaker', href: '/contact' },
    secondaryCta: { label: 'Read the full story', href: '/about' },
    portrait: {
      alt: 'Kristie, founder of BitQueens',
      width: 468,
      height: 585,
    },
  },

  /* ------------------------------------------------------ 08 · partners -- */
  partners: {
    eyebrow: 'Partners',
    headline: 'Build this with us.',
    body:
      'BitQueens works with governments, universities, NGOs and technology ' +
      'companies to bring emerging technology education to more women across ' +
      'Africa and beyond.',
    cta: { label: 'Partner with us', href: '/partners' },
    tiers: [
      {
        title: 'Institutional',
        description: 'Governments, universities and public agencies.',
        href: '/partners#institutional',
      },
      {
        title: 'Corporate',
        description: 'Technology companies and industry partners.',
        href: '/partners#corporate',
      },
      {
        title: 'Sponsorship',
        description: 'Conference, programme and scholarship sponsors.',
        href: '/partners#sponsorship',
      },
    ],
    partners: [],
  },

  /* ---------------------------------------------------------- 09 · blog -- */
  blog: {
    eyebrow: 'Blog',
    headline: 'Read the work.',
    intro:
      'Articles, updates and educational content from across the ecosystem.',
    cta: { label: 'View all articles', href: '/blog' },
    posts: [
      {
        title: 'What “emerging technology” actually means for your career',
        excerpt:
          'A plain-language map of the field, and where a beginner can realistically start.',
        category: 'Explainer',
        date: '12 August 2026',
        href: '/blog/emerging-technology-careers',
      },
      {
        title: 'Inside a BitQueens cohort: eight weeks, no prior experience',
        excerpt:
          'What the programme actually looks like week by week, from the people who took it.',
        category: 'Programmes',
        date: '29 July 2026',
        href: '/blog/inside-a-cohort',
      },
      {
        title: 'Why campus chapters change who gets into tech',
        excerpt:
          'Reaching women where they already are turns out to matter more than any curriculum.',
        category: 'Community',
        date: '15 July 2026',
        href: '/blog/campus-chapters',
      },
    ],
  },

  /* ---------------------------------------------------------- 10 · join -- */
  join: {
    eyebrow: 'Join',
    headline: 'The future should not be built without women.',
    doors: [
      {
        title: 'Start learning.',
        body:
          'Join the community, pick a track and begin with no technical background.',
        cta: { label: 'Join BitQueens', href: '/join' },
      },
      {
        title: 'Work with us.',
        body:
          'For governments, universities, NGOs, technology companies and sponsors.',
        cta: { label: 'Partner with us', href: '/partners' },
      },
    ],
    newsletter: {
      label: 'Stay updated',
      placeholder: 'Your email address',
      submitLabel: 'Subscribe',
      disclaimer:
        'We will only send updates about programmes, events and opportunities.',
    },
  },
};
