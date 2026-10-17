import { parsePoundsToPence } from "~/lib/numbers";
import type { CalculatorHandover } from "~/lib/paint/handover";

import { addDaysToIsoDate, isIsoDate } from "./dates";

// The free quote template's data (PRD F2, screens.md P3, SEO brief §2.1) and the document it
// becomes. The form keeps what people typed; `buildQuoteDocument` turns it into checked numbers.

export const VALID_FOR_DAY_OPTIONS = [14, 30, 60] as const;
export type ValidForDays = (typeof VALID_FOR_DAY_OPTIONS)[number];

export const VAT_RATE_PERCENT = 20;

export type MaterialsBasis = "supplyAndApply" | "labourOnly";

export const MATERIALS_SENTENCES: Record<MaterialsBasis, string> = {
  supplyAndApply: "Price includes paint and materials.",
  labourOnly: "Labour only — client supplies paint.",
};

export interface QuoteLineFields {
  id: string;
  description: string;
  /** Optional second line, e.g. the working from the paint calculator. */
  detail: string;
  /** Pounds as typed, e.g. "220" or "220.50". */
  amount: string;
}

export interface QuoteDraft {
  version: 1;
  business: { name: string; phone: string; email: string; address: string };
  client: { name: string; jobAddress: string };
  quoteNumber: string;
  /** "YYYY-MM-DD"; empty until the browser fills in today. */
  quoteDate: string;
  validForDays: ValidForDays;
  lines: QuoteLineFields[];
  materialsBasis: MaterialsBasis;
  vatRegistered: boolean;
  vatNumber: string;
  notes: string;
}

export function createQuoteLine(id: string, description = "", detail = ""): QuoteLineFields {
  return { id, description, detail, amount: "" };
}

export function createEmptyDraft(): QuoteDraft {
  return {
    version: 1,
    business: { name: "", phone: "", email: "", address: "" },
    client: { name: "", jobAddress: "" },
    quoteNumber: "Q-0001",
    quoteDate: "",
    validForDays: 30,
    lines: [createQuoteLine("line-1")],
    materialsBasis: "supplyAndApply",
    vatRegistered: false,
    vatNumber: "",
    notes: "",
  };
}

/** Common decorator lines (SEO brief §2.1), added with the description filled in. */
export const QUICK_ADD_LINES = [
  "Walls, 2 coats",
  "Ceiling, 2 coats",
  "Woodwork (skirting, doors, frames)",
  "Prep: fill and sand",
  "Mist coat (new plaster)",
  "Wallpaper removal",
  "Paint and materials",
] as const;

export interface QuoteDocumentLine {
  id: string;
  description: string;
  detail: string;
  amountPence: number;
}

export interface QuoteLineIssue {
  lineId: string;
  field: "description" | "amount";
  /** "pending": not filled in yet (a calm hint). "error": something typed that can't be used. */
  severity: "pending" | "error";
  message: string;
}

export interface QuoteDocument {
  business: QuoteDraft["business"];
  client: QuoteDraft["client"];
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  lines: QuoteDocumentLine[];
  materialsSentence: string;
  vatRegistered: boolean;
  vatNumber: string;
  notes: string;
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
}

export interface QuoteTotals {
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
}

export interface QuoteCheck {
  /** null when the PDF can't be made yet; `blockedReason` says why. */
  document: QuoteDocument | null;
  blockedReason: string | null;
  lineIssues: QuoteLineIssue[];
  /** Totals of the lines that are valid so far, so the form can show them while it's being filled in. */
  totals: QuoteTotals;
}

function isBlankLine(line: QuoteLineFields): boolean {
  return line.description.trim() === "" && line.detail.trim() === "" && line.amount.trim() === "";
}

/**
 * Checks the draft and works out the totals. Blank lines are ignored. A line without a valid price
 * blocks the PDF, so a quote never goes out with a missing price. A price not typed yet is only a
 * calm hint; something typed that can't be used is an error.
 */
export function buildQuoteDocument(draft: QuoteDraft): QuoteCheck {
  const filledLines = draft.lines.filter((line) => !isBlankLine(line));
  const lineIssues: QuoteLineIssue[] = [];
  const documentLines: QuoteDocumentLine[] = [];

  for (const line of filledLines) {
    const amountPence = parsePoundsToPence(line.amount);
    if (line.description.trim() === "") {
      lineIssues.push({ lineId: line.id, field: "description", severity: "error", message: "Add a description for this line" });
    } else if (line.amount.trim() === "") {
      lineIssues.push({ lineId: line.id, field: "amount", severity: "pending", message: "Add a price for this line" });
    } else if (Number.isNaN(amountPence)) {
      lineIssues.push({ lineId: line.id, field: "amount", severity: "error", message: "Enter a price, like 220" });
    } else {
      documentLines.push({ id: line.id, description: line.description.trim(), detail: line.detail.trim(), amountPence });
    }
  }

  const blockedReason =
    filledLines.length === 0
      ? "Add at least one line"
      : lineIssues.some((issue) => issue.severity === "error")
        ? "Fix the lines marked in red"
        : lineIssues.length > 0
          ? "Add a price to every line"
          : !isIsoDate(draft.quoteDate)
          ? "Add the quote date"
          : null;

  const subtotalPence = documentLines.reduce((sum, line) => sum + line.amountPence, 0);
  const vatPence = draft.vatRegistered ? Math.round((subtotalPence * VAT_RATE_PERCENT) / 100) : 0;
  const totals: QuoteTotals = { subtotalPence, vatPence, totalPence: subtotalPence + vatPence };

  if (blockedReason) return { document: null, blockedReason, lineIssues, totals };

  return {
    document: {
      business: trimValues(draft.business),
      client: trimValues(draft.client),
      quoteNumber: draft.quoteNumber.trim(),
      quoteDate: draft.quoteDate,
      validUntil: addDaysToIsoDate(draft.quoteDate, draft.validForDays),
      lines: documentLines,
      materialsSentence: MATERIALS_SENTENCES[draft.materialsBasis],
      vatRegistered: draft.vatRegistered,
      vatNumber: draft.vatNumber.trim(),
      notes: draft.notes.trim(),
      ...totals,
    },
    blockedReason: null,
    lineIssues,
    totals,
  };
}

function trimValues<Shape extends Record<string, string>>(values: Shape): Shape {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])) as Shape;
}

/** "Quote Q-0001 Anita Patel.pdf", with characters that break file names removed. */
export function quoteFileName(document: Pick<QuoteDocument, "quoteNumber" | "client">): string {
  const parts = ["Quote", document.quoteNumber, document.client.name].filter((part) => part !== "");
  return `${parts.join(" ").replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim()}.pdf`;
}

/** Pence → what a person would type: 38000 → "380.00". */
export function penceToPoundsText(amountPence: number): string {
  return (amountPence / 100).toFixed(2);
}

/**
 * Quote lines from the paint calculator hand-over (spec §10): same order, the working as the
 * detail, every line still editable.
 */
export function linesFromHandover(handover: CalculatorHandover, createLineId: () => string): QuoteLineFields[] {
  return handover.lines.map((line) => ({
    id: createLineId(),
    description: line.title,
    detail: line.detail,
    amount: penceToPoundsText(line.amountPence),
  }));
}

/** "We brought over 2 rooms from the paint calculator." */
export function handoverBannerText(roomCount: number): string {
  return `We brought over ${roomCount} ${roomCount === 1 ? "room" : "rooms"} from the paint calculator. Check the lines, then add the client.`;
}
