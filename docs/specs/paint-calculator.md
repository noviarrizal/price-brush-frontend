# Spec — paint & labour calculator engine + hand-over to the quote template (v0.1)

Date: 17/10/2026 · Owner: pricebrush-lead · Status: **approved — the founder signed off D1–D6 on 17/10/2026** · Inputs: `../ceo/decisions-2026-10-17.md` #1 and #3, `../PRD.md` (decisions 17 Oct), `../seo/briefs/paint-calculator.md` §2.1, `../design/screens.md` P2/P3, `../design/prototypes/paint-calculator.html`, `../seo/measurement.md` §1

One pure TypeScript engine does the maths for `/paint-calculator` (31/10/2026), the pre-filled `/decorating-quote-template`, and later the app's quote lines. **This spec is the source of truth for the maths.** Where the SEO brief, `screens.md` or the prototype disagree, this file wins, and §14 lists the edits the other docs need.

Labels: **[fact]** = sourced · **[assumption]** = our starting guess, editable by the user, to check with decorators.

Not in this spec: cancel + Undo / "Resume Pro" (Polar). That gets its own spec before the MVP build (1–21 Nov); it isn't needed for 31 Oct.

---

## 1. Decisions (signed off 17/10/2026)

The SEO brief and the prototype disagreed on six points. The founder accepted every recommendation below; the rest of this spec uses them.

| # | Question | Brief says | Prototype does | **Recommendation** | Why |
|---|---|---|---|---|---|
| D1 | Is labour rounded up to ½ days? | Yes: job total rounded up to the nearest ½ day, and that is what gets charged | No: each line 0.1 day, sum charged | **Charge the sum of the lines (0.1 day each). Show "Time on the job" rounded up to ½ day, but don't charge for the rounding** | The quote has one line per room and surface. If the price is rounded but the lines aren't, the lines don't add up to the total, and that breaks "every number shown". A "Round my price up to half days" switch can come later |
| D2 | One paint for walls and ceiling, or separate? | Shown separately ("ceiling paint is often a different product") | Mixed into one litres figure | **Separate tins per surface: walls, ceiling, mist coat** | Decorators usually put ceiling white on ceilings, a colour on the walls and contract matt for the mist coat. Separate tins cost a bit more (T1: 12.5 L vs 10 L), but the shopping list is right |
| D3 | Tin sizes | 10 / 5 / 2.5 / 1 L | 10 / 5 / 2.5 L | **10 / 5 / 2.5 L** | [fact] Dulux Trade Vinyl Matt is sold in 2.5 L, 5 L and 10 L (Travis Perkins, Toolstation listings). 1 L tins of trade emulsion are rare and expensive per litre |
| D4 | Speed default | 45 m² a day | 40 m² a day | **40 m² a day** [assumption] | Neither number has a source. When a default isn't checked yet, we lean towards *not* underpricing, because underpricing is a known pain (`../strategy/opportunities.md`). Check it with 5 decorators (content plan, 19–25 Oct) |
| D5 | Paint price default | £6 / L | £5 / L | **£6 / L** [assumption] | Same rule: lean towards not underpricing. Users change it in "Paint and spare" |
| D6 | Mist coat drying | — | +½ day per room | **+½ day once per job**, on "Time on the job" only, not charged | Rooms dry in parallel. The decorator does other rooms, or comes back the next day |

Also fixed here (no change from the brief or prototype): coverage 12 m²/L, spare 10 %, door 1.8 m², window 1.5 m², day rate £200, 2 coats, height 2.4 m.

## 2. Defaults

