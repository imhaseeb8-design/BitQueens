import { QuoteForm } from '@/components/sections/QuoteForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsQuote as InnovationsQuoteContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsQuote.module.css';

/**
 * #quote — the proposal request form.
 *
 * Copy left, form right on a paper panel: the same commitment-band language
 * the Academy's forms use, so every form on the site feels like the same
 * site.
 */
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
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionHead
            eyebrow={content.eyebrow}
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.body}
          />
        </div>
        <Reveal delay={120} className={styles.panel}>
          <QuoteForm content={content} />
        </Reveal>
      </div>
    </section>
  );
}
