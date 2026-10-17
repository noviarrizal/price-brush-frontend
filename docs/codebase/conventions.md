# Conventions — price-brush-frontend

Last updated: 17/10/2026 · Owner: pricebrush-lead

Conventions in use or agreed so far. Extend this file as real code establishes patterns.

- **Language & copy:** UK English, £, DD/MM/YYYY; `<html lang="en-GB">`. Copy comes from `docs/design/screens.md` and SEO titles/H1s from `docs/seo/keyword-map.md` — never invented in code.
- **Routing:** one route module per page in `app/routes/`, registered in `app/routes.ts`. Route modules export `meta` (and `links` if needed) using generated types from `./+types/<route>`. Public SEO pages must be added to `prerender` in `react-router.config.ts`; app routes stay client-rendered and noindex.
- **Styling:** Tailwind v4 utility classes; design tokens go into `@theme` in `app/app.css` (not hard-coded hex values). Mobile-first; desktop layouts from 1024 px (PRD §6).
- **TypeScript:** strict mode; `verbatimModuleSyntax` is on, so type-only imports use `import type`. Path alias `~/` for `app/`.
- **Files:** UTF-8 everywhere. Pure logic in `app/lib/<area>/` with `*.test.ts` next to it; shared UI in `app/components/`, page-specific UI in `app/components/<page>/`; SEO meta via `seo()` in `app/seo/meta.ts`.
- **Names:** full descriptive names (`litresNeeded`, `roomFields`), no single letters or abbreviations, even in callbacks.
- **Money and maths:** money is whole pence (`number`); every shown value is rounded before the next step uses it (spec §4); decimal inputs are text fields with `inputMode="decimal"` and accept a comma.
- **Dependencies:** pnpm only; justify each new dependency (bundle size budget for Lighthouse ≥ 90 mobile); lazy-load heavy libraries (e.g. PDF).
- **Git:** feature work on `feat/<slug>` branches; reviews in `docs/reviews/`; commits only when the founder asks.
- **Tests:** Vitest (`pnpm test`).
- **Not yet decided:** linter/formatter, state management beyond React state, i18n (none planned).
