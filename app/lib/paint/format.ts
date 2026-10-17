import { formatPence } from "~/lib/numbers";

import type { CalculationResult, LabourLine, PaintGroup, Surface, TinPick } from "./types";

// Display text for the calculator and the quote line details. Spec: docs/specs/paint-calculator.md §7.

const oneDecimalFormatter = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const upToOneDecimalFormatter = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });

/** 1 → "1 day", 0.5 → "0.5 days", 2 → "2 days" */
export function formatDays(days: number): string {
  return `${upToOneDecimalFormatter.format(days)} ${days === 1 ? "day" : "days"}`;
}

/** Always one decimal: 14 → "14.0 m²" */
export function formatSquareMetres(squareMetres: number): string {
  return `${oneDecimalFormatter.format(squareMetres)} m²`;
}

/** Always one decimal: 8.6 → "8.6 litres" */
export function formatLitres(litres: number): string {
  return `${oneDecimalFormatter.format(litres)} litres`;
}

/** [{10,1},{2.5,1}] → "1 × 10 L + 1 × 2.5 L" */
export function formatTins(tins: TinPick[]): string {
  return tins.map((tin) => `${tin.count} × ${tin.sizeLitres} L`).join(" + ");
}

const SURFACE_LABELS: Record<Surface, { title: string; paint: string }> = {
  walls: { title: "walls", paint: "Walls" },
  ceiling: { title: "ceiling", paint: "Ceiling" },
  mistCoat: { title: "mist coat", paint: "Mist coat" },
};

/** "Living room walls" */
export function labourLineTitle(line: LabourLine): string {
  return `${line.roomName} ${SURFACE_LABELS[line.surface].title}`;
}

/** "2 coats · 37.0 m² · 1.9 days" or "New plaster · 1 coat · 54.5 m² · 1.4 days" */
export function labourLineDetail(line: LabourLine): string {
  const coatsText = `${line.coats} ${line.coats === 1 ? "coat" : "coats"}`;
  const parts = [coatsText, formatSquareMetres(line.areaSquareMetres), formatDays(line.labourDays)];
  return (line.surface === "mistCoat" ? ["New plaster", ...parts] : parts).join(" · ");
}

/** "Walls 1 × 10 L + 1 × 2.5 L · Ceiling 1 × 5 L" */
export function paintShoppingList(paintGroups: PaintGroup[]): string {
  return paintGroups.map((group) => `${SURFACE_LABELS[group.surface].paint} ${formatTins(group.tins)}`).join(" · ");
}

/** "Walls 1 × 10 L + 1 × 2.5 L · Ceiling 1 × 5 L · £6.00 a litre" */
export function paintLineDetail(paintGroups: PaintGroup[], paintPencePerLitre: number): string {
  return `${paintShoppingList(paintGroups)} · ${formatPence(paintPencePerLitre)} a litre`;
}

/** What "Copy result" puts on the clipboard, ready to paste into WhatsApp. */
export function resultSummaryText(result: CalculationResult, pageUrl: string): string {
  return [
    `${formatLitres(result.totalLitresShown)}. Buy: ${paintShoppingList(result.paintGroups)}.`,
    `About ${formatDays(result.timeOnJobDays)} on the job.`,
    `Price: ${formatPence(result.totalPence)} (labour ${formatPence(result.labourPence)} + paint ${formatPence(result.paintPence)}).`,
    `Worked out with ${pageUrl}`,
  ].join("\n");
}
