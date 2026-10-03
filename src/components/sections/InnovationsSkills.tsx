import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsSkills as InnovationsSkillsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsSkills.module.css';

/**
 * Skills programmes — the e-commerce-style product grid (brief).
 *
 * Each card is a price card: name, what it covers, level and length, the
 * price line, one Enquire CTA. Pricing is confirmed personally per cohort
 * until it is finalised, so the price line says exactly that — never a
 * placeholder figure.
 */
export function InnovationsSkills({
  content,
}: {
  content: InnovationsSkillsContent;
}) {
  return (
    <section
      id="skills"
      aria-label="Skills programmes"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
          intro={content.intro}
        />

        <ul className={styles.grid}>
          {content.skills.map((skill, i) => (
            <Reveal
              key={skill.name}
              as="li"
              delay={i * 90}
              className={styles.card}
            >
              <div className={styles.top}>
                <h3 className={styles.name}>{skill.name}</h3>
                <p className={styles.desc}>{skill.description}</p>
              </div>
              <div className={styles.bottom}>
                <p className={styles.meta}>
                  {skill.level} · {skill.length}
                </p>
                <p className={styles.price}>{skill.priceNote}</p>
                <Button
                  href={skill.cta.href}
                  variant="green"
                  size="compact"
                  arrow={false}
                  className={styles.cta}
                >
                  {skill.cta.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
