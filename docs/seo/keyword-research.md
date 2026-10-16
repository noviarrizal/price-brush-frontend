# PriceBrush — Keyword research (v0.2)

Date: 15/10/2026 · Updated 16/10/2026 (v0.2: SERP proxy + Reddit sample) · Author: SEO · Source of truth for product: `../PRD.md` · Raw data: `data/*.csv`

## 0. Read this first (limits of the data)

- **No search volumes in this file.** Every "demand" signal is a Google UK autocomplete hit (what people really type), a question form from autocomplete (used as a stand-in for People also ask), or a competitor/forum page. Autocomplete proves a phrase is typed often enough to be suggested; it does **not** say how often. Volumes come later from Google Search Console (source of truth) and optional free Keyword Planner checks (list in §6).
- **Google UK SERPs could not be rendered** — tried 15/10 and again 16/10/2026: headless Chrome on google.co.uk returns a reCAPTCHA "unusual traffic" page every time (shared/WARP IP). Startpage: bot challenge. Bing direct: junk results for scripts. Reddit's own JSON: HTTP 403.
- **v0.2 proxy SERPs:** DuckDuckGo Lite with UK region (`kl=uk-en`) worked for 15 queries → `data/serp-ddg-uk-2026-10-16.md`. DuckDuckGo mostly uses **Bing's index**, so positions are a UK proxy, not Google UK order. "Who ranks" now combines this snapshot, WebSearch (US-biased) and pages I fetched. Difficulty ratings remain informed estimates; Google truth comes from Search Console after launch.
- **v0.2 Reddit:** Arctic Shift archive API, recent posts fetched and filtered locally → `data/reddit-sample-2026-10-16.md` (see §4).
- **Autocomplete noise.** `gl=uk` still returns some US/AU/IN phrases (gallons, "home depot", "bunnings", "kaise banaye"). These were filtered out by hand. "Painting quote(s)" and "decorating quotes" are dominated by **art/inspirational quotes** ("painting quotes for instagram", "decorating quotes for christmas"), so they are not usable as primaries.
- **Rate limiting.** Running 6 jobs in parallel got throttled for 3 small seed sets (they returned 0 rows). They were re-run one at a time with `-DelayMs 1500`. Status per file is in §1. Empty results mean "not collected", **not** "no demand".

## 1. Method and seeds

Tool: `tools/keywords.ps1` (Google UK autocomplete, `hl=en-GB`, `gl=uk`; seed + "seed a…z"; `-Questions` adds how/what/can/do/is/best/free/cheap/uk prefixes).

| CSV (in `data/`) | Seeds | `-Questions` | Rows | Status |
|---|---|---|---|---|
| `quotes.csv` | painting quote template · decorating quote template · painter and decorator quote · painting quote · decorating quote · painting estimate template · quote template uk | yes | 409 | OK |
| `invoices.csv` | decorating invoice template · painter invoice template · painter and decorator invoice · painting invoice · invoice template uk · free invoice generator uk | yes | 412 | OK |
| `paint.csv` | how much paint do i need · paint calculator · how much paint for a room · paint coverage · how many litres of paint · emulsion calculator | yes | 1,047 | OK |
| `pricing.csv` | how much does a painter and decorator charge · painter and decorator day rate · how to price a painting job · painter and decorator prices · cost to paint a room · decorator prices per room · how long to paint a room | yes | 679 | OK |
| `apps.csv` | quote app for decorators · invoice app for tradesmen · quote app · app for painters and decorators · tradesman app · quoting software · invoice app uk | no | 503 | OK |
| `mtd-tax.csv` | making tax digital decorator · making tax digital sole trader · making tax digital · self assessment painter and decorator · painter and decorator expenses · do decorators charge vat | yes | 408 | OK |
| `extra-paint-tech.csv` | how much paint for a ceiling · how much paint for skirting boards · how many coats of paint · mist coat | no | 488 | OK (re-run, slow) |
| `extra-howto.csv` | how to write a quote · quote vs estimate · what to include on an invoice | no | 292 | OK (re-run with `-DelayMs 1500`; first run rate-limited) |
| `extra-business.csv` | self employed painter and decorator · starting a painting and decorating business · decorator deposit | no | 32 | OK (re-run; small set — "decorator deposit" returned almost nothing) |
| `extra-calculators.csv` | wallpaper calculator · decorating cost calculator · painting time calculator | no | 221 | OK (re-run; first run rate-limited to 4 rows) |

