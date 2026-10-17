// Dates are kept as ISO "YYYY-MM-DD" strings (what <input type="date"> uses) and shown as
// DD/MM/YYYY. All maths happens in UTC so a quote never shifts a day with the clock change.

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isIsoDate(text: string): boolean {
  const match = ISO_DATE_PATTERN.exec(text);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** The user's local calendar day as "YYYY-MM-DD". */
export function todayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysToIsoDate(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

/** "2026-10-17" → "17/10/2026" */
export function formatUkDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
