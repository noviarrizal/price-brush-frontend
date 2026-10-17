# Spec — "right to cancel" option on the quote template (plan T18) (v0.1)

Date: 17/10/2026 · Owner: pricebrush-lead · Status: **draft. The labour-only part can be built; the supply-and-apply part waits for a founder decision (§8)** · Implements: CEO memo `../ceo/decisions-2026-10-18.md` R4 (accepted, PRD "Keputusan 18 Okt 2026" R4) · Plan: `../plan/2026-10-17-launch-31-oct.md` T18 · Legal text: `legal/` (`legal/README.md` explains the source, the OCR, the amendment check and the note choices)

Not legal advice. Labels: **[fact]** = sourced · **[estimate]** · **[opinion]** · **not verified**.

> **No statutory text in this file.** The model wording lives only in `legal/*.txt`. This spec refers to those files by name, by line and by the Schedule's note numbers. Don't paste the wording into specs, plans, reviews or chat.

## 1. Summary

| Question | Answer |
|---|---|
| What ships | An option on `/decorating-quote-template/`: "Add your client's right to cancel". When it's on, the PDF gets one extra page with the Part A model instructions (filled in for a service contract) and the Part B model cancellation form |
| Which quotes | **Only quotes set to "Labour only"** in v0.1. Supply-and-apply quotes are not service contracts under the Regulations' definitions, so the prepared text is wrong for them (§3) |
| Text source | `legal/ccr-schedule-3-part-a-services.txt` and `legal/ccr-schedule-3-part-b.txt`, imported **as they are**. The app replaces only `{{TRADER_DETAILS}}` |
| Where it's shown | **The PDF only** (page 2). The web page shows the switch, a hint and a link to the official Schedule 3 (§5) |
| Effort | **About 2–2.5 h [estimate], so a little over 2 h.** Supply and apply as well: about 4 h plus a legal choice (§8) |
| My recommendation | **Move T18 to November** and build both job types together. Ship the T4 FAQ fix plus a link to the official form for 31/10. This is the fallback the CEO memo itself names in R4 "Change my mind" (§8) |

## 2. What I checked (17/10/2026)

- **The two text files against the three official images** (`legal/source/uksi_20133134_en_sld_001–003.jpg`), word by word:
  - **Part A:** matches the model wording with Note 1(a) inserted, Note 2 replaced by the placeholder, Note 6 inserted, and the "[See Note 3/4/5]" markers removed. **One difference:** in paragraph (c) (line 23 of the file) the image has no space after the comma before "14 days"; the file has one. This is a typesetting slip in the image and the meaning doesn't change, so **I accept the file as it is** [opinion]. The extra blank lines between the "Effects of cancellation" paragraphs are layout only.
  - **Part B:** matches word for word. The `[*]` marks are kept, and only the trader slot is a placeholder.
  - The founder's 10-minute proofread in `legal/README.md` is still unticked. **T18 can't be merged until it's ticked.**
- **The bytes:** both files are UTF-8 without a BOM, with LF line endings and one final newline. `{{TRADER_DETAILS}}` appears exactly once in each. The only non-ASCII character is the em dash in Part A line 17, which the built-in Helvetica can print (`app/components/quote-template/quote-pdf.tsx:12`).
- **Line-ending risk [fact]:** this machine has `core.autocrlf=true` (system Git config, `C:/Program Files/Git/etc/gitconfig`), and the repo has no `.gitattributes`. After a commit and checkout, Windows would hold the files as CRLF, while Cloudflare Pages builds on Linux with LF. The shown text would then depend on where it was built. §4.1 fixes this.
- **Spike** (in a temp clone, `%TEMP%\pricebrush-t1-check`, not in the repo): a Vitest test that imports both files with `?raw` and compares them with `fs.readFileSync` passes `Buffer.equals`, has no `\r` and finds one placeholder each. `pnpm typecheck` passes, because `vite/client` is already in `tsconfig.json:10`. Vite 7 docs: "Assets can be imported as strings using the `?raw` suffix" — https://v7.vite.dev/guide/assets.
- **Code read:** `app/lib/quote/quote.ts:30-60` (`business` = name, phone, email, address; `materialsBasis` defaults to `"supplyAndApply"`), `app/lib/quote/storage.ts` (`looksLikeDraft` ignores unknown fields), `app/routes/decorating-quote-template.tsx:212` (address is a one-line field, labelled "Address (optional)"), `app/components/quote-template/quote-pdf.tsx` (one A4 page, the watermark footer is `fixed`, and hyphenation isn't set, so react-pdf's default English hyphenation is on).

## 3. Note choices in `legal/README.md`: confirmed or changed

Sources:

