import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionLabel } from '@/components/ui/Section';
import type { MissionSection } from '@/lib/types';
import styles from './Mission.module.css';

export function Mission({ content }: { content: MissionSection }) {
  return (
    <Section id="mission" label="Why we exist" tone="forest" density="loose">
      <SectionLabel index="04" name={content.eyebrow} />

      <div className={styles.head}>
        <Reveal as="h2" delay={100} className={styles.headline}>
          {content.headline}
        </Reveal>
        <Reveal as="p" delay={180} className={styles.body}>
          {content.body}
        </Reveal>
      </div>

      <div className={styles.refrain}>
        <Reveal variant="draw" delay={120} className={styles.rule} />
        {content.refrain.map((line, i) => {
          const isLast = i === content.refrain.length - 1;
          const text = isLast ? line.replace(/\.$/, '') : line;
          return (
            <Reveal
              as="p"
              key={line}
              delay={220 + i * 140}
              className={styles.line}
            >
              {text}
              {isLast && <span className={styles.stop}>.</span>}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
