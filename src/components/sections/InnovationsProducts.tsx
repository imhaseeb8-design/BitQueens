import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsProducts as InnovationsProductsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsProducts.module.css';

/**
 * Products — Chainelle and BitQueens AI.
 *
 * Consulting-shape cards: no prices on the shelf (brief), just what each
 * product is, what an engagement includes, and one "Request a quote" door
 * each. The orange top-rule marks the division.
 */
export function InnovationsProducts({
  content,
}: {
  content: InnovationsProductsContent;
}) {
  return (
    <section
      id="products"
      aria-label="Products"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <div className={styles.cards}>
          {content.products.map((product, i) => (
            <Reveal
              key={product.name}
              delay={i * 100}
              className={styles.card}
            >
              <p className={styles.kicker}>{product.tagline}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.desc}>{product.description}</p>
              <ul className={styles.points}>
                {product.points.map((point) => (
                  <li key={point} className={styles.point}>
                    <span className={styles.tick} aria-hidden="true">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                href={product.cta.href}
                variant="green"
                size="compact"
                arrow={false}
                className={styles.cta}
              >
                {product.cta.label}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