| Setting | Default | Range accepted | Source |
|---|---|---|---|
| Coverage (spreading rate) | **12 m²/L** | 1–40 | [assumption] Conservative. Dulux's "up to" figures are higher: Dulux Matt 13–14 m²/L, Dulux Trade Vinyl Matt 16–17 m²/L, Dulux Trade Supermatt 18 m²/L (§9). Real walls absorb more than the tin's test surface, and fresh plaster, rough walls and colour changes use more. Users put in their own tin's figure |
| Spare | **10 %** | 0–50 | [assumption] Touch-ups and loss in the tray. Same as the brief |
| Door (taken off the wall) | **1.8 m²** | — (fixed for 31 Oct) | [assumption] A UK standard internal door leaf is 1981 × 762 mm ≈ 1.5 m²; 1.8 m² allows for the frame and architrave. Same as the brief and prototype |
| Window | **1.5 m²** | — (fixed for 31 Oct) | [assumption] A typical UK casement window. Same as the brief |
| Height | **2.4 m** | > 0 | Typical UK ceiling height |
| Doors / windows per room | **1 / 1** | whole numbers 0–20 | Brief |
| Coats | **2** | 1, 2 or 3 | Brief |
| Day rate | **£200** | £0–£2,000 | Example persona (Dave, PRD §2) |
| Speed (m² a day) | **40** | 1–200 | D4. "Each coat counts towards your m² a day" |
| Paint price | **£6 / L** | £0–£100 | D5 |
| Mist coat drying | **½ day per job** | — (fixed) | D6 [assumption] |

The page shows "Defaults last checked: 17/10/2026" (SEO brief §2.2 item 6). Change the date when any default changes.

## 3. Inputs and validation

```ts
// app/lib/paint/types.ts
export type Coats = 1 | 2 | 3;

export interface RoomInput {
  id: string;               // stable id, e.g. crypto.randomUUID(); never shown
  name: string;             // "" → shown as "Room 1", "Room 2"…
  lengthMetres: number;
  widthMetres: number;
  heightMetres: number;
  doorCount: number;
  windowCount: number;
  coats: Coats;
  includeCeiling: boolean;
  newPlaster: boolean;      // "New plaster? Add a mist coat"
}

export interface CalculatorSettings {
  coverageSquareMetresPerLitre: number;
  sparePercent: number;
  doorAreaSquareMetres: number;
  windowAreaSquareMetres: number;
  dayRatePence: number;
  squareMetresPerDay: number;
  paintPencePerLitre: number;
  mistCoatDryingDays: number;
}
```

