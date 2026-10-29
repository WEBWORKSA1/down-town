# Down.Town competitive research

**Date:** 29 October 2026
**Sites audited:** 47 (Group A: 15 · Group B: 16 · Group C: 16)

**Method.** Each site's homepage and one to six inner pages were fetched as text with a web fetcher. The network proxy blocked direct curl requests, so no raw HTML or CSS was inspected. The fetcher strips CSS, so visual details (layout, colour, type) are partly inferred from page structure, asset filenames and `theme-color` meta tags. Hex values are quoted only where they were exposed. JavaScript-rendered elements were often missing from the captures, including quote modals, ad slots and cookie banners. "Not captured" therefore means unseen, not absent, and ad counts are lower bounds. Where a form was JS-only, its mechanics come from the vendor's help pages or a trade write-up, and these are marked as secondary. Blocked originals were replaced with comparable sites, listed under the table.

---

## 1. Sites audited

| # | Site | URL | Category | What it is | Notable pages visited |
|---|---|---|---|---|---|
| 1 | Downtown Alliance | downtownny.com | A · BID (New York) | Lower Manhattan BID: services, research, visitor info | Home; Do Business (Quick Facts, Development Map, Incentives) |
| 2 | DTLA Alliance | downtownla.com | A · BID (Los Angeles) | Visitor, resident and business portal for the Downtown Center BID | Home; Subscribe; Submit An Event; Office Space Guide; Residential Buildings |
| 3 | Downtown Seattle Association | downtownseattle.org | A · Membership org + MID | Membership nonprofit running the Metropolitan Improvement District | Home; Downtown Dashboard; Sponsorship |
| 4 | Downtown Austin Alliance | downtownaustin.com | A · PID manager | Downtown nonprofit with a Foundation and the "XOXO" consumer sub-brand | Home; Downtown Dashboard |
| 5 | Chicago Loop Alliance | loopchicago.com | A · District org (SSA) | Loop business and cultural district organisation | Home; Loop Deals; Members; Sponsorship |
| 6 | Downtown Denver Partnership | downtowndenver.com | A · Membership + BID/GID | Private-sector downtown champion | Home (partial); Membership; Market Information |
| 7 | DowntownDC BID | downtowndc.org | A · BID (Washington) | BID for 140 blocks, with a donation-taking Foundation | Home; Directory; Itineraries; Meeting & Event Venues; Submit Your Event |
| 8 | International Downtown Association | downtown.org | A · Industry association | Global association for place-management professionals (**substitute**) | Home; Join |
| 9 | ATCM | atcm.org | A · Industry association (UK/IE) | Town-centre management body (**supplementary**) | Home |
| 10 | Main Street America | mainstreet.org | A · National network | Network of 1,600+ downtown and commercial-district coalitions | Home; Subscribe; Join |
| 11 | Project for Public Spaces | pps.org | A · Placemaking nonprofit | Placemaking consultancy and programmes since 1975 | Home; Services; Subscribe |
| 12 | Strong Towns | strongtowns.org | A · Urbanism movement | Member-powered 501(c)(3) on financially resilient places | Home; Membership and donate |
| 13 | Downtown Yonge BIA | downtownyonge.com | A · BIA (Toronto) | Not-for-profit BIA with 2,000+ member businesses | Home; Sponsor an Event form; Submit your Business form |
| 14 | Montréal centre-ville | montrealcentreville.ca | A · SDC (Montréal) | Bilingual downtown business association | Home; Quoi faire; Données clés |
| 15 | Next City | nextcity.org | A · Urbanism publication | Nonprofit solutions journalism on cities (**substitute**) | Home; Membership form; Jobs |
| 16 | Time Out | timeout.com | B · Global city media | City-culture brand with per-city editions in ~10 languages | Home; NYC "100 best things"; Montreal Things to Do hub; NYC newsletter |
| 17 | Atlas Obscura | atlasobscura.com | B · Discovery / UGC | Crowd-sourced atlas of 24,000+ unusual places | Home; Montreal city page (partial); Habitat 67 place page (partial) |
| 18 | The Infatuation | theinfatuation.com | B · Restaurant guide | Reviews and guides in ~190 cities; JPMorgan Chase-owned | Home; Montreal best-restaurants guide; review page |
| 19 | Secret NYC | secretnyc.co | B · City discovery | Fever-owned Secret Media city site | Home; "This weekend" article |
| 20 | Narcity Media | narcity.com/montreal; mtlblog.com | B · City lifestyle | City listicle publishers (**substitute**) | Narcity Montreal hub; MTL Blog weekend article |
| 21 | Culture Trip | theculturetrip.com | B · Travel editorial | Travel publisher, used as a partial extra | "Things to Do in Downtown Montreal" (partial) |
| 22 | Afar | afar.com | B · Travel magazine | Premium travel magazine and B Corp (**substitute**) | Home; Best restaurants in Montreal |
| 23 | Lonely Planet | lonelyplanet.com | B · Travel guides | Guidebook brand with bookable trips and an app | Home; Montréal hub; "12 Best Things to Do" article |
| 24 | Eventbrite | eventbrite.com | B · Ticketing marketplace | Self-serve ticketing and event discovery | Home; Montreal events |
| 25 | Fever | feverup.com | B · Experiences marketplace | Ticketing plus first-party experiences (Candlelight) | Home; Montreal city page; Candlelight event page |
| 26 | GetYourGuide | getyourguide.com | B · OTA | Tours and activities marketplace | Home (sparse); Downtown Montreal page; Montreal (sparse) |
| 27 | Tripadvisor | tripadvisor.com | B · Reviews + booking | Review platform with Viator experiences booking | Home; Montreal attractions |
| 28 | Tourisme Montréal | mtl.org | B · DMO | Official destination marketing organisation; sells Passeport MTL | Home; Guidatour partner listing |
| 29 | NYC Tourism + Conventions | nyctourism.com | B · DMO | New York City's official DMO | Home; Midtown neighbourhood page |
| 30 | Visit London | visitlondon.com | B · DMO | Official visitor site run by London & Partners | Home; Things to do; What's on; This weekend |
| 31 | Patch | patch.com | B · Hyperlocal news | 1,000+ community news sites with self-serve local ads | Home; Midtown community page; article |
| 32 | Walk Score | walkscore.com | C · Living data | Walk, transit and bike scores; Redfin-owned | Home; New York; Professional pricing |
| 33 | Niche | niche.com | C · Living data | Grades for schools and places to live | Home; Austin place page |
| 34 | Numbeo | numbeo.com | C · Living data | Crowdsourced cost-of-living database | Home; Toronto |
| 35 | Nomads.com | nomads.com | C · Living data / community | City scores and paid community for remote workers | Home; Lisbon; Pricing |
| 36 | Apartments.com | apartments.com | C · Rentals | CoStar's US rental marketplace | Home; Chicago; property page; ad packages |
| 37 | Zillow | zillow.com | C · Residential | US residential portal (buy, rent, sell, loans, agents) | Home; Rental Manager; Premier Agent buyer-contact; Flex pricing |
| 38 | LoopNet | loopnet.com | C · Commercial real estate | CoStar's commercial real estate marketplace | Home; listing page; Marketing Center tier doc |
| 39 | OfficeSpace.com | officespace.com | C · Office space | Office-only marketplace (**substitute**) | Home |
| 40 | Showcase | showcase.com | C · Commercial real estate | CoStar's secondary commercial portal (**substitute**) | Home |
| 41 | CommercialCafe | commercialcafe.com | C · Commercial real estate / coworking | Yardi's commercial and coworking listings | Home; NYC office; Office Space Calculator |
| 42 | Instant Offices | instantoffices.com | C · Flex-office brokerage | Flexible-workspace broker, free to tenants | Home; NYC city page; centre page; "What do you need" guide |
| 43 | Peerspace | peerspace.com | C · Venue marketplace | Hourly venues, studios and meeting rooms | Home; LA photo studios; listing page; fees overview |
| 44 | Tagvenue | tagvenue.com | C · Venue marketplace | Venue-hire marketplace in 6 countries | Home; London party venues; room page; Join; venue FAQ |
| 45 | Yelp for Business | business.yelp.com | C · Local-business lead gen | Yelp's B2B acquisition site (**substitute**) | Home; Business Page product page |
| 46 | moveBuddha | movebuddha.com | C · Moving lead gen | Moving cost comparison and quote marketplace | Home; cost calculator; Chicago→Boston route; paid landing page |
| 47 | Coworker | coworker.com | C · Coworking marketplace | Coworking marketplace (The Instant Group) | Home; London; space page; Pricing; Premium plans |

