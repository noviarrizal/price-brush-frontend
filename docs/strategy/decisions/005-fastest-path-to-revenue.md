# 005 — Fastest path to revenue: what can actually make money before 31/12/2026?

Date: 18/10/2026 · Author: strategist · **Status: Proposed**

Labels: **[fact]** = sourced · **[estimate]** · **[opinion]** · **not verified**. Not legal or tax advice.

## Question

The founder asked: "How can we get money FAST with this project?" Is there anything faster or bigger than the current plan, which is Founding Member £49 and Pro £9 from launch week, 22–30 Nov?

## Why it matters now

The free tools go live on 31/10 and the only hard goal is ≥ 1 payment by 31/12. Any new revenue idea takes hours from the 31/10 build and the MVP (1–21 Nov). The founder has 8–10 h a week.

## The honest answer first

**"Fast money" from PriceBrush is not realistic in 2026.** [opinion, based on the evidence below] The bottleneck is not the product or the checkout. It is that **almost no UK decorators know we exist yet**:

- The site is new, on `pages.dev`, and SEO takes months (memo 001).
- Decorators are not on Reddit: 16 of 2,300 UK posts mention decorators, all written by homeowners (memo 004).
- Permission to post in the Decorators Forum Facebook group is unknown (`../../marketing/launch-plan.md`).

Every option below still needs those same people to find us. None of them creates buyers.

**Realistic numbers with the current plan** [estimates; no conversion data exists until the 15/12 checkpoint]:

- **By 31/12/2026: £0–£105 in the founder's hand.** That is 0–3 Founding sales at about £35 each, after Polar's fees and payout costs.
- **By 31/03/2027: £0–£400.**
- **£0 by 31/12 is a real possibility.** The funnel maths already shows the first payment depends on the Founding offer and launch week (`../../marketing/funnel.md`).

If the founder needs money soon for personal reasons, his fastest income is paid frontend work, not PriceBrush [opinion]. That is outside this memo, and it would cut his PriceBrush hours.

## Evidence (checked 18/10/2026)

**Polar (our checkout)**

