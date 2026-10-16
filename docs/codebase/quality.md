# Code quality standards — price-brush-frontend

Last updated: 16/10/2026 · Owner: pricebrush-lead · Starter version; the lead refines it as code lands.

## Definition of Done (every task)

- [ ] Acceptance criteria from `docs/PRD.md` / the plan are met and ticked in the handoff.
- [ ] `pnpm typecheck` and `pnpm build` pass with no new warnings; new public pages appear in the prerender output.
- [ ] Tests pass (once a test runner exists); non-trivial logic (paint maths, prices, VAT, limits) has tests.
- [ ] Visual check at 360 px and 1440 px, light and dark, against the design PNGs.
- [ ] Accessibility: labels, visible focus, keyboard path, contrast AA, tap targets ≥ 48 px.
- [ ] SEO for public pages matches `docs/seo/keyword-map.md` and `technical-seo.md`.
- [ ] No secrets, no client personal data in URLs, analytics or logs.
- [ ] Handoff lists route/component/env/convention changes so `docs/codebase/` can be updated.

## Quality bar

- Small components and functions with clear names; no dead code, commented-out code or unexplained TODOs.
- Calculations live in plain, pure TypeScript functions (easy to test), not inside JSX.
- Errors are shown to the user in plain UK English with a way forward; nothing fails silently.
- Performance: Lighthouse ≥ 90 on mobile for SEO pages; heavy libraries lazy-loaded on the action that needs them.
- Don't weaken checks (`@ts-ignore`, disabled rules, removed prerender routes) without a written reason.

## Tooling

| Tool | Purpose | Status |
| --- | --- | --- |
| TypeScript strict + `react-router typegen` | Types | Configured |
| Vitest | Unit tests for calculations and utilities | Recommended — not configured |
| ESLint (or Biome) + Prettier | Lint and formatting | Recommended — not configured |
| Playwright | Smoke test of key pages/flows | Recommended later — not configured |
| Lighthouse (local, `pnpm dlx lighthouse`) | Performance/SEO/a11y scores | Run during reviews |
