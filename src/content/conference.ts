import type { ConferencePage } from '@/lib/types';

/**
 * /events — where BitQueens gathers.
 *
 * Deliberately small: an invitation, the board, one door.
 *
 * The board was empty on purpose for a long time, so that nothing here
 * invented a date, a city or a speaker. It now carries ONE PLACEHOLDER
 * virtual event, added on request — see the block above it. Emptying the
 * array again restores the honest "nothing scheduled" state with no
 * component edits.
 */
export const conference: ConferencePage = {
  hero: {
    eyebrow: 'BitQueens events',
    headline: 'A seat at the',
    headlineSerif: 'future of tech.',
    body: 'Our flagship gathering connects women in emerging tech with the people, ideas and opportunities shaping what comes next. It is where the community meets in one room.',
    primaryCta: { label: 'Join the interest list', href: '#interest' },
    secondaryCta: { label: 'Explore the Academy', href: '/academy' },
  },

  board: {
    eyebrow: 'What is next',
    headline: 'Where we',
    headlineSerif: 'gather next.',
    listLabel: 'Events',
    /* ------------------------------------------------------------------ *
     * PLACEHOLDER — NOT A REAL EVENT. No date, time, speaker or room has
     * been confirmed by BitQueens. This exists so the board can be seen in
     * its populated state. Delete this object — leaving `events: []` — to
     * restore the honest "nothing scheduled" state, which needs no
     * component changes.
     * ------------------------------------------------------------------ */
    events: [
      {
        id: 'placeholder-virtual',
        name: 'Women in Web3: an open session',
        location: 'Virtual',
        date: 'Thursday, 26 March 2026',
        time: '6:00 PM – 7:30 PM WAT · 5:00 PM GMT/UTC',
        format: 'Virtual',
        about:
          'An open online session for women starting out in emerging technology — what the Academy covers, how the cohorts run, and time to ask anything. Free to attend, no technical background needed.',
        tags: ['Web3', 'Beginners', 'Live'],
        speakers: [
          {
            name: 'Kristie Ezigbonwa Immanuel',
            role: 'Founder, BitQueens',
            portrait: {
              src: '/kristie-portrait.jpg',
              alt: 'Kristie Ezigbonwa Immanuel',
              width: 48,
              height: 48,
            },
          },
        ],
        image: {
          src: '/conference-audience.png',
          alt: 'Women listening to a speaker at a technology conference',
          width: 1672,
          height: 941,
        },
        cta: { label: 'Save your place', href: '#interest' },
      },
    ],
    emptyTitle: 'No edition is scheduled right now.',
    emptyBody:
      'The next gathering has not been announced yet. Join the community and you will hear the date before it goes anywhere else — and in the meantime the weekly live trainings run every Friday and Sunday.',
    emptyCta: { label: 'Join the interest list', href: '#interest' },
  },

  closing: {
    headline: 'Be in the room',
    headlineSerif: 'when it happens.',
    body: 'Whether you want to attend, speak, volunteer or partner, tell us how you would like to be involved.',
    cta: { label: 'Share your interest', href: '#interest' },
  },
  faq: {
    headline: 'Questions about',
    headlineSerif: 'our events.',
    intro: 'A few things to know before you join us.',
    items: [
      {
        question: 'Has the next edition been announced?',
        answer: 'Not yet. The interest form lets you tell us how you would like to take part; we will share confirmed event details when they are available.',
      },
      {
        question: 'Does joining the interest list reserve a place?',
        answer: 'No. It is an expression of interest, not a ticket or reservation. Registration details will be shared when an event is confirmed.',
      },
      {
        question: 'Do I need a technical background to attend?',
        answer: 'No. BitQueens welcomes women who are curious about emerging technology, including complete beginners.',
      },
      {
        question: 'Can I speak, volunteer, sponsor or partner?',
        answer: 'Yes. Choose the relevant option in the interest form and tell us what you have in mind when the email draft opens.',
      },
    ],
  },
};
