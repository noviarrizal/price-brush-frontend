# 004 — Verification run: prices, traction, and whether decorators really have the three pains

Date: 17/10/2026 · Author: strategist · **Status: Accepted (17/10/2026, with changes per docs/ceo/decisions-2026-10-17.md)**

CEO change: every public price comparison includes Queezy, is dated and sourced; say "No per-user fees", never "cheaper"/"cheapest"; Powered Now only via App Store GB price or omitted; Direct Line cited as "reported 15/01/2026 (sample size not published)". See CEO #4.

## Question

v0.1 left three items unverified: GBP prices (Sleepless Tradesman, TradeQuoteAI, Powered Now, Jobber), competitor revenue and traction, and whether *decorators* (not small businesses in general) have the late-payment, underpricing and mist-coat pains. Does the verified evidence change any recommendation in memos 001–003?

## Why it matters now

Memo 002's price claim and memo 003's two MVP items are built on these facts. The MVP build starts 1 Nov, and the landing copy goes live 31 Oct.

## Evidence

### 1. Prices (details per row in `../competitors.md`)

| Product | £ result | Confidence | How we got it |
|---|---|---|---|
| Sleepless Tradesman | Free (10 messages) · Starter £29.99 · Premium £59.99 per month; Enterprise GBP not published (+£25/seat) | **verified** | GB App Store IAPs (apps.apple.com/gb/app/id6758735822) and the site's own schema.org offers (`priceCurrency: "GBP"`). The site has a "United Kingdom · £ GBP" switcher, so v0.1's S$ was geo-pricing |
| TradeQuoteAI | **No GBP exists.** US$12 / $24 / $49 per month | **verified (USD)** | Hard-coded in the HTML and schema.org (`priceCurrency: "USD"`), so not geo. No App Store app |
| Powered Now | Web £28 / £32 / £40 per user/month ex VAT (£280 / £320 / £400 per year); App Store £39.99 / £44.99 / £59.99 | web **secondary** (two sources agree); App Store **verified** | whito.co.uk (updated 28/09/2026) and Capterra UK snippet; apps.apple.com/gb/app/id622739610 |
| Jobber | Web: **USD only on its UK page** (Core from $29); App Store Lite £25.99, Core £59.99, Connect (1 user) £129.99 | web **secondary**; App Store **verified** | whito.co.uk; apps.apple.com/gb/app/id1014146758 |

**Dead ends (what we tried):**

- **Direct pricing pages, including UK URLs.** sleeplesstradesman.com/pricing?currency=GBP and tradequoteai.com/pricing returned 404, and getjobber.com/en-gb/pricing returned 403.
- **Local headless Chrome** (`capture-ref.ps1`). powerednow.com showed a Cloudflare "Sorry, you have been blocked" page (`../../design/research/refs/strategy-poweredn-pricing.png`), and Jobber showed a bot check (`strategy-jobber-pricing-gb.png`).
- **Directories.** capterra.co.uk and getapp.co.uk returned 403.
- **Wayback Machine.** The archive.org API has no snapshots of either pricing page. web.archive.org itself can't be fetched by our tools, so the TradeQuoteAI (10/06/2026) and Sleepless (12/07/2026) snapshots went unread.

### 2. Traction: revenue unknown for all; best proxies

