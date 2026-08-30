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

## Deployment

Live at **https://bitqueens-website.vercel.app**.

Vercel is connected to this repo's `main` branch: **pushing to `main` deploys
to production**, and pull requests get their own preview URL. There is no
deploy step to run by hand.

The Node major is pinned in three places that must stay in agreement —
`.nvmrc`, `engines.node` in `package.json`, and the `node-version-file` the CI
workflow reads. Vercel reads `engines.node`. Left unpinned, Vercel picks its
own default and can drift away from what the site was built and tested
against.

`.github/workflows/ci.yml` runs `tsc --noEmit` and `eslint src` on every push
and PR. It exists because Vercel's build type-checks but **does not run
ESLint** (Next 16 dropped it from `next build`), so lint regressions would
otherwise reach `main` unseen. A red check there means the deploy may still
have succeeded — read the failure before assuming the site is broken.

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
│   └── ui/                 Button, Section, Reveal, ImageSlot
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

**`#FFFFFF` is used exactly once, on purpose:** the closing Foundation card in
the ecosystem stack (Figma node 89:205). It has to be brighter than the
`#FAFAF8` page or its edges disappear and the stack looks like it ended a card
early. "Correcting" it to `--bq-canvas` is a mistake this repo has already
made once — don't repeat it.

**Type** — Cabinet Grotesk (display) + Switzer (body), via Fontshare. The scale
is fluid `clamp()` in `tokens.css`; use the tokens, not raw px.

**Grid** — 1440px frame, 72px margins. The grid is a layout constraint only;
**nothing draws it.** An earlier pass rendered the two outer margin rails as
hairlines on every section (a `GridLines` component, since deleted). Stacked
down a long page they boxed each section in and read as clutter the design
never asked for — the Figma frames have no rails.

**Lines** — every divider on the page is the same line: `--bq-rule`, 1px,
**content width**, sitting inside the same margins as the copy it divides.
The hero's closing rule (Figma node 75:137) is the reference, with a 90px
accent segment at its left end that loops slowly along it.

Nothing is full-bleed any more. `<Section rule>` used to draw its hairline
outside `.inner`, so it spanned the viewport in solid ink and read as a much
heavier, different kind of line than the hero's; Path carried a third weight
at 0.85. All of them now point at the one token — change it there, not in a
component.

The distinction to hold on to: **standalone divider elements take
`--bq-rule`; per-item borders do not.** The rule above each blog post and the
opener on the partner-tier list are deliberately heavier (0.85) because they
are an editorial device repeating down a list, not a boundary between
sections. Making those match would flatten the blog cards.

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

**Ecosystem card stacks** — cards that pin and stack on scroll (the
avax.network pattern: each card slides up and covers the last, leaving a
sliver of it showing). **Pure CSS `position: sticky` at staggered `top`
offsets — no JavaScript, no scroll listener at all.**

**The rule that decides whether a sticky stack works at all: every card must
be a sibling of ONE shared containing block, in normal flow.** A sticky box
can only travel inside its own containing block, so if you wrap each card in
its own `card height + peek` div, each card's travel is capped at one peek —
it pins for a moment, gets pushed off by its own wrapper, and the cards never
appear on screen together. That is not a stack; it is four cards taking turns.
With one shared parent, card 01 stays pinned for the rest of the run while
02–04 slide up over it, which is the whole effect.

Both variants are built this way and measured in the browser — card 01 holds
its pin for the whole run, and all four are simultaneously pinned for a real
window (`stackSide` ~250px, `stack` ~380px). Three things worth knowing:

- **Proportions are derived, not typed in.** In `stackSide`, Figma's
  storyboard (node 101:2) offsets four 411px cards by 113px, so `--side-peek`
  is `calc(var(--side-card-h) * 0.275)` and that ratio survives every
  viewport. The peek reveals each card's wave band, index number and rule,
  and stops short of its name. In `stack` the peek is the card's own header
  (`--stack-header-h`), so number + name are what show.
- **Card height is capped against the viewport, not just the page.** The
  finished stack is `3 × peek + 1 card` tall and has to clear the top offset
  too, so a card height chosen only for looks puts the last card below the
  fold on shorter screens. Both variants derive their card height from
  `100vh` minus the peeks; verified down to a 700px-tall window and on mobile.
- **A hold spacer follows the last card** (`.sideHold` / `.stackHold`,
  ~0.6 × card height). Without it the last card arrives exactly as the
  parent's bottom edge starts carrying everything away, so the completed
  stack is never actually still.

In `stackSide` only, `--stack-top` is shared by the cards and the heading
beside them, which is what keeps the heading level with whichever card is
currently on top.

Neither variant uses `<Reveal>` on the cards: the pinning *is* the animation,
and the reveal's transform fights it. Cards are plain `next/link` links.

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
