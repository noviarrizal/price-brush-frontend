# Brief — `/paint-calculator` (P0, live by 31/10/2026)

Keyword map entry: `../keyword-map.md` · Evidence: `../keyword-research.md` Cluster A · UI spec (owned by design): `../../design/screens.md` § P2 — this brief adds SEO requirements on top; where they differ, flag it to design rather than overriding.

## 1. Search intent

- **Who searches:** two groups. (a) **Homeowners/DIY** ("how much paint do i need", "how many litres of paint for a bedroom") — the majority, won't pay, but they bring volume, links and brand exposure. (b) **Decorators** ("paint calculator multiple rooms", "paint calculator walls and ceiling", "paint labour calculator", "paint calculator price") — fewer, but they're the buyer.
- **What they want in 10 seconds:** a number of **litres** and **which tins to buy** for their room, without sign-up. Decorators additionally want **days on the job and a rough price** they can quote from.
- **Page type Google rewards here:** a working tool at the top, then a short method, a coverage table and FAQs (Tikkurila, TradeCalculator and Sleepless Tradesman all follow this pattern; Dulux ranks with a guide but has a separate calculator page).

## 2. Must-haves to beat the current top 3

Benchmarks read (see `../keyword-research.md` §5): Dulux guide (~400 words, no tool), Tikkurila (tool, ~600 words, 10 m²/L), TradeCalculator (tool, ~1,100 words, 6 FAQs, ceiling in a separate tool), Sleepless Tradesman (tool, ~2,000 words, 13 FAQs, result inconsistent). **v0.2:** the UK proxy SERP (`../data/serp-ddg-uk-2026-10-16.md`) for "paint calculator" is led by **B&Q, Dulux and Wickes** calculators plus ukcalculator.com (~2,500–3,000 words, room presets, new-plaster option, retailer tin sizes, embed code — but contradicts itself on door size, dates and prices). Expect the head term to take many months; aim first at "paint calculator uk", "multiple rooms", "walls and ceiling" and the labour/price phrases.

### 2.1 Tool behaviour (above the fold on mobile 360 px and desktop)