- **Parsing** (UI layer, before the engine): trim; accept a comma as the decimal point ("3,5" → 3.5); empty → "not filled in". Money inputs are pounds in the UI and pence in the engine.
- **Room errors** (the room is left out of the result; the other rooms still count):
  - Length, width or height missing or ≤ 0 → "Length must be more than 0, like 3.5." / "Width must be more than 0, like 3.5." / "Height must be more than 0, like 2.4." (first failing field; every failing field gets the error outline).
  - A room with **length and width** both empty is "not started": no error, no result. (Height starts filled in at 2.4 m, so it doesn't count.)
- **Room warning** (still counted): any size > 30 m → "That's a big room — double-check the numbers".
- **Settings errors**: a value outside its range in §2 → "Coverage must be between 1 and 40 m² per litre" (same pattern for each). While a setting is invalid, the result shows the last valid result greyed out with "Fix the settings above to update the result".
- **No valid room** → empty state: "Enter a room size to see litres".

## 4. The maths, step by step

Every number that is shown is rounded **before** it is used in the next step, so a user can redo the working with the numbers on screen and get the same answer.

For each valid room:

1. **Wall area** = 2 × (length + width) × height − doors × 1.8 − windows × 1.5. If below 0, use 0. **Round half up to 0.1 m².**
2. **Ceiling area** = length × width if "Include the ceiling" is on, else 0. **Round half up to 0.1 m².**
3. **Labour lines.** One line per surface with area > 0:
   - walls: area × coats
   - ceiling: area × coats
   - mist coat (if new plaster): (wall area + ceiling area) × **1 coat**, as its own line
4. **Line days** = area × coats ÷ speed, **rounded half up to 0.1 day**, minimum 0.1 for any line with area > 0.
5. **Line amount (pence)** = round(line days × day rate in pence).

For the job:

6. **Paint groups** by surface: `walls`, `ceiling`, `mistCoat`. Coated m² of a group = Σ area × coats of its lines (mist coat: × 1).
7. **Litres needed** per group = coated m² ÷ coverage × (1 + spare % ÷ 100). Keep this exact value for choosing tins.
8. **Litres shown** per group = litres needed **rounded up** to 0.1 L. ("5.03 L" shows as 5.1 L. It never shows 5.0 L next to a 7.5 L shopping list.) **"You need X litres"** = sum of the groups' litres shown.
9. **Tins** per group: §5.
10. **Paint amount (pence)** = Σ over groups of litres bought (the tins' volume) × paint price per litre, rounded to whole pence.
11. **Labour days** = Σ line days (shown with 1 decimal). **Labour £** = Σ line amounts.
12. **Time on the job** = labour days + (½ day if any room has a mist coat), **rounded up to the nearest ½ day**. This is shown as information only and isn't charged (D1, D6).
13. **Your price at your day rate** = labour £ + paint £. Caption: "Check prep, access and woodwork before you quote."

The mist coat's paint is counted at full coverage with no credit for the water in the mix [assumption]. [fact] Dilution varies by product, e.g. 1 part water to 3 parts paint for Dulux Trade Supermatt (retailer listing, §9), and the diluted coverage isn't published, so we round towards buying slightly too much.

Floating point: do the rounding with integer maths (`Math.round(value * 10 + Number.EPSILON) / 10`; litres up: `Math.ceil(value * 10 - 1e-9) / 10`). Money is whole pence (`number`, integers only). Format with `Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })`.

## 5. Choosing tins

Sizes: 10 L, 5 L, 2.5 L (D3).

1. List every combination of the three sizes whose volume ≥ litres needed. Search up to `ceil(need ÷ 10) + 1` × 10 L, and at most 1 × 5 L and 1 × 2.5 L (two 5 L tins are always beaten by one 10 L tin: same volume, fewer tins).
2. `leastSpare` = the smallest (volume − need) among them.
3. Keep the combinations with spare ≤ `leastSpare` + 1 L.
4. Pick the one with the **fewest tins**. On a tie, pick the one with less spare.
5. Need = 0 → no tins.

Shown as "Buy 1 × 10 L + 1 × 2.5 L", largest first, one line per group: "Walls: 1 × 5 L + 1 × 2.5 L · Ceiling: 1 × 5 L".

## 6. Result shape

```ts
export type Surface = "walls" | "ceiling" | "mistCoat";

export interface LabourLine {
  roomId: string;
  roomName: string;          // already defaulted to "Room N"
  surface: Surface;
  areaSquareMetres: number;  // 0.1 m²
  coats: number;             // mist coat: 1
  labourDays: number;        // 0.1 day
  amountPence: number;
}

export interface TinPick { sizeLitres: 10 | 5 | 2.5; count: number }

export interface PaintGroup {
  surface: Surface;
  litresNeeded: number;      // exact
  litresShown: number;       // rounded up to 0.1 L
  tins: TinPick[];
  litresBought: number;
  amountPence: number;
}

export interface RoomIssue { roomId: string; field?: "length" | "width" | "height"; kind: "error" | "warning"; message: string }

export interface CalculationResult {
  status: "empty" | "ok";
  issues: RoomIssue[];
  labourLines: LabourLine[];
  paintGroups: PaintGroup[];
  totalLitresShown: number;
  labourDays: number;
  timeOnJobDays: number;     // ½-day steps, not charged
  labourPence: number;
  paintPence: number;
  totalPence: number;        // labourPence + paintPence, always
}

export function calculateJob(rooms: RoomInput[], settings: CalculatorSettings): CalculationResult;
export function chooseTins(litresNeeded: number): TinPick[];
```

**Invariants** (test them on every case):

- `totalPence === labourPence + paintPence`, and `labourPence === Σ labourLines.amountPence`.
- For each group: `litresBought ≥ litresNeeded` and `litresShown ≥ litresNeeded`.
- `timeOnJobDays` is a multiple of 0.5 and ≥ `labourDays`.
- The result depends only on the inputs (no dates, no randomness).

## 7. Working text (calculator "The working" and quote line details)

| Line | Title | Detail |
|---|---|---|
| Walls | "Living room walls" | "2 coats · 37.0 m² · 1.9 days" |
| Ceiling | "Living room ceiling" | "2 coats · 17.5 m² · 0.9 days" |
| Mist coat | "Living room mist coat" | "New plaster · 1 coat · 54.5 m² · 1.4 days" |
| Paint (quote only) | "Paint" | "Walls 1 × 10 L + 1 × 2.5 L · Ceiling 1 × 5 L · £6.00 a litre" |

"1 day", "0.5 days", "1.9 days" (singular only for exactly 1). Areas always show 1 decimal ("14.0 m²"). The "How we work it out" section on the page uses the same functions to fill in its worked example, so the page and the tool can't disagree.

## 8. Test cases

Defaults from §2 unless the row says otherwise. Every value was computed with a reference script that implements §4–§5. These are the Vitest cases in `app/lib/paint/calculate.test.ts` and `tins.test.ts`.

### 8.1 Job cases

| # | Input | Expected |
|---|---|---|
| T1 | **Bedroom** 4 × 3.5 × 2.4 m, 1 door, 1 window, 2 coats, ceiling on (the brief's worked example) | Walls 32.7 m² → 1.6 days £320.00 · Ceiling 14.0 m² → 0.7 days £140.00 · Walls paint 6.0 L → 1 × 5 L + 1 × 2.5 L · Ceiling paint 2.6 L → 1 × 5 L · **You need 8.6 litres** · paint 12.5 L × £6 = £75.00 · labour 2.3 days £460.00 · time on the job 2.5 days · **£535.00** |
| T2 | T1 walls only, **coverage 13 m²/L (Dulux Matt), spare 0 %** | 65.4 m² ÷ 13 = 5.03 L → shown **5.1 L** → 1 × 5 L + 1 × 2.5 L · £365.00 |
| T3 | T1 walls only, **coverage 17 m²/L (Dulux Trade Vinyl Matt)** | 65.4 ÷ 17 × 1.1 = 4.23 L → shown **4.3 L** → 1 × 5 L · £350.00 |
| T4 | T1, **coverage 18 m²/L (Dulux Trade Supermatt)** | Walls 4.0 L → 1 × 5 L · Ceiling 1.8 L → 1 × 2.5 L · 5.8 litres · paint £45.00 · **£505.00** |
| T5 | **Living room** 4.6 × 3.8 × 2.4, 1 door, 1 window, 2 coats, ceiling on + **Hallway** 4 × 1.4 × 2.4, 3 doors, 0 windows, 2 coats, walls only (the landing mock) | Living walls 37.0 m² 1.9 d £380 · Living ceiling 17.5 m² 0.9 d £180 · Hallway walls 20.5 m² 1.0 d £200 · Walls 10.6 L → 1 × 10 L + 1 × 2.5 L · Ceiling 3.3 L → 1 × 5 L · 13.9 litres · paint £105.00 · labour 3.8 days £760.00 · time 4 days · **£865.00** |
| T6 | T5 with **new plaster in both rooms** | Adds Living mist coat 54.5 m² 1.4 d £280 and Hallway mist coat 20.5 m² 0.5 d £100 · Mist paint 6.9 L → 1 × 5 L + 1 × 2.5 L · 20.8 litres · labour 5.7 days £1,140.00 · paint £150.00 · **time on the job 6.5 days** (5.7 + ½ once, not ½ per room) · **£1,290.00** |
| T7 | Cupboard 1 × 1 × 2 m, **5 doors**, 1 window, ceiling on | Walls = 8 − 9 − 1.5 < 0 → **0, no walls line** · Ceiling 1.0 m² 0.1 d £20 · 0.2 L → 1 × 2.5 L · £35.00 |
| T8 | Nook 0.5 × 0.5 × 1 m, 0 doors, 0 windows, 1 coat | Walls 2.0 m² → 2 ÷ 40 = 0.05 → **minimum 0.1 day** £20 · £35.00 |
| T9 | T1 walls only, **day rate £185** | 1.6 days × £185 = **£296.00** labour (whole pence) · £341.00 |
| T10 | Room 1 valid (T1), Room 2 length "0" | Room 2 issue "Length must be more than 0, like 3.5." on length · result = T1 |
| T11 | Room 1 length "3,5" | Parsed as 3.5 |
| T12 | One room, length and width empty (height 2.4 or empty) | `status: "empty"`, no issues |
| T13 | Length 31 m | Counted + warning "That's a big room — double-check the numbers" |

### 8.2 Tins

| Litres needed | Tins | Why |
|---|---|---|
| 0 | none | |
| 2.5 | 1 × 2.5 L | exact |
| 4.23 | 1 × 5 L | |
| 5.0 | 1 × 5 L | exact |
| 5.01 | 1 × 5 L + 1 × 2.5 L | 10 L has 4.99 L spare, more than 1 L over the least spare (2.49 L) |
| 7.6 | 1 × 10 L | least spare 2.4 L (10 L or 5 + 5); 10 L is fewer tins |
| 8.6 | 1 × 10 L | |
| 12.4 | 1 × 10 L + 1 × 2.5 L | |
| 17.6 | 2 × 10 L | 10 + 5 + 2.5 = 17.5 is too little |
| 23.0 | 2 × 10 L + 1 × 5 L | |

### 8.3 Checks against Dulux figures

The engine's litres should match the plain "area × coats ÷ spreading rate" rule from the manufacturers (Dulux's own advice: measure, multiply by the coats, divide by the m²/L on the tin, add a little for touch-ups). T2–T4 check this with Dulux's published rates: with spare at 0 %, T2's 5.03 L is 65.4 m² ÷ 13. Before launch, open each Dulux product's data sheet once and update §9 if a rate has changed.

FAQ check (brief §2.2): "What area does 5 litres cover?" → 5 × 12 = **60 m² of one coat** at the default. The page text must come from the same constant.

## 9. Sources (checked 17/10/2026)

- Dulux Trade Vinyl Matt: "up to 17 m² per litre" ([Toolstation](https://www.toolstation.com/dulux-trade-vinyl-matt-emulsion-paint/p94109), [nextdaypaint](https://nextdaypaint.co.uk/products/dulux-trade-vinyl-matt)); some Pure Brilliant White listings "up to 16 m²" ([Travis Perkins](https://www.travisperkins.co.uk/emulsion-paints/dulux-trade-vinyl-matt-5l-pure-brilliant-white/p/901020)). Retailer pages, not the Dulux data sheet.
- Dulux Matt (retail): 13 m²/L ([Screwfix, PBW 2.5 L](https://www.screwfix.com/p/dulux-2-5ltr-pure-brilliant-white-matt-emulsion-paint/9481v)), 14 m²/L ([Screwfix, Magnolia 2.5 L](https://www.screwfix.com/p/dulux-matt-magnolia-emulsion-paint-2-5ltr/84018)).
- Dulux Trade Supermatt: 18 m²/L; seal new plaster with "1 part clean water to 3 parts paint" ([Leyland SDM](https://leylandsdm.co.uk/dulux-trade-supermatt-5l-white.html), [Screwfix](https://www.screwfix.com/p/dulux-trade-supermatt-10ltr-white-matt-emulsion-paint/43988)).
- Dulux method (measure, × coats, ÷ m²/L, add a little): [Dulux Malaysia guide](https://www.dulux.com.my/en/decorating-tips-and-advice/how-much-paint-do-you-need). The UK site's calculator wasn't opened. **Not verified:** what door and window sizes Dulux UK's calculator assumes.

## 10. Hand-over: calculator → quote template

No server, no account. The data stays in the browser (CEO #1, brief §2.1).

- **Trigger:** "Turn this into a quote" (only when `status === "ok"`). Fires `quote_prefilled`, then navigates to `/decorating-quote-template`.
- **Storage:** `localStorage` key `pricebrush.calculatorHandover`. It holds room sizes and prices only, never client details. It is read once: the template deletes the key after importing it. It is ignored if older than 24 h.

```ts
export interface CalculatorHandover {
  version: 1;
  createdAt: string;               // ISO 8601
  settings: CalculatorSettings;    // so the template can show "at £200 a day"
  rooms: RoomInput[];              // lets "Edit in calculator" restore the rooms later
  lines: Array<{
    kind: "labour" | "paint";
    title: string;                 // §7
    detail: string;                // §7
    amountPence: number;
  }>;
  totals: { labourPence: number; paintPence: number; totalPence: number; timeOnJobDays: number };
}
```

- **Template behaviour** (P3): one quote line per labour line in the same order (room by room: walls, ceiling, mist coat), then one "Paint" line. Banner: "We brought over 2 rooms from the paint calculator. Check the lines, then add the client." Every line stays editable. The template's own autosave (IndexedDB, PRD) takes over from then on.
- **Bad or old data** (wrong `version`, JSON error, > 24 h): ignore it silently, delete the key, and open an empty template. No error is shown, because the user can still type the quote.
- **Test cases:** T5 → 3 labour lines + 1 paint line, total £865.00 equals the calculator total · reload after import → no duplicate lines · `version: 2` → empty template.

## 11. Events (anonymous counter, `../seo/measurement.md`)

| Event | Fires when |
|---|---|
| `calc_used` | First `status: "ok"` result in a page view (once) |
| `calc_room_added` | "+ Add another room" pressed, giving a 2nd room (once per page view) |
| `mist_coat_on` | A mist-coat switch is turned on (once per page view) — proposed in `../marketing/funnel.md`, cheap to add here |
| `quote_prefilled` | "Turn this into a quote" pressed |

No room sizes, prices or names in events.

## 12. Code layout

- `app/lib/paint/types.ts`, `defaults.ts`, `areas.ts`, `tins.ts`, `calculate.ts`, `format.ts` (days, m², litres, tins, £), `handover.ts`. All pure, no React, no DOM, except `handover.ts`, which takes a `Storage` argument so it can be tested.
- Tests: **Vitest** (`pnpm add -D vitest`; `"test": "vitest run"`). It is needed for the "paint maths has tests" rule in `../codebase/quality.md`, and it isn't shipped to users. Add the `test` script and record the decision in `../codebase/decisions.md`.
- Use full descriptive names (`litresNeeded`, not `l`), per the founder's code style.

## 13. Later (not 31 Oct)

- **Woodwork** (cut-order item 5): skirting (perimeter minus door widths × 0.15 m), door + frame per side (≈ 2 m²), satinwood ~12–14 m²/L, a separate "woodwork m² a day" [assumption]. **Spec it after the decorator check**, because woodwork is often priced per door, not per m².
- Separate coats for walls and ceiling (the model already has coats per line).
- "Round my price up to half days" switch (D1).
- Share URL `?r=4x3.5x2.4,d1,w1,c2,ceiling,mist` (repeat `r` per room), restoring the rooms; canonical stays `/paint-calculator` (brief §2.1).
- Editable door and window sizes in "Paint and spare" (the brief's FAQ says "change them in Advanced", so either add them by 31 Oct or change that FAQ answer).

## 14. Edits to other docs (applied 17/10/2026)

| Doc | Change | Owner |
|---|---|---|
| `../seo/briefs/paint-calculator.md` §2.1 | Tins 10/5/2.5 L (no 1 L); speed 40; £6/L stays; days rule → D1; worked example → T1 (8.6 L; walls 1 × 5 L + 1 × 2.5 L, ceiling 1 × 5 L; 2.3 days £460 + paint £75 = **£535**, time on the job 2.5 days); door/window FAQ wording (§13) | SEO |
| `../seo/content-plan.md` 19–25 Oct | "sanity-check the 45 m²/day default" → 40 | SEO |
| `../design/screens.md` P2 | Paint £6/L; tins per surface; "Time on the job" rule (½ day once per job); link to this spec | UI/UX |
| `../design/prototypes/landing.html` + `desktop-landing.html` | The mock's 2 rooms → **£865** (T5), 13.9 litres | UI/UX |
| `../design/prototypes/paint-calculator.html` | `MIST_DRY` once per job, £6/L, separate tins per surface | UI/UX |
| `../codebase/decisions.md`, `conventions.md` | Vitest; `app/lib/` for pure logic | Lead |