**Blocked originals and substitutions**
- **ida-downtown.org:** robots-blocked. Audited the association's current domain, downtown.org, and added ATCM as a supplementary comparable.
- **bloomberg.com/citylab:** returned only stale 2020-era headlines, too little to audit. Replaced with Next City.
- **thrillist.com:** blocked, and so was eater.com, the first alternative. Replaced with Narcity Media.
- **cntraveler.com:** blocked. Replaced with Afar.
- **crexi.com:** error on every URL. Replaced with OfficeSpace.com and Showcase. The Crexi figures cited here come from a secondary source (SharpLaunch).
- **yelp.com and biz.yelp.com:** robots-blocked. Used business.yelp.com. The Request a Quote mechanics come from Search Engine Land.
- **Individual pages that failed:**
  - Loop "Neighborhood Needs"
  - GetYourGuide New York
  - Visit London "best things to do"
  - Niche rankings search
  - Numbeo Premium/API
  - LoopNet search results
  - Instant Offices contact
  - Peerspace New York events
  - Yelp Request a Quote

---

## 2. What the category does well

### Group A: official downtown organisations, BIDs and urbanism

- **The navigation is split by audience.** DTLA uses Things to Do / Living Downtown / Do Business Here. Loop uses Experience / Live Here / Do Business, and the Downtown Alliance (DTNY) uses Explore / Do Business. Montréal centre-ville adds persona hubs: Visiteur, Travailleur, Étudiant, Résident.
- **Data products are benchmarked to 2019.** Seattle's monthly Downtown Dashboard puts visitors at 103% and hotel demand at 108% of 2019. It cites Placer.ai, STR and CoStar, offers a PDF and asks users to credit it. Austin and Denver also publish monthly dashboards.
- **Event submission comes with clear rules.** DTLA's form has 32 categories, a recurrence builder and a required photo (5 MB maximum), and promises approval in 2–3 business days. DowntownDC adds an event-price field and a district-boundary rule.
- **Directories are faceted.** DowntownDC combines 15 categories with 5 amenity filters and 4 accessibility filters.
- **Itineraries sit alongside segmented email.** DowntownDC offers 12 mood-based itineraries, and DTLA has an Art Trail and a Coffee Trail. DTLA's newsletter has 5 opt-in lists, including "The 9-to-5ish" for downtown workers.
- **Sponsorship is sold on audience size.** Seattle names its event audiences (Annual Meeting: 300+ businesses; Summer Sounds: ~10,000 attendees). Loop says its State Street programme "reaches over one million State Street visitors each week". Downtown Yonge takes sponsor requests through a form.
- **Revenue and engagement follow the mission.** Loop and DowntownDC run foundations, and Strong Towns membership has no minimum gift. Main Street America runs awards and a pitch competition worth up to $10,000, and ATCM runs a national towns competition. Loop and DowntownDC show live weather and the local time in the header.

