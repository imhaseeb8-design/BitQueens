# BitQueens

Marketing site for BitQueens — the women's layer of Web3.

Next.js 16 (App Router) · TypeScript · CSS Modules.

```bash
npm run dev     # http://localhost:3000
npm run build
npx tsc --noEmit
npx eslint src
```

> Node lives at `~/.local/node/bin` on this machine and is already on `PATH`.

---

## Structure

```
src/
├── app/                    routes; one folder per page
│   ├── layout.tsx          fonts, metadata, header + footer
│   ├── page.tsx            homepage — composes sections in order
│   └── globals.css         reset, base type, a11y, motion defaults
│
├── components/
│   ├── layout/             SiteHeader, SiteFooter
│   ├── sections/           one folder-less pair per homepage section
│   └── ui/                 Button, Section, Reveal, GridLines, ImageSlot
│
├── content/                ← ALL copy lives here. The CMS seam.
│   ├── site.ts             nav, CTAs, mailboxes, legal
│   ├── home.ts             every word on the homepage
│   └── layout.ts           which variant each undecided section uses
│
├── lib/types.ts            the content contract
└── styles/tokens.css       colour, type scale, spacing, motion
```

Each section is a `.tsx` + `.module.css` pair in `components/sections/`. Nothing
imports another section; the page composes them.

---

## Adding a page

1. Create `src/content/<page>.ts` and type it against `src/lib/types.ts`.
2. Create `src/app/<page>/page.tsx` and compose sections.
3. Reuse `Section`, `SectionLabel`, `Button`, `Reveal` — do not restyle them
   locally. If a page needs a new pattern, add it to `components/ui/`.

Routes already linked from nav and footer but not yet built: `/academy`,
`/innovations`, `/biet`, `/foundation`, `/conference`, `/partners`, `/blog`,
`/about`, `/join`, `/contact`, `/brand`, `/careers`.

## Adding a CMS

`src/content/*` exports plain objects typed by `src/lib/types.ts`. To move to a
CMS, keep the types and replace the exports with a fetch that returns the same
shapes. Components never touch the data source, so no component changes are
required.

The types already model the empty states the design supports: `partners`,
`speakers`, `credentials` and `stats` render nothing when empty, and
`ImageSlot` shows a labelled placeholder until `src` is set.

---

## Design system

**Palette** (locked — do not add hues)

| Token | Hex | Use |
| --- | --- | --- |
| canvas | `#FAFAF8` | page ground |
| cream | `#F1EEE4` | text on dark bands |
| ink | `#1A1A1A` | text, the ink band |
| accent | `#D8371B` | primary CTA, section numerals, focus, hovers |
| orange | `#E8641C` | the Innovations & Labs pillar hue |
| forest | `#1E4A2C` | flat block (Why we exist) |
| deep blue | `#2B6CA3` | flat block (Conference) |
| sky / pale blue | `#4A9BD1` / `#B9DCF2` | accents on blue |
| blush | `#F3AFBC` | soft punctuation |

Hierarchy comes from **opacity, not new hues**. Dark bands take their own
counter-accent (forest → blush, blue → pale blue) rather than the accent.

**Type** — Cabinet Grotesk (display) + Switzer (body), via Fontshare. The scale
is fluid `clamp()` in `tokens.css`; use the tokens, not raw px.

**Grid** — 1440px frame, 72px margins. Only the two outer rails are drawn
(the brand file hides columns 2–11), so the structure is stated once at each
margin instead of striped across the page.

**Hero** (v4) — implemented from Figma node 75:135 ("Swiss International
Style"). A full-bleed wave band, a 72px headline whose accent clause takes its
own line, and a grey lede card that overlaps the band by 72px and bottom-aligns
with the headline (`align-items: end` plus a negative top margin on the grid).
The scroll-driven crossfade is **gone** — the proof figures moved into their own
"This is BitQueens" section (`Impact.tsx`), which is how the frame draws them,
so the pinned stage, phase remapping and two-chapter swap are all deleted. What
remains: the masked headline lines on load, one restrained `transform`-only
parallax on the wave, and the count-up + clip wipe on the figures.

Two things worth knowing if you touch it:
- The headline's `max-width: 7.8em` is what forces the frame's line break
  ("The digital" / "economy. Open to"). It is font-metric dependent — Cabinet
  Grotesk is narrower than the frame's own font, so the cap has to sit between
  `economy. Open to` (7.40em) and `The digital economy.` (8.27em). Changing the
  display face means re-measuring it.
- The nav's red CTA bleeds off the right edge with
  `margin-right: calc(-1 * max(0px, (100vw - var(--bq-max)) / 2))`, which is
  why `.inner` carries no right padding on desktop — the mobile query adds it
  back once that block is hidden.

**Accent colour** — the design paints the CTA, headline accent and nav block in
`#D8371B`, not the site's original orange. Every accent/interactive use (primary
buttons, section numerals, focus rings, link hovers) now points at one token,
`--bq-accent` in `tokens.css`. Flip that single value to take the whole site
back to orange. `--bq-orange` is still defined — it remains the Innovations &
Labs pillar hue in `content/home.ts`.

