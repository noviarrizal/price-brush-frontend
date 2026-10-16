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
| **"New plaster" option** adds a mist coat (shown as an extra coat, with a one-line explanation, and a link to the FAQ on mixing and drying) | "how many coats of paint after mist coat", "how many coats does new plaster need" (`extra-paint-tech.csv`); mist-coat problems are the most common paint topic in r/DIYUK (v0.2 Reddit sample) |
| Advanced (collapsed): coverage m²/L (default **12**, "check your tin"), spare % (default 10), door area (1.8 m²), window area (1.5 m²), **day rate** (£200), **painted m² per day** (default 45 — *assumption, validate with 5 decorators*), paint £ per litre (£6 — *assumption*) | Trade inputs nobody else has; all editable = honest |
| Output, live without reload: **"You need 9 litres"**, **tins to buy** using UK sizes (walls/ceiling emulsion: 10 L, 5 L, 2.5 L, 1 L), net wall area, ceiling area, **days**, **labour £ + paint £ = rough price** | Litres + tins answers DIY; days + £ answers trade |
| **Show the working** under the result ("32.7 m² walls × 2 coats ÷ 12 m²/L = 5.5 L, + 10% spare = 6.0 L") | Accuracy is a trust gap (Sleepless Tradesman's headline and breakdown disagree). Never show numbers that disagree |
| **Copy result** and **Share** (Web Share API → WhatsApp) with a URL that encodes only the room numbers (`?r=4x3.5x2.4,d1,w1,c2`) | Decorators send it to clients/merchants = free distribution. Canonical stays `/paint-calculator` |
| **"Turn this into a quote"** button: hands the rooms and totals to `/decorating-quote-template` via `localStorage` (no server) and pre-fills lines | Converts a calculator user into a template user, then sign-up |
| Empty/invalid states as in design `screens.md` | Avoids nonsense results |
| Works with JS off: the prerendered HTML must contain the H1, intro, method, table and FAQs; the tool can hydrate | Google reads content without waiting; also LCP |

**Formulas (put in code exactly so the page and the "working" match):**

- Wall area per room = 2 × (length + width) × height − doors × door area − windows × window area (floor at 0).
- Ceiling area = length × width.
- Litres = (wall area × wall coats + ceiling area × ceiling coats) ÷ coverage × (1 + spare%). Round to 0.1 L for display.
- Tins: list combinations of 10/5/2.5/1 L that are ≥ litres; take the one with the least spare paint, **but** if another option has ≤ 1 L more spare and fewer tins, take that one. Show one line, e.g. "Buy: 1 × 10 L" or "Buy: 1 × 5 L + 1 × 1 L".
- Days = (wall area × coats + ceiling area × coats) ÷ m² per day, round up to the nearest half day ("if a job takes more than ½ a day, you need a whole day" is a real trade rule — MSE forum thread, see research §4; offer it as the default rounding).
- Rough price = days × day rate + litres bought × £/L. Label it **"Rough price — check prep, access and woodwork before you quote."**

**Worked example to show on the page (numbers must match the tool):** bedroom 4 m × 3.5 m × 2.4 m, 1 door, 1 window, 2 coats, walls + ceiling, 12 m²/L, 10% spare → walls 32.7 m², ceiling 14.0 m² → (32.7 × 2 + 14.0 × 2) ÷ 12 × 1.1 = **8.6 L** → buy **1 × 10 L** (least-waste option 5 + 2.5 + 1 + 1 L = 9.5 L is within 1 L but needs 4 tins) → 93.4 m² ÷ 45 = 2.1 days → **2.5 days** at £200 = £500 labour + 10 L × £6 = £60 paint → **rough price £560**. (Day rate, speed and £/L are example defaults, not market claims.)

### 2.2 Sections below the tool (in this order)

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
   - Why did my mist coat go powdery? *(v0.2 — real r/DIYUK thread, 83 comments: usually too much water or the wrong emulsion; follow the tin's dilution and use a contract/trade matt without vinyl — check manufacturer guidance before writing the final answer)*
   - How long should I leave new plaster before painting? *(dry through and evenly coloured; follow plasterer/manufacturer guidance — r/DIYUK "Painting hallway" thread)*
   - Should I buy 2.5 L or 5 L tins?
   - Do I need to take off doors and windows? *(yes; we use 1.8 m² and 1.5 m², change them in Advanced)*
6. **Short sources line**: "Coverage figures: manufacturers' data sheets (links). Defaults last checked: [date]."

### 2.3 Copy rules

- UK English: litres, metres, colour, "tin" not "can", "emulsion", "skirting", "decorator".
- Intro (≤ 50 words) directly under H1: "Enter your room size to see how many litres and which tins to buy. Decorators can add a day rate to get days and a rough price, then turn it into a quote." Contains "how much paint" naturally once.
- No keyword stuffing: the exact phrase "paint calculator" ≤ 4 times in body copy.
- Never claim "most accurate" or "used by X decorators" until it's true.

## 3. Word count

**1,200–1,800 words** of real copy below the tool (TradeCalculator ~1,100, Sleepless Tradesman ~2,000). Depth comes from the table, worked example and FAQs, not padding.

## 4. Schema (JSON-LD in the prerendered HTML)

- `WebApplication` (name "PriceBrush Paint Calculator", `applicationCategory: "UtilitiesApplication"`, `operatingSystem: "Any"`, `offers: {price: 0, priceCurrency: "GBP"}`, `url`, `inLanguage: "en-GB"`). **No `aggregateRating`** until we have real reviews.
- `BreadcrumbList`: Home › Paint calculator.
- `FAQPage` for the FAQ block is allowed but **Google shows FAQ rich results only for authoritative government/health sites (since Aug 2023)** — add it only if trivial; don't expect a rich result.
- `HowTo` is valid schema but Google no longer shows HowTo rich results (2023) — skip.
- Full JSON-LD snippets: `../technical-seo.md` §5.

## 5. CTA to sign-up

- Primary, beside the result (desktop) / under it (mobile): **"Quote this job by voice in 60 seconds — try free"** → Google sign-in. Caption: "Free for 5 documents a month. No card."
- Secondary: **"Turn this into a quote"** (free template, no login) — keeps non-ready users in our funnel.
- Measure clicks on both (see `../measurement.md`).
- No pop-ups, no email gate (Loom & Glow and Tikkurila have none; a gate would lose the DIY links).

## 6. Internal links

- **Out:** `/decorating-quote-template` (CTA + section 4) · `/guides/how-to-price-a-painting-job` (section 4) · `/` (CTA) · room pages when live · `/guides/how-long-to-paint-a-room` from the "days" output (when live).
- **In:** home "Free tools" card · quote and invoice template pages ("work out the paint first") · all guides · footer "Free tools" list.
- Anchor text: descriptive ("paint calculator", "work out how much paint you need"), never "click here".

## 7. E-E-A-T signals (true ones only)

- **Show the method and defaults** with sources (manufacturer data sheets; the MSE/Decorators Forum rule for half days).
- **"Last checked" date** for the defaults; update it when they change.
- **About link** with the real founder — **Arif Noviarrizal, independent developer building PriceBrush** (decided 16/10/2026; no location, trade background or credentials until he provides them) — and why the defaults are what they are. No fake reviews or user counts.
- Be **internally consistent** (one door size, one date, one price everywhere) — ukcalculator.com's contradictions are an easy way to look less trustworthy than us.
- **Invite corrections:** "Decorator? Tell us if our m² per day is off" (mailto) — honest and gets us the validation the PRD asks for.
- Once 5–10 decorators have validated the speed default, say so: "Default speed checked with N UK decorators (Oct–Nov 2026)" — only if true.

## 8. Acceptance checklist (for the developer)

- [ ] Prerendered HTML contains H1, intro, all section text and FAQs (view-source check).
- [ ] Title/meta/canonical/OG exactly as `keyword-map.md`.
- [ ] Worked example numbers = tool output for the same inputs.
- [ ] Shareable URL restores the rooms; canonical has no parameters.
- [ ] Lighthouse mobile ≥ 90 performance, LCP < 2.5 s on simulated 4G, CLS < 0.1.
- [ ] "Turn this into a quote" pre-fills the quote template.
