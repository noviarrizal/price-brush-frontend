import { describe, expect, it } from "vitest";

import { DEFAULT_SETTINGS } from "./defaults";
import { DEFAULT_SETTINGS_FIELDS, createRoomFields, readSettings, toRoomInput } from "./form";

describe("readSettings — spec §3", () => {
  it("reads the default fields back to the default settings", () => {
    expect(readSettings(DEFAULT_SETTINGS_FIELDS)).toEqual({ settings: DEFAULT_SETTINGS, errors: {} });
  });

  it("converts pounds to pence and accepts a decimal comma", () => {
    const { settings } = readSettings({ ...DEFAULT_SETTINGS_FIELDS, dayRatePounds: "185", paintPoundsPerLitre: "6,50" });
    expect(settings?.dayRatePence).toBe(185_00);
    expect(settings?.paintPencePerLitre).toBe(6_50);
  });

  it("rejects values outside the ranges with a message per field", () => {
    const reading = readSettings({ ...DEFAULT_SETTINGS_FIELDS, coverageSquareMetresPerLitre: "0", sparePercent: "", dayRatePounds: "2500" });
    expect(reading.settings).toBeNull();
    expect(reading.errors).toEqual({
      coverageSquareMetresPerLitre: "Coverage must be between 1 and 40 m² per litre",
      sparePercent: "Spare must be between 0 and 50%",
      dayRatePounds: "Day rate must be between £0 and £2,000",
    });
  });

  it("allows a £0 day rate and 0% spare (edge of the ranges)", () => {
    const { settings } = readSettings({ ...DEFAULT_SETTINGS_FIELDS, dayRatePounds: "0", sparePercent: "0" });
    expect(settings?.dayRatePence).toBe(0);
    expect(settings?.sparePercent).toBe(0);
  });
});

describe("toRoomInput", () => {
  it("starts with empty sizes, 2.4 m height, 1 door, 1 window, 2 coats", () => {
    const room = toRoomInput(createRoomFields("room-1"));
    expect(room.lengthMetres).toBeNaN();
    expect(room.widthMetres).toBeNaN();
    expect(room).toMatchObject({ heightMetres: 2.4, doorCount: 1, windowCount: 1, coats: 2, includeCeiling: false });
  });
});
