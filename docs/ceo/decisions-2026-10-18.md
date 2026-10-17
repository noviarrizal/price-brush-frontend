# CEO decisions — 18/10/2026

Author: CEO advisor · Status: **Recommended. The founder signs off.** Nothing below has been applied to the PRD, specs, plan, SEO, design, marketing docs or code.

Inputs read: `../reviews/2026-10-17-main-paint-calculator-quote-template.md` (Request changes, M1–M4), `../plan/2026-10-17-launch-31-oct.md` (T1–T17, F1–F3, Q1–Q7), `../PRD.md` §9 + decisions 15 and 17 Oct, `../seo/keyword-map.md` (`/about`), `../seo/briefs/paint-calculator.md` §2.2–§3, `../seo/briefs/decorating-quote-template.md`, `../seo/measurement.md`, `../seo/CHANGELOG.md` v0.3.2, `../design/screens.md` P6, `../marketing/launch-plan.md`, `./decisions-2026-10-17.md`. Code checked: `app/components/quote-template/quote-template-guide.tsx:63-91` (cancel FAQ), `app/app.css:74` (Archivo not loaded from Google, so no third-party font request).

Labels: **[fact]** = sourced · **[estimate]** · **[opinion]** · **not verified**. Not legal advice.

## Summary table

| # | Decision | Recommendation | One-line reason | Confidence |
|---|---|---|---|---|
| R1 | Quote number +1 after handover | **Accept with changes**: +1 on handover; Undo restores the old number | New job = new quote; two quotes with one number confuse clients | High |
| R2 | Calculator long copy (~380 → 1,200–1,800 words) | **Accept with changes**: SEO drafts by Tue 20/10; every number comes from the engine; founder reviews 20 min; engineer adds it (new T6b, ~2 h) | Main ranking asset; founder writing hours are the scarcest resource | Medium |
| R3 | Desktop "page is the A4" quote layout | **Accept lead: after 31/10**, build with the invoice template (14/11) | Single column works on desktop; 3–4 h is better spent on correctness | High |
| R4 | "Your right to cancel" option before launch | **Accept with changes**: use the **official model wording** (Schedule 3 Part A + Part B form), not a home-made paragraph; fix one FAQ sentence now (mandatory); the option itself is cut-order #4 | Law checked: the FAQ is mostly right but one sentence is too loose; a short custom paragraph would not meet reg 10 | Medium |
| P1 | Home page shows only what works today | **Accept with changes**: as lead says, but **no Founding Member card or "X of 50" before checkout** | Same rule as M4: never promise what the page can't do | High |
| P2 | About: say where the founder is based | **Accept with changes: state the country only** ("based in Indonesia"), no city | UK law likely needs a geographic address anyway; hiding it, then showing it in the privacy policy, costs more trust | Medium |
| P3 | Contact email on About | **Accept lead**: new free PriceBrush mailbox, created by founder this week | Keeps personal email private; reused for Polar, GSC backup, directories | High |
| P4 | Event counter Worker now vs November | **Start counting in November**: counter Worker = first backend task, live by **Sun 08/11**; Web Analytics page views from 31/10 | New pages.dev site gets near-zero traffic in week 1; 3–4 h + a new backend now endangers 31/10 | Medium |
| P5 | Ceiling + mist-coat switches (T16) before 31/10 | **Accept lead**: only if Block B merged by Wed 21/10; else T17 | Engine done; skipping it costs copy churn | High |
| P6 | Cloudflare Pages vs Workers static assets | **Accept lead: stay on Pages** | Not deprecated (checked); all docs assume pages.dev; move with the domain later | High |
| P7 | Cut order + is ~21 h realistic | **Accept with changes**: new cut order below; required work fits only just; extras will partly slip | ~21 agent h needs ~10–11 founder h of starting/checking [estimate] out of ~15–18 h | Medium |
| Q2 | Home JSON-LD | **Accept lead**: `Organization` (no logo yet) + `WebSite`; `SoftwareApplication` with `/pricing` on 21/11 | No offers that can't be bought | High |
| Q5 | About photo | **No photo** (default); founder may add later | Optional; zero hours | High |
| S | Must-fix + plan sanity check | **Accept M1–M4 and plan order**, add 3 small items (below) | M1 and M2 are the worst failures a quote tool can have | High |

---

