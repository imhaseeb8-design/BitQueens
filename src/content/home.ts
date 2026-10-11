import type { HomePage } from '@/lib/types';
import { about } from './about';

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
const academyImpactStats = [
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
];

export const home: HomePage = {
  /* ---------------------------------------------------------- 01 · hero -- */
  hero: {
    audiences: [
      {
        id: 'learn',
        switchLabel: 'For Learners',
        /* "Build what comes next" could sit on any bootcamp's homepage —
           everything that made this BitQueens was down in the lede. The second
           line now carries the audience and the entry bar instead. */
        /* `{mark}` drops an inline image into the line. Two only, and placed
           so they sit diagonally — one late on the first line, one early on
           the second — rather than stacking into a vertical column. */
        headlineLines: [
          'Learn emerging {portrait} tech.',
          'Built for {room} women starting',
          'from zero.',
        ],
        /* Three facts, no adjectives. The headline above now says who this is
           for, so the lede is free to say what actually happens — and "free"
           is the biggest objection this page can remove. "Africa and beyond"
           is gone because the stats row underneath already says 8+ countries
           reached. */
        body: 'Free to join. Taught live, every week. Built around real projects.',
        /* One CTA, not two. The hero's job is to start someone moving, and a
           second door beside the first makes that a decision rather than a
           step. Joining is reachable from the header and the closing band. */
        primaryCta: { label: 'Explore the Academy', href: '/academy' },
      },
      {
        id: 'partner',
        switchLabel: 'For Partners',
        headlineLines: [
          'For companies, campuses & networks',
          'backing women in tech.',
        ],
        body:
          'We partner with companies, universities, networks, and funders to ' +
          'bring practical emerging-tech learning and opportunity to more women.',
        primaryCta: { label: 'Partner with BitQueens', href: '/#ecosystem' },
      },
    ],
    collaborators: {
      label: 'Organizations we’ve worked with',
      /* Real logos, supplied in the frame (322:139). Each at its artwork's
         own ratio, sized so the four carry one optical weight: the crests
         stand taller than the wordmarks to hold the same presence. */
      logos: [
        { name: 'SI<3>', logo: '/partner-si3.png', width: 120, height: 30 },
        { name: 'FUT Minna', logo: '/partner-fut-minna.png', width: 45, height: 48 },
        { name: 'Women Biz', logo: '/partner-women-biz.png', width: 48, height: 48 },
        { name: 'Women of Web3', logo: '/partner-women-of-web3.png', width: 110, height: 46 },
      ],
    },
  },

  /* Campus chapters — partner side only. Lived on /academy until the chapter
     form started interrupting a learner's run to the cohort application; the
     reader who wants to run a chapter is not the reader who wants to join
     one. */
  chapters: {
    eyebrow: 'Campus chapters',
    headline: 'Bring BitQueens',
    headlineSerif: 'to your campus.',
    body: 'Start a chapter at your university and bring emerging-tech learning to women on your campus. You get the playbook, the community, and our support — you bring the energy.',
    chapters: [],
    formEyebrow: 'Start a chapter',
    formHeadline: 'Tell us about your campus.',
    submitLabel: 'Apply to start a chapter',
    successTitle: 'Application received.',
    successBody:
      'Thank you — the community team will review your application and reply by email.',
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
    stats: academyImpactStats,
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
  /* Two sets, one per audience: the hero's switch picks which the
     accordion shows (Figma 268:279 for learners, 333:28 for partners). */
  ecosystem: {
    learn: {
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
            'Learn emerging technology with a women-first community. Start free, then explore guided programmes when you’re ready.',
          cta: 'Explore the Academy',
          href: '/academy',
          itemsLabel: '',
          items: ['Free community', 'Guided cohorts', 'Campus chapters'],
          preview: {
            stats: academyImpactStats.slice(0, 2),
            hideItemNumbers: true,
            heroButton: true,
            descriptions: [
              'Weekly sessions and a peer community. No experience needed.',
              'Learn in a group with live teaching. Free and paid options.',
              'Connect with women learning at university.',
            ],
          },
          color: '#3B6C9F',
          ctaFill: 'light',
        },
        {
          name: 'Innovations & Labs',
          tag: 'Build',
          description:
            'Build with the BitQueens Labs team — explore technology products, practical AI and professional skills programmes for you or your organisation.',
          cta: 'Explore Labs',
          href: '/innovations',
          itemsLabel: '',
          items: ['Chainelle', 'BitQueens AI', 'Skills programmes'],
          preview: {
            assurances: ['Clear scope, timeline & cost', 'No commitment to enquire'],
            hideItemNumbers: true,
            heroButton: true,
            descriptions: [
              'Our flagship technology product. Talk to the team about its fit for your project.',
              'Practical AI tools and integrations for teams and organisations.',
              'Build skills in blockchain, AI and Web3 design. Pricing on enquiry.',
            ],
          },
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

    /* Figma 333:28 ("Partner paths / Accordion"). Only Companies is open in
       that frame; the other three take their descriptions from the partner
       tiles in 295:491, which name the same four audiences in Kristie's own
       words. Their three "ways to contribute" are drafted from those lines
       and want a read before launch. */
    partner: {
      eyebrow: 'Partner paths',
      headline: 'Build together',
      headlineMuted: 'Your ideas are welcome.',
      intro:
        'Explore a few ways to work with BitQueens. We welcome other ideas and industries, too.',
      invitation: {
        text: 'Don’t see your industry here? Let’s talk about how we can work together.',
        cta: { label: 'Talk to us', href: '/contact?topic=partnerships' },
      },
      pillars: [
        {
          name: 'Companies',
          tag: 'Partner',
          description:
            'Create practical pathways into emerging technology through ' +
            'mentors, projects, sponsored programmes and career opportunities.',
          cta: 'Partner with us',
          /* These four sit inside #ecosystem, so they cannot link to it.
             Until there is a /partners page or a partner form, they open a
             mail to the address the footer already publishes. */
          href: '/contact?topic=partnerships',
          itemsLabel: 'Ways to contribute',
          items: ['Sponsor programmes', 'Share expertise', 'Open career paths'],
          color: '#3B6C9F',
          ctaFill: 'light',
        },
        {
          name: 'Universities',
          tag: 'Host',
          description:
            'Bring learning and community to campus through chapters and ' +
            'programmes, taught alongside what students already study.',
          cta: 'Partner with us',
          /* These four sit inside #ecosystem, so they cannot link to it.
             Until there is a /partners page or a partner form, they open a
             mail to the address the footer already publishes. */
          href: '/contact?topic=partnerships',
          itemsLabel: 'Ways to contribute',
          items: ['Campus chapters', 'Host a programme', 'Faculty collaboration'],
          color: '#E8641C',
          ctaFill: 'dark',
        },
        {
          name: 'Networks',
          tag: 'Convene',
          description:
            'Co-host gatherings and connect women to wider networks, so a ' +
            'cohort does not end when the programme does.',
          cta: 'Partner with us',
          /* These four sit inside #ecosystem, so they cannot link to it.
             Until there is a /partners page or a partner form, they open a
             mail to the address the footer already publishes. */
          href: '/contact?topic=partnerships',
          itemsLabel: 'Ways to contribute',
          items: ['Co-host gatherings', 'Open your network', 'Amplify cohorts'],
          color: '#3B6C9F',
          ctaFill: 'light',
        },
        {
          name: 'Funders',
          tag: 'Fund',
          description:
            'Support accessible learning and the partnerships that help it ' +
            'grow, from single scholarships to a whole cohort.',
          cta: 'Partner with us',
          /* These four sit inside #ecosystem, so they cannot link to it.
             Until there is a /partners page or a partner form, they open a
             mail to the address the footer already publishes. */
          href: '/contact?topic=partnerships',
          itemsLabel: 'Ways to contribute',
          items: ['Fund scholarships', 'Back a cohort', 'Support operations'],
          color: '#F3AFBC',
          ctaFill: 'dark',
        },
      ],
    },
  },


  learnerValue: {
    eyebrow: 'Why learn with BitQueens',
    headline: 'An open door. A real way forward.',
    intro: 'Start with what you know today. Learn with people who make emerging technology easier to understand and easier to use.',
    impactHeading: 'The progress so far.',
    impactCta: { label: 'Explore Ecosystem', href: '/ecosystem' },
    benefits: [
      {
        title: 'Free to begin',
        description: 'Join the community and explore weekly sessions before choosing a guided programme.',
      },
      {
        title: 'Taught live, in plain language',
        description: 'Ask questions as you learn alongside other women. No technical background required.',
      },
      {
        title: 'Built around real projects',
        description: 'Move from new ideas to practical work you can build on beyond a session or cohort.',
      },
    ],
  },

  /* ---------------------------------------------------------- 05 · path -- */
  /* Rebuilt from Figma 288:442: three flat cards with a corner mark each,
     no wave panels. The earlier closing quote ("I belong here...") stays
     dropped: it was set in quote marks with no attributor. */
  path: {
    learn: {
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

    /* Figma 335:28 ("Partner process / Three steps"). The marks repeat in the
       same order; only the words change. */
    partner: {
      headline: 'Start with alignment.',
      headlineMuted: 'Build for what lasts.',
      intro:
        'A clear process turns shared intent into practical delivery and ' +
        'lasting value.',
      steps: [
        {
          title: 'Align',
          description:
            'Agree the outcome, audience, roles, timeline and what success ' +
            'should look like.',
          mark: 'globe',
        },
        {
          title: 'Co-create',
          description:
            'Shape the programme around your resources, the community’s ' +
            'needs and the opportunity you want to create.',
          mark: 'dots',
        },
        {
          title: 'Deliver',
          description:
            'Launch the work, stay close to progress and learn together from ' +
            'the outcome.',
          mark: 'network',
        },
      ],
      cta: { label: 'Talk with us', href: '/contact' },
      closing: 'Clear scope. Shared ownership. Lasting value.',
    },
  },

  /* ---------------------------------------------------- 06 · conference -- */
  /* General questions, both sides of the audience switch. Every answer here
     restates something the site already says — the free community, the
     beginner tracks, the four partner routes, the campus chapters — rather
     than introducing a commitment nobody has signed off on.
     TODO (BitQueens team): partnerships@bitqueens.org is the address in
     site.ts. Confirm it is monitored before launch. */
  faq: {
    headline: 'The questions',
    headlineSerif: 'we get most.',
    intro: 'About BitQueens, about joining, and about building with us.',
    items: [
      {
        question: 'What is BitQueens?',
        answer:
          'A women-first ecosystem for learning, building and creating opportunities in emerging technology. It runs an Academy of cohort programmes and campus chapters, a free learning community, a conference, and an innovations arm that builds products.',
      },
      {
        question: 'Who is it for?',
        answer:
          'Women across Africa and beyond, from complete beginners upward. Nothing assumes a technical background, a degree or prior experience — everything is taught in plain language.',
      },
      {
        question: 'Does it cost anything to join?',
        answer:
          'Joining the community is free, always — weekly live sessions, a peer community, and a library of beginner resources. Some Academy cohorts are paid; those are clearly marked, and pricing is confirmed with you personally before anything is charged.',
      },
      {
        question: 'Where should I start?',
        answer:
          'Join free, then pick a track in the Academy. The first one starts at the very beginning, and the live trainings run every Friday and Sunday.',
      },
      {
        question: 'How can an organisation work with BitQueens?',
        answer:
          'Four ways, and you do not have to fit neatly into one: share knowledge by teaching or mentoring, host a space for a cohort or a chapter, open your networks, or support access through funding. If you share knowledge, host a space, open networks or support access, you belong here.',
      },
      {
        question: 'Can my university host a chapter?',
        answer:
          'Yes. Campus chapters are student-led communities that bring emerging-tech learning to women on campus. You get the playbook, the community and our support — you bring the energy. Apply from the partner side of this page.',
      },
      {
        question: 'How do we start a conversation?',
        answer:
          'Use our Contact page and choose Partnerships. Tell us who you are and what you have in mind, then continue the conversation by email.',
      },
    ],
  },

  conference: {
    /* One line, and short enough to stay one line: the body underneath
       already says "emerging tech", so "of tech" was the headline saying it
       first and worse. */
    headlineLines: ['A seat at the future.'],
    body: 'Meet women building in emerging tech — stories, ideas, new connections.',
    /* Says which facts are still open, in the shape they will be answered in.
       Replacing "To be announced" with a real date needs no layout change. */
    details: [
      { key: 'Next edition', value: 'Date to be announced. Join the interest list for updates.' },
    ],
    /* ------------------------------------------------------------------ *
     * PLACEHOLDER — NOT A REAL EDITION. No date or venue has been
     * confirmed by BitQueens. These two lines exist so the teaser can be
     * judged in its filled state and MUST be replaced with the real
     * edition, or reverted to "To be announced", before this ships.
     * ------------------------------------------------------------------ */
    meta: [
      { icon: 'calendar', value: 'March 2027' },
      { icon: 'place', value: 'Lagos, Nigeria' },
    ],
    /* The weekly trainings, straight from linktr.ee/BitQueens — the Zoom
       rooms and the full zone labels, daylight-saving halves included. This
       is the canonical copy; the Academy's community band reads it from
       here rather than keeping a second one. */
    sessionsLabel: 'Live training, every week',
    sessions: [
      {
        day: 'Fridays',
        time: '8:00 PM WAT/BST · 7:00 PM GMT/UTC · 3:00 PM EST/EDT',
        href: 'https://us02web.zoom.us/j/81229055699',
      },
      {
        day: 'Sundays',
        time: '8:00 PM WAT/BST · 7:00 PM GMT/UTC · 3:00 PM EST/EDT',
        href: 'https://us02web.zoom.us/j/81595873470',
      },
    ],
    cta: { label: 'Explore the events', href: '/events' },
    // Image supplied in the updated Figma frame, mirrored in presentation.
    image: {
      src: '/conference-audience.png',
      alt: 'Women listening to a speaker at a technology conference',
      width: 1672,
      height: 941,
    },
    /* Shared artwork: the same wave the second path panel uses. */
    backdrop: {
      src: '/path-wave-02.webp',
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
    // Share the profile details with About and Academy so they stay in sync.
    name: about.founder.name,
    role: about.founder.role,
    facts: about.founder.facts,
    storyLines: ['Kristie built the on-ramp', 'she couldn’t find.'],
    // NEEDS CONFIRMATION — placeholder bio, awaiting Kristie's own copy.
    /* The "on-ramp she couldn't find" sentence is gone: the headline right
       above says it, so the bio was restating the heading before adding
       anything of its own. */
    bio:
      'Kristie founded BitQueens after watching capable women be priced and ' +
      'talked out of an industry that badly needs them. Her programmes assume ' +
      'no prior knowledge, and come with a community attached.',
    cta: { label: 'Read the full story', href: '/about' },
    portrait: {
      src: '/kristie-portrait.jpg',
      alt: 'Kristie, founder of BitQueens',
      width: 1250,
      height: 1300,
    },
  },

  /* ------------------------------------------------------ 08 · partners -- */
  /* Reframed for partners. Every line of the old section was something the
     partner would give — share, bring, co-host, support — so the page asked
     four times and offered nothing. It now leads with the reach a partner is
     actually buying into (the same four published figures), and each tier
     says what comes back as well as what goes in. */
  partners: {
    headline: 'Reach women entering tech,',
    headlineSerif: 'through work already running.',
    body:
      'BitQueens has trained 2000+ women across 8+ countries since 2023, ' +
      'through cohorts, campus chapters and a weekly community. Partnering ' +
      'puts your people, tools or funding inside something already working.',
    invitation: {
      title: 'Not sure which one fits?',
      body: 'One conversation, no commitment — we will tell you honestly whether there is a fit.',
      cta: { label: 'Partner with BitQueens', href: '/#ecosystem' },
    },
    /* In number order. The frame (295:491) stacks 04 above 03; the numbers
       are what the reader follows, so they ascend here. */
    tiers: [
      {
        title: 'Companies',
        description: 'Share expertise, tools, mentors, and real-world opportunities.',
        gain: 'Your team and tools in front of women entering the field, before anyone else meets them.',
      },
      {
        title: 'Universities',
        description:
          'Bring learning and community to campus through chapters and programmes.',
        gain: 'A running chapter on your campus, with the programme and the community already built.',
      },
      {
        title: 'Communities & networks',
        description: 'Co-host gatherings and connect women to wider networks.',
        gain: 'A co-hosted audience that reaches well past your own list.',
      },
      {
        title: 'Funders & institutions',
        description:
          'Support accessible learning and the partnerships that help it grow.',
        gain: 'Delivery you can report against, with the figures published openly.',
      },
    ],
  },

  /* ---------------------------------------------------------- 09 · blog -- */
  blog: {
    headline: 'Stories, ideas and',
    headlineMuted: 'perspectives.',
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
        cta: { label: 'Partner with BitQueens', href: '/#ecosystem' },
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
