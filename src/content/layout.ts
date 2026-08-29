import type { EcosystemVariant } from '@/components/sections/Ecosystem';
import type { ProofVariant } from '@/components/sections/Proof';

/**
 * Layout variants still under review.
 *
 * Sections 02 and 03 were each designed two ways and the choice has not been
 * made. Both are built; flip the value here to compare them in the browser.
 * Delete this file and inline the winners once the decision is final.
 *
 *   proof     'band'       thin strip, register reads as a record
 *             'asymmetric' claim set large, register weighed against it
 *
 *   ecosystem 'doors'      four cards; fastest to scan
 *             'index'      four full-width rows; more editorial
 *             'stack'      four full-bleed cards that pin and stack on
 *                          scroll (the avax.network pattern) — current pick
 */
export const homeLayout: {
  proof: ProofVariant;
  ecosystem: EcosystemVariant;
} = {
  proof: 'asymmetric',
  ecosystem: 'stack',
};