### Group B: city guides, events, travel and local news

- **List items follow a fixed structure.** Time Out labels every entry What is it / Why go / Don't miss / Our take and adds a "price N of 4" scale. Lonely Planet uses When to go / Getting there / Pair with. MTL Blog uses Price / When / Address / Why You Need To Go.
- **Evergreen time-scoped URLs are re-dated each week**, with the date range in the H1 (Secret NYC, Visit London). Fever runs Today and This Week pages.
- **Programmatic geo × category hubs show counts.** Examples: Tripadvisor's "Walking Tours (172)", NYC Tourism's counted facets, Eventbrite's city grids and The Infatuation's footer of ~190 cities.
- **E-E-A-T signals are visible.** Time Out has a methodology box and an "Our take" signed by an editor. Lonely Planet's bios state each author's local tenure, and its summaries are labelled "Summarized by AI". Patch shows a verified-staff badge with posted and updated times.
- **Booking sits inside the editorial.** The Infatuation embeds OpenTable and Resy widgets. Atlas Obscura runs "In partnership with KAYAK / GetYourGuide" modules.
- **Newsletters lead with an incentive, and local businesses can self-serve.** The hooks: Time Out's "enjoy your city without spending a thing", Afar's "Join more than a million…" and Patch's "Sign up for your community". Patch also sells featured businesses, promoted events and classifieds.
- **Save features, FAQs and chips are common.** Saves: The Infatuation's "Save spot" and Eventbrite's "Save this event". FAQs: 8 on a Visit London weekend article and 12 on a Fever event page. Chips: Fever's vibe chips and Secret NYC's time and budget chips.

