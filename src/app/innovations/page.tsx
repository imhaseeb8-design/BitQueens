import type { Metadata } from 'next';
import { InnovationsClosing } from '@/components/sections/InnovationsClosing';
import { InnovationsHero } from '@/components/sections/InnovationsHero';
import { InnovationsHow } from '@/components/sections/InnovationsHow';
import { InnovationsProducts } from '@/components/sections/InnovationsProducts';
import { InnovationsQuote } from '@/components/sections/InnovationsQuote';
import { InnovationsSkills } from '@/components/sections/InnovationsSkills';
import { innovations } from '@/content/innovations';

export const metadata: Metadata = {
  title: 'Innovations & Labs',
  description:
    'BitQueens Innovations & Labs — technology products like Chainelle and BitQueens AI, plus professional skills programmes. This is where you build.',
};

/**
 * /innovations — "this is where you build" (brief).
 *
 * Order is the argument: the invitation → how engagements work → the
 * products (quote-shape, no prices) → the skills programmes (price-card
 * grid) → the quote form → the final door.
 */
export default function InnovationsPage() {
  return (
    <>
      <InnovationsHero content={innovations.hero} />
      <InnovationsHow content={innovations.how} />
      <InnovationsProducts content={innovations.products} />
      <InnovationsSkills content={innovations.skills} />
      <InnovationsQuote content={innovations.quote} />
      <InnovationsClosing content={innovations.closing} />
    </>
  );
}
