import { labourLineDetail, labourLineTitle, paintLineDetail } from "./format";
import type { CalculationResult, CalculatorSettings, RoomInput } from "./types";

// Calculator → quote template hand-over. Spec: docs/specs/paint-calculator.md §10.
// Room sizes and prices only, never client details. Lives in this browser's localStorage, is
// read once, and is ignored after 24 hours.

export const HANDOVER_STORAGE_KEY = "pricebrush.calculatorHandover";
export const HANDOVER_MAX_AGE_MILLISECONDS = 24 * 60 * 60 * 1000;

export interface HandoverLine {
  kind: "labour" | "paint";
  title: string;
  detail: string;
  amountPence: number;
}

export interface CalculatorHandover {
  version: 1;
  createdAt: string;
  settings: CalculatorSettings;
  rooms: RoomInput[];
  lines: HandoverLine[];
  totals: { labourPence: number; paintPence: number; totalPence: number; timeOnJobDays: number };
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Lines in quote order: room by room (walls, ceiling, mist coat), then one "Paint" line. */
export function buildHandover(
  rooms: RoomInput[],
  settings: CalculatorSettings,
  result: CalculationResult,
  now: Date,
): CalculatorHandover {
  const labourLines: HandoverLine[] = result.labourLines.map((line) => ({
    kind: "labour",
    title: labourLineTitle(line),
    detail: labourLineDetail(line),
    amountPence: line.amountPence,
  }));
  const paintLine: HandoverLine = {
    kind: "paint",
    title: "Paint",
    detail: paintLineDetail(result.paintGroups, settings.paintPencePerLitre),
    amountPence: result.paintPence,
  };
  return {
    version: 1,
    createdAt: now.toISOString(),
    settings,
    // Only rooms that made it onto the quote (a room with an error or no area is left out).
    rooms: rooms.filter((room) => result.labourLines.some((line) => line.roomId === room.id)),
    lines: result.paintGroups.length > 0 ? [...labourLines, paintLine] : labourLines,
    totals: {
      labourPence: result.labourPence,
      paintPence: result.paintPence,
      totalPence: result.totalPence,
      timeOnJobDays: result.timeOnJobDays,
    },
  };
}

/** Returns false if the browser won't store it (private mode); the caller then still navigates. */
export function writeHandover(storage: StorageLike, handover: CalculatorHandover): boolean {
  try {
    storage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify(handover));
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads the hand-over once: the key is always removed, so a reload never adds the lines twice.
 * Anything unreadable, from another version or older than 24 hours is ignored silently.
 */
export function takeHandover(storage: StorageLike, now: Date): CalculatorHandover | null {
  let text: string | null;
  try {
    text = storage.getItem(HANDOVER_STORAGE_KEY);
    storage.removeItem(HANDOVER_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!text) return null;
  try {
    const parsed = JSON.parse(text) as Partial<CalculatorHandover>;
    if (!looksLikeHandover(parsed)) return null;
    const ageMilliseconds = now.getTime() - Date.parse(parsed.createdAt);
    if (!(ageMilliseconds >= 0 && ageMilliseconds <= HANDOVER_MAX_AGE_MILLISECONDS)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function looksLikeHandover(value: Partial<CalculatorHandover>): value is CalculatorHandover {
  return (
    value.version === 1 &&
    typeof value.createdAt === "string" &&
    Array.isArray(value.rooms) &&
    Array.isArray(value.lines) &&
    value.lines.length > 0 &&
    value.lines.every(
      (line) =>
        (line?.kind === "labour" || line?.kind === "paint") &&
        typeof line.title === "string" &&
        typeof line.detail === "string" &&
        Number.isInteger(line.amountPence),
    ) &&
    typeof value.totals?.totalPence === "number"
  );
}
