# Stack notes — price-brush-frontend

Last checked: 17/10/2026 (`pnpm outdated`, `pnpm audit`, lockfile) · Owner: pricebrush-lead

`pnpm audit`: **no known vulnerabilities** (17/10/2026).

| Library | In use | Latest | Notes |
| --- | --- | --- | --- |
| react / react-dom | 19.3.0 | 19.3.1 | Patch release available; safe to take at the next dependency update |
| react-router / @react-router/dev / @react-router/node | 8.4.0 | 8.4.0 | Framework mode, `ssr: false` + `prerender`. Docs: https://reactrouter.com (v8.4 docs). Bundled skill: `.agents/skills/react-router/` |
| tailwindcss / @tailwindcss/vite | 4.3.3 | — (current) | v4 CSS-first config: tokens in `@theme` inside `app/app.css`. Docs: https://tailwindcss.com/docs |
| vite | 7.3.7 | 8.3.4 | **Deliberately pinned to v7**: Vite 8 (Rolldown) fails React Router builds on Windows ("os error 123"). See `decisions.md`. Re-test when React Router or Vite ship a fix |
| vite-tsconfig-paths | 5.1.4 | 6.1.1 | Needed only because of the Vite 7 pin; check v6 compatibility with Vite 7 before upgrading; remove when moving to Vite 8 (`resolve.tsconfigPaths`) |
| @react-pdf/renderer | 4.9.0 | 4.9.0 (per `pnpm outdated`) | Client chunk 1,239 kB / 455 kB gzip, loaded through dynamic `import()` only. Built-in Helvetica covers £ — · ² × (see `app/components/quote-template/quote-pdf.tsx` comment). Docs: https://react-pdf.org |
| vitest | 5.0.5 | 5.0.5 | Own `vitest.config.ts` (no React Router plugin). Docs: https://vitest.dev |
| typescript | 5.9.3 | 7.0.2 | TS 7 is a new major (native compiler). `@react-router/dev` 8.4 lists `^5.1 \|\| ^6 \|\| ^7` as peer range. Don't upgrade mid-milestone; evaluate after the MVP |
| @types/node | 22.20.5 | 26.6.5 | Keep aligned with the Node version we run (Node 22 locally) |
| Node.js | 22.23.2 (local, `.nvmrc`) | — | The Cloudflare Pages build image v3 defaults to 22.16.0. Pinned with `.nvmrc` (in the repo since `4fa1f5e`). Also set `NODE_VERSION` in the Pages project (plan F1) (see "Cloudflare Pages" below) |
| pnpm | 12.9.1 (local) | — | The Pages build image v3 defaults to **10.11.1**. Pin it with `PNPM_VERSION`. `pnpm-workspace.yaml` (`allowBuilds`) is in the repo since `4fa1f5e`. See "pnpm build scripts" below |
| wrangler (not a dependency) | — | 4.151.1 (17/10/2026) | Used only through `pnpm dlx wrangler pages dev build/client` to emulate Pages locally in reviews |

## pnpm build scripts (checked 17/10/2026; fixed in the repo)

**In the repo since commit `4fa1f5e`** (plan T1, done): `pnpm-workspace.yaml` contains `allowBuilds: { esbuild: false }`, and `.nvmrc` pins Node `22.23.2`. **Checked 17/10/2026 (late)** on a clean clone of `main` at `69c92a7` (`%TEMP%\pricebrush-t1-check`): `pnpm install --frozen-lockfile` **exits 0** on pnpm 12.9.1, and `typecheck`, `test` (69/69) and `build` pass.

Background: without that file the install exited 1 (`ERR_PNPM_IGNORED_BUILDS: Ignored build scripts: esbuild@0.28.2`), because `strictDepBuilds` defaults to `true`: "an install exits with a non-zero code if any dependency has unreviewed build scripts". `allowBuilds` was added in pnpm v10.26.0. `onlyBuiltDependencies` was removed in v11. `esbuild: false` is safe: its postinstall only checks the binary, which comes from the `@esbuild/*` optional dependency. Source: https://pnpm.io/settings/build. If a new dependency with a build script is added, the install fails again until it gets an `allowBuilds` entry. That's intended: review it, then add `true` or `false`.

## Line endings (checked 17/10/2026)

This machine has `core.autocrlf=true` (system config `C:/Program Files/Git/etc/gitconfig`). The repo has **no `.gitattributes`**, so text files are LF in the index and CRLF in the Windows working tree, while Cloudflare Pages builds on Linux with LF. That doesn't matter for code. It **does** matter for text that is shown exactly as stored, such as the CCR Schedule 3 files for T18. The T18 spec (`docs/specs/cancellation-option.md` §4.1) adds `.gitattributes` with `eol=lf` for them. Docs: https://git-scm.com/docs/gitattributes

