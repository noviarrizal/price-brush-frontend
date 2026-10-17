import type { MetaDescriptor } from "react-router";

// Per-route meta for public pages: docs/seo/technical-seo.md §2. A route's `meta` replaces its
// parent's, so every public route returns the full set from here.

export const SITE_URL = "https://pricebrush.pages.dev"; // change once at the domain move

interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Path under `public/`. Left out until the page's 1200 × 630 OG image exists. */
  ogImagePath?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export function seo({ path, title, description, ogImagePath, noindex = false, jsonLd = [] }: PageSeo): MetaDescriptor[] {
  const url = SITE_URL + path;
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
    ...(ogImagePath
      ? [
          { property: "og:image", content: SITE_URL + ogImagePath },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ name: "twitter:card", content: "summary" }]),
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}
