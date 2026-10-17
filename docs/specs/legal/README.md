# Cancellation text (CCR 2013, Schedule 3), source for T18

Prepared 18/10/2026 by the main assistant. Status: **draft, to be proofread by Arif and checked by pricebrush-lead in the T18 spec.**

## Source

- The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 (SI 2013/3134), Schedule 3: https://www.legislation.gov.uk/uksi/2013/3134/schedule/3
- legislation.gov.uk publishes Schedule 3 **only as images**: the web page, the "made" PDF and the AKN data all show it that way. The three official images are kept in `source/` (`uksi_20133134_en_sld_001–003.jpg`), downloaded 18/10/2026.
- The text files here came from those images through Windows OCR (en-GB), then were corrected by hand against the images.
- **Amendment check:** the only amendment to Schedule 3 is Part A note 5(b), where "£" replaces "EUR" (SI 2018/1326, in force 31/12/2020). Note 5 is about goods, so these files don't use it.
- Licence: Crown copyright, reused under the Open Government Licence v3.0. Attribution line for the page/PDF: "Contains public sector information licensed under the Open Government Licence v3.0."

## Files

| File | What it is |
| --- | --- |
| `ccr-schedule-3-part-a-services.txt` | Part A model instructions, filled in for a **service contract** |
| `ccr-schedule-3-part-b.txt` | Part B model cancellation form, word for word, with the trader slot as a placeholder |

Choices made in Part A (pricebrush-lead to confirm in the T18 spec):

- **Note 1:** option (a), service contract → "of the conclusion of the contract."
- **Note 2:** replaced with the placeholder `{{TRADER_DETAILS}}`. It is filled with the decorator's name, geographical address and, where available, phone and email.
- **Note 3:** left out. We don't offer an online cancellation form.
- **Note 4:** left out, because it only applies to sales contracts.
- **Note 5:** left out. It covers goods the consumer sends back; paint applied to walls isn't returnable goods. **Lead to confirm.**
- **Note 6:** included, service contract wording (the last paragraph of the file).
- Everything else is the model wording unchanged, including the parts about goods and delivery.

Part B: the `[*]` marks stay, because the consumer deletes as appropriate. Only "[here the trader's name…]" becomes `{{TRADER_DETAILS}}`.

## Proofreading (Arif, about 10 minutes)

- [ ] Compare `ccr-schedule-3-part-a-services.txt` with `source/…001.jpg`, `…002.jpg` and `…003.jpg`, word by word (OCR can swap letters, e.g. "4" for "14").
- [ ] Compare `ccr-schedule-3-part-b.txt` with `source/…003.jpg`.
- [ ] Tick these boxes when they match.
