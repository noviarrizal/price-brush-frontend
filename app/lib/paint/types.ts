// Types for the paint & labour engine. Spec: docs/specs/paint-calculator.md §3 and §6.

export type Coats = 1 | 2 | 3;

export interface RoomInput {
  id: string;
  /** Empty name is shown as "Room 1", "Room 2"… */
  name: string;
  /** NaN means "not filled in". */
  lengthMetres: number;
  widthMetres: number;
  heightMetres: number;
  doorCount: number;
  windowCount: number;
  coats: Coats;
  includeCeiling: boolean;
  /** "New plaster? Add a mist coat" */
  newPlaster: boolean;
}

export interface CalculatorSettings {
  coverageSquareMetresPerLitre: number;
  sparePercent: number;
  doorAreaSquareMetres: number;
  windowAreaSquareMetres: number;
  dayRatePence: number;
  squareMetresPerDay: number;
  paintPencePerLitre: number;
  mistCoatDryingDays: number;
}

export type Surface = "walls" | "ceiling" | "mistCoat";

export interface LabourLine {
  roomId: string;
  roomName: string;
  surface: Surface;
  /** Rounded to 0.1 m². */
  areaSquareMetres: number;
  coats: number;
  /** Rounded to 0.1 day, minimum 0.1. */
  labourDays: number;
  amountPence: number;
}

export type TinSize = 10 | 5 | 2.5;

export interface TinPick {
  sizeLitres: TinSize;
  count: number;
}

export interface PaintGroup {
  surface: Surface;
  litresNeeded: number;
  /** Litres needed rounded up to 0.1 L. */
  litresShown: number;
  tins: TinPick[];
  litresBought: number;
  amountPence: number;
}

export type RoomField = "length" | "width" | "height";

export interface RoomIssue {
  roomId: string;
  field?: RoomField;
  kind: "error" | "warning";
  message: string;
}

export interface CalculationResult {
  status: "empty" | "ok";
  issues: RoomIssue[];
  labourLines: LabourLine[];
  paintGroups: PaintGroup[];
  totalLitresShown: number;
  labourDays: number;
  /** Half-day steps. Shown for information, not charged. */
  timeOnJobDays: number;
  labourPence: number;
  paintPence: number;
  totalPence: number;
}
