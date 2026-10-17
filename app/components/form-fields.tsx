import type { ReactNode, Ref } from "react";

// Form controls from design-system.md §9.2 (inputs) and the calculator prototype (stepper,
// segmented choice, switch). All targets are at least 48 px.

const inputBaseClass =
  "h-[52px] w-full rounded-md border-2 bg-surface text-body text-ink tabular-nums placeholder:text-ink-3 focus:border-focus focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-0";

interface MeasureFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  unitPosition?: "prefix" | "suffix";
  hasError?: boolean;
  describedBy?: string;
}

/** A decimal input with its unit inside the box ("m", "£", "m²/L"). Text, not number, so "3,5" works. */
export function MeasureField({
  id,
  label,
  value,
  onChange,
  unit,
  unitPosition = "suffix",
  hasError = false,
  describedBy,
}: MeasureFieldProps) {
  // Room for the unit inside the box: "m" needs less than "m²/L", so narrow fields at 360 px keep their digits.
  const paddingClass = unitPosition === "prefix" ? "pl-8 pr-3" : unit.length <= 1 ? "pl-3 pr-7" : unit.length <= 2 ? "pl-3 pr-10" : "pl-3 pr-14";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={`${inputBaseClass} ${paddingClass} ${hasError ? "border-danger-fg" : "border-line-strong"}`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-2 ${unitPosition === "prefix" ? "left-3" : "right-3"}`}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  labelHidden?: boolean;
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  hasError?: boolean;
  describedBy?: string;
  hint?: string;
  inputRef?: Ref<HTMLInputElement>;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  labelHidden = false,
  type = "text",
  autoComplete,
  hasError = false,
  describedBy,
  hint,
  inputRef,
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className={labelHidden ? "sr-only" : "mb-1.5 block font-semibold"}>
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete ?? "off"}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={hasError || undefined}
        aria-describedby={[describedBy, hintId].filter(Boolean).join(" ") || undefined}
        className={`${inputBaseClass} px-3 ${hasError ? "border-danger-fg" : "border-line-strong"}`}
      />
      {hint && (
        <p id={hintId} className="mt-1 text-caption text-ink-2">
          {hint}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

export function TextAreaField({ id, label, value, onChange, placeholder, hint, rows = 4 }: TextAreaFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
        className="w-full rounded-md border-2 border-line-strong bg-surface px-3 py-3 text-body text-ink placeholder:text-ink-3 focus:border-focus focus:outline-none"
      />
      {hint && (
        <p id={hintId} className="mt-1 text-caption text-ink-2">
          {hint}
        </p>
      )}
    </div>
  );
}

interface SwitchFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}

/** A checkbox drawn as a switch (design-system §9), label on the left, whole row tappable. */
export function SwitchField({ id, label, checked, onChange, hint }: SwitchFieldProps) {
  return (
    <label htmlFor={id} className="flex min-h-12 cursor-pointer items-center justify-between gap-4 py-1">
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="block text-caption text-ink-2">{hint}</span>}
      </span>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-8 w-13 shrink-0 rounded-full border-2 border-line-strong bg-surface-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus after:absolute after:top-0.5 after:left-0.5 after:size-6 after:rounded-full after:bg-ink-2 after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-bg motion-reduce:after:transition-none"
      />
    </label>
  );
}

interface StepperProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  /** "door" → "One fewer door" / "One more door" */
  itemName: string;
}

export function Stepper({ id, label, value, onChange, min, max, itemName }: StepperProps) {
  const buttonClass =
    "grid size-12 place-items-center rounded-md text-title font-bold text-ink hover:bg-surface-2 disabled:text-ink-3 disabled:hover:bg-transparent";
  return (
    <div>
      <span id={`${id}-label`} className="mb-1.5 block font-semibold">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="flex h-[52px] items-center justify-between rounded-md border-2 border-line-strong bg-surface px-0.5"
      >
        <button
          type="button"
          className={buttonClass}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`One fewer ${itemName}`}
        >
          −
        </button>
        <output aria-live="polite" className="font-semibold tabular-nums">
          {value}
        </output>
        <button
          type="button"
          className={buttonClass}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`One more ${itemName}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

interface ChoiceGroupProps<Value extends string | number> {
  name: string;
  label: string;
  options: readonly Value[];
  value: Value;
  onChange: (value: Value) => void;
}

/** Segmented single choice, e.g. coats 1 / 2 / 3. Native radios, so arrow keys work. */
export function ChoiceGroup<Value extends string | number>({ name, label, options, value, onChange }: ChoiceGroupProps<Value>) {
  return (
    <fieldset>
      <legend className="mb-1.5 font-semibold">{label}</legend>
      <div className="grid auto-cols-fr grid-flow-col overflow-hidden rounded-md border-2 border-line-strong bg-surface">
        {options.map((option) => (
          <label
            key={option}
            className="relative grid min-h-12 cursor-pointer place-items-center border-line-strong font-semibold not-last:border-r-2 has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-[3px] has-focus-visible:-outline-offset-4 has-focus-visible:outline-focus"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={option === value}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-surface p-4 ${className}`}>{children}</div>;
}
