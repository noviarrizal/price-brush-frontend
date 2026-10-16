# PriceBrush — Screens (v0.2)

Date: 16/10/2026 · Direction "Coachline" (proposed, pending founder review) · Tokens/components: `design-system.md` · Prototypes: `prototypes/` · Images: `images/` · URLs, titles and H1s: `../seo/keyword-map.md` (founder decision 15/10/2026)

Conventions: **[Primary]** = the one yellow button (phone: pinned bottom; desktop: top of the right rail). *(P1)* = PRD P1, designed now. **Desktop** = layout at ≥ 1024 px (PRD §6.1). Example data: Dave Holt, "Holt Decorating", Leeds, not VAT registered, day rate £200; client Mrs Anita Patel, 12 Oak Road. Host: `https://pricebrush.pages.dev` (no custom domain yet). Copy in quotes is final UK English unless marked *draft*.

Global status (app bar right / desktop top bar): `Saved` · `Saving…` · `Offline — will sync` · `Couldn't save — tap to retry`.
Global offline banner (after 5 s offline): "You're offline. Everything's saved on this phone and will sync when you're back."

| Screen | Phone prototype | Desktop prototype | Status |
|---|---|---|---|
| Landing `/` | `landing.html` | `desktop-landing.html` | v0.2 |
| Paint calculator | `paint-calculator.html` | — | desktop in v0.3 |
| Quote template | — | — | v0.3 (spec below) |
| Invoice template | `decorating-invoice-template.html` | — | desktop in v0.3 |
| Quotes | `quotes.html` | — | desktop list + detail in v0.3 |
| New quote | `new-quote.html` (+ `--recording`, `--processing`) | in editor (add-work bar) | v0.2 |
| Review / edit quote | `review-quote.html` | `desktop-quote-editor.html` | v0.2 |
| Send sheet | `send-sheet.html` | dialog (spec) | v0.2 |
| Client quote page | `client-quote.html` | — | desktop in v0.3 |
| Invoice | `invoice.html` (+ `--overdue`) | — | desktop in v0.3 |
| Paywall | `paywall.html` | dialog (spec) | v0.2 |
| Settings | — | — | v0.3 (spec below) |

---

## Public SEO pages (no login)

All public pages: header (wordmark → `/` · Paint calculator · Quote template · Invoice template · Pricing · Log in · secondary "Start free"), footer (Paint calculator · Quote template · Invoice template · Pricing · Guides · About · Privacy · Terms · "pricebrush.pages.dev · Made for UK decorators."). Lighthouse ≥ 90: one font file, no hero video, no carousel, no pop-ups.

### P1 · Landing `/`

- **Title:** PriceBrush: Quote & Invoice App for UK Decorators · **H1:** "Quote any decorating job in 60 seconds. Just say it." · keyword line above the H1: "The quote and invoice app for UK painters and decorators."
- **Purpose:** turn search/referral traffic into a first voice quote.
- **Phone layout:** header → green hero band (keyword line, H1, sub "No per-user fees. No sales calls. Cancel in one tap.", **[Primary] "Try it free — say a job"**, caption "Free for 5 documents a month. No card needed.") → "You talk. We write the quote." (transcript → lines with a "check this") → How it works (3 steps) → Free tools (3 cards) → Pricing (Free / Pro / Founding) → FAQ → footer. Primary repeats pinned at the bottom (same action).
- **Desktop:** two-column hero on coach green (copy left; phone mock + A4 quote right, side by side); 3 step cards; 4 promises strip ("No per-user fees. Ever." · "No sales calls. No demos." · "Cancel in one tap." · "Export your data free."); 3 tool cards; 3 plan cards (secondary buttons, so yellow stays the hero CTA); FAQ 2 × 2.
- **States:** signed-in visitor → primary "Open my quotes".

### P2 · Paint calculator `/paint-calculator`

