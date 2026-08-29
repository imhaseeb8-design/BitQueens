import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { EntityStatus, LegalEntity, ProofSection } from '@/lib/types';
import styles from './Proof.module.css';

export type ProofVariant = 'band' | 'asymmetric';

const statusClass: Record<EntityStatus, string> = {
  registered: styles.registered,
  'name-approved': styles.nameApproved,
  'in-progress': styles.inProgress,
  planned: styles.planned,
};

function Register({ entities }: { entities: LegalEntity[] }) {
  return (
    <div className={styles.register}>
      <div className={styles.registerHead}>
        <span>The group</span>
        <span>Status</span>
      </div>
      {entities.map((entity, i) => (
        <Reveal key={entity.name} delay={i * 60} className={styles.row}>
          <p className={styles.entity}>
            {entity.name}
            {entity.rc && <span className={styles.rc}>{entity.rc}</span>}
          </p>
          <p className={`${styles.status} ${statusClass[entity.status]}`}>
            <span className={styles.dot} aria-hidden="true" />
            {entity.statusLabel}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function Stats({ content }: { content: ProofSection }) {
  if (content.stats.length === 0) return null;

  return (
    <div className={styles.stats}>
      {content.stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 70} className={styles.stat}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </Reveal>
      ))}
    </div>
  );
}

export function Proof({
  content,
  variant = 'band',
}: {
  content: ProofSection;
  variant?: ProofVariant;
}) {
  return (
    <Section id="proof" label="Proof" rule density="tight">
      <SectionLabel index="02" name={content.eyebrow} />

      {variant === 'band' ? (
        <>
          <Stats content={content} />
          <Reveal as="p" delay={120} className={styles.statement}>
            {content.statement}
          </Reveal>
          <Register entities={content.entities} />
        </>
      ) : (
        <div className={styles.split}>
          <div>
            <Reveal as="p" className={styles.claim}>
              {content.statement}
            </Reveal>
            <Reveal variant="draw" delay={220} className={styles.claimRule} />
          </div>
          <div>
            <Stats content={content} />
            <Register entities={content.entities} />
          </div>
        </div>
      )}
    </Section>
  );
}
