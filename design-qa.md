# How it works design QA

- Source visual truth: `/var/folders/ft/p4hd_9710dgg_t8qsl48q4800000gn/T/TemporaryItems/NSIRD_screencaptureui_0HTsm6/Screenshot 2026-10-11 at 12.15.50 AM.png`; split-panel detail clarified by `/Users/am/Downloads/Group 2147226284.png`
- Implementation: `http://localhost:3002/#path` (in-app browser screenshots captured inline during this task; the browser did not expose a filesystem screenshot path)
- Source pixels: 2360 × 1738; reference displayed at 1825 × 1344. Implementation viewport: 1543 × 1034 CSS pixels at device scale factor 2, with an additional 390 × 844 mobile check. Layout was compared by region because the reference uses different product copy and imagery.
- State: learner, Join selected for visual comparison; Learn and Build interactions checked. Partner content also checked.

**Findings**

No actionable P0, P1, or P2 issues remain. The implementation follows the source's two-column heading, three progress tabs, and one shared rounded image/text panel. The image also has four rounded corners inside that panel. It uses BitQueens green and the existing Join/Learn/Build copy. The reference's product UI image and blue accents were intentionally replaced by existing BitQueens landscape artwork and site tokens.

**Fidelity checks**

- Typography: display heading, right-aligned muted intro, step labels, and panel copy retain the reference hierarchy while using the site's fonts.
- Spacing and layout: desktop columns and panel proportions match the reference's structure; the panel stacks on mobile without horizontal overflow.
- Color: white canvas, muted text, green selection, and pale green panel follow the BitQueens palette.
- Image: existing landscape artwork renders sharply and fills the left panel without distortion. Each step has its own image.
- Copy: existing BitQueens learner and partner content is preserved; the section eyebrow and link identify the new layout.
- Link icon: the down-left arrow reuses the shared BitQueens CTA arrow geometry and sits before the link label.

**Interaction checks**

- Clicking Learn selects its content and image.
- ArrowRight from Learn focuses and selects Build.
- Switching to Partners shows Align, Co-create, and Deliver; switching back restores learner content.
- TypeScript and ESLint pass. The page renders after a reload; transient module-resolution errors logged while the files were being replaced did not persist in the rendered page.

**Comparison history**

The first browser view after hot reload showed unstyled new markup because the CSS module had not refreshed. A page reload loaded the CSS. The user then clarified that the split panel is one outer card, so the inter-column gap was removed and the card received one outer radius. A subsequent request specified four rounded image corners; the image pane now has its own radius inside the shared card. Desktop and mobile browser checks confirmed the resulting CSS.

**Open questions**

None.

**Implementation checklist**

- [x] Match the reference section structure.
- [x] Add an image to the left panel.
- [x] Preserve learner and partner content.
- [x] Check desktop, mobile, mouse, and keyboard states.

final result: passed
