# Marketing changelog

## v0.7 — 18/10/2026

Founder request: merge the signed-off decisions into one launch plan, and write the copy to paste in the next few weeks. Only `docs/marketing/` was touched. Nothing was posted, joined, signed up for, sent, uploaded or committed.

**Changed**

- `launch-plan.md` → **v0.5, Accepted**:
  - One week-by-week table from 18/10 to 31/12, with a date, owner and founder hours for every item. Admin rows from the CEO memos are marked.
  - Merged: the CEO channel edits, the Facebook groups plan as accepted, and pricebrush.co.uk from 31/10 (pages.dev fallback 08/11, frozen if not moved by 15/11).
  - Removed: "pending" markers, the "no Facebook" lines, TikTok, the ad test, videos #1/#2/#4 and the 07/11 domain decision. Screwfix moved to December.
  - New "If it's not working" rows: PDN #1 by 20/11; the one video < 100 views by 15/12; Facebook < 10 visits; < 4 activated → SEO pages + PDN data story; < 50 decorator visits by 30/11.
  - About 12.6 founder hours of marketing to 31/12; 0.6 h in 1–14 Nov; 1.95 h in 15–21 Nov; 4.33 h in launch week.
- `funnel.md` → v0.4:
  - Tag table: `list`, `pdn1`, `pdn`, `ph`, `yt`, `fb-<code>` (5 group codes), `dir-<name>`, `wm`, each with a referrer fallback.
  - `tt`, `ukbf`, `gads` and `meta` dropped.
  - Watermark link on pricebrush.co.uk via `SITE_URL`.
- `fast-revenue-2026-10-18.md`: short status notes only (v0.5 wins; Facebook re-added as groups only; one video; no TikTok; Screwfix from December).
- `channels-and-ads-2026-10-18.md`: CEO's marketing edits:
  - Status set to "Accepted with changes".
  - YouTube description links "only with advanced features".
  - PDN figures and "Editorial: always free of charge" added.
  - The domain date set to 23/10.
- `facebook-check-2026-10-18.md`: status set to Accepted; the copy files supersede A6.

**Added (`copy/`)**

- `pdnews-early-note.md`: field-by-field form copy, headline "PriceBrush launches free paint and labour calculator for decorators", a news text of 218–235 words, one image suggestion, reply snippets, and the competitor/autocomplete check.
- `facebook-join-answers.md`: join answers, the 15/11 admin message (73 words), the 26/11 post (link and no-link versions, no £49), reply patterns and the December follow-up.
- `facebook-profile.md`: name, no-face photo, a 91-character bio, privacy settings and 2FA steps, all from Meta Help Centre pages.
- `README.md`: an index by date, plus the note that the YouTube script is written around 15/11.

**New evidence (checked 17/10/2026)**

- **The PDN Submit News form:**
  - Fields: First and Last name (required), Email and Confirm Email (required), Phone, Website, "Your news or message" (required), reCAPTCHA.
  - **There is no file upload.**
- **PDN house style** (4 items by Lucy Dixon):
  - "X launches Y" headlines and a third-person lede.
  - One "Name, Founder of X, said:" quote and a closing "live now at" line.
  - **Only bare domains are linked**, so `?ref=` tags will probably be lost. Count PDN by referrer.
- **Competitor wording to avoid:**
  - less.co.uk: "Painting & Decorating Cost Calculator".
  - Loom & Glow (a free UK paint calculator on Product Hunt): "Stop guessing how much paint your room needs", "exact litres", "no email wall".
  - Paint Manager: "quotes in minutes".
  - No competitor uses "paint and labour calculator".
- **Google UK autocomplete:** "paint and labour calculator" → "paint labour calculator"; "painter and decorator calculator" → "painting and decorating calculator".
- **Meta Help Centre, rendered:**
  - Names rule; sign-up fields.
  - Profile picture and Intro are always public.
  - Friend-request options (Everyone / Friends of friends).
  - Email/phone suggestions default to "Possible connections".
  - Profile lock is only in some countries.
  - Public vs private group visibility.
  - 2FA path via Accounts Centre → Password and security, with three methods and 10 recovery codes.
- **YouTube Help, re-checked:** clickable links are an "Advanced" feature, gained through channel history or ID verification.

**Not verified:**
- Bio character limit (third-party says 101).
- Exact labels for "friends list" visibility and adding a website.
- Whether a new Facebook account needs a phone or selfie check.
- Whether PDN keeps `?ref=` links, and their lead time.
- Loom & Glow's launch date.
- PECR soft opt-in for the December sign-up email (unchanged).

