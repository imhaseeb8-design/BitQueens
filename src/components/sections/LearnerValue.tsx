import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { Reveal } from '@/components/ui/Reveal';
import type { ImpactStat, LearnerValueSection } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './LearnerValue.module.css';

export function LearnerValue({
  content,
  stats,
  hideHeading = false,
  cta,
}: {
  content: LearnerValueSection;
  stats: ImpactStat[];
  /**
   * Keep the heading for the landmark's accessible name but take it off the
   * page — for a reuse that already has a heading above it.
   */
  hideHeading?: boolean;
  /** Overrides `content.impactCta`, so a page can avoid linking to itself. */
  cta?: { label: string; href: string };
}) {
  /* The headline figure is shown twice on purpose: once at feature scale on
     the left, carrying the globe and the way out of the section, and again in
     the grid so the four numbers read as one set rather than three leftovers. */
  const [feature] = stats;
  const action = cta ?? content.impactCta;

  return (
    <section
      aria-labelledby="impact-title"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={hideHeading ? 'bq-visually-hidden' : styles.impactHeading}>
          <h2 id="impact-title">{content.impactHeading}</h2>
        </div>

        <div className={styles.impactGrid}>
          {feature && (
            <Reveal className={styles.featureCard}>
              <div className={styles.featureMetric}>
                <strong>{feature.value}</strong>
                <span>{feature.label}</span>
              </div>
              <p>{feature.support}</p>
              <Button
                href={action.href}
                variant="green"
                size="compact"
                className={styles.featureCta}
              >
                {action.label}
              </Button>
              {/* Decorative, and the card clips it. */}
              <DottedGlobe className={styles.featureGlobe} period={200} />
            </Reveal>
          )}

          <ul className={styles.statGrid}>
            {stats.map((stat, index) => (
              <Reveal as="li" key={stat.label} className={styles.impactCard} delay={80 + index * 70}>
                <div className={styles.impactMetric}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
                <p>{stat.support}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
