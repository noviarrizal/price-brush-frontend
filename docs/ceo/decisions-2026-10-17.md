# CEO decisions — 17/10/2026

Author: CEO advisor · Status: **Recommended. The founder signs off.** Nothing below has been applied to the PRD, SEO, design, strategy, marketing docs or code.

Inputs read: `../PRD.md` (incl. decisions 15 Oct), `../strategy/decisions/001–004`, `../marketing/answers-2026-10-17.md`, `../marketing/messaging.md`, `../marketing/funnel.md`, `../seo/CHANGELOG.md` (v0.2), `../design/CHANGELOG.md` (v0.2), `../design/screens.md`. No earlier CEO memos exist, so nothing here reverses one.

Labels: **[fact]** = sourced · **[estimate]** = calculation or guess · **[opinion]** = judgement · **not verified** = I could not check it.

## Summary table

| # | Decision | Recommendation | One-line reason | Confidence |
|---|---|---|---|---|
| 1 | Launch lead 31 Oct | **Accept with changes**: calculator (multi-room + labour/price) + quote template with working pre-fill on 31 Oct; invoice template 14 Nov; fixed cut order | The trade calculator SERP is beatable; the template is the only conversion step before sign-up exists | Medium |
| 2 | Headline + differentiator | **Accept with changes**: keep strategist's differentiator (visible decorator maths); use marketing's H1 **"Room sizes in. Priced quote out."** until voice is live | Voice isn't live until late Nov; the H1 must be provable on 31 Oct | Medium |
| 3 | Reddit pain points | **Accept with changes**: content + mist-coat switch (P0) + WhatsApp reminder (P1, cut first if late); Reddit = homeowner channel only | Two cheap items that support the maths claim and retention; no new server or email | Medium |
| 4 | Memo 004 | **Accept with changes**: marketing's Queezy + "No per-user fees" rules; Direct Line **can now be dated 15/01/2026** | Comparison must be fair; the date is now checked | High |
| 5 | Visual direction Coachline | **Accept** | Distinct in the field; cream + gold line + yellow CTA separate us from PainterPal's green | Medium |
| 6 | Prices "incl. VAT" | **Accept**: "£9 a month, incl. VAT"; set Polar to **Inclusive** explicitly | Polar's UK default is inclusive; "+ VAT" would be wrong | High |
| 7 | Cancel | **Accept marketing's version**: 1 tap cancels at period end + Undo toast + "Resume Pro" | Keeps "Cancel in one tap" true; Polar supports un-cancel (checked) | High |
| 8 | Client Accept button | **Accept**: yellow for MVP; own colours later as part of Pro "your logo", with contrast fallback | Zero build cost, AA contrast guaranteed | High |
| 9 | WhatsApp icon | **Accept with changes**: official glyph, unmodified, word "WhatsApp" next to it, never a verb, no partner claim; fall back to generic bubble if the pack can't be used unmodified | Meta's rules checked; recognition helps the client tap | Medium |
| 10 | PRD success targets | **Accept with changes**: keep ≥ 1 payment; change to ≥ 500 tool uses, ≥ 10 accounts, ≥ 4 activated; checkpoint 15/12 | Current 200 → 30 needs 15% sign-up, which is not realistic | Medium |

---

## 1. Launch lead on 31 Oct

**Decision:** what ships first. **At stake:** pages that are live earlier get indexed earlier, and November traffic feeds the 31 Dec payment.

**Inputs:** strategist (memo 001, option B) and marketing agree. Marketing adds one condition: the hand-over must work on day one. I agree with both.

**Checked myself:** `../seo/CHANGELOG.md` v0.2 says the template SERPs are full of 10+ small UK tools (difficulty Medium) and the "paint calculator" head term belongs to B&Q, Dulux and Wickes. Marketing counted the autocomplete files: 1,048 paint rows against 410 quote and 413 invoice rows (`../seo/data/*.csv`). [fact] PRD §9: there are no accounts before the MVP (1–21 Nov), so on 31 Oct the quote template is the only next step after the calculator.

