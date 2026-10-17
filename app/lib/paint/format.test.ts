import { describe, expect, it } from "vitest";

import { calculateJob } from "./calculate";
import { DEFAULT_SETTINGS } from "./defaults";
import { formatDays, formatLitres, formatSquareMetres, resultSummaryText } from "./format";
import { formatPence } from "~/lib/numbers";
import { parseDecimal, parsePoundsToPence } from "~/lib/numbers";

describe("parseDecimal", () => {
  it.each([
    ["3.5", 3.5],
    ["3,5", 3.5],
    [" 2.4 ", 2.4],
    [".5", 0.5],
    ["4.", 4],
    ["0", 0],
  ])("%j → %s", (text, expected) => {
    expect(parseDecimal(text)).toBe(expected);
  });

  it.each(["", "  ", "abc", "3.5m", "-2", "1.2.3"])("%j → NaN", (text) => {
    expect(parseDecimal(text)).toBeNaN();
  });
});

describe("parsePoundsToPence", () => {
  it("reads pounds with or without the £ sign", () => {
    expect(parsePoundsToPence("200")).toBe(20000);
    expect(parsePoundsToPence("£6.50")).toBe(650);
    expect(parsePoundsToPence("x")).toBeNaN();
  });
});

describe("format", () => {
  it("formats money, days, areas and litres in UK style", () => {
    expect(formatPence(129000)).toBe("£1,290.00");
    expect(formatDays(1)).toBe("1 day");
    expect(formatDays(0.5)).toBe("0.5 days");
    expect(formatDays(4)).toBe("4 days");
    expect(formatSquareMetres(14)).toBe("14.0 m²");
    expect(formatLitres(8.6)).toBe("8.6 litres");
  });
});

describe("resultSummaryText", () => {
  it("summarises the T1 bedroom for pasting into WhatsApp", () => {
    const result = calculateJob(
      [{ id: "b", name: "Bedroom", lengthMetres: 4, widthMetres: 3.5, heightMetres: 2.4, doorCount: 1, windowCount: 1, coats: 2, includeCeiling: true, newPlaster: false }],
      DEFAULT_SETTINGS,
    );
    expect(resultSummaryText(result, "pricebrush.pages.dev/paint-calculator")).toBe(
      [
        "8.6 litres. Buy: Walls 1 × 5 L + 1 × 2.5 L · Ceiling 1 × 5 L.",
        "About 2.5 days on the job.",
        "Price: £535.00 (labour £460.00 + paint £75.00).",
        "Worked out with pricebrush.pages.dev/paint-calculator",
      ].join("\n"),
    );
  });
});