## v0.6 — 18/10/2026

Founder request: he's now willing to create a Facebook account. Is it worth it for UK decorator groups (free) and for Meta ads (≤ ~Rp400k, after payday)? Only `docs/marketing/` was touched. Nothing was posted, joined, signed up for, bought, sent or committed.

**Added**

- `facebook-check-2026-10-18.md`:
  - A CEO summary at the top.
  - UK decorator groups with sizes and rules seen from outside, Meta's gates for new members, Page vs profile, and a credibility check.
  - A warm-up plan with minutes per week, exact join answers, admin message and post copy, and an honest results range.
  - Meta ads facts from Meta's own help pages, the CPC band, money → clicks → sales maths, a payday-safe override setup with a stop rule, and a Meta vs Google comparison.
  - The recommendation: **create a personal profile now, for groups only; no Page; £0 on Meta ads in 2026; one conditional group post on Thu 26/11; ≈ 3 h to 31/12.**

**Changed**

- `launch-plan.md` → v0.4.1: new section "Facebook groups (pending founder + CEO)" with dates, hours, ref tag `?ref=fb-<group>` and stop rules. Header note updated. Nothing else changed; the CEO's v0.5 edits are still unapplied.

**New evidence (checked 17/10/2026)**

- **Decorator Facebook audience:**
  - The Decorators Forum UK Page has **122,501 followers** (Facebook public preview).
  - Group sizes from Facebook sidebar snippets: Decorators Forum ~24–25K, Spraying Makes Sense ~15K, Trade Decorator Forum 7,851.
  - Painter & Decorator's Community UK lists "software" as a topic.
  - The DFUK main group: "No pricing posts". Decorator's Talk Group: "no advertising or selling". Trade Decorator Forum promotes "group sponsors". DFUK sells advertising.
- **Facebook admin tools (Meta):** up to 3 join questions; request filters include Location and Request age; account-age and tenure restrictions (newsroom 2021); link auto-decline; per-member activity limits. Pages can join groups if admins allow. "Advertising, promoting" contact is a suspension reason.
- **Meta ads (Meta):**
  - Every advertiser needs a Page. Business verification is only for certain features.
  - No published minimum-budget table. Daily spend can reach 175% of the daily budget, capped at 7× a week.
  - Account spending limits exist, but not with prepaid.
  - Indonesia accepts Visa/Mastercard/Amex, PayPal, and prepaid Doku/Flip/GoPay/OVO in IDR.
  - **Advantage+ detailed targeting can't be switched off when optimising for link clicks or landing page views.**
  - A profile restricted from advertising can disable ad accounts.
- **Costs (third-party):** UK median CPC £1.18 (Superads, Jul 2025–Jul 2026). Traffic CPC $0.60–$0.70 (LocaliQ, scope not stated). UK 2% location fee from 01/07/2026 (press). Indonesian PPN PMSE 11% on Meta (DJP 2022).
- **Account risk:** NYT 21/07/2026 on AI-driven wrongful bans; petition > 60,000.
- **Competitor:** Paint Manager (launched 05/06/2026; "free for the first five quotes", £19.99–£39.99/month).

**Not verified:** full group rules, promo days, most member counts; new-account phone verification; IDR minimum budget; card/GoPay acceptance for Arif; new ad-account spending limit; UK "Painter and decorator" job-title audience size; real CPC for this audience; Meta's own page for the UK location fee; 2026 Indonesian VAT on Meta ads.

## v0.5 — 18/10/2026

Founder decisions of 18/10 (PRD "Keputusan founder 18 Okt 2026"): no Facebook account, an ad allowance of ≤ Rp500,000, option (a). I re-planned the launch channels and judged the allowance. Only `docs/marketing/` was touched. Nothing was posted, signed up for, sent or committed.

**Added**

