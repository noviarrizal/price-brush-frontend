# Opportunities: pain points scored (v0.2)

Date: 16/10/2026, rows 3–4 updated 17/10/2026 (memo 004) · Author: strategist

**How it's scored**

- **Frequency** (from evidence): H = repeated across several sources, M = one strong thread or one autocomplete cluster, L = a single mention.
- **Fit**: does solving it help a UK decorator pay us?
- **Effort**: founder hours, all estimates.
- **Placement**: MVP / post-MVP / content only.

Reddit numbers are comment counts at fetch time (`../seo/data/reddit-sample-2026-10-16.md`).

| # | Pain point | Frequency (evidence) | Fit | Effort | Placement | Note |
|---|---|---|---|---|---|---|
| 1 | Doing the maths for paint, coats and days by hand; quoting at night | **H**: deepest autocomplete cluster (`../seo/data/paint.csv`); trade modifiers "labour", "multiple rooms", "price"; PRD §1; VoxTrade sells the same pain | High | Already in scope (F1 + memo 001) | **MVP** | The core of memo 002 |
| 2 | Mist coat / new plaster (extra coat, drying time) | **H** for DIY: most of the 14 r/DIYUK paint posts; "Mist coat failed" (83); autocomplete in `extra-paint-tech.csv` | Medium (homeowners ask; decorators need it priced right) | ~1 h | **MVP (switch) + content** | Memo 003. The FAQ is already in the calculator brief. v0.2: **weak** as a decorator complaint, but it's a real pricing line ("quote this separately", extra coat plus a return visit, trade2base.com). Memo 004 |
| 3 | Late payers / chasing invoices | **M–H** (v0.2): 45% of painters & decorators rank late payment as a top-5 bugbear (Tradefix Direct, 2024, n = 150 all trades); 68% of trades chasing ≥1 late payment, 39% take half upfront (Direct Line, 15/01/2026); PDA 8-month dispute case. Reddit evidence is weak for decorators (memo 004) | Medium–High (retention, not acquisition) | ~2 h for a WhatsApp reminder; ~1 h for a deposit line; 10 h+ for automated email | **MVP-lite (P1 button) + content**; deposit line and automation post-MVP | Memos 003 and 004. The Late Payment Act covers business clients only |
| 4 | Underpricing / not knowing the true day rate | **H** for UK trades (v0.2): r/Plastering "Is £150 too cheap for this" (61), "How much would you charge?" (48); r/ukelectricians day-rate threads (41, 11). **M** for decorators: Decorators Forum articles ("£120 day rate… about £6 per hour"); `pricing.csv` | High | 0 extra (days × day rate in memo 001); ~0.5 h for a "this job takes most of a day: charge a day?" hint; ~4 h later for a "true day rate" tool | **Content now (pricing guide, Dec)**; hint and tool post-MVP | The r/Plastering consensus ("6 hours is a days labour") is the maths we show |
| 5 | Per-user fees, sales calls, hard-to-cancel billing | **M**: Tradify reviews (expensive with staff; sales calls); Powered Now 1-star reviews (charged after cancelling, auto-renew) | High (switching reason) | 0 (pricing model + F12) | **MVP (messaging)** | Supporting claim 3 in `positioning.md` |
| 6 | No signal on site / offline | **M**: Tradify review "I would give Tradify 5 stars if I could use it off line"; PRD §2 context | High | Already P1 (offline drafts + PWA) | **MVP (P1)**, keep it there | Say "works without signal" only when it does |
| 7 | App crashes / unreliable | **M**: Powered Now 2025 1-star reviews; Tradify "constant issues with the phone app" | Medium | Quality, not a feature | **MVP (quality bar)** | Don't claim it; just don't crash |
| 8 | Homeowners doubting a day rate or a one-day quote | **M**: r/HomeImprovementUK "Tradesman day rate and quoting other work" (45); r/DIYUK "Painting hallway" (23) | Medium (quote clarity helps decorators win jobs) | ~1 h: optional "What's included / drying time" note on quotes | **Post-MVP** feature; **content** now (day-rate guide explains both sides) | |
| 9 | VAT confusion (threshold, non-registered invoices) | **M–H** for small business generally: r/smallbusinessuk VAT threshold threads (83, 79); r/UKPersonalFinance "Non VAT registered…" (11) | Medium | Already in F7 (VAT optional) | **Content only** (VAT guide P1; invoice FAQ) | No tax advice in the product |
| 10 | Starting out as a sole trader (first invoices) | **L–M**: r/smallbusinessuk "Trades, how did you start?" (31, a gas engineer); "best software for invoices…" (29) | Medium (new starters use templates) | 0 | **Content only** (start-a-business guide, P2) | |
| 11 | Making Tax Digital fear | **M**: Fixxa leads with it; `mtd-tax.csv` | Low until 2027 | n/a | **Content only, Jan 2027** | MTD onboarding paused until early 2027 (constraint) |

## What we don't know yet (and the cheapest way to find out)

- **Whether decorators (not DIYers) use the calculator.** Track "Turn this into a quote" clicks (memo 001).
- **How much late payment matters to *decorators*.** v0.2 found one decorator-specific survey figure (45%, small sample) and one case study (memo 004). Still count reminder-button taps after launch (memo 003), and ask in the feedback form on sign-up (£0).
- **Where UK decorators talk.** Not on Reddit: only 16 of 2,300 recent UK posts mention decorators, all by homeowners. r/uktrades has no posts in the archive. Decorator Facebook groups need a login. Trade subs are hostile to app-builder surveys ("Replying to ai slop."), so answer existing threads instead of posting surveys (memo 004).