### Group C: living data, real estate, space, venues, moving and local lead gen

- **A score is the hook, and it ends in a CTA.** Walk Score's score badges lead to listings. Niche's 12-category report card compares each place with national figures.
- **Data is compared with a reference city and dated.** Numbeo writes "Toronto is 38.4% less expensive than New York" and shows "Last update: 28 October 2026" with contributor counts.
- **Value comes before contact.** moveBuddha shows price ranges first, with "No email or phone required."
- **Forms are clean.** Apartments.com requires First, Last and Email and makes Phone and Move-in optional. It adds an "I Would Like To…" selector and a separate marketing opt-in.
- **Qualification happens after submit.** Zillow asks for the timeline and "talk now or schedule", then live-transfers buyers who are ready now to the agent.
- **Every card has Quick Quote, and response speed is public.** Instant Offices and Coworker put a Quick Quote button on every listing. Tagvenue shows a 98% response rate and a 2h response time, and Peerspace shows "typically responds within 1 hr".
- **Supply-side funnels come with open pricing.** Yelp offers "Can't find it? Add your business name". Tagvenue pitches venues with "Turn empty dates into revenue", gives them a live lead feed and publishes its commission rates. Coworker publishes its tier prices and puts counts in its H1s ("1220 Coworking Spaces in London").

---

## 3. Feature matrix

Key: ✓ = common or strong · partial = some sites or a limited form · — = not seen

| Feature | Group A orgs | Group B guides | Group C lead-gen | Down.Town v2 | Note |
|---|---|---|---|---|---|
| City / area hub pages | partial | ✓ | ✓ | ✓ | BIDs are single-city by design; Lonely Planet runs a 7-guide set per city |
| Events calendar | ✓ | ✓ | — | ✓ | DTNY, DTLA, Seattle, DowntownDC; Eventbrite, Fever |
| Submit-an-event form | ✓ | partial | — | ✓ | Free at DTLA and DowntownDC; mostly paid or platform-based in Group B (Patch, Fever) |
| Business directory / listing form | ✓ | ✓ | ✓ | ✓ | DowntownDC facets; Downtown Yonge submit form; Yelp claim flow |
| Newsletter with list choice | partial | partial | — | ✓ | DTLA (5 lists), Next City; most are single-field |
| Multi-step lead form | — | partial | ✓ | ✓ (7 intents) | Zillow qualifiers; moveBuddha estimate-first; IDA's membership join is human-assisted |
| Space / venue request form | — | — | ✓ | ✓ | DowntownDC lists 55 venues with no request form; Tagvenue and Instant Offices do it well |
| Calculators | partial | partial | ✓ | ✓ (10 tools) | Strong Towns tool kits; mtl.org carbon calculator; moveBuddha, CommercialCafe |
| Data dashboard | ✓ | — | ✓ | partial (Down.Town Index) | Seattle, Austin, Denver; Numbeo, Niche, Walk Score |
| Sponsorship packages published | partial | partial | partial | ✓ | Inventory is described but rarely priced; Coworker's tier prices are the exception |
| Donations / membership | ✓ | partial | partial | ✓ | Loop, Strong Towns, Next City; Tripadvisor Foundation; Nomads membership |
| Contests / awards | ✓ | partial | partial | ✓ | Main Street America, ATCM; Tripadvisor Travelers' Choice; Niche scholarships |
| Jobs / contributor pages | ✓ | partial | — | ✓ | IDA Jobs & RFPs; Next City job board and "Pitch"; Group B has footer Careers links only |
| FAQ blocks + schema | partial | partial | partial | ✓ | FAQs are common; no JSON-LD on any Group A site, and none visible on Afar, mtl.org or Fever |
| Author / updated stamps | — | ✓ | partial | ✓ | Time Out, Lonely Planet, Patch; Numbeo, Tagvenue, moveBuddha |
| Save / favourites | — | ✓ | ✓ | ✓ | Infatuation "Save spot"; Apartments.com saved searches |
| Map | ✓ | ✓ | ✓ | ✓ | DTNY Development Map; Infatuation map view; list/map toggles |
| Video | partial | ✓ | partial | ✓ | Secret NYC "Watch & discover"; Fever video heroes; Loop video hero |
| Affiliate / booking blocks with disclosure | — | partial | ✓ | — (not yet; config-ready later) | Lonely Planet and Afar disclose, Time Out and Secret NYC do not; Niche and moveBuddha disclose |
| Cookie consent / privacy controls | partial | ✓ | partial | ✓ | Time Out, Eventbrite and Afar offer "Do Not Sell" and cookie controls; Downtown Yonge is the only BID with a banner |

