import type { Metadata } from 'next';
import { ConferenceBoard } from '@/components/sections/ConferenceBoard';
import { ConferenceClosing } from '@/components/sections/ConferenceClosing';
import { ConferenceHero } from '@/components/sections/ConferenceHero';
import { conference } from '@/content/conference';
import type { ConferenceEvent } from '@/lib/types';

/**
 * /conference, exactly as it renders once editions exist.
 *
 * The same three sections in the same order as the real page — only the
 * board's `events` differ. This is where a populated conference page is
 * looked at, so that the real one can keep telling the truth: it says no
 * edition is scheduled, because none is.
 *
 * NOT content. Delete this route once a confirmed edition goes into
 * src/content/conference.ts; the real page needs no other change.
 */

export const metadata: Metadata = {
  title: 'Conference board preview',
  robots: { index: false, follow: false },
};

const SAMPLE: ConferenceEvent[] = [
  {
    id: 'sample-1',
    name: 'SAMPLE — Abuja: Emerging Tech',
    location: 'Abuja, Nigeria',
    date: 'SAMPLE — Saturday, 14 March 2026',
    time: '10:00 AM – 4:00 PM WAT',
    format: 'In person',
    about:
      'SAMPLE COPY. A day of talks and workshops for women starting out in emerging technology, with the Academy cohorts, the campus chapters and the wider community in one room.',
    tags: ['Blockchain', 'AI', 'Careers'],
    speakers: [
      {
        name: 'Kristie Ezigbonwa Immanuel',
        role: 'Founder, BitQueens',
        portrait: {
          src: '/kristie-portrait.jpg',
          alt: 'Kristie Ezigbonwa Immanuel',
          width: 48,
          height: 48,
        },
      },
    ],
    image: {
      src: '/conference-audience.png',
      alt: 'Women listening to a speaker at a technology conference',
      width: 1672,
      height: 941,
    },
    cta: { label: 'Secure your seat', href: '/join' },
  },
  {
    id: 'sample-2',
    name: 'SAMPLE — Online: Women in Web3',
    location: 'Virtual',
    date: 'SAMPLE — Friday, 5 June 2026',
    time: '7:00 PM – 9:00 PM GMT/UTC',
    format: 'Virtual',
    about:
      'SAMPLE COPY. An evening of short talks from women building in Web3 across Africa and beyond, open to anyone in the community.',
    tags: ['Web3', 'Community'],
    speakers: [],
    image: {
      src: '/conference-audience.png',
      alt: 'Women listening to a speaker at a technology conference',
      width: 1672,
      height: 941,
    },
    cta: { label: 'Secure your seat', href: '/join' },
  },
  {
    id: 'sample-3',
    name: 'SAMPLE — Lagos: First Edition',
    location: 'Lagos, Nigeria',
    date: 'SAMPLE — 2025',
    time: 'One day',
    format: 'In person',
    past: true,
    about: 'SAMPLE COPY. A past edition, kept on the board with no seat to take.',
    tags: ['Blockchain'],
    speakers: [],
    image: {
      src: '/conference-audience.png',
      alt: 'Women listening to a speaker at a technology conference',
      width: 1672,
      height: 941,
    },
  },
];

export default function PreviewConference() {
  return (
    <>
      <ConferenceHero content={conference.hero} />
      <ConferenceBoard content={{ ...conference.board, events: SAMPLE }} />
      <ConferenceClosing content={conference.closing} />
    </>
  );
}
