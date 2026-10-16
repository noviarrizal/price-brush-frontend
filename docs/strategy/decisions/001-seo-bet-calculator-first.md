# 001 — SEO bet for the 31 Oct launch: lead with the paint calculator

Date: 16/10/2026 · Author: strategist · **Status: Accepted (17/10/2026, with changes per docs/ceo/decisions-2026-10-17.md)**

CEO change: 31 Oct ships `/paint-calculator` (multi-room + day rate → labour/price, "Your price at your day rate") plus `/decorating-quote-template` with a working "Turn this into a quote" pre-fill; invoice template 14 Nov; fixed cut order (items 1–4 must ship 31 Oct, walls/ceiling/woodwork switches and mist coat may follow the next week). See CEO #1.

## Question

The quote and invoice template SERPs are crowded with 10+ small UK tools (SEO difficulty raised to Medium). Should the 31 Oct launch still lead with the two templates, or lead with the paint calculator and its UK / multi-room / walls-and-ceiling / labour-and-price variants, and handle the templates differently?

## Why it matters now

About 15 days and roughly 20 founder hours remain before 31 Oct (assumes 8–10 h/week). Pages that go live earlier get indexed and start ranking earlier, and the 31 Dec payment goal depends on traffic arriving in November.

## Evidence

- **Template SERPs are full of small UK quoting tools.** For "painting and decorating quote template uk", all 10 results are small UK quoting SaaS pages, mostly dated 2026: TradeQuoteAI ×2, Quotient, QuoteSmith, TradeTally, Love Invoicing, QuoteCraft, QuoteRocket, TheTradePack and QuickPrice. The invoice SERP is led by InvoiceJob (no sign-up, PDF built in the browser) plus 9 others. Source: `../../seo/data/serp-ddg-uk-2026-10-16.md` (DuckDuckGo UK, Bing index, so a proxy for Google).
- **The calculator's trade variants are barely served.** The "paint calculator multiple rooms" top 10 is mostly US gallon calculators. For labour, the results are US labour calculators and no UK tool gives days × day rate. Sources: same file, and `../../seo/keyword-research.md` §3 cluster A (Easy–Medium).
- **The paint cluster has the most demand.** It is the deepest autocomplete cluster, with hundreds of UK phrasings (`../../seo/data/paint.csv`, keyword-research.md §2.1).
- **Calculator competitors make arithmetic mistakes.** Sleepless Tradesman's calculator headline says 10 L / £72, but its own breakdown says 5.6 L / £34. ukcalculator.com contradicts itself on door area (keyword-research.md §5). Accurate maths is a gap we can win.
- **Risk:** calculator searchers are often homeowners. r/DIYUK paint questions are DIY mist-coat problems (`../../seo/data/reddit-sample-2026-10-16.md`). Only the trade modifiers (labour, day rate, price, multi-room) attract decorators. We do not know the decorator share yet.

## Options

| | Option | Founder hours to 31 Oct | Impact on 31 Dec goal | Risk | Reversible? |
|---|---|---|---|---|---|
| A | Keep the plan: all 3 pages equal, templates lead | ~20 h | Low to medium. Crowded template SERPs usually take months to rank | Three thin pages instead of one strong one | Yes |
| **B** | **Calculator leads at full trade depth. The quote template ships as the calculator's next step and also stands alone. The invoice page moves to 14 Nov and reuses the quote PDF** | **~20 h (same total, re-ordered)** | **Medium. Best chance of early rankings on the trade long-tails, plus a direct calculator → quote → sign-up path** | Calculator traffic may be mostly homeowners | Yes. The invoice page only moves 2 weeks |
| C | Calculator only. Templates after the MVP (December) | ~12 h | Low. Loses the template page, which is the closest page to a buying decision | Fewer pages indexed for the "≥ 10 indexed" metric | Yes |

## Recommendation

**Option B.** Put the hours where the SERP is beatable (trade-flavoured calculator variants) and where PriceBrush is actually different: rooms → litres → days → price → quote. That difference is set out in memo 002. The quote template still ships on 31 Oct because it is the conversion step, not the traffic bet. The invoice SERP has the strongest single competitor (InvoiceJob), and our invoice really comes from the quote, so that page can wait two weeks without losing much.

**Cheapest way to test the risk (£0):** use the anonymous event counter (`../../seo/measurement.md`) to count "Turn this into a quote" clicks per calculator use. *Assumption, set by the strategist:* if fewer than 2% of calculator users click it by 15/12/2026, move December's content hours from calculator room pages to the template and pricing guides.

## What changes if accepted (proposed; not applied)

- **PRD §3 and F1:** the calculator gets "+ Add another room" (multi-room total), separate walls / ceiling / woodwork switches, and the day rate → days → labour £ → price output that design already shows. A primary button, "Turn this into a quote", pre-fills the quote generator (F2) with one line per room and surface.
- **PRD §9 roadmap, phase 1:** "Calculator + quote template live 31 Oct; invoice template live 14 Nov."
- **SEO:** in `keyword-map.md` and `content-plan.md`, move the invoice page to 14 Nov. Make the trade modifiers (multiple rooms, walls and ceiling, labour, price) the H2s and FAQ in `briefs/paint-calculator.md`. Leave the head term "paint calculator" as primary but not the bet.
- **Design (`screens.md` P2 and `paint-calculator.html`):** add multi-room rows. Make "Turn this into a quote" the primary action, pre-filled, replacing the "Quote by voice in 60 seconds" CTA (see memo 002).