| Requirement | Why (gap it closes) |
|---|---|
| Inputs in **metres**: length, width, height (default 2.4 m), doors (default 1), windows (default 1), coats (1/2/3, default 2), "Include ceiling" toggle | Same as best competitors — table stakes |
| **Add another room** → job total (litres, tins, days, £) | "paint calculator multiple rooms" — none of the tools read do this |
| Walls and ceiling in **one** result, shown separately (ceiling paint is often a different product) | "paint calculator walls and ceiling" — TradeCalculator needs two tools |
| **"New plaster? Add a mist coat"** switch (decision #3; #6 in the 31/10 cut order, required in the Nov app) adds a mist coat (shown as an extra coat, with a one-line explanation, and a link to the FAQ on mixing and drying) | "how many coats of paint after mist coat", "how many coats does new plaster need" (`extra-paint-tech.csv`); mist-coat problems are the most common paint topic in r/DIYUK (v0.2 Reddit sample) |
| Advanced (collapsed): coverage m²/L (default **12**, "check your tin"), spare % (default 10), door area (1.8 m²), window area (1.5 m²), **day rate** (£200), **painted m² per day** (default 40 — *assumption, validate with 5 decorators*; spec D4), paint £ per litre (£6 — *assumption*) | Trade inputs nobody else has; all editable = honest |
| Output, live without reload: **"You need 9 litres"**, **tins to buy** using trade sizes 10 L, 5 L, 2.5 L, listed separately for walls, ceiling and mist coat (spec D2, D3), net wall area, ceiling area, **days**, **labour £ + paint £ = "Your price at your day rate"** | Litres + tins answers DIY; days + £ answers trade |
| **Show the working** under the result ("32.7 m² walls × 2 coats ÷ 12 m²/L = 5.5 L, + 10% spare = 6.0 L") | Accuracy is a trust gap (Sleepless Tradesman's headline and breakdown disagree). Never show numbers that disagree |
| **Copy result** and **Share** (Web Share API → WhatsApp) with a URL that encodes only the room numbers (`?r=4x3.5x2.4,d1,w1,c2`) | Decorators send it to clients/merchants = free distribution. Canonical stays `/paint-calculator/` (slash form, see `../technical-seo.md` §2.1) |
| **"Turn this into a quote"** button: hands the rooms and totals to `/decorating-quote-template` via `localStorage` (no server) and pre-fills lines | Converts a calculator user into a template user, then sign-up |
| Empty/invalid states as in design `screens.md` | Avoids nonsense results |
| Works with JS off: the prerendered HTML must contain the H1, intro, method, table and FAQs; the tool can hydrate | Google reads content without waiting; also LCP |

**Formulas** — *superseded 17/10/2026 by `../../specs/paint-calculator.md` (founder signed off D1–D6). The engine spec is the source of truth; the summary below is kept in line with it.*

- Wall area per room = 2 × (length + width) × height − doors × 1.8 m² − windows × 1.5 m² (floor at 0), rounded to 0.1 m².
- Ceiling area = length × width, rounded to 0.1 m².
- Litres, per paint (walls / ceiling / mist coat) = coated m² ÷ coverage × (1 + spare%). Shown **rounded up** to 0.1 L.
- Tins, per paint: combinations of 10/5/2.5 L that are ≥ litres; among those within 1 L of the least spare, take the fewest tins. Show e.g. "Buy: Walls 1 × 5 L + 1 × 2.5 L · Ceiling 1 × 5 L".
- Days per line (room × surface) = m² × coats ÷ m² per day, rounded to 0.1 day. Labour = sum of the lines × day rate, so the lines always add up to the price. "Time on the job" = labour days (+ ½ day drying once if there's a mist coat), rounded **up** to the nearest half day — shown, not charged (the MSE "more than ½ a day means a whole day" rule lives here; a "round my price up" switch may come later).
- Price = labour + tins bought × £/L. Label it **"Your price at your day rate"** (CEO decision #1, accepted 17/10/2026), with the caption **"Check prep, access and woodwork before you quote."**

**Worked example to show on the page (numbers must match the tool; spec test T1):** bedroom 4 m × 3.5 m × 2.4 m, 1 door, 1 window, 2 coats, walls + ceiling, 12 m²/L, 10% spare → walls 32.7 m², ceiling 14.0 m² → walls 32.7 × 2 ÷ 12 × 1.1 = 6.0 L, ceiling 14.0 × 2 ÷ 12 × 1.1 = 2.6 L → **8.6 L** → buy walls **1 × 5 L + 1 × 2.5 L**, ceiling **1 × 5 L** → walls 65.4 m² ÷ 40 = 1.6 days, ceiling 28 m² ÷ 40 = 0.7 days → 2.3 days at £200 = £460 labour + 12.5 L × £6 = £75 paint → **your price at your day rate: £535** (time on the job: about 2.5 days). (Day rate, speed and £/L are example defaults, not market claims.)

### 2.2 Sections below the tool (in this order)

> **Copy is drafted (17/10/2026, CEO R2 accepted 18/10): `../drafts/paint-calculator-copy.md`.** The draft wins over the notes below wherever they differ. Every litre, tin, day and £ figure in it is a `{calc: …}` / `{default: …}` placeholder that the engineer fills from `calculateJob` in T6b — the numbers in italics below are background only and must not be copied onto the page. The coverage table now uses figures from named UK product pages (9 opened 17/10/2026, 1 from spec §9) instead of the ranges guessed here. Sections that only work with the ceiling / mist-coat switches (T16) are tagged, with T17 fallbacks.

1. **How we work it out** — the 4 steps in plain words + the formula (H2 "How to work out how much paint you need"). ~200 words.
2. **Paint coverage per litre (UK)** — table: matt emulsion ~12 m²/L, silk ~12–14, contract/trade matt ~10–12, ceiling emulsion ~10–12, water-based eggshell/satinwood ~12–14, gloss ~14–16 (*ranges from manufacturer data sheets — cite 2–3 real UK product pages when writing; never one brand only*). Note: "Fresh plaster, dark-to-light colour changes and rough surfaces use more." ~150 words.
3. **How much paint for a typical UK room** — small table of 4 presets calculated by the tool itself (box room 2.5 × 2 m, double bedroom 4 × 3.5 m, living room 5 × 4 m, hall stairs and landing (estimate method explained)). Each row links to the room page later (P2). ~250 words.
4. **For decorators: turn litres into a price** — 3 short paragraphs: days from m² per day, day rate, materials markup is your choice; link to `/guides/how-to-price-a-painting-job` and the quote template. CTA card. ~200 words.
5. **FAQ** (H2 "Paint calculator FAQs") — use these exact questions (from autocomplete, research §4), 40–80-word answers:
   - How much paint do I need for a room?
   - How many rooms will 5 litres of paint cover? *(≈ 60 m² of one coat at 12 m²/L → the walls of a room about 3 m × 3.5 m × 2.4 m with two coats, ceiling not included)*
   - What area does 5 litres of paint cover?
   - How much does 1 litre of paint cover?
   - Does paint coverage include 2 coats? / Is paint coverage per coat? *(per coat — the tin figure is for one coat)*
   - How much paint do I need for hall stairs and landing?
   - How many coats of paint does new plaster need? *(mist coat + 2 full coats is common practice; follow the manufacturer)*
   - Do I need a mist coat on new plaster, and how does the calculator count it? *(17/10/2026, CEO decision #3: bare new plaster is normally sealed with a diluted mist coat before the full coats — follow the tin's dilution. Tick "New plaster? Add a mist coat" and the calculator adds one coat, its litres and drying time as a separate line, so the extra visit shows up in days and price. Check manufacturer guidance before writing the final answer.)*
   - Why did my mist coat go powdery? *(v0.2 — real r/DIYUK thread, 83 comments: usually too much water or the wrong emulsion; follow the tin's dilution and use a contract/trade matt without vinyl — check manufacturer guidance before writing the final answer)*
   - How long should I leave new plaster before painting? *(dry through and evenly coloured; follow plasterer/manufacturer guidance — r/DIYUK "Painting hallway" thread)*
   - Should I buy 2.5 L or 5 L tins?
   - Do I need to take off doors and windows? *(yes; we take off 1.8 m² per door and 1.5 m² per window. Editable sizes may come later — spec §13)*
6. **Short sources line**: "Coverage figures: manufacturers' data sheets (links). Defaults last checked: [date]."

### 2.3 Copy rules

- UK English: litres, metres, colour, "tin" not "can", "emulsion", "skirting", "decorator".
- Intro (≤ 50 words) directly under H1: "Enter your room size to see how many litres and which tins to buy. Decorators can add a day rate to get days and their price, then turn it into a quote." Contains "how much paint" naturally once.
- No keyword stuffing: the exact phrase "paint calculator" ≤ 4 times in body copy.
- Never claim "most accurate" or "used by X decorators" until it's true.

## 3. Word count

**1,200–1,800 words** on the whole page, including the ~380 already there (CEO R2, accepted 18/10/2026; TradeCalculator ~1,100, Sleepless Tradesman ~2,000). Depth comes from the table, worked example and FAQs, not padding. The draft measures ≈ 1,790 words with T16, ≈ 1,730 with the T17 fallback (script count, draft header).

## 4. Schema (JSON-LD in the prerendered HTML)

- `WebApplication` (name "PriceBrush Paint Calculator", `applicationCategory: "UtilitiesApplication"`, `operatingSystem: "Any"`, `offers: {price: 0, priceCurrency: "GBP"}`, `url`, `inLanguage: "en-GB"`). **No `aggregateRating`** until we have real reviews.
- `BreadcrumbList`: Home › Paint calculator.
- `FAQPage` for the FAQ block is allowed but **Google shows FAQ rich results only for authoritative government/health sites (since Aug 2023)** — add it only if trivial; don't expect a rich result.
- `HowTo` is valid schema but Google no longer shows HowTo rich results (2023) — skip.
- Full JSON-LD snippets: `../technical-seo.md` §5.

## 5. CTA to sign-up

*(Updated 17/10/2026, CEO decisions #1 and #2.)*

- **31/10 until the app is live (~22/11):** there are no accounts, so there is no sign-up CTA. Primary button beside the result (desktop) / under it (mobile): **"Turn this into a quote"** → `/decorating-quote-template`, pre-filled. Pages that link *to* the calculator use the CTA **"Price a room free"**.
- **After the MVP:** primary stays **"Turn this into a quote"**; add the app CTA **"Start a free quote"** → Google sign-in. Caption: "Free for 5 documents a month. No card."
- Copy bans: no "60 seconds", no "by voice" until voice works in the live app, no "quote → invoice in one tap" (use **"When it's accepted, it's an invoice."**), never "cheaper"/"cheapest" (use **"No per-user fees"**).
- Measure clicks on both (see `../measurement.md`).
- No pop-ups, no email gate (Loom & Glow and Tikkurila have none; a gate would lose the DIY links).

## 6. Internal links

- **Out:** `/decorating-quote-template` (CTA + section 4) · `/guides/how-to-price-a-painting-job` (section 4) · `/` (CTA) · room pages when live · `/guides/how-long-to-paint-a-room` from the "days" output (when live).
- **In:** home "Free tools" card · quote and invoice template pages ("work out the paint first") · all guides · footer "Free tools" list.
- Anchor text: descriptive ("paint calculator", "work out how much paint you need"), never "click here".

## 7. E-E-A-T signals (true ones only)

- **Show the method and defaults** with sources (manufacturer data sheets; the MSE/Decorators Forum rule for half days).
- **"Last checked" date** for the defaults; update it when they change.
- **About link** with the real founder — **Arif Noviarrizal, independent developer building PriceBrush, based in Indonesia** (decided 16/10/2026; country added by CEO P2, accepted 18/10/2026 — country only, no city, no photo; no trade background or credentials until he provides them) — and why the defaults are what they are. Byline on this page: "By Arif Noviarrizal" linking to `/about/` (draft §2.8). No fake reviews or user counts.
- Be **internally consistent** (one door size, one date, one price everywhere) — ukcalculator.com's contradictions are an easy way to look less trustworthy than us.
- **Invite corrections:** "Decorator? Tell us if our m² per day is off" (mailto) — honest and gets us the validation the PRD asks for.
- Once 5–10 decorators have validated the speed default, say so: "Default speed checked with N UK decorators (Oct–Nov 2026)" — only if true.

## 8. Acceptance checklist (for the developer)

- [ ] Prerendered HTML contains H1, intro, all section text and FAQs (view-source check).
- [ ] Title/meta/canonical/OG exactly as `keyword-map.md`.
- [ ] Worked example numbers = tool output for the same inputs.
- [ ] Long copy from `../drafts/paint-calculator-copy.md` in place; every placeholder rendered from `calculateJob`/`DEFAULT_SETTINGS`; assertions A1–A6 (draft §0.5) pass; no `{` left in the built HTML.
- [ ] Canonical, `og:url`, JSON-LD `url` and breadcrumb `item` are `https://pricebrush.pages.dev/paint-calculator/` (with the slash).
- [ ] Shareable URL restores the rooms; canonical has no parameters.
- [ ] Lighthouse mobile ≥ 90 performance, LCP < 2.5 s on simulated 4G, CLS < 0.1.
- [ ] "Turn this into a quote" pre-fills the quote template.
