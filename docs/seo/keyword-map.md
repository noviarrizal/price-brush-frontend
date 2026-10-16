# PriceBrush — Keyword map (v0.2)

Date: 15/10/2026 · Updated 16/10/2026 · Evidence for every keyword: `keyword-research.md` · Specs for meta tags: `technical-seo.md`

Rules: one primary keyword per URL; a keyword listed as secondary on one page must not be primary (or secondary) on another. Slugs are short, lowercase, hyphenated, UK spelling. Title ≤ 60 characters, meta description ≤ 155 characters (lengths checked with a script; counted below). Host shown as `https://pricebrush.pages.dev` until the domain move.

> **Decided 16/10/2026 (founder):** URLs are `/paint-calculator`, `/decorating-quote-template`, `/decorating-invoice-template`. `docs/design/screens.md` still says `/free-quote-template` and has no invoice screen — design/dev should follow these URLs. Host stays `pricebrush.pages.dev` at launch; domain migration later (`technical-seo.md` §9).

## Summary

| URL | Primary keyword | Priority | Live by |
|---|---|---|---|
| `/` | quote app for painters and decorators | P0 | 31/10/2026 |
| `/paint-calculator` | paint calculator (UK) | P0 | 31/10/2026 |
| `/decorating-quote-template` | painting and decorating quote template (UK) | P0 | 31/10/2026 |
| `/decorating-invoice-template` | painting and decorating invoice template (UK) | P0 | 31/10/2026 |
| `/pricing` | (brand) PriceBrush pricing | P0 | 21/11/2026 |
| `/about` · `/privacy` · `/terms` | (trust pages, no target) | P0 | 31/10 (about) · 21/11 (privacy, terms — needed before checkout) |
| `/guides` | (hub) decorating business guides | P1 | 09/11/2026 |
| `/guides/how-to-price-a-painting-job` | how to price a painting job (UK) | P1 | 09/11/2026 |
| `/guides/decorator-day-rate` | painter and decorator day rate (UK) | P1 | 16/11/2026 |
| `/guides/do-decorators-charge-vat` | do decorators charge VAT | P1 | 23/11/2026 |
| `/guides/making-tax-digital-decorators` | making tax digital for decorators | P1 | 12/01/2027 |
| `/guides/decorator-expenses` | painter and decorator allowable expenses | P2 | 05/01/2027 |
| `/guides/how-long-to-paint-a-room` | how long to paint a room | P2 | Feb 2027 |
| `/paint-calculator/<room>` (max 8) | how much paint for a `<room>` | P2 | from Dec 2026, see `programmatic-seo.md` |

## Page by page

### `/` — Home

- **Primary:** quote app for painters and decorators
- **Secondary:** quoting app for painters · app for painters and decorators · tradesman quote app · voice quote app · invoice app for decorators
- **Title (49):** PriceBrush: Quote & Invoice App for UK Decorators
- **Meta description (152):** Say the job, get an itemised quote in 60 seconds, send it on WhatsApp, turn it into an invoice in one tap. Free for 5 documents a month. No sales calls.
- **H1:** Quote any decorating job in 60 seconds. Just say it. *(PRD copy; keyword sits in the subheading: "The quote and invoice app for UK painters and decorators.")*
- **Links out:** /paint-calculator · /decorating-quote-template · /decorating-invoice-template · /pricing · /guides
- **Links in:** every page (logo + footer), every tool CTA

### `/paint-calculator` — Paint calculator (P0, brief: `briefs/paint-calculator.md`)

- **Primary:** paint calculator (UK)
- **Secondary:** how much paint do i need · how many litres of paint do i need for a room · paint calculator walls and ceiling · paint calculator multiple rooms · paint labour calculator · paint calculator price · how many rooms will 5 litres of paint cover · paint coverage per litre
- **Title (59):** Paint Calculator UK: How Much Paint Do I Need? | PriceBrush
- **Meta description (150):** Work out litres and tins for walls and ceilings, room by room. Decorators: add your day rate to see days and a rough price, then turn it into a quote.
- **H1:** Paint calculator: how much paint do I need?
- **Links out:** /decorating-quote-template ("turn this into a quote") · / (CTA) · /guides/how-to-price-a-painting-job · /guides/how-long-to-paint-a-room (when live) · room pages (when live)
- **Links in:** / · both template pages · all guides · room pages (parent) · footer