Evidence notation below: `paint.csv ← "paint calculator u"` = the phrase appeared in `paint.csv` when Google UK autocomplete was asked for "paint calculator u".

## 2. What the data says (headline findings)

1. **The paint-quantity cluster is by far the deepest.** `paint.csv` alone has hundreds of real UK phrasings: "how much paint do i need", "paint calculator uk", "how many litres of paint do i need for a room", room-by-room variants (bedroom, living room, hallway, **hall stairs and landing**, kitchen, small bathroom, ceiling, door, skirting boards), tin questions ("how many rooms will 5 litres of paint cover", "what area does 5 litres of paint cover", "how many walls will 2.5 litres of paint cover") and **trade-flavoured** modifiers no big brand serves: "paint calculator multiple rooms", "paint calculator walls and ceiling", "paint labour calculator", "paint calculator price", "paint estimate calculator labor". This is our best acquisition door.
2. **Quote and invoice templates have clear UK trade phrasing.** "painting and decorating quote template uk", "free painting and decorating quote template uk", "painter and decorator quote template", "decorating quote template", "painting and decorating invoice example uk", "decorating invoice template uk", "painter and decorator invoice template", plus "generator" forms ("painting quote generator", "painting invoice generator"). v0.1 (WebSearch) showed thin or US-framed pages; the **v0.2 UK proxy SERP shows both template SERPs are crowded with 10+ small UK SaaS template pages, mostly published in 2026** (TradeQuoteAI, QuoteSmith, TradeTally, InvoiceJob, TapTax…). No big brand, so still winnable, but only with clearly better pages (decorator-specific generator, UK legal/VAT checklists, worked example, quote → invoice) — and it will take months, not weeks.
3. **"Estimate" is a US word but people still type it.** Many "painting estimate template" phrases exist in UK autocomplete (likely partly US leakage). Use "quote" in titles/H1 (PRD + UK usage) and "estimate" once as a secondary phrase in body copy.
4. **Pricing questions are huge but mostly homeowner intent.** "how much does a painter and decorator charge per day uk", "cost to paint a room uk", "painter and decorator `<city>` prices" (40+ UK towns). Homeowners don't buy PriceBrush. The **decorator-intent** subset is smaller but ours: "how to price a painting job uk", "how to price up a painting job uk", "self employed painter and decorator day rate", "how much should a painter and decorator charge per day", "painting and decorating pricing app".
5. **App-intent phrases exist but are generic.** "quoting app for painters", "best invoice app for tradesmen uk", "tradesman quote app", "free invoice app uk no subscription", "free quoting software uk". Competitors here are funded (Powered Now, Tradify, YourTradebase, Jobber) → home page targets these, but expect slow progress.
6. **MTD is a big, hard, seasonal topic.** "making tax digital april 2027", "making tax digital under 30000", "does making tax digital apply to sole traders" — dominated by GOV.UK, Xero, QuickBooks, banks, MSE. **No trade-specific MTD phrase** was suggested for decorators. Small wins: "do painters and decorators charge vat", "painter and decorator allowable expenses".
7. **Direct competitors already use free tools for SEO.** Examples: Sleepless Tradesman (AI quoting SaaS) runs 13+ free calculators incl. a paint calculator and a PDF invoice generator; Trade2Base runs long day-rate/pricing guides (≈3,300 words, no author, no sources); TradeCalculator.co.uk runs a paint calculator (updated Sept 2026) monetised with affiliates and lead-gen. Our edge must be **depth for the trade** (multi-room, labour, price, straight into a quote) and **honest sourcing**, not just "another calculator".
8. **(v0.2) Reddit shows the pain is prep, not maths.** In r/DIYUK the paint questions are mostly mist coat / new plaster problems; in r/smallbusinessuk the money questions are invoicing software, late payers and underpricing. These shape FAQs and guide angles (see §4).

