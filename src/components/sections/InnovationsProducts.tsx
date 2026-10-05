import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsProducts as InnovationsProductsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsProducts.module.css';

/** Product studio: a green Chainelle feature beside BitQueens AI. */
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
        <div className={styles.heading}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
        />
        <Reveal><p className={styles.intro}>{content.intro}</p></Reveal>
        </div>

        <div className={styles.cards}>
          {content.products.map((product, i) => (
            <Reveal
              key={product.name}
              delay={i * 100}
              className={`${styles.card} ${i === 0 ? styles.featured : ''}`}
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
                selection={{kind:'quote',value:product.name}}
                variant={i === 0 ? 'primary' : 'green'}
                onDark={i === 0}
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
