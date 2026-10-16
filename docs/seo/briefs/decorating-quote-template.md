# Brief — `/decorating-quote-template` (P0, live by 31/10/2026)

Keyword map entry: `../keyword-map.md` · Evidence: `../keyword-research.md` Cluster B · UI spec (owned by design): `../../design/screens.md` § P3 (currently at `/free-quote-template` — URL to be agreed, see keyword map heads-up) · PRD F2.

## 1. Search intent

- **Who searches:** mostly **decorators** (sole traders, new starters, people moving off Word) — this is the buyer. Some homeowners look for "what should a painting quote include" to compare quotes.
- **What they want:** a **ready, professional-looking UK quote** they can fill in fast and send today — in the format they know (PDF, or Word/Google Docs). Many phrases end in "word", "excel", "pdf", "free download" (`quotes.csv`), so a **downloadable blank** matters as well as the online generator.
- **v0.2 — UK proxy SERP (`../data/serp-ddg-uk-2026-10-16.md`):** the top 10 for "painting and decorating quote template uk" is **entirely small UK quoting-SaaS pages**, mostly from 2026 (TradeQuoteAI ×2, Quotient, QuoteSmith, TradeTally, Love Invoicing, QuoteCraft, QuoteRocket, TheTradePack, QuickPrice). TradeQuoteAI's page (read 16/10) has 9 sections, copy-paste wording and an itemised bedroom example, but no author, no cancellation rights and no download. QuoteRocket already claims "Make a Quote in 60 Seconds" — our 60-second promise needs proof on the page (show the generator, not the slogan). Difficulty now **Medium**.
- **What ranks now (v0.1, WebSearch):** thin template mirrors (inv24.uk: Word download, ~30 words), US SaaS template pages (PandaDoc, Jobber, Joist, InvoiceOwl, Skynova, Jotform), a UK SaaS page (QuoteCraft). None we could read offers a no-sign-up UK generator with VAT handling, a worked UK example and decorator-specific fields. Spam mirrors on .ac.uk/.gov domains also appear in WebSearch — low quality, beatable on usefulness, but they show the SERP is messy.

## 2. Must-haves to beat the current top 3

### 2.1 Tool behaviour (generator first, above the fold)

| Requirement | Why |
|---|---|
| Online form → **PDF download**, no login, nothing sent to a server (PRD F2, privacy) | Fastest path to the job's result; no email gate (AutoInvoice/inv24 creator gate = our advantage) |
| **Your business:** name, phone, email, address; logo optional (stays in browser); VAT number shown only if "I'm VAT registered" | UK sole traders mostly not VAT registered (PRD persona Dave) |
| **Client:** name, job address (and billing address if different) | Standard |
| **Quote details:** quote number (Q-0001, editable), date (DD/MM/YYYY), **valid until** (default 30 days), short job description | UK conventions; PRD mock-up "Valid for 30 days" |
| **Line items:** description + amount (qty × rate optional); **"+ Add line"**; quick-add chips for common decorator lines: "Walls, 2 coats", "Ceiling, 2 coats", "Woodwork (skirting, doors, frames)", "Prep: fill and sand", "Wallpaper removal", "Paint and materials" | Saves typing; mirrors how decorators itemise (research: prep and materials often itemised separately) |
| **Supply and apply / labour only** toggle → prints "Price includes paint and materials" or "Labour only — client supplies paint" | Answers "do painting quotes include paint" (`quotes.csv`) |
| **VAT toggle:** off by default; on = 20% line + VAT number | UK VAT; threshold £90,000 (GOV.UK) |
| **Terms block** with editable defaults: deposit (none / %), payment due on completion or within 14 days, what's included/excluded, furniture moving, protection of floors, "Prices are fixed unless the agreed work changes" | What a UK quote should state (see §2.2) |
| **Cancellation notice option** (on by default for home clients): adds a short "Your right to cancel" paragraph | Consumer Contracts Regulations 2013 — see FAQ; nobody we read mentions it, and it's a real legal duty for quotes agreed in the client's home |
| **Pre-fill from the paint calculator** ("Turn this into a quote") | Funnel from our biggest-demand page |
| PDF: A4, clean, decorator's name biggest, "Made with PriceBrush" small watermark (PRD), selectable text (not an image) | Looks professional; watermark = marketing |
| **Also offer blanks:** "Prefer Word? Download a blank .docx" + "Google Docs: make a copy" + "Printable PDF" | Captures "template word/pdf/free download" intent; $0 (static files in `public/`) |
| Autosave the form in `localStorage` so a refresh doesn't lose it; "Clear form" button | Weak signal on site (PRD) |

### 2.2 Sections below the tool (in this order)

1. **Example: a painting and decorating quote (UK)** — render the example as an image *and* as HTML text (so Google can read it). Use the PRD example, clearly labelled "Example — prices are illustrative":

   | Line | Amount |
   |---|---|
   | Living room — walls, 2 coats (supply and apply) | £220 |
   | Living room — ceiling, 2 coats | £140 |
   | Hallway — walls, 2 coats | £160 |
   | Prep — fill cracks, sand, mist coat on patched areas | included |
   | Paint and materials | £95 |
   | **Total (not VAT registered)** | **£615** |

   Add one line: "If you're VAT registered: subtotal £615 + VAT 20% £123 = £738." ~120 words around it.
