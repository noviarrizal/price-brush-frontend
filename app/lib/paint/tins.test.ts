import { describe, expect, it } from "vitest";

import { chooseTins, litresInTins } from "./tins";

// Table from docs/specs/paint-calculator.md §8.2.
describe("chooseTins — spec §8.2", () => {
  it.each([
    [0, []],
    [2.5, [{ sizeLitres: 2.5, count: 1 }]],
    [4.23, [{ sizeLitres: 5, count: 1 }]],
    [5, [{ sizeLitres: 5, count: 1 }]],
    [5.01, [{ sizeLitres: 5, count: 1 }, { sizeLitres: 2.5, count: 1 }]],
    [7.6, [{ sizeLitres: 10, count: 1 }]],
    [8.6, [{ sizeLitres: 10, count: 1 }]],
    [12.4, [{ sizeLitres: 10, count: 1 }, { sizeLitres: 2.5, count: 1 }]],
    [17.6, [{ sizeLitres: 10, count: 2 }]],
    [23, [{ sizeLitres: 10, count: 2 }, { sizeLitres: 5, count: 1 }]],
  ])("%s L → %j", (litresNeeded, expectedTins) => {
    expect(chooseTins(litresNeeded)).toEqual(expectedTins);
  });

  it("never buys less than needed and never wastes more than one tin's worth beyond the least spare", () => {
    for (let tenthsOfLitre = 1; tenthsOfLitre <= 600; tenthsOfLitre++) {
      const litresNeeded = tenthsOfLitre / 10;
      const bought = litresInTins(chooseTins(litresNeeded));
      const leastPossibleSpare = Math.ceil(litresNeeded / 2.5 - 1e-9) * 2.5 - litresNeeded;
      expect(bought).toBeGreaterThanOrEqual(litresNeeded);
      expect(bought - litresNeeded).toBeLessThanOrEqual(leastPossibleSpare + 1 + 1e-9);
    }
  });

  it("handles a large job quickly", () => {
    const startedAt = performance.now();
    expect(chooseTins(1000)).toEqual([{ sizeLitres: 10, count: 100 }]);
    expect(performance.now() - startedAt).toBeLessThan(50);
  });
});
