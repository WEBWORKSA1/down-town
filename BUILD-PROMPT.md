# Down.Town — Phase-wise Build Prompt

A complete, copy-paste prompt sequence for building **Down.Town** (down.town): a modern, interactive, responsive, AdSense-ready global guide to city centres whose main money engine is **lead generation for downtown space** (office, retail, coworking, event venues) and **relocation**. Each phase is a self-contained prompt. Run them in order; each one assumes the previous phases' output exists in the repo.

> Built and shipped as v2 on 29 October 2026. See `RESEARCH.md` for the 47-site competitive audit that shaped it, and `README.md` for operations.

---

## 0. The idea, and why it wins

**Domain:** Down.Town reads as "downtown", a generic English word with enormous long-tail search demand: "things to do downtown [city]", "downtown [city] apartments", "office space downtown [city]", "event venues downtown [city]", "parking downtown [city]".

**Positioning:** *Explore, live and find space in the world's downtowns.* One consistent guide per city, plus country-specific commercial-space guides, plus calculators, plus free introductions to vetted pros.

**Why this beats a pure travel guide.** Travel content brings volume but low value per visit. Commercial real estate brings fewer visits at far higher value. Down.Town uses travel content as the traffic engine and space/relocation as the revenue engine, all under one domain that fits both.

**Revenue model (illustrative scenario, not a forecast; every input is an assumption to replace with your own data):**

| Stream | Assumption at ~100k sessions/month | Monthly |
|---|---|---|
| AdSense (Auto ads) | 2 pages/session × blended page RPM $8–15 (US/CA/UK-weighted real-estate + travel) | $1.6k–3k |
| Residential leads | 1% of sessions request help → ~1,000; ~55% residential; sold or referred at ~$15–40 each, ~50% monetised | $4k–11k |
| Commercial space | ~25% of requests; tenant-rep brokers in many markets earn ~4–6% of aggregate lease value (5,000 sq ft × $50 × 5 yrs = $1.25M → $50–75k); a 15–25% referral share = $7.5k–18k per closed deal; 1–3 closes/month | $7.5k–54k |
| Event venues | ~12% of requests; 8–12% commission on bookings of $3k–10k; ~10 bookings | $2.4k–12k |
| Sponsorship, listings, reader support | City Partner slots, Dispatch sponsor, featured listings, pledges | $0.5k–5k |

**The point:** one closed office lease can out-earn a month of display ads. Build for leads; let AdSense be the base layer that pays for hosting and proves traffic.

**Gaps competitors leave (from RESEARCH.md):** no official downtown organisation offers a space or venue request form; no global brand owns "downtown" as a category; reader donations, contests and contributor hiring are rare in the category.

---

## Phase 1 — Competitive research (35+ sites)

```text
Research at least 35 world-class sites across three groups and write RESEARCH.md:
A) Official downtown organisations / BIDs / urbanism (e.g. downtownny.com, downtownla.com,
   downtownseattle.org, downtownaustin.com, loopchicago.com, downtowndenver.com, downtowndc.org,
   downtown.org (IDA), mainstreet.org, pps.org, strongtowns.org, downtownyonge.com,
   montrealcentreville.ca, nextcity.org).
B) City guides, events, travel, local news (timeout.com, atlasobscura.com, theinfatuation.com,
   secretnyc.co, lonelyplanet.com, eventbrite.com, feverup.com, getyourguide.com, tripadvisor.com,
   mtl.org, nyctourism.com, visitlondon.com, patch.com, afar.com, narcity.com).
C) Living data, real estate, commercial space, venues, moving, local lead gen (walkscore.com,
   niche.com, numbeo.com, nomads.com, apartments.com, zillow.com, loopnet.com, commercialcafe.com,
   officespace.com, instantoffices.com, peerspace.com, tagvenue.com, business.yelp.com,
   movebuddha.com, coworker.com).
For each: information architecture, standout features/tools, every lead form (fields in order,
steps, microcopy, CTA wording, consent text, post-submit flow), monetisation (ad density,
sponsorships, listing tiers, commissions), content depth and E-E-A-T signals, design patterns,
SEO/compliance elements. Finish with a feature matrix, a lead-generation blueprint, monetisation
benchmarks, design patterns to borrow, gaps Down.Town can fill and mistakes to avoid.
Attribute every specific to its source. Do not invent figures.
```

## Phase 2 — Information architecture and URL plan

