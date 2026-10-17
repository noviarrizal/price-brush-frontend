import { describe, expect, it } from "vitest";

import { calculateJob } from "./calculate";
import { DEFAULT_SETTINGS } from "./defaults";
import { labourLineDetail, labourLineTitle, paintLineDetail } from "./format";
import { parseDecimal } from "~/lib/numbers";
import type { CalculationResult, CalculatorSettings, RoomInput } from "./types";

// Cases T1–T13 from docs/specs/paint-calculator.md §8.1. Expected values come from the spec's
// reference calculation; if one of these changes, the spec changes first.

function buildRoom(overrides: Partial<RoomInput>): RoomInput {
  return {
    id: overrides.name ?? "room",
    name: "",
    lengthMetres: Number.NaN,
    widthMetres: Number.NaN,
    heightMetres: 2.4,
    doorCount: 1,
    windowCount: 1,
    coats: 2,
    includeCeiling: false,
    newPlaster: false,
    ...overrides,
  };
}

function settingsWith(overrides: Partial<CalculatorSettings>): CalculatorSettings {
  return { ...DEFAULT_SETTINGS, ...overrides };
}

const bedroom = buildRoom({ name: "Bedroom", lengthMetres: 4, widthMetres: 3.5, includeCeiling: true });
const bedroomWallsOnly = { ...bedroom, includeCeiling: false };
const livingRoom = buildRoom({ name: "Living room", lengthMetres: 4.6, widthMetres: 3.8, includeCeiling: true });
const hallway = buildRoom({ name: "Hallway", lengthMetres: 4, widthMetres: 1.4, doorCount: 3, windowCount: 0 });

function summarise(result: CalculationResult) {
  return {
    lines: result.labourLines.map((line) => [labourLineTitle(line), line.areaSquareMetres, line.labourDays, line.amountPence]),
    paint: result.paintGroups.map((group) => [group.surface, group.litresShown, group.tins, group.amountPence]),
    totalLitresShown: result.totalLitresShown,
    labourDays: result.labourDays,
    timeOnJobDays: result.timeOnJobDays,
    labourPence: result.labourPence,
    paintPence: result.paintPence,
    totalPence: result.totalPence,
  };
}

function expectInvariants(result: CalculationResult) {
  expect(result.totalPence).toBe(result.labourPence + result.paintPence);
  expect(result.labourPence).toBe(result.labourLines.reduce((sum, line) => sum + line.amountPence, 0));
  for (const group of result.paintGroups) {
    expect(group.litresBought).toBeGreaterThanOrEqual(group.litresNeeded);
    expect(group.litresShown).toBeGreaterThanOrEqual(group.litresNeeded);
  }
  expect(result.timeOnJobDays * 2).toBe(Math.round(result.timeOnJobDays * 2));
  expect(result.timeOnJobDays).toBeGreaterThanOrEqual(result.labourDays);
}

