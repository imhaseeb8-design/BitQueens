import type { Metadata } from 'next';
import { ConferenceBoard } from '@/components/sections/ConferenceBoard';
import { ConferenceInterest } from '@/components/sections/ConferenceInterest';
import { ConferenceHero } from '@/components/sections/ConferenceHero';
import { Faq } from '@/components/sections/Faq';
import { conference } from '@/content/conference';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'BitQueens events — the flagship conference and the gatherings in between, for women in emerging tech. See what is next and join the interest list.',
};

/**
 * /events — where BitQueens gathers.
 *
 * Was /conference, which named one event rather than the page's job; the old
 * address redirects here permanently (see next.config.ts) because the nav,
 * the footer and the homepage card all pointed at it.
 *
 * Deliberately short: the invitation, the board, one door. The board renders
 * its "nothing scheduled" state whenever the events array is empty — see
 * src/content/conference.ts.
 */
export default function EventsPage() {
  return (
    <>
      <ConferenceHero content={conference.hero} />
      <ConferenceBoard content={conference.board} />
      <ConferenceInterest />
      <Faq content={conference.faq} name="events-faq" />
    </>
  );
}
