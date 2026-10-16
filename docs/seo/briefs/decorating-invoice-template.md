# Brief — `/decorating-invoice-template` (P0, live by 31/10/2026)

Keyword map entry: `../keyword-map.md` · Evidence: `../keyword-research.md` Cluster C · Not yet in `../../design/screens.md` (ask design for a P4 screen; it can reuse the P3 quote template layout) · Product link: PRD F9 (quote → invoice, INV-0001, due in 14 days).

## 1. Search intent

- **Who searches:** decorators who've **finished a job and need to get paid** — today. High urgency, high relevance to PriceBrush's "quote → invoice in one tap".
- **What they want:** a correct UK invoice (number, dates, bank details, VAT only if registered) as a PDF or Word file, fast, free, without registering.
- **What ranks now:** InvoiceSimple decorators' invoice page (US-framed, blocks bots), GenieAI (UK legal-template upsell), InvoiceQuick / Enerpize / Online Invoices (generic multi-format), Jobber painting invoice generator (US), AutoInvoice (Irish, **email gate**). Generic UK invoice queries ("invoice template uk", "sole trader invoice template") are owned by SumUp, Sage, Bytestart, Billdu — don't chase those.
- **v0.2 — UK proxy SERP (`../data/serp-ddg-uk-2026-10-16.md`):** InvoiceJob ranks #1 for "painting and decorating invoice template uk" and is strong: no sign-up, PDF built in the browser, live preview, bank details, VAT rates including reverse charge, UTR field, £29 one-off premium. Its gaps: **no FAQs**, ~800 words, generic across ~22 trades, no quote → invoice. Others: InvoiceAdept (CIS & VAT guide), TradeTally, an Etsy template, TapTax, InvoiceKoi. Difficulty **Medium (crowded)** — match InvoiceJob's tool basics and beat it on decorator specifics, content and the quote → invoice path.
- **Our angle:** the only page built for UK **painters and decorators** specifically, with the legal checklist from GOV.UK, a worked decorator example, VAT/CIS explained in plain English, and a one-tap path from the quote.

## 2. Must-haves to beat the current top 3

### 2.1 Tool behaviour

| Requirement | Why |
|---|---|
| Same generator engine as the quote page, document type = invoice; **no login, nothing stored on a server** | Reuse code; PRD privacy |
| **"Start from my quote"**: if a quote was made on `/decorating-quote-template` in this browser, offer to copy its lines | Mirrors the product's one-tap promise |
| **Invoice number** INV-0001 (editable, remembered + incremented in `localStorage`) | GOV.UK: unique identification number |
| **Invoice date** and **supply date / date work finished** (DD/MM/YYYY) | GOV.UK: both required |
| **Due date**: default 14 days (PRD), options 7/14/30 days or "on receipt" | Common UK terms |
| Your business: your name **and** trading name if used, address, contact | GOV.UK sole-trader rule |
| Client name and address; job address if different | GOV.UK |
| Line items (description, amount; qty × rate optional) + quick-add chips as on quote page | Clear description is required |
| **VAT toggle** (off by default) → VAT number, 20% per line, VAT total, "VAT invoice" fields (see §2.2 table) | HMRC full VAT invoice requirements |
| **Bank details**: account name, sort code (format `12-34-56`), account number (8 digits); "Use invoice number as payment reference" | Gets them paid faster; validate formats |
| Optional **"Labour / materials" split** per line | Needed for CIS work and for clients who ask |
| Optional **Deposit already paid** line (minus) → "Balance due" | Common for decorators taking deposits |
| **Mark as paid** → adds "PAID on DD/MM/YYYY" stamp → doubles as a receipt | "painters receipt template" in `invoices.csv` |
| PDF A4, selectable text, small "Made with PriceBrush" watermark; blank .docx / Google Docs / printable PDF downloads | Template-format intent |

### 2.2 Sections below the tool (in this order)

