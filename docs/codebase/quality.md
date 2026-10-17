# Code quality standards — price-brush-frontend

Last updated: 17/10/2026 · Owner: pricebrush-lead

## Definition of Done (every task)

- [ ] Acceptance criteria from `docs/PRD.md` / the spec / the plan are met and ticked in the handoff.
- [ ] `pnpm install --frozen-lockfile` exits 0 (it does since `4fa1f5e`; a new dependency with a build script needs an `allowBuilds` entry in `pnpm-workspace.yaml`, see `stack-notes.md`). `pnpm typecheck`, `pnpm test` and `pnpm build` pass with no new warnings. New public pages appear in the prerender output.
- [ ] Non-trivial logic (paint maths, prices, VAT, money parsing, limits, storage formats) has Vitest tests next to the file.
- [ ] Visual check at 360 px and 1440 px, light **and dark**, against the design PNGs and `screens.md` copy.
- [ ] Accessibility: labels, visible focus, keyboard path, contrast AA in **both themes** (including fixed "paper" surfaces such as example tables and A4 previews, which must use the fixed `paper-*` tokens, never theme tokens), tap targets ≥ 48 px.
- [ ] SEO for public pages matches `docs/seo/keyword-map.md` and `technical-seo.md`. Page copy never claims a feature the UI doesn't have yet.
- [ ] No secrets, no client personal data in URLs, analytics, logs or hand-overs.
- [ ] Handoff lists route/component/env/convention changes so `docs/codebase/` can be updated.

## Quality bar

- Small components and functions with clear names; no dead code, commented-out code, unexplained TODOs or utility classes that have no effect.
- Calculations live in plain, pure TypeScript functions (easy to test), not inside JSX. Numbers shown as examples on a page (worked examples, tips) are calculated by the same engine, never typed by hand.
- **Money input**: UK users write thousands with a comma ("1,290"). Money fields must parse that correctly or reject it with a message; they must never read it as a decimal. Metre fields accept a decimal comma ("3,5"). Each has its own parser and tests.
- Errors are shown to the user in plain UK English with a way forward; nothing fails silently that could change a price.
- Data that belongs to one job (client name, address, date) must never carry over into another job without the user choosing it.
- Performance: Lighthouse ≥ 90 mobile for SEO pages; heavy libraries lazy-loaded on the action that needs them. First-load JS (gzip, `modulepreload` list) is measured in every review. On 17/10/2026: calculator 121.4 KiB, quote template 126.3 KiB; framework floor about 106 KiB. The written budget is ≤ 120 KB (`technical-seo.md` §6); a re-baseline is proposed in the 17/10/2026 review.
- Don't weaken checks (`@ts-ignore`, disabled rules, removed prerender routes) without a written reason.

## Tooling

| Tool | Purpose | Status |
| --- | --- | --- |
| TypeScript strict + `react-router typegen` | Types | Configured |
| Vitest | Unit tests for calculations and utilities | Configured (17/10/2026): `pnpm test`, `vitest.config.ts` |
| ESLint (or Biome) + Prettier | Lint and formatting; e.g. would catch the dead `rel="noopener"` and the unused focus classes | Recommended — not configured |
| Playwright | Smoke test of the calculator → quote → PDF flow in light/dark at 360/1440 (the lead used a throwaway CDP script for the 17/10 review) | Recommended before 31/10 — not configured |
| Lighthouse (local, `pnpm dlx lighthouse@12` against `pnpm preview`) | Performance/SEO/a11y scores | Run during reviews. Note: the machine's dark-mode setting decides which theme Lighthouse checks; run both |
