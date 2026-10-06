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
export const home: HomePage = {
  /* ---------------------------------------------------------- 01 · hero -- */
  hero: {
    audiences: [
      {
        id: 'learn',
        switchLabel: 'I’m here to learn',
        headline: 'Learn emerging tech. Build what comes next.',
        body:
          'Gain practical skills, build real projects, and grow with a ' +
          'women-first community across Africa and beyond.',
        primaryCta: { label: 'Explore the Academy', href: '/academy' },
        secondaryCta: { label: 'Join the community', href: '/join' },
      },
      {
        id: 'partner',
        switchLabel: 'I’m here to partner',
        headline: 'Back women building Africa’s digital future.',
        body:
          'Partner with BitQueens to bring practical emerging-tech education, ' +
          'community, and opportunity to more women.',
        primaryCta: { label: 'Partner with BitQueens', href: '/#ecosystem' },
        secondaryCta: { label: 'See our impact', href: '/about' },
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

    /* Figma 333:28 ("Partner paths / Accordion"). Only Companies is open in
       that frame; the other three take their descriptions from the partner
       tiles in 295:491, which name the same four audiences in Kristie's own
       words. Their three "ways to contribute" are drafted from those lines
       and want a read before launch. */
    partner: {
      eyebrow: 'Partner paths',
      headline: 'Build together',
      headlineMuted: 'Four ways in.',
      intro:
        'Four kinds of partner, one route each. Pick the one that matches ' +
        'what you can offer.',
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
    intro:
      'About BitQueens, about joining, and about building with us. If yours is not here, write to us — a person answers.',
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
    eyebrow: 'The BitQueens Conference',
    headlineLines: ['A seat at the', 'future of tech.'],
    body:
      'Meet women building in emerging tech. Learn from their stories, ' +
      'share ideas and make new connections.',
    /* Says which facts are still open, in the shape they will be answered in.
       Replacing "To be announced" with a real date needs no layout change. */
    details: [
      { key: 'Next edition', value: 'Date to be announced. Join the interest list for updates.' },
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
    // Share the profile details with About and Academy so they stay in sync.
    name: about.founder.name,
    role: about.founder.role,
    facts: about.founder.facts,
    storyLines: ['Kristie built the on-ramp', 'she couldn’t find.'],
    // NEEDS CONFIRMATION — placeholder bio, awaiting Kristie's own copy.
    bio:
      'Kristie founded BitQueens after watching capable women be priced and ' +
      'talked out of an industry that badly needs them. She builds the on-ramp ' +
      'she couldn’t find: programmes that assume no prior knowledge, taught in ' +
      'plain language, with a community attached.',
    cta: { label: 'Read the full story', href: '/about' },
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
      cta: { label: 'Partner with BitQueens', href: '/#ecosystem' },
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
