<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Where things live

Read `README.md` before changing anything visual — it carries the locked
palette, the type scale, the grid rules, and the motion contract, each with
the reason it is that way and the mistakes already made against it.

The dotted canvas animations (`GlobalDotMap`, `DottedGlobe`,
`DotGradientField` and its four shapes) are documented under **Design system →
Dotted motion** in that file. They share one set of constants on purpose;
`/preview-field` renders every shape with the prop that produces it.
