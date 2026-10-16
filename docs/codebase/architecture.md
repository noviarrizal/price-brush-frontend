# Architecture — price-brush-frontend

Last updated: 16/10/2026 · Owner: pricebrush-lead

## Module map

| Path | Purpose |
| --- | --- |
| `app/root.tsx` | Document shell (`<html lang="en-GB">`, `Meta`, `Links`, `Scripts`, `ScrollRestoration`), root `Outlet`, default `ErrorBoundary` (404 / error message, stack only in dev) |
| `app/routes.ts` | Route config: currently only `index("routes/home.tsx")` |
| `app/routes/home.tsx` | Placeholder home page: `meta` (title + description) and a "Coming soon" block |
| `app/app.css` | Tailwind entry: `@import "tailwindcss"`, `@theme` with a system font stack, light/dark background on `html, body` |
| `public/favicon.ico` | Template favicon (to be replaced) |
| `react-router.config.ts` | `ssr: false`, `prerender: ["/"]` |
| `vite.config.ts` | Plugins: Tailwind, React Router, `vite-tsconfig-paths` |

## Routes

| Path | Module | Rendering | Indexable |
| --- | --- | --- | --- |
| `/` | `routes/home.tsx` | Prerendered HTML | Yes (placeholder) |
| any other path | — | SPA fallback (`__spa-fallback.html`), then `ErrorBoundary` 404 | Not handled yet — see note |

Note: without a static `404.html` on Cloudflare Pages, unknown URLs would return the SPA fallback with HTTP 200 ("soft 404"). `docs/seo/technical-seo.md` specifies the fix; not implemented yet.

## Data flow

No backend calls, storage, auth or analytics yet. The backend contract will be documented in `price-brush-backend/docs/codebase/architecture.md` when endpoints exist.

## Design tokens

Not wired yet. The design system (`docs/design/design-system.md`, base CSS in `docs/design/tools/pb-base.css`) is not yet mapped into `app/app.css` `@theme`.
