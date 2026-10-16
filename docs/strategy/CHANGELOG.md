# Strategy changelog

## v0.3 — 17/10/2026

Founder accepted all 10 CEO decisions (`../ceo/decisions-2026-10-17.md`). No new research.

**Changed**

- `decisions/001`–`004`: Status → **Accepted (17/10/2026, with changes per the CEO memo)**, each with a one-line note of the change:
  - 001: calculator (multi-room + labour/price) + quote template with working pre-fill on 31 Oct; invoice 14 Nov; fixed cut order.
  - 002: H1 → "Room sizes in. Priced quote out." until voice ships; differentiator unchanged; late-Nov re-test.
  - 003: mist coat = must-have (P0); WhatsApp reminder = nice-to-have (P1, cut first); Reddit = homeowner channel only.
  - 004: comparisons include Queezy, dated and sourced; "No per-user fees", never "cheaper"; Direct Line dated 15/01/2026.
- `positioning.md` → v0.2: claim 3 → "No per-user fees" (was "Fair, flat price"; price line now "incl. VAT"); header note on the accepted H1.
- `competitors.md` → v0.3: added **Paint Manager** (paintmanager.co.uk, £19.99–£39.99/month, "Quote. Win. Get Paid.") as **unreviewed**.

**Not verified**

- Paint Manager: price, headline, per-user basis and everything else; taken from the CEO/marketing input, not checked by the strategist.

## v0.2 — 17/10/2026

Verification run for the three open items from v0.1. It ran 16–17/10/2026. No recommendation in memos 001–003 changes.

**Added**

- `decisions/004-verification-results.md`: GBP prices, traction proxies and decorator-specific pain evidence, with the dead ends listed. Recommends keeping memos 001–003 and making small edits: price-ladder evidence, a post-MVP deposit line, deposit and late-payment FAQs, and a "no survey posts in trade subs" guardrail. **Proposed.**

**Changed**

- `competitors.md` → v0.2. New Price columns with confidence and date, Traction columns with sources, a "Checked" column, a solo-decorator price ladder and three new names to check (Trade2Base, TradeKwote, Miya).
  - **Sleepless Tradesman:** £29.99 / £59.99 verified (v0.1 showed S$ because of geo-pricing). GB rating is 3.67 from 3; the newest review is 1-star.
  - **TradeQuoteAI:** USD only by design (hard-coded); counters hard-coded at 15.
  - **Powered Now:** £28 / £32 / £40 per user ex VAT (secondary); App Store £39.99+ (verified).
  - **Jobber:** USD only on its UK web page (secondary); App Store Lite £25.99, Core £59.99 (verified).
  - **Fixxa:** four share allotments in 2026 (probably funded). Threat is now "Medium, rising".
- `opportunities.md` → v0.2. Late payers raised to M–H, with decorator-specific survey data. Underpricing raised to H for UK trades, M for decorators. Mist coat noted as weak as a decorator complaint but a real pricing line. "Where decorators talk" finding added.

**Could not verify**

- Powered Now and Jobber web prices first-hand: Cloudflare blocks both our fetcher and local headless Chrome, and Capterra UK and GetApp UK return 403.
- Wayback snapshots: no captures of either pricing page exist in the archive.org API, and web.archive.org can't be fetched by our tools.
- Sleepless Enterprise GBP price; who owns Sleepless (no UK company found).
- Any competitor's revenue: none is on TrustMRR, and Companies House small or micro accounts carry no turnover.
- Fixxa raise amounts; the source of Powered Now's "4,000+" claim (its site blocks us).
- Jobber's GB written reviews (the RSS feed came back empty).
- Decorator-specific evidence of high *volume* for any pain: UK decorators are barely on Reddit, and decorator Facebook groups need a login.

## v0.1 — 16/10/2026

First strategy run. It was stopped once by the founder after memo 001, then resumed and finished the same day.

**Added**

- `decisions/001-seo-bet-calculator-first.md`: lead the 31 Oct launch with the paint calculator at full trade depth; quote template as the next step; invoice page moves to 14 Nov. Kept unchanged from the stopped run (complete). **Proposed.**
- `decisions/002-differentiation-and-headline.md`: "60 seconds", voice, one-tap invoicing, no sign-up and the 5-free limit are all taken. Recommends "decorator maths you can see" and a new H1: "Say the rooms. Get a priced quote." This **explicitly changes the PRD §1 positioning line**. **Proposed.**
- `decisions/003-reddit-pain-points-scope.md`: content for late payers, underpricing and mist coat, plus two small MVP items (a WhatsApp overdue reminder, P1; a "New plaster" switch, P0), about 3 h. **Proposed.**
- `competitors.md`: 9 direct competitors and 3 incumbents, with App Store GB data, prices and threat levels; plus a list of competitors not yet checked.
- `positioning.md`: audience, the one problem, proof points by date, messaging hierarchy, owned phrases to avoid.
- `opportunities.md`: 11 pain points scored for frequency, fit, effort and placement.

**Could not verify**

- GBP prices for Sleepless Tradesman and TradeQuoteAI (shown in SGD/USD to our fetcher), Powered Now and Jobber (pricing pages returned 403), and VoxTrade (third-party listings only).
- Revenue for any competitor (no TrustMRR pages found or checked); launch dates for the web-only products.
- Whether the Reddit late-payer and underpricing posters are tradespeople (both posts are generic).
