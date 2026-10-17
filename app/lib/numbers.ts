// Shared number and money helpers. Money is whole pence everywhere; people type pounds.
// Decorators on Android keyboards often type a comma as the decimal point (paint spec §3).

/** "3,5" → 3.5 · " 2.4 " → 2.4 · "" → NaN · "abc" → NaN */
export function parseDecimal(text: string): number {
  const normalised = text.trim().replace(",", ".");
  if (normalised === "" || !/^\d*\.?\d+$|^\d+\.$/.test(normalised)) return Number.NaN;
  return Number.parseFloat(normalised);
}

/** "200" → 20000 · "6.50" → 650 · invalid → NaN */
export function parsePoundsToPence(text: string): number {
  const pounds = parseDecimal(text.replace("£", ""));
  return Number.isNaN(pounds) ? Number.NaN : Math.round(pounds * 100);
}

const poundsFormatter = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

/** 53500 → "£535.00" */
export function formatPence(amountPence: number): string {
  return poundsFormatter.format(amountPence / 100);
}
