# Architecture — price-brush-frontend

Last updated: 17/10/2026 (after review) · Owner: pricebrush-lead

## Module map

| Path | Purpose |
| --- | --- |
| `app/root.tsx` | Document shell (`<html lang="en-GB">`, `Meta`, `Links`, `Scripts`, `ScrollRestoration`), root `Outlet`, default `ErrorBoundary` (404 / error message, stack only in dev) |
| `app/routes.ts` | Route config: `/` (home), `/paint-calculator`, `/decorating-quote-template` |
| `app/routes/home.tsx` | Placeholder home page: `meta` (title + description) and a "Coming soon" block. Its copy ("60 seconds") is outdated and banned by `keyword-map.md`; to be replaced before deploy |
| `app/routes/paint-calculator.tsx` | `/paint-calculator`: SEO meta + JSON-LD, **one room, walls only** (the engine supports the ceiling and the mist coat, but there are no switches in the UI yet: `includeCeiling` defaults to `false` in `app/lib/paint/form.ts`), settings, live result, "Turn this into a quote", and "How to work out how much paint you need" with an engine-calculated worked example |
| `app/routes/decorating-quote-template.tsx` | `/decorating-quote-template`: business, client, details, lines (quick add), supply-and-apply / labour only, VAT, notes; autosave; pinned "Download PDF"; prerendered guide below |
| `app/lib/quote/` | `quote.ts` (draft → checked document + totals, VAT 20 %, file name), `dates.ts` (ISO ↔ DD/MM/YYYY, UTC maths), `storage.ts` (autosave in `localStorage`, key `pricebrush.quoteTemplate`) |
| `app/components/quote-template/` | `LineItems`, `QuoteTemplateGuide` (example from the paint engine, checklist, steps, quote vs estimate, FAQ), `quote-pdf.tsx` (A4 PDF, lazy-loaded) |
| `app/components/buttons.tsx` | `PrimaryButton` (yellow, disabled state explains why), `SecondaryButton`, `GhostButton` |
| `app/lib/numbers.ts` | `parseDecimal`, `parsePoundsToPence`, `formatPence` (shared) |
| `app/lib/paint/` | Paint & labour engine (pure TS): `types`, `defaults`, `rounding`, `tins`, `calculate`, `format`, `form` (typed text → engine input, settings validation), `handover` (calculator → quote template via `localStorage` key `pricebrush.calculatorHandover`, read once, 24 h max). Tests next to each file |
| `app/components/form-fields.tsx` | `MeasureField` (decimal input with unit), `TextField`, `Stepper`, `ChoiceGroup`, `Card` |
| `app/components/site-header.tsx` | Public-page header with the logo tile |
| `app/components/paint-calculator/` | `RoomCard`, `SettingsCard`, `ResultCard`, `QuoteCtaCard` ("Turn this into a quote") |
| `app/seo/meta.ts` | `seo()` helper: title, description, canonical, OG, optional JSON-LD (`docs/seo/technical-seo.md` §2) |
| `app/app.css` | Tailwind entry + Coachline tokens from `docs/design/design-system.md` §8 (light, `.dark`, and `prefers-color-scheme` unless `.light`) |
| `public/favicon.ico` | Template favicon (to be replaced) |
| `react-router.config.ts` | `ssr: false`, `prerender: ["/", "/paint-calculator", "/decorating-quote-template"]` |
| `vite.config.ts` | Plugins: Tailwind, React Router, `vite-tsconfig-paths` |

## Routes