---

## 4. Lead-generation blueprint

This is the funnel the best Group C converters share, with consent and newsletter patterns from Group B. It runs in order.

1. **Intent first.** Offer one-tap chips before any typing. Down.Town has seven intents. *(Yelp: "what type of business are you?"; Peerspace: "What are you planning?"; Apartments.com: "I Would Like To…")*
2. **Prefill from context.** Take the location from the current downtown and pre-fill a message that names the listing or area. *(Zillow: "I'm interested in [address]"; Quick Quote at Instant Offices and Coworker)*
3. **Four qualifiers up front:** where, size, budget band and timing, plus an "I'm flexible on dates" checkbox. *(Tagvenue; Instant Offices' advisor checklist; moveBuddha: From → To → Size → Date)*
4. **Sizing help inside the flow, then the contact ask.** CommercialCafe's calculator (headcount × 120 / 220 / 320 sq ft) never asks for contact details, so add that step.
5. **Value before contact, with progress shown.** *(moveBuddha: "Your estimated price ranges are ready" and "0 of 5 details added"; Peerspace: "Add details to view total price")*
6. **Minimal contact fields.** Require first name, last name and email. Make phone and move-in optional. *(Apartments.com, Zillow)*
7. **A separate, unticked marketing opt-in.** *(Apartments.com: "Email me listings and apartment related info.")* Avoid Time Out's bundled "partner promotions".
8. **Privacy copy beside the button.** *(moveBuddha: "Movers see your move details — not your personal contact information.", "We don't sell your data to a lead list.", "No spam, ever.")* Add CASL-style "unsubscribe at any time" wording *(mtl.org)* and links to the Privacy Policy and Terms *(Patch)*.
9. **Say it is free and impartial.** *(Instant Offices: "It doesn't cost you a penny" and "completely free, impartial, and without obligation"; OfficeSpace.com: "no paywalls, memberships, or hidden fees")*
10. **Relieve the sense of commitment.** *(Tagvenue: "Sending an enquiry does not commit you to booking the venue."; moveBuddha: "No hard sell. Just prices.")*
11. **Trust signals at the form:**
    - a stats bar *(LoopNet: 300K+ / 13M+ / $400B+)*
    - a logo wall *(LoopNet, Coworker, Tagvenue)*
    - ratings with review counts *(Tagvenue: Google 4.7 from 400+; moveBuddha: Trustpilot 4.8)*
    - verification badges *(CoStar Verified®, Supervenue, Power Host)*
12. **Send to several partners, with user control.** *(Yelp Request a Quote goes to up to 6 businesses by default, each deselectable; Tagvenue allows multi-venue enquiries)* For Down.Town: up to 3 partners, untick any.
13. **Qualifiers after submit:** timeline (0–3 / 3–6 / 6–12 / 12+ months), then "talk now or schedule?", then up to 3 time slots. *(Zillow, which scores intent from the timeline answer)*
14. **Speed promises on the confirmation screen.**
    - Peerspace: "typically responds within 1 hr"
    - Tagvenue: venues typically reply within 4–5 hours, and the team follows up on the user's behalf if there is no reply within 48h
    - moveBuddha: first quotes "within 48 hours"
15. **A human fallback everywhere.** *(OfficeSpace.com: "Talk to an Expert"; Coworker: "Need Help? Send your requirements"; Instant Offices: phone number in the header)*
16. **Capture non-converters.** *(Nomads: an exit survey, "What stops you from joining?", plus an email-only downsell; Fever: a "Get notified" waitlist)*
17. **Quiet spam protection.** *(Honeypot fields at Secret NYC and DowntownDC; a reCAPTCHA notice at Austin)*

---

## 5. Monetisation benchmarks

Only figures found in the audit are listed. "Unpriced" means the product exists but no price was published.

| Model | Site | Figure found |
|---|---|---|
| Commission after the event | Tagvenue | 10% (US/CA/SG), 12.5% (UK/IE/AU), 15% (online-payment categories); free to list |
| Referral share at close | Zillow Premier Agent Flex | 40% referral fee on all seller connection transactions, all markets |
| Lead-feed subscription | Yelp Nearby Jobs (secondary source) | $240/month; Request a Quote free for claimed profiles |
| Listing ladder (priced) | Coworker | Basic $25/yr · Visibility Plus $100/yr · Featured $253/yr, plus a broker commission on leads |
| Listing ladder (exposure) | LoopNet | Diamond up to 1,535× · Platinum 729× · Gold 131× · Silver 35× vs Basic; unpriced |
| Listing ladder (exposure) | Apartments.com | Diamond +300% · Platinum +100% · Gold +33% vs Silver; unpriced |
| Free listing + featured upgrade | OfficeSpace.com; CommercialCafe | "List for free" / "Feature your listing"; unpriced |
| Free to tenant, operator pays | Instant Offices | "It doesn't cost you a penny"; commission not published |
| Service fees | Peerspace | Guest and host fees; percentages not disclosed |
| Pay-per-lead / pay-per-call | moveBuddha | Tracked phone numbers per partner card; "moveBuddha Certified" programme |
| Data / API | Walk Score; Crexi (secondary) | Premium "Starting at $115/mo"; Crexi Intelligence $299/mo |
| Sponsored partner module | Niche | Mortgage "Get Rates" module, disclosed: "Niche may be compensated by the third party lenders" |
| Self-serve sponsorship card | Nomads.com | "Get your product in front of 7.9 million digital nomads a year" |
| One-time membership | Nomads.com | $19.99 and $1 across Lite and Lifetime (which tier each belongs to was unclear); 7-day refund |
| Membership dues | International Downtown Association | $47–$5,676/yr scaled by budget or revenue; Student $49/yr; Academic $1,000/yr |
| Membership tiers | Downtown Denver Partnership | Trailblazer · Catalyst · Pinnacle; unpriced |
| Pay-what-you-wish membership | Next City | $5 / $10 / $25 per month or $60 / $120 / $300 per year; Institutional $1,200 |
| Named donor tier | Strong Towns | No-minimum membership; "Friends of Strong Towns" $500+/yr; stock gifts |
| Event sponsorship | Downtown Seattle Association | Annual Meeting 300+ businesses; Summer Sounds ~10,000 attendees; unpriced |
| Destination sponsorship | Chicago Loop Alliance | State Street banners, "over one million State Street visitors each week"; unpriced |
| Paid community events | Downtown Alliance; Downtown Yonge | Dine Around $5–10 per sample, $30 charity panel; Sip & Stroll $15/person |
| Competition / grants | Main Street America; Project for Public Spaces | Pitch competition up to $10,000 (Amex co-branding); grants of 4 × $100,000 (Walton Family Foundation) |
| Display ads | Time Out | 38 "Advertising" labels on a 76-item article |
| Labelled sponsored content | Afar; Next City; Patch | DMO-sponsored stories ("Sponsored by Visit Maine"); Next City media kit; Patch community sponsor line |
| Affiliate, mission-framed | Visit London | Commission "funds job creation for Londoners" |
| Own products | Lonely Planet | Guidebook $24.99; trips "from $6,820 per person" |

---

## 6. Design patterns worth borrowing

- **A four-pillar mega-menu built on user intent,** as at DTLA, Loop and DowntownDC. Down.Town's Explore / Live / Find Space / Do Business already follows it.
- **Persona entry points.** Montréal centre-ville has Visiteur / Travailleur / Étudiant / Résident hubs. Nomads shows costs per persona.
- **A fixed micro-template for list items,** with price and time chips at the top *(Time Out, Lonely Planet)*.
- **Card metadata in a fixed order, with badges:** image → category → title → area → "from" price → badge *(Eventbrite urgency badges, Instant Offices tags, Tagvenue's min-spend and response-time row)*.
- **Stat tiles that cite their source and date,** as Seattle's do. Montréal centre-ville's 10 tiles have no sources, dates or CTA.
- **Live context in the header.** Loop and DowntownDC show weather and the local time. DowntownDC also runs a countdown banner.
- **Counts in H1s and chips** *(Coworker: "1220 Coworking Spaces in London"; Tripadvisor: "Walking Tours (172)")*.
- **Sticky tabs on detail pages** *(Fever: Overview / Highlights / Gallery / On the day / Reviews / Venue / FAQs)*.
- **Nearby and cross-link modules** *(mtl.org: "Around this place"; The Infatuation: "Included In"; Tagvenue: "People also search for")*.
- **Accessibility facets with counts** *(NYC Tourism: "Assistive Listening System (52)"; DowntownDC: entrance, restroom, seating)*.
- **A 4-step "how it works" strip above lead forms** *(OfficeSpace.com: Search → Compare → View → Deal)*.
- **One strong accent on a neutral base, plus dark mode.** Exposed accents: Austin #ee682b, Montréal #3D43B5, Infatuation #0B2587, Tagvenue #00a287. mtl.org and Nomads both offer dark mode.

---

## 7. Gaps Down.Town fills

- **No official downtown site has a space, venue or housing request form.** DTLA lists 34 residential buildings with no inquiry path. Its Office Space Guide points to a generic inbox. DowntownDC lists 55 venues, then sends planners off-site. DTNY's development map has no "find space" CTA.
- **No global brand owns "downtown".** The demand exists: GetYourGuide has a Downtown Montreal page with 818 reviews, Culture Trip and Time Out run downtown articles, and mtl.org tags cards "Centre-ville". Every competitor is either single-city or not downtown-specific.
- **There is no cross-city downtown data.** The dashboards in Seattle, Austin, Denver and DowntownDC each use their own metrics. A standardised Down.Town Index has no counterpart.
- **Sponsorship prices are almost never published.** Only IDA and Next City publish prices. DMOs already buy sponsored content (Afar), so BIDs are natural buyers of published packages.
- **Contests, donations and contributor hiring are rare.** No Group B site ran a contest. Tripadvisor is the only one taking donations. Contributor hiring amounts to footer "Careers" links (Time Out, Narcity).
- **Lead-gen sites lack editorial, and editorial sites lack lead capture.** Coworker mentions neighbourhoods only in body text, and the guides convert only to tickets. Down.Town puts both on one downtown page.
- **Nobody uses structured data.** No Group A site had JSON-LD, and none was visible on Afar, mtl.org or Fever. Ship Event, LocalBusiness, ItemList, FAQPage, BreadcrumbList and Article schema from day one.

---

## 8. Mistakes to avoid

- **Placeholder and broken content left live.** Denver shows a "LOREM IPSUM" heading on two pages, and its "Become a Member" link goes to the homepage. DTNY's Terms link opens the Privacy page. IDA's counters render "0+". Coworker links to a dev subdomain.
- **Missing or wrong legal pages.** Denver has no privacy policy in the footer, and Loop's Privacy link goes to Google's policy. ATCM shows no privacy link and a "©2023" footer.
- **Undisclosed affiliate and ticketing links.** Time Out's booking links carry affiliate parameters with no visible disclosure, and Secret NYC funnels readers to its parent company's ticketing. moveBuddha shows the right way: a disclosure on every page.
- **Ad density that undermines trust.** Time Out places an ad after every second list item. No BID runs display ads, so cap and space AdSense units to keep an official-grade feel.
- **Weak consent wording.** Time Out bundles "partner promotions" into its newsletter consent. DTLA's five-list signup has no consent text at all.
- **Accessibility and speed failures.** Downtown Yonge disables zoom (user-scalable=0). Secret NYC shows a "Loading…" spinner on first paint, and MTL Blog uses Instagram embeds instead of photographs.
- **Stale content.** Afar's Montreal list dates from 2020–21, has no updated stamp and includes one entry that describes a different restaurant. MTL Blog's 2021 weekend list is still indexed.
- **Data and promises with no next step.** Montréal centre-ville's key-data page has no CTA. CommercialCafe's calculator never asks for contact details. DTLA's residential page promises connections it cannot deliver.
