import { AudienceOnly } from '@/components/audience/AudienceProvider';
import { Blog } from '@/components/sections/Blog';
import { CampusChapters } from '@/components/sections/CampusChapters';
import { Conference } from '@/components/sections/Conference';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Faq } from '@/components/sections/Faq';
import { Founder } from '@/components/sections/Founder';
import { Hero } from '@/components/sections/Hero';
import { Path } from '@/components/sections/Path';
import { Place } from '@/components/sections/Place';
import { home } from '@/content/home';
import { homeLayout } from '@/content/layout';

/**
 * The homepage.
 *
 * Order is the argument: who we are and the numbers behind it → the flagship
 * moment → what the ecosystem is → that you can start → who can build with
 * us → who is behind it → what we publish → the questions both audiences
 * ask → your place, and the two doors.
 *
 * Campus chapters sit on the partner side only. Starting a chapter is a
 * partner-shaped ask — you bring a campus, we bring the playbook — and on
 * /academy, where it used to live, its form interrupted a learner on the way
 * to the cohort application.
 *
 * Impact figures sit in the hero's trust bar. Partner logos close the hero;
 * the conference follows directly.
 *
 * The sections used to carry numbered "NN / NAME" eyebrows and the order was
 * described by those numbers. They are gone, so nothing renumbers when a
 * section moves or is dropped — say what a section does, not where it sits.
 *
 * Ecosystem still has layout variants under review. Switch in
 * `src/content/layout.ts` — no component edits required.
 */
export default function HomePage() {
  return (
    <>
      <Hero content={home.hero} stats={home.impact.stats} />
      {/* Proof is hidden: the hero's impact figures carry the same job. The
          component and its content are kept — restore this line to bring the
          entity register back.
          <Proof content={home.proof} variant={homeLayout.proof} /> */}
      <Conference content={home.conference} />
      <Ecosystem content={home.ecosystem} variant={homeLayout.ecosystem} />
      <Path content={home.path} />
      {/* Partners is hidden: on the partner side the ecosystem accordion
          already names Companies, Universities, Networks and Funders, so
          this section said the same four a second time. The component and
          its content are kept — restore these lines to bring it back.
          <AudienceOnly audience="partner">
            <Partners content={home.partners} />
          </AudienceOnly> */}
      <Founder content={home.founder} />
      <AudienceOnly audience="partner">
        <CampusChapters content={home.chapters} />
      </AudienceOnly>
      <Blog content={home.blog} />
      {/* Join is hidden: the two doors it held are the Place cards, and the
          footer (297:783) follows them directly. The component and its
          content are kept - restore this line to bring the newsletter back.
          <Join content={home.join} /> */}
      {/* Before the closing: the last doubts, answered, while there is still
          a door underneath them. */}
      <Faq content={home.faq} name="home-faq" />
      <Place content={home.place} />
    </>
  );
}