```text
Design the IA for Down.Town around four "lines" (a transit-map metaphor), each with a colour:
- Explore (amber): /explore/ hub, /explore/<city>.html guides, explorer articles, /events.html,
  /videos.html, /rankings.html (Down.Town Index).
- Live (teal): /live/ hub and relocation articles.
- Find Space (violet): /space/ hub, /space/<city>.html commercial-space guides, tenant articles.
- Do Business (cobalt): /business/ hub and owner playbooks.
Plus Tools (red): /tools/ hub and 10 calculators. Plus conversion and trust pages:
/get-matched.html, /partners.html, /advertise.html, /list-your-business.html, /support.html,
/contests.html, /contest-rules.html, /careers.html, /about.html, /contact.html, /privacy.html,
/cookies.html, /terms.html, /disclaimer.html, /editorial-policy.html, /trademark.html,
/accessibility.html, /sitemap.html, /journal.html, /thank-you.html, /404.html,
plus /sitemap.xml, /feed.xml, /ads.txt, /robots.txt.
Start with 42 cities across six regions (North America weighted for ad value), each with a guide
AND a space page. Write the full list to _build/urls.txt; content may only link to these.
```

## Phase 3 — Design system

```text
Create a "wayfinding" design system in assets/css/site.css + v2.css:
- Tokens on :root for light and dark (prefers-color-scheme + [data-theme] toggle stored in
  localStorage): asphalt ink, surface, line colours amber/teal/violet/cobalt/red.
- Type: Archivo (variable width, UI and display) + Newsreader (reading serif) from Google Fonts.
- Components: route-line bullets, station lists, city tiles with generated SVG skylines (seeded
  per city, no photos, no copyright risk), cards with coloured top lines, score bars, intent tiles,
  tool cards, CTA bands, multi-step form elements (chips, tiles, progress bar), result panels,
  drawers, modals, sticky mobile CTA, cookie notice, search overlay, footer with all cities.
- Accessibility: WCAG 2.2 AA contrast, visible focus, skip link, reduced-motion support,
  keyboard-operable everything, 16px+ text, 44px targets, no horizontal scroll at 320px.
- Owner bar on top of every page: "Contact, if you are interested in this website / domain name /
  Sponsorship / Advertisement / Partnership" → https://web.works/contact
```

## Phase 4 — Technical architecture (GitHub Pages, free plan)

```text
Build a Jekyll site that GitHub Pages compiles for free (no plugins beyond the whitelist, no
build step on our side):
- _config.yml (url https://down.town, baseurl "", exclude _build).
- _data/cities.json (slug, name, country, region, district, lat/lng, eight 1–10 scores, index,
  tagline, compare pair, events, verified YouTube video), _data/tools.json, _data/sections.json.
- _layouts: default (shell), city, space, article.
- _includes: header, footer, newsletter, overlays (consent, search, saved drawer, exit modal,
  sticky CTA), crumbs (+BreadcrumbList), faq (+FAQPage), schema (Organization, WebSite,
  Article), cta (move/space/venue/business/support), rail-lead, intent-grid, tool-card, video,
  scores, more-cities, city-tile, ad.
- Liquid-generated assets: sitemap.xml, feed.xml, assets/js/search-index.js,
  assets/js/cities-data.js — so adding a city or article needs no manual index updates.
- Root-relative links; CNAME = down.town.
- _build/ tooling (Node): render.js (local Jekyll-compatible preview with liquidjs), lint.js
  (front matter, allowed Liquid, HTML balance, internal links, word counts, banned strings),
  merge-cities.js (data + per-city sidecars + events parsed from each guide), CONTENT-SPEC.md.
```

## Phase 5 — Templates and hubs

```text
Build:
- Home: hero with search + "What brings you downtown?" intent grid (7 request types + "I'm a pro"),
  four-line pillars, featured city tiles, Find Space money band with honest KPIs, Index top 5,
  tools, "Downtown this month" (events filtered client-side by month), videos, journal picks,
  get-involved cards (contests, support, partners, careers).
- City layout: dark hero with skyline, facts, actions (Get matched, Office & shop space, Compare,
  Save, Share); article body; "How we research" note; FAQ; Index scores; space teaser; nearby
  cities; support CTA; sticky sidebar with TOC, multi-intent lead form, City Partner slot, ad.
- Space layout: violet hero, quick intent links, body, "How this works" disclosure, FAQ, other
  cities; sidebar lead form preset to office + coworking tool card.
- Article layout: page head with byline, updated date, read time, Save; prose; FAQ; related;
  support CTA; sidebar tool card + lead form matched to section.
- Hubs driven by Liquid from site.pages and _data: Explore directory (filter, region chips, sort,
  on-demand Leaflet/OSM map), Space hub, Live, Business, Tools, Journal, Events (filterable table
  + submit form), Videos (region filter + explainers), Index (sortable table), Sitemap.
```