2. **What should a painting and decorating quote include?** (H2, exact autocomplete question) — checklist: your details · client and job address · quote number and date · valid-until date · scope room by room (surfaces, coats, colours/products if agreed) · prep included · what's excluded · materials included or not · price per line and total · VAT (only if registered) · start date / duration estimate · payment terms and deposit · cancellation rights (home clients) · insurance mention if you have it. ~300 words.
3. **How to write a painting and decorating quote in 5 steps** (H2, matches "how to write a painting and decorating quote") — survey, measure (link to calculator), price (link to the pricing guide — keep this short to avoid cannibalising it), write the lines, send fast (WhatsApp) and follow up. ~300 words.
4. **Quote or estimate?** (H2) — in the UK a **quote** is normally a fixed price for the agreed work; an **estimate** is a best guess that can change. Say which one you're giving. Note that under the **Consumer Rights Act 2015** what you tell a consumer about the price can be binding. ~150 words. *(Link to Citizens Advice / GOV.UK; don't give legal advice.)*
5. **FAQ** (H2) — exact autocomplete questions where possible, 40–80-word answers:
   - What should a painting quote include?
   - Do painting quotes include paint? *(depends — "supply and apply" vs "labour only"; always say which)*
   - How do painters and decorators quote jobs? *(day rate vs fixed price per room; link to the pricing guide)*
   - How long should a decorating quote be valid for? *(commonly 30 days; your choice — state it)*
   - Do I need to add VAT to my quote? *(only if VAT registered; £90,000 threshold; link to `/guides/do-decorators-charge-vat`)*
   - Do I have to give my client a right to cancel? *(If the contract is agreed in the client's home and is over £42, the Consumer Contracts Regulations 2013 normally give a 14-day cancellation right and require written notice; if they ask you to start sooner they pay for work done. Link Business Companion / legislation.gov.uk. "This is general information, not legal advice.")*
   - Can I send a quote on WhatsApp? *(yes — PDF or link; get the client's "yes" in writing)*
   - Is this template really free? *(yes, PDF with a small "Made with PriceBrush" mark; no sign-up; nothing stored)*
6. **Next step: when the job's done** — link card to `/decorating-invoice-template` ("Turn this quote into an invoice") and the app CTA ("In PriceBrush that's one tap").

### 2.3 Copy rules

- "Quote" throughout; "estimate" only in section 4 and once in the intro for searchers using that word.
- Intro under H1 (≤ 50 words): "Fill in the form, download a professional PDF and send it to your client today. Built for UK painters and decorators: £, VAT only if you're registered, UK dates. No sign-up, and nothing you type leaves your device."
- Never say "legally compliant" or "HMRC approved" (a quote isn't an HMRC document; don't overclaim).

## 3. Word count

**1,200–1,800 words** below the tool. inv24 ranks with ~30 words, so content isn't the bar for being listed — it's the bar for being **first** and earning links.

## 4. Schema

- `WebApplication` (name "PriceBrush Free Decorating Quote Template", `applicationCategory: "BusinessApplication"`, `offers.price 0 GBP`, `inLanguage en-GB`, no ratings).
- `BreadcrumbList`: Home › Decorating quote template.
- Optional `FAQPage` (no rich result expected — see `../technical-seo.md` §5).
- Don't mark up the example as `Offer`/`Invoice` (it's not a real offer).

## 5. CTA to sign-up

- After download (toast/modal-free inline card): **"Next time, just say the job. PriceBrush writes the lines for you — free for 5 documents a month."** → sign-in.
- Persistent secondary card beside the form (desktop) / after the totals (mobile): "Skip the typing: say the job and we'll fill this in" (design copy).
- Never block the download behind sign-up.

## 6. Internal links

- **Out:** `/paint-calculator` ("work out the paint first") · `/guides/how-to-price-a-painting-job` (section 3, FAQ) · `/guides/do-decorators-charge-vat` (FAQ) · `/decorating-invoice-template` (section 6) · `/` (CTA).
- **In:** home "Free tools" · paint calculator CTA · invoice page ("start with a quote") · pricing and day-rate guides · footer.

## 7. E-E-A-T signals (true ones only)

- Cite **GOV.UK** (VAT threshold), **legislation.gov.uk / Business Companion** (cancellation rules), **Citizens Advice** (quote vs estimate) — official sources, linked.
- "Last reviewed: [date]" on the legal/VAT bits; review each April (VAT/MTD changes).
- Real About page (author: **Arif Noviarrizal, independent developer building PriceBrush** — nothing more until he adds it); no fake testimonials ("Used by 1,000s of decorators") — none exist yet.
- Things the top-ranking competitors lack and we can truthfully add: cancellation-rights section (Consumer Contracts Regulations), quote-vs-estimate explanation, a named author, and a working blank download.
- When the founder has feedback from real decorators on the template, quote them **with permission and first name + town only**.

## 8. Acceptance checklist

- [ ] Prerendered HTML contains the H1, intro, example table (as text), checklist and FAQs.
- [ ] Download works offline after first load; no network call carries form data (check DevTools).
- [ ] PDF text selectable; dates DD/MM/YYYY; £ formatting `£1,234.00`.
- [ ] VAT off by default; VAT line and number appear only when on.
- [ ] Blank .docx / Google Docs / printable PDF links work.
- [ ] Title/meta/canonical/OG as `keyword-map.md`.
