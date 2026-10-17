# Funnel (v0.2)

Date: 17/10/2026 · Author: marketing lead · Status: **Accepted (17/10/2026, with changes per `../ceo/decisions-2026-10-17.md` #10)** · Events: `../seo/measurement.md` §1 (existing) plus 4 proposed below

All targets are **[estimates]** I set as starting guesses. There is no data yet and no benchmark source I could verify. Replace them with real rates after the first month.

## Steps, metric, target

| # | Step | Metric (source) | Target | Kill / rethink line |
|---|---|---|---|---|
| 0 | Search → visit | GSC clicks ÷ impressions per P0 page | ≥ 1.5% CTR by 31/12 | < 0.5% after 200+ impressions → rewrite title/description (SEO agent) |
| 1 | Visit → uses the tool | `calc_used` ÷ Cloudflare visits to `/paint-calculator` | ≥ 40% | < 20% → the tool is too far down or too slow |
| 2 | Tool → "Turn this into a quote" | `quote_prefilled` ÷ `calc_used` | ≥ 5% | < 2% by 15/12 (memo 001) → move hours to templates and guides |
| 2b | Trade intent signal | `calc_room_added` ÷ `calc_used` | ≥ 10% | < 5% → traffic is mostly homeowners |
| 3 | Pre-filled quote → PDF | `pdf_downloaded` (p = quote) ÷ `quote_prefilled` | ≥ 30% | — |
| 4 | Public page → sign-up click (from ~22 Nov) | `cta_signup_click` ÷ (`calc_used` + `pdf_downloaded`) | ≥ 3% | < 1% → CTA copy or placement |
| 5 | Click → account | accounts (Neon, `signup_source`) ÷ `cta_signup_click` | ≥ 50% | < 30% → login friction |
| 6 | Account → first quote sent in 24 h | `quote_sent` (PRD §9) | ≥ 40% | < 25% → onboarding |
| 7 | Activated → paid | Polar orders ÷ activated accounts | ≥ 1 payment by 31/12; ≥ 5% of activated within 30 days | 0 payments with ≥ 10 activated → test the offer, not the price |
| 8 | Watermark → visit (referral loop) | visits to `/?ref=wm` | any; track from the first sent quote | — |

## Honest maths: the PRD targets don't add up

[estimate] PRD §9 asks for ≥ 200 tool users **and** ≥ 30 accounts. That needs 15% of tool users to sign up, about 5× the step-4 target above. At 3% × 50%, 30 accounts needs about **2,000 tool uses**, and 200 tool uses gives about **3 accounts**.

Also, sign-up only exists from about 22/11, and a new `pages.dev` site usually ranks slowly [opinion]. **The first payment depends on launch week (listings, Product Hunt, forum posts) and the Founding Member offer, more than on SEO.**

**Applied (CEO #10, 17/10/2026; also in PRD §9):** the only hard goal stays **≥ 1 payment by 31/12 (ideal 5)**. The leading indicators become:

| Metric | Target 31/12 [estimate] |
|---|---|
| Pages indexed | ≥ 10 |
| Tool uses (`calc_used` + `pdf_downloaded`) | ≥ 500 |
| Accounts (any source, by `signup_source`) | ≥ 10 |
| Activated (quote sent in 24 h) | ≥ 4 (≈ 40%) |
| Payments | ≥ 1 (ideal 5) |

**Checkpoint 15/12:** replace the step targets above with the real rates from the first weeks. The payment goal and the 30/04/2027 kill rule do not move. The first payment will most likely come from launch week (directories, forums, Product Hunt) and the Founding Member offer, not from SEO alone.

## How to measure at £0

- **Cloudflare Web Analytics:** visits per page, referrers (Product Hunt, forums, `?ref=wm`).
- **Anonymous event counter** (Worker; no IP or user ID). Existing events: `calc_used`, `calc_room_added`, `pdf_downloaded`, `quote_prefilled`, `cta_signup_click`. **Proposed new events:** `paywall_shown`, `checkout_started`, `reminder_tapped`, `mist_coat_on`.
- **Database:** account count by `signup_source` (first landing path, `sessionStorage`), `quote_sent`, `invoice_created`.
- **Polar dashboard:** orders by plan (Monthly / Yearly / Founding).
- **Google Search Console:** impressions, CTR and position per page.
- **Routine:** every Monday, 15 minutes. Copy the week's numbers into one local spreadsheet with one row per step and compare with the targets above. Nothing gets uploaded.

## Watermark link (the free referral loop)

Free PDFs and client pages carry "Made with PriceBrush". Link it to `https://pricebrush.pages.dev/?ref=wm` (no personal data) so step 8 is countable. Copy: **"Made with PriceBrush: free quote tools for decorators"**.