## 3. Prioritised keyword table

Difficulty key — **Easy**: weak/thin/US pages rank, few UK specialists · **Medium**: mix of small UK specialists and some brands, content beatable · **Hard**: big brands/government/funded SaaS with strong pages. All difficulty = estimate from WebSearch + fetched pages (see §0).

### Cluster A — Paint quantity (tool intent) → `/paint-calculator`

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| paint calculator | tool | `paint.csv` ← "paint calculator" (seed itself) | **Hard** (head term): DDG UK top 10 — B&Q, CalculatorSoup, Dulux, ukcalculator.com, Wickes, paintcalculator.co.uk, Omni, materialcalculator.co.uk, Dulux AU, Sherwin-Williams | /paint-calculator | P0 (primary) |
| paint calculator uk | tool | `paint.csv` ← "paint calculator u" | **Medium**: same set; small UK sites rank, proving new domains can get in | /paint-calculator | P0 |
| how much paint do i need | tool/info | `paint.csv` ← seed; also "…calculator uk", "…uk", "…for a room" | **Hard**: Dulux "Dr Dulux" guide (~400 words, no tool on the page), Tikkurila (tool, ~600 words), Homebase, Ideal Home, Homebuilding.co.uk | /paint-calculator | P0 |
| how many litres of paint do i need for a room | tool/info | `paint.csv` ← "how many litres of paint" | **Medium**: Splat Decorating Supplies, Valspar, Dulux | /paint-calculator | P0 |
| paint calculator walls and ceiling | tool | `paint.csv` ← "paint calculator w" | **Medium**: many small generic calculators (mytimecalculator, ukcalculator, roomnroot, calcqube, materialcalculator) | /paint-calculator | P0 |
| paint calculator multiple rooms | tool (trade) | `paint.csv` ← "paint calculator m" | **Easy–Medium**: DDG UK top 10 is mostly US gallon calculators (PaintCalcs, CalculatorCollection, homeimprovcalc) — no UK litres multi-room tool near the top | /paint-calculator | P0 |
| paint labour calculator / paint estimate calculator labor | tool (trade) | `paint.csv` ← "paint calculator l" ("paint labour calculator", "paint calculator labor") | **Easy–Medium**: US labour calculators; no UK tool read gives days × day rate | /paint-calculator | P0 |
| paint calculator price / painting cost calculator uk | tool | `paint.csv` ← "paint calculator p", "painting cost calculator uk" | **Medium**: Sleepless Tradesman shows material £ only | /paint-calculator | P0 |
| how many rooms will 5 litres of paint cover / what area does 5 litres of paint cover | info (FAQ) | `paint.csv` question forms | **Medium**: Dulux, Valspar, retailers | /paint-calculator (FAQ) | P0 |
| how much paint for a 4m x 4m room | info | `paint.csv` ← "how much paint for a room" | **Medium**: Dulux rule of thumb (~5 L) | /paint-calculator (worked example) | P0 |
| how much paint for hall stairs and landing | tool/info | `paint.csv`, `extra-paint-tech.csv` | **Easy**: few dedicated answers seen | programmatic room page (P2) — FAQ on calculator first | P1 |
| how much paint for a bedroom / living room / kitchen / small bathroom / ceiling / door / skirting boards | tool/info | `paint.csv`, `extra-paint-tech.csv` | **Medium** each; brand guides answer generically | programmatic room pages (see `programmatic-seo.md`) | P2 |
| how many coats of paint after mist coat / how many coats of paint does new plaster need | info | `extra-paint-tech.csv` ← "mist coat", "how many coats of paint" | **Medium**: Dulux, B&Q, Wickes, forums | /paint-calculator (new-plaster option + FAQ); later guide | P1 |
| paint coverage per litre | info | `paint.csv` ← "paint coverage" | **Medium**: manufacturers | /paint-calculator (FAQ/table) | P1 |

