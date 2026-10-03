import type { JoinPage } from '@/lib/types';

/**
 * /join — the single destination for every "Join" CTA on the site.
 *
 * The form is application-style, not checkout: joining is free, always.
 * Field options mirror the Academy's provisional track list.
 */
export const join: JoinPage = {
  eyebrow: 'Join BitQueens',
  headline: 'One free step.',
  headlineSerif: 'A whole ecosystem.',
  body: 'Tell us a little about yourself so we can point you to the right track, cohort, and community. Joining is free — always.',
  tracks: [
    'Web3 Foundations',
    'Digital Skills',
    'AI for Work',
    'Build & Earn',
    'Not sure yet',
  ],
  levels: ['Complete beginner', 'I know the basics', 'Intermediate'],
  submitLabel: 'Join BitQueens',
  successTitle: 'Welcome in.',
  successBody:
    'You are on the list. Watch your inbox — your first step into the Academy is on its way.',
  privacy: 'We only use your details to get you started in the Academy. No spam, no sharing.',
};
