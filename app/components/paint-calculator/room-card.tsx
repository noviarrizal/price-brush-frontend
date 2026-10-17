import { ChoiceGroup, MeasureField, Stepper, TextField } from "~/components/form-fields";
import { MAX_OPENINGS_PER_ROOM } from "~/lib/paint/defaults";
import type { RoomFields } from "~/lib/paint/form";
import type { Coats, RoomField, RoomIssue } from "~/lib/paint/types";

// One room's inputs (screens.md P2). Ceiling and mist-coat switches arrive in cut-order steps 5–6.

const COAT_OPTIONS: readonly Coats[] = [1, 2, 3];

interface RoomCardProps {
  room: RoomFields;
  roomNumber: number;
  issues: RoomIssue[];
  onChange: (room: RoomFields) => void;
}

export function RoomCard({ room, roomNumber, issues, onChange }: RoomCardProps) {
  const idPrefix = `room-${room.id}`;
  const errorFields = new Set(issues.filter((issue) => issue.kind === "error").map((issue) => issue.field));
  const firstIssue = issues[0];
  const issueId = `${idPrefix}-issue`;
  const update = <Key extends keyof RoomFields>(key: Key, value: RoomFields[Key]) => onChange({ ...room, [key]: value });

  const sizeField = (field: RoomField, label: string, key: "length" | "width" | "height") => (
    <MeasureField
      id={`${idPrefix}-${field}`}
      label={label}
      value={room[key]}
      onChange={(value) => update(key, value)}
      unit="m"
      hasError={errorFields.has(field)}
      describedBy={errorFields.has(field) ? issueId : undefined}
    />
  );

  return (
    <fieldset className="rounded-lg border border-line bg-surface p-4">
      <legend className="sr-only">Room {roomNumber}</legend>
      <TextField
        id={`${idPrefix}-name`}
        label={`Room ${roomNumber} name`}
        labelHidden
        value={room.name}
        placeholder={`Room ${roomNumber}`}
        onChange={(value) => update("name", value)}
      />

      <div className="mt-3 grid grid-cols-3 gap-2">
        {sizeField("length", "Length", "length")}
        {sizeField("width", "Width", "width")}
        {sizeField("height", "Height", "height")}
      </div>

      {firstIssue && (
        <p
          id={issueId}
          role={firstIssue.kind === "error" ? "alert" : "status"}
          className={`mt-2 flex items-start gap-1.5 font-semibold ${firstIssue.kind === "error" ? "text-danger-fg" : "text-ink-2"}`}
        >
          <AlertIcon />
          {firstIssue.message}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stepper
          id={`${idPrefix}-doors`}
          label="Doors"
          itemName="door"
          value={room.doorCount}
          min={0}
          max={MAX_OPENINGS_PER_ROOM}
          onChange={(value) => update("doorCount", value)}
        />
        <Stepper
          id={`${idPrefix}-windows`}
          label="Windows"
          itemName="window"
          value={room.windowCount}
          min={0}
          max={MAX_OPENINGS_PER_ROOM}
          onChange={(value) => update("windowCount", value)}
        />
      </div>

      <div className="mt-4">
        <ChoiceGroup
          name={`${idPrefix}-coats`}
          label="Coats"
          options={COAT_OPTIONS}
          value={room.coats}
          onChange={(value) => update("coats", value)}
        />
      </div>
    </fieldset>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
