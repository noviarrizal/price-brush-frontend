# Codebase changelog — price-brush-frontend

| Date | Branch | Change |
| --- | --- | --- |
| 15/10/2026 | main (uncommitted) | Scaffold from `create-react-router` (v8.4): SSR off + prerender `/`, Docker/server files removed, Vite pinned to 7.3.7 with `vite-tsconfig-paths`, Google Fonts removed, `lang="en-GB"`, placeholder home page |
| 16/10/2026 | main (uncommitted) | Initial `docs/codebase/` written from the current code |
| 17/10/2026 | feat/paint-calculator (uncommitted) | Paint & labour engine `app/lib/paint/` per `docs/specs/paint-calculator.md` + 48 Vitest tests; `/paint-calculator` cut-order step 1 (one room, prerendered, SEO meta + JSON-LD); Coachline tokens in `app/app.css`; `seo()` helper; Vitest added |
| 17/10/2026 | feat/paint-calculator (uncommitted) | `/decorating-quote-template` cut-order step 2: quote form, quick-add lines, VAT, supply-and-apply/labour-only, autosave + Clear (Undo), browser PDF via lazy-loaded `@react-pdf/renderer`, prerendered guide (~1,240 words) + JSON-LD; shared `app/lib/numbers.ts`; 65 tests |
| 17/10/2026 | feat/paint-calculator (uncommitted) | Cut-order step 3: "Turn this into a quote" on `/paint-calculator` → pre-filled `/decorating-quote-template` (banner, earlier lines replaced with Undo, StrictMode-safe one-time read); `app/lib/paint/handover.ts`; 69 tests |