## Phase 6 — Content production

```text
Follow _build/CONTENT-SPEC.md for every page:
- City guides (>= 1,200 words): In 30 seconds; Need to know table; districts; landmarks;
  a perfect day; eat and drink; see it on foot (video); getting around; where to stay; living
  downtown (+move CTA); doing business (+space CTA, link to space page); signature events; seasons;
  safety; local tips; 5 FAQs.
- Space pages (>= 950 words): office sub-districts; retail and restaurant corridors; coworking;
  how commercial leases work in that country (table: term, how rent is quoted, building costs,
  deposit, fit-out, taxes); getting your team there; what to check before you sign; events and
  venues; is downtown the right base; 4–5 FAQs.
- Articles (>= 1,100 words): Find Space (office sizing, tenant reps, coworking vs lease,
  restaurant space, event venues, relocation timeline, subleases, negotiating rent), Live
  (relocating for a job, rental agents, buying a condo, building checks, move checklist, costs,
  car-free, kids, sleep), Business (lease terms, funding, storefronts, pop-ups, foot traffic,
  events), Explore (photography, free things, a downtown in a day).
House rules: accuracy over colour; no invented statistics, prices, quotes, people or testimonials;
no named private businesses; annual events by month or season only; root-relative links only;
British/Canadian spelling; disclose referral relationships. Verify every YouTube video through
oEmbed before embedding. Lint every file.
```

## Phase 7 — Lead generation system (the money engine)

```text
Build a dedicated, highly converting Get Matched funnel (get-matched.html + assets/js/funnel.js):
1. Intent tiles first (one tap, auto-advance): Rent a home, Buy a home, Office space, Retail or
   restaurant, Coworking, Event venue, Relocate a team.
2. Where: city select (all cities + "Another city"), preferred area; origin city for relocations.
3. Branching details: bedrooms/budget/household/must-haves; headcount/work pattern/lease length/
   size/must-haves; use type/size/kitchen needs; desks/type/term; event type/guests/date
   (+flexible)/layout/catering/budget; services for relocation. Timeline for all.
4. Value before contact: a computed estimate (office area range, income rule, down payment and
   closing costs, room size and cost per guest, occupancy-cost rule) + a summary.
5. Contact: first name and email required; phone, company optional; preferred channel; notes;
   explicit partner-sharing consent (required) and a separate, unticked newsletter opt-in.
6. Done screen + optional qualifiers (call or email; up to three time windows) sent as a follow-up.
Also: URL prefill (need, city, team, guests, desks, budget), localStorage resume + Start over,
lead score and A/B/C tier, first-touch UTM/referrer/landing/device on every form, subject lines
like "Down.Town | Lead A | Office space | Toronto | Name".
Supporting capture: sidebar multi-intent form on every guide, CTA bands inside content, tools
whose results link into the funnel with values prefilled, exit-intent modal (desktop only, weekly
cap, never after a request), sticky mobile CTA, intent grid on the home page and 404.
Supply side: /partners.html (brokers, coworking operators, venues, rental agents, realtors,
movers) with referral-share, pay-per-introduction and City Exclusive models and an application.
Microcopy: "Free for you", "Up to 3 introductions", "Shared only with your consent",
"No obligation", "We review every request by hand within one business day".
```

## Phase 8 — Monetisation beyond leads

```text
- AdSense: publisher script in <head> of every content page (not on thank-you, 404 or the funnel),
  google-adsense-account meta, ads.txt with "google.com, pub-6620975821265271, DIRECT,
  f08c47fec0942fa0"; Auto ads first; optional manual units via ad zones that render only when slot
  IDs are configured in assets/js/config.js.
- YouTube: lite embeds (privacy-enhanced player, load on click) on every city guide and the videos
  page; credit the channel.
- Sponsorship: City Partner per guide, Find Space sponsor per city, Dispatch sponsor, contest/
  category sponsor, strategic partner; media-kit request form; "Sponsored" labelling.
- Listings: Basic (free) / Featured / Spotlight with a review standard.
- Donations (/support.html): one-time/monthly toggle, six tiers, designation (needed most,
  operations, promotion and marketing, hiring contributors, contests and prizes, new cities),
  planned allocation bar, honest goals (no fake progress), pledge form; instant checkout buttons
  appear when PayPal / Stripe / Buy Me a Coffee / Ko-fi links are added to config.js.
- Contests: Downtown Lens photo contest (5 categories) + Best Block Awards; entry, nomination and
  prize-sponsor forms; full official rules (skill-based judging, no purchase necessary, Canadian
  skill-testing question, Quebec RACJ clause, licence to entries).
- Careers: city editors, writers, photographers/videographers, city ambassadors, commission-based
  partnerships lead, developer; application form.
```

