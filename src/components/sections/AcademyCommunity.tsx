import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyCommunity as AcademyCommunityContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyCommunity.module.css';

/**
 * The free community — the primary conversion band.
 *
 * The one full blue band on the page: the Academy's division colour, used as
 * a flat solid per the palette rules. Checklist of what free membership
 * includes, one Join CTA. Dark bands take their own counter-accent, so the
 * checklist marks and the button go cream-on-blue.
 */
export function AcademyCommunity({
  content,
}: {
  content: AcademyCommunityContent;
}) {
  return (
    <section
      id="community"
      aria-label="The free community"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionHead
            eyebrow={content.eyebrow}
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.body}
            onDark
          />
          <Reveal delay={200}>
            <Button
              href={content.cta.href}
              variant="primary"
              onDark
              arrow={false}
            >
              {content.cta.label}
            </Button>
          </Reveal>
        </div>

        <ul className={styles.list}>
          {content.includes.map((item, i) => (
            <Reveal
              key={item}
              as="li"
              delay={i * 80}
              className={styles.item}
            >
              <span className={styles.tick} aria-hidden="true">
                ✓
              </span>
              <span className={styles.text}>{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
