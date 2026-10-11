import type { Metadata } from 'next';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './page.module.css';
import { about } from '@/content/about';
import { home } from '@/content/home';
import { LearnerValue } from '@/components/sections/LearnerValue';
import AboutHero from '@/components/sections/AboutHero';
import AboutStory from '@/components/sections/AboutStory';
import AboutPosition from '@/components/sections/AboutPosition';
import AboutGroup from '@/components/sections/AboutGroup';
import AboutFounder from '@/components/sections/AboutFounder';
import AboutClosing from '@/components/sections/AboutClosing';

export const metadata: Metadata = {
  title: 'About — BitQueens',
  description:
    'The story, vision, and founder behind BitQueens — the women’s layer of Web3, building emerging-tech education across Africa and beyond.',
};

export default function AboutPage() {
  return (
    <div className={`${styles.page} ${displaySans.variable} ${bodySans.variable}`}>
      <AboutHero hero={about.hero} />
      <AboutFounder founder={about.founder} />
      <AboutStory story={about.story} vision={about.vision} />
      {/* The figures sit directly under the story, because the story is what
          makes the claim — it ends on how many women have started here. The
          heading is hidden and the gap above is tight so the panel reads as
          that paragraph's evidence rather than as a section of its own. */}
      <div className={styles.figures}>
        <LearnerValue
          content={home.learnerValue}
          stats={home.impact.stats}
          hideHeading
          cta={{ label: 'Explore the Academy', href: '/academy' }}
        />
      </div>
      <AboutPosition position={about.position} />
      <AboutGroup group={about.group} />
      <AboutClosing closing={about.closing} stats={home.impact.stats} />
    </div>
  );
}
