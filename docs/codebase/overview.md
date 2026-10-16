# Codebase overview — price-brush-frontend

Last updated: 16/10/2026 · Owner: pricebrush-lead · Describes the code as it is now (plans live in `docs/plan/`).

## What this repo does

Web app (PWA planned) and public SEO pages for PriceBrush. **Current state: scaffold only** — one placeholder home page ("PriceBrush — coming soon"). No features from PRD F1–F13 are implemented yet.

## Stack (versions from `pnpm-lock.yaml`)

| Part | Version | Notes |
| --- | --- | --- |
| React / React DOM | 19.3.0 | |
| React Router (framework mode) | 8.4.0 | `ssr: false`, prerendering in `react-router.config.ts` |
| Vite | 7.3.7 | Pinned to v7 on purpose — see `decisions.md` |
| Tailwind CSS (+ `@tailwindcss/vite`) | 4.3.3 | Configured in `app/app.css` via `@import "tailwindcss"` and `@theme` |
| TypeScript | 5.9.3 | `strict: true`, path alias `~/*` → `app/*` (via `vite-tsconfig-paths`) |
| Package manager | pnpm | |

Runtime dependencies `@react-router/node` and `isbot` are kept because the default server entry uses them while prerendering at build time.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at http://localhost:5173 |
| `pnpm typecheck` | `react-router typegen && tsc` |
| `pnpm build` | Builds to `build/client`; prerenders `/` to `build/client/index.html` and writes `build/client/__spa-fallback.html` |
| `pnpm preview` | Serves `build/client` locally |

No test runner, linter or formatter is configured yet.

## Deploy

Target: Cloudflare Pages at `pricebrush.pages.dev`, static output `build/client`. Not set up yet (no Pages project, no `_headers`, `_redirects` or `404.html`).

## Environment variables

None yet.

## Other folders

- `docs/` — PRD (`PRD.md`), design (`design/`), SEO (`seo/`), strategy (`strategy/`), plans, reviews and these codebase docs. `docs/design/research/refs/` is git-ignored (third-party reference images).
- `.agents/skills/react-router/` — React Router agent skill shipped with the template (reference material for coding agents).