**Recommendation: Accept with changes.**
- 31 Oct: `/paint-calculator` with "+ Add another room", day rate → days → labour £ → price, labelled **"Your price at your day rate"**. Primary button **"Turn this into a quote"** opens `/decorating-quote-template` pre-filled, one line per room and surface, showing the working (e.g. "Living room walls · 2 coats · 38 m² · 0.8 day — £160.00").
- 14 Nov: `/decorating-invoice-template`, reusing the quote PDF.
- **Cut order if behind on 28 Oct** (drop from the bottom first): (1) calculator single room + litres + days + price, (2) quote template + PDF, (3) pre-fill hand-over, (4) multi-room, (5) separate walls / ceiling / woodwork switches, (6) mist-coat switch. Items 1–4 must ship on 31 Oct; 5–6 can follow the next week.

**Strongest argument against:** most calculator users will be homeowners (memo 004: all 16 UK Reddit posts that mention decorators were written by homeowners), so we may rank for traffic that never pays.
**What would change my mind:** `quote_prefilled ÷ calc_used` < 2% **and** `calc_room_added ÷ calc_used` < 5% by 15/12 → move December hours to the quote template and the day-rate guide.

## 2. Headline + differentiator

**Decision:** the H1 and the one thing we say we do better. **At stake:** copy goes live 31 Oct. Changing it after indexing costs time and rankings.

**Where they disagree:** the strategist wants "Say the rooms. Get a priced quote." Marketing wants "Room sizes in. Priced quote out." **I side with marketing on the H1, and with the strategist on the differentiator** (they actually agree on the differentiator).

**Why:** [fact] Voice ships in the paid MVP, 1–21 Nov (PRD §9), so for about 3–4 weeks the H1 would promise something visitors can't try. Marketing quotes fixxa.ai as "Say the job in a voice note…" (I did not re-open fixxa.ai). [opinion] The home H1 carries little SEO weight; the calculator page H1 is the one that ranks, so the risk of the less warm line is small. "60 seconds" goes: both agents found it in QuoteRocket's and TradeQuoteAI's titles.

**Recommendation: Accept with changes.**
- Keyword line: "Quote and invoice app for UK painters and decorators"
- **H1: "Room sizes in. Priced quote out."**
- Sub: "Coats, litres, days and labour worked out from your day rate. Every number shown, every line yours to change. Made for UK decorators."
- CTA until the MVP: "Price a room free" → `/paint-calculator`. After the MVP: "Start a free quote".
- Replace "quote → invoice in one tap" everywhere with **"When it's accepted, it's an invoice."**
- PRD §1 positioning becomes memo 002's line: "The UK decorator's quote app that does the maths: rooms to paint, days and price. No per-user fees. No sales calls. Cancel in one tap."
- Re-test in late Nov, once voice works: show both heroes to 5+ decorators (a 5-second test). If "Say the rooms" wins, swap then.

