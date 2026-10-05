import { QuoteForm } from '@/components/sections/QuoteForm';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsQuote as InnovationsQuoteContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyEnroll.module.css';

/** Academy form layout with the Labs enquiry fields and copy. */
export function InnovationsQuote({
  content,
}: {
  content: InnovationsQuoteContent;
}) {
  return (
    <section
      id="quote"
      aria-label="Request a quote"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <GlobalDotMap className={styles.ground} />
      <div className={styles.inner}>
          <SectionHead
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.body}
            align="center"
          />
        <Reveal delay={120} className={styles.panel}>
          <QuoteForm content={content} />
        </Reveal>
      </div>
    </section>
  );
}