### `/decorating-quote-template` — Quote template / generator (P0, brief: `briefs/decorating-quote-template.md`)

- **Primary:** painting and decorating quote template (UK)
- **Secondary:** free painting and decorating quote template uk · painter and decorator quote template · decorating quote template · painting quote template · painting quote generator · painting and decorating quote example · what should a painting quote include · how to write a painting and decorating quote
- **Title (57):** Free Painting & Decorating Quote Template UK | PriceBrush
- **Meta description (149):** Fill in a UK painting and decorating quote online and download a clean PDF. VAT optional, £ and UK dates, worked example. No sign-up, nothing stored.
- **H1:** Free painting and decorating quote template (UK)
- **Links out:** /decorating-invoice-template ("job done? make the invoice") · /paint-calculator ("work out the paint first") · /guides/how-to-price-a-painting-job · / (CTA)
- **Links in:** / · /paint-calculator · /decorating-invoice-template · pricing guides · footer

### `/decorating-invoice-template` — Invoice template / generator (P0, brief: `briefs/decorating-invoice-template.md`)

- **Primary:** painting and decorating invoice template (UK)
- **Secondary:** decorating invoice template uk · painter and decorator invoice template · painting invoice generator · painting and decorating invoice example uk · how to write an invoice for painting and decorating · what should be on an invoice uk (section, not chased)
- **Title (59):** Free Painting & Decorating Invoice Template UK | PriceBrush
- **Meta description (145):** Make a UK painting and decorating invoice in your browser: invoice number, due date, bank details, VAT if registered. Download a PDF. No sign-up.
- **H1:** Free painting and decorating invoice template (UK)
- **Links out:** /decorating-quote-template ("start with a quote") · /guides/do-decorators-charge-vat · / (CTA "turn quotes into invoices in one tap")
- **Links in:** / · /decorating-quote-template · VAT and MTD guides · footer

### `/pricing`

