import { describe, expect, it } from "vitest";

import { buildQuoteDocument, createEmptyDraft, createQuoteLine } from "~/lib/quote/quote";

import { renderQuotePdf } from "./quote-pdf";

describe("renderQuotePdf", () => {
  it("renders a full quote with £, —, ·, ² and × to a PDF", async () => {
    const { document } = buildQuoteDocument({
      ...createEmptyDraft(),
      business: { name: "Holt Decorating", phone: "07700 900123", email: "dave@example.com", address: "Leeds" },
      client: { name: "Mrs Patel", jobAddress: "12 Oak Road, Leeds LS6 2AB" },
      quoteDate: "2026-10-17",
      lines: [
        { ...createQuoteLine("a", "Living room walls", "2 coats · 37.0 m² · 1.9 days"), amount: "380" },
        { ...createQuoteLine("b", "Paint", "Walls 1 × 10 L + 1 × 2.5 L — £6.00 a litre"), amount: "105" },
      ],
      vatRegistered: true,
      vatNumber: "GB123456789",
      notes: "30% deposit on acceptance, balance on completion.",
    });
    expect(document).not.toBeNull();
    const blob = await renderQuotePdf(document!);
    const header = new TextDecoder().decode(new Uint8Array(await blob.arrayBuffer()).slice(0, 5));
    expect(header).toBe("%PDF-");
    expect(blob.size).toBeGreaterThan(1000);
  });
});
