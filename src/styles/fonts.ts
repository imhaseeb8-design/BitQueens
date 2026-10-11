import localFont from 'next/font/local';

// Apply these variables as each section is migrated to the new typography.
/**
 * The display face.
 *
 * Geist (Vercel, SIL Open Font License), self-hosted as a Latin-subset
 * variable woff2 — 29KB for the whole 400–700 range.
 *
 * Named for its role, not its typeface: every component and stylesheet used
 * to reference `neueMontreal` / `--bq-neue-montreal` by name, so trying a
 * different face meant touching seventy-four files. Swapping faces is now a
 * one-line change here, which is the only reason this A/B is cheap.
 *
 * Previous candidates are still in public/fonts and can be restored by
 * pointing `src` back at them:
 *   NeueMontreal-Regular.otf   — the original; Regular only, no real 500/600
 *   GoogleSans-Variable.woff2  — 400–700
 *   GeneralSans-{400..700}.woff2
 *   DMSans-Variable.woff2      — 400–700
 */
const geist = localFont({
  src: '../../public/fonts/Geist-Variable.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--bq-display',
});

// Keep a stable hook for typography shared by every Geist section.
export const displaySans = {
  ...geist,
  variable: `${geist.variable} bq-geist`,
};


/**
 * The body face.
 *
 * Inter (SIL Open Font License), self-hosted as a Latin-subset variable
 * woff2 — 48KB for 400–700.
 *
 * Replaces Inter Tight, which is the condensed cut. Named for its role for
 * the same reason the display face is: swapping it should be one line here,
 * not a rename across every stylesheet.
 */
export const bodySans = localFont({
  src: '../../public/fonts/Inter-Variable.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--bq-body-sans',
});
