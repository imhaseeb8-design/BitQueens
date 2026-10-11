# Handoff

Written for the BitQueens team. It covers three things: **what must be
decided before launch**, **how to change the words**, and **how to put the
real domain on the site**. Nothing here needs a developer except where it
says so.

The deeper technical reference is [README.md](../README.md); search and
sharing setup is in [SEO.md](SEO.md).

---

## 1. Where the site lives

| | |
|---|---|
| Live URL | <https://bitqueens-website.vercel.app> |
| Code | <https://github.com/imhaseeb8-design/BitQueens> |
| Host | Vercel, connected to the `main` branch |

Pushing to `main` deploys to production on its own; there is no publish
button to press. A change is usually live about a minute after it is saved.

---

## 2. Before launch — decisions only BitQueens can make

Five pieces of what is on the site now were **invented as placeholders**.
They look like real content, so they must be replaced or approved before the
site is shown to the public.

| What | Where | Why it matters |
|---|---|---|
| **"Amara Okafor", member since 2026** | `src/components/sections/Path.tsx:35` | A made-up member name on the homepage "Join" card. Either a real member who has agreed to appear, or change it to something obviously generic. |
| **"Web3 Foundations · Week 2 of 4 · Beginner"** | `src/components/sections/Path.tsx:44` | An invented course and progress bar on the "Learn" card. |
| **"March 2027 · Lagos, Nigeria"** | `src/content/home.ts:502` | A conference edition that has not been announced. It appears in the homepage hero chip. |
| **"Women in Web3: an open session", Thursday 26 March 2026** | `src/content/conference.ts:39` | The single event on the Events page. Not a real event. |
| **Kristie's bio** | `src/content/home.ts:553` | Written as a stand-in, awaiting Kristie's own words. Her pull quote is deliberately empty. |

Also unresolved:

- **Email addresses.** Everything on the site currently writes to
  `immanuelkristie@gmail.com`. `partnerships@bitqueens.org` and
  `events@bitqueens.org` are listed in `src/content/site.ts:73` but have not
  been confirmed as working mailboxes.
- **Photography.** None has been shot. Every image slot on the site states
  the ratio and the alt text it is waiting for, and shows a labelled
  placeholder until a photo is dropped in.
- **Programme names** on the Academy and Innovations pages are marked
  provisional in their content files.
- **The impact figures are real** — 2000+ women trained, 3 cohorts, 2 campus
  chapters, 8+ countries, supplied by BitQueens. No action needed.

---

## 3. Changing the words

**Every word on the site lives in one folder: `src/content/`.** No copy is
buried in the layout. Each file is plain text between quote marks — editing
one does not require understanding the code around it.

| File | What it controls |
|---|---|
| `site.ts` | Navigation, buttons, email addresses, legal line |
| `home.ts` | The entire homepage |
| `about.ts` | About page |
| `academy.ts` | Academy page, tracks and cohorts |
| `ecosystem.ts` | Ecosystem page |
| `innovations.ts` | Innovations & Labs |
| `conference.ts` | Events page |
| `contact.ts` | Contact page |
| `join.ts` | Join page |
| `blog.ts` | Article list |
| `layout.ts` | Which variant an undecided section uses |

Three ways to make a change, easiest first:

1. **Send the edits as a document.** Say which page and which sentence; a
   developer applies them in minutes.
2. **Edit on GitHub in the browser.** Open the file, click the pencil, change
   the text between the quote marks, and save with a short note. The site
   rebuilds itself. Keep the quote marks and the commas — they are the only
   things that can break.
3. **Run it locally.** `npm install`, then `npm run dev`. Requires Node.

Comments in those files beginning `TODO (BitQueens team)` or
`NEEDS CONFIRMATION` mark every spot still waiting on a decision.

---

## 4. Connecting the real domain

A developer runs steps 2 and 3; step 1 is on the registrar.

1. **In Vercel** → the project → Settings → Domains → add the domain. Vercel
   gives DNS records to enter at whoever the domain is registered with.
   Choose one hostname as primary (with or without `www`) and let Vercel
   redirect the other.
2. **Set the canonical URL.** Add an environment variable
   `NEXT_PUBLIC_SITE_URL=https://the-real-domain` in Vercel, then redeploy.
   Page metadata, the sitemap and the structured data all read it.
3. **Submit to Google.** Verify the domain in Google Search Console, submit
   `/sitemap.xml`, and confirm the canonical URL it reports is the live one.

> **Warning, outstanding.** The canonical URL is currently set to
> `https://bitqueens.vercel.app`, which **does not exist** — it returns a
> 404 from Vercel. Until the real domain is attached, this must point at
> `bitqueens-website.vercel.app` instead, or search engines are told the
> site's true address is a dead page. Fix this before any launch
> announcement.

---

## 5. How the forms behave today

Every form on the site — contact, join, enrol, chapter, quote, event
interest — **opens a pre-filled draft in the visitor's own email app**. The
visitor reviews it and presses send. Nothing is stored and nothing is sent
automatically, and each form says so on screen.

This is deliberate: it works with no accounts, no database and no monthly
cost, and no personal data passes through anything that would need a privacy
policy of its own.

If BitQueens would rather collect submissions in a dashboard or a
spreadsheet, that is a small piece of work to add later; nothing on the page
has to change.

**The newsletter signup has no mailing-list connected** — it validates the
address and then says plainly that it cannot subscribe anyone yet. Wire it to
the mailing-list provider before promoting it (`NewsletterForm.tsx:53`).

---

## 6. Things a visitor will never see

Three internal reference pages are published but hidden from search engines
(`noindex`), used for reviewing design pieces side by side:

- `/preview-dots` — every dotted animation on the site
- `/preview-field` — the four dot-field shapes
- `/preview-conference` — event card variants

They are harmless to leave. Delete the folders in `src/app/` if you would
rather they were gone.

---

## 7. Quality gates already in place

- Every push runs TypeScript and ESLint in GitHub Actions. A red check means
  read the failure before assuming the site is broken.
- Vercel type-checks each build; a build that fails is not deployed, so the
  live site cannot be broken by a bad save.
- The site has been checked down to 390px (iPhone 12 width) in Chromium.
  **A real iPhone Safari pass and measured Core Web Vitals are still
  outstanding** — browser engines differ, and neither can be proved by
  compilation.
