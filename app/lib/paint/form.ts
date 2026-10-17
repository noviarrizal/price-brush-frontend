import { parseDecimal, parsePoundsToPence } from "~/lib/numbers";

import { DEFAULT_HEIGHT_METRES, DEFAULT_SETTINGS, SETTING_RANGES } from "./defaults";
import type { CalculatorSettings, Coats, RoomInput } from "./types";

// What the calculator form holds (the text people typed) and how it becomes engine input.
// Spec: docs/specs/paint-calculator.md §3.

export interface RoomFields {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  doorCount: number;
  windowCount: number;
  coats: Coats;
  includeCeiling: boolean;
  newPlaster: boolean;
}

export function createRoomFields(id: string): RoomFields {
  return {
    id,
    name: "",
    length: "",
    width: "",
    height: String(DEFAULT_HEIGHT_METRES),
    doorCount: 1,
    windowCount: 1,
    coats: 2,
    includeCeiling: false,
    newPlaster: false,
  };
}

export function toRoomInput(fields: RoomFields): RoomInput {
  return {
    id: fields.id,
    name: fields.name,
    lengthMetres: parseDecimal(fields.length),
    widthMetres: parseDecimal(fields.width),
    heightMetres: parseDecimal(fields.height),
    doorCount: fields.doorCount,
    windowCount: fields.windowCount,
    coats: fields.coats,
    includeCeiling: fields.includeCeiling,
    newPlaster: fields.newPlaster,
  };
}

export interface SettingsFields {
  dayRatePounds: string;
  squareMetresPerDay: string;
  coverageSquareMetresPerLitre: string;
  sparePercent: string;
  paintPoundsPerLitre: string;
}

export type SettingsFieldName = keyof SettingsFields;

export const DEFAULT_SETTINGS_FIELDS: SettingsFields = {
  dayRatePounds: String(DEFAULT_SETTINGS.dayRatePence / 100),
  squareMetresPerDay: String(DEFAULT_SETTINGS.squareMetresPerDay),
  coverageSquareMetresPerLitre: String(DEFAULT_SETTINGS.coverageSquareMetresPerLitre),
  sparePercent: String(DEFAULT_SETTINGS.sparePercent),
  paintPoundsPerLitre: String(DEFAULT_SETTINGS.paintPencePerLitre / 100),
};

const SETTING_MESSAGES: Record<SettingsFieldName, string> = {
  dayRatePounds: `Day rate must be between £${SETTING_RANGES.dayRatePounds.min} and £${SETTING_RANGES.dayRatePounds.max.toLocaleString("en-GB")}`,
  squareMetresPerDay: `m² a day must be between ${SETTING_RANGES.squareMetresPerDay.min} and ${SETTING_RANGES.squareMetresPerDay.max}`,
  coverageSquareMetresPerLitre: `Coverage must be between ${SETTING_RANGES.coverageSquareMetresPerLitre.min} and ${SETTING_RANGES.coverageSquareMetresPerLitre.max} m² per litre`,
  sparePercent: `Spare must be between ${SETTING_RANGES.sparePercent.min} and ${SETTING_RANGES.sparePercent.max}%`,
  paintPoundsPerLitre: `Paint price must be between £${SETTING_RANGES.paintPoundsPerLitre.min} and £${SETTING_RANGES.paintPoundsPerLitre.max} a litre`,
};

function isInRange(value: number, range: { min: number; max: number }): boolean {
  return !Number.isNaN(value) && value >= range.min && value <= range.max;
}

export interface SettingsReading {
  /** null while any field is invalid; the page then keeps showing the last valid result. */
  settings: CalculatorSettings | null;
  errors: Partial<Record<SettingsFieldName, string>>;
}

export function readSettings(fields: SettingsFields): SettingsReading {
  const dayRatePence = parsePoundsToPence(fields.dayRatePounds);
  const paintPencePerLitre = parsePoundsToPence(fields.paintPoundsPerLitre);
  const squareMetresPerDay = parseDecimal(fields.squareMetresPerDay);
  const coverageSquareMetresPerLitre = parseDecimal(fields.coverageSquareMetresPerLitre);
  const sparePercent = parseDecimal(fields.sparePercent);

  const checks: Array<[SettingsFieldName, boolean]> = [
    ["dayRatePounds", isInRange(dayRatePence / 100, SETTING_RANGES.dayRatePounds)],
    ["squareMetresPerDay", isInRange(squareMetresPerDay, SETTING_RANGES.squareMetresPerDay)],
    ["coverageSquareMetresPerLitre", isInRange(coverageSquareMetresPerLitre, SETTING_RANGES.coverageSquareMetresPerLitre)],
    ["sparePercent", isInRange(sparePercent, SETTING_RANGES.sparePercent)],
    ["paintPoundsPerLitre", isInRange(paintPencePerLitre / 100, SETTING_RANGES.paintPoundsPerLitre)],
  ];
  const errors = Object.fromEntries(
    checks.filter(([, isValid]) => !isValid).map(([fieldName]) => [fieldName, SETTING_MESSAGES[fieldName]]),
  ) as SettingsReading["errors"];

  if (Object.keys(errors).length > 0) return { settings: null, errors };
  return {
    settings: {
      ...DEFAULT_SETTINGS,
      dayRatePence,
      squareMetresPerDay,
      coverageSquareMetresPerLitre,
      sparePercent,
      paintPencePerLitre,
    },
    errors,
  };
}
