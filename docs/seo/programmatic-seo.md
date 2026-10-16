# PriceBrush — Programmatic SEO (v0.1)

Date: 15/10/2026 · Decision: **yes, but small and slow.** Generate pages only where the data shows distinct demand and where each page can give a different, genuinely useful answer. Google's spam policies call out "scaled content abuse" and doorway pages; one bad batch can drag the whole young site down.

## 1. What we will build (phase 1: Dec 2026 – Feb 2027)

**Room-specific paint pages** under the calculator: `/paint-calculator/<room>`. Evidence: `data/paint.csv` and `data/extra-paint-tech.csv` contain many room-specific UK phrasings ("how much paint do i need for a bedroom", "…for a living room", "…for hall stairs and landing", "…for a small bathroom", "…for a kitchen", "how much paint for a bedroom ceiling", "…for a door", "…for skirting boards").

| # | Slug | Primary keyword | What makes it different (must be real) |
|---|---|---|---|
| 1 | `/paint-calculator/hall-stairs-and-landing` | how much paint for hall stairs and landing | Stairwell walls are tall and irregular: how to measure them (split into rectangles + triangle), height/access note (platform or ladders, time), usually the biggest litres per "room" |
| 2 | `/paint-calculator/bedroom` | how much paint for a bedroom | Presets: box room, single, double, master (UK sizes); walls + ceiling; feature wall option |
| 3 | `/paint-calculator/living-room` | how much paint for a living room | Larger rooms, chimney breast and alcoves (add/subtract), bay window |
| 4 | `/paint-calculator/ceiling` | how much paint for a ceiling | Ceiling emulsion coverage, new-plaster mist coat, why ceilings often take 2 coats + time overhead |
| 5 | `/paint-calculator/kitchen` | how much paint for a kitchen | Less wall (units/tiles) → subtract method; wipeable/kitchen paints coverage |
| 6 | `/paint-calculator/bathroom` | how much paint for a small bathroom | Tiles subtracted, bathroom-paint coverage, often 1 × 2.5 L enough |
| 7 | `/paint-calculator/door` | how much paint for a door | Both sides + frame, satinwood/gloss coverage, 750 ml rule of thumb (Dulux), undercoat |
| 8 | `/paint-calculator/skirting-boards` | how much paint for skirting boards | Linear metres × height method; 750 ml typical for a small room (Dulux) |

**Cap: 8 pages in phase 1. Hard cap 15 room/surface pages in total** until GSC shows each existing one earns impressions. No more than **2 new pages per week**.

## 2. Quality rules (every page must pass all)

1. **Proven demand:** the primary keyword appears in a `data/*.csv` file (autocomplete) and isn't the primary of another URL (`keyword-map.md`).
2. **Unique help, not swapped words:** ≥ 400 words written for *that* room (measurement method, typical UK sizes, products/coverage, pitfalls). Shared boilerplate (method, footer) ≤ 30% of the text.
3. **Calculator preset** with that room's typical dimensions, and a **worked example computed by the same engine** as `/paint-calculator` (numbers must match).
4. **≥ 3 FAQs specific to the room**, taken from autocomplete questions.
5. **Links:** breadcrumb to `/paint-calculator` (parent), 2 sibling links where relevant (e.g. ceiling ↔ bedroom), CTA to the quote template.
6. **Human review** before publishing: the founder checks numbers and reads it on a phone. AI may draft; a human is accountable.
7. **Prune rule:** after 90 days with < 20 impressions in GSC, improve once; if still nothing after another 60 days, merge into the calculator page and 301.

## 3. What we will NOT build

- **City pages** ("painter and decorator leeds prices", 40+ towns in `data/pricing.csv`): homeowner intent, we have no real local price data, and Checkatrade/MyBuilder/bizhub365 already run these. Text-swapped city pages = doorway pages. **Revisit only** when PriceBrush has enough anonymised, consented quote data to publish real local medians (e.g. ≥ 30 quotes per city), and then as one data page, not 40 thin ones.
- **Colour / brand pages** ("how much paint do i need dulux", "valspar paint calculator uk"): brand-navigational, the brands own them.
- **Per-dimension pages** ("how much paint for a 10x12 room", "…4m x 4m room"): one calculator answers all of these; the generic page covers the 4 m × 4 m example.
- **US-style "estimate" variants** of the same templates.

## 4. Phase 2: other trades (not before Q2 2027)

PRD: expand to other trades only after decorator pages rank. **Gate:** at least 2 of the 3 P0 decorator pages in the top 10 for their primary keyword (GSC average position, 28 days).

Then one trade per quarter, e.g. `/plastering-quote-template`, `/plastering-invoice-template`, a trade calculator (plaster bags/m²). Each trade page needs trade-specific fields, examples, prices and FAQs researched with `tools/keywords.ps1` for that trade — **not** the decorator page with "decorator" replaced. Cap: 3 pages per trade at launch.

## 5. Technical notes

- Room pages are prerendered (add to `public-routes.ts`), included in the sitemap, self-canonical.
- Data for presets lives in one typed file (`rooms.ts`: slug, title, description, dimensions, FAQs, copy blocks) so the developer can add a page in < 30 minutes once the copy is approved.
- Don't create a page in code until its copy is approved — no placeholder pages in the sitemap.
