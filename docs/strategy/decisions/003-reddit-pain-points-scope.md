# 003 — Late payers, underpricing, mist coat: MVP, post-MVP, or content only?

Date: 16/10/2026 · Author: strategist · **Status: Proposed**

## Question

The v0.2 Reddit sample surfaced three pains. Should any of them become product features before the paid MVP (late November), or stay as content?

## Why it matters now

MVP build is 1–21 Nov, with roughly 25–30 founder hours (estimate, at 8–10 h/week). Every added feature delays checkout, and the first payment by 31 Dec depends on checkout being live.

## Evidence

| Pain | Signal | Is it our buyer? |
|---|---|---|
| **Late payers** | r/smallbusinessuk "How does everyone handle clients who pay late?" (40 comments). The post text says "chasing… manually via email", no trade named (`../../seo/data/reddit-sample-2026-10-16.md`, fetched 16/10). PRD persona Sophie: "invoice paid late". Kvota and Fixxa already sell reminders and payment links (`../competitors.md`). Design already has an overdue invoice with a "Send a reminder" button that uses pre-filled text (`../../design/screens.md` invoice, Overdue). | Yes, after the first invoice. Not a sign-up trigger. |
| **Underpricing** | r/smallbusinessuk "I think I've massively underpriced my services" (92 comments). The post text describes a generic service business, not a trade. Decorator evidence is qualitative: MSE "Day job costs for a painter decorator" and The Decorators Forum "How to Price a Decorating Job" (`../../seo/keyword-research.md` §4). Decorator-intent autocomplete: "how to price a painting job uk", "self employed painter and decorator day rate" (`../../seo/data/pricing.csv`). | Yes, and it is the PRD's job-to-be-done #2 ("so my price doesn't lose money"). |
| **Mist coat / new plaster** | r/DIYUK: most of the 14 paint-quantity posts are about mist coats ("Mist coat failed", 83 comments). Autocomplete: "how many coats of paint after mist coat", "how many coats does new plaster need" (`../../seo/data/extra-paint-tech.csv`). "Painting hallway" (23 comments): a homeowner doubts a decorator's one-day quote on new plaster. | Mostly DIY homeowners, so not buyers. But new plaster changes a decorator's coats, litres and days. |

## Options

| | Option | Founder hours | Impact on 31 Dec | Risk | Reversible? |
|---|---|---|---|---|---|
| A | Content only for all three | 0 product hours (content already planned in the SEO briefs) | Low to medium | Leaves out a cheap, visible fix in the invoice flow | Yes |
| **B** | **Content for all three, plus two small MVP items: (1) an Overdue status and a WhatsApp "Send a reminder" button with polite pre-filled text (P1); (2) a "New plaster (mist coat)" switch in the calculator and quote engine (P0, adds a coat, litres and drying time)** | **~3 h (estimate: ~2 h for the reminder, ~1 h for the switch)** | **Medium: the reminder gives Pro users a reason to keep sending invoices, and the switch makes the quote's maths credible to decorators (memo 002)** | Small scope creep | Yes |
| C | Build automated email reminders and a "true day rate" profit view in the MVP | ~10–15 h (estimate) | Negative: delays checkout. Email reminders need our own domain, which isn't bought yet (PRD §3, Google login row: "no own email: no domain yet") | Misses the launch | Partly |

## Recommendation

**Option B.** Each of the two items is a single button or switch. Neither needs a server, email or a domain (the reminder uses a `wa.me` link), and both make the core promise more believable. Underpricing gets **no new feature**: memo 001 already puts days × day rate in the calculator and quote, which is the honest answer to "am I charging enough". A profit or effective-rate view is post-MVP, and only if users ask for it. QuoteRocket and Kvota already sell one, so it doesn't set us apart.

**Cheapest way to test (£0):** count reminder-button taps and "New plaster" switch use with the anonymous event counter. Promote automated reminders only if more than 20% of Pro users tap the reminder button at least once by 31/01/2027 (a threshold the strategist set as an assumption).

## What changes if accepted (proposed; not applied)

- **PRD §3:** add "Overdue status + 'Send a reminder' via WhatsApp (pre-filled, no email)" as P1. Add "New plaster (mist coat) option" to the F1 calculator and the quote engine as P0. Post-MVP list: automated reminders (needs a domain and email), effective day-rate view, late-payment interest.
- **PRD F10:** statuses become Draft, Sent, Accepted, Paid, Overdue (overdue = past the due date and not paid).
- **SEO:** the briefs already cover the mist-coat FAQ and the calculator option, and late payment on the invoice page. Add one fact check to the invoice brief: the Late Payment of Commercial Debts (Interest) Act applies to business clients only, not homeowners (gov.uk/late-commercial-payments-interest-debt-recovery). Most decorator clients are homeowners. Keep the underpricing angle in the December pricing guide.
- **Design:** no new screens. The Overdue invoice and its reminder already exist. Add the "New plaster" switch to the calculator (P2) and to the quote line editor.
