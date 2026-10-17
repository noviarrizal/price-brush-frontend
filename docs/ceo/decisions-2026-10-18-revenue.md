# CEO decisions: "How can we get money FAST?" (18/10/2026)

Author: CEO advisor · Status: **Recommended. The founder signs off.** Nothing below has been applied to the PRD, plan, SEO, design, strategy or marketing docs, or to code.

Inputs read: `../strategy/decisions/005-fastest-path-to-revenue.md` (strategist), `../marketing/fast-revenue-2026-10-18.md` (marketing), `../PRD.md` §7, §9 and decisions 17 + 18 Oct, `./decisions-2026-10-17.md`, `./decisions-2026-10-18.md`, `../plan/2026-10-17-launch-31-oct.md`, `../marketing/launch-plan.md`. Code checked: `app/routes/decorating-quote-template.tsx:305-320` (the "Pricing the next job?" card shown after a PDF download).

Labels: **[fact]** = sourced · **[estimate]** · **[opinion]** · **not verified**. Not legal or tax advice.

## The short answer

**PriceBrush cannot make fast money in 2026.** I checked both memos and agree. The problem is not the product or the price. Almost no UK decorators know we exist yet. The only real path to the first payment is **Founding Member £49 (and Pro £9) from launch week, 22–30/11**. The job for the next 14 days is to remove what could block that, without touching the 31/10 build.

**The money target to plan around:**

| | By 31/12/2026 | By 31/03/2027 |
|---|---|---|
| **Plan for (put this in your personal budget)** | **£0** | **£0** |
| Realistic hope | 1–3 Founding sales = about **£35–£105** in your hand | about £0–£400 |
| Goal (PRD §9) | ≥ 1 payment (any amount) | — |

All £ figures are [estimates] from the two memos. About £35 reaches you from each £49 sale after Polar's fees, payout costs and currency conversion. The exchange rate is not verified. **Don't count PriceBrush money for rent or bills until it is in your bank.**

## Summary table

| # | Decision | Recommendation | One-line reason | Confidence |
|---|---|---|---|---|
| 1 | Money target | **Accept**: plan for £0; hope for £35–£105 by 31/12 | Both memos agree, and nothing I found changes it | Medium |
| 2 | Founding £49 at launch (22/11) as the only first-money path, Pro £9 next to it | **Accept** | It is the only offer with buyers, a checkout and a true promise | High |
| 3 | Apply to Polar now | **Accept with changes**: account, ID and payout **now**; press "Submit" **when the site is live (Sun 01/11)**, with products set up but not shown | Polar says "build first, submit second"; the site doesn't exist yet. 01/11 + 14 days = 15/11, still before 22/11 | High |
| 4 | Test checkout with a 100% discount code | **Accept** | Polar warns real-card tests can block the card or the account | High |
| 5 | No pre-sale before checkout | **Accept** | Polar restricts pre-orders; selling before the product exists breaks our truth rule | High |
| 6 | No template pack, £15 watermark removal, done-for-you service, affiliates, AppSumo or ads in 2026 | **Accept** | Each one needs buyers we don't have, or is banned by Polar, or costs MVP hours | High |
| 7 | Strategist "Option C" (07/11) vs marketing "early start" (~14/11) | **Merge into one: fallback only**, decided Sat 07/11; reject "early start" while the app is on track | Early start wins about 8 days at near-zero traffic and costs MVP hours | Medium |
| 8 | "Tell me when it opens" email line | **Accept with changes**: quote template only, privacy line added, exactly one email, then delete; added after the deploy, never before it | PECR allows a message the person asked for; it must not delay 31/10 | Medium |
| 9 | Etsy check | **Accept with changes**: optional 10-minute check after the deploy; one £9 listing **only after launch week**, only if 4 conditions pass | Etsy is the only marketplace with buyers, but November hours belong to the MVP | Low |
| 10 | Join the Decorators Forum Facebook group | **Accept strategist**: ask to join **this week** (was 1–7 Nov); no posting | Admin approval may take days; it costs 15 minutes | High |
| 11 | "Do I need money soon?" (personal) | **Your call. Pick one for Nov–Dec, not a 50/50 split** (see §11) | Paid frontend work is faster money; splitting 8–10 h makes both fail | — |

