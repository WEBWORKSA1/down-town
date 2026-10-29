# Down.Town content spec (v2)

Every content page is a Jekyll page: YAML front matter, then an HTML body. The **layout** renders the hero, h1, breadcrumbs, sidebar lead form, Index scores, FAQ block, schema and related links. The body holds only the editorial content.

Run the linter on every file you write: `node _build/lint.js path/to/file.html` from the repo root (`/home/claude/v2`). It must print `OK`.

## House rules (non-negotiable)

1. **Voice.** "Down.Town editors" — clear, specific, useful, a little wry. Second person ("you") for advice. British/Canadian spelling (centre, neighbourhood, organise, metre), except proper nouns (World Trade Center).
2. **Accuracy over colour.** Use stable, verifiable facts: districts, landmarks, transit lines and agencies, airports, currencies, climate patterns, legal and lease conventions. If you are not sure a fact is true and current, leave it out. Never invent statistics, rankings, prices, dates or quotes.
3. **No specific prices or rents.** Describe cost relatively ("the priciest office core in Canada", "a premium over older towers"). The tools on the site do the maths.
4. **No named private businesses.** Do not name restaurants, bars, shops, hotels, brokers, developers, coworking brands or landlords. Public landmarks, civic markets, museums, universities, parks, stadiums, government bodies and transit agencies are fine. No trademark-style claims; descriptive use only.
5. **No fabricated people or experiences.** No testimonials, reviews, invented anecdotes, "I visited", fake quotes or made-up experts.
6. **Annual events:** name real recurring events with the usual month or season only ("Late June"), never a specific date.
7. **Links:** root-relative only (`/space/tokyo.html`), and only to pages listed in `_build/urls.txt` or `/explore/<slug>.html` / `/space/<slug>.html` for slugs in `_data/cities.json`. No external links in bodies. Never use mailto links or write any email address.
8. **Allowed HTML:** `p h2 h3 ul ol li strong em a b table tbody thead tr th td div span`. Allowed classes: `card`, `prose`, `area-list`, `landmarks`, `events`, `when`, `callout`, `list-check`, `small`, `muted`. No `<h1>`, no inline scripts, no images.
9. **Allowed Liquid (the only `{% %}` permitted):**
   - `{% include ad.html %}` — an ad break. Use 2 or 3 per page, never two in a row, never in the first 300 words.
   - `{% include cta.html kind="move" %}` — "moving here?" lead band. Kinds: `move`, `space`, `venue`, `business`, `support`.
   - `{% include video.html %}` — city guides only, exactly once, after the "See it on foot" intro line. It renders the city's video from data (renders nothing if the city has none).
   - `{% include tool-card.html tool="office-space" %}` — a tool promo. Tool slugs: `office-space`, `coworking-vs-lease`, `venue-budget`, `moving-cost`, `rent-vs-buy`, `rent-budget`, `car-free`, `storefront-revenue`, `compare`, `downtown-match`.
10. **YAML:** double-quote every string value. Escape inner double quotes as `\"`. `updated: "2026-10-29"`.

---

## A. City guide — `explore/<slug>.html` (layout `city`), body >= 1,200 words

Front matter:

```yaml
---
layout: city
title: "Downtown Seoul Guide: Districts, Landmarks, Living & Business"
description: "Downtown Seoul (Jung-gu & Jongno): where to go, what to eat, how to get around, living costs and doing business. Updated October 2026."
city: seoul
section: explore
updated: "2026-10-29"
faq:
  - q: "What is the best area to stay in downtown Seoul?"
    a: "Two or three sentences."
  # 5 questions total: best area to stay, getting around, best time to visit, is it a good place to live, one city-specific question
---
```

Body, in this order:

