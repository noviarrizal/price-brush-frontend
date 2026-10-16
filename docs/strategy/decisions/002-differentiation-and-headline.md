# 002 — Sharpest difference, and should the headline change?

Date: 16/10/2026 · Author: strategist · **Status: Accepted (17/10/2026, with changes per docs/ceo/decisions-2026-10-17.md)**

CEO change: differentiator (visible decorator maths) kept, but the H1 is **"Room sizes in. Priced quote out."** until voice ships; re-test against "Say the rooms. Get a priced quote." with 5+ decorators in late Nov. "60 seconds" dropped; use "When it's accepted, it's an invoice." See CEO #2.

## Question

Every part of our current promise is already claimed by someone. Is there a difference PriceBrush can defend and prove, and should the H1 "Quote any decorating job in 60 seconds. Just say it." (PRD §6, `docs/seo/keyword-map.md`, `docs/design/screens.md` P1) change?

## Why it matters now

The landing, calculator and quote-template copy is written for the 31 Oct launch. Changing the words now costs about 1 hour; changing them after indexing costs rankings and redesign time. If the accepted change alters the PRD positioning line (§1), that needs to be said explicitly, and this memo says it.

## Evidence (all checked 16/10/2026; details and sources in `../competitors.md`)

| Our claim | Who already owns it |
|---|---|
| "in 60 seconds" | QuoteRocket's page title: "Make a Quote in 60 Seconds" (`../../seo/data/serp-ddg-uk-2026-10-16.md`, #6 for "painter and decorator quote template") |
| Voice to quote ("Just say it") | Jobber ("Hey Jobber, I need to start a quote", `../../design/research/refs/jobber-appstore-1.jpg`); Fixxa ("Say the job in a voice note", fixxa.ai); VoxTrade ("Speak once", `voxtrade-appstore-2.jpg`); Kvota; PainterPal (UK decorators, iPhone waitlist); TradeQuoteAI ("Type or speak") |
| Quote → invoice in one tap | QuoteRocket's H1: "Accepted in one tap. Invoiced in one click." (£39/month) |
| Free browser tool, no sign-up | InvoiceJob (invoices, £29 one-off); Sleepless Tradesman (free AI quote tool, no sign-up, plus 8 free tools) |
| Decorator-only | Queezy ("The quoting app built for painters & decorators", room-by-room builder, from £8.99/month); PainterPal |
| 5 free documents a month | VoxTrade (5 quotes and 5 invoices) and Kvota (5 documents): the same limit |

**What nobody we read does:**

1. Puts accurate, visible decorator maths inside the quote: room sizes → m² → coats (including a mist coat on new plaster) → litres and tins → days → £ from *your* day rate, every line editable. Sleepless Tradesman's calculator contradicts itself (10 L / £72 vs 5.6 L / £34, `../../seo/keyword-research.md` §5). ukcalculator.com contradicts itself on door area. No UK tool we read gives days × day rate. Queezy has a room builder, but no voice and no free web calculator.
2. Runs one path from a free calculator to a quote to an invoice on any phone *and* a laptop. Queezy and Kvota are iPhone only, and PainterPal isn't launched yet. Our persona Dave uses a cheap Android (PRD §2).

**Honest limit:** none of this is a moat against a funded player. What we can defend at £0 is focus (decorator depth that all-trades tools won't build), correctness you can see on the page, and price (£9 flat against Tradify's £34 per user, Fixxa's £19.99 and QuoteRocket's £39).

## Options

| | Option (H1 / angle) | Founder hours | Impact on 31 Dec | Risk | Reversible? |
|---|---|---|---|---|---|
| A | Keep "60 seconds. Just say it." | 0 | Low: same words as QuoteRocket's page title and the voice apps; the speed claim can't be proven before launch | We look like the 10th AI quote app | Yes |
| **B** | **Decorator maths: "Say the rooms. Get a priced quote." Sub: "Paint, coats, days and labour worked out from your day rate, every number shown and editable. Made for UK decorators."** | **~1 h copy + ~3 h product (estimate): voice/text quotes use the calculator engine per room, and onboarding asks for paint £ per litre next to the day rate** | **Medium: the free calculator becomes live proof of the claim, and it matches memo 001's calculator → quote path** | Claims accuracy, so the maths must be right (test it against the Dulux rules of thumb) | Yes |
| C | Price: "The £9 quote app for UK decorators. No per-user fees." | ~0.5 h | Low to medium: strong against Tradify, weak against Queezy (£8.99) and VoxTrade ($9.99) | Starts a price race and attracts the cheapest buyers | Yes |
| D | Any device: "Works on any phone or laptop. Nothing to install." | ~0.5 h | Low: it's a feature, not a reason to switch | Fixxa (WhatsApp) and VoxTrade (web) already work this way | Yes |

## Recommendation

**Option B.** Use C and D as supporting claims, not as the headline. It is the only promise we can *show* on 31 Oct (the free calculator demonstrates it before anyone signs up), it fits memo 001, and it uses the decorator's own words: rooms, coats, day rate. Make "60 seconds" a measured proof point later: once the event counter has data, report the median time from opening "New quote" to "quote_sent".

## What changes if accepted (proposed; not applied)

- **PRD §1 positioning (explicit change):** from "The fastest way for UK decorators to quote" to "The UK decorator's quote app that does the maths: rooms to paint, days and price. No per-user fees. No sales calls. Cancel in one tap."
- **PRD §6 key copy:** Landing H1 "Say the rooms. Get a priced quote." Sub as in option B. Keep the promise strip.
- **PRD §3 / F5:** AI quote lines per room show m², coats, litres and days, using F1's engine. Promote the paint £/litre field from the P1 price book into onboarding (P0), next to the day rate.
- **SEO `keyword-map.md` home:** H1 as above. Rewrite the meta description without "60 seconds", e.g. "Say the rooms, get a priced decorating quote: paint, days and labour from your day rate. Send on WhatsApp, invoice in one tap. Free for 5 a month." (check the length; the SEO agent owns this)
- **SEO `briefs/paint-calculator.md`:** replace the CTA "Quote this job by voice in 60 seconds" with "Turn this into a quote" (as in memo 001).
- **Design `screens.md` P1 and P2:** new H1 and sub. The hero shows a worked example: "Living room 4 × 4 m · 2 coats · 5 L · 1 day · £200".
