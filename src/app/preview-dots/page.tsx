import type { Metadata } from 'next';
import { DottedBoard } from './DottedBoard';

/**
 * The dotted-motion inventory.
 *
 * Every animated dotted mark on the site, live and side by side, each panel
 * labelled with the component, the call that produces it, and where it is
 * already used. `/preview-field` stays as the narrower board for picking
 * between the four DotGradientField shapes.
 */
export const metadata: Metadata = {
  title: 'Dotted motion — inventory',
  robots: { index: false, follow: false },
};

export default function PreviewDots() {
  return <DottedBoard />;
}
