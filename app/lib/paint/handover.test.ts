import { describe, expect, it } from "vitest";

import { buildQuoteDocument, createEmptyDraft, handoverBannerText, linesFromHandover } from "~/lib/quote/quote";

import { calculateJob } from "./calculate";
import { DEFAULT_SETTINGS } from "./defaults";
import { HANDOVER_STORAGE_KEY, buildHandover, takeHandover, writeHandover } from "./handover";
import type { RoomInput } from "./types";

// Spec docs/specs/paint-calculator.md §10 test cases.

const livingRoom: RoomInput = { id: "living", name: "Living room", lengthMetres: 4.6, widthMetres: 3.8, heightMetres: 2.4, doorCount: 1, windowCount: 1, coats: 2, includeCeiling: true, newPlaster: false };
const hallway: RoomInput = { id: "hall", name: "Hallway", lengthMetres: 4, widthMetres: 1.4, heightMetres: 2.4, doorCount: 3, windowCount: 0, coats: 2, includeCeiling: false, newPlaster: false };
const now = new Date("2026-10-17T10:00:00Z");

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    removeItem: (key: string) => void values.delete(key),
  };
}

function t5Handover() {
  const rooms = [livingRoom, hallway];
  return buildHandover(rooms, DEFAULT_SETTINGS, calculateJob(rooms, DEFAULT_SETTINGS), now);
}

describe("calculator → quote hand-over", () => {
  it("T5 gives 3 labour lines + 1 paint line whose quote total equals the calculator total", () => {
    const handover = t5Handover();
    expect(handover.lines.map((line) => [line.kind, line.title, line.amountPence])).toEqual([
      ["labour", "Living room walls", 380_00],
      ["labour", "Living room ceiling", 180_00],
      ["labour", "Hallway walls", 200_00],
      ["paint", "Paint", 105_00],
    ]);
    expect(handover.lines[0].detail).toBe("2 coats · 37.0 m² · 1.9 days");

    let lineNumber = 0;
    const lines = linesFromHandover(handover, () => `line-${++lineNumber}`);
    expect(lines[0]).toEqual({ id: "line-1", description: "Living room walls", detail: "2 coats · 37.0 m² · 1.9 days", amount: "380.00" });
    const { document } = buildQuoteDocument({ ...createEmptyDraft(), quoteDate: "2026-10-17", lines });
    expect(document?.totalPence).toBe(handover.totals.totalPence);
    expect(document?.totalPence).toBe(865_00);
  });

  it("is read once, so a reload doesn't add the lines twice", () => {
    const storage = memoryStorage();
    expect(writeHandover(storage, t5Handover())).toBe(true);
    expect(takeHandover(storage, now)?.lines).toHaveLength(4);
    expect(takeHandover(storage, now)).toBeNull();
  });

  it("ignores another version, broken data and anything older than 24 hours — and removes it", () => {
    const storage = memoryStorage();
    storage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify({ ...t5Handover(), version: 2 }));
    expect(takeHandover(storage, now)).toBeNull();
    expect(storage.getItem(HANDOVER_STORAGE_KEY)).toBeNull();

    storage.setItem(HANDOVER_STORAGE_KEY, "{broken");
    expect(takeHandover(storage, now)).toBeNull();

    writeHandover(storage, t5Handover());
    expect(takeHandover(storage, new Date(now.getTime() + 25 * 60 * 60 * 1000))).toBeNull();
  });

  it("only carries rooms that made it onto the quote, and names them in the banner", () => {
    const brokenRoom: RoomInput = { ...hallway, id: "broken", lengthMetres: 0 };
    const rooms = [livingRoom, brokenRoom];
    const handover = buildHandover(rooms, DEFAULT_SETTINGS, calculateJob(rooms, DEFAULT_SETTINGS), now);
    expect(handover.rooms.map((room) => room.id)).toEqual(["living"]);
    expect(handoverBannerText(handover.rooms.length)).toBe(
      "We brought over 1 room from the paint calculator. Check the lines, then add the client.",
    );
    expect(handoverBannerText(2)).toContain("2 rooms");
  });
});