## R1. Quote number after handover

**At stake:** wrong data on a client document. **Checked:** review M2/Q1, plan T3. Quotes have no legal numbering rule I know of (invoices do: GOV.UK VAT invoice rules need a unique sequential number, so this matters more for the 14/11 invoice template).
**Recommendation: Accept with changes.** On handover: Q-0007 → Q-0008. Undo restores Q-0007 with the rest of the old draft. A gap in numbers (if Q-0007 was never sent) is fine for quotes. One line in spec §10.
**Against:** a decorator who only started Q-0007 and never sent it now skips a number. **Change my mind:** decorators telling us they want strict quote sequences (then: +1 only if the old draft was downloaded).

## R2. Calculator long copy

**At stake:** the page that is meant to rank. [fact] Brief §3 asks 1,200–1,800 words; the review measured ~380. [fact] S1 showed copy written by hand already disagreed with the engine (5 L vs 6.5 L).
**Recommendation: Accept with changes.**
- SEO agent drafts all of brief §2.2 (coverage table with 2–3 real UK product sources, typical-rooms table, "For decorators", 12 FAQs, sources line) in `docs/seo/drafts/paint-calculator-copy.md` by **Tue 20/10**.
- **No numbers typed by hand** in the rooms table or FAQs: write them as `{calc: box room}` placeholders; the engineer fills them from `calculateJob` (as T6 does).
- Founder reviews for 20 min (truth, tone), does not write.
- New task **T6b · 2 h** right after T6. It is the **last** extra to cut (see P7). If cut, ship it in the first week of November.
**Against:** ranking on a new pages.dev site takes months, so 2 weeks' delay costs little. **Change my mind:** Block A/B slipping past 22/10.

## R3. Desktop A4 quote layout

**Recommendation: Accept lead — after 31/10.** Build it with the invoice template (14/11), which reuses the same layout. The single 672 px column works on desktop; PRD §6 "desktop first class" is met in function, not yet in looks [opinion].
**Against:** desktop users are often decorators doing admin in the evening; a nicer layout may convert better. **Change my mind:** Web Analytics showing >40% desktop visits on the quote page in November.

## R4. "Your right to cancel" option

