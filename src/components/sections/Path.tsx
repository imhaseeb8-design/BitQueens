'use client';

import Image from 'next/image';
import { academy } from '@/content/academy';
import { MemberCard } from '@/components/ui/MemberCard';
import { OutcomesCard } from '@/components/ui/OutcomesCard';
import { TrackCard } from '@/components/ui/TrackCard';
import {
  DotFieldMark,
  DotGlobeMark,
  NetworkMark,
} from '@/components/ui/PathMarks';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useAudience } from '@/components/audience/AudienceProvider';
import { Button, CtaArrow } from '@/components/ui/Button';
import { TextReveal } from '@/components/ui/TextReveal';
import type { PathByAudience } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './Path.module.css';

const stepImages = ['/path-wave-01.webp', '/path-wave-02.webp', '/path-wave-03.webp'];
const AUTO_ADVANCE_MS = 2000;

/* The homepage's own marks, back where they came from: the globe for entering,
   the field for learning, the network for building. Indexed like stepImages
   above, and both audiences run three steps. Each spins once on hover —
   `.stage` is the `data-spin-group`, so anywhere on the card turns it. */
const stepMarks = [DotGlobeMark, DotFieldMark, NetworkMark];

/* ------------------------------------------------------------------ *
 * PLACEHOLDER — not a real member. The card on step one shows what a
 * joined member sees; the name and year are stand-ins and must be wired
 * to the real member, or the card removed, before this ships.
 * ------------------------------------------------------------------ */
const MEMBER_PLACEHOLDER = { name: 'Amara Okafor', since: '2026' };

/* ------------------------------------------------------------------ *
 * PLACEHOLDER — invented. "Web3 Foundations" and "Beginner · 4 weeks"
 * are the real track and its real length, but the week and therefore
 * the percentage are made up: there is no progress to read yet. Wire
 * these to real progress, or remove the card, before this ships.
 * ------------------------------------------------------------------ */
const TRACK_PLACEHOLDER = {
  track: 'Web3 Foundations',
  week: 2,
  weeks: 4,
  level: 'Beginner track',
};

/* Step three invents nothing. The level and length are read off the real
   Build & Earn track so they cannot drift from the Academy page, and the
   three outcomes are that track's own description — "From learning to
   income: portfolios, freelancing, and finding your first clients" — set
   as a list rather than a sentence. */
const BUILD_TRACK =
  academy.tracks.tracks.find((t) => t.name === 'Build & Earn') ??
  academy.tracks.tracks[academy.tracks.tracks.length - 1];

const BUILD_OUTCOMES = [
  'A portfolio of real work',
  'Freelancing, in practice',
  'Your first clients',
];

export function Path({ content: byAudience }: { content: PathByAudience }) {
  const { audience } = useAudience();
  const content = byAudience[audience];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const stepsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabsId = useId();
  const panelId = `${tabsId}-panel`;
  const step = content.steps[active];
  const Mark = stepMarks[active % stepMarks.length];

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(steps);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (hovered || focused || !inView || reduceMotion || !pageVisible || content.steps.length < 2) return;
    // A manual selection gets the same full hold as an automatic one.
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % content.steps.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, cycleKey, hovered, focused, inView, reduceMotion, pageVisible, content.steps.length]);

  function selectStep(index: number) {
    setActive(index);
    setCycleKey((key) => key + 1);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = content.steps.length - 1;
    let next = index;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;

    event.preventDefault();
    selectStep(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="path"
      aria-label="How it works"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.heading}>
            <TextReveal
              key={audience}
              text={`${content.headline}\n${content.headlineMuted}`}
              className={styles.headline}
              lineClassNames={[styles.headlineLine, styles.headlineLine]}
            />
          </div>

          <div className={styles.introBlock}>
            <p className={styles.intro}>{content.intro}</p>
            <a className={styles.exploreLink} href="#path-steps">
              <span className={styles.exploreArrow} aria-hidden="true"><CtaArrow /></span>
              Explore the steps
            </a>
          </div>
        </div>

        <div
          ref={stepsRef}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div
            id="path-steps"
            className={styles.stepsNav}
            role="tablist"
            aria-label="How it works steps"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            {content.steps.map((item, index) => (
              <button
                key={item.title}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`${tabsId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={panelId}
                tabIndex={active === index ? 0 : -1}
                className={styles.stepTab}
                onClick={() => selectStep(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{item.title}</span>
                <span className={styles.stepTrack} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            id={panelId}
            className={styles.stage}
            data-spin-group
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${active}`}
            tabIndex={0}
          >
            <div className={styles.imagePane}>
              <Image
                key={active}
                src={stepImages[active]}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.stageImage}
              />
              {/* Only on step one: the card says you have joined, which is what
                  that step is. On "Learn" or "Build" it would be answering a
                  question the reader has already moved past. */}
              {active === 0 && (
                <MemberCard
                  key={`card-${audience}`}
                  name={MEMBER_PLACEHOLDER.name}
                  since={MEMBER_PLACEHOLDER.since}
                  className={styles.memberCard}
                />
              )}
              {/* Step three: what the last track leaves you with. */}
              {active === 2 && (
                <OutcomesCard
                  key={`outcomes-${audience}`}
                  kicker={BUILD_TRACK.name}
                  title="From learning to income."
                  outcomes={BUILD_OUTCOMES}
                  level={BUILD_TRACK.level}
                  length={BUILD_TRACK.length}
                  className={styles.memberCard}
                />
              )}
              {/* Step two: the same member, part-way through a track. */}
              {active === 1 && (
                <TrackCard
                  key={`track-${audience}`}
                  track={TRACK_PLACEHOLDER.track}
                  week={TRACK_PLACEHOLDER.week}
                  weeks={TRACK_PLACEHOLDER.weeks}
                  level={TRACK_PLACEHOLDER.level}
                  name={MEMBER_PLACEHOLDER.name}
                  className={styles.memberCard}
                />
              )}
            </div>
            <div className={styles.copyPane}>
              <div key={`${audience}-${active}`} className={styles.copyInner}>
                <Mark className={styles.stepMark} />
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <Button href={content.cta.href} variant="green" size="compact" className={styles.cta}>
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.closing}>{content.closing}</p>
      </div>
    </section>
  );
}
