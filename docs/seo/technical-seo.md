# PriceBrush — Technical SEO spec (v0.2)

Date: 15/10/2026 · Updated 16/10/2026 · For: developer · Stack checked in repo: React Router **8.4.0** framework mode, `ssr: false`, `prerender: ["/"]` (`react-router.config.ts`), `<html lang="en-GB">` already set in `app/root.tsx`, build currently emits `build/client/index.html` + `__spa-fallback.html`. Hosting: Cloudflare Pages, `pricebrush.pages.dev`.

SEO writes specs only; nothing outside `docs/seo/` was changed. Items marked **verify** are behaviours to confirm on the first deploy with `curl -I`.

## 1. URL and route plan

| Group | Paths | Rendering | Indexing |
|---|---|---|---|
| Public SEO pages | `/` · `/paint-calculator` · `/decorating-quote-template` · `/decorating-invoice-template` · `/pricing` · `/about` · `/privacy` · `/terms` · `/guides` · `/guides/<slug>` · later `/paint-calculator/<room>` | **Prerendered** to static HTML at build | index, follow; in sitemap |
| App (logged in) | `/login` · `/app/*` (quotes, new, review, invoice, settings) | SPA via `__spa-fallback.html` | `noindex` (header + meta); not in sitemap |
| Client quote/invoice links | `/q/<token>` (long random token, PRD) | SPA | `noindex, nofollow` (header + meta) — these hold client names and addresses |
| Errors | anything else | static `404.html` | real HTTP 404 |

Rules: lowercase, hyphens, no file extensions, no query strings in canonical URLs, UK spelling. Put **all** app screens under `/app/` so one header rule covers them.

### Single source of truth

Create one list (e.g. `app/seo/public-routes.ts`) with `{ path, title, description, ogImage, lastmod, changefreq? }` for every public page. Use it for: the `prerender` list, each route's `meta`, and `sitemap.xml` generation. Copy titles/descriptions from `keyword-map.md` exactly.

```ts
// react-router.config.ts (sketch)
import type { Config } from "@react-router/dev/config";
import { publicRoutes } from "./app/seo/public-routes";

export default {
  ssr: false,
  async prerender() {
    return publicRoutes.map((r) => r.path);
  },
} satisfies Config;
```

## 2. Per-route meta (title, description, canonical, Open Graph)

React Router: a route's `meta` export **replaces** parent meta (it doesn't merge), so each public route must return the full set. Use one helper:

```ts
// app/seo/meta.ts (sketch)
const SITE = "https://pricebrush.pages.dev"; // change once at domain move
export function seo({ path, title, description, ogImage = "/og/default.png", noindex = false }: {
  path: string; title: string; description: string; ogImage?: string; noindex?: boolean;
}) {
  const url = SITE + path; // must equal the URL that returns 200 (see §2.1)
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "PriceBrush" },
    { property: "og:locale", content: "en_GB" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: SITE + ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];
}
// in a route: export const meta: Route.MetaFunction = () => seo({ path: "/paint-calculator", ...routeCopy });
```

