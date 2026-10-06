import { AcademyProof } from '@/components/sections/AcademyProof';
import { Button } from '@/components/ui/Button';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { DotFieldMark, DotGlobeMark, NetworkMark, TrackMark } from '@/components/ui/PathMarks';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { ecosystem } from '@/content/ecosystem';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './EcosystemOverview.module.css';

const marks = [DotGlobeMark, NetworkMark, TrackMark, DotFieldMark];
type Branch = (typeof ecosystem.branches)[number];

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  const Mark = marks[index];
  const comingSoon = Boolean(branch.comingSoon);

  return (
    <Reveal
      as="article"
      id={branch.id}
      className={`${styles.branch} ${comingSoon ? styles.upcoming : ''}`}
    >
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.visualNumber}>{String(index + 1).padStart(2, '0')}</span>
        <Mark className={styles.mark} />
        <p className={styles.visualCaption}>{branch.headline}</p>
      </div>
      <div className={styles.branchBody}>
        <div className={styles.branchMeta}>
          <p className={styles.eyebrow}>{String(index + 1).padStart(2, '0')} / {branch.tag}</p>
          <span className={`${styles.status} ${comingSoon ? styles.statusSoon : ''}`}>
            {comingSoon ? 'Coming soon' : 'Explore today'}
          </span>
        </div>
        <h3 className={styles.branchTitle}>{branch.name}</h3>
        {branch.name === 'BIET' && <p className={styles.fullName}>BitQueens Institute of Emerging Technologies</p>}
        <p className={styles.audience}>{branch.audience}</p>
        <p className={styles.description}>{branch.description}</p>
        <p className={styles.note}>{branch.note}</p>
        <div className={styles.offerings}>
          <p className={styles.offeringsLabel}>{comingSoon ? 'What is planned' : branch.itemsLabel}</p>
          <ul>
            {branch.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {!comingSoon && (
          <Button href={branch.href} variant="green" size="compact" className={styles.branchCta}>
            {branch.cta}
          </Button>
        )}
        {comingSoon && <p className={styles.launchNote}>Launch details to be announced.</p>}
      </div>
    </Reveal>
  );
}

export function EcosystemOverview() {
  const { hero, branches, connection } = ecosystem;

  return (
    <div className={`${styles.page} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}>
      <section className={styles.hero} aria-label="The BitQueens ecosystem">
        <DottedGlobe className={styles.globe} />
        <div className={`${styles.inner} ${styles.heroInner}`}>
          <Reveal><p className={styles.eyebrow}>{hero.eyebrow}</p></Reveal>
          <Reveal delay={80}>
            <h1 className={styles.heroTitle}>{hero.headline}<span>{hero.headlineSerif}</span></h1>
          </Reveal>
          <Reveal delay={140}><p className={styles.heroBody}>{hero.body}</p></Reveal>
          <Reveal delay={200} className={styles.heroActions}>
            <Button href={hero.cta.href} variant="green">{hero.cta.label}</Button>
            <Button href={hero.partnerCta.href} variant="secondary">{hero.partnerCta.label}</Button>
          </Reveal>
        </div>
      </section>

      <div id="impact">
        <AcademyProof content={ecosystem.proof} />
      </div>

      <section id="branches" className={`${styles.inner} ${styles.branches}`} aria-label="Our four branches">
        <SectionHead headline="Find your place." headlineSerif="Follow your curiosity." intro="Each branch has a different role. Choose the one that fits where you are — or where you want to go next." />
        <div className={styles.activeBranches}>
          {branches.slice(0, 2).map((branch, index) => <BranchCard key={branch.id} branch={branch} index={index} />)}
        </div>
        <div className={styles.upcomingBranches}>
          {branches.slice(2).map((branch, index) => <BranchCard key={branch.id} branch={branch} index={index + 2} />)}
        </div>
      </section>

      <section className={styles.connection} aria-label="How the ecosystem connects">
        <div className={`${styles.inner} ${styles.connectionInner}`}>
          <SectionHead eyebrow={connection.eyebrow} headline={connection.headline} headlineSerif={connection.headlineSerif} intro={connection.body} onDark />
          <Reveal className={styles.connectionAside}>
            <NetworkMark className={styles.connectionMark} />
            <p>{connection.note}</p>
            <Button href={connection.cta.href} size="compact" onDark>{connection.cta.label}</Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
