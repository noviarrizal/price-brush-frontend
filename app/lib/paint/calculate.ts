import { BIG_ROOM_METRES } from "./defaults";
import { roundToTenth, roundUpToHalf, roundUpToTenth } from "./rounding";
import { chooseTins, litresInTins } from "./tins";
import type {
  CalculationResult,
  CalculatorSettings,
  LabourLine,
  PaintGroup,
  RoomField,
  RoomInput,
  RoomIssue,
  Surface,
} from "./types";

// The paint & labour engine. Spec: docs/specs/paint-calculator.md §4 (steps 1–13).
// Pure: the result depends only on the inputs.

const SURFACE_ORDER: readonly Surface[] = ["walls", "ceiling", "mistCoat"];
const MINIMUM_LINE_DAYS = 0.1;

export function roomDisplayName(room: RoomInput, roomIndex: number): string {
  const trimmedName = room.name.trim();
  return trimmedName === "" ? `Room ${roomIndex + 1}` : trimmedName;
}

/** Step 1: walls minus doors and windows, never below 0, rounded to 0.1 m². */
export function wallAreaSquareMetres(room: RoomInput, settings: CalculatorSettings): number {
  const grossWallArea = 2 * (room.lengthMetres + room.widthMetres) * room.heightMetres;
  const openingsArea =
    room.doorCount * settings.doorAreaSquareMetres + room.windowCount * settings.windowAreaSquareMetres;
  return roundToTenth(Math.max(0, grossWallArea - openingsArea));
}

/** Step 2: ceiling area, rounded to 0.1 m², or 0 when the ceiling isn't included. */
export function ceilingAreaSquareMetres(room: RoomInput): number {
  return room.includeCeiling ? roundToTenth(room.lengthMetres * room.widthMetres) : 0;
}

const SIZE_FIELDS: ReadonlyArray<{ field: RoomField; label: string; example: string; key: keyof RoomInput }> = [
  { field: "length", label: "Length", example: "3.5", key: "lengthMetres" },
  { field: "width", label: "Width", example: "3.5", key: "widthMetres" },
  { field: "height", label: "Height", example: "2.4", key: "heightMetres" },
];

/** Spec §3: errors leave the room out of the result; warnings don't. */
export function checkRoom(room: RoomInput): { isStarted: boolean; issues: RoomIssue[] } {
  const sizes = SIZE_FIELDS.map((sizeField) => ({ ...sizeField, value: room[sizeField.key] as number }));
  // Height starts filled in (2.4 m), so only length or width shows the user has started this room.
  const isStarted = !Number.isNaN(room.lengthMetres) || !Number.isNaN(room.widthMetres);
  if (!isStarted) return { isStarted, issues: [] };

  const invalidSizes = sizes.filter((size) => !(size.value > 0));
  if (invalidSizes.length > 0) {
    const [firstInvalid] = invalidSizes;
    return {
      isStarted,
      issues: invalidSizes.map((size) => ({
        roomId: room.id,
        field: size.field,
        kind: "error" as const,
        message: `${firstInvalid.label} must be more than 0, like ${firstInvalid.example}.`,
      })),
    };
  }

  const hasBigSize = sizes.some((size) => size.value > BIG_ROOM_METRES);
  return {
    isStarted,
    issues: hasBigSize
      ? [{ roomId: room.id, kind: "warning", message: "That's a big room — double-check the numbers" }]
      : [],
  };
}

function labourLineFor(
  room: RoomInput,
  roomName: string,
  surface: Surface,
  areaSquareMetres: number,
  coats: number,
  settings: CalculatorSettings,
): LabourLine | null {
  if (areaSquareMetres <= 0) return null;
  // Step 4: days per line, 0.1 day, at least 0.1. Step 5: whole pence.
  const labourDays = Math.max(
    MINIMUM_LINE_DAYS,
    roundToTenth((areaSquareMetres * coats) / settings.squareMetresPerDay),
  );
  return {
    roomId: room.id,
    roomName,
    surface,
    areaSquareMetres,
    coats,
    labourDays,
    amountPence: Math.round(labourDays * settings.dayRatePence),
  };
}

function paintGroupFor(surface: Surface, coatedSquareMetres: number, settings: CalculatorSettings): PaintGroup {
  // Step 7: exact litres (used to pick tins). Step 8: shown rounded up. Steps 9–10: tins and price.
  const litresNeeded =
    (coatedSquareMetres / settings.coverageSquareMetresPerLitre) * (1 + settings.sparePercent / 100);
  const tins = chooseTins(litresNeeded);
  const litresBought = litresInTins(tins);
  return {
    surface,
    litresNeeded,
    litresShown: roundUpToTenth(litresNeeded),
    tins,
    litresBought,
    amountPence: Math.round(litresBought * settings.paintPencePerLitre),
  };
}

export function calculateJob(rooms: RoomInput[], settings: CalculatorSettings): CalculationResult {
  const issues: RoomIssue[] = [];
  const labourLines: LabourLine[] = [];
  let countedRoomCount = 0;
  let hasMistCoat = false;

  rooms.forEach((room, roomIndex) => {
    const roomCheck = checkRoom(room);
    issues.push(...roomCheck.issues);
    const hasError = roomCheck.issues.some((issue) => issue.kind === "error");
    if (!roomCheck.isStarted || hasError) return;

    countedRoomCount++;
    const roomName = roomDisplayName(room, roomIndex);
    const wallArea = wallAreaSquareMetres(room, settings);
    const ceilingArea = ceilingAreaSquareMetres(room);
    // Step 3: one line per surface; the mist coat is one extra coat over walls (+ ceiling).
    const roomLines = [
      labourLineFor(room, roomName, "walls", wallArea, room.coats, settings),
      labourLineFor(room, roomName, "ceiling", ceilingArea, room.coats, settings),
      room.newPlaster
        ? labourLineFor(room, roomName, "mistCoat", roundToTenth(wallArea + ceilingArea), 1, settings)
        : null,
    ];
    if (room.newPlaster) hasMistCoat = true;
    labourLines.push(...roomLines.filter((line): line is LabourLine => line !== null));
  });

  if (countedRoomCount === 0) {
    return {
      status: "empty",
      issues,
      labourLines: [],
      paintGroups: [],
      totalLitresShown: 0,
      labourDays: 0,
      timeOnJobDays: 0,
      labourPence: 0,
      paintPence: 0,
      totalPence: 0,
    };
  }

  // Step 6: one paint group per surface, in a fixed order.
  const paintGroups = SURFACE_ORDER.flatMap((surface) => {
    const coatedSquareMetres = labourLines
      .filter((line) => line.surface === surface)
      .reduce((sum, line) => sum + line.areaSquareMetres * line.coats, 0);
    return coatedSquareMetres > 0 ? [paintGroupFor(surface, coatedSquareMetres, settings)] : [];
  });

  // Steps 11–13.
  const labourDays = roundToTenth(labourLines.reduce((sum, line) => sum + line.labourDays, 0));
  const labourPence = labourLines.reduce((sum, line) => sum + line.amountPence, 0);
  const paintPence = paintGroups.reduce((sum, group) => sum + group.amountPence, 0);
  const dryingDays = hasMistCoat ? settings.mistCoatDryingDays : 0;

  return {
    status: "ok",
    issues,
    labourLines,
    paintGroups,
    totalLitresShown: roundToTenth(paintGroups.reduce((sum, group) => sum + group.litresShown, 0)),
    labourDays,
    timeOnJobDays: roundUpToHalf(labourDays + dryingDays),
    labourPence,
    paintPence,
    totalPence: labourPence + paintPence,
  };
}