- JSON-LD can go in the same array: `{ "script:ld+json": {...} }` (supported by RR 8's `MetaDescriptor`).
- OG images: one 1200 × 630 PNG per P0 page (tool screenshot + H1), < 200 KB, stored in `public/og/`. WhatsApp shows these when decorators share links — worth the 30 minutes.
- `<meta name="theme-color">` and the PWA manifest don't affect ranking; fine to add.
- No `hreflang` (one language, one country). `lang="en-GB"` is already correct.

### 2.1 Trailing slash — **verify**

The prerender writes `build/client/paint-calculator/index.html`. Cloudflare Pages serves directory indexes and may **redirect `/paint-calculator` → `/paint-calculator/`** (or the reverse, depending on the files present). On the first deploy run `curl -I https://pricebrush.pages.dev/paint-calculator` and `…/paint-calculator/`. Whichever returns **200** is the canonical form; use it for canonicals, sitemap and every internal link. Never let internal links hit a redirect.

## 3. Cloudflare Pages files (`public/` → copied to build root)

### 3.1 `public/_redirects` — SPA routes and 404s

Cloudflare Pages treats a project **without a top-level `404.html` as a single-page app** and returns `index.html` with HTTP 200 for every unknown URL → soft 404s, duplicate home pages in Google. So:

1. Add a static `public/404.html` (brand header, "Page not found", links to the 3 free tools and home; `<meta name="robots" content="noindex">`). Pages then returns it with **HTTP 404** for unknown paths.
2. Route app paths to the SPA fallback explicitly:

```
/login     /__spa-fallback.html  200
/app/*     /__spa-fallback.html  200
/q/*       /__spa-fallback.html  200
```

3. Old-URL redirects go here too, e.g. if design's `/free-quote-template` was ever shared: `/free-quote-template  /decorating-quote-template  301`.

**Verify:** `curl -I …/does-not-exist` → 404; `curl -I …/app/quotes` → 200 with SPA HTML.

### 3.2 `public/_headers` — keep private pages out of the index

```
/app/*
  X-Robots-Tag: noindex, nofollow
/login
  X-Robots-Tag: noindex, nofollow
/q/*
  X-Robots-Tag: noindex, nofollow
  Referrer-Policy: no-referrer
/__spa-fallback.html
  X-Robots-Tag: noindex
https://:version.pricebrush.pages.dev/*
  X-Robots-Tag: noindex
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

- The `:version` rule stops **preview/branch deployments** (e.g. `abc123.pricebrush.pages.dev`) being indexed as duplicates. **Verify** it doesn't match the production host.
- Also render `<meta name="robots" content="noindex, nofollow">` in the `/app`, `/login` and `/q` route components (belt and braces; the SPA fallback is shared).
- **Don't** `Disallow` these paths in robots.txt — Google must be able to fetch them to see `noindex`.

### 3.3 `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://pricebrush.pages.dev/sitemap.xml
```

AI crawlers are allowed (being cited in AI answers for "how much paint do I need" is free exposure). Founder can revisit.

### 3.4 `sitemap.xml`

- Generate at build from `public-routes.ts` into `build/client/sitemap.xml` (small Node script run after `react-router build`, or a prerendered resource route `/sitemap.xml` — either is fine).
- Only canonical, indexable, 200 URLs. `<lastmod>` = the page's real content date from the route list, **not** the build time (fake freshness is ignored and wastes trust).
- Submit in Search Console (see `measurement.md`).

## 4. Rendering and content rules for prerendered pages

- All indexable text (H1, intro, method, tables, FAQs, examples) must be in the **prerendered HTML**. Check with "View source", not DevTools. Calculators/generators can hydrate on top.
- FAQ answers: render open or in `<details>` (text in HTML) — never fetched on click.
- One `<h1>` per page; H2 for sections as in the briefs.
- Breadcrumb UI on tool and guide pages (Home › Page) matching the JSON-LD.
- Footer on every public page: links to the 3 tools, Guides, Pricing, About, Privacy, Terms (sitewide internal links; that's what gets 10+ pages discovered fast).
- Internal links are plain `<a href>` (React Router `<Link>` renders this) — no `onClick`-only navigation.

## 5. Structured data (JSON-LD)

Google status (be realistic): **FAQ rich results are limited to well-known government and health sites (since Aug 2023)**; **HowTo rich results were removed (2023)**; `SoftwareApplication` rich results need **real** `aggregateRating` or `review` — we have none and must not invent them. So structured data here helps understanding and breadcrumbs, not stars.

**Home** (`/`):

```json
[
  {"@context":"https://schema.org","@type":"Organization","name":"PriceBrush","url":"https://pricebrush.pages.dev/","logo":"https://pricebrush.pages.dev/icons/logo-512.png"},
  {"@context":"https://schema.org","@type":"WebSite","name":"PriceBrush","url":"https://pricebrush.pages.dev/","inLanguage":"en-GB"},
  {"@context":"https://schema.org","@type":"SoftwareApplication","name":"PriceBrush","applicationCategory":"BusinessApplication","operatingSystem":"Web, Android, iOS (PWA)",
   "offers":[
     {"@type":"Offer","name":"Free","price":"0","priceCurrency":"GBP"},
     {"@type":"Offer","name":"Pro monthly","price":"9","priceCurrency":"GBP"},
     {"@type":"Offer","name":"Pro yearly","price":"79","priceCurrency":"GBP"},
     {"@type":"Offer","name":"Founding Member (one-off payment)","price":"49","priceCurrency":"GBP"}]}
]
```

**Tool pages** (`/paint-calculator`, `/decorating-quote-template`, `/decorating-invoice-template`):

```json
[
  {"@context":"https://schema.org","@type":"WebApplication","name":"PriceBrush Paint Calculator","url":"https://pricebrush.pages.dev/paint-calculator",
   "applicationCategory":"UtilitiesApplication","operatingSystem":"Any","inLanguage":"en-GB","isAccessibleForFree":true,
   "offers":{"@type":"Offer","price":"0","priceCurrency":"GBP"}},
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
   {"@type":"ListItem","position":1,"name":"Home","item":"https://pricebrush.pages.dev/"},
   {"@type":"ListItem","position":2,"name":"Paint calculator","item":"https://pricebrush.pages.dev/paint-calculator"}]}
]
```

(Quote/invoice pages: same shape, `applicationCategory: "BusinessApplication"`.)

**Guides:** `Article` with `headline`, `datePublished`, `dateModified`, `inLanguage: en-GB`, `author: {"@type":"Person","name":"Arif Noviarrizal","jobTitle":"Independent developer","url":"https://pricebrush.pages.dev/about"}` (decided 16/10/2026 — add nothing else, e.g. no `address` or `knowsAbout`, until he provides it), `publisher: Organization`; plus `BreadcrumbList` (Home › Guides › Title). Real person only.

Validate each page in Google's Rich Results Test and the Schema.org validator before launch. When the domain changes, all `url`/`item` values change with `SITE`.

## 6. Core Web Vitals and performance

Targets (field data, 75th percentile, mobile): **LCP < 2.5 s on 4G**, **CLS < 0.1**, **INP < 200 ms**. Lab gate before each release: Lighthouse mobile **Performance ≥ 90** (PRD) on the 3 P0 pages.

- **LCP element** should be the H1/intro text (not an image). No hero image or video on tool pages.
- **JS budget** for tool pages: ≤ 120 KB gzipped on first load. Load the PDF library (`react-pdf` or similar) **only when the user taps "Download PDF"** (dynamic `import()`), never in the initial bundle — it's the single biggest risk to LCP/INP.
- **Fonts** (design system uses Archivo for display + system stack for body): self-host one variable `woff2`, subset to Latin, `font-display: swap`, `<link rel="preload" as="font" type="font/woff2" crossorigin>` for that one file only. No Google Fonts CSS request.
- **CLS:** reserve space for the result card (fixed min-height) so typing doesn't shift the page; fonts with `size-adjust`/fallback metrics; images with `width`/`height`.
- **Images:** AVIF/WebP with PNG fallback only where needed; `loading="lazy"` below the fold; example-quote image ≤ 120 KB; descriptive `alt` ("Example painting and decorating quote with four lines totalling £615").
- **INP:** calculation runs synchronously on input (cheap maths) — debounce nothing; avoid re-rendering the whole page on each keystroke.
- **Caching:** hashed `/assets/*` immutable (header in §3.2); HTML uses Pages defaults.
- Third-party scripts: Cloudflare Web Analytics beacon only (~5 KB, deferred). No chat widgets, no tag managers.

## 7. Accessibility items that also help SEO

WCAG 2.2 AA is a PRD requirement. SEO-relevant: real `<label>` for every input (Google reads them as page text), `<button>` not `<div>`, descriptive link text, heading order, sufficient contrast. Inputs with `inputmode="decimal"` for metres.

## 8. Analytics hooks (privacy-friendly)

See `measurement.md`. Developer needs to add: Cloudflare Web Analytics (enable in the Pages dashboard — cookieless, no consent banner) and a tiny anonymous event counter (Worker) for `calc_used`, `pdf_downloaded`, `cta_signup_click`. No personal data, no cookies.

## 9. Domain migration plan (when a domain is bought)

**Decided 16/10/2026:** launch on `pricebrush.pages.dev`; migrate when the founder buys the domain from early revenue. Until then: keep every absolute URL behind the `SITE` constant, keep the listings register in `link-building.md` §1 up to date (every external profile we'll need to edit), and don't hard-code the host in PDFs except via one config value.

1. Buy the domain (after the UK IPO trademark check — PRD open question). Add it as a **custom domain** on the Pages project (Cloudflare DNS, free).
2. Change `SITE` in `app/seo/meta.ts`, robots.txt `Sitemap:` line, JSON-LD URLs; rebuild. Canonicals now point to the new domain.
3. **301 every `pricebrush.pages.dev/*` URL to the same path on the new domain** with Cloudflare **Bulk Redirects** (free; `_redirects` can't match on hostname). Preserve path and query string. Keep preview `*.pricebrush.pages.dev` noindexed.
4. **Search Console:** verify the new domain as a **Domain property** (DNS TXT) and keep the old `https://pricebrush.pages.dev/` URL-prefix property. Use **Settings → Change of address** from the old property to the new one (**verify** GSC accepts a `pages.dev` URL-prefix property as the source; if not, rely on the 301s + new sitemap, which still works, just slower).
5. Submit the new `sitemap.xml`; keep the old sitemap URL working (it will redirect).
6. Update every profile you control: directory listings, Product Hunt, AlternativeTo, social bios, the "Made with PriceBrush" watermark link in PDFs (old PDFs keep working via 301).
7. Keep the redirects **at least 12 months** (Google's guidance is "as long as possible"; free to keep forever).
8. Watch GSC for 4–8 weeks: indexed pages on the new property rise, old property falls; fix any 404s.

## 9b. Privacy policy and terms — needed for data stories (decided 16/10/2026)

The founder approved using **anonymised, aggregated quote data** for content and data stories (`link-building.md` §3). Before any such use, the privacy policy and terms (already a PRD requirement before checkout) must say so. Developer/founder to include:

- **Terms:** a licence for PriceBrush to create and publish **aggregated, anonymised statistics** from quote and invoice line data (e.g. median price per room type per region).
- **Privacy policy (UK GDPR):** that this processing happens, its purpose (publishing industry statistics / improving defaults), the lawful basis (likely legitimate interests — record a short legitimate-interests assessment), and how users can object/opt out.
- **What's never used:** client names, addresses, phone numbers, emails, free-text notes, logos, or anything that identifies a decorator or their client. Use only line amounts, item type, rough area (postcode district at most) and date.
- **Minimum group size:** don't publish a figure based on fewer than **10 different decorators** (and enough quotes) in a cell; round figures.
- **Client data is the decorator's:** decorators are the controller of their clients' data and PriceBrush processes it for them, so stats must come from price/line data only, never client identity. Have the wording checked (e.g. against ICO guidance on anonymisation) before the first data story.
- Only data created **after** the policy goes live is used.

## 10. Pre-launch checklist (31/10/2026)

- [ ] 3 P0 pages + home + about prerendered; view-source shows full text.
- [ ] Titles/descriptions/canonicals/OG from `keyword-map.md`; one H1 each.
- [ ] `404.html` returns 404; `/app/*`, `/login`, `/q/*` return `X-Robots-Tag: noindex`.
- [ ] Trailing-slash behaviour verified; internal links match canonicals.
- [ ] `robots.txt` and `sitemap.xml` live; sitemap submitted in GSC.
- [ ] Rich Results Test passes (no errors) on tool pages.
- [ ] Lighthouse mobile ≥ 90 on all 3 tools; PDF library lazy-loaded.
- [ ] Cloudflare Web Analytics on; event counter works.
