# Design CHANGELOG

## v0.3 — 17/10/2026

The founder accepted all 10 CEO decisions (`../ceo/decisions-2026-10-17.md`). This version applies the edits that memo gives to [UI/UX]: #1, #2, #3, #5, #6, #7, #8, #9. Direction **"Coachline" is approved**. The prototype edits were started in the 00:57 commit; this round finishes the specs and the remaining copy.

**Prototypes**

- `landing.html` + `desktop-landing.html` (#2): H1 "Room sizes in. Priced quote out.", new sub, primary "Price a room free" → paint calculator, "Every number shown. Every line yours." demo with room sizes, 3 steps ending "When it's accepted, it's an invoice.", cancel FAQ with Undo. Desktop hero mock now shows the calculator. No "60 seconds", no voice CTA.
- `paint-calculator.html` (#1, #3): rooms as cards with "+ Add another room" / Remove, day rate + m² a day, "The working" (one line per room and surface), "Your price at your day rate", "New plaster? Add a mist coat" switch (own line + ½ day drying, not charged), primary "Turn this into a quote".
- `client-quote.html` (#9): full-width "Message Dave on WhatsApp" with the generic bubble (fallback until the official pack is in the repo).
- `paywall.html` (#6): "£9 a month, incl. VAT", terms "(incl. VAT)" for all three plans, trust line "All prices incl. VAT." (was "wording TBC").
- `decorating-invoice-template.html` (#2): the "one tap" invoice claim is replaced by "When it's accepted, it's an invoice."

**Specs**

- `screens.md` → v0.3: status table; P1 hero/CTA/FAQ and the late-Nov re-test; P2 multi-room, mist coat, maths, 31 Oct cut order; P3 pre-fill from the calculator + deposit / mist-coat FAQ; P4 live 14/11; P5 incl. VAT + comparison rules (#4); A9 overdue reminder text (P1, cut first); A10 incl. VAT; A11 cancel = one tap + Undo toast + "Resume Pro" with failure states (no confirm dialog); C1 WhatsApp label + yellow Accept.
- `design-system.md` → v0.3, approved: "the set is the mark" rule (§1), §3.4 decorator colours with automatic contrast fallback to yellow (post-MVP Pro), §6.1 WhatsApp rules from Meta's brand page + generic-bubble fallback, toast with Undo stays 6 s, paywall incl. VAT.

**Not done / known issues**

- **Images not re-rendered.** `images/*.png` are still v0.2. `tools/screenshot.ps1` / `render.ps1` are Windows-only; re-render on the Windows laptop (or port them to a headless-Chrome script).
- **Fixed after the engine spec was signed off (`../specs/paint-calculator.md`, D1–D6):** the landing mock (phone + desktop) now shows the spec's T5 numbers (2 rooms → 13.9 litres → **£865**, was £615); the calculator prototype now uses £6/L, 40 m²/day, tins per paint (walls / ceiling / mist coat), areas rounded to 0.1 m² and ½ day mist-coat drying once per job. Checked in headless Chrome: default rooms → 14.0 litres, 3.8 days, £865.00.
- Woodwork switch (cut-order item 5) is not in the prototype yet. `decorating-quote-template.html` (P3) is not built; the calculator links to it.
- Settings (A11 cancel / Resume) has a spec but no prototype.
- Official WhatsApp brand pack: not downloaded yet (founder action).

## v0.2 — 16/10/2026

Direction **"Coachline" — proposed, pending founder review** (not approved yet). Builds on v0.2-checkpoint below; scope trimmed at the founder's request to finish quickly.

**What changed since the checkpoint, and why**

- **All phone prototypes moved onto Coachline** via the shared base (`tools/pb-base.css`): landing, paint calculator, quotes, new quote, send sheet, invoice, paywall. They now render at full content height in screenshots (v0.1's paint calculator was cut at the bottom).
- **New screen: `/decorating-invoice-template`** (free invoice generator, phone) — founder decision; title/H1 from `docs/seo/keyword-map.md`. Description fields take a full row so nothing truncates at 360 px.
- **SEO URLs and exact H1s** applied to landing, calculator and templates (no `/free-quote-template`); host shown as `pricebrush.pages.dev`; About page author = Arif Noviarrizal (`screens.md` P6).
- **Fixes found while checking renders:** paint-calculator CTA text overflowed (buttons now wrap); Quotes filter pills were cut off on the right (now wrap to two rows); bottom-nav active indicator was drawn twice; orphaned heading words ("mate.") fixed with `text-wrap: balance`; stale v0.1 `prototypes/_states.html` removed; "All screens" links now open `_overview.html`.
- **State images** for screens that need them use tiny alias pages (`new-quote--recording.html`, `new-quote--processing.html`, `invoice--overdue.html`) that redirect with `?state=`, because `screenshot.ps1` only passes `?theme=`.
- **`design-system.md` rewritten** for Coachline: tokens (light/dark), every contrast pair, type at 87.5 % width + sentence case, phone vs desktop layout rules, Tailwind v4 `@theme` (adds `desk` 1024 px breakpoint and fixed `paper` colours for the PDF), components incl. new desktop editor spec.
- **`screens.md` rewritten:** status table per screen (phone/desktop/v0.3), SEO titles + H1s, P3 quote template, P4 invoice template, P5 pricing, P6 about, desktop layout for each main screen.
- **`design-system.html`** board created (1200 px): logo, swatches with token names, contrast table, type, spacing, radii, icons, buttons/inputs/mic in every state, line rows, chips, list item, nav, sheet, toast, empty state, paywall card, document, desktop shell.
- **Overviews:** `_overview.html` (all 13 phone screens/states at full height, 6-column masonry) and `_overview-desktop.html`. Built from the PNGs, so nothing is cropped.

**Images (all opened and checked: full height, nothing cut on the right, £ and — render, dark is dark). Sizes are pixels at 2x.**

| Image | Size |
|---|---|
| `images/landing-light.png` / `-dark.png` | 720 × 7188 |
| `images/paint-calculator-light.png` / `-dark.png` | 720 × 3462 |
| `images/decorating-invoice-template-light.png` / `-dark.png` | 720 × 6594 |
| `images/quotes-light.png` / `-dark.png` | 720 × 1854 |
| `images/new-quote-light.png` / `-dark.png` | 720 × 1600 |
| `images/new-quote--recording-light.png` / `-dark.png` | 720 × 1600 |
| `images/new-quote--processing-light.png` / `-dark.png` | 720 × 1600 |
| `images/review-quote-light.png` / `-dark.png` | 720 × 2754 |
| `images/send-sheet-light.png` / `-dark.png` | 720 × 1600 |
| `images/client-quote-light.png` / `-dark.png` | 720 × 2676 |
| `images/invoice-light.png` / `-dark.png` | 720 × 2358 |
| `images/invoice--overdue-light.png` / `-dark.png` | 720 × 2618 |
| `images/paywall-light.png` / `-dark.png` | 720 × 2204 |
| `images/desktop-quote-editor-light.png` / `-dark.png` | 2560 × 2974 |
| `images/desktop-landing-light.png` / `-dark.png` | 2560 × 5548 |
| `images/design-system-light.png` / `-dark.png` | 2400 × 11372 |
| `images/_overview-light.png` / `-dark.png` (phones) | 3200 × 5468 |
| `images/_overview-desktop-light.png` / `-dark.png` | 3200 × 3810 |
| `images/_checkpoint-light.png` / `-dark.png` (kept from checkpoint) | 3200 × 4938 |

**Next (v0.3)**

- Desktop: Quotes list + detail, desktop invoice, Settings / plan, desktop paint calculator, desktop client quote page.
- `/decorating-quote-template` prototype (phone + desktop WYSIWYG); the landing already links to it.
- Desktop dialogs for Send and Paywall; onboarding (A1–A3) prototypes; Settings phone.
- Test Coachline with 5–10 decorators outdoors on a cheap Android (assumptions in `research.md` §3).

## v0.2-checkpoint — 15/10/2026

Early review cut requested by the founder. The rest of v0.2 (other screens, `design-system.html`, full image set) follows.

**What changed and why**

- **Research is now visual.** 65 reference images captured locally with `tools/capture-ref.ps1` and opened one by one; 59 usable (6 were block pages, HTTP 400 or a 404). `research.md` rewritten from what was actually seen.
- **Direction changed from "Signwritten" to "Coachline".** Evidence: navy/black + hi-vis yellow + condensed caps is Powered Now's look (UK competitor), also the Fixxa homeowner app and the Dribbble "construction" cliché; real UK signwritten vans are coach green / oxblood with cream and gold lettering. New palette: coach green brand, cream paper, green-black ink, signal yellow reserved for the one primary action, a thin gold "coachline" as the only ornament. Headings now sentence case.
- **Desktop is first-class** (PRD §6.1, decided 15/10/2026): new desktop quote editor (lines left, live A4 preview and actions right, keyboard shortcuts) and desktop landing.
- **Review quote (phone):** total repeated in the pinned bar above "Send quote"; "See what Mrs Patel will see" link.
- **Client quote page (phone):** summary first (total, valid-until, Q number), then details — pattern seen in YourTradebase, Stripe and Jobber client pages.
- **SEO URLs and H1s** taken from `docs/seo/keyword-map.md` (founder decision): `/paint-calculator`, `/decorating-quote-template`, `/decorating-invoice-template`; host `pricebrush.pages.dev`.
- **Rendering fixed:** pages render at full content height (no bottom crop), overview built from PNGs instead of iframes (no right-side crop, which was caused by 1 px iframe borders and a board wider than the window in v0.1).

**New design tooling (inside `docs/design/tools/`, no app code touched)**

- `pb-base.css`, `pb-head.js`, `pb-icons.svg` + `sync-base.py`: one shared token/component base, inlined into each HTML file so prototypes stay self-contained.
- `render.ps1`: measures each page's height with local headless Chrome, then calls `screenshot.ps1` with that height. `screenshot.ps1` itself is unchanged.
- `contrast.py`: WCAG contrast check for the token pairs.

**Files**

- `research.md` (rewritten)
- `prototypes/review-quote.html` (rebuilt), `prototypes/client-quote.html` (rebuilt), `prototypes/desktop-quote-editor.html` (new), `prototypes/desktop-landing.html` (new), `prototypes/_checkpoint.html` (new)

**Images (all viewed and checked: no right-side crop, £ and — render, dark is dark)**

- `images/review-quote-light.png`, `images/review-quote-dark.png` (360 × 1377 @2x)
- `images/client-quote-light.png`, `images/client-quote-dark.png` (360 × 1338 @2x)
- `images/desktop-quote-editor-light.png`, `images/desktop-quote-editor-dark.png` (1280 × 1487 @2x)
- `images/desktop-landing-light.png`, `images/desktop-landing-dark.png` (1280 × 2774 @2x)
- `images/_checkpoint-light.png`, `images/_checkpoint-dark.png` (1600 × 2469 @2x)

**Status of the direction:** proposed, pending founder review.

**Not yet updated in this checkpoint:** `design-system.md`, `screens.md`, other phone prototypes (still v0.1 "Signwritten" styling), `design-system.html`.

## v0.1 — 15/10/2026 (stopped before completion)

- Text-only research, direction "Signwritten" (navy + hi-vis yellow + cream, Archivo condensed).
- `research.md`, `design-system.md`, `screens.md`, 9 phone prototypes, phone images.
- Known problems (fixed in v0.2): no desktop layouts; `_overview-*.png` cropped on the right; paint calculator image cut at the bottom; no `design-system.html`; no CHANGELOG.