- **Primary:** (brand) PriceBrush pricing — no generic keyword (don't compete with Tradify-pricing queries yet)
- **Title (51):** PriceBrush Pricing: Free, Pro £9/month, No Per-User
- **Meta description (144):** Free for 5 quotes or invoices a month. Pro is £9 a month or £79 a year. Founding Member £49 once, for life. No per-user fees. Cancel in one tap.
- **H1:** Simple pricing. No per-user fees.
- **Links out:** / · /paint-calculator · /decorating-quote-template · Links in: header, footer, home

### `/guides/how-to-price-a-painting-job` (P1)

- **Primary:** how to price a painting job (UK)
- **Secondary:** how to price up a painting job uk · how to price a painting and decorating job · how do you price a painting job · how to charge for painting a room · painting and decorating pricing app
- **Title (55):** How to Price a Painting Job (UK): Step-by-Step for 2026
- **Meta description (155):** Price decorating work without guessing: measure, work out paint and days, set your day rate, add prep and materials. Worked UK example and free calculator.
- **H1:** How to price a painting and decorating job (UK)
- **Links out:** /paint-calculator · /decorating-quote-template · /guides/decorator-day-rate · Links in: hub, calculator, quote template, day-rate guide

### `/guides/decorator-day-rate` (P1)

- **Primary:** painter and decorator day rate (UK)
- **Secondary:** self employed painter and decorator day rate · how much should a painter and decorator charge per day · average painter and decorator day rate uk · painter and decorator day rate london
- **Title (56):** Painter and Decorator Day Rate UK: What to Charge (2026)
- **Meta description (148):** Day rates quoted for UK decorators in 2026, where each figure comes from, and how to work out your own rate from your costs. With a free calculator.
- **H1:** Painter and decorator day rates in the UK (2026)
- **Rule:** every rate must cite its source (Trade2Base, MyBuilder, Checkatrade, salarytax.uk, etc.) or be clearly labelled as our own calculation. No made-up "average".
- **Links out:** /guides/how-to-price-a-painting-job · /paint-calculator · Links in: hub, pricing guide

### `/guides/do-decorators-charge-vat` (P1)

- **Primary:** do decorators charge VAT
- **Secondary:** do painters and decorators charge vat · vat threshold decorator · should a decorator be vat registered
- **Title (51):** Do Decorators Charge VAT? UK Rules Explained (2026)
- **Meta description (149):** Most solo decorators under £90,000 turnover don't charge VAT. When you must register, how to show VAT on quotes and invoices, and the reverse charge.
- **H1:** Do painters and decorators charge VAT?
- **Links out:** /decorating-invoice-template · /guides/making-tax-digital-decorators · Links in: invoice page FAQ, hub

### `/guides/making-tax-digital-decorators` (P1, Jan 2027)

- **Primary:** making tax digital for decorators
- **Secondary:** making tax digital april 2027 · making tax digital under 30000 · does making tax digital apply to sole traders · is making tax digital on turnover or profit · making tax digital and cis
- **Title (55):** Making Tax Digital for Decorators: April 2027 Explained
- **Meta description (152):** From April 2027, decorators with turnover over £30,000 must keep digital records and send quarterly updates. What it means, dates, and how to get ready.
- **H1:** Making Tax Digital for painters and decorators
- **Honesty rule:** PriceBrush does not file MTD returns (PRD: MTD out of scope). Say so; link to GOV.UK's software finder.
- **Links out:** /guides/do-decorators-charge-vat · /guides/decorator-expenses · /decorating-invoice-template

### `/guides/decorator-expenses` (P2, early Jan 2027)

- **Primary:** painter and decorator allowable expenses
- **Secondary:** self assessment painter and decorator · what can a decorator claim on tax
- **Title (51):** Painter and Decorator Allowable Expenses (UK, 2026)
- **Meta description (138):** What a self-employed decorator can claim: van, paint and materials, tools, insurance, phone, training. Plain-English list with HMRC links.
- **H1:** Allowable expenses for painters and decorators

### `/guides/how-long-to-paint-a-room` (P2)

- **Primary:** how long to paint a room
- **Secondary:** how long to paint a room uk · how long does it take to paint a room professionally · how long to paint a room 2 coats · how many coats of paint can you do in a day
- **Title (53):** How Long Does It Take to Paint a Room? (UK Decorator)
- **Meta description (143):** Realistic times for a professional and for DIY, by room size, with prep, two coats and drying. Plus a calculator that turns it into days and £.
- **H1:** How long does it take to paint a room?

### `/about`

- **Title (39):** About PriceBrush: Who Builds It and Why
- **Meta description (125):** PriceBrush is a small, independent tool for UK decorators. Who's behind it, how the calculator works, and how we handle data.
- **H1:** About PriceBrush
- Author (decided 16/10/2026): **Arif Noviarrizal — independent developer building PriceBrush.** Use exactly this until he provides more. **Do not** add a location, trade background, years of experience or credentials. Content: who he is (that line), why PriceBrush exists (the PRD problem in plain words), how the calculator defaults were chosen and sourced, how data is handled, contact email.
- All guides: byline "By Arif Noviarrizal" linking to `/about`, plus "Last reviewed" date.

## Cannibalisation watch-list

- **Calculator vs. "how long to paint a room" guide:** calculator owns litres/tins/price; guide owns time questions. The calculator's "days" output links to the guide; the guide embeds a link, not a second calculator.
- **Quote template vs. "how to price a painting job":** template page owns "template / example / what to include"; the guide owns "how to price / work out the price". Don't put a long pricing method on the template page — link to the guide.
- **Quote vs. invoice pages:** never use "invoice" in the quote page's title/H1 or vice versa. Shared generator code is fine; text must differ.
- **Room pages vs. calculator:** each room page targets only "how much paint for a `<room>`"; the calculator keeps generic "how much paint do I need".
