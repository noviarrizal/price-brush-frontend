# Stack notes — price-brush-frontend

Last checked: 16/10/2026 (`pnpm outdated`, `pnpm audit`) · Owner: pricebrush-lead · Starter version — the lead adds recommended patterns with doc links as features land.

`pnpm audit`: **no known vulnerabilities** (16/10/2026).

| Library | In use | Latest | Notes |
| --- | --- | --- | --- |
| react / react-dom | 19.3.0 | 19.3.1 | Patch release available; safe to take at the next dependency update |
| react-router / @react-router/dev / @react-router/node | 8.4.0 | 8.4.0 | Framework mode, `ssr: false` + `prerender`. Docs: https://reactrouter.com (use the v8 docs). Bundled skill: `.agents/skills/react-router/` |
| tailwindcss / @tailwindcss/vite | 4.3.3 | — (current) | v4 CSS-first config: tokens in `@theme` inside `app/app.css`. Docs: https://tailwindcss.com/docs |
| vite | 7.3.7 | 8.3.4 | **Deliberately pinned to v7**: Vite 8 (Rolldown) fails React Router builds on Windows ("os error 123"). See `decisions.md`. Re-test when React Router or Vite ship a fix |
| vite-tsconfig-paths | 5.1.4 | 6.1.1 | Needed only because of the Vite 7 pin; check v6 compatibility with Vite 7 before upgrading; remove when moving to Vite 8 (`resolve.tsconfigPaths`) |
| typescript | 5.9.3 | 7.0.2 | TS 7 is a new major (native compiler). `@react-router/dev` 8.4 lists `^5.1 \|\| ^6 \|\| ^7` as peer range. Don't upgrade mid-milestone; evaluate after the MVP |
| @types/node | 22.20.5 | 26.6.5 | Keep aligned with the Node version we run (Node 22 locally) |
| Node.js | 22.23.2 (local) | — | Cloudflare Pages build image version to be pinned when deploy is set up |
| pnpm | 12.9.1 (local) | — | Build scripts of some deps (e.g. esbuild) are ignored by default in pnpm 12; builds work as-is |
