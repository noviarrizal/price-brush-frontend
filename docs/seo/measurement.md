# PriceBrush — SEO measurement (v0.2)

Date: 15/10/2026 · Updated 16/10/2026 · All tools free · No cookies, no personal data in analytics (PRD privacy: free tools store nothing on a server).

## 1. Setup checklist (by 31/10/2026)

### Google Search Console (source of truth for queries and positions)

- [ ] Add a **URL-prefix property** `https://pricebrush.pages.dev/` (a Domain property needs DNS access, which `pages.dev` doesn't give).
- [ ] Verify with the **HTML tag** method: developer adds `<meta name="google-site-verification" content="…">` to `app/root.tsx` `<head>` (or the HTML-file method: file in `public/`).
- [ ] Submit `https://pricebrush.pages.dev/sitemap.xml` (Indexing → Sitemaps).
- [ ] URL Inspection → **Request indexing** for `/`, `/paint-calculator/`, `/decorating-quote-template/`, `/decorating-invoice-template/`, `/about/`.
- [ ] Add a second owner/user (backup Google account) so access isn't lost.
- [ ] Optional: **Bing Webmaster Tools** → "Import from Google Search Console" (2 minutes; also gives free keyword data).

### Cloudflare Web Analytics (traffic, cookieless)

- [ ] Pages project → Metrics → enable Web Analytics (automatic beacon for Pages; no consent banner needed because it doesn't use cookies or fingerprinting).
- [ ] Check visits by path for the 3 tool pages; referrers (Google, WhatsApp, directories).

### Anonymous event counter (to measure "tool users" and conversion)

Cloudflare Web Analytics has no custom events, so add a tiny Cloudflare Worker endpoint (free tier), e.g. `POST /api/e` with body `{ "n": "calc_used", "p": "/paint-calculator/" }`, storing **only** event name, page, date (daily counts in D1 or Workers Analytics Engine — check free-tier limits). No IP, no user ID, no form contents.

| Event | Fires when |
|---|---|
| `calc_used` | first valid result shown in a page view (once per page view) |
| `calc_room_added` | user adds a 2nd room (trade-intent signal) |
| `pdf_downloaded` | quote or invoice PDF generated (`p` tells which) |
| `quote_prefilled` | "Turn this into a quote" used |
| `cta_signup_click` | any sign-up CTA on a public page (`p` = page) |

Sign-ups themselves: account count in the database (Neon; auth provider to be chosen). Attribution: store the **first landing path** in `sessionStorage` and send it with the sign-up (e.g. `signup_source=/paint-calculator/`) — no cookie needed.

## 2. KPIs

| KPI (PRD §9) | Target 31/12/2026 | Source | Definition |
|---|---|---|---|
| Pages indexed | **≥ 10** | GSC → Pages → Indexed | Canonical public URLs indexed (12 planned by 22 Nov) |
| Free-tool users | **≥ 200** | event counter | Sum of `calc_used` + `pdf_downloaded` page views (approximation of users — we don't track individuals; say so when reporting) |
| Registered accounts | **≥ 30** | Database (Neon) | All sign-ups; split by `signup_source` |
| Activation | ≥ 40% send a quote in 24 h | event `quote_sent` (product) | — |
| First payment | ≥ 1 | Polar | — |

SEO leading indicators (monthly): GSC impressions and clicks per P0 page; average position for each primary keyword; CTR by page; tool-use rate (`calc_used` ÷ page visits); tool → sign-up click rate (`cta_signup_click` ÷ `calc_used`).

Expectation setting: new sites typically see first impressions within days of indexing but rankings take months. December numbers will be small; the trend matters more than the total.

## 3. Monthly review routine (first Monday of the month, 45 minutes)

Log each review in `docs/seo/reviews/YYYY-MM.md` (create when the first review happens).

1. **Indexing (5 min):** GSC → Pages. Any public URL "Discovered/Crawled – currently not indexed"? Check internal links to it and content depth. Any `/app`, `/q` or preview URL indexed? → fix headers (`technical-seo.md` §3.2).
2. **Queries (15 min):** GSC → Performance → last 28 days vs previous. For each P0 page, export queries. Flag:
   - **Position 8–20 with ≥ 50 impressions** → improve the page (add the missing section/FAQ for that query).
   - **High impressions, CTR below ~2% at positions 1–5** → rewrite title/meta (keep ≤ 60/155 chars; update `keyword-map.md`).
   - **New queries we don't target** → add to `keyword-research.md`; new page only if intent differs and no cannibalisation.
   - **Two pages ranking for the same query** → pick one, adjust copy/links (cannibalisation).
3. **Conversion (10 min):** tool-use and sign-up click rates per page; if a page has traffic but low `cta_signup_click`, test CTA copy/position (one change per month).
4. **Core Web Vitals (5 min):** GSC → Core Web Vitals (needs traffic; use Lighthouse until then). Any page "Poor" → fix first.
5. **Links (5 min):** GSC → Links → top linking sites; note new ones; follow up listings.
6. **Decide (5 min):** max **3 actions** for the month; write them in the review file.

## 4. Volume validation (post-launch, from Search Console)

Decided 16/10/2026: the founder won't do pre-launch manual checks, so **GSC is the volume source** (`keyword-research.md` §6 lists what couldn't be checked).

- **Dec 2026 review:** GSC → Performance → Queries (last 28 days), filter by each P0 page. Record impressions per query in `keyword-research.md` next to the autocomplete evidence ("GSC impressions, 28 days to DD/MM"). Re-rank priorities by impressions × intent.
- **Jan and Feb 2027 reviews:** repeat; look for queries we rank 8–30 for that aren't in the keyword map → new sections or pages.
- **SERP features:** use GSC "Search appearance" and URL inspection; for SERP order, check positions in GSC rather than live Google (Google blocks our scripted access).
- **Optional, only if the founder offers 10 minutes later:** Keyword Planner with the list in `keyword-research.md` §6, and Bing Webmaster Tools import from GSC (also gives Bing keyword data). Not required.
