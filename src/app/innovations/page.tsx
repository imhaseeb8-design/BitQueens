import type { Metadata } from 'next';
import { AcademyProof } from '@/components/sections/AcademyProof';
import { InnovationsHero } from '@/components/sections/InnovationsHero';
import { InnovationsHow } from '@/components/sections/InnovationsHow';
import { InnovationsProducts } from '@/components/sections/InnovationsProducts';
import { InnovationsQuote } from '@/components/sections/InnovationsQuote';
import { InnovationsSkills } from '@/components/sections/InnovationsSkills';
import { innovations } from '@/content/innovations';
import { academy } from '@/content/academy';

export const metadata: Metadata = {
  title: 'Innovations & Labs',
  description:
    'BitQueens Innovations & Labs — technology products like Chainelle and BitQueens AI, plus professional skills programmes. This is where you build.',
};

/**
 * /innovations — "this is where you build" (brief).
 *
 * Order is the argument: the invitation → the Academy's impact → how engagements work → the
 * products (quote-shape, no prices) → the skills programme catalogue → the
 * quote form.
 */
export default function InnovationsPage() {
  return (
    <>
      <InnovationsHero content={innovations.hero} />
      <AcademyProof content={academy.proof} />
      <InnovationsHow content={innovations.how} />
      <InnovationsProducts content={innovations.products} />
      <InnovationsSkills content={innovations.skills} />
      <InnovationsQuote content={innovations.quote} />
    </>
  );
}
