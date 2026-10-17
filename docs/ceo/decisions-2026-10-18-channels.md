# CEO decisions: launch channels without Facebook, and the Rp500,000 allowance (18/10/2026)

Author: CEO advisor · Status: **Recommended. The founder signs off.** Nothing below has been applied to the PRD, plan, SEO, design, strategy or marketing docs, or to code.

Inputs read: `../marketing/channels-and-ads-2026-10-18.md`, `../marketing/launch-plan.md` v0.4, `../marketing/funnel.md` v0.3, `../marketing/fast-revenue-2026-10-18.md`, `../PRD.md` (incl. "Keputusan founder 18 Okt 2026"), `./decisions-2026-10-18-revenue.md`, `../strategy/decisions/005-fastest-path-to-revenue.md`, `../plan/2026-10-17-launch-31-oct.md`, `../seo/technical-seo.md` §9, `../seo/link-building.md`. Code checked: `app/seo/meta.ts:6` (`SITE_URL`, one constant), `app/components/quote-template/quote-pdf.tsx:117` (watermark link hard-coded to pages.dev; T4 S2 moves it to `SITE_URL`).

Labels: **[fact]** = sourced · **[estimate]** · **[opinion]** · **not verified**. All checks were run on 17/10/2026. Nothing was posted, signed up for, bought or sent. Not legal advice.

## The short answer

Marketing is mostly right. **Ads: £0.** The domain is a better use of a small part of the allowance. I change four things:

1. **P&D News is stronger than marketing thought, so use it twice.** Their own ad page gives 13,000–17,000 page views a month, a 17,000-address email list and 9,500 Facebook followers. It also says editorial is "Always free of charge". Send a short note about the **free calculator in the first week of November**, so decorators reach the "tell me" line before launch. Then send the launch note on 23/11.
2. **YouTube links don't work on a new channel.** Clickable links in descriptions and on the channel page are "advanced features". You get them through channel history or ID/video verification. So: **one** video, not four, and the address goes on screen as text. **No TikTok** in 2026.
3. **If you buy the domain, buy it this week and launch on it on 31/10.** Marketing's date (08/11) means a site move right after Google first sees the site. It would also land in the MVP build week. Launching on the domain needs no move at all.
4. **The build weeks get less marketing work.** Videos #1 and #2 are cut, and Screwfix moves to December. That saves about 3 founder hours in 1–21 Nov for the MVP.

## Decisions table

| # | Decision | Recommendation | One-line reason | Confidence |
|---|---|---|---|---|
| a | Launch-week channels and order | **Accept with changes**: early P&D note (02–06/11); launch week: list email → P&D News + listings → Product Hunt → one video; Screwfix moves to December. Launch week ≈ 3.5 h | PDN is the only decorator-dense channel we can use, and the "tell me" list needs decorators **before** 22/11 | Medium |
| b | YouTube / TikTok | **YouTube yes, one video**: create the channel by 08/11, publish 25/11. **TikTok no** in 2026 | New channels have no clickable links; TikTok evidence is weakest and also has no link | Medium |
| c | Product Hunt | **Accept**: account + onboarding by Sat 24/10, launch Tue 24/11, ≤ 1 h on the day | Cheap, written-only, one backlink; few decorators there | Medium |
| d | Ad budget | **Accept marketing: spend £0 on ads.** Leave about Rp400k unspent | Rp500k ≈ £20.79 ≈ 6–14 clicks; no decorator placement under £400 at PDN | High |
| e | Domain | **Accept with changes**: buy **pricebrush.co.uk** (≤ Rp120k) **by Fri 23/10** and launch on it 31/10. Fallback Sun 08/11. Otherwise wait until after the first payment | Launching on the final address avoids a site move; Nominet allows non-UK individuals | Medium |
| f | Kill/pivot and 31/12 expectation | **Keep the goal and both dates.** Change the hope to **0–2 Founding sales (centre 0–1)**. Replace the 15/12 "Facebook group" fallback | Losing Facebook lowers the odds; it doesn't change what we are testing | Medium |

---

## (a) Launch-week channels

