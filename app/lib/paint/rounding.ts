// Rounding helpers. Every shown number is rounded before the next step uses it (spec §4),
// so the working on screen can be redone by hand and gives the same answer.

/** Round half up to 1 decimal place (0.05 → 0.1). */
export function roundToTenth(value: number): number {
  return Math.round(value * 10 + Number.EPSILON) / 10;
}

/** Round up to 1 decimal place, ignoring floating-point dust (5.0000000001 → 5.0). */
export function roundUpToTenth(value: number): number {
  return Math.ceil(value * 10 - 1e-9) / 10;
}

/** Round up to the nearest half (2.3 → 2.5, 2.5 → 2.5). */
export function roundUpToHalf(value: number): number {
  return Math.ceil(value * 2 - 1e-9) / 2;
}