---

## 1. Money target

**What I checked:** the fee maths. [fact] Polar charges 5% + 50¢, plus 1.5% on non-US cards. Payouts cost 0.25% + $0.25, $2 for each month with payouts, and 1% currency conversion ([Polar fees](https://polar.sh/docs/merchant-of-record/fees), cited in memo 005). [estimate] £49 incl. VAT is £40.83 before VAT. Minus about £3.56 in fees, that leaves about £37 (PRD §7). Payout costs bring it to about £35. Both memos land on 0–3 sales by 31/12 using the same funnel (`../marketing/funnel.md`). Marketing's "best case" (5 sales, about £190–£220) is possible, but I would not plan on it.

**Tip [opinion]:** take **one** payout in January, not small ones. Each month with a payout costs $2.

**Against:** setting £0 as the plan can feel like giving up. **Change my mind:** real conversion data at the 15/12 checkpoint.

## 2. Founding £49 at launch as the only first-money path

**Checked independently:** the PRD decision of 15/10 (Founding £49, 50 places, until 31/01/2027) and the funnel maths in `funnel.md` (4 activated users × 5% is less than 1 Pro payment, so a one-off offer has to carry it). Marketing found no buyers for decorator templates on Gumroad (5 results for "painting quote template", the only real match with 0 ratings). **Recommendation: Accept.** Keep Pro £9 next to it: one Pro month also meets the "≥ 1 payment" goal. Don't lower £49 and don't hand out discount codes "to get a first sale".

**Against:** it bets all of 2026 on one week and one checkout. **Change my mind:** ≥ 4 activated users and 0 sales by 15/12 means ask those users why, then change the offer.

## 3. Polar: when and how to apply

**What I checked today [fact]:**
- Polar's main review happens **"before your first payout"** and "can take up to 14 days" ([account reviews](https://polar.sh/docs/merchant-of-record/account-reviews)).
- Polar's own tip is **"Build first, submit second"**: set up products, checkout links and webhooks, and have "a live website pointing to it". The more reviewers can see, the faster they approve.
- The steps are: submit business details → identity check (passport/ID + selfie) → payout account through Stripe Connect Express. The docs don't say if the ID and payout steps can be done before you submit (**not verified**).
- A payout requested during a review is "Held for review". The docs **don't say** whether you can sell before approval (**not verified**).
- Indonesia is on the payout list. Whether Stripe accepts an "individual" business type for Indonesia is **still not verified**: the docs point to Stripe's checker, and only the real form will tell you ([supported countries](https://polar.sh/docs/merchant-of-record/supported-countries)).
- Lemon Squeezy (the backup) is being moved into Stripe. I found only third-party reports and **could not verify** that it still opens new stores.

**Where I differ from the memos:** strategist says do everything on 18–19/10; marketing says apply by 24/10. Neither noticed that `pricebrush.pages.dev` **does not exist until about 29–31/10**. Submitting before there is a site goes against Polar's own advice.

**Recommendation: Accept with changes.**
1. **This week (1 h, already budgeted in CEO 17/10 action #4):** create the Polar organisation with the PriceBrush mailbox. Set tax to **Inclusive**. Go as far as Polar lets you through identity and payout. **Write down whether "individual" is accepted.** Don't publish anything.
2. **Sun 01/11 (0.5 h), once the site is live:** create the two products (Pro £9/month and Founding £49 one-off), not linked from the site. Press **Submit**. In "how you intend to use Polar", write the truth: free tools live now, paid app and checkout from 22/11, Founding sold only once the app works. In the same message, ask: *"Before launch I may sell Founding Member with an immediate licence key that removes the watermark and adds a logo on our free templates, with the full app later. Is that acceptable, or would you treat it as a pre-order?"*
3. If "individual" is refused, look at Lemon Squeezy by **Sat 07/11** (0.5 h). If both fail, **stop and tell me** before any checkout code is written.

**Against:** waiting until 01/11 to submit loses 13 days of review time. **Change my mind:** if Polar's flow forces "Submit" first and won't let you check "individual" without it, submit this week with an honest description ("site live on 31/10").

## 4. Test checkout with a 100% discount code

**Checked [fact]:** Polar says don't test with real cards: processors may treat it as card testing and "block the card or account". Use the sandbox, a free product or a 100% discount code. Reviewers themselves prefer "a 100% discount code by email" ([account reviews](https://polar.sh/docs/merchant-of-record/account-reviews)). The launch plan still says "make a real £49 Founding test purchase and refund it" (`launch-plan.md`, Sun 22 Nov). That would also lose about £4 in fees, which Polar doesn't return on refunds. **Recommendation: Accept.** **Against:** a 100% code doesn't test a real card payment. **Change my mind:** nothing; Polar's warning is clear.

## 5. No pre-sale before checkout

**Checked [fact]:** Polar's acceptable-use page lists "Pre-orders and paid waitlists" under businesses that "require a closer review and may not be accepted" ([acceptable use](https://polar.sh/docs/merchant-of-record/acceptable-use)). CEO 18/10 P1: no Founding card or "X of 50" before checkout works.

**One correction to memo 005:** it says anyone who pre-pays "can get a full refund within 14 days". That right is for **consumers** only. [fact] A consumer is "an individual acting for purposes which are wholly or mainly outside that individual's trade, business, craft or profession" ([CCR 2013 reg 4](https://www.legislation.gov.uk/uksi/2013/3134/regulation/4)). A decorator buying a work tool is probably **not** a consumer [opinion, not legal advice]. So the real reasons are Polar's rule and our truth rule, not the 14 days. The answer stays the same.

**Recommendation: Accept.** **Against:** a few keen decorators might pay early and give an early signal. **Change my mind:** Polar saying **in writing** that a Founding pre-order is fine. The truth rule would still apply.

## 6. No side products in 2026

**Checked:** Polar **prohibits** "Human services" ([acceptable use](https://polar.sh/docs/merchant-of-record/acceptable-use)), so done-for-you is out on our checkout. Gumroad showed no buyer pool (marketing's search). Our autocomplete data asks for **free** templates (memo 005: 33 of 410 quote suggestions and 76 of 413 invoice suggestions contain "free"; none contain "buy", "paid" or "etsy"). Affiliates: memo 005's sum gives about £1 by 31/12. A £15 watermark removal needs the same build as Founding, for a third of the money, and undercuts £49. **Recommendation: Accept** both memos' "no" list: template packs (except the narrow Etsy test in #9), £15 watermark removal, done-for-you, affiliate links, AppSumo, ads. **Against:** a template pack is the only thing that could be on sale in October. **Change my mind:** #9's Etsy signals.

## 7. Option C vs "early start": merged

**Where they differ:** strategist builds C only as a **fallback** if the app is late. Marketing builds the same thing as an **optional early start** from ~14/11 if it is cheap.

**What I checked:**
- [fact] Polar lists "License Keys" as a way it delivers products, so a licence key is delivered at purchase ([acceptable use](https://polar.sh/docs/merchant-of-record/acceptable-use)).
- [fact] The licence check `POST /v1/customer-portal/license-keys/validate` "doesn't require authentication and can be safely used on a public client". It needs only `key` and `organization_id` ([API reference](https://polar.sh/docs/api-reference/customer-portal/license-keys/validate)).
- [fact, tested today] Both memos had "can a browser call it (CORS)?" as not verified. I sent a browser-style preflight from `https://pricebrush.pages.dev` to `api.polar.sh`. It answered `200` with `access-control-allow-origin: *` and allows `POST` and `Content-Type`. **So a browser-only check works. No backend is needed.** (A preflight is not a full call with a real key; the lead should still try one real key in the sandbox.)
- [fact] If a buyer is a consumer, the trader must not start supplying digital content in the 14 days unless the buyer gave **express consent** and **acknowledged losing the right to cancel**. Without both, the buyer pays nothing if they cancel ([CCR reg 37](https://www.legislation.gov.uk/uksi/2013/3134/regulation/37)). [fact] Polar checkout supports a **required checkbox** field per product, "very useful for terms acceptance" ([custom fields](https://polar.sh/docs/features/custom-fields)). So the consent can be captured.

**Recommendation: one decision on Sat 07/11, fallback only.**
- **Go only if all of these are true:** (a) the paid app (voice, invoice, checkout) looks likely to miss Sun 22/11; (b) the new app date is no later than 31/12, and the copy says that date; (c) Polar has not objected to the licence-key question from #3; (d) the lead says ≤ 3 agent hours.
- **If go:** build it with the invoice template (by 14/11). Launch week then goes ahead with a real Founding offer. Add a required checkbox at checkout: *"Start my Founding benefits now. I understand I lose my 14-day right to cancel once the licence key is delivered."*
- **If the app is on track: skip it.** I reject marketing's "early start" while the app is on time. It wins about 8 days of sales when traffic is near zero [estimate: £0–£35], and it takes hours from the MVP.

**Against:** if the app slips for long, Founding becomes "logo on a free template, app later". That is a weak offer and close to a pre-order. **Change my mind:** Polar saying no to the licence-key idea means no C; move launch week instead (at most to Sun 06/12, so a payment by 31/12 is still possible).

## 8. "Tell me when it opens" email line

**What I checked:**
- [fact] The ICO says solicited messages can be sent without consent or a soft opt-in, because the person has "specifically asked you to send that message". You must still not hide your identity, and you "must provide a valid contact address for recipients to opt out". Sole traders count as **individual subscribers** ([ICO, PECR email rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/)). So one email that does exactly what they asked is fine. A second, different email would not be.
- [opinion, not legal advice] UK GDPR still needs a short notice of what you do with the address, and the privacy policy only arrives on 21/11. One line next to the offer covers it.
- [fact, code] The calculator has **no** PDF download. Only the quote template has a post-download card ("Pricing the next job?", `decorating-quote-template.tsx:305-320`). Marketing's "both free tools" should be "the quote template, and the invoice template from 14/11".

**Recommendation: Accept with changes.**
- Put it in the quote template's post-download card, under the existing text. **Not on the PDF**, and not on the calculator. Exact copy:
  > **The full app opens in late November.** Want one email the day it opens, with the launch price? Email **{PriceBrush mailbox}** with the word "App". I'll send that one email, then delete your address. — Arif
- The one email (marketing's text) goes out only **after** the 22/11 gate passes. Add as the last line: *"That's the one email I promised, and I've now deleted your address. If you have a question, just reply."* Then delete the list.
- **Timing:** add it in the T14 buffer **only if T13 has passed with time left**, otherwise in the first week of November. It must never delay the deploy. Traffic in week 1 is near zero (CEO 18/10 P4), so a week's delay costs almost nothing.
- If the app date moves, change "late November" the same day (P1 rule).

**Against:** a mailto link is clumsy on desktop, and few people will use it. **Change my mind:** 0 emails by 20/11 with ≥ 300 tool uses means the line or the audience is wrong; rewrite it once.

## 9. Etsy check

**What I checked:** Etsy blocked both agents (403), so demand is **not verified**. [fact] Etsy's own fees page says a one-time set-up fee **may** apply when you open a shop, and shows no amount; third parties report $15–$29 ([search result for etsy.com/legal/fees](https://etsy.com/legal/fees), [Value Added Resource](https://www.valueaddedresource.net/etsy-variable-shop-setup-fee/)). Any fee breaks the £0 rule.

**Recommendation: Accept with changes.** The founder may do a **10-minute check after the deploy** (by Sat 07/11) in his own browser. Search Etsy UK for "painter decorator quote template" and "decorating invoice template UK". Write one line in the PRD open question. Make **one £9 listing (≤ 3 h)** only if **all four** are true:
1. ≥ 3 listings made for UK decorators, each with ≥ 50 reviews (marketing's threshold; strategist's 100+ is stricter, and both are guesses).
2. Etsy's set-up screen shows **£0** set-up fee.
3. The MVP is on track at the 07/11 checkpoint.
4. You do it **after launch week** (from Mon 30/11), never in November.

**Against:** waiting until 30/11 removes most of the "fast" reason for Etsy. **Change my mind:** a strong signal (thousands of sales on UK decorator templates) would justify 3 h in the week of 01/11, but only if the 31/10 site is already live.

## 10. Facebook group: ask to join now

**Checked:** `launch-plan.md` places the request in 1–7 Nov and has the exact membership answer. Memo 005 points out that admins can take days. Asking now costs 15 minutes and changes nothing else. **Recommendation: Accept strategist.** Ask to join this week, using the exact answer in `launch-plan.md`. **No posting.** Read the rules once you're in. **Against:** none that I found. **Change my mind:** the group asking only decorators to join (accept the no; don't reapply).

## 11. If you need money soon

This is a personal question, so here is my honest answer.

- **PriceBrush will not pay your bills in 2026.** Plan for £0 from it this year.
- **If you need money in the next 1–3 months** (rent, family, debt), paid frontend work is very likely faster than PriceBrush [opinion; I did not check freelance rates or platforms]. That is a good choice, not a failure.
- **But don't split 8–10 h a week 50/50.** The MVP already only just fits. Half the hours means a late app and a weak freelance job.
- **So pick one for November–December:**
  - **(a) PriceBrush:** keep the plan in this memo.
  - **(b) Money first:** finish 31/10 (it is almost done, and the free pages keep growing in Google while you're away). Then pause the MVP, take paid work, and restart in January. The first payment moves to Q1 2027. The 30/04/2027 review date doesn't move.
- Either way, look after yourself. A full-time job plus 8–10 h a week is already a lot.

Tell me (a) or (b). I will not assume.

---

## Kill / continue signals (with dates)

| Date | Signal | If good | If bad |
|---|---|---|---|
| By Sat 24/10 | Polar accepts "individual" for Indonesia | Continue | Check Lemon Squeezy by 07/11; if both fail, **stop checkout work** and rethink payments |
| Sat 31/10 | Free tools live | Submit to Polar 01/11 | Apply the CEO 18/10 cut order; launch as soon as T13 passes |
| Sat 07/11 | MVP on track for 22/11? (lead's plan) | Skip Option C | Option C if all 4 conditions in #7 pass; otherwise move launch week (latest Sun 06/12) |
| By Sun 15/11 | Polar review finished | Continue | Email support@polar.sh; if no answer by 20/11, decide: launch with payouts held, or switch to the backup |
| Sun 22/11 | Checkout gate passes (100% code, webhooks, "X of 50", VAT incl., Cancel + Undo) | Show the Founding card; send the "tell me" email | Move the whole week; never launch without checkout |
| Mon 30/11 | Launch-week tally | ≥ 1 sale: continue | 0 sales: keep going to 15/12; no price change yet |
| Tue 15/12 | Checkpoint (PRD §9) | Replace guesses with real rates | ≥ 4 activated + 0 sales: ask them why. < 4 activated: audience problem; December hours go to the FB group and listings, not new features |
| Thu 31/12 | ≥ 1 payment | Goal met | Missed goal; continue to the 30/04/2027 review. **The kill date doesn't move** |

## Top 3 risks

| # | Risk | Mitigation | Owner |
|---|---|---|---|
| 1 | **The MVP (voice, invoice, checkout, sign-in) doesn't fit 1–21 Nov.** There is no MVP plan yet in `docs/plan/`, and checkout is what makes the first payment possible. | The lead writes the 1–21 Nov plan with a clear "minimum to take a payment" line and a cut order, ready by 31/10. 07/11 checkpoint (#7). Checkout and sign-up come before polish. | pricebrush-lead (started by founder) |
| 2 | **Polar refuses or delays the account** (Indonesia "individual", or review past 22/11). | Account and ID this week; submit 01/11; ask the licence-key question in writing; backup check by 07/11. | Founder |
| 3 | **New revenue ideas eat the 31/10 build.** | Nothing in this memo is built before the deploy. Line D goes in only after T13 passes. Etsy waits until after launch week. | Founder |

## Next actions, 18–31 Oct (in order)

The 31/10 build stays first. Only about **0.75 founder hours are new**; the rest was already planned.

| # | When | Action | Founder h | Who |
|---|---|---|---|---|
| 1 | Sun 18/10 | Read this memo. Reply Accept or change per row, and (a) or (b) for #11 | 0.25 | Founder |
| 2 | By Sat 24/10 | Polar: create the organisation, set tax to Inclusive, do ID + payout as far as allowed, write down the "individual" result. Don't publish anything (already budgeted in CEO 17/10) | 1 | Founder |
| 3 | By Sat 24/10 | Ask to join the Decorators Forum Facebook group with the exact answer in `launch-plan.md`. No posting (moved from 1–7 Nov) | 0.25 | Founder |
| 4 | This week | Keep running the 31/10 plan: Block A → B → C → D (CEO 18/10 prompts F1, L2, F2) | (planned) | Founder starts pricebrush-frontend / pricebrush-lead |
| 5 | This week | Apply the doc edits below for strategy and marketing | 0 | Strategist, marketing |
| 6 | This week | Add line D to the quote-template post-download state in `screens.md` | 0 | UI/UX |
| 7 | Thu 29/10 or Fri 30/10 (buffer) | Run **/pb-lead**, prompt L3 below: apply the edits and write the 1–21 Nov MVP plan | 0.5 | pricebrush-lead (started by founder) |
| 8 | After T13 passes, only if time is left | Run **/pb-frontend**, prompt F3 below (line D) | 0.25 | pricebrush-frontend (started by founder) |
| 9 | Sat 31/10 | Free tools live (plan) | (planned) | Founder |
| — | Sun 01/11 | Polar: products set up, not linked; press Submit with the licence-key question | 0.5 | Founder |
| — | By Sat 07/11 | Optional 10-minute Etsy check (#9); Option C go/no-go (#7) | 0.4 | Founder |

**Prompt L3 — /pb-lead**
```
Read docs/ceo/decisions-2026-10-18-revenue.md. I accept it [list any rows you change]. Apply the "Exact edits" marked [pricebrush-lead]: PRD decisions log "Keputusan 18 Okt 2026 (revenue)", PRD open questions, and docs/plan/2026-10-17-launch-31-oct.md (line D in T14, only if T13 passed with time left). Then write docs/plan/2026-11-01-paid-mvp.md for 1–21 Nov: tasks of 2 h or less, a line marked "minimum to take a payment" (sign-in, one quote, Polar checkout for Pro £9 and Founding £49, webhooks, the Sun 22/11 gate with a 100% discount code), a cut order below that line, and a 07/11 checkpoint. Add a short contingent spec for Option C (Polar licence key on the Founding product, key field on the free templates, browser call to POST /v1/customer-portal/license-keys/validate, then hide the watermark and show logo upload, required "start now" checkbox at checkout). Test one real key in Polar's sandbox before saying it works. Tell me your hours estimate for each part. Do not commit or push.
```

**Prompt F3 — /pb-frontend (only after T13 passes)**
```
Read docs/ceo/decisions-2026-10-18-revenue.md #8 and docs/design/screens.md (quote template, post-download state). In app/routes/decorating-quote-template.tsx, inside the card shown after the PDF is downloaded (hasDownloaded), add this text under the existing paragraph, with the address as a mailto link with subject "App": "The full app opens in late November. Want one email the day it opens, with the launch price? Email {mailbox} with the word "App". I'll send that one email, then delete your address. — Arif". Mailbox: [paste the PriceBrush address]. Nothing on the PDF, nothing on the calculator. Check 360 px and 1440 px, light and dark, contrast AA. Do not commit or push.
```

## Exact edits to apply if accepted (owners in brackets; not applied)

- **PRD** [pricebrush-lead]
  - Decisions log, new block **"Keputusan 18 Okt 2026 (revenue)"**:
    - "Target uang: rencanakan £0 di 2026; harapan realistis 1–3 Founding (~£35–£105 bersih) sampai 31/12. Satu-satunya jalan: Founding £49 + Pro £9 mulai launch week 22/11."
    - "Polar: akun + verifikasi ID + payout minggu ini; Submit review 01/11 setelah situs live; tanyakan tertulis soal license key vs pre-order."
    - "Tes checkout pakai kode diskon 100%, bukan kartu asli."
    - "Tidak ada pre-sale, template pack, watermark £15, jasa done-for-you, affiliate, AppSumo, iklan di 2026."
    - "Option C (license key di template gratis) hanya cadangan, diputuskan 07/11 dengan 4 syarat; 'early start' ditolak."
    - "Baris 'tell me when it opens' di kartu setelah download template quote; satu email saja, lalu alamat dihapus."
  - Open questions: change "Daftar Polar…" to "Daftar Polar: akun + ID minggu ini, Submit 01/11 (review ≤ 14 hari)". Add: "Polar: apakah Founding dengan license key langsung dianggap pre-order? (tanya saat Submit)". Add: "Lemon Squeezy masih terima toko baru? (cek hanya kalau Polar menolak 'individual')". Add: "Etsy UK: cek 10 menit setelah 31/10 (4 syarat di CEO revenue #9)".
- **Plan** `docs/plan/2026-10-17-launch-31-oct.md` [pricebrush-lead]: T14 adds "line D (CEO revenue #8), only if T13 passed with time left; else first week of November". Out of scope adds "Option C: contingent, decided 07/11".
- **`docs/marketing/launch-plan.md`** [marketing]
  - Sun 22 Nov: replace "make a real £49 Founding test purchase on Polar and refund it" with "test the Founding and Pro checkout with a **100% discount code** (Polar docs; never a real card), then check webhooks, the 'X of 50' count, VAT incl. and Cancel + Undo".
  - Move the Facebook membership request from 1–7 Nov to **18–24 Oct**.
  - Add: line D from 31/10 or first week of Nov; one "tell me" email on Sun 22/11 evening after the gate, `?ref=list`, with the new last line from #8; then delete the list.
  - 1–14 Dec row: the "tell me" list is **not** part of the sign-up email (they asked for one email only).
- **`docs/marketing/funnel.md`** [marketing]: new step "tell-me emails received", target ≥ 10 by 22/11 [estimate].
- **`docs/marketing/fast-revenue-2026-10-18.md`** [marketing]: status → "Accepted with changes (CEO 18/10 revenue)"; "both free tools" → "quote template (invoice template from 14/11)".
- **`docs/strategy/decisions/005-fastest-path-to-revenue.md`** [strategist]: status → "Accepted with changes (CEO 18/10 revenue)". Fix the 14-day refund sentence: it applies to **consumers** only (CCR reg 4); decorators buying for work are probably not consumers. CORS: now "preflight OK, `access-control-allow-origin: *` (CEO, 18/10)".
- **`docs/design/screens.md`** [UI/UX]: quote template, post-download state: add line D (exact copy in #8), body text size, mailto link, no new button.
- **SEO:** no changes.

## Sources checked for this memo

- Polar: [acceptable use](https://polar.sh/docs/merchant-of-record/acceptable-use) · [account reviews](https://polar.sh/docs/merchant-of-record/account-reviews) · [licence-key validate](https://polar.sh/docs/api-reference/customer-portal/license-keys/validate) · [custom fields](https://polar.sh/docs/features/custom-fields) · [supported countries](https://polar.sh/docs/merchant-of-record/supported-countries) · CORS preflight to `api.polar.sh` (curl, no data sent)
- UK law: [CCR 2013 reg 4](https://www.legislation.gov.uk/uksi/2013/3134/regulation/4) · [reg 37](https://www.legislation.gov.uk/uksi/2013/3134/regulation/37) · [ICO PECR email rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/)
- Etsy set-up fee: [Etsy fees](https://etsy.com/legal/fees) (via search result) · [Value Added Resource](https://www.valueaddedresource.net/etsy-variable-shop-setup-fee/)
- Lemon Squeezy status: third-party only ([fungies.io](https://fungies.io/lemon-squeezy-stripe-acquisition-saas-founders-2026/), [dodopayments](https://dodopayments.com/blogs/lemonsqueezy-alternatives)), **not verified**
- Stripe "individual" for Indonesia: **not verified**

**Still not verified:** whether Polar lets you sell before the review is approved; whether Polar would call a licence-key Founding offer a pre-order; Stripe "individual" for Indonesia; Lemon Squeezy new stores; Etsy demand and fee for you; freelance rates.