### Cluster B — Quote template / generator (template intent) → `/decorating-quote-template`

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| painting and decorating quote template uk | template | `quotes.csv` ← "painting quote template a" | **Medium** (v0.2, was Easy–Medium): DDG UK top 10 is **all small UK quoting SaaS pages**, most dated 2026 — TradeQuoteAI (2 pages), Quotient, QuoteSmith, TradeTally, Love Invoicing, QuoteCraft, QuoteRocket, TheTradePack, QuickPrice (`data/serp-ddg-uk-2026-10-16.md`). Crowded, but no big brand | /decorating-quote-template | P0 (primary) |
| free painting and decorating quote template uk | template | `quotes.csv` ← "painting quote template u" | **Easy–Medium**: same | same | P0 |
| painter and decorator quote template | template | `quotes.csv` ← "painter and decorator quote" | **Medium**: Better Proposals, TradeQuoteKit, Quotient, Quotify, TradeQuoteAI, QuoteRocket ("Make a Quote in 60 Seconds" — same claim as ours), PandaDoc | same | P0 |
| decorating quote template | template | `quotes.csv` ← seed itself | **Medium**: same SaaS set + ExtraflowDoc, template.net | same | P0 |
| painting quote template (free / word / excel / pdf) | template | `quotes.csv` ← "painting quote template" + a–z | **Medium–Hard**: US SaaS (PandaDoc, Jobber, Joist, InvoiceOwl, Skynova); spam template mirrors on .ac.uk/.gov domains | same | P0 (secondary) |
| painting quote generator | tool | `invoices.csv` ← "painting invoice g" (suggested alongside) | **Medium**: US generators | same | P0 (secondary) |
| how to write a painting and decorating quote | info | `quotes.csv` ← "how painter and decorator quote" | **Easy–Medium**: few UK pieces seen | same page (section) → later guide if it ranks separately | P1 |
| what should a painting quote include / do painting quotes include paint | info (FAQ) | `quotes.csv` question forms | **Easy–Medium** | same page (FAQ) | P0 |
| painting estimate template | template (US word) | `quotes.csv` ← "painting estimate template" (many variants) | **Hard** for us (US SaaS) | same page (secondary mention only) | P2 |
| painting and decorating quote example | template/info | `quotes.csv` | **Easy–Medium** | same page (worked example) | P0 |

