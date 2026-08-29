import { Blog } from '@/components/sections/Blog';
import { Conference } from '@/components/sections/Conference';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Founder } from '@/components/sections/Founder';
import { Hero } from '@/components/sections/Hero';
import { Join } from '@/components/sections/Join';
import { Mission } from '@/components/sections/Mission';
import { Partners } from '@/components/sections/Partners';
import { Path } from '@/components/sections/Path';
import { home } from '@/content/home';
import { homeLayout } from '@/content/layout';

/**
 * The homepage.
 *
 * Order is the argument: who we are and that we are real (01, the hero
 * carries its own proof) → what the
 * ecosystem is (03) → why it exists (04) → that you can start (05) → the
 * flagship moment (06) → who is behind it (07) → who backs it (08) → what we
 * publish (09) → the two ways in (10).
 *
 * Sections 02 and 03 are still being compared. Switch variants in
 * `src/content/layout.ts` — no component edits required.
 */
export default function HomePage() {
  return (
    <>
      <Hero content={home.hero} />
      {/* 02 Proof is hidden: the hero's second state now carries the proof
          figures, so a separate section repeats the same job. The component
          and its content are kept — restore this line to bring it back.
          <Proof content={home.proof} variant={homeLayout.proof} /> */}
      <Ecosystem content={home.ecosystem} variant={homeLayout.ecosystem} />
      <Mission content={home.mission} />
      <Path content={home.path} />
      <Conference content={home.conference} />
      <Founder content={home.founder} />
      <Partners content={home.partners} />
      <Blog content={home.blog} />
      <Join content={home.join} />
    </>
  );
}