**Decision:** which channels, in what order, inside 8–10 h a week, without Facebook. **At stake:** launch week is the only realistic source of the first payment (CEO revenue #2).

**What I checked myself:**
- [fact] P&D News has a **"Submit News"** form (name, email, website, "your news or message"). It also gives a contact: "email Lucy on ldixon@lyricalcomms.com" ([contact](https://www.paintinganddecoratingnews.co.uk/contact-us/)).
- [fact] Their ad page says: "Editorial ... Always free of charge – never charged for!" It gives self-reported numbers: 13,000–17,000 page views a month, an email database of 17,000, 9,500 Facebook followers and 3,100 on X. The cheapest paid slot is £400 a month. A newsletter sponsored story is £700 ([advertising](https://www.paintinganddecoratingnews.co.uk/advertising-with-us/)). Publisher: PDS Promotions Ltd.
- [fact] The PaintPilot item (05/10/2026) has **no "sponsored" label**. It includes prices and the website ([item](https://www.paintinganddecoratingnews.co.uk/decorating-products/painter-decorator-launches-paintpilot/)). Their about page invites news from "painter and decorator, a manufacturer or a stockist". It doesn't mention software firms ([about](https://www.paintinganddecoratingnews.co.uk/painting-and-decorating-news-about-pdn/)).
- So marketing's claim holds: they take vendor news, for free, through a form. What marketing missed: PDN shares news on **Facebook (9,500 followers)**. A PDN item is our only indirect way into the Facebook audience.
- [fact] YouTube: "Add clickable links to your long-form video description" and "Clickable links in channel details" are **advanced** features. You get them through "sufficient channel history" or ID/video verification, which "isn't available to all creators" ([YouTube Help](https://support.google.com/youtube/answer/9890437?hl=en-GB)). Marketing's "full-length description links: yes" and "channel-page links: yes" are **wrong for a new channel**.
- [fact] Product Hunt: "Newly created accounts must complete the onboarding process before gaining access to post". The help page gives no minimum account age ([PH help](https://help.producthunt.com/en/articles/479557-how-to-post-a-product)).
- I did **not** re-check the UK Business Forums, Screwfix or Reddit rules. I accept marketing's quoted sources for dropping or limiting them. Dropping a channel is low-risk.

**Where I differ from marketing:**
1. **The early PDN note.** Marketing uses PDN once, on 23/11. But the "tell me" list is our warmest source, and in November it is fed only by SEO, which will be near zero (CEO 18/10 P4). A short note in the week of 02/11 ("free paint and labour calculator for UK decorators") is true on the day you send it. It sends decorators to the quote template, where line D collects "tell me" emails. Send it only once line D is live and the site has passed F2.
2. **Cut videos #1 and #2 and move Screwfix to December.** Each video costs 1.5 h in an MVP build week, and a new channel has no clickable links and no known reach. Screwfix answers carry no link by design. The MVP and checkout are the gate for any money (CEO revenue risk #1). The MVP plan for 1–21 Nov doesn't exist yet, so I won't spend those hours on marketing.

**Recommendation: Accept with changes.**

| When | Action | ref | Founder h |
|---|---|---|---|
| Mon 02 – Fri 06/11 | **PDN note #1** (free calculator). Send it only after F2 passes and line D is live. Marketing drafts it by 30/10, with no app or Founding claims | `?ref=pdn1` | 0.5 |
| Sun 22/11 | Gate check with a 100% code, then the one "tell me" email | `?ref=list` | 0.75 |
| Mon 23/11 | **PDN note #2** (launch; marketing's A4 text, URL swapped if the domain is live) + Capterra, SaaSHub, AlternativeTo (free) | `?ref=pdn`, `?ref=dir-<name>` | 0.75 |
| Tue 24/11 | **Product Hunt**, written replies, no upvote asks | `?ref=ph` | 0.75 |
| Wed 25/11 | **One YouTube video** (full-length + the same clip as a Short). Address on screen and in the description as text | `?ref=yt` | 0.5 |
| Fri 27/11 | Replies (PH, YouTube, mailbox) | — | 0.25 |
| Sat 28 – Mon 30/11 | Backlog + tally by ref tag | — | 0.5 |
| **Launch week total** | | | **≈ 3.5 h** |

Build weeks: 1–7 Nov ≈ 0.6 h (PDN #1, YouTube channel). 8–14 Nov ≈ 0 h, plus the domain fallback only if it is needed. 15–21 Nov ≈ 1.75 h (Founding copy, listing text, screenshots, record the one video, PDN #2 final, checklist). Marketing had 4.75 h across these weeks; this is about 2.35 h.

**Strongest argument against:** you may only get one shot with an editor. Spending it on a free calculator could make PDN skip the launch note. **My answer:** they are two different news items three weeks apart, and the first one is the only way to warm the list before launch [opinion]. If PDN doesn't run note #1 by 20/11, send note #2 to Lucy's email instead of the form, and expect less from it.

**What would change my mind:** PDN publishes note #1 and it brings fewer than 20 visits (`?ref=pdn1`) by 20/11. Then PDN's real reach is small. The launch week then rests on the list and Product Hunt, and December hours go to SEO pages.

## (b) YouTube and TikTok

**Decision:** open video accounts or not, and when. **At stake:** a small number of decorator views, against build hours.

**Checked:** see (a). New channels have no clickable links. Third-party guides say TikTok's bio link needs 1,000 followers or a registered business account. I found no official TikTok page, so this is **not verified** ([rocketlink](https://rocketlink.io/blog/how-to-put-link-in-tiktok-bio-without-business-account), [Shopify](https://www.shopify.com/blog/how-to-add-link-to-tiktok-bio)).

**Recommendation:**
- **YouTube: yes, one video.** Create the channel with pricebrush.app@gmail.com **by Sun 08/11** (5 minutes), so it has some history by 25/11. Use a logo avatar and no face. Record once in 15–21/11 on the working app and publish Wed 25/11. Put the address on screen for the whole video ("pricebrush.co.uk", or the pages.dev address). The same file goes into the Product Hunt gallery and can go on the listings, so one recording does three jobs.
- **ID verification** would make links clickable right away. It means giving your ID to Google (private, not public). That's your choice (question 4). The video works without it.
- **TikTok: no in 2026.** Revisit at 15/12, and only if the YouTube video got ≥ 100 views.
- **Instagram: no.** Its bio link for new accounts is not verified, and it's one more account to maintain.

**Strongest argument against:** decorators watch decorator YouTube (marketing found UK channels with 22k–79k subscribers). Four videos build a channel; one video is a test that will probably show "0 views" and teach nothing. And TikTok costs only about 6 minutes more per video. **My answer:** a new channel with no links and no audience is the weakest use of an MVP-week hour. The one video earns its place mainly as a demo for PH, the listings and PDN. **What would change my mind:** the 25/11 video reaches ≥ 300 views by 15/12. Then videos #2–#4 go in January, when there are no build weeks.

## (c) Product Hunt

**Checked:** see (a). Onboarding is required before posting, and the help page gives no account-age rule. The PH day starts at 12:01 AM Pacific time, which is 08:01 UK and 15:01 in Jakarta. So you can reply in writing in your evening, which is the UK afternoon.

**Recommendation: Accept.** Create a personal account with pricebrush.app@gmail.com and finish onboarding **by Sat 24/10** (0.25 h). Don't post anything. Prepare the draft on 21/11, launch Tue 24/11, cap the day at 1 h, and never ask for upvotes.

**Strongest argument against:** PH's audience is global tech makers, not UK decorators. It may bring 0 buyers, and the hour could go into an SEO page. **My answer:** it's 1 h, written only, with a durable backlink. **What would change my mind:** the 21/11 draft rules change to require a paid or "featured" step. Then do the free listings only.

## (d) Ad budget

**Decision:** spend part of the Rp500,000 on ads, or not. **At stake:** ~£21 of your money against near-zero expected sales.

**What I checked myself:**
- [fact] ECB rate on 16/10/2026: £1 = Rp24,045 and $1 = Rp18,031, so **Rp500,000 = £20.79** ([Frankfurter/ECB](https://api.frankfurter.dev/v1/latest?base=GBP&symbols=IDR,USD)). The PRD's "~£23" is out of date.
- [fact] Google Ads states **no minimum daily budget**. A day can reach 2× the daily budget, and a billing period is capped at 30.4× the daily budget ([Google Ads Help](https://support.google.com/google-ads/answer/2375454?hl=en-GB)). That page doesn't say whether a campaign end date caps the total at "days × daily budget". So marketing's "Rp35k × 14 days = Rp490k maximum" is **not verified**.
- [fact] P&D News has no paid option under £400 ([advertising](https://www.paintinganddecoratingnews.co.uk/advertising-with-us/)). That closes marketing's "decorator placement under £20" alternative.
- **Not verified:** the real CPC for our phrases (no Keyword Planner), whether Google takes an Indonesian card for UK-targeted ads, and Google promo credits in Indonesia. Marketing's CPC range (£1.55–£3.65) is third-party.

**Recommendation: Accept marketing. Spend £0 on ads in 2026.** No ads platform, no test. There is nothing to stop, so no stop rule is needed.

**Strongest argument against:** without Facebook, a Google search ad is the only way to appear in front of a decorator who is searching *today*, on a day we choose. Niche CPCs can be lower than averages. **My answer:** the buyer phrases barely show up in autocomplete (marketing's data), Google pauses "low search volume" keywords, and 6–14 clicks can't tell us anything. **What would change my mind:** from about four weeks after launch, Search Console shows UK impressions for buyer queries ("painting quote app", "decorator quote app") where we rank below position 20. Then decide a capped test in **January 2027**, not December, so it can't distract from the Founding window.

## (e) Domain

**Decision:** buy or not, which one, when, and should "first revenue buys the domain" change. **At stake:** trust and a clean address for every launch link, against ~Rp100k and a small amount of setup time in a tight week.

**What I checked myself:**
- [fact] **Non-UK individuals can register .co.uk.** Nominet's current Rules of Registration (4.2, 4.4) say they will not vet applications to "restrict who may apply". They also say they "do not impose restrictions on your status as applicant" in .co.uk ([UK rules of registration](https://nominet.uk/wp-content/uploads/2025/03/UK-rules-of-registration.pdf)). I searched the rules for "address for service" and found no such rule. GoDaddy's UK page still mentions one, which is probably outdated (my reading, not legal advice) ([GoDaddy](https://www.godaddy.com/en-uk/legal/agreements/about-uk-domains)).
- [fact] **Data checks can bite.** Nominet's Data Quality Policy says a postcode "is not applicable for other countries". It also says Nominet may try to validate registrant data. If it can't, it will ask for "corrected data or documentary evidence" (e.g. "a utility bill or similar"), and contact details that can't be validated "within 30 days" will be **suspended** ([Data Quality Policy](https://nominet.uk/wp-content/uploads/2025/03/Data-Quality-Policy.pdf)). A purchase on 23/10 puts the 30-day window at about 22/11, which is launch week. So answer any Nominet or registrar email within 3 days.
- [fact] New Nominet policies take effect 09/02/2027 and mention a future "Know Your Customer policy" ([interim policy](https://nominet.uk/wp-content/uploads/2026/07/UK-Interim-Data-Quality-Policy-2024-06.pdf)). That could matter at renewal in late 2027. It doesn't matter now.
- [fact] **Availability:** `pricebrush.co.uk`, `pricebrush.uk` and `pricebrush.com` all return RDAP 404 (not registered), with control domains returning 200 (Nominet and Verisign RDAP, 17/10).
- **Price:**
  - [fact] Cloudflare's own TLD list shows .co.uk as supported, with Nominet as registry ([Cloudflare TLD policies](https://www.cloudflare.com/tld-policies/)).
  - Cloudflare's price, **US$5.30 ≈ Rp95,600**, comes from a third-party mirror ([cfdomainpricing.com](https://cfdomainpricing.com/)). The real price shows only in your dashboard (**not verified**).
  - [fact] Porkbun's public price API gives .co.uk **US$5.66 a year, same renewal ≈ Rp102,100**, and .com US$11.08.
  - Card currency fees are **not verified**.
- [fact] **Moving later has a cost.**
  - Google says a move takes "a few weeks or more", and to expect "temporary fluctuation in site ranking during the move" ([site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)).
  - The Change of Address tool works "only on properties at the domain level" ([GSC Help](https://support.google.com/webmasters/answer/9370220?hl=en)). Whether it accepts a `pricebrush.pages.dev` URL-prefix property is **not verified**; `technical-seo.md` §9 already flags this.
  - Redirecting `*.pages.dev` uses **Bulk Redirects** ([Cloudflare](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)). That page doesn't say how preview URLs are handled.
- **UK IPO trademark search:** bot challenge (403), **not verified**. You have to do it yourself.

**31/10 vs 08/11 vs after the first sale:**

| | Launch on the domain 31/10 | Move on 08/11 (marketing) | Move after the first payment |
|---|---|---|---|
| Site move | **None** | Yes, after one week on pages.dev | Yes, after ~2 months, during the Founding window |
| GSC | A Domain property from day 1 (DNS TXT) | Change of address, with pages.dev eligibility unknown | Same, with more to lose |
| Links we can't edit (PDN articles, PDFs already sent) | Point at the final domain | Rely on 301s forever | Rely on 301s forever |
| Extra hours | ~0.75 founder + ~0.25 engineer, in the deploy week | ~0.5 founder + ~1 engineer, in an MVP week | ~1–2 h in Dec/Jan |
| Main risk | It adds a step to a tight deploy | Rankings wobble just before launch week | Rankings wobble while selling Founding |

**Should "first revenue buys the domain" change? Yes, but only for this one item.** That rule existed because the budget was Rp0. You have now allowed up to Rp500k. A ~Rp100k domain is a "sensible way" in a way ads are not. It is a known cost with a lasting effect: every launch link, PDF watermark and PDN article points at the final address, and a decorator paying £49 to an overseas developer sees a UK address, not a `pages.dev` one [opinion]. Everything else stays at Rp0 until the first revenue.

**Recommendation: Accept with changes.**
1. **Buy pricebrush.co.uk by Fri 23/10**, before Block C (T7 canonicals, target 24/10), so the build uses the domain from the start. Use Cloudflare Registrar (DNS and Pages are already there). Porkbun is the fallback, with nameservers pointed at Cloudflare.
2. **Only if all of these hold:**
   1. Your UK IPO search shows no "PriceBrush" or close mark in classes 9 and 42.
   2. Year 1 costs ≤ Rp120,000 at checkout.
   3. Checkout doesn't ask for a UK address.
   4. The lead confirms the switch is ≤ 1 h in the 31/10 plan.
3. **If it isn't bought by Wed 28/10** (go/no-go), don't touch it during the deploy. Launch on pages.dev, and move on **Sun 08/11** only if the lead says ≤ 1 h.
4. **If it isn't moved by 15/11**, freeze it. No move during launch week or December. Buy after the first payment and move in January.
5. **Don't buy .com or .uk now.** Revisit after the first payment, as redirects only.
6. Keep pricebrush.app@gmail.com everywhere. No domain email now.
7. Answer any Nominet or registrar email within 3 days. The rollback is to remove the Bulk Redirect (pages.dev serves again) and revert `SITE_URL`.

**Strongest argument against:** £0 is still a valid answer. The site move is already planned (`technical-seo.md` §9). On a site with almost no traffic, a move costs little, while a new step in the 31/10 deploy week could cost the launch date. And the domain alone won't make a sale by 31/12. **My answer:** the hard deadline (28/10) and the fallback protect the date, and the cost is small and known. **What would change my mind:** the lead says the switch is > 1 h, or the 28/10 go/no-go shows the build is behind. Then pages.dev on 31/10 without discussion.

## (f) Kill/pivot criteria and the 31/12 expectation

**What I checked:** PRD §9 (goal ≥ 1 payment by 31/12; review on 30/04/2027: stop or pivot if organic traffic doesn't rise for 3 months in a row and payments are below 5). The PRD founder block says "harapan realistis 1–3 Founding Member". Marketing now says 0–1. The 15/12 row in `./decisions-2026-10-18-revenue.md` sends December hours "to the FB group", which can't happen now.

**Recommendation:**
- **Keep the ≥ 1 payment goal by 31/12, the 15/12 checkpoint and the 30/04/2027 review date and rule.** Losing Facebook lowers the odds. It doesn't change what we are testing.
- **Change the hope:** plan for £0 (unchanged). Hope for **0–2 Founding sales by 31/12, centre 0–1** [estimate]. PDN's real numbers make me a little less gloomy than marketing's 0–1, but no one has data.
- **New 15/12 rule** (replaces "December hours go to the FB group and listings"): if fewer than 4 users are activated, December hours go to SEO pages and one PDN data story from anonymised calculator use. Only do the data story if the privacy text allows it (PRD 15/10).
- **Add one question to the 30/04/2027 review:** "Is there one repeatable channel, other than one-off launch posts, that brings decorators?" If not, fix the channel before changing the product.

**Strongest argument against:** UK decorators gather mainly on Facebook (marketing A1; the 2020 survey). An inbound-only founder without Facebook may never reach them. If that's true, it's better to know by 31/12 and pivot early than to wait until 30/04. **My answer:** one launch week isn't enough evidence to pivot. The 15/12 checkpoint already has fast rules. **Honest note:** the Facebook group is still the largest free decorator channel we know of. Not having an account is your choice, and I respect it. If you ever change your mind, that's the first channel to add back.

**What would change my mind:** after the launch tally (30/11), < 50 decorator visits across all ref tags. Then the channel problem is real. Bring the pivot discussion forward to 15/01/2027, as a discussion only. The kill date stays.

---

## Top 3 risks

| # | Risk | Mitigation | Owner |
|---|---|---|---|
| 1 | **Launch week reaches too few decorators**, so there are 0 sales by 31/12 | Early PDN note (02–06/11) to warm the "tell me" list; PDN launch note; tally on 30/11; 15/12 rules above | Founder (sends); marketing (copy) |
| 2 | **The domain step hurts the 31/10 deploy, or Nominet suspends the domain in launch week** | Buy by 23/10 or not at all before 31/10; hard stop 28/10; answer Nominet within 3 days; rollback = remove the Bulk Redirect + revert `SITE_URL` (≤ 15 min) | Founder; pricebrush-lead |
| 3 | **Marketing work eats MVP hours**, so checkout is late and launch week moves | Videos #1–#2 cut, Screwfix to December, ≤ 0.6 h marketing in 1–14 Nov; the lead's 1–21 Nov plan has a "minimum to take a payment" line | Founder; pricebrush-lead |

## Next actions (in order)

| # | When | Action | Founder h | Who |
|---|---|---|---|---|
| 1 | Sun 18/10 | Answer the 6 questions below (one word each is fine) | 0.25 | Founder |
| 2 | By Fri 23/10 | UK IPO search, own browser: [gov.uk/search-for-trademark](https://www.gov.uk/search-for-trademark), words "pricebrush" and "price brush", classes 9 and 42. Write one line: clear / not clear | 0.15 | Founder |
| 3 | By Fri 23/10 (if Q1 = yes and #2 is clear) | Cloudflare → Domain Registration → Register → `pricebrush.co.uk`. Registrant: you, as an individual, Indonesia; email pricebrush.app@gmail.com. **Stop** if > Rp120k or it asks for a UK address. Then run prompt L4 | 0.5 | Founder |
| 4 | By Sat 24/10 | Product Hunt personal account + onboarding with pricebrush.app@gmail.com. Post nothing | 0.25 | Founder |
| 5 | Right after #3 | Run **/pb-lead** with prompt L4 (plan edits for the domain) | 0.25 | pricebrush-lead (started by founder) |
| 6 | This week | Apply the PRD edits below once you accept | 0 | Main assistant |
| 7 | This week | Marketing updates `launch-plan.md` → v0.5 and `funnel.md` per the edits below, and drafts PDN note #1 by Fri 30/10 | 0 | Marketing |
| 8 | This week | SEO updates `technical-seo.md` §9, `measurement.md`, `link-building.md` and `keyword-map.md` line 7 (edits below) | 0 | SEO |
| 9 | Wed 28/10 | Go/no-go: is the domain in the build? If not, it waits until 08/11 | (in go/no-go) | Founder |
| 10 | Thu 29/10 – Sat 31/10 | F1–F3 as planned, with the domain steps if bought | (planned) +0.25 | Founder |
| 11 | Mon 02 – Fri 06/11 | Send PDN note #1 through the form (only after F2 passes and line D is live) | 0.5 | Founder |
| 12 | By Sun 08/11 | Create the YouTube channel (logo, no face); check Settings → Channel → Feature eligibility; verify ID only if Q4 = yes | 0.1 | Founder |
| 13 | Sun 08/11 (only if the domain wasn't in the 31/10 build) | Domain move per `technical-seo.md` §9, only if the lead says ≤ 1 h | 0.5 | Founder + pricebrush-lead |
| 14 | 15–21/11 | Founding copy (hidden), listing text + screenshots, record the one video, finalise PDN note #2, pre-post checklist | 1.75 | Founder; marketing drafts |
| 15 | 22–30/11 | Launch week per the (a) table | 3.5 | Founder |

**Prompt L4 — /pb-lead (only after the domain is bought)**
```
Read docs/ceo/decisions-2026-10-18-channels.md section (e). I bought pricebrush.co.uk on Cloudflare Registrar on [date]. Update docs/plan/2026-10-17-launch-31-oct.md so we launch on https://pricebrush.co.uk on 31/10: T7 SITE_URL and canonical acceptance on the new host (keep the trailing-slash rule); T4 S2 watermark link via SITE_URL; F1 add steps for Pages → Custom domains (apex pricebrush.co.uk, and www → 301 to apex) and a Bulk Redirect pricebrush.pages.dev → https://pricebrush.co.uk (301, preserve path and query, one hop). Check whether "include subdomains" would also redirect preview URLs; previews must keep working and stay noindex. F2: add curl checks for the 301 from pricebrush.pages.dev/paint-calculator/ to https://pricebrush.co.uk/paint-calculator/ in one hop. F3: Search Console Domain property by DNS TXT instead of the URL-prefix property; say whether T15 is still needed. Give me the total extra hours (engineer + founder). If it is more than 1 hour, or it puts 31/10 at risk, say so plainly and we stay on pages.dev for 31/10. Do not commit or push.
```

**Prompt F4 — /pb-frontend (only after the lead's L4 says go)**
```
Read docs/ceo/decisions-2026-10-18-channels.md (e) and the updated docs/plan/2026-10-17-launch-31-oct.md. Change SITE_URL in app/seo/meta.ts to "https://pricebrush.co.uk". Make the PDF watermark link in app/components/quote-template/quote-pdf.tsx use SITE_URL + "/?ref=wm" (T4 S2) instead of the hard-coded pages.dev address. Update tests that use the old host only where they test the real host. After pnpm build, grep build/client for "pages.dev" and report every hit. Nothing else. Do not commit or push.
```

## Questions for Arif (answer one by one)

1. **Domain:** may I use about Rp100k of the allowance for pricebrush.co.uk (not for ads)? *Yes / No*
2. **If yes:** will you do the UK IPO search and buy it **by Fri 23/10**, so we launch on it on 31/10? *Yes / No, do it 08/11 / No, after the first sale*
3. **YouTube:** OK to make a faceless channel with pricebrush.app@gmail.com and publish **one** video on 25/11? *Yes / No*
4. **YouTube ID check:** are you willing to verify your ID with Google so the links are clickable? *Yes / No (the address stays as text)*
5. **Early P&D News note** about the free calculator in the week of 02/11? *Yes / No*
6. **Ads:** agree to spend **£0 on ads** and leave about Rp400k unspent? *Yes / No*

## Exact edits to apply if accepted (owners in brackets; not applied)

- **PRD** [main assistant]
  - Founder block 18/10: "(~£23)" → "(≈ £20,79, kurs ECB 16/10/2026)".
  - Same block: "harapan realistis 1–3 Founding Member (~£35–105 bersih) di minggu launch 22/11" → "harapan realistis 0–2 Founding Member sampai 31/12 (tengah 0–1), karena tanpa Facebook; rencana tetap £0".
  - New block **"Keputusan 18 Okt 2026 (channel & iklan)"**:
    - "Iklan berbayar £0 di 2026; sisa allowance ±Rp400.000 tidak dipakai."
    - "Domain pricebrush.co.uk (≤ Rp120.000/tahun) dibeli dari allowance paling lambat 23/10 jika cek UK IPO bersih, lalu launch di domain 31/10; cadangan 08/11; jika tidak, setelah pembayaran pertama. Aturan 'revenue pertama beli domain' hanya diganti untuk domain ini."
    - "Minggu launch: email 'kabari aku' (22/11) → P&D News + direktori (23/11) → Product Hunt (24/11) → 1 video YouTube (25/11). Catatan P&D News pertama soal kalkulator gratis 02–06/11."
    - "YouTube ya (1 video, tanpa wajah); TikTok dan Instagram tidak di 2026; Screwfix mulai Desember."
    - "Checkpoint 15/12: kalau aktif < 4, jam Desember ke halaman SEO + satu data story untuk P&D News (bukan grup Facebook)."
  - §9 text: "dari minggu launch (direktori, forum, Product Hunt)" → "dari minggu launch (email 'kabari aku', P&D News, direktori, Product Hunt, video)".
  - §9 roadmap phase 3: "Directories, forums, Product Hunt" → "P&D News, directories, Product Hunt, video".
  - §9 30/04 review: add "Pertanyaan tambahan: ada satu channel berulang (bukan sekali launch) yang membawa decorator? Kalau tidak, perbaiki channel dulu sebelum ganti produk."
  - Open questions: "Cek trademark 'PriceBrush' di UK IPO sebelum beli domain" → add "(kelas 9 dan 42, paling lambat 23/10)".
  - Decision 15/10 "Domain belum dibeli…": add "→ diperbarui 18/10, lihat `docs/ceo/decisions-2026-10-18-channels.md` (e)".
  - Only if bought, §8 stack Hosting: "Cloudflare Pages (pricebrush.pages.dev)" → "Cloudflare Pages (pricebrush.co.uk; pricebrush.pages.dev redirect 301)".
- **Plan** `docs/plan/2026-10-17-launch-31-oct.md` [pricebrush-lead, via prompt L4]: only if the domain is bought; see L4.
- **`docs/marketing/launch-plan.md` → v0.5** [marketing]
  - 1–7 Nov: replace "create a YouTube channel and a TikTok account… Video #1" with "PDN note #1 (free calculator, `?ref=pdn1`) after F2 + line D; create the YouTube channel only (no TikTok)".
  - 8–14 Nov: remove video #2 and Screwfix registration.
  - 15–21 Nov: video #3 → "the one video", with the address on screen as text.
  - Launch week: drop TikTok from Wed 25/11, drop the Thu 26/11 Screwfix row, and swap the URLs if the domain is live.
  - 1–14 Dec: remove video #4; Screwfix answers start here.
  - "If it's not working": "< 100 views across videos #1–#4" → "< 100 views on the one video by 15/12 → no more videos in 2026".
  - Total hours updated.
  - Note that YouTube description and channel links need advanced features ([YouTube Help](https://support.google.com/youtube/answer/9890437?hl=en-GB)).
- **`docs/marketing/channels-and-ads-2026-10-18.md`** [marketing]
  - Status → "Accepted with changes (CEO 18/10 channels)".
  - A2 row 3: "Full-length description links: yes" → "only with advanced features (channel history or ID/video verification)".
  - A2 row 2: add the PDN figures above and "Editorial: always free of charge".
  - B5 date: 08/11 → "by 23/10, fallback 08/11".
- **`docs/marketing/funnel.md`** [marketing]: add `?ref=pdn1`; remove `?ref=tt`.
- **SEO** [SEO]
  - `technical-seo.md` §9: "migrate when the founder buys the domain from early revenue" → "domain bought from the founder's allowance before launch (CEO 18/10 channels (e)); if bought by 23/10 there is no migration, only the pages.dev → domain Bulk Redirect".
  - `measurement.md`: a GSC Domain property if the domain is bought.
  - `keyword-map.md` line 7: host.
  - `link-building.md`: register URLs; the marketing edits listed in `channels-and-ads-2026-10-18.md`.
- **Strategy** [strategist]: add PaintPilot to `competitors.md` (marketing's proposed row; the PDN item is checked above).
- **CEO** (done in this run): a status note in `./decisions-2026-10-18-revenue.md` marks row 10 cancelled and the 15/12 row replaced.

## Not verified

- UK IPO status of "PriceBrush" (the search page blocked scripted reads).
- Cloudflare's own .co.uk price and whether it accepts your card.
- Whether Nominet will ask you for documents.
- Whether GSC Change of Address accepts a pages.dev property.
- How Bulk Redirects treat preview URLs.
- The real CPC for our keywords; Google Ads with an Indonesian card; promo credits; whether a campaign end date caps total spend.
- TikTok bio-link rules (third-party only).
- PDN readership beyond their own self-reported ad-page figures, and their lead time.
- Whether the PaintPilot item was paid PR (no label shown; editorial is said to be free).
- UK Business Forums, Screwfix and Reddit rules (marketing's sources, not re-opened).

## Sources checked for this memo

- P&D News: [contact](https://www.paintinganddecoratingnews.co.uk/contact-us/) · [advertising](https://www.paintinganddecoratingnews.co.uk/advertising-with-us/) · [about](https://www.paintinganddecoratingnews.co.uk/painting-and-decorating-news-about-pdn/) · [PaintPilot item](https://www.paintinganddecoratingnews.co.uk/decorating-products/painter-decorator-launches-paintpilot/)
- Nominet: [UK rules of registration](https://nominet.uk/wp-content/uploads/2025/03/UK-rules-of-registration.pdf) · [Data Quality Policy](https://nominet.uk/wp-content/uploads/2025/03/Data-Quality-Policy.pdf) · [Interim Data Quality Policy (from 09/02/2027)](https://nominet.uk/wp-content/uploads/2026/07/UK-Interim-Data-Quality-Policy-2024-06.pdf) · RDAP lookups (rdap.nominet.uk, rdap.verisign.com) · [GoDaddy UK (older rule)](https://www.godaddy.com/en-uk/legal/agreements/about-uk-domains)
- Registrars: [Cloudflare TLD policies](https://www.cloudflare.com/tld-policies/) · [cfdomainpricing.com](https://cfdomainpricing.com/) (third-party) · Porkbun public pricing API (api.porkbun.com/api/json/v3/pricing/get)
- Google: [Ads budgets](https://support.google.com/google-ads/answer/2375454?hl=en-GB) · [Change of Address](https://support.google.com/webmasters/answer/9370220?hl=en) · [site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) · [YouTube feature tiers](https://support.google.com/youtube/answer/9890437?hl=en-GB)
- Cloudflare: [redirect pages.dev to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- Product Hunt: [how to post](https://help.producthunt.com/en/articles/479557-how-to-post-a-product)
- TikTok (third-party only): [rocketlink](https://rocketlink.io/blog/how-to-put-link-in-tiktok-bio-without-business-account) · [Shopify](https://www.shopify.com/blog/how-to-add-link-to-tiktok-bio)
- Rates: [Frankfurter/ECB 16/10/2026](https://api.frankfurter.dev/v1/latest?base=GBP&symbols=IDR,USD)

## Founder sign-off, 18/10/2026

Arif answered one question at a time (recorded by the main assistant):

1. About Rp100k of the allowance goes on **pricebrush.co.uk**, not on ads. **Yes.**
2. Facebook: **create a personal profile for groups only** (real name, non-face photo, bio "Software developer in Indonesia"). **No Meta or Google ads in 2026.** The remaining ~Rp400k stays unspent. This follows `../marketing/facebook-check-2026-10-18.md`. It replaces "no Facebook" in this memo; the CEO has not re-run on it.
3. UK IPO search and domain purchase on **Fri 23/10** (payday), launching on the domain 31/10. If it isn't done by 28/10, move on 08/11 (assumed from "oke, bagus"; Arif may correct).
4. Faceless YouTube channel with pricebrush.app@gmail.com, created by 08/11, one screen-recorded video on 25/11. **Yes.** Arif has never made a video, so marketing writes a click-by-click script and on-screen text (~15/11). Tools: Xbox Game Bar (`Win + Alt + R`) or OBS, edit in Clipchamp.
5. Google ID verification for clickable links: **No.** The address appears as text only.
6. Early P&D News note about the free calculator in the week of 02/11. **Yes.**
7. One written question to a group admin on 15/11 when the rules are silent on promotion. **Yes.**

Domain and registry checks by the main assistant, 18/10/2026:
- Registry RDAP shows pricebrush.co.uk, pricebrush.uk and pricebrush.com all unregistered. Nominet and Verisign were the sources; the method was checked against bbc.co.uk and google.com.
- Companies House has no company named "PriceBrush" or "Price Brush".
- A web search found no "PriceBrush" mark.
- The UK IPO search is captcha-blocked, so Arif does it by hand.

Founder cash timing: paid 23/10 this month, then on the 25th. Nothing can be spent before payday.
