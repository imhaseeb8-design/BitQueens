import { Blog } from '@/components/sections/Blog';
import { Conference } from '@/components/sections/Conference';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Founder } from '@/components/sections/Founder';
import { Hero } from '@/components/sections/Hero';
import { Join } from '@/components/sections/Join';
import { Partners } from '@/components/sections/Partners';
import { Path } from '@/components/sections/Path';
import { home } from '@/content/home';
import { homeLayout } from '@/content/layout';

/**
 * The homepage.
 *
 * Order is the argument: who we are and the numbers behind it → the flagship
 * moment → what the ecosystem is → that you can start → who is behind it →
 * who backs it → what we publish → the two ways in.
 *
 * Conference sits directly under the hero because Figma 130:9 places it
 * there, immediately after the hero's closing rule.
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
      <Hero content={home.hero} />
      {/* Impact is hidden. The 130:9 hero carried these figures; the 260:232
          hero does not, so the band could come back. The component and its
          content are kept - restore this line to bring it back.
          <Impact content={home.impact} /> */}
      {/* Proof is hidden: the Impact figures above carry the same job. The
          component and its content are kept — restore this line to bring the
          entity register back.
          <Proof content={home.proof} variant={homeLayout.proof} /> */}
      <Conference content={home.conference} />
      <Ecosystem content={home.ecosystem} variant={homeLayout.ecosystem} />
      <Path content={home.path} />
      <Founder content={home.founder} />
      <Partners content={home.partners} />
      <Blog content={home.blog} />
      <Join content={home.join} />
    </>
  );
}
