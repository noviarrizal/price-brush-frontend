import type { CalculatorSettings } from "./types";

// Defaults and accepted ranges. Spec: docs/specs/paint-calculator.md §2 (signed off 17/10/2026).
// Speed, paint price, door/window sizes and drying time are assumptions to check with decorators.

export const DEFAULTS_LAST_CHECKED = "17/10/2026";

export const DEFAULT_SETTINGS: CalculatorSettings = {
  coverageSquareMetresPerLitre: 12,
  sparePercent: 10,
  doorAreaSquareMetres: 1.8,
  windowAreaSquareMetres: 1.5,
  dayRatePence: 200_00,
  squareMetresPerDay: 40,
  paintPencePerLitre: 6_00,
  mistCoatDryingDays: 0.5,
};

export const DEFAULT_HEIGHT_METRES = 2.4;

export const MAX_OPENINGS_PER_ROOM = 20;
export const BIG_ROOM_METRES = 30;

export interface SettingRange {
  min: number;
  max: number;
}

/** Ranges for the settings the user can edit, in the units the UI shows (pounds, not pence). */
export const SETTING_RANGES = {
  coverageSquareMetresPerLitre: { min: 1, max: 40 },
  sparePercent: { min: 0, max: 50 },
  dayRatePounds: { min: 0, max: 2000 },
  squareMetresPerDay: { min: 1, max: 200 },
  paintPoundsPerLitre: { min: 0, max: 100 },
} satisfies Record<string, SettingRange>;
