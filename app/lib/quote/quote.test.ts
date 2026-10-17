import { describe, expect, it } from "vitest";

import { addDaysToIsoDate, formatUkDate, isIsoDate, todayIsoDate } from "./dates";
import { buildQuoteDocument, createEmptyDraft, createQuoteLine, quoteFileName, type QuoteDraft } from "./quote";
import { QUOTE_DRAFT_STORAGE_KEY, clearQuoteDraft, loadQuoteDraft, saveQuoteDraft } from "./storage";

function draftWith(overrides: Partial<QuoteDraft>): QuoteDraft {
  return { ...createEmptyDraft(), quoteDate: "2026-10-17", ...overrides };
}

const livingRoomLines = [
  { ...createQuoteLine("a", "Living room walls", "2 coats · 37.0 m² · 1.9 days"), amount: "380" },
  { ...createQuoteLine("b", "Living room ceiling"), amount: "180.00" },
  { ...createQuoteLine("c", "Hallway walls"), amount: "200" },
  { ...createQuoteLine("d", "Paint"), amount: "105" },
];

describe("dates", () => {
  it("formats UK dates and adds days across month and year ends", () => {
    expect(formatUkDate("2026-10-17")).toBe("17/10/2026");
    expect(addDaysToIsoDate("2026-10-17", 30)).toBe("2026-11-16");
    expect(addDaysToIsoDate("2026-12-20", 14)).toBe("2027-01-03");
    expect(addDaysToIsoDate("2026-03-20", 14)).toBe("2026-04-03"); // across the UK clock change
  });

  it("reads today from the local calendar", () => {
    expect(todayIsoDate(new Date(2026, 9, 17, 23, 30))).toBe("2026-10-17");
  });

  it("rejects dates that don't exist", () => {
    expect(isIsoDate("2026-02-29")).toBe(false);
    expect(isIsoDate("2028-02-29")).toBe(true);
    expect(isIsoDate("17/10/2026")).toBe(false);
  });
});

describe("buildQuoteDocument", () => {
  it("adds up the lines; no VAT by default; valid for 30 days", () => {
    const { document, blockedReason } = buildQuoteDocument(draftWith({ lines: livingRoomLines }));
    expect(blockedReason).toBeNull();
    expect(document?.subtotalPence).toBe(865_00);
    expect(document?.vatPence).toBe(0);
    expect(document?.totalPence).toBe(865_00);
    expect(document?.validUntil).toBe("2026-11-16");
    expect(document?.materialsSentence).toBe("Price includes paint and materials.");
  });

  it("adds 20% VAT only when VAT registered (the brief's example: £865 → £1,038)", () => {
    const { document } = buildQuoteDocument(draftWith({ lines: livingRoomLines, vatRegistered: true, vatNumber: " GB123456789 " }));
    expect(document?.vatPence).toBe(173_00);
    expect(document?.totalPence).toBe(1038_00);
    expect(document?.vatNumber).toBe("GB123456789");
  });

  it("rounds VAT to whole pence", () => {
    const { document } = buildQuoteDocument(draftWith({ lines: [{ ...createQuoteLine("a", "Touch-up"), amount: "10.01" }], vatRegistered: true }));
    expect(document?.vatPence).toBe(200); // 20% of £10.01 = £2.002
  });

  it("ignores blank lines and blocks an empty quote", () => {
    expect(buildQuoteDocument(draftWith({})).blockedReason).toBe("Add at least one line");
    const withBlank = buildQuoteDocument(draftWith({ lines: [...livingRoomLines, createQuoteLine("blank")] }));
    expect(withBlank.document?.lines).toHaveLength(4);
  });

  it("a line without a price yet is a calm hint, not an error", () => {
    const check = buildQuoteDocument(draftWith({ lines: [...livingRoomLines, createQuoteLine("e", "Walls, 2 coats")] }));
    expect(check.document).toBeNull();
    expect(check.blockedReason).toBe("Add a price to every line");
    expect(check.lineIssues).toEqual([{ lineId: "e", field: "amount", severity: "pending", message: "Add a price for this line" }]);
  });

  it("marks a price that can't be read, or a price with no description, as errors", () => {
    const check = buildQuoteDocument(
      draftWith({ lines: [{ ...createQuoteLine("a", "Walls, 2 coats"), amount: "two hundred" }, { ...createQuoteLine("b"), amount: "50" }] }),
    );
    expect(check.document).toBeNull();
    expect(check.blockedReason).toBe("Fix the lines marked in red");
    expect(check.lineIssues).toEqual([
      { lineId: "a", field: "amount", severity: "error", message: "Enter a price, like 220" },
      { lineId: "b", field: "description", severity: "error", message: "Add a description for this line" },
    ]);
  });

  it("still shows the totals of the valid lines while others are being filled in", () => {
    const check = buildQuoteDocument(draftWith({ lines: [...livingRoomLines, createQuoteLine("e", "Woodwork")], vatRegistered: true }));
    expect(check.document).toBeNull();
    expect(check.totals).toEqual({ subtotalPence: 865_00, vatPence: 173_00, totalPence: 1038_00 });
  });

  it("waits for the quote date", () => {
    expect(buildQuoteDocument(draftWith({ lines: livingRoomLines, quoteDate: "" })).blockedReason).toBe("Add the quote date");
  });

  it("says labour only when the client supplies the paint", () => {
    const { document } = buildQuoteDocument(draftWith({ lines: livingRoomLines, materialsBasis: "labourOnly" }));
    expect(document?.materialsSentence).toBe("Labour only — client supplies paint.");
  });
});

describe("quoteFileName", () => {
  it("names the file after the quote and client, without characters that break file names", () => {
    expect(quoteFileName({ quoteNumber: "Q-0001", client: { name: "Mrs Patel", jobAddress: "" } })).toBe("Quote Q-0001 Mrs Patel.pdf");
    expect(quoteFileName({ quoteNumber: "Q/12", client: { name: "", jobAddress: "" } })).toBe("Quote Q12.pdf");
  });
});

describe("autosave", () => {
  function memoryStorage() {
    const values = new Map<string, string>();
    return {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => void values.set(key, value),
      removeItem: (key: string) => void values.delete(key),
      values,
    };
  }

  it("saves, loads and clears a draft", () => {
    const storage = memoryStorage();
    const draft = draftWith({ lines: livingRoomLines });
    saveQuoteDraft(storage, draft);
    expect(loadQuoteDraft(storage)).toEqual(draft);
    clearQuoteDraft(storage);
    expect(loadQuoteDraft(storage)).toBeNull();
  });

  it("ignores saved data it doesn't understand", () => {
    const storage = memoryStorage();
    storage.setItem(QUOTE_DRAFT_STORAGE_KEY, "{not json");
    expect(loadQuoteDraft(storage)).toBeNull();
    storage.setItem(QUOTE_DRAFT_STORAGE_KEY, JSON.stringify({ ...draftWith({}), version: 2 }));
    expect(loadQuoteDraft(storage)).toBeNull();
    storage.setItem(QUOTE_DRAFT_STORAGE_KEY, JSON.stringify({ ...draftWith({}), validForDays: 45 }));
    expect(loadQuoteDraft(storage)).toBeNull();
  });

  it("keeps working when storage throws (private mode)", () => {
    const brokenStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    expect(() => saveQuoteDraft(brokenStorage, draftWith({}))).not.toThrow();
    expect(loadQuoteDraft(brokenStorage)).toBeNull();
  });
});
