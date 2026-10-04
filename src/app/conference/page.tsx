import type { Metadata } from 'next';
import { ConferenceBoard } from '@/components/sections/ConferenceBoard';
import { ConferenceClosing } from '@/components/sections/ConferenceClosing';
import { ConferenceHero } from '@/components/sections/ConferenceHero';
import { conference } from '@/content/conference';

export const metadata: Metadata = {
  title: 'Conference',
  description:
    'The BitQueens Conference — our flagship gathering for women in emerging tech. See the next edition and join the interest list.',
};

/**
 * /conference — the flagship gathering.
 *
 * Deliberately short: the invitation, the board of editions, one door. The
 * nav and the homepage card have both pointed here since launch, so until now
 * this was a 404.
 *
 * The board renders its "nothing scheduled" state while no edition is
 * confirmed, which is the truth today — see src/content/conference.ts.
 */
export default function ConferencePage() {
  return (
    <>
      <ConferenceHero content={conference.hero} />
      <ConferenceBoard content={conference.board} />
      <ConferenceClosing content={conference.closing} />
    </>
  );
}