1. **Example: a painting and decorating invoice (UK)** — text + image, labelled "Example". Continue the quote example so pages connect: INV-0001, client Mrs Patel, 12 Oak Road; same 4 lines; total £615; "Payment due within 14 days by bank transfer. Reference: INV-0001." Show the VAT-registered variant total (£615 + £123 VAT = £738). ~120 words.
2. **What must a UK invoice include?** (H2) — from GOV.UK "Invoices: what they must include": unique number · your name/business name and address · client's name and address · clear description · supply date · invoice date · amount(s) · VAT amount if applicable · total owed; sole traders add their own name and any business name (and an address for legal documents if using a business name). Link GOV.UK. ~200 words.
3. **If you're VAT registered** (H2) — table of the extra fields on a full VAT invoice (HMRC VAT Notice 700/21: your VAT registration number, time of supply (tax point), for each line the rate of VAT and amount excluding VAT, total excluding VAT, total VAT). Mention simplified invoices for supplies up to £250. Link HMRC. ~200 words.
4. **How to write an invoice for a painting and decorating job** (H2, exact autocomplete question) — 6 steps: copy the agreed quote lines · add anything extra agreed in writing · subtract the deposit · set the due date · add bank details and reference · send the same day (WhatsApp/email). ~250 words.
5. **Getting paid on time** (H2) — late payers are a top money topic in r/smallbusinessuk ("How does everyone handle clients who pay late?", 40 comments, v0.2 sample). Practical: send on completion day; state the due date, not "30 days" vaguely; polite reminder at due date + 1 day; for **business clients only**, the Late Payment of Commercial Debts (Interest) Act 1998 lets you claim statutory interest and fixed compensation (link GOV.UK "Late commercial payments"). Do not imply it applies to homeowners. ~200 words.
6. **FAQ** (H2) — 40–80-word answers:
   - How do I write an invoice for painting and decorating work?
   - What should be on an invoice in the UK?
   - Do I need to charge VAT on my invoice? *(only if registered; link VAT guide)*
   - What is an invoice number and how should I number mine? *(unique, usually sequential: INV-0001…)*
   - Is it a legal requirement to provide an invoice in the UK? *(for VAT-registered businesses supplying VAT-registered customers, VAT invoices are required; otherwise it's how you evidence income for HMRC and get paid — keep records; phrase carefully, link GOV.UK)*
   - How long does a client have to pay an invoice in the UK? *(whatever you agreed; for business-to-business with no agreement, 30 days by default under the late payment rules — link)*
   - I'm not VAT registered but the client's purchase order shows VAT — what do I put on the invoice? *(v0.2 — real r/UKPersonalFinance thread: you can't charge VAT if not registered; invoice the net amount and tell the client; link GOV.UK)*
   - I work for a builder under CIS — what changes? *(the contractor deducts CIS from labour (20% if you're registered, 30% if not) — show labour and materials separately; if you're VAT registered, the domestic reverse charge may apply — link GOV.UK; this tool doesn't calculate CIS yet)*
   - Can I turn my quote into an invoice? *(yes — "Start from my quote"; in the PriceBrush app it's one tap)*
7. **Next step** — card: "Quotes and invoices in one place, sent on WhatsApp — try PriceBrush free".

### 2.3 Copy rules

- Intro (≤ 50 words): "Finished the job? Make a proper UK invoice in two minutes: invoice number, due date, bank details, and VAT only if you're registered. Download a PDF and send it today. No sign-up, nothing stored."
- Never say "HMRC approved" or "HMRC compliant" (HMRC doesn't approve templates); say "includes the details GOV.UK lists".
- Legal/tax lines: "General information, not tax or legal advice" once, at the end of section 3.

## 3. Word count

**1,200–1,800 words** below the tool.

## 4. Schema

- `WebApplication` (name "PriceBrush Free Decorating Invoice Template", `BusinessApplication`, `offers.price 0 GBP`, `inLanguage en-GB`).
- `BreadcrumbList`: Home › Decorating invoice template.
- Optional `FAQPage` (no rich result expected).
- Do **not** use the `Invoice` schema type for the example (it describes a real invoice for a real customer).

## 5. CTA to sign-up

- After download: **"Next job, send the quote and the invoice from your phone in one tap. Free for 5 documents a month."**
- Beside the form: "Got a quote in PriceBrush? It becomes this invoice in one tap."
- Don't gate the download.

## 6. Internal links

- **Out:** `/decorating-quote-template` ("start with a quote") · `/guides/do-decorators-charge-vat` (section 3, FAQ) · `/guides/making-tax-digital-decorators` (when live, from a "keeping records" sentence) · `/` (CTA).
- **In:** home "Free tools" · quote template "Next step" card · VAT, MTD and expenses guides · footer.

## 7. E-E-A-T signals (true ones only)

- Every legal/tax statement linked to **GOV.UK / HMRC** pages; "Last reviewed: [date]"; review each April and when MTD rules change.
- Show which checks the generator does (e.g., "We check your sort code has 6 digits — we don't check it's a real account").
- Real About page (author: **Arif Noviarrizal, independent developer building PriceBrush**); no invented accountant reviewer. If an accountant (real, named, consenting) ever reviews the page, add "Reviewed by" with a link to their profile.

## 8. Acceptance checklist

- [ ] All GOV.UK-required fields can be filled; VAT fields appear only when VAT is on.
- [ ] Invoice number increments per browser; editable.
- [ ] "Start from my quote" copies lines from `localStorage`.
- [ ] Prerendered HTML has H1, intro, example as text, both checklists, FAQs.
- [ ] No network request contains form data.
- [ ] Title/meta/canonical/OG as `keyword-map.md`.
