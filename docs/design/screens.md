# PriceBrush — Screens (v0.3.2)

Date: 17/10/2026 · Direction "Coachline" (**approved by the founder 17/10/2026**, `../ceo/decisions-2026-10-17.md` #5) · Tokens/components: `design-system.md` · Prototypes: `prototypes/` · Images: `images/` · URLs, titles and H1s: `../seo/keyword-map.md` (founder decision 15/10/2026)

Conventions: **[Primary]** = the one yellow button (phone: pinned bottom; desktop: top of the right rail). *(P1)* = PRD P1, designed now. **Desktop** = layout at ≥ 1024 px (PRD §6.1). Example data: Dave Holt, "Holt Decorating", Leeds, not VAT registered, day rate £200; client Mrs Anita Patel, 12 Oak Road. Host: `https://pricebrush.pages.dev` (no custom domain yet). Public page URLs end with a slash (`/paint-calculator/`), app routes do not. Copy in quotes is final UK English unless marked *draft*.

Global status (app bar right / desktop top bar): `Saved` · `Saving…` · `Offline — will sync` · `Couldn't save — tap to retry`.
Global offline banner (after 5 s offline): "You're offline. Everything's saved on this phone and will sync when you're back."

| Screen | Phone prototype | Desktop prototype | Status |
|---|---|---|---|
| Landing `/` | `landing.html` | `desktop-landing.html` | v0.3 (new hero) |
| Paint calculator | `paint-calculator.html` (multi-room) | — | phone v0.3; desktop next |
| Quote template | — | — | v0.3 (spec below) |
| Invoice template | `decorating-invoice-template.html` | — | desktop in v0.3 |
| Quotes | `quotes.html` | — | desktop list + detail in v0.3 |
| New quote | `new-quote.html` (+ `--recording`, `--processing`) | in editor (add-work bar) | v0.2 |
| Review / edit quote | `review-quote.html` | `desktop-quote-editor.html` | v0.2 |
| Send sheet | `send-sheet.html` | dialog (spec) | v0.2 |
| Client quote page | `client-quote.html` | — | phone v0.3; desktop next |
| Invoice | `invoice.html` (+ `--overdue`) | — | desktop in v0.3 |
| Paywall | `paywall.html` | dialog (spec) | v0.2 |
| Settings | — | — | v0.3 (spec below) |

---

## Public SEO pages (no login)

All public pages: header (wordmark → `/` · Paint calculator · Quote template · Invoice template · Pricing · Log in · secondary "Start free" **after the MVP launch only**; pre-MVP the header has no "Start free" and no "Log in", the Invoice template link appears from 14/11/2026, and the only CTA is "Price a room free"). Plan-card buttons ("Start free", "Become a Founding Member") also appear only after the MVP, footer (Paint calculator · Quote template · Invoice template · Pricing · Guides · About · Privacy · Terms · "pricebrush.pages.dev · Made for UK decorators."). Lighthouse ≥ 90: one font file, no hero video, no carousel, no pop-ups.

### P1 · Landing `/`

Copy per `../ceo/decisions-2026-10-17.md` #2 (accepted 17/10/2026). Voice ships with the paid MVP (1–21 Nov), so the hero only promises what works on 31 Oct.

- **Title:** PriceBrush: Quote & Invoice App for UK Decorators · keyword line above the H1: "Quote and invoice app for UK painters and decorators" · **H1:** "Room sizes in. Priced quote out."
- **Sub:** "Coats, litres, days and labour worked out from your day rate. Every number shown, every line yours to change. Made for UK decorators."
- **[Primary] until the MVP is live:** "Price a room free" → `/paint-calculator/` (calculator icon). Caption "No sign-up. No per-user fees. No sales calls."
- **[Primary] after the MVP:** "Start a free quote" → sign-in / new quote. Caption "Free for 5 documents a month. No card needed."
- **Never say:** "60 seconds" (competitors' titles use it) or "one tap" for quote → invoice. Use **"When it's accepted, it's an invoice."** ("Cancel in one tap" stays: it is true, see A11.)
- **Purpose:** turn search/referral traffic into a first priced room, then a first quote.
- **Truth rule (CEO 18/10/2026 P1, accepted):** before the app exists the home shows **only what works today**: paint calculator → quote template → PDF (invoice template from 14/11/2026). App features and plans are labelled **"Coming late November"**. **No Founding Member card and no "X of 50 places" until checkout works** (fake urgency otherwise). No "Log in", no "Start free", no plan buttons. If the MVP slips, change "late November" the same day. Prototypes: `landing.html`, `desktop-landing.html` (v0.3.2).
- **Phone layout (pre-app, 31/10):** header (wordmark only) → green hero band (keyword line, H1, sub, primary, caption) → "Every number shown. Every line yours." (Dave's room sizes → calculator lines with m², coats, days; caption "Worked out by the free paint calculator at a £200 day rate. Every line is yours to change before you download the PDF.") → How it works ("Put in the rooms" · "Check the lines" · "Download the PDF" — "A tidy quote with your name on it. Send it on WhatsApp or by email yourself.") → Free tools (calculator, quote template live; invoice template card not a link, tag "Coming soon" until 14/11) → strip **"The app is coming in late November"** ("Say the rooms instead of typing them. Send your client a link they can accept. When it's accepted, it's an invoice. Until then, the tools above are free.") → Pricing: Free + Pro only, each tagged "Coming late November", caption "Plans open with the app. Nothing to buy yet." → FAQ (true answers only, below) → footer (no Invoice template link until 14/11). Primary repeats pinned at the bottom (same action).
- **Desktop (pre-app):** two-column hero on coach green (copy left; right: phone mock of the calculator — 2 rooms, "13.9 litres", "Your price at your day rate £865" (spec T5), "Turn this into a quote" — beside the A4 quote); header links Paint calculator · Quote template · Pricing (Invoice template joins on 14/11); 3 step cards ending "Download the PDF"; 4 promises strip, all true today ("No per-user fees. Ever." · "No sales calls. No demos." · "No sign-up for the free tools." · "Nothing you type leaves your browser."); 3 tool cards (invoice "Coming soon"); "app is coming" strip; 2 plan cards without buttons, tagged "Coming late November"; FAQ 2 × 2.
- **FAQ before the app (only true answers):** "Is it really free?" — "Yes. The paint calculator and the quote template are free, with no sign-up and no card." · "Do you keep what I type?" — "No. Both tools work in your browser. Nothing you type leaves it." · "Do I need to be VAT registered?" — "No. Leave VAT off. If you are registered, turn VAT on in the quote template and we add 20%." · "Can I make an invoice?" — "Not yet. The free invoice template is coming soon. The app, where an accepted quote becomes an invoice, comes in late November." (Change the invoice answer on 14/11.)
- **After the app opens (late Nov):** add back "Log in" / "Start free", plan buttons, the Founding Member card (only once checkout works), the promises "Cancel in one tap." · "Export your data free.", and these FAQs: "Can my client accept online?", "What if I've got no signal?", **"How do I cancel?"** — "Settings → Plan → Cancel plan. One tap, no phone call. You keep Pro until the end of the period you paid for, and you can undo it until then."
- **After the MVP (late Nov):** re-test the H1 against "Say the rooms. Get a priced quote." with a 5-second test (5+ decorators); swap only if it clearly wins.
- **States:** signed-in visitor → primary "Open my quotes".
- **Re-test (late Nov, once voice works):** 5-second test of this hero against "Say the rooms. Get a priced quote." with 5+ decorators; swap if that wins.

### P2 · Paint calculator `/paint-calculator/`

Per `../ceo/decisions-2026-10-17.md` #1 and #3 (accepted 17/10/2026). Prototype: `paint-calculator.html` (2 rooms, mist coat on in the hallway).

- **Title:** Paint Calculator UK: How Much Paint Do I Need? | PriceBrush · **H1:** "Paint calculator: how much paint do I need?"
- **Intro:** "Litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and your price. Free, no sign-up, nothing stored."
- **Rooms (one card each, metres, decimal keypad):** room name ("Room 1") + "Remove" (only when 2+ rooms) · Length · Width · Height (2.4) · Doors stepper (1) · Windows stepper (1) · Coats 1/2/3 (2) · switch "Include the ceiling" · switch **"New plaster? Add a mist coat"** (hint "One extra watered-down coat and drying time, on its own line."). Below the cards: secondary **"+ Add another room"** (focuses the new room's name; removing shows toast "Hallway removed").
- **"Your day rate" card:** Day rate £200 · m² a day 40 (*assumption*; hint "Each coat counts towards your m² a day. 40 is our starting guess — change it to yours.") · collapsed "Paint and spare": coverage 12 m²/L ("Coverage is on the tin — use that if it's different."), spare 10 %, paint £6/L (*assumption*).
- **Output (live, no button — unlike Dulux, research #47):** "You need 14.0 litres" · "Buy: Walls 1 × 10 L · Ceiling 1 × 5 L · Mist coat 1 × 2.5 L" (tins per paint) · **"The working"**: one line per room and surface, e.g. "Living room walls · 2 coats · 37.0 m² · 1.9 days" (4.6 × 3.8 × 2.4 m, 1 door, 1 window) (a mist coat is its own line: "Hallway mist coat · new plaster · 1 coat + drying") · "Time on the job" (labour days + ½ day drying once per job if there's a mist coat, rounded up to ½ day; not charged) · **"Your price at your day rate"** £… with split "labour £… + paint £…" · secondary "Copy result".
- **Maths (shared with the quote engine; `../specs/paint-calculator.md` is the source of truth, signed off 17/10/2026):** walls = 2 × (L + W) × H − 1.8 m² per door − 1.5 m² per window; ceiling = L × W; labour days per line = m² × coats ÷ m² a day (1 dp); litres per paint (walls / ceiling / mist coat) = coated m² ÷ coverage × (1 + spare), shown rounded up to 0.1 L, bought as 10 / 5 / 2.5 L tins (fewest tins within 1 L of the least spare); mist coat = 1 extra coat over the room's walls (+ ceiling), plus ½ day drying once per job on "Time on the job" that is **not** charged as labour (*assumption*).
- **CTA card (green):** "Pricing a job like this?" / "We'll put every room on a quote, one line per surface, with the working shown. Change any line, then download the PDF." → [Primary] **"Turn this into a quote"** → `/decorating-quote-template/`, pre-filled with the lines above (CEO #1). Caption "Free. No sign-up. Nothing you type leaves this browser."
- **Below:** "How we work it out" (7 steps incl. the mist coat, SEO text), "No tape measure?" tip — **the number comes from the engine, never typed by hand** (CEO 18/10/2026 P2/R2): "A 4 × 4 m room, 2.4 m high, with 1 door and 1 window needs about {calc: 4×4 room, walls only, 2 coats} litres for two coats on the walls." The engineer fills `{calc:}` from `calculateJob` at the page defaults (`../specs/paint-calculator.md`). For reference only: the plan's S1 check gives **6.5 litres (1 × 5 L + 1 × 2.5 L)** at today's defaults; the old "about 5 litres" was wrong. Prototype `paint-calculator.html` shows the 6.5 L reference value (v0.3.2). Links to `/guides/how-to-price-a-painting-job/`.
- **States:** empty ("Enter a room size to see litres"), invalid per room (field outlined + "Length must be more than 0, like 3.5."), very large (> 30 m: "That's a big room — double-check the numbers").
- **31 Oct cut order (CEO #1):** single room + litres + days + price → quote template + PDF → pre-fill hand-over → multi-room → walls / ceiling / woodwork switches → mist coat. 1–4 must ship on 31 Oct. (Woodwork is in the cut order but not yet in the prototype.)
- **Desktop (later):** inputs left, sticky result card right, SEO text full width below.

### P3 · Quote template `/decorating-quote-template/` (PRD F2)

- **Title:** Free Painting & Decorating Quote Template UK | PriceBrush · **H1:** "Free painting and decorating quote template (UK)"
- **Layout:** like P4 but quote fields: Your business · Client + job address · Quote number (Q-0001), date, "Valid for" chips 14 / 30 / 60 days · lines · VAT toggle · notes · **[Primary] "Download PDF"**. Links: "Work out the paint first" → `/paint-calculator/`; "Job done? Make the invoice" → `/decorating-invoice-template/`. SEO section: "What should a painting quote include?" + worked example (no pricing method — that's the guide's job, keyword map).
- **Pre-filled from the calculator (CEO #1):** arriving from "Turn this into a quote" fills one line per room and surface with the working as the detail ("Living room walls · 2 coats · 37.0 m² · 1.9 days — £380.00"), plus one "Paint" line; banner "We brought over 2 rooms from the paint calculator. Check the lines, then add the client." Every line stays editable. Arriving directly: empty, one blank line.
- **FAQ** adds "Should I ask for a deposit?" and "Do I need a mist coat on new plaster?" (`../seo/briefs/decorating-quote-template.md`).
- **Never** uses the word "invoice" in title/H1 (cannibalisation rule).
- **Prototype:** not built yet (the calculator already links to `decorating-quote-template.html`).
- **Desktop:** the page *is* the document (research #45): editable A4 sheet centre, right rail with [Primary] Download PDF, "Nothing you type leaves this browser."

### P4 · Invoice template `/decorating-invoice-template/` (new in v0.2; live 14/11/2026, CEO #1)

- **Title:** Free Painting & Decorating Invoice Template UK | PriceBrush · **H1:** "Free painting and decorating invoice template (UK)"
- **Intro:** "Fill it in, download a PDF. Invoice number, due date, bank details and VAT if you're registered. No sign-up."
- **Content order:** breadcrumb "Free tools › Invoice template" → H1 → **Your business** (business or trading name, address, phone or email) → **Bill to** (client name, address) → **Invoice details** (invoice number INV-0001, invoice date, "Work finished on" with hint "The 'supply date'. UK invoices should show it.", payment due chips 7 / **14** / 30 days → "Due 30/10/2026") → **The work** (description full width, amount + remove; "+ Add line"; "I'm VAT registered" switch → VAT number + 20 %; Subtotal / Total due) → **How to pay you** (account name, sort code, account number; "Reference on the invoice: INV-0001") → ghost "Start with a quote instead" → green card "Sent a quote already? With PriceBrush, when a quote is accepted, it's an invoice: same lines, next number, bank details filled in." [on-brand "See how PriceBrush works"] → "What should be on a UK invoice?" checklist (source GOV.UK) + link "Do decorators charge VAT?".
- **Pinned:** "Nothing you type here leaves your phone. The PDF has a small 'Made with PriceBrush' mark." + **[Primary] "Download PDF"**.
- **States:** empty → primary disabled "Add at least one line"; missing sort code → "Add a sort code so your client can pay you"; making → "Making your PDF…"; done → toast "PDF downloaded."
- **Desktop (later):** WYSIWYG A4 like P3.

### P5 · Pricing `/pricing/`

- **Title:** PriceBrush Pricing: Free, Pro £9/month, No Per-User · **H1:** "Simple pricing. No per-user fees."
- Same 3 plan cards as the landing; FAQ "How do I cancel?" (same answer as P1). Prices: "£9 a month, incl. VAT" · "£79 a year, incl. VAT" · "£49 once, incl. VAT" (decision #6, accepted 17/10/2026; Polar tax set to Inclusive). Plan buttons appear after the MVP launch. **Before checkout works:** Free + Pro cards only, tagged "Coming late November"; no Founding Member card, no "X of 50" (CEO 18/10/2026 P1). FAQ "Can I cancel Founding Member?": "It's a one-off payment, so there's nothing to cancel." Any price comparison includes Queezy, is dated and sourced, and says "No per-user fees", never "cheaper" (CEO #4).

### P6 · About `/about/`

- **Title:** About PriceBrush: Who Builds It and Why · **H1:** "About PriceBrush"
- Founder and guide author (CEO 18/10/2026 P2, P3, Q5, accepted): **"Arif Noviarrizal — independent developer building PriceBrush, based in Indonesia."** Country only, no city. **No photo.** Then: why he built it; how the calculator defaults were chosen. **No invented credentials** (he is not a decorator; never imply it). Contact: a PriceBrush mailbox — **address TBD by the founder**; never his personal email. Guides show "By Arif Noviarrizal" + date.
- **Layout:** single text column (max 672 px on desktop), H1 → author line → "Why I built PriceBrush" → "How the calculator works out its numbers" (link `/paint-calculator/`) → "Contact" (mailbox). No hero image.
- Until the page is live it stays out of the footer and sitemap (CEO P7 cut order #5).

---

## Sign-up & onboarding (< 90 s, Flow B)

### A1 · Sign in
Wordmark, H2 "Start quoting in a minute", **[Primary] "Continue with Google"** (*check Google branding rules*), caption "We only use your name and email. No spam, no sales calls." Errors: "Google sign-in didn't finish. Try again." · offline "You need signal to sign in the first time." **Desktop:** centred 440 px card on cream.

### A2 · Your business (1 of 2)
"Business name" + "Town or city" (required). Link "Add logo, address, VAT number, bank details later". **[Primary] "Next"** (disabled hint "Business name and town are needed for your quotes").

### A3 · Your day rate (2 of 2)
H2 "What's your day rate?" £ (200). Hint "We use this to price labour. You can change it per job." Toggle "I'm VAT registered" → VAT number. **[Primary] "Start my first quote"** → A5.

---

## App (logged in)

### A4 · Quotes (home)

- **Phone:** app bar "Quotes" + status; search "Search by client name"; filter pills All · Draft · Sent · Accepted · Paid (wrap to 2 rows, no hidden pills); list (design-system 9.6); meter "3 of 5 free documents used this month"; **[Primary] "+ New quote"** above the bottom nav.
- **Desktop (later):** sidebar · list pane 420 px (search, pills, rows; ↑/↓ moves, Enter opens) · detail pane (document preview + status timeline + the status's primary: Sent → "Send again", Accepted → "Turn into invoice", Overdue → "Send a reminder").
- **States:** empty ("No quotes yet" / "Your first one takes about a minute." / [Start a quote]); loading (4 skeletons); no results ("No quotes for 'Smyth'. Check the spelling or clear the search."); offline (banner + "Not synced yet"); error ("Couldn't load your quotes. Pull down to try again."). *(P1)* toast "Anita Patel accepted Q-0012".

### A5 · New quote — idle / recording / transcript / processing

- **Idle:** H2 "Describe the job like you'd tell a mate." Example in a grey card. Mic **[Primary]** 112 px "Tap to talk", "Up to 2 minutes". Ghost "or type it".
- **Recording:** nav hidden; "0:24 / 2:00"; "Recording"; pulse; "Tap to stop"; "Say rooms, surfaces, coats, colour, and the client's name and address."; ghost "Cancel" → "Bin this recording?" [Bin it] [Keep recording].
- **Transcribing:** "Writing it down…". **Transcript:** H2 "Is this right?" editable 18 px text, "Fix any words we got wrong. We don't keep the recording.", secondary "Record again", **[Primary] "Build my quote"**.
- **Processing (≤ 15 s):** "Building your quote" / "Usually under 15 seconds." steps "Reading the job…" → "Measuring rooms…" → "Pricing labour at £200 a day…" → "Adding paint and materials…"; after 15 s "Taking longer than usual — your words are saved." + "Keep it as a draft".
- **Typed:** placeholder "e.g. Hallway, stairs and landing. Walls and woodwork, two coats…"; primary disabled under 10 characters ("Tell us a bit more about the job").
- **Errors:** no mic permission → typing becomes primary; "We couldn't hear that clearly. Try again somewhere quieter, or type it."; offline → "No signal. We'll write it down when you're back online."; AI failed → "We couldn't build the quote this time. Your words are saved." [Try again] · "Build it myself"; 6th document → A10 *before* processing.
- **Desktop:** "New quote" opens the editor (A6 desktop) empty, with the add-work bar focused: press **M** (or click the mic) to talk through the laptop mic, or just type. Same steps appear inline under the bar.

### A6 · Review / edit quote

- **Phone:** app bar back · "Q-0012" · Draft · Saved. Client card ("Mrs Patel", "12 Oak Road, Leeds LS6 2AB", "+ Add phone or email") → "1 line to check" summary → "The job" lines (Living room — walls £220.00 · Living room — ceiling £140.00 · Hallway — walls £160.00 **"Check this — we estimated the wall area." [Looks right]** · Paint & materials £95.00) → "+ Add line" → totals (Subtotal · "Add discount" · "Not VAT registered" · **Total £615.00**) → notes → ghost "See what Mrs Patel will see". Pinned: "Total · valid 30 days £615.00" + **[Primary] "Send quote"**.
- Sending with a flag left → "1 line still says 'check this'. Send anyway?" [Check it now] [Send anyway].
- **Edit line sheet:** Description · Detail · Days × day rate (£200) · Price · [Save line] · "Delete line".
- **Desktop (`desktop-quote-editor.html`):** sidebar · top bar ("Quotes" back · "Q-0012 · Mrs Patel" · Draft · Saved · "Last change 18:42") · left: add-work bar, client 2 × 2 fields, inline-editable lines (detail sub-row, check-this row), "Add line" ("or press Enter in the last amount"), totals, notes, shortcut legend · right rail (sticky): **[Primary] "Send quote" (Ctrl ↵)**, "Download PDF", "Copy link", toggle "PDF (A4) / Client's phone", live A4 preview, caption "Live preview. 'Check this' flags never appear on what Mrs Patel sees."
- **States:** empty ("No lines yet"), saving/offline per global, line error "Price missing".

### A7 · Send sheet

"Send Q-0012 to Mrs Patel" · "Quote · valid until 13/11/2026 · £615.00" + "Preview" · **[Primary] "Send on WhatsApp"** (icon rules `design-system.md` §6.1) (text: "Hi Mrs Patel, here's your quote from Holt Decorating for £615.00: https://pricebrush.pages.dev/q/7fK2…  Any questions, just reply. Dave") · Email ("No email saved") · Copy link → "Link copied" · Download PDF · "Edit message" · Free caption "Free plan: your quote shows a small 'Made with PriceBrush' mark. Remove it". After send: Sent + "Marked as sent." (only add "We'll tell you when she opens it" if open-tracking is real). Offline: "The link works once you're back online — we'll sync first." **Desktop:** 480 px dialog from the rail's primary; "Copy link" first on desktop (WhatsApp Web may not be signed in), WhatsApp second.

### A8 · Quote detail (sent / accepted)

Read-mostly A6 + timeline ("Sent 14/10/2026 18:42 · Accepted by Anita Patel 16/10/2026 09:15"); editing warns "Editing will update the link Mrs Patel has." Primary: Sent → "Send again"; Accepted → **"Turn into invoice"**. Overflow: Duplicate *(P1)* · Revoke link · Delete.

### A9 · Invoice

- **Phone:** "INV-0001" + status; banner "Invoice made from Q-0012. Check the dates and bank details, then send."; client + "From Q-0012"; Invoice date 16/10/2026 · Work finished 16/10/2026 · Due 30/10/2026 · Payment terms 14 days; lines; totals ("Total due"); "Pay by bank transfer" card (name, sort code, account, reference INV-0001) or "Add bank details so Mrs Patel can pay you". Primary: Draft → **"Send invoice"** (WhatsApp text "Hi Mrs Patel, here's your invoice INV-0001 for £615.00, due 30/10/2026: [link]. Bank details are on it. Thanks, Dave"); Sent/Overdue → **"Mark as paid"**.
- **Overdue *(P1, cut first if the build is late on 14/11 — CEO #3)*:** chip + "3 days overdue (due 30/10/2026)." + "Send a reminder" → opens WhatsApp (`wa.me`) with the editable text "Hi Mrs Patel, just a reminder that invoice INV-0001 for £615.00 was due on 30/10/2026. The bank details are here: [link]. Thanks, Dave". Polite: no threats, never mentions "interest". History list.
- **Mark as paid sheet:** "When did the money come in?" (today) · "How?" Bank transfer / Cash / Other · [Mark as paid] → toast "Nice one. INV-0001 marked as paid."
- **Desktop (later):** same two-column editor as A6 with invoice fields and A4 invoice preview.

### A10 · Paywall (Go Pro)

Trigger: 6th document in a calendar month or "Remove watermark". "You've used 5 free documents this month." · "Go Pro for £9 a month, incl. VAT. Cancel any time." · compare by task · radio cards Monthly £9 / Yearly £79 / Founding Member £49 once, each captioned "incl. VAT" ("37 of 50 left · ends 31/01/2027") · "Secure checkout by Polar. No per-user fees. No sales calls." · "Your free documents reset on 01/11/2026." · terms above the button ("You'll pay £9 today (incl. VAT), then £9 every month. Cancel in one tap in Settings.") · **[Primary] "Continue to checkout"** · ghost "Not now — stay on Free". States: "Opening checkout…", cancelled → "No problem — nothing was charged.", sold out "All 50 taken", success → A12. **Desktop:** 560 px dialog, plans side by side.

### A11 · Settings

- Sections (56 px rows): Business (name, town, logo, address, phone, email, VAT number) · Pricing (day rate, paint £/L, default coats, quote valid 30 days, invoice due 14 days; price book *(P1)*) · Plan ("Free — 3 of 5 used" / "Pro — renews 15/11/2026") · Your data ("Export everything (CSV)", "Delete my account") · Help · Log out.
- Free → primary "Go Pro".
- **Cancel — one tap, no confirm dialog** (CEO #7, accepted 17/10/2026): Pro → ghost destructive **"Cancel plan"** on its own row at the foot of Plan, away from other buttons. One tap sets cancel-at-period-end (takes effect at the end of the period already paid). Toast (persists until dismissed or 10 s): **"Cancelled. You keep Pro until 15/11/2026. [Undo]"**. The Plan row then reads "Pro — ends 15/11/2026" with secondary **"Resume Pro"** until that date. Optional one-tap "Why?" chips after cancelling (Too expensive · Not using it · Missing a feature · Other); no survey wall, no retention offer.
- **Undo / Resume states:** "Resuming…" (spinner, `aria-busy`) → toast "Pro resumed. Renews 15/11/2026." · failed → toast (persists) "Couldn't resume — try again" [Retry], and the row still shows "Pro — ends 15/11/2026": the Plan row always shows the real state from the server, never an optimistic guess · period ended → "Resume Pro" disappears, plan is Free, primary "Go Pro".
- **Founding Member:** no "Cancel plan" (one-off payment); row reads "Founding Member — paid once, nothing to cancel".
- If Undo turns out to cost more than ~1 h extra (lead's call), use the confirm dialog instead **and** change every "Cancel in one tap" to "Cancel in two taps. No phone call." Never both.
- Delete: type "DELETE"; "This removes every quote, invoice and client. It can't be undone."
- **Desktop (later):** section list left (240 px), form right (max 640 px), auto-save per field with "Saved".

### A12 · Checkout return

"You're on Pro." / "Unlimited documents, no watermark, your logo on everything." [Back to my quotes]. Webhook pending (≤ 1 min): "Finishing up… this takes up to a minute."

---

## Client-facing (public link, no login)

### C1 · Client quote page `/q/{token}`

- **Phone (`client-quote.html`):** decorator header (monogram/logo, "Holt Decorating", "Dave Holt · Painter & decorator · Leeds", [Call Dave] [**Message Dave on WhatsApp**], stacked full width; icon per `design-system.md` §6.1) → **summary card first** ("Quote for Mrs Patel" · Q-0012 · **£615.00** · "Total · not VAT registered · valid until 13/11/2026") → details (For · Job address · Date · Valid until) → "The work" lines → totals → notes → secondary "Download PDF" → ghost "Ask Dave a question" → "Made with PriceBrush" (Free only). Pinned **[Primary] "Accept quote"** *(P1)*.
- **Accept sheet:** "Accept this quote?" · "£615.00 for decorating at 12 Oak Road." · "Your full name" · "By accepting you agree to the price and notes above. Dave will be in touch to book the dates." · [Accept quote] → "Accepted by Anita Patel on 16/10/2026. Holt Decorating has been told."
- **States:** expired ("This quote expired on 13/11/2026. Ask Holt Decorating for an updated one."), revoked ("This link is no longer active."), not found, offline ("You're offline — this is the last saved copy.").
- **Desktop (later):** A4 document centred (max 820 px) with the summary + Accept in a sticky right card.
- No PriceBrush nav or sign-up prompts beyond the footer badge.

### C2 · Client invoice page `/i/{token}`

As C1 with "Invoice INV-0001", invoice date, work finished, **Due 30/10/2026**, bank card with "Copy sort code" / "Copy account number" / "Copy reference"; **[Primary] "Copy bank details"** (no card payments in MVP). Paid: "Paid — thank you."