describe("calculateJob — spec §8.1", () => {
  it("T1 bedroom with ceiling, defaults (the brief's worked example)", () => {
    const result = calculateJob([bedroom], DEFAULT_SETTINGS);
    expectInvariants(result);
    expect(summarise(result)).toEqual({
      lines: [
        ["Bedroom walls", 32.7, 1.6, 320_00],
        ["Bedroom ceiling", 14, 0.7, 140_00],
      ],
      paint: [
        ["walls", 6, [{ sizeLitres: 5, count: 1 }, { sizeLitres: 2.5, count: 1 }], 45_00],
        ["ceiling", 2.6, [{ sizeLitres: 5, count: 1 }], 30_00],
      ],
      totalLitresShown: 8.6,
      labourDays: 2.3,
      timeOnJobDays: 2.5,
      labourPence: 460_00,
      paintPence: 75_00,
      totalPence: 535_00,
    });
  });

  it("T2 walls only at Dulux Matt 13 m²/L with no spare: 5.03 L shows as 5.1 L", () => {
    const result = calculateJob([bedroomWallsOnly], settingsWith({ coverageSquareMetresPerLitre: 13, sparePercent: 0 }));
    expectInvariants(result);
    const [wallPaint] = result.paintGroups;
    expect(wallPaint.litresNeeded).toBeCloseTo(65.4 / 13, 10);
    expect(wallPaint.litresShown).toBe(5.1);
    expect(wallPaint.tins).toEqual([{ sizeLitres: 5, count: 1 }, { sizeLitres: 2.5, count: 1 }]);
    expect(result.totalPence).toBe(365_00);
  });

  it("T3 walls only at Dulux Trade Vinyl Matt 17 m²/L", () => {
    const result = calculateJob([bedroomWallsOnly], settingsWith({ coverageSquareMetresPerLitre: 17 }));
    expectInvariants(result);
    expect(result.paintGroups[0].litresShown).toBe(4.3);
    expect(result.paintGroups[0].tins).toEqual([{ sizeLitres: 5, count: 1 }]);
    expect(result.totalPence).toBe(350_00);
  });

  it("T4 walls and ceiling at Dulux Trade Supermatt 18 m²/L", () => {
    const result = calculateJob([bedroom], settingsWith({ coverageSquareMetresPerLitre: 18 }));
    expectInvariants(result);
    expect(summarise(result).paint).toEqual([
      ["walls", 4, [{ sizeLitres: 5, count: 1 }], 30_00],
      ["ceiling", 1.8, [{ sizeLitres: 2.5, count: 1 }], 15_00],
    ]);
    expect(result.totalLitresShown).toBe(5.8);
    expect(result.totalPence).toBe(505_00);
  });

  it("T5 living room and hallway (the landing example)", () => {
    const result = calculateJob([livingRoom, hallway], DEFAULT_SETTINGS);
    expectInvariants(result);
    expect(summarise(result)).toEqual({
      lines: [
        ["Living room walls", 37, 1.9, 380_00],
        ["Living room ceiling", 17.5, 0.9, 180_00],
        ["Hallway walls", 20.5, 1, 200_00],
      ],
      paint: [
        ["walls", 10.6, [{ sizeLitres: 10, count: 1 }, { sizeLitres: 2.5, count: 1 }], 75_00],
        ["ceiling", 3.3, [{ sizeLitres: 5, count: 1 }], 30_00],
      ],
      totalLitresShown: 13.9,
      labourDays: 3.8,
      timeOnJobDays: 4,
      labourPence: 760_00,
      paintPence: 105_00,
      totalPence: 865_00,
    });
  });

  it("T6 new plaster in both rooms adds mist-coat lines and ½ day drying once", () => {
    const result = calculateJob(
      [{ ...livingRoom, newPlaster: true }, { ...hallway, newPlaster: true }],
      DEFAULT_SETTINGS,
    );
    expectInvariants(result);
    const summary = summarise(result);
    expect(summary.lines).toEqual([
      ["Living room walls", 37, 1.9, 380_00],
      ["Living room ceiling", 17.5, 0.9, 180_00],
      ["Living room mist coat", 54.5, 1.4, 280_00],
      ["Hallway walls", 20.5, 1, 200_00],
      ["Hallway mist coat", 20.5, 0.5, 100_00],
    ]);
    expect(summary.paint[2]).toEqual(["mistCoat", 6.9, [{ sizeLitres: 5, count: 1 }, { sizeLitres: 2.5, count: 1 }], 45_00]);
    expect(summary.totalLitresShown).toBe(20.8);
    expect(summary.labourDays).toBe(5.7);
    expect(summary.timeOnJobDays).toBe(6.5);
    expect(summary.labourPence).toBe(1140_00);
    expect(summary.paintPence).toBe(150_00);
    expect(summary.totalPence).toBe(1290_00);
  });

  it("T7 doors and windows bigger than the walls: walls floor at 0 and get no line", () => {
    const cupboard = buildRoom({ name: "Cupboard", lengthMetres: 1, widthMetres: 1, heightMetres: 2, doorCount: 5, includeCeiling: true });
    const result = calculateJob([cupboard], DEFAULT_SETTINGS);
    expectInvariants(result);
    expect(summarise(result).lines).toEqual([["Cupboard ceiling", 1, 0.1, 20_00]]);
    expect(result.paintGroups.map((group) => group.surface)).toEqual(["ceiling"]);
    expect(result.totalPence).toBe(35_00);
  });

  it("T8 a tiny area still takes at least 0.1 day", () => {
    const nook = buildRoom({ name: "Nook", lengthMetres: 0.5, widthMetres: 0.5, heightMetres: 1, doorCount: 0, windowCount: 0, coats: 1 });
    const result = calculateJob([nook], DEFAULT_SETTINGS);
    expect(summarise(result).lines).toEqual([["Nook walls", 2, 0.1, 20_00]]);
    expect(result.totalPence).toBe(35_00);
  });

  it("T9 an odd day rate gives whole pence", () => {
    const result = calculateJob([bedroomWallsOnly], settingsWith({ dayRatePence: 185_00 }));
    expect(result.labourPence).toBe(296_00);
    expect(result.totalPence).toBe(341_00);
  });

  it("T10 an invalid room is left out and the others still count", () => {
    const brokenRoom = buildRoom({ id: "broken", lengthMetres: 0, widthMetres: 3, heightMetres: 2.4 });
    const result = calculateJob([bedroom, brokenRoom], DEFAULT_SETTINGS);
    expect(result.issues).toEqual([
      { roomId: "broken", field: "length", kind: "error", message: "Length must be more than 0, like 3.5." },
    ]);
    expect(result.totalPence).toBe(535_00);
  });

  it("T10b every failing field is flagged, with the first one's message", () => {
    const result = calculateJob([buildRoom({ id: "r", lengthMetres: 4, heightMetres: 0 })], DEFAULT_SETTINGS);
    expect(result.issues.map((issue) => issue.field)).toEqual(["width", "height"]);
    expect(new Set(result.issues.map((issue) => issue.message))).toEqual(new Set(["Width must be more than 0, like 3.5."]));
    expect(result.status).toBe("empty");
  });

  it("T11 a comma works as the decimal point", () => {
    expect(parseDecimal("3,5")).toBe(3.5);
  });

  it("T12 a room with no length or width yet is empty, with no errors (height has a default)", () => {
    for (const heightMetres of [2.4, Number.NaN]) {
      const result = calculateJob([buildRoom({ heightMetres })], DEFAULT_SETTINGS);
      expect(result.status).toBe("empty");
      expect(result.issues).toEqual([]);
    }
  });

  it("T13 a size over 30 m is counted with a warning", () => {
    const hall = buildRoom({ id: "hall", lengthMetres: 31, widthMetres: 4 });
    const result = calculateJob([hall], DEFAULT_SETTINGS);
    expect(result.status).toBe("ok");
    expect(result.issues).toEqual([
      { roomId: "hall", kind: "warning", message: "That's a big room — double-check the numbers" },
    ]);
  });
});

describe("working text — spec §7", () => {
  it("formats labour lines and the paint line", () => {
    const result = calculateJob([{ ...livingRoom, newPlaster: true }, hallway], DEFAULT_SETTINGS);
    expect(result.labourLines.map((line) => `${labourLineTitle(line)} — ${labourLineDetail(line)}`)).toEqual([
      "Living room walls — 2 coats · 37.0 m² · 1.9 days",
      "Living room ceiling — 2 coats · 17.5 m² · 0.9 days",
      "Living room mist coat — New plaster · 1 coat · 54.5 m² · 1.4 days",
      "Hallway walls — 2 coats · 20.5 m² · 1 day",
    ]);
    expect(paintLineDetail(result.paintGroups, DEFAULT_SETTINGS.paintPencePerLitre)).toBe(
      "Walls 1 × 10 L + 1 × 2.5 L · Ceiling 1 × 5 L · Mist coat 1 × 5 L · £6.00 a litre",
    );
  });

  it("names unnamed rooms by position", () => {
    const result = calculateJob([buildRoom({ lengthMetres: 3, widthMetres: 3 })], DEFAULT_SETTINGS);
    expect(labourLineTitle(result.labourLines[0])).toBe("Room 1 walls");
  });
});
