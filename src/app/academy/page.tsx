import type { Metadata } from 'next';
import { AcademyChapters } from '@/components/sections/AcademyChapters';
import { AcademyClosing } from '@/components/sections/AcademyClosing';
import { AcademyCohorts } from '@/components/sections/AcademyCohorts';
import { AcademyCommunity } from '@/components/sections/AcademyCommunity';
import { AcademyEnroll } from '@/components/sections/AcademyEnroll';
import { AcademyFaq } from '@/components/sections/AcademyFaq';
import { AcademyHero } from '@/components/sections/AcademyHero';
import { AcademyPath } from '@/components/sections/AcademyPath';
import { AcademyProof } from '@/components/sections/AcademyProof';
import { AcademyStories } from '@/components/sections/AcademyStories';
import { AcademyTeachers } from '@/components/sections/AcademyTeachers';
import { AcademyTracks } from '@/components/sections/AcademyTracks';
import { academy } from '@/content/academy';

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'Join the BitQueens Academy — cohort programmes, campus chapters, and a free learning community for women, taught in plain language. No experience needed.',
};

/**
 * /academy — "this is where you join" (brief).
 *
 * Order is the argument: the invitation → what we have actually done → how it
 * works → what you can learn → the free tier → who teaches you → the guided
 * cohorts → enroll → chapters → stories → answers → the final door.
 *
 * The record and the people come before the ask. A beginner is being asked to
 * apply to a cohort whose dates and price are still "to be announced", so the
 * page has to earn that before it reaches the form.
 */
export default function AcademyPage() {
  return (
    <>
      <AcademyHero content={academy.hero} />
      <AcademyProof content={academy.proof} />
      <AcademyPath content={academy.path} />
      <AcademyTracks content={academy.tracks} />
      {/* The free tier comes before the paid ask: the hero's own CTA is
          "Join free", so the page has to honour that before it asks anyone
          to apply for an undated cohort. */}
      <AcademyCommunity content={academy.community} />
      <AcademyTeachers content={academy.teachers} />
      <AcademyCohorts content={academy.cohorts} />
      <AcademyEnroll
        content={academy.enroll}
        cohorts={academy.cohorts.cohorts}
      />
      <AcademyChapters content={academy.chapters} />
      <AcademyStories content={academy.stories} />
      <AcademyFaq content={academy.faq} />
      <AcademyClosing content={academy.closing} />
    </>
  );
}