- **TrustMRR:** 13 slugs, all 404. A control slug returned 200. None of these competitors is listed.
- **Companies House:**
  - **Fixxa AI Ltd** (16457557, incorporated 19/05/2025) filed four share allotments in 2026 (01/06, 08/06, 17/08, 28/09) and a new share class. That is probably outside investment (inference; amounts aren't shown).
  - **Powered Now Ltd** (07647786, 2011) files total-exemption small accounts, so no turnover is published.
  - Queezy and Sleepless have no UK company we could find.
- **App Store GB velocity** (written reviews among the 50 most recent):
  - Tradify: 4 in the last 90 days.
  - Powered Now: none since 15/11/2025.
  - Fixxa: 6, all dated 20–24/07/2026.
  - Sleepless: 3 in total; the newest is 1-star (18/09/2026).
- **Self-reported scale:** Powered Now "4,000+" businesses (search snippet); Jobber "100,000 customers" globally (press release, 12/05/2026). TradeQuoteAI's counters are hard-coded at 15.

### 3. Do decorators have the pains?

Reddit sample: 2,300 recent UK posts plus 784 r/housepainting posts, fetched via Arctic Shift on 17/10/2026 and filtered locally. **Only 16 of the 2,300 UK posts mention decorators or painters, and all 16 are by homeowners.** UK decorators don't post on Reddit. r/uktrades returned no posts in the archive.

| Pain | Decorator-specific evidence | Adjacent-trade / all-trade evidence | Verdict |
|---|---|---|---|
| **Late payers** | Tradefix Direct survey (24/09/2024, n = 150 UK trades): **45% of painters & decorators put "being paid late" in their top-5 bugbears**, their #1 (insightdiy.co.uk). PDA case study: a decorator dispute took 8 months, "eight horribly stressful months" (paintinganddecoratingnews.co.uk, 30/08/2024). Solo painter, r/housepainting (US, 09/05/2026): "chasing two or three invoices every week" until he took payment on completion | Direct Line (15/01/2026): **68% of tradespeople chasing ≥1 late payment; 39% take half upfront; 46% ask for proof of funds** (scottishfinancialnews.com). Reddit: 14 r/smallbusinessuk hits, but the trade-flavoured ones are founders' market-research posts (removed, or 0 comments) | **Some** for decorators (one small survey + one case study); **strong** for trades overall |
| **Underpricing** | The Decorators Forum (updated 20/05/2025): a £120 day rate is "about £6 per hour", and "unpaid work in the evening… quoting". "Are Cheap Decorators Destroying the Industry?" (6 comments). Both are articles; there are no busy threads | r/Plastering "Is £150 too cheap for this" (**61 comments, score 63**; top reply "Yeah too cheap mate"; another: "6 hours is a days labour… price is a day rate plus materials"); "How much would you charge?" (48); r/ukelectricians "How much would you charge for a days labour?" (41) and "at what point do we drop our day rate" (11). All are trade-authored | **Some** for decorators; **strong** for UK trades. The question trades ask is "what's my day rate for this?", which is exactly memo 001's days × day rate |
| **Mist coat / new plaster** | A pricing guide says to quote it separately: "£50–£120 labour… always quote this separately" plus a return visit (trade2base.com, commercial). Homeowners question decorators about it (DIYnot thread, 2006; r/DIYUK "Painting hallway", v0.1) | r/Plastering: 21 of 500 posts mention new or fresh plaster or mist coats; r/DIYUK: 4 of 600 in 5 days. All are DIY or homeowner questions | **Weak** as a decorator *complaint*; **strong** as a homeowner question; **real** as a pricing line (an extra coat plus a return visit) |

**New risk found:** UK trade subreddits are hostile to app builders' research posts. In r/ukelectricians "What Takes Up Too Much of Your Time?" (23 comments), the top reply is "Replying to ai slop." (score 14), and another says it's the "same copy paste post every want to be app builder keeps asking". Several similar r/smallbusinessuk posts were removed or got 0 replies.

## Options

| | Option | Founder hours | Impact on 31 Dec | Risk | Reversible? |
|---|---|---|---|---|---|
| **A** | **Keep memos 001–003 as they are. Make 3 wording or evidence updates (below) and add one guardrail to the Reddit feedback plan** | **~0.5 h (apply the edits)** | Neutral to slightly positive: the price claim is now provable and the late-payment item has decorator data | Low | Yes |
| B | Also promote a "deposit on acceptance" line on quotes into the MVP (39% of trades take half upfront) | +~1 h build (estimate) | Small: it helps retention, not sign-ups | Scope creep in a tight build | Yes |
| C | Drop the reminder button (late payment isn't proven for decorators) | −2 h | Negative: removes a cheap retention hook that the evidence now supports | Lose a credible Pro feature | Yes |

## Recommendation

**Option A. No recommendation in memos 001–003 changes.** The evidence supports all three more strongly than in v0.1:

- **001 (calculator first): unchanged.** Underpricing questions from trades are "what's my day rate for this job", which is days × day rate. Sleepless (£29.99) and TradeQuoteAI (15 users) are content rivals with weak products, so beating them on accuracy is still the bet.
- **002 (H1 "Say the rooms. Get a priced quote."): unchanged.** Supporting claim C ("£9 flat, no per-user fees") is now verified against Tradify (£34/user), Powered Now (£28/user + VAT) and Jobber (USD only / £25.99+ in-app). Queezy (£8.99) is still cheaper, so never say "cheapest".
- **003 (reminder button P1 + New plaster switch P0): unchanged.** The reminder now has decorator data (45%, plus Direct Line's 68%). The switch rests on pricing logic (an extra coat plus a return visit), not on decorator complaints.
- **The deposit line (option B) goes post-MVP**, and the quote-template copy covers deposits for 0 product hours.

## What changes if accepted (proposed; not applied)

- **Memo 002 evidence line / `positioning.md` claim 3:** cite the price ladder in `../competitors.md`. Use "No per-user fees" and avoid "cheapest".
- **PRD §3 post-MVP list:** add "Deposit / part-payment line on quote (on acceptance)". Source: Direct Line, 39% take half upfront.
- **SEO `briefs/` (quote template):** add an FAQ, "Should a decorator take a deposit?", with the Direct Line 39% / 46% figures, and keep memo 003's fact check about the Late Payment Act (business clients only). **Invoice brief:** cite the Tradefix 45% painters & decorators figure, labelled with n = 150 and the 2024 date.
- **SEO `link-building.md` §4:** never post "what's your biggest headache?" surveys in trade subs. Answer existing pricing or day-rate threads with the free calculator only where it directly answers the question, and say who you are.
- **SEO `briefs/paint-calculator.md`:** add a mist-coat FAQ line: "Quote it as its own line (extra coat and a return visit)". This fits the P0 switch.
- **No design changes.**
