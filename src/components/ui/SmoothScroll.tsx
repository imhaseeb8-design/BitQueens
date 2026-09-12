'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import 'lenis/dist/lenis.css';

/**
 * Inertial scrolling for the whole page (Lenis, the same engine behind
 * storytellaz.com and si3.space).
 *
 * The wheel no longer jumps the page in 100px steps: each tick sets a target
 * and the page eases toward it, so a flick coasts and a stop settles. That
 * weight is the whole point; the numbers below are where it stays responsive.
 *
 *   lerp 0.09   ~how much of the remaining distance closes per frame. The
 *               library default is 0.1; lower is heavier. Below ~0.07 the
 *               page starts to feel like it is ignoring you.
 *   syncTouch   off — touch stays native. Emulated touch scrolling is where
 *               these libraries earn their reputation for lag on phones.
 *
 * Lenis drives the real scroll position (no transforms), so `position:
 * sticky`, the IntersectionObserver reveals and in-page anchors all keep
 * working. Reduced motion means no inertia at all: the component simply does
 * not start.
 *
 * Renders nothing. Mounted once in the root layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
