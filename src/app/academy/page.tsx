import type { Metadata } from 'next';
import { AcademyChapters } from '@/components/sections/AcademyChapters';
import { AcademyClosing } from '@/components/sections/AcademyClosing';
import { AcademyCohorts } from '@/components/sections/AcademyCohorts';
import { AcademyCommunity } from '@/components/sections/AcademyCommunity';
import { AcademyEnroll } from '@/components/sections/AcademyEnroll';
import { AcademyFaq } from '@/components/sections/AcademyFaq';
import { AcademyHero } from '@/components/sections/AcademyHero';
import { AcademyPath } from '@/components/sections/AcademyPath';
import { AcademyStories } from '@/components/sections/AcademyStories';
import { AcademyTracks } from '@/components/sections/AcademyTracks';
import { AcademyVsBiet } from '@/components/sections/AcademyVsBiet';
import { academy } from '@/content/academy';

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'Join the BitQueens Academy — cohort programmes, campus chapters, and a free learning community for women, taught in plain language. No experience needed.',
};

/**
 * /academy — "this is where you join" (brief).
 *
 * Order is the argument: the invitation → how it works → what you can learn
 * → the guided cohorts → enroll → chapters → the free tier → Academy vs BIET
 * → stories → answers → the final door.
 */
export default function AcademyPage() {
  return (
    <>
      <AcademyHero content={academy.hero} />
      <AcademyPath content={academy.path} />
      <AcademyTracks content={academy.tracks} />
      <AcademyCohorts content={academy.cohorts} />
      <AcademyEnroll
        content={academy.enroll}
        cohorts={academy.cohorts.cohorts}
      />
      <AcademyChapters content={academy.chapters} />
      <AcademyCommunity content={academy.community} />
      <AcademyVsBiet content={academy.vsBiet} />
      <AcademyStories content={academy.stories} />
      <AcademyFaq content={academy.faq} />
      <AcademyClosing content={academy.closing} />
    </>
  );
}