```html
<div class="card" style="border-left:6px solid var(--amber)"><h2 style="font-size:1.2rem">In 30 seconds</h2><ul class="list-check" style="--lc:var(--amber)"><li>Best for: ...</li><li>...</li><li>...</li></ul></div>
<div class="prose" style="margin-top:1.4rem">
<p>Intro paragraph 1: what and where "downtown" is in this city.</p><p>Intro paragraph 2: what makes it work or not.</p>
<h2>Need to know</h2>
<table><tbody><tr><th>Currency</th><td>...</td></tr><tr><th>Language</th><td>...</td></tr><tr><th>Airports</th><td>...</td></tr><tr><th>Pay for transit</th><td>...</td></tr><tr><th>Good months</th><td>...</td></tr><tr><th>Time zone</th><td>...</td></tr><tr><th>Emergency number</th><td>...</td></tr><tr><th>Tipping</th><td>...</td></tr></tbody></table>
<h2>The districts</h2>
<div class="area-list"><div><b>District name</b>One or two sentences.</div> ... 4 to 6 districts ...</div>
{% include ad.html %}
<h2>Landmarks worth your time</h2>
<ul class="landmarks"><li><strong>Landmark.</strong> One or two useful sentences.</li> ... 6 to 8 ...</ul>
<h2>A perfect day downtown</h2>
<p>Morning ... </p><p>Afternoon ...</p><p>Evening ...</p>
<h2>Eat and drink</h2>
<p>Two paragraphs: food culture, markets and food halls, what to try, how to eat well cheaply. No restaurant names.</p>
<h2>See it on foot</h2><p>Take a virtual walk through downtown X before you go.</p>{% include video.html %}
<h2>Getting around</h2>
<p>Two paragraphs: lines and agencies, airport links, walking, cycling, driving and parking reality.</p>
<h2>Where to stay</h2>
<p>By area and trip type; no hotel names.</p>
<h2>Living downtown</h2>
<p>Two paragraphs: housing stock, leasing norms in this country, who it suits.</p>
{% include cta.html kind="move" %}
<h2>Doing business downtown</h2>
<p>Two paragraphs: the office cores, the industries, retail streets. End with a link: <a href="/space/<slug>.html">Office and commercial space in downtown X</a>.</p>
{% include cta.html kind="space" %}
<h2>Signature events</h2>
<div class="events"><div><span class="when">Late June</span><span><strong>Event name</strong> — One sentence.</span></div> ... 3 or 4 ...</div>
<p class="small muted">Dates move from year to year. Check the organiser's official site before booking travel.</p>
<h2>Seasons and weather</h2>
<p>What each season is like downtown and what to pack.</p>
<h2>Safety and practicalities</h2>
<p>Balanced, practical: pickpocket hot spots, late-night transit, heat/cold, accessibility, connectivity. No fear-mongering.</p>
<h2>Local tips</h2>
<ul><li>4 to 6 tips</li></ul>
{% include ad.html %}
</div>
```

**Expanding an existing guide (v1 cities):** keep every existing section and its facts (light copy-editing is fine), then add the missing sections from the list above (A perfect day downtown, Where to stay, Seasons and weather, Safety and practicalities, extra Need-to-know rows, the `/space/<slug>.html` link) and deepen thin sections until the body is >= 1,200 words. Keep the existing `faq` and add one more question (5 total). Keep the existing includes.

## B. Commercial space page — `space/<slug>.html` (layout `space`), body >= 950 words

Front matter:

```yaml
---
layout: space
title: "Office & Commercial Space in Downtown Seoul: Districts, Leases & What to Check"
description: "Where the offices, shopfronts and coworking floors are in downtown Seoul, how commercial leases work in South Korea, and what to check before you sign."
city: seoul
section: space
updated: "2026-10-29"
faq:
  - q: "Where are the main office districts in downtown Seoul?"
    a: "..."
  # 4 or 5 questions: main office districts, how long leases run / how rent is quoted, coworking or flexible options, retail/restaurant considerations, one city-specific question
---
```

Body, in this order:

