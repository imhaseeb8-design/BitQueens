import type { Metadata } from 'next';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './page.module.css';
import { about } from '@/content/about';
import AboutHero from '@/components/sections/AboutHero';
import AboutStory from '@/components/sections/AboutStory';
import AboutVision from '@/components/sections/AboutVision';
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
    <div className={`${styles.page} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}>
      <AboutHero hero={about.hero} />
      <AboutStory story={about.story} />
      <AboutVision vision={about.vision} />
      <AboutPosition position={about.position} />
      <AboutGroup group={about.group} />
      <AboutFounder founder={about.founder} />
      <AboutClosing closing={about.closing} />
    </div>
  );
}
