import type { Config } from "@react-router/dev/config";

export default {
  // Static hosting on Cloudflare Pages: no server rendering at runtime.
  ssr: false,
  // Public SEO pages are prerendered to HTML at build time.
  // App routes (login, quotes) stay client-rendered via the SPA fallback.
  prerender: ["/", "/paint-calculator", "/decorating-quote-template"],
} satisfies Config;
