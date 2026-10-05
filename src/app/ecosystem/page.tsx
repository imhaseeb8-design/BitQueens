import type { Metadata } from 'next';
import { EcosystemOverview } from '@/components/sections/EcosystemOverview';
import { Partners } from '@/components/sections/Partners';
import { ecosystem } from '@/content/ecosystem';

export const metadata: Metadata = {
  title: 'Ecosystem',
  description: 'Explore the four branches of BitQueens: Academy, Innovations & Labs, the upcoming Institute of Emerging Technologies and Foundation — and find your way to learn, build or partner.',
};

export default function EcosystemPage() {
  return (
    <>
      <EcosystemOverview />
      <Partners content={ecosystem.partners} layout="matrix" />
    </>
  );
}