- [fact] Polar lists **"Pre-orders and paid waitlists"** as restricted ("may not be accepted"). It prohibits **"Human services"**. It allows **"Templates, eBooks, PDFs, code"**, though eBooks are restricted separately ([acceptable use](https://polar.sh/docs/merchant-of-record/acceptable-use)).
- [fact] **Account review and payouts.**
  - The first-payout review takes "up to 14 days". It includes identity checks (KYC) and a Stripe Connect Express payout account.
  - Polar recommends a live website and a working checkout before review. Reviewers may ask for "a 100% discount code or a video showing the unpaid-to-paid flow".
  - Card testing with real cards "can get the card or account blocked" ([account reviews](https://polar.sh/docs/merchant-of-record/account-reviews)).
- [fact] Indonesia is on Polar's payout list. Whether Stripe accepts "individual" as a business type in Indonesia is **not verified** ([supported countries](https://polar.sh/docs/merchant-of-record/supported-countries)).
- [fact] **Fees.**
  - Selling: 5% + 50¢, plus 1.5% on non-US cards.
  - Payouts: 0.25% + $0.25 per payout, **$2 for each month with payouts**, and 1% currency conversion.
  - Disputes cost $15 ([fees](https://polar.sh/docs/merchant-of-record/fees)).
  - [estimate] Net per £49 sale is about £37 (PRD §7). Payout costs bring it to **about £35**. Exchange rate not verified.
- [fact] **Refunds.** Polar "may issue refunds within 60 days… at its own discretion", even if you have a no-refund policy. Fees are not returned on a refund ([refunds](https://polar.sh/docs/features/refunds)).
- [fact] **License keys.** Polar's license-key check (`POST /v1/customer-portal/license-keys/validate`) "doesn't require authentication" and "can be safely used on a public client" ([API reference](https://polar.sh/docs/api-reference/customer-portal/license-keys/validate)). Whether a browser is allowed to call it from our site (CORS) is **not verified**.

**UK consumer law**

- [fact] For services, "the trader must not begin the supply of a service before the end of the cancellation period" unless the consumer makes an express request. If the trader gets this wrong, "the consumer bears no cost" ([Consumer Contracts Regulations 2013, reg 36](https://www.legislation.gov.uk/uksi/2013/3134/regulation/36)).
- [fact] For digital content, the right to cancel lasts 14 days. It ends early only if the buyer agrees to immediate supply and accepts losing that right ([Which?](https://www.which.co.uk/consumer-rights/regulation/consumer-contracts-regulation)).
- [estimate] So anyone who pre-pays for an app that doesn't exist yet can get a full refund within 14 days.

**Other platforms**

- [fact] **Lemon Squeezy** lists Indonesia for bank payouts ([supported countries](https://docs.lemonsqueezy.com/help/getting-started/supported-countries)).
- [fact] **Gumroad**
  - Charges 10% + $0.50 on direct sales and 30% on sales through its Discover marketplace.
  - Acts as merchant of record, so it handles the tax ([pricing](https://gumroad.com/pricing)).
  - Payout to Indonesia: a third-party source only ([Wise](https://wise.com/us/blog/gumroad-fees)). **Not verified** on Gumroad's own country table.
- [fact] **Etsy Payments** works directly in Indonesia ([Etsy help](https://help.etsy.com/hc/articles/115015710408)).
  - A one-off setup fee of $15–$29 for some sellers is reported by secondary sources only ([crosslist](https://crosslist.com/blog/etsy-review)). Etsy's own fee page returned 403.
  - Etsy search blocked our capture ("Access is temporarily restricted", `../../design/research/refs/strategy-etsy-decorator-quote-template.png`). **Competition and sales counts are not verified.**
- [fact] **Payhip** isn't a merchant of record and pays out through Stripe or PayPal (secondary: [dodopayments review](https://dodopayments.com/blogs/payhip-review)). Standard Stripe is not open to Indonesian sellers, so Payhip is a weak fit.

**Demand for paid templates**

- [fact] Our Google UK autocomplete data looks for **free** templates. In `../../seo/data/quotes.csv`, 33 of 410 unique suggestions contain "free". In `invoices.csv` it is 76 of 413. **None** contain "buy", "paid", "pack", "premium" or "etsy".
- [fact] Paid UK decorating price books do exist, but they are professional reference works: BCIS £60 ex VAT and NSR £156 ([Professional Books](https://professionalbooks.co.uk/pricing-guides/painting-decorating)). Our founder is not a decorator.
- [fact] InvoiceJob already sells a £29 one-off upgrade (logo, saved clients) on top of a free invoice generator (`../competitors.md`). So the "pay once to unlock" model exists in our niche. Its sales are unknown.

**Affiliates, ads and AppSumo**

- [fact] **B&Q** runs its affiliate programme on Impact. Its Irish page promises "at least 2% commission" ([diy.ie](https://www.diy.ie/business-services/affiliate-program)).
- [fact] **Awin** asks UK publishers for a £5 deposit, refunded once they reach the payment threshold ([Awin](https://www.awin.com/gb/compliance-and-regulations/application-process-and-joining-fee)). Whether it accepts publishers based in Indonesia is **not verified**.
- [fact] **AppSumo:**
  - Listing needs AppSumo's approval and can be revoked. Partners must post a privacy policy ([partner terms, 15/06/2026](https://appsumo.com/partner-terms/)).
  - The revenue split is not published. Secondary sources give 30–95% to the partner ([AppSumo blog](https://appsumo.com/blog/breaking-down-appsumo-revenue-share), [Indie Hackers](https://www.indiehackers.com/post/is-appsumo-select-program-worth-it-2374bdaad7)).

## Options

£ figures are what reaches the founder, all **[estimates]**. "Extra" means on top of the current plan's £0–£105 (31/12) and £0–£400 (31/03).

| # | Option | First £ | Extra £ by 31/12 | Extra £ by 31/03 | Founder h | Risk (legal / brand) | Fit | Payout to Indonesia |
|---|---|---|---|---|---|---|---|---|
| A | **Keep the plan and remove what could block it.** Start the Polar review now, use a 100% discount code instead of a real-card test, join the FB group now | Launch week, 22–30 Nov | 0 (it protects the £0–£105) | 0 | ~2.5 | Low | Core | Polar listed; "individual" type **not verified** |
| B | **Pre-sell Founding Member now** through a Polar checkout link | Whenever someone finds it; almost nobody before 31/10 | £0–£35, mostly sales pulled forward from launch week | ~0 | 2–3 | **High.** Polar restricts pre-orders, so the account we need for launch could be held or offboarded in launch week. Buyers keep a full 14-day refund right (reg 36), and Polar can refund on its own. It breaks our own truth rule (CEO 18/10 P1) | Core, but too early | Same as A |
| C | **Founding Member delivered on purchase.** A Polar license key unlocks your logo and removes the watermark on the free quote and invoice templates at once. App Pro follows "for as long as PriceBrush runs". No backend | From ~14/11 (with the invoice template) | £0–£35 (one more week of offer). Mainly a **fallback** if the app slips | £0–£70 | ~2 founder + ~5 agent | Medium. A weak offer if the app slips for long. Not a pre-order, because something is delivered immediately; buyers must tick the "start now" consent | High: the same product, with the same Pro benefits | Same as A |
| D | **Paid template pack or pricing guide** (Etsy, Gumroad, Polar) | 1–4 weeks after listing, if anyone buys | £0–£30 | £0–£80 | 6–10 | Medium. It sells what our site gives free and makes us look like a template shop. Wrong prices in a "guide" from a non-decorator would hurt trust | Low. A separate product | Etsy direct; Gumroad **not verified**; Polar yes |
| E | **Concierge** ("send me your job, I return a branded quote") | Needs an audience we don't have | £0–£50 | £0–£100 | 1 h per job, plus admin | Medium. Polar **prohibits human services**, so payment would go through PayPal (Indonesia **not verified**). 19:00 in the UK is 02:00 in Indonesia from 25/10 | Low. Doesn't build the product | Not verified |
| F | **Affiliate links** on the calculator (B&Q, Awin) | Months away | ~£1 (500 uses × 5% click × 5% buy × £40 × 2%) | < £10 | 2–3 | Low to medium. Needs a cookie banner and pulls clicks away from "Turn this into a quote" | Low | Awin acceptance **not verified**; £5 deposit |
| G | **AppSumo / lifetime-deal sites** | Q2 2027 at the earliest (needs a live product with users) | £0 | £0 | 10+ | Medium. Buyers are SaaS deal-hunters, not UK decorators. Lifetime support load. Kills Founding Member scarcity | Low now | Unknown |
| H | **Ads or sponsorship** | — | ~£0 at ≤ 500 tool uses | ~£0 | 2 | Medium. A consent banner, a slower page (130 KiB budget) and a trust hit | Negative | — |

## Recommendation

**1. Option A now (£0, about 2.5 h).** Don't add a new revenue product. Make sure the one offer that can produce the first payment can't be blocked.

- Polar's review takes up to 14 days and checks identity and payout setup. Starting it on ~21/11 risks payouts being "Held for review" in launch week.
- The launch-plan step "make a real £49 Founding test purchase and refund it" goes against Polar's card-testing warning. It also loses about £4 in fees that are not refunded [estimate]. Use a 100% discount code instead.
- Joining the Facebook group and reading its rules is the biggest unknown for launch week. Admins may take days to approve members, so request membership now (no posting).

**2. Option C as a pre-approved fallback, decided on Sat 07/11.** If, on 07/11, the paid app (voice, invoice, checkout) looks likely to miss Sun 22/11, build C with the invoice template (by 14/11). Launch week then goes ahead with a real, deliverable Founding offer instead of moving. If the app is on track, skip C: it costs hours and adds little.

**Strongest argument against:** Option A makes £0 before 22 Nov and may still make £0 by 31/12. Option D would at least test whether people pay on a marketplace that has its own buyers (Etsy), which our site doesn't have yet.

**What would change my mind:**

- **Etsy demand.** The founder spends 10 minutes in his own browser and searches Etsy UK for "painter decorator invoice template" and "decorator quote template". If several UK-specific listings show 100+ reviews or "X sold" in the thousands, run **one** Etsy listing after 31/10 (≤ 3 h, about $0.20). We can't see Etsy from here.
- **Polar's answer.** If Polar says in writing that a Founding pre-order is fine, Option B's account risk drops. The 14-day refund right and the truth rule remain.

## 14-day plan (18/10–31/10)

This fits around the 31/10 build; the build stays first.

| When | Action | Founder h |
|---|---|---|
| Sun 18–Mon 19/10 | Create the Polar organisation with the new PriceBrush mailbox. Set tax to **Inclusive**. Fill in Finance → Account (business details, Stripe Identity check, Stripe Connect Express payout account in Indonesia). **Write down whether "individual" is accepted.** Don't publish any product. | 1.25 |
| Mon 19/10 | If "individual" is refused, check whether Lemon Squeezy accepts an Indonesian individual (bank payouts listed). Note the result in the PRD open question. | 0.5 |
| Tue 20/10 | Ask to join the Decorators Forum Facebook group with the exact membership answer in `launch-plan.md`. Read the rules once admitted. **No posting.** | 0.25 |
| Wed 21/10 | 10-minute Etsy UK check in your own browser (above). Note what you see in one line. | 0.25 |
| By 28/10 | No new revenue work. Ship the 31/10 cut order. | 0 |
| Sat 31/10 | Launch the free tools as planned. | (planned) |
| Sat 07/11 (after this window) | Option C: go or no-go, based on how the MVP is going. | 0.25 |

**Total: about 2.5 h.**

## What not to do

- Don't pre-sell through Polar (B).
- Don't show "X of 50" or the Founding card before checkout works (CEO 18/10 P1).
- Don't open a template shop, add affiliate links or ads, or pitch AppSumo in 2026.
- Don't offer done-for-you services.
- Don't cut prices or hand out Founding discount codes to "get a first sale". It tests nothing and lowers the anchor.
- Don't run real-card test purchases.

## What changes if accepted (proposed; not applied)

- **PRD** open questions:
  - Tick "Daftar Polar…" once KYC and payouts are done, and record the "individual" result.
  - Add: "Polar restricts pre-orders: no Founding sale before something is delivered at purchase."
  - Decisions log: add memo 005. [pricebrush-lead]
- **`marketing/launch-plan.md`**, Sun 22 Nov row: replace "make a real £49 Founding test purchase on Polar and refund it" with "test the Founding and Pro checkout with a **100% discount code** (Polar docs), then check webhooks, the 'X of 50' count and Cancel + Undo". Move the Facebook membership request to **20/10**. [marketing]
- **`plan/`**: add a "07/11 go/no-go: Option C fallback" checkpoint. If go, a short spec: Polar License Keys benefit on the Founding product, a key field on the templates, a validate call, then the watermark is hidden and a logo upload appears. First test whether a browser can call the endpoint (CORS, 15 min). Add the "start now, lose the 14-day cancellation right" checkbox wording at checkout. [pricebrush-lead]
- **No SEO or design changes** unless C goes ahead. In that case, add a key-entry state to the quote and invoice template screens. [UI/UX]