## Vite `?raw` imports (checked 17/10/2026, Vite 7.3.7)

"Assets can be imported as strings using the `?raw` suffix" (https://v7.vite.dev/guide/assets). The TypeScript types come from `vite/client`, already in `tsconfig.json` `types`. In a temp-clone spike, a `?raw` import works in Vitest 5 with our `vitest.config.ts`, and the string matches the file's bytes. Not used in the app yet; planned for T18.

## @react-pdf/renderer hyphenation (checked 17/10/2026, v4 docs)

react-pdf hyphenates English words by default (`hyphenationPenalty` 600 for non-justified text). `Font.registerHyphenationCallback((word) => [word])` disables it (https://react-pdf.org/fonts). `quote-pdf.tsx` doesn't set it today. T18 requires it, so legal text is never split with inserted hyphens.

## Cloudflare Pages (checked 17/10/2026; no Pages project exists yet)

- **Pages vs Workers:** the Pages docs now say "Start new projects with Workers." Pages is not marked deprecated. We stay on Pages for launch (`decisions.md`). https://developers.cloudflare.com/pages/
- **Build image v3:** Node 22.16.0 and pnpm 10.11.1 by default. Override with the `NODE_VERSION` (or `.nvmrc`) and `PNPM_VERSION` environment variables. v1 projects were moved to v3 on 15/09/2026. https://developers.cloudflare.com/pages/configuration/build-image/
- **Free plan:** 500 builds a month, 1 concurrent build, 20 min timeout, 20,000 files, 25 MiB per file, 100 `_headers` rules, 2,000 static + 100 dynamic redirects. https://developers.cloudflare.com/pages/platform/limits/
- **Serving:** a top-level `404.html` turns off SPA mode (unknown paths get a 404). Without it, Pages serves `/` for every unknown path. `*.html` URLs redirect to the extension-less URL. https://developers.cloudflare.com/pages/configuration/serving-pages/
- **Seen in local emulation** (`wrangler pages dev` 4.151.1 on our build output; re-check on the first real deploy):
  - `/paint-calculator` → **308 → `/paint-calculator/`**, so the canonical form has the trailing slash.
  - A `_redirects` rewrite to `/__spa-fallback.html 200` becomes a **308 to `/__spa-fallback`**. Write the target as `/__spa-fallback 200`, which gives a 200 and keeps the URL. React Router's docs show the `.html` form (https://reactrouter.com/how-to/pre-rendering), which doesn't work on Pages.
  - `_headers` rules match the requested path on rewritten responses.
  - `/does-not-exist` → 404 with `404.html`.
- **`_redirects`:** 200 proxying only to relative URLs on the site, and redirects run before headers. https://developers.cloudflare.com/pages/configuration/redirects/ · **`_headers`:** `https://:version.:project.pages.dev/*` host placeholders. https://developers.cloudflare.com/pages/configuration/headers/

## React Router resource routes in `prerender` (checked 17/10/2026, 8.4.0)

The v8.4 pre-rendering page doesn't document resource routes, but they work. In the spike, a `routes/sitemap[.]xml.ts` loader returning a `Response`, added to `prerender`, built `build/client/sitemap.xml` ("Prerender (resource)") and was served as `application/xml`. Side effects: an extra `sitemap.xml.data` file and the build warning "Generated an empty chunk: sitemap_._xml".

## Patterns we follow (with sources)

- **Route `meta` replaces the parent's**: "the entire meta descriptor array is replaced, not merged". So every public route returns the full set from `seo()` (`app/seo/meta.ts`). Source: https://reactrouter.com/start/framework/route-module (v8.4.0 docs).
- **JSON-LD via `{ "script:ld+json": {...} }` in `meta`**: the route-module page doesn't document this (it points to the `MetaDescriptor` type: https://api.reactrouter.com/v8/types/react-router.MetaDescriptor.html). We verified it in our build output: the prerendered HTML has `<script type="application/ld+json">` for both tool pages.
- **Browser-only state after hydration**: drafts, handover and today's date are read in an effect, so the prerendered HTML never bakes in the build date (`app/routes/decorating-quote-template.tsx:93-114`).
- **Heavy libraries on demand**: `await import("~/components/quote-template/quote-pdf")` inside the click handler. Confirmed: the chunk is not in any page's `modulepreload` list.