- **Title:** Paint Calculator UK: How Much Paint Do I Need? | PriceBrush · **H1:** "Paint calculator: how much paint do I need?"
- **Intro:** "Litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and a rough price. Free, no sign-up, nothing stored."
- **Inputs (metres, decimal keypad):** Length · Width · Height (2.4) · Doors (1) · Windows (1) · Coats 1/2/3 (2) · "Include the ceiling" · "Your rates and paint" (collapsed): coverage 12 m²/L ("check your tin"), spare 10 %, day rate £200, speed 45 m²/day (*assumption*), paint £6/L (*assumption*).
- **Output (live, no button — unlike Dulux, research #47):** "You need 6 litres" · "Buy 1 × 5 L + 1 × 2.5 L" · area · "About 2 days" · "Rough price £438 (labour £400 + paint £38)" · secondary "Copy result".
- **CTA card (green):** "Pricing a job like this?" → [Primary] "Quote by voice in 60 seconds — try free". Link "Turn this into a quote" → `/decorating-quote-template`.
- **Below:** "How we work it out" (5 steps, SEO text), "No tape measure?" tip, links to `/guides/how-to-price-a-painting-job`.
- **States:** empty ("Enter the room size to see litres"), invalid ("Height must be more than 0"), very large (> 30 m: "That's a big room — double-check the numbers").
- **Desktop (v0.3):** inputs left, sticky result card right, SEO text full width below.

### P3 · Quote template `/decorating-quote-template` (PRD F2)

- **Title:** Free Painting & Decorating Quote Template UK | PriceBrush · **H1:** "Free painting and decorating quote template (UK)"
- **Layout:** like P4 but quote fields: Your business · Client + job address · Quote number (Q-0001), date, "Valid for" chips 14 / 30 / 60 days · lines · VAT toggle · notes · **[Primary] "Download PDF"**. Links: "Work out the paint first" → `/paint-calculator`; "Job done? Make the invoice" → `/decorating-invoice-template`. SEO section: "What should a painting quote include?" + worked example (no pricing method — that's the guide's job, keyword map).
- **Never** uses the word "invoice" in title/H1 (cannibalisation rule).
- **Desktop (v0.3):** the page *is* the document (research #45): editable A4 sheet centre, right rail with [Primary] Download PDF, "Nothing you type leaves this browser."

### P4 · Invoice template `/decorating-invoice-template` (new in v0.2)

- **Title:** Free Painting & Decorating Invoice Template UK | PriceBrush · **H1:** "Free painting and decorating invoice template (UK)"
- **Intro:** "Fill it in, download a PDF. Invoice number, due date, bank details and VAT if you're registered. No sign-up."
- **Content order:** breadcrumb "Free tools › Invoice template" → H1 → **Your business** (business or trading name, address, phone or email) → **Bill to** (client name, address) → **Invoice details** (invoice number INV-0001, invoice date, "Work finished on" with hint "The 'supply date'. UK invoices should show it.", payment due chips 7 / **14** / 30 days → "Due 30/10/2026") → **The work** (description full width, amount + remove; "+ Add line"; "I'm VAT registered" switch → VAT number + 20 %; Subtotal / Total due) → **How to pay you** (account name, sort code, account number; "Reference on the invoice: INV-0001") → ghost "Start with a quote instead" → green card "Sent a quote already? With PriceBrush your quote turns into this invoice in one tap…" [on-brand "Turn quotes into invoices in one tap"] → "What should be on a UK invoice?" checklist (source GOV.UK) + link "Do decorators charge VAT?".
- **Pinned:** "Nothing you type here leaves your phone. The PDF has a small 'Made with PriceBrush' mark." + **[Primary] "Download PDF"**.
- **States:** empty → primary disabled "Add at least one line"; missing sort code → "Add a sort code so your client can pay you"; making → "Making your PDF…"; done → toast "PDF downloaded."
- **Desktop (v0.3):** WYSIWYG A4 like P3.

### P5 · Pricing `/pricing`

- **Title:** PriceBrush Pricing: Free, Pro £9/month, No Per-User · **H1:** "Simple pricing. No per-user fees."
- Same 3 plan cards as the landing; FAQ "How do I cancel?" ("Settings → Plan → Cancel. One tap. No phone call."). VAT wording: open question.

### P6 · About `/about`

- **Title:** About PriceBrush: Who Builds It and Why · **H1:** "About PriceBrush"
- Founder and guide author: **Arif Noviarrizal** (real name; photo optional; where he's based, stated truthfully; why he built it; how the calculator defaults were chosen; contact email). No invented decorator credentials. Guides show "By Arif Noviarrizal" + date.

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
- **Desktop (v0.3):** sidebar · list pane 420 px (search, pills, rows; ↑/↓ moves, Enter opens) · detail pane (document preview + status timeline + the status's primary: Sent → "Send again", Accepted → "Turn into invoice", Overdue → "Send a reminder").
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

"Send Q-0012 to Mrs Patel" · "Quote · valid until 13/11/2026 · £615.00" + "Preview" · **[Primary] "Send on WhatsApp"** (text: "Hi Mrs Patel, here's your quote from Holt Decorating for £615.00: https://pricebrush.pages.dev/q/7fK2…  Any questions, just reply. Dave") · Email ("No email saved") · Copy link → "Link copied" · Download PDF · "Edit message" · Free caption "Free plan: your quote shows a small 'Made with PriceBrush' mark. Remove it". After send: Sent + "Marked as sent." (only add "We'll tell you when she opens it" if open-tracking is real). Offline: "The link works once you're back online — we'll sync first." **Desktop:** 480 px dialog from the rail's primary; "Copy link" first on desktop (WhatsApp Web may not be signed in), WhatsApp second.

### A8 · Quote detail (sent / accepted)

Read-mostly A6 + timeline ("Sent 14/10/2026 18:42 · Accepted by Anita Patel 16/10/2026 09:15"); editing warns "Editing will update the link Mrs Patel has." Primary: Sent → "Send again"; Accepted → **"Turn into invoice"**. Overflow: Duplicate *(P1)* · Revoke link · Delete.

### A9 · Invoice

- **Phone:** "INV-0001" + status; banner "Invoice made from Q-0012. Check the dates and bank details, then send."; client + "From Q-0012"; Invoice date 16/10/2026 · Work finished 16/10/2026 · Due 30/10/2026 · Payment terms 14 days; lines; totals ("Total due"); "Pay by bank transfer" card (name, sort code, account, reference INV-0001) or "Add bank details so Mrs Patel can pay you". Primary: Draft → **"Send invoice"** (WhatsApp text "Hi Mrs Patel, here's your invoice INV-0001 for £615.00, due 30/10/2026: [link]. Bank details are on it. Thanks, Dave"); Sent/Overdue → **"Mark as paid"**.
- **Overdue:** chip + "3 days overdue (due 30/10/2026)." + "Send a reminder" (polite pre-filled text); history list.
- **Mark as paid sheet:** "When did the money come in?" (today) · "How?" Bank transfer / Cash / Other · [Mark as paid] → toast "Nice one. INV-0001 marked as paid."
- **Desktop (v0.3):** same two-column editor as A6 with invoice fields and A4 invoice preview.

### A10 · Paywall (Go Pro)

Trigger: 6th document in a calendar month or "Remove watermark". "You've used 5 free documents this month." · "Go Pro for £9/month — cancel anytime." · compare by task · radio cards Monthly £9 / Yearly £79 / Founding Member £49 once ("37 of 50 left · ends 31/01/2027") · "Secure checkout by Polar. No per-user fees. No sales calls." · "Your free documents reset on 01/11/2026." · terms above the button · **[Primary] "Continue to checkout"** · ghost "Not now — stay on Free". States: "Opening checkout…", cancelled → "No problem — nothing was charged.", sold out "All 50 taken", success → A12. **Desktop:** 560 px dialog, plans side by side.

### A11 · Settings

- Sections (56 px rows): Business (name, town, logo, address, phone, email, VAT number) · Pricing (day rate, paint £/L, default coats, quote valid 30 days, invoice due 14 days; price book *(P1)*) · Plan ("Free — 3 of 5 used" / "Pro — renews 15/11/2026") · Your data ("Export everything (CSV)", "Delete my account") · Help · Log out.
- Free → primary "Go Pro". Pro → "Cancel plan" (destructive ghost) → "Cancel Pro? You'll keep Pro until 15/11/2026, then go back to Free." [Cancel plan] [Keep Pro] (*founder to confirm this counts as one tap*). Delete: type "DELETE"; "This removes every quote, invoice and client. It can't be undone."
- **Desktop (v0.3):** section list left (240 px), form right (max 640 px), auto-save per field with "Saved".

### A12 · Checkout return

"You're on Pro." / "Unlimited documents, no watermark, your logo on everything." [Back to my quotes]. Webhook pending (≤ 1 min): "Finishing up… this takes up to a minute."

---

## Client-facing (public link, no login)

### C1 · Client quote page `/q/{token}`

- **Phone (`client-quote.html`):** decorator header (monogram/logo, "Holt Decorating", "Dave Holt · Painter & decorator · Leeds", [Call Dave] [WhatsApp]) → **summary card first** ("Quote for Mrs Patel" · Q-0012 · **£615.00** · "Total · not VAT registered · valid until 13/11/2026") → details (For · Job address · Date · Valid until) → "The work" lines → totals → notes → secondary "Download PDF" → ghost "Ask Dave a question" → "Made with PriceBrush" (Free only). Pinned **[Primary] "Accept quote"** *(P1)*.
- **Accept sheet:** "Accept this quote?" · "£615.00 for decorating at 12 Oak Road." · "Your full name" · "By accepting you agree to the price and notes above. Dave will be in touch to book the dates." · [Accept quote] → "Accepted by Anita Patel on 16/10/2026. Holt Decorating has been told."
- **States:** expired ("This quote expired on 13/11/2026. Ask Holt Decorating for an updated one."), revoked ("This link is no longer active."), not found, offline ("You're offline — this is the last saved copy.").
- **Desktop (v0.3):** A4 document centred (max 820 px) with the summary + Accept in a sticky right card.
- No PriceBrush nav or sign-up prompts beyond the footer badge.

### C2 · Client invoice page `/i/{token}`

As C1 with "Invoice INV-0001", invoice date, work finished, **Due 30/10/2026**, bank card with "Copy sort code" / "Copy account number" / "Copy reference"; **[Primary] "Copy bank details"** (no card payments in MVP). Paid: "Paid — thank you."
