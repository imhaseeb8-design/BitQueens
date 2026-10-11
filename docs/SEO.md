# Search and sharing setup

## Configuration

- Canonical domain defaults to `https://bitqueens.vercel.app`, as requested by the owner. Ensure that Vercel domain serves this project before deploying these canonical tags. The previously used preview URL is `bitqueens-website.vercel.app`.
- Set `NEXT_PUBLIC_SITE_URL=https://your-final-domain` when the custom domain is connected. Rebuild after changing it; metadata, sitemap and structured data share this setting.
- The supplied share artwork is served at `/opengraph-image.png`, 1200 × 630. `NEXT_PUBLIC_OG_IMAGE` can override its path or use an absolute HTTPS URL. Sharing images currently use the working `bitqueens-website.vercel.app` host because the requested canonical host returns DEPLOYMENT_NOT_FOUND. Update the image setting when the new domain is connected.
- Set `GOOGLE_SITE_VERIFICATION` to the HTML verification token supplied by Search Console, or verify through DNS (no code token needed). Never commit account credentials.
- HTTPS is handled by Vercel. When attaching the custom domain, select its primary hostname and redirect alternatives in Vercel; avoid app-level redirects that break localhost.

## Implemented / audited

- Every public page has a title, description, its own canonical, Open Graph and Twitter metadata.
- Sitemap includes public destination pages and four blog articles; redirects and design previews are omitted. No fabricated modification dates.
- Robots allows crawling, including preview routes so crawlers can see their intentional `noindex` tags.
- Organization/WebSite schema is shared; blog articles have BlogPosting schema without invented publication dates or personal authors.
- Informative images already have alt text; decorative marks and duplicate marquee images intentionally retain empty alt text.
- Existing routes and readable slugs are retained; article cards now use H3 below the related-stories H2.
- Navbar background now uses lossless WebP (5.6 MB → 2.1 MB); photographs already use Next Image optimization and responsive sizes. Full-resolution source artwork is retained.
- Hero shader motion pauses off screen, in hidden tabs and under reduced motion. Its dimensions stay fixed.
- Existing mobile fixes remain. A real iPhone Safari review and measured Core Web Vitals are still required; compilation cannot prove either.

## Verification

Run `npm run build`, `npx eslint src`, then `python3 scripts/audit-seo.py`.
For dynamic contact/join pages too, run `npm run start -- --port 3003` and `python3 scripts/audit-seo.py http://localhost:3003`.
The audit checks rendered H1 counts, canonical/description/indexability, image alt attributes, internal destinations and static-page fragment targets. It does not test external mailboxes, third-party links, interactive layout or rankings.
After deployment, inspect the canonical URL in Search Console and submit `/sitemap.xml`. Test representative pages with PageSpeed Insights, then monitor field Core Web Vitals in Search Console.

## Backlink work outside the codebase

1. Ask existing collaborators to link their relevant programme or partner pages to the Academy or partnership contact page.
2. Give campus chapters a short approved description and the correct Academy URL for their university pages.
3. Publish verified programme outcomes and useful learning resources that partners can reference. Review the current editorial drafts before promoting them.
4. Request event-host and speaker-profile links to the relevant events page.
5. Record the referring page, destination, owner and request date; review referral traffic and Search Console links monthly. Avoid buying links or mass directory submissions.

Reference: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
