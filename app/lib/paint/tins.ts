import type { TinPick, TinSize } from "./types";

// Trade emulsion sizes (spec D3). Largest first, which is also the display order.
export const TIN_SIZES: readonly TinSize[] = [10, 5, 2.5];

/** Extra spare we accept to buy fewer tins (spec §5). */
const SPARE_TOLERANCE_LITRES = 1;
const FLOAT_TOLERANCE = 1e-9;

interface TinCombination {
  counts: number[];
  volumeLitres: number;
  tinCount: number;
  spareLitres: number;
}

/**
 * Picks the tins to buy for `litresNeeded` (spec §5): among the combinations within 1 L of the
 * least spare paint, take the fewest tins; on a tie, the one with less spare.
 */
export function chooseTins(litresNeeded: number): TinPick[] {
  if (!(litresNeeded > 0)) return [];

  // Two 5 L tins hold the same as one 10 L tin (and two 2.5 L as one 5 L), so a smaller size never
  // needs more than (larger ÷ smaller − 1) tins: anything more is the same volume in more tins.
  // This keeps the search linear in litres instead of cubic.
  const maxCountPerSize = TIN_SIZES.map((sizeLitres, index) =>
    index === 0 ? Math.ceil(litresNeeded / sizeLitres) + 1 : TIN_SIZES[index - 1] / sizeLitres - 1,
  );
  const combinations: TinCombination[] = [];

  const collect = (sizeIndex: number, counts: number[]) => {
    if (sizeIndex === TIN_SIZES.length) {
      const volumeLitres = counts.reduce((sum, count, index) => sum + count * TIN_SIZES[index], 0);
      if (volumeLitres + FLOAT_TOLERANCE < litresNeeded) return;
      combinations.push({
        counts,
        volumeLitres,
        tinCount: counts.reduce((sum, count) => sum + count, 0),
        spareLitres: volumeLitres - litresNeeded,
      });
      return;
    }
    for (let count = 0; count <= maxCountPerSize[sizeIndex]; count++) {
      collect(sizeIndex + 1, [...counts, count]);
    }
  };
  collect(0, []);

  const leastSpare = Math.min(...combinations.map((combination) => combination.spareLitres));
  const [best] = combinations
    .filter((combination) => combination.spareLitres <= leastSpare + SPARE_TOLERANCE_LITRES + FLOAT_TOLERANCE)
    .sort((first, second) => first.tinCount - second.tinCount || first.spareLitres - second.spareLitres);

  return TIN_SIZES.flatMap((sizeLitres, index) =>
    best.counts[index] > 0 ? [{ sizeLitres, count: best.counts[index] }] : [],
  );
}

export function litresInTins(tins: TinPick[]): number {
  return tins.reduce((sum, tin) => sum + tin.sizeLitres * tin.count, 0);
}
