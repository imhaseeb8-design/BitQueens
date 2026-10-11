import { pageMetadata } from '@/lib/seo';
import { EcosystemOverview } from '@/components/sections/EcosystemOverview';
import { Faq } from '@/components/sections/Faq';
import { Partners } from '@/components/sections/Partners';
import { ecosystem } from '@/content/ecosystem';
import { home } from '@/content/home';

export const metadata = pageMetadata('/ecosystem', 'Ecosystem', 'Explore the four branches of BitQueens: Academy, Innovations & Labs, the upcoming Institute of Emerging Technologies and Foundation — and find your way to learn, build or partner.');

export default function EcosystemPage() {
  return (
    <>
      <EcosystemOverview />
      <Partners content={ecosystem.partners} layout="matrix" />
      {/* The homepage's FAQ, not a second list: it already answers the two
          questions this page raises — how an organisation can work with
          BitQueens, and whether a university can host a chapter — and one
          canonical set cannot drift out of step with itself. `name` keeps
          the accordion's ids unique per page. */}
      <Faq content={home.faq} name="ecosystem-faq" />
    </>
  );
}