- [reg 5](https://www.legislation.gov.uk/uksi/2013/3134/regulation/5): a "sales contract" includes "any contract that has both goods and services as its object". A "service contract" is a contract "other than a sales contract".
- [reg 30](https://www.legislation.gov.uk/uksi/2013/3134/regulation/30): service contracts get 14 days from the contract. Sales contracts get 14 days from when the goods come into the consumer's physical possession.
- BIS Implementing Guidance (Dec 2013) [PDF](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/429300/bis-13-1368-consumer-contracts-information-cancellation-and-additional-payments-regulations-guidance.pdf), section B, paras 3–4: mixed contracts such as supply and fitting are sales contracts. Para 4 suggests asking whether transfer of ownership of the goods is a key objective.
- Business Companion (CTSI, updated Feb 2025) [off-premises sales](https://www.businesscompanion.info/en/quick-guides/consumer-contracts/consumer-contracts-off-premises-sales): sales contracts include "the supply of goods and services together".
- Herefordshire Trading Standards [selling away from premises](https://www.herefordshire.gov.uk/business/trading-standards-and-consumer-advice-contact-details/selling-away-from-premises/) (no date shown): for "services involving the supply of goods, such as home improvement / repair work", the customer may cancel up to 14 days after receiving the last of the goods.

| Note | README choice | My verdict |
|---|---|---|
| 1 | (a) service contract | **Confirmed for labour-only quotes. Wrong for supply-and-apply quotes.** When the decorator supplies the paint, the contract has goods and services. Under reg 5, BIS para 3 and the Trading Standards page above, that makes it a sales contract, and the 14 days run from receiving the goods (one of options (b)–(d)). Telling a client "14 days from the contract" when the law gives longer is wrong information on the decorator's document, which is CEO risk #2. BIS para 4 (the "key objective" test) leaves some room to argue that decorating is mainly a service. But I found **no official source** that says supply-and-apply decorating is a service contract, so I won't rely on that argument [opinion] |
| 2 | Placeholder, filled with name, geographical address and, where available, phone and email | **Confirmed.** Note 2 needs the name and the geographical address, so the option needs both before it adds anything (§4.3). Phone and email are added when filled in. We have no fax field |
| 3 | Left out (no online form) | **Confirmed** |
| 4 | Left out (sales contracts only) | **Confirmed for labour-only.** It may apply to supply-and-apply (§8) |
| 5 | Left out: "paint applied to walls isn't returnable goods" | **Confirmed for labour-only, because no goods are supplied. The README's reason is changed.** Paint the decorator supplies is goods under reg 5. Whether applied paint can still be handed back is a question for [reg 28(3)(c)](https://www.legislation.gov.uk/uksi/2013/3134/regulation/28) (the right to cancel stops once goods are inseparably mixed with other items after delivery). That rule decides whether the right still exists; it doesn't decide which notes the instructions need. Before the job starts, which is when most cancellations happen [opinion], the client may hold no paint at all. Either way, supply-and-apply needs its own Note 1, 4 and 5 choices (§8). The amendment to Note 5(b) (EUR → £, SI 2018/1326) is recorded in the README; I did **not** verify it, and it matters only for the supply-and-apply text |
| 6 | Included, service wording | **Confirmed.** It matches the [reg 36](https://www.legislation.gov.uk/uksi/2013/3134/regulation/36) payment rule |
| Goods paragraphs kept unchanged | The model wording, including the delivery and goods lines | **Confirmed.** The completion notes only fill the bracketed slots and don't tell you to delete paragraphs. Paragraph (c) covers the "no goods supplied" case |
| Part B | `[*]` kept; only the trader slot is a placeholder | **Confirmed** |

**Strongest argument against limiting v0.1 to labour-only:** most decorators supply the paint, and the template defaults to "Supply and apply" (`quote.ts:58`), so few quotes would get the option. **What would change my mind:** an official source (DBT, CMA, Trading Standards / Business Companion, or a trade body template such as the PDA's) saying that supply-and-apply decorating is a service contract for cancellation purposes. Then the services text would be right for every quote, and T18 could ship for all of them as specified below.

## 4. Build (labour-only)

### 4.1 Files and line endings

- Copy `docs/specs/legal/ccr-schedule-3-part-a-services.txt` and `ccr-schedule-3-part-b.txt` to **`app/content/legal/`** with the same names, unchanged. `docs/specs/legal/` stays the reviewed source; `app/content/legal/` is the shipped copy. If one changes, both change in the same commit, and the test in §7 A1 enforces that.
- New **`.gitattributes`** at the repo root:
  ```
  app/content/legal/*.txt text eol=lf
  docs/specs/legal/*.txt text eol=lf
  ```
  Then `git add --renormalize .`. Docs: https://git-scm.com/docs/gitattributes (`eol`).
- Keep `docs/specs/legal/source/*.jpg` in git as the evidence (≈ 660 KB, docs only, never shipped).

### 4.2 Import

- `import cancellationInstructions from "~/content/legal/ccr-schedule-3-part-a-services.txt?raw";` and the same for Part B, **only** in the module that the PDF code imports, i.e. `quote-pdf.tsx` or a module that only it imports. The text then lands in the lazy PDF chunk, and first-load JS doesn't grow.
- No editing, trimming or reformatting of the strings in code.

### 4.3 Pure module `app/lib/quote/cancellation.ts` (+ `cancellation.test.ts`)

- `export const TRADER_DETAILS_PLACEHOLDER = "{{TRADER_DETAILS}}";`
- `traderDetails(business): string | null`:
  - Takes the trimmed `name`, `address`, `phone` and `email`.
  - Returns `null` if `name` or `address` is empty, because Note 2 needs both.
  - Otherwise returns them joined with `", "`, skipping empty phone or email.
  - Any line breaks inside a field become `", "`.
- `fillTraderDetails(template, details): string`:
  - Throws if the template doesn't contain the placeholder exactly once.
  - Replaces it with a **replacer function** (`template.replace(PLACEHOLDER, () => details)`). A plain string replacement would treat `$&` or `$'` in a business name as special patterns ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement)).
- **Fill format:**
  - In Part A the details sit inside a sentence, so the replacement is `"(" + details + ")"`.
  - In Part B it's `details` with no brackets.
  - [opinion: readability; Note 2 says what to insert, not the punctuation.]
- `cancellationParagraphs(filledText): string[]`: splits on `"\n\n"` after removing the one final `"\n"`. It must round-trip: `paragraphs.join("\n\n") + "\n" === filledText`.
- `CANCELLATION_SECTION_HEADINGS`: the two heading lines of Part A (file lines 1 and 11). They are used only to render those paragraphs in italic, as in the official image. A test checks that each one is a whole paragraph of the file, so they can't drift.

### 4.4 Draft, form and handover

- `QuoteDraft` gets `includeCancellationInfo: boolean` and stays `version: 1`, because the change only adds a field. `createEmptyDraft()` sets it to `true` (CEO R4: on by default). `loadQuoteDraft` fills a missing value with `true`, so drafts saved before T18 still load.
- **Switch** (`SwitchField`, `app/components/form-fields.tsx`) in the quote settings, next to "Supply and apply / Labour only":
  - It shows **only when `materialsBasis === "labourOnly"`**.
  - Copy, proposed by me (UI/UX may adjust it in `screens.md` P3):
    - Label: "Add your client's right to cancel"
    - Hint: "Adds the official cancellation information and form as page 2 of the PDF."
    - When `traderDetails` returns `null`, a second hint: "Add your business name and address above to include it."
  - Hints are tied to the switch with `aria-describedby`.
- **Supply and apply selected:** no switch. Show one line instead: "For supply-and-apply jobs the official wording is different. PriceBrush doesn't add it yet — see the [official model form](https://www.legislation.gov.uk/uksi/2013/3134/schedule/3)." Then: "General information, not legal advice."
- **Handover** (`../specs/paint-calculator.md` §10): `includeCancellationInfo` is one of the **kept** settings. Add it to the "Kept" list in §10 when T18 ships.

### 4.5 PDF

- **When:** the extra page is added when `includeCancellationInfo && materialsBasis === "labourOnly" && traderDetails(business) !== null`. Otherwise the PDF stays one page, as today.
- **Hyphenation off:** add `Font.registerHyphenationCallback((word) => [word])` at module level in `quote-pdf.tsx`. Without it, react-pdf may break a word with an inserted hyphen, and the shown text would no longer match the file ([react-pdf v4 fonts](https://react-pdf.org/fonts), "disable word hyphenation"). This also affects page 1, which is fine: names aren't split either.
- **New page:** `<Page size="A4">`, same margins and fonts as page 1.
  - Our own heading (not part of the file): "Cancellation information" plus "For quote {quoteNumber}" when there is a number.
  - Part A paragraphs, filled. The two section headings are in `Helvetica-Oblique`.
  - Part B in a bordered `<View wrap={false}>`, so it's never split across pages; react-pdf moves it to page 3 if it doesn't fit. Our own box title: "Model cancellation form".
  - Under the four consumer paragraphs (name, address, signature, date), add an empty writing line (a `View` with a bottom border, about 18 pt high). This is layout only, with no text.
  - Page-2 footer, above the existing fixed watermark: "Contains public sector information licensed under the Open Government Licence v3.0." as a `Link` to https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/. Then "Model wording: Schedule 3, Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013" as a `Link` to https://www.legislation.gov.uk/uksi/2013/3134/schedule/3.
  - The OGL v3.0 page gives that exact sentence as the default attribution and asks for a link to the licence ([checked 17/10/2026](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)).
- No "not legal advice" line on the client's PDF: it's the decorator's document. That line belongs on the web page (§4.4).

## 5. Where the text is shown, and why

| Place | Shown? | Why |
|---|---|---|
| PDF page 2 | **Yes** | The PDF is the durable medium the decorator gives the client ([reg 10](https://www.legislation.gov.uk/uksi/2013/3134/regulation/10): paper, or another durable medium if the client agrees) |
| `/decorating-quote-template/` (HTML) | **No**, only the switch, the hints and a link to Schedule 3 | Keeps the prerendered SEO page as the brief's copy, keeps about 2 KB of statutory text out of first-load JS, and saves the time a second renderer (light/dark, 360 px) would take. **Against:** the decorator can't read the text before downloading. The hint says "page 2 of the PDF", and the PDF opens in one tap |

## 6. Out of scope (v0.1)

- Supply-and-apply wording (§8).
- Distance-contract specifics (a quote left with the client and accepted later by phone or email). The same model instructions apply, and the FAQ covers it.
- The £42 threshold logic: the switch is the decorator's choice.
- An online cancellation form (Note 3).
- The invoice template (14/11) uses its own rule.

## 7. Acceptance criteria

- **A1 · Files are identical:** a Vitest test reads `app/content/legal/<name>.txt` and `docs/specs/legal/<name>.txt` with `fs.readFileSync` and checks `Buffer.equals` for both files.
- **A2 · Raw import is the file:**
  - the `?raw` string encoded as UTF-8 equals the file's bytes;
  - it has no `\uFEFF` and no `\r`;
  - it contains the placeholder exactly once;
  - it ends with `"\n"`.
- **A3 · Byte for byte apart from the placeholder:**
  - `fillTraderDetails(raw, details) === raw.split(PLACEHOLDER).join(details)`, with no `{{` left.
  - A business name containing `$&` and `$'` is inserted literally.
  - A template without the placeholder, or with two, throws.
- **A4 · The PDF renders the text unchanged:**
  - `cancellationParagraphs(filled)` round-trips (§4.3).
  - The component renders each paragraph as one `<Text>` with its string untouched, which a test checks on the element tree.
  - Hyphenation is disabled (§4.5).
- **A5 · When the page appears** (`quote-pdf.test.tsx`, real PDF): count the page objects in the bytes.

  | Case | Pages |
  |---|---|
  | Labour only, switch on, name and address filled | **2** (or 3 if Part B moves to its own page) |
  | Supply and apply | 1 |
  | Switch off | 1 |
  | Address empty | 1 |

- **A6 · Manual check (lead, in review):**
  - Open the PDF in Chrome and Acrobat Reader, select all on page 2, and paste into a file.
  - After collapsing whitespace, it equals the filled Part A, then Part B, apart from our headings, the OGL lines and the watermark.
  - The em dash prints.
- **A7 · No statutory text in the HTML:**
  - `grep -rF "$(sed -n 3p app/content/legal/ccr-schedule-3-part-a-services.txt)" build/client --include=*.html` finds nothing.
  - The route's first-load JS is the same size as before ±1 KB.
- **A8 · UI:**
  - The switch appears only for "Labour only" and defaults to on.
  - Its state survives a reload and a calculator handover.
  - Old drafts without the field load with it on.
  - Tap target ≥ 48 px, hints announced, focus visible.
  - Checked at 360 px and 1440 px, light and dark.
- **A9 · Proofread:** the checkboxes in `legal/README.md` are ticked by the founder before merge.

## 8. Supply-and-apply (founder decision, not for 31/10)

To cover the default job type we need a **second Part A file**, prepared the same way as the first (from the images, not typed from memory). It would use:

- one of Note 1 (b)–(d): (b) one delivery, (c) several goods delivered separately, (d) several lots or pieces;
- Note 4, unless the decorator offers to collect the goods;
- Note 5 (a), (b) and (c), where the decorator chooses:
  - whether they collect unused paint or the client sends it back;
  - who pays for returning it.

These are the decorator's own business terms, so the app would need one or two extra questions, or a fixed generous default such as "we collect, at our cost" [opinion]. Effort: about **1.5 h** more build, about 0.5 h of text preparation and checking, and a 10-minute founder proofread [estimate]. With the labour-only work that's about **4 h** in total.

**Options:**

1. **Move T18 (both job types) to November.** Ship only the T4 FAQ fix with a link to the official form on 31/10. **Recommended**: it's CEO R4's own fallback, T18 is already cut-order #4, and a labour-only option helps few users.
2. Build the labour-only part before 31/10 (2–2.5 h) **only if** Block D is merged by Tue 27/10 with hours left, and add supply-and-apply in November.
3. Use the services text for every quote. **Not recommended:** it would be wrong for the common case (§3, Note 1).
