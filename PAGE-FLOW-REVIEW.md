# BitQueens page and flow review — 6 October 2026

Scope: local implementation, all public sitemap routes and the new article template. This is a design/flow completion pass, not a deployment or a claim that operational content is approved.

## Implemented in this pass

| Page / flow | Finding | Result |
| --- | --- | --- |
| Blog | Navbar and homepage story cards led to missing pages | Editorial listing with topic filters, search, empty results and four article routes |
| Article | Missing reading and onward journeys | Reading layout, contents navigation, related stories, Academy / partnership next steps and unknown-slug recovery |
| Contact | Footer destination missing | General, partnership, event and speaker enquiries; query-string topic selection; direct email fallback |
| BIET / Foundation | Footer destinations missing | Honest coming-soon pages, planned scope, current status and Academy / Contact links |
| Conference | Interest CTA went to general community signup | Dedicated attend / sponsor / speak / volunteer interest form |
| Partnership CTAs | Some shared buttons could land on the learner view | Shared Button uses PartnerLink for partner-view destinations; partner enquiries go to Contact |
| Academy / Labs | Selected programme was lost at the form | Programme / product choices carry into cohort or quote fields; self-paced track links preselect Join |
| Homepage impact | Reported figures were hidden | Restored the shared impact band beneath the hero without repeating collaborator logos |
| Existing forms | Local timeout displayed received-style success; blur marked untouched fields invalid | Email-draft handoff with explicit manual-send instructions; field-specific blur validation; editable details retained |
| About | Undefined legacy colour tokens and nested main landmark | Current colour tokens and typefaces; readable group band; one main landmark; speaker booking CTA; future Ventures mention |
| Mobile navigation | Menu remained open after choosing a destination | Menu closes on navigation, home and Join clicks |
| Contact mobile | Enquiry headings inherited display size | Compact two-column enquiry overview |
| Footer | Brief's assets and updates routes absent | Wordmark downloads and labelled email-based updates request |
| Missing pages | Generic recovery | Branded 404 with homepage and ecosystem routes |

## Verification

- Production build, TypeScript, ESLint and diff whitespace checks passed.
- Browser route audit: homepage, Ecosystem, Academy, Innovations, Conference, About, Join, BIET, Foundation, Contact, Blog and all four articles opened at desktop width. All route links matched implemented destinations; same-page anchors existed; no horizontal overflow or nested main landmarks.
- Mobile audit at 390 x 844: the above page templates plus Brand Assets had one h1, no horizontal overflow and no broken loaded images. Full-page screenshots inspected for Contact, About, Blog and an article. Lazy images require entering their viewport before visual assessment.
- Blog: category filtering returned one AI story; unmatched search showed the empty state; reset restored all stories.
- Contact: invalid submission marked required fields; speaker selection changed the message prompt; partnership URL preselected its topic.
- Labs: AI Product Building enquiry preselected Skills programmes and retained the programme name in the message.
- Academy: AI for Work card preselected its cohort. Blurring an empty name marked that field alone; submission validated remaining required details.
- Navbar Partners link opened the partner audience. Mobile menu closed after navigation.
- No test emails were sent and no valid-data handoff was triggered during browser QA. No deployment performed.

## Still needs team content or service decisions

1. **Submission service:** forms now prepare email drafts, not server-side submissions. Direct website delivery, stored applications, acknowledgements, subscription management and team routing require a configured service. The current public general mailbox is used until departmental inboxes are confirmed.
2. **Editorial approval:** four article bodies are original review drafts. No publication dates, interviews or attributed quotes were invented. The Community title currently promises people-focused coverage; replace with real member stories or approve a more general title before publishing.
3. **Academy:** confirm the actual catalogue, durations, cohort names/dates, formats, prices and completion recognition. Learner stories are still empty; add real approved stories and mentor details when supplied.
4. **Labs:** confirm Chainelle / AI descriptions, catalogue, durations, pricing and product demonstrations or case studies. Prices remain on enquiry; no checkout was added.
5. **Conference:** confirm edition, date/location, speakers, agenda, tickets and sponsorship opportunities. Until then the page communicates that no edition is scheduled.
6. **Impact:** confirm the definitions and reporting periods behind 2,000+ women trained versus 500+ women supported. Keep founder and Academy metrics distinct where that is the intended meaning. Obtain usable light versions of detailed partner logos for the green proof panel.
7. **Institutional pages:** BIET and Foundation remain coming soon. Filing, registration, accreditation and giving availability must be confirmed before changing those states. No payment / donation flow is implied.
8. **Partner tiers:** no commercial tiers were invented. Add actual packages or outcomes when agreed; a separate Partners page is optional if those materials grow.
9. **Launch:** final content approval, operational form integration and deployment remain outstanding. Internal preview routes are development utilities, not public navigation destinations. Careers remains future scope in the brief.
