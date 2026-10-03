import type { Metadata } from 'next';
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
    <main>
      <AboutHero hero={about.hero} />
      <AboutStory story={about.story} />
      <AboutVision vision={about.vision} />
      <AboutPosition position={about.position} />
      <AboutGroup group={about.group} />
      <AboutFounder founder={about.founder} />
      <AboutClosing closing={about.closing} />
    </main>
  );
}
