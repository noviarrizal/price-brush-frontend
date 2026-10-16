# PriceBrush — Design research (v0.2)

Date: 15/10/2026 · Author: UI/UX · Source of truth: `../PRD.md` (incl. §6.1 "desktop is first-class", decided 15/10/2026)

## 0. Method (what changed from v0.1)

- v0.1 was text-only. v0.2 is based on **images I actually looked at**: 65 captures opened with the Read tool, **59 usable** (6 were block pages, HTTP errors or a 404 — listed in §1.8, not counted).
- Captured locally with `tools/capture-ref.ps1`: App Store screenshots (UK store) and headless-Chrome renders of public pages at 1440 px (desktop) and 390 px (phone). Nothing was uploaded.
- Files live in `research/refs/` (git-ignored; third-party images are for internal reference only, never published).
- Pinterest loads its pin grid behind a login modal; the pins around the modal were visible enough to read colours, type and layout. Dribbble search grids rendered fine, but the thumbnails are small (good for patterns, not detail). Behance returned HTTP 400 both times.
- "Take" = what we borrow as a principle. "Avoid" = what we will not do. No layout, logo or illustration is copied.

## 1. Moodboard — references actually viewed

### 1.1 Competitor apps — App Store screenshots (UK store)

| # | Reference (file in `research/refs/`) | What I saw | Take | Avoid |
|---|---|---|---|---|
| 1 | [Tradify](https://apps.apple.com/gb/app/id984378901) `tradify-appstore-1` | Bright "trades blue" (#0A84FF-ish) band, real UK lads by a van, phone showing a "Sales" list: Enquiries / Quotes / Invoices with coloured dots and thin outlined "New Quote" buttons | Real tradespeople, not stock models | Thin outlined buttons with 13 px text — too faint for gloves and sunlight |
| 2 | Tradify `-2` | Big white rounded cards on blue: "Save 10+ hrs/week", "+40% accepted quotes", "No more paperwork!" | Quantified time-saving claims | Map/scheduling — breadth we don't sell |
| 3 | Tradify `-3` | 9 coloured feature tiles: Invoices, Enquiries, Schedule, Quotes, Timesheets, Job tracking… | — | Feature sprawl is exactly what Dave doesn't want |
| 4 | Tradify `-4` | "Take Onsite Payment" card form; pale green "Pay £22.00" button with white text; Xero/Sage/QB logos | — | Low-contrast pale green primary (fails outdoors) |
| 5 | [Powered Now](https://apps.apple.com/gb/app/id622739610) `poweredof-appstore-1` | **Black background, yellow highlight, condensed uppercase headline** "ALL-IN-ONE SOFTWARE FOR TRADES"; app list of coloured "+" rows (New Quote, New Invoice, New Cost…) | — | **Black + yellow + condensed caps is Powered Now's look** — a UK direct competitor. Key evidence against v0.1 "Signwritten" |
| 6 | Powered Now `-2` | "WIN MORE WORK": 5-step "Select Layout" wizard over an A4 quote with orange table header and "YOUR LOGO" | Logo-led A4 document | 5-step wizard for a layout; tiny document text |
| 7 | Powered Now `-3` | Expenses list: green header bar, 4 round icon buttons, red "Reject" bars, green "Approved" tabs | — | Many saturated colours fighting; red/green blocks as buttons |
| 8 | Powered Now `-4` | Gas-safety certificate form, dense grid | — | Density — PriceBrush has no certificates |
| 9 | [Joist](https://apps.apple.com/gb/app/id592163563) `joist-appstore-1` | Black + green diagonal, white "JOIST" wordmark; Estimates list empty state with clip-art document + "Create New" (green) next to "Upgrade Now" (outlined) | Empty state that tells you what to do | Two CTAs side by side (create vs upgrade) — breaks "one primary action" |
| 10 | Joist `-2` | Five yellow stars + big review quote on black | Real review as social proof (later, when we have one) | — |
| 11 | Joist `-3` | Invoice #1024 with SEND · PAYMENTS · SIGN · MORE toolbar and a **Desktop / Mobile preview toggle** | Previewing the document as the client will see it | Toolbar of 4 equal actions |
| 12 | Joist `-4` | Invoice preview + signature pad overlay | Accept by signature/name on the document | — |
| 13 | [Invoice2go](https://apps.apple.com/gb/app/id540236748) `invoice2go-appstore-1` | Light grey app; **A4 preview at top, then "Total £240.00 · Due in 15 days" + "SENT" tag + one big blue "Send" button**, then "Mark as paid" | **Document preview → total → one primary action.** Best mobile review pattern seen | Orange/blue blobs in marketing |
| 14 | Invoice2go `-2` | Edit screen: Subtotal / Discount / "VAT (excl.) 20% of £200" / Total rows; "Preview" and **"Saved ✓"** in the top bar | VAT line that explains itself; saved status in the bar | Payment-method toggles (out of scope) |
| 15 | Invoice2go `-3` | Reports: "Total outstanding £1,440.00" in big type, client rows with amounts | Big money numbers, plain rows | — |
| 16 | Invoice2go `-4` | Quote 2 preview, "Convert to invoice" floating row | One-tap convert placed right under the quote | — |
| 17 | [YourTradebase](https://apps.apple.com/gb/app/id1536395722) `yourtradebase-appstore-1` | Navy header band, white bold sans; quote email composer; checkboxes "Can see this quotation online", "Must provide a signature"; green "Send" + grey "Discard" | Plain-English send options | Rich-text toolbar on a phone |
| 18 | YourTradebase `-2` | Schedule week view, small grey text | — | Grey-on-white secondary text |
| 19 | YourTradebase `-3` | "Invoice on the go, **on site or on the sofa**." Line editor with price-list autocomplete ("Hallway — install LED…"), "Add another work item" | Confirms desktop/sofa use (PRD §6.1); autocomplete from price book (P1) | Dotted-underline fields that don't look tappable |
| 20 | YourTradebase `-4` | Client invoice: **"Due 14th April · Ref. 1 · Total £900" summary first**, big green "Pay online", then the document | Client page leads with the summary and one action | Card-payment button (out of MVP) |
| 21 | [Jobber](https://apps.apple.com/gb/app/id1014146758) `jobber-appstore-1` | Dark green-teal with rough torn edges, lime underline; "Hey Jobber, I need to start a quote…" chat bubbles; quote card with "Review & Send" / "Approve" | Voice → draft quote card is now a category norm | Chat-bubble metaphor (we want a form result, not a chat) |
| 22 | Jobber `-2` | "Close job & invoice now" lime highlighted option; invoice with grey skeleton lines | Highlighting the one next step | — |
| 23 | Jobber `-3` | Quote for Casey Young, **$2,470.72 big at top**, "Approve & Pay Deposit" dark button + "Request Changes" | Total big and early on the client side | Deposit payments (out of scope) |
| 24 | Jobber `-4` | "Tap to Pay" collect-payment screen | — | — |
| 25 | [Invoice Simple](https://apps.apple.com/gb/app/id694831622) `invoicesimple-appstore-1` | A4 invoice with green table header band, photos attached | Clean A4 grid | Photo collages on invoices |
| 26 | Invoice Simple `-2` | Purple icon list of features on dark | — | Purple SaaS look |
| 27 | [VoxTrade](https://apps.apple.com/gb/app/id6757826704) `voxtrade-appstore-1` | Navy-black, "Still doing **quotes at night**?" (orange highlight); teal round record button, waveform, Voice/Camera/Text tabs, room chips | The "quotes at night" pain is real across competitors | Tabs + waveform + chips crowd the record screen; tiny text |
| 28 | VoxTrade `-2` | "Speak **once** on site", recording 00:03, "No notes yet" | One spoken take | Thin waveform bar — decorative CPU cost |
| 29 | VoxTrade `-3` | Tasks/materials list auto-created | — | — |
| 30 | VoxTrade `-4` | "Quote ready before you leave", orange "TOTAL £20,280" badge over purple-headed A4 | Total as the hero number | Orange badge on purple |
| 31 | [Fixxa (homeowner app)](https://apps.apple.com/gb/app/id6746466532) `fixxa-appstore-1` | Photo collage of US trades, black wordmark | — | Not our persona (homeowners) |
| 32 | Fixxa `-2` | **Cream background, black text, yellow pill "Submit request" at the bottom** | Pinned bottom primary | **Cream + black + yellow is also a current generic look** — second strike against v0.1 |
| 33 | Fixxa `-3` | "Your pro" card, black bar with yellow "Scheduled" tag | — | Same palette again |
| 34 | [Otter](https://apps.apple.com/gb/app/id1276437113) `otter-appstore-1` | Floating blue mic button bottom-right, cards list | Mic reachable from anywhere (desktop: keyboard shortcut) | Charts and bells |
| 35 | Otter `-2` | Transcript with speaker names, timestamps, playback bar | Transcript shown as plain readable paragraphs | — |
| 36 | [Checkatrade for Trades](https://apps.apple.com/gb/app/id1498194074) `checkatrade-trades-appstore-1` | Blue-violet, tradesman with mug, red-icon notification pills "2 Invoices Paid", "3 Quotes Approved" | Status as a short sentence with a number | Blue-violet (Checkatrade's colour) |

### 1.2 Competitor and adjacent websites — desktop and phone renders

| # | Reference | What I saw | Take | Avoid |
|---|---|---|---|---|
| 37 | [Tradify UK — desktop](https://www.tradifyhq.com/uk) `tradify-site-desktop` | Black/blue split hero, real crew photo, orange "Start Free Trial", Trustpilot box, "Call us today 0800…", sticky "Tap here for a free 14-day trial!" pop-up | Proof near the CTA | Pop-up + phone number + demo = sales culture we position against |
| 38 | Tradify UK — phone 390 px `tradify-site-mobile` | Headline cut off on the right ("All Your Jobs — O…"), sticky trial bar covering content | — | **Their mobile page overflows at 390 px** — we must test every page at 360 px |
| 39 | [YourTradebase — desktop](https://www.yourtradebase.com/) `yourtradebase-site-desktop` | "Paperwork made easy." huge navy bold; green "Try it free" + outlined "Watch a demo"; "Free 30 day trial · No credit card · Cancel anytime"; a **real decorator's Job Sheet** ("Dawson and Dawson Decorators", "2x Decorators — daily rate", "White Exterior Gloss Paint (6L)") | Trust line under the CTA; decorator vocabulary on documents (day rate, litres) | Navy + green (theirs); "Click, click, done." gold slogan |
| 40 | [Joist — desktop](https://www.joist.com/) `joist-site-desktop` | Green promo band, "Estimate, Invoice and Get Paid Faster", two CTAs (blue + black), tablet with 9-item sidebar incl. "Joist Lending" | Sidebar nav works on desktop | 9 sections; lending upsell; two competing CTAs |
| 41 | [Fixxa AI (UK) — desktop](https://www.fixxa.ai/) `fixxa-site-desktop` | Near-black + teal, "Worried about Making Tax Digital?", thin grey body text on dark, 3 step cards | 3-step "how it works" | Fear-led headline; **low-contrast thin grey on black** |
| 42 | Fixxa AI — phone `fixxa-site-mobile` | Same, text cut on the right at 390 px | — | Overflow at phone width (again) |
| 43 | [FreeAgent — desktop](https://www.freeagent.com/) `freeagent-site-desktop` | UK accounting: blue band, warm serif headings, green CTA, Trustpilot; illustration of a balloon | Warm, confident UK tone | Illustration-heavy hero (performance) |
| 44 | [Zoho Invoice UK — desktop](https://www.zoho.com/uk/invoice/) `zoho-invoice-desktop` | "Free VAT invoicing software", laptop with sidebar dashboard + phone; blue primary + outlined demo | Laptop + phone shown together = "same tool, both places" | Generic blue SaaS; dashboard charts |
| 45 | [Invoice-Generator.com — desktop](https://invoice-generator.com/) `invoice-generator-desktop` | **The page *is* the document**: editable A4 sheet ("+ Add Your Logo", Bill To, dark table header, + Line Item, Subtotal/Tax/Total) with **Save & Send / Download in a right rail**; how-to text below for SEO | **Desktop free-quote tool and desktop editor: WYSIWYG document + right action rail**; SEO text under the tool | US fields (Ship To, PO Number) |
| 46 | [Stripe Invoicing](https://stripe.com/gb/invoicing) `stripe-invoicing-desktop` | Hosted invoice mock: **£144.78 big, "Due on 21 Feb 2021"**, To/From/Memo, then payment | Amount + due date first on the client page | Gradient swoosh, card form |

### 1.3 Paint calculators

| # | Reference | What I saw | Take | Avoid |
|---|---|---|---|---|
| 47 | [Dulux UK calculator](https://www.dulux.co.uk/en/paint-calculator) `dulux-calculator-desktop` | Cookie wall over a 2-step form; step 1 "Select a product" before you can measure; greyed-out step 2; "Calculate Result" button disabled | Numbered steps | **Product-first and a "Calculate" button** — our result updates live, measurement first |
| 48 | [Tikkurila UK](https://www.tikkurila.co.uk/how-much-paint-do-i-need) `tikkurila-calc-mobile` | At 390 px: headline cut off, stock photo, then a tiny embedded calculator image ("Just click on the image below"), long tips text | Tips text under the tool (SEO) | Calculator buried under a photo; tiny inputs; overflow |

### 1.4 Dribbble (search grids)

| # | Reference | What I saw | Take | Avoid |
|---|---|---|---|---|
| 49 | [Dribbble "invoice app"](https://dribbble.com/search/invoice-app) `dribbble-invoice-app` | Mostly white/grey phone trios, big balance numbers, coloured status pills, one purple dashboard | Big total + pill status is the norm users know | Pastel gradients, dense 11 px lists |
| 50 | [Dribbble "voice recording app"](https://dribbble.com/search/voice-recording-app) `dribbble-voice-recording` | Large centred round record button (often red), big timer "00:32:07", waveform; many purple "AI" gradients | One huge centred control + big timer | Purple AI gradients, robot mascots, waveforms |
| 51 | [Dribbble "construction app"](https://dribbble.com/search/construction-app) `dribbble-construction-app` | **Yellow + black dominates** (geospatial dashboard, "Building Strong Roofs"), orange 3D buildings | — | **Yellow/black = construction cliché** (third strike for hi-vis yellow as brand) |
| 52 | [Dribbble "invoice dashboard"](https://dribbble.com/search/invoice-dashboard) `dribbble-invoice-dashboard` | Desktop: left sidebar + table; first shot shows **"Create invoice" form left, live invoice preview right** | **Desktop editor = form left, live A4 preview right** | Dark dashboards full of KPIs |

### 1.5 Pinterest (search grids behind login modal)

| # | Reference | What I saw | Take | Avoid |
|---|---|---|---|---|
| 53 | [Pinterest "painter decorator van signwriting"](https://www.pinterest.com/search/pins/?q=painter%20decorator%20van%20signwriting) `pinterest-van-signwriting` | Hand-lettered vans: **deep coach green with cream and gold lettering**, oxblood red with cream script, condensed shadowed caps; modern white vans with blue/red vinyl and phone numbers | **Real signwriting palette is coach green / oxblood + cream + gold**, not navy + hi-vis | Script fonts, drop-shadow ornament, rainbow vinyl |
| 54 | [Pinterest "painting company branding"](https://www.pinterest.com/search/pins/?q=painting%20company%20branding) `pinterest-painting-branding` | Brushes and rollers in nearly every logo (McNeil, SG Painting, H3P, Roberto); paint drips; one calm dark-teal identity on a van and polo | Calm one-colour identities read as premium | **Brush/roller/drip marks** — confirmed cliché |
| 55 | [Pinterest "signwriting lettering van uk"](https://www.pinterest.com/search/pins/?q=signwriting%20lettering%20van%20uk) `pinterest-signwriting-uk` | Green and red heritage vans; modern UK vans in **anthracite grey with cream/white condensed lettering** (Cobalt Electrical, a decorating van); one hi-vis orange van | Dark body + cream lettering + one small bright detail | — |
| 56 | [Pinterest "decorator business card uk"](https://www.pinterest.com/search/pins/?q=decorator%20business%20card%20uk) `pinterest-decorator-card` | Navy cards with painter-on-ladder clip-art; black + gold/yellow plasterer cards; cream + gold "home decor" cards | Cream + one dark colour feels "established" | Clip-art painters; black+yellow again |
| 57 | [Pinterest "invoice app ui"](https://www.pinterest.com/search/pins/?q=invoice%20app%20ui) `pinterest-invoice-ui` | Browser "Create Invoice" form with line items; phone invoice detail "$4,000.00"; "Approve & Pay" pill | Line items with a description + secondary detail line | Pastel sky backgrounds |

### 1.6 Interaction reference kept from v0.1 (text sources, still valid)

These were not images, but the facts still drive rules: GOV.UK invoice must-haves ([gov.uk](https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include)); outdoor contrast ([apario](https://blog.apario.net/on-writing-software-for-people-who-work-outside)); glove targets ([Glance](https://thisisglance.com/learning-centre/how-should-i-design-apps-for-construction-workers)); 12 m²/L, door 1.8 m², window 1.5 m², +10 % spare ([Loom & Glow](https://www.producthunt.com/p/paint-calculator-by-loom-glow/paint-calculator-by-loom-glow), Homebase); Tradify "opened" status bug ([Capterra](https://capterra.com/p/152413/Tradify/reviews/)).

### 1.7 Free assets checked

| Asset | Licence | Use |
|---|---|---|
| [Lucide](https://lucide.dev/license) | ISC | Icon set |
| [Archivo](https://fonts.google.com/specimen/Archivo) | SIL OFL 1.1 | Display + money (one variable woff2) |
| System font stack | — | Body/UI (zero download) |

### 1.8 Captures that failed (opened, not counted)

| Target | Result |
|---|---|
| powerednow.com | "Sorry, you have been blocked" (Cloudflare/Kinsta) |
| getjobber.com | Bot-verification page |
| invoiceninja.com | Blocked (Kinsta) |
| behance.net search ×2 | HTTP 400 |
| calculator.net paint | 404 |
| omnicalculator.com | Headless Chrome hung; killed |

## 2. What the images tell us

1. **The category's palettes are taken.** Tradify = bright blue + orange. Powered Now = black + yellow + condensed caps. YourTradebase = navy + green. Joist = black + green / violet-blue. Jobber = dark green-teal + lime. Fixxa (UK) = black + teal. Checkatrade = blue-violet. FreeAgent / Zoho / Invoice2go = blue.
2. **Hi-vis yellow on black/cream is not ours to own.** Powered Now (#5) uses it in the UK, the Fixxa homeowner app (#32–33) uses cream + black + yellow, and Dribbble "construction" (#51) is a sea of yellow/black. v0.1 "Signwritten" would look like Powered Now's cousin.
3. **Real signwriting is coach green / oxblood + cream + gold** (#53, #55). The heritage idea in v0.1 was right; its palette was not what signwriters actually paint.
4. **Yellow still works as a *signal*, not a brand.** On a deep green body it reads like gold-leaf lettering on a van (#53). As a small, single "tap here" colour it keeps the outdoor contrast we need (10.2:1 with ink text).
5. **Best mobile review pattern:** document preview → big total → one primary button (Invoice2go #13, #16). Best client page: summary (total, due/valid) first, then one action, then details (YourTradebase #20, Stripe #46, Jobber #23).
6. **Best desktop pattern:** form/lines on the left, live A4 preview on the right, actions in a right rail (Dribbble #52, Invoice-Generator #45). Joist's Desktop/Mobile preview toggle (#11) shows the client's view.
7. **Competitors break at phone width.** Tradify, Fixxa and Tikkurila pages overflow at 390 px (#38, #42, #48). A clean 360 px page is a real differentiator.
8. **Low contrast is everywhere:** Tradify's 13 px outline buttons, its pale-green pay button, Fixxa's thin grey on black, Dulux's greyed steps. We keep every text pair ≥ 4.5:1 (most ≥ 7:1).
9. **Voice UIs over-decorate** (VoxTrade tabs + waveform + chips; Dribbble purple AI). One big control, a big timer, nothing else.
10. **Brushes, rollers, drips are the trade's logo cliché** (#54, #56). Keep the wordmark-first logo.

## 3. Three candidate directions (re-evaluated against the images)

### A. "Signwritten" (v0.1, unchanged) — navy/ink + hi-vis yellow + cream, Archivo condensed

- **For:** outdoor contrast; trade-native in theory.
- **Against (new evidence):** same territory as Powered Now (#5) and the Fixxa homeowner app (#32); construction cliché on Dribbble (#51); navy is YourTradebase's colour (#17, #39); not the palette signwriters actually use (#53).
- **Verdict:** not supported as is.

### B. "Coachline" — Signwritten corrected to the real van palette (recommended)

- **Palette:** **coach green** `#1E3D2E` as the brand body (logo tile, hero band, desktop sidebar), **cream paper** `#F6F3EC`, near-black green ink `#14201A`, and **signal yellow** `#F4C430` reserved for the single primary action (reads as the gold lettering on a green van). A thin gold **coachline** (the painted pinstripe on vans) is our one decorative device.
- **Type:** Archivo semi-condensed, **sentence case** (not Powered Now's all-caps), system sans for body.
- **For:** traceable to real UK signwriting (#53, #55); no UK competitor uses coach green + cream (§2.1); keeps the 10.2:1 yellow/ink primary; looks "established firm", good for Sophie's clients; dark mode is a natural green-black.
- **Risks:** Jobber's dark green-teal (#21) is in the same family — ours is yellower, warmer and paired with cream, not lime; green brand vs green "Accepted" chip — solved by keeping brand green out of all status chips (Accepted uses a brighter green + check icon + word).

### C. "Clean Sheet" — white + ink + one cobalt blue, document-first

- **For:** most "invoice-like" (Invoice2go #13, Invoice-Generator #45, Stripe #46); simplest to build.
- **Against:** indistinguishable from Invoice2go, Zoho, FreeAgent and Tradify blue (§2.1); no trade character for Dave.

### Recommendation: **B. Coachline**

We keep what v0.1 got right (heritage lettering, paper, one accent, no clip-art) and correct what the images disproved (the navy + hi-vis yellow palette and the all-caps condensed look, which belong to Powered Now and to the construction cliché). From C we take the document-first layouts on every surface.

**Assumptions to test with the 5–10 decorators (PRD §2):** (1) coach green + cream reads "proper firm", not "garden centre"; (2) yellow primary is noticed on cracked, dim Android screens outdoors; (3) decorators like the client page leading with the total.