**Law checked today (legislation.gov.uk, SI 2013/3134) [fact]:**
- [reg 27(3)](https://www.legislation.gov.uk/uksi/2013/3134/regulation/27): cancellation rules do not apply to off-premises contracts of **£42 or less**. The £42 exemption is for off-premises only. The page notes a reg 27(3A) change from the DMCC Act 2024 s.279(6) not yet shown — **not verified** what it says.
- [reg 10](https://www.legislation.gov.uk/uksi/2013/3134/regulation/10): for off-premises contracts the trader **must give a cancellation form (Schedule 3 Part B)**, on paper or (if the client agrees) another durable medium. Filling in the **model instructions (Schedule 3 Part A)** correctly counts as compliance.
- [reg 19](https://www.legislation.gov.uk/uksi/2013/3134/regulation/19): failing to give the right-to-cancel information on an off-premises contract is a **criminal offence**.
- [reg 31](https://www.legislation.gov.uk/uksi/2013/3134/regulation/31): if the information is not given, the cancellation period extends by up to **12 months**.
- [reg 36](https://www.legislation.gov.uk/uksi/2013/3134/regulation/36): work may start in the 14 days only on the client's **express request (on a durable medium for off-premises)**; the client then pays a proportionate amount — **but pays nothing** if the trader did not give the cancellation information.

**So the FAQ is mostly right, with one gap:** "If they ask you to start sooner, they pay for the work done" is only true if the request is in writing **and** the decorator gave the cancellation information. Fix it (mandatory, 10 min, in T4):
> "If they ask you in writing to start sooner, they pay for the work done before they cancel — but only if you gave them the cancellation information. If you didn't, they pay nothing and can cancel for up to 12 months."

**Recommendation: Accept with changes.**
- The option ("Add the client's right to cancel", on by default) adds the **Schedule 3 Part A model instructions (services wording), filled with the business name, address and email**, and the **Part B cancellation form** as a second PDF page. Copy the wording **verbatim** from the official PDF of SI 2013/3134 — I could not read Schedule 3 online (it is images), so the exact text is **not verified** by me. Lead writes a short spec and checks the text; ~1.5–2 h build [estimate, up from lead's 1 h].
- No home-made "short paragraph": it would not be the model instructions and gives the decorator false comfort.
- Cut-order #4 (see P7).
**Against:** wrong legal text on a user's PDF is worse than none; it adds ~2 h to a tight plan. **Change my mind:** if the lead finds the model text can't be filled in correctly in 2 h → ship only the FAQ fix + a link to the official form, and build the option in November.

## P1. Home page before the app exists

**Recommendation: Accept with changes** (lead's version plus one rule): show calculator → quote template → PDF; a "The app is coming in late November" strip; Free and Pro plan cards **without buttons**, labelled "Coming late November"; invoice card "Coming soon"; only true FAQs. **Don't show the Founding Member card or "X of 50 places"** until checkout works — scarcity for something nobody can buy is fake urgency (marketing's own rule, launch-plan "Rules"). If the MVP slips, change "late November" the same day.
**Against:** a plainer page shows less vision. **Change my mind:** nothing before the app exists — it is a truth rule.

## P2. About: location

**Where they disagree:** `keyword-map.md` "Do not add a location"; `screens.md` P6 "where he's based, stated truthfully". The SEO rule was a no-invention rule ("until he provides more", decision 15/10), not a finding that location hurts rankings. So there is no real SEO cost.
**Checked [fact]:** the [Electronic Commerce Regulations 2002 reg 6(1)](https://www.legislation.gov.uk/uksi/2002/2013/regulation/6) require a service provider to make available its name, "the geographic address at which the service provider is established" and an email address. Whether this applies to a provider established outside the UK is **not verified** [opinion: assume yes until checked]. The privacy policy (due 21/11) must name the controller anyway, and PRD lists a UK GDPR Art. 27 check.
**Recommendation: Accept with changes:** "Arif Noviarrizal — independent developer building PriceBrush, **based in Indonesia**." Country only, no city, on About. The full-address question goes to the lead with terms/privacy (before 21/11), together with Art. 27.
**Against [opinion]:** UK trades may trust a "UK-made" tool more, and some will leave. **Change my mind:** late-Nov 5-second tests or forum replies showing distrust → move the line lower on the page; never remove it once the privacy policy states the country.

## P3. Contact email

**Recommendation: Accept lead.** Founder creates a free mailbox (e.g. a Gmail named for PriceBrush, not implying a domain) this week. Use it on About, Polar, GSC backup owner and directories. Move to a domain address when the domain is bought.
**Against:** one more inbox to check. **Change my mind:** none.

## P4. Event counter

**Facts:** [fact] Cloudflare Web Analytics is "free, privacy-first analytics" ([docs](https://developers.cloudflare.com/web-analytics/about/)); custom events are not mentioned there — `measurement.md` says there are none. PRD §9 target ≥ 500 tool uses by 31/12 needs `calc_used` + `pdf_downloaded`.
**Recommendation: Start counting in November.** The counter Worker is the **first backend task** of the MVP block (it is a small, safe first Worker for a founder learning the backend), live by **Sun 08/11**. From 31/10 to 08/11 use Web Analytics page views as the proxy. Keep the 500 target; count it from 08/11 and say so at the 15/12 checkpoint. My 17/10 "change my mind" test (`calc_room_added ÷ calc_used` by 15/12) still gets ~5 weeks of data.
**Against:** we lose launch-week-one data and the first funnel signal. **Change my mind:** Block A–C finished by 23/10 with hours left → build it before 31/10.

## P5. Ceiling + mist-coat switches

**Recommendation: Accept lead.** T16 only if Block B is merged by Wed 21/10; otherwise T17 (one-surface copy, SEO meta). Consistent with my 17/10 cut order (items 5–6 may follow a week later). Woodwork stays out.

## P6. Pages vs Workers

**Checked [fact]:** Cloudflare's Pages page says "Start new projects with Workers" and that Workers "supports most Pages use cases", with **no deprecation or end date** ([developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)). The lead's spike tested `_headers`/`_redirects`/404 on Pages.
**Recommendation: Accept lead — stay on Pages for 31/10.** Revisit together with the domain move.
**Against:** we may move once anyway. **Change my mind:** a Pages deprecation date, or a missing feature we need.

## P7. Cut order and hours

**Hours [estimate]:** 18–30/10 is ~1.9 weeks × 8–10 h = **15–18 founder hours**. Founder steps F1–F3 + go/no-go + reading ≈ 4.5 h. If each agent hour needs ~0.5 founder hour to start, check on a phone and answer [estimate], the required ~21 h needs ~10.5 h. Total ~15 h: **fits only just.** The extras (T6b 2 h, R4 option ~2 h, T16 1.5 h) add ~2.5 founder hours and will partly slip.

**Recommendation: Accept with changes.** Never cut: M1–M4 (M4 = honest copy), multi-room, T7–T8, home with the right copy, the R4 FAQ fix. Cut in this order if late at the 28/10 check:
1. T11 desktop mock → fallback card.
2. Desktop header nav.
3. T16 → do T17 instead (decided earlier, 21/10).
4. R4 cancellation option (the FAQ fix stays).
5. T12 About → first week of November (keep it out of footer and sitemap until live).
6. T6b calculator long copy → first week of November.

Deploy as soon as T13 passes (lead's rule — accepted).

## S. Must-fix and plan sanity check

**Checked:** M1 (money "1,290" → £1.29) and M2 (old client kept) are the two worst errors a quote tool can make; M3 is WCAG AA; M4 is a truth rule. All four are right and correctly sized. Plan order A → B → C → D → review is right: correctness first, then the required feature, then plumbing.
**Add (small, in existing tasks):**
- T4: the reg 36 FAQ sentence (R4).
- T11: no Founding card / "X of 50" (P1).
- S6: accept the lead's option (a) — SEO sets the tool-page JS budget to **130 KiB gzip**, Lighthouse ≥ 90 gate unchanged.
**Over-scoped for 31/10:** only the T11 desktop mock and the desktop header nav (already first in the cut order). Nothing missing that blocks launch.

---

## Exact edits to apply if accepted (owners in brackets; not applied)

- **PRD** decisions log: add "Keputusan 18 Okt 2026" with R1–R4, P1–P7, Q2, Q5. §9 metric row "Pemakaian tool": "dihitung mulai 08/11/2026; 31/10–08/11 pakai page views Web Analytics". Open questions: add "Cek E-Commerce Regs 2002 reg 6 (alamat geografis) untuk provider di luar UK — sebelum 21/11, bersama Art. 27". [pricebrush-lead]
- **Spec** `docs/specs/paint-calculator.md` §10: quote number +1 on handover, Undo restores it. [pricebrush-lead]
- **Plan** `docs/plan/2026-10-17-launch-31-oct.md`: add T6b (calculator copy, 2 h) and T18 (cancellation option, ~2 h, after T12); FAQ fix into T4; P1 rule into T11; new cut order (P7); counter Worker → backend plan, live 08/11. [pricebrush-lead]
- **SEO** `briefs/paint-calculator.md` + new `drafts/paint-calculator-copy.md` (R2); `keyword-map.md` `/about` author line "…based in Indonesia" (P2); `technical-seo.md` §6 budget 130 KiB (S6); URLs with trailing slash (lead's note); quote brief FAQ answer per R4; prepare the one-room meta for T17. [SEO]
- **Design** `screens.md` P1 (pre-app home per P1), P2 "No tape measure?" sentence from the engine, P6 location = country only, no photo. [UI/UX]
- **Marketing** `launch-plan.md` 25–31 Oct row: "page views counting (Web Analytics); events from 08/11"; no Founding copy on site before checkout. [marketing]

## Top 3 risks

| # | Risk | Mitigation | Owner |
|---|---|---|---|
| 1 | **31/10 slips**: ~21 agent h + extras in ~15–18 founder h. | Blocks A–C first; cut order P7; go/no-go 28/10; deploy as soon as T13 passes. | Founder (runs /pb-frontend, /pb-lead) |
| 2 | **Wrong legal text on a user's PDF** (cancellation) or wrong money (M1). | Verbatim Schedule 3 wording only, lead checks it against the official PDF; M1 tests for every format; "general information, not legal advice" line. | pricebrush-lead |
| 3 | **No tool-use data until 08/11**, so the 15/12 checkpoint has thin data. | Web Analytics on from day 1 (F3); counter Worker first in the backend block; report the counting start date honestly. | pricebrush-lead (plan), founder (enable Web Analytics) |

## Next actions, 18–24 Oct (in order)

| # | Action | Hours | Who |
|---|---|---|---|
| 1 | Read this memo; reply Accept or change per row | 0.5 | Founder |
| 2 | Create the free PriceBrush mailbox; note the address for T12 | 0.25 | Founder |
| 3 | Run **/pb-lead** — Prompt L1 | 0.5 founder | pricebrush-lead (started by founder) |
| 4 | Run **/pb-frontend** — Prompt F1 (Block A), check on phone | ~5 agent / ~2 founder | pricebrush-frontend (started by founder) |
| 5 | Draft calculator copy (R2) by Tue 20/10; brief/keyword-map/budget edits | 0 founder | SEO |
| 6 | Update `screens.md` P1, P2, P6 | 0 founder | UI/UX |
| 7 | Update launch-plan 25–31 Oct row | 0 founder | Marketing |
| 8 | Run **/pb-lead** — Prompt L2 (review Block A), then merge if Approve | 0.5 | Founder + pricebrush-lead |
| 9 | Review SEO copy draft (truth, tone) | 0.33 | Founder |
| 10 | Run **/pb-frontend** — Prompt F2 (Block B + T6b, T16 if on time) | ~5.5 agent / ~2.5 founder | pricebrush-frontend |
| 11 | Run /pb-lead review of Block B, then /pb-frontend Block C (T7–T9) per the plan | ~5 agent / ~2.5 founder | Founder starts both |
| 12 | Wed 28/10: go/no-go with the P7 cut order | 0.25 | Founder |

Founder total this week: about 9 h [estimate].

**Prompt L1 — /pb-lead**
```
Read docs/ceo/decisions-2026-10-18.md. I accept it [list any rows you change]. Apply the "Exact edits" marked [pricebrush-lead]: PRD decisions log "Keputusan 18 Okt 2026", PRD §9 tool-use row and the new open question; spec docs/specs/paint-calculator.md §10 (quote number +1 on handover, Undo restores it); update docs/plan/2026-10-17-launch-31-oct.md with T6b, T18, the FAQ fix in T4, the P1 rule in T11, the new cut order and the counter Worker moved to the backend plan (live 08/11). Then write a short spec for T18 (cancellation option): copy the Schedule 3 Part A model instructions (services wording) and the Part B cancellation form verbatim from the official PDF of SI 2013/3134 on legislation.gov.uk, mark which fields we fill (business name, address, email), and tell me if it takes more than 2 h. Do not commit or push.
```

**Prompt F1 — /pb-frontend (Block A)**
```
Read docs/plan/2026-10-17-launch-31-oct.md Block A, docs/reviews/2026-10-17-main-paint-calculator-quote-template.md and docs/ceo/decisions-2026-10-18.md R1 and R4. On branch fix/review-2026-10-17 do T1–T4. In T3 the quote number goes up by one on handover and Undo restores it. In T4 also change the cancel FAQ sentence to exactly: "If they ask you in writing to start sooner, they pay for the work done before they cancel — but only if you gave them the cancellation information. If you didn't, they pay nothing and can cancel for up to 12 months." Stop after each task so I can check it (typecheck, tests, build, 360 px and 1440 px, light and dark). Do not commit or push.
```

**Prompt L2 — /pb-lead (review Block A)**
```
Mode 2 review of branch fix/review-2026-10-17 against the review M1–M3, plan Block A and docs/ceo/decisions-2026-10-18.md R1/R4. Run install --frozen-lockfile, typecheck, tests, build, Lighthouse dark mode on the quote page. Verdict Approve or Request changes. Do not commit or push.
```

**Prompt F2 — /pb-frontend (Block B)**
```
Read docs/plan/2026-10-17-launch-31-oct.md Block B (T5, T6, T6b) and docs/seo/drafts/paint-calculator-copy.md. On branch feat/multi-room do T5, then T6, then T6b: add the SEO copy below the tool and fill every {calc: ...} placeholder from calculateJob, never by hand. If this block is ready for review by Wed 21/10, tell me and wait; I will decide on T16. Stop after each task so I can check it. Do not commit or push.
```

**Founder manual steps (later, from the plan):** F1 Pages project `pricebrush` (~1 h), F2 curl checks (0.5 h), F3 Search Console + **turn on Web Analytics** (0.75 h) — Thu 29/10 or as soon as T13 passes.