| Path | Module | Rendering | Indexable |
| --- | --- | --- | --- |
| `/` | `routes/home.tsx` | Prerendered HTML | Yes (placeholder) |
| `/decorating-quote-template` | `routes/decorating-quote-template.tsx` | Prerendered HTML (`decorating-quote-template/index.html`), hydrates; draft and today's date are read after hydration | Yes; canonical `https://pricebrush.pages.dev/decorating-quote-template`; JSON-LD `WebApplication` + `BreadcrumbList`; breadcrumb UI |
| `/paint-calculator` | `routes/paint-calculator.tsx` | Prerendered HTML (`paint-calculator/index.html`), hydrates | Yes; canonical `https://pricebrush.pages.dev/paint-calculator`; JSON-LD `WebApplication` + `BreadcrumbList`; no breadcrumb UI yet |
| any other path | — | SPA fallback (`__spa-fallback.html`), then `ErrorBoundary` 404 | Not handled yet — see note |

Note: without a static `404.html` on Cloudflare Pages, unknown URLs would return the SPA fallback with HTTP 200 ("soft 404"). `docs/seo/technical-seo.md` specifies the fix; not implemented yet.

## Data flow

No backend calls, auth or analytics yet. The calculator keeps everything in React state (nothing stored). The quote template autosaves its draft to `localStorage` only and builds the PDF in the browser. "Turn this into a quote" writes a one-time hand-over to `localStorage` and navigates client-side; the template reads and deletes it after hydration (spec §10); events (`calc_used` etc.) wait for the counter Worker.

Checked 17/10/2026 in headless Chrome: downloading a PDF makes only two requests, the local `quote-pdf` chunk and a `data:` wasm (react-pdf's layout engine). No form data goes over the network.

### Browser storage

| Key | Written by | Read by | Contents | Lifetime |
| --- | --- | --- | --- | --- |
| `pricebrush.calculatorHandover` | `writeHandover` (`app/lib/paint/handover.ts`), on "Turn this into a quote" | `takeHandover`, on the template's first effect after hydration | `CalculatorHandover` v1: settings, rooms that made it onto the quote, lines (title, detail, pence), totals. No client details | Removed on the first read. Ignored if older than 24 h, from the future, the wrong version or broken JSON |
| `pricebrush.quoteTemplate` | `saveQuoteDraft` (`app/lib/quote/storage.ts`), 400 ms after each change | `loadQuoteDraft`, after hydration | `QuoteDraft` v1: business, client (name, job address), quote number/date, valid-for, lines as typed, materials basis, VAT, notes | Until "Clear form" (which has Undo) or the browser clears it |

Handover on top of an existing draft (as built, `app/routes/decorating-quote-template.tsx:101-111`): **only `lines` are replaced**. Business, client, quote number, quote date, settings and notes are kept, and Undo restores the earlier draft. The review of 17/10/2026 (M2) asks for the client, date and notes to be reset; update this paragraph when that lands.

### Bundles (from `pnpm build`, 17/10/2026)

First-load JS, gzip, from each page's `modulepreload` list: `/paint-calculator` 121.4 KiB, `/decorating-quote-template` 126.3 KiB. About 106 KiB of that is the framework (`entry.client`, `jsx-runtime`, `errorBoundaries`). The `quote-pdf` chunk (1,239 kB, 455 kB gzip) loads only when "Download PDF" is pressed, through a dynamic `import()`. CSS is 6.6 KiB gzip.

**Trailing slash:** `vite preview` returns the home page's HTML for `/paint-calculator` and the right page for `/paint-calculator/`. In a local Pages emulation (`wrangler pages dev`, 17/10/2026, see `stack-notes.md`), `/paint-calculator` returned **308 → `/paint-calculator/`**. Today's canonicals in `app/seo/meta.ts` have no slash, so they point at a redirect. The fix is task T7 in `docs/plan/2026-10-17-launch-31-oct.md`; confirm with `curl -I` on the first real deploy (`docs/seo/technical-seo.md` §2.1). The backend contract will be documented in `price-brush-backend/docs/codebase/architecture.md` when endpoints exist.

## Design tokens

Wired 17/10/2026: `app/app.css` holds the tokens from `design-system.md` §8 (colours flip via CSS variables, no `dark:` variants needed). Archivo is not self-hosted yet, so headings use the fallback stack.
