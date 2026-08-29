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
| orange | `#E8641C` | energy accent, primary CTA — sparingly |
| forest | `#1E4A2C` | flat block (Why we exist) |
| deep blue | `#2B6CA3` | flat block (Conference) |
| sky / pale blue | `#4A9BD1` / `#B9DCF2` | accents on blue |
| blush | `#F3AFBC` | soft punctuation |

Hierarchy comes from **opacity, not new hues**. Dark bands take their own
counter-accent (forest → blush, blue → pale blue) rather than orange.

**Type** — Cabinet Grotesk (display) + Switzer (body), via Fontshare. The scale
is fluid `clamp()` in `tokens.css`; use the tokens, not raw px.

**Grid** — 1440px frame, 72px margins. Only the two outer rails are drawn
(the brand file hides columns 2–11), so the structure is stated once at each
margin instead of striped across the page.

**Hero** (v3) — a scroll-driven crossfade, pinned via
`position: sticky`. One persistent block (the pitch: lede + CTAs) sits beside
a region where the headline + artwork dissolve into three proof figures —
same pattern mistral.ai's own hero uses under the hood (persistent content,
foreground swapped), not boxes resizing on scroll. Only `transform` and
`opacity` animate. Two things worth knowing if you touch it:
- The crossfade window (`p` 0.44–0.56 in `Hero.module.css`) uses
  **complementary** opacity curves (`1−x` and `x` over the same interval) so
  they sum to 1 throughout — independent, differently-timed ramps will dip
  toward invisible at the crossover instead of blending.
- The two chapters don't dissolve at the same position — the headline
  anchors top, the proof stats anchor bottom (over the artwork, on a
  legible backdrop). Crossfading text directly through other text is
  illegible regardless of the timing; this was the real bug in an earlier
  pass, not the opacity math.
- `data-phase` (`pre`/`mid`/`past`, written once per direction change, not
  per frame) removes the fully-faded chapter from layout once its opacity
  hits exactly 0 — otherwise its box keeps reserving height forever and the
  final state has a permanent blank gap above the stats.

Note `body` uses `overflow-x: clip`, not `hidden` — `hidden` makes the body a
scroll container and silently breaks the pin.

**v3 spacing/chrome pass:** `SiteHeader` and `Hero` were each independently
drawing a hairline under the nav — two stacked rules, not one. `SiteHeader`'s
`.rule` is gone entirely; `Hero`'s own `.rule` and its `<GridLines />` margin
rails are gone too (scoped to the hero only — other sections still use the
exposed-grid rails, that wasn't part of this complaint). `.zone` no longer
centers its content in the full 100vh stage either — that vertical centering
was the actual source of "the hero feels like a lot of space," not the stage
height. It now anchors near the top with `align-items: start` and a small
`padding-top`, closer to how bold-headline references (La Playa, Graffio,
ClearBank) sit type right under the nav. Top nav trimmed from 8 items to 5
(`content/site.ts`) — Innovations/BIET/Foundation dropped from the nav bar
but stayed reachable via the footer's "Ecosystem" column
(`footerLinks.ecosystem` in the same file) and the homepage's Ecosystem
stack section, so nothing lost a URL.

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
- **`proof.stats`** is empty on purpose. No verified impact figures exist yet,
  so the section leads with the entity register, which is checkable. Populate
  `stats` and the numerals row appears.
- **Photography** — none shot yet. Every slot states the ratio and the alt text
  it is waiting for. Brief rules out stock crypto imagery and AI faces.
- **Newsletter** — `NewsletterForm` has no endpoint; it validates, then says so
  plainly. Wire it before launch.
- **Sections 02 and 03** each have two variants under review. Switch in
  `content/layout.ts`. Section 02 (Proof) is currently **not rendered** — the
  hero's second state carries the figures instead. Restore the commented line
  in `app/page.tsx` to bring it back.
- **"3 registered entities"** in the hero figures conflicts with the brief's
  entity table, which lists two companies as registered and three more as
  approved, in progress and planned. Confirm the current count.
