'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition } from 'react';

/**
 * The cross-page transition.
 *
 * React's `<ViewTransition>` drives the browser's View Transitions API, which
 * needs no configuration in the App Router on this version of Next. Keying it
 * on the pathname is what makes a navigation read as an exit/enter pair
 * rather than an in-place update, which is what activates the crossfade.
 *
 * It sits here rather than in `layout.tsx` because the layout is a Server
 * Component and this needs `usePathname`; `children` still passes straight
 * through, so every page stays server-rendered.
 *
 * Deliberately one animation for every route. Directional slides are the
 * obvious next step, but they need each `<Link>` tagged forward or back by
 * hand, and a marketing site whose nav is five peers rather than a hierarchy
 * has no honest direction to encode.
 *
 * Browsers without the API navigate normally, with no animation and no error.
 * The actual keyframes live in globals.css — `::view-transition-*` are
 * document-level pseudo-elements and cannot be scoped to a CSS module.
 *
 * The inner <div> is load-bearing. Every page here returns a fragment of
 * eight or so sections, and React names a transition group per top-level
 * child — `bq-page`, `bq-page_1`, … `bq-page_7`. Only the unsuffixed one
 * matched the CSS below; the rest fell back to the browser's default fade
 * with `plus-lighter` blending, so the two pages showed through each other.
 * One element means one group, and one group the stylesheet can actually
 * address.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      name="bq-page"
      share="auto"
      enter="auto"
      exit="auto"
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
