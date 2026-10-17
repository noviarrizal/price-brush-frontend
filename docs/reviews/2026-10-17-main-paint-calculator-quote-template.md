# Review — `/paint-calculator`, `/decorating-quote-template` and the calculator → quote handover

Date: 17/10/2026 · Reviewer: pricebrush-lead · Repo: `price-brush-frontend` · Branch: `main` (clean, up to date with `origin/main`)
Commits reviewed: `9acf84d` "Add paint calculator and quote template", `fc3c4cf` "Add calculator-to-quote handover" (merged in `70b6db6`). Base for the diff: `67702f4`.
Measured against: `docs/specs/paint-calculator.md` (v0.1, approved), `docs/PRD.md` F1/F2 + decisions 17/10/2026, `docs/seo/technical-seo.md` v0.2, `docs/seo/keyword-map.md` v0.3, `docs/seo/briefs/paint-calculator.md`, `docs/seo/briefs/decorating-quote-template.md`, `docs/design/screens.md` P2/P3, `docs/codebase/quality.md`.

## Verdict: **Request changes**

The engine is in very good shape. It follows the spec closely, it is pure, its names are clear, and its 69 tests cover every spec case T1–T13 plus the tin table. The handover works end to end. PDFs are made in the browser and send no form data over the network. Lighthouse mobile scores are 97–98 for performance.

Four defects must still be fixed before this code goes in front of users:

1. A UK-style price such as "1,290" is read as £1.29 and printed on the PDF.
2. Arriving from the calculator keeps the previous job's client name, address and old quote date.
3. The example table on the quote page fails WCAG AA contrast in dark mode.
4. The pages promise ceilings, several rooms and a mist coat, but the calculator can't do any of them yet. (This one goes away if cut-order steps 4–6 land before launch.)

