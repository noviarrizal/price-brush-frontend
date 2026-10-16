# PriceBrush — Link building on £0 (v0.2)

Date: 15/10/2026 · Updated 16/10/2026 · White-hat only (Google Search Essentials / spam policies). **Never:** paid links, PBNs, link exchanges, guest-post farms, comment/forum spam, fake reviews, paid "launch" directories, AI-generated mass outreach.

Reality check: a brand-new `pages.dev` site earns links slowly. The fastest honest wins are (1) free product listings, (2) the free tools being genuinely the best answer, (3) one data story people want to cite. **Decided 16/10/2026:** no domain at launch — all early listings point to `https://pricebrush.pages.dev/`. Links survive the later move through 301s (`technical-seo.md` §9), and every profile we control gets edited to the new domain, so log each one in the register below.

## 1. Free listings (launch week 23–30 Nov 2026)

Use one consistent name, one-line description and logo everywhere. Description (≤ 160 chars): *"Quote and invoice app for UK painters and decorators. Say the job, get an itemised quote, send it on WhatsApp. No per-user fees."*

| Listing | Cost | Notes |
|---|---|---|
| **AlternativeTo** (alternativeto.net) | Free | List as an alternative to Tradify, Powered Now, Joist, Invoice2go. Can also list the free paint calculator. |
| **SaaSHub** (saashub.com) | Free | Add alternatives/competitors. |
| **Product Hunt** | Free | Launch on a weekday in launch week; maker comment explains the decorator problem honestly; don't ask for upvotes (against PH rules) — ask people to try it and comment. |
| **Indie Hackers** | Free | Product page + one "building in public" post with real numbers (tool users, sign-ups). |
| **Capterra / GetApp / Software Advice** (Gartner) | Free basic vendor listing | Needs a working product + privacy policy; reviews later from real Founding Members (PRD asks each for one review — allowed if no incentive is tied to a positive rating; disclose any incentive per Capterra's rules). |
| **G2** | Free profile | Same as above. |
| **BetaList** | Free (slow queue) | Submit early in November; free tier can take weeks. |
| **Google Business Profile** | Free | Only if the founder has an eligible real business address — **don't** create one with a fake UK address. |
| Trade press "new product" desks | Free | Painting & Decorating News published items on AppyQuote and other decorator tools (see research) — send a short, factual press note at launch. |

### 1b. Listings register (fill in as you go — needed for the domain move)

Use a stable sign-in (one email for all listings; the founder's Google account where possible) so profiles can be edited later. Prefer listing the **home page URL** (not deep links) so only one URL per site needs changing.

| Site | Profile URL | Login (which account) | URL listed | Date listed | Can edit URL later? | Updated to new domain |
|---|---|---|---|---|---|---|
| AlternativeTo | | | https://pricebrush.pages.dev/ | | yes | |
| SaaSHub | | | https://pricebrush.pages.dev/ | | yes | |
| Product Hunt | | | https://pricebrush.pages.dev/ | | yes (product page) | |
| Indie Hackers | | | https://pricebrush.pages.dev/ | | yes | |
| Capterra / GetApp | | | https://pricebrush.pages.dev/ | | via vendor portal | |
| G2 | | | https://pricebrush.pages.dev/ | | yes | |
| BetaList | | | https://pricebrush.pages.dev/ | | ask support | |
| Forum/Reddit posts | (list each) | | | | usually **no** — rely on 301s | n/a |

Watermark link in free PDFs: generated from the `SITE` constant, so new PDFs switch automatically; old PDFs rely on the 301s.

## 2. Free tools as link magnets

- **Paint calculator:** the most linkable asset — DIY bloggers, letting/landlord blogs, home-improvement forums answer "how much paint do I need" constantly. Make the result **shareable** (URL with room numbers) and add a small "Embed this calculator" `<iframe>` snippet later (P2) with a plain credit link (not keyword-stuffed; Google treats widget links with suspicion if anchors are manipulative — use the brand name, and `rel="nofollow"` is acceptable).
- **Quote & invoice templates:** linked by "start a decorating business" articles, college course pages (City & Guilds painting & decorating courses), and new-starter forum threads.
- **Watermark** "Made with PriceBrush" on every free PDF and client link → brand exposure to homeowners (not a SEO link; still valuable).

## 3. Digital PR with real data (one project, Dec–Jan)

Pick **one** and do it properly:

1. **"Do paint tins really cover what they say?"** — collect the claimed m²/L for 30–40 popular UK emulsions from manufacturers' public data sheets/retailer pages (Dulux, Crown, Johnstone's, Valspar, Leyland, GoodHome, Farrow & Ball, Little Greene…), plus price per litre at 3 retailers on one date. Publish a sortable table: coverage claim, price per litre, **price per m² per coat**. Angle for DIY press (Ideal Home, Homebuilding & Renovating, Real Homes) and money sites ("cheapest paint per square metre"). Pure public data, repeatable every 6 months.
2. **"What UK decorators charge in 2027"** — **approved in principle by the founder (16/10/2026)** using anonymised, aggregated quote data. Preconditions (`technical-seo.md` §9b): terms + privacy policy updated first; only price/line data, never client details; at least 10 decorators per published figure; data only from after the policy went live. Realistic timing: spring 2027 at the earliest (needs enough paying/active users). Real data beats the unsourced day-rate tables ranking today (the UK proxy SERP for "painter and decorator day rate uk" is full of programmatic rate sites with no sources).

Outreach: 10–20 personal, relevant emails per project, written by the founder. No mass mailers.

## 4. Communities (help first, link rarely)

| Community | Rule of thumb |
|---|---|
| r/DIYUK | Most paint threads are **mist coat / new plaster** problems (v0.2 sample) — that's where helpful answers are needed. Answer paint-quantity and prep questions fully **in the comment**. Link the calculator only when it directly answers the question and the sub's rules allow it. Read sidebar rules first. |
| r/smallbusinessuk (r/uktrades not visible in the Reddit archive — check it exists/is active before planning on it) | Trade subs dislike app promotion. Real recurring threads to help in: invoicing software, late payers, underpricing, "how did you start" (v0.2 sample, `data/reddit-sample-2026-10-16.md`). Contribute on quoting/invoicing/VAT questions; mention PriceBrush only if asked, and disclose "I build this". Check self-promotion rules (many have a weekly promo thread). |
| UK Business Forums | Has strict promotion rules (signature links usually after a post count) — follow them. |
| The Decorators Forum (thedecoratorsforum.com) | Ask for feedback openly as the founder ("I've built a free paint calculator for decorators — what's wrong with the defaults?"). This doubles as PRD persona validation. |
| Facebook groups for UK decorators | Ask admins before posting anything about the product; many allow "feedback" posts on set days. |
| MoneySavingExpert forums | DIY board threads on paint/decorator costs — helpful answers; MSE bans affiliate/promotional links. |

Log every post (date, community, link, outcome) in a simple table so nothing gets repeated — repeated drops look like spam and get the account banned.

## 5. Not doing (and why)

- Paid "AI tool" directories, "DA 50 backlink" packages, Fiverr link gigs — paid links violate Google's spam policies.
- Link swaps with other SaaS — link schemes.
- Fake reviews or review-for-discount — against Google, Capterra and UK CMA rules (DMCC Act 2024 bans fake reviews).