**Strongest argument against:** "X in. Y out." sounds engineered and makes us look like "a calculator", not an app. It also drops voice, our best demo.
**What would change my mind:** the 5-second test above, or a home-page CTR in GSC below 0.5% after 200+ impressions (marketing's funnel line).

## 3. Reddit pain points

**Decision:** whether late payers, underpricing and mist coat become features. **At stake:** every feature added to 1–21 Nov delays checkout.

**Inputs:** the strategist (memo 003 B) and marketing agree. Marketing adds the copy fixes and the point that Reddit is not a decorator channel. **Checked:** memo 004 §3 (16 of 2,300 UK posts mention decorators, all by homeowners; the "ai slop" reply to app builders in r/ukelectricians). Reminder via a `wa.me` link needs no domain or email, which fits PRD §3 ("no own email: no domain yet").

**Recommendation: Accept with changes.**
- P0: switch **"New plaster? Add a mist coat"** in the calculator and the quote engine (adds one coat, litres and drying time, as its own line). It is #6 in the 31 Oct cut order and is required in the Nov app.
- P1: Overdue status + **"Send a reminder"** with marketing's polite pre-filled WhatsApp text (no threats, no mention of "interest"). **Cut it first** if the build is behind on 14 Nov.
- Underpricing: no feature. Days × day rate already answers it.
- Reddit: 0 decorator-acquisition hours. Only answer r/DIYUK quantity or mist-coat questions where the rules allow and the calculator answers the question.

**Strongest argument against:** neither item moves the 31 Dec payment. The reminder only matters once an invoice is overdue, which will mostly be January.
**What would change my mind:** the build slipping on 14 Nov (cut the reminder), or `reminder_tapped` < 20% of Pro users by 31/01/2027 (memo 003: no automated reminders).

## 4. Memo 004

**Decision:** whether the verified prices change memos 001–003, and how we use them in public. **At stake:** a careless price claim is a brand and legal risk.

**Checked myself:** [fact] The Direct Line URL now redirects to aviva.com, so the original release can't be opened. Scottish Financial News dates the story **15/01/2026** and quotes 68% / 39% / 46%. It does **not** give a sample size or fieldwork dates ([scottishfinancialnews.com](https://www.scottishfinancialnews.com/articles/two-thirds-of-tradespeople-left-chasing-late-payments-research-finds)). So marketing's "no year" caution can be lifted, but the source is secondary.

**Recommendation: Accept with changes.**
- Every public price comparison includes Queezy (£8.99, from `../strategy/competitors.md`; I did not re-check it), is dated and is sourced. Say **"No per-user fees"**, never "cheaper" or "cheapest".
- For Powered Now, cite the App Store GB price (verified) or leave it out.
- Cite as: "Direct Line business insurance research, reported 15/01/2026 (sample size not published)", with the Scottish Financial News link. Tradefix: "n = 150, 2024".
- Deposit line: post-MVP. Deposit FAQ on the quote template: yes.
- Forum rule: always say "I'm building PriceBrush". Never post "what's your biggest headache?". Only link when the link answers the question.

**Strongest argument against:** with no surveys, the persona stays a guess (PRD §2).
**What would change my mind:** a forum whose rules allow founder feedback posts (e.g. The Decorators Forum). One honest feedback post there is fine.

## 5. Visual direction "Coachline"

**Decision:** approve the coach green / cream / yellow-for-the-primary-action look. **At stake:** all prototypes already use it (`../design/CHANGELOG.md` v0.2); changing it now costs design and frontend hours.

**Checked:** marketing's colour table (competitor HTML, 17/10). PainterPal's `#17492b` comes from its theme-color only, and PainterPal is a waitlist, not launched. I did not open PainterPal myself.

**Recommendation: Accept.** Make the set (cream + gold coachline + yellow CTA) the recognisable mark, not green alone. Keep brand green away from the WhatsApp button.

**Strongest argument against:** green and cream can read as "heritage" or even "accountant", not "fast app", and PainterPal could launch in a similar green.
**What would change my mind:** PainterPal launching green and cream, or decorators calling the page "old-fashioned" in the late-Nov 5-second test.

## 6. Prices "incl. VAT"

**Decision:** show £9 including or excluding VAT. **At stake:** the price line on the paywall and `/pricing`, and margin.

**Checked myself:** [fact] Polar's docs: Location-based is the default; only the US, Canada and India are exclusive; "the rest of the world (e.g. EU, UK) see inclusive pricing" ([polar.sh](https://polar.sh/docs/features/tax-inclusive-pricing)). [fact] Polar fees: Starter "5% + 50¢", plus "+1.5% for international cards (non-US)" ([polar.sh fees](https://polar.sh/docs/merchant-of-record/fees)). [estimate] £9 incl. VAT = £7.50 net. A 6.5% fee on £9 is about £0.59, plus 50¢ (about £0.37; exchange rate not verified), which leaves **about £6.50 a month**. On £49 Founding: about **£37**.

**Recommendation: Accept.** Show "£9 a month, incl. VAT". Paywall terms: "You'll pay £9 today (incl. VAT), then £9 every month." Set Polar tax behaviour to **Inclusive** explicitly, not Location-based.

**Strongest argument against:** margin (about £6.50, not £9). VAT-registered buyers (Sophie) think ex VAT.
**What would change my mind:** if the founder needs £9 net, show "£9 + VAT (£10.80)". **Not verified:** whether a VAT-registered UK buyer can get a VAT invoice from Polar. Check this in the dashboard before checkout opens.

## 7. Cancel

**Decision:** 1 tap + confirmation, or 1 tap + Undo. **At stake:** "Cancel in one tap" appears in the PRD positioning, the landing sub, the promise strip and the paywall. If the product needs two taps, the claim is false.

**Where they disagree:** the main assistant says tap + confirm. Marketing says tap + Undo. **I side with marketing.**

**Checked myself:**
- [fact] Polar cancel-at-period-end keeps the subscription "active" until the end of the period. Un-cancel is `PATCH /v1/subscriptions/{id}` with `{"cancel_at_period_end": false}`, and "goes back to renewing normally". It is "not possible once the subscription has actually ended" ([polar.sh](https://polar.sh/docs/features/subscriptions/manage)). So Undo works, but through our Worker, not the Polar portal (the portal does not document un-cancel).
- [fact] The UK DMCC subscription regime has been **brought forward to January 2027** (PM announcement 10/08/2026). It covers consumer subscriptions and requires an easy online exit "without having to take unnecessary steps" and an end-of-contract notice ([TLT](https://www.tlt.com/insights-and-events/insight/dmcc-act-subscription-contracts-regime-brought-forward-by-the-pm-what-do-businesses-need-to-know); [Lewis Silkin, 15/09/2026](https://www.lewissilkin.com/insights/2026/09/15/key-takeaways-the-subscription-shake-up-are-you-ready-for-january-2027-102o14n)). [opinion, not legal advice] Our buyers are mostly sole traders buying for their business, so they are probably not "consumers". But our first renewals will fall in that window, and one tap meets the spirit of the rules either way.

**Recommendation: Accept with changes (marketing's version).**
- Settings → Plan → **"Cancel plan"** (destructive ghost, away from other buttons): one tap sets cancel-at-period-end.
- Toast: **"Cancelled. You keep Pro until DD/MM/YYYY. [Undo]"**. Settings shows **"Resume Pro"** until that date.
- No retention offer and no survey wall. An optional one-tap "Why?" after cancelling.
- If the un-cancel call fails: show "Couldn't resume — try again", and make sure the cancel state is never wrong.
- Founding Member is a one-off payment, so there is nothing to cancel. Say this in the FAQ.
- PRD F12 acceptance: "Cancel = one tap (cancels at period end). Undo / Resume available until period end."

**Strongest argument against:** a confirmation is the norm, and Undo adds a Worker endpoint and a webhook (`subscription.uncanceled`) to a tight build.
**What would change my mind:** if pricebrush-lead finds Undo costs more than ~1 h extra, keep the confirmation and change every "Cancel in one tap" to **"Cancel in two taps. No phone call."** Never keep both the claim and the confirmation.

## 8. Client page Accept button

**Decision:** brand yellow or the decorator's colour. **At stake:** little for 31 Dec; a small Pro lever later.

**Checked:** `../design/design-system.md` says yellow on ink is 10.22:1. `../design/screens.md` client page puts the decorator's name and logo first.

**Recommendation: Accept.** Yellow for MVP. Post-MVP, "your logo and colours" is one Pro item, with an automatic contrast check that falls back to yellow.

**Strongest argument against:** Sophie pays to look professional and may dislike a PriceBrush colour on her quote.
**What would change my mind:** 3+ users asking for it unprompted.

## 9. WhatsApp icon

**Decision:** official WhatsApp glyph or a generic chat bubble. **At stake:** trademark risk vs the client recognising the button.

**Checked myself:** Meta's brand page: "Use the WhatsApp name and logos found on our WhatsApp Brand Guidelines website only"; "You shouldn't modify any colors in our logos"; "Avoid using the WhatsApp name or logos… as a verb"; display the word WhatsApp "in the same font size and style as the content surrounding it"; "DON'T… imply partnership, sponsorship, or endorsement" ([meta.com](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/)). The page has no rule for share buttons (**not verified** beyond this).

**Recommendation: Accept with changes.**
- The founder downloads the official pack himself (he accepts Meta's terms; that is a download, not an upload). Store it in the repo with the source and date.
- Glyph at text size, never recoloured, always with the word: "Send on WhatsApp", "Message Dave on WhatsApp". Never "WhatsApp it". No "partner" or "powered by". No `whatsapp` in URLs or names.
- **If the pack has no variant that works unmodified on the yellow button**, keep the generic bubble + the word "WhatsApp" (design's current choice, zero risk).

**Strongest argument against:** the generic bubble has zero trademark risk, and Meta "may revoke permission".
**What would change my mind:** the pack's terms forbidding use in a share button.

## 10. PRD success targets

**Decision:** whether 200 tool users / 30 accounts / ≥ 1 payment are realistic and consistent. **At stake:** wrong targets give false alarms or false comfort at the 15 Dec and 30 Apr reviews.

**Checked myself:** [fact] 30 ÷ 200 = 15% sign-up. Marketing's step targets (3% click × 50% complete = 1.5%) are **its own estimates**, with no benchmark source. But 15% from anonymous calculator users, most of them homeowners, is not realistic [opinion]. [fact] Sign-up only exists from about 22/11 (PRD §9).

**Recommendation: Accept with changes.** The only hard goal stays **≥ 1 payment by 31/12 (ideal 5)**. Change the PRD §9 leading indicators to:

| Metric | New target 31/12 (estimate) |
|---|---|
| Pages indexed | ≥ 10 (unchanged) |
| Tool uses (`calc_used` + `pdf_downloaded`) | ≥ 500 |
| Accounts (any source, by `signup_source`) | ≥ 10 |
| Activated (quote sent in 24 h) | ≥ 4 (≈ 40%) |
| Payments | ≥ 1 (ideal 5) |

Add a checkpoint on **15/12**: replace the guesses with real rates. Add one sentence: "The first payment will most likely come from launch week (directories, forums, Product Hunt) and the Founding Member offer, not from SEO alone."

**Strongest argument against:** lowering targets can hide failure.
**What would change my mind:** real conversion data by 15/12. The payment goal and the 30/04/2027 kill rule do not move.

---

## Exact edits to apply if accepted (owners in brackets; I have not applied them)

- **PRD §1** positioning → memo 002 line (see #2). **§3**: F1 gains multi-room, labour/price, "Turn this into a quote", mist-coat switch (P0); add Overdue + WhatsApp reminder (P1); post-MVP list adds deposit line, automated reminders, colours for Pro. **§4 Flow A step 4** → "Turn this into a quote". **§6 key copy** → #2. **F10** statuses add Overdue. **F12** → #7 wording. **§7** Pro row → "Your logo (colours later)". **§9** targets → #10; roadmap phase 1 → "Calculator + quote template 31 Oct; invoice template 14 Nov"; open question VAT → closed "incl. VAT, Polar Inclusive". Decisions log: add "17 Oct 2026" with #1–#10. [pricebrush-lead]
- **SEO** `keyword-map.md` home H1/meta (#2), invoice date 14 Nov, `/pricing` meta (#6); `briefs/*`: CTA, "When it's accepted, it's an invoice.", deposit FAQ, mist-coat FAQ, Direct Line citation (#4). [SEO]
- **Design** `screens.md` P1 hero + CTAs, P2 multi-room + "Your price at your day rate" + mist-coat switch, A12 cancel toast + Resume, client page "Message Dave on WhatsApp", `design-system.md` WhatsApp rules + contrast fallback. Mark Coachline approved. [UI/UX]
- **Strategy** memos 001–004 → Status: Accepted (with the changes above); `positioning.md` claim 3 → "No per-user fees". [strategist]
- **Marketing** `messaging.md` → Accepted; `funnel.md` targets → #10. [marketing]

## Top 3 risks

| # | Risk | Mitigation | Owner |
|---|---|---|---|
| 1 | **31 Oct slips.** Multi-room + labour + pre-fill + quote PDF in about 20 founder hours [estimate]. | Use the cut order in #1. Hand-over before polish. Go/no-go check on 28 Oct. | Founder (via pricebrush-frontend) |
| 2 | **No decorators reach us before checkout.** Traffic is mostly homeowners, UK decorators aren't on Reddit, the persona is unvalidated, and a new `pages.dev` site ranks slowly. | Plan launch week (22–30 Nov) now: directories, The Decorators Forum with an honest "I'm building PriceBrush" post, Founding Member offer. Watch `calc_room_added` as the trade signal. | Marketing (plan), founder (posts) |
| 3 | **Checkout not ready in late Nov.** Polar account approval, payout, VAT setting, terms and privacy (incl. anonymised-data clause) must all be done. [fact] Indonesia is on Polar's payout country list ([polar.sh](https://polar.sh/docs/merchant-of-record/supported-countries)); account approval itself is **not verified**. | Founder creates the Polar account this week, sets Inclusive tax, checks VAT invoices and payout setup. Lead drafts terms/privacy before 21 Nov. | Founder + pricebrush-lead |

## Next actions, week of 18–24 Oct (in order)

| # | Action | Hours | Who |
|---|---|---|---|
| 1 | Read this memo; reply Accept or change per row | 0.5 | Founder |
| 2 | Run /pb-lead (prompt A below) | 0.5 founder | pricebrush-lead, started by founder |
| 3 | Run /pb-frontend (prompt B below) and build | ~6 | pricebrush-frontend, started by founder |
| 4 | Create the Polar account; set tax to Inclusive; check payout setup and VAT invoices; note results | 1 | Founder |
| 5 | Download the official WhatsApp brand pack, read its terms, save it in the repo with source and date | 0.25 | Founder |
| 6 | Apply SEO edits (#2, #4, #6, invoice date) | 0 founder | SEO |
| 7 | Apply design edits; mark Coachline approved | 0 founder | UI/UX |
| 8 | Set memos 001–004 to Accepted; update positioning claim 3 | 0 founder | Strategist |
| 9 | Update messaging/funnel; draft launch-week plan (22–30 Nov) with the forum post text | 0 founder | Marketing |
| 10 | 28 Oct: go/no-go on the cut order | 0.25 | Founder |

Founder total this week: about 8.5 h [estimate].

**Prompt A — /pb-lead**

```
Read docs/ceo/decisions-2026-10-17.md. I accept it [list any rows you change]. Apply the "Exact edits" for the PRD (§1, §3, §4 Flow A, §6, F10, F12, §7, §9 and the decisions log dated 17 Oct 2026). Then write a short spec for: (1) the shared paint/labour calculator engine (m², coats, mist coat, litres, tins, days from day rate, price) with test cases checked against Dulux coverage figures; (2) the data hand-over from /paint-calculator to /decorating-quote-template (one line per room and surface, showing the working); (3) cancel at period end + Undo/Resume via Polar PATCH cancel_at_period_end and the subscription.uncanceled webhook, and tell me if Undo costs more than 1 hour extra. Do not commit or push.
```

**Prompt B — /pb-frontend**

```
Read docs/ceo/decisions-2026-10-17.md #1 and #2, the lead's calculator spec, docs/design/screens.md P1–P3 and docs/seo/keyword-map.md. Build for 31 Oct in this order and stop at the end of each step so I can check it: (1) /paint-calculator single room: litres, days and price, labelled "Your price at your day rate"; (2) /decorating-quote-template with a PDF; (3) the "Turn this into a quote" button that pre-fills the template, one line per room and surface, showing the working; (4) "+ Add another room"; (5) walls / ceiling / woodwork switches; (6) the "New plaster? Add a mist coat" switch. Landing H1 "Room sizes in. Priced quote out." with CTA "Price a room free". No "60 seconds", no "one tap" invoice claim. Unit tests for the calculator maths. 360 px and desktop. Do not commit or push.
```
