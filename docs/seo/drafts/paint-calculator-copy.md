# Draft — `/paint-calculator/` long copy (v0.1)

Date: 17/10/2026 · Owner: SEO · Status: **draft for the founder's 20-minute review (truth, tone), due Tue 20/10/2026** · Then: the engineer adds it in **T6b** (plan `../../plan/2026-10-17-launch-31-oct.md`), right after T6.
Implements: CEO memo `../../ceo/decisions-2026-10-18.md` R2 (accepted 18/10) · Brief: `../briefs/paint-calculator.md` §2.2–§3 · Maths: `../../specs/paint-calculator.md` (source of truth) · Code read: `app/routes/paint-calculator.tsx`, `app/lib/paint/format.ts`, `app/lib/paint/defaults.ts`.
Author shown on the page: **Arif Noviarrizal** (the founder reviews and owns the text before it ships; SEO drafted it).

**Word count (awk/wc script, 17/10/2026, each placeholder counted as one word, link text counted, engineer notes and `>` evidence notes excluded):**

| Version | §2.0–§2.1 (H1, intro, method, worked example, tip — already on the page, rewritten here) | New sections §2.3–§2.8 (incl. ~250 words in tables) | Copy total | + tool labels (~65, from the lead's ~380 minus the existing sections) |
|---|---|---|---|---|
| T16 shipped | 314 | 1,409 | 1,723 | **≈ 1,790** |
| T17 fallback | 269 | 1,397 | 1,666 | **≈ 1,730** |

Both land inside the memo's 1,200–1,800 for the whole page, near the top. Rendered placeholders add a few tokens each ("1 × 5 L + 1 × 2.5 L"), but they are numbers and units, not prose. **Don't add more prose**; if anything has to grow, cut a coverage-table row first.

---

## 0. Rules for the engineer (read first)

### 0.1 No number typed by hand

Every litre, tin, day, m² result and £ amount on the page is a placeholder. Render it from `calculateJob` and the `format.ts` helpers, the same way the page already renders the worked example (`HowWeWorkItOut`). If a default changes, the page changes with it.

Only two kinds of number may be typed:

1. **Figures quoted from a named source**, with the link next to them (the coverage table, dilution ratios, Dulux's "up to 4 weeks"). They are facts about other people's products, not our outputs. Keep them in one constant (e.g. `COVERAGE_SOURCES`) so the FAQ ranges in §2.6 Q3–Q4 derive from it.
2. **Fixed rules of the engine** stated in words ("a tenth of a day", "half a day", "1, 2 or 3 coats", "10 L, 5 L and 2.5 L tins"), taken from spec §4–§5. If the spec changes, change these words.

### 0.2 Placeholder grammar

| Placeholder | Value | Format with |
|---|---|---|
| `{calc: CASE.totalLitres}` | `result.totalLitresShown` | `formatLitres` → "8.6 litres" |
| `{calc: CASE.wallsLitres}` · `ceilingLitres` · `mistLitres` | `paintGroups` of that surface → `litresShown` | `formatLitres` |
| `{calc: CASE.wallsTins}` · `ceilingTins` · `mistTins` | that group's `tins` | `formatTins` → "1 × 5 L + 1 × 2.5 L" |
| `{calc: CASE.wallsArea}` · `ceilingArea` | the case's (single room) labour line `areaSquareMetres` | `formatSquareMetres` → "32.7 m²" |
| `{calc: CASE.labourDays}` | `labourDays` | `formatDays` |
| `{calc: CASE.timeOnJob}` | `timeOnJobDays` | `formatDays` |
| `{calc: CASE.labourPrice}` · `paintPrice` · `totalPrice` | `labourPence` · `paintPence` · `totalPence` | `formatPence` |
| `{default: coverage}` | `DEFAULT_SETTINGS.coverageSquareMetresPerLitre` | "12 m² per litre" |
| `{default: spare}` | `sparePercent` | "10%" |
| `{default: door}` · `{default: window}` | `doorAreaSquareMetres` · `windowAreaSquareMetres` | "1.8 m²" |
| `{default: dayRate}` · `{default: paintPrice}` | `dayRatePence` · `paintPencePerLitre` | `formatPence` |
| `{default: speed}` | `squareMetresPerDay` | "40 m²" |
| `{default: height}` | `DEFAULT_HEIGHT_METRES` | "2.4 m" |
| `{default: mistDrying}` | `mistCoatDryingDays` | "half a day" when 0.5, else `formatDays` |
| `{default: lastChecked}` | `DEFAULTS_LAST_CHECKED` | as is |
| `{in: CASE.size}` | the case's room constant | "4 × 3.5 m, 2.4 m high" |
| `{in: CASE.doors}` · `{in: CASE.windows}` · `{in: CASE.height}` · `{in: CASE.dayRate}` | the case's inputs | number as is (pluralise "door"/"doors"); `formatPence` for money; "5 m" for height |
| `{derived: NAME}` | §0.4 | as stated there |
| `{contact: email}` | the PriceBrush mailbox the founder creates this week (CEO P3) | `mailto:` link |

### 0.3 Cases (put them in one file, e.g. `app/lib/paint/page-examples.ts`)

All use `DEFAULT_SETTINGS` unless the row says otherwise. 2 coats, no new plaster, unless stated. `CEILING_ON` = `true` if T16 has shipped, `false` for the T17 fallback.

| Case | Room inputs | Settings | Where it comes from |
|---|---|---|---|
| `T1` | Bedroom 4 × 3.5 × 2.4 m, 1 door, 1 window, ceiling **on** | defaults | spec T1 (already `WORKED_EXAMPLE_ROOM`) |
| `T1W` | T1 with the ceiling **off** | defaults | spec "T1 walls only" (T2, T3, T9 base) |
| `T9` | = `T1W` | day rate **£185** | spec T9 |
| `TAPE` | 4 × 4 × 2.4 m, 1 door, 1 window, walls only | defaults | plan T6 / review S1 ("No tape measure?") |
| `BOX` | Box room 2.5 × 2 × 2.4 m, 1 door, 1 window, ceiling = `CEILING_ON` | defaults | brief §2.2 item 3 |
| `BOXW` | `BOX` with the ceiling **off** | defaults | FAQ Q2 |
| `DOUBLE` | = T1 sizes, ceiling = `CEILING_ON` | defaults | brief §2.2 item 3 |
| `LIVING` | Living room 5 × 4 × 2.4 m, 1 door, 1 window, ceiling = `CEILING_ON` | defaults | brief §2.2 item 3 |
| `HALL` | "Hall, stairs and landing" 4 × 1.4 × **5.0** m, **6** doors, 1 window, walls only | defaults | footprint = spec T5 hallway; height 5.0 m **[assumption]** = two storeys of 2.4 m plus the floor between; 6 doors **[assumption]** for a small house (front door, 2 downstairs, 3 upstairs) |

### 0.4 Derived values

| Name | Rule | Format |
|---|---|---|
| `AREA_5L` | 5 × `{default: coverage}` | up to 1 decimal + " m²" → "60 m²" |
| `TABLE_MIN` · `TABLE_MAX` | lowest / highest m²/L in `COVERAGE_SOURCES` (§2.3) | "11 m²" |
| `AREA_5L_MIN` · `AREA_5L_MAX` | 5 × `TABLE_MIN` / 5 × `TABLE_MAX` | "55 m²" |

### 0.5 Assertions (Vitest, next to the cases — the build must fail if a sentence stops being true)

| # | Assert | Protects |
|---|---|---|
| A1 | `BOXW` walls `litresShown` ≤ 5 **and** `T1W` walls `litresShown` > 5 | FAQ Q2 ("enough for a box room, but not a double bedroom") |
| A2 | `T1W` walls tins contain no 10 L tin and more than one tin | FAQ Q11 ("rather than a 10 L tin") |
| A3 | Every case returns `status: "ok"` and no issues | all examples |
| A4 | `T9.labourPence` < `T1W.labourPence` | §2.5 ("instead of") |
| A5 | The exact phrase "paint calculator" appears ≤ 4 times in the body copy (H1 and title not counted) | brief §2.3 |
| A6 | `grep` of `build/client/paint-calculator/index.html`: none of "60 seconds", "cheapest", "cheaper", "for life", "most accurate" | CEO copy bans |

### 0.6 Dependency tags (cut order, CEO P7)

- **[needs: ceiling]** — only true when the "Include the ceiling" switch is live (T16). If T16 is cut, use the **T17 fallback** given next to it.
- **[needs: mist]** — only true when the "New plaster? Add a mist coat" switch is live (T16). If cut, use the fallback.
- **[needs: multi-room]** — needs "+ Add another room" (T5). Multi-room is in the never-cut list, so no fallback is written; if it ever slips, delete the tagged sentence.
- **[needs: about]** — needs `/about/` live (cut #5). If not live, show the byline without a link.
- **[needs: mailbox]** — needs the PriceBrush mailbox (CEO P3). If not ready, leave that sentence out.
- **[link when live]** — the target page doesn't exist on 31/10. Don't render the link until it returns 200 (T9: no links to 404s).

Everything without a tag is true on 31/10 with only T5 + T6 merged.

---

## 1. Meta (from `../keyword-map.md`, don't change here)

- Title: "Paint Calculator UK: How Much Paint Do I Need? | PriceBrush" (unchanged)
- Meta description **with T16**: unchanged (150 characters).
- Meta description **T17 fallback** (no ceilings): see `../keyword-map.md` `/paint-calculator` → "T17 fallback". Use it for `og:description` too.

---

## 2. Page copy, in page order

### 2.0 H1 and intro (existing, above the tool)

**H1:** Paint calculator: how much paint do I need?

**Intro [needs: ceiling]:** Litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and your price. Free, no sign-up. Nothing you type leaves this browser.

**Intro T17 fallback:** Litres and tins for your walls, room by room. Decorators: add your day rate to see days and your price. Free, no sign-up. Nothing you type leaves this browser.

> Note: the last sentence replaces "nothing stored". The hand-over to the quote template writes to `localStorage`, so "nothing stored" isn't strictly true; "Nothing you type leaves this browser" is (same wording as the quote template, review N2, and `screens.md` P2's CTA caption). Founder to confirm.

### 2.1 How to work out how much paint you need (H2, existing, keep)

1. Walls: 2 × (length + width) × height, for each room.
2. Take off {default: door} per door and {default: window} per window.
3. **[needs: ceiling]** Add the ceiling (length × width) if you're painting it.
4. **[needs: mist]** New plaster? The mist coat is one extra coat on its own line, plus time for it to dry.
5. Multiply by the coats and divide by the coverage ({default: coverage} is our starting point for emulsion — check your tin).
6. Add {default: spare} spare and round up to real tin sizes (10 L, 5 L, 2.5 L), separately for walls, ceilings and the mist coat. *T17 fallback:* "…round up to real tin sizes (10 L, 5 L, 2.5 L)."
7. Days = m² painted ÷ your m² a day, for each line. Your price = days × your day rate + the tins you buy.

> Note: if T16 is cut, delete steps 3 and 4 and renumber.

**Worked example (H3)**

*With T16 [needs: ceiling]:* A bedroom {in: T1.size}, with {in: T1.doors} door and {in: T1.windows} window, 2 coats on the walls and ceiling: walls {calc: T1.wallsArea} and ceiling {calc: T1.ceilingArea} → {calc: T1.totalLitres} → buy {calc: T1.wallsTins} for the walls and {calc: T1.ceilingTins} for the ceiling. At {default: speed} a day that's {calc: T1.labourDays}, so {calc: T1.labourPrice} labour at {default: dayRate} a day + {calc: T1.paintPrice} paint = **{calc: T1.totalPrice}**. Time on the job: about {calc: T1.timeOnJob}.

*T17 fallback:* A bedroom {in: T1W.size}, with {in: T1W.doors} door and {in: T1W.windows} window, 2 coats on the walls: walls {calc: T1W.wallsArea} → {calc: T1W.totalLitres} → buy {calc: T1W.wallsTins}. At {default: speed} a day that's {calc: T1W.labourDays}, so {calc: T1W.labourPrice} labour at {default: dayRate} a day + {calc: T1W.paintPrice} paint = **{calc: T1W.totalPrice}**. Time on the job: about {calc: T1W.timeOnJob}.

**"No tape measure?" tip (caption, replaces today's "about 5 litres", review S1):**
No tape measure? A room {in: TAPE.size}, with one door and one window, needs about {calc: TAPE.wallsLitres} for two coats on the walls, including {default: spare} spare — that's {calc: TAPE.wallsTins}. Day rate, speed and paint price are example defaults, not market prices. Defaults last checked: {default: lastChecked}.

### 2.2 (tool CTA card — existing, no change)

### 2.3 Paint coverage per litre (UK) (H2) — ~170 words + table

The coverage on a tin is how many square metres one litre covers in **one coat**. Below are the "up to" figures UK makers and merchants publish for common paints. "Up to" means a smooth, sealed wall, so real walls usually get less. That's why the calculator starts at {default: coverage}. If your tin says otherwise, put its figure in "Paint and spare".

| Paint | Finish | Coverage stated (one coat) | Source |
|---|---|---|---|
| Crown Trade Covermatt | Contract matt | up to 11 m² per litre | [Nextday Paint](https://nextdaypaint.co.uk/products/crown-trade-covermatt-white) |
| Dulux Matt (retail) | Matt | 13–14 m² per litre, by colour | Screwfix: [Pure Brilliant White](https://www.screwfix.com/p/dulux-2-5ltr-pure-brilliant-white-matt-emulsion-paint/9481v), [Magnolia](https://www.screwfix.com/p/dulux-matt-magnolia-emulsion-paint-2-5ltr/84018) |
| Leyland Trade Vinyl Matt | Vinyl matt | up to 14 m² per litre | [Nextday Paint](https://nextdaypaint.co.uk/products/leyland-trade-vinyl-matt-emulsion) |
| Dulux Trade Vinyl Matt | Vinyl matt | up to 17 m² per litre | [Dulux Trade](https://duluxtradepaintexpert.co.uk/en/products/dulux-trade-vinyl-matt) |
| Johnstone's Trade Covaplus Vinyl Matt | Vinyl matt | up to 17 m² per litre | [Johnstone's Trade](https://www.johnstonestrade.com/product/covaplus-vinyl-matt.html) |
| Dulux Trade Supermatt | Matt | up to 18 m² per litre | [Dulux Trade](https://duluxtradepaintexpert.co.uk/en/products/dulux-trade-supermatt) |
| Dulux Trade Vinyl Silk | Silk | up to 16 m² per litre | [Dulux Trade](https://duluxtradepaintexpert.co.uk/en/products/dulux-trade-vinyl-silk) |
| Dulux Trade Diamond Eggshell | Eggshell | up to 16 m² per litre | [Dulux Trade](https://duluxtradepaintexpert.co.uk/en/products/dulux-trade-diamond-eggshell) |
| Johnstone's Trade Aqua Water Based Satin | Satin (water-based) | up to 12 m² per litre | [Nextday Paint](https://nextdaypaint.co.uk/products/johnstones-trade-aqua-water-based-satin-brilliant-white) |
| Dulux Trade High Gloss | Gloss (solvent-based) | up to 18 m² per litre | [Dulux Trade](https://duluxtradepaintexpert.co.uk/en/products/dulux-trade-high-gloss) |

Fresh plaster, rough walls and big colour changes use more. Woodwork isn't in the calculator yet; the satin and gloss rows are for comparing tins. Checked 17/10/2026 — formulas change, so your tin wins.

> Evidence notes (not for the page):
> - Opened 17/10/2026: Dulux Trade pages (Vinyl Matt, Supermatt, Vinyl Silk, Diamond Eggshell, High Gloss), Johnstone's Trade Covaplus page ("up to 17 square metres per litre depending on the nature and porosity of the surface"), Nextday Paint pages (Crown Covermatt "Up to 11m2 per litre", Leyland "up to 14m² per litre", Johnstone's Aqua Satin "Up to 12m² per litre").
> - **Not re-opened today:** the two Screwfix Dulux Matt pages returned HTTP 403 to my fetch; the 13 and 14 m²/L figures come from the lead's check in spec §9 (17/10/2026). Founder or engineer: open both once before launch.
> - Retailer figures differ for the same paint: other Crown Covermatt listings say up to 16 m²/L (search results, not opened), and older Johnstone's Covaplus listings say 12–14 m²/L (Johnstone's footnotes the 17 m² as "compared to the previous formula"). I used the page I could open and show the source, rather than pick the friendliest number.
> - Brand balance: 6 Dulux, 2 Johnstone's, 1 Crown, 1 Leyland. Dulux Trade's pages were the easiest to open; adding a Crown or Johnstone's silk/eggshell row later would balance it (brief: "never one brand only" — met, but Dulux-heavy).
> - The brief's earlier guessed ranges (e.g. gloss "~14–16") are replaced by these sourced figures.

### 2.4 How much paint for a typical UK room (H2) — ~170 words + table

Worked out by the calculator at its defaults: one door, one window, two coats, {default: coverage}, {default: spare} spare, {default: speed} and {default: dayRate} a day. Put in your own sizes for yours.

*Table with T16 [needs: ceiling]:*

| Room | Size | Walls | Ceiling | Days | Price at the defaults |
|---|---|---|---|---|---|
| Box room | {in: BOX.size} | {calc: BOX.wallsLitres} · {calc: BOX.wallsTins} | {calc: BOX.ceilingLitres} · {calc: BOX.ceilingTins} | {calc: BOX.labourDays} | {calc: BOX.totalPrice} |
| Double bedroom | {in: DOUBLE.size} | {calc: DOUBLE.wallsLitres} · {calc: DOUBLE.wallsTins} | {calc: DOUBLE.ceilingLitres} · {calc: DOUBLE.ceilingTins} | {calc: DOUBLE.labourDays} | {calc: DOUBLE.totalPrice} |
| Living room | {in: LIVING.size} | {calc: LIVING.wallsLitres} · {calc: LIVING.wallsTins} | {calc: LIVING.ceilingLitres} · {calc: LIVING.ceilingTins} | {calc: LIVING.labourDays} | {calc: LIVING.totalPrice} |
| Hall, stairs and landing (estimate) | {in: HALL.size}, {in: HALL.doors} doors | {calc: HALL.wallsLitres} · {calc: HALL.wallsTins} | not included | {calc: HALL.labourDays} | {calc: HALL.totalPrice} |

*T17 fallback:* the same table without the "Ceiling" column (`CEILING_ON = false` makes the Days and Price cells walls-only automatically). Change the first sentence's "two coats" to "two coats on the walls".

The hall, stairs and landing row is an estimate: we treated it as one tall room, {in: HALL.height} from the hall floor to the landing ceiling (our assumption). See the FAQ below for how to measure yours.

> Note: each row will link to its room page once those exist (`../programmatic-seo.md`, from Dec 2026) **[link when live]**.

### 2.5 For decorators: turn litres into a price (H2) — ~230 words

Litres are the easy part; the price comes from time. Put in the square metres you paint in a day (each coat counts) and your day rate. The calculator works out days for each line (walls **[needs: ceiling]**, ceiling **[needs: mist]**, mist coat) to a tenth of a day and adds them up, so your quote's lines always match the total. "Time on the job" is rounded up to the next half day **[needs: mist]** (plus {default: mistDrying} once for a mist coat to dry), but that rounding isn't charged.

The speed of {default: speed} a day is our starting guess, not a survey, and {default: dayRate} a day is an example, not a market rate. Change both to yours. The bedroom walls above come to {calc: T9.labourPrice} labour at {in: T9.dayRate} a day, instead of {calc: T1W.labourPrice} at {default: dayRate}.

Paint is charged for the tins you buy, at {default: paintPrice} a litre unless you put in your merchant's price. Any materials markup is your call: add it to the price per litre. Filling, sanding, masking and woodwork aren't priced yet, so check prep, access and woodwork before you quote.

**[needs: multi-room]** Pricing a whole house? Add every room, and the job total, days and shopping list cover them all.

**CTA card:** "Ready to send it?" / "Your rooms and lines carry over to the free quote template. Add your client and download a PDF." → **Turn this into a quote** (same hand-over as the tool's button, spec §10).

**[link when live — 09/11/2026]** More on pricing: [how to price a painting job](/guides/how-to-price-a-painting-job/).

**[needs: mailbox]** Decorator? If our {default: speed} a day is off for the work you do, tell us at {contact: email}. We'll use the replies to set a better default.

### 2.6 Paint calculator FAQs (H2) — 12 questions, ~40–80 words each

Render every answer in the prerendered HTML (open, or in `<details>`). Questions are the exact autocomplete phrasings from the brief (`../keyword-research.md` §4).

**Q1. How much paint do I need for a room?**
Measure the walls (all the way round × the height), take off doors and windows, multiply by the coats, divide by the tin's coverage and add a little spare. For a double bedroom {in: T1W.size}, two coats on the walls come to {calc: T1W.wallsLitres}: buy {calc: T1W.wallsTins}. **[needs: ceiling]** With the ceiling, it's {calc: T1.totalLitres} in all.

**Q2. How many rooms will 5 litres of paint cover?**
At {default: coverage}, 5 litres covers {derived: AREA_5L} of one coat. With two coats and {default: spare} spare, that's the walls of a box room {in: BOXW.size} ({calc: BOXW.wallsLitres}), but not a double bedroom {in: T1W.size} ({calc: T1W.wallsLitres}). Ceilings need paint on top.

**Q3. What area does 5 litres of paint cover?**
Five times the tin's coverage, for one coat: {derived: AREA_5L} at our starting figure, or {derived: AREA_5L_MIN} to {derived: AREA_5L_MAX} at the "up to" figures in the table. Halve it for two coats.

**Q4. How much does 1 litre of paint cover?**
For the paints in the table, {derived: TABLE_MIN} to {derived: TABLE_MAX} of one coat, depending on the paint and the surface. That's the best case on a smooth, sealed wall, so the calculator starts lower, at {default: coverage}. Change it to your tin's figure.

**Q5. Does paint coverage include 2 coats?**
No. A tin's coverage is for one coat, so two coats need twice the paint. The calculator multiplies by the coats you pick (1, 2 or 3).

**Q6. How much paint do I need for hall stairs and landing?**
Treat it as one tall room: the hall's length and width, the height from the hall floor to the landing ceiling, and every door that opens onto it. Our example ({in: HALL.size}, {in: HALL.doors} doors) needs {calc: HALL.wallsLitres} for two coats on the walls: {calc: HALL.wallsTins}. Where the walls are lower this counts too much, so you'd buy a little more than you need, not less. Rooms in the calculator are rectangles, so measure a stairwell on site before you quote.

**Q7. How many coats of paint does new plaster need?**
Usually a thinned first coat to seal it (the mist coat), then full coats — two is common. Makers' thinning for new or absorbent surfaces varies, from up to 1 part water to 9 parts paint ([Leyland Trade Vinyl Matt](https://nextdaypaint.co.uk/products/leyland-trade-vinyl-matt-emulsion)) to 40% water ([Crown Trade Covermatt](https://nextdaypaint.co.uk/products/crown-trade-covermatt-white)). Follow the tin of the paint you're using.

**Q8. Do I need a mist coat on new plaster, and how does the calculator count it?**
*With T16 [needs: mist]:* Bare new plaster soaks up paint, so it's normally sealed with a watered-down mist coat first — follow your tin's dilution. Tick "New plaster? Add a mist coat" and the calculator adds one coat over the walls (and ceiling, if included) as its own line, with its own litres and tins, plus {default: mistDrying} once on the time on the job for drying. Its paint is counted undiluted, so you'll have a little spare.
*T17 fallback:* Bare new plaster soaks up paint, so it's normally sealed with a watered-down mist coat before the full coats — follow your tin's dilution. The calculator doesn't have a mist-coat switch yet. To include it, set coats to 3: the litres and days then cover the extra coat, but the tins are all in your wall paint, and drying time isn't added.

**Q9. Why did my mist coat go powdery?**
A mist coat is mostly water, so it often dries chalky. In a [busy r/DIYUK thread](https://www.reddit.com/r/DIYUK/comments/1wv8rrd/mist_coat_failed/) about one that rubbed off as powder, a top reply said a very watery mix still seals the wall but ends up powdery; others blamed cheap emulsion. If yours wipes off as dust, check your tin's dilution and ask the maker's technical team before the top coats.

> Evidence: thread title "Mist coat failed", r/DIYUK, 83 comments (`../data/reddit-sample-2026-10-16.md`). Read 17/10/2026 via the Arctic Shift archive: the poster thinned matt emulsion 3 parts paint to 2 parts water on a skim left a week; reply (score 19): "Mist coating with 40% water is fine, it'll prime the wall well but it will end up powdery"; reply (score 1): "cheap emulsions do have a chalky powdery feel to them". These are forum opinions and the copy labels them as such. I read the first 50 comments only, so "one of the top replies", not "the top reply".

**Q10. How long should I leave new plaster before painting?**
Until it's dry right through: even in colour, with no darker damp patches. Dulux says plaster can take [up to 4 weeks to dry completely](https://www.dulux.co.uk/en/expert-help/dr-dulux-painting-on-new-plaster); heat and fresh air help. Thick plaster and cold, damp rooms take longer. Not sure? Ask your plasterer.

> Note: "Thicker plaster and cold, damp rooms take longer" is general knowledge, not from the Dulux page **[opinion]**. Founder: keep or cut.

**Q11. Should I buy 2.5 L or 5 L tins?**
Whatever wastes least. The calculator uses 10 L, 5 L and 2.5 L tins, the sizes trade emulsion usually comes in, and picks the fewest tins that don't leave much over. For {calc: T1W.wallsLitres} it suggests {calc: T1W.wallsTins}, not a 10 L tin. If the bigger tin costs about the same, the spare is handy for touch-ups.

> Evidence for "the sizes trade emulsion is usually sold in": spec D3 (Dulux Trade Vinyl Matt in 2.5, 5 and 10 L at Travis Perkins and Toolstation).

**Q12. Do I need to take off doors and windows?**
Yes. The calculator takes off {default: door} per door (a standard internal door plus its frame) and {default: window} per window. For much bigger ones, like patio doors, add an extra door or window to the count.

### 2.7 Sources line (small text, end of the page)

Sources: makers' and merchants' product pages (linked above) and Dulux's new-plaster guide, checked 17/10/2026. Defaults last checked: {default: lastChecked}.

### 2.8 Byline (under the H1 or at the end — design's choice)

By [Arif Noviarrizal](/about/), independent developer building PriceBrush · Last reviewed {date of the founder's review}

- **[needs: about]** If `/about/` isn't live, show the name without the link.
- Use the date the founder actually reviews the text, not the build date.

---

## 3. What to drop if T16 (ceiling + mist coat) is cut — one table for T17

| Where | With T16 | T17 fallback |
|---|---|---|
| Meta description / `og:description` | current | `../keyword-map.md` T17 fallback |
| Intro | "walls and ceilings" | "your walls" version (§2.0) |
| §2.1 steps 3, 4 and the end of step 6 | keep | delete / shorten |
| §2.1 worked example | `T1` | `T1W` version |
| §2.4 table | Ceiling column | no Ceiling column; `CEILING_ON = false` |
| §2.5 paragraph 1 | "ceiling", "mist coat" and the drying bracket | delete those words |
| Q1 last-but-one sentence | keep | delete |
| Q8 | T16 answer | T17 answer |
| Everything else | unchanged | unchanged |

**Revert** to the T16 version the day T16 ships (plan T17).

## 4. For the founder's 20-minute review

Check for truth and tone, not SEO. Five questions:

1. Q10's last sentence and the hall height/doors assumption (§0.3): are they fair to say?
2. Is "Nothing you type leaves this browser" OK in place of "nothing stored" (§2.0)?
3. The forum quote in Q9: comfortable citing Reddit by link?
4. The correction invite (§2.5): is the new mailbox ready by 31/10? If not, leave it out.
5. The byline says the text is yours. Change anything that doesn't sound like you before it ships.
