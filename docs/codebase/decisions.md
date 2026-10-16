# Technical decisions (ADR log) — price-brush-frontend

Last updated: 16/10/2026 · Owner: pricebrush-lead

| Date | Decision | Why | Alternatives considered |
| --- | --- | --- | --- |
| 15/10/2026 | React Router framework mode with `ssr: false` + `prerender` | SEO pages need real HTML for Google; the app part can be a SPA; deploys as static files to Cloudflare Pages for £0 | Plain Vite SPA (weak SEO), Astro (second framework), SSR on Workers (more moving parts) |
| 15/10/2026 | Vite pinned to v7 (7.3.7) | Vite 8 (Rolldown) fails to build React Router route modules on Windows: `UNLOADABLE_DEPENDENCY ... home.tsx?__react-router-build-client-route ... (os error 123)`, reproduced with the untouched template. Revisit when fixed upstream | Building in WSL/Linux only, waiting for a fix |
| 15/10/2026 | `vite-tsconfig-paths` plugin for the `~/*` alias | `resolve.tsconfigPaths` is a Vite 8 option, not available in Vite 7 | Manual `resolve.alias` |
| 15/10/2026 | Tailwind CSS v4, pnpm | Founder's choice; fast mobile-first styling | CSS Modules; npm/bun |
| 15/10/2026 | System font stack (Google Fonts link removed from template) | Fewer requests, better LCP | Inter via Google Fonts |
| 15/10/2026 | Backend MVP on Cloudflare Workers (separate repo), Go from Q1 2027 | £0, fastest path to first payment | Go from day one |