### Cluster C — Invoice template / generator (template intent) → `/decorating-invoice-template`

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| painting and decorating invoice template (uk) | template | `invoices.csv` ← "painter and decorator invoice", "decorating invoice template" | **Medium** (crowded): DDG UK top 10 — InvoiceJob (no sign-up, PDF built in the browser, VAT incl. reverse charge, UTR field, £29 one-off premium), InvoiceAdept (CIS & VAT guide), TradeTally, an Etsy listing, FreeInvoiceMaker, TopNotepad, invoiceg, Online Invoices, GenieAI, OpenDocs | /decorating-invoice-template | P0 (primary) |
| decorating invoice template uk | template | `invoices.csv` ← "decorating invoice template" | **Medium**: without "uk" the SERP turns generic (Canva, Adobe, Microsoft, Invoice Ninja) | same | P0 |
| painter and decorator invoice template | template | `invoices.csv` ← "painter invoice template a" | **Medium**: TapTax, InvoiceJob, InvoiceAdept, TradeTally, InvoiceSimple, InvoiceKoi, InvoiceWall, tradeinvoice.app | same | P0 |
| painting and decorating invoice example uk | template/info | `invoices.csv` ← "painter and decorator invoice" | **Easy–Medium** | same (worked example) | P0 |
| painting invoice generator | tool | `invoices.csv` ← "painting invoice g" | **Medium**: Jobber, InvoiceSimple | same | P0 (secondary) |
| how to write an invoice for painting and decorating / how to write an invoice for a painting job | info | `invoices.csv` ← "painter invoice template a" | **Easy–Medium** | same (section) | P0 |
| what should be on an invoice uk / what to include on an invoice uk | info | `invoices.csv` | **Hard**: GOV.UK, Sage, SumUp, FreeAgent | same (section, cite GOV.UK) | P1 |
| invoice template uk no vat / sole trader invoice template uk | template (generic) | `invoices.csv` | **Hard**: SumUp, Sage, Bytestart, Billdu, Zervant | same (secondary, don't chase) | P2 |
| cis invoice template uk / reverse charge vat invoice template uk | template (niche) | `invoices.csv` | **Medium** | FAQ on same page; later a section if demand shows in GSC | P2 |

### Cluster D — Pricing a job (decorator intent) → guides

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| how to price a painting job uk / how to price up a painting job uk / how to price a painting and decorating job | info (trade) | `pricing.csv` ← "how to price a painting job" | **Medium–Hard**: DDG UK — ukcalculator, QuoteSmith (2 guides), TradesChecker, Sleepless Tradesman, cypaint, Quote-Guru, BestBuilders, Trade2Base, TradeQuoteAI | /guides/how-to-price-a-painting-job | P1 |
| painter and decorator day rate uk / self employed painter and decorator day rate / how much should a painter and decorator charge per day | info (both) | `pricing.csv` ← "painter and decorator day rate" | **Hard**: DDG UK — Checkatrade, tradedayrates.co.uk, Sleepless Tradesman ("£140–£270/day"), MyBuilder, Trade2Base, plus several programmatic rate sites (tradapt, pricethejob, consumer-advisory) | /guides/painter-decorator-day-rate | P1 |
| how much does a painter and decorator charge (per day / per room) uk | info (homeowner) | `pricing.csv` (very many variants) | **Hard**: Checkatrade, MyBuilder, Which?, Fantastic Services, Bark, Rated People | covered by day-rate guide; don't build a separate homeowner page yet | P2 |
| painting and decorating pricing app / painter decorator cost calculator / decorating costs uk calculator | tool/commercial | `pricing.csv`, `mtd-tax.csv`, `extra-calculators.csv` | **Easy–Medium** | /paint-calculator (labour + price) and home | P1 |
| how long to paint a room (uk / 2 coats / calculator) | info | `pricing.csv` ← "how long to paint a room"; `extra-calculators.csv` ("how long to paint a room calculator", "painting time calculator") | **Medium**: DIY sites, US | /guides/how-long-to-paint-a-room (P2), linked to calculator "days" output | P2 |
| self employed painter and decorator hourly rate uk / self employed painter and decorator day rate | info (trade) | `extra-business.csv` ← "self employed painter and decorator" | **Medium** | /guides/decorator-day-rate (secondary) | P1 |
| how to start a painting and decorating business uk | info (trade, new starters = template users) | `extra-business.csv` ← "starting a painting and decorating business" | **Medium**: Simply Business, Tradify, Checkatrade blogs (assumed — not checked) | later guide `/guides/start-a-decorating-business` | P2 |
| public liability insurance for self employed painter and decorator | commercial (insurance) | `extra-business.csv` | **Hard**: insurers | not targeted (not our product) | — |
| painting and decorating cost calculator / decorating costs uk calculator | tool | `extra-calculators.csv` ← "decorating cost calculator" | **Easy–Medium** | /paint-calculator (secondary via price output) | P1 |
| wallpaper calculator (uk) / how many rolls of wallpaper / calculate wallpaper needed with repeat | tool | `extra-calculators.csv` ← "wallpaper calculator" | **Medium–Hard**: retailers (Dunelm, B&Q), brands | `/wallpaper-calculator` (second free tool, after the P0s) | P2 |
| cost to paint a room uk | info (homeowner) | `pricing.csv` | **Hard**: lead-gen sites | not targeted in v0.1 | — |
| painter and decorator `<city>` prices | local (homeowner) | `pricing.csv` (40+ towns) | **Hard**: Checkatrade, MyBuilder, bizhub365 programmatic pages | **not targeted** (no real local data; doorway risk) | — |

### Cluster E — App / software (commercial intent) → home page

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| quoting app for painters / app for painters and decorators | commercial | `apps.csv` ← "quote app p", seed | **Hard**: Powered Now, AppyQuote, Payaca (WebSearch) + DDG UK shows ≥ 10 small painter-specific apps (The Painters App, PaintersQuote, Jotquote, Queezy, Sleepless Tradesman, PaintPilot, TaskArc, PainterPal, thecontractor.app) — a very crowded new category | / | P1 |
| tradesman quote app / quote app for contractors | commercial | `apps.csv` ← "tradesman app", "quote app" | **Hard**: Tradify, YourTradebase, Jobber | / | P1 |
| best invoice app for tradesmen uk / invoice app for sole traders | commercial | `apps.csv` ← "invoice app for tradesmen u" | **Hard**: listicles + SaaS | / (secondary) + directory listings | P2 |
| free invoice app uk no subscription / free quoting software uk | commercial | `apps.csv` | **Hard** | / (Free plan messaging) | P2 |
| voice quote app / ai quote generator app | commercial | `apps.csv` ← "ai quote generator app", "quote ai app" | **Medium** (new category: Fixxa, VoxTrade, TradeQuoteAI) | / | P1 |
| tradify alternative / powered now alternative | commercial | **not collected** (no seed run) — assumption | unknown | /compare/… (later) | P2 — check in Keyword Planner |

### Cluster F — Tax & admin (seasonal) → guides

| Keyword | Intent | Evidence of demand | SERP difficulty + who ranks | Target page | Priority |
|---|---|---|---|---|---|
| do painters and decorators charge vat / do decorators charge vat | info | `mtd-tax.csv` ← "do decorators charge vat" | **Medium**: DDG UK — accountancy blogs (business-accounting.co.uk ×2, Yorkshire Accountancy, SimpleTaxes, Finistry, Atlas Tax), quote2.co.uk, an HMRC manual page | /guides/do-decorators-charge-vat | P1 |
| making tax digital april 2027 / making tax digital under 30000 / making tax digital for sole traders | info | `mtd-tax.csv` ← "making tax digital a", "…u" | **Hard**: GOV.UK, Xero, QuickBooks, Sage, MSE, banks | /guides/making-tax-digital-for-decorators (angle: what a decorator over £30k must do by April 2027; we don't file MTD) | P1 (publish Jan 2027) |
| painter and decorator allowable expenses | info | `mtd-tax.csv` ← "painter and decorator expenses" | **Easy–Medium** | /guides/painter-decorator-expenses | P2 (publish early Jan, Self Assessment 31 Jan) |

## 4. Question bank (People-also-ask stand-ins)

Real Google UK autocomplete question forms (not PAA scraped — see §0). Use as FAQ headings in this wording.

- **Paint (`paint.csv`, `extra-paint-tech.csv`):** how much paint do i need for a room · how many litres of paint do i need for a bedroom · how many rooms will 5 litres of paint cover · what area does 5 litres of paint cover · how many walls will 2.5 litres of paint cover · how much does 1 litre of paint cover · does paint coverage include 2 coats · is paint coverage per coat · how much paint do i need for hall stairs and landing · how much paint do i need for a 4m x 4m room · how much paint for a bedroom ceiling · how many coats of paint after mist coat · how many coats of paint does new plaster need · how many coats of paint can you do in a day · how much paint do i need for skirting boards.
- **Quotes (`quotes.csv`, `extra-howto.csv`):** how to write a decorating quote · how should a quote be written · free quote vs free estimate · what should a painting quote include · do painting quotes include paint · how do painters quote jobs · how to write a painting and decorating quote · how to quote painting a room · what does a painting quote look like · how much to quote for painting.
- **Invoices (`invoices.csv`):** how to write an invoice for painting and decorating · what should be on an invoice uk · is it a legal requirement to provide an invoice uk · how long to pay an invoice uk · what is an invoice number uk · invoice template with bank details uk · free invoice template uk no vat.
- **Pricing (`pricing.csv`):** how do you price a painting job · how much should a painter and decorator charge per day · what is the average day rate for a painter and decorator · how much does a painter and decorator charge per room · how long does it take to paint a room professionally · how long to paint a room 2 coats.
- **Tax (`mtd-tax.csv`):** do painters and decorators charge vat · does making tax digital apply to sole traders · is making tax digital on turnover or profit · making tax digital under 30000 · making tax digital and cis.

**Reddit sample (v0.2, `data/reddit-sample-2026-10-16.md`)** — about 6,300 recent posts from 11 subreddits, filtered locally:

- **r/DIYUK** (2,500 posts, 27/09–15/10/2026): only 14 posts on paint quantity/coats, and **most are about mist coats** ("Mist coat failed", 83 comments; "Painting mist coat tips"; "Sanding mist coat"; "How to paint freshly plastered bathroom ceiling?"). People Google "how much paint" and ask Reddit about problems → mist coat / new plaster is a strong FAQ and a future guide. "Painting hallway" (23 comments): newly plastered hallway, decorator quoted one day — "wouldn't it need time to dry?" → supports the "how long to paint a room" guide and showing drying time on quotes.
- **r/smallbusinessuk** (1,000 posts, 07/08–15/10/2026): "Advice: best software for invoices…" (19), "How does everyone handle clients who pay late?" (40), "I think I've massively underpriced my services" (92), "Trades, how did you start?" (31), VAT-threshold pain (79) → late-payment section on the invoice page; underpricing angle for the pricing guide.
- **r/HomeImprovementUK** (500 posts): "Tradesman day rate and quoting other work" (45) — homeowners question what a day rate covers → the day-rate guide should explain the day from both sides.
- **r/UKPersonalFinance** (1,500 posts): "Non VAT registered. PO received with VAT inc, invoicing without…" (11) → invoice FAQ.
- **Not usable:** r/uktrades and r/DecoratingUK returned 0 posts from the archive; r/painting is fine art; r/HousePainting is mostly US; r/PaintingAndDecorating and r/Decorators are inactive (last posts 2020/2022).

**Forum evidence (qualitative, v0.1):** MoneySavingExpert thread "Day job costs for a painter decorator" (forums.moneysavingexpert.com/discussion/2786670) — "if a job takes any more than ½ a day you need a whole day" and day rate must cover van and "invisible" materials; The Decorators Forum post "How to Price a Decorating Job" (thedecoratorsforum.com/?p=11045) — work out weekly running costs, unpaid quoting time, insurance first. Reddit (r/DIYUK, r/uktrades) could not be read (HTTP 403) — founder should read 10 threads by hand (§6).

## 5. Competitor notes (pages actually read)

| Page | Type | Strength | What it misses (our gap) |
|---|---|---|---|
| tikkurila.co.uk/how-much-paint-do-i-need | Brand calculator, wall/room mode | Big brand; ~600 words; 10 m²/L; deductions door 2 m², small window 1 m², large window 4 m² | No labour, days, £, multi-room, ceiling, quote |
| dulux.co.uk/en/expert-help/how-much-paint-do-you-need | Brand guide, no tool on page | Biggest UK paint brand; ~400 words; rules of thumb (2.5 L for 2×2 m room, 5 L for 4×4 m room, 750 ml for door/skirting) | No tool here, no FAQ, no labour/£ |
| tradecalculator.co.uk/painting/paint-coverage-calculator | Small UK calculator site | Updated Sept 2026; paint-type coverage table (matt 12, silk 14, oil eggshell 10, gloss 14 m²/L); door 1.8 m², window 1.2 m²; 6 FAQs; ~1,100 words; affiliate + lead-gen | No labour/time, ceiling separate, no multi-room, no author |
| sleeplesstradesman.com/tools/paint-coverage-calculator | **Direct competitor** (AI quoting SaaS) | ~2,000 words, 13 FAQs, Bristol worked example, CTA to PDF invoice + AI quoting; 13+ other trade tools | Headline result (10 L, £72) contradicts its own breakdown (5.6 L, £34) — accuracy is a trust gap we can win on; no labour days |
| inv24.uk … painting+and+decorating+quote+template+uk | Template mirror site | Ranks with ~30 words + Word download; big internal link hub | No fields, no guidance, no example, no generator without registration |
| quotecraft.co/templates/painter-decorator-quote-template | UK SaaS template page | Exact-match title | Content could not be read (JS-rendered) |
| trade2base.com/blog/decorator-day-rate-uk | Competitor SaaS blog | ~3,300 words, regional table, 8 Jun 2026 | No author, no sources for any figure |
| GOV.UK "Invoices: what they must include" | Official | The authority we cite on the invoice page | — |

New in v0.2 (read 16/10/2026):

| Page | Type | Strength | What it misses (our gap) |
|---|---|---|---|
| tradequoteai.com/blog/painter-decorator-quote-template-uk.php | AI quoting SaaS blog (28/09/2026) | 9 sections, copy-paste wording, itemised bedroom example (£675), separate no-sign-up generator, ~10 internal links | No author; no cancellation rights / Consumer Rights Act; no downloadable file |
| invoicejob.co.uk/decorator-invoice | UK invoice generator | **Strongest invoice competitor:** no sign-up, PDF built in the browser, live preview, bank details, VAT rates incl. reverse charge, UTR field; £29 one-off premium; ~22 trade invoice pages | **No FAQs**, ~800 words, generic across trades (near-duplicate decorator/painter pages), no quote → invoice flow |
| ukcalculator.com/paint-calculator.html | Calculator site | Room presets, ceiling toggle, surface condition incl. new plaster, retailer tin sizes, embed code, 8 FAQs + "People also ask" block, ~2,500–3,000 words | No labour/price, no multi-room; **internal contradictions** (door 1.5 vs 2.0 m², conflicting dates and prices) — accuracy and consistency are our edge |

Screenshots: `capture-ref.ps1` returned FAIL for every URL in this run (probable cause, unconfirmed: the shared headless-Chrome profile was in use by the design agent at the same time); a separate headless Chrome run reached Google UK but got a CAPTCHA page (deleted, no value). No `seo-*` reference images were kept. Re-try later with the founder's normal browser if visual SERP review is wanted.

## 6. What could not be checked (and the post-launch replacement)

The founder won't do manual checks (decision 16/10/2026), so:

| Check | Status | Replacement |
|---|---|---|
| Google UK SERP order + features (PAA, snippets, video) | **Not possible** — CAPTCHA on every attempt (15 and 16/10/2026) | DDG UK proxy snapshot now; Search Console queries/positions from November |
| Search volumes (Keyword Planner) | **Not possible** — needs the founder's Google account | Post-launch: GSC impressions per query are the volume signal (`measurement.md` §4) |
| Bing keyword data | Not possible without an account | Post-launch: import the GSC property into Bing Webmaster Tools (2 minutes) |
| r/uktrades, decorators' Facebook groups | Not available (archive returned 0 posts; Facebook needs login) | Read only when posting for feedback (`link-building.md` §4) |
| Google Trends seasonality | Not checked (Google blocks scripted access from this IP) | GSC month-on-month from Dec 2026 |

Keyword list for any later Keyword Planner / Bing check: paint calculator · paint calculator uk · how much paint do i need · how many litres of paint do i need · paint calculator walls and ceiling · paint calculator multiple rooms · painting and decorating quote template · painter and decorator quote template · decorating quote template · painting quote template · painting and decorating invoice template · painter and decorator invoice template · painting invoice template · how to price a painting job · painter and decorator day rate · do decorators charge vat · quoting app for painters · tradify alternative · powered now alternative · mist coat.
