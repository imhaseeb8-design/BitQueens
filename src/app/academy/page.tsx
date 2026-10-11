import type { Metadata } from 'next';
import { AcademyCommunity } from '@/components/sections/AcademyCommunity';
import { AcademyEnroll } from '@/components/sections/AcademyEnroll';
import { Faq } from '@/components/sections/Faq';
import { AcademyHero } from '@/components/sections/AcademyHero';
import { AcademyPath } from '@/components/sections/AcademyPath';
import { LearnerValue } from '@/components/sections/LearnerValue';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { AcademyStories } from '@/components/sections/AcademyStories';
import { AcademyTeachers } from '@/components/sections/AcademyTeachers';
import { AcademyTracks } from '@/components/sections/AcademyTracks';
import { academy } from '@/content/academy';
import { home } from '@/content/home';

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'Join the BitQueens Academy — cohort programmes, campus chapters, and a free learning community for women, taught in plain language. No experience needed.',
};

/**
 * /academy — "this is where you join" (brief).
 *
 * Order is the argument: the invitation → what we have actually done → how it
 * works → what you can learn and when you can take it → the free tier → who
 * teaches you → stories → answers → the one ask.
 *
 * The record and the people come before the ask. A beginner is being asked to
 * apply to a cohort whose dates and price are still "to be announced", so the
 * page has to earn that before it reaches the form.
 *
 * Things the earlier versions got wrong. Two forms sat back to back as
 * near-identical panels. The FAQ came after the ask, so objections were
 * answered only once someone had already decided. A closing band followed the
 * form, so the page asked twice and ended on a link pointing back up. And the
 * tracks and the cohorts were two lists of the same programmes — a track is a
 * subject, a cohort is a date, and the tracks section now carries both.
 *
 * Campus chapters have moved to the homepage's partner side. Recruiting
 * someone to run a chapter is a different ask, to a different reader, and it
 * was interrupting a learner's run to the form.
 */
export default function AcademyPage() {
  return (
    <>
      <AcademyHero content={academy.hero} />
      {/* The homepage's figures panel, not the green `AcademyProof` band —
          same four numbers, the layout the homepage settled on. The heading
          is hidden: the hero directly above already names the page. Its CTA
          goes to the join form rather than the Academy, which is this page. */}
      <LearnerValue
        content={home.learnerValue}
        stats={academy.proof.stats}
        hideHeading
        cta={{ label: 'Join free', href: '/join' }}
      />
      {/* The collaborator logos the green band used to close with. Reads
          from the homepage's own list, so the two cannot drift. */}
      <LogoMarquee content={home.hero.collaborators} />
      <AcademyPath content={academy.path} />
      <AcademyTracks content={academy.tracks} cohorts={academy.cohorts} />
      {/* The free tier comes before the paid ask: the hero's own CTA is
          "Join free", so the page has to honour that before it asks anyone
          to apply for an undated cohort. */}
      <AcademyCommunity content={academy.community} />
      <AcademyTeachers content={academy.teachers} />
      <AcademyStories content={academy.stories} />
      {/* Before the ask, not after it: this is objection handling. */}
      <Faq content={academy.faq} name="academy-faq" />
      <AcademyEnroll content={academy.enroll} cohorts={academy.cohorts} />
    </>
  );
}
