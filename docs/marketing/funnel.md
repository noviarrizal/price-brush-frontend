# Funnel (v0.2)

Date: 17/10/2026 · Author: marketing lead · Status: **targets Accepted 17/10/2026** (`../ceo/decisions-2026-10-17.md` #10) · Events: `../seo/measurement.md` §1 (existing) plus 4 proposed below

## Goal and leading indicators to 31/12/2026 (accepted)

| Metric | Target by 31/12/2026 | Source |
|---|---|---|
| **Payments (Founding or Pro)** | **≥ 1 (ideal 5): the only hard goal** | Polar dashboard |
| Pages indexed | ≥ 10 | GSC |
| Tool uses (`calc_used` + `pdf_downloaded`) | ≥ 500 | Event counter |
| Accounts (any source, split by `signup_source`) | ≥ 10 | Neon |
| Activated (first quote sent within 24 h) | ≥ 4 (≈ 40%) | `quote_sent` |

**Checkpoint 15/12/2026:** replace every step estimate below with the real rate, then decide using "If it's not working" in `launch-plan.md`. The payment goal and the 30/04/2027 stop-or-pivot review do not move.

The first payment will most likely come from launch week (22–30 Nov: listings, the forum post, Product Hunt) and the Founding Member offer, not from SEO alone.

All step targets below are **[estimates]** I set as starting guesses. There is no data yet and no benchmark source I could verify.

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
| 7 | Activated → paid | Polar orders ÷ activated accounts | ≥ 1 payment by 31/12; ≥ 5% of activated within 30 days | 0 payments with ≥ 4 activated at 15/12 → test the offer, not the price |
| 8 | Watermark → visit (referral loop) | visits to `/?ref=wm` | any; track from the first sent quote | — |

## Do the targets add up? (checked)

[estimate] 500 tool uses × 3% sign-up click × 50% complete ≈ **7.5 accounts** from public pages. The other ~3 must come from direct launch-week visits (listings, forum post, Product Hunt), which skip the calculator. 10 accounts × 40% ≈ **4 activated**. Getting 1 payment from 4 activated users needs 25%, far above step 7's 5%. So **the Founding Member offer has to carry the first payment**. If tool uses hit 500 but Founding sales are 0 on 15/12, the problem is the offer or the audience, not traffic.

(The old PRD targets of 200 tool users → 30 accounts needed 15% sign-up. Replaced 17/10/2026.)

## How to measure at £0

- **Cloudflare Web Analytics:** visits per page, referrers (Product Hunt, forums, `?ref=wm`).
- **Anonymous event counter** (Worker; no IP or user ID). Existing events: `calc_used`, `calc_room_added`, `pdf_downloaded`, `quote_prefilled`, `cta_signup_click`. **Proposed new events:** `paywall_shown`, `checkout_started`, `reminder_tapped`, `mist_coat_on`.
- **Database:** account count by `signup_source` (first landing path, `sessionStorage`), `quote_sent`, `invoice_created`.
- **Polar dashboard:** orders by plan (Monthly / Yearly / Founding). The Founding "X of 50 left" count comes from here, updated by hand, never estimated.
- **Launch-week referrers:** add `?ref=ph`, `?ref=fb-df`, `?ref=pdn`, `?ref=ukbf`, `?ref=dir-<name>` to every link we place, so Cloudflare shows which channel worked. No personal data in the parameter.
- **Google Search Console:** impressions, CTR and position per page.
- **Routine:** every Monday, 15 minutes. Copy the week's numbers into one local spreadsheet with one row per step and compare with the targets above. Nothing gets uploaded.

## Watermark link (the free referral loop)

Free PDFs and client pages carry "Made with PriceBrush". Link it to `https://pricebrush.pages.dev/?ref=wm` (no personal data) so step 8 is countable. Copy: **"Made with PriceBrush: free quote tools for decorators"**.
