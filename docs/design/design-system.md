# PriceBrush — Design system (v0.3, direction "Coachline")

Date: 17/10/2026 · Status: **approved by the founder 17/10/2026** (`../ceo/decisions-2026-10-17.md` #5: the recognisable mark is the set — cream + gold coachline + yellow primary — not green alone; brand green stays off the WhatsApp button) · Research: `research.md` · Screens: `screens.md` · Visual board: `design-system.html` (`images/design-system-*.png`)

Rules this system enforces (PRD §6): 360 px first, **desktop ≥ 1024 px is first-class** · targets ≥ 48 px · on phone the primary action is pinned at the bottom · **one primary action per screen; yellow is only for it** · body ≥ 16 px · WCAG 2.2 AA (we aim for 7:1 on body text) · light + dark · status always visible · UK English.

Code mirror of every token and component below: `tools/pb-base.css` (inlined into each prototype by `tools/sync-base.py`).

---

## 1. Brand personality

| We are | We are not |
|---|---|
| Plain-spoken, like a good foreman | Chirpy, emoji-heavy, "rockstar" |
| An established local firm (coach-painted van, not a start-up) | Generic SaaS blue or purple gradients |
| Quick and confident | Rushed or pushy (no pop-ups, no "book a demo") |
| Proud of the trade | Brush, roller and paint-drip clip-art (research #54, #56) |
| Honest about money ("cancel in one tap") | Dark patterns, hidden fees, sales calls |

**Voice:** short sentences, trade words ("job", "day rate", "two coats", "check this"). Say "we estimated", never "AI magic". British spelling. **Sentence case** everywhere, including headings and buttons (all-caps condensed is Powered Now's look, research #5).

## 2. Logo (wordmark first)

| Part | Spec |
|---|---|
| Wordmark | `PriceBrush`, Archivo 800, width 87.5 %, tracking −1.5 %. Ink on paper, cream (`on-brand`) on green |
| Tile (app icon, favicon, lock-up) | Rounded square (radius 25 %), coach green `brand`, **gold pinstripe inset 3 px** (`coachline`), cream `£`. At 16 px drop the pinstripe |
| Lock-up | Tile + wordmark, gap 10 px at 22 px type |
| Free-plan badge | "Made with PriceBrush", 14 px `ink-2`, 18 px tile. Links to `/`. Hidden on Pro |
| Never | Yellow in the logo (yellow means "tap here"), brushes, rollers, drips, gradients |

*Assumption:* UK IPO trademark check still pending (PRD §9).

## 3. Colour tokens

Contrast computed with `tools/contrast.py` (WCAG 2.x). AA = 4.5:1 text, 3:1 large text and UI boundaries.

### 3.1 Light

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F6F3EC` | Cream paper background |
| `surface` | `#FFFFFF` | Cards, sheets, inputs |
| `surface-2` | `#ECE7DC` | Sunken areas, pressed rows, skeletons |
| `ink` | `#14201A` | Text, icons (green-black) |
| `ink-2` | `#46524B` | Secondary text |
| `ink-3` | `#59645D` | Placeholders |
| `line` | `#DCD5C6` | Decorative dividers only |
| `line-strong` | `#78807A` | Input and secondary-button borders |
| `brand` | `#1E3D2E` | Coach green: logo tile, hero band, desktop sidebar, tool CTA cards |
| `on-brand` | `#F7F1DE` | Cream text on green |
| `coachline` | `#B8892B` | Gold pinstripe. **Decorative only, never text** |
| `accent` | `#F4C430` | Signal yellow. **Primary action fill only** |
| `accent-pressed` | `#E0AE14` | Primary pressed |
| `on-accent` | `#14201A` | Label on yellow (both themes) |
| `accent-edge` | `#14201A` | 2 px border + 2 px "plate" shadow on primary (light) |
| `check-fg` / `check-bg` / `check-line` | `#1D4BAF` / `#EAF0FC` / `#3D6BD6` | "Check this" (AI estimate) — pencil blue |
| `danger-fg` / `danger-bg` | `#B42318` / `#FDECEA` | Errors, Overdue, destructive |
| `ok-fg` / `ok-bg` | `#17643A` / `#DDF0E3` | Accepted, success |
| `sent-fg` / `sent-bg` | `#24456E` / `#E4EBF4` | Sent |
| `draft-fg` / `draft-bg` | `#46524B` / `#E9E4D9` | Draft |
| `focus` | `#1D4BAF` | 3 px focus ring |
| `desk` | `#E4DED1` | Behind the 360 px phone frame on wide screens |

### 3.2 Dark

| Token | Hex | Token | Hex |
|---|---|---|---|
| `bg` | `#0D1411` | `accent` | `#F4C430` |
| `surface` | `#151E19` | `accent-pressed` | `#E0AE14` |
| `surface-2` | `#1E2923` | `on-accent` | `#14201A` |
| `ink` | `#F3EFE4` | `accent-edge` | `#F4C430` (edge disappears) |
| `ink-2` | `#B8C2BB` | `check-fg` / `-bg` / `-line` | `#9DBBFF` / `#16213A` / `#6690F0` |
| `ink-3` | `#9CA79F` | `danger-fg` / `-bg` | `#FF9A90` / `#2E1716` |
| `line` | `#29352F` | `ok-fg` / `-bg` | `#86D9A0` / `#12271A` |
| `line-strong` | `#74817A` | `sent-fg` / `-bg` | `#AFC6EA` / `#1A2638` |
| `brand` | `#1E3D2E` | `draft-fg` / `-bg` | `#B8C2BB` / `#222C27` |
| `on-brand` | `#F7F1DE` | `focus` | `#9DBBFF` |
| `coachline` | `#D9B25A` | `desk` | `#070B09` |

The **A4 document / PDF stays ink on white in both themes** (prints cheaply; matches what the client receives).

### 3.3 Contrast ratios (every specified pair)

| Pair | Light | Dark | Result |
|---|---|---|---|
| `ink` on `bg` | 15.14 | 16.24 | AAA |
| `ink` on `surface` | 16.78 | 14.84 | AAA |
| `ink` on `surface-2` | 13.61 | 13.09 | AAA |
| `ink-2` on `bg` | 7.38 | 10.20 | AAA |
| `ink-2` on `surface` | 8.17 | 9.31 | AAA |
| `ink-2` on `surface-2` | 6.63 | 8.21 | AA / AAA |
| `ink-3` on `bg` | 5.56 | 7.50 | AA / AAA |
| `ink-3` on `surface` | 6.17 | 6.85 | AA |
| `line-strong` on `surface` (boundary) | 4.06 | 4.19 | AA non-text |
| `line-strong` on `bg` (boundary) | 3.67 | 4.59 | AA non-text |
| `on-brand` on `brand` | 10.55 | 10.55 | AAA |
| `on-brand-2` `#E6DFC9` on `brand` (secondary text on green) | 8.95 | 8.95 | AAA |
| `on-accent` on `accent` | 10.22 | 10.22 | AAA |
| `on-accent` on `accent-pressed` | 8.18 | 8.18 | AAA |
| `accent` on `bg` (button boundary) | **1.48** | 11.36 | Light fails alone → `accent-edge` ink border (15.14) is the boundary |
| `accent` on `surface` | **1.64** | 10.38 | Same fix |
| `accent` on `brand` (hero CTA) | 7.26 | 7.26 | AA non-text |
| `check-fg` on `check-bg` | 6.86 | 8.37 | AA / AAA |
| `check-fg` on `surface` | 7.84 | 8.92 | AAA |
| `check-line` on `surface` (dashed boundary) | 4.92 | 5.53 | AA non-text |
| `check-line` on `check-bg` | 4.30 | 5.19 | AA non-text |
| `danger-fg` on `danger-bg` | 5.75 | 8.22 | AA / AAA |
| `danger-fg` on `surface` | 6.57 | 8.34 | AA / AAA |
| `danger-fg` on `bg` | 5.93 | 9.13 | AA / AAA |
| `ok-fg` on `ok-bg` | 6.04 | 9.35 | AA / AAA |
| `sent-fg` on `sent-bg` | 8.13 | 8.77 | AAA |
| `draft-fg` on `draft-bg` | 6.45 | 7.87 | AA / AAA |
| Paid chip / toast: `bg` on `ink` | 15.14 | 16.24 | AAA |
| `focus` on `bg` | 7.08 | 9.76 | AA non-text |
| `focus` on `surface` | 7.84 | 8.92 | AA non-text |
| `coachline` on `brand` | 3.77 | 5.94 | Decorative only (≥ 3:1) |
| `coachline` on `bg` | 2.85 | 9.30 | **Not allowed** in light (decorative on green only) |
| ✗ `ink` (dark theme) on `accent` | — | 1.43 | **Forbidden** — always `on-accent` |

**Colour is never the only signal:** chips carry a word and icon; "check this" has icon + words + dashed border; errors have icon + message.

**Brand green is kept out of status.** Accepted uses `ok-fg` (brighter green) + check icon + the word, so it never reads as "brand".

## 4. Typography

- **Display / money:** Archivo (Google Fonts, SIL OFL), variable `wdth 62–125`, `wght 500–800`, used at **87.5 % width** (semi-condensed, less "all-caps poster" than v0.1's 75–80 %). One latin-subset woff2, self-hosted, `font-display: swap`, preload on SEO pages. *Estimate* 35–60 KB (assumption, measure at build). Fallback `"Arial Narrow", system-ui`.
- **Body / UI:** system stack (zero download).
- **Numbers:** `tabular-nums` on all money and quantities.
- **Headings:** `text-wrap: balance` (no orphan "mate.").

| Token | Size / line | Font · weight | Use |
|---|---|---|---|
| `display` | 44 / 46 (desktop hero 60 / 62) | Archivo 800 | Landing hero |
| `h1` | 30 / 34 | Archivo 800 | Page titles on SEO pages, desktop page titles |
| `h2` | 24 / 28 | Archivo 750 | Screen titles, sections |
| `title` | 20 / 26 | Archivo 700 | Cards, sheets |
| `money-xl` | 36 / 40 | Archivo 800, tabular | Totals |
| `body-lg` | 18 / 26 | System 400/600 | Transcript, key labels |
| `body` | 16 / 24 | System 400/600 | **Minimum for anything you read to act** |
| `caption` | 14 / 20 | System 500 | Meta only (dates, chips, footnotes) |

Inputs ≥ 16 px (no iOS zoom). The A4 preview thumbnail on desktop uses 10.5–12 px because it is a scaled picture of the PDF; the full-size preview and the PDF itself use 10–11 pt.

## 5. Layout, spacing, radii, elevation

**Spacing (4 px base):** 1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64.

| Layout | Phone (< 1024 px) | Desktop (≥ 1024 px) |
|---|---|---|
| Frame | 360 px first, gutter 16 px; up to 480 px content width | 1280 px design width; fluid 1024–1440 |
| Navigation | Bottom nav 64 px (Quotes · New quote · Settings) | Coach-green sidebar 232 px, same 3 items + plan meter |
| Primary action | Pinned bottom bar (16 px padding + 56 px button) | Top of the right-hand action/preview rail, sticky; plus a keyboard shortcut |
| Task screens | One column | Two columns: work area (fluid) + preview rail 448 px |
| Top bar | 56 px app bar | 64 px top bar (back · title · status chip · save status) |

| Radius | Value | Use |
|---|---|---|
| `sm` | 6 px | Chips |
| `md` | 10 px | Buttons, inputs, rows |
| `lg` | 16 px | Cards, sheets |
| `full` | 9999 px | Mic, filter pills |

| Elevation | Spec | Use |
|---|---|---|
| `e0` | 1 px `line` border | Cards, rows (default; borders survive glare) |
| `plate` | 2 px `accent-edge` border + `0 2px 0 accent-edge` | Primary button (light) |
| `e2` | `0 -8px 24px rgb(13 20 17 / .14)` | Bottom sheets |
| `paper` | 1 px `#CFC8B8` + `0 12px 24px rgb(13 20 17 / .10)` | A4 preview |
| `scrim` | `rgb(13 20 17 / .55)` | Behind sheets |

**The coachline** (2 px `coachline` rule) is the only ornament: logo pinstripe, hero eyebrow rule, numbered-step tiles. Never on cream in light theme (fails 3:1).

## 6. Iconography

Lucide (ISC), 24 px, stroke 2 (2.25 on the mic). Always with a text label, except back/close (with `aria-label`). Core set lives in `tools/pb-icons.svg`: mic, mic-off, stop, type, eye, pencil, plus, trash, send, message-circle (WhatsApp*), mail, link, download, file, banknote, wifi-off, check-circle, alert, settings, search, list, back, chevron, x, phone, copy, calculator, lock, clock, sun, moon, monitor, smartphone, grip.

*WhatsApp:* Lucide has no brand logos; until the official glyph is in the repo we use `message-circle` + the word "WhatsApp" (rules in 6.1).

### 6.1 WhatsApp logo rules (decision #9, accepted 17/10/2026)

Source: Meta's WhatsApp brand page, read by the CEO advisor on 17/10/2026 ([meta.com](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/)). The brand pack itself has not been opened yet (**not verified**).

| Rule | What it means for us |
|---|---|
| Official asset only | The founder downloads Meta's pack himself and stores it in the repo with source URL and date. No redrawn, traced or icon-font "WhatsApp" glyphs |
| Unmodified | Never recolour, outline, re-stroke, crop or add effects. Size it to the label's text height (20–24 px) |
| Word beside it | Always the word "WhatsApp" next to the glyph, in the same font size and style as the button label. Never the glyph alone |
| Never a verb | "Send on WhatsApp", "Message Dave on WhatsApp". Never "WhatsApp it", "WhatsApp your client" |
| No partner claim | No "partner", "powered by", "official", "integrated with". No `whatsapp` in our URLs, file names, product names or event names (use `wa_` / "chat") |
| Not brand green | Keep `brand` coach green away from WhatsApp buttons (decision #5) |
| Yellow primary ("Send on WhatsApp") | Use the official glyph **only if the pack has a variant that sits on `accent` unmodified and stays visible**. WhatsApp's widely published green `#25D366` (not verified against the pack) on `accent` is **1.21:1** — practically invisible. A dark one-colour variant, if the pack offers one, would give about 10:1 like `on-accent`. **Fallback (and current prototypes):** generic `message-circle` bubble in `on-accent` + the word "WhatsApp" |
| Secondary buttons (client page "Message Dave on WhatsApp") | The full-colour glyph may sit on `surface`; the word carries the meaning, so the glyph is decorative (`aria-hidden`). Green on white is 1.98:1, on dark `bg` 9.41:1 |
| If the pack terms forbid share buttons | Generic bubble everywhere. Zero trademark risk |

## 7. Motion

| Motion | Duration · easing | Rule |
|---|---|---|
| Press | 80 ms ease-out | Primary moves down 2 px, plate shadow → 0 |
| Sheet in / out | 240 / 200 ms `cubic-bezier(.2,.8,.2,1)` | From bottom (phone); desktop uses centred dialog, fade 160 ms |
| Toast | 200 ms in; success hides after 4 s; errors stay | |
| Mic pulse | 1.4 s loop | Ring 1 → 1.35, fades |
| Processing | Bar + step text, changes ≤ every 3 s | > 15 s: "Taking longer than usual — your words are saved." |
| `prefers-reduced-motion` | Pulse → static ring; sheets fade only | Mandatory |

No motion over 300 ms on navigation. No parallax, no confetti.

## 8. Tailwind v4 `@theme`

Semantic variables flip with `.dark` on `<html>`; `@theme inline` exposes them as utilities (`bg-surface`, `text-ink`, `bg-accent`, `border-line-strong`, `text-check-fg`…) with no `dark:` variants needed.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --pb-bg: #F6F3EC; --pb-surface: #FFFFFF; --pb-surface-2: #ECE7DC;
  --pb-ink: #14201A; --pb-ink-2: #46524B; --pb-ink-3: #59645D;
  --pb-line: #DCD5C6; --pb-line-strong: #78807A;
  --pb-brand: #1E3D2E; --pb-on-brand: #F7F1DE; --pb-on-brand-2: #E6DFC9; --pb-coachline: #B8892B;
  --pb-accent: #F4C430; --pb-accent-pressed: #E0AE14; --pb-on-accent: #14201A; --pb-accent-edge: #14201A;
  --pb-check-fg: #1D4BAF; --pb-check-bg: #EAF0FC; --pb-check-line: #3D6BD6;
  --pb-danger-fg: #B42318; --pb-danger-bg: #FDECEA;
  --pb-ok-fg: #17643A; --pb-ok-bg: #DDF0E3;
  --pb-sent-fg: #24456E; --pb-sent-bg: #E4EBF4;
  --pb-draft-fg: #46524B; --pb-draft-bg: #E9E4D9;
  --pb-focus: #1D4BAF; --pb-desk: #E4DED1;
}
.dark {
  --pb-bg: #0D1411; --pb-surface: #151E19; --pb-surface-2: #1E2923;
  --pb-ink: #F3EFE4; --pb-ink-2: #B8C2BB; --pb-ink-3: #9CA79F;
  --pb-line: #29352F; --pb-line-strong: #74817A;
  --pb-brand: #1E3D2E; --pb-on-brand: #F7F1DE; --pb-on-brand-2: #E6DFC9; --pb-coachline: #D9B25A;
  --pb-accent: #F4C430; --pb-accent-pressed: #E0AE14; --pb-on-accent: #14201A; --pb-accent-edge: #F4C430;
  --pb-check-fg: #9DBBFF; --pb-check-bg: #16213A; --pb-check-line: #6690F0;
  --pb-danger-fg: #FF9A90; --pb-danger-bg: #2E1716;
  --pb-ok-fg: #86D9A0; --pb-ok-bg: #12271A;
  --pb-sent-fg: #AFC6EA; --pb-sent-bg: #1A2638;
  --pb-draft-fg: #B8C2BB; --pb-draft-bg: #222C27;
  --pb-focus: #9DBBFF; --pb-desk: #070B09;
}

@theme inline {
  --color-bg: var(--pb-bg);            --color-surface: var(--pb-surface);   --color-surface-2: var(--pb-surface-2);
  --color-ink: var(--pb-ink);          --color-ink-2: var(--pb-ink-2);       --color-ink-3: var(--pb-ink-3);
  --color-line: var(--pb-line);        --color-line-strong: var(--pb-line-strong);
  --color-brand: var(--pb-brand);      --color-on-brand: var(--pb-on-brand); --color-on-brand-2: var(--pb-on-brand-2);
  --color-coachline: var(--pb-coachline);
  --color-accent: var(--pb-accent);    --color-accent-pressed: var(--pb-accent-pressed);
  --color-on-accent: var(--pb-on-accent); --color-accent-edge: var(--pb-accent-edge);
  --color-check-fg: var(--pb-check-fg); --color-check-bg: var(--pb-check-bg); --color-check-line: var(--pb-check-line);
  --color-danger-fg: var(--pb-danger-fg); --color-danger-bg: var(--pb-danger-bg);
  --color-ok-fg: var(--pb-ok-fg);      --color-ok-bg: var(--pb-ok-bg);
  --color-sent-fg: var(--pb-sent-fg);  --color-sent-bg: var(--pb-sent-bg);
  --color-draft-fg: var(--pb-draft-fg); --color-draft-bg: var(--pb-draft-bg);
  --color-focus: var(--pb-focus);      --color-desk: var(--pb-desk);
  --color-paper: #FFFFFF;              --color-paper-ink: #14201A;   /* PDF/A4: fixed in both themes */
}

@theme {
  --font-display: "Archivo", "Arial Narrow", system-ui, sans-serif;
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  --text-display: 2.75rem;  --text-display--line-height: 2.875rem;
  --text-h1: 1.875rem;      --text-h1--line-height: 2.125rem;
  --text-h2: 1.5rem;        --text-h2--line-height: 1.75rem;
  --text-title: 1.25rem;    --text-title--line-height: 1.625rem;
  --text-money-xl: 2.25rem; --text-money-xl--line-height: 2.5rem;
  --text-body-lg: 1.125rem; --text-body-lg--line-height: 1.625rem;
  --text-body: 1rem;        --text-body--line-height: 1.5rem;
  --text-caption: 0.875rem; --text-caption--line-height: 1.25rem;

  --spacing: 0.25rem;

  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;

  --shadow-plate: 0 2px 0 var(--pb-accent-edge);
  --shadow-sheet: 0 -8px 24px rgb(13 20 17 / 0.14);
  --shadow-paper: 0 1px 0 #CFC8B8, 0 12px 24px rgb(13 20 17 / 0.10);

  --ease-sheet: cubic-bezier(0.2, 0.8, 0.2, 1);
  --breakpoint-desk: 64rem; /* 1024 px: desktop layouts */
}
```

Display headings: `font-display font-extrabold [font-stretch:87.5%] text-balance`. Desktop layouts: `desk:` variant (e.g. `desk:grid-cols-[1fr_448px]`).

## 9. Components

Common: target ≥ 48 × 48 px; focus 3 px `focus` ring, 2 px offset; disabled never drops text below 4.5:1 (changes fill/border and explains why); loading keeps width.

### 9.1 Buttons

| Variant | Default | Pressed | Disabled | Loading | Error |
|---|---|---|---|---|---|
| **Primary** (one per screen) | 56 px (phone pinned) / 48–56 px desktop; `accent` fill, `on-accent` 18 px/700; light: 2 px `accent-edge` + plate shadow | `accent-pressed`, down 2 px, no shadow | `surface-2`, 2 px dashed `line-strong`, `ink-2` label + hint below ("Add at least one line") | Spinner + verb ("Sending…"), `aria-busy` | Returns to default; inline `danger` message above + toast |
| **Secondary** | `surface`, 2 px `line-strong`, `ink` | `surface-2` | `line` border, `ink-3` | Spinner | As primary |
| **Ghost** | No border, underlined `ink` 600 | `surface-2` | `ink-3` | n/a | n/a |
| **On-brand** (CTA cards on green) | Transparent, 2 px `on-brand` border, cream label | 8 % cream fill | — | — | — |
| **Destructive** | `danger-fg` label + trash icon; always behind a confirm | `danger-bg` | — | — | — |

Desktop: a `kbd` hint may sit inside the primary ("Send quote  Ctrl ↵").

### 9.2 Input & textarea

| State | Spec |
|---|---|
| Default | Label above 16/600; 52 px; `surface`; 2 px `line-strong`; `md` radius; placeholder `ink-3` |
| Focus | Border `focus` + 3 px ring |
| Filled / money | `£` prefix inside, right-aligned tabular, `inputmode="decimal"` |
| Disabled / read-only | `surface-2`, `line` border, text `ink-2` |
| Loading | Spinner at right edge |
| Error | Border `danger-fg` + icon + message ("Enter a price, like 220") |
| Textarea | Min 4 lines, grows to 10; 18 px for transcripts |
| Desktop table cell | Borderless until hover (`line`) / focus (`focus` ring); 44 px; detail sub-cell 14 px spans description→amount |

### 9.3 Mic / record button

| State | Spec |
|---|---|
| Idle | 112 px circle; **is the primary** on New quote: `accent` + `on-accent` mic 44 px + plate (light). "Tap to talk" 18/600, "Up to 2 minutes", ghost "or type it" |
| Pressed | Scale .96, no shadow |
| Recording | Stop square; pulse ring; timer "0:24 / 2:00" in Archivo; "Tap to stop"; `aria-pressed`, live region |
| Near limit (1:45+) | Timer `danger-fg`, "15 seconds left" |
| Processing | `surface-2`, spinner; "Writing it down…" → "Building your quote…" |
| Disabled (no permission) | Dashed `line-strong`, mic-off icon, message; "Type it instead" becomes primary |
| Error | "We couldn't hear that clearly. Try again, or type it." Draft kept |
| Desktop | 52 px outlined mic inside the "Add more work" bar + `M` shortcut; typing is equal (same bar) |

### 9.4 Line-item row

| State | Spec |
|---|---|
| Default | ≥ 64 px; description 16/600 + detail 14 `ink-2` ("36 m² · 2 coats · 1.1 days"); amount 18/700 tabular; row opens Edit sheet (phone) or edits inline (desktop) |
| **Check this** | `check-bg`, 4 px `check-line` left bar, estimated value dashed-underlined, note "Check this — we estimated the wall area." + ghost "Looks right". Editing the value clears it. **Never shown to the client** |
| Pressed | `surface-2` |
| Deleted | Collapses; toast "Line removed · Undo" (6 s) |
| Error | `danger` left bar + "Price missing" |
| Loading | Skeleton bars |

### 9.5 Status chip & save status

28 px, `sm`, 14/600, word always + 16 px icon. Draft (pencil) · Sent (send) · Accepted (check, `ok`) · Paid (banknote, inverted `bg` on `ink`) · Overdue (alert, `danger`) · "1 to check" (eye, dashed `check`). Save status: "Saved" · "Saving…" · "Offline — will sync" (`surface-2`, calm) · "Couldn't save — tap to retry" (`danger`). Only claim what we know (no "Opened" unless we truly track it).

### 9.6 List item

72 px. Row 1: client 16/600 + amount 16/700. Row 2: "Q-0012 · 14/10/2026" 14 `ink-2` + chip. States: default, pressed, unsynced (wifi-off + "Not synced yet"), skeleton. Desktop: same row in a list pane with the selected row outlined `ink` 2 px, detail pane on the right (v0.3).

### 9.7 Navigation

- **Phone bottom nav:** 64 px, Quotes · New quote · Settings, icon + 14/600 label; active = `ink` + 3 px top indicator (not colour alone). Hidden during recording and in task flows.
- **Desktop sidebar:** `brand` green 232 px; items 48 px cream; active = cream pill with ink text; plan meter at the foot ("Free plan · 3 of 5 documents this month" + "Go Pro: £9 a month, incl. VAT").

### 9.8 Bottom sheet / dialog

Phone: `surface`, `lg` top corners, `e2`, handle 36 × 4, title + 48 px close, max 88 vh, primary in sheet footer; dismiss by close, scrim, swipe, Esc; focus trapped. Desktop: same content in a centred 480 px dialog.

### 9.9 Toast

Inverted (`ink` fill, `bg` text), `md`, 16 px; action as underlined text ≥ 48 px; success 4 s, errors persist (`role="alert"`). Phone: above the pinned bar. Desktop: bottom-left of the work area. **Undo toasts for money** ("Cancelled. You keep Pro until 15/11/2026. [Undo]") stay 10 s or until dismissed; the same action stays available afterwards as "Resume Pro" in Settings (`screens.md` A11).

### 9.10 Empty state

No illustration. `h2` + one line + one button. "No quotes yet" / "Your first one takes about a minute." / [Start a quote].

### 9.11 Paywall card

Header "You've used 5 free documents this month." · compare by task (Documents a month 5 / Unlimited · PriceBrush mark Yes / None · Your logo — / Yes · Price book — / Yes) · radio cards 64 px (Monthly £9 "£9 a month, incl. VAT · cancel any time" · Yearly £79 "£79 a year, incl. VAT · £6.58 a month · save £29" · Founding Member £49 once "£49 once, incl. VAT" "37 of 50 left · ends 31/01/2027") · terms above the button ("You'll pay £9 today (incl. VAT), then £9 every month. Cancel in one tap in Settings."; decision #6, Polar tax set to Inclusive) · primary "Continue to checkout" · ghost "Not now — stay on Free". States: loading, error, sold out, success.

### 9.12 Quote / invoice document (client page + PDF)

1. **Header:** decorator's logo (≤ 56 px) or ink monogram tile; business name biggest after the total; contact (tap-to-call, WhatsApp). Right: "Quote" / "Invoice" + number.
2. **Client page only — summary first:** total (44 px), "valid until" / "due", number (research #20, #23, #46).
3. **Meta:** For · Job address · Date (DD/MM/YYYY) · Valid until / Due · (Invoice) Work finished (supply date).
4. **Lines:** description + detail · amount (phone); A4: Description · Amount (Qty/Rate columns only when used).
5. **Totals:** Subtotal · Discount · VAT 20 % + VAT number (only if registered) · **Total**.
6. **Notes / terms;** invoice: bank block (account name, sort code, account number, reference = invoice number) with copy buttons on the client page.
7. **Action (client page):** "Accept quote" (P1) / "Copy bank details" (invoice). **MVP: always `accent` yellow** (decision #8). Contact buttons: "Call Dave" · "Message Dave on WhatsApp" (secondary, stacked full width; 6.1).

   **Contrast fallback (post-MVP Pro "your colours"):** the decorator's colour is used for the Accept button only if an automatic check passes: label (pick `#14201A` or `#FFFFFF`, whichever is higher) ≥ **4.5:1** on the fill, and fill ≥ **3:1** against the page `bg` in both themes, or the button keeps the 2 px `accent-edge`-style ink border (as yellow does in light). If the label check fails in either theme, the button falls back to `accent` yellow with `on-accent`. Tell the decorator in Settings: "This colour is too light for the button text, so clients will see yellow."
8. **Footer:** "Made with PriceBrush" on Free only.

GOV.UK must-haves for invoices are checked (research §1.6). PDF: Archivo headings/totals, Helvetica body 10–11 pt, ink on white, no fills except the decorator's logo.

### 9.13 Desktop editor (new in v0.2)

| Part | Spec |
|---|---|
| Add-work bar | Dashed `line-strong` box: 52 px mic + text field "Add more work: say it (M) or type it" — voice and typing equal |
| Client block | 2 × 2 grid of inputs |
| Lines | Grid rows: grip · description · days · amount · delete; detail sub-row spans description→amount; "check this" note row under the flagged line |
| Totals | Right-aligned 340 px block |
| Shortcuts | Tab next cell · Enter new line · M talk · Ctrl+Enter send · Ctrl+Z undo (listed under the form) |
| Preview rail | 448 px, `surface-2`, sticky: primary "Send quote", secondary "Download PDF" / "Copy link", segmented "PDF (A4) / Client's phone", live A4 preview |