- `channels-and-ads-2026-10-18.md`: a CEO summary at the top, 15 channels ranked (who's there, link rules for a new account, hours, expected result, risk), the top 3 for launch week, the exact P&D News note and video copy, the ad platforms' minimums, the £20.79 maths, the domain comparison, and one recommendation: **£0 on ads; optionally ≤ Rp100k for pricebrush.co.uk by 08/11, with 3 conditions and a stop rule**.

**Changed**

- `launch-plan.md` → v0.4:
  - All Facebook steps removed, along with the superseded earlier launch-week draft and its forum post. The UKBF launch post is dropped.
  - New launch week: the "tell me" email (Sun), P&D News + listings (Mon), PH (Tue), video #3 (Wed), Screwfix answers only (Thu). Video #4 added in December. A PH account is created now so its onboarding is done before launch.
  - Accepted CEO revenue edits applied: the 100% discount-code gate (#4), line D, and the single "tell me" email with address deletion (#8). The list is kept out of the December email.
  - About 13 h over 11 weeks; ≤ 1.75 h in any build week.
- `fast-revenue-2026-10-18.md`:
  - Status set to Accepted with changes; Facebook rows struck.
  - Q2 channel table re-estimated: 0–3 buyers, centre 0–1 (was 1–2).
  - The 14-day checklist follows CEO #3, #4, #7 and #8. Line D copy now matches CEO #8 (quote template only, deletion line).
- `funnel.md` → v0.3: the "tell me" step (≥ 10 emails by 22/11, CEO revenue). Ref tags `list`, `pdn`, `ph`, `yt`, `tt`, `dir-<name>` replace `fb-df` and `ukbf`.
- `answers-2026-10-17.md` is left unchanged (dated record). Its Decorators Forum ideas are superseded.

**New evidence (checked 17/10/2026)**

- **Exchange rate:** ECB 16/10/2026, £1 = Rp24,045, so Rp500,000 = £20.79.
- **Reddit:** r/uktrades doesn't exist (Arctic Shift). r/PaintingandDecorating has been dead since 2020. Archived rules for r/DIYUK, r/smallbusinessuk, r/Housepainting101 and r/Plastering.
- **Screwfix Community:** Painters' Talk is live (~19 new threads 22/09–16/10). Its moderation policy bans promotion; relevant links are allowed.
- **P&D News:** ran the PaintPilot launch on 05/10/2026 (a decorator-founded rival, Solo £14.99/month) and has a free "Submit News" form.
- **YouTube:** UK decorator channels have real audiences (Decorators Forum UK 15.6k, Phil Beckwith 26.6k, Foxy The Decorator 22k). Shorts links have not been clickable since 2023.
- **Product Hunt:** new accounts must finish onboarding before posting. The audience is global tech.
- **Listings:** AlternativeTo's free queue "will not be looked at for a very long time". Capterra lists non-paying vendors. UKBF terms ban unsolicited promotion.
- **Ad minimums:** TikTok $20/day per ad group; LinkedIn $10/day; Google has no minimum (2× daily, 30.4× monthly cap). Bing is 6.08% of UK search.
- **Search demand:** Google UK autocomplete returns nothing for "decorator quote app", "decorator invoice app" or "app for painters and decorators".
- **Domains:** pricebrush.com, pricebrush.co.uk and pricebrush.app are not registered (registry RDAP). Price mirror: .co.uk $5.30/yr, .com $10.46/yr.

**Not verified:** TikTok bio-link rules; Instagram/TikTok decorator audience size; PDN readership and lead time; the Reddit Ads minimum (Reddit's help returned 404); the Microsoft Ads standard minimum; Indonesian cards on Google, Microsoft, Reddit and Cloudflare; Google promo credits for Indonesia; real CPCs (no Keyword Planner); Nominet checks for a non-UK individual; UK IPO trademark; the live r/DIYUK rules (403).

## v0.4 — 18/10/2026

The founder accepted all decisions in `../ceo/decisions-2026-10-18.md`. I applied only the [marketing] edit. No other folders were touched and nothing was committed. `fast-revenue-2026-10-18.md` is unchanged and waits for the CEO's decision.

**Changed**

- `launch-plan.md` → v0.3:
  - 25–31 Oct row: page views counting (Cloudflare Web Analytics); events from 08/11 (P4). "Done when" now says page views counting, not events.
  - P1 rule: no Founding Member copy on the site before checkout works. Added to the 25–31 Oct row and the Founding "Rules". In the 15–21 Nov row the Founding copy is now prepared but hidden until the Sun 22 Nov gate test purchase passes.

## v0.3 — 18/10/2026

Founder question: "How can we get money FAST?" Proposed only. No other folders were touched and nothing was committed.

**Added**

- `fast-revenue-2026-10-18.md`: an honest answer. Quick cash isn't realistic; the best case by 31/12 is 1–5 Founding sales, about £37–£220 net [estimate]. Recommends one offer (Founding £49 at the 22/11 launch, with an optional "early start" licence unlock from ~14/11 if it costs ≤ 3 h), applying to Polar this week, and a £0 "tell me when it opens" mailto line from 31/10. Says no to an Etsy/Gumroad template pack, a £15 watermark removal and any homeowner offer in 2026. Includes the exact copy, channel estimates, a 14-day checklist (~6.75 h) and the risks: CCR reg 37, Polar's "pre-orders" restriction, MoR VAT.

**New evidence (checked 18/10)**

- Gumroad search: "painting quote template" 5 results (the one real match is $14 with 0 ratings), "decorator quote" 0. Fees are 10% + $0.50 direct and 30% on Discover. Gumroad has been MoR since 01/01/2025.
- Polar acceptable use: "Pre-orders and paid waitlists" are restricted; templates and licence keys are allowed.
- CCR 2013 reg 37 (digital content: express consent and acknowledgement).
- Google UK autocomplete: template and price-list searches lean "free"; "remove watermark pdf" leans "free/online".
- Spon's Finishings costs £68.99.

**Not verified:** Etsy (403 on search and help pages), the Etsy setup fee, Etsy UK VAT on digital items, Polar review time and its pre-order judgement, Gumroad payouts to Indonesia, PECR for the mailto list.

## v0.2 — 17/10/2026

The founder accepted all 10 decisions in `../ceo/decisions-2026-10-17.md`. I applied only the marketing edits. No other folders were touched and nothing was committed.

**Changed**

- `messaging.md` → **Accepted**. H1 "Room sizes in. Priced quote out.", with the sub, both CTAs, "Turn this into a quote", "Your price at your day rate" and the PRD §1 positioning line, all as in the memo. Late-Nov 5-second re-test noted. Words table: "No per-user fees" (never "cheaper"), incl. VAT, the Direct Line citation format, the cancel-copy fallback, and no use of The Decorators Forum's name as an endorsement.
- `funnel.md` → targets from memo #10: ≥ 500 tool uses, ≥ 10 accounts, ≥ 4 activated, ≥ 1 payment by 31/12/2026, checkpoint 15/12/2026. The maths was re-checked: the Founding offer has to carry the first payment. Added launch-week `?ref=` tags.
- `launch-plan.md` → v0.2. Added the day-by-day launch week (22–30 Nov), the exact forum post, the membership answer, the admin message, the PH maker comment, all Founding Member copy (pricing card, paywall, banner, email) and its honesty rules. The 1–7 Nov forum post became forum prep only, so there is one post in total.

**New evidence (checked 17/10)**

- `decoratorsforum.com` and `decoratorsforum.co.uk` redirect to `facebook.com/groups/decoratorsforum`. `thedecoratorsforum.com` is a WordPress blog with no message board. Its terms bar using its marks with a product without written consent, and its contact page sells exposure.

**Not verified:** the Facebook group's rules and membership questions (login wall); UK Business Forums' current promotion rules; PECR soft opt-in for the sign-up email; Product Hunt's current rules (not re-opened).

## v0.1 — 17/10/2026

First marketing round. Everything is proposed; the founder decides. No other docs or code were edited.

**Added**

- `answers-2026-10-17.md`: answers to the 9 open decisions (Recommendation / Why / Strongest argument against / What would change my mind / Risks / What to change).
- `messaging.md`: headline, sub, CTAs, value props, proof-point rules, objection copy, words, tone.
- `funnel.md`: steps, metrics and targets (all estimates), measurement at £0, the PRD KPI mismatch.
- `launch-plan.md`: dated plan to 31/12/2026 with founder hours per week.

**Key positions**

- Headline changed from memo 002's "Say the rooms. Get a priced quote." to **"Room sizes in. Priced quote out."**. Reasons: voice isn't live on 31 Oct, the line is close to Fixxa's "Say the job…", and "Get a … quote" is homeowner phrasing (Bark, Sleepless).
- "Cancel in one tap" stays only with a 1 tap + Undo flow; otherwise the copy becomes "two taps".
- "£9 a month incl. VAT" (Polar's UK default is inclusive).
- Drop "quote → invoice in one tap" everywhere: it sits next to QuoteRocket's H1.

**New evidence (checked 17/10)**

- Competitor H1s and colours from the sites themselves: Queezy, Sleepless, TradeQuoteAI, Fixxa, PainterPal (dark green `#17492b`), Paint Manager (new UK decorator tool, £19.99–£39.99).
- Meta WhatsApp brand rules; Polar tax behaviour and fees; DMCC subscription-regime timing.
- The Direct Line release date is ambiguous (URL `2026/15012025`).

**Not verified:** Google UK SERPs and autocomplete for the new headline (CAPTCHA; WebSearch is US-biased); the WhatsApp brand pack's variants, clear space and minimum size; Polar's UK VAT registration, VAT-number handling and un-cancel API; Polar's exact current fee; the DMCC commencement date; PECR soft opt-in for sign-up emails; PainterPal's rendered look.
