# Morph nav — measured spec

Source studied: <https://uiarc.dev/components/morph-nav> (Arc UI). The component
is **Pro — the source is paywalled**, so none of it was copied. Everything below
was measured off the live preview in the browser (computed styles + the inline
styles the component writes while animating). Build our own from these numbers.

## Structure

```
nav.root                      (container query root)
└─ div.surface                ← the ONE morphing element; JS writes
   │                            width / height / border-radius inline
   ├─ div.bar                 ← fades + blurs out when search opens
   │  ├─ button.brand
   │  ├─ div.track
   │  │  ├─ span.highlight    ← absolutely positioned, slides between items
   │  │  └─ button.item ×N    ← label + 14px chevron when it has a panel
   │  └─ div.tools
   │     ├─ button.tool       ← search
   │     └─ button.action     ← the one primary CTA
   └─ div.panelBody           ← only the open panel is mounted
      ├─ ul.links[data-columns]
      │  └─ li > button.link  → span.linkIcon + span.linkText
      │                           (span.linkLabel + span.linkDescription)
      ├─ (optional) feature    ← image/promo block on the right
      └─ div.footer > button.footerLink
```

The surface is what sells it: one pill that springs to the size of whatever is
inside, rather than a bar with a dropdown attached beneath it.

## Measurements

### Surface
| | |
|---|---|
| closed | `width: 676px; height: 56px; border-radius: 28px` (= h/2) |
| open (Product panel) | `width: 700px; height: 338px; border-radius: 22px` |
| background | `rgba(255,255,255,0.88)` |
| backdrop-filter | `blur(20px) saturate(1.3)` |
| box-shadow | `0 1px 2px rgba(0,0,0,0.03), 0 4px 14px rgba(0,0,0,0.04)` |
| own transition | `box-shadow 0.48s cubic-bezier(0.22,1,0.36,1)` only — size is sprung by JS |

### Bar row
| element | height | padding | radius | type |
|---|---|---|---|---|
| `.bar` | 56 | `0 8px 0 10px`, gap 6 | – | 14px / −0.01em |
| `.brand` | 36 | `0 8px 0 4px` | 999 | 14px / 500 |
| `.item` | 36 | `0 14px`, gap 4 | 999 | 14px / 400, muted ink |
| `.highlight` | 36 | – | 999 | `rgba(0,0,0,0.045)` |
| `.tool` (search) | 36 | square grid | 999 | 17px icon |
| `.action` | 36 | `0 16px`, gap 6 | 999 | 14px / 500, near-black bg, white |

Item ink is a muted grey that goes to full ink on hover/open
(`color .16s cubic-bezier(0.22,1,0.36,1)`).

### Panel
| | |
|---|---|
| `.panelBody` | `padding: 4px 0 0`, flex, gap 8 |
| `.links` | grid, `grid-template-columns: repeat(2, 1fr)`, gap 2 |
| `.link` | `padding: 10px 12px`, gap 12, `border-radius: 14px` |
| `.linkIcon` | 20×20 grid, muted |
| `.linkLabel` | 14px / 500, full ink |
| `.linkDescription` | 12px / 400, line-height 1.4, muted |
| columns | 2 by default above three links; 1 below 420px viewport |

### Motion
- Size spring: `0.58s linear(...)` with a small overshoot (peak ≈ 1.006) on
  grow, **no bounce on shrink**. A `linear()` easing function, not a cubic.
- Micro-states: colour `0.16s`, transform `0.12s`, both `cubic-bezier(0.22,1,0.36,1)`.
- Hover opens after a **60ms** intent delay; leaving the nav closes after
  **180ms**, so crossing the gap between two items doesn't flicker it shut.
- Moving to a neighbouring item slides the new panel in from that side while
  the highlight glides across.
- Search grows out of the same surface as `.bar` fades and blurs away.
- `prefers-reduced-motion`: drop travel, scale and blur; keep short fades.

### Behaviour notes
- Hover-to-open is gated on `pointerType === 'mouse'`, so touch opens on tap
  with no hover flash.
- Two ResizeObservers — one on the container, one on the open panel — feed the
  surface's target size.
- `collapseBelow` (720px of the root's *own* width) folds the items into one menu.
- Backdrop blur falls back to a solid surface under `prefers-reduced-transparency`
  and `prefers-contrast`.

### Accessibility contract
- `nav` landmark; current item carries `aria-current="page"`.
- Panel triggers: `aria-expanded` + `aria-controls`; panels are regions labelled
  by their trigger; the panel closes when focus leaves the nav.
- Keyboard: ←/→ between items (wrapping, an open panel follows); Home/End;
  ↓ / Enter / Space opens a panel and moves focus into it; ↑/↓ inside a panel,
  ↑ on the first link returns to the trigger; Esc closes and restores focus.
- Pointer-down outside the nav closes.

## Applying it to BitQueens

- Items: **Ecosystem** (panel), Conference, Blog, About — matching the current
  `SiteHeader`. Action = **Join BitQueens**, already the site's green pill.
- The Ecosystem panel's five destinations already exist in the footer nav:
  Ecosystem overview, Academy, Innovations & Labs, BIET *(coming soon)*,
  Foundation *(coming soon)*. Two columns, with the "coming soon" pills kept.
- Swap Arc's palette for ours: surface `rgba(255,255,255,0.88)` works as-is on
  the `#ffffff` canvas, hairlines `--bq-ink-14`, muted ink `--bq-ink-50`,
  labels `--bq-ink`, action `--bq-cta-from → --bq-cta-to`.
- Caution already hit on this branch: **Lightning CSS silently drops
  `backdrop-filter`** when it is written next to `-webkit-backdrop-filter`
  inside an `@supports not (...)` guard. Write the unprefixed property alone.
