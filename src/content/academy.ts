import type { AcademyPage } from '@/lib/types';
import { about } from './about';
import { home } from './home';

/**
 * Academy page copy.
 *
 * Voice: the brief's tone of voice — friendly, clear, simple; confident and
 * professional; never corporate, never buzzword-heavy. Everything is written
 * for a complete beginner.
 *
 * TODO (BitQueens team): track and cohort names below are provisional.
 * Confirm the real programme list, dates, and formats before launch.
 */
export const academy: AcademyPage = {
  hero: {
    eyebrow: 'BitQueens Academy',
    headline: 'Learn emerging tech.',
    headlineSerif: 'No experience needed.',
    body: 'The Academy is where you join BitQueens. Cohort programmes, campus chapters, and a free learning community — taught in plain language and built for absolute beginners.',
    primaryCta: { label: 'Join free', href: '/join' },
    secondaryCta: { label: 'Explore programmes', href: '#cohorts' },
  },

  /* The same four reported figures the homepage carries — imported, not
     retyped, so a corrected number is corrected everywhere at once. */
  proof: {
    headline: 'What the Academy has done so far.',
    stats: home.impact.stats,
  },

  /* Every claim here is from the About page's founder block, which is the
     one place her credentials are written down. Nothing is added.
     TODO (BitQueens team): cohort mentors are not named yet. When the roster
     is confirmed, they belong in this section beside Kristie. */
  teachers: {
    headline: 'Taught by women',
    headlineSerif: 'doing the work.',
    intro:
      'The Academy is led by a working blockchain educator, not a course library. Every cohort is taught live, by someone who has stood where you are standing.',
    lead: {
      name: about.founder.name,
      role: about.founder.role,
      bio: about.founder.bio[1],
      facts: about.founder.facts,
      portrait: about.founder.portrait,
      /* Not her LinkedIn: the page should keep a reader on the site, and the
         About page is where her full story already lives. */
      cta: { label: 'Read the full story', href: '/about' },
    },
  },

  path: {
    headline: 'Start where you are.',
    headlineSerif: 'Grow from there.',
    intro:
      'You do not need a technical background, a degree, or any prior experience. The path is built for exactly where you are today.',
    cta: { label: 'Start with step one', href: '/join' },
    steps: [
      {
        title: 'Pick a track',
        mark: 'track',
        description:
          'Choose what you want to learn first — from the absolute basics to job-ready skills.',
      },
      {
        title: 'Join free',
        mark: 'globe',
        description:
          'Enter the community and meet women learning the same things, at the same pace.',
      },
      {
        title: 'Learn in a cohort',
        mark: 'dots',
        description:
          'Study in small, guided groups with mentors who explain everything in plain language.',
      },
      {
        title: 'Build and earn',
        mark: 'network',
        description:
          'Turn what you learn into real projects, freelance work, or a new career.',
      },
    ],
  },

  tracks: {
    eyebrow: 'Learning tracks',
    headline: 'Choose your',
    headlineSerif: 'starting point.',
    intro:
      'Four tracks, one rule: everything is taught in plain language. Start at the very beginning, or jump to the skills that match your goals.',
    cta: { label: 'Browse all programmes', href: '#cohorts' },
    tracks: [
      {
        name: 'Web3 Foundations',
        description:
          'What blockchain actually is, minus the jargon. Wallets, networks, and how the pieces fit together.',
        level: 'Beginner',
        length: '4 weeks',
        access: 'Free',
      },
      {
        name: 'Digital Skills',
        description:
          'The everyday tools of the digital economy — working online, staying safe, and getting paid.',
        level: 'Beginner',
        length: 'Self-paced',
        access: 'Free',
      },
      {
        name: 'AI for Work',
        description:
          'Use AI tools to write, design, analyse, and ship real work — practically, not theoretically.',
        level: 'Beginner',
        length: '6 weeks',
        access: 'Paid',
      },
      {
        name: 'Build & Earn',
        description:
          'From learning to income: portfolios, freelancing, and finding your first clients.',
        level: 'Intermediate',
        length: '6 weeks',
        access: 'Paid',
      },
    ],
  },

  cohorts: {
    eyebrow: 'Cohort programmes',
    headline: 'Learn together,',
    headlineSerif: 'in small groups.',
    intro:
      'Cohorts are guided, time-bound programmes with mentors and peers. Seats are limited so everyone gets real attention.',
    cohorts: [
      {
        name: 'Web3 Foundations — Cohort 4',
        track: 'Web3 Foundations',
        dates: 'To be announced',
        format: 'Online',
        level: 'Beginner',
        access: 'Free',
        cta: { label: 'Enroll', href: '#enroll' },
      },
      {
        name: 'AI for Work — Cohort 2',
        track: 'AI for Work',
        dates: 'To be announced',
        format: 'Online',
        level: 'Beginner',
        access: 'Paid',
        cta: { label: 'Enroll', href: '#enroll' },
      },
      {
        name: 'Build & Earn — Cohort 1',
        track: 'Build & Earn',
        dates: 'To be announced',
        format: 'Hybrid',
        level: 'Intermediate',
        access: 'Paid',
        cta: { label: 'Enroll', href: '#enroll' },
      },
    ],
  },

  enroll: {
    eyebrow: 'Enroll',
    headline: 'Save your seat.',
    headlineSerif: '',
    body: 'Tell us your desired cohort and a bit about yourself. Applications are confirmed personally. Paid cohorts need application only; no payment here.',
    submitLabel: 'Submit application',
    successTitle: 'Application received.',
    successBody:
      'Thank you — your application is with the Academy team. We will be in touch by email with next steps.',
  },

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

  community: {
    eyebrow: 'Free forever',
    headline: 'The community is free.',
    headlineSerif: 'Yours from day one.',
    body: 'Membership costs nothing. Join and you are in — learning, meeting people, and growing from your very first day.',
    includes: [
      'Weekly learning sessions in plain language',
      'A peer community of women across Africa and beyond',
      'A library of beginner-friendly resources',
      'First access to cohorts, chapters, and events',
    ],
    cta: { label: 'Join free', href: '/join' },
    secondaryCta: { label: 'Join our WhatsApp community', href: 'https://bit.ly/BitQueens' },
    sessions: [
      {
        day: 'Fridays',
        time: '8:00 PM WAT · 7:00 PM GMT · 3:00 PM EST',
        href: 'https://us02web.zoom.us/j/81229055699',
      },
      {
        day: 'Sundays',
        time: '8:00 PM WAT · 7:00 PM GMT · 3:00 PM EST',
        href: 'https://us02web.zoom.us/j/81595873470',
      },
    ],
  },

  vsBiet: {
    headline: 'Academy or BIET — which one is for you?',
    academy: {
      title: 'The Academy',
      body: 'Community learning. Free, welcoming, at your own pace. This is where you start.',
    },
    biet: {
      title: 'BIET',
      body: 'Our Institute of Emerging Technologies. Accredited certificates, diplomas, and fellowships for when you are ready to go formal.',
      cta: { label: 'Explore BIET', href: '/biet' },
    },
  },

  stories: {
    eyebrow: 'Stories',
    headline: 'Women who',
    headlineSerif: 'started here.',
    stories: [],
  },

  /* Sat right before the form, this section's job is the last doubt, and the
     doubts below are all one doubt: "am I too far behind for this?" The head
     answers that rather than labelling the list. */
  faq: {
    headline: 'No question',
    headlineSerif: 'is too basic.',
    intro:
      'The questions women ask us most before they join — answered plainly, with nothing assumed.',
    items: [
      {
        question: 'Do I need any technical experience?',
        answer:
          'No. The Academy is built for absolute beginners. Every track starts from zero and everything is explained in plain language — no jargon, no assumed knowledge.',
      },
      {
        question: 'Is it really free?',
        answer:
          'Joining the community and community learning are free, always. Some cohort programmes are paid; those are clearly marked, and pricing is confirmed with you personally before anything is charged.',
      },
      {
        question: 'Is it online or in person?',
        answer:
          'Both. Most cohorts run online so anyone can join from anywhere. Campus chapters and select programmes meet in person.',
      },
      {
        question: 'How much time does it take?',
        answer:
          'Tracks are designed around real life. Expect a few hours a week for cohort programmes; community learning is entirely at your own pace.',
      },
      {
        question: 'Will I get a certificate?',
        answer:
          'Academy programmes come with recognition of completion. If you want an accredited certificate or diploma, that lives at BIET — our Institute of Emerging Technologies.',
      },
      {
        question: 'I am not in Africa. Can I still join?',
        answer:
          'Yes. The community is women-first and borderless — members learn together from across Africa and beyond.',
      },
    ],
  },
};