## Phase 9 — Compliance (AdSense, privacy, IP)

```text
- AdSense readiness: substantial original content on every indexable page; clear navigation;
  About, Contact, Privacy (Google advertising cookie disclosures and opt-out links), Terms,
  Cookies, Disclaimer, Editorial policy; no ads on thin or utility pages; no deceptive placements;
  site served on the root domain over HTTPS; Google's certified consent message for EEA/UK/CH.
- Privacy: a #leads section on what is shared, with whom, on what basis, retention and withdrawal;
  GDPR/UK GDPR, PIPEDA and Quebec Law 25, CCPA/CPRA wording; no selling of personal information.
- Email: the site inbox never appears in HTML or text. Forms post through FormSubmit's AJAX
  endpoint with the address assembled at runtime from encoded fragments (or the FormSubmit alias
  once issued); "email us" links use data-mail and build the mailto at click time.
- Trademark & copyright: "downtown" used descriptively; no affiliation with any organisation whose
  name contains the word; nominative use of city, landmark and event names; third-party marks and
  videos belong to their owners; notice-and-takedown route; original work © Down.Town.
```

## Phase 10 — SEO and performance

```text
- Unique title (<= 70 chars) and meta description (120–160) per page; canonical to https://down.town.
- Structured data: Organization, WebSite + SearchAction, BreadcrumbList, Article (with Place geo
  for city/space pages), FAQPage, WebApplication for tools.
- Liquid sitemap.xml (priority by template) and RSS feed.xml; robots.txt with sitemap; HTML sitemap.
- Internal linking: city ↔ space page ↔ articles ↔ tools; nearby cities; footer list of all cities.
- Performance: no framework, one CSS bundle per layer, scripts loaded per page type, Leaflet and
  YouTube only on demand, system-font fallbacks, SVG artwork.
```

## Phase 11 — QA

```text
Run node _build/merge-cities.js, node _build/lint.js --all and node _build/render.js; then check:
every internal link resolves; no "{{" or "{%" leaks into output; no email address anywhere in the
built site; funnel end-to-end with the relay stubbed (branching, estimate, consent gate, payload
fields, score, follow-up); calculators produce sane numbers; screenshots at 1280px and 390px for
home, a city, a space page, get-matched, a tool, support; no horizontal overflow; dark mode;
keyboard navigation; Lighthouse-style checks.
```

## Phase 12 — Deploy

```text
1. Push to github.com/WEBWORKSA1/down-town (main). GitHub Pages: Settings → Pages → Deploy from
   branch → main / root. Keep CNAME = down.town.
2. DNS at the registrar: A @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153;
   AAAA @ → 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153;
   CNAME www → webworksa1.github.io. Tick "Enforce HTTPS" once the certificate is issued.
3. Submit one test form; click FormSubmit's one-time activation link in the site inbox; paste the
   alias string it issues into SITE.relayAlias in assets/js/config.js.
4. AdSense → Sites → add down.town → request review. Privacy & messaging → enable the EEA/UK
   consent message. Search Console: verify the domain and submit /sitemap.xml.
```

## Phase 13 — Growth roadmap

```text
- Recruit 3 partners per category in the top 10 cities before scaling traffic (supply first).
- Add 20 more downtowns (data + guide + space page each, linted), then neighbourhood pages for the
  top cities (e.g. /space/toronto/financial-district.html).
- "Office space in downtown X" and "event venues in downtown X" landing variants with tool embeds.
- Route pages for relocation ("Moving from Chicago to downtown Toronto") using the moving-cost tool.
- A quarterly Downtown Dashboard: cross-city metrics from official sources, credited, downloadable.
- Move lead storage to Supabase with a small partner portal (accept/decline, outcomes) when
  volume justifies it; keep the static site on Pages.
- Affiliate blocks (hotels, tours, coworking day passes) with clear disclosure, config-driven.
- Translate the top city guides (French for Montréal/Paris, Spanish for Barcelona/Mexico City).
```
