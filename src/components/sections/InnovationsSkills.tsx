import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import type { InnovationsSkills as InnovationsSkillsContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './InnovationsSkills.module.css';

/** A programme catalogue with level, duration and enquiry details. */
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

        <div className={styles.catalogue}>
          <table className={styles.table}>
            <caption className="bq-visually-hidden">Professional skills programmes</caption>
            <thead>
              <tr>
                <th scope="col">Programme</th>
                <th scope="col">Level &amp; duration</th>
                <th scope="col">Enquiry</th>
              </tr>
            </thead>
            <tbody>
              {content.skills.map((skill) => (
                <tr key={skill.name}>
                  <th scope="row" className={styles.programme}>
                    <h3 className={styles.name}>{skill.name}</h3>
                    <p className={styles.desc}>{skill.description}</p>
                  </th>
                  <td className={styles.meta}>{skill.level} · {skill.length}</td>
                  <td className={styles.enquiry}>
                    <p className={styles.price}>{skill.priceNote}</p>
                    <Button href={skill.cta.href} selection={{kind:'quote',value:'Skills programmes',message:`I’m interested in ${skill.name}.`}} variant="green" size="compact" className={styles.cta}>
                      {skill.cta.label}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