```html
<div class="card" style="border-left:6px solid var(--violet)"><h2 style="font-size:1.2rem">In 30 seconds</h2><ul class="list-check" style="--lc:var(--violet)"><li>Who it suits ...</li><li>The main office cores ...</li><li>The one lease quirk to know ...</li></ul></div>
<div class="prose" style="margin-top:1.4rem">
<p>Intro 1: the commercial geography of the city centre.</p><p>Intro 2: the market's character (tenant mix, building age, demand drivers) without numbers.</p>
<h2>Where the offices are</h2>
<div class="area-list"><div><b>Sub-district</b>Tenant mix, building stock, transit, who should look here.</div> ... 4 to 6 ...</div>
{% include tool-card.html tool="office-space" %}
<h2>Retail and restaurant corridors</h2>
<p>Main shopping streets and food corridors, footfall patterns by day/week, what kinds of tenants thrive.</p>
<h2>Coworking and flexible space</h2>
<p>Where flexible operators cluster, who they suit, typical terms (monthly, desk vs private office) — generic, no brand names.</p>
{% include ad.html %}
<h2>How commercial leases work here</h2>
<p>One or two paragraphs on this country's conventions.</p>
<table><tbody><tr><th>Typical office lease</th><td>e.g. 3–5 years; 10+ for large floors</td></tr><tr><th>Rent is quoted</th><td>e.g. per square foot per year / per m² per month / per tsubo</td></tr><tr><th>Building costs</th><td>gross / net / triple-net / service charge — who pays what</td></tr><tr><th>Deposit</th><td>typical norms</td></tr><tr><th>Fit-out</th><td>who usually pays; incentives</td></tr><tr><th>Taxes</th><td>e.g. VAT/GST/HST/consumption tax on rent, business rates</td></tr></tbody></table>
<p class="small muted">Conventions vary by building and landlord. Treat this as orientation, not legal advice, and have a local lawyer review any lease.</p>
<h2>Getting your team there</h2>
<p>Commuter rail, metro, bus, cycling, parking for staff and visitors; which sub-districts are easiest to reach.</p>
<h2>What to check before you sign</h2>
<ul><li>5 to 7 checks specific to this downtown (e.g. seismic rating, flood zones, heritage restrictions, after-hours HVAC, loading access, signage rules, permits)</li></ul>
{% include cta.html kind="space" %}
<h2>Hosting events downtown</h2>
<p>Venue types (convention centre, hotel ballrooms, historic halls, rooftops, galleries, waterfront), seasonality, permits for public space.</p>
{% include cta.html kind="venue" %}
<h2>Is downtown the right base?</h2>
<p>A closing paragraph weighing downtown against the city's other business districts, with a link to <a href="/explore/<slug>.html">the downtown X guide</a>.</p>
{% include ad.html %}
</div>
```

Get the lease conventions right for each country (e.g. UK: service charge and business rates, 5–10 year terms with break clauses; Canada: net leases plus additional rent/TMI, HST/GST/QST; US: full-service gross vs NNN, rent per sq ft per year; Japan: large deposits (often 6–12 months for offices), per-tsubo pricing, consumption tax; Australia: GST, outgoings; UAE: Ejari registration in Dubai, annual rent often paid in cheques; India: leave-and-licence agreements, security deposits, stamp duty and registration; Singapore: GST, URA approvals; Hong Kong: rates and management fees, stamp duty). If unsure of a specific convention, describe it more generally.

## C. Article — `<section>/<slug>.html` (layout `article`), body >= 1,100 words

```yaml
---
layout: article
title: "How Much Office Space Do You Need? A Per-Person Guide"
description: "120-160 characters."
section: space            # space | live | business | explore
lede: "One or two sentences shown under the title."
updated: "2026-10-29"
tool: office-space        # optional: a tool slug from the list above, promoted in the sidebar
related:                  # 3 root-relative URLs from _build/urls.txt
  - "/space/negotiating-office-rent.html"
  - "/space/coworking-vs-private-office-vs-lease.html"
  - "/tools/office-space.html"
faq:                      # optional, 3-5 items
  - q: "..."
    a: "..."
---
```

Body: plain prose HTML (no wrapper div; the layout wraps it in `.prose`). Use `<h2>` sections (5 to 9), `<h3>` subsections where useful, lists, at least one `<table>` or `<div class="callout"><h4>Title</h4><p>...</p></div>`, two `{% include ad.html %}`, and one `{% include cta.html kind="..." %}` matching the topic. Practical, specific, decision-oriented. General figures that are standard rules of thumb (e.g. "planners often use 125–225 square feet per person") are fine when presented as rules of thumb; otherwise no statistics.

## D. City sidecar — `_build/sidecars/<slug>.json`

Only for the cities you are told to provide one for:

```json
{"tagline": "One evocative sentence used under the city name (new cities only).",
 "events": [{"when": "Late June", "name": "Event", "desc": "One sentence."}],
 "video": {"id": "11-char YouTube id", "title": "Exact video title", "channel": "Channel name"}}
```

- `tagline` and `events` (3 or 4, matching the guide) are required for **new** cities only.
- `video`: find a real walking-tour (or similar) video of that city's downtown on YouTube with WebSearch, then **verify** it by fetching `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json` with WebFetch. Use the title and author_name it returns. If you cannot verify one, omit `video` — never guess an ID.