## Checks run

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` (pnpm 12.9.1, Node 22.23.2) | **Exit code 1**: `ERR_PNPM_IGNORED_BUILDS` (esbuild 0.28.2). `node_modules` is complete and everything below works, but any CI or Cloudflare Pages build that runs this command will fail. This was already true before these commits (same esbuild version in `4832875`); see S5 |
| `pnpm typecheck` | Pass (0 errors) |
| `pnpm test` | Pass: 7 files, **69 tests** |
| `pnpm build` | Pass. Prerendered: `/` → `index.html`, `/paint-calculator` → `paint-calculator/index.html`, `/decorating-quote-template` → `decorating-quote-template/index.html`, plus `__spa-fallback.html`. One warning: the `quote-pdf` chunk is 1,239 kB (455 kB gzip). It was already accepted in `decisions.md` because it is lazy-loaded, and I confirmed it is not in any `modulepreload` |
| First-load JS (gzip, from the `modulepreload` list in the prerendered HTML) | `/paint-calculator` **121.4 KiB**, `/decorating-quote-template` **126.3 KiB**. The budget in `technical-seo.md` §6 is ≤ 120 KB. Of this, about 106 KiB is the framework (`entry.client` 65.8 + `jsx-runtime` 28.8 + `errorBoundaries` 11.3). See S6 |
| Lighthouse 12 mobile, local `vite preview` (machine in dark mode) | Calculator: Perf **98**, A11y **100**, BP 100, SEO 92 (LCP 1.9 s, CLS 0, TBT 10 ms). Quote template: Perf **97**, A11y **96** (colour contrast, M3), BP 100, SEO 92 (LCP 2.1 s, CLS 0.001). SEO 92 only because `robots.txt` doesn't exist yet (pre-launch checklist) |
| `pnpm audit` | No known vulnerabilities |
| `pnpm outdated` | react/react-dom 19.3.0 → 19.3.1 (patch). Vite 8, TypeScript 7 and vite-tsconfig-paths 6 are majors we hold back on purpose (`stack-notes.md`) |
| Behaviour run in headless Chrome (CDP script in `%TEMP%\pricebrush-spike-review\cdp.mjs`) | Empty state, stale settings, handover with an existing draft, Undo, reload (no duplicate lines), PDF download (577 ms on localhost, then a toast; the only requests were the local `quote-pdf` chunk and a `data:` wasm, so **no form data leaves the browser**), keyboard focus styles |
| Engine edge cases (`%TEMP%\pricebrush-spike-review\probe.ts`, bundled with the repo's esbuild) | 30 × 30 m with 3 coats, worst-case settings, tins for 0.05 L and 1,000 L: all correct. `chooseTins` takes about 0.13 ms in the worst case. Money parsing: see M1 |
| PDF output | Opened `Quote Q-0001 Mrs Patel.pdf`: A4, text you can select, £380.00, dates 17/10/2026 and 16/11/2026, "Made with PriceBrush" footer link, no VAT lines when VAT is off |

## Findings

| # | Severity | File:line | Problem | Why it matters | Suggested fix |
|---|---|---|---|---|---|
| M1 | **Must fix** | `app/lib/numbers.ts:5-15`, used by `app/lib/quote/quote.ts:137` and `app/lib/paint/form.ts:89-90` | `parseDecimal` treats the first comma as a decimal point, so the price "1,290" becomes **£1.29** and "£1,290" also becomes £1.29. The PDF button is enabled and the PDF shows £1.29. Reproduced in the browser: the total shows "£1.29". "1,290.00" is rejected, which is safe | UK decorators write thousands with a comma. A quote sent at a thousandth of its price is the worst failure a quoting tool can have (PRD principle 2, F2 "format UK £"). The day-rate field has the same bug ("1,200" → £1.20, still within the £0–£2,000 range) | Split the parsers. Keep `parseDecimal` (decimal comma) for **metres**. For **money**, add `parseMoneyToPence`: strip `£` and spaces; accept `^\d{1,3}(,\d{3})+(\.\d{1,2})?$` as thousands separators; accept `^\d+([.,]\d{1,2})?$` (a comma followed by 1–2 digits is a decimal); reject everything else with "Enter a price, like 1,290 or 220.50". Add tests: "1,290" → 129000, "1,290.50" → 129050, "£1,290" → 129000, "220,5" → 22050, "1,29" → 129, "12,34,5" → error. Use it in `quote.ts` and in `readSettings` for the day rate and paint price |
| M2 | **Must fix** | `app/routes/decorating-quote-template.tsx:104-108` | When a handover arrives, only `lines` are replaced. The earlier draft's **client name and job address**, its **quote date** (e.g. 01/10/2026) and so its "valid until" are all kept. Seen in the browser: after the handover the form still had "Mrs Patel" and 2026-10-01 | Spec §10 lists what stays: "business details, quote number and settings". The client is not on that list. The banner says "then add the client", but the old one is already filled in, so a decorator can easily send one client's name and address to another. That is wrong data on a document and a personal-data disclosure (UK GDPR minimisation) | On handover, keep `business`, `quoteNumber`, `validForDays`, `materialsBasis`, `vatRegistered` and `vatNumber`. Reset `client` to empty, `quoteDate` to `todayIsoDate()` and `notes` to empty (notes may name the old client). Undo already restores the whole earlier draft. Add a test: handover over a draft that has a client → the client is empty and the date is today |
| M3 | **Must fix** | `app/components/quote-template/quote-template-guide.tsx:141,149` | The example table has a fixed white "paper" background (`bg-paper text-paper-ink`, line 128), but its detail text uses the theme token `text-ink-2`. In dark mode that is #B8C2BB on #FFFFFF = **1.83:1** (Lighthouse `color-contrast`, 4 nodes) | WCAG 2.2 AA requires 4.5:1 (PRD §8, `quality.md`). Dark mode follows the system setting, so many phones get it | Add a fixed `--color-paper-ink-2: #46524B` beside `--color-paper*` in `app/app.css` (line 70) and use `text-paper-ink-2` on both spans. Also use a fixed paper rule colour instead of `border-line` on the rows (line 138/146) so the rows still show in dark mode |
| M4 | **Must fix before launch** (unless steps 4–6 land) | `app/routes/paint-calculator.tsx:26-27,133-134,177-178`; `app/lib/paint/form.ts:32`; `app/components/paint-calculator/room-card.tsx:6` | The meta description and intro say "walls and ceilings, room by room". The method mentions the ceiling and the mist coat. The UI has **one room, walls only**: `includeCeiling` defaults to `false` with no switch, and there is no mist-coat switch and no "+ Add another room" | Google and users get promises the tool can't keep. Spec §7 and brief §7 both stress "never show numbers that disagree" | This is resolved by cut-order steps 4 (multiple rooms, **required for 31/10**), 5 and 6. If any of them is cut at the 28/10 check, the copy has to change with it: ask SEO for a one-room meta description and remove method steps 3–4 from the page. Don't ship the current mix |
| S1 | Should fix | `app/routes/paint-calculator.tsx:203` | "No tape measure? A 4 × 4 m room usually needs about 5 litres for two coats on the walls." Our own engine says **6.5 L** for that room at the defaults (1 door, 1 window), and 6.4 L even with no openings and 0 % spare | The page contradicts its own tool, which is the exact trust gap the brief says we beat competitors on. The copy comes from `screens.md` P2, which is design's doc | Calculate the sentence from the engine, as the worked example already is, e.g. `calculateJob([4 × 4 × 2.4, 1 door, 1 window, walls only])` → "about 6.5 litres (1 × 5 L + 1 × 2.5 L)". Ask design to update `screens.md` P2 |
| S2 | Should fix | `app/components/quote-template/quote-pdf.tsx:117` | The watermark link hard-codes `https://pricebrush.pages.dev/?ref=wm` | `technical-seo.md` §9: keep every absolute URL behind `SITE_URL`, and "don't hard-code the host in PDFs except via one config value". Otherwise the domain move misses the PDFs | `` src={`${SITE_URL}/?ref=wm`} `` (import from `~/seo/meta`) |
| S3 | Should fix | `app/routes/paint-calculator.tsx:127` | No breadcrumb UI on the calculator, although its JSON-LD has a `BreadcrumbList`. The quote template has both | `technical-seo.md` §4: "Breadcrumb UI on tool and guide pages (Home › Page) matching the JSON-LD" | Move the quote page's `<nav aria-label="Breadcrumb">` (`decorating-quote-template.tsx:185-193`) into a shared `Breadcrumb` component and use it on both pages |
| S4 | Should fix | `app/routes/decorating-quote-template.tsx:108`, `:330-338` | Undo after a handover brings the old lines back, but the banner "We brought over 1 room from the paint calculator…" stays (confirmed in the browser) | The status message no longer matches the form | Undo should also call `setHandoverBanner(null)` |
| S5 | Should fix (existing before these commits) | repo root: no `pnpm-workspace.yaml` | `pnpm install --frozen-lockfile` exits 1 with `ERR_PNPM_IGNORED_BUILDS`. pnpm's `strictDepBuilds` defaults to `true`, so unreviewed build scripts fail the install ([pnpm build settings](https://pnpm.io/settings/build), `strictDepBuilds` added v10.3.0, `allowBuilds` added v10.26.0; `onlyBuiltDependencies` was removed in v11) | The first Cloudflare Pages or CI build will fail at install | Add `pnpm-workspace.yaml` with `allowBuilds:\n  esbuild: false`. Builds already pass without esbuild's postinstall, because the platform binary comes from the optional dependency. Or use `true` to run it. Check which pnpm version the Pages build image uses when deploy is set up (**not verified**) |
| S6 | Should fix | first-load JS (see Checks) | 121.4 KiB / 126.3 KiB gzip against the ≤ 120 KB budget in `technical-seo.md` §6. The framework baseline alone is about 106 KiB, so each page has about 14 KiB for its own code. The quote page's route chunk is 10 KiB | It is over the written budget. Lighthouse is still 97–98, so this is not urgent, but the invoice page will make it worse | Either (a) ask SEO to set the budget at 130 KiB for tool pages, with the Lighthouse ≥ 90 gate unchanged, or (b) load `QuoteTemplateGuide` and `LineItems` normally but defer nothing else (there is little to gain). I recommend (a). The real budget is Lighthouse, and the framework floor can't be cut without leaving React Router |
| S7 | Should fix | `app/lib/quote/quote.ts:16-19`, `app/routes/decorating-quote-template.tsx:251-265` | With "Labour only" selected, a handover still adds a "Paint" line with a price. The PDF then says "Labour only — client supplies paint" and also charges for paint | The document contradicts itself in front of the client | When `materialsBasis === "labourOnly"` and a line is titled "Paint" with an amount, show a calm hint under the toggle: "You've chosen labour only but there's a Paint line — remove it or switch to supply and apply." Don't auto-delete |
| N1 | Nit | `app/components/form-fields.tsx:7` | `focus:outline-none` sets `--tw-outline-style: none`, so `focus-visible:outline-[3px]` never shows (computed `outline-style: none`). The only focus cue on inputs is the 2 px border turning `--pb-focus` (#1D4BAF, confirmed) | This passes WCAG 2.2 AA (2.4.7 Focus Visible, and the border contrasts with the surface), but the class says 3 px ring and the code does something else | Remove `focus:outline-none` so the base `:focus-visible { outline: 3px solid var(--pb-focus) }` rule applies (`app.css:111-114`), or drop the dead `focus-visible:outline-[3px]` |
| N2 | Nit | `app/routes/decorating-quote-template.tsx:344-346` | "Nothing you type here leaves your phone." also shows on desktop | Small copy mismatch. `screens.md` P3 desktop uses "Nothing you type leaves this browser." | Use "this browser" everywhere, as the calculator CTA already does |
| N3 | Nit | `app/routes/paint-calculator.tsx:35-44`, `decorating-quote-template.tsx:42-51` | `WebApplication` JSON-LD lacks `"isAccessibleForFree": true` (`technical-seo.md` §5 sketch). The briefs don't require it | Small consistency gap | Add it |
| N4 | Nit | `app/components/paint-calculator/result-card.tsx:81` | "at £200.00 a day". Design and spec copy use "£200 a day" | Reads a little fussy | Format whole pounds without pence in this caption only |
| N5 | Nit | `quote-template-guide.tsx:55,69,73,87,225` | `rel="noopener"` on links without `target="_blank"` has no effect | Dead attribute | Remove, or keep if the team prefers consistency |

### Outside this diff (noticed, not blocking this review)

- `app/routes/home.tsx:5,20`: the home title and text say "Quote any decorating job in 60 seconds". "60 seconds" is **banned copy** (PRD §1, CEO decision #2, `keyword-map.md`), and the title and description don't match `keyword-map.md`. The placeholder must be replaced before anything is deployed.
- No `public/404.html`, `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, OG images, footer or `public-routes.ts` yet (`technical-seo.md` §1, §3, §4). These are already on the pre-launch checklist and are listed here so they aren't forgotten.

## Acceptance criteria

### PRD F1 — paint calculator

| Criterion | Status |
|---|---|
| Length × width × height per room, doors, windows, coats | Pass |
| "+ Add another room" | **Not built** (cut-order step 4, required for 31/10) |
| Switch walls / ceiling / wood | **Not built** (step 5; ceiling works in the engine, there is no UI) |
| "New plaster? Add a mist coat" as its own line | **Not built** in the UI (step 6). The engine and tests (T6) are done |
| Litres at 12 m²/L by default, editable, rounded to tin sizes | Pass (10/5/2.5 L per surface, spec §5; verified T1–T4 and the tin table) |
| Labour days, labour from the day rate, total labelled "Your price at your day rate" | Pass |
| Result without reload | Pass (live, `useMemo`; stale state when a setting is invalid, seen in the browser) |
| "Turn this into a quote" fills F2 | Pass, with M2 |

### PRD F2 — free quote generator

| Criterion | Status |
|---|---|
| Lines and business details without login | Pass |
| PDF download in UK format: £ | **Fail until M1** (comma-thousands prices read wrong) |
| VAT optional | Pass (off by default; 20 % plus VAT number only when on; `Math.round` to whole pence) |
| Dates DD/MM/YYYY | Pass on the PDF and the "Valid until" text. The native date input follows the browser locale (MM/DD on an en-US browser). This is fine for UK users and only noted for testing |
| Watermark | Pass ("Made with PriceBrush: free quote tools for decorators", footer on every page) |

### Spec `docs/specs/paint-calculator.md`

| Section | Status |
|---|---|
| §2 defaults and ranges | Pass (`defaults.ts`, "Defaults last checked: 17/10/2026" shown) |
| §3 parsing (decimal comma) and validation messages | Pass for metres. Money: see M1 |
| §4 maths steps 1–13, rounding before reuse, whole pence | Pass (checked line by line against `calculate.ts`, `rounding.ts`) |
| §5 tins | Pass (the search is cut down to ≤ 1 × 5 L and ≤ 1 × 2.5 L as the spec allows) |
| §6 result shape and invariants | Pass (`totalPence = labourPence + paintPence` by construction; tested) |
| §7 working text and singular "1 day" | Pass |
| §8 test cases T1–T13, tin table | Pass (all present in `calculate.test.ts`, `tins.test.ts`) |
| §10 handover: key, read once, 24 h, version check, lines order, Paint line, banner, Undo 6 s, StrictMode guard | Pass, **except** what stays on top of an existing draft (M2) and the banner after Undo (S4). `quote_prefilled` waits for the counter Worker, as the spec allows |
| §11 events | Not built (waiting for the counter Worker; expected) |
| §12 code layout | Pass, with one small drift: there is no `areas.ts`, the area functions live in `calculate.ts`. That's fine; the spec can say so |

### SEO — `technical-seo.md`, `keyword-map.md`, briefs

| Item | `/paint-calculator` | `/decorating-quote-template` |
|---|---|---|
| Prerendered, H1, intro and text in view-source | Pass | Pass |
| Title exactly as keyword map | Pass | Pass |
| Meta description exactly as keyword map | Pass (but see M4) | Pass |
| One H1, matching | Pass | Pass |
| Canonical = `SITE_URL + path` | Pass (no trailing slash; the slash behaviour on Pages is still to be checked at first deploy, §2.1) | Pass |
| OG tags | Pass; no `og:image` yet (the helper leaves it out until images exist) | Same |
| JSON-LD `WebApplication` + `BreadcrumbList`, no ratings | Pass (N3) | Pass (N3) |
| Breadcrumb UI | **Missing** (S3) | Pass |
| Footer with sitewide links | Missing (outside this diff) | Missing |
| Brief §2.2 sections and word count (1,200–1,800 below the tool) | **Gap**: only "How to work out how much paint you need" + worked example (about 380 words in the whole body). Missing: coverage table, typical rooms table, "For decorators", 12 FAQs, sources line | Close: all 5 sections, 10 FAQs, about 1,200 words in the whole prerendered body. Missing: cancellation-notice option in the form, blank .docx / Google Docs / PDF downloads, terms block with defaults (notes textarea with a placeholder instead) |
| Cannibalisation (no "invoice" in quote title/H1) | n/a | Pass |
| Facts checked | — | VAT £90,000 threshold (GOV.UK); CCR 2013 £42 and 14 days; Direct Line "taking half the payment upfront (39%)", reported 15/01/2026, sample size not given — **verified** on the Scottish Financial News page today. Wording matches the CEO rule |

### `quality.md` Definition of Done

| Item | Status |
|---|---|
| Acceptance criteria met | Partly (see above) |
| Typecheck and build pass, no new warnings | Pass. The only build warning is the accepted PDF chunk |
| Tests for non-trivial logic | Pass for paint maths, tins, handover, quote totals, VAT and dates. **Missing for money parsing with thousands** (M1) |
| Visual check 360/1440, light/dark | Done by me (below) |
| Accessibility | Labels, 48 px targets, `role="alert"`/`status`, stepper `aria-label`s, `aria-describedby` on errors, scroll padding for the pinned bar (WCAG 2.4.11): pass. Contrast: **fail in dark mode** (M3) |
| SEO per keyword map / technical-seo | Partly (see table) |
| No secrets, no client data in URLs/analytics/logs | Pass: no network calls carry form data; the handover holds no client details; the draft stays in `localStorage` |
| Handoff lists changes for `docs/codebase/` | Pass: the commits updated architecture, overview, changelog and decisions. Some drift fixed in this review (below) |

## Screenshots reviewed

All local, under `%TEMP%\pricebrush-review-shots\`:
`calc-empty-{360,1440}-{light,dark}.png`, `calc-filled-{360,1440}-{light,dark}.png`, `quote-empty-{360,1440}-{light,dark}.png`, `quote-prefilled-360-light.png`, `quote-focus-360-light.png`. Dark mode was set through CDP `Emulation.setEmulatedMedia` (prefers-color-scheme). They were compared with `docs/design/images/paint-calculator-light.png` and `screens.md` P2/P3.

Design mismatches:

- Calculator: only one room, with no room name/Remove row, no ceiling or mist-coat switches and no "+ Add another room" (the cut order, M4). Without "Include the ceiling", "The working" lists walls only.
- Calculator "Paint and spare" uses a chevron; the prototype uses "+". This doesn't matter.
- Calculator header has no "Log in". That is right before the MVP, because there are no accounts.
- Quote template at 1440 px is a single 672 px column with the pinned bottom bar. `screens.md` P3 desktop says "the page *is* the document… right rail with Download PDF". See question 3.
- Everything else matches: Coachline tokens, the yellow primary used only once per page, the green CTA card, the result card, and the paper-white example table (apart from the dark-mode contrast in M3).

## Codebase docs updated

- `docs/codebase/architecture.md`: fixed the stale `app/routes.ts` row (it now lists all three routes), added the browser storage keys, measured bundle sizes, and the handover rules as built.
- `docs/codebase/changelog.md`: the 17/10 entries now point to the merged commits (`9acf84d`, `fc3c4cf`, merge `70b6db6`) instead of "feat/paint-calculator (uncommitted)", plus a row for this review.
- `docs/codebase/stack-notes.md`: refreshed 17/10/2026 (`@react-pdf/renderer` 4.9.0, `vitest` 5.0.5, react 19.3.1 patch available, the pnpm `strictDepBuilds`/`allowBuilds` install failure with doc link, how React Router `meta` replaces parent meta and JSON-LD via `script:ld+json`).
- `docs/codebase/quality.md`: Definition of Done now has the money-parsing and dark-mode "paper" contrast checks, per-route JS numbers, a clean `pnpm install --frozen-lockfile` and the review procedure; test runner marked configured.
- `docs/codebase/conventions.md`: browser storage conventions (`pricebrush.<name>` keys, read after hydration, injected `Storage`), money vs metres parsing rule.
- `docs/codebase/decisions.md`: free-tool drafts in `localStorage`, not IndexedDB (as built; the PRD says IndexedDB for the app).
- `docs/codebase/overview.md`: current state, test count, install caveat.

## Questions for the founder

1. **Quote number after a handover.** The spec says the quote number stays (e.g. Q-0007). For a new job, should it go up by one to Q-0008? I recommend yes: it is a new quote, and two quotes with the same number confuse clients. This needs a one-line spec change.
2. **Calculator content for 31/10.** Brief §2.2 asks for 1,200–1,800 words (coverage table, room table, decorators section, 12 FAQs). Today there are about 380. Who writes it and by when: SEO drafts, then the engineer pastes it in, about 2 h? It is the page's main ranking asset.
3. **Desktop quote template.** Is the "page is the A4 document + right rail" layout (`screens.md` P3) needed for 31/10, or can the single column ship and the desktop layout come later? PRD §6 says desktop is first class. My estimate is about 3–4 h of work.
4. **Quote template must-haves from the brief that aren't built:** the "Your right to cancel" option (on by default for home clients), blank .docx / Google Docs / PDF downloads, and the terms block with defaults. Are any of these needed for 31/10? The FAQ currently tells decorators they *must* give written cancellation notice, but the template doesn't help them do it. I'd add the cancellation paragraph option (about 1 h) before launch.