**Ecosystem `stack` variant** — four full-bleed cards that pin and stack on
scroll (the avax.network pattern: each card slides up and covers the last,
leaving its number + name peeking above). **Pure CSS `position: sticky`
at staggered `top` offsets — no JavaScript, no scroll listener at all.**
One thing that will bite you if you touch it: **each card needs its own
wrapper** (`.stackItem`). A sticky element can't stick past its *containing
block's* bottom edge — if all the cards share one flat parent as their
containing block, that rule applies to the shared bottom, and near the end
of the last card every card gets bottom-constrained at once and they
collapse onto the same spot instead of exiting one at a time. Give each
card its own appropriately-sized wrapper and each one's exit becomes
independent again. This only shows up in the last ~1 card's-height of
scroll, so it's easy to test the middle of the effect, ship it, and never
notice the ending is broken.

**Ecosystem `stackSide` variant (current pick)** — from Figma node 96:209.
Same stacking mechanism as `stack`, but the cards stay confined to a
narrower column (not full-bleed) beside a heading that is itself
`position: sticky` at the same `top`, so it holds level with whichever card
is currently pinned. Two things worth knowing:
- It has to render as a plain `<section>`, **not** the `<Section>` wrapper —
  `Section` clips itself with `overflow: hidden`, and any such ancestor
  (even one that never actually clips anything) breaks `position: sticky`
  for everything inside it. `stack` avoids this by rendering its cards as a
  sibling *after* `</Section>`; `stackSide` can't do that because the
  heading and the cards must share one sticky-safe ancestor to stay level
  with each other, so the whole two-column grid moves outside instead.
  Same failure mode as the `overflow-x: hidden` → `clip` fix on `body`
  below — the class of bug reappears at any wrapping level, not just the
  page root.
- Each card's own "stuck" window is short by design — its `.sideItem`
  wrapper is only card height + one wave-band's worth of extra room, so a
  card individually pins for a beat (a few dozen px of scroll) before the
  *next* card, now sticking above it in DOM order, covers the seam. Don't
  mistake the short per-card window for broken sticky when testing by hand:
  sampling at a coarse scroll interval can step right over it.

**Motion**
- Only `transform` and `opacity` animate.
- One easing curve: `--bq-ease` = `cubic-bezier(.16, 1, .3, 1)`. Never `ease-in`.
- Scroll reveals via `<Reveal>` — IntersectionObserver flips an attribute, CSS
  does the animation off the main thread. Stagger 60–80ms.
- Buttons scale to `0.97` on `:active`.
- Every hover state is gated behind `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` keeps opacity, drops movement.
- `@media (scripting: none)` reveals everything, so no-JS is never a blank page.

---

## Open items

- **`founder.bio`** in `content/home.ts` is placeholder copy — needs Kristie's
  own words. `founder.quote` is deliberately empty (see the note there).
- **Impact figures are real** (2000+ / 3 / 2 / 8+, from the client). They
  replaced the earlier placeholder set the old hero carried. `proof.stats`
  in the unrendered Proof section is still empty.
- **Photography** — none shot yet. Every slot states the ratio and the alt text
  it is waiting for. Brief rules out stock crypto imagery and AI faces.
- **Newsletter** — `NewsletterForm` has no endpoint; it validates, then says so
  plainly. Wire it before launch.
- **Section 03 (Ecosystem)** still has variants under review — switch in
  `content/layout.ts`. Section 02 (Proof, the entity register) is **not
  rendered**: the "This is BitQueens" figures now occupy that slot. The
  component and its content are kept; restore the commented line in
  `app/page.tsx` to bring the register back.
