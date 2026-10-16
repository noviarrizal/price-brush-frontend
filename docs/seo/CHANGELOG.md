# SEO changelog

## v0.3 — 17/10/2026

The founder accepted all 10 CEO decisions (`../ceo/decisions-2026-10-17.md`, 17/10/2026). This version applies only the edits that memo gives to [SEO]: #1 (invoice date), #2, #4 and #6. No new research.

**`keyword-map.md`**

1. Home (#2): H1 is now **"Room sizes in. Priced quote out."**, with a keyword line ("Quote and invoice app for UK painters and decorators"), the sub, and the CTA "Price a room free" → `/paint-calculator` until the app is live, then "Start a free quote". There are two meta descriptions: one for 31/10 (142 chars, no app claims) and one for after the MVP (154 chars). Both were counted with a script. "60 seconds" and the "one tap" invoice claim are gone. A late-Nov 5-second re-test is noted.
2. `/decorating-invoice-template` goes live on **14/11/2026** instead of 31/10 (#1).
3. `/pricing` (#6): the meta description now says "incl. VAT" (152 chars). I added a price rule: always incl. VAT, never "+ VAT"; comparisons include Queezy, are dated and sourced, and never say "cheaper".
4. The invoice page's CTA anchor is now "When it's accepted, it's an invoice."

**Briefs**

- `paint-calculator.md`: before the MVP there is no sign-up CTA. The primary action is "Turn this into a quote", and pages that link to the calculator use "Price a room free". After the MVP, add "Start a free quote". The mist-coat switch is now named "New plaster? Add a mist coat", and there is a new FAQ explaining how it is counted. Added copy bans.
- `decorating-quote-template.md`: added a **deposit FAQ** (Direct Line 39% take half up front / 46% ask for proof of funds, cited as "reported 15/01/2026 (sample size not published)" with the Scottish Financial News link), a **mist-coat FAQ** and a "Mist coat (new plaster)" chip. The CTA follows #2. The next-step card says "when it's accepted, it's an invoice" and hides the invoice link until 14/11. "60 seconds" is dropped.
- `decorating-invoice-template.md`: the live date is now 14/11. Every "one tap" line is replaced with "When it's accepted, it's an invoice." The "Getting paid on time" section cites Direct Line 68% (same citation format) and Tradefix 45% (n = 150, 2024). The CTA follows #2. It says "No per-user fees" and never "cheaper".

**Why:** voice ships only in the Nov MVP, so the H1 and CTAs have to be provable on 31/10. Competitors already use "60 seconds". The Direct Line date was checked by the CEO (it is a secondary source). Polar charges UK buyers inclusive of VAT.

**Follow-up conflict fixes (the coordinator approved them on 17/10/2026):**
- `content-plan.md`: the invoice template is no longer in the 26–31 Oct row, so that row now covers 4 URLs and points to the decision #1 cut order. It moves to the 9–15 Nov row, going live **14/11/2026** with a sitemap update and "Request indexing" (1.5 h). The 12-page total by 22/11 doesn't change.
- `keyword-research.md` (painter and decorator quote template row): "60 seconds" is now marked as QuoteRocket's and TradeQuoteAI's claim, which PriceBrush no longer uses (decision #2).
- `briefs/paint-calculator.md`: the price label is now **"Your price at your day rate"** (decision #1), with the caption "Check prep, access and woodwork before you quote." The output row, formula, worked example and intro now use the same wording.

## v0.2 — 16/10/2026

Founder decisions applied + the checks the founder won't do were done (or ruled out).

**Decisions applied**

1. URLs final: `/paint-calculator`, `/decorating-quote-template`, `/decorating-invoice-template` (`keyword-map.md`, `content-plan.md`). Design's `screens.md` still says `/free-quote-template` — design/dev to follow the SEO URLs.
2. No domain at launch: everything on `pricebrush.pages.dev`, migration later (`technical-seo.md` §9). Added a **listings register** so every external profile can be switched to the new domain (`link-building.md` §1b).
3. Author: **Arif Noviarrizal — independent developer building PriceBrush**, and nothing more until he adds it — About page, guide bylines, `Article` JSON-LD (`keyword-map.md`, briefs, `technical-seo.md` §5).
4. No manual checks by the founder: Keyword Planner/Bing replaced by post-launch Search Console volume review (`measurement.md` §4); "what couldn't be checked" table in `keyword-research.md` §6.
5. Anonymised, aggregated quote data may be used for data stories → requirements for terms and privacy policy (`technical-seo.md` §9b); data-story plan updated (`link-building.md` §3).

**New research**

- Google UK retried 16/10: CAPTCHA again (not possible from this connection).
- UK proxy SERPs via DuckDuckGo Lite (`kl=uk-en`, Bing index) for 15 queries → `data/serp-ddg-uk-2026-10-16.md`.
- Reddit via Arctic Shift archive: about 6,300 recent posts from 11 subreddits → `data/reddit-sample-2026-10-16.md`. r/uktrades and r/DecoratingUK returned nothing.
- Read 3 more competitors: TradeQuoteAI (quote template), InvoiceJob (invoice generator, strongest competitor), ukcalculator.com (paint calculator).

**What changed in the conclusions**

- Quote and invoice template SERPs are **crowded with 10+ small UK SaaS template pages (mostly 2026)** → difficulty raised from Easy–Medium to **Medium**; still no big brand. "Quoting app for painters" shows ≥ 10 small painter apps → very crowded.
- "paint calculator" head term is led by B&Q, Dulux and Wickes → focus first on the UK, multi-room, walls-and-ceiling and labour/price variants.
- Day-rate and pricing-guide SERPs are full of unsourced programmatic rate sites → difficulty raised; our sourced, data-backed angle matters more.
- Reddit: paint questions are mostly **mist coat / new plaster** problems; small-business questions are invoicing software, **late payers** and **underpricing** → new FAQs added to the calculator and invoice briefs.

**Still not checked:** real Google UK order and SERP features, search volumes, Google Trends seasonality, r/uktrades and Facebook groups.

## v0.1 — 15/10/2026

First SEO round, before any public page exists (only `/` "coming soon" is deployed).

**Added**

- `keyword-research.md` — method, seeds, 6 clusters, prioritised table with evidence per keyword, question bank, competitor notes, manual checks for the founder.
- `keyword-map.md` — 14 URLs (+ up to 8 room pages later), one primary keyword each, titles ≤ 60 and descriptions ≤ 155 characters (script-checked), H1s, internal links, cannibalisation watch-list.
- `briefs/paint-calculator.md`, `briefs/decorating-quote-template.md`, `briefs/decorating-invoice-template.md` — the three P0 pages due 31/10/2026.
- `technical-seo.md` — route plan, meta helper for React Router 8, prerender list, `_redirects`/`_headers`/`404.html` for Cloudflare Pages, robots and sitemap, JSON-LD, Core Web Vitals budget, domain migration steps.
- `programmatic-seo.md` — room pages only (cap 8, hard cap 15), no city pages, trade expansion gate.
- `content-plan.md` — dated plan to April 2027 at ~2–3 founder hours/week.
- `link-building.md` — £0 listings, link-magnet tools, one data-PR project, community rules.
- `measurement.md` — GSC + Cloudflare Web Analytics setup, anonymous event counter, KPIs, monthly routine.
- `data/*.csv` — 10 Google UK autocomplete files (≈ 4,500 unique suggestions in total).

**Why these choices**

- Paint-quantity cluster has the most real UK demand; trade modifiers ("multiple rooms", "walls and ceiling", "labour", "price") are unserved by the brand calculators → calculator includes labour/days/price and multi-room.
- Quote/invoice template SERPs we could read are thin or US-framed → UK generator + worked example + legal/VAT checklists.
- URLs `/decorating-quote-template` and `/decorating-invoice-template` proposed instead of design's `/free-quote-template` (trade word in URL, future trades). Needs founder/design decision.

**Known gaps / limits**

- No search volumes (autocomplete only). Google UK SERPs could not be rendered (CAPTCHA); Startpage/Bing/Reddit blocked scripted access; `capture-ref.ps1` failed during this run, so no `seo-*` screenshots were saved. SERP notes rely on WebSearch (US-biased) + fetched pages.
- First parallel autocomplete run was rate-limited for 3 seed sets; re-run sequentially with `-DelayMs 1500` (all files now populated). Lesson: run seed sets one at a time with ≥ 1,000 ms delay.
