# SEO changelog

## v0.4 — 17/10/2026

The founder accepted the CEO memo `../ceo/decisions-2026-10-18.md` (18/10/2026). This version applies only its [SEO] edits, plus one extra item the coordinator asked for (home keyword line).

1. **R2 — new `drafts/paint-calculator-copy.md`**: the long copy for `/paint-calculator/` (coverage table, typical-rooms table, "For decorators", 12 FAQs, sources line, byline "Arif Noviarrizal"). Every litre, tin, day, m² result and £ is a `{calc: …}` / `{default: …}` / `{derived: …}` placeholder, defined against the spec's test cases (T1, T9) and new named cases (T1W, TAPE, BOX, BOXW, DOUBLE, LIVING, HALL), with 6 Vitest assertions so a sentence that stops being true fails the build. The "No tape measure?" tip now comes from the engine (case TAPE: 4 × 4 × 2.4 m, walls only), fixing review S1. Sections that need the ceiling / mist-coat switches (T16) are tagged with T17 fallbacks. Word count (script): ≈ 1,790 on the page with T16, ≈ 1,730 with T17 — inside 1,200–1,800. Banned claims checked: none of "60 seconds", "cheapest", "for life".
   - Coverage figures now come from 9 UK product pages opened 17/10/2026 plus the spec §9 Screwfix figures (Dulux Trade, Johnstone's Trade, Nextday Paint for Crown/Leyland/Johnstone's), replacing the brief's guessed ranges (e.g. gloss "~14–16" → Dulux Trade High Gloss "up to 18"). The two Screwfix Dulux Matt figures returned 403 today; they come from spec §9 and are flagged for a recheck.
   - Mist-coat FAQs use manufacturer thinning (Leyland up to 1:9 … Crown 40% water), Dulux's "up to 4 weeks" for plaster drying, and the r/DIYUK "Mist coat failed" thread (read via Arctic Shift, labelled as forum opinion). I dropped the brief's "use a matt without vinyl" hint: Dulux and Johnstone's give thinning instructions for their *vinyl* matts on bare surfaces, so it isn't supported by the sources I read.
   - Intro: "nothing stored" → "Nothing you type leaves this browser" proposed (the hand-over uses `localStorage`); founder to confirm.
2. **`briefs/paint-calculator.md`**: points at the draft (draft wins); word count is now for the whole page (R2); author line with "based in Indonesia"; slash canonical; 2 new acceptance checks.
3. **P2 — `keyword-map.md` `/about`**: "Arif Noviarrizal — independent developer building PriceBrush, based in Indonesia." Country only, no city, no photo; no `address` in JSON-LD.
4. **S6 — `technical-seo.md` §6**: first-load JS budget **130 KiB gzip** (was 120 KB); Lighthouse ≥ 90 unchanged.
5. **Trailing slash (lead's note)**: `keyword-map.md`, `technical-seo.md` (§1, §2 sketch, §2.1 now decided, §3.4 sitemap example, §5 JSON-LD, §9 migration, §10) and `measurement.md` use `/paint-calculator/` etc. Also from the same note: `_redirects` targets are `/__spa-fallback` without `.html` (§3.1), plus a matching `_headers` noindex rule.
6. **R4 — `briefs/decorating-quote-template.md`**: the cancel FAQ now uses exactly the memo's sentence ("If they ask you in writing to start sooner…"). I re-read regs 31 and 36 on legislation.gov.uk: the sentence matches them ("up to 12 months" is a slight plain-English simplification). The brief's "short paragraph" cancellation option is marked superseded by R4 (official Schedule 3 wording, plan T18).
7. **T17 — `keyword-map.md`**: one-surface meta description fallback (142 chars): "Work out litres and tins for your walls, room by room. …".
8. **Coordinator request — home keyword line**: pre-app "Free paint and quote tools for UK painters and decorators" (57 chars), post-app "Quote and invoice app for UK painters and decorators". I didn't use the UI/UX wording because it puts both tool pages' primary keywords on the home page. The home **title** still says "App"; I left it as an open question for the founder, with a 59-char pre-app alternative.

**Not changed (not an [SEO] edit in the memo):** `technical-seo.md` §5 home JSON-LD still shows `SoftwareApplication` offers and a `logo`. CEO Q2 (accepted) says ship `Organization` without logo + `WebSite` on 31/10 and add `SoftwareApplication` with `/pricing/` on 21/11 — the lead/engineer follow Q2; SEO will update §5 if asked.

## v0.3.2 — 17/10/2026

`/decorating-quote-template` built (cut-order step 2). The example quote uses the paint engine's numbers (£865 / £1,038 with VAT) instead of the PRD's £615 table, so all pages agree; the brief notes this. **Not built yet** from brief §2.1/§2.2: the cancellation-notice paragraph on the PDF (needs careful legal wording), terms defaults, logo, blank .docx / Google Docs / printable PDF downloads, image version of the example, desktop WYSIWYG. Facts re-checked 17/10: VAT threshold £90,000 (secondary sources; links go to GOV.UK), Consumer Contracts Regulations 2013 £42 off-premises exemption and 14-day cancellation (legislation.gov.uk reg. 27(3), 29).

## v0.3.1 — 17/10/2026

`briefs/paint-calculator.md` §2.1 brought in line with the engine spec (`../specs/paint-calculator.md`, founder signed off D1–D6): tins 10 / 5 / 2.5 L per paint (no 1 L), speed default 40 m²/day, labour = sum of 0.1-day lines (½-day rounding only on "Time on the job"), worked example now **£535** (was £560), door/window FAQ answer no longer promises editable sizes. `content-plan.md`: decorator sanity check is now on the 40 m²/day default.

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
