import type { ConferencePage } from '@/lib/types';

/**
 * /conference — the flagship gathering.
 *
 * Deliberately small: an invitation, the board of editions, one door.
 *
 * TODO (BitQueens team): `events` is empty on purpose. Nothing here invents
 * a date, a city or a speaker — while the array is empty the board renders
 * its "nothing scheduled" state, which is the truth today. Adding the first
 * real edition to the array is the only change needed to light the board up;
 * no component edits.
 */
export const conference: ConferencePage = {
  hero: {
    eyebrow: 'The BitQueens Conference',
    headline: 'A seat at the',
    headlineSerif: 'future of tech.',
    body: 'Our flagship gathering connects women in emerging tech with the people, ideas and opportunities shaping what comes next. It is where the community meets in one room.',
    primaryCta: { label: 'Join the interest list', href: '#interest' },
    secondaryCta: { label: 'Explore the Academy', href: '/academy' },
  },

  board: {
    eyebrow: 'Editions',
    headline: 'Where we',
    headlineSerif: 'gather next.',
    listLabel: 'Editions',
    events: [],
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
};
