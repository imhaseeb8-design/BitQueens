import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyTeachers as AcademyTeachersContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './AcademyTeachers.module.css';

/**
 * Who you learn from.
 *
 * The page sells live cohorts "with mentors who explain everything in plain
 * language" and, until now, never said who any of them were. This puts a real
 * person on it: portrait, name, role, and four facts a reader can check —
 * all of it lifted from the About page rather than written again here. The
 * way on goes to About, not to her LinkedIn: a trust section should not send
 * a reader off the site at the moment it has earned their attention.
 *
 * The header is centred and the wax seal hangs off the card, so the section
 * answers the homepage's Founder band rather than reading as a new pattern.
 */
export function AcademyTeachers({ content }: { content: AcademyTeachersContent }) {
  const { lead } = content;

  return (
    <section
      id="teachers"
      aria-label="Who you learn from"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <DottedGlobe className={styles.globe} />
      <span className={styles.globeOverlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHead
            align="center"
            headline={content.headline}
            headlineSerif={content.headlineSerif}
            intro={content.intro}
          />
        </div>

        <Reveal delay={140} className={styles.card}>
          <div className={styles.portrait}>
            <Image
              src={lead.portrait.src ?? ''}
              alt={lead.portrait.alt}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              className={styles.portraitImg}
            />
          </div>

          <div className={styles.body}>
            <h3 className={styles.name}>{lead.name}</h3>
            <p className={styles.role}>{lead.role}</p>
            <p className={styles.bio}>{lead.bio}</p>

            <dl className={styles.facts}>
              {lead.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt className={styles.factLabel}>{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Button
              href={lead.cta.href}
              variant="green"
              size="compact"
              className={styles.cta}
            >
              {lead.cta.label}
            </Button>
          </div>

          {/* The same wax seal the homepage Founder card wears, hung off this
              card's top-right corner. */}
          <Image
            src="/founder-seal.png"
            alt=""
            width={270}
            height={261}
            className={styles.seal}
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
