# Architecture — price-brush-frontend

Last updated: 17/10/2026 · Owner: pricebrush-lead

## Module map

| Path | Purpose |
| --- | --- |
| `app/root.tsx` | Document shell (`<html lang="en-GB">`, `Meta`, `Links`, `Scripts`, `ScrollRestoration`), root `Outlet`, default `ErrorBoundary` (404 / error message, stack only in dev) |
| `app/routes.ts` | Route config: `/` (home) and `/paint-calculator` |
| `app/routes/home.tsx` | Placeholder home page: `meta` (title + description) and a "Coming soon" block |
| `app/routes/paint-calculator.tsx` | `/paint-calculator`: SEO meta + JSON-LD, one room, settings, live result, "How we work it out" with an engine-calculated worked example |
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
| `/decorating-quote-template` | `routes/decorating-quote-template.tsx` | Prerendered HTML, hydrates; draft and today's date are read after hydration | Yes; canonical `https://pricebrush.pages.dev/decorating-quote-template` |
| `/paint-calculator` | `routes/paint-calculator.tsx` | Prerendered HTML (`paint-calculator/index.html`), hydrates | Yes; canonical `https://pricebrush.pages.dev/paint-calculator` |
| any other path | — | SPA fallback (`__spa-fallback.html`), then `ErrorBoundary` 404 | Not handled yet — see note |

Note: without a static `404.html` on Cloudflare Pages, unknown URLs would return the SPA fallback with HTTP 200 ("soft 404"). `docs/seo/technical-seo.md` specifies the fix; not implemented yet.

## Data flow

No backend calls, auth or analytics yet. The calculator keeps everything in React state (nothing stored). The quote template autosaves its draft to `localStorage` only and builds the PDF in the browser. "Turn this into a quote" writes a one-time hand-over to `localStorage` and navigates client-side; the template reads and deletes it after hydration (spec §10); events (`calc_used` etc.) wait for the counter Worker.

**Trailing slash:** `vite preview` returns the home page's HTML for `/paint-calculator` and the right page for `/paint-calculator/`. Cloudflare Pages' behaviour must be checked on the first deploy (`docs/seo/technical-seo.md` §2.1); the canonical may need the slash. The backend contract will be documented in `price-brush-backend/docs/codebase/architecture.md` when endpoints exist.

## Design tokens

Wired 17/10/2026: `app/app.css` holds the tokens from `design-system.md` §8 (colours flip via CSS variables, no `dark:` variants needed). Archivo is not self-hosted yet, so headings use the fallback stack.
