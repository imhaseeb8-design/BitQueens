import type { Metadata } from 'next';
import { AcademyChapters } from '@/components/sections/AcademyChapters';
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
 * cohorts → the side door → stories → answers → the one ask.
 *
 * The record and the people come before the ask. A beginner is being asked to
 * apply to a cohort whose dates and price are still "to be announced", so the
 * page has to earn that before it reaches the form.
 *
 * Three things the earlier order got wrong. The enroll form and the chapter
 * form sat back to back, two near-identical panels in a row. The FAQ came
 * after the ask, so objections were answered only once someone had already
 * decided. And a closing band followed the form, which meant the page asked
 * twice and then ended on a link pointing back up at the cohorts. The form is
 * the last thing now, and the only ending.
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
      {/* A different reader — someone who wants to run a chapter, not join a
          cohort — so it sits clear of the learner's run to the form. */}
      <AcademyChapters content={academy.chapters} />
      <AcademyStories content={academy.stories} />
      {/* Before the ask, not after it: this is objection handling. */}
      <AcademyFaq content={academy.faq} />
      <AcademyEnroll
        content={academy.enroll}
        cohorts={academy.cohorts.cohorts}
      />
    </>
  );
}
